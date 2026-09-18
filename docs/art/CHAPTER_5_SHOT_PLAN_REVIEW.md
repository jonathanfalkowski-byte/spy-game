# Chapter 5 cinematic shot plan — final pre-freeze specification

**Current coverage accounting:** [CHAPTER_5_TRUE_ART_BACKLOG.md](CHAPTER_5_TRUE_ART_BACKLOG.md) audits every stable ID plus explicit dialogue holds against runtime baseline `198feada20cc15aa47d6e64f37149079efe187a4`. It supersedes raw-index percentages as the production-planning metric. Historical no-binding/status statements below retain their dates; the current runtime has three exact approved bindings. No new shot approval, story action or runtime behavior is introduced by this accounting update.

**Current audit status:** three existing approved exact Chapter5 variants are now runtime-bound; no new promotion/generation. Current authority index supersedes the historical no-binding and earlier-spend statements retained below. Revision17 is opt-in; frozen semantics remain preserved.

**Harbour production update (2026-09-17):** Owner-approved V2 promoted for c05.s06.shot12-entrance; zero-credit completed-departure derivative PASS and promoted under explicit conditional authorization for c05.s06.shot15-departed. Exact evening/attend/professional/Julian-access/coffee state only. Julian absent after goodbye, before Evelynn re-enters; identical background and Evelynn placement/coffee. LOW/POLISH edge notes retained. Neither creates canonical identity/wardrobe authority. [Approval and evidence](../../art/production/chapter5/harbour-approvals.json). Other branches and return shot remain pending. No runtime binding change.


**Current production update (2026-09-17):** Owner approved/promoted `C5-S12-SHOT05-PHONE-COMPOSITE-V2` for the exact professional `c05.s12.shot05-phone` state only; see [bounded coverage](../../art/production/chapter5/coverage.json). Other states remain pending. Runtime binding is unchanged. The following pre-freeze specification and its original no-generation boundary are historical planning context, superseded only by explicit later owner approvals.

Scope confirmed by the owner: all twelve Chapter 5 movements, including `proof`, `handoff` and `complete` (fifteen runtime nodes). Audited 2026-09-17 against the current uncommitted revision-16 work on `story/chapter-3-design`, HEAD `999e6e5`. The final pre-freeze pass corrects current revision-16 prose and continuity only; frozen revision 15 remains exact. See the [final report](../story/CHAPTER_5_FINAL_PROSE_LOGIC_ART_PASS.md).

Authority: [Art Bible](EVE_ART_BIBLE.md), [global rules](GLOBAL_CINEMATIC_ART_RULES.md), [review checklist](ART_REVIEW_CHECKLIST.md), actual source and existing approvals. This expands the earlier [requirements/map](CHAPTER_5_ART_REQUIREMENTS.md); where its shorthand was ambiguous, the state and timing constraints here govern the proposed production plan. Neither document approves a resulting image.

## Review summary

Hold dialogue and menus. Cut only after meaningful action, physical/communication entry, changed location, material lighting or important object custody. Use existing face and apartment references; do not repaint a new home for each scene. Keep all intimacy off-page under the current fade-only contract.

The chapter has several action sequences that cannot safely use a single scene-level image: voucher redemption and return, the Harbour photograph and later published page, workspace collection and return, optional private arrival versus withdrawal, and final object placement. They require ordered visual beats within the existing prose, not new story events.

The earlier wardrobe, Harbour, voucher, jacket and communication-medium findings are resolved in revision 16. The original findings remain in the historical audit table below, with a dated resolution register. No new major scene was added.

**Presentation boundary:** the runtime currently shows text and no Chapter 5 scene art. A future art presenter must reveal each ordered beat only after its exact prose anchor, with the state at that event. A completed action's final flags are not a license to display all its images at once. The ordered Harbour contract in `src/content/chapter5-harbour-shots.ts` is tested planning data, not a live asset selector. Production may prepare these specifications; runtime integration must retain this fail-closed boundary until assets, beat timing and branch playback are reviewed.

## References, guards and notation

Reviewed sources: [reward](../../src/content/chapter5-reward.ts), [public life](../../src/content/chapter5-public.ts), [benefit/obligation](../../src/content/chapter5-benefit.ts), [desire/ending](../../src/content/chapter5-desire.ts), [shared predicates](../../src/content/chapter5-model.ts), [chapter dispatch](../../src/content/chapter5.ts), [conversation presentation](../../src/ui/ClinicConversation.tsx), [AdultSceneSpec adapter](../../src/narrative/adult-scenes/chapter5.ts). Node/action names below are exact source anchors; quoted fragments locate the visual beat within them.

- **E** = adult Evelynn, `player-character`; **J** = Julian Mercer, 49, Helix COO. No other named character physically visits the apartment in Chapter 5.
- Every guard also requires an authentic revision-16 history and that the specific prose beat has been reached. “After action” means completed `chapter5.<action>`, not a visible option or a later unrelated flag. On history review, use state at that event, never the player's eventual end state.
- **J-access** = `c4.audit-paid=900`, `c4.julian-kept=yes`, `c3.helix-window=offered`, `c4.method!=exploit`, no `c4.personal-withdrawn`.
- **J-mutual** = J-access and either current `c5.mutual-interest` or historical `c4.mutual-interest`. This permits a fresh request only, never touch.
- **V** = `c3.paid=600` and neither `c4.redeemed` nor `c5.voucher-redeemed`; **cash** = `c5.cash` if set, else settled `c4.income`, else zero.
- **P** = actual `c5.presentation` value: professional, glamorous, provocative or minimal. Do not infer P from `clinic.outfit`.
- **A** = preview (`c5.event=attend`, 18:30–19:15); **R** = reading salon (`decline`, 15:00–15:45). Both are the following day. Their backgrounds, light and attendance props differ.
- **M** = missing approved Chapter 5 asset/specification; **U** = exact screen/document variant needed, potentially composited over a held base; **B** = unresolved production detail blocks generation of that composition; **HOLD** = no extra raster; **FX** = fade transition, no encounter image. All are pending owner review. U is a proposed production technique, not implemented UI.

