import { expect, it } from 'vitest';
import type { GameState } from '../../src/state/schema';
import { act, availableChoices, newGameState, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { readingBlocks } from '../../src/ui/reading-presentation';
import { dress5, walk5 } from '../chapter5-helpers';

const text = (s: GameState) => s.history.flatMap((entry) => entry.blocks.map((block) => block.text)).join('\n');
const route = (look: string) => walk5(dress5(), ['look-' + look]).ledger;
const mayaHeader = (s: GameState) => s.npcs.maya.known.find((k) => k.key === 'helix_assignment');

it('starts new games on revision 19 and round-trips their saves', () => {
  const state = newGameState();
  expect(state.contentRevision).toBe(19);
  const next = act(state, { type: 'CHOOSE_DIALOGUE', id: availableChoices(state)[0].id });
  expect(next.contentRevision).toBe(19);
  const raw = encodeSave(next);
  expect(JSON.parse(raw).contentVersion).toBe(19);
  expect(decodeSave(raw)).toEqual(next);
  expect(replay(next.ledger, 19)).toEqual(next);
});

it('keeps a revision-18 save loadable with its original wardrobe wording', () => {
  const r18 = replay(route('minimal'), 18);
  expect(r18.contentRevision).toBe(18);
  const raw = encodeSave(r18);
  expect(JSON.parse(raw).contentVersion).toBe(18);
  const loaded = decodeSave(raw);
  expect(loaded).toEqual(r18);
  const prose = text(loaded);
  expect(prose).toContain('You are wearing the plain charcoal dress and black low heels again.');
  expect(prose).toContain('You will leave jewellery off today.');
  expect(prose).toContain('You keep the plain charcoal knee-length dress and black low heels.');
  expect(prose).toContain('an understated cocktail outfit');
  expect(prose).not.toContain('Your hair is pinned up');
  expect(mayaHeader(loaded)?.source).toBe('Visible report header at Adrian’s desk');
});

it('replays the same choices on revision 19 with styled wardrobe wording', () => {
  const r19 = replay(route('minimal'), 19);
  expect(r19.contentRevision).toBe(19);
  expect(decodeSave(encodeSave(r19))).toEqual(r19);
  const prose = text(r19);
  expect(prose).not.toContain('low heels');
  expect(prose).not.toContain('plain charcoal');
  expect(prose).toContain(
    'You are wearing the fitted charcoal dress and black heels again. The delivered wardrobe holds your tailored suit and evening gown; any new purchase stays on the table. Your hair is pinned up, your makeup finished, and you leave jewellery off today.',
  );
  expect(prose).toContain('You keep the fitted charcoal knee-length dress and black heels.');
  expect(prose).toContain('a sleek dark cocktail dress');
  expect(prose).toContain('The others offer a softer natural finish');
});

it('does not let a revision-18 save authenticate as revision 19', () => {
  const raw = JSON.parse(encodeSave(replay(route('minimal'), 18)));
  raw.contentVersion = 19;
  raw.state.contentRevision = 19;
  expect(() => decodeSave(JSON.stringify(raw))).toThrow(/does not match its event ledger/);
});

it('carries the revision-18 editorial wording into revision 19 with the heels corrected', () => {
  for (const [look, r18Copy, r19Copy] of [
    ['glamorous', 'keeping the black low heels. The jacket sharpens the softer line of the gown. You like the balance.', 'keeping the black heels. The jacket sharpens the softer line of the gown. You like the balance.'],
    ['provocative', 'keeping the black low heels. Cool air touches your open back.', 'keeping the black heels. Cool air touches your open back.'],
  ] as const) {
    const shown = (s: GameState) =>
      s.history.flatMap((entry) => readingBlocks(entry.blocks, entry.node, s.contentRevision).map((block) => block.text)).join('\n');
    expect(shown(replay(route(look), 18))).toContain(r18Copy);
    const r19 = shown(replay(route(look), 19));
    expect(r19).toContain(r19Copy);
    expect(r19).not.toContain('low heels');
  }
}, 15_000);

it('records Maya’s report-header observation as client names only on revision 19, under the same key', () => {
  const r19 = replay(route('minimal'), 19);
  const seen = mayaHeader(r19);
  expect(seen?.key).toBe('helix_assignment');
  expect(seen?.source).toBe('Helix and Novagen client names on a Strategic Intelligence report header at Adrian’s desk');
  expect(r19.npcs.maya.beliefs.some((b) => b.key === 'helix_assignment')).toBe(false);
});
