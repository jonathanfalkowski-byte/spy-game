import { createHash } from 'node:crypto';
import {
  compactNarrativeContext,
  ReviewerContractSchema,
  contextDigest,
  enforceFindingEvidence,
  M2_TRANSITION_REVIEW_RULE,
  parseReviewerResult,
  type M2Finding,
  type NarrativeContext,
  type NarrativeReviewerProvider,
  type ReviewerContract,
} from './m2';

export const M2_1_OUTPUT_TOKEN_CEILING = 1200;
/** Headroom for the authorized official OpenAI smoke/pilot reviewer. */
export const M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING = 3000;
/** Recomputed from the compressed opening-bad-assessment pilot packet (28,915 UTF-8 bytes / 4). */
export const M2_1_SMOKE_INPUT_TOKEN_BASELINE = 7229;
export const M2_1_DEFAULT_TIMEOUT_MS = 30_000;
export const M2_1_SUPPORTED_PROVIDER = 'openai-compatible' as const;
export const M2_1_SUPPORTED_MODELS = ['gpt-4.1-mini', 'gpt-4o-mini'] as const;
export const M2_1_OFFICIAL_PROVIDER = 'openai' as const;
export const M2_1_OFFICIAL_OPENAI_MODELS = ['gpt-5.6-sol'] as const;
export const M2_1_OFFICIAL_OPENAI_ENDPOINT = 'https://api.openai.com/v1/responses';
export const M2_1_OFFICIAL_REASONING_EFFORT = 'medium' as const;

export const M2_1_GPT_56_SOL_PRICING = {
  inputPerMillionUsd: 4,
  outputPerMillionUsd: 20,
  source: 'Owner-provided pilot authorization',
  sourceDate: '2026-09-19',
} as const;

export type M21SupportedModel = (typeof M2_1_SUPPORTED_MODELS)[number];

export type NarrativeProviderErrorCode =
  | 'PROVIDER_NOT_CONFIGURED'
  | 'UNSUPPORTED_PROVIDER'
  | 'UNSUPPORTED_MODEL'
  | 'INVALID_PROVIDER_CONFIG'
  | 'PROVIDER_TIMEOUT'
  | 'PROVIDER_ERROR'
  | 'MALFORMED_RESPONSE'
  | 'REFUSAL'
  | 'INCOMPLETE_RESPONSE'
  | 'RATE_LIMIT'
  | 'AUTHENTICATION_FAILED'
  | 'CONTEXT_LIMIT';

export class NarrativeProviderError extends Error {
  readonly code: NarrativeProviderErrorCode;
  readonly status?: number;

  constructor(code: NarrativeProviderErrorCode, message: string, status?: number) {
    super(message);
    this.name = 'NarrativeProviderError';
    this.code = code;
    this.status = status;
  }
}

export type NarrativeProviderConfig = {
  provider: typeof M2_1_SUPPORTED_PROVIDER;
  model: M21SupportedModel;
  endpoint: string;
  apiKey: string;
  timeoutMs: number;
};

export type OfficialOpenAIProviderConfig = {
  provider: typeof M2_1_OFFICIAL_PROVIDER;
  model: (typeof M2_1_OFFICIAL_OPENAI_MODELS)[number];
  endpoint?: string;
  apiKey: string;
  timeoutMs: number;
  reasoningEffort: typeof M2_1_OFFICIAL_REASONING_EFFORT;
};

export type PublicNarrativeProviderConfig = Omit<NarrativeProviderConfig, 'apiKey'>;
export type PublicOfficialOpenAIProviderConfig = Omit<OfficialOpenAIProviderConfig, 'apiKey'> & { endpoint: string };

export type NarrativeProviderStatus =
  | { status: 'AVAILABLE'; provider: OpenAICompatibleNarrativeProvider | OfficialOpenAINarrativeProvider; config: PublicNarrativeProviderConfig | PublicOfficialOpenAIProviderConfig }
  | {
      status: 'MISSING';
      reason: Extract<NarrativeProviderErrorCode, 'PROVIDER_NOT_CONFIGURED' | 'UNSUPPORTED_PROVIDER' | 'UNSUPPORTED_MODEL' | 'INVALID_PROVIDER_CONFIG'>;
      providerName?: string;
      model?: string;
      missing: string[];
    };

