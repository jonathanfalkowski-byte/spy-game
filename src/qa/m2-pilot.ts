import { buildNarrativeContext, REVIEWER_CONTRACTS, routeAuthorityForRevision, type M2Finding, type M2Reviewer, type NarrativeReviewerProvider, type QaNarrativeCandidate, type M2RouteAuthority } from './m2';
import { M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING, M2_1_GPT_56_SOL_PRICING, estimateProviderCostUsd, outputTokenCeilingForReviewer, type ProviderReviewResult } from './m2-provider';
import { M2_REMAINING_PILOT_SELECTION, type M2RemainingPilotSelection } from './m2-calibration';

export const M2_1_PILOT_ROUTES = [
  'opening-bad-assessment',
  'chapter5-no-intimacy',
  'chapter5-public-visibility',
] as const;

export type M21PilotRoute = (typeof M2_1_PILOT_ROUTES)[number];

export const M2_1_PILOT_REVIEWERS: Readonly<Record<M21PilotRoute, readonly M2Reviewer[]>> = {
  'opening-bad-assessment': ['LOGIC', 'KNOWLEDGE', 'INVESTIGATION'],
  'chapter5-no-intimacy': ['CONTINUITY', 'AGENCY_POWER', 'ADULT_THRILLER', 'ROUTE_COHESION'],
  'chapter5-public-visibility': ['CONTINUITY', 'ADULT_THRILLER', 'ROUTE_COHESION'],
};

export type M21PilotCall = {
  ordinal: number;
  routeId: M21PilotRoute;
  reviewer: M2Reviewer;
  contentRevision?: number;
  authority?: M2RouteAuthority;
  contextBytes: number;
  estimatedInputTokens: number;
  outputTokenCeiling: number;
};

export type M21PilotPlan = {
  routes: readonly M21PilotRoute[];
  calls: M21PilotCall[];
  totalContextBytes: number;
  estimatedInputTokens: number;
  outputTokenCeiling: number;
  estimatedMaximumOutputTokens: number;
  externalCalls: 0;
};

export type M21PilotCallResult = {
  ordinal: number;
  routeId: M21PilotRoute;
  reviewer: M2Reviewer;
  contentRevision?: number;
  authority?: M2RouteAuthority;
  result: ProviderReviewResult;
};

export type M21PilotAccounting = {
  plannedCalls: number;
  attemptedExternalCalls: number;
  completedExternalCalls: number;
  failedExternalCalls: number;
  skippedAfterFailFast: number;
};

export type M21PilotRun = {
  results: M21PilotCallResult[];
  accounting: M21PilotAccounting;
};

