import { z } from 'zod';
import type { Endpoint } from 'payload';
import { LRUCache } from 'lru-cache';

/** ----------------------------------
 * Rate‑limit en mémoire : 10 requêtes / minute / IP
 * ----------------------------------*/
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new LRUCache<string, { cnt: number; ts: number }>({ max: 5000 });

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { cnt: 1, ts: now });
    return false;
  }
  if (rec.cnt >= RATE_LIMIT) return true;
  rec.cnt += 1;
  hits.set(ip, rec);
  return false;
}

/** ----------------------------------
 * Types & validation schemas
 * ----------------------------------*/
interface RawAnswer {
  questionId: string;
  selectedAnswer: string; // Id or label of the choice selected
}

const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedAnswer: z.string().min(1),
});

const initialBodySchema = z.object({
  answers: z.array(answerSchema).min(1),
});

const detailedBodySchema = initialBodySchema.extend({
  email: z.string().email(),
});

/** ----------------------------------
 * Helper types
 * ----------------------------------*/
type SubscriberAnswer = {
  question: string;
  selectedAnswer: string;
};

type ScoreEntry = {
  criterion: string;
  score: number;
};

interface BrokerWithScore {
  id: string;
  matchScore: number;
  tradingInstruments?: string[];
  features?: string[];
  experienceLevel?: string;
  [key: string]: unknown;
}

/** ----------------------------------
 * 1. Calculate user scores
 * ----------------------------------*/
async function calculateScores(
  answers: RawAnswer[],
  payload: any,
): Promise<{ scores: ScoreEntry[]; formattedAnswers: SubscriberAnswer[] }> {
  const scoresMap: Record<string, number> = {};
  const formattedAnswers: SubscriberAnswer[] = [];

  for (const { questionId, selectedAnswer } of answers) {
    const questionDoc = await payload.findByID({
      collection: 'questions',
      id: questionId,
    });

    formattedAnswers.push({ question: questionId, selectedAnswer });

    const choice = questionDoc.choices.find(
      (c: any) => c.answerText === selectedAnswer, // TODO : utiliser l'id dans une future version
    );

    const multiplier =
      questionDoc.weight === 'high' ? 2 : questionDoc.weight === 'low' ? 0.5 : 1;

    if (choice?.impacts) {
      choice.impacts.forEach((impact: any) => {
        scoresMap[impact.criterion] =
          (scoresMap[impact.criterion] || 0) + impact.points * multiplier;
      });
    }
  }

  const scores: ScoreEntry[] = Object.entries(scoresMap).map(([criterion, score]) => ({
    criterion,
    score,
  }));

  return { scores, formattedAnswers };
}

/** ----------------------------------
 * 2. Generate a small resume sentence
 * ----------------------------------*/
function generateProfileSummary(scores: ScoreEntry[]): string {
  if (!scores.length) return 'Profil non déterminé.';

  // On garde les 3 critères les plus marqués
  const highlights = [...scores]
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    .slice(0, 3)
    .map((s) => s.criterion.replace(/_/g, ' '));

  return `Votre profil met particulièrement en avant : ${highlights.join(', ')}.`;
}

/** ----------------------------------
 * 3. Match brokers against scores
 * ----------------------------------*/
async function findMatchingBrokers(
  scores: ScoreEntry[],
  payload: any,
  limit = 3,
): Promise<any[]> {
  // Récupère tous les brokers actifs
  const { docs: allBrokers } = await payload.find({
    collection: 'brokers',
    where: { isActive: { equals: true } },
    limit: 100,
  });

  // Transforme le tableau de scores en objet { criterion: score }
  const scoreMap: Record<string, number> = Object.fromEntries(
    scores.map((s) => [s.criterion, s.score])
  );

  // Pour chaque broker, calcule un matchScore
  const ranked = (allBrokers as any[]).map((b) => {
    let matchScore = 0;

    // 1) Niveau d’expérience
    if (scoreMap.beginner_friendly && b.experienceLevel === 'Débutant') {
      matchScore += scoreMap.beginner_friendly;
    }
    if (scoreMap.intermediate && b.experienceLevel === 'Intermédiaire') {
      matchScore += scoreMap.intermediate;
    }
    if (scoreMap.advanced && b.experienceLevel === 'Expert') {
      matchScore += scoreMap.advanced;
    }

    // 2) Instruments de trading
    const instrumentMap: Record<string, string> = {
      stocks: 'Actions',
      etf:    'ETFs',
      crypto: 'Crypto',
      forex:  'Forex',
      options:'Options',
    };
    for (const [crit, label] of Object.entries(instrumentMap)) {
      if (scoreMap[crit] && b.tradingInstruments?.includes(label)) {
        matchScore += scoreMap[crit];
      }
    }

    // 3) Fonctionnalités & services
    const featureMap: Record<string, string> = {
      simple_interface: 'Interface Simple',
      mobile_trading:   'Trading Mobile',
      api_trading:      'Trading API',
      customer_support: 'Support 24/7',
      education:        'Formation',
      copy_trading:     'Copy Trading',
    };
    for (const [crit, label] of Object.entries(featureMap)) {
      if (scoreMap[crit] && b.features?.includes(label)) {
        matchScore += scoreMap[crit];
      }
    }

    // 4) Frais bas (pondération selon tradingFees)
    if (scoreMap.low_fees && typeof b.tradingFees === 'number') {
      const SEUIL = 1; // référence à 1%
      matchScore += scoreMap.low_fees * (SEUIL / b.tradingFees);
    }

    // 5) Styles de trading
    if (scoreMap.day_trading    && b.tradingStyles?.includes('Day Trading'))   matchScore += scoreMap.day_trading;
    if (scoreMap.swing_trading  && b.tradingStyles?.includes('Swing Trading')) matchScore += scoreMap.swing_trading;
    if (scoreMap.long_term      && b.tradingStyles?.includes('Long Terme'))    matchScore += scoreMap.long_term;
    if (scoreMap.scalping       && b.tradingStyles?.includes('Scalping'))      matchScore += scoreMap.scalping;

    return { broker: b, matchScore };
  });

  // Trie par score décroissant et limite le résultat
  return ranked
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)
    .map(({ broker }) => broker);
}


