import type { Endpoint } from 'payload';

interface RawAnswer {
  questionId: string;
  selectedAnswer: string;
}

interface InitialResultsBody {
  answers: RawAnswer[];
}

interface DetailedReportBody extends InitialResultsBody {
  email: string;
}

type SubscriberAnswer = {
  question: string; 
  selectedAnswer: string;
};

type ScoreEntry = {
  criterion: string;
  score: number;
};

async function calculateScores(
  answers: RawAnswer[],
  payload: any
): Promise<{ scores: ScoreEntry[]; formattedAnswers: SubscriberAnswer[] }> {
  const scoresMap: Record<string, number> = {};
  const formattedAnswers: SubscriberAnswer[] = [];

  for (const answer of answers) {
    const questionDoc = await payload.findByID({
      collection: 'questions',
      id: answer.questionId,
    });

    formattedAnswers.push({
      question: answer.questionId,
      selectedAnswer: answer.selectedAnswer,
    });

    const choice = questionDoc.choices.find(
      (c: any) => c.answerText === answer.selectedAnswer
    );

    const multiplier =
      questionDoc.weight === 'high' ? 2 :
      questionDoc.weight === 'low' ? 0.5 : 1;

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

function generateProfileSummary(scores: ScoreEntry[]): string {
  if (!scores.length) return "Profil non déterminé.";
  return `Vous avez ${scores.length} critères analysés.`;
}

async function findMatchingBrokers(scores: ScoreEntry[], payload: any, limit: number) {
  const allBrokers = await payload.find({
    collection: 'brokers',
    where: { isActive: { equals: true } },
    limit: 100,
  });

  
  return allBrokers.docs.slice(0, limit);
}

const quizEndpoints: Endpoint[] = [
  {
    path: '/quiz/initial-results',
    method: 'post',
    handler: async (req) => {
      if (!req.json) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      try {
        const body = (await req.json()) as InitialResultsBody;
        const { scores } = await calculateScores(body.answers, req.payload);
        const topBrokers = await findMatchingBrokers(scores, req.payload, 3);
        const summary = generateProfileSummary(scores);

        return new Response(
          JSON.stringify({ success: true, topBrokers, summary }),
          { status: 200, headers: { 'content-type': 'application/json' } }
        );
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to process quiz' }), {
          status: 500,
          headers: { 'content-type': 'application/json' },
        });
      }
    },
  },
  {
    path: '/quiz/detailed-report',
    method: 'post',
    handler: async (req) => {
      if (!req.json) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      try {
        const body = (await req.json()) as DetailedReportBody;
        const { scores, formattedAnswers } = await calculateScores(body.answers, req.payload);
        const extendedBrokers = await findMatchingBrokers(scores, req.payload, 10);
        const summary = generateProfileSummary(scores);

        const subscriber = await req.payload.create({
          collection: 'subscribers',
          data: {
            email: body.email,
            quizProfile: {
              date: new Date().toISOString(),
              answers: formattedAnswers,
              scores,
              topBrokers: extendedBrokers.slice(0, 3).map((b: any) => b.id),
              extendedBrokers: extendedBrokers.map((b: any) => b.id),
              profileSummary: summary,
            },
            hasDetailedReport: true,
          },
        });

        return new Response(
          JSON.stringify({
            success: true,
            extendedBrokers,
            profileSummary: summary,
          }),
          { status: 200, headers: { 'content-type': 'application/json' } }
        );
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to create report' }), {
          status: 500,
          headers: { 'content-type': 'application/json' },
        });
      }
    },
  },
];

export default quizEndpoints;
