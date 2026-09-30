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
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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

it('enters Officer of Record through the interim bridge from an Institutional Chapter 9', () => {
  const s = toNine(PROTECTED7(), TORCH8);
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(ids14(s)).toEqual(['begin-institutional']);
  const notice = c14(s, 'begin-institutional');
  expect(notice.phase).toBe('notice');
  expect(text(notice)).toContain('[Chapters 10–13 · institutional road — in development]');
  expect(ch14(notice)).toContain('The officer of record, V. Sloane, Director of Executive Intelligence, is suspended');
  expect(ch14(notice)).toContain('You ring the backup number. It rings out.');
  expect(ids14(notice)).toEqual(['i14-notice-maya', 'i14-notice-daniel', 'i14-notice-screen']);
});

it('the bounded ally: Sloane heard, the verdict on the record, Benton’s drawer, Daniel who knows; it authenticates', () => {
  const confession = walk14(toNine(PROTECTED7(), TORCH8), ['begin-institutional', 'i14-notice-daniel']);
  expect(ids14(confession)).toEqual(['i14-office-water', 'i14-office-desk', 'i14-office-door']);
  expect(ch14(confession)).toContain('Your handler. Adrian’s — your — God.');
  expect(ch14(confession)).toContain('priced in');
  expect(ch14(confession)).toContain('One of them is C. Laurent’s.');
  expect(ch14(confession)).toContain('I counted the pages in the car.');
  const wire = c14(confession, 'i14-sloane-hear');
  expect([wire.choices['act3.sloane'], wire.choices['c14.file']]).toEqual(['truce', 'yes']);
  expect(wire.facts).toContain('c14.verdict');
  expect(ch14(wire)).toContain('Tell the inquiry she knew about the placements.');
  const channels = walk14(wire, ['i14-wire-yes']);
  expect(ch14(channels)).toContain('Good girl.');
  expect(ch14(channels)).toContain('I asked for this file myself. Nobody gave me you.');
  expect(ch14(channels)).not.toContain('It’s in your contract, and I read it.');
  expect(ids14(channels)).toEqual(['i14-maya-on', 'i14-maya-off', 'i14-maya-nothing']);
  const ways = c14(channels, 'i14-maya-off');
  expect(ch14(ways)).toContain('Thirty seconds.');
  expect(ids14(ways)).toEqual(['i14-way-ally', 'i14-way-proof', 'i14-way-cut']);
  const eve = c14(ways, 'i14-way-ally');
  expect(ch14(eve)).toContain('The eve of it.');
  expect(ids14(eve)).toEqual(['i14-eve-mirror', 'i14-eve-sloane', 'i14-eve-sleep']);
  const hearing = c14(eve, 'i14-eve-sloane');
  expect(ch14(hearing)).toContain('I wanted to hear you say it’s still tomorrow.');
  expect([hearing.choices['c14.answer'], hearing.choices['act3.sloane'], hearing.choices['act3.celeste-afraid'], hearing.choices['inst.authority'], hearing.choices['inst.benton-exposed']]).toEqual(['countered', 'allied', 'yes', 'formal', 'yes']);
  expect(ch14(hearing)).toContain('Entered. The vendor knew.');
  expect(ch14(hearing)).toContain('where is the PROJECT EVE (I) file?');
  expect(ch14(hearing)).toContain('Meridian’s man inside Axiom.');
  expect(ids14(hearing)).toEqual(['i14-corridor-sloane', 'i14-corridor-benton', 'i14-corridor-walk']);
  const dusk = c14(hearing, 'i14-corridor-benton');
  expect(ch14(dusk)).toContain('You were always the better analyst.');
  expect(ids14(dusk)[0]).toBe('i14-evening-daniel');
  const scoped = walk14(dusk, ['i14-evening-daniel', 'i14-daniel-sex']);
  expect(scoped.facts).toContain('c14.i-evening-consent');
  expect(ch14(scoped)).toContain('I know exactly who you are.');
  const done = c14(scoped, 'i14-stay');
  expect(`${done.scene}.${done.phase}`).toBe('chapter14.complete');
  expect(ch14(done)).toContain('OFFICER OF RECORD: CLEARED. SHE OWES ME.');
  expect(ch14(done)).toContain('BENTON = MERIDIAN. E.V. (I) FOUND.');
  expect(ch14(done)).toContain('THE VESPER · WITH AXIOM’S AUTHORITY.');
  expect(ch14(done)).toContain('[Chapters 15–18 · institutional road — in development]');
  expect(ch14(done)).toContain('The scene fades.');
  expect(ch14(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('the proof: Sloane shut out, the ally closed, “I am Project Eve”, and the name spent by her own hand', () => {
  const ways = walk14(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i14-notice-screen', 'i14-sloane-shut', 'i14-wire-no', 'i14-maya-on']);
  expect(ids14(ways)).toEqual(['i14-way-proof', 'i14-way-cut']);
  const done = walk14(ways, ['i14-way-proof', 'i14-corridor-walk', 'i14-evening-alone']);
  expect([done.choices['c14.answer'], done.choices['act3.sloane'], done.choices['act3.adrian-burned'], done.choices['act3.home'], done.choices['inst.authority']]).toEqual(['refused', 'handed', 'yes', 'lost', 'regulator']);
  expect(ch14(done)).toContain('I am Project Eve. I was Adrian Vale');
  expect(ch14(done)).toContain('I can’t be sure.');
  expect(ch14(done)).toContain('On Saturday there is a new lock on the flat.');
  expect(ch14(done)).toContain('OFFICER OF RECORD: CLEARED. I SAID IT MYSELF.');
});

it('cut her loose: the order, her resignation, Benton above her', () => {
  const done = walk14(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i14-notice-maya', 'i14-sloane-hold', 'i14-wire-silent', 'i14-maya-nothing', 'i14-way-cut', 'i14-corridor-walk', 'i14-evening-alone']);
  expect([done.choices['c14.answer'], done.choices['act3.sloane'], done.choices['inst.authority'], done.choices['act3.adrian-burned']]).toEqual(['complied', 'shut', 'benton', undefined]);
  expect(ch14(done)).toContain('I asked for this file. Nobody gave me you.');
  expect(ch14(done)).toContain('You’ll sign for the truth now.');
  expect(ch14(done)).toContain('Nobody gave me you, and nobody can give you me.');
  expect(ch14(done)).toContain('her resignation, dated this morning');
  expect(ch14(done)).toContain('Nobody had to be unkind.');
  expect(ch14(done)).toContain('OFFICER OF RECORD: RESIGNED. BENTON ABOVE ME.');
  expect(ch14(done)).not.toContain('BENTON = MERIDIAN.');
});

it('deepening: the glass of water, the mirror, and the corridor', () => {
  const done = walk14(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i14-notice-screen', 'i14-office-water', 'i14-sloane-hear', 'i14-wire-no', 'i14-maya-on', 'i14-way-proof', 'i14-eve-mirror', 'i14-corridor-sloane', 'i14-evening-alone']);
  expect(['i-office', 'i-eve', 'i-corridor'].map((k) => done.choices['c14.' + k])).toEqual(['water', 'mirror', 'sloane']);
  expect(ch14(done)).toContain('Nobody has given me anything in this building for eleven years that wasn’t a file.');
  expect(ch14(done)).toContain('the fourth time you are proud of it');
  expect(ch14(done)).toContain('You didn’t have to do that for me.');
  const desk = walk14(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i14-notice-screen', 'i14-office-desk']);
  expect(ch14(desk)).toContain('You’ve become very difficult to supervise.');
  const cut = walk14(toNine(TRADE7(), PLAIN8), ['begin-institutional', 'i14-notice-screen', 'i14-sloane-shut', 'i14-wire-yes', 'i14-maya-nothing', 'i14-way-cut']);
  expect(ids14(cut)).toEqual(['i14-eve-mirror', 'i14-eve-sleep']);
  expect(ch14(c14(cut, 'i14-eve-mirror'))).toContain('It takes nine times.');
});
