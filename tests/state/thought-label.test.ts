import { expect, it } from 'vitest';
import { thoughtLabel } from '../../src/ui/reading-presentation';

it('names Adrian until the mirror beat, then leaves thoughts unattributed', () => {
  for (const node of ['apartment.bond', 'office.benton', 'dayend.accepted', 'clinic.morning', 'clinic.steps', 'clinic.facePause', 'clinic.stopConfirm', 'clinic.stopped', undefined])
    expect(thoughtLabel(node), String(node)).toBe('Adrian · private thought');
  for (const node of ['clinic.mirror', 'clinic.name', 'clinic.complete', 'mission.home', 'mission.warning3', 'chapter3.home', 'chapter4.room', 'chapter5.return', 'chapter6.complete'])
    expect(thoughtLabel(node), node).toBe('Private thought');
});
