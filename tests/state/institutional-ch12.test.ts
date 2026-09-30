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
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c12 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER12_CHOOSE', id: 'chapter12.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids12(s).join(', ') + ')');
  return next;
};
const walk12 = (s: GameState, path: string[]) => path.reduce(c12, s);
const ch12 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter12.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

it('enters Her City from an Institutional Chapter 11: the tasking in Sloane’s capitals, Changi, the black phone', () => {
  const s = toTwelve(toEleven(toNine(PROTECTED7(), TORCH8), GIVE10), BRING11);
  expect(`${s.scene}.${s.phase}`).toBe('chapter11.complete');
  expect(ids12(s)).toEqual(['begin-institutional']);
  expect(ids14(s)).toEqual([]);
  const wheels = c12(s, 'begin-institutional');
  expect(ch12(wheels)).toContain('SINGAPORE · SITE SG/EH-9 · ESTABLISH WHAT BECAME OF E.V. (I) · BACKUP: V.S. · THE FULLERTON, ROOM 811.');
  expect(ch12(wheels)).toContain('Welcome home, darling. Do give my love to Mrs Tan.');
  expect(ids12(wheels)).toEqual(['i12-cover-axiom', 'i12-cover-taxi', 'i12-cover-mrt']);
});

it('all of it: on the books, the warrant card, Ashby, Nora told the truth, the report in full; Ch14 remembers; it authenticates', () => {
  const landing = walk12(toTwelve(toEleven(toNine(PROTECTED7(), TORCH8), GIVE10), BRING11), ['begin-institutional', 'i12-cover-axiom']);
  expect(ch12(landing)).toContain('Evie! Evie. Aiyoh, look at you. So thin.');
  const site = c12(landing, 'i12-tan-truth');
  expect(ch12(site)).toContain('No. You stand wrong.');
  expect(ids12(site)).toEqual(['i12-search-desk', 'i12-search-wardrobe', 'i12-search-balcony']);
  const caretaker = c12(site, 'i12-search-desk');
  expect(caretaker.facts).toContain('c12.i-schedule');
  expect(ids12(caretaker)).toEqual(['i12-caretaker-hide', 'i12-caretaker-card', 'i12-caretaker-who']);
  const bar = c12(caretaker, 'i12-caretaker-card');
  expect(ch12(bar)).toContain('Axiom. Routine inspection.');
  expect(ch12(bar)).toContain('It works horribly well.');
  const village = c12(bar, 'i12-ashby-bar');
  expect(village.facts).toContain('c12.i-ashby');
  expect(ch12(village)).toContain('They’ve sent the reissue to audit the original.');
  expect(ch12(village)).toContain('The original was never theirs.');
  const report = c12(village, 'i12-nora-truth');
  expect(report.choices['act3.nell']).toBe('known');
  expect(ch12(report)).toContain('She walked like our father. You don’t.');
  expect(ch12(report)).toContain('The tall one, with the beautiful voice.');
  expect(ids12(report)).toEqual(['i12-report-all', 'i12-report-shaded', 'i12-report-site']);
  const wall = c12(report, 'i12-report-all');
  expect(ch12(wall)).toContain('She knows that voice. So do you.');
  expect(ids12(wall)).toContain('i12-wall-daniel');
  const done = c12(wall, 'i12-wall-daniel');
  expect(`${done.scene}.${done.phase}`).toBe('chapter12.complete');
  expect(ch12(done)).toContain('Talk to me about the coffee machine.');
  expect(ch12(done)).toContain('REPORT: ALL OF IT.');
  expect(ch12(done)).toContain('Nell on the harbour wall, laughing, in flat shoes.');
  expect(ch12(done)).not.toMatch(SEXUAL);
  expect(ids14(done)).toEqual(['begin-institutional']);
  const confession = walk14(done, ['begin-institutional', 'i14-notice-screen']);
  expect(text(confession)).toContain('[Chapter 13 · institutional road — in development]');
  expect(ch14(confession)).toContain('And you gave me Nell, in room 811.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('shaded: off the books, hide, be Nell, the kind lie; Nora kept out of the report', () => {
  const done = walk12(toTwelve(toEleven(toNine(TRADE7(), BENTON8), DOCTOR10), WARN11), ['begin-institutional', 'i12-cover-taxi', 'i12-tan-evie', 'i12-search-wardrobe', 'i12-caretaker-hide', 'i12-ashby-nell', 'i12-nora-kind', 'i12-report-shaded', 'i12-wall-name']);
  expect([done.choices['inst.cover12'], done.choices['inst.report12'], done.choices['inst.nora12']]).toEqual(['taxi', 'shaded', 'kind']);
  expect(ch12(done)).toContain('Nobody will log this.');
  expect(ch12(done)).toContain('a boarding pass to Penang, unused');
  expect(ch12(done)).toContain('Her people. As written. I won’t ask.');
  expect(ch12(done)).toContain('Eleanor. Eleanor Linden.');
  expect(ch12(done)).toContain('REPORT: SHADED. NORA IS MINE.');
  expect(ids12(done)).toEqual([]);
});

it('the site only: the MRT, "Who pays you?", the reissue, the wrong house, a thin report', () => {
  const done = walk12(toTwelve(toEleven(toNine(TRADE7(), PLAIN8), REFUSE10), WARN11), ['begin-institutional', 'i12-cover-mrt', 'i12-tan-listen', 'i12-search-balcony', 'i12-caretaker-who', 'i12-ashby-reissue', 'i12-nora-go', 'i12-report-site', 'i12-wall-stand']);
  expect(done.choices['act3.nell']).toBeUndefined();
  expect(ch12(done)).toContain('a white orchid on a sill, turned toward this flat');
  expect(ch12(done)).toContain('The number on the back of your hand rang an agency');
  expect(ch12(done)).toContain('She’d have hated you. Then she’d have liked you.');
  expect(ch12(done)).toContain('watching you go in her sister’s body');
  expect(ch12(done)).toContain('That’s a very thin week, Ms Vale.');
  expect(ch12(done)).toContain('REPORT: THE SITE ONLY. THE REST IS MINE.');
  expect(ch12(done)).not.toContain('i12-wall-daniel');
});