/** ----------------------------------
 * 4. Upsert subscriber (no duplicate key)
 * ----------------------------------*/
async function upsertSubscriber(payload: any, email: string, data: any) {
  const existing = await payload.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.totalDocs) {
    await payload.update({
      collection: 'subscribers',
      id: existing.docs[0].id,
      data,
    });
  } else {
    await payload.create({
      collection: 'subscribers',
      data: { email, ...data },
    });
  }
}

/** ----------------------------------
 * 5. Endpoints
 * ----------------------------------*/
const quizEndpoints: Endpoint[] = [
  /* ─────────────  /quiz/initial-results  ───────────── */
  {
    path: '/quiz/initial-results',
    method: 'post',
    handler: async (req) => {
      /* ----- rate-limit ----- */
      const ip = (req.headers.get('x-forwarded-for') as string | null)?.split(',')[0]?.trim()
        ?? (req as any).ip
        ?? 'unknown';

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Trop de requêtes, réessayez plus tard.' }),
        { status: 429, headers: { 'content-type': 'application/json' } },
      );
    }

      /* ----- validation & logique ----- */
      if (!req.json) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      try {
        const parsed = initialBodySchema.parse(await req.json());

        const { scores } = await calculateScores(parsed.answers, req.payload);
        const topBrokers = await findMatchingBrokers(scores, req.payload, 3);
        const summary     = generateProfileSummary(scores);

        return new Response(
          JSON.stringify({ success: true, topBrokers, summary }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        );
      } catch (err: any) {
        const status = err instanceof z.ZodError ? 422 : 500;
        return new Response(
          JSON.stringify({ error: err.message ?? 'Failed to process quiz' }),
          { status, headers: { 'content-type': 'application/json' } },
        );
      }
    },
  },

  /* ─────────────  /quiz/detailed-report  ───────────── */
  {
    path: '/quiz/detailed-report',
    method: 'post',
    handler: async (req) => {
      /* ----- rate-limit ----- */
      const ip = (req.headers.get('x-forwarded-for') as string | null)?.split(',')[0]?.trim()
        ?? (req as any).ip
        ?? 'unknown';

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Trop de requêtes, réessayez plus tard.' }),
        { status: 429, headers: { 'content-type': 'application/json' } },
      );
    }

      /* ----- validation & logique ----- */
      if (!req.json) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      try {
        const parsed = detailedBodySchema.parse(await req.json());

        const { scores, formattedAnswers } =
          await calculateScores(parsed.answers, req.payload);

        const extendedBrokers =
          await findMatchingBrokers(scores, req.payload, 10);

        const summary = generateProfileSummary(scores);

        /* upsert subscriber (évite duplicate-key) */
        await upsertSubscriber(req.payload, parsed.email, {
          quizProfile: {
            date: new Date().toISOString(),
            answers: formattedAnswers,
            scores,
            topBrokers: extendedBrokers.slice(0, 3).map((b) => b.id),
            extendedBrokers: extendedBrokers.map((b) => b.id),
            profileSummary: summary,
          },
          hasDetailedReport: true,
        });

        return new Response(
          JSON.stringify({ success: true, extendedBrokers, profileSummary: summary }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        );
      } catch (err: any) {
        const status = err instanceof z.ZodError ? 422 : 500;
        return new Response(
          JSON.stringify({ error: err.message ?? 'Failed to create report' }),
          { status, headers: { 'content-type': 'application/json' } },
        );
      }
    },
  },
];

export default quizEndpoints;

