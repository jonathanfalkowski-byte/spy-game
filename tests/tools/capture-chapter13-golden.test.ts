import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden12 from '../fixtures/rev19-chapter12-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter13Choices } from '../../src/content/chapter13';

/** Skipped by default. EVE_CAPTURE_CH13=1 npx vitest run tests/tools/capture-chapter13-golden.test.ts
 * Plays untouched Chapter 12 goldens through Chapter 13 (one per answer) and writes
 * tests/fixtures/rev19-chapter13-golden.json. Recapture only for a deliberate Chapter 13 change. */
const routes: [string, string, string[]][] = [
  ['comply-alone', 'kind-tenant', ['brief-silent', 'week-alone', 'order-comply', 'door-away', 'recover-alone', 'reply-none']],
  ['refuse-station', 'truth-hidden', ['week-maya', 'order-refuse', 'station-wait', 'maya-quiet', 'reply-none']],
  ['counter-turn', 'walkaway-own', ['week-marsh', 'order-counter', 'counter-turn', 'after-home', 'reply-count']],
];
const prefer = ['begin', 'brief-silent', 'week-alone', 'box-keep', 'week-rest', 'eve-sit', 'door-away', 'vigil-silent', 'station-wait', 'maya-quiet', 'after-home', 'recover-alone', 'reply-none', 'friday-sleep'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter13' && s.phase === 'complete'); step++) {
    const offered = chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER13_CHOOSE', id: 'chapter13.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter13.complete') throw new Error(`Did not complete Chapter 13: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH13)('captures the Chapter 13 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden12.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      answer: state.choices['c13.answer'],
      honeypot: state.choices['act3.honeypot'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 13 complete ledgers (revision 19, gates open): untouched Chapter 12 goldens played through one comply, one refuse and one counterplay (turn). Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter13-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
