// Bounty Solutions Inc.

import { z } from 'zod';

// Enums & Primitives

export const UserRoleSchema = z.enum(['solver', 'seeker', 'connector']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const EscrowStatusSchema = z.enum([
  'pending_funding',
  'funded_in_escrow',
  'released',
  'disputed',
]);
export type EscrowStatus = z.infer<typeof EscrowStatusSchema>;

// Complex Objects

export const MilestoneSchema = z.object({
  title: z.string().min(5, { message: "Milestone title must be at least 5 characters." }),
  payoutPercentage: z.number().min(1).max(100),
  description: z.string().optional(),
  status: EscrowStatusSchema.default('pending_funding'),
  amount: z.number().optional(),
});
export type Milestone = z.infer<typeof MilestoneSchema>;

export const ChallengeInputSchema = z.object({
  title: z.string().max(100),
  description: z.string().min(50, { message: "Description must be at least 50 characters." }),
  budgetRange: z.enum(['<50k', '50k-250k', '250k+']),
  isStealth: z.boolean().default(false),
  publicAlias: z.string().max(50).optional(),
  industryTags: z.array(z.string()).min(1, { message: "At least one industry tag is required." }),
  milestones: z.array(MilestoneSchema).min(1, { message: "At least one milestone is required." }),
}).refine(
    (data) => {
      const totalPercentage = data.milestones.reduce((acc, milestone) => acc + milestone.payoutPercentage, 0);
      return totalPercentage === 100;
    },
    {
      message: "The sum of milestone payouts must be exactly 100%",
      path: ["milestones"],
    }
);
export type ChallengeInput = z.infer<typeof ChallengeInputSchema>;

export const UserProfileSchema = z.object({
  role: UserRoleSchema,
  probationaryStatus: z.boolean(),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional(),
  createdAt: z.any(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;
