import { describe, expect, it } from 'vitest';
import { act } from '../../src/state/reducer';
import { sceneById } from '../../src/content/scenes';
import { toAnalysis } from '../helpers';

describe('Calibration #3 copy/mechanics consistency', () => {
  it('describes the records and connections that the runtime actually submits', () => {
    let state = toAnalysis();
    state = act(state, { type: 'TOGGLE_EVIDENCE', id: 'email' });
    state = act(state, { type: 'TOGGLE_EVIDENCE', id: 'finance' });
    state = act(state, { type: 'CONNECT_EVIDENCE', relation: 'conflict' });
    state = act(state, { type: 'REVIEW_ASSESSMENT', id: 'bounded' });
    state = act(state, { type: 'SUBMIT_ASSESSMENT' });

    expect(state.report?.documents).toEqual(state.documents);
    expect(state.report?.connections).toEqual(state.inferences);

    const submittedCopy = sceneById['helix.submitted'].blocks.map((block) => block.text).join(' ');
    expect(submittedCopy).toContain('the records you reviewed and the connections you recorded');
    expect(submittedCopy).not.toContain('the records and connections you chose to attach');
  });
});
