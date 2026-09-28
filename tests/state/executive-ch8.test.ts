import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids7 = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const step = (type: 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE', prefix: string, list: (s: GameState) => string[]) => (s: GameState, id: string) => {
  const next = act(s, { type, id: prefix + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + list(s).join(', '));
  return next;
};
const c7 = step('CHAPTER7_CHOOSE', 'chapter7.', ids7);
const c8 = step('CHAPTER8_CHOOSE', 'chapter8.', ids);
const walk8 = (s: GameState, path: string[]) => path.reduce(c8, s);

/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom and Executive Chapter 7, to the
 * start of The Terms. `terms` are the three Ch7 terms; `flags` stand in for Ch6 friction or Maya where needed. */
function atTerms(terms: string[], key = 'key-decline', ch7Evening: string[] = ['x-evening-alone'], flags: Record<string, string> = {}) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-narrow') ? 'expect-narrow' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  if (Object.keys(flags).length) s = Object.assign(structuredClone(s), { choices: { ...s.choices, ...flags } });
  s = c7(s, 'begin');
  s = c7(s, deriveRoute6(s)?.lane === 'executive' ? 'route-confirm' : 'route-pivot-executive');
  s = ['arrive-ontime', 'safe-writing', ...terms.map((t) => 'term-' + t), 'marcus-answer', key, ...ch7Evening].reduce(c7, s);
  expect(`${s.scene}.${s.phase}`).toBe('chapter7.complete');
  return c8(s, 'begin-executive');
}

it('opens The Terms from an Executive Chapter 7, not the bridge: the lit office was Clare’s', () => {
  const s = atTerms(['door', 'firewall', 'files']);
  expect(`${s.scene}.${s.phase}`).toBe('chapter8.orbit');
  expect(text(s)).toContain('Clare Adeyemi. My last chief of staff.');
  expect(text(s)).toContain('I didn’t keep her. I’m not going to make that mistake twice.');
  expect(ids(s)).toEqual(['x8-light-off', 'x8-light-on']);
  const hub = c8(s, 'x8-light-on');
  expect(hub.phase).toBe('favours');
  expect(ids(hub)).toEqual(['x8-fav-car', 'x8-fav-card', 'x8-fav-fixer', 'x8-fav-diary', 'x8-fav-paper']);
  const car = c8(hub, 'x8-fav-car');
  expect(currentPlace(car, 'x')).toContain('Week one · 01:10');
  expect(ids(car)).toEqual(['x8-car-take', 'x8-car-once', 'x8-car-refuse']);
});