export type NarrativeTransport = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type ProviderProvenance = {
  provider: string;
  model: string;
  contextDigest: string;
  transcriptDigest: string;
  requestDigest: string;
  responseDigest?: string;
};

export type ProviderUsage = {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
};

export type ProviderPricing = {
  inputPerMillionUsd: number;
  outputPerMillionUsd: number;
  source: string;
  sourceDate: string;
};

export type ProviderReviewResult = {
  findings: M2Finding[];
  rejected: string[];
  provenance: ProviderProvenance;
  usage?: ProviderUsage;
  pricing?: ProviderPricing;
  estimatedCostUsd?: number;
  error?: { code: NarrativeProviderErrorCode; message: string; status?: number; details?: SafeOpenAIErrorDetails };
};

export type SafeOpenAIErrorDetails = {
  code?: string;
  type?: string;
  param?: string;
  message?: string;
  reason?: string;
};

type ProviderEnv = Record<string, string | undefined>;

export type NarrativeProviderPreflight = {
  provider: 'SUPPORTED' | 'MISSING' | 'UNSUPPORTED';
  model: 'SUPPORTED' | 'MISSING' | 'UNSUPPORTED';
  apiKey: 'AVAILABLE' | 'MISSING';
  pilot: 'AUTHORIZED' | 'BLOCKED';
  reason: 'READY' | 'PROVIDER_NOT_CONFIGURED' | 'UNSUPPORTED_PROVIDER' | 'UNSUPPORTED_MODEL';
};

export function inspectNarrativeProviderPreflight(env: ProviderEnv = process.env): NarrativeProviderPreflight {
  const providerName = env.EVE_NARRATIVE_PROVIDER?.trim();
  const modelName = env.EVE_NARRATIVE_MODEL?.trim();
  const keyAvailable = Boolean(env.OPENAI_API_KEY?.trim() || env.EVE_NARRATIVE_API_KEY?.trim());
  const provider = !providerName ? 'MISSING' : providerName === M2_1_OFFICIAL_PROVIDER || providerName === M2_1_SUPPORTED_PROVIDER ? 'SUPPORTED' : 'UNSUPPORTED';
  const model = !modelName
    ? 'MISSING'
    : providerName === M2_1_OFFICIAL_PROVIDER
      ? M2_1_OFFICIAL_OPENAI_MODELS.includes(modelName as (typeof M2_1_OFFICIAL_OPENAI_MODELS)[number]) ? 'SUPPORTED' : 'UNSUPPORTED'
      : providerName === M2_1_SUPPORTED_PROVIDER
        ? M2_1_SUPPORTED_MODELS.includes(modelName as M21SupportedModel) ? 'SUPPORTED' : 'UNSUPPORTED'
        : 'MISSING';
  const pilot = env.EVE_NARRATIVE_PILOT_APPROVED === '1' ? 'AUTHORIZED' : 'BLOCKED';
  let reason: NarrativeProviderPreflight['reason'] = 'READY';
  if (provider === 'MISSING' || !keyAvailable) reason = 'PROVIDER_NOT_CONFIGURED';
  else if (provider === 'UNSUPPORTED') reason = 'UNSUPPORTED_PROVIDER';
  else if (model === 'UNSUPPORTED') reason = 'UNSUPPORTED_MODEL';
  return { provider, model, apiKey: keyAvailable ? 'AVAILABLE' : 'MISSING', pilot, reason };
}

function publicConfig(config: NarrativeProviderConfig): PublicNarrativeProviderConfig {
  const { apiKey: _apiKey, ...safe } = config;
  return safe;
}

function publicOfficialConfig(config: OfficialOpenAIProviderConfig): PublicOfficialOpenAIProviderConfig {
  const { apiKey: _apiKey, endpoint, ...safe } = config;
  return { ...safe, endpoint: endpoint || M2_1_OFFICIAL_OPENAI_ENDPOINT };
}

function endpointIsSafe(endpoint: string) {
  let parsed: URL;
  try {
    parsed = new URL(endpoint);
  } catch {
    return false;
  }
  if (parsed.protocol === 'https:') return true;
  return parsed.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
}

