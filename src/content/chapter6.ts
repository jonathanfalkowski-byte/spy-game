/** Chapter 6 · The Cage You Choose. Phase 1 scaffolding: the entry transition, entry-state
 * derivation and an ordered path of movements that reaches `complete`. Scene prose and choices
 * come from design scripts (docs/story/scripts/CHAPTER_6_*.md). The whole chapter sits behind
 * chapter6Playable() until it is ready to ship. */
import type { GameState } from '../state/schema';
import { type Block, type NodeId } from './schema';
import {
  type C6Scene,
  type C6Choice,
  chapter6Playable,
  createRook6,
  exitArrangement6,
  note6,
  offer6,
  set6,
} from './chapter6-model';
import { proofChoices6, proofEntry6 } from './chapter6-proof';
import { frontBlocks6, frontChoices6 } from './chapter6-front';
import { counterpowerBlocks6, enterCounterpower6, resolveChoices6 } from './chapter6-counterpower';

export const chapter6Definitions: Record<string, C6Scene> = {
  benefit: { title: 'Benefit connected', place: 'A WEEK LATER · 08:30', blocks: [] },
  expectation: { title: 'Expectation named', place: 'MIDDAY · THE FIRST ASK', blocks: [] },
  friction: { title: 'Friction among people', place: 'EVENING · PEOPLE WHO KNEW YOU', blocks: [] },
  exit: { title: 'The cost of exit', place: 'LATE · THE COST OF LEAVING', blocks: [] },
  proof: { title: 'Proof, not confession', place: 'THE NEXT NIGHT · THE UNKNOWN SENDER', blocks: proofEntry6 },
  counterpower: { title: 'Counterpower', place: '· WHAT YOU HOLD', blocks: [] },
  resolve: { title: 'What you do with it', place: '· THE DECISION', blocks: [] },
  complete: { title: 'Where you stand', place: '· WHERE IT TURNS', blocks: [] },
};
export const chapter6Scenes = Object.entries(chapter6Definitions).map(([phase, scene]) => ({
  id: `chapter6.${phase}` as NodeId,
  ...scene,
}));

export const chapter6Blocks = (s: GameState): Block[] =>
  s.scene === 'chapter6' ? [...(chapter6Definitions[s.phase]?.blocks ?? []), ...frontBlocks6(s), ...counterpowerBlocks6(s)] : [];

export function chapter6Choices(s: GameState): C6Choice[] {
  if (!chapter6Playable(s)) return [];
  if (s.scene === 'chapter5' && s.phase === 'complete')
    return [
      offer6('begin', 'Continue Chapter 6 · The Cage You Choose', 'Your Chapter 5 history is preserved.', 'benefit', (x) => {
        const { arrangement, basis } = exitArrangement6(x);
        set6(x, 'exit-arrangement', arrangement);
        createRook6(x);
        note6(x, 'exit-arrangement', `Chapter 6 opens on the ${arrangement} arrangement.`, `Derived from stored Chapter 5 state: ${basis}`);
        return [];
      }),
    ];
  if (s.scene !== 'chapter6') return [];
  if (s.phase === 'proof') return proofChoices6(s);
  if (s.phase === 'counterpower' || s.phase === 'resolve') return resolveChoices6(s);
  return frontChoices6(s);
}

export function applyChapter6Choice(state: GameState, id: string): GameState {
  const choice = chapter6Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({
    node: `${state.scene}.${state.phase}` as NodeId,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }],
  });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter6';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'counterpower' && state.phase !== 'counterpower') enterCounterpower6(s);
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter6.${s.phase}` as NodeId, blocks: chapter6Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER6_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}

