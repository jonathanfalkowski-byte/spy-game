import { describe, expect, it } from 'vitest';
import { initialState, replay } from '../../src/state/reducer';
import { StateSchema } from '../../src/state/schema';
import { resolveSceneArt } from '../../src/ui/scene-art';
import {
  availableQaActions,
  checkReconvergence,
  exploreQaGraph,
  isQaTerminal,
  runQaInvariants,
  simulateRandomRoute,
  stableState,
  stepQaState,
} from '../../src/qa/m1';
import { goldenRouteMatches, runCampaign } from './runner';
import { goldenRoutes } from './golden-routes';

describe('EVE QA M1 runtime adapter', () => {
  it('discovers only the real initial runtime actions', () => {
    const state = initialState();
    const actions = availableQaActions(state);
    expect(actions.map((action) => action.id)).toEqual([
      'CHOOSE_DIALOGUE:id=bond.friend',
      'CHOOSE_DIALOGUE:id=bond.love',
      'CHOOSE_DIALOGUE:id=bond.colleague',
      'INSPECT_APARTMENT:id=mirror',
      'INSPECT_APARTMENT:id=lease',
      'INSPECT_APARTMENT:id=medical',
      'INSPECT_APARTMENT:id=jacket',
    ]);
    expect(actions.every((action) => action.expectedRevision === 0)).toBe(true);
  });

  it('steps through the real reducer without mutating the input', () => {
    const state = initialState();
    const action = availableQaActions(state)[0];
    const before = stableState(state);
    const step = stepQaState(state, action);
    expect(stableState(state)).toBe(before);
    expect(step.next.revision).toBe(1);
    expect(step.previousNode).toBe('apartment.bond');
  });

  it('rejects an illegal action', () => {
    expect(() => stepQaState(initialState(), { ...availableQaActions(initialState())[0], id: 'CHOOSE_DIALOGUE:id=not-legal' })).toThrow(/Illegal QA action/);
  });

  it('detects an explicit nonterminal dead end', () => {
    const dead = { ...initialState(), scene: 'chapter5' as const, phase: 'home' };
    expect(isQaTerminal(dead)).toBe(false);
    expect(availableQaActions(dead)).toHaveLength(0);
    expect(runQaInvariants(dead).find((check) => check.id === 'NO_UNINTENTIONAL_DEAD_END')?.status).toBe('FAIL');
  });

  it('is deterministic for the same seed and can vary across seeds', () => {
    const one = simulateRandomRoute({ seed: 48151623, maxSteps: 100, chooserPolicy: 'prefer-unseen-action' });
    const two = simulateRandomRoute({ seed: 48151623, maxSteps: 100, chooserPolicy: 'prefer-unseen-action' });
    const other = simulateRandomRoute({ seed: 48151624, maxSteps: 100, chooserPolicy: 'prefer-unseen-action' });
    expect(one.trace).toEqual(two.trace);
    expect(one.stateDigest).toBe(two.stateDigest);
    expect(other.trace).not.toEqual(one.trace);
  });

  it('surfaces a bounded max-step failure with reproduction data', () => {
    const result = simulateRandomRoute({ seed: 9, maxSteps: 1 });
    const failure = result.failures.find((item) => item.checkId === 'MAX_STEPS');
    expect(failure).toBeDefined();
    expect(failure?.seed).toBe(9);
    expect(failure?.step).toBe(1);
    expect(failure?.node).toBeTruthy();
    expect(failure?.actionTrace).toHaveLength(1);
    expect(failure?.reproduction).toContain('qa:replay -- --seed 9');
  });

  it('surfaces replay divergence and invariant failures', () => {
    const action = availableQaActions(initialState())[0];
    const next = stepQaState(initialState(), action).next;
    const tampered = { ...next, feedback: 'tampered' };
    expect(runQaInvariants(tampered, { checkReplay: true }).find((check) => check.id === 'REPLAY_MATCHES_STATE')?.status).toBe('FAIL');
    const duplicate = { ...next, knowledge: [...next.knowledge, next.knowledge[0]] };
    expect(runQaInvariants(duplicate).find((check) => check.id === 'NO_DUPLICATE_STATE_ENTRIES')?.status).toBe('FAIL');
  });

  it('checks historical replay contracts without changing historical code', () => {
    expect(StateSchema.safeParse(initialState(12)).success).toBe(true);
    expect(stableState(replay([], 13))).toBe(stableState(initialState()));
    expect(() => replay([], 17)).toThrow(/revision-17/);
  });

  it('keeps deterministic art selection fail-closed', () => {
    const visual = resolveSceneArt(initialState());
    expect(visual.issues).not.toContain('ASSET_WITHOUT_VALID_SHOT');
    if (visual.art) expect(visual.art.asset.id).toBeTruthy();
  });

  it('detects a reconvergence contract that loses route history', () => {
    const left = { ...initialState(), scene: 'ending' as const, phase: 'complete', relationships: { ...initialState().relationships, bond: 'friend' as const } };
    const right = { ...left, relationships: { ...left.relationships, bond: 'friend' as const } };
    const result = checkReconvergence(
      { id: 'fixture', node: 'ending.complete', routeIds: ['left', 'right'], mustAgree: ['scene'], mustDiffer: ['relationships.bond'] },
      { left, right },
    );
    expect(result.status).toBe('FAIL');
  });

  it('fails a golden route when an expected checkpoint is missing', () => {
    expect(goldenRouteMatches(goldenRoutes[0], initialState())).toBe(false);
  });

  it('runs a small report campaign and bounded graph smoke', () => {
    const report = runCampaign({ randomCount: 2, graph: { maxStates: 20, maxDepth: 8, maxTransitions: 40 }, writeReport: false });
    expect(report.random.seeds).toBe(2);
    expect(report.graph.uniqueStates).toBeGreaterThan(0);
    expect(report.graph.transitions).toBeGreaterThan(0);
    expect(report.graph.roots.length).toBeGreaterThan(0);
    expect(report.graph.roots.every((root) => root.replayValidated)).toBe(true);
    expect(report.graph.nodeInventory.knownNodes.length).toBeGreaterThan(report.graph.nodeInventory.visitedNodes.length);
    expect(report.reconvergence.failures).toBe(0);
  }, 30_000);
});

describe('EVE QA M1 bounded exploration', () => {
  it('reports caps as incomplete coverage instead of claiming exhaustive proof', () => {
    const graph = exploreQaGraph({ maxStates: 1, maxDepth: 1, maxTransitions: 1 });
    expect(graph.incompleteCoverage).toBe(true);
  });
});