### Shared continuity contract

Canonical Evelynn face: [approved three-quarter](../../art/reference/evelynn/evelynn-canon-three-quarter-v1.png), [front](../../art/reference/evelynn/evelynn-canon-front-v1.png), [approval record](../../art/reference/evelynn/README.md). Visually rechecked the three-quarter image in this audit. The gala gown, earrings and hair arrangement are not permanent anatomy or automatic everyday clothing.

Apartment: [production authorization](../../art/production/apartment/README.md) and [existing post-Glass House wide](../../art/production/apartment/apartment-post-glasshouse-shadow-v1.png), visually rechecked. Preserve its two-column window, left seating/wardrobe/mirror, right cabinetry/lamp/door, floor plane and adult scale. Older [layout proposal](APARTMENT_CANON.md) labels unseen details as proposals; production-use approval does not convert every unseen detail into canon. Existing scale/floor review notes remain unresolved. Do not add indoor cameras, gifts, another jacket or another phone to solve a composition.

Julian: [existing executive visual base](../../art/staging/cast-scenes/eve-cast-executive-v1.png), visually rechecked; preserve face, age and adult proportions. Its use as a reference does not make the staged portrait a scene asset or put Julian in any location.

For every row: preserve face, hair, age, body proportions, wardrobe/accessories, established marks, setting geography, light and object custody from the last valid beat. No new weather, injuries, biography or surveillance capability. New venue layouts and supporting host/editor/clerk appearances are production designs for review, not established canon. Use physically plausible distance, reach, eye line and floor contact.

### Deterministic wardrobe and custody contract

`src/content/chapter5-continuity.ts` defines these revision-16 wardrobe IDs. Ownership comes from the delivered mission wardrobe, not a new purchase. All looks use black low heels, no added jewellery, the same approved adult face/build and brunette updo. Keep the hairstyle unchanged across a sequence. The shoes are the established executive low heels reused with each assembly, not a new purchase.

| Actual state | Costume ID | Garments / outerwear | Authored change |
|---|---|---|---|
| begin through preparation | `c05.daytime` | Plain charcoal knee-length dress; no outerwear | Opening changes into it **before** unpacking; preparation next day explicitly wears it again |
| presentation=professional | `c05.professional` | Charcoal tailored jacket, ivory blouse, matching trousers | look-professional changes before leaving |
| presentation=glamorous | `c05.glamorous` | Black floor-length evening gown; charcoal tailored jacket worn open | look-glamorous changes before leaving |
| presentation=provocative | `c05.provocative` | Same black gown, open back uncovered; jacket remains in wardrobe | look-provocative changes before leaving; fully clothed |
| presentation=minimal | `c05.minimal` | Same plain charcoal dress; no outerwear | look-minimal deliberately keeps it |

Every Evelynn shot below requires the **actual `c5.wardrobe` at its anchor**, never eventual presentation. S01–S04 and S05 preparation use daytime; S05 selected-result onward uses the matching selected ID. At the end of the Harbour visit she hangs the outfit for morning; S07 explicitly puts the same selected outfit on again. It continues through studio, workspace trips, home, roof or hotel doorway and final home. After a fade, she explicitly dresses in the arrival clothes before departure. There is no illustrated undressing/encounter. No changed anatomy, makeup, jewellery or shoes may be invented during a cut.

Bought blouse stays on its paper-covered hanger at home until place-clothes; bought silver **hair clasp** stays boxed until place-clasp and is never worn. Personal phone remains boxed on the home table until place-phone. All chapter communications use the carried Axiom phone; public pages are digital. No physical magazine is created. Adrian's old jacket is separate from Evelynn's tailored jacket: one old jacket remains on a hanger **inside the wardrobe**, including the final straightening action. No jacket on an exterior hook.

Voucher: physical $600 Helix voucher, only if earned and still unredeemed. Folder at opening → bag on go-spend → accounts clerk stamps and retains on redemption, returning cash/receipt. If not redeemed, bag → folder on return home at 14:00. Private packet and municipal pass stay home. All conditional objects are omitted from incompatible branches; the camera may omit off-frame holdings rather than require every combination in one raster.

Any incompatible wardrobe, participant, venue or visible object state requires a distinct asset variant or omission of that detail from the shared frame. The stable shot ID names the beat. The production asset ID must additionally identify the exact approved variant; no wildcard that matches contrary branches. Dialogue changes within a shot do not require variant images.

## 01 — What you brought home

Source: reward `home`, `rewardBlocks5`, `inspect-*`, `go-spend`. Location/time: canonical apartment, collection day 10:30. E alone; daytime wardrobe after the authored opening change. Never show J, Maya or another caller physically here.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s01.shot01 | `begin`: “reader card goes beside the packet” | Authenticated Chapter 4 completion and actual arrival | E at cleared table, bag, issued pass and permitted packet. No restricted annex or new spending | M: daytime table composition within the established wide; no unseen room extension |
| c05.s01.shot06-receipts | “put the settled receipts in order” | Cash > 0; exclude no-cash route | Receipt only for actually settled funds. V remains separate and unstamped if still outstanding | M/U: exact money/voucher variants |
| c05.s01.shot07-expired | “file it behind the permanent reader pass” | `c4.favor=accept`; slip expired | Slip filed behind the existing pass, not a valid new booking | M: important filing result |
| c05.s01.shot02-packet | `inspect-packet`: permitted copies together | Completed inspection; disputed extra copy only if `c4.method=exploit` | Open packet, assessment/source labels. Disputed copy apart with denial; no invented annex | M/U: ordinary versus disputed contents |
| c05.s01.shot03-receipts | `inspect-receipts` | V / settled cash / neither use distinct contents | V has no stamp; cash route has settled receipt; no-cash route only the reader card | M/U; reuse same framing only with truthful contents |
| c05.s01.shot04-threads | `inspect-messages`: open message | Selected review, no new delivery | E and device; received threads only. Unresolved calls/review remain unresolved; memory of intimacy is not a flashback image | M/U: historical thread rendering, no caller portrait required |
| HOLD last valid shot | Thoughts, inspection text, remaining menu | No new action | Same positions; old personal outcomes do not authorize a new visitor/contact | None |
| c05.s01.shot05 | `go-spend`: “close the folder before going out” | Action chosen | Closed private folder remains home; E has bag. Outstanding voucher explicitly moves to bag; private packet and reader pass stay in folder | M: departure with correct carried contents |

