# Opening visual spine production board

Status: zero-credit production preparation only. This board creates no runtime binding, manifest entry, production promotion, commit, or push.

The playback rule is **cut when the authored spatial or action state changes; hold the current image through unchanged dialogue and choices.** A screen is visually occupied when its current cut state has an approved runtime composite. A component, staging image, or a missing asset does not count as runtime coverage.

## Coverage metric

This board tracks 20 primary reader states: three apartment states; four ordered
`commute.arrival` beats; `office.daniel`; Benton; file; Helix brief, documents,
analysis, review, and submitted; Maya promotion, invitation, case, and goodbye;
and the ending. The canonical code contract contains **15 required CUTs**:
the two exact apartment inspection inserts plus the 13 corridor/action cuts.
The approved apartment master is a separate HOLD anchor, not an additional CUT.
Mirror and jacket inspections HOLD that apartment master because no dedicated
inspection art is approved.

The previous 14-row table mixed that HOLD anchor with the 13 corridor cuts and
omitted the two required inspection CUTs. The table below separates the anchor
from the exact 15-entry code list.

| Order | Mode | Cut shot | Reader state(s) held by the shot | Canonical asset status | Current production note | Cumulative primary states occupied when approved |
| --- | --- | --- | --- | --- | --- | --- |
| H0 | HOLD | `opening.apartment.shot01` | `apartment.bond`, `apartment.reply`, `apartment.departure`; mirror/jacket fallback | `RUNTIME_APPROVED` | Existing approved apartment master | 3 / 20 |
| 1 | CUT | `opening.apartment.inspect-lease` | Lease inspection from `apartment.bond` or `apartment.reply` | `RUNTIME_APPROVED` | Approved exact inspection insert | — |
| 2 | CUT | `opening.apartment.inspect-medical` | Medical inspection from `apartment.bond` or `apartment.reply` | `RUNTIME_APPROVED` | Approved exact inspection insert | — |
| 3 | CUT | `opening.axiom.shot01-approach` | `commute.arrival` beat 1 | `MISSING` | Zero-credit staging prepared; no runtime asset | 4 / 20 |
| 4 | CUT | `opening.axiom.shot02-security` | `commute.arrival` beat 2 | `STAGING` | Zero-credit staging prepared; no runtime asset | 5 / 20 |
| 5 | CUT | `opening.axiom.shot03-office-arrival` | `commute.arrival` beat 3 | `COMPONENT_ONLY` | M5 component reference only; no runtime composite | 6 / 20 |
| 6 | CUT | `opening.office.shot01-daniel` | `commute.arrival` beat 4; then HOLD through `office.daniel` dialogue, thought, choices and immediate response | `MISSING` | Adrian V2 orientation is pending generation; Daniel not generated | 8 / 20 |
| 7 | CUT | `opening.office.shot02-benton` | `office.benton` | `STAGING` | Benton staging candidate exists; no runtime composite | 9 / 20 |
| 8 | CUT | `opening.office.shot03-file` | `office.departure` | `MISSING` | Adrian + Benton/file action composite required | 10 / 20 |
| 9 | CUT | `opening.helix.shot01-brief` | `helix.brief` | `MISSING` | Helix brief desk state required | 11 / 20 |
| 10 | CUT | `opening.helix.shot02-documents` | `helix.documents`; then HOLD through `helix.analysis` | `MISSING` | Documents/casework composite required | 13 / 20 |
| 11 | CUT | `opening.helix.shot03-review` | `helix.review` | `MISSING` | Review work-mode composite required | 14 / 20 |
| 12 | CUT | `opening.helix.shot04-submitted` | `helix.submitted` | `MISSING` | Submitted-report composite required | 15 / 20 |
| 13 | CUT | `opening.maya.shot01-coffee` | `maya.promotion`; then HOLD through `maya.invitation` and `maya.case` | `STAGING` | Maya coffee staging candidate exists; no runtime composite | 18 / 20 |
| 14 | CUT | `opening.maya.shot02-departure` | `maya.goodbye` | `MISSING` | Maya departure composite required | 19 / 20 |
| 15 | CUT | `opening.office.shot04-alone` | `ending.complete` | `MISSING` | Adrian alone at central desk required | 20 / 20 |

