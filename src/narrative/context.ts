import { z } from 'zod';
import { characters } from '../content/characters';
import {
  CharacterIdSchema,
  CharacterSchema,
  IdentityIdSchema,
  NpcIdSchema,
  type Character,
} from '../content/character-schema';
import {
  IdentityClaimSchema,
  PersonaObservationSchema,
  earnedIdentityClaims,
  npcPersonaObservations,
  identityDisplayName,
} from '../state/player';
import { NodeSchema } from '../content/schema';
import { nodeOf } from '../state/reducer';
import type { GameState } from '../state/schema';

const key = z.string().min(1).max(500);
const observationGrant = z
  .object({
    characterId: NpcIdSchema,
    layer: z.enum(['known', 'beliefs']),
    key,
    source: key,
    event: z.number().int().nonnegative(),
  })
  .strict();

/** Trusted engine-authored policy, never a model-supplied request or saved AI output. */
export const BeatProjectionSchema = z
  .object({
    node: NodeSchema,
    revision: z.number().int().nonnegative(),
    characterId: CharacterIdSchema,
    canon: z
      .array(
        z
          .object({
            factId: z.string().min(1).max(80),
            requiresPlayerKnowledge: key,
          })
          .strict(),
      )
      .max(8),
    playerKnowledge: z.array(key).max(12),
    npcObservations: z.array(observationGrant).max(8),
    identityDisplays: z.array(IdentityIdSchema).max(2).default([]),
    identityClaims: z.array(key).max(4).default([]),
    personaObservations: z.array(PersonaObservationSchema).max(4).default([]),
    // Authored visible behaviour only; the hidden reason belongs in canonical state.
    beats: z.array(z.string().trim().min(1).max(500)).max(6),
  })
  .strict();
export type BeatProjection = z.infer<typeof BeatProjectionSchema>;

export const NarratorContextSchema = z
  .object({
    node: NodeSchema,
    revision: z.number().int().nonnegative(),
    characterId: CharacterIdSchema,
    canon: z
      .array(
        z
          .object({
            id: z.string().min(1).max(80),
            text: z.string().max(2000),
            source: z.string().max(2000),
          })
          .strict(),
      )
      .max(8),
    playerKnowledge: z.array(key).max(12),
    npcObservations: z.array(observationGrant).max(8),
    identityDisplays: z
      .array(z.object({ identityId: IdentityIdSchema, displayName: z.string().max(100) }).strict())
      .max(2),
    identityClaims: z.array(IdentityClaimSchema).max(4),
    personaObservations: z.array(PersonaObservationSchema).max(4),
    beats: z.array(z.string().max(500)).max(6),
  })
  .strict();
export type NarratorContext = z.infer<typeof NarratorContextSchema>;
export const MAX_CONTEXT_BYTES = 16_000;

/**
 * Canonical state -> authored beat projection -> narrator context.
 * No spread of GameState/Character and no automatic history, score, or secret export.
 * Invalid policies throw before any context is returned. Future callers must retain
 * authored narration on failure. This module never commits actions or calls a provider.
 */
export function projectNarratorContext(
  state: GameState,
  input: unknown,
  catalog: readonly Character[] = characters,
): NarratorContext {
  const plan = BeatProjectionSchema.parse(input);
  if (plan.node !== nodeOf(state) || plan.revision !== state.revision)
    throw Error('Stale narrative projection');
  const matches = catalog.filter((c) => c.id === plan.characterId);
  if (matches.length !== 1) throw Error('Unknown or duplicate projection character');
  const character = CharacterSchema.parse(matches[0]);
  const canon = plan.canon.map((grant) => {
    if (!state.knowledge.includes(grant.requiresPlayerKnowledge))
      throw Error('Unearned character context');
    const fact = character.canon.facts.find((f) => f.id === grant.factId);
    if (!fact) throw Error('Unprojectable character fact');
    return { id: fact.id, text: fact.text, source: fact.source };
  });
  for (const id of plan.playerKnowledge)
    if (!state.knowledge.includes(id)) throw Error('Unearned player context');
  const npcObservations = plan.npcObservations.map((grant) => {
    if (!Object.hasOwn(state.npcs, grant.characterId)) throw Error('Unknown NPC context');
    const npc = state.npcs[grant.characterId as keyof GameState['npcs']];
    if (
      !npc[grant.layer].some(
        (o) => o.key === grant.key && o.source === grant.source && o.event === grant.event,
      )
    )
      throw Error('Unauthorized NPC observation');
    return {
      characterId: grant.characterId,
      layer: grant.layer,
      key: grant.key,
      source: grant.source,
      event: grant.event,
    };
  });
  const identityDisplays = plan.identityDisplays.map((identityId) => {
    const prerequisite = identityId === 'adrian' ? 'adrian_career' : 'evelyn_package';
    if (!state.knowledge.includes(prerequisite)) throw Error('Unearned identity display');
    return { identityId, displayName: identityDisplayName(identityId) };
  });
  const claims = earnedIdentityClaims(state);
  const identityClaims = plan.identityClaims.map((id) => {
    const record = claims.find((claim) => claim.key === id);
    if (!record) throw Error('Unearned identity claim');
    return record;
  });
  const observations = npcPersonaObservations(state);
  const personaObservations = plan.personaObservations.map((grant) => {
    if (
      !observations.some(
        (o) =>
          o.observerId === grant.observerId &&
          o.identityId === grant.identityId &&
          o.key === grant.key &&
          o.source === grant.source &&
          o.event === grant.event &&
          o.layer === grant.layer,
      )
    )
      throw Error('Unauthorized persona observation');
    return grant;
  });
  const result = NarratorContextSchema.parse({
    node: plan.node,
    revision: plan.revision,
    characterId: plan.characterId,
    canon,
    playerKnowledge: plan.playerKnowledge,
    npcObservations,
    identityDisplays,
    identityClaims,
    personaObservations,
    beats: plan.beats,
  });
  if (new TextEncoder().encode(JSON.stringify(result)).length > MAX_CONTEXT_BYTES)
    throw Error('Narrative context exceeds byte budget');
  return result;
}

/** Integration entry point: failure retains the existing authored rendering path. */
export function tryProjectNarratorContext(state: GameState, input: unknown) {
  try {
    return { kind: 'projected' as const, context: projectNarratorContext(state, input) };
  } catch {
    return { kind: 'authored-fallback' as const };
  }
}
