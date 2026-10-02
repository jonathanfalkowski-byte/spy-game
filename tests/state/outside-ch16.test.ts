import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter16Choices } from '../../src/content/chapter16';
import { chapter17Choices } from '../../src/content/chapter17';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c15 = step('CHAPTER15_CHOOSE', 'chapter15');
const c16 = step('CHAPTER16_CHOOSE', 'chapter16');
const ids = (s: GameState) => chapter16Choices(s).map((c) => c.id.replace(/^chapter16\./, ''));
const walk = (s: GameState, path: string[]) => path.reduce(c16, s);
const ch16 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter16.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*|moan\w*|orgasm\w*)\b/i;
const DEATH = /\b(drowned|jumped|pushed her|killed her|murdered|suicide)\b/i;
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) {
    if (v === undefined) delete x.choices[k];
    else x.choices[k] = v;
  }
  return x;
};

const twelve = () => {
  const ten = ['begin-outside', 'o10-box-water', 'o10-slip-go', 'o10-dress-black', 'o10-adrian-composed', 'o10-order-give', 'o10-paper-pin', 'o10-press-report', 'o10-text-keep', 'o10-week-on', 'o10-night-alone'].reduce(c10, nine());
  const eleven = ['begin-outside', 'o11-price-photo', 'o11-clients-listen', 'o11-iris-quiet', 'o11-own-close', 'o11-page-photo', 'o11-slip-passed', 'o11-river-all', 'o11-write-seen', 'o11-night-alone'].reduce(c11, ten);
  return ['begin-outside', 'o12-ticket-together', 'o12-heat-flowers', 'o12-arrivals-on', 'o12-seat-sit', 'o12-katong-along', 'o12-step-wait', 'o12-flat-with', 'o12-nora-with', 'o12-trust-ask', 'o12-wall-beside'].reduce(c12, eleven);
};
const fourteen = (way: 'trust' | 'cut' | 'keep') => {
  const thirteen = ['begin-outside', 'o13-terms-on', 'o13-move-rafe', 'o13-reply-turn', 'o13-door-on', 'o13-hours-on', 'o13-morrow-on'].reduce(c13, twelve());
  return ['begin-outside', 'o14-seam-summon', 'o14-reck-press', 'o14-sloane-spare', 'o14-way-' + way, 'o14-evening-alone'].reduce(c14, thirteen);
};
/** Rafe on the crew at the courier's door; Marsh outside; his statement on the record; a chosen night with him. */
const fifteenWithRafe = () =>
  ['begin-outside', 'o15-plan-leave', 'o15-crew-rafe', 'o15-crew-marsh', 'o15-way-courier', 'o15-snag-talk', 'o15-page-back', 'o15-drawer-open', 'o15-slip-gave', 'o15-took-lim', 'o15-post-mail', 'o15-cost-rafe', 'o15-phone-keep', 'o15-night-rafe', 'o15-rafe-sex', 'o15-stay'].reduce(c15, fourteen('trust'));
/** Rafe cut; alone, by invitation; her face spent. */
const fifteenCut = () => ['begin-outside', 'o15-plan-leave', 'o15-crew-none', 'o15-way-invited', 'o15-snag-bold', 'o15-page-back', 'o15-drawer-open', 'o15-slip-held', 'o15-took-cards', 'o15-post-mail', 'o15-cost-face', 'o15-phone-return', 'o15-night-alone'].reduce(c15, fourteen('cut'));

