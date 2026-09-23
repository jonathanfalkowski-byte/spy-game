# EVE full-game art coverage audit

Generated 2026-09-22 on `story/chapter-3-design` at current HEAD `e2b6b8671390d6967de9f12d1dd3038395c7b534`. No commit was created by this audit.

This is a source-level inventory plus resolver trace for the 175 authored runtime scene pages through Chapter 5. It is not an exhaustive traversal of every branch/action permutation, so the counts below must not be treated as a full-game denominator.

**2026-09-22 exact-state update:** five mutually exclusive `chapter5.echo` apartment table compositions are runtime-approved and branch-bound to `c05.purchase` (`save`/`nothing`, `phone`, `wardrobe`, `accessory`, `dinner`). They share the locked apartment camera and are not generic Chapter 5 fallbacks. The staged shopping decision image remains deferred pending a better identity/footwear treatment.

## Exact screenshot finding

The screenshot is `file.arrival`, titled **Something impossible**, at **Midday · Security exception**.

`resolveSceneArt` now resolves the approved Blackglass arrival shot for this node:

- `openingReadingBeats`: false
- `chapter5ReadingBeats`: false
- `homeSceneArt`: false
- `apartmentEndingArt5`: false
- `openingShot`: `opening.blackglass.shot01-arrival`
- asset: `blackglass-file-arrival-v1-production`
- result: approved art resolves and the reader mounts `.scene-art-stage`

The reviewed Blackglass sequence now has exact runtime bindings for `file.arrival`, `file.directory`, `file.authorized`, `security.intervention` and `security.escort`. Each state remains shot-scoped and fails closed outside its authored node.

## Current family status

| Family | Status | Coverage notes |
|---|---|---|
| Opening apartment | Runtime-approved | Bathroom M2 mirror is the first recognizable Adrian reveal for bond/reply; departure retains the established room master, with lease/medical/jacket inserts branch-scoped. |
| Commute | Runtime-approved | Approach, Security V2 and Office Arrival V1 are live; Daniel is the next authored CUT. |
| Blackglass / Sloane sequence | Runtime-approved exact states | Blackglass `file.arrival` through `security.escort`, Sloane `intro` through `offer`, and refusal lobby/reconsider use separate reviewed compositions; each binding is exact-state only. |
| Daniel/Benton/Maya/Adrian office | Runtime-approved exact states | Six reviewed style-v2 replacements are bound to Daniel, Benton, file action, Maya conversation, Maya departure and Adrian-alone beats; each remains shot-specific, not canonical identity or M5 authority. |
| Office casework inserts | Partial | The file/action CUT uses the reviewed style-v2 desk frame; brief, documents, review and submitted remain older object-focused provenance shots. |
| Maya departure | Runtime-approved exact state | `opening.maya.shot02-departure` / `maya.goodbye` uses the reviewed departure frame with cup custody preserved. |
| Clinic | Partial | Reception through preparation plus branch-aware voice, face, recovery, wardrobe, makeup, presentation-review, rehearsal, profile, mirror-look and farewell shots are runtime-approved; departure and other branch-specific pages remain bounded or missing. |
| Mission / Glass House | Partial to missing | Reception, assessment and method now have exact-state runtime art; most mission-floor pages and home outfit IDs remain missing. |
| Chapter 3 | Conditional only | Outfit-specific post-Glass-House home art and the monitored-phone surveillance cut are bound; other continuation pages are missing. |
| Chapter 4 | Partial | Exact entry, consequences, public-records resource and assignment/index cuts are bound; later case, power, intimacy and handoff pages remain missing. |
| Chapter 5 | Exact-state islands only | Home, Harbour, Aster and phone-ending shots are exact branch assets; broad families remain missing. |
| Evening Lantern | Bounded | Disclosure/closure hold only; other evening pages remain missing. |

## Approved components that are not safe generic bindings

- `eve-bg-sloane-office-continuity-v2`: approved environment component, but Sloane is already active in `sloane.intro`; a character composite is required.
- `c5-s02-shopping-street-master-v1-production`: shopping-street environment authority only; the authored shot requires Evelynn and branch-safe purchase staging.
- `c5-people-night-apartment-master-v1-production`: night-lighting authority only; tea/thread states and branch props are absent.

Two exact environment holds were safe to bind without new art: `mission.car` → `car-rain-window-v1-production` and `mission.arrival` → `eve-bg-glass-entrance-v1-production`. The reviewed reception, assessment and method candidates now have separate deterministic bindings for their named states. The reviewed Blackglass and Sloane/refusal sequences also have separate deterministic bindings for their named states; each remains exact-state only and does not claim generic casework, executive-floor or later release coverage. The other components remain unbound because a generic fallback would violate CUT/HOLD, prop custody or the approved shot plan.

## Genuine missing packages

- Release, evening-warning and day-end branches.
- Clinic departure and any branch without an approved participant variant.
- Glass House mission states beyond the exact reception, assessment and method islands.
- Chapter 3 continuation beyond the conditional home and monitored-phone surveillance cuts.
- Chapter 4 pages beyond the exact entry, consequences, resource and assignment/index cuts.
- Chapter 5 spend, people, return, desire, handoff and branch-specific ending families.
- Opening Maya departure.

Chapter 5 branch coverage includes voucher redemption, phone/blouse/clasp/lunch purchases, save/nothing, message-thread selection, Julian/service outcomes, uncertain/declined/intimate/withdrawn outcomes, and exact return-state custody. Existing exact assets must remain branch-scoped.

## Release interpretation

The earlier 20-position opening fixture is not a full-game denominator. The current opening fixture is now 20/20 runtime-visible and the 15-cut cinematic coverage report is complete. The full-game requirement—art on every playable page beyond the opening—remains unmet and requires new reviewed art packages.

The three environment holds and the reviewed Blackglass sequence were promoted locally with unchanged pixels and exact SHA-256 records; no provider call was made. No story, save/schema, or gameplay change was performed. The machine-readable inventory is [eve-full-game-art-coverage.json](C:/Users/Admin/Documents/Codex/2026-09-14/files-pasted-by-the-user-we/outputs/eve-chapter-3-design/eve-full-game-art-coverage.json).
