import { describe, expect, it } from 'vitest';
import { act, nodeOf, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { clinicStart, traverse } from '../clinic-helpers';
import { runMission } from '../mission-helpers';

function clinicComplete() {
  return traverse(clinicStart());
}

function missionChoice(state: ReturnType<typeof clinicComplete>, id: string) {
  return act(state, { type: 'MISSION_CHOOSE', id });
}

describe('post-transformation apartment reset', () => {
  it('opens from the clinic checkpoint and records the new visit', () => {
    const start = clinicComplete();
    const home = missionChoice(start, 'home.begin');

    expect(nodeOf(home)).toBe('mission.home');
    expect(home.mission.completed).toContain('home.begin');
    expect(home.day.records.some((record) => record.key === 'mission.home.entry')).toBe(true);
    expect(JSON.parse(encodeSave(home)).contentVersion).toBe(11);
  });

  it('keeps home observations optional, one-shot and chronological', () => {
    let state = missionChoice(clinicComplete(), 'home.begin');
    for (const id of ['home.mirror', 'home.clothes', 'home.evidence', 'home.routine']) {
      const next = missionChoice(state, id);
      expect(next).not.toBe(state);
      state = next;
    }
    expect(state.history.filter((entry) => entry.blocks[0]?.kind === 'notice').slice(-4).map((entry) => entry.blocks[0].text)).toEqual([
      'Your choice: Look in the apartment mirror',
      'Your choice: Handle Adrian’s old clothes',
      'Your choice: Check what came back with you',
      'Your choice: Try one familiar routine',
    ]);
    expect(missionChoice(state, 'home.mirror')).toBe(state);
    state = missionChoice(state, 'home.prepare');
    expect(nodeOf(state)).toBe('mission.homePresentation');
    state = missionChoice(state, 'home.outfit.executive');
    state = missionChoice(state, 'home.outfit.socialite');
    state = missionChoice(state, 'home.detail.earrings');
    expect(state.clinic.outfit).toBe('socialite');
    expect(state.mission.completed).toContain('home.detail.earrings');
    expect(missionChoice(state, 'home.detail.watch')).toBe(state);
    state = missionChoice(state, 'home.presentationDone');
    expect(nodeOf(state)).toBe('mission.homeContact');
    state = missionChoice(state, 'home.maya');
    state = missionChoice(state, 'home.maya.send');
    expect(state.day.exposure.at(-1)?.source).toContain('whether anyone accessed it is unknown');
    expect(state.npcs.maya.known.some((known) => known.key.includes('I made it home'))).toBe(true);
    expect(missionChoice(state, 'home.maya.skip')).toBe(state);
    state = missionChoice(state, 'home.leave');
    expect(nodeOf(state)).toBe('mission.car');
    expect(state.day.records.filter((record) => record.key.startsWith('mission.home.')).length).toBeGreaterThanOrEqual(6);
    expect(JSON.parse(encodeSave(state)).contentVersion).toBe(11);
    expect(decodeSave(encodeSave(state))).toEqual(state);
  });

  it('preserves the original direct car route for existing decisions', () => {
    const start = clinicComplete();
    const car = missionChoice(start, 'mission.begin');
    expect(nodeOf(car)).toBe('mission.car');
    expect(car.mission.completed).not.toContain('home.begin');
  });

  it('replays the home route deterministically', () => {
    let state = missionChoice(clinicComplete(), 'home.begin');
    for (const id of ['home.mirror', 'home.prepare', 'home.outfit.shadow', 'home.presentationDone', 'home.maya.skip', 'home.leave'])
      state = missionChoice(state, id);
    expect(replay(state.ledger)).toEqual(state);
  });

  it('keeps content version 11 through the earned Chapter 3 continuation', () => {
    const endpoint = runMission(clinicComplete(), { complete: 'home.begin' });
    expect(nodeOf(endpoint)).toBe('mission.complete');
    const next = act(endpoint, { type: 'CONTINUE_CHAPTER3' });
    expect(nodeOf(next)).toBe('chapter3.home');
    expect(JSON.parse(encodeSave(next)).contentVersion).toBe(11);
    expect(decodeSave(encodeSave(next))).toEqual(next);
  });
});
