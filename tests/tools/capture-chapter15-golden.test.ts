import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden14 from '../fixtures/rev19-chapter14-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter15Choices } from '../../src/content/chapter15';

/** Skipped by default. EVE_CAPTURE_CH15=1 npx vitest run tests/tools/capture-chapter15-golden.test.ts
 * Plays untouched Chapter 14 goldens through Chapter 15 (one per answer) and writes
 * tests/fixtures/rev19-chapter15-golden.json. Recapture only for a deliberate Chapter 15 change. */
const routes: [string, string, string[]][] = [
  ['countered-iris', 'counter-hold', ['crew-iris', 'crew-done', 'way-iris', 'snag-talk', 'took-cards', 'cost-visibility', 'phone-river', 'night-alone']],
  ['complied-sloane', 'comply-hear', ['crew-sloane', 'crew-done', 'way-invited', 'snag-hide', 'took-verdict', 'cost-money', 'phone-keep', 'night-alone']],
  ['refused-alone', 'refuse-shut', ['crew-alone', 'way-window', 'snag-bold', 'took-adrian', 'cost-ally', 'phone-return', 'night-alone']],
];
const prefer = ['begin', 'crew-alone', 'crew-done', 'table-quiet', 'way-window', 'snag-talk', 'stairs-still', 'took-nell', 'cost-money', 'phone-keep', 'night-alone'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter15' && s.phase === 'complete'); step++) {
    const offered = chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter15.complete') throw new Error(`Did not complete Chapter 15: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH15)('captures the Chapter 15 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden14.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      road: state.choices['c14.answer'],
      cost: state.choices['c15.cost'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 15 complete ledgers (revision 19, gates open): untouched Chapter 14 goldens played through each road (countered, complied, refused). Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter15-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
