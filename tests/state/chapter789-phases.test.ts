import { expect, it } from 'vitest';
import { nodeIds } from '../../src/content/schema';
import { chapter7Scenes } from '../../src/content/chapter7';
import { chapter8Scenes } from '../../src/content/chapter8';
import { chapter9Scenes } from '../../src/content/chapter9';
import { environmentShot } from '../../src/ui/environment-art';
import { newGameState } from '../../src/state/reducer';

/** The restructuring pass (2026-09-25): each sequence is a phase with its own title, place, node and art stand-in. */
const sequences = [
  'chapter7.held', 'chapter7.street', 'chapter7.lift', 'chapter7.wardrobe', 'chapter7.grey', 'chapter7.effects', 'chapter7.night',
  'chapter8.work', 'chapter8.maintenance', 'chapter8.fireescape', 'chapter8.emerald', 'chapter8.wake', 'chapter8.number14', 'chapter8.call',
  'chapter9.names', 'chapter9.table', 'chapter9.auction', 'chapter9.cafe', 'chapter9.river', 'chapter9.archive', 'chapter9.counsel',
];

it.each(sequences)('gives the %s sequence a scene of its own', (node) => {
  expect(nodeIds).toContain(node);
  const scene = [...chapter7Scenes, ...chapter8Scenes, ...chapter9Scenes].find((x) => x.id === node);
  expect(scene?.title).toBeTruthy();
  expect(scene?.place).toBeTruthy();
  const [scn, phase] = node.split('.');
  expect(environmentShot({ ...newGameState(), scene: scn, phase } as never)).toBeDefined();
});