it('kept: takes the flat, the car, the card and the call, tells him about 14.3, and stays the night', () => {
  const s = atTerms(['door', 'firewall', 'files'], 'key-accept', ['x-evening-alone'], { 'c6.friction-julian': 'warmed' });
  const hub = c8(s, 'x8-light-off');
  const car = c8(hub, 'x8-fav-car');
  expect(text(car)).toContain('The flat on the river, is it?');
  const card = c8(c8(car, 'x8-car-take'), 'x8-fav-card');
  expect(ids(card)).toEqual(['x8-card-take', 'x8-card-work', 'x8-card-refuse']);
  const dinner = walk8(card, ['x8-card-take', 'x8-fav-fixer', 'x8-fixer-take']);
  expect(dinner.phase).toBe('dinner');
  expect(dinner.choices['exec.kept']).toBe('3');
  expect(text(dinner)).toContain('Mr Mercer always did like people who used to be somebody else.');
  const tray = c8(dinner, 'x8-sloane-civil');
  expect(tray.phase).toBe('tray');
  expect(text(tray)).toContain('Your term says you read everything he signs');
  expect(text(tray)).toContain('L.S.F. Advisory takes first claim on the assets of Helix itself');
  const late = c8(tray, 'x8-file-tell');
  expect(late.facts).toContain('c8.x-file');
  expect(text(late)).toContain('I’ve signed this clause eleven times.');
  expect(late.choices['exec.trust']).toBe('1');
  const scope = c8(late, 'x8-late-julian');
  expect(ids(scope)).toEqual(['x8-julian-no-sex', 'x8-julian-sex', 'x8-leave']);
  const done = walk8(scope, ['x8-julian-sex', 'x8-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter8.complete');
  expect(done.facts).toContain('c8.x-evening-consent');
  expect(text(done)).toContain('What happens next stays on the forty-first floor.');
  expect(text(done)).toContain('HIS FLAT. HAL, EVERY NIGHT. THE DRESS, ON HIS CARD. ONE CALL.');
  expect(text(done)).toContain('I just want to know that I could stop.');
  expect(text(done)).toContain('L.S.F. ADVISORY. 14.3. WHOSE MONEY?');
  expect(chapter9Choices(done).map((c) => [c.id, c.label])).toEqual([['chapter9.begin-placeholder', 'Follow the counterparty']]);
});

it('owes nothing: the firewall’s halfway answers, the veto at dinner, a copy of page thirty-one, the ledger alone, and authenticates', () => {
  const s = atTerms(['firewall', 'name', 'veto']);
  const card = walk8(s, ['x8-light-off', 'x8-fav-car', 'x8-car-refuse', 'x8-fav-card']);
  expect(text(card)).toContain('Your term says I have to ask.');
  const fixer = walk8(card, ['x8-card-work', 'x8-fav-fixer']);
  expect(ids(fixer)).toEqual(['x8-fixer-take', 'x8-fixer-advice', 'x8-fixer-refuse']);
  const dinner = c8(fixer, 'x8-fixer-advice');
  expect(dinner.choices['exec.kept']).toBeUndefined();
  expect(text(dinner)).toContain('We haven’t been introduced. Sloane. Axiom.');
  const tray = c8(dinner, 'x8-sloane-cold');
  expect(text(tray)).toContain('You have no right to read it.');
  const done = walk8(tray, ['x8-file-keep', 'x8-late-alone']);
  expect(done.choices['exec.file']).toBe('kept');
  expect(text(done)).toContain('“He never does,”');
  expect(text(done)).toContain('MY OWN FLAT. THE NIGHT BUS. THE DRESS, MINE. HIS LAWYER, MY FEE.');
  expect(text(done)).toContain('I owe him nothing.');
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('rival: holds his diary on a door term, takes Sloane’s deal, pulls the file, and Marcus notices', () => {
  const s = atTerms(['door', 'veto', 'files']);
  const diary = walk8(s, ['x8-light-on', 'x8-fav-diary']);
  expect(text(diary)).toContain('It’s in my contract. Julian read it twice.');
  expect(ids(diary)).toEqual(['x8-diary-hold', 'x8-diary-sit', 'x8-diary-trade']);
  const dinner = walk8(diary, ['x8-diary-trade', 'x8-fav-paper', 'x8-paper-mine', 'x8-fav-car', 'x8-car-once']);
  expect(dinner.choices['exec.trust']).toBe('2');
  const cloak = c8(dinner, 'x8-sloane-deal');
  expect(cloak.phase).toBe('dinner');
  expect(ids(cloak)).toEqual(['x8-cloak-take', 'x8-cloak-walk']);
  const tray = c8(cloak, 'x8-cloak-take');
  expect(text(tray)).toContain('Sloane knew. Sloane has known for a long time.');
  const late = c8(tray, 'x8-file-pull');
  expect(late.choices['exec.marcus8']).toBe('open');
  expect(text(late)).toContain('Something’s missing from Julian’s tray.');
  const done = c8(late, 'x8-late-alone');
  expect(text(done)).toContain('SLOANE. I OWE HER ONE.');
  expect(text(done)).toContain('ROTTERDAM, EARLY. MY PAPER.');
  expect(text(done)).toContain('Now you know whose it is. It is yours.');
});

it('offers Julian even when Chapter 6 cooled it, with the night only if warmed or if she stayed in Chapter 7', () => {
  const cooled = atTerms(['door', 'veto', 'name'], 'key-decline', ['x-evening-alone'], { 'c6.friction-julian': 'cooled' });
  const late = walk8(cooled, ['x8-light-off', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-his', 'x8-fav-car', 'x8-car-refuse', 'x8-sloane-civil', 'x8-file-tell']);
  expect(ids(late)).toContain('x8-late-julian');
  expect(ids(c8(late, 'x8-late-julian'))).toEqual(['x8-julian-no-sex', 'x8-leave']);
  const done = walk8(late, ['x8-late-julian', 'x8-julian-no-sex', 'x8-stop']);
  expect(done.choices['c8.x-late-outcome']).toBe('withdrawn');
  // She stayed with him in Chapter 7 (no sex), without Ch6 warming it: the night can now be offered.
  const stayed = atTerms(['door', 'veto', 'name'], 'key-decline', ['x-evening-julian', 'x-julian-no-sex', 'x-stay']);
  const late2 = walk8(stayed, ['x8-light-off', 'x8-fav-paper', 'x8-paper-ours', 'x8-fav-diary', 'x8-diary-sit', 'x8-fav-fixer', 'x8-fixer-refuse', 'x8-sloane-cold', 'x8-file-keep']);
  const scope2 = c8(late2, 'x8-late-julian');
  expect(text(scope2)).toContain('Page thirty-one is in my phone');
  expect(ids(scope2)).toEqual(['x8-julian-no-sex', 'x8-julian-sex', 'x8-leave']);
});
