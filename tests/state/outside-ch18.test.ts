import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter18Choices } from '../../src/content/chapter18';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c18 = step('CHAPTER18_CHOOSE', 'chapter18');
const ids = (s: GameState) => chapter18Choices(s).map((c) => c.id.replace(/^chapter18\./, ''));
const walk = (s: GameState, path: string[]) => path.reduce(c18, s);
const ch18 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter18.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*|moan\w*|orgasm\w*)\b/i;

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
const sixteenRoom = () =>
  ['begin-outside', 'o16-dawn-rafe', 'o16-case-set', 'o16-aim-expose', 'o16-inside-rafe', 'o16-inside-marsh', 'o16-outside-switch', 'o16-reply-file', 'o16-first-ledger', 'o16-held-slip', 'o16-wear-grey', 'o16-dressed-rafe', 'o16-leave-write', 'o16-arrive-river'].reduce(c16, fifteenWithRafe());
const sixteenDoor = () =>
  ['begin-outside', 'o16-dawn-quiet', 'o16-case-set', 'o16-aim-trade', 'o16-inside-marsh', 'o16-inside-done', 'o16-outside-rafe', 'o16-reply-bin', 'o16-first-nell', 'o16-held-none', 'o16-wear-black', 'o16-dressed-alone', 'o16-leave-leave', 'o16-arrive-front'].reduce(c16, fifteenWithRafe());
const sixteenCut = () =>
  ['begin-outside', 'o16-dawn-quiet', 'o16-case-set', 'o16-aim-cut', 'o16-inside-none', 'o16-outside-switch', 'o16-reply-pin', 'o16-first-ledger', 'o16-held-nell', 'o16-wear-plain', 'o16-dressed-alone', 'o16-leave-take', 'o16-arrive-car'].reduce(c16, fifteenCut());
const seventeenRoom = () =>
  ['begin-outside', 'o17-card-name', 'o17-open-room', 'o17-press-flaw', 'o17-postman-use', 'o17-offer-draw', 'o17-named-rafe', 'o17-minute-rafe', 'o17-verdict-on', 'o17-last-orchid'].reduce(c17, sixteenRoom());
const seventeenDoor = () =>
  ['begin-outside', 'o17-card-pocket', 'o17-open-silent', 'o17-press-signed', 'o17-postman-stand', 'o17-offer-refuse', 'o17-named-wait', 'o17-minute-sign', 'o17-verdict-on', 'o17-last-yes'].reduce(c17, sixteenDoor());
const seventeenCut = () =>
  ['begin-outside', 'o17-card-leave', 'o17-open-celeste', 'o17-press-cost', 'o17-postman-vouch', 'o17-offer-laugh', 'o17-named-ask', 'o17-minute-sign', 'o17-verdict-on', 'o17-last-no'].reduce(c17, sixteenCut());

it('enters Proof of Delivery from an Outside Chapter 17; Chapter 17 no longer says Chapter 18 is in development', () => {
  const s = seventeenRoom();
  expect([s.scene, s.phase]).toEqual(['chapter17', 'complete']);
  expect(ids(s)).toEqual(['begin-outside']);
  const dispatch = c18(s, 'begin-outside');
  expect(dispatch.phase).toBe('dispatch');
  expect(ch18(dispatch)).toContain('a column headed CHECKED BY.');
  expect(ch18(dispatch)).toContain('You were worth it. C.');
  expect(ch18(dispatch)).toContain('A man in a courier’s jacket with two coffees');
  expect(ids(dispatch)).toEqual(['o18-morning-papers', 'o18-morning-rafe', 'o18-morning-sleep']);
});

