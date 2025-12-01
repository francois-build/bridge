/**
 * Copyright (c) 2025 Bounty Solutions Inc.
 * All Rights Reserved.
 */
import { z } from 'zod';

// Core Challenge Schema
export const ChallengeInputSchema = z.object({
  title: z.string().max(100),
  description: z.string().min(50, "Detailed prompts required"),
  budgetRange: z.enum(['<50k', '50k-250k', '250k+']),
  isStealth: z.boolean().default(false),
  publicAlias: z.string().max(50).optional(), // For "Fortune 500 Co" masking
  industryTags: z.array(z.string()).min(1),
});

// User Role Schema
export const UserRoleSchema = z.enum(['solver', 'seeker', 'connector']);

export type ChallengeInput = z.infer<typeof ChallengeInputSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;