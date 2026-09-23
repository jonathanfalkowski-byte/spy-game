/** Chapter 6 · The Cage You Choose. Phase 1 scaffolding: the entry transition, entry-state
 * derivation and an ordered path of movements that reaches `complete`. Scene prose and choices
 * arrive per movement from design scripts (docs/story/scripts/CHAPTER_6_*.md); until then each
 * movement is a marked placeholder, and the whole chapter sits behind chapter6Playable(). */
import type { GameState } from '../state/schema';
import { paragraph as p, type Block, type NodeId } from './schema';
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

const pending = (movement: string): Block[] => [p(`[Chapter 6 · ${movement} — script pending]`)];

export const chapter6Definitions: Record<string, C6Scene> = {
  benefit: { title: 'Benefit connected', place: 'Chapter 6', blocks: pending('movement 1, benefit connected') },
  expectation: { title: 'Expectation named', place: 'Chapter 6', blocks: pending('movement 2, expectation named') },
  friction: { title: 'Friction among people', place: 'Chapter 6', blocks: pending('movement 3, friction among people') },
  exit: { title: 'The cost of exit', place: 'Chapter 6', blocks: pending('movement 4, cost of exit') },
  proof: { title: 'Proof, not confession', place: 'Chapter 6', blocks: pending('movement 5, proof') },
  counterpower: { title: 'Counterpower', place: 'Chapter 6', blocks: pending('movement 6, counterpower') },
  resolve: { title: 'What you do with it', place: 'Chapter 6', blocks: pending('movement 6, resolution') },
  complete: { title: 'Where you stand', place: 'Chapter 6', blocks: pending('chapter end') },
};
export const chapter6Scenes = Object.entries(chapter6Definitions).map(([phase, scene]) => ({
  id: `chapter6.${phase}` as NodeId,
  ...scene,
}));

/** Movement order for the scaffold; each placeholder step is replaced by its scripted choices. */
const order = ['benefit', 'expectation', 'friction', 'exit', 'proof', 'counterpower', 'resolve', 'complete'] as const;

export const chapter6Blocks = (s: GameState): Block[] =>
  s.scene === 'chapter6' ? (chapter6Definitions[s.phase]?.blocks ?? []) : [];

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
  const at = order.indexOf(s.phase as (typeof order)[number]);
  if (at < 0 || s.phase === 'complete') return [];
  return [offer6(`${s.phase}-continue`, 'Continue', 'Placeholder until this movement’s script is wired.', order[at + 1])];
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
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter6.${s.phase}` as NodeId, blocks: chapter6Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER6_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}