No-cash opening goes directly from shot01 to a valid inspection or departure. Sorting receipts does not invent cash. Subsequent optional inspections retain the results of earlier ones rather than resetting the table.

## 02 — Spend it

Source: reward `spend`, `redeem-voucher`, `buy-*`, `spend-save/nothing`. Location/time: street/shops 11:30–13:00, accounts only on redemption. E plus the functional clerk/assistant where authored. Same daytime outfit; no P yet.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s02.shot01 | Street window opening | Arrival; no purchase yet | E on pavement looking at shop display; displayed blouse/clasp belong to shop | M: street and window layout |
| c05.s02.shot02-accounts | Redeem: “clerk stamps it and counts out the cash” | V before action; `voucher-redeemed` afterward | E and accounts clerk at counter; same voucher stamped and retained by clerk; $600/receipt handed to E once | M: counter with voucher arriving from bag |
| c05.s02.shot03-return | “Back on the shopping street” | Redemption completed | E on same street, receipt put away separately; no second voucher | M: return pose, exact custody |
| c05.s02.shot04-phone | `buy-phone`: boxed phone into bag | Pre-action cash ≥120; purchase=phone after action | E at shop, one new boxed device; existing Axiom handset remains distinct, no assertion of privacy | M: counter/box/hand contact |
| c05.s02.shot05-blouse | `buy-wardrobe`: hold blouse against body, buy on hanger | Cash ≥80; purchase=wardrobe | E/assistant, one unworn blouse held against body then retained on its paper-covered hanger | M: single purchase/handover result; no dressing-room change |
| c05.s02.shot06-clasp | `buy-accessory`: fastening tested in palm | Cash ≥45; purchase=accessory | Single silver hair clasp in palm, never in hair or attached to clothing | M: simple silver hair-clasp design, palm-scale inspection |
| c05.s02.shot08-clasp-box | Ask for box; later owned clasp boxed | Same purchase; reaches packaging result | Same clasp now in box, no duplicate still fastened | M: packaging result; no gift giver |
| c05.s02.shot07-lunch | `buy-dinner` (internal ID): good table **at lunch** | Cash ≥60; purchase=dinner | E alone at daytime restaurant table, food; no business/intimate guest | M: restaurant location; hold meal micro-gestures |
| c05.s02.shot09 | `spend-save` or `spend-nothing`: leave window | No purchase | E continues down street, no new bag contents invented | M: changed position |
| HOLD chosen shop/meal shot | Routine glances, dialogue, payment text after result | Same arrangement | No frame per price, smile or sip | None |

Exit to scene03 is a new apartment location. Do not invent a car, driver, lift or unmentioned transit scene. Exactly one purchase; any redemption receipt remains historical after spending.

## 03 — The echo

Source: reward `echo`, `echo-link/intro/listing`. E physically alone at home, 14:00; Aster editor remote in correspondence only.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s03.shot01 | Apartment bulletin opened | Actual return/home node | E with reader bulletin, public arts/editorial listing; private packet not attached | M: afternoon apartment hold; U: bulletin |
| c05.s03.shot02-link | Existing event link sent; editor opens it | Actual old `public-association` record, completed echo-link | Same home composition; exact existing public caption/image in correspondence. No new Chapter 5 photo | U: sourced link/reply; no physical editor |
| c05.s03.shot03-intro | Professional introduction delivered | echo=introduction | Remote reply, no private files, no employer representation | U: exact selected message; shared base allowed |
| c05.s03.shot04-listing | Public programme saved locally | echo=listing | Saved programme only, no editor discovery or personalized response | U: saved listing; hold E's position |
| HOLD | Editor reply or silent reading | No physical change | Significant remote entry updates communication state once; dialogue thereafter holds | None |

Screens are sourced artifacts, not painted assertions of recipient knowledge. Typographic content should come from the authored records during production, not hallucinated generation text.

## 04 — An invitation that is not a mission

Source: reward `invitation`, `invitation-attend/decline`. Same apartment, 15:00; E alone. An invitation is not attendance.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s04.shot01 | Invitation/reply form becomes current | Completed preceding echo | Home device/document: tomorrow's preview and salon alternative. No venue arrival or picture of E there | U: invitation state over compatible scene03 base |
| HOLD shot01 | Choice menu | No event selected | Keep current artwork | None |
| c05.s04.shot02-preview | Confirmation and calendar entry | `c5.event=attend` | 18:30 preview, supper menu; no image-use permission | U: accepted registration/calendar |
| c05.s04.shot03-salon | Salon confirmation received | `c5.event=decline` | 15:00 salon near courtyard; preview remains declined | U: alternate registration, no evening attendance |

Fifteen o'clock alone does not require a new painted room if light is unchanged; the significant document update is sufficient. Next scene is the following day and uses its own lighting.

## 05 — Dress for yourself

