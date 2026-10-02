import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter17Choices } from '../../src/content/chapter17';
import { chapter18Choices } from '../../src/content/chapter18';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c17 = step('CHAPTER17_CHOOSE', 'chapter17');
const ids = (s: GameState) => chapter17Choices(s).map((c) => c.id.replace(/^chapter17\./, ''));
const walk = (s: GameState, path: string[]) => path.reduce(c17, s);
const ch17 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter17.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*|moan\w*|orgasm\w*|kiss\w*)\b/i;
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
  const thirteen = ['begin-outside', 'o13-msg-wall', 'o13-terms-on', 'o13-see-bike', 'o13-move-rafe', 'o13-reply-turn', 'o13-door-on', 'o13-hours-on', 'o13-sunday-walk', 'o13-morrow-on'].reduce(c13, twelve());
  return ['begin-outside', 'o14-gap-ledger', 'o14-seam-summon', 'o14-name-say', 'o14-reck-press', 'o14-cup-tea', 'o14-sloane-spare', 'o14-way-' + way, 'o14-evening-alone'].reduce(c14, thirteen);
};
const fifteenWithRafe = () =>
  ['begin-outside', 'o15-plan-leave', 'o15-crew-rafe', 'o15-crew-marsh', 'o15-way-courier', 'o15-snag-talk', 'o15-page-back', 'o15-drawer-open', 'o15-slip-gave', 'o15-took-lim', 'o15-post-mail', 'o15-cost-rafe', 'o15-phone-keep', 'o15-night-rafe', 'o15-rafe-sex', 'o15-stay'].reduce(c15, fourteen('trust'));
const fifteenCut = () => ['begin-outside', 'o15-plan-leave', 'o15-crew-none', 'o15-way-invited', 'o15-snag-bold', 'o15-page-back', 'o15-drawer-open', 'o15-slip-held', 'o15-took-cards', 'o15-post-mail', 'o15-cost-face', 'o15-phone-return', 'o15-night-alone'].reduce(c15, fourteen('cut'));

/** Chapter 16 played with Rafe in the room (expose, the slip held, the river door). */
const sixteenRoom = () =>
  ['begin-outside', 'o16-dawn-rafe', 'o16-case-set', 'o16-aim-expose', 'o16-inside-rafe', 'o16-inside-marsh', 'o16-outside-switch', 'o16-reply-file', 'o16-first-ledger', 'o16-held-slip', 'o16-wear-grey', 'o16-dressed-rafe', 'o16-leave-write', 'o16-arrive-river'].reduce(c16, fifteenWithRafe());
/** Rafe at the river door (trade, nothing held back). */
const sixteenDoor = () =>
  ['begin-outside', 'o16-dawn-quiet', 'o16-case-set', 'o16-aim-trade', 'o16-inside-marsh', 'o16-inside-done', 'o16-outside-rafe', 'o16-reply-bin', 'o16-first-nell', 'o16-held-none', 'o16-wear-black', 'o16-dressed-alone', 'o16-leave-leave', 'o16-arrive-front'].reduce(c16, fifteenWithRafe());
/** Rafe cut; alone; plain clothes. */
const sixteenCut = () =>
  ['begin-outside', 'o16-dawn-quiet', 'o16-case-set', 'o16-aim-cut', 'o16-inside-none', 'o16-outside-switch', 'o16-reply-pin', 'o16-first-ledger', 'o16-held-nell', 'o16-wear-plain', 'o16-dressed-alone', 'o16-leave-take', 'o16-arrive-car'].reduce(c16, fifteenCut());

