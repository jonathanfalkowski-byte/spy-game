import { it, expect } from 'vitest';
import { departure, destinations } from '../chapter4-helpers';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { calendarInvites } from '../../src/content/chapter3-autonomy';
it.each(destinations)(
  'verifies designed %s entry against actual revision-14 offered choices',
  (destination) => {
    const s = departure(destination);
    expect(s.phase).toBe('departure');
    expect(s.contentRevision).toBe(14);
    expect(s.choices['c3.departure']).toBe(destination);
    expect(decodeSave(encodeSave(s))).toEqual(s);
    if (destination !== 'own') expect(calendarInvites(s)).toContain(destination);
  },
);
it.each(['sloane', 'maya'] as const)(
  'verifies later %s entry and unresolved double booking',
  (destination) => {
    const other = destination === 'sloane' ? 'maya' : 'sloane';
    const s = departure(destination, { late: true, extra: ['move-' + other, 'book-rook'] });
    expect(s.choices['c3.cal-' + destination]).toBe('18:45');
    expect(s.choices['c3.cal-' + other]).toBe('conflict-pending');
    expect(s.choices['c3.cal-rook']).toBe('waiting-confirmed');
  },
);
it('verifies withdrawn Julian and no-call with a future Maya commitment', () => {
  const s = departure('own', { helix: true, pressure: true, extra: ['move-maya'] });
  expect(calendarInvites(s)).not.toContain('julian-mercer');
  expect(s.choices['c3.cal-maya']).toBe('18:45');
  expect(s.choices['c3.paid']).toBe('600');
});
