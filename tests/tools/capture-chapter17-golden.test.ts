import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden16 from '../fixtures/rev19-chapter16-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter17Choices } from '../../src/content/chapter17';

/** Skipped by default. EVE_CAPTURE_CH17=1 npx vitest run tests/tools/capture-chapter17-golden.test.ts
 * Plays untouched Chapter 16 goldens through Chapter 17 (one per answer) and writes
 * tests/fixtures/rev19-chapter17-golden.json. Recapture only for a deliberate Chapter 17 change. */
const routes: [string, string, string[]][] = [
  ['expose-room', 'expose-front', ['open-room', 'press-fraud', 'sloane-vouch', 'offer-refuse', 'named-ask', 'last-yes']],
  ['terms-celeste', 'terms-car', ['open-celeste', 'press-every', 'sloane-use', 'offer-draw', 'named-wait', 'last-orchid']],
  ['nell-silent', 'nell-quiet', ['open-silent', 'press-cost', 'sloane-stand', 'offer-laugh', 'named-wait', 'last-no']],
];
const prefer = ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'named-wait', 'last-no'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter17' && s.phase === 'complete'); step++) {
    const offered = chapter17Choices(s).map((c) => c.id.replace(/^chapter17\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER17_CHOOSE', id: 'chapter17.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter17.complete') throw new Error(`Did not complete Chapter 17: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH17)('captures the Chapter 17 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden16.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      board: state.choices['act4.board'],
      last: state.choices['act4.last'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 17 complete ledgers (revision 19, gates open): untouched Chapter 16 goldens played through three openings, three Sloanes, three answers and three last words. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter17-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
