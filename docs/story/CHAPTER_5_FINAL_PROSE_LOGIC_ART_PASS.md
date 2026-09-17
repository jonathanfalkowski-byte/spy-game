# Chapter 5 — final prose, logic and cinematic art pass

Review date: 2026-09-17. Scope: all twelve Chapter 5 movements, revision 16 / schema 5, including fifteen runtime nodes. No Chapter 6, new major scene, art generation/promotion, commit or push.

**REVISION 16 IS READY TO FREEZE.** Final review completed; source remains uncommitted and unpushed.

## A. Starting branch / HEAD

Actual checkout: `C:/Users/Admin/Documents/Codex/2026-09-14/files-pasted-by-the-user-we/outputs/eve-chapter-3-design`. Repository `jonathanfalkowski-byte/spy-game`. Branch `story/chapter-3-design`. HEAD `999e6e5db4c4b0553589176f23090919ebef3473`, unchanged by this pass.

## B. Working-tree state

The chapter, its frozen dependency copy and several shared integration/art-rule files were already dirty. [Pre-edit inventory](CHAPTER_5_PRE_FREEZE_INVENTORY.md) records exact starting status, nodes and fully qualified shot IDs. No reset, clean, stash, commit or push. Pre-existing Art Bible/checklist/integration work was preserved. This pass changes the Chapter 5 modules/adapter, its browser test, treatment and art plans; adds continuity/Harbour specification helpers, focused route tests, inventory, continuity table and this report. No earlier story source or historical implementation was edited in this pass.

## C. Files reviewed

Read actual `src/content/chapter5.ts`, `chapter5-model.ts`, all four reward/public/benefit/desire modules, Chapter 5 AdultSceneSpec adapter, chapter dispatcher/authentication/save code, UI scene/place/conversation presentation, all Chapter 5 unit/browser helpers and tests. Checked earlier mission wardrobe delivery/old-clothes actions and Chapter 3/4 callback sources for ownership/location provenance. Reviewed entry-state matrix, treatment, prior implementation report, Art Bible, all global cinematic rules, art review checklist, apartment canon/production authorization, shot review and art requirements. Existing image approvals/reference reviews are retained; this task performs specification review, not a new review of unseen generated images.

[Continuous player-route table](CHAPTER_5_CONTINUITY_TABLE.md) records times, locations, physical/remote participants, wardrobe, props/custody, commitments, public artifacts, relationship boundaries and shot triggers for every node. Route tests start from authenticated revision-15 fixtures rather than handcrafted revision-16 snapshots.

## D. Chronology issues

Collection morning → shopping/accounts/lunch → home14:00 → invitation15:00 → following-day preparation/Harbour → following-morning brief10:00 → accepted studio 11:30–13:30 → home15:00 → workspace collection/return before 16:00 → terms16:00 → selected messages18:00–19:00 → want20:00 → optional20:30 outing → home22:30 → final action22:35.

Corrected the shopping heading that called 11:30 “afternoon”, the shop opening that implied an earlier unplayed shop trip, arrival text appearing after the Harbour host, and studio travel with no explicit appointment start. Short rooftop attendance now has an actual departure/arrival and20:30–20:50 interval; full hour ends21:30. Future feedback calls remain+7/+14,10:00–11:00 from the offer, not from extension start. They do not occur during this chapter. Historical day records remain untouched.

## E. Location issues

Harbour optional walks and coffee now end at the programme table before another attention selection. Coffee request and actual meeting agree on outside entrance; Julian explicitly arrives, leaves, and Evelynn returns inside. Studio agreement collection/departure and home return are explicit. Workroom collection identifies the actual Helix/Harbour desk and return before four. Municipal request and paid extension use online pages at home. AdultSceneSpec now names the hotel beside Helix, matching current Chapter 5 prose rather than copying the previous café location.

Apartment compositions stay within the approved wide/wardrobe/table/cabinet geography. Tea/cup gestures do not require inventing an unseen sink or reverse-angle floor plan. No driver, car, new apartment, private-office interior or unsolicited visitor was added.

## F. Knowledge issues

Verified public existence separately from delivery/discovery. Harbour photograph requires its own permission; Aster proof requires a later publication action under exact terms. Sending Maya a real issue link creates her sourced opening record; publication alone does not alter her knowledge or Sloane's. Sloane receives only the selected initial workspace description, never the hidden calendar or private motive. Sender remains unidentified and qualified by earned thread; Voss's formal review remains pending. The broad Harbour workroom offer now has an explicit public visitor-bulletin source on municipal/home routes instead of implying the provider knows the player's private desk decision.

