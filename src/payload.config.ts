import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { buildConfig, type Config } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import sharp from 'sharp';

/* ─────────────  Collections  ───────────── */
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Brokers } from './collections/Brokers';
import { Questions } from './collections/Questions';
import { Subscribers } from './collections/Subscribers';
import { Articles } from './collections/Articles';
import { ResponseTemplates } from './collections/ResponseTemplates';

/* ─────────────  Endpoints & limiter  ────── */
import quizEndpoints from './endpoints/quiz';
import { quizLimiter } from './payloadRateLimit';

/* ─────────────  .env  ───────────────────── */
const filename = fileURLToPath(import.meta.url);
const dirname  = path.dirname(filename);
dotenv.config({ path: path.resolve(dirname, '../.env') });

/* ─────────────  Plugin rate-limit  ─────────
   Signature attendue : (config: Config) => Config
------------------------------------------------*/
const rateLimitPlugin = () =>
  (config: Config): Config => {
    const originalOnInit = config.onInit;

    return {
      ...config,

      async onInit(payload) {
        /* Ajoute le middleware Express */
        (payload as any).express?.use('/api/quiz', quizLimiter);

        /* Conserve un éventuel onInit existant */
        if (typeof originalOnInit === 'function') {
          await originalOnInit(payload);
        }
      },
    };
  };

/* ─────────────  Config principale  ───────── */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },

  collections: [
    Users,
    Media,
    Brokers,
    Questions,
    Subscribers,
    Articles,
    ResponseTemplates,
  ],

  endpoints: quizEndpoints,

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || 'development-secret',

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),

  sharp,

  plugins: [
    payloadCloudPlugin(),
    rateLimitPlugin(),       // ← 10 req/min/IP sur /api/quiz/*
  ],
});