## Zero-credit staging prepared in this pass

### Axiom approach

Review board: `art/staging/opening/axiom-approach-zero-credit-staging.png`.

- **Cut trigger:** Adrian leaves the apartment; the text establishes rain, Axiom Tower, and the employee entrance.
- **Camera:** low-medium exterior approach, Adrian on the left third moving toward the right-side employee entrance; the tower supplies scale and destination.
- **Environment authority:** a new Axiom exterior entrance plate is required. It is not an office reuse problem.
- **Character requirement:** Adrian can be a separately generated approach layer after the environment is approved. This plate uses only a staging marker.
- **Cheapest reusable method:** one environment-first Axiom entrance master, then a separately extracted Adrian walk/arrival layer only if the approved exterior cannot truthfully hold without him.

### Axiom security lobby

Review board: `art/staging/opening/axiom-security-zero-credit-staging.png`.

- **Cut trigger:** the reader enters a distinct controlled security space: queue, screening lanes, cameras, badge check, and locked inner gates.
- **Camera:** long perspective through lanes, with Adrian readable in a controlled queue and the face-check camera legible ahead.
- **Environment authority:** a new security-lobby master is required; no M5 pixels or office reference are sent to any provider.
- **Character requirement:** anonymous queue silhouettes are sufficient for the environment master. Daniel is not present.
- **Cheapest reusable method:** one environment-first security lobby plate with state-safe queue blockers; use local overlays only for a later badge/face-check insert if that authored action must be isolated.

### Axiom office arrival

Review board: `art/staging/opening/axiom-office-arrival-zero-credit-staging.png`.

- **M5 use:** the board locally overlays only the frozen M5 desk geometry to prove the empty final approach lane. The M5 source pixels remain immutable beneath the staging overlay.
- **Required cut:** tray, badge, face clearance, coat/phone recovery, inner gate/elevator, then Strategic Intelligence arrival. Adrian must not already be at the desk.
- **Limit:** M5 does not depict the inner gate or elevator. Therefore this staging board is not a runtime-ready office-arrival composite and cannot be promoted as one.
- **Character requirement:** Adrian may be omitted from an elevator-end establishing frame. Daniel must not appear until the next `opening.office.shot01-daniel` cut.
- **Cheapest reusable method:** a single office-arrival environment/master with the inner gate/elevator sightline, then cut to the existing frozen M5 based Adrian + Daniel composite only after the authored arrival sentence.

## Daniel current status

The shot-01 spatial plan is approved for the central Adrian workstation. The neighboring workstation stays empty. Adrian V1 proved identity, extraction, registration, and clearance but remains **REVISE** solely for its front-ish body orientation. The refined V2 northeast three-quarter pose plate and M5/Daniel-silhouette preview are prepared; neither V2 Adrian nor Daniel has been generated. No runtime composite is ready to bind.

## Runtime implementation boundary

The current resolver exposes `commute.arrival` as four ordered visual beats:
approach, security, Strategic Intelligence office arrival, and Daniel waiting at
Adrian’s desk. The Daniel beat is the CUT; the same `opening.office.shot01-daniel`
shot then HOLDS into `office.daniel` dialogue. The security and office-arrival
IDs remain fail-closed until approved runtime composites exist.

## Next paid-generation recommendation

Authorize at most one **Adrian V2 character-only standing layer** from the prepared orientation pose plate, followed by human review before Daniel. It is the shortest path to the high-priority Daniel composition while preserving the rule that M5 is never supplied to the character provider. Approach and security remain staged until separately authorized.

## Spend and repository status

- External paid generations in this pass: **0**
- Credits spent in this pass: **0**
- Production promotion: **none**
- Runtime binding or manifest integration: **none**
- Commit or push: **none**
