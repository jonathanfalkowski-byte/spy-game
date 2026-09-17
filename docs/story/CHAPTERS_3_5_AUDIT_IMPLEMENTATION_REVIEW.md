# Chapters 3–5 audit implementation review

Baseline: `7c91a242a1fc9bc4365dfbb7dccd20853bbccfd6`, branch `story/chapter-3-design`.
The canonical revision16 story baseline remains `fe1f6084a7affeec775e9d7b25e883c91f5d5fa4`.
This work introduces an explicit, opt-in **content revision17**, retaining save schema **5**. It is an uncommitted review diff; no push, paid generation, asset promotion or Chapter6 work.

The audit and both supporting CSVs were checked against current source, approval records and the pending Aster review. Corridor reviewed the implementation plan before code changes. The three pre-existing untracked art documents were preserved; the coverage pair was updated within the requested scope, and the Aster review itself was left unchanged.

## Compatibility strategy and evidence

- The player chooses **Continue with revised Chapters 3–5** at an authenticated revision13 end-of-evening boundary, revision14 Chapter3 decision, revision15 Chapter4 decision, or unfinished revision16 Chapter5 decision. Loading a save never selects this action.
- The reducer first replays and compares the entire old snapshot. A valid continuation appends one `CONTINUE_AUDIT_REVISION` event and updates the revision counters. It preserves every prior ledger event, history block, record, choice, object and relationship value. Stale-revision and forged-state continuations fail closed.
- Revision17 replay reconstructs the historical prefix using its original engine, then applies the explicit continuation and revised subsequent actions. Missing, duplicate or mismatched revision markers are rejected. There is no fabricated historical request, correction, payment, consent or movement.
- Current Chapter5 semantics were archived in new `src/persistence/legacy-v16` files before editing. `SOURCE.json` records their original Git hashes; a regression compares them with the audited commit and verifies that the archive differs only in import paths. The clinical provenance helper is also captured so a future current-helper edit cannot rewrite revision16.
- Existing legacy modules and historical fixtures/hashes were not edited. Historical choices remain available through their frozen engines. Completed revision16 endings remain revision16; their already-earned approved art can be presented independently.
- Fresh runs still play the preserved opening before offering revision17. An old bug already recorded in historical play is not retrospectively repaired. To receive a revised choice, opt in before that choice. Read-only consequence/journal replay also supports revision17.

## Findings addressed

| Audit IDs | Implementation and practical effect |
|---|---|
| H1 | `partial-rook` requires the actual `verify-date` ledger event and verified-date state in revision17. Deferring does not offer or accept that limited report. The reading transition no longer assumes a patient-record thread was opened. |
| M1 | Chapter5 derives the uncorrected medical excuse from the authenticated Chapter3 assertion and absence of Chapter4 correction. Innocent release/cancellation is not a lie. Voss’s callback preserves her rejection of the false claim. Corrected, missed and uncorrected paths are distinct. |
| M2 | Concept reactions remain once-only. A local final-concept selector can return to any earlier proposal without recording more events or consequences. The final concept is committed atomically with acceptance; it does not replay the earlier reaction. |
| M3 | A visible Current proposal panel displays the selected concept, fee, credited name, image limits, duration/use and proof control. A negotiation preserves the current local draft. The accept button sends that exact concept, and the accepted terms record matches the displayed summary. Earlier correspondence remains historical. |
| L1/L2 | The 11:30 shopping transition says “rest of the morning”; a no-cash saving option says “Keep the budget unchanged; buy nothing.” Neither creates money. |
| L3/L4 | The host/tablet is the source of the published Harbour page. The phone call no longer claims an agreed clock time that was never established. |
| H4, M7–M9 | Targeted prose/voice/cohesion changes below. No new investigative evidence, relationship, obligation, outfit, consent or outcome. |
| H2 | Three existing approved Chapter5 variants now have guarded runtime presentation. Coffee reading steps show the reached wait, arrival/dialogue, departure and return beats separately; final flags cannot display Julian’s departure before the reader reaches it. The apartment follows completed placement. |
| H3/M5/M6 | Drifting treatment candidates stay staging. Existing post-Glass-House opening art stops holding after object/movement actions; missing phone/evidence variants are not backfilled with an unrelated image. Wardrobe/location gaps remain explicit blockers. |
| M4 | Harbour return, later table/editor and photo plans explicitly retain acquired coffee in Evelynn’s custody, carried or off-frame. No disposal, duplicate cup or Julian possession is invented. |
| M10 | Portable apartment layers, source alpha, lighting/matte settings and numeric composition now reproduce the approved PNG from this checkout. A current authority index identifies asset/hash/role/status/scope and controlling or superseding records. Historical receipts are retained. |
| M11 | Aster arrival remains REVISE; no later owner approval was found. Footwear, grounding, chair/shoe tangency and proposed editor design remain review blockers. No new candidate was generated. |
| L5 | Regression checks connect runtime shot IDs to the active registry and exact production approvals, validate production/public PNG hashes and prohibit promotion of staged references through the current authority index. |

