import { homeSceneArt } from '../../src/ui/home-scene-art';
import { beforeAll, expect, it } from 'vitest';
import { c5, dress5, end4, walk5 } from '../chapter5-helpers';
import { chapter5Blocks, chapter5Choices } from '../../src/content/chapter5';
import { continuity5, wardrobe5 } from '../../src/content/chapter5-continuity';
import { harbourShotPlan5 } from '../../src/content/chapter5-harbour-shots';
import { get5, cash5, read5 } from '../../src/content/chapter5-model';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
let paid: GameState, free: GameState;
beforeAll(() => {
  paid = end4('professional');
  free = end4();
}, 15000);
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const rest = [
  'leave-room',
  'offer-decline',
  'service-municipal',
  'terms-refuse',
  'people-finish',
  'want-none',
  'place-jacket',
];

it('carries a physical voucher out and returns only its receipt after a single redemption', () => {
  let s = c5(paid, 'begin');
  expect(continuity5(s)?.voucher).toBe('folder-home');
  s = c5(s, 'go-spend');
  expect(continuity5(s)?.voucher).toBe('bag');
  const carried = s;
  s = c5(s, 'redeem-voucher');
  expect(cash5(s)).toBe(1500);
  expect(continuity5(s)?.voucher).toBe('accounts-retained');
  expect(text(s)).toContain('stamps and retains it');
  expect(chapter5Choices(s).some((c) => c.id.endsWith('redeem-voucher'))).toBe(false);
  const noRedeem = c5(carried, 'spend-nothing');
  expect(continuity5(noRedeem)?.voucher).toBe('folder-home');
  expect(cash5(noRedeem)).toBe(900);
});

it.each(['phone', 'wardrobe', 'accessory', 'dinner', 'nothing'])(
  'walks a complete %s purchase route with honest custody and replay',
  (purchase) => {
    let s = walk5(paid, [
      'begin',
      'go-spend',
      purchase === 'nothing' ? 'spend-nothing' : 'buy-' + purchase,
      'echo-intro',
      'invitation-decline',
      'look-minimal',
      'attention-photo',
      'leave-room',
      'concept-private',
      'offer-accept',
      'withhold',
      'service-self',
      'terms-pay',
      'message-maya',
      'people-finish',
      'want-salon',
      'desire-negotiate',
    ]);
    expect(get5(s, 'published')).toBeUndefined();
    expect(get5(s, 'guest-card')).toBe('table-home');
    expect(get5(s, 'wardrobe')).toBe('c05.minimal');
    expect(continuity5(s)?.jacket).toBe('wardrobe');
    expect(get5(s, 'obligation-count')).toBeUndefined();
    expect(get5(s, 'paid-extension-start')).toBe('after the current seven-day booking');
    const final = (
      {
        phone: 'phone',
        wardrobe: 'clothes',
        accessory: 'clasp',
        dinner: 'photo',
        nothing: 'jacket',
      } as const
    )[purchase as 'phone'];
    s = c5(s, 'place-' + final);
    expect(s.phase).toBe('complete');
    expect(decodeSave(encodeSave(s))).toEqual(s);
    expect(replay(s.ledger, 16)).toEqual(s);
    expect(continuity5(s)?.personalPhone).toBe(
      purchase === 'phone' ? 'table-unboxed' : 'not-owned',
    );
    expect(text(s)).not.toContain('jacket on its hook');
    expect(s.history.slice(0, paid.history.length)).toEqual(paid.history);
  },
  15000,
);

