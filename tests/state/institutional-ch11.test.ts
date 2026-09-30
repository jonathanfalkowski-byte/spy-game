import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter14Choices } from '../../src/content/chapter14';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter11Choices } from '../../src/content/chapter11';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids7 = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const once7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids7(s).join(', ') + ')');
  return next;
};
const NEUTRAL7 = ['i7-photo-wait', 'i7-lift-quiet', 'i7-message-delete'];
const c7 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids7(y).includes(id); i++) {
    const n = NEUTRAL7.find((d) => ids7(y).includes(d));
    if (!n) break;
    y = once7(y, n);
  }
  return once7(y, id);
};
const walk7 = (s: GameState, path: string[]) => path.reduce(c7, s);
const complete6 = (name: string) => replay(golden6.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
function onto(s: GameState) {
  const x = c7(s, 'begin');
  if (deriveRoute6(x)?.lane === 'institutional') return c7(x, 'route-confirm');
  if (ids7(x).includes('route-pivot-institutional')) return c7(x, 'route-pivot-institutional');
  return walk7(x, ['route-break', 'confirm-break']);
}

/** Ch7 on real golden saves: the refusal, the record and the backup (protected); her people, the name and the backup
 * (the pivot from outside); her people, the name and the record, with no backup and no refusal. */
const PROTECTED7 = () => walk7(onto(complete6('phone-counter-protect')), ['i7-gate-lift', 'i7-offer-pen', 'i7-scope-refusal', 'i7-scope-record', 'i7-scope-backup', 'i7-benton-cool', 'i7-desk-keep', 'i7-daniel-tie', 'i7-evening-alone']);
const TRADE7 = () => walk7(onto(complete6('maximal-trade')), ['i7-gate-step', 'i7-offer-cost', 'i7-scope-people', 'i7-scope-name', 'i7-scope-backup', 'i7-benton-adrian', 'i7-desk-keep', 'i7-daniel-warm', 'i7-evening-alone']);
const BARE7 = () => walk7(onto(complete6('maximal-trade')), ['i7-gate-step', 'i7-offer-cost', 'i7-scope-people', 'i7-scope-name', 'i7-scope-record', 'i7-benton-silent', 'i7-desk-move', 'i7-daniel-work', 'i7-evening-alone']);

const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const once8 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER8_CHOOSE', id: 'chapter8.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the machine, the green light, the dark): take the neutral pick when it is in the way. */
const NEUTRAL8 = ['i8-machine-cafe', 'i8-light-sleep', 'i8-dark-wait'];
const c8 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
    const n = NEUTRAL8.find((d) => ids(y).includes(d));
    if (!n) break;
    y = once8(y, n);
  }
  return once8(y, id);
};
const walk8 = (s: GameState, path: string[]) => path.reduce(c8, s);
const ch8 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter8.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

/** Ch8 on the neutral picks, three taskings, and a Records choice; then the shared Ch9 bridge on its quiet path. */
function toNine(s7: GameState, ch8: string[]) {
  let s = walk8(s7, ['begin-institutional', 'i8-rota-leave', ...ch8]);
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    const next = act(s, { type: 'CHAPTER9_CHOOSE', id: 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]) } as never);
    if (next === s) throw Error('Chapter 9 stuck at ' + s.phase);
    s = next;
  }
  return s;
}
/** Records with the torch (the empty box found) and the note kept; or intact, in the light. */
const TORCH8 = ['i8-task-debrief', 'i8-debrief-full', 'i8-task-file', 'i8-file-margin', 'i8-task-report', 'i8-report-silent', 'i8-dark-torch', 'i8-file-note', 'i8-car-ask', 'i8-evening-daniel', 'i8-daniel-tell'];
const PLAIN8 = ['i8-task-debrief', 'i8-debrief-full', 'i8-task-compliance', 'i8-compliance-page', 'i8-task-report', 'i8-report-tell', 'i8-file-intact', 'i8-car-out', 'i8-evening-alone'];

const ids14 = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
const once14 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids14(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the office, the eve, the corridor): take the neutral pick when it is in the way. */
const NEUTRAL14 = ['i14-office-door', 'i14-eve-sleep', 'i14-corridor-walk'];
const c14 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids14(y).includes(id); i++) {
    const d = NEUTRAL14.find((x) => ids14(y).includes(x));
    if (!d) break;
    y = once14(y, d);
  }
  return once14(y, id);
};
const walk14 = (s: GameState, path: string[]) => path.reduce(c14, s);
const ch14 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

