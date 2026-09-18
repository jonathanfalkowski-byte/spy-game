# Final EVE reader shell and assessment attention

2026-09-18. Implemented for human review; uncommitted and unpushed. This supersedes the rejected NAV | ART | STORY experiment. Story revision 17, save schema 5, historical replay and art authority remain unchanged.

## Geometry

The application fills the viewport. Beneath the existing 76px header, a 270px utility sidebar sits beside the main area. Main uses one column: a fixed 46dvh scene stage above the independently scrolling story pane. At 1920×1080 the stage is about 497px tall. Prose is centered at a maximum 900px within the full-width story pane. There is no empty column beneath the art and no horizontal art/prose split.

The sidebar collapses to 76px, adding 194px to the main area. Prose grows only to 940px. Navigation preference retains its separate UI storage key. At 1200–1399px illustrated scenes default to a collapsed rail; below 1200px navigation uses Menu. Medium art height is 42dvh. Below 900px art/story/choices use normal page flow, with no sticky image. No-art states omit the stage entirely.

Sharp art uses contain, centered and uncropped. The same approved image supplies a subdued blurred matte behind it. At a fixed height, a landscape image can be height-limited, so collapsing the rail expands the stage without necessarily enlarging the sharp bitmap. This preserves heads, feet and props. Portraits also remain contained. Source files are not modified.

## Sidebar and records

STORY contains existing chapter/milestone information; its long list scrolls within a bounded area. RECORDS contains Assessment, Evidence journal and Conversation history. SETTINGS retains reading size, restore and restart. Existing save status remains in the header. No invented character roster, assignment stats or unsupported controls are added.

Assessment stays directly accessible in the collapsed rail and mobile header as well as the expanded sidebar. Evidence/history/assessment use the existing native modal and do not replace the scene. Full Helix review and Glass House recap content is retained in Assessment. The old large Glass House recap in story becomes a compact update and Review assessment action; existing continuation/backup actions remain available.

## Assessment authority

`src/ui/assessment-status.ts` is a pure presentation selector. It does not change reducer rules or infer requirements from prose.

| State | Authored evidence | Presentation |
| --- | --- | --- |
| Idle | No current assessment gate or committed report/source | Assessment; explicit empty-record explanation |
| Available | Glass House exposes `assess.begin` from its investigation hub | Assessment · NEW; no pulse or investigation blocking |
| Required | Uncommitted Helix at analysis/review, or Glass House at assessment/assessmentReview | Warning icon, explicit requirement text, border and compact story notice |
| Completed | Committed `mission.source` or `report` | Checkmark and Assessment recorded; complete records remain accessible |

Available means the player may assess now while existing investigation actions remain open; it does not invent an optional alternative conclusion or permit skipping a later authored gate. A current required assessment takes precedence over an older report. Draft selection is not completion.

Required status pulses three times over 3.6 seconds, then retains border/text/icon without animation. Reduced motion disables the pulse. The timer is keyed to the required flow, so ordinary rerenders and draft changes do not restart it. Reload may announce the still-required gate again. Committing shows a five-second status confirmation and clears required styling; the recorded sidebar label persists.

Required story notice explicitly says the player must commit before progressing and opens Assessment. There is no fake Continue button. Existing selection, review, revise and submit actions remain the only ways to commit. Opening an available record alone does not run `assess.begin`; its explicit Begin assessment button does. No automatic answer selection.

## Art, saves and accessibility

Opening/closing records changes local UI state only. Current shot ID and image DOM node remain stable. Existing authored changes use the same guarded 200ms crossfade; reduced motion is immediate. Resolver, manifest and production bindings are untouched. No staging fallback or location substitution.

Desktop story scrolling leaves art/sidebar fixed; committed narrative actions focus the new beat or reset the story top. During assessment decisions focus stays inside the overlay. Native dialog Escape, focus trapping and return are retained. Required status uses text and icon as well as color; all statuses are readable in compact navigation. Story remains a keyboard-scrollable named region. All story commits still pass through the original reducer/revision and save mechanisms.

## Review and limits

[Screenshot gallery](../../review-saves/final-eve-reader-review.html) contains Home expanded/collapsed/scrolled, assessment record overlay, Harbour, final apartment, Opening fallback, medium and mobile captures. Prior rejected geometry is retained for comparison.

Validation and the exact changed-file inventory are recorded in FINAL_EVE_READER_VALIDATION.md after checks complete. No art spend, generation, promotion, story rewrite or Chapter 6. Existing bundle-size warning and missing Opening art remain. Cross-engine and physical-device testing are outside this Chromium review pass.
