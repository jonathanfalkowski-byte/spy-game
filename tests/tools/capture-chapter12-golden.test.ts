import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden11 from '../fixtures/rev19-chapter11-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter12Choices } from '../../src/content/chapter12';

/** Skipped by default. EVE_CAPTURE_CH12=1 npx vitest run tests/tools/capture-chapter12-golden.test.ts
 * Plays untouched Chapter 11 goldens through Chapter 12 (one per answer to Nora) and writes
 * tests/fixtures/rev19-chapter12-golden.json. Recapture only for a deliberate Chapter 12 change. */
const routes: [string, string, string[]][] = [
  ['truth-hidden', 'refuse-escalated', ['search-desk', 'caught-hide', 'ashby-press', 'nora-truth', 'harbour-name']],
  ['kind-tenant', 'comply-quiet', ['search-wardrobe', 'caught-evie', 'ashby-evie', 'nora-kind', 'harbour-coffee']],
  ['walkaway-own', 'counter-surprised', ['search-balcony', 'caught-own', 'ashby-truth', 'nora-go', 'harbour-quiet']],
];
const prefer = ['begin', 'cover-quiet', 'first-sleep', 'tan-listen', 'search-desk', 'bed-mirror', 'caught-hide', 'bar-cool', 'ashby-evie', 'tail-ignore', 'nora-kind', 'boy-nora', 'harbour-quiet', 'night-alone', 'last-straight'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter12' && s.phase === 'complete'); step++) {
    const offered = chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER12_CHOOSE', id: 'chapter12.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter12.complete') throw new Error(`Did not complete Chapter 12: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH12)('captures the Chapter 12 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden11.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      nora: state.choices['c12.nora'],
      singapore: state.choices['act3.singapore'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 12 complete ledgers (revision 19, gates open): untouched Chapter 11 goldens played through each answer to Nora (truth, kind, go) and each way of being caught. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter12-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
