# Axiom Office M2 — Paid Retry Review

**Classification: REVISE.** The retry is a staging candidate only. It is not production-approved, production-promoted, runtime-bound, or manifest-integrated.

## Provenance and spend

| Field | Value |
| --- | --- |
| Retry asset | `axiom-opening-office-master-v1-m2-retry.jpeg` |
| Provider asset ID | `ef1cdbb0-ab4c-47c4-a0e5-1bde868c14b0` |
| Provider task / call | `ba43e258-983c-4a81-acca-ea20a34002d3` / `7bc68bce-5f3a-4f88-92a1-414c64c4e410` |
| Tool / model | `by_prompt` / `SEEDREAM_5` |
| Output | one 2560 x 1440 JPEG, 318,631 bytes |
| SHA-256 | `3B4FD9C3BB6E09BFE04A973EF18A44097D285B9D617FE633D5470034D8D700EA` |
| Quote | 1 art credit |
| Before balance | 353 credits |
| After balance | 352 credits |
| Observed account delta | 1 credit |
| Task-level billing returned by provider | No |
| Retry count / alternates | one completed output / zero |

The 1-credit quote and observed 1-credit balance delta align, but the provider returned no per-task billing field. This review therefore records the observed balance delta separately and does not present it as authoritative task-level billing. API-QA spending for this art retry is 0 credits.

## Three-way comparison

- [First M2 master](axiom-opening-office-master-v1-m2.jpeg)
- [Retry master](axiom-opening-office-master-v1-m2-retry.jpeg)
- [M1 geometry authority](axiom-office-m1/office-geometry.png)
- [M1 camera authority](axiom-office-m1/camera-anchors.png)
- [Three-way comparison board](axiom-opening-office-master-v1-m2-retry-comparison-board.png)
- [Retry Anchor B proposed crop](axiom-opening-office-master-v1-m2-retry-anchor-b-proposed.jpeg), source pixels `(560, 450, 1980, 1249)`; it is a review derivative, not a second camera or production asset.

## Geometry and continuity result

| Requirement | Retry result | Review finding |
| --- | --- | --- |
| Director smoked-glass office / door | Improved | A smoked-glass door and enclosed glass office are visible northeast/right of the primary desk area. |
| Daniel workstation relationship | Partial | Two secondary workstations are visible to the west/left, but the required two-desks-over relationship is not cleanly readable from Adrian's actual desk position. |
| Adrian desk orientation / guest zone | Failed | The primary desk faces the camera as a frontal cubicle. It does not read as the M1 north-south desk with a north guest corner. |
| Low divider for Daniel | Failed | The retry uses a tall cubicle wall, not the low divider that supports Daniel's lean while preserving faces and the desk surface. |
| Benton entry path | Partial | The director glass door and right aisle are present, but the exact open path to Adrian's desk edge is interrupted by the tall cubicle geometry. |
| Maya approach / departure | Partial | A right-side aisle exists, but it does not resolve into the required guest zone beside Adrian's desk. |
| Terminal / evidence surface | Improved, conditional | A blank terminal and separate right-hand desk surface exist. The frontal monitor and high divider still weaken the same-pixel B composition. |
| Adult-scale character blocking space | Failed | Three foreground chairs and cubicle walls consume the standing and floor-contact space reserved for Daniel, Benton, and Maya. |
| Style and palette | Failed | The retry is photorealistic office imagery with dominant white walls, rather than EVE's polished 2D semi-cel, charcoal/gunmetal prestige graphic-novel treatment. |
| Time-neutral continuity | Failed | A readable analog wall clock appears, creating a fixed unsupported time across the 08:10–12:11 reusable hold. |
| State-safe empty plate | Preserved | No people, cups, slate, files, papers, phone, coat, badge, reflection, or readable case evidence is baked in; the terminal is blank. |

## Camera anchors and nine-state reuse

| State | Retry assessment | Reason where needed |
| --- | --- | --- |
| 1. Daniel waiting / `opening.axiom.shot04-desk` | BLOCKED BY CURRENT MASTER | The low divider and exact two-desks-over relationship remain absent. |
| 2. Daniel / `opening.office.shot01-daniel` | BLOCKED BY CURRENT MASTER | Daniel cannot use the required low divider/guest-zone blocking. |
| 3. Benton with slate / `opening.office.shot02-benton` | SUPPORTED WITH CROP | Glass office and aisle give a partial entry basis, but crop must hide the tall divider conflict. |
| 4. Slate awake / `opening.office.shot03-file` | SUPPORTED WITH CROP | A slate can occupy the bare right-hand desk surface after approved later compositing. |
| 5. Evidence hold / Helix brief-documents-analysis-review | SUPPORTED WITH CROP | The proposed B crop has a blank terminal and desk plane, though high divider/monitor composition remains restrictive. |
| 6. Submitted terminal / `opening.helix.shot04-submitted` | SUPPORTED WITH CROP | Same B crop can hold a controlled terminal mask only after future approval. |
| 7. Maya coffee / `opening.maya.shot01-coffee` | BLOCKED BY CURRENT MASTER | No legible guest zone or coffee-safe arrival space beside Adrian's desk. |
| 8. Maya departure / `opening.maya.shot02-departure` | SUPPORTED WITH CROP | Right aisle can imply departure, but it does not establish the intended route through the guest zone. |
| 9. Adrian alone / `opening.office.shot04-alone` | SUPPORTED WITH CROP | A constrained desk crop can hold an Adrian layer, subject to later approval. |

Anchor A has improved door and workstation visibility over the first master but still fails the common floor-plane and low-divider composition. Anchor B is materially better than the first master because a terminal and separate desk surface are visible, yet it is not robust enough to validate the evidence family. The retry does not meet the reusable nine-state master threshold.

## Newly introduced regressions

1. **Readable wall clock:** explicitly prohibited by the approved retry spec and incompatible with a reusable 08:10–12:11 hold.
2. **Photoreal rendering:** replaces the first master’s clean-line semi-cel baseline with a photographic office image.
3. **Multiple foreground chairs:** increase the obstruction of character blocking and B-crop space.
4. **Tall cubicle treatment:** makes the divider issue more explicit than in the first master rather than correcting it.

## Recommendation and scope

**REVISE.** Do not promote, bind, or submit another office generation automatically. A human decision is required before any additional paid work.

- Exactly one paid retry output occurred under task `ba43e258-983c-4a81-acca-ea20a34002d3`.
- No alternate, automatic retry, character generation, prop-state generation, or additional office variant occurred.
- No production promotion, runtime binding, scene-art manifest integration, commit, or push occurred.
- Concurrent EVE CODE/design/QA work was preserved.
