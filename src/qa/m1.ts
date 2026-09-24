import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  act,
  availableIntents,
  initialState,
  nodeOf,
  replay,
  replayPrefix,
} from '../state/reducer';
import type { GameState } from '../state/schema';
import { StateSchema } from '../state/schema';
import type { Intent, GameEvent } from '../state/actions';
import { NodeSchema } from '../content/schema';
import { resolveSceneArt } from '../ui/scene-art';

export type QaStatus = 'PASS' | 'WARNING' | 'FAIL' | 'NOT_YET_MACHINE_CHECKABLE';
export type QaSeverity = 'info' | 'warning' | 'error';

export type QaAction = {
  id: string;
  type: Intent['type'];
  source: string;
  node: string;
  label?: string;
  expectedRevision: number;
  intent: Intent;
};

/** Machine-readable semantics for one executed transition in a QA transcript. */
export type QaTranscriptAction = {
  id: string;
  type: Intent['type'];
  source: string;
  intent: Intent;
  previousNode: string;
  nextNode: string;
  choiceId?: string;
  choiceLabel?: string;
  choiceSpeaker?: string;
  choiceMode?: string;
};

export type QaTranscriptHistoryEntry = {
  node: string;
  blocks: GameState['history'][number]['blocks'];
};

export type QaInvariantResult = {
  id: string;
  status: QaStatus;
  severity: QaSeverity;
  message: string;
};

export type QaFailure = {
  severity: 'ERROR' | 'WARNING';
  checkId: string;
  message: string;
  seed?: number;
  contentRevision: number;
  step: number;
  node: string;
  action?: QaAction;
  previousNode?: string;
  actionTrace: string[];
  stateDigest: string;
  reproduction: string;
  rootId?: string;
  routeId?: string;
  checkpoint?: string;
};

export type QaStep = {
  previous: GameState;
  action: QaAction;
  next: GameState;
  previousNode: string;
  nextNode: string;
  invariants: QaInvariantResult[];
};

export type QaSimulation = {
  seed: number;
  contentRevision: number;
  completed: boolean;
  terminal: boolean;
  steps: number;
  trace: string[];
  nodes: string[];
  choices: QaAction[];
  warnings: QaInvariantResult[];
  failures: QaFailure[];
  stateDigest: string;
  state: GameState;
  transcript: QaTranscript;
};

export type QaTranscriptEntry = {
  step: number;
  kind: 'initial' | 'transition';
  previousNode?: string;
  nextNode: string;
  node: string;
  action?: QaTranscriptAction;
  emittedHistory: QaTranscriptHistoryEntry[];
  /** Flattened emitted blocks retained for consumers that only need prose. */
  blocks: GameState['history'][number]['blocks'];
  evidence: string[];
  knowledge: string[];
  custody: GameState['mission']['capture'];
  npcKnowledge: GameState['npcs'];
  resources: {
    opportunities: number;
    clinicOpportunity: number;
    missionRemaining: number;
    relationships: GameState['relationships'];
  };
  /** Additional deterministic state needed to rehydrate a lossless M2 context. */
  facts?: string[];
  claims?: string[];
  inferences?: GameState['inferences'];
  proof?: GameState['proof'];
  selected?: string[];
  draft?: GameState['draft'];
  report?: GameState['report'];
  feedback?: string;
  inspected?: string[];
  investigation?: GameState['investigation'];
  hintUsed?: boolean;
  choices?: GameState['choices'];
};

export type QaTranscript = {
  seed?: number;
  contentRevision: number;
  entries: QaTranscriptEntry[];
  routeTrace: string[];
};

export type QaInvariantContext = {
  previous?: GameState;
  action?: QaAction;
  step?: number;
  checkReplay?: boolean;
  trace?: string[];
  seed?: number;
};

const TERMINAL_NODES = new Set([
  // Explicit leaf points in the currently implemented content. Handoffs such as
  // ending.complete, mission.complete, chapter3.complete and chapter4.complete
  // intentionally remain playable and are therefore not terminals.
  'dayend.cautious',
  'dayend.walkaway',
  'clinic.stopped',
  'chapter5.complete',
]);

export const qaTerminalNodes = [...TERMINAL_NODES] as const;

const sourceFor = (type: Intent['type']) => {
  if (type === 'CHOOSE_DIALOGUE') return 'opening/dialogue';
  if (type === 'DAY_CHOOSE') return 'day';
  if (type === 'CLINIC_CHOOSE') return 'clinic';
  if (type === 'MISSION_CHOOSE') return 'mission';
  if (type === 'CHAPTER3_CHOOSE' || type === 'CONTINUE_CHAPTER3' || type === 'CONTINUE_CHAPTER3_SCENE2') return 'chapter3';
  if (type === 'CHAPTER4_CHOOSE') return 'chapter4';
  if (type === 'CHAPTER5_CHOOSE') return 'chapter5';
  if (type === 'CHAPTER6_CHOOSE') return 'chapter6';
  if (type === 'CHAPTER7_CHOOSE') return 'chapter7';
  if (type === 'CHAPTER8_CHOOSE') return 'chapter8';
  if (type === 'CHAPTER9_CHOOSE') return 'chapter9';
  if (type === 'CONTINUE_AUDIT_REVISION') return 'revision-bridge';
  if (type === 'CONTINUE') return 'scene-continuation';
  if (type.startsWith('INSPECT')) return 'apartment-inspection';
  if (type.includes('DOCUMENT') || type.includes('EVIDENCE') || type.includes('INVESTIGATION')) return 'evidence';
  if (type.includes('ASSESSMENT')) return 'assessment';
  return 'runtime';
};

