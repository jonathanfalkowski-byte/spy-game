# Chapters 3–4 prose and logical scene pass

## A. Branch and HEAD

Reviewed the actual checkout at `C:/Users/Admin/Documents/Codex/2026-09-14/files-pasted-by-the-user-we/outputs/eve-chapter-3-design`, branch `story/chapter-3-design`, HEAD `75add303d2daa46efbfa2704b3ab5e17f3f91955`.
Chapter 3 remains revision 14, historical revision 13 remains preserved, and Chapter 4 remains **unfrozen local revision 15**. Save schema is **5**. No commit or push was made.

## B. Original working-tree state

The tree was already dirty: 193 modified/untracked paths. Fourteen tracked modifications, 16 non-frozen untracked files, and the 163-file untracked revision-14 snapshot (162 dependency files plus its manifest). This pass preserved that implementation rather than resetting to HEAD. The pre-edit inventory, including SHA-256 hashes, was recorded at `C:/Users/Admin/AppData/Local/Temp/eve-prose-review-inventory.json`.

The exact non-frozen inventory follows. Every frozen dependency is separately enumerated by `src/persistence/legacy-v14/content-14-hashes.json`; all 162 were checked against both that manifest and their actual source-commit Git bytes before edits, and tested again afterward.

```text
 M docs/design/ADULT_SCENE_HANDOFF.md
 M docs/story/ADULT_SCENE_HANDOFF_MAP.md
 M src/content/scenes.ts
 M src/content/schema.ts
 M src/narrative/adult-scenes/handoff.ts
 M src/narrative/adult-scenes/schema.ts
 M src/persistence/saves.ts
 M src/state/actions.ts
 M src/state/reducer.ts
 M src/state/schema.ts
 M src/ui/App.tsx
 M src/ui/journal-entries.ts
 M tests/routes/opening.test.ts
 M tests/state/chapter3-information.test.ts
?? docs/story/CHAPTER_4_ENTRY_STATE_MATRIX.md
?? docs/story/CHAPTER_4_HANDOFF_AND_ART.md
?? docs/story/CHAPTER_4_IMPLEMENTATION_REPORT.md
?? docs/story/CHAPTER_4_PRIVATE_ACCESS_TREATMENT.md
?? docs/story/LEGACY_C04_SALVAGE.md
?? src/content/chapter4-case.ts
?? src/content/chapter4-entry.ts
?? src/content/chapter4-model.ts
?? src/content/chapter4-power.ts
?? src/content/chapter4.ts
?? src/narrative/adult-scenes/chapter4.ts
?? src/ui/Chapter4work.tsx
?? tests/browser/chapter4.spec.ts
?? tests/chapter4-helpers.ts
?? tests/state/chapter4-entry-design.test.ts
?? tests/state/chapter4.test.ts
?? src/persistence/legacy-v14/content-14-hashes.json
?? src/persistence/legacy-v14/<all 162 manifest-listed dependencies>
```

## C. Files reviewed

Reviewed the continuous reachable scene graph and conditional responses in:

- `src/content/chapter3.ts`, `chapter3-evening.ts`, `chapter3-next.ts`, `chapter3-next-model.ts`, `chapter3-opportunity.ts`, `chapter3-autonomy.ts`.
- `src/state/chapter3-evening-engine.ts`, `chapter3-provenance.ts`, relevant Chapter 3/4 reducer branches and replay authentication, state/action schemas.
- All five original `src/content/chapter4*.ts` modules; new callback module; current scene registry.
- `src/ui/App.tsx`, `ClinicConversation.tsx`, `Narrative.tsx`, `reading-presentation.ts`, `journal-entries.ts`, Chapter 4 choice presentation and new read-only display helpers.
- `src/persistence/saves.ts`, revision-14 manifest and preserved dependency provenance; Chapter 4 offline adult handoff, generic authenticated source adapter and adult character registration.
- Existing Chapter 3 information, opportunity, autonomy, evening, provenance and browser route tests; Chapter 4 entry-design, unit and browser tests; new prose/continuity regression tests.
- Current Chapter 4 entry matrix, treatment, implementation report and handoff/art documents. Historical campaign material is not the authority for this pass.

