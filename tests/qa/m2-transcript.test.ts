import { describe, expect, it } from 'vitest';
import { initialState } from '../../src/state/reducer';
import { availableQaActions, transcriptFromSnapshots, transcriptJson } from '../../src/qa/m1';
import { buildNarrativeContext, candidateFromTranscript, contextDigest, M2FindingClassificationSchema, selectNarrativeCandidates, transcriptFromGameState } from '../../src/qa/m2';
import { finish, toMaya } from '../helpers';
import { goldenRoutes } from './golden-routes';
import { runGoldenRoutes } from './runner';

describe('M2 transition-complete transcripts', () => {
  it('preserves the invitation choice and Maya response as one causal transition', () => {
    const state = finish(toMaya({ bond: 'love', morning: 'work', assessment: 'fraud' }));
    const transcript = transcriptFromGameState(state);
    const invitation = transcript.entries.find((entry) => entry.action?.choiceId === 'invitation.yes');
    expect(invitation).toBeDefined();
    expect(invitation?.kind).toBe('transition');
    expect(invitation?.previousNode).toBe('maya.invitation');
    expect(invitation?.nextNode).toBe('maya.case');
    expect(invitation?.emittedHistory.map((record) => record.node)).toEqual(['maya.invitation', 'maya.case']);

    const playerLine = invitation?.emittedHistory[0]?.blocks.find((block) => block.speaker === 'Adrian');
    const mayaLine = invitation?.emittedHistory[1]?.blocks.find((block) => block.speaker === 'Maya');
    expect(playerLine).toMatchObject({ kind: 'speech', speaker: 'Adrian', text: '“Eight o’clock.”' });
    expect(mayaLine).toMatchObject({ kind: 'speech', speaker: 'Maya', text: '“Eight,” she says. “I am holding you to that.”' });

    const knowledge = state.npcs.maya.known.find((observation) => observation.key === '“Eight o’clock.”');
    expect(knowledge).toMatchObject({
      key: '“Eight o’clock.”',
      source: 'Adrian’s answer to the evening invitation',
    });
    expect(knowledge?.key).toBe(playerLine?.text);
    expect(mayaLine?.speaker).not.toBe(knowledge?.source);

    const context = buildNarrativeContext(candidateFromTranscript({
      routeId: 'opening-invitation-transition',
      transcript,
      reason: 'GOLDEN_ROUTE',
    }));
    const contextTransition = context.transcript.transitions.find((entry) => entry.action?.choiceId === 'invitation.yes');
    expect(contextTransition?.emittedHistory).toHaveLength(2);
    expect(contextTransition?.emittedHistory[0]?.blocks).toContainEqual(playerLine);
    expect(contextTransition?.emittedHistory[1]?.blocks).toContainEqual(mayaLine);
  });

  it('keeps every history record appended by a single action in order', () => {
    const previous = initialState();
    const next = structuredClone(previous);
    next.revision = 1;
    next.history.push(
      { node: 'apartment.bond', blocks: [{ kind: 'speech', speaker: 'Adrian', text: 'first emitted record' }] },
      { node: 'apartment.reply', blocks: [{ kind: 'speech', speaker: 'Maya Reyes', text: 'second emitted record' }] },
    );
    const action = availableQaActions(previous)[0];
    const transcript = transcriptFromSnapshots([previous, next], [action], undefined, [action.id]);
    expect(transcript.entries[1]?.emittedHistory).toHaveLength(2);
    expect(transcript.entries[1]?.emittedHistory.map((record) => record.node)).toEqual(['apartment.bond', 'apartment.reply']);
    expect(transcript.entries[1]?.blocks.map((block) => block.text)).toEqual(['first emitted record', 'second emitted record']);
  });

  it('rebuilds all ten golden route contexts deterministically without losing dedupe behavior', () => {
    const build = () => {
      const golden = runGoldenRoutes();
      expect(golden.pass).toBe(10);
      expect(golden.fail).toBe(0);
      const candidates = goldenRoutes.map((route) => candidateFromTranscript({
        routeId: route.id,
        transcript: transcriptFromGameState(golden.states[route.id]),
        reason: 'GOLDEN_ROUTE',
      }));
      const selection = selectNarrativeCandidates(candidates);
      expect(selection.considered).toBe(10);
      expect(selection.deduplicated).toBe(10);
      expect(selection.selected).toHaveLength(10);
      return selection.selected.map((candidate) => {
        const context = buildNarrativeContext(candidate);
        return { routeId: candidate.routeId, transcriptDigest: candidate.transcript.entries.length, contextDigest: contextDigest(context), json: JSON.stringify(context) };
      });
    };
    expect(build()).toEqual(build());
  });

  it('exposes the human classification vocabulary without auto-classifying findings', () => {
    expect(M2FindingClassificationSchema.options).toEqual(['TRUE_ISSUE', 'USEFUL_WARNING', 'FALSE_POSITIVE', 'INSUFFICIENT_EVIDENCE']);
    expect(M2FindingClassificationSchema.parse('FALSE_POSITIVE')).toBe('FALSE_POSITIVE');
    expect(M2FindingClassificationSchema.safeParse('TRUE_ISSUE').success).toBe(true);
    expect(M2FindingClassificationSchema.safeParse('AUTO_CLASSIFIED').success).toBe(false);
  });

  it('writes transcript JSON as valid UTF-8 without mojibake', () => {
    const transcript = transcriptFromGameState(finish(toMaya({ assessment: 'fraud' })));
    const json = transcriptJson(transcript);
    const bytes = Buffer.from(json, 'utf8');
    expect(Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)).toBe(true);
    expect(json).toContain('“Eight o’clock.”');
    expect(json).not.toContain('â€™');
    expect(json).not.toContain('â€œ');
  });
});
