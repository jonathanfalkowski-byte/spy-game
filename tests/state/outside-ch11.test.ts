import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter11Choices } from '../../src/content/chapter11';
import { chapter14Choices } from '../../src/content/chapter14';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c14 = step('CHAPTER14_CHOOSE', 'chapter14');
/** A real Outside Chapter 10 complete save: gave her the hour, told the sender. */
const ten = (order = 'o10-order-give', press = 'o10-press-report') =>
  ['begin-outside', 'o10-box-water', 'o10-slip-go', 'o10-dress-black', 'o10-adrian-composed', order, 'o10-paper-pin', press, 'o10-text-keep', 'o10-week-on', 'o10-night-alone'].reduce(c10, nine());
const ids = (s: GameState) => chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
const walk11 = (s: GameState, path: string[]) => path.reduce(c11, s);
const ch11 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter11.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters Unclaimed from an Outside Chapter 10; the Chapter 14 bridge steps aside', () => {
  const s = ten();
  expect([s.scene, s.phase]).toEqual(['chapter10', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  expect(chapter14Choices(s)).toEqual([]);
  const layout = c11(s, 'begin-outside');
  expect(layout.phase).toBe('layout');
  expect(ch11(layout)).toContain('what a courier knows about the Vesper');
  expect(ids(layout)).toEqual(['o11-price-photo', 'o11-price-heart', 'o11-price-refuse']);
});

