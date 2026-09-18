# Content revision 17 — canonical baseline

Recorded 2026-09-17 after the owner authorized commit and push.

| Field | Value |
|---|---|
| Canonical CONTENT REVISION 17 runtime commit | `198feada20cc15aa47d6e64f37149079efe187a4` |
| Actual commit subject | `fix: address Chapters 3-5 audit with revision 17 continuation` |
| Remote / branch | `origin/story/chapter-3-design` |
| Repository | `https://github.com/jonathanfalkowski-byte/spy-game.git` |
| Save schema | **5** |
| Frozen CONTENT REVISION 16 baseline | `fe1f6084a7affeec775e9d7b25e883c91f5d5fa4` |
| Pre-implementation parent | `7c91a242a1fc9bc4365dfbb7dccd20853bbccfd6` |

The later release/backlog request describes revision17 as uncommitted at the old parent. It had already been committed and pushed in the immediately preceding owner-authorized step. The actual pushed commit above is retained as the canonical runtime baseline; its message/history is not amended to match the later suggested subject. This follow-up is a separate documentation-only commit.

## Committed scope

The commit's full 92-path set exactly matches [CHAPTERS_3_5_AUDIT_CHANGED_FILES.json](CHAPTERS_3_5_AUDIT_CHANGED_FILES.json) and the [implementation review](CHAPTERS_3_5_AUDIT_IMPLEMENTATION_REVIEW.md): continuity/prose, concept/acceptance, opt-in revision17 authentication/replay, exact approved art bindings, portable apartment reproduction inputs, related tests/docs and purposeful runtime-review evidence.

The manifest's runtime screenshots are the documented desktop/mobile verification evidence. Original apartment source/layer copies are necessary deterministic reproduction inputs, not promotion of rejected candidates. The pre-existing coverage reports and Aster review are the explicitly preserved/reconciled documentation described in the implementation review. No unrelated staging experiments, personal screenshots, temporary logs or unrelated generated assets were included. No unexpected dirty paths existed at the follow-up check.

Historical implementation/validation reports deliberately retain their pre-commit “uncommitted/no push” statements as review-stage evidence. This release record supersedes those Git-status statements. Their source baseline, test results and limits remain historical evidence, not a claim that today's working tree is dirty.

## Post-commit verification

Verified after push, before documentation edits:

- Remote branch SHA matched `198feada20cc15aa47d6e64f37149079efe187a4`; tracked and untracked working tree was clean.
- Exact committed paths matched all 92 manifest paths. `git diff --check` passed.
- **20 focused tests across 4 files passed** in 24.44 seconds: `audit-revision17`, `audit-frozen16`, `audit-art-registry`, `chapter5-art-promotion`.
- The continuation tests authenticate revision13/14/15/16 boundaries, preserve historical state, reject invalid continuation, and exercise deterministic revised replay/save/reload. Continuation remains an explicit `CONTINUE_AUDIT_REVISION` event; loading does not silently upgrade saves.
- Frozen16 semantic-source provenance passed. Existing legacy implementations and original historical expectations remain preserved. Source/current runtime, story, save schema, tests, approved artwork and approval records are unchanged by this documentation follow-up.
- Exact art-binding/approval tests passed, including three approved variants, ordered coffee presentation, branch guards and production/public byte identity. No scope expansion is authorized here.

Command:

```text
npx.cmd vitest run tests/state/audit-revision17.test.ts tests/state/audit-frozen16.test.ts tests/state/audit-art-registry.test.ts tests/state/chapter5-art-promotion.test.ts --maxWorkers=2 --testTimeout=30000 --reporter=dot
```

The full suite was not rerun because commit selection did not alter implementation content. The prior [validation record](CHAPTERS_3_5_AUDIT_VALIDATION.json) remains: 429 unit/state/route tests, 17 compositor tests, 17 affected browser tests, typecheck/build/reference checks passed. Existing large-bundle warning and the unrun unrelated browser flows remain disclosed there.

## Art production status

The [true Chapter5 art backlog](../art/CHAPTER_5_TRUE_ART_BACKLOG.md) is now the primary planning metric; its JSON supplies every original shot ID and explicit hold group. Old raw-index metrics are historical diagnostics, retained unchanged where regression tests consume their snapshot.

No art was generated, promoted or edited. Spend **0**, pilot total unchanged at **14 credits**. No Chapter6 implementation. The documentation commit records this runtime SHA without changing or amending runtime code; its own SHA is reported after push rather than creating a self-referential commit record.
