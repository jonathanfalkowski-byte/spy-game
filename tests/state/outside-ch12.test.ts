import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter12Choices } from '../../src/content/chapter12';
import { chapter14Choices } from '../../src/content/chapter14';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const nine = () => replay(golden9.routes.find((r) => r.name === 'outside-placeholder-all')!.ledger as GameEvent[], 19);
const step = (type: string, scene: string) => (s: GameState, id: string) => {
  const next = act(s, { type, id: `${scene}.` + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const c10 = step('CHAPTER10_CHOOSE', 'chapter10');
const c11 = step('CHAPTER11_CHOOSE', 'chapter11');
const c12 = step('CHAPTER12_CHOOSE', 'chapter12');
const c14 = step('CHAPTER14_CHOOSE', 'chapter14');
/** A real Outside Chapter 11 complete save (gave the hour, photographed the page, passed the sealed page, told him). */
const eleven = () => {
  const ten = ['begin-outside', 'o10-box-water', 'o10-slip-go', 'o10-dress-black', 'o10-adrian-composed', 'o10-order-give', 'o10-paper-pin', 'o10-press-report', 'o10-text-keep', 'o10-week-on', 'o10-night-alone'].reduce(c10, nine());
  return ['begin-outside', 'o11-price-photo', 'o11-clients-listen', 'o11-iris-quiet', 'o11-own-close', 'o11-page-photo', 'o11-slip-passed', 'o11-river-all', 'o11-write-seen', 'o11-night-alone'].reduce(c11, ten);
};
const ids = (s: GameState) => chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
const walk12 = (s: GameState, path: string[]) => path.reduce(c12, s);
const ch12 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter12.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters His City from an Outside Chapter 11; the Chapter 14 bridge steps aside', () => {
  const s = eleven();
  expect([s.scene, s.phase]).toEqual(['chapter11', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  expect(chapter14Choices(s)).toEqual([]);
  const ticket = c12(s, 'begin-outside');
  expect(ticket.phase).toBe('ticket');
  expect(ch12(ticket)).toContain('I’m coming. Not as your source.');
  expect(ids(ticket)).toEqual(['o12-ticket-together', 'o12-ticket-apart']);
});

it('together, play along, ask him in, bring him to Nora, ask, stand beside him; it authenticates and hands on to Chapter 14', () => {
  const arrivals = walk12(eleven(), ['begin-outside', 'o12-ticket-together']);
  expect(arrivals.choices['out.sg12']).toBe('together');
  expect(ch12(arrivals)).toContain('Three rows back.');
  const katong = walk12(arrivals, ['o12-heat-flowers', 'o12-arrivals-on', 'o12-seat-sit']);
  expect(ch12(katong)).toContain('Miss Evelyn! So long!');
  expect(ch12(katong)).toContain('First Sunday every month she sit one hour, two cups');
  expect(ids(katong)).toEqual(['o12-katong-along', 'o12-katong-told', 'o12-katong-silent']);
  const hill = walk12(katong, ['o12-katong-along', 'o12-step-wait']);
  expect(hill.choices['out.watched12']).toBe('yes');
  expect(hill.facts).toContain('c12.o-table');
  expect(ch12(hill)).toContain('a man in a linen suit');
  expect(ids(hill)).toEqual(['o12-flat-alone', 'o12-flat-with', 'o12-flat-leave']);
  const kitchen = c12(hill, 'o12-flat-with');
  expect(ch12(kitchen)).toContain('She hated orchids.');
  expect(kitchen.phase).toBe('kitchen');
  const talk = c12(kitchen, 'o12-nora-with');
  expect(talk.choices['act3.nell']).toBe('known');
  expect(talk.facts).toContain('c12.o-nora');
  expect(ch12(talk)).toContain('She called him the Postman.');
  expect(ch12(talk)).toContain('Misadventure, the coroner said.');
  expect(ids(talk)).toEqual(['o12-trust-ask', 'o12-trust-wait', 'o12-trust-leave']);
  const quay = c12(talk, 'o12-trust-ask');
  expect(quay.choices['out.asked12']).toBe('ask');
  expect(ch12(quay)).toContain('Before the first Thursday I’ll tell you all of it');
  const done = c12(quay, 'o12-wall-beside');
  expect(done.phase).toBe('complete');
  expect(ch12(done)).toContain('SINGAPORE. HIS CITY.');
  expect(ch12(done)).toContain('MRS WEE. SAME AS ALWAYS.');
  expect(ch12(done)).toContain('NORA LINDEN. NELL. THE POSTMAN.');
  expect(ch12(done)).toContain('BEFORE THE FIRST THURSDAY. HE SWORE.');
  expect(ch12(done)).not.toMatch(SEXUAL);
  // no cause of death in this chapter
  expect(ch12(done)).not.toMatch(/\b(she was pushed|fell in|the driver|a car she refused|did not stop)\b/i);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  // Chapter 14's bridge opens from Chapter 12's end; Rafe remembers Nora's table
  const reck = ['begin-outside', 'o14-seam-summon'].reduce(c14, done);
  const t14 = reck.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
  expect(t14).toContain('You sat me at Nora’s table');
  expect(t14).toContain('This is me keeping it.');
  expect(t14).toContain('Nora’s sister, the one on the harbour wall');
});

it('apart, tell Mrs Wee, go in alone, leave him at the gate, wait, read him her hand', () => {
  const s = eleven();
  const arrivals = walk12(s, ['begin-outside', 'o12-ticket-apart']);
  expect(ch12(arrivals)).toContain('I’ll fly through Doha');
  const hill = walk12(arrivals, ['o12-heat-flowers', 'o12-arrivals-on', 'o12-seat-sit', 'o12-katong-told', 'o12-step-wait']);
  expect(ch12(hill)).toContain('Then I know why she stop coming.');
  const kitchen = c12(hill, 'o12-flat-alone');
  expect(ch12(kitchen)).toContain('ivory jacket');
  const talk = c12(kitchen, 'o12-nora-gate');
  expect(ch12(talk)).toContain('a man is standing with his back to the house');
  const quay = c12(talk, 'o12-trust-wait');
  expect(quay.choices['out.asked12']).toBe('wait');
  const done = c12(quay, 'o12-wall-leaf');
  expect(ch12(done)).toContain('Missed the Katong breakfast for this. C. will sulk.');
  expect(ch12(done)).toContain('MRS WEE. “THEN I KNOW WHY SHE STOP COMING.”');
  expect(done.choices['out.wall12']).toBe('leaf');
});

it('say nothing, leave the flat, leave it unasked, leave him alone with the water', () => {
  const kitchen = walk12(eleven(), ['begin-outside', 'o12-ticket-together', 'o12-heat-flowers', 'o12-arrivals-on', 'o12-seat-sit', 'o12-katong-silent', 'o12-step-wait', 'o12-flat-leave']);
  const talk = c12(kitchen, 'o12-nora-gate');
  const quay = c12(talk, 'o12-trust-leave');
  const done = c12(quay, 'o12-wall-alone');
  expect(done.choices['out.asked12']).toBe('leave');
  expect(ch12(done)).toContain('MRS WEE. A TABLE FOR TWO.');
  expect(ch12(done)).toContain('his face is wet');
  expect(ch12(done)).not.toContain('HE SWORE.');
  expect(ch12(done)).toContain('THE FIRST THURSDAY. WHO IS WATCHING?');
});

it('deepening: three moments, each with a neutral pick that changes no flag', () => {
  const arrivals = walk12(eleven(), ['begin-outside', 'o12-ticket-together']);
  expect(ids(arrivals)).toEqual(['o12-heat-flowers', 'o12-heat-taxis', 'o12-heat-jacket']);
  expect(ch12(c12(arrivals, 'o12-heat-taxis'))).toContain('A sleeve at the window.');
  expect(ch12(c12(arrivals, 'o12-heat-jacket'))).toContain('the only coat I own that’s mine');
  const run = (heat: string, seat: string, step: string) => {
    const katong = walk12(arrivals, [heat, 'o12-arrivals-on']);
    expect(ids(katong)).toEqual(['o12-seat-sit', 'o12-seat-cup', 'o12-seat-stand']);
    const hill = walk12(katong, [seat, 'o12-katong-along']);
    expect(ids(hill)).toEqual(['o12-step-wait', 'o12-step-count', 'o12-step-look']);
    const kitchen = walk12(hill, [step, 'o12-flat-with']);
    return walk12(kitchen, ['o12-nora-with', 'o12-trust-ask', 'o12-wall-beside']);
  };
  const a = run('o12-heat-flowers', 'o12-seat-sit', 'o12-step-wait');
  const b = run('o12-heat-taxis', 'o12-seat-cup', 'o12-step-count');
  const c = run('o12-heat-jacket', 'o12-seat-stand', 'o12-step-look');
  for (const k of ['out.sg12', 'out.katong12', 'out.watched12', 'out.flat12', 'out.nora12', 'out.asked12', 'out.wall12', 'act3.nell']) {
    expect(a.choices[k]).toEqual(b.choices[k]);
    expect(a.choices[k]).toEqual(c.choices[k]);
  }
  expect(ch12(b)).toContain('I always get twelve');
  expect(ch12(c)).toContain('a lamp left on in an empty house');
  expect(a.phase).toBe('complete');
});