Source: public `presentation`, `look-*`. E alone at canonical dresser/wardrobe; invitation is digital on Axiom phone. 17:00 for A, 14:00 for R. Existing mirror is not a new floor plan.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s05.shot01 | Axiom phone set on dresser with invitation open; preparation | Next day, before look choice | Daytime outfit, owned wardrobe. No selected look predicted while menu is open | M: daytime outfit within established wardrobe angle |
| c05.s05.shot02-professional | Completed look-professional | P=professional | E in approved assembly of owned tailored pieces, same adult face/proportions | M: c05.professional costume sheet and shot |
| c05.s05.shot03-glamorous | Completed look-glamorous | P=glamorous | Approved owned evening presentation, no automatic earrings/clutch from unrelated gala | M: c05.glamorous costume sheet and shot |
| c05.s05.shot04-provocative | Completed look-provocative | P=provocative | Fully clothed deliberate styling; no implied sexual willingness or action | M: c05.provocative costume sheet and shot |
| c05.s05.shot05-minimal | Completed look-minimal | P=minimal | Familiar plain owned pieces; not automatically tactical clothing | M: c05.minimal costume sheet and shot |
| HOLD selected shot | Appearance thoughts | Same arrangement | Preserve face, garment count and realistic arm reach; no duplicate chosen outfit hanging beside E | None |

These four beats precede Harbour arrival within the action's prose sequence even though the reducer advances to `room` immediately. A scene-node-only selector would skip them. Purchased blouse/clasp appearance is a separate costume decision, not permission supplied by purchase alone.

## 06 — The room wants Evelynn

The complete **Canonical Harbour sequence — final specification** below replaces the earlier blocked movement table. It includes every field, all optional attention orders, and new return/wait/departure beats. Stable IDs are retained; the old terrace ID remains retired. No table below can override that final sequence.

## 07 — The public offer and proof

Source: public `offer`, all concept/negotiation actions, `offer-accept/decline`, `proof`, `publish/withhold`. Home 10:00, optional studio sitting, proof table 13:30. E alone at home with editor remote; E/editor physically together only at studio. No picture should reveal publication merely because a fee was agreed.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s07.shot01 | Next morning brief opened at home | room exited; actual next day | E/device, written offer, no physical editor or accepted contract yet | M/U: morning home, brief |
| HOLD shot01 | concept-professional/glamorous/provocative/private; all five negotiations; refusal | Proposal only; no studio on decline | Same home/remote arrangement. Update exact terms through authored text, not a fresh portrait for each price/name choice | U: term text, no extra raster |
| c05.s07.shot02-contract | offer-accept confirms sitting terms | offer=accepted, exact concept/fee/name/image scope | Accepted agreement on same device; publication still withheld | U: exact agreement, no invented pen signature |
| c05.s07.shot03-arrival | “travel to the studio”; editor reads scope | Accepted work and actual arrival | E/editor, new studio geography, prior selected wardrobe ID as source specifies | M: studio establishing composition |
| c05.s07.shot04-sitting | Two-hour agreed sitting | Accepted concept, image-use not none | E in agreed fully clothed presentation, editor, agreed work setup; no nudity or public page | M: concept/P composition variants |
| c05.s07.shot04-text | Accepted text-only work | image-use=none | Interview/work without an authorized publishable portrait; no visible portrait in proof | M: text-only sitting, shared studio geography |
| c05.s07.shot05-proof | Finished public sitting at separate proof table | concept !=private, image-use !=none; no publish yet | E/editor at table away from camera; exact draft caption/portrait, pencil | M/U: private draft layout, P/name variants |
| c05.s07.shot06-private | Completed private sitting | concept=private | Private research materials only; no issue prepared | M/U: private proof/payment status |
| c05.s07.shot07-text | Text-only proof reviewed | image-use=none; private/public status from concept | Empty image area, exact authored text; no phantom portrait | M/U: text-only proof |
| HOLD selected proof | Publication menu | No release yet | Keep draft composition | None |
| c05.s07.shot08-public | publish: editor sends live link/settled receipt | Non-private concept; explicit publish action | Approved live issue and actual paid amount; E. Vale only if chosen; text-only stays text-only | U: exact public artifact, no ad reuse |
| HOLD proof | withhold response | publication-withheld; no public artifact | Editor's answer holds composition; private fee only for completed private contract | U if receipt shown; no public-use fee |
| c05.s07.shot09-withheld | “collect your copy of the agreement before leaving” | Withhold chosen, agreement actually collected | E retains agreement and prepares to leave; no issue/image rights transfer | M: collection/departure result |

Decline goes from the home hold to scene08 at home; do not insert studio footage. After completed work, scene08 establishes return. Contractually permitted portrait/name variants must match the reviewed draft, not a separately generated attractive substitute. Private concept plus text-only must also remain unpublished.

## 08 — A little easier

Source: benefit `infrastructure`, `service-*`. E home at 15:00; J by voice if eligible; booking staff at the actually visited desk. Do not draw a private office merely because access was booked.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s08.shot01 | “By three, you are at home” | Actual home state regardless of Aster acceptance | E and cramped table/papers. Moving meal is hypothetical; do not show it already relocated | M: afternoon home; truthful paid/public props |
| c05.s08.shot02-call | service-julian: current problem disclosed; J helps | J-access and completed choice | E on voice call, J offscreen; no invented videofeed or J in apartment | M/U: voice medium; hold while J changes his booking |
| c05.s08.shot03-desk | “visit the desk to collect the booking card” | service=julian; actual visit/collection | E and desk staff; seven-day Helix card transferred to E. No private files transferred | M: collection counter, functional staff |
| c05.s08.shot04-home | “then return home” | Same choice reaches return | E home holding/retaining correct confirmation; reader pass still owned | M: return composition, no J |
| c05.s08.shot05-counter | service-self: pay public rate at counter | Cash ≥60 beforehand; service=self | E at Harbour counter, receipt/card received; no Helix sponsorship | M: Harbour service counter |
| c05.s08.shot06-home | “take them home” | Paid collection completed | E home with personally paid receipt/card | M: return/custody variant |
| c05.s08.shot07-request | service-municipal: request public desk | Chosen municipal service | Explicit municipal booking page on Axiom phone at home; no trip or occupied new office | U: authored online request and confirmation |
| c05.s08.shot08-table | service-axiom: two shallow piles, clear place to eat | Home/inconvenience chosen | E at same table; papers actually rearranged, housing unchanged | M: important resulting table arrangement |

Missing workroom **interior** art is not automatically required: current prose depicts booking/collection, not E entering/using that room. Commission it only if a later authored beat genuinely needs it. No evidence that J can inspect files or that the home is no longer monitored is created by any shot.