The tables below enumerate all 32 Chapter 3 nodes and 15 Chapter 4 nodes, including optional and mutually exclusive scenes. Tests exercise representative combinations and every authored node; this is not a claim to exhaustively enumerate every permutation of all choices.

## D. Logical issues found

| Severity | Chapter | Scene | Issue | Fix |
|---|---|---|---|---|
| HIGH | 4 | outside / collect | Julian knew the independent reader pass without a disclosure; municipal clerk knew a private Helix room booking | Player explicitly mentions pass when challenging Julian; booking reply limited to public-desk booking |
| HIGH | 4 | power | Professional-only Julian could withdraw an invitation never offered | Withdrawal gated on actual mutual-interest invitation |
| HIGH | 4 | intimacy | Motive and authorization implied desire | Desire stays unestablished; willingness, motive and scope remain separate |
| MEDIUM | 4 | assessment | Clerk could respond to a report sent only to Sloane | Reply comes from the actual recipient |
| MEDIUM | 4 | resource | Voucher collection jumped from public desk to Helix accounts | Explicit round trip and 09:50 return before 10:00 brief |
| MEDIUM | 4 | assignment / inquiries | Visible cover-sheet price conflicted with hidden annex; receipt time ambiguous | Price in exported annex, concealed on cover; receipt explicitly on earlier negotiation day |
| MEDIUM | 4 | inquiries | Public witness action implied live questioning; observation implied present arrivals | Filed statement and historical arrival-log labels |
| MEDIUM | 3→4 | entry / kept calls | Important source-specific decisions had generic callbacks | Marcus outcomes, actual Rook reports, Voss qualification status and earned Maya disclosures recalled |
| MEDIUM | 4 | consequences | Uncorrected Voss excuse wording overlooked his explicit prior rejection | Record remembers the rejected claim; correction remains available |
| MEDIUM | 4 | power / evening | Lunch-to-office and hotel-to-home transitions missing; flirt-only call ended without beginning | Brief arrival/return lines and an explicit phone call |
| MEDIUM | 3 | morning / disclosures | Fixed start-time headers appeared to rewind during loops; remote follow-up location vague | Read-only time range / after-call / apartment labels |
| LOW | 3–4 | journal | Internal sender ID appeared as a character name in delivery labels | Display-only unknown-sender label; authenticated IDs retained |
| LOW | 4 | choice history | Private intentions rendered as spoken dialogue | Choice labels recorded as choices, actual speech authored separately |
| POLISH | 3 | checkpoints / home | Stale scene-complete copy and repeated physical staging | Exact-source display projection; no history rewrite |
| POLISH | 4 | throughout | Technical custody records interrupted scenes; repeated rule-like dialogue | Records remain in journal; shorter scene prose, concrete staging and distinct voices |

No CRITICAL contradiction requiring a canon or historical-state change was found.

## E. Logical fixes made

Travel, report recipients, invitation state and disclosure provenance now match the actions actually selected. PA-17 is introduced through the municipal index and attributed complaint before independent inspection; its historical export event is not confused with today's appointments. The public route still receives only filed extracts. Asking for the restricted annex yields a refusal receipt, never the annex.

The paid audit remains a new fixed-fee agreement. Choosing the public route after Julian's offer sends an explicit refusal of that audit. Benefits stay scoped: the old $600 voucher, new $900 report fee, free reader pass, optional workspace to 17:00, and certified-copy arrangement are distinct. No benefit grants image rights, access to Axiom records, personal permission or exclusivity.

Evidence custody remains explicit: Evelynn retains only acquired records; public existence is not personal discovery; copies sent are recipient-specific. Sloane's public-artifact callback requires the authored digest actually delivering the existing event-page entry. The routing-copy deception creates a disputed copy and verified denial, not valid retention authority. The final certified packet excludes disputed material.

## F. Prose issues found

Technical notices were interleaved with every choice, often repeating the same distinction in narration, dialogue and journal. Private menu decisions appeared in Evelynn's speech. Chapter 3's old milestone endings announced scene completion even though continuations now exist. Repeated keys, phone, glass and room business added little in several adjacent home beats. Some Chapter 4 lines described a game contract instead of the action happening in the room.

