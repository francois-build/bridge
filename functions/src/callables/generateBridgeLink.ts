import { onCall } from "firebase-functions/v2/https";

export const generateBridgeLink = onCall({ minInstances: 1 }, (request) => {
  return { link: "https://bridge.work/new-challenge-link" };
});
