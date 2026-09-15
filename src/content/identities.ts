import { z } from 'zod';
import { IdentityIdSchema, IntroductionSchema } from './character-schema';
import { presentedIdentityIntroduction } from './characters';

export const IdentitySchema = z
  .object({
    id: IdentityIdSchema,
    displayName: z.string().min(1).max(100),
    kind: z.enum(['ordinary', 'operational']),
    source: z.string().min(1).max(500),
    // Original spelling/prose retained only as archival metadata.
    legacyIntroduction: IntroductionSchema.optional(),
    // An attributed age is not the bearer's age or an adult eligibility decision.
    claimedAge: z
      .object({ years: z.number().int().min(0).max(130), source: z.string().min(1).max(500) })
      .strict()
      .optional(),
  })
  .strict();
export type Identity = z.infer<typeof IdentitySchema>;
export const identities = IdentitySchema.array().parse([
  {
    id: 'adrian',
    displayName: 'Adrian Vale',
    kind: 'ordinary',
    source: 'Opening apartment and Axiom employee identity',
  },
  {
    id: 'evelyn',
    displayName: 'Evelynn Vale',
    kind: 'operational',
    source: 'Axiom identity package and Glass House invitation',
    legacyIntroduction: presentedIdentityIntroduction,
    claimedAge: {
      years: 31,
      source: 'Age stated in the Axiom identity package; independently unverified',
    },
  },
]);

// These reference existing sourced claim records, not a newly asserted biography.
export const identityClaimKeys = [
  'evelyn_package',
  'mission.singapore',
  'mission.marcus-memory',
  'mission.celeste-greeting',
] as const;