## G. Prose fixes made

Chapter 4 dialogue is shorter and more specific: Sloane names the docket and requested report; the sender gives a number and starting point; Voss compares routing with clinical scope; Maya offers a little time while keeping her own work files private; Julian asks for a usable answer rather than a convenient culprit. The desk, request tray, three inquiry boxes and partly blank report give the player concrete work to do.

The UI hides only indexed Chapter 4 journal records from conversation display. Those records remain authenticated, available in the journal and usable by the offline handoff. Seven exact-text Chapter 3 display replacements remove stale checkpoint wording or redundant staging. No blanket search-and-replace changes quotations, medical limits, identity interpretation or historical transmissions.

Ordinary clothes, appearance and attraction are not treated as corruption. Adrian remains appropriate to private/history references; public Evelynn does not declare either identity false or final. No narrator resolves the sender's motives, ORACLE predictions or Sloane's ultimate purpose.

## H. Chapter 3 → 4 handoff corrections

| Selected departure | Actual opening / commitment | Knowledge boundary and pending consequences |
|---|---|---|
| Sloane | Connected 18:00 call, or selected 18:45 reminder followed by actual call | Prior reported sender/date information recalled only when sent; PA-17 task optional; other contacts do not receive this call |
| Julian | Kept professional follow-up; new audit offered, not accepted | Only earned offered window; Marcus correction has its actual office receipt; pressure-withdrawn route cannot select him |
| Sender | Continue unknown-number call; docket supplied as checkable lead | Confirmation/misdirection remembered as what Evelynn said; sender cannot inspect her outbox or acquire her private records |
| Voss | Kept call after institutional records route | Retained/circulated/formal qualification distinguished; pending review is not completed; unrelated Helix/Maya information not inferred |
| Maya | Keep 18:00 or agreed 18:45 conversation | Adaptation wording uses earned knowledge; paid work/qualification callback requires actual disclosure; relationship not reset |
| Own walk | No call occurs; independent public notice and index provide a lead | Other accepted calls still pending/missed according to time; a future 18:45 call can still be kept |

The bridge authenticates the complete revision-14 entry snapshot. Revision-15 replay preserves its exact ledger/history prefix. A pending call is never described as completed. Two simultaneous later calls cannot both be kept; keeping one advances the clock and the other needs repair. Cancelled, declined and unanswered invitations are not fabricated no-shows. Repair requests do not guarantee forgiveness or a new appointment.

## I. NPC knowledge corrections

- **Sloane:** exact disclosures, authored monitoring sources and actual public digest only; no inferred private fee, personal motive or room terms. Replies identify the information she actually has.
- **Maya:** actual identity and documentary disclosures; no access to Voss's file or Helix work simply through familiarity.
- **Voss:** owns clinical knowledge and the qualification workflow; earlier false medical order already rejected. No general view of private conversations.
- **Julian:** office records, submitted audit and explicitly sent boundaries; independent pass mentioned by Evelynn before his response. Private motive remains writer/player information.
- **Marcus:** actual session/referral circulation and Evelynn's exact response; his description is not a contract. Correction/negotiation/pressure/retention retain different results.
- **Unknown sender:** earlier request and actual player replies; selective information does not grant an outbox view. UI no longer exposes internal `rook` delivery labels as a discovered name.

## J. Chronology and location route table

D0 is the return from Glass House; D1 is the following day; D2 is the Chapter 4 case day; D3 is collection. These labels describe chronology, not a new in-game calendar.

