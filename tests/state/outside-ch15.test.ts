import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter15Choices } from '../../src/content/chapter15';
import { chapter16Choices } from '../../src/content/chapter16';

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
const ids = (s: GameState) => chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);
const ch15 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter15.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*|moan\w*|orgasm\w*)\b/i;
const DEATH = /\b(drowned|jumped|pushed her|killed her|murdered|suicide)\b/i;

/** A real Outside Chapter 12 complete save (as in outside-ch13.test.ts). */
const twelve = () => {
  const ten = ['begin-outside', 'o10-slip-go', 'o10-dress-black', 'o10-adrian-composed', 'o10-order-give', 'o10-press-report', 'o10-week-on', 'o10-night-alone'].reduce(c10, nine());
  const eleven = ['begin-outside', 'o11-price-photo', 'o11-iris-quiet', 'o11-page-photo', 'o11-slip-passed', 'o11-river-all', 'o11-night-alone'].reduce(c11, ten);
  return ['begin-outside', 'o12-ticket-together', 'o12-arrivals-on', 'o12-katong-along', 'o12-flat-with', 'o12-nora-with', 'o12-trust-ask', 'o12-wall-beside'].reduce(c12, eleven);
};
/** Ch13 turned on his ledger (Marsh an ally); Ch14: told, spared, and the way the player chooses. */
const fourteen = (way: 'trust' | 'cut' | 'keep') => {
  const thirteen = ['begin-outside', 'o13-terms-on', 'o13-move-rafe', 'o13-reply-turn', 'o13-door-on', 'o13-hours-on', 'o13-morrow-on'].reduce(c13, twelve());
  return ['begin-outside', 'o14-seam-summon', 'o14-reck-press', 'o14-sloane-spare', 'o14-way-' + way, 'o14-evening-alone'].reduce(c14, thirteen);
};

