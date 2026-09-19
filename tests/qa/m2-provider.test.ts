import { describe, expect, it } from 'vitest';
import {
  REVIEWER_CONTRACTS,
  buildNarrativeContext,
  contextDigest,
  type NarrativeContext,
} from '../../src/qa/m2';
import { fixtureCandidate } from './m2-fixtures';
import {
  M2_1_SUPPORTED_PROVIDER,
  M2_1_OFFICIAL_PROVIDER,
  M2_1_OFFICIAL_OPENAI_ENDPOINT,
  OfficialOpenAINarrativeProvider,
  OpenAICompatibleNarrativeProvider,
  createNarrativeProviderFromEnv,
  inspectNarrativeProviderPreflight,
  type NarrativeProviderConfig,
  type NarrativeTransport,
} from '../../src/qa/m2-provider';

const config: NarrativeProviderConfig = {
  provider: M2_1_SUPPORTED_PROVIDER,
  model: 'gpt-4o-mini',
  endpoint: 'http://127.0.0.1:8787/v1/chat/completions',
  apiKey: 'test-only-key',
  timeoutMs: 5_000,
};

function contextFixture(): NarrativeContext {
  return buildNarrativeContext(fixtureCandidate('provider-route', 'GOLDEN_ROUTE', 'clean'));
}

function successTransport(makeFinding: (request: Record<string, any>) => unknown, status = 200, capture: { request?: Record<string, any> } = {}): NarrativeTransport {
  return async (_input, init) => {
    const request = JSON.parse(String(init?.body)) as Record<string, any>;
    capture.request = request;
    const payload = makeFinding(request);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(payload) } }] }), { status });
  };
}

function validFinding(request: Record<string, any>, overrides: Record<string, unknown> = {}) {
  const userContent = request.messages
    ? request.messages[1].content
    : request.input[1].content[0].text;
  const userPayload = JSON.parse(userContent) as Record<string, any>;
  const required = userPayload.requiredDigests;
  return [{
    reviewer: 'CONTINUITY',
    reviewerVersion: 'v1',
    transcriptDigest: required.transcriptDigest,
    contextDigest: required.contextDigest,
    severity: 'MEDIUM',
    category: 'CONTINUITY',
    routeId: 'provider-route',
    node: 'chapter5.presentation',
    finding: 'A bounded provider finding.',
    currentEvidence: [{ type: 'transcript', reference: 'step:1' }],
    priorEvidence: [],
    stateEvidence: [],
    whyItMatters: 'The reviewer must return evidence for human review.',
    confidence: 'MEDIUM',
    humanReviewRequired: true,
    ...overrides,
  }];
}

