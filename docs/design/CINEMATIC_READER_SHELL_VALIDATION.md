# Cinematic shell experiment — validation

2026-09-18. Human review pending. Nothing committed or pushed.

## Results

- First affected browser run: 34/35 passed. The portrait fixture exposed intrinsic grid sizing overflowing the full-height stage. Fixed the grid minimum; assertions were retained.
- Final reader/layout run: 20/20 passed across cinematic-reader and cinematic-shell. Includes keyboard PageDown in the story region, stationary art, 168px nav-collapse gain, persisted preference without save changes, mobile stacking/no overflow, missing-image fallback, dialogue image reuse, authored cuts, backward-frame guard, reduced motion, menu focus and portrait containment.
- Additional affected route coverage in the first run: 15/15 passed across revision-17 Julian/non-Julian desktop/mobile routes, completion/assessment and all three Home wardrobe branches. Together the runs cover all 35 selected cases successfully. This is targeted coverage, not a new full-suite run.
- Targeted Vitest: 26/26 passed in 6 files: reader-preferences, scene-art, visual, audit-art-registry, chapter5-art-promotion and reading-presentation.
- Typecheck and production build passed during final Playwright startup. Approval-manifest build gate passed. Existing large-bundle warning remains.
- git diff --check passed. No changes under src/content, src/state or src/persistence.
- Agent-browser helper failed to connect (daemon EOF); browser verification used the repository's Playwright Chromium runner.

## Manual visual review

Reviewed Home expanded/collapsed, assessment-scrolled, Harbour, final apartment, 1280px split, 390px Opening/apartment and synthetic portrait. The portrait's full border is visible after the fix. Desktop art is substantially larger than the baseline; collapsing navigation enlarges it without widening prose. Matte is subdued. Landscape images retain bands to preserve complete compositions. Mobile uses normal document flow. Opening has no empty art pane.

[Review gallery](../../review-saves/cinematic-reader-shell-review.html) includes baseline, all seven requested screenshots, assessment scrolling and portrait fixture. PNG files remain local under the existing ignore policy.

## Scope integrity / changed files

Pre-edit SHA-256 inventory and comparison: [scope check](../../review-saves/reader-shell-evidence/scope-check.json). Every pre-existing file outside the eight listed modifications remained byte-identical; none was deleted. This includes pre-existing dirty art, resolver, manifest and runtime files.

Modified relative to the start of this experiment:

- src/ui/App.tsx
- src/ui/SceneArtStage.tsx
- src/ui/Missionwork.tsx
- src/ui/styles.css
- tests/browser/cinematic-reader.spec.ts
- tests/browser/completion.spec.ts
- docs/design/CINEMATIC_READER_V2.md
- docs/art/OPENING_VISUAL_BACKLOG.md

Added: src/ui/reader-preferences.ts; tests/browser/cinematic-shell.spec.ts; tests/state/reader-preferences.test.ts; this validation receipt; review-saves/cinematic-reader-shell-review.html and reader-shell-evidence receipts. Screenshots are ignored local evidence. Prior design/validation is archived in reader-shell-evidence/prior-reader-v2.md.

HEAD remains 6ef6f68ad1690d0ddaf9f94c5f152171b2491670, branch story/chapter-3-design. Revision 17/schema 5 unchanged. Working tree is intentionally dirty with prior work plus this UI experiment. Zero art credits, generations, promotions or new bindings. Chapter 5 approved coverage remains 4/95 (4.21%). No Chapter 6 work.

## Remaining concerns

Human review of proportions/matte is still needed. Large-bundle warning and missing Opening art remain. Opening backlog is unchanged in scope: 19 families, 0 approved, 5 staged, 14 missing. Test browser is Chromium; cross-engine/device-hardware performance has not been measured in this pass.
