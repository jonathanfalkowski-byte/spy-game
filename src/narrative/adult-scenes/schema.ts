// Offline production contracts. No runtime engine or renderer imports this module.
import { z } from 'zod';
import { CharacterIdSchema, IdentityIdSchema } from '../../content/character-schema';
import { NodeSchema } from '../../content/schema';
import { BeatProjectionSchema, NarratorContextSchema } from '../context';

export const Id = z.string().regex(/^[a-z0-9][a-z0-9._-]{0,99}$/);
export const Hash = z.string().regex(/^[a-f0-9]{64}$/);
const text = z.string().trim().min(1).max(2000);
const ids = z.array(Id).max(40);
export const PresentationVariantSchema = z.enum(['fade_to_black', 'mature', 'explicit_external']);
export const ObservationGrantSchema = BeatProjectionSchema.shape.npcObservations.element;
export const SourceReferenceSchema = z.discriminatedUnion('kind', [
  z.object({kind:z.literal('delivery'),characterId:CharacterIdSchema,key:text,event:z.number().int().positive()}).strict(),
  z.object({ kind: z.literal('event'), sequence: z.number().int().positive() }).strict(),
  z.object({ kind: z.literal('observation'), observation: ObservationGrantSchema }).strict(),
  z
    .object({
      kind: z.literal('player-knowledge'),
      key: text,
      event: z.number().int().nonnegative(),
    })
    .strict(),
  z.object({ kind: z.literal('leverage'), recordId: z.string().min(1).max(160) }).strict(),
  z.object({ kind: z.literal('consequence'), recordId: z.string().min(1).max(160) }).strict(),
  z.object({ kind: z.literal('consequence-rule'), ruleId: Id }).strict(),
  z.object({ kind: z.literal('authored-fact'), factId: Id }).strict(),
]);

export const AgencyContextSchema = z
  .object({
    characterId: CharacterIdSchema,
    sourceId: Id,
    willingness: z.enum(['unknown', 'willing', 'unwilling', 'conflicted']),
    authorization: z
      .object({
        status: z.enum(['unknown', 'not-granted', 'granted', 'revoked']),
        scope: text,
        sourceId: Id,
      })
      .strict(),
    refusal: z.enum(['not-established', 'expressed']),
    withdrawal: z.enum(['not-established', 'expressed']),
    participation: z.enum(['unknown', 'none', 'observing', 'participating', 'compliance']),
    pressures: z
      .array(
        z
          .object({
            kind: z.enum([
              'pressure',
              'coercion',
              'threat',
              'blackmail',
              'authority',
              'leverage',
              'dependency',
            ]),
            sourceId: Id,
            knownTo: z.array(CharacterIdSchema).max(8),
          })
          .strict(),
      )
      .max(12),
    fear: z.enum(['unknown', 'established', 'not-established']).optional(),
    resistance: z.enum(['unknown', 'expressed', 'not-established']).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.authorization.status === 'granted' &&
      (value.refusal === 'expressed' || value.withdrawal === 'expressed')
    )
      ctx.addIssue({
        code: 'custom',
        message: 'Refusal/withdrawal cannot be represented as current authorization',
      });
  });
export const BeatSchema = z
  .object({
    id: Id,
    direction: text,
    classification: z.enum([
      'unspecified',
      'mutually-willing',
      'pressured',
      'compliance-under-leverage',
      'refused',
      'withdrawn',
      'coercive',
    ]),
    agency: z.array(AgencyContextSchema).min(1).max(8),
    sourceIds: ids,
  })
  .strict();
const participant = z
  .object({ characterId: CharacterIdSchema, personaId: IdentityIdSchema.optional() })
  .strict();
const disclosure = z
  .object({
    id: Id,
    from: CharacterIdSchema,
    to: z.array(CharacterIdSchema).min(1).max(8),
    beatId: Id,
    factId: Id,
    epistemicStatus: z.enum(['fact', 'attributed-claim']),
  })
  .strict();
const projectedFact = z
  .object({ id: Id, sourceId: Id, text, visibility: z.enum(['may-reveal', 'writer-only']) })
  .strict();
const prohibition = z
  .object({
    category: z.enum([
      'identity-association',
      'leverage-source',
      'secret-objective',
      'unverified-history',
      'other',
    ]),
    directive: text,
    factId: Id.optional(),
  })
  .strict();
const presentation = z
  .object({
    variant: PresentationVariantSchema,
    omittedBeatIds: ids,
    disclosureDelivery: z
      .array(
        z
          .object({
            disclosureId: Id,
            via: z.enum(['scene', 'surrounding', 'aftermath', 'summary']),
            summaryFactId: Id.optional(),
          })
          .strict(),
      )
      .max(20),
  })
  .strict();

