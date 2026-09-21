import { describe, expect, it } from 'vitest';
import { highestSeverity } from '../../src/qa/m2-pilot';

describe('M2 remaining pilot report summary', () => {
  it('reports the highest severity and preserves the empty state', () => {
    expect(highestSeverity([])).toBe('NONE');
    expect(highestSeverity([{ severity: 'LOW' }])).toBe('LOW');
    expect(highestSeverity([{ severity: 'MEDIUM' }, { severity: 'HIGH' }])).toBe('HIGH');
    expect(highestSeverity([{ severity: 'BLOCKER' }, { severity: 'HIGH' }])).toBe('BLOCKER');
  });
});