/** Ch8 with Benton's errand handed to Sloane (so Celeste has seen a doctored log). */
const BENTON8 = ['i8-task-benton', 'i8-benton-sloane', 'i8-task-debrief', 'i8-debrief-full', 'i8-task-report', 'i8-report-tell', 'i8-file-copy', 'i8-car-ask', 'i8-evening-alone'];

const ids10 = (s: GameState) => chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
const once10 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER10_CHOOSE', id: 'chapter10.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids10(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the dress, Daniel with page seven, the orchid): take the neutral pick when it is in the way. */
const NEUTRAL10 = ['i10-dress-black', 'i10-daniel-nothing', 'i10-orchid-bin'];
const c10 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids10(y).includes(id); i++) {
    const d = NEUTRAL10.find((x) => ids10(y).includes(x));
    if (!d) break;
    y = once10(y, d);
  }
  return once10(y, id);
};
const walk10 = (s: GameState, path: string[]) => path.reduce(c10, s);
const ch10 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter10.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

/** Ch10 paths to its end: give (reported), doctor (shown to Sloane first), refuse (Celeste at the gate). */
const GIVE10 = ['begin-institutional', 'i10-card-go', 'i10-adrian-composed', 'i10-log-give', 'i10-pages-report', 'i10-night-alone'];
const DOCTOR10 = ['begin-institutional', 'i10-card-sloane', 'i10-adrian-ask', 'i10-log-doctor', 'i10-pages-work', 'i10-night-alone'];
const REFUSE10 = ['begin-institutional', 'i10-card-gate', 'i10-adrian-walk', 'i10-log-refuse', 'i10-pages-old', 'i10-night-alone'];
const toEleven = (s9: GameState, ch10: string[]) => walk10(s9, ch10);

const ids11 = (s: GameState) => chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
const once11 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER11_CHOOSE', id: 'chapter11.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids11(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the car, the dance, the cloakroom): take the neutral pick when it is in the way. */
const NEUTRAL11 = ['i11-car-window', 'i11-dance-decline', 'i11-cloak-go'];
const c11 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids11(y).includes(id); i++) {
    const d = NEUTRAL11.find((x) => ids11(y).includes(x));
    if (!d) break;
    y = once11(y, d);
  }
  return once11(y, id);
};
const walk11 = (s: GameState, path: string[]) => path.reduce(c11, s);
const ch11 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter11.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

it('enters The Receipt from an Institutional Chapter 10: Axiom’s car, Sloane in black, the shop', () => {
  const s = toEleven(toNine(PROTECTED7(), TORCH8), GIVE10);
  expect(`${s.scene}.${s.phase}`).toBe('chapter10.complete');
  expect(ids11(s)).toEqual(['begin-institutional']);
  expect(ids14(s)).toEqual([]);
  const threshold = c11(s, 'begin-institutional');
  expect(threshold.phase).toBe('threshold');
  expect(ch11(threshold)).toContain('Like an officer at a party. Don’t.');
  expect(ids11(threshold)).toEqual(['i11-car-why', 'i11-car-well', 'i11-car-window']);
  const vesper = c11(threshold, 'i11-car-why');
  expect(ch11(vesper)).toContain('invited to a funeral and hasn’t been told whose');
  expect(ch11(vesper)).toContain('Victoria. At last. Three years, and you never once came to see the shop.');
  expect(ch11(vesper)).toContain('Fridays have never been so restful.');
  expect(ids11(vesper)).toEqual(['i11-room-beside', 'i11-room-work', 'i11-room-watch']);
});