export function createNarrativeProviderFromEnv(env: ProviderEnv = process.env): NarrativeProviderStatus {
  const providerName = env.EVE_NARRATIVE_PROVIDER?.trim();
  const modelName = env.EVE_NARRATIVE_MODEL?.trim();
  const endpoint = env.EVE_NARRATIVE_ENDPOINT?.trim();
  const apiKey = env.OPENAI_API_KEY?.trim() || env.EVE_NARRATIVE_API_KEY?.trim();
  const missing = [
    !providerName ? 'EVE_NARRATIVE_PROVIDER' : undefined,
    !modelName ? 'EVE_NARRATIVE_MODEL' : undefined,
    !apiKey ? 'OPENAI_API_KEY or EVE_NARRATIVE_API_KEY' : undefined,
  ].filter((value): value is string => Boolean(value));
  if (missing.length) return { status: 'MISSING', reason: 'PROVIDER_NOT_CONFIGURED', providerName, model: modelName, missing };
  if (!providerName || !modelName || !apiKey) {
    return { status: 'MISSING', reason: 'PROVIDER_NOT_CONFIGURED', providerName, model: modelName, missing: ['provider credentials'] };
  }
  if (providerName !== M2_1_SUPPORTED_PROVIDER) {
    if (providerName === M2_1_OFFICIAL_PROVIDER) {
      if (!M2_1_OFFICIAL_OPENAI_MODELS.includes(modelName as (typeof M2_1_OFFICIAL_OPENAI_MODELS)[number])) {
        return { status: 'MISSING', reason: 'UNSUPPORTED_MODEL', providerName, model: modelName, missing: [] };
      }
      const resolvedEndpoint = endpoint || M2_1_OFFICIAL_OPENAI_ENDPOINT;
      if (!endpointIsSafe(resolvedEndpoint)) {
        return { status: 'MISSING', reason: 'INVALID_PROVIDER_CONFIG', providerName, model: modelName, missing: ['EVE_NARRATIVE_ENDPOINT'] };
      }
      const timeoutMs = Number(env.EVE_NARRATIVE_TIMEOUT_MS ?? M2_1_DEFAULT_TIMEOUT_MS);
      if (!Number.isInteger(timeoutMs) || timeoutMs < 1000 || timeoutMs > 120_000) {
        return { status: 'MISSING', reason: 'INVALID_PROVIDER_CONFIG', providerName, model: modelName, missing: ['EVE_NARRATIVE_TIMEOUT_MS'] };
      }
      const config: OfficialOpenAIProviderConfig = {
        provider: M2_1_OFFICIAL_PROVIDER,
        model: modelName as (typeof M2_1_OFFICIAL_OPENAI_MODELS)[number],
        endpoint: resolvedEndpoint,
        apiKey,
        timeoutMs,
        reasoningEffort: M2_1_OFFICIAL_REASONING_EFFORT,
      };
      return {
        status: 'AVAILABLE',
        provider: new OfficialOpenAINarrativeProvider(config),
        config: publicOfficialConfig(config),
      };
    }
    return { status: 'MISSING', reason: 'UNSUPPORTED_PROVIDER', providerName, model: modelName, missing: [] };
  }
  if (!M2_1_SUPPORTED_MODELS.includes(modelName as M21SupportedModel)) {
    return { status: 'MISSING', reason: 'UNSUPPORTED_MODEL', providerName, model: modelName, missing: [] };
  }
  const resolvedEndpoint = endpoint || 'https://api.openai.com/v1/chat/completions';
  if (!endpointIsSafe(resolvedEndpoint)) {
    return { status: 'MISSING', reason: 'INVALID_PROVIDER_CONFIG', providerName, model: modelName, missing: ['EVE_NARRATIVE_ENDPOINT'] };
  }
  const timeoutMs = Number(env.EVE_NARRATIVE_TIMEOUT_MS ?? M2_1_DEFAULT_TIMEOUT_MS);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1000 || timeoutMs > 120_000) {
    return { status: 'MISSING', reason: 'INVALID_PROVIDER_CONFIG', providerName, model: modelName, missing: ['EVE_NARRATIVE_TIMEOUT_MS'] };
  }
  const config: NarrativeProviderConfig = {
    provider: M2_1_SUPPORTED_PROVIDER,
    model: modelName as M21SupportedModel,
    endpoint: resolvedEndpoint,
    apiKey,
    timeoutMs,
  };
  return {
    status: 'AVAILABLE',
    provider: new OpenAICompatibleNarrativeProvider(config),
    config: publicConfig(config),
  };
}