## 09 — The price is not money

Source: benefit `terms`, `terms-accept/narrow/backup/pay/refuse`. E alone at home 16:00; office/coordinator communication. Provider=Helix only when service=julian, otherwise Harbour. No professional visitor physically enters.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s09.shot01 | Written extension/cancellation line reviewed | Scene entry; no acceptance yet | E and written terms, actual provider; no accepted calendar windows | U: offer/provider version over valid home base |
| HOLD shot01 | Coordinator dialogue, negotiation, refusal | Same physical arrangement | No image change merely for another speaker/price; refusal keeps original terms | None |
| c05.s09.shot02-two-calls | terms-accept enters exact calendar | Accepted 28 days/two calls | +7/+14 from offer date, 10–11; extension starts after current seven-day booking or tomorrow as stored | U: truthful calendar, not already completed calls |
| c05.s09.shot03-one-call | terms-narrow enters calendar | Accepted 7 days/one call | +7, 10–11 only; same provider/start rules | U: one-call variant |
| c05.s09.shot04-backup | Public hours placed beside booking | terms=backup | Accepted two windows plus retained municipal alternative | M/U: important document placement |
| c05.s09.shot05-paid | terms-pay pays own room rate | Cash ≥60; terms=self-funded | Online Harbour payment at home, digital receipt on Axiom phone; no feedback calls/exclusivity | U: receipt, no invented trip back to counter |

Exact rates/windows belong in authored UI text. Keep nominal tomorrow versus after-booking start separate; no ticking-down visual inventing elapsed days. `c05.s09.shot06-refused` stays retired.

## 10 — People who knew Adrian

Source: benefit `people`, `message-*`, `people-finish`. Home 18:00–19:00. E alone; all four counterparts are in message threads, not video or physical visitors. Max two distinct disclosures; retain selected order.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s10.shot01-tea | Tea prepared before opening threads | Scene entry, later lighting | E in existing kitchenette area, ordinary cup. No important gift or new kitchen | M: crop of established cabinet/counter; no unseen sink layout |
| c05.s10.shot02-threads | Familiar threads opened | Actual transition to reading | E/device/cup at supported location; not all messages already sent | M/U: home communications base |
| c05.s10.shot03-maya | Selected Maya message/reply | message-maya; max-two gate | Exact chosen publication link, phone fact, or retained-pass fact. Identity-aware wording only where Maya knows. No Maya physical image | U: actual thread and, only after sourced opening, public link |
| c05.s10.shot04-sloane | Selected workspace disclosure/reply | message-sloane | Initial workspace description only; no unseen calendar, private fees or intimacy revealed | U: exact thread |
| c05.s10.shot05-sender | Selected sender thread | `c3.rook-window=offered`; message-sender | Unknown identity preserved; old false claim only if existing misdirection. No portrait, name reveal or video channel | U: anonymous thread |
| c05.s10.shot06-voss | Selected qualification request/reply | Existing `c3.qualification`; message-voss | Formal-review state remains pending if formal; no new examination or body change | U: exact medical/admin scope |
| HOLD selected thread | Replies, silence, finishing tea | No new significant participant | Same posture and cup; unselected thread is not shown as delivered | None |

A new significant message participant warrants the appropriate communication state, not a new room illustration. Keep already sent history accurate when selecting the second counterpart. `c05.s10.shot07` remains retired; a final sip does not need a cut.

## 11 — Wanting something; optional private time

Source: desire `want`, `handoff`, `want-*`, all desire/motive/consent/withdraw/fade actions. Home 20:00; optional music 20:30–21:30 (or negotiated twenty minutes); optional hotel doorway 20:30. Never use clothing, paid help or prior Chapter 4 authorization as current consent.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s11.shot01 | Guest card considered on table | Actual guest-hour consideration, no trip chosen | E alone at home; roof photo stays visibly **on card**, not full-screen arrival | M/U: card placed, no imaginary guest visit |
| HOLD shot01 | want-salon consideration, private desire/motive selections | No movement/acceptance yet | Same home frame; no romantic pose or trip predicted | None |
| c05.s11.shot02 | want-julian: new request and reply | J-mutual and completed request | E/device, remote J, scope still unset | U: fresh invitation state |
| c05.s11.shot06-home | want-none / no-interest / uncertain card/device put aside where actually authored | Corresponding refusal/deferral actually selected | E home, no booking. A purely verbal refusal without object action holds prior frame | M only for stated object result; otherwise HOLD |
| c05.s11.shot03-card | Salon accepted: “take the guest card” | target=salon and desire-personal/instrumental/mixed | Card in E's custody for outing; private motive not visually diagnosed | M: important card pickup/departure |
| c05.s11.shot04-roof | Arrive and listen for hour | Selected full salon hour, went-out | E with musicians/other guests at rooftop, card used; no J invented | M: rooftop/night continuity, current wardrobe |
| c05.s11.shot04-short | Negotiated twenty-minute attendance | target=salon; desire-negotiate | Same truthful rooftop setting, shorter visit; may reuse full-hour composition if contents/time fit | M or reviewed shared asset |
| c05.s11.shot05-leave | Leave when musicians set instruments down | Full-hour visit completed | E departing, end of set | M: leaving result, no future booking |
| c05.s11.shot05-short | Leave after agreed twenty minutes | Short visit completed | E departs; do not falsely end the musicians' full set | M: distinct active-set background if visible |
| c05.s11.shot13-call | Phone-only negotiation or flirt-only call | target=julian; chosen conversation-only scope | E at home with phone; J voice only. Hold speakers/flirtation | M/U: voice-call state, never hotel |
| c05.s11.shot08-door | Authorized journey reaches hotel doorway | Fresh granted authorization, willing, adult participants, J-mutual, exact scope; arrival beat reached | E/J apart at door, fully clothed, no encounter happened. No blocking exit or intimate touch | M: new hotel doorway/layout, wardrobe continuity |
| HOLD shot08-door | Handoff menu | Authorization does not mean completed encounter | Maintain distance; no preview of fade outcome | None |
| c05.s11.shot09-withdraw | “collect your things”; way to door clear | withdraw; authorization=revoked, intimacy=withdrawn | E retrieves belongings, clear exit, J gives space; no intimate aftermath | M: changed position, no clothes removal implied |
| c05.s11.shot10-no-sex | Explicit fade within no-sex boundary | Chosen fade; planned outcome physical-without-sex | Fade from valid doorway frame to black; no invented kiss/posture or new encounter artwork | FX, zero encounter rasters |
| c05.s11.shot11-encounter | Explicit off-page fade | Chosen fade; sex scope; actual voluntary/instrumental/mixed outcome | Same fade-only presentation; no graphic activity, nudity, coercion or inferred romantic meaning | FX, zero encounter rasters |
| c05.s11.shot12-goodnight | “Later, you say goodnight and take your things” | Completed fade outcome, not withdrawal | Non-graphic departure, personal belongings retained; no aftermath pose that implies extra acts | M: reuse doorway geography for departure, established clothing explicitly restored |

