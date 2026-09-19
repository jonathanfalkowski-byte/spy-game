import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import {
  checkReconvergence,
  exploreQaGraph,
  makeQaExplorationRoot,
  runQaInvariants,
  simulateRandomRoute,
  stateDigest,
  writeQaReport,
  writeQaTranscript,
  type QaFailure,
  type QaExplorationRoot,
  type QaReport,
} from '../../src/qa/m1';
import { goldenRoutes, reconvergenceContracts } from './golden-routes';
import type { GameState } from '../../src/state/schema';
import { reducer, replayPrefix } from '../../src/state/reducer';

export type CampaignOptions = {
  randomCount: number;
  graph?: { maxStates: number; maxDepth: number; maxTransitions: number };
  explorationRootIds?: string[];
  maxSteps?: number;
  repositoryRoot?: string;
  writeReport?: boolean;
};

export function goldenRouteMatches(route: (typeof goldenRoutes)[number], state: GameState) {
  const checkpoints = route.expectedCheckpoints.every((node) => state.history.some((entry) => entry.node === node) || `${state.scene}.${state.phase}` === node);
  const persistent = !route.expectedPersistentFacts || route.expectedPersistentFacts(state);
  return checkpoints && persistent;
}

function captureGoldenRoots(route: (typeof goldenRoutes)[number], state: GameState): { roots: QaExplorationRoot[]; failures: QaFailure[] } {
  const checkpoints = route.checkpoints ?? route.expectedCheckpoints.map((node) => ({ id: node, node }));
  const roots: QaExplorationRoot[] = [];
  const failures: QaFailure[] = [];
  const revision = state.contentRevision ?? route.startingRevision;
  const pending = new Map(checkpoints.map((checkpoint) => [checkpoint.node, checkpoint]));
  let current: GameState;
  try {
    // Prefix replay is used once to establish the historical starting epoch;
    // subsequent events are applied through the real reducer, avoiding an
    // O(n^2) replay for every checkpoint in a golden route.
    current = replayPrefix([], route.startingRevision);
    for (const event of state.ledger as GameState['ledger']) {
      const next = reducer(current, event.action);
      if (next === current) throw new Error(`Invalid checkpoint event at sequence ${event.sequence}.`);
      current = next;
      const node = `${current.scene}.${current.phase}`;
      const checkpoint = pending.get(node);
      if (checkpoint) {
        roots.push(makeQaExplorationRoot({
          id: `${route.id}:${checkpoint.id}`,
          routeId: route.id,
          checkpoint: checkpoint.id,
          state: current,
        }));
        pending.delete(node);
      }
    }
    if (stateDigest(current) !== stateDigest(state)) throw new Error('Incremental checkpoint replay did not match the route factory state.');
  } catch {
    // Historical bridges can require a version-aware prefix replay. Fall back
    // to the explicit replay adapter, but only for a route that needs it.
    roots.length = 0;
    pending.clear();
    checkpoints.forEach((checkpoint) => pending.set(checkpoint.node, checkpoint));
    for (let length = 0; length <= state.ledger.length && pending.size; length++) {
      try {
        const snapshot = replayPrefix((state.ledger as GameState['ledger']).slice(0, length), revision);
        const checkpoint = pending.get(`${snapshot.scene}.${snapshot.phase}`);
        if (checkpoint) {
          roots.push(makeQaExplorationRoot({
            id: `${route.id}:${checkpoint.id}`,
            routeId: route.id,
            checkpoint: checkpoint.id,
            state: snapshot,
          }));
          pending.delete(checkpoint.node);
        }
      } catch {
        // A prefix can cross an historical boundary; the next prefix is still valid.
      }
    }
  }
  for (const checkpoint of pending.values()) {
      failures.push({
        severity: 'ERROR',
        checkId: 'GOLDEN_CHECKPOINT_NOT_REPLAYABLE',
        message: `${route.id} did not yield replayable checkpoint ${checkpoint.id}.`,
        contentRevision: revision,
        step: state.revision,
        node: `${state.scene}.${state.phase}`,
        actionTrace: state.ledger.map((event) => event.action.type),
        stateDigest: stateDigest(state),
        reproduction: `Run the ${route.id} golden route from tests/qa/golden-routes.ts.`,
      });
  }
  return { roots, failures };
}

function currentCommit(repositoryRoot: string) {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repositoryRoot, encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
}