function jsonDigest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function extractStructuredContent(payload: unknown): unknown {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return payload;
  const record = payload as Record<string, unknown>;
  if (Array.isArray(record.findings)) return record.findings;
  const choices = record.choices;
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === 'object') {
    const message = (choices[0] as Record<string, unknown>).message;
    if (message && typeof message === 'object') {
      const content = (message as Record<string, unknown>).content;
      if (typeof content === 'string') {
        try {
          return JSON.parse(content);
        } catch {
          return content;
        }
      }
      return content;
    }
  }
  return payload;
}

function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
    || error instanceof Error && error.name === 'AbortError';
}

export class OpenAICompatibleNarrativeProvider implements NarrativeReviewerProvider {
  readonly name = M2_1_SUPPORTED_PROVIDER;
  readonly model: M21SupportedModel;
  private readonly config: NarrativeProviderConfig;
  private readonly transport: NarrativeTransport;

  constructor(config: NarrativeProviderConfig, options: { transport?: NarrativeTransport } = {}) {
    if (config.provider !== M2_1_SUPPORTED_PROVIDER) throw new NarrativeProviderError('UNSUPPORTED_PROVIDER', 'Unsupported narrative provider.');
    if (!M2_1_SUPPORTED_MODELS.includes(config.model)) throw new NarrativeProviderError('UNSUPPORTED_MODEL', 'Unsupported narrative model.');
    if (!config.apiKey) throw new NarrativeProviderError('PROVIDER_NOT_CONFIGURED', 'Narrative provider credentials are missing.');
    if (!endpointIsSafe(config.endpoint)) throw new NarrativeProviderError('INVALID_PROVIDER_CONFIG', 'Narrative provider endpoint is not allowed.');
    this.config = { ...config };
    this.model = config.model;
    this.transport = options.transport ?? ((input, init) => fetch(input, init));
  }

  /** The existing M2 synchronous interface is retained; live providers are explicitly async. */
  review(context: NarrativeContext, contract: ReviewerContract): Promise<M2Finding[]> {
    return this.reviewAsync(context, contract).then((result) => result.findings);
  }

  async reviewAsync(context: NarrativeContext, contract: ReviewerContract): Promise<ProviderReviewResult> {
    const parsedContext = compactNarrativeContext(context);
    const parsedContract = ReviewerContractSchema.parse(contract);
    const expectedContextDigest = contextDigest(parsedContext);
    // The provider receives a compact transcript, so its digest is over that exact packet.
    const expectedTranscriptDigest = jsonDigest(parsedContext.transcript);
    const messages = [
      {
        role: 'system',
        content: `You are an advisory EVE narrative QA reviewer. Return only a JSON array of evidence-backed findings. Never rewrite runtime state or canon. High and blocker claims require current plus prior or state evidence. ${M2_TRANSITION_REVIEW_RULE}`,
      },
      {
        role: 'user',
        content: JSON.stringify({
          contract: parsedContract,
          context: parsedContext,
          requiredDigests: { contextDigest: expectedContextDigest, transcriptDigest: expectedTranscriptDigest },
          output: { maxFindings: 5, maxOutputTokens: M2_1_OUTPUT_TOKEN_CEILING },
        }),
      },
    ];
    const request = {
      model: this.model,
      temperature: 0,
      max_tokens: M2_1_OUTPUT_TOKEN_CEILING,
      response_format: { type: 'json_object' },
      messages,
    };
    const provenanceBase: ProviderProvenance = {
      provider: this.name,
      model: this.model,
      contextDigest: expectedContextDigest,
      transcriptDigest: expectedTranscriptDigest,
      requestDigest: jsonDigest(request),
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
    let response: Response;
    try {
      response = await this.transport(this.config.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeout);
      const wrapped = isAbort(error)
        ? new NarrativeProviderError('PROVIDER_TIMEOUT', 'Narrative provider request timed out.')
        : new NarrativeProviderError('PROVIDER_ERROR', 'Narrative provider request failed.');
      return { findings: [], rejected: [wrapped.message], provenance: provenanceBase, error: { code: wrapped.code, message: wrapped.message } };
    }
    clearTimeout(timeout);
    if (!response.ok) {
      const wrapped = new NarrativeProviderError('PROVIDER_ERROR', `Narrative provider returned HTTP ${response.status}.`, response.status);
      return { findings: [], rejected: [wrapped.message], provenance: provenanceBase, error: { code: wrapped.code, message: wrapped.message, status: wrapped.status } };
    }
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return {
        findings: [],
        rejected: ['Narrative provider response was not valid JSON.'],
        provenance: provenanceBase,
        error: { code: 'MALFORMED_RESPONSE', message: 'Narrative provider response was not valid JSON.' },
      };
    }
    const structured = extractStructuredContent(payload);
    const responseProvenance = { ...provenanceBase, responseDigest: jsonDigest(payload) };
    const parsed = parseReviewerResult(structured);
    const rejected = [...parsed.rejected];
    const findings: M2Finding[] = [];
    for (const input of parsed.findings) {
      if (input.contextDigest !== expectedContextDigest || input.transcriptDigest !== expectedTranscriptDigest) {
        rejected.push('Finding digest does not match the supplied context.');
        continue;
      }
      const checked = enforceFindingEvidence({ ...input, provider: this.name, model: this.model });
      if (checked.finding) findings.push(checked.finding);
      if (checked.rejected) rejected.push(checked.rejected);
    }
    return { findings, rejected, provenance: responseProvenance };
  }
}

