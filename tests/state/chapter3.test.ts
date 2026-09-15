import { describe, expect, it } from 'vitest';
import { act, availableIntents, initialState, nodeOf } from '../../src/state/reducer';
import { replay as replayV9 } from '../../src/persistence/legacy-v9/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { atOffer, endAccepted, evening } from '../day-helpers';
import { day } from '../day-helpers';
import { clinic, traverse } from '../clinic-helpers';
import { runMission } from '../mission-helpers';

describe('Chapter 3 Scene 1 continuation', () => {
  it('continues only from the accepted day-zero endpoint and preserves the prefix', () => {
    const end = acceptedDayEndpoint();
    expect(nodeOf(end)).toBe('mission.complete');
    const next = act(end, { type: 'CONTINUE_CHAPTER3' });
    expect(nodeOf(next)).toBe('chapter3.home');
    expect(next.ledger.slice(0, end.ledger.length)).toEqual(end.ledger);
    expect(next.history.some((entry) => entry.node === 'chapter3.home')).toBe(true);
  });

  it('rejects continuation from an incomplete or non-accepted state', () => {
    expect(act(initialState(), { type: 'CONTINUE_CHAPTER3' })).toEqual(initialState());
  });

  it('records each home observation once and appends the surveillance exchange chronologically', () => {
    let state = act(acceptedDayEndpoint(), { type: 'CONTINUE_CHAPTER3' });
    for (const id of ['chapter3.mirror', 'chapter3.clothing', 'chapter3.evidence', 'chapter3.phone'])
      state = act(state, { type: 'CHAPTER3_CHOOSE', id });
    expect(nodeOf(state)).toBe('chapter3.surveillance');
    const before = state.ledger.length;
    state = act(state, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.scope' });
    expect(nodeOf(state)).toBe('chapter3.complete');
    expect(state.ledger.length).toBe(before + 1);
    expect(state.history.at(-1)?.node).toBe('chapter3.complete');
    expect(state.day.records.filter((r) => r.key === 'chapter3_mirror')).toHaveLength(1);
    expect(state.day.records.filter((r) => r.key === 'chapter3_phone')).toHaveLength(1);
    expect(availableIntents(state)).toEqual([]);
  });

  it('round-trips a content-10 Scene 1 save without changing the ledger', () => {
    let state = act(evening(), { type: 'CONTINUE_CHAPTER3' });
    state = act(state, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.phone' });
    const loaded = decodeSave(encodeSave(state));
    expect(loaded).toEqual(state);
  });

  it('rejects a Chapter 3 action in the frozen v9 replay implementation', () => {
    const state = acceptedDayEndpoint();
    expect(() => replayV9([...state.ledger, { sequence: state.revision + 1, action: { type: 'CONTINUE_CHAPTER3', expectedRevision: state.revision } }])).toThrow();
  });

  it('allows a refusal/reconsideration route without flattening its authored history', () => {
    const refused = atOffer();
    const reconverged = endAccepted(evening(refused, true));
    expect(reconverged.day.refusedOnce).toBe(true);
    expect(reconverged.day.operation).toBe('accepted');
    const endpoint = runAcceptedClinicAndMission(reconverged);
    const continued = act(endpoint, { type: 'CONTINUE_CHAPTER3' });
    expect(nodeOf(continued)).toBe('chapter3.home');
    expect(continued.day.refusedOnce).toBe(true);
    expect(continued.ledger.slice(0, endpoint.ledger.length)).toEqual(endpoint.ledger);
  });

  it.each([
    ['weak', { assessment: 'source.celeste' }],
    ['wrong', { assessment: 'source.priya' }],
    ['unresolved', { assessment: 'source.insufficient' }],
  ])('allows %s assessments that still reach the canonical completed ending', (_label, overrides) => {
    const endpoint = runAcceptedClinicAndMission(endAccepted(evening()), overrides);
    expect(endpoint.mission.outcome).toBe('complete');
    expect(nodeOf(act(endpoint, { type: 'CONTINUE_CHAPTER3' }))).toBe('chapter3.home');
  });
});

function acceptedDayEndpoint() {
  return runMission();
}

function runAcceptedClinicAndMission(start: ReturnType<typeof endAccepted>, overrides: Record<string, string> = {}) {
  const morning = clinic(start, 'clinic.begin');
  const departure = traverse(morning, {}, 'departure');
  return runMission(clinic(departure, 'c.departure'), overrides);
}
