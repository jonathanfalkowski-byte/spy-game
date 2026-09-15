import { z } from 'zod';
import { CharacterIdSchema, NpcIdSchema } from '../content/character-schema';

export const CONSEQUENCE_RULESET = 'helix-consequences-v1' as const;
const event = z.number().int().positive();
const id = z.string().min(1).max(160);
export const SupportingRecordSchema = z
  .object({
    kind: z.enum(['event', 'npc-known', 'npc-belief', 'day-record', 'exposure', 'consequence']),
    key: z.string().min(1).max(500),
    sourceEvent: event,
    source: z.string().min(1).max(500),
    owner: NpcIdSchema.optional(),
  })
  .strict();
export type SupportingRecord = z.infer<typeof SupportingRecordSchema>;
export const DimensionSchema = z.enum([
  'trust',
  'attraction',
  'affection',
  'suspicion',
  'fear',
  'resentment',
  'dependency',
  'loyalty',
  'resistance',
]);
export const RelationshipValueSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('delta-only'), amount: z.number().int().min(-100).max(100) }).strict(),
  z.object({ mode: z.literal('absolute'), level: z.number().int().min(0).max(100) }).strict(),
]);
export const LeverageStatusSchema = z.enum([
  'available',
  'disclosed',
  'threatened',
  'exercised',
  'exhausted',
  'invalidated',
]);
const metadata = {
  id,
  ruleId: id,
  sourceEvent: event,
  actor: CharacterIdSchema,
  affectedCharacter: CharacterIdSchema,
  supportingRecords: z.array(SupportingRecordSchema).min(1).max(12),
};
export const ConsequenceSchema = z.discriminatedUnion('kind', [
  z
    .object({
      ...metadata,
      kind: z.literal('relationship-change'),
      sourceCharacter: CharacterIdSchema,
      targetCharacter: CharacterIdSchema,
      dimension: DimensionSchema,
      value: RelationshipValueSchema,
    })
    .strict(),
  z
    .object({
      ...metadata,
      kind: z.literal('relationship-signal'),
      sourceCharacter: CharacterIdSchema,
      targetCharacter: CharacterIdSchema,
      dimension: z.literal('suspicion'),
      signal: z.literal('withholding-concern'),
    })
    .strict(),
  z
    .object({
      ...metadata,
      kind: z.literal('leverage-created'),
      leverageId: id,
      holder: CharacterIdSchema,
      subject: CharacterIdSchema,
      relatedCharacter: CharacterIdSchema,
      basis: z.enum(['warning', 'voss_lookup']),
      validity: z.literal('observed-record-not-proof-of-wrongdoing'),
      status: z.literal('available'),
    })
    .strict(),
  z
    .object({
      ...metadata,
      kind: z.literal('leverage-knowledge'),
      leverageId: id,
      recipient: CharacterIdSchema,
    })
    .strict(),
  z
    .object({
      ...metadata,
      kind: z.literal('leverage-status'),
      leverageId: id,
      status: LeverageStatusSchema,
    })
    .strict(),
  z.object({ ...metadata, kind: z.literal('callback'), leverageId: id }).strict(),
]);
export type Consequence = z.infer<typeof ConsequenceSchema>;
const metric = z.discriminatedUnion('mode', [
  z
    .object({ mode: z.literal('delta-only'), mappedChange: z.number().int(), effects: z.array(id) })
    .strict(),
  z
    .object({
      mode: z.literal('absolute'),
      level: z.number().int().min(0).max(100),
      effects: z.array(id),
    })
    .strict(),
]);
export const RelationshipViewSchema = z
  .object({
    sourceCharacter: CharacterIdSchema,
    targetCharacter: CharacterIdSchema,
    dimensions: z.partialRecord(DimensionSchema, metric),
    signals: z.array(
      z
        .object({
          dimension: z.literal('suspicion'),
          signal: z.literal('withholding-concern'),
          effectId: id,
        })
        .strict(),
    ),
  })
  .strict();
export type RelationshipView = z.infer<typeof RelationshipViewSchema>;
export const LeverageRecordSchema = z
  .object({
    id,
    holder: CharacterIdSchema,
    subject: CharacterIdSchema,
    relatedCharacter: CharacterIdSchema,
    sourceEvent: event,
    ruleId: id,
    basis: z.enum(['warning', 'voss_lookup']),
    validity: z.literal('observed-record-not-proof-of-wrongdoing'),
    supportingRecords: z.array(SupportingRecordSchema),
    status: LeverageStatusSchema,
    transitions: z.array(
      z.object({ status: LeverageStatusSchema, effectId: id, sourceEvent: event }).strict(),
    ),
    knowledge: z.array(
      z.object({ characterId: CharacterIdSchema, effectId: id, sourceEvent: event }).strict(),
    ),
  })
  .strict();
export type LeverageRecord = z.infer<typeof LeverageRecordSchema>;
export const ConsequenceViewSchema = z
  .object({
    ruleset: z.literal(CONSEQUENCE_RULESET),
    throughRevision: z.number().int().nonnegative(),
    consequences: z.array(ConsequenceSchema),
    relationships: z.array(RelationshipViewSchema),
    leverage: z.array(LeverageRecordSchema),
  })
  .strict();
