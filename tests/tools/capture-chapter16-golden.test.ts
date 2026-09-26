import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden15 from '../fixtures/rev19-chapter15-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter16Choices } from '../../src/content/chapter16';

/** Skipped by default. EVE_CAPTURE_CH16=1 npx vitest run tests/tools/capture-chapter16-golden.test.ts
 * Plays untouched Chapter 15 goldens through Chapter 16 (one per answer) and writes
 * tests/fixtures/rev19-chapter16-golden.json. Recapture only for a deliberate Chapter 16 change. */
const routes: [string, string, string[]][] = [
  ['expose-front', 'countered-iris', ['case-set', 'aim-expose', 'inside-iris', 'inside-done', 'outside-switch', 'first-cards', 'held-verdict', 'wear-green', 'dress-alone', 'arrive-front']],
  ['terms-car', 'complied-sloane', ['case-set', 'aim-terms', 'inside-sloane', 'inside-done', 'outside-switch', 'first-verdict', 'held-page', 'wear-black', 'dress-alone', 'arrive-car']],
  ['nell-quiet', 'refused-alone', ['case-set', 'aim-nell', 'inside-none', 'outside-switch', 'first-page', 'held-adrian', 'wear-grey', 'dress-alone', 'arrive-quiet']],
];
const prefer = ['begin', 'case-set', 'aim-terms', 'inside-none', 'inside-done', 'outside-switch', 'first-page', 'wear-green', 'dress-alone', 'arrive-front'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter16' && s.phase === 'complete'); step++) {
    const offered = chapter16Choices(s).map((c) => c.id.replace(/^chapter16\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER16_CHOOSE', id: 'chapter16.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter16.complete') throw new Error(`Did not complete Chapter 16: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH16)('captures the Chapter 16 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden15.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      aim: state.choices['act4.aim'],
      arrive: state.choices['act4.arrive'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 16 complete ledgers (revision 19, gates open): untouched Chapter 15 goldens played through three aims and three arrivals. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter16-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