A fresh Julian invitation reply was recorded but not visibly appended when the node remained `want`. Fixed the action to append the actual affirmative reply before motive/scope choices. No new permission is created by displaying it. Removed generic references to pending afternoon calls and old missed calls from unconditional scene openings; actual unresolved commitments still appear only through their sourced conditional callbacks.

## G. Resource / custody issues

Separate sources remain: old earned $600 physical Helix voucher, settled $900 Chapter 4 work fee, Aster400/600/800 public fees (+100 negotiated uplift), private100 completed sitting. No promised publication fee is spendable. Purchase costs120/80/45/60 and workspace/extension60 each remain guarded by actual funds. One redemption and one purchase only. No economy expansion.

Personal phone is owned but remains boxed at home throughout communications; the Axiom handset remains the communication device with its existing monitoring terms. Final place-phone explicitly unboxes it. Bought blouse is checked against the body without changing clothes, bought on a covered hanger and never silently worn. Accessory is specifically a silver hair clasp tested in the palm, boxed, and only removed for chosen final placement. Lunch yields a receipt, not an object magically carried home. Public issue/photo are digital pages on existing devices, never unexplained printed magazines. Guest card is received with Harbour programme on D1, available for D2 outing, carried/returned only if used. Booking cards/receipts go into the existing folder beside the reader pass.

## H. Wardrobe fixes

Added deterministic `c5.wardrobe` IDs and a read-only continuity projection. Opening explicitly changes into the owned plain charcoal dress/black low heels before unpacking. Professional: charcoal suit/ivory blouse. Glamorous: black evening gown with owned tailored jacket open. Provocative: same gown with open back uncovered and tailored jacket left home. Minimal: plain charcoal dress. All four retain black low heels and no added jewellery; purchased pieces remain unworn. Hair/face/body continuity is required by the shot plan.

Harbour departure hangs the chosen clothes for morning. Next morning puts the same assembly on again; studio concept cannot change it. It remains through later scenes, including return/stay home. After a fade, departure explicitly restores the arrival clothes. No wardrobe option mutates attraction, desire, authorization or canonical outcome. Tests walk all four selections through both Harbour events and completion.

## I. Jacket / voucher resolution

**Jacket:** one Adrian jacket on a hanger inside the existing wardrobe. Earlier runtime only establishes that it remains in the apartment; the locked apartment register places it in the wardrobe. Chapter 5's contradictory final hook was corrected to straightening its existing hanger. No historical relocation, duplicate, disposal or identity judgment is authored. Evelynn's tailored jacket is a distinct delivered garment.

**Voucher:** earned/unredeemed original in folder → explicitly placed in bag before leaving → handed to Helix accounts → stamped and retained by clerk, with600cash and receipt returned once. If no redemption, the same voucher returns from bag to folder at 14:00 and is still unredeemed at night. Already-redeemed historical routes never gain another original. Private papers/pass stay home. Focused tests verify each boundary, actual balance and rejection of repeated redemption.

## J. Julian progression review

Professional availability still requires kept paid Helix work/no false-authority or withdrawn-access route. Optional player invitation → remote reply → ten-minute public coffee → goodbye; no forced attraction. Fresh explicit flirtation can establish reciprocal interest, still no physical scope. Workroom help requires disclosure of the actual problem. Julian moves his own slot and gives a confirmed free seven-day room without duties; that benefit remains useful after refusing the extension or private time. His institutional interest is stated without personal entitlement. Later private request, motive, current scope and voluntary fade remain distinct. Refusal/withdrawal never removes earned income, reader pass or unrelated service.

## K. Non-Julian route review

Complete independent route: choose spending/no purchase → choose presentation → take part in Harbour → choose/withhold publication → select self-funded/public/home workspace → negotiate/pay/refuse future calls → choose old contacts → pursue music, shorten it, want/refuse or stay home → physical home action. This works with no Julian access, professional-only contact, personal refusal or no prioritization. Public/editorial income and social enjoyment do not depend on him. Regression includes a non-Julian public profile earning $400, self-funded room $60, narrowed one-call extension, Maya link and voluntary music hour.

## L. Desire / agency review

Existing choices already provide initiative at spending, appearance, attention, brief/concept, exact terms, proof release, workspace, obligations, communications, desire and final placement. No new major scene was needed. Personal/instrumental/mixed motives stay private; instrumental action does not assert desire. Want/refuse and uncertain/no-interest remain valid. Fresh adult eligibility, willingness and authorization gate handoff; no-sex, phone-only, refusal and withdrawal are retained. The adapter issues only fade-to-black; issuing/verifying it is read-only. No graphic prose or depicted encounter was introduced.

## M. Prose fixes

