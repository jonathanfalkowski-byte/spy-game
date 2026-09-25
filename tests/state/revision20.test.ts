import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden20 from '../fixtures/rev20-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { hasRevision20 } from '../../src/content/revision';
import { rev19Routes, toRevision20 } from '../rev20-ledger';
import { SLOANE_DOUBT_BELIEF } from '../../src/content/sloane-standing';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

/** Aster negotiation traces (revision 20 collapses that menu) and records keyed by event number or
 * history index, which shift when a menu is shorter. Everything else later chapters read must match. */
const aster = /^c5\.(concept-seen-|negotiated-|negotiation-|creative-approval$|directory$)/;
const positional = /^c\d+\.(rec|event|layer)\.|sent-\d+-/;
const drop = (k: string) => aster.test(k) || positional.test(k) || /^c5\.(rec|event|layer)\.(negotiation-|sent-)/.test(k);

/** What the rest of the game reads from a save: flags, money, relationships, knowledge; not the
 * transcript, the ledger or event numbers. Chapter 6 stores only the lane, so the tally penalty shows
 * here only if it flips a lane (no golden route is close). */
function consequences(s: GameState) {
  const { history: _h, ledger: _l, revision: _r, contentRevision: _c, ...rest } = s;
  const choices = Object.fromEntries(Object.entries(s.choices).filter(([k]) => !drop(k)));
  const npcs = JSON.parse(JSON.stringify(s.npcs, (k, v) => (k === 'event' ? undefined : v)));
  // The one deliberate revision-20 consequence: Sloane remembers a guessed Benton (sloane-standing.ts).
  npcs.sloane.beliefs = npcs.sloane.beliefs.filter((b: { key: string }) => b.key !== SLOANE_DOUBT_BELIEF);
  const keys = (xs: string[]) => xs.filter((k) => !drop(k));
  return { ...rest, choices, npcs, facts: keys(s.facts), claims: keys(s.claims), knowledge: keys(s.knowledge) };
}

it.each(golden20.routes.map((r) => [r.name, r] as const))(
  'replays revision-20 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 20);
    expect(state.contentRevision).toBe(20);
    expect(state.ledger).toHaveLength(route.events);
    const raw = encodeSave(state);
    expect(JSON.parse(raw).contentVersion).toBe(20);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
    expect(decodeSave(raw)).toEqual(state);
  },
  30_000,
);

it.each(rev19Routes)(
  'makes the same decisions in %s lead to the same consequences at revisions 19 and 20',
  (_name, ledger) => {
    const r19 = replay(ledger, 19);
    const r20 = replay(toRevision20(ledger), 20);
    expect(`${r20.scene}.${r20.phase}`).toBe(`${r19.scene}.${r19.phase}`);
    expect(consequences(r20)).toEqual(consequences(r19));
  },
  30_000,
);

it('keeps the revision-20 goldens in step with the translated revision-19 routes', () => {
  expect(golden20.routes.map((r) => r.name)).toEqual(rev19Routes.map(([name]) => name));
  for (const [name, ledger] of rev19Routes)
    expect(toRevision20(ledger), name).toEqual(golden20.routes.find((r) => r.name === name)!.ledger);
}, 300_000);

it('applies the revision-20 editorial pass only from revision 20', () => {
  expect([13, 17, 18, 19].map(hasRevision20)).toEqual([false, false, false, false]);
  expect(hasRevision20(20)).toBe(true);
});
