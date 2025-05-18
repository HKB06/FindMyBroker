// src/lib/payload.ts
import mongoose from 'mongoose';
import payload from 'payload';
import payloadConfig from '@/payload.config';

declare global {
  // stocke la promesse d'init une seule fois
  var _payloadInit: Promise<void> | undefined;
  // et l'instance de payload
  var _payload: typeof payload | undefined;
}

export async function getPayloadInstance() {
  // 0) on supprime TOUS les anciens modèles mongoose
  Object.keys(mongoose.models).forEach((m) => {
    delete mongoose.models[m];
  });

  // 1) on lance init() une seule fois
  if (!global._payloadInit) {
    global._payloadInit = (async () => {
      try {
        await payload.init({ config: payloadConfig });
      } catch (err: any) {
        // ignore l’erreur “OverwriteModelError”
        if (!String(err.message).includes('OverwriteModelError')) {
          throw err;
        }
      }
      global._payload = payload;
    })();
  }

  // 2) on attend que l’init soit faite
  await global._payloadInit;
  return global._payload!;
}
