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
import { chapter12Choices } from '../../src/content/chapter12';
import { chapter13Choices, fadeCoercion13 } from '../../src/content/chapter13';
import { chapter15Choices } from '../../src/content/chapter15';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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

/** Ch11 to its end: bring (the page seen), warn, refuse. */
const BRING11 = ['begin-institutional', 'i11-room-beside', 'i11-iris-warned', 'i11-book-seen', 'i11-pen-bring', 'i11-ride-shop', 'i11-night-alone'];
const WARN11 = ['begin-institutional', 'i11-room-work', 'i11-iris-told', 'i11-book-closed', 'i11-pen-warn', 'i11-ride-singapore', 'i11-night-alone'];
const toTwelve = (s10: GameState, ch11: string[]) => walk11(s10, ch11);

const ids12 = (s: GameState) => chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
const once12 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER12_CHOOSE', id: 'chapter12.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids12(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the hawker centre, the morning, the minibar): take the neutral pick when it is in the way. */
const NEUTRAL12 = ['i12-hawker-alone', 'i12-morning-desk', 'i12-minibar-water'];
const c12 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids12(y).includes(id); i++) {
    const d = NEUTRAL12.find((x) => ids12(y).includes(x));
    if (!d) break;
    y = once12(y, d);
  }
  return once12(y, id);
};
const walk12 = (s: GameState, path: string[]) => path.reduce(c12, s);
const ch12 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter12.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

/** Ch12 to its end: the full report, or the site only. */
const ALL12 = ['begin-institutional', 'i12-cover-axiom', 'i12-tan-truth', 'i12-search-desk', 'i12-caretaker-card', 'i12-ashby-bar', 'i12-nora-truth', 'i12-report-all', 'i12-wall-stand'];
const SITE12 = ['begin-institutional', 'i12-cover-mrt', 'i12-tan-listen', 'i12-search-balcony', 'i12-caretaker-hide', 'i12-ashby-reissue', 'i12-nora-go', 'i12-report-site', 'i12-wall-stand'];
const toThirteen = (s11: GameState, ch12: string[]) => walk12(s11, ch12);
/** Refusal term, record, backup; Daniel told; Iris warned (so the swap is open). */
const PROT12 = () => toThirteen(toTwelve(toEleven(toNine(PROTECTED7(), TORCH8), GIVE10), BRING11), ALL12);
/** Her people, name, backup; a Records copy (so the turn is open); Iris told only. */
const TRADE12 = () => toThirteen(toTwelve(toEleven(toNine(TRADE7(), BENTON8), DOCTOR10), WARN11), SITE12);

const ids13 = (s: GameState) => chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
const once13 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER13_CHOOSE', id: 'chapter13.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids13(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (the café, Wednesday evening, two in the morning): take the neutral pick when it is in the way. */
const NEUTRAL13 = ['i13-cafe-leave', 'i13-eve-window', 'i13-small-sit', 'i13-small-wait', 'i13-small-iris'];
const c13 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids13(y).includes(id); i++) {
    const d = NEUTRAL13.find((x) => ids13(y).includes(x));
    if (!d) break;
    y = once13(y, d);
  }
  return once13(y, id);
};
const walk13 = (s: GameState, path: string[]) => path.reduce(c13, s);
const ch13 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter13.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
/** Words that must never appear on the comply path (CONTENT_DIRECTION §2). */
const BEHIND_THE_DOOR = /\b(undress\w*|naked|nude|kiss\w*|moan\w*|skin|breast\w*|thigh\w*)\b/i;

/** Ch13 and Ch14 paths to Ch14's end. */
const COMPLY13 = ['begin-institutional', 'i13-tasking-on', 'i13-dread-alone', 'i13-channel-sloane', 'i13-reply-comply', 'i13-door-away', 'i13-recover-wall', 'i13-weekend-card'];
const TURN13 = ['begin-institutional', 'i13-tasking-on', 'i13-dread-alone', 'i13-channel-nobody', 'i13-reply-turn', 'i13-corridor-on', 'i13-weekend-card'];
const REFUSE13 = ['begin-institutional', 'i13-tasking-on', 'i13-dread-alone', 'i13-channel-benton', 'i13-reply-refuse', 'i13-corridor-on', 'i13-weekend-card'];
const ALLY14 = ['begin-institutional', 'i14-notice-screen', 'i14-sloane-hear', 'i14-wire-no', 'i14-maya-on', 'i14-way-ally', 'i14-evening-alone'];
const CUT14 = ['begin-institutional', 'i14-notice-screen', 'i14-sloane-shut', 'i14-wire-yes', 'i14-maya-nothing', 'i14-way-cut', 'i14-evening-alone'];
const PROOF14 = ['begin-institutional', 'i14-notice-screen', 'i14-sloane-shut', 'i14-wire-no', 'i14-maya-on', 'i14-way-proof', 'i14-evening-alone'];
const toFifteen = (s12: GameState, ch13: string[], ch14: string[]) => walk14(walk13(s12, ch13), ch14);

const ids15 = (s: GameState) => chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
const c15 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids15(s).join(', ') + ')');
  return next;
};
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);
const ch15 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter15.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

