# Chapter 5 coverage audit —2026-09-17

**Historical raw-index snapshot.** The current production-planning metric, dialogue-hold ledger, deduplicated requirements and next wave are in [CHAPTER_5_TRUE_ART_BACKLOG.md](CHAPTER_5_TRUE_ART_BACKLOG.md). Revision17 is committed/pushed at `198feada20cc15aa47d6e64f37149079efe187a4`; the uncommitted status below describes the earlier review. The JSON snapshot remains unchanged for existing provenance/regression checks. Do not use its raw 3/100 as the primary art-production metric.

Audited pushed baseline7c91a242; this implementation is an uncommitted revision17 diff. 3/100 raster/artifact beat IDs have at least one approved variant (3.0%). This is **not full-branch completion**; runtime-bound exact variants **3** (presentation for authenticated revision16/17, branch guarded). 3 reserved/fade IDs need no raster. Retired IDs and dialogue holds are excluded.

Production approvals remain exact branch/shot only. Staging environment/wardrobe references do not count as completed character scenes. One image can serve multiple IDs only after exact-state reuse review.

## Priority and wave boundary

Wave A: Aster arrival professional composition (c05.s07.shot03-arrival), editor reads scope before sitting. Existing approved studio reused unchanged; generate only missing people. This establishes scene scale/positions and editor visual design for review. Stop after review; no automatic promotion.

Next HIGH: Aster sitting/proof with rights-correct digital artifact; daytime/minimal presentation (covers opening + minimal route); Harbour host/table/return/photo; home communications; material final placement variants. Glamorous/provocative looks only where actual chosen clothing blocks those scenes.

LOW/optional: street return/leave positions after the street master; short-roof departure only when that route is covered. Do not commission dialogue expressions, imagined office interiors, transit, encounter pictures or physical magazines.

## Coverage table