export const M2_FINDING_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    findings: {
      type: 'array',
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          reviewer: { type: 'string', enum: ['CONTINUITY', 'LOGIC', 'KNOWLEDGE', 'CHARACTER', 'INVESTIGATION', 'AGENCY_POWER', 'ADULT_THRILLER', 'PROSE', 'ROUTE_COHESION'] },
          reviewerVersion: { type: 'string', pattern: '^v\\d+$' },
          transcriptDigest: { type: 'string', pattern: '^[a-f0-9]{64}$' },
          contextDigest: { type: 'string', pattern: '^[a-f0-9]{64}$' },
          severity: { type: 'string', enum: ['BLOCKER', 'HIGH', 'MEDIUM', 'LOW'] },
          category: { type: 'string', enum: ['CONTINUITY', 'LOGIC', 'KNOWLEDGE', 'CHARACTER', 'INVESTIGATION', 'AGENCY_POWER', 'ADULT_THRILLER', 'PROSE', 'ROUTE_COHESION'] },
          routeId: { type: 'string' },
          seed: { type: ['integer', 'null'] },
          chapter: { type: ['string', 'null'] },
          node: { type: 'string' },
          finding: { type: 'string' },
          currentEvidence: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { type: { type: 'string' }, reference: { type: 'string' }, excerpt: { type: ['string', 'null'] } }, required: ['type', 'reference', 'excerpt'] } },
          priorEvidence: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { type: { type: 'string' }, reference: { type: 'string' }, excerpt: { type: ['string', 'null'] } }, required: ['type', 'reference', 'excerpt'] } },
          stateEvidence: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { type: { type: 'string' }, reference: { type: 'string' }, excerpt: { type: ['string', 'null'] } }, required: ['type', 'reference', 'excerpt'] } },
          reproductionTrace: { type: 'array', items: { type: 'string' } },
          whyItMatters: { type: 'string' },
          confidence: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
          humanReviewRequired: { type: 'boolean', const: true },
        },
        required: [
          'reviewer', 'reviewerVersion', 'transcriptDigest', 'contextDigest', 'severity', 'category', 'routeId',
          'seed', 'chapter', 'node', 'finding', 'currentEvidence', 'priorEvidence', 'stateEvidence', 'reproductionTrace',
          'whyItMatters', 'confidence', 'humanReviewRequired',
        ],
      },
    },
  },
  required: ['findings'],
} as const;

