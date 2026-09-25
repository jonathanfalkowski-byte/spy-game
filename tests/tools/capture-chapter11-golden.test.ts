import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden10 from '../fixtures/rev19-chapter10-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter11Choices } from '../../src/content/chapter11';

/** Skipped by default. EVE_CAPTURE_CH11=1 npx vitest run tests/tools/capture-chapter11-golden.test.ts
 * Plays untouched Chapter 10 goldens through Chapter 11 (one per answer) and writes
 * tests/fixtures/rev19-chapter11-golden.json. Recapture only for a deliberate Chapter 11 change. */
const routes: [string, string, string][] = [
  ['refuse-escalated', 'refuse-notes', 'order-refuse'],
  ['comply-quiet', 'comply-workroom', 'order-comply'],
  ['counter-surprised', 'counter-workroom', 'order-counter'],
];
const prefer = ['begin', 'arrive-quiet', 'room-listen', 'look-silent', 'iris-out', 'up-stairs', 'cat-leave', 'hide-curtain', 'walk-quiet', 'way-walk', 'after-home'];

function play(from: GameState, answer: string): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter11' && s.phase === 'complete'); step++) {
    const offered = chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
    if (!offered.length) break;
    const id = offered.includes(answer) ? answer : prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER11_CHOOSE', id: 'chapter11.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter11.complete') throw new Error(`Did not complete Chapter 11: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH11)('captures the Chapter 11 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, answer]) => {
    const start = replay(golden10.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, answer);
    return {
      name,
      events: state.ledger.length,
      answer: state.choices['c11.answer'],
      iris: state.choices['c11.iris'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 11 complete ledgers (revision 19, gates open): untouched Chapter 10 goldens played through one comply, one refuse and one counterplay. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter11-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
