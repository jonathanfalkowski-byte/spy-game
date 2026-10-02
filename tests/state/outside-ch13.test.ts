import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter13Choices, fadeCoercion13 } from '../../src/content/chapter13';
import { chapter14Choices } from '../../src/content/chapter14';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c13 = step('CHAPTER13_CHOOSE', 'chapter13');
const c14 = step('CHAPTER14_CHOOSE', 'chapter14');
/** A real Outside Chapter 12 complete save (gave the hour; photographed the page; Nora with him at the table). */
const twelve = () => {
  const ten = ['begin-outside', 'o10-box-water', 'o10-slip-go', 'o10-dress-black', 'o10-adrian-composed', 'o10-order-give', 'o10-paper-pin', 'o10-press-report', 'o10-text-keep', 'o10-week-on', 'o10-night-alone'].reduce(c10, nine());
  const eleven = ['begin-outside', 'o11-price-photo', 'o11-clients-listen', 'o11-iris-quiet', 'o11-own-close', 'o11-page-photo', 'o11-slip-passed', 'o11-river-all', 'o11-write-seen', 'o11-night-alone'].reduce(c11, ten);
  return ['begin-outside', 'o12-ticket-together', 'o12-heat-flowers', 'o12-arrivals-on', 'o12-seat-sit', 'o12-katong-along', 'o12-step-wait', 'o12-flat-with', 'o12-nora-with', 'o12-trust-ask', 'o12-wall-beside'].reduce(c12, eleven);
};
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) {
    if (v === undefined) delete x.choices[k];
    else x.choices[k] = v;
  }
  return x;
};
const ids = (s: GameState) => chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
const walk13 = (s: GameState, path: string[]) => path.reduce(c13, s);
const ch13 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter13.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
/** Story text only: the content notice and choice notices are not narrative. */
const story13 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter13.')).flatMap((h) => h.blocks).filter((b) => b.kind !== 'notice').map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
/** Words that must never appear on the comply path (CONTENT_DIRECTION §2). */
const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|kiss\w*|moan\w*|sex\w*|nipples?|arous\w*|lust\w*|orgasm\w*)\b/i;
const BEHIND_THE_DOOR = /\b(bed|touch\w*|skin|mouth|hands on|inside you)\b/i;