function normalizeNullableFinding(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;
  const finding = value as Record<string, unknown>;
  const normalizeEvidence = (items: unknown) => Array.isArray(items)
    ? items.map((item) => {
      if (!item || typeof item !== 'object') return item;
      const evidence = item as Record<string, unknown>;
      if (evidence.excerpt === null) {
        const { excerpt: _excerpt, ...withoutExcerpt } = evidence;
        return withoutExcerpt;
      }
      return evidence;
    })
    : items;
  return {
    ...finding,
    ...(finding.seed === null ? { seed: undefined } : {}),
    ...(finding.chapter === null ? { chapter: undefined } : {}),
    currentEvidence: normalizeEvidence(finding.currentEvidence),
    priorEvidence: normalizeEvidence(finding.priorEvidence),
    stateEvidence: normalizeEvidence(finding.stateEvidence),
  };
}

function normalizeStructuredFindings(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeNullableFinding);
  if (value && typeof value === 'object') {
    const findings = (value as Record<string, unknown>).findings;
    if (Array.isArray(findings)) return findings.map(normalizeNullableFinding);
  }
  return value;
}

function extractResponsesContent(payload: unknown): { structured?: unknown; refusal?: string; incomplete?: string; incompleteReason?: string } {
  if (!payload || typeof payload !== 'object') return {};
  const record = payload as Record<string, unknown>;
  if (record.status === 'incomplete') {
    const details = record.incomplete_details;
    const reason = details && typeof details === 'object' && typeof (details as Record<string, unknown>).reason === 'string'
      ? (details as Record<string, unknown>).reason as string
      : undefined;
    const safeReason = reason ? redactSensitiveText(reason, 160) : undefined;
    return { incomplete: typeof details === 'string' ? details : 'The Responses API returned an incomplete response.', ...(safeReason ? { incompleteReason: safeReason } : {}) };
  }
  if (typeof record.output_text === 'string') {
    try { return { structured: JSON.parse(record.output_text) }; } catch { return { structured: record.output_text }; }
  }
  const output = record.output;
  if (!Array.isArray(output)) return {};
  for (const item of output) {
    if (!item || typeof item !== 'object') continue;
    const itemRecord = item as Record<string, unknown>;
    if (itemRecord.type === 'refusal') return { refusal: String(itemRecord.refusal ?? 'The model refused the review.') };
    const content = itemRecord.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== 'object') continue;
      const partRecord = part as Record<string, unknown>;
      if (partRecord.type === 'refusal') return { refusal: String(partRecord.refusal ?? 'The model refused the review.') };
      if (partRecord.type === 'output_text' && typeof partRecord.text === 'string') {
        try { return { structured: JSON.parse(partRecord.text) }; } catch { return { structured: partRecord.text }; }
      }
    }
  }
  return {};
}

function usageFromResponses(payload: unknown): ProviderUsage | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const usage = (payload as Record<string, unknown>).usage;
  if (!usage || typeof usage !== 'object') return undefined;
  const record = usage as Record<string, unknown>;
  const outputDetails = record.output_tokens_details;
  const reasoningTokens = outputDetails && typeof outputDetails === 'object'
    ? (outputDetails as Record<string, unknown>).reasoning_tokens
    : record.reasoning_tokens;
  const numberOrUndefined = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : undefined;
  const parsed: ProviderUsage = {
    inputTokens: numberOrUndefined(record.input_tokens),
    outputTokens: numberOrUndefined(record.output_tokens),
    reasoningTokens: numberOrUndefined(reasoningTokens),
    totalTokens: numberOrUndefined(record.total_tokens),
  };
  return Object.values(parsed).some((value) => value !== undefined) ? parsed : undefined;
}

export function estimateProviderCostUsd(usage: ProviderUsage, pricing: ProviderPricing = M2_1_GPT_56_SOL_PRICING) {
  if (usage.inputTokens === undefined && usage.outputTokens === undefined) return undefined;
  return ((usage.inputTokens ?? 0) / 1_000_000) * pricing.inputPerMillionUsd
    + ((usage.outputTokens ?? 0) / 1_000_000) * pricing.outputPerMillionUsd;
}

function classifyOpenAIError(status: number, payload: unknown): NarrativeProviderErrorCode {
  let code = '';
  if (payload && typeof payload === 'object') {
    const error = (payload as Record<string, unknown>).error;
    if (error && typeof error === 'object') code = String((error as Record<string, unknown>).code ?? '');
  }
  if (status === 401 || status === 403) return 'AUTHENTICATION_FAILED';
  if (status === 429) return 'RATE_LIMIT';
  if (/context|token|length/i.test(code) || status === 413) return 'CONTEXT_LIMIT';
  if (/model_not_found|unsupported_model/i.test(code) || status === 404) return 'UNSUPPORTED_MODEL';
  return 'PROVIDER_ERROR';
}

