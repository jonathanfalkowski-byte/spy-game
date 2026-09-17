import { caption5 } from '../../src/content/chapter5-public';
import { it, expect } from 'vitest';
import { end4, c5, walk5, dress5 } from '../chapter5-helpers';
import { chapter5Choices } from '../../src/content/chapter5';
import { get5, cash5, records5 } from '../../src/content/chapter5-model';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
it('keeps appearance, attention, image permission and physical consent separate', () => {
  let s = c5(dress5(), 'look-provocative');
  expect(get5(s, 'authorization')).toBeUndefined();
  expect(get5(s, 'published')).toBeUndefined();
  s = walk5(s, ['attention-enjoy', 'attention-observe']);
  expect(chapter5Choices(s).map((c) => c.id)).toEqual(['chapter5.leave-room']);
  expect(get5(s, 'event-photo')).toBeUndefined();
  s = c5(s, 'leave-room');
  expect(s.npcs.sloane.known).toEqual(end4().npcs.sloane.known);
});
it('publishes only the approved issue and pays only the agreed earned fee', () => {
  let s = walk5(dress5(), [
    'look-glamorous',
    'attention-photo',
    'leave-room',
    'concept-provocative',
    'negotiate-fee',
    'negotiate-name',
    'negotiate-image',
    'offer-accept',
  ]);
  expect(cash5(s)).toBe(0);
  expect(get5(s, 'published')).toBeUndefined();
  s = c5(s, 'publish');
  expect(cash5(s)).toBe(900);
  expect(caption5(s)).not.toContain('portrait');
  expect(records5(s).find((r) => r.key === 'c5.publication')?.text).toContain('E. Vale');
  expect(records5(s).find((r) => r.key === 'c5.publication')?.text).toContain('text only');
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
it('withheld public proof earns no publication fee; private sitting has distinct payment', () => {
  const offer = walk5(dress5(), ['look-minimal', 'leave-room']);
  const withheld = walk5(offer, ['offer-accept', 'withhold']);
  expect(cash5(withheld)).toBe(0);
  expect(get5(withheld, 'published')).toBeUndefined();
  const privateSitting = walk5(offer, ['concept-private', 'offer-accept', 'withhold']);
  expect(cash5(privateSitting)).toBe(100);
  expect(get5(privateSitting, 'published')).toBeUndefined();
});
it('requires actual earned Julian access and a new expression before mutual interest', () => {
  const absent = c5(dress5(), 'look-professional');
  expect(chapter5Choices(absent).some((c) => c.id === 'chapter5.attention-flirt')).toBe(false);
  let s = c5(dress5(end4('professional')), 'look-professional');
  expect(get5(s, 'mutual-interest')).toBeUndefined();
  s = c5(s, 'attention-flirt');
  expect(get5(s, 'mutual-interest')).toBe('yes');
  expect(get5(s, 'authorization')).toBeUndefined();
  const barred = c5(dress5(end4('backfire')), 'look-professional');
  expect(chapter5Choices(barred).some((c) => c.id === 'chapter5.attention-flirt')).toBe(false);
});
