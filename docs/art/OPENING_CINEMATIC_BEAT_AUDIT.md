# Opening cinematic beat audit

Status: implementation staging only. No paid generation, promotion, manifest binding, commit or push.

The opening commute remains one authenticated `commute.arrival` history entry. The reader derives four transient beats from that entry, and the cursor is held in UI state only. Missing art stays failed-closed, so text and decisions remain playable without inventing a visual asset.

## Ordered opening matrix

| Shot ID | Scene / trigger | Visual beat and continuity | Required art | Current status |
| --- | --- | --- | --- | --- |
| `opening.apartment.shot01` | `apartment.bond`, `apartment.reply`, `apartment.departure` | Adrian’s apartment master holds while positions and room state are unchanged. | Approved apartment master | Production / approved |
| `opening.apartment.inspect-lease` | Exact lease inspection | Object-led cut to the housing notice; returns to the room master after the inspection is no longer the latest action. | Housing-notice insert | Production / approved |
| `opening.apartment.inspect-medical` | Exact medical inspection | Object-led cut to the medical package. | Medical-package insert | Production / approved |
| `opening.apartment.inspect-mirror`, `opening.apartment.inspect-jacket` | Mirror or jacket inspection | No dedicated approved insert; hold the room master and fail closed for an unbound shot. | Optional future object inserts | Room-master fallback |
| `opening.axiom.shot01-approach` | `commute.arrival` beat 1 | Coat/phone, rain, Axiom exterior and employee entrance. Cut on departure from the apartment. | Axiom approach / entrance master | Missing |
| `opening.axiom.shot02-security` | `commute.arrival` beat 2 | Lobby queue, screening lanes, cameras and locked gates. Cut on the security-space change. | Security-lobby master | Missing |
| `opening.axiom.shot03-office-arrival` | `commute.arrival` beat 3 | Tray, badge, camera clearance, coat/phone recovered, inner gate/elevator and Strategic Intelligence arrival. | Office-arrival master; full approved composite required | Missing; M5 office environment remains component-only |
| `opening.office.shot01-daniel` | `commute.arrival` beat 4 and `office.daniel` | Daniel appears only after the authored arrival sentence. Hold through “Approach your desk” while positions remain unchanged. | Daniel waiting composition | Missing |
| `opening.office.shot02-benton` | `office.benton` | Daniel leaves; Benton enters with the data slate. Cut on participant and prop change. | Benton-at-desk composition | Missing |
| `opening.office.shot03-file` | `office.departure` | Benton leaves and the Helix file wakes on the slate. Cut on the authored file/action change. | File-on-slate composition | Missing |
| `opening.helix.shot01-brief` | `helix.brief` | The brief becomes the active work surface. Cut into the casework presentation. | Helix brief desk master | Missing |
| `opening.helix.shot02-documents` | `helix.documents` and `helix.analysis` | Hold the casework desk while records are read and relationships are tested. | Casework desk master | Missing |
| `opening.helix.shot03-review` | `helix.review` | Assessment review is a new authored work mode. Cut. | Review state composition | Missing |
| `opening.helix.shot04-submitted` | `helix.submitted` | Report submission completes the case action. Cut to the sent report state. | Submitted-report composition | Missing |
| `opening.maya.shot01-coffee` | `maya.promotion`, `maya.invitation`, `maya.case` | Maya arrives with two cups; hold through the conversation while positions and cups remain stable. | Maya coffee composition | Missing |
| `opening.maya.shot02-departure` | `maya.goodbye` | Maya leaves. Cut on departure. | Maya departure composition | Missing |
| `opening.office.shot04-alone` | `ending.complete` | The space beside Adrian’s desk is quiet again. Cut to the authored alone state. | Alone-at-desk composition | Missing |

## Runtime and continuity decisions

- The commute sequence is approach → security → office arrival → Daniel. The Daniel sentence is split for presentation only; the raw block remains intact in history and save bytes.
- `office.daniel` resolves to the same Daniel shot ID as the final commute beat. The “Approach your desk” action is gated until the final reading beat and does not create a premature cut.
- Daniel is never exposed by a commute beat before beat 4. A missing beat asset produces text-only presentation rather than a guessed binding.
- The approved Axiom office environment record `axiom-opening-office-master-v1-production` remains a component-only production master. It is not in `src/ui/approved-scene-art.json` and is not runtime-bound by this pass.
- Existing helix and Maya IDs express the authored cut/hold grammar, but their assets remain unavailable. No staging or placeholder image is promoted.

## Production order when art is authorized

1. Axiom approach / security environment family.
2. Full office-arrival composite with the component-only office geometry as a local reference only.
3. Daniel waiting composition, then Benton/file desk family.
4. Helix brief, documents/analysis hold, review and submitted states.
5. Maya coffee hold, departure, and the final alone-at-desk shot.
