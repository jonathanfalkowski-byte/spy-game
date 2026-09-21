import { describe, expect, it } from 'vitest';
import {
  M2_OPENING_LOGIC_CALIBRATION,
  M2_OPENING_LOGIC_CALIBRATION_STATUS,
  M2_INCOMPLETE_PILOT_EXECUTIONS,
  M2_REMAINING_PILOT_CLASSIFICATIONS,
  M2_REMAINING_PILOT_SELECTION,
  M2CalibrationRecordSchema,
  isKnownFrozenHistoricalCalibration,
  summarizeRemainingPilotClassifications,
  summarizeCalibrationClassifications,
  summarizeCalibrationDispositions,
  validateCalibrationRegistry,
  validateRemainingPilotClassifications,
} from '../../src/qa/m2-calibration';
import { buildNarrativeContext, candidateFromTranscript, M2HumanClassificationRecordSchema, routeAuthorityForRevision } from '../../src/qa/m2';
import { transcriptFromSnapshots } from '../../src/qa/m1';
import { initialState } from '../../src/state/reducer';

describe('M2 human calibration and route authority metadata', () => {
  it('preserves four explicit human classifications and separate dispositions', () => {
    expect(validateCalibrationRegistry()).toHaveLength(4);
    expect(summarizeCalibrationClassifications()).toEqual({
      reviewedFindings: 4,
      trueIssues: 2,
      usefulWarnings: 1,
      falsePositives: 1,
      insufficientEvidence: 0,
    });
    expect(summarizeCalibrationDispositions()).toMatchObject({
      KNOWN_FROZEN_HISTORICAL: 1,
      RESOLVED_CURRENT: 3,
    });
    expect(M2_OPENING_LOGIC_CALIBRATION_STATUS).toBe('COMPLETE');
    expect(M2_OPENING_LOGIC_CALIBRATION[3]).toMatchObject({
      id: 'calibration-4',
      classification: 'TRUE_ISSUE',
      cause: 'COPY_MECHANICS_MISMATCH',
      disposition: 'KNOWN_FROZEN_HISTORICAL',
      contentRevision: 16,
      actionableCurrentBug: false,
      actionableAtReview: false,
      legacyIssue: true,
      historicalContentMutable: false,
      currentAuthoringFixExists: true,
      transcriptDigest: '3b142bdb19dc2d3be7b17768b357cc078019f937fd5611a3da2c00cb37547931',
      contextDigest: '068a0bfe66317bccf0b8c78b0c048b3fd356424a04bab19cae6a9eb3c35ad991',
    });
    expect(M2_OPENING_LOGIC_CALIBRATION[2].actionableAtReview).toBe(true);
    expect(isKnownFrozenHistoricalCalibration('calibration-4')).toBe(true);
    expect(isKnownFrozenHistoricalCalibration('future-similar-finding')).toBe(false);
    expect(M2HumanClassificationRecordSchema.parse({ reviewer: 'LOGIC', classification: 'TRUE_ISSUE', disposition: 'KNOWN_FROZEN_HISTORICAL' }).disposition).toBe('KNOWN_FROZEN_HISTORICAL');
  });

  it('marks route authority from runtime revision metadata', () => {
    expect(routeAuthorityForRevision(16)).toEqual({ source: 'AUTHENTICATED_FROZEN', authenticated: true, frozen: true, currentAuthoring: false });
    expect(routeAuthorityForRevision(17)).toEqual({ source: 'CURRENT_AUTHORING', authenticated: false, frozen: false, currentAuthoring: true });
    const currentState = structuredClone(initialState());
    currentState.contentRevision = 17;
    const candidate = candidateFromTranscript({ routeId: 'authority-fixture', transcript: transcriptFromSnapshots([currentState], [], undefined, []), reason: 'GOLDEN_ROUTE' });
    expect(candidate.stateSummary.authority).toEqual(routeAuthorityForRevision(17));
    expect(buildNarrativeContext(candidate).route.authority).toEqual(routeAuthorityForRevision(17));
    const historicalState = structuredClone(initialState());
    historicalState.contentRevision = 16;
    const historicalCandidate = candidateFromTranscript({ routeId: 'historical-fixture', transcript: transcriptFromSnapshots([historicalState], [], undefined, []), reason: 'GOLDEN_ROUTE' });
    expect(buildNarrativeContext(historicalCandidate).route.authority).toEqual(routeAuthorityForRevision(16));
  });

  it('prepares exactly the nine remaining pilot selections without provider execution', () => {
    expect(M2_REMAINING_PILOT_SELECTION).toHaveLength(9);
    expect(M2_REMAINING_PILOT_SELECTION.map((call) => call.ordinal)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(M2_REMAINING_PILOT_SELECTION).not.toContainEqual({ ordinal: 1, routeId: 'opening-bad-assessment', reviewer: 'LOGIC' });
    for (const record of M2_OPENING_LOGIC_CALIBRATION) expect(M2CalibrationRecordSchema.safeParse(record).success).toBe(true);
  });

  it('records the nine raw classifications and converges them into five issue families', () => {
    expect(validateRemainingPilotClassifications()).toHaveLength(9);
    expect(M2_REMAINING_PILOT_CLASSIFICATIONS).toHaveLength(9);
    expect(summarizeRemainingPilotClassifications()).toEqual({
      reviewedFindings: 9,
      trueIssues: 6,
      usefulWarnings: 0,
      falsePositives: 3,
      insufficientEvidence: 0,
      uniqueIssueFamilies: 5,
      uniqueTrueIssueFamilies: 4,
    });
    expect(M2_INCOMPLETE_PILOT_EXECUTIONS).toEqual([expect.objectContaining({
      routeId: 'chapter5-public-visibility',
      reviewer: 'ROUTE_COHESION',
      status: 'INCOMPLETE_RESPONSE',
      reason: 'max_output_tokens',
      inputTokens: 57544,
      outputTokens: 3000,
      reasoningTokens: 1350,
      totalTokens: 60544,
      estimatedCostUsd: 0.290176,
      retried: false,
    })]);
  });
});
