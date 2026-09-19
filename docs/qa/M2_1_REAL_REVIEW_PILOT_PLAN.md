# EVE QA M2.1 real-review pilot plan

Status: **PREPARATION ONLY — HUMAN AUTHORIZATION REQUIRED**

This plan is derived from the frozen revision-17 runtime and the committed M2 evidence-backed harness. It does not call a provider, spend money, mutate runtime state, or establish story canon.

## Provider and configuration gate

The current checkout has official OpenAI support in the adapter, but no configured API key. Environment inspection reported no `OPENAI_API_KEY`, `EVE_NARRATIVE_API_KEY`, or usable `EVE_NARRATIVE_*` provider configuration. Repository search found no local secret configuration. With the requested provider/model values supplied but no key, preflight reports:

- Provider status: `openai — SUPPORTED`
- Model status: `gpt-5.6-sol — SUPPORTED`
- API key status: `MISSING`
- Pilot status: `BLOCKED — PROVIDER_NOT_CONFIGURED`
- Provider endpoint: `https://api.openai.com/v1/responses`
- Pricing: configured as an estimate from the owner authorization, not an API invoice
- Calls made during preparation: `0`
- Spend during preparation: `0`

In the current empty environment, `qa:narrative:preflight` reports provider and model as `MISSING` as well, because those selection variables are not set. It does not expose or infer credentials.

The uncommitted adapter in `src/qa/m2-provider.ts` now separates the official `openai` Responses API from the generic `openai-compatible` Chat Completions adapter. Official OpenAI defaults to `/v1/responses`, supports the allowlisted `gpt-5.6-sol` model, sends `reasoning: { effort: "medium" }`, and prefers `OPENAI_API_KEY` with `EVE_NARRATIVE_API_KEY` as a compatibility fallback. The key is never included in logs, reports, digests, or this plan.

The official adapter captures provider-reported input, output, reasoning, and total token usage where present. Pilot pricing is configured as an estimate of $4 per million input tokens and $20 per million output tokens, sourced from the owner authorization dated 2026-09-19. API billing is separate from ChatGPT billing. The prepared maximum remains approximately $2.35 against the $3.00 owner ceiling.

## Exact pilot scope

The pilot is exactly three current golden routes and exactly ten reviewer calls:

| Call | Route | Reviewer | Context bytes | Estimated input tokens* | Output ceiling |
| ---: | --- | --- | ---: | ---: | ---: |
| 1 | `opening-bad-assessment` | LOGIC | 21,295 | 5,324 | 1,200 |
| 2 | `opening-bad-assessment` | KNOWLEDGE | 21,295 | 5,324 | 1,200 |
| 3 | `opening-bad-assessment` | INVESTIGATION | 21,295 | 5,324 | 1,200 |
| 4 | `chapter5-no-intimacy` | CONTINUITY | 295,509 | 73,878 | 1,200 |
| 5 | `chapter5-no-intimacy` | AGENCY_POWER | 295,509 | 73,878 | 1,200 |
| 6 | `chapter5-no-intimacy` | ADULT_THRILLER | 295,509 | 73,878 | 1,200 |
| 7 | `chapter5-no-intimacy` | ROUTE_COHESION | 295,509 | 73,878 | 1,200 |
| 8 | `chapter5-public-visibility` | CONTINUITY | 289,523 | 72,381 | 1,200 |
| 9 | `chapter5-public-visibility` | ADULT_THRILLER | 289,523 | 72,381 | 1,200 |
| 10 | `chapter5-public-visibility` | ROUTE_COHESION | 289,523 | 72,381 | 1,200 |

Totals are **2,114,490 context bytes** and **528,627 estimated input tokens** across the ten calls. The token estimate is the deterministic planning heuristic `ceil(UTF-8 bytes / 4)`; it is not a provider tokenizer quote. The configured output ceiling is **1,200 tokens per call**, or **12,000 tokens maximum across the ten calls**.

The route set is intentionally bounded. No fuzz samples, future route contracts, image review, Chapter 6 content, or additional reviewer categories are included.

## Acceptance criteria

Every response must be parsed as structured JSON through the M2 parser. Findings must carry matching context/transcript digests, route/node references, current evidence, and `humanReviewRequired: true`. Unsupported HIGH/BLOCKER claims are downgraded through the evidence gate. Provider errors, malformed output, timeouts, missing credentials, unsupported models, and digest mismatches fail closed. The adapter must not mutate the supplied context or game state. Findings remain advisory and require human review before any prose, logic, canon, or art change.

## Adapter validation

`tests/qa/m2-provider.test.ts` covers:

- valid structured response and provider/model/digest provenance
- malformed response rejection
- timeout handling
- provider HTTP error handling without response-body disclosure
- missing credentials and unsupported model configuration
- evidence downgrade for unsupported high severity
- no mutation of the supplied context

`tests/qa/m2-pilot-plan.qa.ts` recalculates the ten-call plan and confirms zero external calls.

## Future launch command

After a human authorizes the pilot and configures a supported provider/model, the prepared runner is gated by `EVE_NARRATIVE_PILOT_APPROVED=1`:

```powershell
$env:EVE_NARRATIVE_PROVIDER = 'openai'
$env:EVE_NARRATIVE_MODEL = 'gpt-5.6-sol'
$env:OPENAI_API_KEY = '<secret supplied in the process environment only>'
$env:EVE_NARRATIVE_PILOT_APPROVED = '1'
npm.cmd run qa:narrative:pilot
```

This command was **not run**. No provider call is authorized by this preparation pass. The pilot command remains fail-closed with `PILOT_NOT_AUTHORIZED` or `PROVIDER_NOT_CONFIGURED` until both gates are present.
