# Opening Visual Production Plan

**Status:** `opening.apartment.shot01` is approved, promoted, and exact-bound. The remaining opening families are planning/staging-spec only.

## Current truth

The opening path emits authored shot IDs, but none currently map to approved production art. `resolveSceneArt` correctly returns the textual fallback with `SHOT_WITHOUT_APPROVED_ASSET` from the first apartment screen through the early office, Helix, Maya, and ending beats. The approved apartment images are Chapter 3 Evelynn states; they cannot cover Adrian’s promotion morning. The approved Lantern image covers a later meeting route only.

## Composition-family audit

| Family | Shot IDs | Current coverage | Runtime state | Production decision |
|---|---|---|---|---|
| Apartment opening hold | `opening.apartment.shot01` | Missing; historical day apartment is staging-only and incomplete for this state. | Text fallback. | P0 new apartment master. |
| Apartment inspections | `opening.apartment.inspect-mirror`, `-lease`, `-medical`, `-jacket` | Missing. | Text fallback after exact inspection action. | P0 four object/mirror inserts; no generic cut. |
| Axiom arrival / desk | `opening.axiom.shot04-desk` | Missing. | Text fallback. | P1 Axiom office master may cover only after exact arrival review. |
| Daniel / Benton entries | `opening.office.shot01-daniel`, `opening.office.shot02-benton` | Missing. | Text fallback. | P1 derive character layers from the office master. |
| Helix investigation | `opening.office.shot03-file`, `opening.helix.shot01-brief`, `-shot02-documents`, `-shot03-review`, `-shot04-submitted` | Missing. | Text fallback. | P1 dossier/table family with exact state variants only where needed. |
| Maya coffee / departure | `opening.maya.shot01-coffee`, `opening.maya.shot02-departure` | Missing; later Lantern asset is incompatible. | Text fallback. | P1 Maya layer and a distinct departure/absence hold. |
| Opening aftermath | `opening.office.shot04-alone` | Missing. | Text fallback. | P1 office-derived object-led aftermath. |

## P0 production order

1. **`apartment-opening-master-v1`** — rainy promotion-morning environment, Adrian state, readable apartment geography, no character required.
2. **`apartment-opening-insert-housing-notice-v1`** — exact lease inspection only.
3. **`apartment-opening-insert-medical-package-v1`** — exact medical inspection only.
4. **`apartment-opening-insert-jacket-v1`** — exact jacket inspection only.
5. **`apartment-opening-insert-mirror-v1`** — exact pre-transformation mirror inspection only.

## P1 production order

1. **`axiom-opening-office-master-v1`** — establishes office geography and compositing anchors.
2. **Daniel and Benton layers** — entry actions only; preserve the master environment.
3. **`axiom-opening-helix-dossier-table-v1`** — object-led evidence family, followed only by separately reviewed state changes.
4. **Maya coffee layer** — arrival, coffee custody, and later departure must be distinct completed beats.
5. **`axiom-opening-alone-aftermath-v1`** — post-departure hold without showing a selected assessment.

## Definition of done

For each candidate: create a staging record and review it against the Art Bible at full, desktop-reader, and mobile-reader sizes. Confirm shot ID, branch/state trigger, time of day, character/wardrobe, prop custody, and no future-state information. A human PASS plus explicit production approval is required before adding it to a production records file, regenerating the reader manifest, and binding the exact shot ID. Reuse the apartment or office master only when camera, room state, people, and props remain truthful.

## Next production gate

The smallest useful art-production action is one **P0 opening apartment environment master**, environment-first and without a character if identity coverage is not ready. It needs a live provider/tool quote and owner review before any generation. No ZenCreator call is authorized by this plan.

## Execution update — 2026-09-18

The apartment authority is intentionally split. `apartment-post-glasshouse-executive-v1-production` remains the approved architectural source for the stable camera, window wall, sofa, chair, wardrobe, mirror, door, counter, room scale, and square-tile floor. Its later Evelynn state prevents direct opening use. Adrian has only a staging/provisional visual reference, so the opening master remains environment-led until a separately approved Adrian authority exists.

`apartment-opening-master-v1` was generated once into staging from that architectural authority. It remains **REVISE** because an unapproved wall clock had a visibly incompatible time. `opening-apartment-master-v2-production` is a zero-credit deterministic local derivative: the clock was removed within a declared circular wall-only region, then it passed review and was exact-bound to `opening.apartment.shot01`. It is bounded authority for the first-screen environment only.

### Exact opening insert plan

| Exact shot ID | Trigger | Visible subject | Reuse source | Needed layer / action | Cost gate |
|---|---|---|---|---|---|
| `opening.apartment.shot01` | Initial `apartment.bond` hold | Rainy apartment geography; no character required | Approved apartment architecture, then an opening master only after review PASS | Environment master | One reviewed generation if no deterministic correction is possible |
| `opening.apartment.inspect-mirror` | `INSPECT_APARTMENT` with `mirror` | Pre-transformation mirror context only | Opening apartment master | Shot-specific mirror insert; no transformed reflection | Review before any paid work |
| `opening.apartment.inspect-lease` | `INSPECT_APARTMENT` with `lease` | Authored Axiom housing notice | Opening apartment master | Legible notice insert on its authored surface | Review before any paid work |
| `opening.apartment.inspect-medical` | `INSPECT_APARTMENT` with `medical` | Annual endocrine screening package | Opening apartment master | Object insert without inventing result or diagnosis | Review before any paid work |
| `opening.apartment.inspect-jacket` | `INSPECT_APARTMENT` with `jacket` | Adrian's pre-transformation jacket in closet context | Opening apartment master | Object/closet insert; no later wardrobe state | Review before any paid work |

Every insert is a completed-action cut. None may replace the base hold before its trigger, and none may establish an identity, medical result, or later chapter state.

### Reusable Axiom office family plan

Create one opening-era Axiom office environment master only after the apartment family is production-ready. It must lock desk positions, Daniel/Benton entry paths, smoked-glass geometry, terminal sightlines, and the desk evidence surface. Generate or composite character layers only for their completed entrances. The Helix brief, documents, review, submitted state, Maya coffee arrival, Maya departure, and alone aftermath require separate state-review checks; a master does not authorize those states by itself.

### Opening completion gate

Opening coverage can be called complete only when all required composition families have a human-approved production asset and exact runtime binding: apartment base hold; four inspection inserts; Axiom office master; Daniel and Benton entrance states; Helix dossier states; Maya arrival/departure states; and the office-alone aftermath. For each binding, verify the actual trigger, branch/state, wardrobe, prop custody, full-resolution appearance, desktop-reader appearance, mobile-reader appearance, and fallback behavior for any unbound shot.
