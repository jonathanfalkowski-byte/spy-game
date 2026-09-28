import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter9Choices } from '../../src/content/chapter9';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const c7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
const walk7 = (s: GameState, path: string[]) => path.reduce(c7, s);

/** A real save (the maximal-julian golden) played through Chapter 6 on the Julian workroom, narrowing the soft ask
 * (the Kept sequence, which stays Executive), to the Chapter 7 confirm beat, and onto the Executive road. */
function toExecutive(expect6 = 'expect-narrow', friction?: 'warm' | 'cool') {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes(expect6) ? expect6 : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  if (friction) s = Object.assign(structuredClone(s), { choices: { ...s.choices, 'c6.friction-julian': friction === 'warm' ? 'warmed' : 'cooled' } });
  s = c7(s, 'begin');
  const suggested = deriveRoute6(s)?.lane;
  return c7(s, suggested === 'executive' ? 'route-confirm' : 'route-pivot-executive');
}

it('enters from the Chapter 7 confirm beat onto the Executive road: breakfast, and the question', () => {
  const s = toExecutive();
  expect([s.phase, s.choices['route.lane']]).toEqual(['table', 'executive']);
  expect(text(s)).toContain('a place on Carey Street nobody from Helix eats at');
  expect(ids(s)).toEqual(['arrive-early', 'arrive-ontime', 'arrive-late']);
  const office = c7(s, 'arrive-ontime');
  expect(office.phase).toBe('fortyone');
  expect(text(office)).toContain('Chief of staff to the Group COO');
  expect(text(office)).toContain('Last month you said yes to the part you chose and no to the rest.');
  expect(text(office)).toContain('What would make this safe for you?');
});

it('writes three terms, meets Marcus, hears the confession, pays the rent herself, and authenticates', () => {
  const contract = walk7(toExecutive(), ['arrive-early', 'safe-writing']);
  expect(ids(contract)).toEqual(['term-door', 'term-firewall', 'term-name', 'term-veto', 'term-files']);
  const hallway = walk7(contract, ['term-firewall', 'term-name', 'term-files']);
  expect(hallway.phase).toBe('hallway');
  expect(hallway.facts).toContain('c7.x-contract');
  expect(text(hallway)).toContain('He never did keep them.');
  const key = c7(hallway, 'marcus-answer');
  expect(text(key)).toContain('I sign what Marcus gives me.');
  expect(text(key)).toContain('I wrote that into the contract this morning');
  const offered = ids(key);
  expect(offered.slice(0, 2)).toEqual(['key-accept', 'key-decline']);
  const tonight = c7(key, offered.includes('key-rent') ? 'key-rent' : 'key-decline');
  expect(tonight.phase).toBe('tonight');
  const done = walk7(tonight, ['x-evening-alone']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter7.complete');
  expect(text(done)).toContain('WHAT DO I OWE HIM?');
  expect(text(done)).not.toContain('in development]');
  // The road goes on to the shared Chapter 9 bridge until Executive Chapter 8 exists.
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('takes the key, and the evening with Julian can be the first night when Chapter 6 warmed it', () => {
  const tonight = walk7(toExecutive('expect-narrow', 'warm'), ['arrive-late', 'safe-why', 'term-door', 'term-veto', 'term-files', 'marcus-smile', 'key-accept']);
  expect(tonight.choices['exec.flat']).toBe('accepted');
  expect(tonight.facts).toContain('c7.x-flat');
  expect(ids(tonight)).toContain('x-evening-julian');
  const scope = c7(tonight, 'x-evening-julian');
  expect(text(scope)).toContain('tell me what you want tonight, and that’s what happens');
  expect(ids(scope)).toEqual(['x-julian-no-sex', 'x-julian-sex', 'x-leave']);
  const done = walk7(scope, ['x-julian-sex', 'x-stay']);
  expect(done.facts).toContain('c7.x-evening-consent');
  expect(text(done)).toContain('What happens next stays on the forty-first floor.');
  expect(text(done)).toContain('JULIAN MERCER. CHIEF OF STAFF. HIS KEY.');
});

it('keeps the evening to a line she sets unless Chapter 6 warmed it, and declines the key', () => {
  const tonight = walk7(toExecutive(), ['arrive-ontime', 'safe-quiet', 'term-door', 'term-firewall', 'term-veto', 'marcus-ask', 'key-decline']);
  expect(text(tonight)).toContain('It was a stupid thing to do with a key.');
  const scope = c7(tonight, 'x-evening-julian');
  expect(ids(scope)).toEqual(['x-julian-no-sex', 'x-leave']);
  const done = walk7(scope, ['x-julian-no-sex', 'x-stop']);
  expect(done.choices['c7.x-evening-outcome']).toBe('withdrawn');
  expect(text(done)).toContain('MY OWN FLAT.');
});

it('offers no evening with Julian when Chapter 6 cooled it', () => {
  const tonight = walk7(toExecutive('expect-narrow', 'cool'), ['arrive-ontime', 'safe-quiet', 'term-door', 'term-firewall', 'term-veto', 'marcus-smile', 'key-decline']);
  expect(ids(tonight)).not.toContain('x-evening-julian');
  expect(ids(tonight)).toContain('x-evening-alone');
});