it('enters The Audit from an Institutional Chapter 14; Ch14 no longer says Act IV is in development', () => {
  const s = toFifteen(PROT12(), COMPLY13, ALLY14);
  expect(`${s.scene}.${s.phase}`).toBe('chapter14.complete');
  expect(text(s)).not.toContain('[Chapters 15–18 · institutional road — in development]');
  expect(ids15(s)).toEqual(['begin-institutional']);
  const warrant = c15(s, 'begin-institutional');
  expect(ch15(warrant)).toContain('clause 22');
  expect(ch15(warrant)).toContain('“Reasonable notice,” she says, “is twenty-four hours. I gave them twenty-three.”');
  expect(ids15(warrant)).toEqual(['i15-crew-sloane', 'i15-crew-daniel', 'i15-crew-iris', 'i15-crew-maya', 'i15-crew-none']);
});

it('the audit, with Sloane and Daniel: clause 22, 9C torn up, Adrian’s file, Sloane on the record; it authenticates', () => {
  const crew = walk15(toFifteen(PROT12(), COMPLY13, ALLY14), ['begin-institutional', 'i15-crew-sloane']);
  expect(ch15(crew)).toContain('I have wanted to see inside that room for three years.');
  expect(ids15(crew)).toContain('i15-crew-done');
  const audit = c15(crew, 'i15-crew-daniel');
  expect(audit.choices['inst.crew15']).toBe('sloane,daniel');
  expect(ids15(audit)).toEqual(['i15-way-audit', 'i15-way-stair', 'i15-way-invited']);
  const snag = c15(audit, 'i15-way-audit');
  expect(ch15(snag)).toContain('CLIENT AUDIT UNDER CLAUSE 22');
  const cabinets = c15(snag, 'i15-snag-talk');
  expect(ch15(cabinets)).toContain('Axiom, auditing me. Victoria must be feeling better.');
  expect(ch15(cabinets)).toContain('CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE · DELIVERY: THE FIRST THURSDAY AFTER NEXT · COUNTERSIGNED: V. SLOANE');
  expect(ids15(cabinets)).toEqual(['i15-priya-tear', 'i15-priya-keep', 'i15-priya-give']);
  const more = c15(cabinets, 'i15-priya-tear');
  expect(more.facts).toContain('c15.i-client');
  expect(ids15(more)).toEqual(['i15-took-adrian', 'i15-took-cards', 'i15-took-nell']);
  const after = c15(more, 'i15-took-adrian');
  expect(ch15(after)).not.toContain('Maya’s warning');
  expect(ch15(after)).toContain('Victoria Sloane, Daniel Kessler');
  expect(ids15(after)).toEqual(['i15-cost-ally', 'i15-cost-badge', 'i15-cost-money', 'i15-cost-sloane']);
  const eve = c15(after, 'i15-cost-sloane');
  expect([eve.choices['act3.leash'], eve.choices['c15.cost'], eve.choices['c15.cost-who']]).toEqual(['broken', 'relationship', 'sloane']);
  expect(eve.choices['act3.switch']).toContain('sloane');
  expect(ch15(eve)).toContain('It turns out to have been you.');
  expect(ch15(eve)).toContain('I shall be there as myself.');
  const done = walk15(eve, ['i15-phone-river', 'i15-night-daniel', 'i15-daniel-no-sex', 'i15-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter15.complete');
  expect(done.choices['act3.black-phone']).toBe('river');
  expect(ch15(done)).toContain('four pieces of a receipt');
  expect(ch15(done)).toContain('THE BOARD MEETS.');
  expect(ch15(done)).toContain('[Chapters 16–18 · institutional road — in development]');
  expect(ch15(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('Benton’s escort, with Marsh outside: 9C kept, the 1109 safe, Marsh goes public early', () => {
  const done = walk15(toFifteen(TRADE12(), TURN13, CUT14), ['begin-institutional', 'i15-crew-marsh', 'i15-crew-done', 'i15-way-escort', 'i15-snag-bold', 'i15-priya-keep', 'i15-took-cards', 'i15-cost-ally', 'i15-phone-keep', 'i15-night-alone']);
  expect([done.choices['inst.way15'], done.choices['inst.took15'], done.choices['c15.cost'], done.choices['c15.cost-who']]).toEqual(['escort', 'cards', 'ally', 'marsh']);
  expect(ch15(done)).toContain('Take what the contract allows, Ms Vale.');
  expect(ch15(done)).toContain('making a small note on his slate each time');
  expect(ch15(done)).toContain('COUNTERSIGNATURE PENDING');
  expect(ch15(done)).toContain('They can’t un-read it.');
  expect(ch15(done)).toContain('a receipt for a woman who sits by the far window');
});

it('after the proof, with no authority: by invitation, Priya told, Nell’s order, the badge handed in', () => {
  const s = toFifteen(PROT12(), REFUSE13, PROOF14);
  const audit = walk15(s, ['begin-institutional', 'i15-crew-none']);
  expect(ch15(audit)).toContain('no badge that opens anything');
  expect(ids15(audit)).toEqual(['i15-way-stair', 'i15-way-invited']);
  const done = walk15(audit, ['i15-way-invited', 'i15-snag-hide', 'i15-priya-give', 'i15-took-nell', 'i15-cost-badge', 'i15-phone-return', 'i15-night-alone']);
  expect(ch15(done)).toContain('Ask me again next week whether I mean it.');
  expect(ch15(done)).toContain('one initial. C.');
  expect(ch15(done)).toContain('Mind the step, madam.');
  expect(ch15(done)).toContain('THANK YOU. I THINK. — P.');
  expect(ch15(done)).toContain('Maya’s warning: withdrawn by Wednesday');

  expect(done.choices['c15.cost']).toBe('visibility');
});
