import { expect, it } from 'vitest';
import { assessmentStatus } from '../../src/ui/assessment-status';
import { act, initialState } from '../../src/state/reducer';
import { toAnalysis } from '../helpers';
import { runMission, mission, missionStart } from '../mission-helpers';
import { encodeSave, loadGame, SAVE_KEY } from '../../src/persistence/saves';

it('derives idle and Helix required/committed states without mutating saves', () => {
  expect(assessmentStatus(initialState()).status).toBe('idle');
  let s = toAnalysis();
  const raw = encodeSave(s);
  expect(assessmentStatus(s)).toMatchObject({ status: 'required', flow: 'helix' });
  expect(encodeSave(s)).toBe(raw);
  s = act(s, { type: 'REVIEW_ASSESSMENT', id: 'insufficient' });
  expect(assessmentStatus(s).status).toBe('required');
  s = act(s, { type: 'SUBMIT_ASSESSMENT' });
  expect(assessmentStatus(s).status).toBe('completed');
  const loaded = loadGame({
    getItem: (key) => (key === SAVE_KEY ? encodeSave(s) : null),
    setItem: () => {},
  });
  expect(loaded.kind).toBe('ready');
  if (loaded.kind === 'ready') expect(assessmentStatus(loaded.state).status).toBe('completed');
});

it('Glass House available assessment does not replace exploration or count a draft as committed', () => {
  let s = runMission(missionStart(), {}, 'hub');
  expect(assessmentStatus(s).status).toBe('available');
  s = mission(s, 'assess.begin');
  expect(assessmentStatus(s)).toMatchObject({ status: 'required', flow: 'mission' });
  s = mission(s, 'source.insufficient');
  expect(assessmentStatus(s).status).toBe('required');
  s = mission(s, 'source.revise');
  expect(assessmentStatus(s).status).toBe('required');
  s = mission(s, 'source.insufficient');
  s = mission(s, 'source.confirm');
  expect(assessmentStatus(s).status).toBe('completed');
});
