import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter14Choices } from '../../src/content/chapter14';
import { chapter15Choices } from '../../src/content/chapter15';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

/** A real Outside Chapter 9 complete save: Chapter 7 (verify, provenance, door), Chapter 8 (three verified leads). */
const nine = () => replay(golden9.routes.find((r) => r.name === 'outside-placeholder-all')!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) {
    if (v === undefined) delete x.choices[k];
    else x.choices[k] = v;
  }
  return x;
};

const ids = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
const once = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
const walk14 = (s: GameState, path: string[]) => path.reduce(once, s);
const ch14 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters The Source through the in-development bridge from an Outside Chapter 9', () => {
  const s = nine();
  expect([s.scene, s.phase, s.choices['route.lane']]).toEqual(['chapter9', 'complete', 'outside']);
  expect(ids(s)).toEqual(['begin-outside']);
  const seam = once(s, 'begin-outside');
  expect(seam.phase).toBe('seam');
  expect(text(seam)).toContain('[Chapters 10–13 · outside road — in development]');
  expect(ch14(seam)).toContain('the Jakarta handoff');
  // the verify and provenance rules mean she catches the scraped initial herself
  expect(ch14(seam)).toContain('The Jakarta copy has a gap where the courier’s initial should be.');
  expect(ids(seam)).toEqual(['o14-seam-summon']);
  // Outside has no Chapter 15 yet: nothing is offered after Chapter 14 completes
  expect(chapter15Choices(withFlags(nine(), {}))).toEqual([]);
});

