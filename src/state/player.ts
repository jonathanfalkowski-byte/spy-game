import { z } from 'zod';
import {
  CharacterIdSchema,
  IdentityIdSchema,
  NpcIdSchema,
  type CharacterId,
} from '../content/character-schema';
import { identities, identityClaimKeys } from '../content/identities';
import type { GameState } from './schema';

export const PlayerBindingSchema = z
  .object({
    playerId: z.literal('local-player'),
    characterId: z.literal('player-character'),
  })
  .strict();
export const playerBinding = Object.freeze(
  PlayerBindingSchema.parse({
    playerId: 'local-player',
    characterId: 'player-character',
  }),
);
const event = z.number().int().nonnegative();
const PresentationSchema = z
  .object({
    identityId: IdentityIdSchema,
    sourceEvent: event,
    context: z.enum(['ordinary', 'operational']),
  })
  .strict();
export const PlayerViewSchema = z
  .object({
    binding: PlayerBindingSchema,
    presentation: PresentationSchema.nullable(),
    // Raw authored choices only. No derived identity-acceptance flag.
    privateInterpretation: z
      .object({ mirrorChoice: z.string().nullable(), sourceEvent: event.nullable() })
      .strict(),
    spokenNameResponse: z.object({ choiceId: z.string(), sourceEvent: event }).strict().nullable(),
  })
  .strict();

/** Read-only views over existing decisions: never written into saves. */
export function playerView(state: GameState) {
  const reception = state.ledger.find(
    (e) => e.action.type === 'MISSION_CHOOSE' && e.action.id === 'arrival.enter',
  );
  const mirror = state.ledger.find(
    (e) => e.action.type === 'CLINIC_CHOOSE' && e.action.id.startsWith('mirror.'),
  );
  const name = state.ledger.find(
    (e) => e.action.type === 'CLINIC_CHOOSE' && e.action.id.startsWith('name.'),
  );
  // During/after adaptation but before public presentation, do not guess a persona
  // from physical progress, profile, voice, clothing, or a private reaction.
  const presentation = reception
    ? { identityId: 'evelyn', context: 'operational', sourceEvent: reception.sequence }
    : state.clinic.stage === 'unchanged'
      ? { identityId: 'adrian', context: 'ordinary', sourceEvent: 0 }
      : null;
  return PlayerViewSchema.parse({
    binding: playerBinding,
    presentation,
    privateInterpretation: {
      mirrorChoice: mirror && mirror.action.type === 'CLINIC_CHOOSE' ? mirror.action.id : null,
      sourceEvent: mirror?.sequence ?? null,
    },
    spokenNameResponse:
      name && name.action.type === 'CLINIC_CHOOSE'
        ? { choiceId: name.action.id, sourceEvent: name.sequence }
        : null,
  });
}

/** Compatibility adapter for existing custody fields, not an NPC identity resolver. */
export function characterForLegacyCustodian(value: string): CharacterId | null {
  if (value === 'evelyn' || value === 'Evelyn') return playerBinding.characterId;
  if (value === 'Sloane') return 'sloane';
  return NpcIdSchema.safeParse(value).success ? CharacterIdSchema.parse(value) : null;
}

export const IdentityClaimSchema = z
  .object({
    identityId: IdentityIdSchema,
    key: z.string().min(1).max(500),
    layer: z.literal('claim'),
    text: z.string().max(2000),
    source: z.string().max(500),
    event,
  })
  .strict();
export function earnedIdentityClaims(state: GameState) {
  return state.day.records
    .filter(
      (record) =>
        record.layer === 'claim' &&
        state.knowledge.includes(record.key) &&
        (identityClaimKeys as readonly string[]).includes(record.key),
    )
    .map((record) => IdentityClaimSchema.parse({ identityId: 'evelyn', ...record }));
}

export const PersonaObservationSchema = z
  .object({
    observerId: NpcIdSchema,
    identityId: IdentityIdSchema,
    layer: z.literal('belief'),
    key: z.string().min(1).max(500),
    source: z.string().min(1).max(500),
    event,
  })
  .strict();
/** A sourced NPC belief about a persona conveys no canonical bearer association. */
export function npcPersonaObservations(state: GameState) {
  return (['marcus', 'celeste'] as const).flatMap((observerId) =>
    state.npcs[observerId].beliefs
      .filter(
        (observation) =>
          // Exact authored sources, not a name search over arbitrary private knowledge.
          observation.source ===
          (observerId === 'marcus'
            ? 'Marcus interprets the greeting; not verified'
            : 'Celeste interprets the conversation'),
      )
      .map((observation) =>
        PersonaObservationSchema.parse({
          observerId,
          identityId: 'evelyn',
          layer: 'belief',
          ...observation,
        }),
      ),
  );
}

/** Display metadata only; this function never resolves a persona to a person. */
export function identityDisplayName(id: z.infer<typeof IdentityIdSchema>) {
  return identities.find((identity) => identity.id === id)!.displayName;
}
