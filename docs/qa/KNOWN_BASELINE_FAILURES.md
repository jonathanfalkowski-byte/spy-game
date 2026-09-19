# Known baseline failures

This file records the full-suite provenance for QA M1.1. It is a baseline record, not an assertion that the full suite is green.

## Provenance

- Repository: `story/chapter-3-design`
- HEAD used for the clean comparison: `518c0b73aa5fa82418cf99523693e2820b5c7c60`
- Save schema: 5
- Clean checkout: detached worktree at the exact HEAD above, installed with `npm ci --ignore-scripts`
- Commands:
  - `npm.cmd test -- --reporter=json --outputFile=<clean-report>`
  - the same command in the current dirty worktree
  - isolated reruns of every failure candidate

The clean checkout reported **59 files / 443 tests: 436 passed, 7 failed**. The failures below therefore predate the M1.1 QA changes. The current dirty checkout's final rerun reported **59 files / 443 tests: 432 passed, 11 failed across 8 files**; an earlier broad run reported 12 failures across 10 files. Vitest timeouts vary with broad-suite scheduling; the isolated reruns are the deciding comparison for QA attribution.

## Inherited clean failures

| Test | Failure | Classification |
| --- | --- | --- |
| `tests/state/audit-art-registry.test.ts` · `keeps every runtime shot in the active registry and an existing explicit approval` | `AssertionError: expected 'MISSING' to be 'PRODUCTION'` (line 16) | `PRE_EXISTING_IDENTICAL` |
| `tests/state/chapter3-evening.test.ts` · `freezes the complete content12 graph against its reviewed commit` | `Error: Test timed out in 5000ms` | `PRE_EXISTING_IDENTICAL` |
| `tests/state/chapter5-art-promotion.test.ts` · `packages exact Harbour shots without expanding identity authority or branch coverage` | `AssertionError: expected [ ...3 ] to deeply equal [ ...1 ]` (line 11) | `PRE_EXISTING_IDENTICAL` |
| `tests/state/chapter5-art-promotion.test.ts` · `keeps production coverage bounded to the completed professional two-phone state` | `AssertionError: expected ... to have a length of 4 but got 7` | `PRE_EXISTING_IDENTICAL` |
| `tests/state/chapter5-desire.test.ts` · `authenticates fresh personal scope and export stays read-only` | `Error: Test timed out in 5000ms` | `PRE_EXISTING_IDENTICAL` |
| `tests/state/chapter5-desire.test.ts` · `authenticates fresh instrumental scope and export stays read-only` | `Error: Test timed out in 5000ms` | `PRE_EXISTING_IDENTICAL` |
| `tests/state/scene-art.test.ts` · `ordered Harbour cuts never anticipate Julian; cursor, malformed index and reload cannot modify saved bytes` | `Error: Test timed out in 5000ms` | `PRE_EXISTING_IDENTICAL` |

These are the seven failures reproduced from the clean, exact-HEAD checkout. They are outside the M1.1 QA files and are not silently reclassified as QA defects.

## Current dirty comparison

The current worktree contains pre-existing art, prose, runtime, and QA-M1 changes. Its broad run also surfaced timeout variants in `tests/state/continuity.test.ts`, `tests/state/mission-prose.test.ts`, `tests/state/reading-presentation.test.ts`, and the mixed-scope `tests/state/chapter5-desire.test.ts` run. Each of those candidates passed when rerun in isolation in the clean checkout and in the current checkout.

The stable dirty-only result is `tests/state/visual-pack.test.ts`: the art/catalog assertion expects a production visual record that is not represented in the current dirty `tools/visual/zencreator/cast-scenes-plan.json`. This is a dirty art/catalog state difference, not a failure in a QA M1.1 file. It is classified `PRE_EXISTING_BUT_CHANGED`.

The final broad current run's additional scheduling-sensitive signatures were:

- `tests/state/chapter5-desire.test.ts` · `authenticates fresh mixed scope and export stays read-only` — `Error: Test timed out in 5000ms`.
- `tests/state/continuity.test.ts` · `frozen content 11 boundary freezes every dependency byte against the reviewed commit` — `Error: Test timed out in 5000ms`.
- `tests/state/mission-prose.test.ts` · `authenticates v7 and preserves gameplay at each mission phase while updating saved prose` — `Error: Test timed out in 5000ms`.
- `tests/state/reading-presentation.test.ts` · `keeps all 13 review saves byte-equivalent in state and exact replay after presentation` — `Error: Test timed out in 5000ms`.

Those four candidates, plus the stable dirty art/catalog assertion, are `PRE_EXISTING_BUT_CHANGED` under the broad scheduler. They passed in isolated reruns except for the dirty visual-pack assertion.

No new failure was introduced by M1.1 (`NEW_FROM_QA_M1: 0`). The broad-suite timeout variation remains a known scheduling limitation; it is not evidence that the isolated story, route, replay, or QA self-tests fail.

## Scope boundary

The original bounded graph was a single initial-state exploration. Its recorded result was 1,000 unique full-state fingerprints, 3,605 transitions, 5 runtime nodes, and `incompleteCoverage: true`. It was useful as a bounded smoke check but did not claim a complete story graph: it started only at the opening state, spent its state budget in opening combinatorics, and had no replay-validated roots from later chapters.

M1.1 adds replay-validated roots captured from real golden-route ledgers, a cap and result for each root, aggregate counts, and a runtime node inventory. It does not turn bounded exploration into exhaustive proof. All reports must retain `INCOMPLETE_COVERAGE` when a root reaches its cap.
