# EVE continuity implementation and remaining art approvals

Reviewed checkout: `story/chapter-3-design` at `41d403043c226f500c5ad4bb38c93d137b4aa4df`, repository `jonathanfalkowski-byte/spy-game`. Work was performed in this repository, not the empty saved EVE folder. No commit, push, deployment or art promotion was performed.

Plan before implementation: verify findings against authored content and images; freeze existing replay dependencies; implement versioned logic/prose corrections; correct coverage and prepare art specifications; validate routes and historical saves; request approval only for paid generation or unresolved canon. Corridor `analyzePlan` completed before implementation. Its save-validation guidance was applied through strict envelope/revision checks, exact replay comparison and historical snapshot tests.

## Findings and implementation

Paths in this report are relative to the repository root. Art IDs refer to PNGs under `art/staging/cast-scenes` unless noted.

| Finding | Status | Files/scenes and result | Evidence |
|---|---|---|---|
| L1 cover entry executes unchosen response | Fixed for new runs | `src/state/mission-engine.ts`: dispatch only the five explicit responses. `cover.begin` changes phase without scrutiny, record or NPC-knowledge effects. | All three outfits × five responses; before/after NPC and record equality at entry in `tests/state/continuity.test.ts`. |
| L2 future evidence at first home visit | Fixed | `src/content/mission.ts`, `src/state/mission-engine.ts`: inspect phone, badge, keys and invitation from clinic. `src/state/reducer.ts`: Chapter 3 separately distinguishes retained photo/token from Sloane-controlled audio. | Pre-mission inspection and post-mission custody tests; existing capture route suite retained. |
| L3 backward itinerary and clothing jump | Fixed | `src/content/clinic.ts`: farewell 17:35, departure 17:45, transit 17:47. `mission.ts`: home 18:02, preparation 18:09, contact 18:16, car 18:23, canopy 18:48 for 19:00 invitation. Clinic outfit remains worn; delivered case contains alternatives. Direct route waits off-site. | Chronological metadata check for both routes, 17-minute residential journey, three initial outfits and final home selection preserved. |
| L4 home visit gates unrelated gala content | Fixed for new runs | `src/content/mission.ts`: expanded Marcus questions, cover entry, seven leads and follow-up limit use revision 12 rather than mandatory home visit. Legacy choices delegate to frozen implementation. | Choice-list parity on both entry paths; two browser routes show the three expanded leads. |
| L5 hub promises unavailable lead | Fixed | `src/content/mission-presentation.ts`: after two investigations, opportunities are spent and review/assessment remains. Presentation is appended once to new history, not twice through UI. | Two-lead zero-remaining regression plus existing mission browser flow. |
| L6 Celeste/Marcus and arrival staging | Fixed | `mission.ts`: one hand withdrawal, Marcus moves to near end of central table, visible public exchange. `mission-presentation.ts`: voice-lowering instead of duplicate hand motion; arrival sees interior through doors from canopy. `mission-engine.ts`: private Halcyon reply is explicitly below the quartet and not audible to Marcus. | Single-withdrawal/location test; partial reply gives Marcus visible conversation knowledge, never Halcyon. |
| L7 correction treated as proof | Fixed | `mission.ts`, `mission-engine.ts`: conflicting detail tests consistency, not a known false memory or independent verification. Celeste's answer remains a claim and her interpretation a belief. | Claim-layer and no-independent-memory assertions. |
| L8 questions/silence end identically | Fixed | `src/content/chapter3.ts`, `src/state/reducer.ts`: scope gets reporting-path claim and refusal to name recipients; challenge gets explicit refusal to debate justification. Confirm closes check-in; silence sends nothing and stays unresolved. `src/ui/App.tsx` renders chronological exchanges via `ClinicConversation`. | All four response round-trips; no new Sloane knowledge on silence; live scope/challenge/withhold and reload tests. |
| L9 Chapter 3 save test never reaches it | Fixed | `tests/state/chapter3.test.ts`: complete clinic/mission, explicitly continue, assert Chapter 3 surveillance and revision 12 before encoding. | Corrected round-trip plus response-specific tests. |
| L10 displayed name spelling | Fixed | `src/ui/Narrative.tsx`, `journal-entries.ts`, `Missionwork.tsx`: normalize visible spelling to Evelynn, including historical conversation display and capture limits. IDs and stored legacy data unchanged. | Journal rendering leaves snapshot byte-equivalent; browser tests assert Evelynn. |
| P1 policy-like protagonist prose | Fixed in affected home passages | `mission-engine.ts`: concrete mirror, clothing and routine reactions. `chapter3.ts`/reducer: entry minute, cursor, remembered voices and physical actions replace design guarantees spoken as thoughts. | Prose inventory below; no identity verdict or relationship consequence added. |
| P2 repeated home scene | Fixed | First return focuses on familiar objects/body and optional preparation. Post-gala return focuses on claimed recognition, retained evidence and residential access log. Mirror/accessory callbacks require earlier choices. | Callback and custody regressions. |
| P3 unanswered questions | Fixed within implemented scope | Cover and Chapter 3 responses answer or visibly refuse. Scope/justification are attributed, not asserted as independent authority. | New response tests and rendered browser evidence. |
| P4 future treatment vs runtime | Fixed documentation/UI boundary | Chapter 3 treatment explicitly says only Scene 1 is implemented. Sidebar/footer now identify Chapter 3 Scene 1 instead of Opening; future art remains concepts. | Browser chapter label assertion; no new scenes or stable IDs. |
| A1 wardrobe | Already resolved for three preparation keyframes; blocked for empty background pending paid approval | Current Executive contains one suit; archived duplicates unchanged. Background correction precisely specified. | Contact sheets 2, 7; art specifications. |
| A2 Maya | Blocked pending paid approval | Black-sweater replacement specified; source scene unchanged. | Sheet 6; proposed batch job 2. |
| A3 midday office | Blocked pending paid approval | Two same-room daylight edits specified. | Sheets 2, 6; proposed jobs 3–4. |
| A4 apartment geography | Awaiting visual canon decision | Propose day image as room-layout base, then lock Axiom silhouette and derive lighting variants. Do not treat this proposal as approval. | Sheets 0, 2, 3, 6; precise room-lock proposal in art document. |
| A5 Sloane marker | Blocked pending paid correction; canon already explicit | Full-size portrait confirms left-temple streak. Correct to anatomical right; no whole-image mirroring. | Portrait and source `day.ts`; office scene first batch, cast/derivatives later. |
| A6 character continuity | Blocked pending paid approval | Dark collar for Adrian, mature silver-templed Voss, distinct senior/younger escorts specified. | Sheets 4–6. |
| A7 gaze/wafer/reflection/garage | Blocked pending paid approval | Exact action, object and composition corrections specified; no evidence semantics rewritten to fit art. | Sheets 5–6. |
| A8 future costume sequence | Awaiting canon decision | Continuous business wardrobe for Voss/records and stable Helix-visit wardrobe proposed; whether player selection persists remains unestablished. | Sheets 2–3; future treatment unchanged in scope. |
| A9 coverage locations | Fixed map; missing visual remains blocked | `coverage.json`: Axiom secure elevator explicitly missing, Sloane office for reconsideration, meet/call variants for three evening nodes. Glass House elevator not repurposed as Axiom. | Map assertions in `visual-selection.test.ts`. |
| A10 branch-safe selection | Fixed contract; no runtime binding | `src/visual/selection.ts`: approval plus exact eight dimensions required; only matched approved neutral fallback, otherwise null. Map explicitly disables all staging bindings and marks unreviewed guards absent. | Eight mismatch/missing-dimension tests and staging/approval/fallback tests. |
| A11 profile/full body | Already correctly classified; replacements blocked pending paid approval | Keep profile REVISE and full body REJECT for intended roles. Front/three-quarter approval unchanged. | Sheets 7–8 and retained historical approval correction. |

