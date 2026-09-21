import { buildNarrativeContext, REVIEWER_CONTRACTS, routeAuthorityForRevision, type M2Reviewer, type NarrativeReviewerProvider, type QaNarrativeCandidate, type M2RouteAuthority } from './m2';
import { M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING, M2_1_GPT_56_SOL_PRICING, estimateProviderCostUsd, type ProviderReviewResult } from './m2-provider';

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

type AsyncNarrativeReviewerProvider = NarrativeReviewerProvider & {
  reviewAsync(context: Parameters<NarrativeReviewerProvider['review']>[0], contract: Parameters<NarrativeReviewerProvider['review']>[1]): Promise<ProviderReviewResult>;
};

/** Deterministic provider/configuration failures stop the remaining pilot calls. */
export function isDeterministicPilotFailure(error: ProviderReviewResult['error'] | undefined): boolean {
  if (!error) return false;
  if (['AUTHENTICATION_FAILED', 'UNSUPPORTED_MODEL', 'CONTEXT_LIMIT', 'INVALID_PROVIDER_CONFIG', 'PROVIDER_NOT_CONFIGURED', 'MALFORMED_RESPONSE'].includes(error.code)) return true;
  return error.code === 'PROVIDER_ERROR' && [400, 401, 403, 404, 413].includes(error.status ?? 0);
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
        outputTokenCeiling: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING,
      });
    }
  }
  return {
    routes: M2_1_PILOT_ROUTES,
    calls,
    totalContextBytes: calls.reduce((total, call) => total + call.contextBytes, 0),
    estimatedInputTokens: calls.reduce((total, call) => total + call.estimatedInputTokens, 0),
    outputTokenCeiling: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING,
    externalCalls: 0,
  };
}