Reviewed all player-facing Chapter 5 blocks, labels, hints, sourced notices and conditional responses. Replaced abstract wardrobe/style directions with concrete garments. Removed the spending “choice stays yours” tag, the provocative look's explanatory permission sentence, the home desk's monitoring restatement and some generic systems phrasing. Kept exact scope in action hints/journal where it assists decisions. Sloane now asks what the same desk will cost next month; her concern stays specific. Julian's dialogue remains concise, Maya retains limited time and her own commitments, Voss distinguishes care/administration, and sender advice retains a concrete approved-version reference.

No jewellery, luxury, provocative dress, pleasure or voluntary intimacy is framed as moral failure. No acceptance creates a dependency/ownership/identity verdict. Micro-gestures remain holds; added movement only repairs an actual custody/location gap or supplies a necessary transition.

## N. Scene rhythm / chapter arc

| Movement | Primary rhythm | Role / final treatment |
|---|---|---|
|1 home | REWARD / REFLECTION | Actual earned packet/pass/resources; optional inspection, shortened thematic commentary |
|2 spend | ACTION / REWARD | One concrete personal purchase or deliberate retention |
|3 echo | VISIBILITY | Player chooses whether/how to become known; no offer needed |
|4 invitation | SOCIAL | Chooses one voluntary public event; concise registration |
|5 dress | PRESENTATION | Concrete chosen appearance; no imposed identity conclusion |
|6 room | SOCIAL / VISIBILITY | Two attention allocations, ordinary art/conversation/pleasure, optional coffee |
|7 editorial | TEMPTATION / ACTION | Player proposes concept, negotiates exact terms, retains separate proof decision |
|8 workspace | REWARD / ACTION | Practical need and four distinct solutions; free benefit genuinely useful |
|9 extension | OBLIGATION | Compact written terms; future hours have a defined price, refusals preserve previous gain |
|10 contacts | RELATIONSHIP | Exact chosen disclosures and other people's time; no mandatory Julian exchange |
|11 want | DESIRE / ACTION | Something enjoyable can be wanted, pursued, shortened, refused or left uncertain |
|12 home | REFLECTION / OWNERSHIP | Voluntary physical placement in recognizable home; no author verdict |

The reward→visibility→appetite→compromise→ownership arc is enacted through choices, not repeated in monologues. Negotiations7/9 are separated by the practical workspace decision; public attention is followed by private work and relationships; home returns carry changed objects/time rather than repeated mirror/window reflections. Julian is optional in three distinct functions, never a mandatory sequence of offers. Compromise is an available accepted obligation, not a forced moral fall. No extra major scene or repeated pacing was added.

## O. Harbour canonical movement sequence

Arrival → inside/name/programme/card at table → optional attention action → return to table if moved → optional second distinct attention → thank host → exit → home programme/card placement → hang chosen outfit for morning.

Host conversation/observing: programme table → near-wall work → table. Photo: photographer joins → takes/shows frame → exact approval → photographer leaves → host shows actual page. Coffee: remote invitation/reply at table → E alone outside → J arrives → ten-minute hold → J leaves → E returns inside. Flirt stays remote even after the earlier coffee because J has departed. Leaving early remains valid. **448 ordered attention/wardrobe/event combinations passed**; no location or costume resets between choices.

## P. Cinematic shot-plan changes

[Detailed plan](../art/CHAPTER_5_SHOT_PLAN_REVIEW.md) is marked READY FOR ART PRODUCTION, with explicit event-time wardrobe/props, remote-vs-physical cast, holds, anchors and missing-asset status for all 12 movements. Existing IDs preserved. Activated s06.shot13-return; added14-wait/15-departed/16-home/17-hung. Added s01.shot08-change, s02.shot10-home, s07.shot10-depart, s12.shot13-photo-review. Prior retired terrace/refusal/tea/cup IDs remain retired. Reserved journey stays no-image. Encounter beats are FX/fade only.

Historical F01–F09 findings remain visible with dated resolutions. Current runtime renders no Chapter 5 art; future binding must use the reached prose anchor plus event-time snapshot. `harbourShotPlan5` is a tested ordered **production specification**, not a player image selector. It rejects invalid state/wardrobe/event/used attention/ineligible Julian plans, and distinguishes unpublished camera review from later public-page result. No future image is introduced by this pass.

## Q. Remaining missing art

[Art requirements](../art/CHAPTER_5_ART_REQUIREMENTS.md) groups location masters, character positions, light/costume/prop variants and explicit methods: unchanged compatible bases, edits, crops, composites, lighting variants and new generation. All Chapter 5 scene assets are still missing. Face references/room geography can be retained; current character-bearing apartment scenes do not automatically fit the new wardrobe/prop/time guards. No hotel encounter raster is required. No generation, credits, candidate approval or asset promotion occurred. Existing legacy image review concerns stay recorded; new specifications avoid unsupported angles rather than declaring those images corrected.

## R. Tests / build

