# Final minimum completion pass

Status: implemented and automatically validated; outside playtesting pending.

The approved design documents were committed separately as `28e02e6` (`docs: capture future trajectories and vertical slice audit`). Git was clean immediately after that commit. The completion pass remains uncommitted for review. Nothing was pushed.

## A. Files changed

- `src/ui/reading-presentation.ts` — pure scene/history display projection, contextual action labels, earned recap.
- `src/ui/Narrative.tsx` — apply display projection.
- `src/ui/ClinicConversation.tsx` — project exchanges using their originating scene.
- `src/ui/App.tsx` — consistent history presentation, remove redundant confirmations, display spelling.
- `src/ui/Clinicwork.tsx` — corrected descent label and display names.
- `src/ui/Daywork.tsx` — display names.
- `src/ui/Missionwork.tsx` — contextual actions, personal recap and outstanding access restrictions.
- `src/ui/journal-entries.ts` — recognizable titles and explicit capture ownership.
- `tests/state/reading-presentation.test.ts` — seven new regression tests.
- `tests/browser/completion.spec.ts` — five new browser tests.
- `tests/browser/day.spec.ts` — updated display-heading expectation.
- `docs/design/FINAL_MINIMUM_COMPLETION.md` — this delivery record.

## B. Consequence readability

The smallest existing callbacks were the committed assessment's position/timing, capture quality, wrist restraint, scrutiny-dependent guard encounter, ownership, and capture-specific debrief. Those existing states already produce different predicaments; this pass makes the physical result and its limits clearer without adding branches or effects.

- Identifying Benton places the player at the gallery entrance. Wrong identification diverts attention; withholding a name costs the clear view while Marcus moves. A correct guess still retains its original reasoning quality.
- Late audio catches fragments after the agreement; late photography catches empty hands after the handover; late theft leaves the player empty-handed while Benton keeps the token.
- A held wrist has an explicit release-and-leave action label. Existing resolution remains authoritative.
- High scrutiny brings the guard to the elevator before its doors close. The valid invitation permits departure, but the guard repeats the name: extraction is no longer quiet.
- Debrief reactions connect incomplete evidence to reliance on the player's account. Clean audio remains Sloane's copy; a photograph remains on the monitored phone; a token remains a potentially useful physical asset, not authenticated proof of espionage.
- No additional leverage record, access penalty, NPC knowledge, or ending was invented. Wrong judgments still progress.

## C. Simulation issue

Adrian could ask, “How close will the result be to this model?” without receiving an answer. This was an omitted response, not an intentionally unanswered mystery. Voss now explains that the model is predictive, recovery can vary, and it cannot promise the player's subjective experience. The body-attention option also receives a concrete exchange about predicted balance and later movement checks. Neither exchange authorizes treatment or establishes new hidden canon.

## D. Repetition and transitions

- Removed duplicate confirmation banners where the chronological scene exchange already confirms the action. Save status and save-error handling remain intact.
- Shortened Sloane's repeated explanation of the other objective; her claim that the exchange was recoverable is explicitly her assessment.
- Kept all three final unknown messages verbatim. Surrounding prose distinguishes Sloane's “another objective” from the sender's “real test,” leaving the purpose unresolved.
- Corrected the examination's premature return to consultation and the earpiece restoration's obsolete elevator location.
- Corrected the already-returned-phone descent label and obsolete checkpoint text suggesting the next implemented milestone was unavailable.

## E. Journal titles

Capture titles now distinguish: recorded agreement / recording fragments; handover photograph / contact-only photograph; Benton's access token / failed token attempt. Audio ownership and missed moments are visible in titles. Other improvements identify Sloane's account, her recoverability claim, Marcus signaling security, each unknown warning, and Maya contact/disclosure records.

Original information categories, sources and limitations remain intact. A token's title describes potential leverage without converting it into proof or a new leverage mechanic. No undiscovered entry is added.

## F. Earned personal recap

Only the completed Glass House endpoint receives up to four short recollections: leads actually followed, the actual recovery contact with Maya, examination privacy and confirmed profile, and committed outfit/makeup. Existing outcome evidence and current access restrictions accompany them.

The recap does not inspect hidden trust totals, investment counters or mirror interpretations. It assigns no alignment, personality, identity acceptance or permanent relationship. Withholding identity details in the recovery message does not erase anything Maya learned earlier. No earlier ending is redirected.

## G. Spelling and compatibility

New UI headings, labels, metadata and recap use Evelynn / Evelynn Vale. Stable internal `evelyn` IDs remain unchanged.

Legacy authored prose, stored history and record bodies can still display Evelyn. These are deliberately preserved rather than globally renamed. Saves authenticate exact historical state, including text. Pure UI projection applies the bounded revisions consistently in scenes and history without rewriting the underlying ledger, stored text or backup payload. It uses the original scene and block, so reviewing an earlier exchange cannot acquire later knowledge.

## H. Validation

- Full state/route suite: 201 tests passed across 17 files, including the seven new tests.
- Full browser suite: 60 tests passed, including the five new tests; production build and TypeScript validation also passed.
- All 13 review saves authenticate and replay exactly; rendering leaves serialized state unchanged.
- Frozen content-8 manifest: all 18 files match their recorded hashes. No frozen implementation files changed.
- Both original references pass the reference-hash check.
- Browser checks include late capture outcomes, simulation exchange/history/reload, narrow extra-large text, keyboard/focus return, storage failure, restart and browser close/reopen.
- Test-generated tracked screenshot restored; no test artifact is part of the pass.

## I–J. Versions

Save schema remains **5**. Content version remains **9**. No migration, reducer, content-definition, persistence, frozen-reference or review-save edits were made.

## K. Remaining playtest risks

Automated checks establish consistency and progression, not emotional impact. Outside players must still demonstrate that timing losses feel consequential, evidence limits are understood, Sloane feels dangerous, and the final warning creates curiosity. Runtime and pacing acceptance remain observational questions. The build retains its existing large-bundle warning; this pass adds no new runtime systems or dependencies.

No Chapter 3, future trajectories, relationship/adult routes, AI generation, or further systems work was implemented. Next step: outside playtesting.

Coverage follow-up: all 201 tests also passed with coverage and a 15-second per-test timeout. The first instrumented run exceeded the default five-second timeout in one exhaustive day-route test (no assertion failure). No test or runtime timeout configuration was changed. Coverage: 84.65% lines overall including frozen implementations; current state layer 98.52% lines / 94.12% branches.

