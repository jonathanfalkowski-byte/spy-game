import type { GameState } from '../state/schema';
import { nodeOf } from '../state/reducer';
import { availableMissionChoices } from '../content/mission';

// Presentation of authored gates only; never a new progression rule.
export function assessmentStatus(state: GameState) {
  const node = nodeOf(state);
  if (!state.mission.source && state.scene === 'mission') {
    if (['assessment', 'assessmentReview'].includes(state.phase))
      return { status: 'required', flow: 'mission', key: 'mission' } as const;
    if (availableMissionChoices(state).some((c) => c.id === 'assess.begin'))
      return { status: 'available', flow: 'mission', key: 'mission' } as const;
  }
  if (!state.report && ['helix.analysis', 'helix.review'].includes(node))
    return { status: 'required', flow: 'helix', key: 'helix' } as const;
  if (state.mission.source)
    return { status: 'completed', flow: 'mission', key: 'mission' } as const;
  if (state.report) return { status: 'completed', flow: 'helix', key: 'helix' } as const;
  return { status: 'idle', flow: null, key: 'idle' } as const;
}

export const assessmentLabels = {
  idle: 'Assessment',
  available: 'Assessment · NEW',
  required: '⚠ Assessment required',
  completed: '✓ Assessment recorded',
};
