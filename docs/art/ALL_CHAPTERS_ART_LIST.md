# EVE: every art shot we need (all chapters)

**Status: planning only.** Nothing here has been generated, promoted or bound. Written 2026-09-27, after every chapter
was deepened (Ch1–5 through the revision-20 prose passes, Ch6–18 with new moments). This list **supersedes**
`CELEBRITY_ROUTE_SHOT_LIST.md`, whose Chapter 7–18 tables are carried over below with the deepening additions.

**Order of work: review first, generate second.** Many Chapter 1–5 gaps already have candidates in `art/staging/`
waiting for the owner. Generating those scenes again would waste credits. **ZenCreator is not used** until the owner
has approved this list and a quote. It currently needs re-authorizing anyway.

## Rules every frame follows

- **Dark noir.** Greyscale mean 45–70 (hard limits 40–85), at least 40% of pixels under 50. Night or dusk by
  default. Daytime means overcast or rain, blinds half drawn, one warm practical light against cold window light.
- **Environment first.** Master → character layers → props → compositor. Reuse a master only while location, time,
  wardrobe, people and props all stay true. Hold on dialogue, cut on action.
- **People.** Evelynn is always styled. Partners are men.
- **Content.**
  - Intimacy frames stop at the threshold or the first kiss, clothed, heat 3 at most.
  - Ch13's comply night is an empty corridor and a closed door only; its aftermath is shown through props.
  - The clinic is never sexualized.
  - Refusal consequences are non-sexual.
- **Branch truth.** A frame shows only what its branch has earned.
- **Priority.** P0: every path sees it, or it is a signature image. P1: a major branch or a recurring insert. P2:
  optional; it can hold on a nearby master.

---

## A. Cast sheets (front, three-quarter, full body; owner-approved before any scene uses them)

| Status | Who |
|---|---|
| **Approved canon** | Evelynn (front, three-quarter, Helix gala); Adrian (identity v2) |
| **Review first** (staging candidates exist) | Celeste, Sloane (the silver streak is on the wrong side: fix before approval), Maya (the pilot was rejected; the v1 portrait stands), Benton, Daniel, Marcus, Voss, the "executive" base (usable for **Julian**), Sebastian (4 candidates); Evelynn profile and full body; Adrian full body and three-quarter |
| **Generate, P0** | **Mr Pryce**, **Iris Moreau**, **Owen Marsh**, **Julian Mercer** (if the executive base is not approved as him) |
| **Generate, P1** | Theo Marr, Nora Linden (and Sam, 7), **Nell** (photographs only; owner decision: how like Evelynn?), the Aster editor, Lotte, Ruth Adair, Nadia Brandt |
| **Generate, P2** | Mrs Tan, Mr Goh, Madame Lin, Kit Harlow, Colin Ashby, the Singapore tail (young man, lanyard), the locksmith, the board (Deverell, Marguerite Soames, the signet ring, the woman in pearls), the young cataloguer, Mrs Kowalczyk, Odile, Priya, the recovery nurse |

---

## B. Location masters

> **Correction (2026-09-27).** These are already **approved runtime environment masters** (noir production versions in
> `src/ui/environment-art.ts`), not review items, wherever the rows below or in §C say "review":
>
> | Group | Masters |
> |---|---|
> | Helix | `helix-exec-suite`, `helix-small-reception`, `ch4-review-room`, the Ch4 workroom and public desk / counter |
> | Clinic | `clinic-consultation-suite`, `clinical-records-room` |
> | Maya's world and the city | `lantern-exterior`, `noodle-counter`, `axiom-gates`, `si-office-dusk` |
> | Glass House | `glass-house-service-gallery`, `service-garage`, `descending-elevator` |
> | Harbour | rooftop terrace, hotel room, room |
> | Aster | the proof table |
>
> They fill the gap scenes as empty rooms today. What those scenes still need is the **people**: character layers
> composited on the masters, which is cheaper than new rooms. The staging candidates that are genuinely awaiting
> review are the per-scene frames in `staging/full-game/{sloane,evening,casework,clinic,mission,chapter3,chapter4,chapter5,sebastian}/`.

