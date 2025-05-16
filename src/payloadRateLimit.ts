import rateLimit from 'express-rate-limit';

/**
 * Limite : 10 requêtes / minute / IP
 * – code 429 JSON si dépassé
 */
export const quizLimiter = rateLimit({
  windowMs: 60_000,          // 1 minute
  max: 10,                   // 10 requêtes
  message: { error: 'Trop de requêtes, réessayez plus tard.' },
  standardHeaders: true,     // Renvoie les headers RateLimit-*
  legacyHeaders: false,
});
