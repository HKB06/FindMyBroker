import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({
  path: path.resolve(dirname, '../.env'),
});

import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import sharp from 'sharp';


import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Brokers } from './collections/Brokers';
import { Questions } from './collections/Questions';
import { Subscribers } from './collections/Subscribers';
import { Articles } from './collections/Articles/config'; 
import { ResponseTemplates } from './collections/ResponseTemplates';


import quizEndpoints from './endpoints/quiz';

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