| Master | Status | Needed views | Chapters |
|---|---|---|---|
| Adrian's / Evelynn's apartment | **Approved** (noir masters; pre and post Glass House ×3 outfits) | bathroom mirror (Ch1, Ch3); bedroom floor and wardrobe door (Ch6, Ch10 wall); kitchen table at night; hall and spyhole; window onto the flat across the gap | 1–18 |
| Axiom Tower (lobby, office floor, Level 71, gates) | **Approved** (opening) | exterior at midnight with one floor lit (Ch6); transit queue (Ch2) | 1, 2, 6 |
| Helix | **Approved** (casework); **review**: `helix-exec-suite`, `helix-small-reception`, `ch4-review-room` | Ch3 lobby and meeting room; Ch4 review room and hotel café | 1, 3, 4, 6 |
| Sublevel 17 clinic | **Approved** (most nodes); **review**: `clinic-consultation-suite`, `clinical-records-room` | Ch3 Consultation 3; the records room | 2, 3 |
| Glass House | **Approved**: car, arrival, reception, assessment, method; **review**: cover, elevator, entry, hub, Marcus, Celeste, service gallery, service garage | escape, exchange, confrontation, debrief | 2b |
| Harbour | **Approved** (Ch5 composites, relit noir); **review**: rooftop terrace, hotel room | — | 5 |
| Maya's world | **Review**: `lantern-exterior`, `noodle-counter`, `evening-maya-lantern-meet` | Maya's kitchen (Ch14) | 1, 3, 6, 14 |
| Pryce's car | **Approved**: `car-rain-window-noir-v2` | — | 2b, 11, 13, 16 |
| **The Vesper Gallery** | **Generate** | front on the Embankment; Long Room; reading room; board-room door and corridor; terrace; cloakroom; archive; service stair | 11, 13–18 |
| **The Claremont** | **Generate** | bar; mirrored lift; 11th-floor corridor; door of 1109; service corridor and camera cupboard; front seen from across the Strand | 13 |
| **The Embankment / river** | **Generate** | rail at night; bench; bridge | 9, 11, 14–17 |
| **Singapore** | **Generate** (the old harbour set is too bright) | Changi; Emerald Hill shophouse; Number 9; Punkah Bar; Holland Village; the harbour wall; Chinatown back lanes (tail); hawker coffee stall | 12 |
| **London set pieces** | **Generate** | the Anchor; Number 14; Castellane; auction room; periodicals room; locksmith's and Nadia's; café terrace; police station; Theo's studio | 8–15 |

---

## C. Chapters 1–5 (live; bindings in `src/ui/scene-art.ts`)

Where a scene has no exact shot the game falls back to an empty environment master. The gaps below are ranked by
what shows most. **R** = a staging candidate exists, review and approve it. **G** = generate. **Code** = a wiring or
validator fix, no art.

### Chapter 1 · Promotion Day
The opening, from home to the Level 71 offer, is **fully approved**. Gaps are the evening:

| Node(s) | Frame | Status | P |
|---|---|---|---|
| release.departure, release.home | leaving Axiom; the unchanged apartment | R `sloane/release-departure`, `release-home` | P0 |
| evening.plan | the tower in the window, Maya's message | R `sloane/evening-plan` | P1 |
| evening.disclosure/closure (call branch) | Maya on video, warm light behind her | R `evening/evening-maya-call` | P0 |
| warning.first–third | the static-sender phone | R `evening/evening-warning-first-base` (insert layers per line) | P0 |
| dayend.cautious / walkaway | — | R `casework/dayend-*` | P1 |
| **evening.home (deepening)** | **Adrian's last look at his own face in the bathroom mirror**, the scar through the eyebrow | G (needs Adrian canon) | **P0** |
| dayend.accepted | the phone dimming on the appointment | G (insert) | P2 |

### Chapter 2 · Sublevel 17
Most of the clinic is **approved**.

