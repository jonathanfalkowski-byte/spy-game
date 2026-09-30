import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c8 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER8_CHOOSE', id: 'chapter8.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
const walk8 = (s: GameState, path: string[]) => path.reduce(c8, s);
const ch8 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter8.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters Scope from an Institutional Chapter 7: the rota, the grey envelopes, and the unknown number again', () => {
  const s = PROTECTED7();
  expect(`${s.scene}.${s.phase}`).toBe('chapter7.complete');
  expect(ids(s)).toEqual(['begin-institutional']);
  const rota = c8(s, 'begin-institutional');
  expect(rota.phase).toBe('rota');
  expect(ch8(rota)).toContain('AX-7A on the front in Sloane’s small upright capitals');
  expect(ch8(rota)).toContain('Ask Records for E.V. (I).');
  expect(ids(rota)).toEqual(['i8-rota-reply', 'i8-rota-sloane', 'i8-rota-leave']);
  const hub = c8(rota, 'i8-rota-sloane');
  expect(ch8(hub)).toContain('Somebody wants you in Records. So do I, as it happens.');
  expect(ids(hub)).toEqual(['i8-task-debrief', 'i8-task-compliance', 'i8-task-benton', 'i8-task-report', 'i8-task-file']);
});

it('by the book: the debrief, her own file, Daniel’s report fixed silently; Records with Sloane in her ear; the telling; it authenticates', () => {
  const hub = walk8(PROTECTED7(), ['begin-institutional', 'i8-rota-leave']);
  const debrief = c8(hub, 'i8-task-debrief');
  expect(ch8(debrief)).toContain('Backup: a man called Okafor');
  expect(ids(debrief)).toEqual(['i8-debrief-full', 'i8-debrief-shade', 'i8-debrief-refuse']);
  const file = walk8(debrief, ['i8-debrief-full', 'i8-task-file']);
  expect(ch8(file)).toContain('Thorough.');
  expect(ch8(file)).toContain('22:14 · subject taped hall camera. Logged. No action. — V.S.');
  expect(ch8(file)).toContain('You’ll wish you hadn’t, she wrote in the margin.');
  const records = walk8(file, ['i8-file-margin', 'i8-task-report', 'i8-report-silent']);
  expect(records.phase).toBe('records');
  expect(ch8(records)).toContain('Subject noticed. — E.V.');
  expect(ch8(records)).toContain('Somebody used to do this. Sat right where you’re sitting.');
  expect(ch8(records)).toContain('Aisle nine. Third bay. I’m here.');
  expect(ch8(records)).toContain('MERIDIAN HOLDINGS · VENDOR.');
  expect(ch8(records)).toContain('LEGEND E.V. (II). PRIOR INSTANCE RETIRED · SINGAPORE.');
  const car = c8(records, 'i8-file-intact');
  expect(car.facts).toContain('c8.i-vendor');
  expect(ch8(car)).toContain('You’re the second. I didn’t know there was a first until the week I met you.');
  const evening = c8(car, 'i8-car-ask');
  expect(ch8(evening)).toContain('Now I’ve read the word twice');
  const pub = c8(evening, 'i8-evening-daniel');
  expect(ch8(pub)).toContain('Somebody fixed my report in the night.');
  expect(ids(pub)).toEqual(['i8-daniel-tell', 'i8-daniel-notyet']);
  const done = c8(pub, 'i8-daniel-tell');
  expect(`${done.scene}.${done.phase}`).toBe('chapter8.complete');
  expect(done.choices['inst.daniel-told']).toBe('yes');
  expect(done.facts).toContain('c8.i-daniel-told');
  expect(ch8(done)).toContain('I need a day.');
  expect(ch8(done)).toContain('DONE: THE DEBRIEF. SHADED: DANIEL’S REPORT, MY OWN FILE. REFUSED: —.');
  expect(ch8(done)).toContain('MERIDIAN · E.V. (I) · RETIRED.');
  expect(ch8(done)).toContain('KNOWS.');
  expect(ch8(done)).not.toMatch(SEXUAL);
  expect(chapter9Choices(done).map((c) => [c.id, c.label])).toEqual([['chapter9.begin-placeholder', 'Follow the vendor']]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('her people and the name: the compliance question withdrawn as written, Benton bounced off the seal and fed a doctored log, a copy kept', () => {
  const hub = walk8(TRADE7(), ['begin-institutional', 'i8-rota-reply']);
  expect(ids(hub)).not.toContain('i8-task-file');
  const compliance = c8(hub, 'i8-task-compliance');
  expect(ids(compliance)).toEqual(['i8-compliance-page']);
  const benton = walk8(compliance, ['i8-compliance-page', 'i8-task-benton']);
  expect(ch8(benton)).toContain('As written.');
  expect(ch8(benton)).toContain('You and I needn’t pretend with each other');
  expect(ch8(benton)).toContain('That file is sealed, Director.');
  const done = walk8(benton, ['i8-benton-doctor', 'i8-task-debrief', 'i8-debrief-shade', 'i8-file-copy', 'i8-car-out', 'i8-evening-alone']);
  expect([done.choices['inst.task.compliance'], done.choices['inst.task.benton'], done.choices['inst.file'], done.choices['inst.car']]).toEqual(['scope', 'shade', 'copy', 'out']);
  expect(ch8(done)).toContain('I’d have used the Thursday');
  expect(ch8(done)).toContain('My first secret on Axiom’s books.');
  expect(ch8(done)).toContain('forty-one pages again');
  expect(ch8(done)).toContain('REFUSED: THE COMPLIANCE QUESTION.');
});

it('no refusal term and no backup: a refused tasking costs a hearing; Records alone; the note held back', () => {
  const hub = walk8(BARE7(), ['begin-institutional', 'i8-rota-leave']);
  const records = walk8(hub, ['i8-task-debrief', 'i8-debrief-refuse', 'i8-task-report', 'i8-report-stand', 'i8-task-file', 'i8-file-confront']);
  expect(records.choices['inst.hearing']).toBe('yes');
  expect(ch8(records)).toContain('on the carpet on seventy-one for an hour');
  expect(ch8(records)).toContain('No backup on the sheet.');
  expect(ch8(records)).toContain('Development feedback');
  expect(ch8(records)).toContain('Seals are for keeping honest men honest.');
  expect(ch8(records)).toContain('No backup. The number on the sheet is Sloane’s desk');
  const car = c8(records, 'i8-file-note');
  expect(ch8(car)).toContain('I’m going to assume Records lost it. Records loses things.');
  const done = walk8(car, ['i8-car-ask', 'i8-evening-daniel', 'i8-daniel-notyet']);
  expect(done.choices['inst.daniel-told']).toBeUndefined();
  expect(ch8(done)).toContain('a thin page with a stamp on it');
});

it('the evening with a partner from before is chosen, scoped, and stopped when she says stop', () => {
  const evening = walk8(TRADE7(), ['begin-institutional', 'i8-rota-leave', 'i8-task-debrief', 'i8-debrief-full', 'i8-task-compliance', 'i8-compliance-page', 'i8-task-report', 'i8-report-tell', 'i8-file-intact', 'i8-car-ask']);
  expect(ids(evening)).toContain('i8-evening-julian');
  const scoped = walk8(evening, ['i8-evening-julian', 'i8-julian-sex']);
  expect(scoped.facts).toContain('c8.i-evening-consent');
  expect(ids(scoped)).toEqual(['i8-stop', 'i8-stay']);
  expect(c8(scoped, 'i8-stop').choices['c8.i-evening-outcome']).toBe('withdrawn');
  expect(ch8(c8(scoped, 'i8-stay'))).toContain('The scene fades.');
});
