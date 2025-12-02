import { onCall } from "firebase-functions/v2/https";
import { z } from "zod";

const ChallengeInputSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const sanitizeinputs = onCall((request) => {
  const parsedData = ChallengeInputSchema.parse(request.data);
  // Mock AI cleaning logic
  const sanitizedData = {
    title: parsedData.title.trim(),
    description: parsedData.description.trim(),
  };
  return { status: "success", sanitizedData };
});