| Node(s) | Frame | Status | P |
|---|---|---|---|
| morning, contact, morningReply | dawn, the phone, Maya's call | G (apartment dawn plus phone insert) | P1 |
| travel, entrance, screened | transit queue; Axiom gates; elevator four | R `gap-scenes/axiom-gates`, `descending-elevator`; G for the transit queue | P1 |
| departure, complete | leaving at dusk; the car-window reflection | R `clinic/clinic-departure`, `clinic-complete-car-reflection` | P0 |
| face, facePause, steps, voicePause (private branch: text only today) | same frames, Sloane absent | R `clinic/clinic-face`, `clinic-face-pause`, `clinic-steps`, `clinic-voice-pause` (check they are Sloane-free) | P0 |
| examResult, voice, voiceReply (stay branch) | — | R `clinic/clinic-exam-result`, `clinic-voice` | P1 |
| profileReview, stopConfirm, stopped | — | hold on the profile / authorization frames | P2 |

### Chapter 2b · The Glass House
| Node(s) | Frame | Status | P |
|---|---|---|---|
| home, homePresentation, homeContact | pre-Glass House apartment ×3 outfits | **Code**: the files exist in `public/art/apartment/`; their `-production` IDs are missing from `approved-scene-art.json` (owner approval, then wiring) | P0 |
| cover, elevator, entry, hub | arrival sequence | R `mission/glass-house-*` | P0 |
| marcus / marcusReply, celeste / celesteReply | the two encounters | R `mission/glass-house-marcus`, `glass-house-celeste` | P0 |
| lead*, assessmentReview | hold on the assessment | — | P2 |
| escape, exchange, confrontation | the set-piece climax | G | **P0** |
| debrief, debriefReply, warning1–3 | Sloane debrief; the phone | G (debrief room); phone insert reuse | P1 |
| garage, complete | service garage; the ride home | R `gap-scenes/service-garage`; car reuse | P1 |

### Chapter 3 · Second Skin
Approved: surveillance and home (executive).

| Node(s) | Frame | Status | P |
|---|---|---|---|
| home (socialite, shadow) | post-Glass House apartment | **Code**: the files exist, but their IDs are not in the approved JSON (owner approval, then wiring) | P0 |
| home return | — | R `chapter3/chapter3-home-return-master` | P1 |
| mayaTalk | Maya on the phone, the kettle behind her | G (or reuse `evening-maya-call`) | P1 |
| rest (deepening) | **make-up coming off in the mirror**, "underneath is still her" | G | P1 |
| voss, vossPlan, rookCompare | Consultation 3, the dated page | R `gap-scenes/clinic-consultation-suite`, `clinical-records-room` | P0 |
| executive, executiveWork, reception, photograph | Helix lobby; meeting room with Julian | R `helix-small-reception`, `helix-exec-suite` plus Julian layer | P0 |
| truths, calendar | papers under the lamp "like a hand of cards" | hold on the apartment master plus props | P2 |
| departure (deepening) | **the lift mirror** on the way to six o'clock | G (or reuse `descending-elevator`) | P1 |

### Chapter 4 · Private Access
Approved: entry, consequences, resource, assignment. **Nearly every gap has a staging candidate.**

| Node(s) | Status |
|---|---|
| room | R `chapter4-review-room-three-inquiries` (Helix) and `gap-scenes/ch4-review-room` |
| assessment | R `chapter4-assessment-three-headings` |
| interest | R `chapter4-interest-closed-report` |
| outside | R `chapter4-outside-julian-cafe` / `chapter4-outside-public-counter` |
| favor | R `chapter4-favor-julian-workroom` / `chapter4-favor-public-desk` |
| notice | R `chapter4-notice-phone` |
| power | R `chapter4-routing-copy-request` |
| intimacy | R `chapter4-private-time-dinner` |
| handoff (Julian, text only) | R `chapter4-julian-hotel-threshold` (threshold only) |
| privateAccess, complete | R `chapter4-next-morning-reader-pass`, `chapter4-records-exit-packet` |

### Chapter 5 · A Beautiful Life
The authority is `CHAPTER_5_TRUE_ART_BACKLOG.md` (88 missing and 26 blocked rows; it lags the runtime, because the
five echo variants and s01 are done). The review-first candidates in `staging/full-game/chapter5/` are:
- the shopping street (noir and near-future);
- the invitation;
- the presentation wardrobe;
- the shopping decision;
- the Harbour preview and salon entries ×4 outfits.

The Sebastian lane has 8 candidates in `staging/full-game/sebastian/`. On top of those:

