// src/payload.config.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { buildConfig, type Config } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import sharp from 'sharp';

/** ─── 1) Nettoie tous les anciens modèles Mongoose */
Object.keys(mongoose.models).forEach((model) => {
  delete mongoose.models[model as string];
});

/** ─── Charge le .env */
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config({ path: path.resolve(dirname, '../.env') });

/** ─── Collections */
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Brokers } from './collections/Brokers';
import { Questions } from './collections/Questions';
import { Subscribers } from './collections/Subscribers';
import { Articles } from './collections/Articles';
import { ResponseTemplates } from './collections/ResponseTemplates';

/** ─── Endpoints & rate-limit middleware */
import quizEndpoints from './endpoints/quiz';
import { quizLimiter } from './payloadRateLimit';

/** ─── Plugin “inline” pour injecter le rate‑limit dans Express */
const rateLimitPlugin = () => (config: Config): Config => {
  const originalOnInit = config.onInit;
  return {
    ...config,
    async onInit(payload) {
      // Applique le rate‑limit sur /api/quiz
      (payload as any).express?.use('/api/quiz', quizLimiter);
      // Appelle l’onInit d’origine s’il existe
      if (typeof originalOnInit === 'function') {
        await originalOnInit(payload);
      }
    },
  };
};

/** ─── Configuration principale de Payload */
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

  /** ─── Email (via SMTP Zoho) */
  email: nodemailerAdapter({
    /** Adresse & nom par défaut visibles par les destinataires */
    defaultFromAddress: 'support@findmybroker.io',
    defaultFromName:    'FindMyBroker',

    /** Options de transport Nodemailer */
    transportOptions: {
      host  : process.env.SMTP_HOST,
      port  : Number(process.env.SMTP_PORT) || 587,   // Zoho STARTTLS
      secure: process.env.SMTP_SECURE === 'true',     // false = STARTTLS
      requireTLS: process.env.SMTP_REQUIRE_TLS === 'true',

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      /* ▸ dé-commente si Zoho renvoie encore l’erreur
         “self-signed certificate in certificate chain” en local. */
        tls: { rejectUnauthorized: false },
    },
  }),

  secret: process.env.PAYLOAD_SECRET || 'development-secret',

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  plugins: [
    payloadCloudPlugin(),
    rateLimitPlugin(), // 10 requêtes/min/IP sur /api/quiz/*
  ],
});