`c05.s11.shot07-journey` stays **reserved / no generation**: travel is summarized without a specified vehicle or intermediate visible location. Cut to authored arrival instead of inventing car/lobby art. The current [AdultSceneSpec](../../src/narrative/adult-scenes/chapter5.ts) permits only fade-to-black. A request to illustrate particular physical acts would exceed this shot plan and current authored beats.

If current J permission is revoked, invalidate all later encounter images immediately; old mutual interest cannot rescue them. A scope field set to conversation-only on the salon negotiation does not imply a J interaction—the target must also match.

## 12 — The life she built; complete

Source: desire `return`, `desireBlocks5`, `place-*`, `complete`. Same apartment 22:30–22:35. E alone. Home furniture remains fixed while actual holdings vary.

| Stable shot / hold | Authored trigger | Required state / exclusions | Composition and custody | Missing requirement |
|---|---|---|---|---|
| c05.s12.shot01-return | Own return from actual outing | went-out=yes; actual return | E back in canonical room, same possessions; no J follows her | M: night return, correct wardrobe |
| c05.s12.shot02-stay | Stayed home; cup rinsed/replaced | No went-out | E at established counter, cup returned. No false arrival or second cup close-up | M: established wide/counter at night, sink outside frame |
| c05.s12.shot04-holdings | Earned objects become the current focus | Actual corresponding records only | One optional purchase: boxed phone / paper-covered blouse / boxed clasp / no new item. Actual issue/booking/voucher only | M/U: prop-state variants; may share preceding wide if fully truthful |
| HOLD current home shot | Remaining cash/services reflection; final menu | No final action chosen | No proposed placement or altered jacket yet | None |
| c05.s12.shot05-phone | place-phone completed | purchase=phone, placement=phone | New personal phone beside Axiom handset on table: exactly two, correct identities | APPROVED production: C5-S12-SHOT05-PHONE-COMPOSITE-V2 for professional / editorial-declined / no issue-photo-new-evening only; other states pending. See Chapter 5 coverage. |
| c05.s12.shot06-clothes | place-clothes: paper cover off, blouse on rail | purchase=wardrobe, placement=clothes | Same one blouse now hanging; no second blouse still packaged | M: wardrobe reach/perspective |
| c05.s12.shot07-clasp | place-clasp outside box on dresser | purchase=accessory, placement=clasp | Same clasp; out of its box, never worn | M: same silver hair clasp as purchase, no second clasp |
| c05.s12.shot08-visible | Leave approved issue open | published=yes, placement=visible | Exact public issue remains open; if already visible, HOLD current valid frame rather than unnecessary cut | U/HOLD: name/image rights must match |
| c05.s12.shot09-private | Close public issue and put device away | published=yes, placement=private | Device put away; publication still exists, no false deletion | M: object action/result |
| c05.s12.shot10-photo | Close programme photograph | event-photo=yes, placement=photo | Close local page; do not depict revocation of public authorization | U: exact page state; no new photo |
| c05.s12.shot11-jacket | Straighten old jacket on hanger inside wardrobe | placement=jacket | One existing jacket, no disposal/replacement or identity verdict | M: existing wardrobe reach, one old jacket on hanger |
| c05.s12.shot12-unchanged | Loose papers put away | placement=unchanged | Papers stored, furnishings unchanged; this still has an authored important object action | M: resulting table/storage state |
| HOLD selected final shot | complete: “leave it that way” | Actual completed placement | Preserve result, no extra epilogue pose, location or Chapter 6 event | None |

Holdings overlays must honor `service=julian/self`, outstanding V, exact obligation-count/start/provider, public issue, event photograph and current cash independently. These are not a single route label. Do not make a banknote pile merely because a balance is recorded. No money-meter art. Where an optional object is outside the frame, omit it rather than forcing a combinatorial display of every historical object.

## Historical audit findings — before the final pass

