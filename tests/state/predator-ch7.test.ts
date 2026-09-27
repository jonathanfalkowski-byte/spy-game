import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter9Choices } from '../../src/content/chapter9';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { c6, chapter5Complete, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const c7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk7 = (s: GameState, path: string[]) => path.reduce(c7, s);
/** A Predator Chapter 6 ending (the Julian room held to its terms and knowingly deepened), confirmed at Chapter 7. */
const start = (flags: Record<string, string> = {}) => {
  let s = walk(chapter5Complete({ flags: { 'c5.service': 'julian', ...flags } }), ['begin', 'benefit-accept', 'expect-negotiate', 'counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  const x = structuredClone(s);
  Object.assign(x.choices, flags);
  return walk7(x, ['begin', 'route-confirm']);
};
const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|moan\w*|nipples?|arous\w*|orgasm\w*)\b/i;

it('sends Marcus’s car, with Mr Pryce at the wheel, straight from the confirm beat', () => {
  const s = start();
  expect([s.phase, s.choices['route.lane']]).toEqual(['summons', 'predator']);
  expect(text(s)).toContain('Nine o’clock. Helix, the thirty-eighth floor. Come as you like. — M.C.');
  expect(text(s)).toContain('Pryce. I’m to take you whenever you’re ready');
  expect(ids(s)).toEqual(['car-ask', 'car-read', 'car-quiet']);
  expect(text(c7(s, 'car-ask'))).toContain('There’s a fund that keeps a few of us on its books');
});

it('asks what she wants, reading the Marcus note she kept', () => {
  const office = c7(start({ 'c3.memo': 'retain' }), 'car-quiet');
  expect(office.phase).toBe('office');
  expect(text(office)).toContain('You put it in a drawer. I noticed.');
  expect(text(office)).toContain('What do you want?');
  expect(ids(office)).toEqual(['want-money', 'want-title', 'want-desk']);
  expect(text(c7(start({ 'c3.memo': 'correct' }), 'car-quiet'))).toContain('Nobody corrects me in writing.');
  const desk = c7(office, 'want-desk');
  expect([desk.phase, desk.choices['pred.want']]).toEqual(['terms', 'desk']);
  expect(text(desk)).toContain('God, I’m going to enjoy this.');
});

it('lets her write three of five clauses into her own contract, and pays her for it', () => {
  const terms = walk7(start(), ['car-quiet', 'want-money']);
  expect(ids(terms)).toEqual(['clause-exit', 'clause-access', 'clause-report', 'clause-indemnity', 'clause-private']);
  const before = Number(terms.choices['own.cash'] ?? 0);
  const one = c7(terms, 'clause-exit');
  expect([one.phase, one.choices['pred.clause.exit']]).toEqual(['terms', 'yes']);
  expect(ids(one)).not.toContain('clause-exit');
  const signed = walk7(one, ['clause-access', 'clause-private']);
  expect(signed.phase).toBe('corridor');
  expect(Number(signed.choices['own.cash'])).toBe(before + 3000);
  expect(signed.facts).toContain('c7.p-contract');
  expect(text(signed)).toContain('Three knives in the table.');
  expect(text(signed)).toContain('Julian Mercer');
});

it('meets Julian in the corridor, and the first lever is her own work under Benton’s name', () => {
  const corridor = walk7(start(), ['car-quiet', 'want-title', 'clause-exit', 'clause-access', 'clause-report']);
  expect(ids(corridor)).toEqual(['julian-truth', 'julian-lie', 'julian-past']);
  const truth = c7(corridor, 'julian-truth');
  expect([truth.phase, truth.choices['pred.julian']]).toEqual(['floor', 'ally']);
  expect(text(truth)).toContain('Then take it well.');
  expect(text(truth)).toContain('E. BENTON, DIRECTOR');
  expect(text(truth)).toContain('It took him four hours, not until Christmas.');
  expect(ids(truth)).toEqual(['lever-read', 'lever-copy', 'lever-return']);
  const returned = c7(truth, 'lever-return');
  expect(returned.facts).toContain('c7.p-novagen');
  expect(text(returned)).toContain('It came up from Mr Chen’s office this morning. Personally.');
  expect(c7(corridor, 'julian-lie').choices['pred.julian']).toBe('casualty');
});

it('keeps the evening chosen, consented and stoppable, and offers Julian only if she did not cool or lie to him', () => {
  const floor = walk7(start(), ['car-quiet', 'want-money', 'clause-exit', 'clause-access', 'clause-report']);
  const evening = walk7(floor, ['julian-truth', 'lever-read']);
  expect(evening.phase).toBe('evening');
  expect(ids(evening)).toEqual(['offer-evening-marcus', 'offer-evening-julian', 'offer-evening-alone']);
  expect(ids(walk7(floor, ['julian-lie', 'lever-read']))).toEqual(['offer-evening-marcus', 'offer-evening-alone']);
  const cooled = walk7(start({ 'c6.friction-julian': 'cooled' }), ['car-quiet', 'want-money', 'clause-exit', 'clause-access', 'clause-report', 'julian-truth', 'lever-read']);
  expect(ids(cooled)).toEqual(['offer-evening-marcus', 'offer-evening-alone']);
  const invited = c7(evening, 'offer-evening-marcus');
  expect(currentPlace(invited, 'x')).toBe('Late · Marcus’s apartment, above the river');
  expect(text(invited)).toContain('I don’t buy this. I never have.');
  expect(ids(invited)).toEqual(['offer-marcus-no-sex', 'offer-marcus-sex', 'offer-leave']);
  const chose = c7(invited, 'offer-marcus-sex');
  expect(chose.facts).toContain('c7.p-evening-consent');
  expect(ids(chose)).toEqual(['offer-stop', 'offer-stay']);
  const stopped = c7(chose, 'offer-stop');
  expect([stopped.phase, stopped.choices['c7.p-evening-outcome']]).toEqual(['complete', 'withdrawn']);
  const stayed = c7(chose, 'offer-stay');
  expect(text(stayed)).toContain('The scene fades.');
  // Nothing sexual on the path that stays in with the contract.
  const alone = c7(evening, 'offer-evening-alone');
  expect(alone.phase).toBe('complete');
  expect(alone.history.slice(-12).flatMap((h) => h.blocks.map((b) => b.text)).join(' ')).not.toMatch(SEXUAL);
});

it('ends on a ledger and hands on to the shared Chapter 9 bridge', () => {
  const done = walk7(start(), ['car-ask', 'want-desk', 'clause-report', 'clause-indemnity', 'clause-private', 'julian-past', 'lever-copy', 'offer-evening-alone']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter7.complete');
  expect(text(done)).toContain('Not a map. Not a question. A ledger.');
  expect(text(done)).toContain('Then we will see whose desk it is.');
  expect(text(done)).not.toContain('in development');
  expect(chapter7Choices(done)).toEqual([]);
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  // Every Chapter 7 move is on the ledger as a CHAPTER7_CHOOSE (the test's Chapter 5 base is hand-shaped, so the
  // save authentication is covered by the golden-route replay tests, not here).
  expect(done.ledger.filter((e) => e.action.type === 'CHAPTER7_CHOOSE').map((e) => (e.action as { id: string }).id)).toContain('chapter7.offer-evening-alone');
});

it('plays a real save into the Predator road, and the save authenticates', async () => {
  const { replay } = await import('../../src/state/reducer');
  const { decodeSave, encodeSave } = await import('../../src/persistence/saves');
  const { complete19, ids: ids6 } = await import('../chapter6-helpers');
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  expect(s.choices['c6.route-lane']).toBe('predator');
  const done = walk7(s, ['begin', 'route-confirm', 'car-read', 'want-title', 'clause-exit', 'clause-access', 'clause-report', 'julian-truth', 'lever-read', 'offer-evening-marcus', 'offer-marcus-no-sex', 'offer-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter7.complete');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});
