# Opening visual backlog — cinematic reader pass

**Current coverage, EVE ART M1:** 21 owner-approved records; 16 eligible manifest assets; 13 manifest assets with explicit bindings; 12 reachable distinct assets. Opening has three reachable approved assets (one required base plus two optional inserts); office has zero. Older dated totals/hold claims below are historical, not current runtime coverage. [Current disposition registry](ART_M1_VISUAL_STATUS.json) · [Reconciliation](ART_M1_RECONCILIATION.md) · [Axiom package](AXIOM_OFFICE_PRODUCTION_PACKAGE.md).

> **Current M1 status, 2026-09-20:** existing M2 staging composition is **OWNER APPROVED**, including framing/camera/reflection blocking only, from prior human review explicitly confirmed by the owner. Final bathroom environment: **NOT APPROVED**. Final Adrian layer: **NOT PRODUCED / NOT APPROVED**. Final runtime shot: **NOT APPROVED / NOT BOUND**. Planning/staging authority only; no promotion. [Controlling status and provenance](OPENING_MIRROR_STAGING_SPEC.md). Earlier dated pending-composition language is historical and superseded; final-environment gates remain.

Scope: `apartment.bond` (Promotion day, 06:42) through `ending.complete` (the explicit **Opening milestone** after Maya leaves). This is the first major section, not all of Day Zero or the clinic. Source: `src/content/scenes.ts`, `dialogue.ts`, `casework` presentation, apartment inspection actions, and the production/staging records inspected on 2026-09-17. No story changes, new generations or promotions.

**HOLD ON DIALOGUE. CUT ON ACTION.** The IDs below are presentation/authoring identifiers, not saved game fields. Existing nodes containing several movements retain their prose; intermediate shots are a backfill plan, not invented reader transitions. The resolver records the reached node's final shot, or the most recent apartment inspection, and currently renders no opening art because none is approved for these exact states.

## Composition accounting

- **19 required unique composition families; 0 production-covered (0%).**
- 5 families have staging candidates/guidance; 14 lack a complete exact composition.
- 7 additional rows are intentional holds/reuse and do not enlarge the denominator.
- `INTENTIONAL_REUSE` below describes planned reuse of an identified family. It is **not currently covered** while that source remains unapproved.
- The six newly connected/preserved eligible production images elsewhere in the reader do not count toward the opening. Chapter 5 remains **4/95 approved unique families (4.21%)**; this UI pass creates no art coverage.

## Beat map

“None” in CURRENT ASSET means no eligible production asset. Staging IDs name candidates only. P0 is immediate opening clarity; P1 follows once the principal masters are approved.

