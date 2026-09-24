import { expect, it, vi } from 'vitest';
import production from '../../src/ui/approved-scene-art.json';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, newGameState } from '../../src/state/reducer';
import { resolveSceneArt } from '../../src/ui/scene-art';
import { environmentGaps, environmentMasterIds } from '../../src/ui/environment-art';
import { atOffer, day } from '../day-helpers';

it('uses only approved runtime masters for the environment fallback', () => {
  const approved = new Set(production.map((a) => a.id));
  for (const id of environmentMasterIds) expect(approved.has(id), id).toBe(true);
});

it('shows fitting masters on the day-chapter scenes the owner reported', () => {
  const departure = day(atOffer(), 'offer.accept');
  const home = day(departure, 'release.home');
  const plan = day(home, 'release.evening');
  const cases: [GameState, string, string][] = [
    [departure, 'release.departure', 'eve-bg-sloane-office-continuity-noir-v2-production'],
    [home, 'release.home', 'opening-apartment-master-v3-production'],
    [plan, 'evening.plan', 'opening-apartment-master-v3-production'],
  ];
  for (const [s, node, asset] of cases) {
    expect(`${s.scene}.${s.phase}`).toBe(node);
    const art = resolveSceneArt(s).art;
    expect(art?.kind, node).toBe('environment');
    expect(art?.asset.id, node).toBe(asset);
  }
});

it('never replaces exact art and never runs inside a scripted reading sequence', () => {
  let seed = 11;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  vi.stubEnv('VITE_EVE_CHAPTER6', '1');
  vi.stubEnv('VITE_EVE_CHAPTER7', '1');
  vi.stubEnv('VITE_EVE_CHAPTER8', '1');
  vi.stubEnv('VITE_EVE_CHAPTER9', '1');
  const blank = new Set<string>();
  for (let run = 0; run < 40; run++) {
    let s: GameState = newGameState();
    for (let step = 0; step < 700; step++) {
      const result = resolveSceneArt(s);
      if (result.reading) expect(result.art?.kind).not.toBe('environment');
      if (result.art?.kind === 'environment') expect(result.issues.length === 0 && result.shot?.assetId).toBeFalsy();
      if (!result.art) blank.add(`${s.scene}.${s.phase}`);
      const intents = availableIntents(s).filter((i) => i.type !== 'TOGGLE_EVIDENCE' && i.type !== 'REQUEST_HINT');
      if (!intents.length) break;
      const next = act(s, intents[Math.floor(rand() * intents.length)]);
      if (next === s) break;
      s = next;
    }
  }
  vi.unstubAllEnvs();
  // Every scene that renders without art is a documented gap awaiting new noir art.
  const undocumented = [...blank].filter((node) => !(environmentGaps as readonly string[]).includes(node));
  expect(undocumented).toEqual([]);
}, 240_000);
