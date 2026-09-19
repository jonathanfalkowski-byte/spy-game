# EVE QA M2 — automated narrative review

M2 is a read-only narrative review layer over the deterministic M1 harness. M1 is ground truth for legal actions, state, replay, and route history. M2 is a probabilistic reviewer that can flag, explain, cite, and suggest where a human should review. M2 never rewrites prose, mutates state, changes canon, chooses an outcome, or promotes a finding into story work.

## Pipeline

```text
M1 simulation
  ↓
transcript export
  ↓
transcript selection
  ↓
compact context pack
  ↓
specialized reviewer contracts
  ↓
structured findings
  ↓
evidence validation
  ↓
deduplication / triage
  ↓
human review
```

The source implementation is `src/qa/m2.ts`. It consumes `QaTranscript` values and never calls the reducer while reviewing. A context packet contains the route, current node, selected player/NPC state, major route history, visual fields when available, and the transcript blocks needed by the reviewer; it intentionally omits an irrelevant full `GameState` dump.

## Scale and selection

M1 may run thousands of cheap deterministic simulations. M2 reviews a small, high-value subset. Selection priority is `CHANGED_ROUTE`, `NEW_CONTENT`, deterministic failure/warning, high-risk reconvergence, golden route, rare state combination, then fuzz sample. The configured review budget is a ceiling, not a quota: equivalent or low-value routes are not added merely to reach the ceiling.

Route equivalence is a SHA-256 signature over the ordered action history plus state-bearing milestones (final node, evidence, knowledge, custody, resources, NPC observations, and content revision). Arriving at the same node is never sufficient to merge routes. Different provenance remains reviewable.

The current preparation command includes all ten executable golden routes, then a bounded set of materially different fuzz samples. No story files changed in this checkpoint, so there are no changed-content nodes to prioritize. Future CI can supply a changed-file-to-node map without building a Git analysis framework.

Default budgets are:

| Mode | External calls | Selection ceiling |
|---|---:|---:|
| `qa:narrative:prepare` | 0 | 30 |
| `qa:narrative:test` | 0 | fixture-only |
| `qa:narrative` | explicitly configured provider only | 30 |
| `qa:narrative:deep` | explicitly configured provider only | 50 |

The real-provider commands fail closed with `PROVIDER_NOT_CONFIGURED` unless a supported adapter is deliberately added. No provider secrets are stored and no paid/external call occurs in this implementation pass.

## Reviewer contracts

Each reviewer is independently versioned under `docs/qa/prompts/` and receives only the context relevant to its contract:

- `CONTINUITY` — location, time, wardrobe, props, custody, money, housing, public/private identity, relationships, and prior-event references.
- `LOGIC` — causes before consequences, meaningful refusal/acceptance, dependency, leverage, and state-supported reconvergence.
- `KNOWLEDGE` — how each NPC knows a statement; canon truth, player knowledge, inference, and report remain distinct.
- `CHARACTER` — voice, goals, values, behavioral reversals, and unexplained closeness or hostility.
- `INVESTIGATION` — evidence provenance, proof custody, ambiguity, wrong hypotheses, and the `INVESTIGATE → ASSESS → ACT → CONSEQUENCE` loop.
- `AGENCY_POWER` — consent/compliance, desire/action, pleasure/consent, attraction/affection, dependency/love, control/care, and strategy/desire.
- `ADULT_THRILLER` — adult tension, power dynamics, authored eligibility, coercion boundaries, and non-Julian possibilities. It does not impose a sex-scene quota.
- `PROSE` — repetition, transitions, exposition, POV, tone, and descriptive contradictions. It suggests review; it does not rewrite.
- `ROUTE_COHESION` — whether a selected playthrough feels like one continuous life through diverge → persist → reconverge → react.

Reviewer routing is targeted. Golden routes receive the complete contract set. Evidence-heavy candidates receive continuity, logic, and investigation. Relationship/dependency candidates add agency/power and adult-thriller. Prose/content candidates add prose and character. Every targeted set retains route cohesion.

## Findings and evidence gate

Findings use controlled severity (`BLOCKER`, `HIGH`, `MEDIUM`, `LOW`), category, confidence, reviewer/version, transcript and context digests, node, route, current evidence, prior/state evidence, why it matters, and `humanReviewRequired: true`. Arbitrary quality scores are not accepted.

Every `HIGH` or `BLOCKER` finding must cite current evidence and relevant prior transcript or state evidence. Unsupported high-severity output is downgraded to `MEDIUM` with low confidence; malformed output is rejected. Findings from different reviewers are deterministically deduplicated by category, node, and normalized finding signature while preserving which reviewers and evidence contributed.

## Providers and reports

`NarrativeReviewerProvider` is the provider boundary. `MockFixtureProvider` is the offline implementation used by tests. A real adapter may be added later behind explicit environment configuration. The mock pipeline demonstrates transcript → selection → context → specialist review → finding parsing → evidence validation → dedupe → report.

Reports are written to ignored paths `qa/reports/m2-latest.json` and `qa/reports/m2-latest.md`. They contain selected route metadata, reviewer-call count, estimated context volume, findings, evidence, and severity summary. Prepared contexts are ephemeral input to the command and are not runtime content.

## Future route contracts

`docs/qa/ROUTE_CONTRACTS.md` and `tests/qa/contracts/future-route-contracts.json` are design contracts only. They describe future route families such as Free Agent, Sloane Operative, Celebrity, Kept/Dependent, and Exploitation/Recovery. M2 does not fail current routes because a future family is not implemented. Those contracts become executable only when the corresponding runtime state exists.

## Operator commands

```text
npm run qa:narrative:prepare   # select current real-EVE routes and prepare reports; zero external calls
npm run qa:narrative:test      # offline M2 schemas, fixtures, mock provider, and reports
npm run qa:narrative           # bounded real-provider mode; fails closed if unconfigured
npm run qa:narrative:deep      # larger bounded real-provider mode; fails closed if unconfigured
```

M2 does not run during `npm test`, `npm run qa:fast`, `npm run qa:story`, or `npm run build` unless an operator explicitly invokes an M2 command. The implementation is intentionally uncommitted and unpushed for human review.
