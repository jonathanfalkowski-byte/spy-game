import { describe, expect, it } from 'vitest';
import { missionPresentation } from '../../src/content/mission-presentation';
import type { GameState } from '../../src/state/schema';
import { initialState } from '../../src/state/reducer';

function stateAt(phase: string, patch: Partial<GameState['mission']> = {}): GameState {
  const state = initialState();
  state.scene = 'mission';
  state.phase = phase;
  state.mission = { ...state.mission, ...patch };
  return state;
}

function prose(state: GameState): string {
  return missionPresentation(state)
    .map((block) => block.text)
    .join(' ');
}

describe('Glass House connective presentation', () => {
  it('adds the settling-in beat without changing ledger state', () => {
    const state = stateAt('arrival');
    const before = JSON.stringify(state);

    expect(prose(state)).toContain('one clean opportunity');
    expect(JSON.stringify(state)).toBe(before);
  });

  it('gives the Marcus and Celeste replies room for social pressure', () => {
    expect(prose(stateAt('marcusReply'))).toContain('The gesture is courteous');
    expect(prose(stateAt('celesteReply'))).toContain('the room has become a third person');
  });

  it('marks the cost of a second lead and frames the exchange window', () => {
    expect(prose(stateAt('hub', { leads: ['guest'] }))).toContain('One investigation has already cost');
    expect(prose(stateAt('method'))).toContain('room moving around one moment');
  });

  it('does not add connective prose outside the mission scene', () => {
    const state = initialState();
    expect(missionPresentation(state)).toEqual([]);
  });
});