it('caught, press the lie, spare Sloane, trust him, a chosen night that fades; it authenticates', () => {
  const s = nine();
  const reck = walk14(s, ['begin-outside', 'o14-seam-summon']);
  expect(reck.choices['out.seam']).toBe('caught');
  expect(reck.phase).toBe('reckoning');
  expect(ch14(reck)).toContain('My name is Rafe Lim.');
  expect(ids(reck)).toEqual(['o14-reck-finish', 'o14-reck-press', 'o14-reck-verify']);
  const verdict = once(reck, 'o14-reck-press');
  expect(verdict.choices['out.told']).toBe('yes');
  expect(verdict.choices['act3.nell']).toBe('known');
  expect(verdict.facts).toContain('c14.o-rafe');
  expect(ch14(verdict)).toContain('That is the worst reason I have ever heard for lying to a person.');
  expect(ch14(verdict)).toContain('I don’t know how she went into the water.');
  // no Sloane file was kept, so only "spare" is open
  expect(ids(verdict)).toEqual(['o14-sloane-spare']);
  const source = once(verdict, 'o14-sloane-spare');
  expect([source.choices['act3.sloane'], source.choices['out.sloane']]).toEqual(['spared', 'spare']);
  expect(ids(source)).toEqual(['o14-way-keep', 'o14-way-cut', 'o14-way-trust']);
  const water = once(source, 'o14-way-trust');
  expect([water.choices['out.way14'], water.choices['act3.nell-order']]).toEqual(['trust', 'taken']);
  expect(ids(water)).toContain('o14-evening-rafe');
  const room = walk14(water, ['o14-evening-rafe']);
  expect(ch14(room)).toContain('If I ever say her name when I mean yours, stop me.');
  const done = walk14(room, ['o14-rafe-sex', 'o14-stay']);
  expect(done.phase).toBe('complete');
  expect(done.facts).toContain('c14.o-evening-consent');
  expect(done.choices['c14.o-evening-outcome']).toBe('intimate-sex');
  expect(ch14(done)).toContain('The scene fades.');
  expect(ch14(done)).toContain('THE SOURCE.');
  expect(ch14(done)).toContain('RAFE LIM. R. ON THE LEAF.');
  expect(ch14(done)).toContain('THE VESPER · BY THE COURIER’S DOOR. TOGETHER.');
  expect(ch14(done)).toContain('LINDEN, E.');
  expect(ch14(done)).not.toContain('outside road — in development]');
  expect(ch14(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('told first (no verify rule), file banked: burn useful, cut him, alone with the names', () => {
  const s = withFlags(nine(), { 'out.rules': 'source,people,door', 'out.file': 'bank' });
  const reck = walk14(s, ['begin-outside', 'o14-seam-summon']);
  expect(reck.choices['out.seam']).toBe('told');
  expect(ch14(reck)).toContain('There’s a page I doctored. One.');
  const verdict = once(reck, 'o14-reck-verify');
  expect(ch14(verdict)).toContain('Good. Check me. She didn’t, and look.');
  expect(ids(verdict)).toEqual(['o14-sloane-burn-just', 'o14-sloane-burn-useful', 'o14-sloane-trade', 'o14-sloane-spare']);
  const source = once(verdict, 'o14-sloane-burn-useful');
  expect([source.choices['act3.sloane'], source.choices['out.sloane'], source.choices['out.burn']]).toEqual(['burned', 'burn', 'useful']);
  expect(ch14(source)).toContain('It’s useful.');
  const water = once(source, 'o14-way-cut');
  expect(water.choices['out.way14']).toBe('cut');
  expect(water.choices['act3.nell-order']).toBeUndefined();
  // cut: Rafe is not on offer for the night
  expect(ids(water)).not.toContain('o14-evening-rafe');
  const done = once(water, 'o14-evening-alone');
  expect(ch14(done)).toContain('NELL.');
  expect(ch14(done)).toContain('SLOANE · BURNED.');
  expect(ch14(done)).toContain('THE VESPER · BY THE STAIR. ALONE.');
  expect(ch14(done)).toContain('HIS NAME. I DON’T KEEP IT.');
});

it('a Sloane file left: only spare; a traded file; keep him, with the Jakarta original held; stop, then stay no-sex', () => {
  const left = withFlags(nine(), { 'out.file': 'leave' });
  const verdictLeft = walk14(left, ['begin-outside', 'o14-seam-summon', 'o14-reck-finish']);
  expect(ids(verdictLeft)).toEqual(['o14-sloane-spare']);

  const banked = withFlags(nine(), { 'out.file': 'burn' });
  const verdict = walk14(banked, ['begin-outside', 'o14-seam-summon', 'o14-reck-finish']);
  expect(ids(verdict)).toContain('o14-sloane-trade');
  const source = once(verdict, 'o14-sloane-trade');
  expect([source.choices['act3.sloane'], source.choices['out.sloane']]).toEqual(['traded', 'trade']);
  expect(ch14(source)).toContain('She keeps her post. You keep your skin.');
  const water = once(source, 'o14-way-keep');
  expect([water.choices['out.way14'], water.choices['act3.nell-order']]).toEqual(['keep', 'taken']);
  expect(ch14(water)).toContain('The one page that is you.');
  const room = walk14(water, ['o14-evening-rafe', 'o14-rafe-no-sex']);
  const stopped = once(room, 'o14-stop');
  expect(stopped.choices['c14.o-evening-outcome']).toBe('withdrawn');
  expect(stopped.phase).toBe('complete');
  expect(ch14(stopped)).toContain('THE VESPER · BY THE COURIER’S DOOR. MY TERMS.');
  const stayed = once(room, 'o14-stay');
  expect(stayed.choices['c14.o-evening-outcome']).toBe('intimate-no-sex');
  expect(ch14(stayed)).not.toMatch(SEXUAL);
});

it('how Nell died is not told here: Rafe does not know, and nothing in the chapter says', () => {
  const done = walk14(nine(), ['begin-outside', 'o14-seam-summon', 'o14-reck-finish', 'o14-sloane-spare', 'o14-way-cut', 'o14-evening-alone']);
  expect(text(done)).toContain('he does not know how she died');
  expect(ch14(done)).not.toMatch(/\b(pushed|fell|driver|car she refused)\b/i);
});
