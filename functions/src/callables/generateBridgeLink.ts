import { onRequest } from "firebase-functions/v2/https";

export const generatebridgelink = onRequest({ minInstances: 1 }, (req, res) => {
  res.json({ link: "https://bridge.work/new-challenge-link" });
});
