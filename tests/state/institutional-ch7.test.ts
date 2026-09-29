import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter9Choices } from '../../src/content/chapter9';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { settle6, text, toProof, walk } from '../chapter6-helpers';

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
/** The deepening pass's moments (the photograph, the lift, the message): take the neutral pick when it is in the way. */
const NEUTRAL7 = ['i7-photo-wait', 'i7-lift-quiet', 'i7-message-delete'];
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
const withFlags = (s: GameState, flags: Record<string, string>) => {
  const x = structuredClone(s);
  Object.assign(x.choices, flags);
  return x;
};
const complete6 = (name: string) => replay(golden6.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

/** Onto the Institutional road from a finished Chapter 6: confirmed when it is the suggestion, a pivot when it is next
 * door, and the hard turn when it is the opposite road. */
function onto(s: GameState) {
  const x = c7(s, 'begin');
  if (deriveRoute6(x)?.lane === 'institutional') return c7(x, 'route-confirm');
  if (ids(x).includes('route-pivot-institutional')) return c7(x, 'route-pivot-institutional');
  return walk7(x, ['route-break', 'confirm-break']);
}
/** A real save that challenged Sloane with the ORACLE assessment at the end of Chapter 6. */
function challenged() {
  const s = walk(settle6(walk(toProof({ verified: true, flags: { 'c5.message-sloane': 'yes' } }), ['proof-open', 'proof-view'])), ['verify-compare', 'celeste-let-be', 'oracle-take', 'counterpower-decide', 'resolve-challenge']);
  return onto(s);
}
/** A real golden save (Chapter 6 on the monitored phone, the protection accepted). */
const protectedSave = () => onto(complete6('phone-counter-protect'));

it('enters Level 71 from the confirm beat: the staff entrance, Terry, and Sloane at the window', () => {
  const s = onto(complete6('maximal-trade'));
  expect([s.phase, s.choices['route.lane']]).toEqual(['gate', 'institutional']);
  expect(text(s)).toContain('EVELYN VALE. VISITOR · LEVEL 71 · ESCORTED.');
  expect(text(s)).toContain('Morning, madam. Lifts on your left. Mind the step.');
  expect(ids(s)).toEqual(['i7-gate-step', 'i7-gate-team', 'i7-gate-lift']);
  const window = c7(s, 'i7-gate-team');
  expect(window.phase).toBe('window');
  expect(text(window)).toContain('Lost two–one. Robbed.');
  expect(text(window)).toContain('You came to me. People don’t, usually.');
  expect(text(window)).toContain('We don’t watch that. I’m not that kind of officer, and neither will you be.');
  expect(text(window)).toContain('a woman of thirty-one in an ivory jacket');
  expect(ids(window)).toEqual(['i7-photo-ask', 'i7-photo-window', 'i7-photo-wait']);
  expect(ids(c7(window, 'i7-photo-wait'))).toEqual(['i7-offer-cost', 'i7-offer-above', 'i7-offer-pen']);
});

it('challenged: the ORACLE opening, three scope terms, “development feedback”, Adrian’s desk, the tie; it authenticates', () => {
  const window = c7(challenged(), 'i7-gate-step');
  expect(window.choices['c6.resolve-action']).toBe('resolve-challenge');
  expect(text(window)).toContain('It says I can’t hold you.');
  const scope = c7(window, 'i7-offer-pen');
  expect(text(scope)).toContain('SCOPE OF TASKING');
  expect(ids(scope)).toEqual(['i7-scope-refusal', 'i7-scope-record', 'i7-scope-name', 'i7-scope-backup', 'i7-scope-people']);
  const crossing = walk7(scope, ['i7-scope-refusal', 'i7-scope-record', 'i7-scope-name']);
  expect(crossing.phase).toBe('crossing');
  expect(crossing.facts).toContain('c7.i-contract');
  expect(text(crossing)).toContain('Once per tasking. Not once per career.');
  expect(text(crossing)).toContain('I can seal it. I can’t unread it for him.');
  expect(ids(crossing)).toEqual(['i7-lift-why', 'i7-lift-look', 'i7-lift-quiet']);
  const benton = c7(crossing, 'i7-lift-why');
  expect(text(benton)).toContain('Because you’d have walked in anyway.');
  expect(text(benton)).toContain('Ms Vale. I believe we’ve met.');
  const desk = c7(benton, 'i7-benton-adrian');
  expect(desk.choices['inst.benton']).toBe('adrian');
  expect(text(desk)).toContain('Is this development feedback, Elias?');
  expect(text(desk)).toContain('It is Adrian’s desk.');
  expect(ids(desk)).toEqual(['i7-desk-keep', 'i7-desk-move']);
  const daniel = c7(desk, 'i7-desk-keep');
  expect(text(daniel)).toContain('The last person at that desk read everything. No pressure.');
  expect(ids(daniel)).toEqual(['i7-daniel-warm', 'i7-daniel-tie', 'i7-daniel-work']);
  const watched = c7(daniel, 'i7-daniel-tie');
  expect(text(watched)).toContain('Someone used to say that to me. Exactly that.');
  expect(text(watched)).toContain('The file number is AX-7A.');
  expect(text(watched)).toContain('Welcome home, 7A.');
  expect(ids(watched)).toEqual(['i7-message-reply', 'i7-message-sloane', 'i7-message-delete']);
  const done = walk7(watched, ['i7-message-sloane', 'i7-evening-daniel']);
  expect(text(done)).toContain('Not us. Leave it with me.');
  expect(text(done)).toContain('WELCOME HOME, 7A. NOT US.');
  expect(`${done.scene}.${done.phase}`).toBe('chapter7.complete');
  expect(text(done)).toContain('he is going to know whose mouth it is first');
  expect(text(done)).toContain('VICTORIA SLOANE. HANDLER. AX-7A.');
  expect(text(done)).toContain('WHO IS WATCHING HER?');
  expect(text(done)).toContain('BENTON KNOWS.');
  expect(text(done)).not.toContain('route — in development');
  expect(ids(done)).toEqual([]);
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  expect(text(done)).not.toMatch(SEXUAL);
});

it('protected: the off-the-books opening, backup and her people, Sloane answers Benton, another desk, a night alone', () => {
  const window = c7(protectedSave(), 'i7-gate-lift');
  expect([window.choices['c6.resolve-action'], window.choices['route.entry']]).toEqual(['resolve-protect', 'unbuilt']);
  expect(text(window)).toContain('I would like to stop doing it off the books.');
  const done = walk7(window, ['i7-offer-above', 'i7-scope-backup', 'i7-scope-people', 'i7-scope-record', 'i7-benton-silent', 'i7-desk-move', 'i7-daniel-warm', 'i7-evening-alone']);
  expect(['backup', 'people', 'record', 'refusal'].map((k) => done.choices['inst.scope.' + k])).toEqual(['yes', 'yes', 'yes', undefined]);
  expect(text(done)).toContain('Above the client, people I don’t meet.');
  expect(text(done)).toContain('Define “loves”.');
  expect(text(done)).toContain('Ms Vale is mine, Elias.');
  expect(text(done)).toContain('Fair.');
  expect(text(done)).toContain('behind the fire procedures');
  expect(text(done)).toContain('electrician’s tape');
  expect(done.choices['inst.desk']).toBe('move');
  expect(text(done)).not.toContain('BENTON KNOWS.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('the evening with a partner from before is chosen, scoped, and stopped when she says stop', () => {
  const watched = walk7(onto(complete6('maximal-trade')), ['i7-gate-step', 'i7-offer-cost', 'i7-scope-refusal', 'i7-scope-name', 'i7-scope-backup', 'i7-benton-cool', 'i7-desk-keep', 'i7-daniel-work', 'i7-message-delete']);
  expect(ids(watched)).toContain('i7-evening-julian');
  const warm = withFlags(watched, { 'c6.maya': 'restored' });
  expect(ids(warm).slice(0, 3)).toEqual(['i7-evening-daniel', 'i7-evening-maya', 'i7-evening-julian']);
  expect(ids(warm).at(-1)).toBe('i7-evening-alone');
  const invited = c7(warm, 'i7-evening-julian');
  expect(text(invited)).toContain('a building Axiom does not own');
  expect(ids(invited)).toEqual(['i7-julian-no-sex', 'i7-julian-sex', 'i7-leave']);
  const scoped = c7(invited, 'i7-julian-sex');
  expect(scoped.facts).toContain('c7.i-evening-consent');
  expect(ids(scoped)).toEqual(['i7-stop', 'i7-stay']);
  const stopped = c7(scoped, 'i7-stop');
  expect([stopped.phase, stopped.choices['c7.i-evening-outcome']]).toEqual(['complete', 'withdrawn']);
  const stayed = c7(scoped, 'i7-stay');
  expect(text(stayed)).toContain('Nobody is watching this one. The scene fades.');
  expect(text(stayed)).toContain('It does not know where you have been.');
  const maya = c7(warm, 'i7-evening-maya');
  expect(text(maya)).toContain('Then you’ve got a friend in compliance.');
});

it('deepening: who she was, the look in the lift, and a question nobody answers', () => {
  const done = walk7(onto(complete6('maximal-trade')), ['i7-gate-step', 'i7-photo-ask', 'i7-offer-pen', 'i7-scope-refusal', 'i7-scope-name', 'i7-scope-backup', 'i7-lift-look', 'i7-benton-cool', 'i7-desk-keep', 'i7-daniel-warm', 'i7-message-reply', 'i7-evening-alone']);
  expect(['i-photo', 'i-lift', 'i-message'].map((k) => done.choices['c7.' + k])).toEqual(['ask', 'look', 'reply']);
  expect(text(done)).toContain('Someone the vendor told us was retired.');
  expect(text(done)).toContain('because nothing did');
  expect(text(done)).toContain('Two grey ticks. Then two blue ones.');
  expect(text(done)).toContain('WELCOME HOME, 7A. WHO?');
  expect(text(done)).not.toMatch(SEXUAL);
  const glass = walk7(onto(complete6('maximal-trade')), ['i7-gate-lift', 'i7-photo-window']);
  expect(text(glass)).toContain('it is Sloane who turns away first');
});