| Check | Result |
|---|---|
| Pre-edit frozen entry/authentication suite |20/20 passed; all 331 frozen dependencies checked against manifest and Git bytes|
| Focused continuity/public/benefit/desire suite |33/33 passed before full regression|
| Full unit suite, `npm.cmd test -- --maxWorkers=2 --testTimeout=15000` |**409/409 passed**, 39 files, 141.69s|
| Full browser suite, `npm.cmd run test:browser` |**81/81 passed**, Chromium, two workers, 4.8 minutes; clean final production build|
| Typecheck |Passed after source edits; final production build reruns it|
| Production build |Passed in clean Playwright web-server setup, including typecheck|
| `git diff --check` |Passed after final source and documentation updates|
| Manual browser captures |Reviewed final mobile proof/ending and desktop fresh no-sex doorway captures; readable layouts, no Chapter 5 placeholder art, no overflow/page errors in tested routes|

Focused coverage includes revision 15 exact authentication/prefix preservation, revision 16 save/load/replay, all 4 appearances, voucher/phone/jacket/publication custody, all 448 Harbour combinations, genuinely independent complete routes, professional/fresh-interest/refusal/benefit/withdrawal Julian routes, actual recipient knowledge, exact obligations, and fade-only no-sex/personal/instrumental/mixed outcomes. Existing maximal/exploratory routes retain original schema limits.

## S. Compatibility

No file under any frozen legacy implementation was altered by this pass. Revision15's331-file transitive dependency copy remains byte-identical to baseline 999e6e5 and authenticates the whole prior snapshot before explicit chapter5.begin. Full history and ledger prefixes remain equal; forged/premature/missing-continuation states fail. New records use bounded `c5.*` strings and existing history; schema 5 capacities/NPC keys/day records are unchanged. Uncommitted revision 16 prose/state is corrected before freezing; no already-frozen revision 16 was migrated or reinterpreted.

## T. Remaining risks / delivery boundary

No unresolved story-logic or canon contradiction remains in the reviewed branch classes. Art production and runtime beat presentation remain future, separate work: no asset may be selected from eventual state, and manual Art Bible/owner approval is still required for any generated candidate. That is a delivery boundary, not permission to ship mismatched placeholder art.

The existing roughly 10 MB uncompressed JavaScript bundle still produces Vite's 500 kB chunk warning; frozen replay copies contribute to it. No compatibility code was deleted or test weakened to silence the warning. Browser verification covers Chromium; no claim is made about untested engines. Starting dirty work remains uncommitted/unpushed. No Chapter 6 or further expansion.

## Concise issue table

| Severity | Chapter | Scene/shot | Issue | Fix |
|---|---|---|---|---|
|HIGH|5|s06|Optional coffee/wall visit could leave next interaction at wrong position|Authored bounded table→interaction→table sequence; all 448 combinations checked|
|HIGH|5|s01→s02|Unredeemed voucher left home yet later redeemed|Explicit folder→bag→accounts; clerk retains original; unredeemed return to folder|
|HIGH|5|s05 onward|Style direction insufficient for deterministic wardrobe|Exact owned assemblies/IDs; authored changes/restoration; all 4 tested|
|HIGH|5|s11 current invitation|Affirmative Julian reply not visibly appended on same-node action|Append reply in action before scope selection; consent still unset|
|MEDIUM|5|s12.shot11-jacket|Hook contradicted wardrobe register|Single old jacket straightened on existing wardrobe hanger|
|MEDIUM|5|s06/s12 opening|Destination observations preceded arrival|Order arrival blocks before in-room observations|
|MEDIUM|5|s07/s08/s11|Appointment/trip/adapter location ambiguities|Studio11:30–13:30; explicit collection return/short roof trip; hotel beside Helix|
|MEDIUM|5|s08/s09|Municipal/payment medium and broad offer information path unclear|Online home actions; public Harbour visitor bulletin; exact paid start|
|MEDIUM|5|s02/s12 props|Clasp type, blouse fitting, boxed phone and photo close ambiguous|Hair clasp in palm; unworn hanger purchase; explicit unboxing; open-before-close digital page|
|MEDIUM|5|all shots|Aggregate action flags could expose future images|Exact ordered anchor specification; no Chapter 5 image binding; later integration remains fail-closed|
|LOW|5|s06/s11 card|Guest card appeared without physical receipt|Received with Harbour programme; taken/returned only on roof outing|
|POLISH|5|spend/presentation/ending|Abstract/thematic tags and unnecessary micro-staging|Concrete garments/objects; concise replies; holds for ordinary dialogue/gestures|

**REVISION 16 IS READY TO FREEZE.**

No commit, push, freeze artifact, art generation or promotion was performed. Stop at this final-review checkpoint.