/** Trusted authoring input, never accepted from an external writer. Empty production registry. */
export const OutcomeContractSchema = z
  .object({
    canonicalOutcomeId: Id,
    outcomeVersion: z.number().int().positive(),
    sceneId: Id,
    sceneVariantId: Id,
    entryNode: NodeSchema,
    aftermathId: Id,
    participants: z.array(participant).min(2).max(8),
    authoredFacts: z
      .array(
        z
          .object({
            id: Id,
            kind: z.enum(['agency', 'disclosure', 'boundary', 'direction']),
            summary: text,
          })
          .strict(),
      )
      .max(60),
    sources: z.array(z.object({ id: Id, reference: SourceReferenceSchema }).strict()).max(80),
    entryState: ids,
    exitState: ids,
    requiredBeats: z.array(BeatSchema).min(1).max(30),
    requiredFacts: ids,
    informationDisclosures: z.array(disclosure).max(20),
    presentations: z.array(presentation).min(1).max(3),
  })
  .strict();
export type OutcomeContract = z.infer<typeof OutcomeContractSchema>;

export const HandoffPolicySchema = z
  .object({
    specificationVersion: z.number().int().positive(),
    writerFacts: z.array(projectedFact).max(40),
    participantKnowledge: z
      .array(z.object({ characterId: CharacterIdSchema, sourceIds: ids }).strict())
      .max(8),
    narrativeGrants: z.array(BeatProjectionSchema).max(8),
    doNotReveal: z.array(prohibition).max(30),
    additionalForbiddenChanges: z.array(text).max(20),
    visiblePowerDirection: z.array(text).max(12),
    location: text.optional(),
    time: text.optional(),
    tone: text.optional(),
    scenePurpose: text.optional(),
    styleBibleVersion: z.string().max(40).optional(),
    writerNotes: z.array(text).max(12).optional(),
    continuityReferences: ids.optional(),
    visualAssetSpecIds: ids.optional(),
    sceneIllustrationIds: ids.optional(),
    expressionIds: ids.optional(),
    wardrobeIds: ids.optional(),
    language: z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/),
  })
  .strict();
export type HandoffPolicy = z.infer<typeof HandoffPolicySchema>;

export const AdultSceneSpecSchema = z
  .object({
    contractVersion: z.literal(1),
    sceneId: Id,
    sceneVariantId: Id,
    specificationVersion: z.number().int().positive(),
    specificationHash: Hash,
    canonicalOutcomeId: Id,
    outcomeVersion: z.number().int().positive(),
    outcomeHash: Hash,
    binding: z
      .object({ node: NodeSchema, revision: z.number().int().nonnegative(), ledgerHash: Hash })
      .strict(),
    participants: z
      .array(
        participant
          .extend({
            displayName: text,
            adultEligibility: z.object({ status: z.literal('adult'), source: text }).strict(),
          })
          .strict(),
      )
      .min(2)
      .max(8),
    writerPermittedContext: z
      .object({
        facts: z.array(projectedFact.omit({ sourceId: true })).max(40),
        narrative: z.array(NarratorContextSchema).max(8),
        visiblePowerDirection: z.array(text).max(12),
      })
      .strict(),
    participantKnowledge: z
      .array(
        z
          .object({
            characterId: CharacterIdSchema,
            records: z
              .array(z.object({ id: Id, reference: SourceReferenceSchema }).strict())
              .max(40),
          })
          .strict(),
      )
      .max(8),
    agencyContext: z
      .array(
        z
          .object({
            beatId: Id,
            classification: BeatSchema.shape.classification,
            participants: z.array(AgencyContextSchema).max(8),
          })
          .strict(),
      )
      .min(1)
      .max(30),
    requiredBeats: z
      .array(z.object({ id: Id, direction: text }).strict())
      .min(1)
      .max(30),
    requiredFacts: ids,
    informationDisclosures: z.array(disclosure).max(20),
    entryState: ids,
    exitState: ids,
    aftermathId: Id,
    forbiddenChanges: z.array(text).min(1).max(40),
    doNotReveal: z.array(prohibition).min(1).max(40),
    presentation: presentation,
    language: HandoffPolicySchema.shape.language,
    location: text.optional(),
    time: text.optional(),
    tone: text.optional(),
    scenePurpose: text.optional(),
    styleBibleVersion: z.string().max(40).optional(),
    writerNotes: z.array(text).max(12).optional(),
    continuityReferences: ids.optional(),
    visualAssetSpecIds: ids.optional(),
    sceneIllustrationIds: ids.optional(),
    expressionIds: ids.optional(),
    wardrobeIds: ids.optional(),
  })
  .strict();
export type AdultSceneSpec = z.infer<typeof AdultSceneSpecSchema>;

export const AdultSceneDraftSchema = z
  .object({
    sceneId: Id,
    variantId: Id,
    specificationHash: Hash,
    canonicalOutcomeHash: Hash,
    presentationVariant: PresentationVariantSchema,
    prose: z.string().min(1).max(120000),
    beatCoverage: z
      .array(z.object({ beatId: Id, assertion: z.literal('covered') }).strict())
      .min(1)
      .max(30),
    warnings: z.array(text).max(12).optional(),
    continuityNotes: z.array(text).max(12).optional(),
    writerMetadata: z.object({ name: text, source: text }).strict(),
  })
  .strict();
export type AdultSceneDraft = z.infer<typeof AdultSceneDraftSchema>;
