# Final reader shell — validation and handoff

2026-09-18. Ready for human review. No commit or push.

## Implementation / assessment result

The rejected horizontal ART | STORY split is replaced with a 270px sidebar beside fixed art above independently scrolling story. At 1920×1080, art height is approximately 497px; prose is centered at 900px. Collapsed sidebar is 76px, prose maximum 940px. Medium retains vertical geometry. Mobile scrolls normally. No-art Opening collapses the art stage.

Assessment is directly accessible under RECORDS and from collapsed/mobile navigation. Actual authored gates drive idle, available, required and recorded states. Required shows icon/text/border, three finite pulses, and an inline Open assessment notice. Reduced motion has no animation. Available does not block investigation. Explicit commit clears required attention and briefly confirms completion. Full existing Helix and Glass House content lives in the record overlay. Drafts, revise and commit remain authored actions; no automatic conclusion or new progression rule. Opening records preserves the current shot and save bytes.

## Validation

- Affected Playwright Chromium suite: **62/62 passed**. Files: assessment-attention, cinematic-shell, cinematic-reader, completion, opening, mission, audit-revision17.
- Final layout/assessment rerun after sidebar offset and dialog-focus polish: **12/12 passed**. Includes regenerated review screenshots.
- Targeted Vitest: **75/75 passed across 10 files**: assessment-status, reader-preferences, scene-art, visual, audit-art-registry, chapter5-art-promotion, reading-presentation, engine, saves, audit-frozen16.
- Typecheck and production build passed during final browser startup. Production approval-manifest gate passed. Existing bundle-size warning remains.
- git diff --check: passed after normalizing touched text files to repository line endings.
- No diff under src/content, src/state or src/persistence.
- SHA-256 preflight comparison: no missing files; all pre-existing files outside the ten modifications below remained byte-identical. Prior dirty art, resolver and manifest files were preserved. [Scope receipt](../../review-saves/final-shell-evidence/scope-check.json).

Browser checks include all assessment statuses, explicit draft/revise/commit behavior, finite pulse, reduced motion, clear progression notice, save/reload, image/shot stability across overlay activity, keyboard scrolling, dialog focus, historical checkpoints, completed operation custody, Chapter 5 Julian/non-Julian routes, authored cuts/dialogue holds, missing-image fallback, portrait contain, medium/mobile layout and overflow.

## Required screenshot set

[Open the complete gallery](../../review-saves/final-eve-reader-review.html).

1. Home after Glass House — final-home-expanded.png
2. Collapsed sidebar — final-home-collapsed.png
3. Scrolled story, fixed art/sidebar — final-home-scrolled.png
4. Harbour — final-harbour.png
5. Final apartment — final-apartment.png
6. Opening fallback — final-opening.png
7. Mobile scene — final-mobile.png

Also included: 1280px medium, assessment record overlay, available status, required status with normal/reduced motion, and rejected baseline. All captures are under review-saves and were manually inspected. Screenshots use isolated authenticated fixtures, not the active user's save. PNG evidence follows the existing ignore policy.

## Files changed in this pass

Modified:

- src/ui/App.tsx — sidebar groups, story wrapper, assessment entry/notice/modal, attention/confirmation and focus handling.
- src/ui/Casework.tsx — reuse existing assessment/report content in record overlay; evidence investigation remains in story.
- src/ui/Missionwork.tsx — full recap content available inside Assessment rather than nested story disclosure.
- src/ui/styles.css — final vertical main layout, responsive rail/menu, finite attention styles.
- tests/browser/cinematic-reader.spec.ts — vertical geometry assertions, preserved resolver/hold/fallback checks.
- tests/browser/cinematic-shell.spec.ts — final geometry/scroll/sidebar/record screenshots and checks.
- tests/browser/completion.spec.ts, mission.spec.ts, opening.spec.ts — existing routes use the assessment overlay; story/save assertions retained.
- docs/design/CINEMATIC_READER_V2.md — marked rejected geometry as superseded.

Added:

- src/ui/assessment-status.ts — pure authored-state presentation selector.
- tests/state/assessment-status.test.ts and tests/browser/assessment-attention.spec.ts.
- docs/design/FINAL_EVE_READER_SHELL.md and this validation report.
- review-saves/final-eve-reader-review.html and final-shell-evidence receipts.

## Remaining concerns / Git status

Human layout approval remains pending. Contain-fit preserves complete artwork and can leave side mattes; a height-limited sharp image does not necessarily grow when the sidebar collapses. No artwork was stretched or cropped to conceal that tradeoff. The existing large JavaScript bundle warning remains. Physical-device and non-Chromium performance were not measured.

Opening art still lacks production approval; the existing backlog remains separate. Chapter 5 art coverage and outstanding Harbour/Aster gates are unchanged. No art generations, promotions or spend, and no Chapter 6.

Branch remains story/chapter-3-design; HEAD remains 6ef6f68ad1690d0ddaf9f94c5f152171b2491670. Revision-17 baseline remains 198feada20cc15aa47d6e64f37149079efe187a4; schema 5. Working tree remains dirty with pre-existing work and this UI pass. Nothing committed or pushed.
