import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden13 from '../fixtures/rev19-chapter13-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter14Choices } from '../../src/content/chapter14';

/** Skipped by default. EVE_CAPTURE_CH14=1 npx vitest run tests/tools/capture-chapter14-golden.test.ts
 * Plays untouched Chapter 13 goldens through Chapter 14 (one per answer) and writes
 * tests/fixtures/rev19-chapter14-golden.json. Recapture only for a deliberate Chapter 14 change. */
const routes: [string, string, string[]][] = [
  ['comply-hear', 'comply-alone', ['sloane-hear', 'tell-now', 'said-enough', 'order-comply', 'comply-copy', 'after-alone']],
  ['refuse-shut', 'refuse-station', ['sloane-shut', 'tell-later', 'said-all', 'order-refuse', 'escape-fire', 'after-alone']],
  ['counter-hold', 'counter-turn', ['sloane-hold', 'tell-now', 'said-all', 'order-counter', 'lay-marsh', 'after-alone']],
];
const prefer = ['begin', 'ask-none', 'sloane-hear', 'tell-now', 'said-enough', 'maya-leave', 'comply-clean', 'stairs-silent', 'escape-fire', 'after-alone'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter14' && s.phase === 'complete'); step++) {
    const offered = chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter14.complete') throw new Error(`Did not complete Chapter 14: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH14)('captures the Chapter 14 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden13.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      answer: state.choices['c14.answer'],
      sloane: state.choices['act3.sloane'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 14 complete ledgers (revision 19, gates open): untouched Chapter 13 goldens played through one comply, one refuse and one counterplay. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter14-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