## Prose and documentation inventory

- `src/content/clinic.ts`: farewell/departure/transit timestamps, worn presentation, keys/badge/phone and optional residential transport explanation.
- `src/content/mission.ts`: pre-gala inspection label/hint, first-home body/clothing continuity, alternate garment case, direct/home transport link, Celeste/Marcus positions, memory-test wording and assessment limits.
- `src/content/mission-presentation.ts`: exterior arrival viewpoint, Celeste voice action, remaining-lead wording.
- `src/state/mission-engine.ts`: first-home mirror/clothes/belongings/routine responses; cover consistency and explicit private reply staging. No new evidence granted.
- `src/content/chapter3.ts`: home purpose, scope/challenge hints, surveillance reaction, response-dependent completion rather than automatic closure.
- `src/state/reducer.ts`: earned mirror/accessory callbacks, actual custody inspection, Sloane exchanges and attributed records; silence gives her no private-state knowledge.
- `src/ui/Narrative.tsx`, `journal-entries.ts`, `Missionwork.tsx`: display spelling only. `App.tsx`/`ClinicConversation.tsx`: show saved responses and current chapter labels; avoid duplicate contextual prose.
- `README.md`: revision-12/new-run and frozen legacy save policy.
- `docs/story/POST_TRANSFORMATION_HOME_TREATMENT.md`: optional route, pre-mission belongings, delivered alternatives and chronological itinerary; distinguishes later capture custody.
- `docs/story/GLASS_HOUSE_EXPANSION_TREATMENT.md`: expanded content available through either entry route.
- `docs/story/CHAPTER_3_PLAYABLE_TREATMENT.md`: implemented Scene 1 boundary; future costume/layout decisions remain pending.
- `docs/art/CONTINUITY_CORRECTIONS_2026-09-16.md`: every reported visual issue, observed evidence, exact acceptance criteria and bounded first-batch proposal. Additional arrival crop and occluded Socialite alternative are recorded as composition refinements.
- This completion report; `coverage.json`; proposed batch and quote JSONs; regression tests and review artifacts. Existing approval paragraph and journal screenshot were preserved, not regenerated by this task.

