# Glass House delivery

## Prose and continuity follow-up — content 8

Removed repeated outfit advice from investigation results and later investigation previews. Returning to the room now acknowledges one or two completed leads rather than restarting the briefing. Kept the opportunity cost visible before each commitment.

The pass also removes a repeated capture prompt, makes the six capture-result debriefs conversational, and corrects lift occupancy, token hand placement, the optional insider-question callback, an unexplained return code, and a thought that incorrectly described the warning as a question. Sloane no longer asks Evelyn to preserve an item she does not hold. The late-capture journal now states what was actually observed and missed.

Schema remains 5; content advances to 8. Content 7 was frozen before edits and is authenticated before migration. All decisions, route effects, evidence custody, and endpoints are preserved. Loading alone does not write to storage.

The implementation and validation figures below describe the original Glass House delivery; follow-up verification is recorded at the end of this document.

Implemented the approved ten scene groups, from the clinic car departure through the reception, Marcus and Celeste, optional investigations, source assessment, capture attempt, extraction, Sloane’s remote debrief, three unknown messages, and service garage ending. The larger Evelyn mystery remains unresolved.

Only a completed clinic departure receives **Continue to the Glass House**. Loading preserves the checkpoint. Cautious withdrawal, refusal/departure, and clinic-stop endings remain complete. No user browser save was used for automated testing.

## Delivered behaviour

- Twenty-six authored phases with guarded choices, immediate results, chronological questions, and a completed physical exit.
- Two optional, distinct investigations with cost review, cancellation, immediate findings, and free rereading. Zero- and one-lead assessments are allowed.
- Separate saved reasoning, source selection, timing, capture quality, ownership, scrutiny, and NPC observations. A lucky correct name does not retroactively improve reasoning.
- All source/method combinations continue. Audio, photography, and the separate access token have explicit limits. Late theft fails; a successful theft resolves Benton’s grip before extraction.
- Outfit-specific admission, approach descriptions, and extraction. Monitored phone status, badge restrictions, prior termination, private feelings, and Maya’s existing knowledge carry forward.
- Review of actual earlier Maya messages from the saved history, with no new message or arrangement sent.
- Schema 5/content 7, a frozen content-v6 engine, and authentication of versions 1–6 before replaying unchanged ledgers with new defaults.
- Ending journal/history review, backup, and confirmed restart. No automatic Chapter 3 continuation.

## Verification

- TypeScript and production build passed.
- Vitest coverage: **93 tests passed**. Current mission reducer: **100% lines, 95.89% branches**. Current state directory: **99.01% lines**. Overall coverage includes legacy engines: **85.39% lines**.
- Full Chromium regression: **50 tests passed**, including all earlier milestones and ten Glass House browser tests.
- After the final earlier-message review and footer polish, all **ten Glass House browser tests passed again** against a freshly built production bundle; the full 93-test state coverage suite also passed again.
- Desktop and 390-pixel narrow screenshots inspected; extra-large text remains within the viewport. Chronological optional answers focus the newest exchange. Browser tests also exercise storage failure, confirmed restart, legacy checkpoint loading, and a separate browser process reopening with the token/wrist state intact.
- Both preserved reference SHA-256 checks passed. No source-reference files were changed.
- `git status` confirms this delivery directory is outside a Git repository. No commit, push, or deployment was performed.

## Changed areas

New mission content, mission schema/reducer, mission UI and summaries, and state/browser tests. Updated shared scene/action registries, NPC schema, journal, chronological display integration, save migrations, and regression expectations. Added `src/persistence/legacy-v6` before modifying the current engine. Earlier frozen engines remain unchanged.

See `README.md` for installation, local preview, tests, and build commands. Preview uses `http://127.0.0.1:4173/`; refresh an existing tab to load the new build.

## Remaining limits

An unfamiliar-player walkthrough is still needed to assess social tension, pacing, and whether evidence limitations are understood without explanation from the developer. Automated route coverage does not validate those narrative qualities. Browser automation targets Chromium; screen-reader, Firefox, and Safari evaluation remain unperformed. Frozen replay engines cause Vite’s large-chunk advisory; the build succeeds. There is no cloud save, manual backup import, combat, art/audio addition, irreversible later procedure, or larger mystery resolution.

## Follow-up verification

- **96 state/content tests passed with coverage** using one worker and a 30-second test budget. An initial parallel run exceeded the old five-second budget for an exhaustive earlier-chapter test; the complete single-worker rerun passed. Current mission reducer line coverage is 100%.
- **51 Chromium browser tests passed**, including the exact first-to-second investigation repetition regression loaded from a genuine content-v7 save, all capture outcomes, earlier chapters, narrow layouts, and persisted browser reopening.
- TypeScript and the production build passed through the browser suite’s clean build. Both reference hash checks passed. The second-investigation screenshot was inspected and starts directly with the investigation scene.
- Preview restored on port 4173. Refresh an existing tab to load content 8. No commit, push, or deployment; this directory remains outside Git.