it('photograph it, pass the page unopened, give him everything; it authenticates and hands on to Chapter 14', () => {
  const layout = c11(ten(), 'begin-outside');
  const lobby = walk11(layout, ['o11-price-photo', 'o11-clients-listen']);
  expect(lobby.choices['out.price11']).toBe('photo');
  expect(lobby.choices['out.layout11']).toBe('yes');
  expect(ch11(lobby)).toContain('Alone, darling. I did say bring your source.');
  expect(ch11(lobby)).toContain('Thank you for the other Friday.'); // she gave the hour in Ch10
  expect(ids(lobby)).toEqual(['o11-iris-warned', 'o11-iris-open', 'o11-iris-quiet']);
  const shelf = walk11(lobby, ['o11-iris-warned', 'o11-own-close']);
  expect(shelf.choices['out.iris11']).toBe('warned');
  expect(ch11(shelf)).toContain('E. V. (II) · REISSUED · UNCLAIMED · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH.');
  expect(ch11(shelf)).toContain('E. V. (I) · FOUR YEARS · RETIRED · SINGAPORE.');
  const stairs = c11(shelf, 'o11-page-photo');
  expect(stairs.choices['out.photo11']).toBe('photo');
  expect(ch11(stairs)).toContain('A page, in my own hand, for your friend.');
  const river = c11(stairs, 'o11-slip-passed');
  expect(river.facts).toContain('c11.o-slip');
  expect(ids(river)).toEqual(['o11-river-all', 'o11-river-face', 'o11-river-nothing']);
  const dawn = walk11(river, ['o11-river-all', 'o11-write-seen']);
  expect(dawn.choices['out.told11']).toBe('yes');
  expect(ch11(dawn)).toContain('That’s her.');
  expect(ch11(dawn)).toContain('Leave it on the third step.');
  const done = c11(dawn, 'o11-night-alone');
  expect(done.phase).toBe('complete');
  expect(ch11(done)).toContain('THE VESPER. UNCLAIMED. AVAILABLE FROM THE FIRST THURSDAY.');
  expect(ch11(done)).toContain('E. V. (I). FOUR YEARS. RETIRED.');
  expect(ch11(done)).toContain('PASSED. UNOPENED.');
  expect(ch11(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  // Chapter 14's bridge opens from Chapter 11's end; Rafe remembers the face and the page
  const seam = c14(done, 'begin-outside');
  expect(seam.phase).toBe('seam');
  const reck = ['o14-gap-ledger', 'o14-seam-summon', 'o14-name-say'].reduce(c14, seam);
  const text14 = reck.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
  expect(text14).toContain('You sent me her face.');
  expect(text14).toContain('You passed me a page from her.');
});

it('learn it by heart, read the page on the stairs, tell him about the ferry line (Rafe’s “read it to me again”)', () => {
  const s = ten('o10-order-doctor', 'o10-press-work');
  const lobby = walk11(s, ['begin-outside', 'o11-price-heart', 'o11-clients-listen']);
  expect(ch11(lobby)).toContain('Pier Nine, darling.');
  const stairs = walk11(lobby, ['o11-iris-open', 'o11-own-close', 'o11-page-heart']);
  expect(stairs.choices['out.photo11']).toBe('heart');
  const river = c11(stairs, 'o11-slip-read');
  expect(ch11(river)).toContain('You were never going to be on the ferry. I’m sorry about that. — C.');
  const dawn = walk11(river, ['o11-river-all', 'o11-write-seen']);
  expect(ch11(dawn)).toContain('The eyebrow. Yes.');
  expect(ch11(dawn)).toContain('Read it to me again.');
  const done = c11(dawn, 'o11-night-alone');
  expect(ch11(done)).toContain('I HAVE HER BY HEART.');
  expect(ch11(done)).toContain('YOU WERE NEVER GOING TO BE ON THE FERRY.');
  expect(ch11(done)).toContain('HE KNOWS.');
});

it('refuse the price (go in blind), turn the page, burn the errand, tell him nothing; a chosen night that fades', () => {
  const s = ten('o10-order-refuse', 'o10-press-old');
  const lobby = walk11(s, ['begin-outside', 'o11-price-refuse', 'o11-clients-listen']);
  expect(lobby.choices['out.layout11']).toBeUndefined();
  expect(ch11(lobby)).toContain('You wouldn’t give him up.');
  const shelf = walk11(lobby, ['o11-iris-quiet', 'o11-own-close']);
  expect(ch11(shelf)).toContain('It takes you eleven minutes and two wrong turns.');
  const stairs = c11(shelf, 'o11-page-turned');
  const river = c11(stairs, 'o11-slip-burned');
  expect(ch11(river)).toContain('I shall find another way, darling.');
  const dawn = walk11(river, ['o11-river-nothing', 'o11-write-seen']);
  expect(dawn.choices['out.told11']).toBeUndefined();
  if (ids(dawn).some((x) => x === 'o11-night-julian' || x === 'o11-night-sebastian')) {
    const pt = ids(dawn).includes('o11-night-julian') ? 'julian' : 'sebastian';
    const room = walk11(dawn, ['o11-night-' + pt, 'o11-' + pt + '-sex', 'o11-stay']);
    expect(room.facts).toContain('c11.o-evening-consent');
    expect(ch11(room)).toContain('The scene fades.');
    expect(room.choices['c11.o-night-outcome']).toBe('intimate-sex');
    expect(ch11(room)).not.toMatch(SEXUAL);
  }
  const done = c11(dawn, 'o11-night-alone');
  expect(ch11(done)).toContain('I TURNED THE PAGE.');
  expect(ch11(done)).toContain('BURNED.');
  expect(ch11(done)).not.toContain('HE KNOWS.');
  expect(text(done)).toContain('E. V. (II) · REISSUED · UNCLAIMED');
});

it('deepening: three moments, each with a neutral pick that changes no flag', () => {
  const lobby = walk11(ten(), ['begin-outside', 'o11-price-photo']);
  expect(ids(lobby)).toEqual(['o11-clients-listen', 'o11-clients-look', 'o11-clients-speak']);
  expect(ch11(c11(lobby, 'o11-clients-speak'))).toContain('“I can hear you,”');
  const run = (cl: string, own: string, wr: string) => {
    const iris = c11(lobby, cl);
    expect(ids(iris)).toEqual(['o11-iris-warned', 'o11-iris-open', 'o11-iris-quiet']);
    const shelf = c11(iris, 'o11-iris-quiet');
    expect(ids(shelf)).toEqual(['o11-own-read', 'o11-own-trace', 'o11-own-close']);
    const stairs = walk11(shelf, [own, 'o11-page-photo']);
    const river = c11(stairs, 'o11-slip-passed');
    const dawn = c11(river, 'o11-river-all');
    expect(ids(dawn)).toEqual(['o11-write-seen', 'o11-write-proved', 'o11-write-tomorrow']);
    return walk11(dawn, [wr, 'o11-night-alone']);
  };
  const a = run('o11-clients-listen', 'o11-own-read', 'o11-write-seen');
  const b = run('o11-clients-look', 'o11-own-trace', 'o11-write-proved');
  const c = run('o11-clients-speak', 'o11-own-close', 'o11-write-tomorrow');
  for (const k of ['out.price11', 'out.layout11', 'out.iris11', 'out.photo11', 'out.slip11', 'out.told11']) {
    expect(a.choices[k]).toEqual(b.choices[k]);
    expect(a.choices[k]).toEqual(c.choices[k]);
  }
  expect(ch11(a)).toContain('NOT CHECKED');
  expect(ch11(b)).toContain('Some things are not entries.');
  expect(a.phase).toBe('complete');
});