it('enters The Courier’s Door from an Outside Chapter 14; Chapter 14 no longer says Act IV is in development', () => {
  const s = fourteen('trust');
  expect([s.scene, s.phase]).toEqual(['chapter14', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  const chart = walk15(s, ['begin-outside', 'o15-plan-leave']);
  expect(chart.phase).toBe('chart');
  expect(ch15(chart)).toContain('I keep everything, darling');
  expect(ch15(chart)).toContain('04:58');
  // Rafe and Marsh (turned in Ch13) are on offer; nobody is forced
  expect(ids(chart)).toEqual(expect.arrayContaining(['o15-crew-rafe', 'o15-crew-marsh', 'o15-crew-none']));
});

it('the courier’s door with Rafe and Marsh, a talked snag, the drawer, the slip shown, the cost is Rafe on the record; a chosen night that fades; it authenticates', () => {
  const chart = walk15(fourteen('trust'), ['begin-outside', 'o15-plan-leave']);
  const approach = walk15(chart, ['o15-crew-rafe', 'o15-crew-marsh']);
  expect(approach.phase).toBe('approach');
  expect(approach.choices['out.crew15']).toBe('rafe,marsh');
  expect(ids(approach)).toContain('o15-way-courier');
  expect(ids(approach)).toContain('o15-way-invited');
  const snag = c15(approach, 'o15-way-courier');
  expect(ch15(snag)).toContain('the river door');
  expect(ids(snag)).toEqual(['o15-snag-talk', 'o15-snag-hide', 'o15-snag-bold']);
  const shelves = walk15(snag, ['o15-snag-talk', 'o15-page-back']);
  expect(shelves.phase).toBe('shelves');
  expect(ch15(shelves)).toContain('LINDEN, E.');
  const drawer = c15(shelves, 'o15-drawer-open');
  expect(drawer.choices['act3.nell-order']).toBe('taken');
  expect(drawer.facts).toContain('c15.o-linden');
  expect(ch15(drawer)).toContain('ROTTERDAM · COURIER · R. L. · SATURDAY, THREE DAYS · NON-REFUSABLE · AUTH. C.');
  expect(ids(drawer)).toEqual(['o15-slip-gave', 'o15-slip-held']);
  const more = c15(drawer, 'o15-slip-gave');
  expect(ch15(more)).toContain('It was never the firm. It was her, by name, in her own hand.');
  expect(ids(more)).toEqual(['o15-took-adrian', 'o15-took-cards', 'o15-took-lim']);
  const reckon = walk15(more, ['o15-took-lim', 'o15-post-mail']);
  expect(reckon.phase).toBe('reckon');
  expect(ids(reckon).sort()).toEqual(['o15-cost-ally', 'o15-cost-face', 'o15-cost-money', 'o15-cost-rafe']);
  const vigil = c15(reckon, 'o15-cost-rafe');
  expect(vigil.choices['act3.leash']).toBe('broken');
  expect(vigil.choices['c15.cost']).toBe('relationship');
  expect(vigil.choices['c15.cost-who']).toBe('rafe');
  expect(vigil.choices['act3.switch']).toContain('rafe');
  expect(vigil.choices['act3.switch']).toContain('marsh');
  expect(ch15(vigil)).toContain('Thank you for coming in.');
  expect(ch15(vigil)).toContain('Owen Marsh');
  const phone = vigil;
  expect(ids(phone)).toEqual(['o15-phone-return', 'o15-phone-river', 'o15-phone-keep']);
  const night = c15(phone, 'o15-phone-keep');
  expect(night.choices['act3.black-phone']).toBe('keep');
  expect(ids(night)).toContain('o15-night-rafe');
  const room = c15(night, 'o15-night-rafe');
  expect(ch15(room)).toContain('If I ever say her name when I mean yours, stop me.');
  const scoped = c15(room, 'o15-rafe-sex');
  expect(scoped.facts).toContain('c15.o-evening-consent');
  const done = c15(scoped, 'o15-stay');
  expect(done.phase).toBe('complete');
  expect(done.choices['c15.o-night-outcome']).toBe('intimate-sex');
  expect(ch15(done)).toContain('The scene fades.');
  expect(ch15(done)).toContain('ROTTERDAM. SATURDAY. AUTH. C. HE KNOWS.');
  expect(ch15(done)).toContain('THE BOARD MEETS.');
  expect(ch15(done)).not.toContain('outside road — in development]');
  expect(ch15(done)).not.toMatch(SEXUAL);
  // how Nell died is not told here, and Rafe never makes her Nell
  expect(ch15(done)).not.toMatch(DEATH);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  expect(chapter16Choices(done).map((c) => c.id)).toEqual(['chapter16.begin-outside']);
});

it('cut him loose: alone, by invitation, bold; the slip is held; the cost is her face; the night can be declined', () => {
  const s = fourteen('cut');
  const chart = walk15(s, ['begin-outside', 'o15-plan-leave']);
  expect(ids(chart)).not.toContain('o15-crew-rafe');
  expect(ch15(chart)).toContain('you cut him loose');
  const approach = c15(chart, 'o15-crew-none');
  expect(ids(approach)).not.toContain('o15-way-courier');
  const snag = c15(approach, 'o15-way-invited');
  expect(ch15(snag)).toContain('Celeste');
  const shelves = walk15(snag, ['o15-snag-bold', 'o15-page-back']);
  const drawer = c15(shelves, 'o15-drawer-open');
  // no Rafe on the crew, so the slip can only be held, never shown
  expect(ids(drawer)).toEqual(['o15-slip-held']);
  const more = c15(drawer, 'o15-slip-held');
  // no LIM, R. file when he was cut
  expect(ids(more)).toEqual(['o15-took-adrian', 'o15-took-cards']);
  const reckon = walk15(more, ['o15-took-cards', 'o15-post-mail']);
  expect(ids(reckon)).not.toContain('o15-cost-rafe');
  const vigil = c15(reckon, 'o15-cost-face');
  expect(vigil.choices['act3.leash']).toBe('broken');
  expect(vigil.choices['c15.cost']).toBe('visibility');
  const night = c15(vigil, 'o15-phone-return');
  expect(ids(night)).not.toContain('o15-night-rafe');
  const done = c15(night, 'o15-night-alone');
  expect(done.phase).toBe('complete');
  expect(ch15(done)).toContain('HE DOESN’T KNOW YET.');
  expect(ch15(done)).not.toMatch(DEATH);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('spend an ally (Marsh), and the intimate night can be stopped or declined', () => {
  const chart = walk15(fourteen('keep'), ['begin-outside', 'o15-plan-leave']);
  const approach = c15(chart, 'o15-crew-none');
  const shelves = walk15(approach, ['o15-way-invited', 'o15-snag-hide', 'o15-page-back']);
  const reckon = walk15(shelves, ['o15-drawer-open', 'o15-slip-held', 'o15-took-adrian', 'o15-post-mail']);
  expect(ids(reckon)).toContain('o15-cost-ally');
  const vigil = c15(reckon, 'o15-cost-ally');
  expect(vigil.choices['c15.cost']).toBe('ally');
  expect(vigil.choices['c15.cost-who']).toBe('marsh');
  const night = c15(vigil, 'o15-phone-river');
  const room = walk15(night, ['o15-night-rafe', 'o15-rafe-no-sex']);
  const done = c15(room, 'o15-stop');
  expect(done.choices['c15.o-night-outcome']).toBe('withdrawn');
  expect(done.phase).toBe('complete');
  const declined = walk15(night, ['o15-night-rafe', 'o15-leave']);
  expect(declined.choices['c15.o-night-outcome']).toBe('declined');
});

it('deepening: three moments, each with a neutral pick that changes no flag; Rafe cut changes the plan’s words', () => {
  // 1. the floor-plan, before the crew
  const plan = c15(fourteen('trust'), 'begin-outside');
  expect(ids(plan)).toEqual(['o15-plan-trace', 'o15-plan-walk', 'o15-plan-leave']);
  const traced = c15(plan, 'o15-plan-trace');
  expect(ch15(traced)).toContain('TAKEN ON TRUST');
  expect(ids(traced)).toEqual(expect.arrayContaining(['o15-crew-rafe', 'o15-crew-none']));
  const walked = c15(plan, 'o15-plan-walk');
  expect(ch15(walked)).toContain('a florist’s van pulls up');
  const cutPlan = c15(fourteen('cut'), 'begin-outside');
  expect(ch15(c15(cutPlan, 'o15-plan-trace'))).toContain('GUESS');
  // 2. the page beside hers, before the drawer
  const approach = walk15(c15(plan, 'o15-plan-leave'), ['o15-crew-none', 'o15-way-invited', 'o15-snag-hide']);
  expect(ids(approach.phase === 'shelves' ? approach : approach)).toEqual(['o15-page-take', 'o15-page-back', 'o15-page-mark']);
  const marked = c15(approach, 'o15-page-mark');
  expect(ch15(marked)).toContain('SEEN.');
  expect(ids(marked)).toEqual(['o15-drawer-open']);
  // 3. the copies, before the price
  const reckon = walk15(marked, ['o15-drawer-open', 'o15-slip-held', 'o15-took-adrian']);
  expect(ids(reckon)).toEqual(['o15-post-self', 'o15-post-rafe', 'o15-post-mail']);
  const byRafe = c15(reckon, 'o15-post-rafe');
  expect(ch15(byRafe)).toContain('Delivered, signed, with the time.');
  expect(ids(byRafe)).toContain('o15-cost-face');
  // neutral: the same cost and the same keys whichever moment is picked
  const a = c15(walk15(c15(plan, 'o15-plan-leave'), ['o15-crew-none', 'o15-way-invited', 'o15-snag-hide', 'o15-page-back', 'o15-drawer-open', 'o15-slip-held', 'o15-took-adrian', 'o15-post-self']), 'o15-cost-face');
  const b = c15(walk15(c15(plan, 'o15-plan-walk'), ['o15-crew-none', 'o15-way-invited', 'o15-snag-hide', 'o15-page-take', 'o15-drawer-open', 'o15-slip-held', 'o15-took-adrian', 'o15-post-mail']), 'o15-cost-face');
  for (const k of ['act3.leash', 'act3.switch', 'c15.cost', 'out.cost15', 'out.took15', 'out.slip15', 'act3.nell-order']) expect(a.choices[k]).toEqual(b.choices[k]);
  // no Rafe delivery option when he is cut
  const cutReckon = walk15(c15(cutPlan, 'o15-plan-leave'), ['o15-crew-none', 'o15-way-invited', 'o15-snag-hide', 'o15-page-back', 'o15-drawer-open', 'o15-slip-held', 'o15-took-cards']);
  expect(ids(cutReckon)).toEqual(['o15-post-self', 'o15-post-mail']);
});