| Day / time | Node | Location / continuity | Primary purpose |
|---|---|---|---|
| D0 19:52 | chapter3.home | Driver to building, badge, apartment; optional mirror/clothes/evidence | REFLECTION |
| D0 19:59 | chapter3.surveillance | Apartment, sourced residential entry message | CONSEQUENCE |
| D0 20:04 | chapter3.complete | Same apartment; pause or continue | REFLECTION |
| D0 20:08 | chapter3.mayaContact | Monitored handset; contact or refrain | RELATIONSHIP |
| D0 20:10 | chapter3.mayaTalk | Optional call, apology/correction/disclosure branches | RELATIONSHIP |
| D0 20:17 | chapter3.mayaClose | Call boundary and optional next contact | RELATIONSHIP |
| D0 20:23 | chapter3.pressure | New Sloane exchange, source-dependent | POWER |
| D0 20:29 | chapter3.mayaFollowup | Optional exact message after Sloane exchange | ACTION |
| D0 21:05 | chapter3.rest | Meal at home, then sleep | REFLECTION |
| D1 06:15 | chapter3.nightComplete | Wake in apartment | REFLECTION |
| D1 06:15–after 06:45 | chapter3.morningPlan | Keep/cancel agreed Maya call before 08:30 care; header no longer rewinds | ACTION |
| D1 08:30 | chapter3.voss | Attend clinic or remote advice; deferred care skips examination | INFORMATION |
| D1 08:48 | chapter3.vossPlan | Follow-up closes; remote/deferred route at home, reserve/defer records review | ACTION |
| D1 10:10 | chapter3.rook | Unknown thread; allegation attributed | INFORMATION |
| D1 10:24 | chapter3.rookCompare | Optional authenticated patient-record comparison | INVESTIGATION |
| D1 10:35 | chapter3.rookReply | Separate source and Sloane threads; bounded disclosures | POWER |
| D1 10:45 | chapter3.informationEnd | Close morning inquiry | REFLECTION |
| D1 11:05 | chapter3.invitation | Switchboard relays Helix inquiry; can decline | TEMPTATION |
| D1 11:20–noon | chapter3.verifyOffer | Two checks, actual 14:00 clinic conflict explained | INVESTIGATION |
| D1 14:00 | chapter3.executive | Explicit journey/check-in at Helix | RELATIONSHIP |
| D1 14:10–14:45 | chapter3.executiveWork | Fictional acquisition problem; completed session earns voucher | ACTION |
| D1 14:50 | chapter3.reception | Introduction negotiated/refused/accepted separately | TEMPTATION |
| D1 15:05 | chapter3.photograph | Optional one-image/one-caption publication or refusal | POWER |
| D1 after decision | chapter3.opportunityEnd | Declined inquiry before alternative 14:00 review, or after paid visit | CONSEQUENCE |
| D1 15:20 | chapter3.marcusRecord | Paid branch; actual referral circulation | INFORMATION |
| D1 15:28 | chapter3.marcusLeverage | Authenticated note, five distinct responses | POWER |
| D1 14:00 | chapter3.institutional | Alternative to Helix; travel to clinic, three documents | INVESTIGATION |
| D1 14:35 | chapter3.reviewQualification | Signed scope distinction; retain/circulate/formal review | POWER |
| D1 16:00–17:00 | chapter3.truths | Return home with actual documents; up to four messages | REFLECTION |
| D1 16:00–17:00 | chapter3.disclosure | Local draft, exact scope/recipient; return loops share time range | POWER |
| D1 17:00 | chapter3.calendar | Calls 18:00–18:30; Maya/Sloane can agree 18:45–19:15 | ACTION |
| D1 18:00 | chapter3.departure | Apartment to lift; selected early call connected, late reminder only | ACTION |
| D1 18:00 | chapter4.entry | Building steps to river path; earned opening recalled | CONSEQUENCE |
| D1 18:30 / 19:15 | chapter4.consequences | Selected call/walk ends; resolve remaining calendar honestly | CONSEQUENCE |
| D2 09:15 / 09:50 | chapter4.resource | Overnight home; public desk; optional Helix accounts round trip | ACTION |
| D2 10:00 | chapter4.assignment | Public index and new bounded offer; choose own purpose/client | POWER |
| D2 10:30–11:30 | chapter4.room | Helix journey or public desk; three scoped inquiries | INVESTIGATION |
| D2 11:30 | chapter4.assessment | Submit to actual recipient; retain permitted packet; audit paid | ACTION |
| D2 12:00 | chapter4.interest | Private stance after work, no automatic attraction | REFLECTION |
| D2 12:15 | chapter4.outside | Hotel café beside Helix, or sandwich/public counter; optional Maya call | RELATIONSHIP |
| D2 13:00 | chapter4.favor | Workspace/copy offer with explicit scope; refusal valid | TEMPTATION |
| D2 13:30 | chapter4.notice | Sourced Sloane message or no such message | CONSEQUENCE |
| D2 14:00 | chapter4.power | Return to case desk; honest/redacted/refused/false-approval request | POWER |
| D2 20:00 | chapter4.intimacy | Return home, dinner; quiet, decline, flirt or eligible scope discussion | RELATIONSHIP |
| D2 20:30 | chapter4.handoff | Only authorized route travels to hotel; withdrawal still possible | ACTION |
| D3 09:30 | chapter4.privateAccess | Night at home; public records desk with own pass | ACTION |
| D3 09:40 | chapter4.complete | Check permitted packet and sign out | REFLECTION |

