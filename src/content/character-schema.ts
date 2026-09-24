import { z } from 'zod';

const text = z.string().trim().min(1).max(2000);
export const NpcIdSchema = z.enum([
  'maya',
  'daniel',
  'benton',
  'sloane',
  'voss',
  'marcus',
  'celeste',
  'sebastian',
  'rook',
  'theo',
]);
// Stable person IDs are deliberately distinct from legacy identity IDs/display names.
export const CharacterIdSchema = z.enum(['player-character', 'julian-mercer', ...NpcIdSchema.options]);
export type CharacterId = z.infer<typeof CharacterIdSchema>;
export const IdentityIdSchema = z.enum(['adrian', 'evelyn']);
export type IdentityId = z.infer<typeof IdentityIdSchema>;
export const CanonRecordSchema = z
  .object({
    id: z.string().min(1).max(80),
    text,
    source: text,
  })
  .strict();
export const CharacterCanonSchema = z
  .object({
    age: z
      .object({
        years: z.number().int().min(0).max(130),
        status: z.enum(['established', 'presented']),
        source: text,
      })
      .strict()
      .optional(),
    facts: z.array(CanonRecordSchema).max(30),
    // Author-only canon. Neither field is part of the narrator's selectable surface.
    secrets: z.array(CanonRecordSchema).max(30).optional(),
    objectives: z.array(CanonRecordSchema).max(30).optional(),
  })
  .strict()
  .superRefine((canon, ctx) => {
    const ids = [...canon.facts, ...(canon.secrets ?? []), ...(canon.objectives ?? [])].map(
      (x) => x.id,
    );
    if (new Set(ids).size !== ids.length)
      ctx.addIssue({ code: 'custom', message: 'Duplicate character canon record' });
  });

// Original prose is archival introduction material, never an automatic context export.
export const IntroductionSchema = z
  .object({
    id: z.string().min(1),
    name: text,
    role: text,
    arrival: text,
    appearance: text,
    history: text,
    // Existing protagonist-facing introduction text, not an NPC emotion meter.
    emotion: text,
  })
  .strict();
export const CharacterSchema = z
  .object({
    id: CharacterIdSchema,
    displayName: text,
    introduction: IntroductionSchema,
    canon: CharacterCanonSchema,
  })
  .strict();
export type Character = z.infer<typeof CharacterSchema>;

/** Age eligibility only. It grants no consent, attraction, or encounter eligibility. */
export function adultEligibility(character: Character): 'adult' | 'minor' | 'unknown' {
  const { age } = character.canon;
  if (!age || age.status !== 'established') return 'unknown';
  return age.years >= 18 ? 'adult' : 'minor';
}