it('bring it: Iris warned, the page seen, 9C countersigned; Daniel; on to Ch14, which remembers; it authenticates', () => {
  const catalogue = walk11(toEleven(toNine(PROTECTED7(), TORCH8), GIVE10), ['begin-institutional', 'i11-room-beside']);
  expect(ch11(catalogue)).toContain('Thank you.');
  expect(ids11(catalogue)).toEqual(['i11-dance-accept', 'i11-dance-decline']);
  expect(ch11(c11(catalogue, 'i11-dance-decline'))).toContain('They put you on the list too.');
  expect(ids11(c11(catalogue, 'i11-dance-decline'))).toEqual(['i11-iris-warned', 'i11-iris-told', 'i11-iris-quiet']);
  const book = c11(catalogue, 'i11-iris-warned');
  expect(ch11(book)).toContain('E. V. (II) · AXIOM · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH.');
  const receipt = c11(book, 'i11-book-seen');
  expect(ch11(receipt)).toContain('Available for placement. Axiom didn’t authorise that.');
  expect(ch11(receipt)).toContain('CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE.');
  expect(ch11(receipt)).toContain('Priya.');
  expect(ids11(receipt)).toEqual(['i11-pen-bring', 'i11-pen-warn', 'i11-pen-refuse']);
  const sign = c11(receipt, 'i11-pen-bring');
  expect(sign.facts).toContain('c11.i-9c');
  expect(ch11(sign)).toContain('V. SLOANE, OFFICER OF RECORD');
  expect(ch11(sign)).toContain('Iris Moreau is there before you, in a long grey coat');
  expect(ids11(sign)).toEqual(['i11-cloak-number', 'i11-cloak-coat', 'i11-cloak-go']);
  const ride = walk11(sign, ['i11-cloak-number', 'i11-ride-shop']);
  expect(ch11(ride)).toContain('If you ever need out. Any hour. It answers.');
  expect(ch11(ride)).toContain('And you were in the window.');
  expect(ch11(ride)).toContain('Singapore wants you next month.');
  const done = walk11(ride, ['i11-night-daniel', 'i11-daniel-sex', 'i11-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter11.complete');
  expect(done.facts).toContain('c11.i-evening-consent');
  expect(ch11(done)).toContain('9C · PRIYA. SIGNED. HER NAME, MY HAND.');
  expect(ch11(done)).toContain('SINGAPORE. HER CITY.');
  expect(ch11(done)).toContain('IRIS HAS MY NUMBER.');
  expect(ch11(done)).not.toMatch(SEXUAL);
  expect(ids14(done)).toEqual(['begin-institutional']);
  const confession = walk14(done, ['begin-institutional', 'i14-notice-screen']);
  expect(text(confession)).toContain('[Chapters 12–13 · institutional road — in development]');
  expect(ch14(confession)).toContain('And I signed 9C. In her house. Because you brought it.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('warn her: work the room, Iris told, the book closed, “Not tonight.”', () => {
  const done = walk11(toEleven(toNine(TRADE7(), BENTON8), DOCTOR10), ['begin-institutional', 'i11-room-work', 'i11-iris-told', 'i11-book-closed', 'i11-pen-warn', 'i11-ride-singapore', 'i11-night-daniel']);
  expect([done.choices['inst.pen11'], done.choices['inst.iris11'], done.choices['inst.book11'], done.choices['inst.room11']]).toEqual(['warned', 'told', 'closed', 'work']);
  expect(ch11(done)).toContain('Poor Elias stood in a corridor for forty minutes.');
  expect(ch11(done)).toContain('the autumn collection is in the anteroom');
  expect(ch11(done)).toContain('On the books. God. How honest of them.');
  expect(ch11(done)).toContain('Not tonight. Axiom doesn’t sign for deliveries at parties.');
  expect(ch11(done)).toContain('How did you know about Singapore?');
  expect(ch11(done)).toContain('9C · PRIYA. NOT TONIGHT.');
});

it('refuse: the page turned to Iris’s, Benton brings the folder, Sloane won’t sign, the letter goes Monday', () => {
  const done = walk11(toEleven(toNine(TRADE7(), PLAIN8), REFUSE10), ['begin-institutional', 'i11-room-watch', 'i11-iris-quiet', 'i11-book-turned', 'i11-pen-refuse', 'i11-ride-party', 'i11-night-alone']);
  expect(done.choices['inst.pen11']).toBe('refused');
  expect(ch11(done)).toContain('Pity about your budget, Victoria.');
  expect(ch11(done)).toContain('I. M. · HALVORSEN · FOUR YEARS · ENDING.');
  expect(ch11(done)).toContain('Not for you, Elias. Not tonight. Not ever, I think.');
  expect(ch11(done)).toContain('regretting certain irregularities');
  expect(ch11(done)).toContain('9C · PRIYA. REFUSED. THE LETTER GOES MONDAY.');
});

it('deepening: “Thank you.” in the car, the dance, Iris’s coat', () => {
  const done = walk11(toEleven(toNine(TRADE7(), PLAIN8), GIVE10), ['begin-institutional', 'i11-car-well', 'i11-room-watch', 'i11-dance-accept', 'i11-iris-quiet', 'i11-book-closed', 'i11-pen-warn', 'i11-cloak-coat', 'i11-ride-party', 'i11-night-alone']);
  expect(['i-car', 'i-dance', 'i-cloak'].map((k) => done.choices['c11.' + k])).toEqual(['well', 'accept', 'coat']);
  expect(ch11(done)).toContain('You look well. In black. I’m saying it anyway.');
  expect(ch11(done)).toContain('the good ones are extended');
  expect(ch11(done)).toContain('a single word: “Singapore.”');
  expect(ch11(done)).not.toContain('IRIS HAS MY NUMBER.');
});
