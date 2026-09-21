import { describe, expect, it } from 'vitest';
import {
  buildNarrativeContext,
  candidateFromTranscript,
  classifyMissingSceneMetadataFalsePositive,
  M2_MISSING_CONTEXT_FALSE_POSITIVE,
  MockFixtureProvider,
  REVIEWER_CONTRACTS,
  transcriptFromGameState,
} from '../../src/qa/m2';
import { goldenRoutes } from './golden-routes';
import { runGoldenRoutes } from './runner';

describe('M2 authored scene metadata context', () => {
  it('retains authenticated revision-16 invitation and next-day presentation places', () => {
    const route = goldenRoutes.find((item) => item.id === 'chapter5-no-intimacy')!;
    const golden = runGoldenRoutes();
    const candidate = candidateFromTranscript({
      routeId: route.id,
      transcript: transcriptFromGameState(golden.states[route.id]),
      reason: 'GOLDEN_ROUTE',
      riskSignals: ['continuity', 'route cohesion'],
    });
    const context = buildNarrativeContext(candidate);
    const invitation = context.transcript.transitions.find((transition) => transition.action.choiceId === 'chapter5.invitation-attend');
    expect(invitation?.enteredScene).toEqual({ sceneTitle: 'Dress for yourself', scenePlace: 'The following day · Apartment' });
    expect(context.currentScene.sceneTitle).toBe('Dress for yourself');
    expect(context.currentScene.scenePlace).toBe('The following day · Apartment');

    const invitationTransition = context.transcript.transitions.find((transition) => transition.action.choiceId === 'chapter5.echo-listing');
    expect(invitationTransition?.enteredScene?.scenePlace).toBe('15:00 · An invitation for tomorrow');
    expect(context.route.contentRevision).toBe(16);
    expect(context.route.authority.source).toBe('AUTHENTICATED_FROZEN');
  });

  it('classifies the no-next-day fixture as a missing-context false positive', () => {
    const route = goldenRoutes.find((item) => item.id === 'chapter5-no-intimacy')!;
    const golden = runGoldenRoutes();
    const candidate = candidateFromTranscript({ routeId: route.id, transcript: transcriptFromGameState(golden.states[route.id]), reason: 'GOLDEN_ROUTE' });
    const context = buildNarrativeContext(candidate, 'next-day-context-misinterpretation');
    const contract = REVIEWER_CONTRACTS.find((item) => item.reviewer === 'CONTINUITY')!;
    const finding = new MockFixtureProvider().review(context, contract)[0];
    expect(finding).toBeDefined();
    expect(classifyMissingSceneMetadataFalsePositive(finding.finding, context)).toBe(M2_MISSING_CONTEXT_FALSE_POSITIVE);
  });

});
