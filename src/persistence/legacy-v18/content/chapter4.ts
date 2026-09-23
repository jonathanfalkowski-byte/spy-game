import { chapter4Blocks as frozenBlocks, chapter4Choices as frozenChoices } from '../../legacy-v15/content/chapter4';
import type { GameState } from '../state/schema';
import { type NodeId } from './schema';
import { entryScenes4, entryBlocks4, entryChoices4 } from './chapter4-entry';
import { caseScenes4, caseBlocks4, caseChoices4 } from './chapter4-case';
import { powerScenes4, powerBlocks4, powerChoices4 } from './chapter4-power';
import { offer4, type C4Choice } from './chapter4-model';
import { isCurrentAuthoringRevision } from './revision';
export const chapter4Definitions = { ...entryScenes4, ...caseScenes4, ...powerScenes4 };
export const chapter4Scenes = Object.entries(chapter4Definitions).map(([phase, scene]) => ({
  id: `chapter4.${phase}` as NodeId,
  ...scene,
}));
export const chapter4Blocks = (s: GameState) => !isCurrentAuthoringRevision(s.contentRevision) ? frozenBlocks(s as Parameters<typeof frozenBlocks>[0]) : [
  ...(s.phase === 'power' ? powerBlocks4(s) : []),
  ...(chapter4Definitions[s.phase]?.blocks ?? []),
  ...entryBlocks4(s),
  ...caseBlocks4(s),
  ...(s.phase === 'power' ? [] : powerBlocks4(s)),
];
export function chapter4Choices(s: GameState): C4Choice[] {
  if (!isCurrentAuthoringRevision(s.contentRevision)) return frozenChoices(s as Parameters<typeof frozenChoices>[0]) as unknown as C4Choice[];
  if (isCurrentAuthoringRevision(s.contentRevision) && s.scene === 'chapter3' && s.phase === 'departure')
    return [
      offer4(
        'begin',
        'Continue Chapter 4 · Private Access',
        'Continue the departure you selected. Earlier history remains intact.',
        'entry',
      ),
    ];
  if (!isCurrentAuthoringRevision(s.contentRevision) || s.scene !== 'chapter4') return [];
  return [...entryChoices4(s), ...caseChoices4(s), ...powerChoices4(s)];
}
export function applyChapter4Choice(state: GameState, id: string): GameState {
  const c = chapter4Choices(state).find((c) => c.id === id);
  if (!c) return state;
  const s = structuredClone(state);
  s.revision++;
  s.contentRevision = isCurrentAuthoringRevision(state.contentRevision) ? state.contentRevision : 15;
  s.history.push({
    node: `${state.scene}.${state.phase}` as NodeId,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + c.label }],
  });
  const blocks = c.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter4';
  s.phase = c.next;
  s.feedback = '';
  if (s.scene !== state.scene || s.phase !== state.phase)
    s.history.push({ node: `chapter4.${s.phase}` as NodeId, blocks: chapter4Blocks(s) });
  s.ledger.push({
    sequence: s.revision,
    action: { type: 'CHAPTER4_CHOOSE', id, expectedRevision: state.revision },
  });
  return s;
}
