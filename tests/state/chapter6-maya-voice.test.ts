import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden20 from '../fixtures/rev20-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { rev19Routes } from '../rev20-ledger';
import { readingBlocks } from '../../src/ui/reading-presentation';
import { mayaHeardNewVoice } from '../../src/state/chapter3-provenance';
import { frontChoices6 } from '../../src/content/chapter6-front';
import { applyChapter7Choice, chapter7Choices } from '../../src/content/chapter7';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

// Review 2026-09-24: "She thanks the stranger" when Maya has already heard the post-clinic voice
// call itself Adrian. Chapter 6 is gated, so the fix applies in place at every revision.
const ledger20 = (name: string) => golden20.routes.find((r) => r.name === name)!.ledger as GameEvent[];
const ledger19 = (name: string) => rev19Routes.find(([n]) => n === name)![1];
const shown = (s: GameState) =>
  s.history.flatMap((h) => readingBlocks(h.blocks, h.node, s.contentRevision).map((b) => b.text)).join('\n');
function first(ledger: GameEvent[], revision: number, at: (s: GameState) => boolean): GameState {
  for (let n = 1; n <= ledger.length; n++) {
    const s = replay(ledger.slice(0, n), revision);
    if (at(s)) return s;
  }
  throw new Error('never reached');
}
/** The same save, had Maya only ever had texts from after the clinic. */
const calls = ['Evelynn’s delivered Scene 2 call on the monitored phone', 'Delivered 06:45 call'];
const neverHeard = (s: GameState): GameState => {
  const x = structuredClone(s);
  x.npcs.maya.known = x.npcs.maya.known.filter((k) => !calls.includes(k.source));
  return x;
};

it.each([
  [20, () => replay(ledger20('ch6 maximal-trade'), 20)],
  [19, () => replay(ledger19('ch6 maximal-trade'), 19)],
] as const)('lets Maya recognise the voice at the counter (revision %i)', (_rev, play) => {
  const s = play();
  expect(mayaHeardNewVoice(s)).toBe(true);
  expect(s.choices['c6.maya-knows']).toBe('none');
  const text = shown(s);
  expect(text).toContain('She knows the voice before she knows the face.');
  expect(text).not.toContain('She thanks the stranger.');
  expect(s.npcs.maya.known.some((k) => k.key.startsWith('The woman at the counter had the voice from Adrian’s calls.'))).toBe(true);
});

it('keeps “Stay a stranger” only for a Maya who has never heard the new voice', () => {
  const counter = first(ledger20('ch6 maximal-trade'), 20, (s) => frontChoices6(s).some((c) => c.id.endsWith('counter-none')));
  const labels = (s: GameState) => frontChoices6(s).map((c) => c.label);
  expect(labels(counter)).toContain('Don’t confirm what she hears');
  expect(labels(counter)).not.toContain('Stay a stranger with a warning');
  const texted = neverHeard(counter);
  expect(mayaHeardNewVoice(texted)).toBe(false);
  expect(labels(texted)).toContain('Stay a stranger with a warning');
  expect(labels(texted)).not.toContain('Don’t confirm what she hears');
}, 120_000);

it('carries the unspoken recognition into Chapter 7 when Evelynn tells Maya more', () => {
  const hub = first(ledger20('ch7 pivot-own-rook-debt'), 20, (s) => chapter7Choices(s).some((c) => c.id === 'chapter7.pursue-maya'));
  const truth = (s: GameState) => {
    const told = applyChapter7Choice(applyChapter7Choice(s, 'chapter7.pursue-maya'), 'chapter7.maya-truth');
    return told.history.at(-1)!.blocks.map((b) => b.text).join('\n');
  };
  expect(truth(hub)).toContain('Still not the name; she has never asked for it since the counter');
  expect(truth(neverHeard(hub))).toContain('Not Adrian — never Adrian');
}, 120_000);