const intentKey = (intent: Intent) => {
  const parts = Object.entries(intent)
    .filter(([key]) => key !== 'type')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`);
  return parts.length ? `${intent.type}:${parts.join('|')}` : intent.type;
};

/** Stable action discovery adapter. Eligibility always comes from the runtime selector. */
export function availableQaActions(state: GameState): QaAction[] {
  const node = nodeOf(state);
  const actions = availableIntents(state).map((intent) => ({
    id: intentKey(intent),
    type: intent.type,
    source: sourceFor(intent.type),
    node,
    expectedRevision: state.revision,
    intent,
  }));
  const ids = new Set<string>();
  return actions.filter((action) => {
    if (ids.has(action.id)) return false;
    ids.add(action.id);
    return true;
  });
}

export function isQaTerminal(state: GameState) {
  return TERMINAL_NODES.has(nodeOf(state));
}

export function stableState(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableState).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableState(item)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function stateDigest(state: GameState) {
  return createHash('sha256').update(stableState(state)).digest('hex');
}

function noDuplicates(values: readonly string[]) {
  return new Set(values).size === values.length;
}

function result(
  id: string,
  status: QaStatus,
  message: string,
  severity: QaSeverity = status === 'FAIL' ? 'error' : status === 'WARNING' ? 'warning' : 'info',
): QaInvariantResult {
  return { id, status, severity, message };
}

function replayResult(state: GameState): QaInvariantResult {
  try {
    const replayed = replay(state.ledger as GameEvent[], state.contentRevision ?? 13);
    return stableState(replayed) === stableState(state)
      ? result('REPLAY_MATCHES_STATE', 'PASS', 'The real version-aware replay matches the simulated state.')
      : result('REPLAY_MATCHES_STATE', 'FAIL', `Replay diverged: expected ${stateDigest(state)}, got ${stateDigest(replayed)}.`);
  } catch (error) {
    return result('REPLAY_MATCHES_STATE', 'FAIL', `Replay threw: ${error instanceof Error ? error.message : String(error)}.`);
  }
}

/** Deterministic invariants backed by fields that exist in the current runtime. */
export function runQaInvariants(state: GameState, context: QaInvariantContext = {}) {
  const checks: QaInvariantResult[] = [];
  const parsed = StateSchema.safeParse(state);
  checks.push(
    parsed.success
      ? result('STATE_SCHEMA_VALID', 'PASS', 'StateSchema accepts the state.')
      : result('STATE_SCHEMA_VALID', 'FAIL', parsed.error.issues.map((issue) => issue.message).join('; ')),
  );
  checks.push(
    state.revision === state.ledger.length
      ? result('REVISION_EQUALS_LEDGER_LENGTH', 'PASS', 'Revision equals ledger length.')
      : result('REVISION_EQUALS_LEDGER_LENGTH', 'FAIL', 'Revision and ledger length differ.'),
  );
  checks.push(
    [state.documents, state.selected, state.inspected, state.facts, state.claims, state.knowledge, state.day.completed, state.mission.completed, state.clinic.completed].every(noDuplicates)
      ? result('NO_DUPLICATE_STATE_ENTRIES', 'PASS', 'State collections contain no duplicate entries.')
      : result('NO_DUPLICATE_STATE_ENTRIES', 'FAIL', 'A state collection contains a duplicate entry.'),
  );
  checks.push(
    state.selected.every((id) => state.documents.includes(id))
      ? result('SELECTED_EVIDENCE_WAS_READ', 'PASS', 'Every selected evidence item was read.')
      : result('SELECTED_EVIDENCE_WAS_READ', 'FAIL', 'Selected evidence contains an unread document.'),
  );
  checks.push(
    NodeSchema.safeParse(nodeOf(state)).success
      ? result('CURRENT_NODE_VALID', 'PASS', `${nodeOf(state)} is a declared runtime node.`)
      : result('CURRENT_NODE_VALID', 'FAIL', `${nodeOf(state)} is not declared in NodeSchema.`),
  );
  checks.push(
    [state.opportunities, state.clinic.opportunity, state.mission.remaining, state.clinic.investment]
      .every((value) => Number.isInteger(value) && value >= 0)
      ? result('NO_NEGATIVE_OR_INVALID_RESOURCE_STATE', 'PASS', 'Known resource counters are non-negative integers.')
      : result('NO_NEGATIVE_OR_INVALID_RESOURCE_STATE', 'FAIL', 'A known resource counter is invalid.'),
  );
  checks.push(
    [state.day.completed, state.mission.completed, state.clinic.completed].every(noDuplicates)
      ? result('NO_DUPLICATE_ONE_TIME_REWARD', 'PASS', 'One-time completion ledgers contain no duplicate reward keys.')
      : result('NO_DUPLICATE_ONE_TIME_REWARD', 'FAIL', 'A one-time completion ledger contains a duplicate key.'),
  );
  const observations = Object.values(state.npcs).flatMap((npc) => [...npc.known, ...npc.beliefs]);
  checks.push(
    observations.every((observation) => observation.source.trim().length > 0)
      ? result('NPC_KNOWLEDGE_HAS_SOURCE', 'PASS', 'NPC knowledge and beliefs have authored sources.')
      : result('NPC_KNOWLEDGE_HAS_SOURCE', 'FAIL', 'An NPC observation has no source.'),
  );
  checks.push(
    state.mission.capture === null || ['Sloane', 'Evelyn', 'none'].includes(state.mission.capture.owner)
      ? result('EVIDENCE_CUSTODY_VALID', 'PASS', 'Mission capture custody uses a declared owner.')
      : result('EVIDENCE_CUSTODY_VALID', 'FAIL', 'Mission capture custody has an undeclared owner.'),
  );
  checks.push(
    state.report === null || state.report.assessment === state.draft
      ? result('ASSESSMENT_STATE_VALID', 'PASS', 'Assessment draft/report state is coherent.')
      : result('ASSESSMENT_STATE_VALID', 'FAIL', 'Committed assessment does not match the draft.'),
  );
  checks.push(
    result('NO_UNSOURCED_NPC_OMNISCIENCE', 'NOT_YET_MACHINE_CHECKABLE', 'Current state records observation sources, but does not encode a complete visibility graph.'),
  );
  checks.push(
    result('REQUIRED_ASSESSMENT_CAN_PROGRESS', 'NOT_YET_MACHINE_CHECKABLE', 'Current state has no explicit mandatory-assessment status field.'),
  );
  checks.push(
    result('NO_FUTURE_CHAPTER_STATE_LEAK', 'NOT_YET_MACHINE_CHECKABLE', 'Future chapter state is not represented as a versioned schema dimension yet.'),
  );
  checks.push(
    result('NO_INVALID_REVISION_BRIDGE', 'NOT_YET_MACHINE_CHECKABLE', 'Historical bridge authentication is enforced by reducer replay; semantic bridge metadata is not exposed to QA.'),
  );
  checks.push(
    result('ART_STATE_DOES_NOT_REFERENCE_STAGING', 'NOT_YET_MACHINE_CHECKABLE', 'Art state checks run when a scene resolver is available; arbitrary visual state is not stored in GameState.'),
  );
  if (context.previous && context.action) {
    checks.push(
      state.revision === context.previous.revision + 1
        ? result('LEGAL_ACTION_MUTATES_WHEN_EXPECTED', 'PASS', 'The legal action advanced revision exactly once.')
        : result('LEGAL_ACTION_MUTATES_WHEN_EXPECTED', 'FAIL', 'The legal action did not advance revision exactly once.'),
    );
    checks.push(
      availableQaActions(context.previous).some((candidate) => candidate.id === context.action?.id)
        ? result('LEGAL_ACTION_MUTATES_WHEN_EXPECTED', 'PASS', 'The action came from the runtime legal-action selector.')
        : result('LEGAL_ACTION_MUTATES_WHEN_EXPECTED', 'FAIL', 'The action was not legal at the previous state.'),
    );
  } else {
    checks.push(result('LEGAL_ACTION_MUTATES_WHEN_EXPECTED', 'NOT_YET_MACHINE_CHECKABLE', 'No step context was supplied.'));
  }
  const available = availableQaActions(state);
  checks.push(
    available.length > 0 || isQaTerminal(state)
      ? result('NO_UNINTENTIONAL_DEAD_END', 'PASS', available.length ? 'At least one legal action is available.' : 'The state is an explicit terminal.')
      : result('NO_UNINTENTIONAL_DEAD_END', 'FAIL', `No legal actions are available at nonterminal node ${nodeOf(state)}.`),
  );
  if (context.checkReplay) checks.push(replayResult(state));
  let visual;
  try {
    visual = resolveSceneArt(state);
    if (visual.art) {
      // resolveSceneArt only exposes the checked-in approved-scene-art manifest;
      // staging records are intentionally not part of this runtime payload.
      checks.push(result('ART_STATE_DOES_NOT_REFERENCE_STAGING', 'PASS', `Resolved ${visual.art.asset.id} from the approved scene-art manifest.`));
    }
  } catch (error) {
    checks.push(result('ART_STATE_DOES_NOT_REFERENCE_STAGING', 'WARNING', `Art resolver unavailable for this state: ${error instanceof Error ? error.message : String(error)}.`));
  }
  return checks;
}

export function stepQaState(state: GameState, action: QaAction, options: { checkInvariants?: boolean } = {}): QaStep {
  const legal = availableQaActions(state).find((candidate) => candidate.id === action.id);
  if (!legal) throw new Error(`Illegal QA action ${action.id} at ${nodeOf(state)}.`);
  const next = act(state, legal.intent);
  if (next === state) throw new Error(`Legal QA action became a reducer no-op: ${action.id} at ${nodeOf(state)}.`);
  const invariants = options.checkInvariants === false
    ? []
    : runQaInvariants(next, { previous: state, action: legal, checkReplay: false });
  if (invariants.some((check) => check.status === 'FAIL')) {
    throw new Error(`QA invariant failure after ${action.id}: ${invariants.filter((check) => check.status === 'FAIL').map((check) => check.id).join(', ')}`);
  }
  return { previous: state, action: legal, next, previousNode: nodeOf(state), nextNode: nodeOf(next), invariants };
}

class Lcg {
  private value: number;
  constructor(seed: number) {
    this.value = seed >>> 0;
  }
  next() {
    this.value = (this.value * 1664525 + 1013904223) >>> 0;
    return this.value;
  }
}

export type QaChooserPolicy = 'uniform' | 'prefer-unseen-action';
export type SimulationOptions = {
  seed: number;
  contentRevision?: number;
  maxSteps?: number;
  chooserPolicy?: QaChooserPolicy;
  startState?: GameState;
  replayEvery?: number;
};

function pickAction(actions: QaAction[], rng: Lcg, policy: QaChooserPolicy, seen: Map<string, number>) {
  const pool = policy === 'prefer-unseen-action'
    ? actions.filter((action) => (seen.get(action.id) ?? 0) === Math.min(...actions.map((item) => seen.get(item.id) ?? 0)))
    : actions;
  return pool[rng.next() % pool.length];
}

function transcriptAction(action: QaAction, previous: GameState, next: GameState, emittedHistory: QaTranscriptHistoryEntry[]): QaTranscriptAction {
  const choiceBlock = action.type.includes('CHOOSE')
    ? emittedHistory
      .flatMap((entry) => entry.blocks)
      .find((block) => block.kind === 'thought' || block.speaker === 'Adrian' || block.speaker?.startsWith('You')) as { kind?: string; speaker?: string; text?: string } | undefined
    : undefined;
  const choiceId = 'id' in action.intent && typeof action.intent.id === 'string' ? action.intent.id : undefined;
  return {
    id: action.id,
    type: action.type,
    source: action.source,
    intent: action.intent,
    previousNode: nodeOf(previous),
    nextNode: nodeOf(next),
    ...(choiceId ? { choiceId } : {}),
    ...(choiceBlock?.text ? { choiceLabel: choiceBlock.text } : {}),
    ...(choiceBlock?.speaker ? { choiceSpeaker: choiceBlock.speaker } : {}),
    ...(choiceBlock?.kind ? { choiceMode: choiceBlock.kind } : {}),
  };
}

export function transcriptFromSnapshots(states: GameState[], actions: QaAction[], seed: number | undefined, trace: string[]): QaTranscript {
  const state = states.at(-1)!;
  if (states.length !== actions.length + 1) throw new Error('QA transcript requires one action per state transition.');
  const entries: QaTranscriptEntry[] = [];
  const initial = states[0];
  const initialHistory = initial.history.map(({ node, blocks }) => ({ node, blocks }));
  entries.push({
    step: 0,
    kind: 'initial',
    nextNode: nodeOf(initial),
    node: nodeOf(initial),
    emittedHistory: initialHistory,
    blocks: initialHistory.flatMap((entry) => entry.blocks),
    evidence: [...initial.documents],
    knowledge: [...initial.knowledge],
    custody: initial.mission.capture,
    npcKnowledge: initial.npcs,
    resources: {
      opportunities: initial.opportunities,
      clinicOpportunity: initial.clinic.opportunity,
      missionRemaining: initial.mission.remaining,
      relationships: initial.relationships,
    },
    facts: [...initial.facts],
    claims: [...initial.claims],
    inferences: initial.inferences,
    proof: initial.proof,
    selected: [...initial.selected],
    draft: initial.draft,
    report: initial.report,
    feedback: initial.feedback,
    inspected: [...initial.inspected],
    investigation: initial.investigation,
    hintUsed: initial.hintUsed,
    choices: initial.choices,
  });
  for (let index = 1; index < states.length; index++) {
    const previous = states[index - 1];
    const snapshot = states[index];
    if (snapshot.history.length < previous.history.length) throw new Error('QA transcript history regressed during a transition.');
    const emittedHistory = snapshot.history.slice(previous.history.length).map(({ node, blocks }) => ({ node, blocks }));
    entries.push({
      step: index,
      kind: 'transition',
      previousNode: nodeOf(previous),
      nextNode: nodeOf(snapshot),
      node: nodeOf(snapshot),
      action: transcriptAction(actions[index - 1], previous, snapshot, emittedHistory),
      emittedHistory,
      blocks: emittedHistory.flatMap((entry) => entry.blocks),
      evidence: [...snapshot.documents],
      knowledge: [...snapshot.knowledge],
      custody: snapshot.mission.capture,
      npcKnowledge: snapshot.npcs,
      resources: {
        opportunities: snapshot.opportunities,
        clinicOpportunity: snapshot.clinic.opportunity,
        missionRemaining: snapshot.mission.remaining,
        relationships: snapshot.relationships,
      },
      facts: [...snapshot.facts],
      claims: [...snapshot.claims],
      inferences: snapshot.inferences,
      proof: snapshot.proof,
      selected: [...snapshot.selected],
      draft: snapshot.draft,
      report: snapshot.report,
      feedback: snapshot.feedback,
      inspected: [...snapshot.inspected],
      investigation: snapshot.investigation,
      hintUsed: snapshot.hintUsed,
      choices: snapshot.choices,
    });
  }
  return {
    seed,
    contentRevision: state.contentRevision ?? 13,
    entries,
    routeTrace: trace,
  };
}

export function simulateRandomRoute(options: SimulationOptions): QaSimulation {
  const seed = options.seed >>> 0;
  const maxSteps = options.maxSteps ?? 220;
  const policy = options.chooserPolicy ?? 'uniform';
  const rng = new Lcg(seed);
  let state = options.startState ?? initialState(options.contentRevision ?? 13);
  const trace: string[] = [];
  const nodes = [nodeOf(state)];
  const choices: QaAction[] = [];
  const snapshots = [state];
  const warnings: QaInvariantResult[] = [];
  const failures: QaFailure[] = [];
  const seen = new Map<string, number>();
  let step = 0;
  for (; step < maxSteps; step++) {
    const actions = availableQaActions(state);
    if (actions.length === 0) {
      if (!isQaTerminal(state)) {
        failures.push({
          severity: 'ERROR',
          checkId: 'NO_UNINTENTIONAL_DEAD_END',
          message: `No legal actions at nonterminal node ${nodeOf(state)}.`,
          seed,
          contentRevision: state.contentRevision ?? 13,
          step,
          node: nodeOf(state),
          previousNode: nodes.at(-2),
          actionTrace: trace,
          stateDigest: stateDigest(state),
          reproduction: `npm run qa:replay -- --seed ${seed}`,
        });
      }
      break;
    }
    const action = pickAction(actions, rng, policy, seen);
    seen.set(action.id, (seen.get(action.id) ?? 0) + 1);
    try {
      const resultStep = stepQaState(state, action);
      state = resultStep.next;
      snapshots.push(state);
      choices.push(action);
      trace.push(action.id);
      nodes.push(nodeOf(state));
      warnings.push(...resultStep.invariants.filter((check) => check.status === 'WARNING' || check.status === 'NOT_YET_MACHINE_CHECKABLE'));
      if (options.replayEvery && state.revision % options.replayEvery === 0) {
        const replayCheck = replayResult(state);
        if (replayCheck.status === 'FAIL') throw new Error(replayCheck.message);
      }
      if (isQaTerminal(state)) {
        const replayCheck = replayResult(state);
        if (replayCheck.status === 'FAIL') {
          failures.push({
            severity: 'ERROR',
            checkId: 'REPLAY_DIVERGENCE',
            message: replayCheck.message,
            seed,
            contentRevision: state.contentRevision ?? 13,
            step,
            node: nodeOf(state),
            action,
            previousNode: nodes.at(-2),
            actionTrace: trace,
            stateDigest: stateDigest(state),
            reproduction: `npm run qa:replay -- --seed ${seed}`,
          });
        }
        break;
      }
    } catch (error) {
      failures.push({
        severity: 'ERROR',
        checkId: error instanceof Error && error.message.startsWith('Replay') ? 'REPLAY_DIVERGENCE' : 'STEP_FAILURE',
        message: error instanceof Error ? error.message : String(error),
        seed,
        contentRevision: state.contentRevision ?? 13,
        step,
        node: nodeOf(state),
        action,
        previousNode: nodeOf(state),
        actionTrace: trace,
        stateDigest: stateDigest(state),
        reproduction: `npm run qa:replay -- --seed ${seed}`,
      });
      break;
    }
  }
  if (step >= maxSteps && !isQaTerminal(state)) {
    failures.push({
      severity: 'ERROR',
      checkId: 'MAX_STEPS',
      message: `Route exceeded the ${maxSteps}-step bound.`,
      seed,
      contentRevision: state.contentRevision ?? 13,
      step,
      node: nodeOf(state),
      actionTrace: trace,
      stateDigest: stateDigest(state),
      reproduction: `npm run qa:replay -- --seed ${seed}`,
    });
  }
  return {
    seed,
    contentRevision: state.contentRevision ?? 13,
    completed: failures.length === 0 && isQaTerminal(state),
    terminal: isQaTerminal(state),
    steps: choices.length,
    trace,
    nodes,
    choices,
    warnings,
    failures,
    stateDigest: stateDigest(state),
    state,
    transcript: transcriptFromSnapshots(snapshots, choices, seed, trace),
  };
}

export type QaExplorationRoot = {
  id: string;
  routeId: string;
  checkpoint: string;
  node: string;
  contentRevision: number;
  ledger: GameEvent[];
  stateDigest: string;
  state: GameState;
};

export function makeQaExplorationRoot(input: {
  id: string;
  routeId: string;
  checkpoint: string;
  state: GameState;
}): QaExplorationRoot {
  return {
    id: input.id,
    routeId: input.routeId,
    checkpoint: input.checkpoint,
    node: nodeOf(input.state),
    contentRevision: input.state.contentRevision ?? 13,
    ledger: [...(input.state.ledger as GameEvent[])],
    stateDigest: stateDigest(input.state),
    state: input.state,
  };
}

export type QaRootResult = {
  id: string;
  routeId: string;
  checkpoint: string;
  node: string;
  replayValidated: boolean;
  uniqueStates: number;
  transitions: number;
  nodes: string[];
  deadEnds: QaFailure[];
  failures: QaFailure[];
  incompleteCoverage: boolean;
  maxStates: number;
  maxDepth: number;
  maxTransitions: number;
};

export type QaNodeClassification = 'CURRENT_EXPECTED' | 'CURRENT_CONDITIONAL' | 'LEGACY' | 'NOT_YET_CLASSIFIED';
export type QaNodeInventory = {
  knownNodes: string[];
  visitedNodes: string[];
  unvisitedNodes: Array<{ node: string; classification: QaNodeClassification }>;
};

export type QaGraphOptions = {
  contentRevision?: number;
  maxStates?: number;
  maxDepth?: number;
  maxTransitions?: number;
  maxStatesPerRoot?: number;
  maxDepthPerRoot?: number;
  maxTransitionsPerRoot?: number;
  roots?: QaExplorationRoot[];
  expectedNodes?: string[];
};
export type QaGraphResult = {
  uniqueStates: number;
  nodes: string[];
  transitions: number;
  deadEnds: QaFailure[];
  failures: QaFailure[];
  incompleteCoverage: boolean;
  maxStates: number;
  maxDepth: number;
  maxTransitions: number;
  roots: QaRootResult[];
  statesByRoot: Record<string, number>;
  transitionsByRoot: Record<string, number>;
  capsByRoot: Record<string, { maxStates: number; maxDepth: number; maxTransitions: number; incompleteCoverage: boolean }>;
  nodeInventory: QaNodeInventory;
};

export function exploreQaGraph(options: QaGraphOptions = {}): QaGraphResult {
  const maxStates = options.maxStatesPerRoot ?? options.maxStates ?? 250;
  const maxDepth = options.maxDepthPerRoot ?? options.maxDepth ?? 40;
  const maxTransitions = options.maxTransitionsPerRoot ?? options.maxTransitions ?? 1000;
  const roots = options.roots?.length
    ? options.roots
    : [makeQaExplorationRoot({ id: 'initial', routeId: 'initial', checkpoint: 'initial', state: initialState(options.contentRevision ?? 13) })];
  const rootResults: QaRootResult[] = [];
  const allStates = new Set<string>();
  const allNodes = new Set<string>();
  const deadEnds: QaFailure[] = [];
  const failures: QaFailure[] = [];

  for (const root of roots) {
    const rootFailures: QaFailure[] = [];
    let replayValidated = false;
    try {
      const replayed = replay(root.ledger, root.contentRevision);
      replayValidated = stableState(replayed) === stableState(root.state);
      if (!replayValidated) {
        rootFailures.push({
          severity: 'ERROR',
          checkId: 'ROOT_REPLAY_MISMATCH',
          message: `Checkpoint ${root.id} replay diverged from its captured state.`,
          contentRevision: root.contentRevision,
          step: root.state.revision,
          node: root.node,
          actionTrace: root.ledger.map((event) => event.action.type),
          stateDigest: root.stateDigest,
          reproduction: `Replay checkpoint ${root.id} from ${root.routeId}.`,
          rootId: root.id,
          routeId: root.routeId,
          checkpoint: root.checkpoint,
        });
      }
    } catch (error) {
      rootFailures.push({
        severity: 'ERROR',
        checkId: 'ROOT_REPLAY_FAILURE',
        message: error instanceof Error ? error.message : String(error),
        contentRevision: root.contentRevision,
        step: root.state.revision,
        node: root.node,
        actionTrace: root.ledger.map((event) => event.action.type),
        stateDigest: root.stateDigest,
        reproduction: `Replay checkpoint ${root.id} from ${root.routeId}.`,
        rootId: root.id,
        routeId: root.routeId,
        checkpoint: root.checkpoint,
      });
    }

    const queue: Array<{ state: GameState; depth: number; trace: string[] }> = [{ state: root.state, depth: 0, trace: [] }];
    const visited = new Set<string>();
    const nodes = new Set<string>();
    const rootDeadEnds: QaFailure[] = [];
    const rootTransitionFailures: QaFailure[] = [];
    let transitions = 0;
    let incompleteCoverage = false;
    while (queue.length) {
      const item = queue.shift()!;
      const fingerprint = stateDigest(item.state);
      if (visited.has(fingerprint)) continue;
      if (visited.size >= maxStates || item.depth > maxDepth || transitions >= maxTransitions) {
        incompleteCoverage = true;
        break;
      }
      visited.add(fingerprint);
      allStates.add(fingerprint);
      nodes.add(nodeOf(item.state));
      allNodes.add(nodeOf(item.state));
      const actions = availableQaActions(item.state);
      if (!actions.length && !isQaTerminal(item.state)) {
        const failure: QaFailure = {
          severity: 'ERROR',
          checkId: 'NO_UNINTENTIONAL_DEAD_END',
          message: `No legal actions at ${nodeOf(item.state)}.`,
          contentRevision: item.state.contentRevision ?? 13,
          step: item.depth,
          node: nodeOf(item.state),
          actionTrace: item.trace,
          stateDigest: fingerprint,
          reproduction: 'Use the recorded action trace with qa:replay.',
          rootId: root.id,
          routeId: root.routeId,
          checkpoint: root.checkpoint,
        };
        rootDeadEnds.push(failure);
        continue;
      }
      for (const action of actions) {
        if (transitions >= maxTransitions) {
          incompleteCoverage = true;
          break;
        }
        transitions++;
        try {
          const stepped = stepQaState(item.state, action, { checkInvariants: false });
          queue.push({ state: stepped.next, depth: item.depth + 1, trace: [...item.trace, action.id] });
        } catch (error) {
          const failure: QaFailure = {
            severity: 'ERROR',
            checkId: 'GRAPH_TRANSITION_FAILURE',
            message: error instanceof Error ? error.message : String(error),
            contentRevision: item.state.contentRevision ?? 13,
            step: item.depth,
            node: nodeOf(item.state),
            action,
            actionTrace: item.trace,
            stateDigest: fingerprint,
            reproduction: 'Use the recorded action trace with qa:replay.',
            rootId: root.id,
            routeId: root.routeId,
            checkpoint: root.checkpoint,
          };
          rootTransitionFailures.push(failure);
        }
      }
    }
    if (queue.length && !incompleteCoverage) incompleteCoverage = true;
    const rootResult: QaRootResult = {
      id: root.id,
      routeId: root.routeId,
      checkpoint: root.checkpoint,
      node: root.node,
      replayValidated,
      uniqueStates: visited.size,
      transitions,
      nodes: [...nodes].sort(),
      deadEnds: rootDeadEnds,
      failures: [...rootFailures, ...rootTransitionFailures],
      incompleteCoverage,
      maxStates,
      maxDepth,
      maxTransitions,
    };
    rootResults.push(rootResult);
    deadEnds.push(...rootDeadEnds);
    failures.push(...rootResult.failures);
  }

  const knownNodes = [...NodeSchema.options].sort();
  const expectedNodes = new Set(options.expectedNodes ?? []);
  const classify = (node: string): QaNodeClassification => {
    if (expectedNodes.has(node)) return 'CURRENT_EXPECTED';
    if (node.startsWith('legacy.') || node.startsWith('evening.') || node.startsWith('warning.')) return 'LEGACY';
    if (/^(chapter\d*|mission|clinic|apartment|commute|office|helix|maya|ending|file|security|sloane|refusal|release|dayend)\./.test(node)) return 'CURRENT_CONDITIONAL';
    return 'NOT_YET_CLASSIFIED';
  };
  const visitedNodes = [...allNodes].sort();
  return {
    uniqueStates: allStates.size,
    nodes: visitedNodes,
    transitions: rootResults.reduce((total, root) => total + root.transitions, 0),
    deadEnds,
    failures,
    incompleteCoverage: rootResults.some((root) => root.incompleteCoverage),
    maxStates,
    maxDepth,
    maxTransitions,
    roots: rootResults,
    statesByRoot: Object.fromEntries(rootResults.map((root) => [root.id, root.uniqueStates])),
    transitionsByRoot: Object.fromEntries(rootResults.map((root) => [root.id, root.transitions])),
    capsByRoot: Object.fromEntries(rootResults.map((root) => [root.id, { maxStates: root.maxStates, maxDepth: root.maxDepth, maxTransitions: root.maxTransitions, incompleteCoverage: root.incompleteCoverage }])),
    nodeInventory: {
      knownNodes,
      visitedNodes,
      unvisitedNodes: knownNodes.filter((node) => !allNodes.has(node)).map((node) => ({ node, classification: classify(node) })),
    },
  };
}

export type ReconvergenceContract = {
  id: string;
  node: string;
  routeIds: string[];
  mustDiffer?: string[];
  mustAgree?: string[];
};
export type ReconvergenceResult = { contract: ReconvergenceContract; status: QaStatus; message: string };

function readPath(state: GameState, path: string): unknown {
  const segments = path.split('.');
  let value: unknown = state;
  for (let index = 0; index < segments.length; index++) {
    if (!value || typeof value !== 'object') return undefined;
    const record = value as Record<string, unknown>;
    const remainder = segments.slice(index).join('.');
    if (Object.prototype.hasOwnProperty.call(record, remainder)) return record[remainder];
    value = record[segments[index]];
  }
  return value;
}

export function checkReconvergence(contract: ReconvergenceContract, routes: Record<string, GameState>): ReconvergenceResult {
  const states = contract.routeIds.map((id) => routes[id]);
  if (states.some((state) => !state || nodeOf(state) !== contract.node))
    return { contract, status: 'FAIL', message: `Not every route reached ${contract.node}.` };
  for (const path of contract.mustAgree ?? []) {
    const expected = stableState(readPath(states[0], path));
    if (states.some((state) => stableState(readPath(state, path)) !== expected))
      return { contract, status: 'FAIL', message: `Shared field ${path} differs after reconvergence.` };
  }
  for (const path of contract.mustDiffer ?? []) {
    const values = new Set(states.map((state) => stableState(readPath(state, path))));
    if (values.size === 1)
      return { contract, status: 'FAIL', message: `History-bearing field ${path} was erased.` };
  }
  return { contract, status: 'PASS', message: `Routes legitimately reconverged at ${contract.node}.` };
}

export function transcriptJson(transcript: QaTranscript) {
  return JSON.stringify(transcript, null, 2) + '\n';
}

export function transcriptMarkdown(transcript: QaTranscript) {
  const lines = [`# QA transcript${transcript.seed === undefined ? '' : ` · seed ${transcript.seed}`}`, '', `Content revision: ${transcript.contentRevision}`, ''];
  for (const entry of transcript.entries) {
    lines.push(`## ${entry.step}. ${entry.node}`);
    if (entry.kind === 'transition') lines.push(`- Transition: \`${entry.previousNode}\` → \`${entry.nextNode}\``);
    for (const emitted of entry.emittedHistory) {
      lines.push(`- History record: \`${emitted.node}\``);
      for (const block of emitted.blocks) lines.push(`  - **${block.kind}**${block.speaker ? ` · ${block.speaker}` : ''}: ${block.text}`);
    }
    if (entry.action) lines.push(`- Action: \`${entry.action.id}\` (${entry.action.type}, ${entry.action.source})`);
    lines.push('');
  }
  return lines.join('\n');
}