export function highestSeverity(findings: readonly Pick<M2Finding, 'severity'>[]): M2Finding['severity'] | 'NONE' {
  const rank: Record<M2Finding['severity'], number> = { BLOCKER: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
  return findings.reduce<M2Finding['severity'] | 'NONE'>(
    (highest, finding) => rank[finding.severity] > (rank[highest as M2Finding['severity']] ?? 0) ? finding.severity : highest,
    'NONE',
  );
}

export type M21RemainingPilotPlan = Omit<M21PilotPlan, 'calls'> & {
  calls: M21PilotCall[];
  approvedSelection: readonly M2RemainingPilotSelection[];
};

type AsyncNarrativeReviewerProvider = NarrativeReviewerProvider & {
  reviewAsync(context: Parameters<NarrativeReviewerProvider['review']>[0], contract: Parameters<NarrativeReviewerProvider['review']>[1]): Promise<ProviderReviewResult>;
};

/** Deterministic provider/configuration failures stop the remaining pilot calls. */
export function isDeterministicPilotFailure(error: ProviderReviewResult['error'] | undefined): boolean {
  if (!error) return false;
  if (['AUTHENTICATION_FAILED', 'UNSUPPORTED_MODEL', 'CONTEXT_LIMIT', 'INVALID_PROVIDER_CONFIG', 'PROVIDER_NOT_CONFIGURED', 'MALFORMED_RESPONSE'].includes(error.code)) return true;
  return error.code === 'PROVIDER_ERROR' && [400, 401, 403, 404, 413].includes(error.status ?? 0);
}

function callKey(call: Pick<M21PilotCall, 'routeId' | 'reviewer'>) {
  return `${call.routeId}|${call.reviewer}`;
}

/** Fail closed if the prepared plan is anything other than the owner-approved nine-call set. */
export function assertM21RemainingPilotPlan(plan: M21RemainingPilotPlan): void {
  const expected = M2_REMAINING_PILOT_SELECTION.map(callKey).sort();
  const actual = plan.calls.map(callKey).sort();
  if (plan.calls.length !== 9 || expected.length !== 9 || expected.some((key, index) => key !== actual[index])) {
    throw new Error('M2_REMAINING_PILOT_SELECTION_MISMATCH');
  }
  if (plan.externalCalls !== 0) throw new Error('M2_REMAINING_PILOT_PLAN_EXTERNAL_CALLS_INVALID');
}

/** Executes the fixed pilot order with no retries and explicit fail-fast accounting. */
export async function runM21PilotCalls(candidates: QaNarrativeCandidate[], provider: AsyncNarrativeReviewerProvider, limit?: number): Promise<M21PilotRun> {
  const byRoute = new Map(candidates.map((candidate) => [candidate.routeId, candidate]));
  const calls: Array<{ ordinal: number; routeId: M21PilotRoute; reviewer: M2Reviewer }> = [];
  let ordinal = 0;
  for (const routeId of M2_1_PILOT_ROUTES) {
    if (!byRoute.has(routeId)) throw new Error(`M2.1 pilot route is not prepared: ${routeId}`);
    for (const reviewer of M2_1_PILOT_REVIEWERS[routeId]) calls.push({ ordinal: ++ordinal, routeId, reviewer });
  }
  const plannedCalls = limit === undefined ? calls.length : Math.min(Math.max(0, limit), calls.length);
  const results: M21PilotCallResult[] = [];
  const accounting: M21PilotAccounting = {
    plannedCalls,
    attemptedExternalCalls: 0,
    completedExternalCalls: 0,
    failedExternalCalls: 0,
    skippedAfterFailFast: 0,
  };
  const contracts = new Map(REVIEWER_CONTRACTS.map((contract) => [contract.reviewer, contract]));
  for (const call of calls.slice(0, plannedCalls)) {
    const candidate = byRoute.get(call.routeId)!;
    accounting.attemptedExternalCalls++;
    const result = await provider.reviewAsync(buildNarrativeContext(candidate), contracts.get(call.reviewer)!);
    results.push({ ...call, contentRevision: candidate.transcript.contentRevision, authority: routeAuthorityForRevision(candidate.transcript.contentRevision), result });
    if (result.error) {
      accounting.failedExternalCalls++;
      if (isDeterministicPilotFailure(result.error)) {
        accounting.skippedAfterFailFast = plannedCalls - accounting.attemptedExternalCalls;
        break;
      }
    } else {
      accounting.completedExternalCalls++;
    }
  }
  return { results, accounting };
}

/** Builds the exact approved remaining-call plan without contacting a provider. */
export function buildM21RemainingPilotPlan(candidates: QaNarrativeCandidate[]): M21RemainingPilotPlan {
  const fullPlan = buildM21PilotPlan(candidates);
  const approved = new Set(M2_REMAINING_PILOT_SELECTION.map(callKey));
  const calls = fullPlan.calls.filter((call) => approved.has(callKey(call)));
  const plan: M21RemainingPilotPlan = {
    ...fullPlan,
    calls,
    approvedSelection: M2_REMAINING_PILOT_SELECTION,
    totalContextBytes: calls.reduce((total, call) => total + call.contextBytes, 0),
    estimatedInputTokens: calls.reduce((total, call) => total + call.estimatedInputTokens, 0),
    estimatedMaximumOutputTokens: calls.reduce((total, call) => total + call.outputTokenCeiling, 0),
  };
  assertM21RemainingPilotPlan(plan);
  return plan;
}

/** Executes only the approved remaining set, sequentially, with the existing fail-fast/no-retry rules. */
export async function runM21RemainingPilotCalls(candidates: QaNarrativeCandidate[], provider: AsyncNarrativeReviewerProvider): Promise<M21PilotRun> {
  const plan = buildM21RemainingPilotPlan(candidates);
  assertM21RemainingPilotPlan(plan);
  const byRoute = new Map(candidates.map((candidate) => [candidate.routeId, candidate]));
  const results: M21PilotCallResult[] = [];
  const accounting: M21PilotAccounting = {
    plannedCalls: plan.calls.length,
    attemptedExternalCalls: 0,
    completedExternalCalls: 0,
    failedExternalCalls: 0,
    skippedAfterFailFast: 0,
  };
  const contracts = new Map(REVIEWER_CONTRACTS.map((contract) => [contract.reviewer, contract]));
  for (const call of plan.calls) {
    const candidate = byRoute.get(call.routeId);
    if (!candidate) throw new Error(`M2.1 remaining pilot route is not prepared: ${call.routeId}`);
    const contract = contracts.get(call.reviewer);
    if (!contract) throw new Error(`M2.1 remaining pilot reviewer is not prepared: ${call.reviewer}`);
    accounting.attemptedExternalCalls++;
    const result = await provider.reviewAsync(buildNarrativeContext(candidate), contract);
    results.push({ ...call, result });
    if (result.error) {
      accounting.failedExternalCalls++;
      if (isDeterministicPilotFailure(result.error)) {
        accounting.skippedAfterFailFast = accounting.plannedCalls - accounting.attemptedExternalCalls;
        break;
      }
    } else {
      accounting.completedExternalCalls++;
    }
  }
  return { results, accounting };
}

export type M21PilotUsageSummary = {
  usageAvailable: boolean;
  inputTokens: number;
  outputTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  visibleOutputTokensApprox?: number;
  estimatedCostUsd?: number;
};

export function summarizeM21PilotUsage(results: readonly M21PilotCallResult[]): M21PilotUsageSummary {
  const usageAvailable = results.some(({ result }) => result.usage !== undefined);
  const inputTokens = results.reduce((sum, { result }) => sum + (result.usage?.inputTokens ?? 0), 0);
  const outputTokens = results.reduce((sum, { result }) => sum + (result.usage?.outputTokens ?? 0), 0);
  const reasoningTokens = results.reduce((sum, { result }) => sum + (result.usage?.reasoningTokens ?? 0), 0);
  const totalTokens = results.reduce((sum, { result }) => sum + (result.usage?.totalTokens ?? 0), 0);
  const hasOutputTokens = results.some(({ result }) => result.usage?.outputTokens !== undefined);
  const visibleOutputTokensApprox = hasOutputTokens ? Math.max(0, outputTokens - reasoningTokens) : undefined;
  const costs = results.map(({ result }) => result.estimatedCostUsd).filter((value): value is number => value !== undefined);
  return { usageAvailable, inputTokens, outputTokens, reasoningTokens, totalTokens, ...(visibleOutputTokensApprox === undefined ? {} : { visibleOutputTokensApprox }), ...(costs.length ? { estimatedCostUsd: costs.reduce((sum, value) => sum + value, 0) } : {}) };
}

export function estimateM21SmokeCeilingCostUsd(inputTokens = 7229) {
  return estimateProviderCostUsd({ inputTokens, outputTokens: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING }, M2_1_GPT_56_SOL_PRICING)!;
}

/** Builds a byte- and token-bounded plan without contacting a provider. */
export function buildM21PilotPlan(candidates: QaNarrativeCandidate[]): M21PilotPlan {
  const byRoute = new Map(candidates.map((candidate) => [candidate.routeId, candidate]));
  const calls: M21PilotCall[] = [];
  let ordinal = 0;
  for (const routeId of M2_1_PILOT_ROUTES) {
    const candidate = byRoute.get(routeId);
    if (!candidate) throw new Error(`M2.1 pilot route is not prepared: ${routeId}`);
    const contextBytes = Buffer.byteLength(JSON.stringify(buildNarrativeContext(candidate)), 'utf8');
    const estimatedInputTokens = Math.ceil(contextBytes / 4);
    for (const reviewer of M2_1_PILOT_REVIEWERS[routeId]) {
      calls.push({
        ordinal: ++ordinal,
        routeId,
        reviewer,
        contentRevision: candidate.transcript.contentRevision,
        authority: routeAuthorityForRevision(candidate.transcript.contentRevision),
        contextBytes,
        estimatedInputTokens,
        outputTokenCeiling: outputTokenCeilingForReviewer(reviewer, estimatedInputTokens, 'openai'),
      });
    }
  }
  return {
    routes: M2_1_PILOT_ROUTES,
    calls,
    totalContextBytes: calls.reduce((total, call) => total + call.contextBytes, 0),
    estimatedInputTokens: calls.reduce((total, call) => total + call.estimatedInputTokens, 0),
    outputTokenCeiling: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING,
    estimatedMaximumOutputTokens: calls.reduce((total, call) => total + call.outputTokenCeiling, 0),
    externalCalls: 0,
  };
}