## Substantive prose changes

These are versioned editorial changes, not typo corrections.

| Passage | Before → revised treatment |
|---|---|
| Chapter4 power / Chapter5 terms headings | “Evelynn uses someone” → “The routing copy”; “The price is not money” → “The workroom extension.” The player’s choice supplies the judgment. |
| Voss | Repeated authorization language becomes a direct explanation: existing changes remain, ordinary care is available, another stage is a separate decision. Scope is retained. |
| Sloane | Short operational replies (“Received. Keep the original message.”) replace repeated narration of what has and has not been authorized. Patient-file limits remain. |
| Maya | Her signed-copy advice becomes practical and personal: cover sheets outlive what people actually said. No new knowledge is attributed to her. |
| Julian | Questions focus on the work and the next brief. The completed fee and reception limits remain in written terms and choice hints rather than being repeated in every spoken line. |
| Aster editor | Replies address a direction, fee, usage and useful wording in an editor’s register. Directory access makes no promise of future work. |
| Harbour host | The summarized disagreement over the painting becomes a brief green/grey/reflection exchange, at the same near-wall painting, followed by the existing return. |
| Harbour coffee | The ten-minute programme conversation contains a short exchange about a piece’s space in the programme. Evelynn names a title; no extra visible programme-handling pose is required. Arrival, goodbye and re-entry retain their authored order. |
| Aster sitting | Scope readback is followed by the editor’s question, a non-client-specific reply and a sentence edited for the proof. Same appointment, duration, clothes and outcome; no new case fact or disclosure. |
| Rooftop music | The twenty-minute listening visit includes noticing a returning low phrase. No extra visit, partner, performance title or future promise. |
| Earned resources | The accepted Chapter4 afternoon workspace explicitly expired at five; the permanent public reader pass remains. A certified-copy-only branch retains that copy, without inventing a private room. A new weekly booking solves a different, limited need. |

The expansion is confined to short exchanges and sensory actions inside existing scenes, offset by shorter repeated explanations. No new decision loop, investigation, trip or scene is added.

## Visual scope and remaining work

See [current authority](../art/CURRENT_AUTHORITY_INDEX.md), [coverage](../art/CHAPTER_5_COVERAGE_AUDIT.md) and [Aster review](../art/CHAPTER_5_WAVE_A_REVIEW.md).

Coverage is **3/100 raster/artifact beat IDs**, with one approved variant each; it is not all-branch completion. The 103-ID registry also contains three reserved/fade entries. The earlier wait remains an unapproved reuse candidate. Retired IDs remain retired. No new images or approvals are counted.

The implementation follows the actual frozen prose: message → Evelynn waits with coffee → Julian arrives / dialogue hold → Julian leaves → Evelynn re-enters. The request’s shorthand order is not used to invent a later wait or rewrite existing chronology. Both missing wait and return art use text. Reading navigation does not alter the save ledger; reload safely restarts the passage.

The apartment guard is deliberately limited to the approved professional two-phone state, declined editorial work, no publication/event photo, jacket in wardrobe and the unambiguous `want-none` ending. Other refusals/deferrals, outfits, publication and object-placement variants await exact-state review. Neither it nor the Harbour pair becomes a universal character or wardrobe reference.

Unresolved Chapter3/4 wardrobe changes, clinical/records/private-room geography, remote Marcus correspondence, the lift/riverside ending, Aster footwear/editor design, and all missing Harbour table/photo variants are documented without importing canon from generated candidates. Pilot spend remains **14 credits**; this implementation spends **0**.

## Verification

Final results are recorded in `CHAPTERS_3_5_AUDIT_VALIDATION.json`. This includes unit/state/route tests, exact legacy-source provenance, meaningful reached-state save/reload, compositor reproduction, desktop/mobile Playwright routes, typecheck/build, source-reference checks and Git status.

Manual screenshot review covered Harbour arrival/departure, the apartment ending and the current proposal panel at desktop and 390px mobile sizes. Approved image bytes remain unchanged. The browser build reports the existing large-chunk advisory; it is not a failed build. No performance benchmark or complete new art review was claimed.

Initial verification exposed stale assertions about the newly available continuation and previously unbound art, plus old parallel-load timeouts. Assertions were updated only for the intended new UI/coverage contracts and explicit coffee custody. Historical fixture hashes were not replaced. Final tests use two workers and a 30-second per-test allowance, consistent with the repository’s expensive replay tests.

The exact changed-file manifest is `CHAPTERS_3_5_AUDIT_CHANGED_FILES.json`. The working tree is intentionally dirty for review. HEAD and branch remain unchanged; nothing is staged, committed or pushed by this task.