| ID / flag | Evidence | Treatment in this review plan |
|---|---|---|
| F01 `FUTURE_STATE_VISUAL` | `applyChapter5Choice` commits a full action, then next node; `ClinicConversation` shows multiple blocks together | Production timing prerequisite: a future reviewed presentation layer must associate each shot with reached prose beats, not just final flags. No runtime changes here |
| F02 `LOCATION_CONTINUITY_MISMATCH` | Coffee ends outside entrance; second attention action and leave may require indoor host/table | Block coffee-outgoing compositions; reserve proposed transition without adding canon. Review specific order/blocking before generation |
| F03 `OBJECT_CUSTODY_MISMATCH` | Home voucher sits in folder; go-spend leaves private records home; later redemption takes voucher to accounts without an explicit carry beat | Do not show voucher both left home and at accounts. Proposed clarification: take only outstanding voucher before closing folder. Not applied; affected departure/redemption composition pending owner review |
| F04 `WARDROBE_MISMATCH` | `c5.presentation` records style direction, not garment IDs or next-day changes | Costume-sheet approval required. Existing mission outfits are references only; do not infer purchase was worn |
| F05 `OBJECT_CUSTODY_MISMATCH` / `LOCATION_CONTINUITY_MISMATCH` | Current final action says jacket on hook; older apartment register says wardrobe and warns against second jacket | Preserve current prose, block jacket-focused production until exact one-jacket location is reconciled. No relocation drawn as historical fact |
| F06 `MOVEMENT_WITHOUT_SHOT` | Earlier summary lacked separate actual receipts/slip filing and some ordered remote/custody states | Requirements now explicitly mapped; assets remain missing |
| F07 `SHOT_WITHOUT_TRIGGER` | Journey could imply unmentioned transport; standard contract acceptance is not a pen-signing scene; routine sip/refusal do not move bodies | Reserve journey without raster, use exact screen state for agreement, hold gestures/dialogue |
| F08 `INTIMACY_STATE_MISMATCH` | Earlier “private-time” asset family could be read as permission for depicted encounter poses | Current plan uses only valid doorway, withdrawal, fade and non-graphic departure. No new sexual-act art |
| F09 `LOCATION_CONTINUITY_MISMATCH` | Municipal desk request and independent extension payment do not describe actual trips | Use reviewed communication/document state, not a invented office/counter visit; precise municipal request medium remains B |

These record the original audit, before the corrections below. They are retained for provenance and are superseded by the dated resolution register. Missing images are not certified by narrative tests.

## Missing-art inventory and economical production order

| Requirement | Existing support | Still missing / review prerequisite |
|---|---|---|
| Evelynn/J recognizability | Canonical Evelynn portraits and existing approved J base | Consistent scene compositions; no new biography or age |
| Apartment | Six owner-authorized earlier scene images, reference geography | Chapter 5 daytime/afternoon/night angles with correct wardrobe/props; use established wide/crops; no new sink geography; old jacket inside wardrobe |
| Four self-selected looks | Owned wardrobe mapped to exact revision-16 IDs; earlier outfit references | Four exact costume assemblies in the contract above; candidate sheets still require image review |
| Street/retail/accounts/lunch | Authored locations; no matched Chapter 5 production asset identified | Coherent new backgrounds/counter compositions, voucher/box/hanger/clasp custody |
| Harbour preview/salon/entrance | Authored time/venue distinctions | Layout and supporting cast, four-look variants where E is visible, action-order blocking |
| Aster studio/proof | Authored studio/table and separate terms | Studio geography, accepted-concept/text-only/private variants; exact authored page overlays |
| Workspace collection | Authored Helix desk/Harbour counter visits | Collection/return shots; do not commission unused workroom interiors |
| Communications/contracts | Existing UI text/records; no Chapter 5 shot bindings | Reviewed exact screen states over reusable held home bases, anonymous sender convention |
| Rooftop guest hour | Authored guest card, stage, music and departure | New location, full-hour versus early-leave continuity, no implied J |
| Hotel branch | J base, explicit current scope, fade-only adapter | Doorway/clear exit/non-graphic departure; no encounter raster required |
| Final home actions | Same home and actual flags | Purchased-object and page variants; exact final result without route/identity verdict |

Review in this order: (1) use the resolved wardrobe/apartment and Harbour specifications; (2) approve shared environment/costume references; (3) prepare a small priced pilot for a selected unblocked scene; (4) review candidates against this map and source; (5) only after explicit owner approval consider production binding with beat-level timing and branch playback checks. **No batch or credit quote is implied by this plan.** Total image count is deliberately not equated with table rows: holds, UI states, fade effects, reuse and incompatible variants must first be resolved.

## Stable-ID register and review status

Retired, never reused: `c05.s06.shot08-terrace`, `c05.s09.shot06-refused`, `c05.s10.shot07`, `c05.s12.shot03-cup`. Activated by the final pass: `c05.s06.shot13-return`, following the newly explicit return. Added `c05.s06.shot14-wait` and `c05.s06.shot15-departed` for E waiting alone and J leaving; no existing IDs renumbered. Reserved journey without additional raster: `c05.s11.shot07-journey`. Existing other beat IDs retain their meanings; added IDs extend the register without renumbering. Every active ID above is a planning identifier, not a catalog asset approval.

Authoring review completed for all twelve movements: opening established; dialogue/menu holds marked; meaningful action and location changes mapped; unnecessary cuts identified; future-state hazards recorded; branch/character/prop continuity conditions specified; missing assets distinguished from missing beats. Exact supporting design, owner plan review, candidate image review and runtime playback remain separate pending stages. No image was generated, edited or promoted for this audit.

Final validation is recorded in the [pre-freeze report](../story/CHAPTER_5_FINAL_PROSE_LOGIC_ART_PASS.md). It includes frozen authentication, full unit/browser suites, deterministic wardrobe/custody routes and all 448 ordered Harbour attention combinations. This remains a specification review; no unseen candidate image has passed manual image review.

## Final-pass resolution register — 2026-09-17

| Historical finding | Resolution |
|---|---|
| F01 | Ordered prose-anchor timing contract fixed; current runtime binds no art. Future implementation must use event-time snapshots and reached anchors, never eventual flags. No generation or premature binding in this pass. |
| F02 | Every attention action starts from the programme table. Host/observe walk returns; coffee includes E's exit/wait, J's arrival, J's departure and E's return before the next menu. Both event times and all four looks tested. |
| F03 | Voucher transfer out of folder and bag-to-accounts custody now authored; clerk retains redeemed original; unredeemed original returns home. |
| F04 | Exact wardrobe assemblies keyed by selected presentation; opening/next-day/restoration changes authored. Purchases never silently worn. |
| F05 | Old jacket remains on wardrobe hanger; final action straightens it there. Earlier chapters and apartment geography unchanged. |
| F06 | Retain receipts/filing/object-state IDs. Add opening dressed result and final photo-review state below. |
| F07 | Retired cuts remain retired; generic journey stays no-image. Dialogue/menus remain holds. |
| F08 | AdultSceneSpec location corrected to hotel beside Helix. Doorway/fade/clear-exit only; no pose depicting encounter. |
| F09 | Municipal request and additional independent payment explicitly online on Axiom phone at home. No invented counter trip. |