| SHOT ID | SCENE | CURRENT STATUS | ASSET | AUTHORITY SOURCE | MISSING? | PRIORITY | GENERATION TYPE | BRANCH |
|---|---|---|---|---|---|---|---|---|
| c05.s01.shot01 | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Authenticated Chapter 4 completion and actual arrival |
| c05.s01.shot02-packet | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Completed inspection; disputed extra copy only if `c4.method=exploit` |
| c05.s01.shot03-receipts | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | V / settled cash / neither use distinct contents |
| c05.s01.shot04-threads | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Selected review, no new delivery |
| c05.s01.shot05 | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Action chosen |
| c05.s01.shot06-receipts | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Cash > 0; exclude no-cash route |
| c05.s01.shot07-expired | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | `c4.favor=accept`; slip expired |
| c05.s01.shot08-change | chapter5.home | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Daytime; prior incoming clothes hung; no undressing |
| c05.s02.shot01 | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | HIGH | NEW MASTER + CHARACTER/PROP LAYERS | Arrival; no purchase yet |
| c05.s02.shot02-accounts | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | V before action; `voucher-redeemed` afterward |
| c05.s02.shot03-return | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | LOW (derive after master) | NEW MASTER + CHARACTER/PROP LAYERS | Redemption completed |
| c05.s02.shot04-phone | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | Pre-action cash ≥120; purchase=phone after action |
| c05.s02.shot05-blouse | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | Cash ≥80; purchase=wardrobe |
| c05.s02.shot06-clasp | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | Cash ≥45; purchase=accessory |
| c05.s02.shot07-lunch | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | Cash ≥60; purchase=dinner |
| c05.s02.shot08-clasp-box | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | NEW MASTER + CHARACTER/PROP LAYERS | Same purchase; reaches packaging result |
| c05.s02.shot09 | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | LOW (derive after master) | NEW MASTER + CHARACTER/PROP LAYERS | No purchase |
| c05.s02.shot10-home | chapter5.spend | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | One actual purchase/receipt only; unredeemed voucher back in folder |
| c05.s03.shot01 | chapter5.echo | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Actual return/home node |
| c05.s03.shot02-link | chapter5.echo | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Actual old `public-association` record, completed echo-link |
| c05.s03.shot03-intro | chapter5.echo | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | echo=introduction |
| c05.s03.shot04-listing | chapter5.echo | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | echo=listing |
| c05.s04.shot01 | chapter5.invitation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Completed preceding echo |
| c05.s04.shot02-preview | chapter5.invitation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | `c5.event=attend` |
| c05.s04.shot03-salon | chapter5.invitation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | `c5.event=decline` |
| c05.s05.shot01 | chapter5.presentation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Next day, before look choice |
| c05.s05.shot02-professional | chapter5.presentation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | P=professional |
| c05.s05.shot03-glamorous | chapter5.presentation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | P=glamorous |
| c05.s05.shot04-provocative | chapter5.presentation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | P=provocative |
| c05.s05.shot05-minimal | chapter5.presentation | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | P=minimal |
| c05.s06.shot01-preview | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | HIGH | COMPOSITE | look-* completed; event=attend; arrival at 18:30 reached |
| c05.s06.shot02-salon | chapter5.room | BLOCKED | — | Final Harbour sequence + Harbour environment authority | Approved daylight/courtyard variant + cast | HIGH | LIGHTING/LOCATION VARIANT + COMPOSITE | look-* completed; event=decline; arrival at 15:00 reached |
| c05.s06.shot03-editor | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | attention-network/status; explicit introduction/address request |
| c05.s06.shot04-host | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | attention-conversation, follow host completed |
| c05.s06.shot05-photo | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | HIGH | COMPOSITE | attention-photo, photographer joins/camera review reached |
| c05.s06.shot06-page | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | HIGH | COMPOSITE | reviewed frame authorized, photographer leaves, host shows page |
| c05.s06.shot07-message | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | attention-coffee; J-access; reply received |
| c05.s06.shot09-thread | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | attention-flirt; J-access; actual reply |
| c05.s06.shot10 | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | leave-room chosen, thank host then exit |
| c05.s06.shot11-observe | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | attention-observe, reaches work |
| c05.s06.shot12-entrance | chapter5.room | PRODUCTION | c5-harbour-evelynn-julian-composite-v2-production | Owner exact-shot approval; art/production/chapter5 | Other branches remain | DONE (bounded) | REUSE | APPROVED ONLY {"c5.presentation":"professional","c5.wardrobe":"c05.professional","c5.event":"attend"}; {"contentRevision":16,"event":"attend","wardrobe":"c05.professional","julianAccess":true,"attention":"coffee","julianArrived":true,"julianDeparted":false,"coffeeCount":1,"contact":false} |
| c05.s06.shot13-return | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | HIGH | COMPOSITE | after conversation/observe OR coffee, authored return reached |
| c05.s06.shot14-wait | chapter5.room | REUSE | C5-HARBOUR-JULIAN-DEPARTED-COMPOSITE-V1 (proposed unchanged image) | Pixel-identical E-alone/coffee contents; owner departure approval does not automatically approve wait beat | Exact wait-shot approval only; other wardrobes/time missing | HIGH | REUSE | E leaves table and waits outside |
| c05.s06.shot15-departed | chapter5.room | PRODUCTION | c5-harbour-julian-departed-composite-v1-production | Owner exact-shot approval; art/production/chapter5 | Other branches remain | DONE (bounded) | REUSE | APPROVED ONLY {"c5.presentation":"professional","c5.wardrobe":"c05.professional","c5.event":"attend"}; {"contentRevision":16,"event":"attend","wardrobe":"c05.professional","julianAccess":true,"attention":"coffee","julianArrived":true,"julianDeparted":true,"coffeeCount":1,"contact":false} |
| c05.s06.shot16-home | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | Actual visit; same selected outfit; no Julian |
| c05.s06.shot17-hung | chapter5.room | MISSING | — | Final Harbour sequence + Harbour environment authority | YES | MEDIUM | COMPOSITE | Owned selected outfit on hanger; crop only; no invented nightwear |
| c05.s07.shot01 | chapter5.offer/proof | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | room exited; actual next day |
| c05.s07.shot02-contract | chapter5.offer/proof | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | offer=accepted, exact concept/fee/name/image scope |
| c05.s07.shot03-arrival | chapter5.offer/proof | STAGING | C5-WAVE-A-ASTER-ARRIVAL-COMPOSITE-V1 | Final shot plan + PASS Aster environment; character layers missing | REVISE: heel height + floor contact/chair tangency; human review pending | HIGH | COMPOSITE | accepted professional concept/professional outfit;11:30arrival before sitting; no coffee/publication |
| c05.s07.shot04-sitting | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | HIGH | COMPOSITE | Accepted concept, image-use not none |
| c05.s07.shot04-text | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | HIGH | COMPOSITE | image-use=none |
| c05.s07.shot05-proof | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | HIGH | COMPOSITE | concept !=private, image-use !=none; no publish yet |
| c05.s07.shot06-private | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | MEDIUM | COMPOSITE | concept=private |
| c05.s07.shot07-text | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | HIGH | COMPOSITE | image-use=none; private/public status from concept |
| c05.s07.shot08-public | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | HIGH | ARTIFACT | Non-private concept; explicit publish action |
| c05.s07.shot09-withheld | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | MEDIUM | COMPOSITE | Withhold chosen, agreement actually collected |
| c05.s07.shot10-depart | chapter5.offer/proof | MISSING | — | Final shot plan + PASS Aster environment; character layers missing | YES | MEDIUM | COMPOSITE | Accepted completed sitting; publish/withhold; no issue if withheld/private |
| c05.s08.shot01 | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Actual home state regardless of Aster acceptance |
| c05.s08.shot02-call | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | J-access and completed choice |
| c05.s08.shot03-desk | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | service=julian; actual visit/collection |
| c05.s08.shot04-home | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Same choice reaches return |
| c05.s08.shot05-counter | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Cash ≥60 beforehand; service=self |
| c05.s08.shot06-home | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Paid collection completed |
| c05.s08.shot07-request | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Chosen municipal service |
| c05.s08.shot08-table | chapter5.infrastructure | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Home/inconvenience chosen |
| c05.s09.shot01 | chapter5.terms | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Scene entry; no acceptance yet |
| c05.s09.shot02-two-calls | chapter5.terms | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Accepted 28 days/two calls |
| c05.s09.shot03-one-call | chapter5.terms | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Accepted 7 days/one call |
| c05.s09.shot04-backup | chapter5.terms | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | terms=backup |
| c05.s09.shot05-paid | chapter5.terms | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Cash ≥60; terms=self-funded |
| c05.s10.shot01-tea | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | Scene entry, later lighting |
| c05.s10.shot02-threads | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Actual transition to reading |
| c05.s10.shot03-maya | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | message-maya; max-two gate |
| c05.s10.shot04-sloane | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | message-sloane |
| c05.s10.shot05-sender | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | `c3.rook-window=offered`; message-sender |
| c05.s10.shot06-voss | chapter5.people | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | Existing `c3.qualification`; message-voss |
| c05.s11.shot01 | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | Actual guest-hour consideration, no trip chosen |
| c05.s11.shot02 | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | ARTIFACT | J-mutual and completed request |
| c05.s11.shot03-card | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | target=salon and desire-personal/instrumental/mixed |
| c05.s11.shot04-roof | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | HIGH | NEW MASTER + CHARACTER LAYERS | Selected full salon hour, went-out |
| c05.s11.shot04-short | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | REUSE / ARTIFACT (conditional, source missing) | target=salon; desire-negotiate |
| c05.s11.shot05-leave | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | Full-hour visit completed |
| c05.s11.shot05-short | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | LOW (derive after master) | COMPOSITE | Short visit completed |
| c05.s11.shot06-home | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | Corresponding refusal/deferral actually selected |
| c05.s11.shot07-journey | chapter5.want/handoff | NOT REQUIRED | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | NO RASTER | NONE | HOLD / FADE | Reserved; no intermediate location authored |
| c05.s11.shot08-door | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | HIGH | NEW MASTER + CHARACTER LAYERS | Fresh granted authorization, willing, adult participants, J-mutual, exact scope; arrival beat reached |
| c05.s11.shot09-withdraw | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | withdraw; authorization=revoked, intimacy=withdrawn |
| c05.s11.shot10-no-sex | chapter5.want/handoff | NOT REQUIRED | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | NO RASTER | NONE | HOLD / FADE | Chosen fade; planned outcome physical-without-sex |
| c05.s11.shot11-encounter | chapter5.want/handoff | NOT REQUIRED | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | NO RASTER | NONE | HOLD / FADE | Chosen fade; sex scope; actual voluntary/instrumental/mixed outcome |
| c05.s11.shot12-goodnight | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | Completed fade outcome, not withdrawal |
| c05.s11.shot13-call | chapter5.want/handoff | MISSING | — | Final shot plan / frozen source; canonical face/body + wardrobe contract | YES | MEDIUM | COMPOSITE | target=julian; chosen conversation-only scope |
| c05.s12.shot01-return | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | went-out=yes; actual return |
| c05.s12.shot02-stay | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | No went-out |
| c05.s12.shot04-holdings | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | COMPOSITE | Actual corresponding records only |
| c05.s12.shot05-phone | chapter5.return/complete | PRODUCTION | c5-s12-shot05-phone-composite-v2-production | Owner exact-shot approval; art/production/chapter5 | Other branches remain | DONE (bounded) | REUSE | APPROVED ONLY {"c5.presentation":"professional","c5.wardrobe":"c05.professional","c5.purchase":"phone","c5.placement":"phone","c5.personal-location":"table-unboxed","c5.axiom-location":"table-home","c5.offer":"declined"}; {} |
| c05.s12.shot06-clothes | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | purchase=wardrobe, placement=clothes |
| c05.s12.shot07-clasp | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | purchase=accessory, placement=clasp |
| c05.s12.shot08-visible | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | HIGH | REUSE / ARTIFACT (conditional, source missing) | published=yes, placement=visible |
| c05.s12.shot09-private | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | published=yes, placement=private |
| c05.s12.shot10-photo | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | ARTIFACT | event-photo=yes, placement=photo |
| c05.s12.shot11-jacket | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | placement=jacket |
| c05.s12.shot12-unchanged | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | placement=unchanged |
| c05.s12.shot13-photo-review | chapter5.return/complete | MISSING | — | Final shot plan + locked apartment; branch wardrobe/props | YES | MEDIUM | COMPOSITE | event-photo=yes; place-photo; actual sourced page |

## Reference inventory (not extra scene coverage)

| Reference | Status | Bounded authority |
|---|---|---|
| Harbour master | REUSE | approved environment |
| Aster master v1 | STAGING | PASS environment only |
| Evelynn professional v4 | STAGING | PASS wardrobe only; excludes face/earring |
| Apartment V2 | PRODUCTION | exact final-phone branch only; not universal apartment |

All12movement groups retain dialogue holds. Retired: c05.s06.shot08-terrace, c05.s09.shot06-refused, c05.s10.shot07, c05.s12.shot03-cup.

No scene production is inferred from old global PASS labels. Source authority: final shot plan, requirements, production catalog and bounded reference records. Frozen runtime remains unchanged.

## Wave A result

**REVISE — STAGING.** One Aster arrival pair generated for1credit and composited locally. Pilot total14. Wardrobe heel mismatch and character floor-contact/chair-edge issues require review; earring noncanonical, flagged separately. No retry or promotion. Production remains3/100beat IDs; one additional staged candidate, not approved coverage. See [wave report](CHAPTER_5_WAVE_A_REVIEW.md).
