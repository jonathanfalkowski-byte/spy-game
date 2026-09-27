import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter11Choices } from '../../src/content/chapter11';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER11_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
const c10 = (s: GameState, id: string) => choose(s, 'CHAPTER10_CHOOSE', 'chapter10.' + id);
const walk10 = (s: GameState, path: string[]) => path.reduce(c10, s);

type Build = { clauses?: string[]; ch8?: string[]; friday?: string };
/** A real save (the maximal-julian golden) through Chapter 6, the Predator Chapters 7 and 8, and the Chapter 9 bridge,
 * to Chapter 10's entry. */
function toBridge9(b: Build = {}) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  const clauses = (b.clauses ?? ['access', 'report', 'private']).map((c) => 'clause-' + c);
  for (const id of ['begin', 'route-confirm', 'car-quiet', 'view-sit', 'want-desk', ...clauses, 'julian-truth', 'lever-read', 'visit-busy', 'offer-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  for (const id of ['begin-predator', 'weeks-begin', ...(b.ch8 ?? ['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-spare']), 'night-pryce', b.friday ?? 'friday-tell', 'julian8-thank', 'p8-evening-alone'])
    s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  return s;
}

it('enters from the Predator Chapter 9 through Marcus, and Chapter 11 waits for the ledger', () => {
  const s = toBridge9();
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(ids(s)).toEqual(['begin-predator']);
  expect(chapter11Choices(s)).toEqual([]);
  const ask = c10(s, 'begin-predator');
  expect(ask.phase).toBe('ask');
  expect(text(ask)).toContain('She has never asked to meet anybody who works for me.');
  expect(ids(ask)).toEqual(['ask-go', 'ask-wait']);
});

it('says yes over breakfast: the inventory, Adrian as a compliment, the phone, and on to the Vesper', () => {
  const table = walk10(toBridge9(), ['begin-predator', 'ask-go']);
  expect(text(table)).toContain('“Ms Laurent’s compliments.”');
  expect(text(table)).toContain('You asked Marcus for his desk. To his face.');
  expect(text(table)).toContain('Poor Anthony. You own him now, and he sends you roses.');
  expect(text(table)).toContain('You spared Ines Varga.');
  expect(text(table)).toContain('Marcus writes everything down, darling.');
  expect(text(table)).toContain('So did I, at your age.');
  expect(ids(table)).toEqual(['open-case', 'open-flatter', 'open-ask']);
  const turned = c10(table, 'open-flatter');
  expect(text(turned)).toContain('The last woman who wore your name never once asked me for anything.');
  expect(text(turned)).toContain('Adrian Vale would never have dared ask Marcus for his desk.');
  expect(ids(turned)).toEqual(['adrian-composed', 'adrian-laugh', 'adrian-leave']);
  const offer = c10(turned, 'adrian-laugh');
  expect(offer.facts).toContain('c10.p10-adrian');
  expect(text(offer)).toContain('Let me help.');
  expect(text(offer)).toContain('So we can talk without Marcus listening.');
  // The report clause lets her feed Celeste nothing true.
  expect(ids(offer)).toEqual(['offer-accept', 'offer-decline', 'offer-feed']);
  const floor = c10(offer, 'offer-accept');
  expect([floor.choices['pred.celeste10'], floor.choices['pred.phone']]).toEqual(['accepted', 'yes']);
  expect(text(floor)).toContain('Old money, new blood.');
  expect(text(floor)).toContain('Careful. She never has breakfast with anybody twice.');
  const evening = c10(floor, 'marcus-tell');
  expect(text(evening)).toContain('And will you?');
  expect(ids(evening)).toEqual(['ev-marcus', 'ev-julian', 'ev-alone']);
  const done = walk10(evening, ['ev-marcus', 'p10-marcus-sex', 'p10-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter10.ledger');
  expect(done.facts).toContain('c10.p10-evening-consent');
  expect(text(done)).toContain('CELESTE LAURENT. LET ME HELP. I SAID YES.');
  expect(text(done)).toContain('Marcus will bring you. He doesn’t know yet.');
  expect(chapter11Choices(done).map((c) => c.id)).toEqual(['chapter11.begin-predator']);
  // Chapter 11 opens on Marcus's card, which now knows what she told him.
  const ch11 = choose(done, 'CHAPTER11_CHOOSE', 'chapter11.begin-predator');
  expect(text(ch11)).toContain('She’ll be there. Of course she will. Come anyway.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('makes her come to the thirty-sixth floor, is told no, and mentions Maya', () => {
  const done = walk10(toBridge9(), ['begin-predator', 'ask-wait', 'open-ask', 'adrian-composed', 'offer-decline', 'marcus-deflect', 'ev-alone']);
  expect(text(done)).toContain('Celeste Laurent walks the whole length of the thirty-sixth floor in green');
  expect(text(done)).toContain('Then I shall watch. I do love to watch.');
  expect(text(done)).toContain('Give my love to Ms Reyes, by the way.');
  expect(text(done)).toContain('It was taken through the glass of your own office');
  expect(text(done)).toContain('I SAID NO. SHE IS WATCHING.');
  expect(text(done)).toContain('whether or not you would like to come');
  expect(done.choices['pred.marcus10']).toBe('deflected');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('walks out on the bill, takes the phone call, and feeds her nothing true', () => {
  const offer = walk10(toBridge9(), ['begin-predator', 'ask-go', 'open-case', 'adrian-leave']);
  expect(text(offer)).toContain('In its pocket, when you put your hands in it on the pavement');
  expect(text(offer)).toContain('You left me with the bill, darling.');
  const done = walk10(offer, ['offer-feed', 'marcus-lie', 'ev-alone']);
  expect(done.choices['pred.celeste10']).toBe('fed');
  // Feeding her is covert: it is not a surprise (Chapter 11's counter stays the first).
  expect(done.choices['pred.celeste-count']).toBeUndefined();
  expect(text(done)).toContain('Not one word of it is true.');
  expect(text(done)).toContain('I SAID YES. I LIED.');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('does not offer the feed without the report clause or a case to stand on', () => {
  const s = toBridge9({ clauses: ['access', 'exit', 'private'] });
  const offer = walk10(s, ['begin-predator', 'ask-go', 'open-ask', 'adrian-composed']);
  const strong = ['supported', 'strong'].includes(offer.choices['case.strength'] ?? '');
  expect(ids(offer)).toEqual(strong ? ['offer-accept', 'offer-decline', 'offer-feed'] : ['offer-accept', 'offer-decline']);
});
