# EVE QA M1 — story simulation and logic

M1 is an offline, deterministic harness over the existing EVE runtime. It discovers legal actions from `availableIntents`, dispatches through the authenticated reducer, validates `StateSchema`, checks the event ledger with the repository replay functions, and records a reproducible seed/action trace. It does not replace route tests, browser tests, save compatibility, or the art resolver.

## Milestones

- **M1 — Story Simulation & Logic:** implemented here. Deterministic legal-action simulation, invariants, replay checks, golden routes, reconvergence checks, bounded traversal, and transcripts.
- **M2 — AI Narrative / Prose / Cohesion Review:** consumes M1 transcripts and may flag issues. It must never mutate runtime or canon.
- **M3 — Art & Visual State Review:** deterministic manifest/shot/guard checks plus human or vision-assisted review. It must never auto-promote an image.
- **M4 — Coverage Dashboard / Release Gate:** aggregates route, node, state, transition, replay, art, and human-review evidence into a release decision.

## Execution tiers

**FAST / PR** runs deterministic invariants, named golden routes, a bounded graph smoke, visual manifest checks, and normal unit tests. `npm run qa:fast` uses 100 seeded routes.

**DEEP / NIGHTLY** runs a larger seeded campaign, wider bounded traversal, reconvergence analysis, and transcript export. `npm run qa:deep` accepts `QA_RANDOM_COUNT` and defaults to 10,000 outside the test suite.

**FULL / RELEASE** combines a large simulation campaign, every golden route, historical save/replay validation, representative browser routes, and eventually M2/M3 evidence. Browser rendering is never used for thousands of simulations.

## Runtime boundary

`src/qa/m1.ts` is an adapter, not a second story engine. `availableQaActions(state)` maps the real `availableIntents(state)` result into stable IDs and source labels. `stepQaState` requires that exact action to be legal, calls `act`, checks mutation/revision, validates the schema, and runs modular invariants. `replay` is called at checkpoints and terminal states using the state’s content revision; historical authentication is not weakened.

Terminal status is explicit. Current leaf nodes are `dayend.cautious`, `dayend.walkaway`, `clinic.stopped`, and `chapter5.complete`. Handoffs such as `ending.complete`, `mission.complete`, `chapter3.complete`, and `chapter4.complete` remain playable and are not treated as terminal merely because a chapter boundary is visible.

The graph explorer uses a conservative digest of the complete state, including ledger/history. It does not merge states on `scene.phase` alone. M1.1 also captures exploration roots from real golden-route ledgers at named checkpoints. Every root is replay-authenticated before traversal, receives independent state/depth/transition caps, and reports its own states, transitions, nodes, failures, and incomplete flag. Aggregate counts are the union of full-state digests plus the sum of root transitions; root-level counts remain available for review. The node inventory is derived from the registered `NodeSchema` and classifies unvisited nodes as expected, conditional, legacy, or not yet classified. A cap produces `INCOMPLETE_COVERAGE`; it is never reported as exhaustive coverage.

## Invariant status

M1 checks schema validity, revision/ledger agreement, duplicate collections, read-before-selection, node validity, known resource counters, one-time completion keys, NPC source attribution, evidence-capture owner, assessment draft/report coherence, legal-action mutation, dead ends, replay equality, and approved runtime art resolution where available.

The current state has no complete visibility graph, mandatory-assessment field, future-chapter state partition, semantic bridge metadata, or general visual-state field. Those checks are explicitly returned as `NOT_YET_MACHINE_CHECKABLE`; M1 does not invent fields to make them pass. Agency and dark-state contracts are recorded in `docs/qa/AGENCY_INVARIANT_REGISTRY.md`.

## Reproduction and reports

Every simulated failure includes severity, check ID, seed, revision, step, node, action trace, state digest, and a copy-pastable `npm run qa:replay -- --seed <seed>` instruction. `qa/reports/latest.json` and `qa/reports/latest.md` are volatile local outputs and are not committed.

M1.1 includes a synthetic bounded-failure fixture in `tests/qa/qa-m1.test.ts`. It intentionally stops seed `9` after one step and asserts that the report retains the seed, step, node, one-action trace, and replay command. This proves the failure payload and CLI reproduction path without claiming a production defect.

Human QA remains required for emotional impact, attraction, fear, discomfort, pacing, meaningful choice, dark-route credibility, and whether the experience is fun. Automation narrows the human review set; it does not replace playtesting.
