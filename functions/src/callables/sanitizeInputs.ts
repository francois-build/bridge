import * as functions from 'firebase-functions';
import { z } from 'zod';

const ChallengeInputSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const sanitizeInputs = functions.https.onCall(async (data, context) => {
  const parsedData = ChallengeInputSchema.parse(data);
  // Mock AI cleaning logic
  const sanitizedData = {
    title: parsedData.title.trim(),
    description: parsedData.description.trim(),
  };
  return { status: 'success', sanitizedData };
});
