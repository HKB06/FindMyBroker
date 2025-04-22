// src/lib/getPayload.ts
import payload from "payload";
import payloadConfig from "../payload.config";        // ajuste le chemin

declare global {
  // eslint-disable-next-line no-var
  var _payloadInitialized: boolean | undefined;
}

/**
 * Retourne l’instance unique de Payload,
 * initialisée une fois via payload.init()
 */
export async function getPayloadInstance() {
  if (!global._payloadInitialized) {
    await payload.init({ config: payloadConfig });   // ← init 100 % fiable
    global._payloadInitialized = true;
  }
  return payload;                                    // contient .find, .create, …
}
