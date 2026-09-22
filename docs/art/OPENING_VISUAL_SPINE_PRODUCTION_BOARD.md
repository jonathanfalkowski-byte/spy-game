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

| Order | Mode | Cut shot | Reader-state occupancy supplied by this unique asset | Canonical asset status | Current production note | Cumulative primary states occupied when approved |
| --- | --- | --- | --- | --- | --- | --- |
| H0 | HOLD | `opening.apartment.shot01` | 3: `apartment.bond`, `apartment.reply`, `apartment.departure`; mirror/jacket fallback | `RUNTIME_APPROVED` | Existing approved apartment master | 3 / 20 |
| 1 | CUT | `opening.apartment.inspect-lease` | 1 transient inspection state | `RUNTIME_APPROVED` | Approved exact inspection insert | — |
| 2 | CUT | `opening.apartment.inspect-medical` | 1 transient inspection state | `RUNTIME_APPROVED` | Approved exact inspection insert | — |
| 3 | CUT | `opening.axiom.shot01-approach` | 1: `commute.arrival` beat 1 | `MISSING` | Zero-credit staging prepared; no runtime asset | 4 / 20 |
| 4 | CUT | `opening.axiom.shot02-security` | 1 canonical reader state: all security prose in `commute.arrival` beat 2 | `STAGING` | Zero-credit staging prepared; no runtime asset | 5 / 20 |
| 5 | CUT | `opening.axiom.shot03-office-arrival` | 1: `commute.arrival` beat 3 | `COMPONENT_ONLY` | M5 component reference only; no runtime composite | 6 / 20 |
| 6 | CUT | `opening.office.shot01-daniel` | 2: `commute.arrival` beat 4, then HOLD through `office.daniel` dialogue, thought, choices and immediate response | `MISSING` | Adrian V2 orientation is pending generation; Daniel not generated | 8 / 20 |
| 7 | CUT | `opening.office.shot02-benton` | 1: `office.benton` | `STAGING` | Benton staging candidate exists; no runtime composite | 9 / 20 |
| 8 | CUT | `opening.office.shot03-file` | 1: `office.departure` | `MISSING` | Adrian + Benton/file action composite required | 10 / 20 |
| 9 | CUT | `opening.helix.shot01-brief` | 1: `helix.brief` | `MISSING` | Helix brief desk state required | 11 / 20 |
| 10 | CUT | `opening.helix.shot02-documents` | 2: `helix.documents`, then HOLD through `helix.analysis` | `MISSING` | Documents/casework composite required | 13 / 20 |
| 11 | CUT | `opening.helix.shot03-review` | 1: `helix.review` | `MISSING` | Review work-mode composite required | 14 / 20 |
| 12 | CUT | `opening.helix.shot04-submitted` | 1: `helix.submitted` | `MISSING` | Submitted-report composite required | 15 / 20 |
| 13 | CUT | `opening.maya.shot01-coffee` | 3: `maya.promotion`, then HOLD through `maya.invitation` and `maya.case` | `STAGING` | Maya coffee staging candidate exists; no runtime composite | 18 / 20 |
| 14 | CUT | `opening.maya.shot02-departure` | 1: `maya.goodbye` | `MISSING` | Maya departure composite required | 19 / 20 |
| 15 | CUT | `opening.office.shot04-alone` | 1: `ending.complete` | `MISSING` | Adrian alone at central desk required | 20 / 20 |

The security image fills one canonical reader state because its full screening
prose is one ordered reading beat. If the reader later pages that one beat into
separate displays, the same state-safe security master must HOLD across each of
those displays; it does not create another paid asset requirement.

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

## Immediate environment production specifications

These are exact **one-output maximum** methods for owner review. A provider
submission must record the account balance before and after completion, retain
the provider task receipt, and stop for human review. There is no automatic
retry. No prompt includes an API key or any other credential.

### `opening.axiom.shot01-approach`

- **One structural input:** `art/staging/opening/axiom-approach-zero-credit-staging.png`; use it for camera and entrance blocking, never as a style reference.
- **Output:** one 16:9 environment-first master, target 1920 by 1080.
- **Exact prompt:** `EVE opening, cinematic 16:9 Axiom Tower employee entrance in rain at early morning. Low-medium camera from the curb, tower and controlled employee entrance on the right, wet pavement and restrained reflections, a single lean adult office worker in a charcoal coat seen only from behind at a distance on the left third walking toward the entrance. Dark prestige graphic-novel, semi-cel rendering, controlled diffuse gray-blue morning light, architectural scale and quiet institutional pressure. Environment-first composition; the distant worker is only arrival blocking, not a face or character reference. No readable clock, signage, badge text, screens, logos, plot evidence, security incident, or additional named characters.`
- **Accept only if:** it reads as exterior approach; entrance is usable as the destination; the person remains distant and non-identifying; no legible invented text or state-sensitive plot prop appears.