for (const look of ['professional', 'glamorous', 'provocative', 'minimal'] as const)
  for (const event of ['attend', 'decline'])
    it(`${look}/${event}: all 56 Harbour attention orders preserve geography, clothes and knowledge`, () => {
      const prep = walk5(paid, [
        'begin',
        'go-spend',
        'spend-nothing',
        'echo-listing',
        'invitation-' + event,
      ]);
      expect(continuity5(prep)?.wardrobe?.id).toBe('c05.daytime');
      expect(continuity5(prep)?.axiomPhone).toBe('dresser');
      const room = c5(prep, 'look-' + look);
      expect(get5(room, 'wardrobe')).toBe(wardrobe5[look].id);
      expect(continuity5(room)?.axiomPhone).toBe('carried');
      const opening = chapter5Blocks(room)
        .map((b) => b.text)
        .join(' ');
      expect(
        opening.indexOf('arrive at Harbour') >= 0 || opening.indexOf('walk to Harbour') >= 0,
      ).toBe(true);
      expect(opening.indexOf('Inside, the host')).toBeGreaterThan(
        opening.indexOf(event === 'attend' ? 'arrive at Harbour' : 'walk to Harbour'),
      );
      const actions = chapter5Choices(room)
        .filter((c) => c.id.includes('attention-'))
        .map((c) => c.id.slice(9));
      expect(actions).toHaveLength(8);
      for (const first of actions)
        for (const second of actions.filter((a) => a !== first)) {
          let s = room;
          for (const action of [first, second]) {
            const plan = harbourShotPlan5(s, action);
            expect(plan.every((p) => p.wardrobe === wardrobe5[look].id)).toBe(true);
            if (action !== 'attention-coffee')
              expect(plan.every((p) => !p.physical.includes('julian'))).toBe(true);
            if (action === 'attention-photo') {
              expect(plan[0].props).toEqual(['unpublished-camera-frame']);
              expect(plan[0].priorProgrammePage).toBe(false);
              expect(plan[1].props).toEqual(['authorized-programme-page']);
            }
            if (action === 'attention-coffee') {
              expect(plan.map((p) => p.id)).toEqual(
                ['07-message', '14-wait', '12-entrance', '15-departed', '13-return'].map(
                  (id) => 'c05.s06.shot' + id,
                ),
              );
              expect(plan.filter((p) => p.physical.includes('julian'))).toHaveLength(1);
            }
            s = c5(s, action);
            expect(get5(s, 'harbour-position')).toBe('programme-table');
            expect(get5(s, 'wardrobe')).toBe(wardrobe5[look].id);
          }
          expect(chapter5Choices(s).map((c) => c.id)).toEqual(['chapter5.leave-room']);
          expect(harbourShotPlan5(s, first)).toEqual([]);
        }
      const end = walk5(room, rest);
      expect(get5(end, 'wardrobe')).toBe(wardrobe5[look].id);
      expect(continuity5(end)?.jacket).toBe('wardrobe');
      expect(decodeSave(encodeSave(end))).toEqual(end);
    }, 15000);

it('keeps unavailable Julian out of every production beat and completes an independent route', () => {
  let s = c5(dress5(free), 'look-glamorous');
  expect(harbourShotPlan5(s, 'attention-coffee')).toEqual([]);
  expect(harbourShotPlan5(s, 'attention-flirt')).toEqual([]);
  s = walk5(s, [
    'attention-network',
    'attention-conversation',
    'leave-room',
    'concept-professional',
    'offer-accept',
    'publish',
    'service-self',
    'terms-narrow',
    'message-maya',
    'people-finish',
    'want-salon',
    'desire-personal',
    'place-visible',
  ]);
  expect(s.phase).toBe('complete');
  expect(cash5(s)).toBe(340);
  expect(get5(s, 'obligation-count')).toBe('1');
  expect(read5(s, 'maya-discovery')).toBeDefined();
  expect(get5(s, 'dependency')).toBeUndefined();
  expect(decodeSave(encodeSave(s))).toEqual(s);
});

it('makes the fresh Julian reply visible before scope, and leaves consent unset', () => {
  const s = walk5(c5(dress5(paid), 'look-professional'), [
    'attention-flirt',
    'leave-room',
    'offer-decline',
    'service-julian',
    'terms-refuse',
    'people-finish',
    'want-julian',
  ]);
  expect(text(s)).toContain('I would like to see you. Tell me what sort of evening');
  expect(get5(s, 'authorization')).toBeUndefined();
  expect(get5(s, 'dependency')).toBeUndefined();
});

it('never substitutes old home art or an incompatible wardrobe in Chapter 5', () => {
  const room = c5(dress5(paid), 'look-professional');
  const wrong = structuredClone(room);
  wrong.choices['c5.wardrobe'] = 'c05.glamorous';
  expect(harbourShotPlan5(wrong, 'attention-coffee')).toEqual([]);
  const unknown = structuredClone(room);
  unknown.choices['c5.presentation'] = 'invented';
  expect(harbourShotPlan5(unknown, 'attention-photo')).toEqual([]);
  for (const s of [c5(paid, 'begin'), room, walk5(room, rest)]) expect(homeSceneArt(s)).toBeNull();
  const departure = harbourShotPlan5(room, 'leave-room');
  expect(departure.map((b) => b.id)).toEqual([
    'c05.s06.shot10',
    'c05.s06.shot16-home',
    'c05.s06.shot17-hung',
  ]);
  expect(departure[2].physical).toEqual([]); // Garment crop cannot invent nightwear.
});