it('enters The Price from an Outside Chapter 12, with the content notice; the Chapter 14 bridge steps aside', () => {
  const s = twelve();
  expect([s.scene, s.phase]).toEqual(['chapter12', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  expect(chapter14Choices(s)).toEqual([]);
  const terms = c13(s, 'begin-outside');
  expect(terms.phase).toBe('terms');
  expect(ch13(terms)).toContain('Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath.');
  expect(ch13(terms)).toContain('Suite 1109 is ours. There is a camera behind the mirror.');
  expect(ch13(terms)).toContain('You gave me a place and an hour, and I have been kind with them.');
  // the threat is to the source and to Maya: non-sexual
  expect(ch13(terms)).toContain('I should hate for a man like that to be found.');
  expect(ids(terms)).toEqual(['o13-msg-wall', 'o13-msg-book', 'o13-msg-face']);
  expect(ids(c13(terms, 'o13-msg-wall'))).toEqual(['o13-terms-on']);
});

it('comply: nothing behind the door, the fade cuts to the corridor, the recovery is a refuge; it authenticates and runs straight into Chapter 14', () => {
  const week = walk13(twelve(), ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike']);
  expect(ids(week)).toEqual(['o13-move-rafe', 'o13-move-maya', 'o13-move-alone']);
  const dusk = c13(week, 'o13-move-rafe');
  expect(dusk.choices['out.ledger13']).toBe('yes');
  expect(ch13(dusk)).toContain('My ledger. Every handoff I carried for her');
  expect(ids(dusk)).toEqual(['o13-reply-comply', 'o13-reply-refuse', 'o13-reply-turn']);
  const door = c13(dusk, 'o13-reply-comply');
  expect([door.choices['c13.answer'], door.choices['act3.honeypot']]).toEqual(['complied', 'done']);
  const lead = door.history.at(-1)!.blocks;
  expect(lead[0].text).toContain('You get ready the way you pack for a journey you did not choose');
  // the reader's fade: one line, then the corridor and the door
  const faded = fadeCoercion13(lead);
  expect(faded[0].text).toContain('Faded, at your request');
  expect(faded.some((b) => b.text.startsWith('The corridor on the eleventh floor of the Claremont is long and quiet'))).toBe(true);
  expect(faded.map((b) => b.text).join('\n')).not.toContain('Owen Marsh at the end of it');
  expect(ids(door)).toEqual(['o13-door-look', 'o13-door-away']);
  const hours = c13(door, 'o13-door-look');
  expect(ch13(hours)).toContain('The door closes behind you.');
  // nothing behind the door, and nothing eroticised before it
  expect(story13(hours)).not.toMatch(SEXUAL);
  // after the door closes, the next thing on screen is the car home: nothing is described in between
  const behind = story13(hours).split('The door closes behind you.')[1];
  expect(behind.trimStart().startsWith('The car home.')).toBe(true);
  expect(behind).not.toMatch(BEHIND_THE_DOOR);
  expect(ch13(hours)).toContain('Lovely. You see how easy it is.');
  expect(ids(hours)).toEqual(['o13-recover-maya', 'o13-recover-wall', 'o13-recover-phone', 'o13-recover-alone']);
  const morrow = c13(hours, 'o13-recover-phone');
  expect(ch13(morrow)).toContain('I’ll read you the shipping forecast.');
  expect(story13(morrow)).not.toMatch(SEXUAL);
  const done = walk13(morrow, ['o13-sunday-walk', 'o13-morrow-on']);
  expect(done.phase).toBe('complete');
  expect(ch13(done)).toContain('THE CLAREMONT. 1109.');
  expect(ch13(done)).toContain('DONE.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  // Chapter 14 follows directly, and Rafe remembers the Thursday
  expect(ids14(done)).toEqual(['begin-outside']);
  const reck = ['begin-outside', 'o14-seam-summon'].reduce(c14, done);
  const t14 = reck.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
  expect(t14).toContain('I read you the shipping forecast and I did not ask.');
});
const ids14 = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));

it('refuse: Meridian finds his lodging, never her body; no Marsh ally; the wall records it', () => {
  const door = walk13(twelve(), ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike', 'o13-move-alone', 'o13-reply-refuse']);
  expect([door.choices['c13.answer'], door.choices['act3.honeypot'], door.choices['out.rafe13']]).toEqual(['refused', 'refused', 'hiding']);
  expect(ch13(door)).toContain('Pity, darling. It is only paper.');
  const morrow = walk13(door, ['o13-door-on', 'o13-hours-on']);
  expect(ch13(morrow)).toContain('They found the lodging.');
  expect(ch13(morrow)).toContain('I was in a launderette on the other side of the river');
  const done = walk13(morrow, ['o13-sunday-walk', 'o13-morrow-on']);
  expect(ch13(done)).toContain('REFUSED. THEY FOUND HIS LODGING.');
  expect(done.choices['act3.ally.marsh']).toBeUndefined();
  expect(story13(done)).not.toMatch(SEXUAL);
  const reck = ['begin-outside', 'o14-seam-summon'].reduce(c14, done);
  const t14 = reck.history.filter((h) => String(h.node).startsWith('chapter14.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
  expect(t14).toContain('I have never been so glad of a launderette.');
});

it('turn: his ledger to Marsh in the lift; a staged scene, both clothed and in on it; Marsh an ally who keeps his name off the page', () => {
  const dusk = walk13(twelve(), ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike', 'o13-move-rafe']);
  const door = c13(dusk, 'o13-reply-turn');
  expect(door.choices['act3.honeypot']).toBe('staged');
  expect(ch13(door)).toContain('Then we’d better give them something to watch.');
  expect(ch13(door)).toContain('both of you clothed');
  expect(ch13(door)).toContain('“Is this all right?” “Yes. Keep going. Slower.”');
  const morrow = walk13(door, ['o13-door-on', 'o13-hours-on']);
  expect(morrow.choices['act3.ally.marsh']).toBe('in');
  expect(morrow.facts).toContain('c13.o-marsh');
  expect(morrow.facts).toContain('c13.o-evening-consent');
  expect(ch13(morrow)).toContain('Then he is a braver man than I am.');
  const done = walk13(morrow, ['o13-sunday-walk', 'o13-morrow-on']);
  expect(ch13(done)).toContain('STAGED. MARSH IS OURS.');
  expect(ch13(done)).toContain('HIS LEDGER. HIS HAND. MARSH KEEPS HIS NAME.');
});

it('turn on her own verified page, without telling him; and with no proof at all the turn is not offered', () => {
  const week = walk13(twelve(), ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike', 'o13-move-alone']);
  expect(ids(week)).toEqual(['o13-reply-comply', 'o13-reply-refuse', 'o13-reply-turn']);
  const door = c13(week, 'o13-reply-turn');
  expect(ch13(door)).toContain('a page you verified yourself');
  const bare = walk13(withFlags(twelve(), { 'out.verified': undefined }), ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike', 'o13-move-alone']);
  expect(ids(bare)).toEqual(['o13-reply-comply', 'o13-reply-refuse']);
});

it('deepening: three moments around, never inside, the coercion beat; each pick is neutral', () => {
  const terms = c13(twelve(), 'begin-outside');
  expect(ids(terms)).toEqual(['o13-msg-wall', 'o13-msg-book', 'o13-msg-face']);
  expect(ch13(c13(terms, 'o13-msg-wall'))).toContain('THE CLAREMONT. THE FIRST THURSDAY. NINE. OWEN MARSH.');
  expect(ch13(c13(terms, 'o13-msg-book'))).toContain('All true.');
  const week = walk13(terms, ['o13-msg-face', 'o13-terms-on']);
  expect(ids(week)).toEqual(['o13-see-bike', 'o13-see-paper', 'o13-see-none']);
  expect(ch13(c13(week, 'o13-see-bike'))).toContain('locks it to the railings with two locks');
  expect(ch13(c13(week, 'o13-see-paper'))).toContain('never learn they were protected');
  const run = (msg: string, see: string, sun: string) => {
    const dusk = walk13(terms, [msg, 'o13-terms-on', see, 'o13-move-rafe']);
    const door = c13(dusk, 'o13-reply-turn');
    const morrow = walk13(door, ['o13-door-on', 'o13-hours-on']);
    expect(ids(morrow)).toEqual(['o13-sunday-walk', 'o13-sunday-letter', 'o13-sunday-stove']);
    return walk13(morrow, [sun, 'o13-morrow-on']);
  };
  const a = run('o13-msg-wall', 'o13-see-bike', 'o13-sunday-walk');
  const b = run('o13-msg-book', 'o13-see-paper', 'o13-sunday-letter');
  const c = run('o13-msg-face', 'o13-see-none', 'o13-sunday-stove');
  for (const k of ['c13.answer', 'act3.honeypot', 'act3.ally.marsh', 'out.ledger13', 'out.told13']) {
    expect(a.choices[k]).toEqual(b.choices[k]);
    expect(a.choices[k]).toEqual(c.choices[k]);
  }
  expect(ch13(b)).toContain('You do not send it.');
  // the new moments add nothing sexual, and the comply path is otherwise untouched: the notice is still the first block
  expect(story13(a)).not.toMatch(SEXUAL);
  const comply = walk13(terms, ['o13-msg-face', 'o13-terms-on', 'o13-see-none', 'o13-move-alone', 'o13-reply-comply']);
  expect(ch13(comply)).toContain('Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath.');
  expect(ids(comply)).toEqual(['o13-door-look', 'o13-door-away']);
});
