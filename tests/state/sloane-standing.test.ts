import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden20 from '../fixtures/rev20-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { rev19Routes } from '../rev20-ledger';
import { SLOANE_DOUBT_BELIEF, sloaneDoubts } from '../../src/content/sloane-standing';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { frontChoices6 } from '../../src/content/chapter6-front';
import { chapter8Blocks } from '../../src/content/chapter8';
import { setKey } from '../../src/content/chapter7-model';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ledger20 = (name: string) => golden20.routes.find((r) => r.name === name)!.ledger as GameEvent[];
const ledger19 = (name: string) => rev19Routes.find(([n]) => n === name)![1];
/** The first state along a ledger that satisfies `at`. */
function first(ledger: GameEvent[], revision: number, at: (s: GameState) => boolean): GameState {
  for (let n = 1; n <= ledger.length; n++) {
    const s = replay(ledger.slice(0, n), revision);
    if (at(s)) return s;
  }
  throw new Error('never reached');
}
/** The same save, as if the name had rested on a finding. */
const supported = (s: GameState): GameState => ({ ...structuredClone(s), mission: { ...s.mission, reasoning: 'supported' } });
const believes = (s: GameState) => s.npcs.sloane.beliefs.some((b) => b.key === SLOANE_DOUBT_BELIEF);
const text = (blocks: { text: string }[]) => blocks.map((b) => b.text).join('\n');

it('has Sloane remember a guessed Benton from revision 20 only', () => {
  const r20 = replay(ledger20('ch1-5 julian-intimate'), 20);
  const r19 = replay(ledger19('ch1-5 julian-intimate'), 19);
  expect(r20.mission.reasoning).toBe('unsupported');
  expect(sloaneDoubts(r20)).toBe(true);
  expect(believes(r20)).toBe(true);
  expect(sloaneDoubts(r19)).toBe(false);
  expect(believes(r19)).toBe(false);
  expect(sloaneDoubts(supported(r20))).toBe(false);
});

it('costs Sloane’s lane one seed in the Chapter 6 tally, and only for the guess', () => {
  const r20 = replay(ledger20('ch6 maximal-trade'), 20);
  const r19 = replay(ledger19('ch6 maximal-trade'), 19);
  const guessed = deriveRoute6(r20)!.totals;
  expect(guessed.institutional).toBe(deriveRoute6(supported(r20))!.totals.institutional - 1);
  expect(guessed.institutional).toBe(deriveRoute6(r19)!.totals.institutional - 1);
  expect({ ...guessed, institutional: 0 }).toEqual({ ...deriveRoute6(r19)!.totals, institutional: 0 });
});

it('has Sloane raise the guess when she confronts Evelynn in Chapter 6', () => {
  const hub = first(ledger20('ch6 maximal-trade'), 20, (s) => frontChoices6(s).some((c) => c.id.endsWith('friction-done')));
  /** Sloane's beat opens once she can see something: here, a workspace note Evelynn sent her. */
  const opening = (s: GameState) => {
    const x = structuredClone(s);
    x.choices['c5.message-sloane'] = 'yes';
    const beat = frontChoices6(x).find((c) => c.id.endsWith('friction-sloane'))!;
    return text(beat.apply!(x));
  };
  expect(opening(hub)).toContain('I do not build on luck.');
  expect(opening(supported(hub))).not.toContain('I do not build on luck.');
  expect(opening({ ...hub, contentRevision: 19 })).not.toContain('I do not build on luck.');
  expect(opening(hub)).toContain('I can see the parts you let me see');
}, 120_000);

it('puts a condition on Sloane’s Chapter 8 cover for an officer who guessed', () => {
  const at8 = first(ledger20('ch8 own-records-stop'), 20, (s) => s.scene === 'chapter8');
  const exposed = (s: GameState) => {
    const x = structuredClone(s);
    setKey(x, 'own.exposed', 'yes');
    return text(chapter8Blocks(x));
  };
  expect(exposed(at8)).toContain('you do not guess again');
  expect(exposed(supported(at8))).not.toContain('you do not guess again');
  expect(exposed({ ...at8, contentRevision: 19 })).not.toContain('you do not guess again');
  expect(exposed(at8)).toContain('Get in when you are ready.');
}, 120_000);