it('Rafe stays, a chosen night with him that fades, the whole spine on one real save; it authenticates and ends at the terminal card', () => {
  const dispatch = c18(seventeenRoom(), 'begin-outside');
  const delivery = c18(dispatch, 'o18-morning-rafe');
  expect(delivery.choices['end.morning']).toBe('rafe');
  expect(ch18(delivery)).toContain('with your signature on every page');
  expect(ch18(delivery)).toContain('ACKNOWLEDGED. V.S.');
  expect(ids(delivery)).toEqual(['o18-switch-armed', 'o18-switch-handed', 'o18-switch-disarmed']);
  const consignee = c18(delivery, 'o18-switch-handed');
  expect(consignee.choices['end.switch']).toBe('handed');
  expect(consignee.choices['end.switch-to']).toBeTruthy();
  expect(consignee.choices['end.position']).toBe('expose-full');
  expect(ch18(consignee)).toContain('I’d also like to stay.');
  expect(ids(consignee)).toEqual(['o18-rafe-stay', 'o18-rafe-home']);
  const stays = c18(consignee, 'o18-rafe-stay');
  expect(stays.choices['end.rafe']).toBe('stays');
  expect(ch18(stays)).toContain('I’ll ring at 02:40.');
  expect(ids(stays)).toContain('o18-home-rafe');
  const docket = c18(stays, 'o18-home-rafe');
  expect(docket.choices['end.with']).toBe('rafe');
  expect(ids(docket)).toEqual(['o18-name-adrian', 'o18-name-evelyn', 'o18-name-new']);
  const receipt = walk(docket, ['o18-name-evelyn', 'o18-catalogue-look']);
  expect(ch18(receipt)).toContain('There is no page seven.');
  expect(ch18(receipt)).toContain('A man with no crate');
  expect(ids(receipt)).toEqual(expect.arrayContaining(['o18-rule-verify', 'o18-rule-sign', 'o18-rule-door']));
  const lateNight = walk(receipt, ['o18-rule-verify', 'o18-rule-sign', 'o18-rule-door']);
  expect(ch18(lateNight)).toContain('Countersigned. R.');
  expect(ids(lateNight)).toEqual(['o18-later-invite', 'o18-later-quiet']);
  const invited = c18(lateNight, 'o18-later-invite');
  expect(ids(invited)).toEqual(['o18-later-no-sex', 'o18-later-sex', 'o18-later-goodnight']);
  const scoped = c18(invited, 'o18-later-sex');
  expect(scoped.facts).toContain('c18.o-evening-consent');
  expect(ids(scoped)).toEqual(['o18-later-stop', 'o18-later-close']);
  const done = c18(scoped, 'o18-later-close');
  expect(done.phase).toBe('proof');
  expect(ch18(done)).toContain('The scene fades.');
  expect(ch18(done)).toContain('PROOF OF DELIVERY.');
  expect(ch18(done)).toContain('RAFE LIM. ON THE STAIR, TUESDAYS.');
  expect(ch18(done)).toContain('I AM.');
  expect(ch18(done)).toContain('My name is Evelyn Vale. I was sent out unclaimed. I signed for myself.');
  expect(ch18(done)).toContain('The end of the Outside route.');
  expect(ch18(done)).not.toMatch(SEXUAL);
  expect(ids(done)).toEqual([]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('stopping a chosen night is honoured at once', () => {
  const s = walk(c18(seventeenRoom(), 'begin-outside'), ['o18-morning-papers', 'o18-switch-armed', 'o18-rafe-stay', 'o18-home-rafe', 'o18-name-new', 'o18-catalogue-sealed', 'o18-rule-people', 'o18-rule-name', 'o18-rule-source', 'o18-later-invite', 'o18-later-no-sex']);
  const done = walk(s, ['o18-later-stop']);
  expect(done.phase).toBe('proof');
  expect(ch18(done)).toContain('he stops at once');
  expect(ch18(done)).toContain('I wrote a name in the box marked SIGNED FOR BY');
});

it('Rafe goes home with Nell’s file: no partner; he rings at 02:40 once a month', () => {
  const s = seventeenDoor();
  const dispatch = c18(s, 'begin-outside');
  expect(ch18(dispatch)).toContain('Is it done? Tell me properly.');
  const consignee = walk(dispatch, ['o18-morning-rafe', 'o18-switch-armed']);
  const home = c18(consignee, 'o18-rafe-home');
  expect(home.choices['end.rafe']).toBe('home');
  expect(ch18(home)).toContain('I’ll ring at 02:40. Once a month.');
  expect(ids(home)).not.toContain('o18-home-rafe');
  const docket = c18(home, 'o18-home-none');
  const receipt = walk(docket, ['o18-name-adrian', 'o18-catalogue-burn']);
  expect(ch18(receipt)).toContain('a postcard from Singapore');
  const done = walk(receipt, ['o18-rule-verify', 'o18-rule-sign', 'o18-rule-source', 'o18-later-own']);
  expect(ch18(done)).toContain('RAFE LIM. HOME.');
  expect(ch18(done)).toContain('My name is Adrian Vale.');
  expect(ch18(done)).toContain('A quiet life');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('Rafe cut: one last page, blank; no Rafe in her life; the margins are her own', () => {
  const s = seventeenCut();
  const dispatch = c18(s, 'begin-outside');
  expect(ids(dispatch)).toEqual(['o18-morning-papers', 'o18-morning-sleep']);
  const consignee = walk(dispatch, ['o18-morning-sleep', 'o18-switch-disarmed']);
  expect(ch18(consignee)).toContain('It is blank.');
  expect(ids(consignee)).toEqual(['o18-blank-keep', 'o18-blank-post', 'o18-blank-burn']);
  const blank = c18(consignee, 'o18-blank-post');
  expect([blank.choices['end.rafe'], blank.choices['c18.o-blank']]).toEqual(['blank', 'post']);
  expect(ids(blank)).not.toContain('o18-home-rafe');
  const receipt = walk(blank, ['o18-home-none', 'o18-name-adrian', 'o18-catalogue-sealed', 'o18-rule-verify', 'o18-rule-sign', 'o18-rule-door']);
  expect(ch18(receipt)).toContain('Countersigned. E.V.');
  expect(ch18(receipt)).toContain('Signed. I checked.');
  const done = c18(receipt, 'o18-later-own');
  expect(ch18(done)).toContain('NOBODY. A BLANK PAGE.');
  expect(ch18(done)).toContain('PROOF OF DELIVERY.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(chapter18Choices(done)).toEqual([]);
});
