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
import { chapter16Choices } from '../../src/content/chapter16';
import { chapter17Choices } from '../../src/content/chapter17';
import { chapter18Choices } from '../../src/content/chapter18';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const once15 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids15(s).join(', ') + ')');
  return next;
};
/** The deepening pass's moments (Monday night, her page, Friday's orchid): take the neutral pick when it is in the way. */
const NEUTRAL15 = ['i15-mon-sleep', 'i15-page-tear', 'i15-orchid-sill'];
const c15 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids15(y).includes(id); i++) {
    const d = NEUTRAL15.find((x) => ids15(y).includes(x));
    if (!d) break;
    y = once15(y, d);
  }
  return once15(y, id);
};
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);
const ch15 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter15.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

/** Ch15 paths to Ch15's end (the deepening's neutral picks are taken by c15). */
const A15 = ['begin-institutional', 'i15-crew-sloane', 'i15-crew-daniel', 'i15-way-audit', 'i15-snag-talk', 'i15-priya-keep', 'i15-took-nell', 'i15-cost-money', 'i15-phone-keep', 'i15-night-daniel', 'i15-daniel-sex', 'i15-stay'];
const B15 = ['begin-institutional', 'i15-crew-marsh', 'i15-crew-done', 'i15-way-escort', 'i15-snag-bold', 'i15-priya-tear', 'i15-took-cards', 'i15-cost-badge', 'i15-phone-keep', 'i15-night-alone'];
const C15 = ['begin-institutional', 'i15-crew-none', 'i15-way-invited', 'i15-snag-hide', 'i15-priya-give', 'i15-took-nell', 'i15-cost-badge', 'i15-phone-return', 'i15-night-alone'];
const toAct4 = (s12: GameState, ch13: string[], ch14: string[], ch15: string[]) => walk15(toFifteen(s12, ch13, ch14), ch15);

const NEUTRAL = ['i16-dawn-quiet', 'i16-reply-pin', 'i16-leave-go', 'i17-card-leave', 'i17-recess-table', 'i17-minute-leave', 'i18-letter-file', 'i18-desk-lift', 'i18-file-unopened'];
const mk = (n: 16 | 17 | 18, choices: (s: GameState) => { id: string }[]) => {
  const ids = (s: GameState) => choices(s).map((c) => c.id.replace(new RegExp('^chapter' + n + '\.'), ''));
  const one = (s: GameState, id: string) => {
    const next = act(s, { type: `CHAPTER${n}_CHOOSE`, id: `chapter${n}.` + id } as never);
    if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
    return next;
  };
  /** The deepening pass's moments: take the neutral pick when one is in the way. */
  const auto = (s: GameState, id: string) => {
    let y = s;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const d = NEUTRAL.find((x) => ids(y).includes(x));
      if (!d) break;
      y = one(y, d);
    }
    return one(y, id);
  };
  const walk = (s: GameState, path: string[]) => path.reduce(auto, s);
  const txt = (s: GameState) => s.history.filter((h) => String(h.node).startsWith(`chapter${n}.`)).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
  return { ids, one: auto, walk, txt };
};
const K16 = mk(16, chapter16Choices);
const K17 = mk(17, chapter17Choices);
const K18 = mk(18, chapter18Choices);

it('enters Reasonable Notice from an Institutional Chapter 15; Ch15 no longer says Act IV is in development', () => {
  const s = toAct4(PROT12(), COMPLY13, ALLY14, A15);
  expect(`${s.scene}.${s.phase}`).toBe('chapter15.complete');
  expect(text(s)).not.toContain('[Chapters 16–18 · institutional road — in development]');
  expect(K16.ids(s)).toEqual(['begin-institutional']);
  const b = K16.walk(s, ['begin-institutional']);
  expect(K16.txt(b)).toContain('the way Axiom lays out a briefing');
  expect(K16.txt(b)).toContain('THE CASE: ');
});