### `opening.axiom.shot02-security` — current blank-screen priority

- **One structural input:** `art/staging/opening/axiom-security-zero-credit-staging.png`; use it only for the camera, lane, gate, and camera-bank geometry. Do not supply M5, a cast reference, a gala/style image, or a prior generated environment.
- **Output:** one 16:9 reusable security-environment HOLD master, target 1920 by 1080.
- **Exact prompt:** `EVE opening, cinematic 16:9 Axiom security lobby at early morning, viewed down a long controlled perspective through glass screening partitions and three employee lanes. Show a restrained employee queue, uniformed security staff, a ceiling camera bank, one scanner, an empty neutral belongings tray, a badge-reader plinth, a face-check floor marker, and a second line of locked inner gates leading toward elevators. Include one small non-identifying lean employee in a charcoal coat in the central lane as Adrian's spatial role; keep his face unreadable and do not make him a character portrait. Dark prestige graphic-novel, semi-cel rendering, controlled diffuse cool lighting, smoked glass, institutional order, usable negative space, precise durable architecture. This is a state-safe environment hold across queue, tray, badge, face check, scanner, green-light wait, and gate release. No readable clocks, signs, badge text, screens, logos, names, plot evidence, alarms, emergency action, visible scan result, or other state-specific event.`
- **Accept only if:** every required environmental anchor is visible; the gates, lanes, and camera bank have clear depth; the tray is generic and empty; no screen or light claims that a specific scan has already passed; Adrian is a non-identifying positional figure; Daniel and office furniture are absent.

### `opening.axiom.shot03-office-arrival`

- **One structural input:** `art/staging/opening/axiom-office-arrival-zero-credit-staging.png`, used only in an **environment** task to preserve the empty approach lane and central-desk relationship. It is never supplied to a character-generation task.
- **Output:** one 16:9 Strategic Intelligence arrival master, target 1920 by 1080.
- **Exact prompt:** `EVE opening, cinematic 16:9 Strategic Intelligence arrival immediately beyond Axiom's elevator and inner gate. Establish the quiet office threshold, smoked-glass director office relationship, restrained terminal glow, and a clear empty circulation lane from elevator arrival toward Adrian's central desk area. Adrian may be a small back-facing arrival figure near the threshold, never seated or already at the desk. Daniel must be absent. Dark prestige graphic-novel, semi-cel rendering, controlled diffuse office light, broad usable negative space, durable office architecture. This is an environment arrival master, not a desk conversation composite. No readable signage, clocks, terminal text, badges, report contents, character portrait, case evidence, coffee, or plot-state prop.`
- **Accept only if:** elevator/inner-gate-to-office continuity reads clearly; Adrian has not reached the desk; the central desk orientation and empty approach lane remain compatible with M5; Daniel is absent; the image is not presented as an M5 replacement or a runtime composite.

## Proposed paid-generation order

1. **Security environment master** — the current blank reader state; one reusable asset fills the complete security reading beat.
2. **Approach environment master** — completes the preceding exterior cut.
3. **Office-arrival environment master** — completes the post-elevator office-establishing cut.
4. **Adrian V2 character-only standing layer**, then human review.
5. **Daniel character-only layer** and deterministic M5 composite only after Adrian V2 passes.

After runtime approval and binding, the first three environment assets reduce the
primary blank-reader count from 17 to 14: approach 17 to 16, security 16 to 15,
and office arrival 15 to 14. The approved Daniel composite would then reduce it
from 14 to 12 because it occupies both the final commute beat and the unchanged
`office.daniel` dialogue hold.

## Exact next paid-generation recommendation

Authorize exactly one **security environment HOLD master** using the security
specification above and the single prepared security staging board. It is the
lowest-risk response to the live blank screen: no M5 reference, no character
identity reference, no state-sensitive plot prop, and no dependency on the
Adrian/Daniel layer pipeline. Stop for human review when the one output returns.

## Spend and repository status

- External paid generations in this pass: **0**
- Credits spent in this pass: **0**
- Production promotion: **none**
- Runtime binding or manifest integration: **none**
- Commit or push: **none**