| Item | Status | P |
|---|---|---|
| `c05.s01.shot01` (chapter5.home) | **Code**: the validator requires the wrong node and wardrobe, so the frame never shows | P0 |
| `c05.s06.shot14-wait` | G (the shot has no file) | P1 |
| chapter5.handoff (Julian, text only) | G: threshold frame, clothed | P1 |
| Harbour at dusk, heads turning (deepening) | holds on the approved room frames | — |

---

## D. Chapter 6 · The Cage You Choose (shared by every route; its structure is in `CHAPTER_6_VISUAL_REQUIREMENTS.md`)

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| c06-01 | The morning benefit, by arrangement | Helix workroom / apartment with the Aster page / Sloane's easy flat | Evelynn | P0 |
| c06-02 | Getting dressed (deepening): the fitted black / the silk and hair down / jeans | apartment hall mirror | 3 wardrobe layers | P1 |
| c06-03 | The noon ask | workroom door (Julian) / phone / Sloane on the phone | Julian | P1 |
| c06-04 | The Counter with Maya | R `gap-scenes/noodle-counter` | Maya, Evelynn | **P0** |
| c06-05 | The late count: the envelope at the kitchen table | apartment kitchen | props | P1 |
| c06-06 | Late: a bag under the bed / **Axiom Tower at midnight, a cleaner at his old desk** | bedroom / tower exterior | — | P1 |
| c06-07 | The proof arrives: bed, rain, the phone lit on the pillow | apartment bedroom | Evelynn | P0 |
| c06-08 | The courier-log leaf; the margin note (insert) | insert | "missed the Katong breakfast…" | **P0** |
| c06-09 | The handwriting drifting (deepening) | insert: the envelope beside the leaf | — | P2 |
| c06-10 | The ORACLE assessment (insert) | insert | two numbers | P1 |
| c06-11 | Before deciding: index cards on the floor / a glass for R. on the sill | bedroom / window | props | P1 |
| c06-12 | The chosen end action | holds on the relevant master | — | P2 |

---

## E. Chapters 7–18 (Celebrity route)

`cr<chapter>-<n>`. "Hold" means the shot reuses a master already listed.

#### Ch7 · The Road You Choose

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr07-01 | His street, across the river | Adrian's street at dusk in rain; Number 14's door | Evelynn | P0 |
| cr07-02 | Following the grey coat | wet street in the morning | Evelynn; tall figure in a grey coat ahead | P0 |
| cr07-03 | His things on the kitchen floor | M01 kitchen | box of effects; jacket (spare key in the lining) | P0 |
| cr07-04 | The lift at 19:00 | lift (relight `eve-bg-elevator`) | Evelynn; Pryce beside her, unnamed | P1 |
| cr07-05 | The post room: HELD | building post room | the HELD parcel card | P1 |
| cr07-06 | Her wardrobe at night | reuse the production wardrobe continuity noir | Evelynn | P1 (reuse) |

#### Ch8 · The Cost Bites

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr08-01 | After the break-in | M01, drawers out | Evelynn | P0 |
| cr08-02 | Mr Pryce at the door with a tool bag | M01 door, chain on | Evelynn, Pryce | P0 |
| cr08-03 | The fire escape: binoculars in the flat opposite | fire escape at night | Evelynn; a glint across the gap | P0 |
| cr08-04 | The wake at the Anchor | pub interior | Evelynn, Daniel (toast), Maya if back | P0 |
| cr08-05 | Number 14: SERVICED, D.P. | Adrian's flat | skirting board screwed shut | P0 |
| cr08-06 | Lotte's nine photographs | café or flat | photos of Nell (needs Nell's look) | P1 |
| cr08-07 | The client list: VALE, E. | insert | the page | P1 |
| cr08-08 | Landline at 03:10 | M01 hall | Evelynn | P1 |
| cr08-09 | Odile's shoot | studio | Evelynn styled for camera | P1 |
| cr08-10 | Mrs Kowalczyk / the reporter at the door / the bank | landing / door / bank | — | P2 |

