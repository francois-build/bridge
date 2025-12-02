"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBridgeLink = void 0;
const functions = require("firebase-functions");
exports.generateBridgeLink = functions
    .runWith({ minInstances: 1 })
    .https.onRequest(async (req, res) => {
    res.json({ link: 'https://bridge.work/new-challenge-link' });
});
//# sourceMappingURL=generateBridgeLink.js.map