export type QaReport = {
  build: { commit?: string; contentRevision: number };
  graph: QaGraphResult;
  goldenRoutes: { total: number; pass: number; fail: number };
  random: { seeds: number; completed: number; failed: number; maxStepFailures: number };
  invariants: Record<string, number>;
  reconvergence: { contracts: number; failures: number };
  replay: { checkpoints: number; divergences: number };
  transcripts: { generated: number };
  failures: QaFailure[];
};

/** Write only the two fixed volatile report names under qa/reports. */
export function writeQaReport(report: QaReport, repositoryRoot: string) {
  const reportDir = resolve(repositoryRoot, 'qa', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const jsonPath = resolve(reportDir, 'latest.json');
  const mdPath = resolve(reportDir, 'latest.md');
  if (dirname(jsonPath) !== reportDir || dirname(mdPath) !== reportDir) throw new Error('Unsafe QA report path.');
  writeFileSync(jsonPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  const markdown = [
    '# EVE QA M1 report',
    '',
    `Content revision: ${report.build.contentRevision}`,
    `Graph: ${report.graph.uniqueStates} states, ${report.graph.transitions} transitions, ${report.graph.deadEnds.length} dead ends${report.graph.incompleteCoverage ? ' (INCOMPLETE_COVERAGE)' : ''}.`,
    `Exploration roots: ${report.graph.roots.length}; replay-validated: ${report.graph.roots.filter((root) => root.replayValidated).length}/${report.graph.roots.length}.`,
    `Per-root caps: ${report.graph.maxStates} states, ${report.graph.maxDepth} depth, ${report.graph.maxTransitions} transitions.`,
    `Node inventory: ${report.graph.nodeInventory.visitedNodes.length}/${report.graph.nodeInventory.knownNodes.length} visited; ${report.graph.nodeInventory.unvisitedNodes.length} unvisited classified nodes.`,
    `Golden routes: ${report.goldenRoutes.pass}/${report.goldenRoutes.total} passed.`,
    `Random routes: ${report.random.completed}/${report.random.seeds} completed; ${report.random.failed} failed.`,
    `Replay checkpoints: ${report.replay.checkpoints}; divergences: ${report.replay.divergences}.`,
    `Reconvergence contracts: ${report.reconvergence.contracts}; failures: ${report.reconvergence.failures}.`,
    '',
  ].join('\n');
  writeFileSync(mdPath, markdown, 'utf8');
  return { jsonPath, mdPath };
}

/** Export one reproducible JSON transcript as a human-review example. */
export function writeQaTranscript(transcript: QaTranscript, repositoryRoot: string, seed: number) {
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Unsafe transcript seed.');
  const reportDir = resolve(repositoryRoot, 'qa', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const filename = `transcript-seed-${seed}.json`;
  const transcriptPath = resolve(reportDir, filename);
  if (dirname(transcriptPath) !== reportDir || filename.includes('..')) throw new Error('Unsafe transcript path.');
  writeFileSync(transcriptPath, transcriptJson(transcript), 'utf8');
  return transcriptPath;
}
