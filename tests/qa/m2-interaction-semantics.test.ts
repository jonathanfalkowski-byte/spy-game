import { describe, expect, it } from 'vitest';
import { act } from '../../src/state/reducer';
import {
  buildNarrativeContext,
  candidateFromTranscript,
  MockFixtureProvider,
  reviewSelectedCandidates,
  summarizeHumanClassifications,
  transcriptFromGameState,
} from '../../src/qa/m2';
import {
  M2_INTERACTION_SEMANTICS,
  classifySemanticMisinterpretation,
  interactionSemanticsForActionTypes,
  M2_SEMANTIC_MISINTERPRETATION,
} from '../../src/qa/m2-interaction-semantics';
import { goldenRoutes } from './golden-routes';
import { toAnalysis } from '../helpers';
import { fixtureCandidate } from './m2-fixtures';

function openingAssessmentState() {
  let state = toAnalysis('friend', 'yes');
  state = act(state, { type: 'TOGGLE_EVIDENCE', id: 'email' });
  state = act(state, { type: 'TOGGLE_EVIDENCE', id: 'finance' });
  state = act(state, { type: 'CONNECT_EVIDENCE', relation: 'conflict' });
  state = act(state, { type: 'REVIEW_ASSESSMENT', id: 'bounded' });
  state = act(state, { type: 'SUBMIT_ASSESSMENT' });
  return state;
}

describe('EVE QA M2.1F interaction semantics', () => {
  it('records the verified opening casework distinction without changing runtime behavior', () => {
    const state = openingAssessmentState();
    expect(state.documents).toEqual(['email', 'finance', 'news', 'intel']);
    expect(state.selected).toEqual(['email', 'finance']);
    expect(state.report?.documents).toEqual(['email', 'finance', 'news', 'intel']);
    expect(state.report?.connections).toHaveLength(1);

    const semantics = interactionSemanticsForActionTypes(state.ledger.map((event) => event.action.type));
    expect(Object.keys(semantics)).toEqual(['CONNECT_EVIDENCE', 'READ_DOCUMENT', 'REVIEW_ASSESSMENT', 'SUBMIT_ASSESSMENT', 'TOGGLE_EVIDENCE']);
    expect(semantics.TOGGLE_EVIDENCE.doesNotMean).toContain('attach this document to the report');
    expect(semantics.SUBMIT_ASSESSMENT.downstreamEffects).toContain('All documents in state.documents are copied to report.documents.');
    expect(M2_INTERACTION_SEMANTICS.TOGGLE_EVIDENCE.stateMeaning).toContain('state.selected');
  });

  it('integrates only route-used semantics and stays materially smaller than expanded M2.1D context', () => {
    const route = goldenRoutes.find((item) => item.id === 'opening-bad-assessment')!;
    const candidate = candidateFromTranscript({
      routeId: route.id,
      transcript: transcriptFromGameState(route.factory()),
      reason: 'GOLDEN_ROUTE',
      riskSignals: ['M2.1 approved pilot route'],
    });
    const context = buildNarrativeContext(candidate);
    const bytes = Buffer.byteLength(JSON.stringify(context), 'utf8');
    const estimatedTokens = Math.ceil(bytes / 4);
    console.log(JSON.stringify({ interactionSemanticContext: { beforeM21DBytes: 40193, afterBytes: bytes, deltaBytes: bytes - 40193, estimatedTokens } }));
    expect(Object.keys(context.interactionSemantics)).toEqual(['CONNECT_EVIDENCE', 'READ_DOCUMENT', 'REVIEW_ASSESSMENT', 'SUBMIT_ASSESSMENT', 'TOGGLE_EVIDENCE']);
    expect(bytes).toBeLessThan(40193);
    expect(estimatedTokens).toBeGreaterThan(0);
    expect(buildNarrativeContext(fixtureCandidate('dialogue-only', 'GOLDEN_ROUTE', 'clean')).interactionSemantics).toEqual({});
  });

  it('retains a semantic-misinterpretation fixture instead of silently deleting it', () => {
    const route = goldenRoutes.find((item) => item.id === 'opening-bad-assessment')!;
    const candidate = candidateFromTranscript({
      routeId: route.id,
      transcript: transcriptFromGameState(route.factory()),
      reason: 'GOLDEN_ROUTE',
      riskSignals: ['M2.1 pilot', 'evidence'],
    });
    const run = reviewSelectedCandidates([candidate], new MockFixtureProvider(), { [route.id]: 'semantic-misinterpretation' });
    expect(run.findings).toHaveLength(1);
    const context = buildNarrativeContext(candidate, 'semantic-misinterpretation');
    expect(classifySemanticMisinterpretation(run.findings[0].finding, context.interactionSemantics)).toBe(M2_SEMANTIC_MISINTERPRETATION);
  });

  it('aggregates human labels by reviewer without inferring labels', () => {
    expect(summarizeHumanClassifications([
      { reviewer: 'LOGIC', classification: 'USEFUL_WARNING', routeId: 'opening-bad-assessment' },
      { reviewer: 'LOGIC', classification: 'FALSE_POSITIVE', routeId: 'opening-bad-assessment' },
      { reviewer: 'INVESTIGATION', classification: 'INSUFFICIENT_EVIDENCE', routeId: 'opening-bad-assessment' },
    ])).toEqual({
      LOGIC: { reviewedFindings: 2, trueIssues: 0, usefulWarnings: 1, falsePositives: 1, insufficientEvidence: 0 },
      INVESTIGATION: { reviewedFindings: 1, trueIssues: 0, usefulWarnings: 0, falsePositives: 0, insufficientEvidence: 1 },
    });
  });
});