## Canonical Harbour sequence — final specification

Common context: following day, preview 18:30–19:15 or reading salon 15:00–15:45. Two distinct optional attention actions, each no more than a short stop/ten-minute conversation; leave earlier is valid. At the programme table E has her Axiom phone and programme/guest card in bag; private records, voucher and purchased item remain home. Costume is **exact** `c5.wardrobe` from the selected four-way map throughout. Host, editor and visitors are venue occupants; the characters column identifies the active framed group, not a claim that off-frame guests disappeared. J is absent unless the coffee arrival anchor is reached. No other movement introduces him.

| Shot ID | Exact trigger / branch | Location / positions / characters | Props / description |
|---|---|---|---|
| c05.s06.shot01-preview | look-* completed; event=attend; arrival at 18:30 reached | Inside entrance, programme table, E and host | Checked name, programme with tomorrow's guest card; editor at table end |
| c05.s06.shot02-salon | look-* completed; event=decline; arrival at 15:00 reached | Same functional programme position, courtyard salon variant, E and host | Same issued programme/card; no preview supper staged |
| c05.s06.shot03-editor | attention-network/status; explicit introduction/address request | E/editor at programme table; host remains nearby/off-frame | No case papers; reply holds |
| c05.s06.shot04-host | attention-conversation, follow host completed | Near-wall painting, E/host side by side at viewing distance | Painting; conversation holds ten minutes |
| c05.s06.shot11-observe | attention-observe, reaches work | Near-wall work, E viewing alone | No secret evidence; looking holds |
| c05.s06.shot13-return | after conversation/observe OR coffee, authored return reached | Programme table, E/host again | Same wardrobe and carried possessions; source-position variant/crop may reuse reviewed arrival base |
| HOLD | attention-enjoy | Current valid table composition | No extra admirer or pose |
| c05.s06.shot05-photo | attention-photo, photographer joins/camera review reached | Programme table, E/photographer with host nearby | Unpublished camera frame in the exact chosen clothes; no public page yet |
| c05.s06.shot06-page | reviewed frame authorized, photographer leaves, host shows page | Programme table, E/host | Host's tablet shows actual published programme page; photographer no longer in frame |
| c05.s06.shot07-message | attention-coffee; J-access; reply received | Programme table, E; J remote | Axiom phone; no J body |
| c05.s06.shot14-wait | E leaves table and waits outside | Outside entrance, E alone | Courtesy coffee; no J yet |
| c05.s06.shot12-entrance | J arrives without assistant | Outside entrance, E/J at conversational distance | Coffee; ten-minute dialogue hold, no touch |
| c05.s06.shot15-departed | J says goodbye and leaves | Outside entrance, E alone | J absent; then shot13-return after E re-enters |
| c05.s06.shot09-thread | attention-flirt; J-access; actual reply | Programme table, E; J remote | Axiom phone, mutual interest only; holds dialogue |
| c05.s06.shot10 | leave-room chosen, thank host then exit | Harbour exit, E leaving | Programme/card carried home, no J accompanying |

The subsequent home arrival is summarized before the next morning scene; use `c05.s06.shot16-home` for programme/card placed at home, and `c05.s06.shot17-hung` for selected outfit hung for morning. For shot17 crop **only the hanging wardrobe**, not an invented nightwear costume/body. These new object-result beats have no predecessor IDs to renumber. If transit is not separately described, cut directly between authored endpoints; do not invent a vehicle, stairwell or corridor.

## Additional resolved object/time beats

- `c05.s01.shot08-change`: opening change completed, E in c05.daytime beside existing wardrobe, prior clothes hung. This occurs before shot01 packet/pass unpacking. Do not illustrate the incoming Chapter 4 outfit or undressing.
- `c05.s02.shot10-home`: purchase/no-purchase action reaches “At home by two”/“By two”; E home, new object and receipt on table only if purchased; lunch has receipt only. Outstanding voucher returned to folder. Continue to scene03 bulletin without a new room design.
- `c05.s07.shot10-depart`: after public issue/withheld agreement, collect agreement and leave studio. Arrival home uses s08.shot01. Declined work omits every studio shot.
- `c05.s12.shot13-photo-review`: place-photo action opens programme image on Axiom phone before shot10 closes it; required prior event-photo=yes. The optional page is never pre-opened merely because a menu offers this action.
- No newly visible sink is required for tea/cup actions: use existing wide/cabinet crop after the routine gesture. No new furniture or unsupported reverse angle is required.

Every active row is SPEC / MISSING ASSET. Exact screen text should be typeset from authored records; no generated text may create knowledge, permissions or payments. Manual Art Bible review and explicit owner approval remain required after future generation. READY FOR ART PRODUCTION means the story/shot specification is coherent, not that images are present or approved.


## Current audit implementation — revision17 presentation update

The current authority/status index is [CURRENT_AUTHORITY_INDEX.md](CURRENT_AUTHORITY_INDEX.md). It supersedes older “runtime binding0/no binding” status statements, not their historical receipts or approvals. Three already approved exact variants are now bound by the reading presenter. No new promotion or generation. Full coverage remains 3/100 indexed raster/artifact beats and is not all-branch coverage. Pilot spend remains14 credits; this audit spends0.

Coffee sequence follows the authenticated prose: message → Evelynn waits alone with coffee → Julian arrives / dialogue hold → Julian leaves → Evelynn returns. The shorthand sequence in the implementation request does not authorize rewriting that established chronology or adding another wait. On return and any subsequent table/editor/photo beat, acquired coffee remains in Evelynn’s custody, carried or explicitly off-frame. No disposal, consumption, new cup or Julian-held coffee is inferred. Shot14 remains an unapproved reuse candidate; the departed image is not silently reused there. Retired and reserved IDs are unchanged.