describe('M2.1 narrative provider adapter', () => {
  it('returns a structured success with trusted digests and provenance', async () => {
    const capture: { request?: Record<string, any> } = {};
    const provider = new OpenAICompatibleNarrativeProvider(config, { transport: successTransport((request) => validFinding(request), 200, capture) });
    const context = contextFixture();
    const result = await provider.reviewAsync(context, REVIEWER_CONTRACTS[0]);
    expect(result.error).toBeUndefined();
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].provider).toBe('openai-compatible');
    expect(result.findings[0].model).toBe('gpt-4o-mini');
    expect(result.provenance.contextDigest).toBe(contextDigest(context));
    expect(result.provenance.requestDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(result.provenance.responseDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(capture.request?.messages?.[1]?.content).toContain('provider-route');
  });

  it('rejects malformed structured output without producing a finding', async () => {
    const provider = new OpenAICompatibleNarrativeProvider(config, {
      transport: successTransport(() => 'not-an-array'),
    });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(result.findings).toEqual([]);
    expect(result.rejected.join(' ')).toMatch(/array/i);
  });

  it('fails closed on timeout', async () => {
    const transport: NarrativeTransport = async () => {
      const error = new Error('aborted');
      error.name = 'AbortError';
      throw error;
    };
    const provider = new OpenAICompatibleNarrativeProvider(config, { transport });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(result.error?.code).toBe('PROVIDER_TIMEOUT');
    expect(result.findings).toEqual([]);
  });

  it('fails closed on provider HTTP errors without exposing response content', async () => {
    const provider = new OpenAICompatibleNarrativeProvider(config, {
      transport: successTransport(() => ({ secret: 'should-not-be-read' }), 503),
    });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(result.error?.code).toBe('PROVIDER_ERROR');
    expect(result.rejected.join(' ')).not.toContain('should-not-be-read');
  });

  it('reports missing credentials and unsupported model/config without constructing a provider', () => {
    const missing = createNarrativeProviderFromEnv({});
    expect(missing.status).toBe('MISSING');
    if (missing.status === 'MISSING') expect(missing.reason).toBe('PROVIDER_NOT_CONFIGURED');
    const unsupported = createNarrativeProviderFromEnv({
      EVE_NARRATIVE_PROVIDER: 'openai-compatible',
      EVE_NARRATIVE_MODEL: 'not-allowlisted',
      EVE_NARRATIVE_API_KEY: 'secret-not-printed',
    });
    expect(unsupported.status).toBe('MISSING');
    if (unsupported.status === 'MISSING') expect(unsupported.reason).toBe('UNSUPPORTED_MODEL');
  });

  it('downgrades an unsupported high-severity claim through the evidence gate', async () => {
    const provider = new OpenAICompatibleNarrativeProvider(config, {
      transport: successTransport((request) => validFinding(request, { severity: 'HIGH', confidence: 'HIGH', currentEvidence: [{ type: 'transcript', reference: 'step:1' }], priorEvidence: [], stateEvidence: [] })),
    });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(result.findings[0].severity).toBe('MEDIUM');
    expect(result.findings[0].confidence).toBe('LOW');
  });

  it('does not mutate the supplied narrative context', async () => {
    const provider = new OpenAICompatibleNarrativeProvider(config, {
      transport: successTransport((request) => validFinding(request)),
    });
    const context = contextFixture();
    const before = JSON.stringify(context);
    await provider.reviewAsync(context, REVIEWER_CONTRACTS[0]);
    expect(JSON.stringify(context)).toBe(before);
  });

  it('supports the official OpenAI Responses API with reasoning and usage capture', async () => {
    const capture: { request?: Record<string, any> } = {};
    const provider = new OfficialOpenAINarrativeProvider({
      provider: M2_1_OFFICIAL_PROVIDER,
      model: 'gpt-5.6-sol',
      endpoint: M2_1_OFFICIAL_OPENAI_ENDPOINT,
      apiKey: 'official-test-key',
      timeoutMs: 5_000,
      reasoningEffort: 'medium',
    }, {
      transport: async (_input, init) => {
        const request = JSON.parse(String(init?.body)) as Record<string, any>;
        capture.request = request;
        const content = JSON.stringify({ findings: validFinding(request) });
        return new Response(JSON.stringify({
          status: 'completed',
          output: [{ type: 'message', content: [{ type: 'output_text', text: content }] }],
          usage: { input_tokens: 120, output_tokens: 30, total_tokens: 150, output_tokens_details: { reasoning_tokens: 8 } },
        }), { status: 200 });
      },
    });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(result.error).toBeUndefined();
    expect(result.findings[0].provider).toBe('openai');
    expect(result.findings[0].model).toBe('gpt-5.6-sol');
    expect(result.usage).toEqual({ inputTokens: 120, outputTokens: 30, reasoningTokens: 8, totalTokens: 150 });
    expect(result.estimatedCostUsd).toBeCloseTo(0.00108, 8);
    expect(capture.request?.reasoning).toEqual({ effort: 'medium' });
    expect(capture.request?.text?.format?.type).toBe('json_schema');
    expect(capture.request?.input?.[0]?.content?.[0]?.type).toBe('input_text');
  });

  it('handles official Responses refusal and incomplete responses', async () => {
    const refused = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => new Response(JSON.stringify({ status: 'completed', output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'no' }] }] }), { status: 200 }),
    });
    const refusalResult = await refused.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(refusalResult.error?.code).toBe('REFUSAL');
    const incomplete = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => new Response(JSON.stringify({ status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' } }), { status: 200 }),
    });
    const incompleteResult = await incomplete.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(incompleteResult.error?.code).toBe('INCOMPLETE_RESPONSE');
  });

  it('rejects malformed official structured output and classifies context limits', async () => {
    const malformed = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => new Response(JSON.stringify({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: '{not-json' }] }] }), { status: 200 }),
    });
    const malformedResult = await malformed.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(malformedResult.error?.code).toBe('MALFORMED_RESPONSE');
    const contextLimited = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => new Response(JSON.stringify({ error: { code: 'context_length_exceeded' } }), { status: 400 }),
    });
    expect((await contextLimited.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0])).error?.code).toBe('CONTEXT_LIMIT');
  });

  it('classifies official timeout, rate limit, and authentication errors', async () => {
    const timeout = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => { const error = new Error('aborted'); error.name = 'AbortError'; throw error; },
    });
    expect((await timeout.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0])).error?.code).toBe('PROVIDER_TIMEOUT');
    for (const [status, code] of [[429, 'RATE_LIMIT'], [401, 'AUTHENTICATION_FAILED']] as const) {
      const provider = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' }, {
        transport: async () => new Response(JSON.stringify({ error: { code: code.toLowerCase() } }), { status }),
      });
      expect((await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0])).error?.code).toBe(code);
    }
  });

  it('keeps official provider preflight distinct from API-key availability and supports the fallback key alias', () => {
    expect(inspectNarrativeProviderPreflight({ EVE_NARRATIVE_PROVIDER: 'openai', EVE_NARRATIVE_MODEL: 'gpt-5.6-sol' })).toMatchObject({ provider: 'SUPPORTED', model: 'SUPPORTED', apiKey: 'MISSING', reason: 'PROVIDER_NOT_CONFIGURED' });
    const fallback = createNarrativeProviderFromEnv({ EVE_NARRATIVE_PROVIDER: 'openai', EVE_NARRATIVE_MODEL: 'gpt-5.6-sol', EVE_NARRATIVE_API_KEY: 'fallback-secret' });
    expect(fallback.status).toBe('AVAILABLE');
    expect(fallback.status === 'AVAILABLE' && fallback.config).not.toHaveProperty('apiKey');
    expect(() => new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: '', timeoutMs: 5_000, reasoningEffort: 'medium' })).toThrow('credentials are missing');
  });

  it('never includes an API key in official errors or provenance', async () => {
    const secret = 'do-not-disclose-this-key';
    const provider = new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-5.6-sol', apiKey: secret, timeoutMs: 5_000, reasoningEffort: 'medium' }, {
      transport: async () => new Response(JSON.stringify({ error: { message: secret } }), { status: 500 }),
    });
    const result = await provider.reviewAsync(contextFixture(), REVIEWER_CONTRACTS[0]);
    expect(JSON.stringify(result)).not.toContain(secret);
  });

  it('rejects unsupported official models without making a request', () => {
    expect(() => new OfficialOpenAINarrativeProvider({ provider: M2_1_OFFICIAL_PROVIDER, model: 'gpt-4o-mini' as any, apiKey: 'secret', timeoutMs: 5_000, reasoningEffort: 'medium' })).toThrow('Unsupported official OpenAI model');
  });
});