it('enters Return to Sender from an Outside Chapter 16; Chapter 16 no longer says Act IV is in development', () => {
  const s = sixteenRoom();
  expect([s.scene, s.phase]).toEqual(['chapter16', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  const bearing = c17(s, 'begin-outside');
  expect(bearing.phase).toBe('bearing');
  expect(ch17(bearing)).toContain('E. V. (II) · UNCLAIMED');
  expect(ch17(bearing)).toContain('Do sit, Mr Lim.');
  expect(ch17(bearing)).toContain('And in my grey.');
  expect(ids(bearing)).toEqual(['o17-card-name', 'o17-card-pocket', 'o17-card-leave']);
});

it('Rafe in the room: the post named, the flawed page owned, the courier on the record, the slip lands, Rafe asks for the name, he signs; it authenticates', () => {
  const bearing = c17(sixteenRoom(), 'begin-outside');
  const prov = walk(bearing, ['o17-card-name', 'o17-open-room']);
  expect(ch17(prov)).toContain('Your ledger goes down first');
  expect(ch17(prov)).toContain('A man who stole from his employer');
  expect(ids(prov)).toEqual(['o17-press-signed', 'o17-press-flaw', 'o17-press-cost']);
  const postman = c17(prov, 'o17-press-flaw');
  expect(postman.choices['act4.press']).toBe('flaw');
  expect(ch17(postman)).toContain('PROVENANCE: DISCLOSED.');
  expect(ch17(postman)).toContain('Rafe Lim. Ten years of Tuesdays');
  expect(ids(postman)).toEqual(['o17-postman-vouch', 'o17-postman-stand', 'o17-postman-use']);
  const terms = c17(postman, 'o17-postman-use');
  expect(terms.choices['act4.rafe-beat']).toBe('use');
  expect(ch17(terms)).toContain('no longer, for the first time in ten years, a man who can disappear');
  expect(ch17(terms)).toContain('Let me buy it, darling.');
  const sat = c17(terms, 'o17-offer-draw');
  expect([sat.choices['act4.offer'], sat.choices['act4.held-landed']]).toEqual(['draw', 'slip']);
  expect(ch17(sat)).toContain('ROTTERDAM. COURIER. R. L. SATURDAY. NON-REFUSABLE. AUTH. C.');
  // he had already seen it (shown in the archive): he looks at Celeste, and she is the one who has to look away
  expect(ch17(sat)).toContain('she is the one who has to');
  // Nell, told not shown, as canon, plus the Rotterdam Saturday
  expect(ch17(sat)).toContain('She walked the harbour wall in the dark with that leg, and the driver watched her fall, and didn’t stop.');
  expect(ch17(sat)).toContain('And I sent the post to Rotterdam that morning, Mr Lim');
  expect(ids(sat)).toEqual(['o17-named-ask', 'o17-named-rafe', 'o17-named-wait']);
  const verdict = c17(sat, 'o17-named-rafe');
  expect([verdict.choices['act4.named'], verdict.choices['act4.nell-said'], verdict.choices['act4.rafe-heard']]).toEqual(['rafe', 'eleanor', 'room']);
  expect(ch17(verdict)).toContain('Say her name, Mrs Laurent.');
  expect(ids(verdict)).toEqual(['o17-minute-rafe', 'o17-minute-sign', 'o17-minute-leave']);
  const signed = c17(verdict, 'o17-minute-rafe');
  expect(ch17(signed)).toContain('R. LIM, COURIER.');
  expect(ch17(signed)).toContain('The board will refer itself to the Markets Authority before nine tomorrow');
  const quiet = c17(signed, 'o17-verdict-on');
  expect([quiet.choices['act4.board'], quiet.choices['act4.terms']]).toEqual(['resigned', 'full']);
  expect(ch17(quiet)).toContain('He will never be able to disappear again.');
  const done = c17(quiet, 'o17-last-orchid');
  expect(done.phase).toBe('complete');
  expect(ch17(done)).toContain('Eleanor. All that time I only knew the name on the ferry list.');
  expect(ch17(done)).toContain('[Chapter 18 · outside road — in development]');
  expect(ch17(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  expect(chapter18Choices(done)).toEqual([]);
});

it('Rafe at the river door: the post named, nothing held, the offer refused, he hears it later; no Rafe in the room', () => {
  const bearing = c17(sixteenDoor(), 'begin-outside');
  expect(ch17(bearing)).not.toContain('Do sit, Mr Lim.');
  const prov = walk(bearing, ['o17-card-pocket', 'o17-open-silent']);
  expect(ch17(prov)).toContain('The Jakarta order goes down first');
  const postman = c17(prov, 'o17-press-signed');
  expect(ch17(postman)).toContain('Behind the black glass');
  expect(ids(postman)).toEqual(['o17-postman-vouch', 'o17-postman-stand', 'o17-postman-use']);
  const terms = c17(postman, 'o17-postman-stand');
  const sat = c17(terms, 'o17-offer-refuse');
  expect(sat.choices['act4.held-landed']).toBe('none');
  expect(ch17(sat)).toContain('I’m still here.');
  expect(ids(sat)).toEqual(['o17-named-ask', 'o17-named-wait']);
  expect(ch17(sat)).toContain('a man is waiting for a phone to ring');
  const verdict = c17(sat, 'o17-named-wait');
  expect(verdict.choices['act4.rafe-heard']).toBeUndefined();
  expect(ids(verdict)).toEqual(['o17-minute-sign', 'o17-minute-leave']);
  const done = walk(verdict, ['o17-minute-sign', 'o17-verdict-on', 'o17-last-yes']);
  expect(ch17(done)).toContain('a man beside it in a courier’s jacket');
  expect(ch17(done)).toContain('He only takes his cap off.');
  expect(ch17(done)).not.toContain('Eleanor. All that time');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('Rafe cut, alone, in plain clothes: no Rafe anywhere; a thin case closes ranks and she walks out with the switch', () => {
  const s = sixteenCut();
  const bearing = c17(s, 'begin-outside');
  expect(ch17(bearing)).toContain('Flat shoes. A plain coat. Whom are we being this evening?');
  expect(ch17(bearing)).not.toContain('Mr Lim');
  const prov = walk(bearing, ['o17-card-leave', 'o17-open-celeste']);
  const sat = walk(prov, ['o17-press-cost', 'o17-postman-vouch', 'o17-offer-laugh']);
  expect(ids(sat)).toEqual(['o17-named-ask', 'o17-named-wait']);
  const done = walk(sat, ['o17-named-ask', 'o17-minute-sign', 'o17-verdict-on', 'o17-last-no']);
  expect(done.choices['act4.board']).toBeTruthy();
  expect(ch17(done)).toContain('Then I did one thing right.');
  expect(replay(done.ledger, 19)).toEqual(done);
  // thin case, nobody in the room, nothing owned, nothing drawn out: the board closes ranks
  const thin = withFlags(s, { 'act4.case': 'thin', 'act4.inside': '' });
  const closed = walk(thin, ['begin-outside', 'o17-card-leave', 'o17-open-celeste', 'o17-press-cost', 'o17-postman-stand', 'o17-offer-refuse', 'o17-named-wait', 'o17-minute-leave', 'o17-verdict-on']);
  expect([closed.choices['act4.board'], closed.choices['act4.terms']]).toEqual(['closed', 'none']);
  expect(ch17(closed)).toContain('The board closes ranks.');
  expect(ch17(closed)).toContain('the switch armed');
});