export function runGoldenRoutes() {
  const states: Record<string, GameState> = {};
  const failures: QaFailure[] = [];
  const explorationRoots: QaExplorationRoot[] = [];
  let pass = 0;
  for (const route of goldenRoutes) {
    try {
      const state = route.factory();
      states[route.id] = state;
      const captured = captureGoldenRoots(route, state);
      explorationRoots.push(...captured.roots);
      failures.push(...captured.failures);
      const invariantResults = runQaInvariants(state, { checkReplay: true });
      const failed = invariantResults.some((check) => check.status === 'FAIL') || !goldenRouteMatches(route, state);
      if (!failed) pass++;
      else failures.push({
        severity: 'ERROR',
        checkId: 'GOLDEN_ROUTE_MISMATCH',
        message: `${route.id} failed a checkpoint, persistent fact, or invariant.`,
        contentRevision: state.contentRevision ?? 13,
        step: state.revision,
        node: `${state.scene}.${state.phase}`,
        actionTrace: state.ledger.map((event) => `${event.action.type}`),
        stateDigest: stateDigest(state),
        reproduction: `Run the ${route.id} golden route from tests/qa/golden-routes.ts.`,
      });
    } catch (error) {
      failures.push({
        severity: 'ERROR',
        checkId: 'GOLDEN_ROUTE_EXCEPTION',
        message: `${route.id}: ${error instanceof Error ? error.message : String(error)}`,
        contentRevision: route.startingRevision,
        step: 0,
        node: 'unknown',
        actionTrace: [],
        stateDigest: 'unavailable',
        reproduction: `Run the ${route.id} golden route from tests/qa/golden-routes.ts.`,
      });
    }
  }
  const reconvergence = reconvergenceContracts.map((contract) => checkReconvergence(contract, states));
  return { total: goldenRoutes.length, pass, fail: goldenRoutes.length - pass, states, failures, reconvergence, explorationRoots };
}

export function runCampaign(options: CampaignOptions): QaReport {
  const repositoryRoot = options.repositoryRoot ?? process.cwd();
  const golden = runGoldenRoutes();
  const random = Array.from({ length: options.randomCount }, (_, index) =>
    simulateRandomRoute({
      seed: index + 1,
      maxSteps: options.maxSteps ?? 220,
      chooserPolicy: 'prefer-unseen-action',
      replayEvery: 25,
    }),
  );
  const graphOptions = options.graph ?? { maxStates: 250, maxDepth: 40, maxTransitions: 1000 };
  const defaultRootIds = [
    'opening-analytical-cautious:helix.submitted',
    'clinic-privacy-autonomy:clinic.privacy',
    'mission-cautious-investigation:mission.complete',
    'chapter3-home-contact:chapter3.mayaContact',
    'chapter4-julian-professional:chapter4.assignment',
    'chapter5-public-visibility:chapter5.invitation',
  ];
  const rootIds = new Set(options.explorationRootIds ?? defaultRootIds);
  const selectedRoots = golden.explorationRoots.filter((root) => rootIds.has(root.id));
  const graph = exploreQaGraph({
    ...graphOptions,
    roots: selectedRoots,
    expectedNodes: selectedRoots.map((root) => root.node),
  });
  const failures = [...golden.failures, ...graph.failures, ...graph.deadEnds, ...random.flatMap((route) => route.failures)];
  const invariantCounts: Record<string, number> = {};
  for (const route of random) {
    for (const check of runQaInvariants(route.state)) invariantCounts[`${check.id}:${check.status}`] = (invariantCounts[`${check.id}:${check.status}`] ?? 0) + 1;
  }
  const replayDivergences = failures.filter((failure) => failure.checkId === 'REPLAY_DIVERGENCE').length;
  const reconvergenceFailures = golden.reconvergence.filter((result) => result.status === 'FAIL').length;
  const report: QaReport = {
    build: { commit: currentCommit(repositoryRoot), contentRevision: 17 },
    graph,
    goldenRoutes: { total: golden.total, pass: golden.pass, fail: golden.fail },
    random: {
      seeds: random.length,
      completed: random.filter((route) => route.completed).length,
      failed: random.filter((route) => route.failures.length > 0).length,
      maxStepFailures: random.filter((route) => route.failures.some((failure) => failure.checkId === 'MAX_STEPS')).length,
    },
    invariants: invariantCounts,
    reconvergence: { contracts: golden.reconvergence.length, failures: reconvergenceFailures },
    replay: { checkpoints: random.reduce((count, route) => count + Math.floor(route.steps / 25), 0) + golden.total, divergences: replayDivergences },
    transcripts: { generated: random.length },
    failures,
  };
  if (options.writeReport !== false) {
    writeQaReport(report, repositoryRoot);
    if (random[0]) writeQaTranscript(random[0].transcript, repositoryRoot, random[0].seed);
  }
  return report;
}

export function readLatestReport(repositoryRoot = process.cwd()) {
  return JSON.parse(readFileSync(`${repositoryRoot}/qa/reports/latest.json`, 'utf8')) as QaReport;
}
