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
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c13 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER13_CHOOSE', id: 'chapter13.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids13(s).join(', ') + ')');
  return next;
};
const walk13 = (s: GameState, path: string[]) => path.reduce(c13, s);
const ch13 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter13.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
/** Words that must never appear on the comply path (CONTENT_DIRECTION §2). */
const BEHIND_THE_DOOR = /\b(undress\w*|naked|nude|kiss\w*|moan\w*|skin|breast\w*|thigh\w*)\b/i;

it('enters Through Channels from an Institutional Chapter 12, with a content notice and a forged tasking', () => {
  const s = PROT12();
  expect(`${s.scene}.${s.phase}`).toBe('chapter12.complete');
  expect(ids13(s)).toEqual(['begin-institutional']);
  expect(chapter13Choices(s)[0].hint).toContain('Content notice');
  expect(ids14(s)).toEqual([]);
  const tasking = c13(s, 'begin-institutional');
  expect(tasking.history.at(-1)!.blocks[0]).toEqual({ kind: 'notice', text: expect.stringContaining('sexual coercion (implied, never shown)') });
  expect(ch13(tasking)).toContain('SUITE 1109 · BACKUP: —');
  expect(ch13(tasking)).toContain('Victoria has sent you something, darling.');
  expect(ch13(tasking)).toContain('And do think of Maya.');
});

it('comply, with the tasking taken to Sloane: “I never wrote this.”, the door, the cut, Sloane on the hall floor; Ch14 follows; it authenticates', () => {
  const channel = walk13(PROT12(), ['begin-institutional', 'i13-tasking-on', 'i13-dread-daniel']);
  expect(ch13(channel)).toContain('I just want you to know that I can tell.');
  expect(ids13(channel)).toEqual(['i13-channel-sloane', 'i13-channel-benton', 'i13-channel-nobody']);
  const reply = c13(channel, 'i13-channel-sloane');
  expect(reply.facts).toContain('c13.i-forgery');
  expect(ch13(reply)).toContain('I never wrote this. Look at the sevens.');
  expect(ch13(reply)).toContain('MINE.');
  expect(ids13(reply)).toEqual(['i13-reply-comply', 'i13-reply-refuse', 'i13-reply-turn', 'i13-reply-swap']);
  const corridor = c13(reply, 'i13-reply-comply');
  expect([corridor.choices['c13.answer'], corridor.choices['act3.honeypot']]).toEqual(['complied', 'done']);
  const lead = corridor.history.at(-1)!.blocks;
  expect(lead[0].text).toContain('by the checklist');
  expect(ch13(corridor)).toContain('a tall woman in graphite with a newspaper she is not reading');
  expect(ch13(corridor)).toContain('Are you all right?');
  const faded = fadeCoercion13(lead);
  expect(faded[0]).toEqual({ kind: 'notice', text: expect.stringContaining('Faded, at your request') });
  expect(faded.map((b) => b.text).join('\n')).not.toContain('A dress that is nobody’s');
  expect(faded.map((b) => b.text).join('\n')).toContain('Are you all right?');
  expect(ids13(corridor)).toEqual(['i13-door-look', 'i13-door-away']);
  const after = c13(corridor, 'i13-door-look');
  expect(ch13(after)).toContain('The door closes behind you.');
  expect(ids13(after)).toEqual(['i13-recover-daniel', 'i13-recover-maya', 'i13-recover-sloane', 'i13-recover-wall', 'i13-recover-alone']);
  const weekend = c13(after, 'i13-recover-sloane');
  expect(ch13(weekend)).toContain('I’m not going to touch you.');
  expect(ch13(weekend)).toContain('V.S. PRESENT. NO ACTION.');
  const done = c13(weekend, 'i13-weekend-card');
  expect(`${done.scene}.${done.phase}`).toBe('chapter13.complete');
  expect(ch13(done)).toContain('THE CLAREMONT. 1109. DONE.');
  expect(ch13(done)).toContain('SHE NEVER WROTE IT.');
  // Nothing behind the door, ever: the comply path's text after the door closes carries no sexual description.
  const behind = done.history.filter((h) => ['chapter13.smallhours', 'chapter13.weekend', 'chapter13.complete'].includes(String(h.node))).flatMap((h) => h.blocks).map((b) => b.text).join('\n');
  expect(behind).not.toMatch(BEHIND_THE_DOOR);
  expect(ids14(done)).toEqual(['begin-institutional']);
  const notice = c14(done, 'begin-institutional');
  expect(text(notice)).not.toContain('institutional road — in development]');
  expect(ch14(notice)).toContain('she took a forged tasking in her own name to the chair of the board');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('refuse under scope, with Benton confirming it: Axiom can’t touch her; Maya’s promotion is the cost', () => {
  const done = walk13(PROT12(), ['begin-institutional', 'i13-tasking-on', 'i13-dread-alone', 'i13-channel-benton', 'i13-reply-refuse', 'i13-corridor-on', 'i13-smallhours-on', 'i13-weekend-card']);
  expect([done.choices['c13.answer'], done.choices['act3.honeypot'], done.choices['inst.maya13'], done.choices['act3.maya-status']]).toEqual(['refused', 'refused', 'warned', undefined]);
  expect(ch13(done)).toContain('Victoria signs what the client needs, Ms Vale.');
  expect(ch13(done)).toContain('DECLINED UNDER SCOPE');
  expect(ch13(done)).toContain('Maya Reyes’s promotion has been withdrawn');
  expect(ch13(done)).toContain('THANK YOU FOR YOUR SERVICE. — E.B.');
  expect(ch13(done)).toContain('REFUSED. MAYA.');
  expect(ch13(done)).toContain('BENTON CONFIRMED IT.');
  const channels = walk14(done, ['begin-institutional', 'i14-notice-screen', 'i14-sloane-hear', 'i14-wire-no']);
  expect(ch14(channels)).toContain('They took my promotion away on Friday');
});

it('turn: nobody told, the Records copy in the lift, a staged scene both in on it; Marsh an ally', () => {
  const reply = walk13(TRADE12(), ['begin-institutional', 'i13-tasking-on', 'i13-dread-maya', 'i13-channel-nobody']);
  expect(ids13(reply)).toEqual(['i13-reply-comply', 'i13-reply-refuse', 'i13-reply-turn']);
  const done = walk13(reply, ['i13-reply-turn', 'i13-corridor-on', 'i13-smallhours-on', 'i13-weekend-card']);
  expect([done.choices['c13.answer'], done.choices['act3.honeypot'], done.choices['act3.ally.marsh']]).toEqual(['countered', 'staged', 'in']);
  expect(done.facts).toContain('c13.i-marsh');
  expect(ch13(done)).toContain('forty-one pages of the Project Eve procurement file');
  expect(ch13(done)).toContain('“Is this all right?” “Yes. Keep going. Slower.”');
  expect(ch13(done)).toContain('STAGED. MARSH IS OURS. MINE.');
  expect(ch13(done)).toContain('NOBODY KNOWS.');
});

it('swap: Iris and the service corridor; the card out of the camera', () => {
  const done = walk13(PROT12(), ['begin-institutional', 'i13-tasking-on', 'i13-dread-alone', 'i13-channel-nobody', 'i13-reply-swap', 'i13-corridor-on', 'i13-smallhours-on', 'i13-weekend-card']);
  expect([done.choices['c13.answer'], done.choices['act3.honeypot'], done.choices['c13.card']]).toEqual(['countered', 'pulled', 'taken']);
  expect(ch13(done)).toContain('The monitor cupboard is behind the wardrobe in 1108.');
  expect(ch13(done)).toContain('THE CARD IS OUT.');
});
