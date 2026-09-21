import { describe, expect, it } from 'vitest';
import { initialState } from '../../src/state/reducer';
import { availableQaActions, transcriptFromSnapshots } from '../../src/qa/m1';
import {
  M2_CONTEXT_COMPRESSION_VERSION,
  buildNarrativeContext,
  candidateFromTranscript,
  compressNarrativeTranscript,
  projectNarrativeContext,
  rehydrateNarrativeCheckpoints,
  rehydrateNarrativeTranscript,
  transcriptFromGameState,
} from '../../src/qa/m2';
import { finish, toMaya } from '../helpers';

describe('M2.1E lossless route-aware context compression', () => {
  it('retains every emitted history record and the invitation transition', () => {
    const source = transcriptFromGameState(finish(toMaya({ bond: 'love', morning: 'work', assessment: 'fraud' })));
    const compressed = compressNarrativeTranscript(source);
    const invitation = compressed.transitions.find((transition) => transition.action.choiceId === 'invitation.yes');
    expect(compressed.version).toBe(M2_CONTEXT_COMPRESSION_VERSION);
    expect(invitation?.emittedHistory).toHaveLength(2);
    expect(invitation?.emittedHistory[0]?.blocks.some((block) => (block as any).speaker === 'Adrian' && (block as any).text === '“Eight o’clock.”')).toBe(true);
    expect(invitation?.emittedHistory[1]?.blocks.some((block) => (block as any).speaker === 'Maya')).toBe(true);
    expect(invitation?.stateDelta.npcKnowledgeAdded.some((item) => item.npc === 'maya')).toBe(true);
  });

  it('rehydrates final state exactly and does not repeat unchanged state', () => {
    const source = transcriptFromGameState(finish(toMaya({ bond: 'friend', morning: 'yes', assessment: 'bounded' })));
    const compressed = compressNarrativeTranscript(source);
    expect(rehydrateNarrativeTranscript(compressed)).toEqual(compressed.finalState);
    const repeated = compressed.transitions.flatMap((transition) => transition.stateDelta.knowledge?.added ?? []);
    expect(new Set(repeated).size).toBe(repeated.length);
    expect(JSON.stringify(compressNarrativeTranscript(source))).toBe(JSON.stringify(compressNarrativeTranscript(source)));
  });

  it('captures NPC, evidence, custody, relationship, resource, and assessment deltas', () => {
    const previous = initialState(17);
    const next = structuredClone(previous);
    next.revision = 1;
    next.knowledge = [...next.knowledge, 'new-knowledge'];
    next.facts = [...next.facts, 'new-fact'];
    next.claims = [...next.claims, 'new-claim'];
    next.documents = ['intel'];
    next.mission.capture = { quality: 'asset', owner: 'Evelyn', axiomAccess: 'qa', text: 'intel', limits: 'qa' };
    next.npcs.maya.known = [{ key: 'new', source: 'qa', event: 1 }];
    next.npcs.maya.beliefs = [{ key: 'belief', source: 'qa', event: 1 }];
    next.relationships = { mayaTrust: 1, credibility: 0, bond: 'friend' };
    next.opportunities = next.opportunities === 1 ? 0 : 1;
    const action = availableQaActions(previous)[0];
    const source = transcriptFromSnapshots([previous, next], [action], 17, [action.id]);
    const compressed = compressNarrativeTranscript(source);
    const transition = compressed.transitions[0];
    expect(transition.stateDelta.knowledge?.added).toContain('new-knowledge');
    expect(transition.stateDelta.evidence?.added).toContain('intel');
    expect(transition.stateDelta.custodyChanged?.to).toEqual(next.mission.capture);
    expect(transition.stateDelta.npcKnowledgeAdded).toContainEqual({ npc: 'maya', value: next.npcs.maya.known[0] });
    expect(transition.stateDelta.npcBeliefsAdded).toContainEqual({ npc: 'maya', value: next.npcs.maya.beliefs[0] });
    expect(transition.stateDelta.relationshipChanges.mayaTrust).toEqual({ from: 0, to: 1 });
    expect(transition.stateDelta.resourceChanges.opportunities).toEqual({ from: previous.opportunities, to: next.opportunities });
    expect(rehydrateNarrativeTranscript(compressed)).toEqual(compressed.finalState);
  });

  it('records digests, checkpoints, and a causal-preserving reviewer projection', () => {
    const source = transcriptFromGameState(finish(toMaya({ bond: 'love', morning: 'work', assessment: 'fraud' })));
    const candidate = candidateFromTranscript({ routeId: 'compression-checkpoint', transcript: source, reason: 'GOLDEN_ROUTE' });
    const context = buildNarrativeContext(candidate);
    expect(context.sourceTranscriptDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(context.compressedContextDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(context.routeHistory.checkpoints.length).toBeGreaterThan(0);
    expect(rehydrateNarrativeCheckpoints(context.transcript)).toHaveLength(context.transcript.checkpoints.length);
    const projection = projectNarrativeContext(context, 'LOGIC');
    expect(projection.transcript.transitions).toEqual(context.transcript.transitions);
    expect(projection.transcript.transitions.some((transition) => transition.emittedHistory.some((record) => record.blocks.some((block) => (block as any).speaker === 'Adrian')))).toBe(true);
  });
});