Clock labels on inquiry loops are windows, not extra time. The historical negotiation receipt at 09:42 is explicitly on its negotiation day, not D2. No actual Chapter 3 appointment history was rewritten.

## K. Julian progression review

Canon remains Julian Mercer, **49**, **Helix Group COO**, major adult character. Chapter 3 introduction remains professional. Chapter 4 requires a kept follow-up to offer the audit, actual completed work before private eligibility, player-chosen attraction and reciprocation before an invitation, and separate current authorization before a handoff. Curiosity, employment, a fee, lunch and workspace alone do not grant intimacy. His professional-only route stays professional even after the leverage backfire.

He can offer useful things without promising rescue. His response to a false authority claim is verification and bounded withdrawal of expedited access, with a personal invitation withdrawn only if one exists. Earned payment remains settled. No obsession, possessiveness, paternal claim or dependency is introduced.

## L. Non-Julian route review

All five alternatives reach investigation, assessment, power, independent custody and completion. They are not stopped at the absent intimate scene. Sender route checks his docket; Voss route compares a routing problem with a qualification Evelynn owns; Maya offers public-file interpretation with a work boundary; Sloane's commissioned public-source task is voluntary; independent work needs no patron. Julian's refused, unanswered or pressure-withdrawn follow-up cannot fabricate a paid audit. The already-earned voucher remains redeemable separately.

## M. Intimacy / agency review

Private motive, attraction, willingness, scope and desire stay distinct. All three motive choices leave desire unestablished. The actual current scope is transmitted to Julian; private motive is not. Adult handoff remains authenticated, restricted to non-graphic fade-to-black, with no graphic prose added. Flirt-only now visibly starts its call. Refusal and withdrawal preserve fee and ordinary access. A completed encounter creates no automatic romance, future appointment or dependency. Professional authority remains contextual asymmetry, not an invented threat or bargain.

## N. Scene rhythm and chapter arcs

The route table assigns every scene a primary purpose. Adjacent conversation blocks remain where they represent a single exchange: Maya contact/talk/close; Voss care/questions/plan. They are not three independent offers. Chapter 3's invitation/reception/photo stretch deliberately separates paid work, public association and image permission, with the acquisition exercise interrupting the offers. Its home and disclosure loops remain the densest section; seven display edits shorten redundant staging without deleting agency or rewriting frozen dialogue.

Chapter 4 opens with consequence, then registration and active investigation. The three-inquiry budget requires priorities; the player writes an assessment and can be challenged. Personal interest/outside/favor remains its most conversational stretch. Shortened copy and a café/public-counter setting distinguish it from the review room; records no longer duplicate every exchange. Sloane's sourced response interrupts the offers before Evelynn initiates the routing-copy request. No new action scene or artificial travel sequence was added.

Chapter 3 supports **controlled → informed → tempted → empowered → responsible → autonomous** through surveillance, verification, optional paid work, evidence use, disclosure/calendar responsibility and chosen departure. Chapter 4 supports **consequence → initiative → competence → personal proximity → power → entanglement**. Proximity may be collegial and entanglement documentary/professional; it does not require romance. The final owned pass and packet persist on every route.

## O. Chapter 3 changes

