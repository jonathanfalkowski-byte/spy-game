import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const once7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (breakfast, the photograph, the lift): take the neutral pick when it is in the way. */
const NEUTRAL7 = ['breakfast-quiet', 'photo-leave', 'lift-thank'];
const c7 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
    const n = NEUTRAL7.find((d) => ids(y).includes(d));
    if (!n) break;
    y = once7(y, n);
  }
  return once7(y, id);
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
  const breakfast = once7(s, 'arrive-ontime');
  expect(breakfast.phase).toBe('table');
  expect(ids(breakfast)).toEqual(['breakfast-ask', 'breakfast-hand', 'breakfast-quiet']);
  const office = once7(breakfast, 'breakfast-quiet');
  expect(office.phase).toBe('fortyone');
  expect(text(office)).toContain('Chief of staff to the Group COO');
  expect(text(office)).toContain('Last month you said yes to the part you chose and no to the rest.');
  expect(text(office)).toContain('What would make this safe for you?');
});

it('writes three terms, meets Marcus, hears the confession, pays the rent herself, and authenticates', () => {
  const contract = walk7(toExecutive(), ['arrive-early', 'safe-writing', 'photo-leave']);
  expect(ids(contract)).toEqual(['term-door', 'term-firewall', 'term-name', 'term-veto', 'term-files']);
  const hallway = walk7(contract, ['term-firewall', 'term-name', 'term-files']);
  expect(hallway.phase).toBe('hallway');
  expect(hallway.facts).toContain('c7.x-contract');
  expect(text(hallway)).toContain('He never did keep them.');
  const key = walk7(hallway, ['marcus-answer', 'lift-thank']);
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
  // The road goes on to Executive Chapter 8, not the bridge.
  expect(chapter8Choices(done).map((c) => c.id)).toEqual(['chapter8.begin-executive']);
  expect(chapter9Choices(done)).toEqual([]);
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

it('deepening: breakfast, the photograph and the lift are moments of their own, each with a neutral pick', () => {
  const s = toExecutive('expect-narrow', 'warm');
  const hand = once7(once7(s, 'arrive-early'), 'breakfast-hand');
  expect(hand.choices['c7.x-breakfast']).toBe('hand');
  expect(text(hand)).toContain('I’d like to ask it with your hand exactly where it is.');
  const photo = once7(hand, 'safe-writing');
  expect(photo.phase).toBe('fortyone');
  expect(ids(photo)).toEqual(['photo-ask', 'photo-straighten', 'photo-leave']);
  const contract = once7(photo, 'photo-ask');
  expect(contract.phase).toBe('contract');
  expect(contract.choices['exec.photo']).toBe('ask');
  expect(text(contract)).toContain('Somebody I didn’t keep.');
  const lift = walk7(contract, ['term-door', 'term-firewall', 'term-files', 'marcus-smile']);
  expect(lift.phase).toBe('hallway');
  expect(ids(lift)).toEqual(['lift-thank', 'lift-read', 'lift-hand']);
  expect(chapter7Choices(lift).find((c) => c.id === 'chapter7.lift-read')?.label).toBe('“I know. I wrote it into my contract.”');
  const key = once7(lift, 'lift-hand');
  expect(key.phase).toBe('key');
  expect(key.choices['exec.lift']).toBe('hand');
  const scope = walk7(key, ['key-decline', 'x-evening-julian']);
  expect(text(scope)).toContain('the one you gave him this morning');
  const done = walk7(scope, ['x-julian-sex', 'x-stay']);
  expect(text(done)).toContain('one hook at a time');
  expect(text(done)).toContain('with your right hand closed');
});

it('deepening: squaring the photograph brings Clare into it, and asking about it marks the card', () => {
  const contract = walk7(toExecutive(), ['arrive-ontime', 'breakfast-ask', 'safe-quiet', 'photo-straighten']);
  expect(text(contract)).toContain('I’ll tell you about that one day.');
  expect(text(contract)).toContain('Clare used to do that.');
  const done = walk7(toExecutive(), ['arrive-ontime', 'breakfast-quiet', 'safe-quiet', 'photo-ask', 'term-door', 'term-name', 'term-veto', 'marcus-ask', 'lift-read', 'key-decline', 'x-evening-alone']);
  expect(text(done)).toContain('Then from now on, let me read them first.');
  expect(text(done)).toContain('You write KEEP on the corner of the card');
  expect(replay(done.ledger, 19)).toEqual(done);
});
