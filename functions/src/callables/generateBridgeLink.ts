import * as functions from 'firebase-functions';

export const generateBridgeLink = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (req, res) => {
    res.json({ link: 'https://bridge.work/new-challenge-link' });
  });
