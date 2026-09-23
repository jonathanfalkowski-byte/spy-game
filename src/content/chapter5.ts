import { chapter5Blocks as frozenBlocks, chapter5Choices as frozenChoices } from '../persistence/legacy-v16/content/chapter5';
import type { GameState } from '../state/schema';
import type { NodeId } from './schema';
import { desireScenes5, desireBlocks5, desireChoices5 } from './chapter5-desire';
import { benefitScenes5, benefitBlocks5, benefitChoices5 } from './chapter5-benefit';
import { publicScenes5, publicBlocks5, publicChoices5 } from './chapter5-public';
import { rewardScenes5, rewardBlocks5, rewardChoices5 } from './chapter5-reward';
import { sebastianScenes5, sebastianBlocks5, sebastianChoices5, soundCheckPending5 } from './chapter5-sebastian';
import { set5, voucher5, offer5, type C5Choice } from './chapter5-model';
import { isCurrentAuthoringRevision } from './revision';
export const chapter5Definitions = {
  ...rewardScenes5,
  ...publicScenes5,
  ...benefitScenes5,
  ...desireScenes5,
  ...sebastianScenes5,
};
export const chapter5Scenes = Object.entries(chapter5Definitions).map(([phase, scene]) => ({
  id: `chapter5.${phase}` as NodeId,
  ...scene,
}));
export const chapter5Blocks = (s: GameState) => {
  if (!isCurrentAuthoringRevision(s.contentRevision)) return frozenBlocks(s);
  const fixed = chapter5Definitions[s.phase as keyof typeof chapter5Definitions]?.blocks ?? [];
  const dynamic = [
    ...rewardBlocks5(s),
    ...publicBlocks5(s),
    ...benefitBlocks5(s),
    ...desireBlocks5(s),
    ...sebastianBlocks5(s),
  ];
  // Arrival must precede observations at the destination, including on conversation replay.
  return ['room', 'return'].includes(s.phase) ? [...dynamic, ...fixed] : [...fixed, ...dynamic];
};
export function chapter5Choices(s: GameState): C5Choice[] {
  if (!isCurrentAuthoringRevision(s.contentRevision)) return frozenChoices(s as Parameters<typeof frozenChoices>[0]);
  if (isCurrentAuthoringRevision(s.contentRevision) && s.scene === 'chapter4' && s.phase === 'complete')
    return [
      offer5(
        'begin',
        'Continue Chapter 5 · The Beautiful Life',
        'Take what you earned home. Your previous history is preserved.',
        'home',
        (s) => {
          set5(s, 'wardrobe', 'c05.daytime');
          set5(s, 'old-jacket', 'wardrobe');
          set5(s, 'axiom-location', 'carried');
          if (voucher5(s)) set5(s, 'voucher-location', 'folder-home');
          return [];
        },
      ),
    ];
  if (!isCurrentAuthoringRevision(s.contentRevision) || s.scene !== 'chapter5') return [];
  // Revision 19: an open question from Sebastian in the Harbour room takes the whole turn.
  if (soundCheckPending5(s)) return sebastianChoices5(s);
  return [...rewardChoices5(s), ...publicChoices5(s), ...benefitChoices5(s), ...desireChoices5(s), ...sebastianChoices5(s)];
}
export function applyChapter5Choice(state: GameState, id: string): GameState {
  const choice = chapter5Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.contentRevision = isCurrentAuthoringRevision(state.contentRevision) ? state.contentRevision : 16;
  s.history.push({
    node: `${state.scene}.${state.phase}` as NodeId,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }],
  });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter5';
  s.phase = choice.next;
  if (s.phase === 'return') {
    set5(s, 'guest-card', 'table-home');
    set5(s, 'axiom-location', 'table-home');
  }
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter5.${s.phase}` as NodeId, blocks: chapter5Blocks(s) });
  s.ledger.push({
    sequence: s.revision,
    action: { type: 'CHAPTER5_CHOOSE', id, expectedRevision: state.revision },
  });
  return s;
}