## Compatibility decision

Schema remains 5; new content is 12. Optional `contentRevision: 12` distinguishes new state; missing marker retains legacy behavior. `legacy-v11` is a 19-file byte-for-byte freeze of the reviewed dependency graph, with SHA-256 manifest checked against git commit `41d4030`. Earlier frozen engines and review fixtures are untouched. Old content 10/11 continuations remain on the old reducer; earlier migrations authenticate original snapshots before their existing legacy replay. New envelopes reject missing/mismatched revision markers. Prefix reconstruction in consequence projection and adult-scene handoff uses the originating revision. Historical tests now explicitly ask for legacy replay instead of accidentally comparing old data with a new-run default.

Existing saves deliberately keep historical timing/prose/behavior; fixes apply to new runs. No ledger is rewritten to make it appear that an old player chose a new branch.

## Validation and Git delivery

Validation artifacts are in `review-results/continuity`. Final results and the complete changed-path list accompany this report in `validation-summary.json` and `git-status.txt`. The full browser suite passed 66 tests; focused new-route tests are rerun after the final Chapter 3 label correction. Unit results include exact historical dependency hashes and snapshots, all cover outfits/responses, itinerary order, custody, questions/silence, display spelling and visual guard rejection. Build includes TypeScript checking. Reference-integrity confirms the prototype HTML and original design DOCX remain unchanged. `git diff --check` is clean.

No paid calls submitted. Four proposed calls were individually quoted at 1 credit each, **4 credits total**, using the existing ZenCreator workflow. Approval covers only the exact saved inputs, one result each, with no retries or extra images. All other art corrections remain specifications until their own budget/canon approvals. No art is production-bound or promoted.

The working tree intentionally contains the implementation, tests, specifications and reports. Branch/HEAD remain unchanged; no staging/commit/push/deploy was performed. The pre-existing modified `review-results/journal-narrow-final.png` and approval-status correction in `art/staging/evelynn/REVIEW.md` remain present.
