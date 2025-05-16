// src/lib/payload.ts
import payload from 'payload';
import payloadConfig from '@/payload.config';

declare global {
  // eslint-disable-next-line no-var
  var _payloadInit: Promise<void> | undefined;
  var _payload: typeof payload | undefined;
}

export async function getPayloadInstance() {
  // 1) première requête : on lance l'init et on stocke la promesse
  if (!global._payloadInit) {
    global._payloadInit = (async () => {
      try {
        await payload.init({ config: payloadConfig });
      } catch (err: any) {
        // Ignore l'OverwriteModelError : le modèle est déjà enregistré,
        // donc Payload est bien prêt
        if (!String(err?.message).includes('OverwriteModelError')) {
          throw err;
        }
      }
      global._payload = payload;
    })();
  }

  // 2) on attend (même promesse pour tous)
  await global._payloadInit;
  return global._payload!;
}