function redactSensitiveText(value: unknown, maxLength: number, additionalSecrets: readonly string[] = []): string | undefined {
  if (typeof value !== 'string') return undefined;
  let redacted = value
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, 'Bearer [REDACTED]')
    .replace(/\bsk-[A-Za-z0-9_-]+\b/g, '[REDACTED]')
    .replace(/[\u0000-\u001F\u007F]/g, ' ');
  for (const secret of additionalSecrets) {
    if (secret) redacted = redacted.split(secret).join('[REDACTED]');
  }
  return redacted.slice(0, maxLength);
}

export function extractSafeOpenAIErrorDetails(payload: unknown, additionalSecrets: readonly string[] = []): SafeOpenAIErrorDetails {
  if (!payload || typeof payload !== 'object') return {};
  const payloadRecord = payload as Record<string, unknown>;
  const source = payloadRecord.error && typeof payloadRecord.error === 'object'
    ? payloadRecord.error as Record<string, unknown>
    : payloadRecord;
  const details: SafeOpenAIErrorDetails = {};
  const code = redactSensitiveText(source.code, 120, additionalSecrets);
  const type = redactSensitiveText(source.type, 120, additionalSecrets);
  const param = redactSensitiveText(source.param, 200, additionalSecrets);
  const message = redactSensitiveText(source.message, 1000, additionalSecrets);
  if (code) details.code = code;
  if (type) details.type = type;
  if (param) details.param = param;
  if (message) details.message = message;
  return details;
}

export class OfficialOpenAINarrativeProvider implements NarrativeReviewerProvider {
  readonly name = M2_1_OFFICIAL_PROVIDER;
  readonly model: (typeof M2_1_OFFICIAL_OPENAI_MODELS)[number];
  private readonly config: Required<OfficialOpenAIProviderConfig>;
  private readonly transport: NarrativeTransport;

  constructor(config: OfficialOpenAIProviderConfig, options: { transport?: NarrativeTransport } = {}) {
    if (config.provider !== M2_1_OFFICIAL_PROVIDER) throw new NarrativeProviderError('UNSUPPORTED_PROVIDER', 'Unsupported official provider.');
    if (!M2_1_OFFICIAL_OPENAI_MODELS.includes(config.model)) throw new NarrativeProviderError('UNSUPPORTED_MODEL', 'Unsupported official OpenAI model.');
    if (!config.apiKey) throw new NarrativeProviderError('PROVIDER_NOT_CONFIGURED', 'OpenAI API credentials are missing.');
    const endpoint = config.endpoint || M2_1_OFFICIAL_OPENAI_ENDPOINT;
    if (!endpointIsSafe(endpoint)) throw new NarrativeProviderError('INVALID_PROVIDER_CONFIG', 'OpenAI endpoint is not allowed.');
    if (config.reasoningEffort !== M2_1_OFFICIAL_REASONING_EFFORT) throw new NarrativeProviderError('INVALID_PROVIDER_CONFIG', 'Unsupported reasoning effort.');
    this.config = { ...config, endpoint };
    this.model = config.model;
    this.transport = options.transport ?? ((input, init) => fetch(input, init));
  }

  review(context: NarrativeContext, contract: ReviewerContract): Promise<M2Finding[]> {
    return this.reviewAsync(context, contract).then((result) => result.findings);
  }