it('terms from inside, with Sloane and Maya: “I’m here to return her.” “I declined.”; Officer, Client Assurance; “I AM.”; it authenticates', () => {
  const s = toAct4(PROT12(), COMPLY13, ALLY14, A15);
  const aim = K16.walk(s, ['begin-institutional', 'i16-case-set']);
  expect(K16.ids(aim)).toEqual(['i16-aim-inside', 'i16-aim-channels', 'i16-aim-walk', 'i16-aim-nell']);
  const detail = K16.one(aim, 'i16-aim-inside');
  expect(K16.txt(detail)).toContain('THE PRODUCT WILL ATTEND.');
  expect(K16.txt(detail)).toContain('on Axiom paper');
  expect(K16.ids(detail)).toContain('i16-inside-sloane');
  const c16 = K16.walk(detail, ['i16-inside-sloane', 'i16-inside-maya', 'i16-outside-switch', 'i16-first-client', 'i16-held-nell', 'i16-wear-lanyard', 'i16-dressed-daniel', 'i16-arrive-client']);
  expect(`${c16.scene}.${c16.phase}`).toBe('chapter16.complete');
  expect(K16.txt(c16)).toContain('Come back and tell me everything. In order. With footnotes.');
  expect(K16.txt(c16)).toContain('They read it. Twice.');
  expect(K16.txt(c16)).toContain('It’s a reunion.');
  expect(K16.txt(c16)).not.toContain('in development');
  expect([c16.choices['act4.aim'], c16.choices['act4.inside'], c16.choices['act4.benton']]).toEqual(['inside', 'sloane,maya', 'gone']);

  const warranty = K17.walk(c16, ['begin-institutional', 'i17-open-room']);
  expect(K17.txt(warranty)).toContain('And a lanyard, worn like pearls. Victoria taught you that.');
  expect(K17.txt(warranty)).toContain('Suspended, I’m told. So careless.');
  expect(K17.txt(warranty)).toContain('I was the officer who took delivery of her. I’m here to return her.');
  expect(K17.txt(warranty)).toContain('I declined.');
  expect(K17.txt(warranty)).toContain('Did we know about 9C?');
  const record = K17.one(warranty, 'i17-press-receipts');
  expect(K17.ids(record)).toEqual(['i17-sloane-vouch', 'i17-sloane-stand', 'i17-sloane-use']);
  const leash = K17.walk(record, ['i17-sloane-vouch', 'i17-recess-table']);
  expect(K17.txt(leash)).toContain('It was round my neck.');
  const c17 = K17.walk(leash, ['i17-leash-refuse', 'i17-named-ask', 'i17-ruling-on', 'i17-last-no']);
  expect(`${c17.scene}.${c17.phase}`).toBe('chapter17.complete');
  expect(K17.txt(c17)).toContain('I didn’t come for a leash. I came to return one.');
  expect(K17.txt(c17)).toContain('Victoria survived us. I didn’t expect that.');
  expect(K17.txt(c17)).toContain('The Project Eve contract terminated for defect');
  expect([c17.choices['act4.board'], c17.choices['act4.terms'], c17.choices['act4.nell-said']]).toEqual(['resigned', 'full', 'eleanor']);
  expect(K17.txt(c17)).not.toMatch(SEXUAL);

  const disp = K18.walk(c17, ['begin-institutional', 'i18-morning-sloane']);
  expect(K18.txt(disp)).toContain('You were worth it. C.');
  expect(K18.txt(disp)).toContain('Officer, Client Assurance');
  expect(K18.txt(disp)).toContain('You would be amazed what we’ve bought.');
  const floor = K18.walk(disp, ['i18-switch-handed', 'i18-light-down']);
  expect(K18.txt(floor)).toContain('It weighs nothing. It weighed everything.');
  expect(K18.txt(floor)).toContain('Hello, you.');
  expect(K18.ids(floor)).toEqual(['i18-desk-adrian', 'i18-desk-machine', 'i18-desk-lift']);
  expect(K18.ids(K18.one(floor, 'i18-desk-lift'))).toEqual(['i18-home-daniel', 'i18-home-maya', 'i18-home-none']);
  const scope = K18.walk(floor, ['i18-home-daniel', 'i18-name-evelyn']);
  const signed = K18.walk(scope, ['i18-scope-refusal', 'i18-scope-backup', 'i18-scope-leave']);
  expect(K18.txt(signed)).toContain('Yours now.');
  expect(K18.txt(signed)).toContain('Countersigned. V.S.');
  const invited = K18.one(signed, 'i18-later-invite');
  expect(K18.ids(invited)).toEqual(['i18-later-no-sex', 'i18-later-sex', 'i18-later-goodnight']);
  const done = K18.walk(invited, ['i18-later-sex', 'i18-later-close']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter18.nfa');
  expect(K18.ids(done)).toEqual([]);
  expect(done.facts).toContain('c18.i-evening-consent');
  expect(K18.txt(done)).toContain('The scene fades.');
  expect(K18.txt(done)).toContain('WHO IS WATCHING HER?');
  expect(K18.txt(done)).toContain('I AM.');
  expect(K18.txt(done)).toContain('NOBODY. THE LIGHT IS OFF.');
  expect(K18.txt(done)).toContain('NO FURTHER ACTION.');
  expect(K18.txt(done)).toContain('I wrote my own scope, and it held.');
  expect(K18.txt(done)).toContain('The end of the Institutional route.');
  expect(K18.txt(done)).not.toMatch(SEXUAL);
  expect([done.choices['end.position'], done.choices['end.sloane'], done.choices['end.with'], done.choices['end.name'], done.choices['end.consent']]).toEqual(['inside-full', 'promoted', 'daniel', 'evelyn', 'sex']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('through channels on the cut road: Benton walks her in, the empty box lands on him; Sloane retired; “NOBODY. GOOD.”', () => {
  const s = toAct4(PROT12(), TURN13, CUT14, B15);
  const aim = K16.walk(s, ['begin-institutional', 'i16-case-set']);
  expect(K16.txt(aim)).toContain('Victoria resigned on a Friday with a typed sheet.');
  const c16 = K16.walk(aim, ['i16-aim-channels', 'i16-inside-maya', 'i16-inside-marsh', 'i16-outside-switch', 'i16-first-client', 'i16-held-box', 'i16-wear-black', 'i16-dressed-alone']);
  expect(K16.ids(c16)).toEqual(['i16-leave-light', 'i16-leave-wardrobe', 'i16-leave-go']);
  const kerb = K16.one(c16, 'i16-leave-go');
  expect(K16.txt(kerb)).toContain('Axiom will escort its asset, Ms Vale.');
  expect(K16.ids(kerb)).toEqual(['i16-arrive-notice', 'i16-arrive-escort', 'i16-arrive-front', 'i16-arrive-car']);
  const room = K16.one(kerb, 'i16-arrive-escort');
  expect(room.choices['act4.benton']).toBe('escort');
  expect(K16.txt(room)).toContain('taking the chair beside the door');

  const record = K17.walk(room, ['begin-institutional', 'i17-open-silent', 'i17-press-cost', 'i17-sloane-stand']);
  expect(K17.txt(record)).toContain('Not fit for purpose. That is the finding.');
  expect(K17.ids(record)).toEqual(['i17-benton-box', 'i17-benton-celeste', 'i17-benton-ignore']);
  const c17 = K17.walk(record, ['i17-benton-box', 'i17-leash-draw', 'i17-named-wait', 'i17-ruling-on', 'i17-last-orchid']);
  expect(K17.txt(c17)).toContain('Where is it, Director?');
  expect(K17.txt(c17)).toContain('Your man in it.');
  expect(K17.txt(c17)).toContain('the position of Mr E. Benton');
  expect(K17.txt(c17)).toContain('Victoria resigned rather than survive us.');

  const deb = K18.one(c17, 'begin-institutional');
  expect(K18.ids(deb)).toEqual(['i18-morning-daniel', 'i18-morning-sleep']);
  const done = K18.walk(deb, ['i18-morning-sleep', 'i18-switch-armed', 'i18-light-tape', 'i18-home-none', 'i18-name-adrian', 'i18-scope-name', 'i18-scope-people', 'i18-scope-record', 'i18-later-own']);
  expect(K18.txt(done)).toContain('NO FURTHER ACTION. V.');
  expect(K18.txt(done)).toContain('I can’t sign this. I’ve pencilled it anyway. V.');
  expect(K18.txt(done)).toContain('NOBODY. GOOD.');
  expect(K18.txt(done)).toContain('NOBODY. I KEPT THE TAPE.');
  expect(K18.txt(done)).toContain('My name is Adrian Vale.');
  expect([done.choices['end.sloane'], done.choices['end.light'], done.choices['end.switch']]).toEqual(['retired', 'tape', 'armed']);
});

it('walk, after the proof, alone: her own paper; Sloane used and reassigned; the new flat has no light', () => {
  const s = toAct4(PROT12(), REFUSE13, PROOF14, C15);
  const aim = K16.walk(s, ['begin-institutional', 'i16-case-set']);
  expect(K16.txt(aim)).toContain('I made her the proof, not the partner.');
  const detail = K16.one(aim, 'i16-aim-walk');
  expect(K16.txt(detail)).toContain('I AM COMING TO TELL YOU WHAT I KNOW. I WILL NOT BE STAYING.');
  expect(K16.txt(detail)).toContain('on your own paper');
  const wear = K16.walk(detail, ['i16-inside-none', 'i16-outside-switch', 'i16-first-page', 'i16-held-none']);
  expect(K16.ids(wear)).toEqual(['i16-wear-charcoal', 'i16-wear-black']);
  const room = K16.walk(wear, ['i16-wear-charcoal', 'i16-dressed-alone', 'i16-arrive-car']);
  const c17 = K17.walk(room, ['begin-institutional', 'i17-open-celeste', 'i17-press-receipts', 'i17-sloane-use', 'i17-leash-laugh', 'i17-named-ask', 'i17-ruling-on', 'i17-last-yes']);
  expect(K17.txt(c17)).toContain('Cleared by her own product, on the record.');
  expect(K17.txt(c17)).toContain('You didn’t let Victoria survive us. I thought you would.');
  const light = K18.walk(c17, ['begin-institutional', 'i18-morning-sleep', 'i18-switch-disarmed']);
  expect(K18.txt(light)).toContain('Records, aisle nine');
  expect(K18.ids(light)).toEqual(['i18-light-checked']);
  const done = K18.walk(light, ['i18-light-checked', 'i18-home-none', 'i18-name-new', 'i18-scope-leave', 'i18-scope-refusal', 'i18-scope-name', 'i18-later-own']);
  expect(K18.txt(done)).toContain('SHE IS. SHE ALWAYS WAS.');
  expect(K18.txt(done)).toContain('NOBODY. I CHECKED.');
  expect(K18.txt(done)).toContain('Nobody is watching. I wrote my name down anyway.');
  expect(done.choices['end.position']).toMatch(/^walk-/);
});

it('Daniel was never told: he says hello to a stranger, she can tell him now, and he is not a partner that night', () => {
  const s = toAct4(TRADE12(), TURN13, CUT14, B15);
  expect(s.choices['inst.daniel-told']).toBeUndefined();
  const c16 = K16.walk(s, ['begin-institutional', 'i16-case-set', 'i16-aim-nell', 'i16-inside-none', 'i16-outside-switch', 'i16-first-client', 'i16-held-none', 'i16-wear-black', 'i16-dressed-alone', 'i16-arrive-front']);
  expect(c16.choices['act4.benton']).toBe('refused');
  const c17 = K17.walk(c16, ['begin-institutional', 'i17-open-silent', 'i17-press-cost', ...(K17.ids(K17.walk(c16, ['begin-institutional', 'i17-open-silent', 'i17-press-cost'])).includes('i17-sloane-stand') ? ['i17-sloane-stand'] : []), 'i17-leash-refuse', 'i17-named-wait', 'i17-ruling-on', 'i17-last-no']);
  expect(c17.choices['act4.board']).not.toBe('resigned');
  const floor = K18.walk(c17, ['begin-institutional', 'i18-morning-sleep', 'i18-switch-armed', 'i18-light-down']);
  expect(K18.txt(floor)).toContain('says hello to a stranger, kindly');
  expect(K18.ids(floor)).toEqual(['i18-daniel-told-now', 'i18-daniel-never']);
  const told = K18.one(floor, 'i18-daniel-told-now');
  expect(K18.txt(told)).toContain('I knew the coffee machine. I didn’t know I knew you.');
  expect(K18.ids(told)).not.toContain('i18-home-daniel');
  expect(told.choices['inst.daniel-told']).toBe('late');
});

it('deepening: five past five, Celeste’s reply, the green light, the place card, the recess, the minute, the letter, the desk, the file', () => {
  const s = toAct4(PROT12(), COMPLY13, ALLY14, A15);
  const b = K16.walk(s, ['begin-institutional']);
  expect(K16.ids(b)).toEqual(['i16-dawn-sloane', 'i16-dawn-daniel', 'i16-dawn-nell', 'i16-dawn-quiet']);
  const c16 = K16.walk(b, ['i16-dawn-sloane', 'i16-case-set', 'i16-aim-inside', 'i16-inside-sloane', 'i16-inside-maya', 'i16-outside-switch', 'i16-reply-file', 'i16-first-client', 'i16-held-nell', 'i16-wear-lanyard', 'i16-dressed-sloane', 'i16-leave-light', 'i16-arrive-client']);
  expect(K16.txt(c16)).toContain('Read me the first line of what you’ll say.');
  expect(K16.txt(c16)).toContain('Twenty-three hours would have been reasonable. C.');
  expect(K16.txt(c16)).toContain('Back by nine. Log it.');
  const c17 = K17.walk(c16, ['begin-institutional', 'i17-card-name', 'i17-open-room', 'i17-press-receipts', 'i17-sloane-vouch', 'i17-recess-sloane', 'i17-leash-refuse', 'i17-named-ask', 'i17-minute-sloane', 'i17-ruling-on', 'i17-last-no']);
  expect(K17.txt(c17)).toContain('Initialled, too. Victoria has taught you everything.');
  expect(K17.txt(c17)).toContain('It was in the contract. Read it twice.');
  expect(K17.txt(c17)).toContain('V. SLOANE, OFFICER OF RECORD');
  expect(K17.txt(c17)).not.toMatch(SEXUAL);
  const done = K18.walk(c17, ['begin-institutional', 'i18-morning-sleep', 'i18-letter-frame', 'i18-switch-disarmed', 'i18-light-down', 'i18-desk-adrian', 'i18-home-none', 'i18-name-adrian', 'i18-file-sloane', 'i18-scope-refusal', 'i18-scope-record', 'i18-scope-name', 'i18-later-own']);
  expect(K18.txt(done)).toContain('IN RESPECT OF THE OPERATIVE: NO FURTHER ACTION.');
  expect(K18.txt(done)).toContain('Nine across. I know the answer now.');
  expect(K18.txt(done)).toContain('FIT FOR NO PURPOSE BUT HER OWN. V.S.');
  expect([done.choices['c16.i-dawn'], done.choices['c17.i-recess'], done.choices['c18.i-file']]).toEqual(['sloane', 'sloane', 'sloane']);
  const read = K18.walk(c17, ['begin-institutional', 'i18-morning-sleep', 'i18-switch-armed', 'i18-light-down', 'i18-home-none', 'i18-name-new', 'i18-file-read']);
  expect(K18.txt(read)).toContain('CAMERA REMOVED BY SUBJECT. SUBJECT SMILED.');
});