it('enters Her Own Hand from an Outside Chapter 15; Ch15 no longer says Act IV is in development', () => {
  const s = fifteenWithRafe();
  expect([s.scene, s.phase]).toEqual(['chapter15', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  const sheet = c16(s, 'begin-outside');
  expect(sheet.phase).toBe('sheet');
  expect(ch16(sheet)).toContain('CHECKED BY');
  expect(ch16(sheet)).toContain('LINDEN, E.');
  expect(ch16(sheet)).toContain('THE CASE: ');
  expect(ids(sheet)).toEqual(['o16-dawn-rafe', 'o16-dawn-phone', 'o16-dawn-nell', 'o16-dawn-quiet']);
});

it('with Rafe in the room: expose, signed; the slip held back; Rafe straightens her collar; the river door; it authenticates', () => {
  const sheet = c16(fifteenWithRafe(), 'begin-outside');
  const dawn = c16(sheet, 'o16-dawn-rafe');
  expect(ch16(dawn)).toContain('On the bench opposite');
  const stand = c16(dawn, 'o16-case-set');
  expect(['strong', 'overwhelming']).toContain(stand.choices['act4.case']);
  expect(ids(stand)).toEqual(['o16-aim-expose', 'o16-aim-trade', 'o16-aim-cut', 'o16-aim-nell']);
  const retinue = c16(stand, 'o16-aim-expose');
  expect(retinue.choices['act4.aim']).toBe('expose');
  expect(ch16(retinue)).toContain('EVERY PAGE ENCLOSED IS SIGNED. EVERY SIGNATURE IS MINE.');
  expect(ids(retinue)).toEqual(expect.arrayContaining(['o16-inside-rafe', 'o16-inside-marsh', 'o16-inside-none']));
  const inRoom = walk(retinue, ['o16-inside-rafe', 'o16-inside-marsh']);
  expect(inRoom.choices['act4.inside']).toBe('rafe,marsh');
  expect(inRoom.choices['act4.rafe']).toBe('room');
  expect(inRoom.choices['act4.inside-done']).toBe('yes');
  expect(ids(inRoom)).toEqual(['o16-outside-switch']);
  const spread = c16(inRoom, 'o16-outside-switch');
  expect(ch16(spread)).toContain('How very like a bookkeeper, darling.');
  const order = walk(spread, ['o16-reply-file']);
  expect(ids(order)).toEqual(['o16-first-ledger', 'o16-first-nell', 'o16-first-slip', 'o16-first-page', 'o16-first-lim']);
  const held = walk(order, ['o16-first-ledger', 'o16-held-slip']);
  expect(held.choices['act4.first']).toBe('ledger');
  expect(held.choices['act4.held']).toBe('slip');
  const dressed = walk(held, ['o16-wear-grey', 'o16-dressed-rafe']);
  expect(ch16(dressed)).toContain('he lets you go first');
  expect(ids(dressed)).toEqual(['o16-leave-take', 'o16-leave-leave', 'o16-leave-write']);
  const steps = c16(dressed, 'o16-leave-write');
  expect(ids(steps)).toEqual(['o16-arrive-river', 'o16-arrive-notice', 'o16-arrive-front', 'o16-arrive-car']);
  const done = c16(steps, 'o16-arrive-river');
  expect(done.phase).toBe('complete');
  expect(done.choices['act4.arrive']).toBe('river');
  expect(done.choices['act4.benton']).toBe('absent');
  expect(done.facts).toContain('c16.o-approach');
  expect(ch16(done)).toContain('a man in a courier’s jacket with his hat in both hands');
  expect(ch16(done)).toContain('And you brought the post.');
  expect(ch16(done)).toContain('[Chapters 17–18 · outside road — in development]');
  expect(ch16(done)).not.toMatch(SEXUAL);
  expect(ch16(done)).not.toMatch(DEATH);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  expect(chapter17Choices(done)).toEqual([]);
});

it('Rafe at the door; trade quietly', () => {
  const stand = walk(fifteenWithRafe(), ['begin-outside', 'o16-dawn-quiet', 'o16-case-set']);
  const retinue = c16(stand, 'o16-aim-trade');
  expect(ch16(retinue)).toContain('I HAVE SOMETHING YOU WOULD RATHER NOT SEE PUBLISHED');
  const outside = walk(retinue, ['o16-inside-marsh', 'o16-inside-done']);
  expect(outside.choices['act4.rafe']).toBeUndefined();
  expect(ids(outside)).toEqual(['o16-outside-rafe', 'o16-outside-switch']);
  const spread = c16(outside, 'o16-outside-rafe');
  expect(spread.choices['act4.rafe']).toBe('door');
  expect(ch16(spread)).toContain('The river door. Six o’clock.');
  const done = walk(spread, ['o16-reply-bin', 'o16-first-nell', 'o16-held-none', 'o16-wear-black', 'o16-dressed-alone', 'o16-leave-leave', 'o16-arrive-front']);
  expect(done.choices['act4.aim']).toBe('trade');
  expect(done.choices['act4.held']).toBe('none');
  expect(ch16(done)).toContain('And in the street behind you, at the river door');
  expect(ch16(done)).not.toContain('a man in a courier’s jacket with his hat in both hands');
});

it('Rafe cut: nobody beside her, no Rafe anywhere, expose only if she can sign it', () => {
  const s = fifteenCut();
  const sheet = c16(s, 'begin-outside');
  expect(ids(sheet)).toEqual(['o16-dawn-nell', 'o16-dawn-quiet']);
  const stand = walk(sheet, ['o16-dawn-quiet', 'o16-case-set']);
  expect(ids(stand)).toContain('o16-aim-expose');
  const cut = c16(stand, 'o16-aim-cut');
  expect(ch16(cut)).toContain('I AM COMING TO TELL YOU WHAT I CAN PROVE.');
  expect(ch16(cut)).not.toContain('And him.');
  expect(ids(cut)).not.toContain('o16-inside-rafe');
  const noOne = c16(cut, 'o16-inside-none');
  expect(noOne.choices['act4.inside']).toBe('');
  expect(ids(noOne)).not.toContain('o16-outside-rafe');
  const spread = c16(noOne, 'o16-outside-switch');
  expect(spread.choices['act4.rafe']).toBeUndefined();
  const coat = walk(spread, ['o16-reply-pin', 'o16-first-ledger', 'o16-held-nell']);
  const dressed = c16(c16(coat, 'o16-wear-plain'), 'o16-dressed-alone');
  expect(ids(dressed)).toEqual(['o16-leave-take', 'o16-leave-leave', 'o16-leave-write']);
  const steps = c16(dressed, 'o16-leave-take');
  expect(ids(steps)).not.toContain('o16-arrive-river');
  const done = c16(steps, 'o16-arrive-car');
  expect(done.choices['act4.rafe']).toBe('absent');
  expect(ch16(done)).not.toContain('courier’s jacket with his hat');
  expect(ch16(done)).toContain('Celeste Laurent');
  expect(replay(done.ledger, 19)).toEqual(done);
  // with no drawer and no checked pages, she cannot publish what she cannot sign
  const bare = withFlags(c16(fifteenCut(), 'begin-outside'), { 'out.linden15': undefined, 'out.verified': '0' });
  const standBare = walk(bare, ['o16-dawn-quiet', 'o16-case-set']);
  expect(ids(standBare)).toEqual(['o16-aim-trade', 'o16-aim-cut', 'o16-aim-nell']);
  expect(ch16(standBare)).toContain('I can’t sign what I haven’t read.');
});
