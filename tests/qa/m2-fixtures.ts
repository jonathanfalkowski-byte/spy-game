import type { QaTranscript } from '../../src/qa/m1';
import { candidateFromTranscript, type QaNarrativeCandidate, type M2SelectionReason } from '../../src/qa/m2';

export function fixtureTranscript(routeId: string, seed = 1, variant = routeId): QaTranscript {
  const action = variant.includes('refusal') ? 'CHOOSE_DIALOGUE|id=invitation.no' : 'CHOOSE_DIALOGUE|id=invitation.yes';
  const emptyNpc = { known: [], beliefs: [] };
  const npcKnowledge = { daniel: emptyNpc, benton: emptyNpc, maya: emptyNpc, sloane: emptyNpc, marcus: emptyNpc, voss: emptyNpc, celeste: emptyNpc };
  const relationships = { mayaTrust: 0, credibility: 0, bond: 'friend' as const };
  return {
    seed,
    contentRevision: 17,
    routeTrace: [
      'CHOOSE_DIALOGUE|id=bond.friend',
      action,
      ...(variant.includes('evidence') ? ['READ_DOCUMENT|id=intel', 'SPEND_INVESTIGATION|id=payments'] : []),
    ],
    entries: [
      {
        step: 0,
        node: 'chapter5.invitation',
        blocks: [{ kind: 'narrative', text: 'The invitation arrives.' }],
        evidence: [],
        knowledge: [],
        custody: null,
        npcKnowledge,
        resources: { opportunities: 1, clinicOpportunity: 0, missionRemaining: 1, relationships },
      },
      {
        step: 1,
        node: 'chapter5.presentation',
        blocks: [{ kind: 'speech', text: variant.includes('clean') ? 'We can discuss the terms.' : 'The route continues.', speaker: 'Maya' }],
        action,
        evidence: variant.includes('evidence') ? ['intel'] : [],
        knowledge: variant.includes('knowledge') ? ['shared-fact'] : [],
        custody: null,
        npcKnowledge,
        resources: { opportunities: 0, clinicOpportunity: 0, missionRemaining: 1, relationships },
      },
    ],
  };
}

export function fixtureCandidate(routeId: string, reason: M2SelectionReason = 'GOLDEN_ROUTE', variant = routeId): QaNarrativeCandidate {
  return candidateFromTranscript({
    routeId,
    transcript: fixtureTranscript(routeId, 1, variant),
    reason,
    riskSignals: variant.includes('evidence') ? ['evidence custody', 'investigation'] : [],
  });
}
