import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter10Choices } from '../../src/content/chapter10';

/** Skipped by default. EVE_CAPTURE_CH10=1 npx vitest run tests/tools/capture-chapter10-golden.test.ts
 * Plays untouched Chapter 9 goldens through Chapter 10 (one per answer) and writes
 * tests/fixtures/rev19-chapter10-golden.json. Recapture only for a deliberate Chapter 10 change. */
const routes: [string, string, string][] = [
  ['refuse-notes', 'records-name-thin', 'order-refuse'],
  ['comply-workroom', 'maya-all', 'order-comply'],
  ['counter-workroom', 'rook-all', 'order-counter'],
];
const prefer = ['begin', 'breakfast-go', 'open-silent', 'adrian-composed', 'call-sloane', 'wall-build', 'invite-accept', 'close-end'];

function play(from: GameState, answer: string): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter10' && s.phase === 'complete'); step++) {
    const offered = chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
    if (!offered.length) break;
    const id = offered.includes(answer) ? answer : prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER10_CHOOSE', id: 'chapter10.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter10.complete') throw new Error(`Did not complete Chapter 10: stopped at ${s.scene}.${s.phase} (${s.choices['route.lane']})`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH10)('captures the Chapter 10 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, answer]) => {
    const start = replay(golden9.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, answer);
    return {
      name,
      events: state.ledger.length,
      target: state.choices['c10.target'],
      answer: state.choices['c10.answer'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 10 complete ledgers (revision 19, gates open): untouched Chapter 9 goldens played through one comply, one refuse and one counterplay. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter10-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
