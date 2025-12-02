"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInputs = void 0;
const functions = require("firebase-functions");
const zod_1 = require("zod");
const ChallengeInputSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.sanitizeInputs = functions.https.onCall(async (data, context) => {
    const parsedData = ChallengeInputSchema.parse(data);
    // Mock AI cleaning logic
    const sanitizedData = {
        title: parsedData.title.trim(),
        description: parsedData.description.trim(),
    };
    return { status: 'success', sanitizedData };
});
//# sourceMappingURL=sanitizeInputs.js.map