  async reviewAsync(context: NarrativeContext, contract: ReviewerContract): Promise<ProviderReviewResult> {
    const parsedContext = compactNarrativeContext(context);
    const parsedContract = ReviewerContractSchema.parse(contract);
    const expectedContextDigest = contextDigest(parsedContext);
    const expectedTranscriptDigest = jsonDigest(parsedContext.transcript);
    const input = [
      { role: 'system', content: [{ type: 'input_text', text: `You are an advisory EVE narrative QA reviewer. Return only evidence-backed structured findings. Never rewrite runtime state or canon. Distinguish canonical truth, player knowledge, inference, and report. Consent is not compliance; desire is not action; dependency is not love. ${M2_TRANSITION_REVIEW_RULE}` }] },
      { role: 'user', content: [{ type: 'input_text', text: JSON.stringify({
        contract: parsedContract,
        context: parsedContext,
        requiredDigests: { contextDigest: expectedContextDigest, transcriptDigest: expectedTranscriptDigest },
        output: { maxFindings: 5, maxOutputTokens: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING },
      }) }] },
    ];
    const request = {
      model: this.model,
      reasoning: { effort: this.config.reasoningEffort },
      max_output_tokens: M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING,
      input,
      text: { format: { type: 'json_schema', name: 'm2_finding_bundle', strict: true, schema: M2_FINDING_JSON_SCHEMA } },
    };
    const provenanceBase: ProviderProvenance = {
      provider: this.name,
      model: this.model,
      contextDigest: expectedContextDigest,
      transcriptDigest: expectedTranscriptDigest,
      requestDigest: jsonDigest(request),
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
    let response: Response;
    try {
      response = await this.transport(this.config.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeout);
      const code = isAbort(error) ? 'PROVIDER_TIMEOUT' : 'PROVIDER_ERROR';
      const message = code === 'PROVIDER_TIMEOUT' ? 'OpenAI request timed out.' : 'OpenAI request failed.';
      return { findings: [], rejected: [message], provenance: provenanceBase, error: { code, message } };
    }
    clearTimeout(timeout);
    let payload: unknown;
    try { payload = await response.json(); } catch {
      const message = 'OpenAI response was not valid JSON.';
      return { findings: [], rejected: [message], provenance: provenanceBase, error: { code: 'MALFORMED_RESPONSE', message } };
    }
    const usage = usageFromResponses(payload);
    const pricing = M2_1_GPT_56_SOL_PRICING;
    const responseProvenance = { ...provenanceBase, responseDigest: jsonDigest(payload) };
    if (!response.ok) {
      const code = classifyOpenAIError(response.status, payload);
      const message = `OpenAI request failed (${code}).`;
      const details = extractSafeOpenAIErrorDetails(payload, [this.config.apiKey]);
      const rejected = details.message ? [message, `OpenAI detail: ${details.message}`] : [message];
      return { findings: [], rejected, provenance: responseProvenance, usage, pricing, estimatedCostUsd: usage ? estimateProviderCostUsd(usage, pricing) : undefined, error: { code, message, status: response.status, details } };
    }
    const extracted = extractResponsesContent(payload);
    if (extracted.refusal) {
      const message = 'OpenAI refused the narrative review.';
      return { findings: [], rejected: [message], provenance: responseProvenance, usage, pricing, estimatedCostUsd: usage ? estimateProviderCostUsd(usage, pricing) : undefined, error: { code: 'REFUSAL', message } };
    }
    if (extracted.incomplete) {
      const message = 'OpenAI returned an incomplete narrative review.';
      const details = extracted.incompleteReason ? { reason: extracted.incompleteReason } : undefined;
      return { findings: [], rejected: [message], provenance: responseProvenance, usage, pricing, estimatedCostUsd: usage ? estimateProviderCostUsd(usage, pricing) : undefined, error: { code: 'INCOMPLETE_RESPONSE', message, ...(details ? { details } : {}) } };
    }
    const parsed = parseReviewerResult(normalizeStructuredFindings(extracted.structured));
    const rejected = [...parsed.rejected];
    const findings: M2Finding[] = [];
    for (const item of parsed.findings) {
      if (item.contextDigest !== expectedContextDigest || item.transcriptDigest !== expectedTranscriptDigest) {
        rejected.push('Finding digest does not match the supplied context.');
        continue;
      }
      const checked = enforceFindingEvidence({ ...item, provider: this.name, model: this.model });
      if (checked.finding) findings.push(checked.finding);
      if (checked.rejected) rejected.push(checked.rejected);
    }
    return { findings, rejected, provenance: responseProvenance, usage, pricing, estimatedCostUsd: usage ? estimateProviderCostUsd(usage, pricing) : undefined, error: parsed.rejected.length && !findings.length ? { code: 'MALFORMED_RESPONSE', message: 'OpenAI structured output did not match the M2 finding schema.' } : undefined };
  }
}