| SHOT ID | SCENE/NODE | TRIGGER | STATUS | CURRENT ASSET | REUSE SOURCE | UNIQUE ART REQUIRED? | PRIORITY |
|---|---|---|---|---|---|---|---|
| opening.apartment.shot01 | apartment.bond | Morning apartment, rain/Axiom window, Adrian, phone on counter | STAGING | None; candidate `eve-scene-morning-v1` | `eve-bg-apartment-day-v1` subject to canonical-layout review | Yes | P0 |
| opening.apartment.shot01 (message hold) | apartment.bond | Maya's message lights the existing phone; prose supplies readable text | INTENTIONAL_REUSE | None | opening.apartment.shot01 | No | P0 |
| opening.apartment.shot01 (thought/menu hold) | apartment.reply; apartment.departure | Private-feeling choice, reply or silence; no authored relocation yet | INTENTIONAL_REUSE | None | opening.apartment.shot01, or last inspection until the next movement | No | P0 |
| opening.apartment.inspect-mirror | apartment.* optional INSPECT_APARTMENT mirror | Bathroom-mirror inspection | MISSING_UNIQUE | None | V2 identity/body/wardrobe sufficient; bathroom M2 framing/plate approval required (see OPENING_MIRROR_STAGING_SPEC.md) | Yes | P0 |
| opening.apartment.inspect-lease | apartment.* optional INSPECT_APARTMENT lease | Axiom housing-notice inspection | MISSING_UNIQUE | None | Opening apartment master; notice insert | Yes | P0 |
| opening.apartment.inspect-medical | apartment.* optional INSPECT_APARTMENT medical | Annual medical-package inspection | MISSING_UNIQUE | None | Opening apartment master; package insert | Yes | P0 |
| opening.apartment.inspect-jacket | apartment.* optional INSPECT_APARTMENT jacket | Inspect unworn jacket inside closet | MISSING_UNIQUE | None | Locked apartment wardrobe geography; opening light | Yes | P0 |
| opening.apartment.shot02-coat | commute.arrival, first movement | Pocket phone, put on usual coat, leave | MISSING_UNIQUE | None | Opening apartment master + Adrian layer | Yes | P0 |
| opening.axiom.shot00-approach | commute.arrival | Rainy curb and approach through tower doors | MISSING_UNIQUE | None | Axiom exterior requires consistent entrance design | Yes | P1 |
| opening.axiom.shot01-lobby | commute.arrival | Join security queue beside glass partitions and gates | STAGING | None; environment `eve-bg-axiom-lobby-v1` | Staging lobby; requires exact queue/Adrian composition | Yes | P0 |
| opening.axiom.shot02-screening | commute.arrival | Phone/coat in tray; badge scan; face check on floor marker | MISSING_UNIQUE | None | Same lobby master, deterministic prop/position variant | Yes | P0 |
| opening.axiom.shot03-cleared | commute.arrival | Collect coat/phone, pass inner gate, enter elevator | MISSING_UNIQUE | None | Same lobby anchors; camera must show gate/elevator relationship | Yes | P1 |
| opening.axiom.shot04-desk | commute.arrival final beat | Arrive at intelligence floor; Daniel waiting beside desk | STAGING | None; candidate `eve-scene-daniel-v1` | `eve-bg-intelligence-floor-v1` | Yes | P0 |
| opening.office.shot01-daniel | office.daniel | Daniel delivers promotion news; same positions | INTENTIONAL_REUSE | None | opening.axiom.shot04-desk | No | P0 |
| opening.office.shot01-departed | office.benton first movement | Daniel pushes away/leaves; Benton approaches | MISSING_UNIQUE | None | Intelligence-floor master; remove/reposition layers | Yes | P1 |
| opening.office.shot02-benton | office.benton | Benton stops at desk with black data slate | STAGING | None; candidate `eve-scene-benton-v1` | Same desk geography, approved identities needed | Yes | P0 |
| opening.office.shot03-file | office.departure | Benton returns to office; Helix file wakes at terminal | MISSING_UNIQUE | None | Desk master with Benton absent, exact file state | Yes | P0 |
| opening.helix.shot01-brief | helix.brief | Open brief at desk | MISSING_UNIQUE | None | Same workstation; neutral/branch-safe screen composition | Yes | P1 |
| opening.helix.shot02-documents | helix.documents | Read source records in existing casework UI | INTENTIONAL_REUSE | None | opening.helix.shot01-brief; document UI supplies exact evidence | No | P1 |
| opening.helix.shot02-documents (analysis hold) | helix.analysis | Read/connect/hint/investigate while physically at desk | INTENTIONAL_REUSE | None | opening.helix.shot01-brief; do not illustrate a guessed conclusion | No | P1 |
| opening.helix.shot03-review | helix.review | Review chosen attachments at same workstation | INTENTIONAL_REUSE | None | opening.helix.shot01-brief; on-page text supplies branch-specific content | No | P1 |
| opening.helix.shot04-submitted | helix.submitted | Report transmitted to Benton only | MISSING_UNIQUE | None | Same workstation; completed submission result, no new recipient | Yes | P1 |
| opening.maya.shot01-coffee | maya.promotion | Maya arrives with two coffees and sets Adrian's down | STAGING | None; candidate `eve-scene-maya-coffee-v1` | Same desk; Maya's morning navy suit and coffee custody | Yes | P0 |
| opening.maya.shot01-coffee (dialogue hold) | maya.invitation; maya.case | Invitation, relationship thoughts, looking at visible report header | INTENTIONAL_REUSE | None | opening.maya.shot01-coffee | No | P0 |
| opening.maya.shot02-departure | maya.goodbye | Maya lifts her own coffee and steps toward compliance | MISSING_UNIQUE | None | Coffee master with authored departure; no unearned touch | Yes | P0 |
| opening.office.shot04-alone | ending.complete | Maya gone; Adrian takes a sip; report already sent | MISSING_UNIQUE | None | Desk master, one retained coffee, no Maya layer | Yes | P1 |

