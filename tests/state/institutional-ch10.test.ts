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
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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

it('enters A Very Good Officer from an Institutional Chapter 9: the grey envelope that isn’t Sloane’s', () => {
  const s = toNine(PROTECTED7(), TORCH8);
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(ids10(s)).toEqual(['begin-institutional']);
  expect(ids14(s)).toEqual([]);
  const card = c10(s, 'begin-institutional');
  expect(card.phase).toBe('card');
  expect(ch10(card)).toContain('Sloane has never crossed a seven in her life');
  expect(ch10(card)).toContain('Breakfast? Wednesday. The Lindqvist, seven. — C.');
  expect(ids10(card)).toEqual(['i10-card-go', 'i10-card-sloane', 'i10-card-gate']);
});

it('give: the Lindqvist, the log handed over, Sloane told, Daniel; on to the Ch14 bridge; it authenticates', () => {
  const club = walk10(toNine(PROTECTED7(), TORCH8), ['begin-institutional', 'i10-card-go', 'i10-dress-black']);
  expect(ch10(club)).toContain('AX-7A. They gave you his candidate number.');
  expect(ch10(club)).toContain('The Operative may decline any single tasking, in writing, without penalty');
  expect(ch10(club)).toContain('Elias tells me everything, darling.');
  expect(ch10(club)).toContain('She doesn’t know about the note.');
  expect(ch10(club)).toContain('Eat your eggs, Adrian.');
  expect(ids10(walk10(toNine(PROTECTED7(), TORCH8), ['begin-institutional', 'i10-card-go']))).toEqual(['i10-dress-ivory', 'i10-dress-grey', 'i10-dress-black']);
  const log = c10(club, 'i10-adrian-composed');
  expect(ch10(log)).toContain('Victoria is a very good officer.');
  expect(ids10(log)).toEqual(['i10-log-give', 'i10-log-doctor', 'i10-log-refuse']);
  const pages = c10(log, 'i10-log-give');
  expect(pages.facts).toContain('c10.i-order');
  expect(ch10(pages)).toContain('CELESTE LAURENT AT BREAKFAST WITH AXIOM’S NEW ANALYST.');
  expect(ids10(c10(pages, 'i10-daniel-nothing'))).toEqual(['i10-pages-old', 'i10-pages-work', 'i10-pages-report']);
  expect(ch10(pages)).toContain('Adrian Vale had breakfast with Celeste Laurent.');
  expect(ids10(pages)).toEqual(['i10-daniel-joke', 'i10-daniel-true', 'i10-daniel-nothing']);
  const fridays = c10(pages, 'i10-pages-report');
  expect(fridays.choices['inst.told10']).toBe('yes');
  expect(ch10(fridays)).toContain('And thank you for telling me after.');
  expect(ch10(fridays)).toContain('do bring your operative. C.L.');
  expect(ch10(fridays)).toContain('For the operative. C.');
  expect(ids10(fridays)).toEqual(['i10-orchid-security', 'i10-orchid-sill', 'i10-orchid-bin']);
  const night = c10(fridays, 'i10-orchid-security');
  expect(ch10(night)).toContain('One orchid, white. Logged.');
  expect(ids10(night)).toContain('i10-night-daniel');
  expect(ids10(night)).not.toContain('i10-night-daniel-feathers');
  const done = walk10(night, ['i10-night-daniel', 'i10-daniel-no-sex', 'i10-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter10.complete');
  expect(done.facts).toContain('c10.i-evening-consent');
  expect(ch10(done)).toContain('CELESTE LAURENT. GIVEN.');
  expect(ch10(done)).toContain('SLOANE KNOWS.');
  expect(ch10(done)).not.toMatch(SEXUAL);
  expect(ids14(done)).toEqual(['begin-institutional']);
  const notice = c14(done, 'begin-institutional');
  expect(text(notice)).toContain('[Chapters 11–13 · institutional road — in development]');
  const wire = walk14(notice, ['i14-notice-screen', 'i14-sloane-hear']);
  expect(ch14(wire)).toContain('I told you at breakfast, darling. A very good officer.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('doctor: shown to Sloane first, Elias’s pretty log, Benton outside room 412', () => {
  const done = walk10(toNine(TRADE7(), BENTON8), ['begin-institutional', 'i10-card-sloane', 'i10-adrian-ask', 'i10-log-doctor', 'i10-pages-work', 'i10-night-daniel', ]);
  expect([done.choices['inst.log10'], done.choices['inst.celeste10'], done.choices['inst.pages10']]).toEqual(['doctored', 'fooled', 'work']);
  expect(ch10(done)).toContain('That isn’t my hand. It’s very good.');
  expect(ch10(done)).toContain('It was very pretty, and wrong in eleven places.');
  expect(ch10(done)).toContain('Nobody that good ever does.');
  expect(ch10(done)).toContain('outside room 412 for a debrief that doesn’t exist');
  expect(ch10(done)).toContain('You never look happy at your desk.');
  expect(ch10(done)).toContain('CELESTE LAURENT. DOCTORED.');
});

it('refuse: Celeste at the staff gate, the log refused, Sloane’s budget cut', () => {
  const done = walk10(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i10-card-gate', 'i10-adrian-walk', 'i10-log-refuse', 'i10-pages-old', 'i10-night-alone']);
  expect([done.choices['inst.log10'], done.choices['inst.celeste10']]).toEqual(['refused', 'refused']);
  expect(ch10(done)).toContain('A lady for you, madam.');
  expect(ch10(done)).toContain('Her log is hers.');
  expect(ch10(done)).toContain('Sloane’s budget line has been cut by a third');
  expect(ch10(done)).toContain('That was a small one. Friday?');
  expect(ch10(done)).toContain('CELESTE LAURENT. REFUSED.');
  expect(done.choices['inst.told10']).toBeUndefined();
});

it('deepening: the ivory jacket, the truth to Daniel, the orchid on the sill', () => {
  const done = walk10(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i10-card-go', 'i10-dress-ivory', 'i10-adrian-composed', 'i10-log-give', 'i10-daniel-true', 'i10-pages-work', 'i10-orchid-sill', 'i10-night-alone']);
  expect(['i-dress', 'i-daniel', 'i-orchid'].map((k) => done.choices['c10.' + k])).toEqual(['ivory', 'true', 'sill']);
  expect(ch10(done)).toContain('Ivory. How cruel of you. She wore it better. No, that isn’t true. She wore it first.');
  expect(ch10(done)).toContain('Then I’m sorry I waved it about');
  expect(ch10(done)).toContain('were not impressed');
  const grey = walk10(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i10-card-gate', 'i10-dress-grey']);
  expect(ch10(grey)).toContain('Axiom grey.');
  expect(ch10(grey)).toContain('She’s brought pastries.');
});
