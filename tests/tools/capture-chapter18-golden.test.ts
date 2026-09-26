import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import golden17 from '../fixtures/rev19-chapter17-golden.json';
import type { GameEvent, Intent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { chapter18Choices } from '../../src/content/chapter18';

/** Skipped by default. EVE_CAPTURE_CH18=1 npx vitest run tests/tools/capture-chapter18-golden.test.ts
 * Plays untouched Chapter 17 goldens through Chapter 18 (one per answer) and writes
 * tests/fixtures/rev19-chapter18-golden.json. Recapture only for a deliberate Chapter 18 change. */
const routes: [string, string, string[]][] = [
  ['expose-armed', 'expose-room', ['morning-papers', 'switch-armed', 'with-alone', 'name-evelyn', 'later-quiet']],
  ['terms-handed', 'terms-celeste', ['morning-sleep', 'switch-handed', 'with-alone', 'name-adrian', 'later-quiet']],
  ['nell-disarmed', 'nell-silent', ['morning-papers', 'switch-disarmed', 'with-alone', 'name-new', 'later-quiet']],
];
const prefer = ['begin', 'morning-papers', 'walk-past', 'switch-armed', 'fame-later', 'with-alone', 'keep-none', 'name-evelyn', 'later-quiet'];

function play(from: GameState, picks: string[]): GameState {
  let s = from;
  for (let step = 0; step < 20 && !(s.scene === 'chapter18' && s.phase === 'complete'); step++) {
    const offered = chapter18Choices(s).map((c) => c.id.replace(/^chapter18\./, ''));
    if (!offered.length) break;
    const id = picks.find((x) => offered.includes(x)) ?? prefer.find((x) => offered.includes(x)) ?? offered[0];
    const next = act(s, { type: 'CHAPTER18_CHOOSE', id: 'chapter18.' + id } as Intent);
    if (next === s) throw new Error(`Refused ${id}`);
    s = next;
  }
  if (`${s.scene}.${s.phase}` !== 'chapter18.complete') throw new Error(`Did not complete Chapter 18: stopped at ${s.scene}.${s.phase}`);
  return s;
}

it.skipIf(!process.env.EVE_CAPTURE_CH18)('captures the Chapter 18 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = routes.map(([name, from, picks]) => {
    const start = replay(golden17.routes.find((r) => r.name === from)!.ledger as GameEvent[], 19);
    const state = play(start, picks);
    return {
      name,
      events: state.ledger.length,
      identity: state.choices['end.name'],
      switch: state.choices['end.switch'],
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: state.ledger,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note = 'Chapter 18 complete ledgers (revision 19, gates open): untouched Chapter 17 goldens played through three switches and three names. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev19-chapter18-golden.json'), JSON.stringify({ note, commit, routes: out }));
  vi.unstubAllEnvs();
}, 600_000);
