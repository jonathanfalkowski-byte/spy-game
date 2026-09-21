# M2.1A official OpenAI provider

The official provider is identified as `openai` and uses the OpenAI Responses API at:

`https://api.openai.com/v1/responses`

The current allowlisted narrative-review model is `gpt-5.6-sol`. Official requests use the model default plus `reasoning.effort = medium` and a 3,000-token output ceiling for the authorized real-review path. The generic `openai-compatible` provider remains separate and continues to use its Chat Completions contract with the 1,200-token ceiling.

Configuration is process-only:

```powershell
$env:EVE_NARRATIVE_PROVIDER = 'openai'
$env:EVE_NARRATIVE_MODEL = 'gpt-5.6-sol'
$env:OPENAI_API_KEY = '<secret>'
$env:EVE_NARRATIVE_PILOT_APPROVED = '1'
```

`OPENAI_API_KEY` is preferred. `EVE_NARRATIVE_API_KEY` is accepted as a backwards-compatible fallback. Neither value is logged, written to reports, included in errors, or stored in the repository. The endpoint defaults to the official Responses endpoint; an explicit override is accepted only when it passes the adapter’s safe-URL validation.

Responses are parsed defensively for structured output, refusal, incomplete status, malformed JSON, authentication failures, rate limits, context limits, unsupported models, timeouts, and other provider errors. Local M2 Zod validation and evidence enforcement remain authoritative. The adapter never mutates game state or applies findings.

Usage capture records provider-reported input, output, reasoning, and total tokens when available. Pilot pricing is an estimate of $4 per million input tokens and $20 per million output tokens, sourced from the owner authorization dated 2026-09-19. This is separate from ChatGPT billing and is not an invoice.

No API credential belongs in this file or any repository file.