## Continuity and branch requirements

- **Adrian, not Evelynn**, age 34 in opening prose. No transformed face/body, Chapter 5 outfit, Julian, later phone, publication or operation props. Canonical Evelynn references cannot stand in for Adrian.
- Opening rain/daylight differs from approved evening and night apartment shots. Existing apartment geometry is reusable authority, not permission to recolor/promote a staged image in this task.
- The **unworn jacket remains inside the closet**. The usual coat put on for work is a different object. Do not use the jacket inspection as a wearing/exit image.
- Phone starts on the counter, is pocketed for travel, goes through screening with the coat, and is recovered before the inner gate. No duplicate phone, confiscation, restricted badge or later surveillance implication.
- Mirror/notice/package/closet views are optional and only follow their inspection. Relationship choice alone cannot imply touching Maya, identity change or moving rooms. Keep the latest inspection shot across subsequent ordinary dialogue; no automatic “return to master” cut without movement.
- Daniel waits at Adrian's desk, leaves before Benton stops there, and must not persist beside Benton. Benton carries a slate, does not summon Adrian into his office here.
- Marcus is a name in a brief, not a physically present character. A screen insert must not imply that a chosen theory is proven. Reuse a readable workstation composition; show the exact source material in accessible UI text.
- Maya is not at the apartment and does not see hidden report details. Her later office visit has two coffees, one retained on each side. Private feelings do not establish romance or consent. Her goodbye/touch wording is not permission to depict more intimacy than the actual selected response.
- Chronology: 06:42 apartment → 08:10 tower → 08:11 Daniel → 08:14 Benton → 08:18 case → 11:54 submission → 12:06 Maya → 12:11 departure → opening milestone.

## Next 15 production priorities (proposal only)

1. Review/finish opening apartment master with Adrian, morning rain and counter phone.
2. Bathroom-mirror inspection, preserving Adrian identity and the correct room.
3. Closet/jacket insert establishing custody and scale.
4. Housing-notice insert; authoritative thirty-day lease condition, no invented eviction.
5. Medical-package insert; annual screening only, no future treatment reveal.
6. Apartment departure layer: usual coat and pocketed phone.
7. Axiom lobby security-queue master.
8. Tray/badge/face-check movement variant from that lobby.
9. Cleared inner-gate/elevator movement variant.
10. Daniel-at-desk master, reusable through promotion dialogue.
11. Daniel-departs variant on the same desk geography.
12. Benton-at-desk master with black data slate.
13. Benton-gone/file-awake desk variant.
14. Maya arrival/two-coffee master.
15. Maya departure variant preserving Adrian's retained coffee.

Then complete the rain-street approach, generic evidence-workstation family, submission result and alone-with-coffee endpoint. No asset is approved or generated by this list. Intermediate multi-movement nodes need an authored reading cursor/binding review when their art becomes eligible; this pass does not rewrite frozen prose to create one.

## Reader V2 recheck - 2026-09-18

Opening still requires 19 composition families, with 0 exact production approvals. The first batch remains apartment morning master plus mirror, housing notice, medical package, closet jacket and departure toward Axiom. Maya text, thoughts and unchanged choices intentionally hold. Reader V2 collapses the art column here; no staging image or night apartment is used as a substitute. No opening artwork generated.

The full-height shell experiment was checked at 390px and desktop/tablet widths. Opening remains text-first with no empty art pane; Menu retains reading and save controls. Future approved/bound opening art will use the same desktop stage and mobile art-above-story layout. No new asset authority is granted. See [shell comparison gallery](../../review-saves/cinematic-reader-shell-review.html).