#### Ch9 · Assembling the Case

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr09-01 | The usual table for two | Castellane | Evelynn; the empty chair | P0 |
| cr09-02 | The watchers' table | café terrace, grey morning | Evelynn, Sloane | P0 |
| cr09-03 | The river walk: at the rail | M04 | Evelynn, Sloane | P0 |
| cr09-04 | Straits Club condolence book, green ink | club | the book | P1 |
| cr09-05 | Ruth Adair | her door / class | Evelynn, Ruth | P1 |
| cr09-06 | Lot fourteen | auction room | Evelynn; paddles | P1 |
| cr09-07 | Microfiche: Anna Kessler | periodicals room | the screen | P1 |
| cr09-08 | Exhibit A | above the locksmith's | Evelynn, Nadia Brandt | P1 |
| cr09-09 | Tailor; letting agent; the window wave; orchid at midnight | various | — | P2 |

#### Ch10 · She Knows

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr10-01 | Breakfast: she knows | breakfast room | Evelynn, **Celeste** (first full frame) | P0 |
| cr10-02 | **The wall** is built | M01 wardrobe door | cards, pins, string. **The signature master:** it is re-dressed in every later chapter. | P0 |
| cr10-03 | The black phone arrives | M01 kitchen table | the phone, one contact | P0 |
| cr10-04 | The orchid invitation | insert | white orchid, card | P1 |
| cr10-05 | Evening threshold ×3 (Julian / Theo / Sebastian) | each man's place | clothed; stops at the threshold. **Reused in 11, 14, 15, 18.** | P1 |

#### Ch11 · The Asset

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr11-01 | The first Thursday: arrivals | M02 front, Embankment at night | Evelynn arriving | P0 |
| cr11-02 | The viewing: "Do you like being looked at?" | M02 Long Room | Evelynn, Celeste, clients | P0 |
| cr11-03 | Page seven of *The Autumn Collection* | insert | catalogue page with her face. **Recurs in 13, 15, 16, 18.** | P0 |
| cr11-04 | The second order, on the terrace | M02 terrace over the river | Evelynn, Celeste | P0 |
| cr11-05 | The cloakroom: Iris | M02 cloakroom | Evelynn, Iris; ticket 41 | P0 |
| cr11-06 | Board members in the corridor (curtain) | M02 private floor | Evelynn half hidden | P1 |
| cr11-07 | The dance | M02 Long Room | Evelynn leading | P1 |
| cr11-08 | The way home (car, or Pryce at the bridge) | M05 / M04 | — | P2 (reuse) |

#### Ch12 · Singapore

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr12-01 | Mrs Tan's orchids | Emerald Hill shophouse | Evelynn, Mrs Tan | P0 |
| cr12-02 | Number 9 after dark: the drawer, the mirror | Nell's flat | Nell's note: "Not even for her" | P0 |
| cr12-03 | The Punkah Bar | Marlowe Hotel | Evelynn; Kit Harlow / Colin Ashby | P0 |
| cr12-04 | Nora | Holland Village | Evelynn, Nora (Sam) | P1 |
| cr12-05 | Nell on the harbour wall, laughing | in-world photograph | **Recurs in 13, 17.** | P1 |
| cr12-06 | The heat: harbour at midnight | M06 harbour | evening threshold | P1 |
| cr12-07 | Changi at 06:10; London arrivals | airports | — | P2 |

