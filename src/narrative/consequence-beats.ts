import { z } from 'zod';
import { NpcIdSchema } from '../content/character-schema';
import { deriveConsequences } from '../state/consequences';
import { nodeOf } from '../state/reducer';
import type { GameState } from '../state/schema';
import { tryProjectNarratorContext } from './context';

const GrantSchema = z
  .object({
    node: z.string(),
    revision: z.number().int().nonnegative(),
    characterId: NpcIdSchema,
    consequenceIds: z.array(z.string().min(1).max(160)).max(3),
  })
  .strict();

/** Trusted engine grants select authored visible beats, never raw relationship or power records. */
export function projectConsequenceBeats(state: GameState, input: unknown) {
  try {
    const grant = GrantSchema.parse(input);
    if (
      grant.node !== nodeOf(state) ||
      grant.revision !== state.revision ||
      new Set(grant.consequenceIds).size !== grant.consequenceIds.length
    )
      throw Error('Stale or duplicate grant');
    const view = deriveConsequences(state);
    const beats = grant.consequenceIds.map((id) => {
      const effect = view.consequences.find((e) => e.id === id);
      if (!effect) throw Error('Unknown consequence');
      if (
        effect.kind === 'relationship-signal' &&
        effect.ruleId === 'maya.withheld.concern' &&
        grant.node === 'maya.goodbye' &&
        grant.characterId === 'maya'
      )
        return 'Maya challenges the dismissal before gathering her coffee.';
      if (
        effect.kind === 'leverage-status' &&
        effect.status === 'threatened' &&
        grant.node === 'sloane.allegation' &&
        grant.characterId === 'sloane'
      )
        return 'Sloane displays the incident record and brings Maya into the allegation.';
      if (
        effect.kind === 'callback' &&
        grant.node === 'sloane.offer' &&
        grant.characterId === 'sloane'
      )
        return 'The incident material concerning Maya remains in Sloane’s file.';
      throw Error('Consequence has no authorized visible beat here');
    });
    return tryProjectNarratorContext(state, {
      node: grant.node,
      revision: grant.revision,
      characterId: grant.characterId,
      canon: [],
      playerKnowledge: [],
      npcObservations: [],
      beats: [...new Set(beats)],
    });
  } catch {
    return { kind: 'authored-fallback' as const };
  }
}
