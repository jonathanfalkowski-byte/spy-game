import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden from '../fixtures/rev19-golden-ledgers.json';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import golden7 from '../fixtures/rev19-chapter7-golden.json';
import golden8 from '../fixtures/rev19-chapter8-golden.json';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { hasRevision20 } from '../../src/content/revision';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

/** A revision-20 run with its revision number set back to 19, for comparison with the revision-19 replay. */
const as19 = (s: GameState) => JSON.stringify({ ...s, contentRevision: 19 });
/** Nodes whose text revision 20 deliberately rewrites (the editorial pass); everything else must match. */
const REWRITTEN = new Set<string>(['mission.debrief']);
const unchanged = (s: GameState) => ({ ...s, history: s.history.filter((h) => !REWRITTEN.has(String(h.node))) });

const routes = [
  ...golden.routes.map((r) => ['ch1-5 ' + r.name, r.ledger] as const),
  ...[golden6, golden7, golden8, golden9].flatMap((g, i) => g.routes.map((r) => [`ch${i + 6} ${r.name}`, r.ledger] as const)),
];

it.each(routes)('plays %s identically at revision 20 outside the rewritten scenes, and its save round-trips', (_name, ledger) => {
  const r19 = replay(ledger as GameEvent[], 19);
  const r20 = replay(ledger as GameEvent[], 20);
  expect(r20.contentRevision).toBe(20);
  expect(as19(unchanged(r20))).toBe(JSON.stringify(unchanged(r19)));
  const raw = encodeSave(r20);
  expect(JSON.parse(raw).contentVersion).toBe(20);
  expect(decodeSave(raw)).toEqual(r20);
}, 30_000);

it('applies the revision-20 editorial pass only from revision 20', () => {
  expect([13, 17, 18, 19].map(hasRevision20)).toEqual([false, false, false, false]);
  expect(hasRevision20(20)).toBe(true);
});
