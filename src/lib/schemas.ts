/**
 * Copyright (c) 2025 Bounty Solutions Inc.
 * All Rights Reserved.
 */
import { z } from 'zod';

// Milestone Schema
export const MilestoneSchema = z.object({
  title: z.string().min(5, "Milestone title required"),
  payoutPercentage: z.number().min(1).max(100),
  description: z.string().optional(),
});

// Core Challenge Schema
export const ChallengeInputSchema = z.object({
  title: z.string().max(100),
  description: z.string().min(50, "Detailed prompts required"),
  budgetRange: z.enum(['<50k', '50k-250k', '250k+']),
  isStealth: z.boolean().default(false),
  publicAlias: z.string().max(50).optional(), // For "Fortune 500 Co" masking
  industryTags: z.preprocess(
    (val) => typeof val === 'string' ? val.split(',').map(t => t.trim()).filter(Boolean) : val,
    z.array(z.string()).min(1, "At least one industry tag is required.")
  ),
  milestones: z.array(MilestoneSchema).min(1, "At least one milestone is required.")
    .refine(
      (milestones) =>
        milestones.reduce((acc, m) => acc + m.payoutPercentage, 0) === 100,
      {
        message: "The sum of milestone payouts must be exactly 100%",
        path: ["milestones"], 
      }
    ),
});

// User Role Schema
export const UserRoleSchema = z.enum(['solver', 'seeker', 'connector']);

export type Milestone = z.infer<typeof MilestoneSchema>;
export type ChallengeInput = z.infer<typeof ChallengeInputSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
