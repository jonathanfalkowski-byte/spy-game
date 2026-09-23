# Art job — new noir backgrounds for the gap scenes (2026-09-23)

From EVE Code's blank-scene audit: after the environment fallback, 32 scenes (+8 partial)
have **no fitting existing master**. They need new **empty-environment** noir backgrounds in
the house style ([EVE_STYLE_LOCK.md](../art/EVE_STYLE_LOCK.md)). Grouped by reusable
environment below — far fewer than 32 unique images. **Empty rooms only** (no characters,
no outfit/identity/custody reveal), so each can safely serve multiple scene states.

Big batch — work by priority (most-reached first), stage per group, comparison per group,
owner approval per group, then EVE Code binds. Anchor each on the nearest approved noir
frame + sloane-brief for ink; keep it environment-only.

## Priority 1 — most-hit environments

| Environment (new master) | Scenes it covers | Anchor |
|---|---|---|
| **Helix executive suite** (exec floor 71, empty) | chapter3.executive, executiveWork, marcusRecord, marcusLeverage | glass-house reception / sloane-office |
| **Clinical records room** (empty) | chapter3.institutional, reviewQualification | clinic reception |
| **Helix review room** (Chapter 4 casework room, empty) | chapter4.room, assessment, privateAccess, complete | office frame |
| **Aster studio proof table** (empty) | chapter5.proof | shopping street / harbour |
| **Harbour room** (preview room, empty) | chapter5.room (outside its reading beats) | harbour composite |

## Priority 2 — Glass House and clinic

| Environment | Scenes | Anchor |
|---|---|---|
| **Glass House service gallery** (empty) | mission.exchange, confrontation | glass-house reception |
| **Descending elevator** (empty) | mission.debrief, debriefReply, warning1-3 | glass-house lobby/elevator |
| **Service garage** (empty) | mission.garage, complete | glass entrance / car-rain |
| **Empty consultation / exam suite** (no people) | clinic.profileReview, voice, voiceReply, stopConfirm, stopped; partial: examResult, makeup | clinic reception/exam |
| **Helix smaller reception** (empty) | chapter3.reception | glass-house reception |

## Priority 3 — evening/day-end/Ch5-6 personal

| Environment | Scenes | Anchor |
|---|---|---|
| **Rooftop terrace** (Harbour roof, empty, night) | chapter5.salon | harbour composite (night) |
| **A room near the harbour** (Sebastian's hotel room, empty) | chapter5.salon-room | night apartment master |
| **Noodle counter near Compliance** (empty, night) | chapter6.friction (Counter) | harbour / night apartment |
| **Strategic Intelligence office at dusk** (empty) | dayend.cautious | office frame |
| **Axiom gates, exterior** (empty) | dayend.walkaway | security lobby / exterior approach |
| **Lantern exterior** (empty, evening) | evening.goodbye | shopping street (night) |
| **Chapter 4 after-report beats** (empty) | chapter4.interest, outside, favor, power, intimacy | office / shopping street / apartment as fits |

## Also — the two inspection cards (rebuild on the v3 apartment master)

The `opening-apartment-housing-notice-v1` and `medical-package-v1` UI-card composites can't
be re-cropped (no crop script exists, and v3 is a new composition). **Rebuild both through
your pipeline on the v3 noir apartment master**: keep the card graphics and legible text
(the housing-notice text, the medical-package text) as an overlay on a noir crop/inset of
the v3 apartment. Promote with records; EVE Code rebinds in minutes.

## Notes

- These are **environment fills**, not scripted-beat art — empty rooms that the fallback and exact-state bindings can both use. Where a scene later earns a full character composition, that supersedes the environment fill.
- 4 scenes are reachability-unverified (chapter3.photograph, mayaFollowup, chapter4.handoff, chapter5.handoff) — skip unless EVE Code confirms they're reached.
- Standing spend approval. Stage in `art/staging/full-game/gap-scenes/<environment>/`. No commits.