#### Ch13 · The Honeypot

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr13-01 | The placement | M02 reading room | Celeste, Evelynn; Marsh's file photo | P0 |
| cr13-02 | Wednesday, a minute to midnight | M01 kitchen table | black phone; Nell's photo or card | P0 (hold) |
| cr13-03 | The Claremont bar: the end stool | M03 bar | Marsh with whisky, paperback, cycling clips | P0 |
| cr13-04 | **Comply:** the 11th-floor corridor, **empty**, the door of 1109 closed | M03 corridor | **no figures; nothing past the door** | P0 |
| cr13-05 | **Refuse:** the station waiting room | police station | Evelynn on a plastic chair; strip light | P0 |
| cr13-06 | **Swap:** the camera cupboard behind the mirror | M03 service corridor | Iris in a tabard; the card; the green light | P0 |
| cr13-07 | A knock: Sloane through the spyhole | M01 landing | Sloane in a grey coat, holding a folder | P0 (**reused as Ch14's opener**) |
| cr13-08 | **Turn:** 1109 staged, lamp off, two dressed figures laughing | M03 1109 | Evelynn, Marsh (consensual staging) | P1 |
| cr13-09 | **Expose:** Theo on air / photographers in the lobby | studio / Claremont lobby | Theo | P1 |
| cr13-10 | Celeste's box: the dress in tissue | insert | the dress | P1 |
| cr13-11 | Aftermath (comply): props only | M01 | the card THURSDAY. 1109. DONE TO ME. NOT BY ME. pinned beside Nell's | P1 |
| cr13-12 | The Claremont from across the Strand (a lamp tested in the fourth window) | street | Evelynn in a doorway | P2 |
| cr13-13 | Held: Maya's sofa / a partner's arms, clothed | Maya's flat / his place | non-sexual | P2 |
| cr13-14 | Friday afternoon: yellow tulips | bus shelter with her poster | the girl with the school bag | P2 |

#### Ch14 · Sloane's Turn

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr14-01 | Sloane in the flat | M01 living room | Sloane, Evelynn; the ORACLE verdict | P0 |
| cr14-02 | Maya's kitchen: the truth | Maya's kitchen | Evelynn, Maya | P0 |
| cr14-03 | Sunday at the Vesper (comply handover / Celeste afraid on counter) | M02 reading room | Celeste, Evelynn (± Sloane) | P0 |
| cr14-04 | Refuse: the fire escape out | M01 fire escape | Evelynn running | P1 |
| cr14-05 | The hour before midnight: Pryce on the bench / Sloane on the sofa | M04 / M01 | — | P2 |

#### Ch15 · Breaking the Leash

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr15-01 | The crew at the table (a toast; a tumbler, a mug, an egg cup) | borrowed room | whoever came (Iris / Sloane / Maya / Pryce) | P0 |
| cr15-02 | The Vesper at 02:00: the way in | M02 exterior (drainpipe, alley, front door) | Evelynn dressed as a thief | P0 |
| cr15-03 | Everything: the archive at 16° | M02 archive | open drawers; page seven torn out | P0 |
| cr15-04 | End of Act III: every card on her side, THE BOARD MEETS | M01 wall | wall state | P0 |
| cr15-05 | A sound on the stairs: the cataloguer | M02 archive door | the young man with the laptop | P1 |
| cr15-06 | The black phone off the bridge, still lit | M04 bridge | — | P1 |
| cr15-07 | Pryce's flat across the gap (keys on a green ribbon) | the watcher's flat | Pryce | P2 |

#### Ch16 · The Approach

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr16-01 | Armour at the mirror (green / black / grey) | M01 bedroom mirror | 3 wardrobe layers on one plate | P0 |
| cr16-02 | The Embankment at 17:45, walking to the door | M04 into the M02 front | Evelynn; crew at the edges | P0 |
| cr16-03 | 05:00 at the wall; the rehearsal | M01 | — | P2 (hold) |

#### Ch17 · The Room

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr17-01 | The Long Room as boardroom | M02 Long Room, empty frames | six members, Celeste, Evelynn standing | P0 |
| cr17-02 | The defect laid on the table | board table | ORACLE verdict | P0 |
| cr17-03 | The front door at 19:10: walking out onto the Embankment | M02 front / M04 | Evelynn | P0 |
| cr17-04 | The officer of record | board table | Sloane | P1 |
| cr17-05 | Eleanor: Nell's photo on the table | board table | the photo | P1 |
| cr17-06 | The young man's nod at the door | M02 doorway | cataloguer | P2 |

#### Ch18 · The Position

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr18-01 | The shoebox: the wall taken down | M01, empty wall | shoebox on her knees | P0 |
| cr18-02 | The end frame | M01 window or M04 | Evelynn, alone, styled | P0 |
| cr18-03 | The morning papers; the Vesper at noon, closed | kiosk / M02 front | — | P1 |
| cr18-04 | A year later ×3 (partner / Maya / quiet) | varies | end cards | P1 |

#### Added by the deepening passes since the first list (2026-09-26/27)

| ID | Beat | Location | Who / props | P |
|---|---|---|---|---|
| cr07-08 | A hair laid across her door | apartment door, knee height | insert | P2 |
| cr07-09 | The first Evelynn's record and a barefoot dance in the kitchen | apartment kitchen at night | Evelynn, a concert ticket | P1 |
| cr08-11 | The boiler cupboard: a pencil column of Thursdays, D.P. | apartment cupboard, torch | insert | P1 |
| cr08-12 | Dawn in her flat shoes, the worn left heel | apartment hall | Evelynn | P2 |
| cr09-10 | The watchers' chair: her own window seen from their side | café terrace, looking up | Evelynn (back) | P1 |
| cr09-11 | The locksmith's clear padlock | locksmith's bench | Evelynn, the locksmith | P2 |
| cr10-06 | Down four flights after the courier; the black car's window going up | street at night | Evelynn in stockings, car | **P0** |
| cr10-07 | The mirror turned round: what they will see on Thursday | apartment bedroom | Evelynn in the green / black | P1 |
| cr11-09 | The board through an inch of open door | Vesper private floor | the board, Celeste at the window | **P0** |
| cr11-10 | Taking Celeste's glass on the terrace | Vesper terrace | Evelynn, Celeste | P1 |
| cr12-09 | The tail through Chinatown at 1 a.m. | Chinatown back lanes, night market | Evelynn, the young man | P1 |
| cr12-10 | Closing Mr Goh's tab: "CLOSED. N. LINDEN." | hawker coffee stall | Mr Goh, the exercise book | P1 |
| cr12-11 | Mrs Tan's jasmine in a yoghurt pot | Emerald Hill landing | Mrs Tan | P2 |
| cr13-15 | Nora on her balcony at midnight (the florists) | Holland Village balcony | Nora | P2 |
| cr14-06 | The hour before midnight: Pryce's flask on the bench | Embankment bench | Pryce, Evelynn | P1 |

---

## F. Totals, and what to do first

| Bucket | Frames |
|---|---|
| **Review first** (staging candidates exist, Ch1–5) | ~60 candidates across Ch1 evening, clinic, Glass House, Ch3 and Ch4 (almost all of Ch4), plus the Ch5 street, Harbour and Sebastian sets |
| **Code fixes, no art** | 3: mission home ×3 IDs, Ch3 home socialite/shadow IDs, the Ch5 `s01.shot01` validator |
| **Generate new, Ch1–5** | ~12 (Adrian's mirror goodbye, the Glass House escape / exchange / confrontation, debrief, clinic dawn and transit, Maya's kettle call, make-up off, the lift mirror, the Ch5 wait and Julian thresholds) plus the Ch5 backlog rows |
| **Generate new, Ch6** | ~12 frames on 4 new views (tower at midnight, bedroom floor, the leaf and ORACLE inserts) |
| **Generate new, Ch7–18** | ~99 rows (84 plus 15 added), roughly 110 frames once bundles are split; about 30 environment views across the Vesper, Claremont, Embankment, Singapore and the London set pieces |
| **Cast sheets** | 2 approved; ~10 to review; ~27 to generate |

**Recommended sequence:**
1. **Owner review session (no cost):** the ~60 staging candidates, and approve or reject the 3 code-fix promotions.
   This alone fills most of the visible holes in Ch1–5.
2. **Cast:** approve the staging portraits; then generate Pryce, Iris, Marsh and Julian (ZenCreator, quoted first).
3. **Environments** (the non-ZenCreator image generator, one tested frame first, quoted): the Vesper Long Room, the
   Vesper front, the Claremont bar and corridor, the Embankment rail, the apartment wall and kitchen table at night,
   Axiom Tower at midnight.
4. **Signature scenes on those:**
   - Ch1–2b: Adrian's mirror goodbye, the Glass House escape;
   - Ch6: the Counter with Maya, the courier leaf;
   - Ch10: Celeste at breakfast, the wall;
   - Ch11: the viewing, the terrace, the open board-room door;
   - Ch13: the Claremont bar, the empty corridor;
   - Ch15: the archive;
   - Ch17: the board;
   - Ch18: the shoebox.

## Open owner decisions
1. Is Evelynn's Ch7–18 flat the same apartment as Ch1–5? (If so, the apartment masters cover most of it.)
2. How much should Nell resemble Evelynn?
3. Environments on the connected image generator, and ZenCreator for faces only?
