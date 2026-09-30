import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { settle6, text, toProof, walk } from '../chapter6-helpers';

const complete6 = (name: string) => replay(golden6.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);

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
const walk7 = (s: GameState, path: string[]) => path.reduce(once7, s);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) {
    if (v === undefined) delete x.choices[k];
    else x.choices[k] = v;
  }
  return x;
};
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

/** Onto the Outside road from a finished Chapter 6: confirmed when it is the suggestion, a pivot when it is next
 * door, and the hard turn when it is the opposite road. */
function onto(s: GameState) {
  const x = once7(s, 'begin');
  if (deriveRoute6(x)?.lane === 'outside') return once7(x, 'route-confirm');
  if (ids(x).includes('route-pivot-outside')) return once7(x, 'route-pivot-outside');
  return walk7(x, ['route-break', 'confirm-break']);
}

/** A real save that exposed the ORACLE fact at the end of Chapter 6 (oracle seen, leaf verified). */
function exposeSave(extra: Record<string, string> = {}) {
  const s = walk(settle6(walk(toProof({ verified: true, flags: { 'c5.message-sloane': 'yes', ...extra } }), ['proof-open', 'proof-view'])), ['verify-compare', 'celeste-let-be', 'oracle-take', 'counterpower-decide', 'resolve-trade-expose']);
  return onto(s);
}
/** A real save that gave the sender's proof away (leaf verified; the ORACLE not taken). */
function giveSave() {
  const s = walk(settle6(walk(toProof({ verified: true, flags: { 'c5.message-sloane': 'yes' } }), ['proof-open', 'proof-view'])), ['verify-compare', 'celeste-let-be', 'oracle-leave', 'counterpower-decide', 'resolve-trade-give']);
  return onto(s);
}

it('enters The Sender from the confirm beat: the watched flat, the ferry-terminal room, the 02:40 phone', () => {
  const s = exposeSave();
  expect([s.phase, s.choices['route.lane']]).toEqual(['flit', 'outside']);
  expect(text(s)).toContain('one last time');
  expect(text(s)).toContain('it will go dark on its own');
  expect(ids(s)).toEqual(['o7-flit-note', 'o7-flit-tape', 'o7-flit-nothing']);
  const room = once7(s, 'o7-flit-note');
  expect(text(room)).toContain('YOU WATCHED THE WRONG PERSON. — 7A');
  expect(room.phase).toBe('room');
  expect(text(room)).toContain('paid up front, in cash, by a man he never met');
  expect(ids(room)).toEqual(['o7-room-kindness', 'o7-room-hook', 'o7-room-room']);
});

it('the rules of trade, three of five, with his reply and one rule of his own; the ORACLE page, verified; a fact paid', () => {
  const s = exposeSave();
  const rules = walk7(s, ['o7-flit-nothing', 'o7-room-hook']);
  expect(rules.phase).toBe('rules');
  expect(text(rules)).toContain('pauses before your name');
  expect(ids(rules)).toEqual(['o7-rule-verify', 'o7-rule-provenance', 'o7-rule-source', 'o7-rule-people', 'o7-rule-door']);
  const r1 = once7(rules, 'o7-rule-people');
  expect(text(r1)).toContain('I traded a person once. I’m still paying.');
  expect(ids(r1)).toEqual(['o7-rule-verify', 'o7-rule-provenance', 'o7-rule-source', 'o7-rule-door']);
  const r3 = walk7(r1, ['o7-rule-door', 'o7-rule-verify']);
  expect(r3.choices['out.rules']).toBe('people,door,verify');
  expect(r3.facts).toContain('c7.o-rules');
  // his matching rule: people was chosen, so "I will never ask you to be her."
  expect(text(r3)).toContain('I will never ask you to be her.');
  expect(r3.phase).toBe('page');
  const page = r3;
  expect(text(page)).toContain('the full ORACLE run');
  expect(ids(page)).toEqual(['o7-page-verify', 'o7-page-raw', 'o7-page-aside']);
  const price = once7(page, 'o7-page-verify');
  expect(price.choices['out.page1']).toBe('oracle');
  expect(price.phase).toBe('price');
  expect(text(price)).toContain('A fact for a fact.');
  expect(ids(price)).toEqual(['o7-price-fact', 'o7-price-answer', 'o7-price-debt', 'o7-price-refuse']);
  const dusk = once7(price, 'o7-price-fact');
  expect(dusk.choices['out.price1']).toBe('fact');
  expect(dusk.choices['out.gave-fact']).toBe('yes');
  expect(dusk.phase).toBe('dusk');
  const done = walk7(dusk, ['o7-evening-alone']);
  expect(done.phase).toBe('complete');
  expect(text(done)).toContain('THE SENDER.');
  expect(text(done)).toContain('WHO IS HOLDING THE PAGE?');
  expect(text(done)).toContain('HE TRADED A PERSON ONCE.');
  expect(text(done)).not.toMatch(SEXUAL);
});