**No Chapter 3 authored content, reducers, historical records or frozen dependency bytes were changed by this pass.** Only shared UI projection was added: source-scoped prose edits, time/location headers and unknown-sender delivery display. The projection never feeds history, saves or replay and never uses later state to change an old exchange. Existing revision-13/14 milestones and authenticated prefixes remain intact.

## P. Chapter 4 and presentation changes

This pass edits `src/content/chapter4.ts`, `chapter4-entry.ts`, `chapter4-case.ts`, `chapter4-power.ts`, and `chapter4-model.ts`; adds `chapter4-callbacks.ts`; edits `src/ui/App.tsx`, `ClinicConversation.tsx`, `journal-entries.ts`, `reading-presentation.ts`; adds `chapter3-reading.ts`, `chapter4-presentation.ts`; adds `tests/state/chapter3-4-prose-logic.test.ts` updates the stale checkpoint assertion in `tests/browser/chapter3-evening.spec.ts`, and adds this report. No art was generated/promoted or replaced. No Chapter 5, schema change, major branch deletion or canon reveal was introduced.

## Q. Validation

- `npm.cmd test`: **355/355 passed**, 34 files, including 15 new prose/logic regressions. Final unit run completed in 34.67 seconds.
- `npm.cmd run test:browser`: final full rerun **78/78 passed** in 4.2 minutes. The first run exposed only the obsolete checkpoint-text assertion; it was updated and the targeted evening rerun also passed 2/2.
- `npm.cmd run build`: **passed**, including `tsc --noEmit`; 557 modules. JavaScript bundle 5,740.19 kB / 1,891.00 kB gzip. Existing large-chunk warning remains.
- `git diff --check`: **passed** at delivery.
- Preservation: all original 193 paths still exist; no frozen dependency changed; no diff in Chapter 3 authored content/state or historical revision 13; HEAD unchanged.

Targeted coverage (included in the full unit/browser suites):

| Required check | Evidence |
|---|---|
| Six departures / exact 14→15 prefix | Six parameterized public completions in `chapter4.test.ts`, entry design matrix, forged-entry rejection |
| Calendar conflicts, later calls, cancellation, excuses | Chapter 3 autonomy tests; Chapter 4 pending/missed/repair tests; new double-later-call regression |
| Public-artifact knowledge | Published/unpublished Sloane discovery tests; no private fee/attraction leakage |
| Marcus variants | Five existing authenticated variants plus five new earned opening callbacks |
| Rook disclosure variants | Chapter 3 exact delivered report/limited report/confirmation/misdirection route tests; sender delivery display regression |
| Maya knowledge variants | Chapter 3 provenance/evening tests and current Chapter 4 opening predicate; no-contact and earned adaptation routes |
| Voss alternative / Julian unavailable | Institutional document route; all public completions; withdrawn, unanswered and cancelled follow-up tests |
| Intimacy / no automatic dependency | Three motive contracts, no-sex/refusal/flirt/withdrawal, professional-only invitation regression, desire not inferred |
| Historical replay | Frozen revision-13 and revision-14 Git-byte tests; exact authenticated prefixes |
| Revision-15 save/reload | Every public completion, all motive completions, browser independent and intimate routes |
| Projection integrity | Source-scoped checkpoint test, unchanged serialized state, records retained in journal; browser checkpoint/reload tests |

Manually inspected the final-run desktop authorization and mobile independent-completion screenshots. Boundaries, withdrawal and continuation controls are readable; the mobile view fits the viewport. Detailed journal notices no longer fill the main conversation.

## R. Remaining concerns

- Revision 15 is deliberately unfrozen. Earlier local development saves produced before these revision-15 edits can fail exact replay authentication. No silent migration or alteration of frozen revision 14 was introduced. Use an authenticated revision-14 departure or a newly produced revision-15 save for this review.
- The existing large bundled historical implementations still produce a build size warning. This pass does not redesign save authentication or code splitting.
- Tests verify contracts and representative routes; they cannot establish every reader's experience of pacing. The complete per-scene review retains the intentional slow clinical/disclosure sections instead of adding filler action.
- No blocking canon contradiction was found. Revision 15 remains ready for human prose review before any freeze or publication.
