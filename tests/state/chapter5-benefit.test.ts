import { departure, assignment, choose4 } from '../chapter4-helpers';
import { it, expect } from 'vitest';
import { end4, walk5, dress5 } from '../chapter5-helpers';
import { chapter5Choices } from '../../src/content/chapter5';
import { get5, read5, cash5 } from '../../src/content/chapter5-model';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
const infra = (mode = 'public') =>
  walk5(dress5(end4(mode)), ['look-minimal', 'leave-room', 'offer-decline']);
it('offers genuinely distinct provided, paid, public and home solutions', () => {
  const none = infra();
  expect(
    chapter5Choices(none).some(
      (c) => c.id === 'chapter5.service-julian' || c.id === 'chapter5.service-self',
    ),
  ).toBe(false);
  const paid = infra('professional');
  const self = walk5(paid, ['service-self', 'terms-refuse']);
  expect(cash5(self)).toBe(840);
  expect(get5(self, 'obligation-count')).toBeUndefined();
  const provided = walk5(paid, ['service-julian', 'terms-refuse']);
  expect(cash5(provided)).toBe(900);
  expect(get5(provided, 'mutual-interest')).toBeUndefined();
  expect(get5(provided, 'dependency')).toBeUndefined();
  expect(read5(provided, 'service')?.text).toContain('New obligation: none');
});
it.each([
  ['accept', '2', '28'],
  ['narrow', '1', '7'],
  ['backup', '2', '28'],
])('records only accepted %s scope and windows', (choice, count, days) => {
  const s = walk5(infra(), ['service-municipal', 'terms-' + choice]);
  expect(get5(s, 'obligation-count')).toBe(count);
  expect(get5(s, 'obligation-term')).toBe(days);
  expect(read5(s, 'obligation')?.text).toContain('10:00–11:00');
  expect(s.choices['c4.reader-pass']).toBe('yes');
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
it('does not broadcast private terms or discover a public issue without a delivered link', () => {
  const old = end4();
  let s = walk5(dress5(old), [
    'look-minimal',
    'leave-room',
    'offer-accept',
    'publish',
    'service-municipal',
    'terms-refuse',
  ]);
  expect(s.npcs.maya).toEqual(old.npcs.maya);
  expect(s.npcs.sloane).toEqual(old.npcs.sloane);
  s = walk5(s, ['message-maya']);
  expect(read5(s, 'maya-discovery')).toBeDefined();
  expect(s.npcs.maya.known.at(-1)?.key).toContain('public issue link');
  expect(s.npcs.sloane).toEqual(old.npcs.sloane);
});

it('keeps sender and Voss replies on their actual qualified threads', () => {
  let old = assignment(departure('rook'));
  for (const id of [
    'public-sender',
    'inspect-receipt',
    'assess',
    'report-uncertain',
    'interest-distant',
    'outside-desk',
    'favor-refuse',
    'notice-boundary',
    'power-decline',
    'quiet-evening',
    'collect',
  ])
    old = choose4(old, id);
  const before = walk5(dress5(old), [
    'look-minimal',
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
  ]);
  const s = walk5(before, ['message-sender', 'message-voss']);
  expect(s.npcs.maya).toEqual(before.npcs.maya);
  expect(s.npcs.sloane).toEqual(before.npcs.sloane);
  expect(s.npcs.voss.known.at(-1)?.key).toContain('pending administrative status');
  expect(
    s.history
      .flatMap((h) => h.blocks)
      .some((b) => b.text.includes('no determination on the formal review')),
  ).toBe(true);
  expect(s.choices['c3.qualification']).toBe('formal');
  expect(chapter5Choices(s).map((c) => c.id)).toEqual(['chapter5.people-finish']);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