it('authenticates on a real golden save routed onto Outside (maximal-trade)', () => {
  const s = onto(complete6('maximal-trade'));
  expect([s.phase, s.choices['route.lane']]).toEqual(['flit', 'outside']);
  const done = walk7(s, ['o7-flit-note', 'o7-room-room', 'o7-rule-verify', 'o7-rule-source', 'o7-rule-door', 'o7-page-verify', 'o7-price-answer', 'o7-evening-alone']);
  expect(done.phase).toBe('complete');
  expect(text(done)).toContain('THE SENDER.');
  expect(text(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('the lie surcharge, the board page, a debt owed, and a chosen night that fades', () => {
  const s = exposeSave({ 'c3.misdirect-rook': 'yes' });
  // give-route flags would change the page; here oracle was taken, so the page is ORACLE; use the give save for the board page instead
  const rules = walk7(giveSave(), ['o7-flit-tape', 'o7-room-room', 'o7-rule-source', 'o7-rule-provenance', 'o7-rule-verify']);
  expect(rules.phase).toBe('page');
  expect(text(rules)).toContain('signed on the Project Eve board');
  expect(rules.choices['out.rules']).toBe('source,provenance,verify');
  expect(text(rules)).toContain('I’ll never send you at a person.');
  const price = once7(rules, 'o7-page-raw');
  expect(price.choices['out.page1']).toBe('board');
  const dusk = once7(price, 'o7-price-debt');
  expect(dusk.choices['out.alliance.rook']).toBe('owed');

  // the lie surcharge shows on the misdirect save's price beat
  const liar = walk7(s, ['o7-flit-nothing', 'o7-room-room', 'o7-rule-verify', 'o7-rule-door', 'o7-rule-source', 'o7-page-verify']);
  expect(text(liar)).toContain('you lied to me once');

  // a chosen night, if a partner from before is on offer
  if (ids(dusk).some((x) => x === 'o7-evening-julian' || x === 'o7-evening-sebastian')) {
    const pt = ids(dusk).includes('o7-evening-julian') ? 'julian' : 'sebastian';
    const room = walk7(dusk, ['o7-evening-' + pt, 'o7-' + pt + '-sex', 'o7-stay']);
    expect(room.facts).toContain('c7.o-evening-consent');
    expect(text(room)).toContain('The scene fades.');
    expect(room.choices['c7.o-evening-outcome']).toBe('intimate-sex');
    expect(text(room)).not.toMatch(SEXUAL);
  }
});

it('the thin page for the doubter, refused at no cost; the skeptic still reaches the card', () => {
  const low = withFlags(giveSave(), { 'c6.rook-proof': 'untested', 'c6.oracle-seen': undefined });
  const page = walk7(low, ['o7-flit-nothing', 'o7-room-hook', 'o7-rule-verify', 'o7-rule-provenance', 'o7-rule-door']);
  expect(text(page)).toContain('a true thing that looks like nothing');
  expect(page.choices['out.page1'] === undefined).toBe(true);
  const price = once7(page, 'o7-page-aside');
  expect(price.choices['out.page1']).toBe('thin');
  const dusk = once7(price, 'o7-price-refuse');
  expect(dusk.choices['out.refused-price']).toBe('yes');
  expect(text(dusk)).toContain('Leave by the river side');
  const done = walk7(dusk, ['o7-evening-alone']);
  expect(text(done)).toContain('I SAID NO AND HE STAYED.');
  expect(text(done)).toContain('WHO IS HOLDING THE PAGE?');
});
