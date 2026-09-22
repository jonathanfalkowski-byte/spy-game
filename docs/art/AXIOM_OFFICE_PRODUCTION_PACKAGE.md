# EVE ART M1 — Axiom opening office production package

20 September 2026 · `story/chapter-3-design` · inspected HEAD `3d774d7f73a323f08886d4c34932284ff14029c3`.

**Ready for human specification review. STAGING ONLY.** Proposed asset: `axiom-opening-office-master-v1`. No final environment, character layer, prop, composite or binding was approved or produced by this package. Spend: **0 credits**. No provider calls or live quotes. [Status reconciliation](ART_M1_RECONCILIATION.md) · [machine-readable dispositions](ART_M1_VISUAL_STATUS.json).

## Review materials

- [Physical chronology CSV](../../art/staging/opening/axiom-office-m1/chronology.csv) — all 14 requested runtime nodes plus completed-action detail; every continuity field included.
- [Shot-family CSV](../../art/staging/opening/axiom-office-m1/shot-family.csv) — 11 required IDs, one registered intermediate departure, and the existing dialogue/analysis holds.
- [Floor / geometry diagram](../../art/staging/opening/axiom-office-m1/office-geometry.png).
- [Camera and layer board](../../art/staging/opening/axiom-office-m1/camera-anchors.png).
- [Layer and authority specification](../../art/staging/opening/axiom-office-m1/package.json).
- [Staging receipt and hashes](../../art/staging/opening/axiom-office-m1/receipt.json).

Diagrams are symbolic production proposals, not approved geography, finished illustration or exact perspective proofs. Labels and circles are planning marks, never runtime art. No reference image has been altered or pasted into a new identity.

## G. Authored physical chronology

Controlling sources: `src/content/scenes.ts:88–286`, dynamic `sceneBlocks` at lines 293–376, `src/content/dialogue.ts` promotion/Benton/Maya response blocks, and `src/ui/scene-art.ts` `openingShot`. The CSV carries these source anchors. Facts below distinguish prose from layout choices.

1. **08:10, commute.arrival:** Adrian pockets his phone, wears his usual coat outside, trays both at security, scans his employee badge, passes the face check, recovers coat and phone, badges through the inner gate and travels by elevator to Strategic Intelligence. Daniel is waiting beside the desk when the elevator opens. The next continue label is **Approach your desk**. Do not place Adrian already at the desk in this arrival image. The recovered coat's later placement, phone pocket/location and worn badge placement are not authored.
2. **08:11, office.daniel:** Daniel is beside Adrian's desk/divider and delivers Priya's promotion news quietly. His own workstation is two desks over; its compass position is unassigned. Adrian has approached; the next node expressly says Benton arrives **before you can sit**. Adrian must remain standing through Daniel and Benton's entrance. Daniel's response to the chosen reaction precedes his departure; no new picture for each answer.
3. **08:14, office.benton:** Daniel pushes away from the divider and leaves. Benton's smoked-glass office door opens; he crosses the floor carrying a thin black data slate, then stops at the edge of Adrian's desk. Adrian has not been summoned inside. Daniel and Benton must not remain simultaneously posed at the desk in the final reached state. No slate-on-desk image before the response to Benton.
4. **08:16, office.departure:** all three Benton response branches explicitly put the slate on Adrian's desk. `benton.promotion` already opens the Helix file; obey/push do not establish earlier opening. Benton returns to his office; **the Helix file wakes on the slate**. Deadline 12:00; distribution Benton only. A shared final image after all this prose can show the slate on the desk and Benton absent. Do not invent a cable, transfer animation or separate paper dossier.
5. **08:18, helix.brief:** the acquisition brief identifies Helix, Novagen and Marcus Chen as sponsor. Marcus is not physically present and his identity/name is not proof of wrongdoing. The brief follows the desk/slate state; no new relocation, seating or terminal-transfer action is authored.
6. **helix.documents / helix.analysis:** source reading and connections use the existing casework UI. At least two records precede analysis; optional investigation and attached evidence vary. There is no authored walk, physical paper spread or new person. Use one neutral workstation view; exact earned content belongs in existing accessible UI.
7. **11:53, helix.review:** the conclusion can still be revised; the review includes records actually reviewed and connections actually recorded. There is no independent attachment-selection action to illustrate. It is **not sent**. Hold the evidence view; do not give each possible conclusion a paid scene or a success badge.
8. **11:54, helix.submitted:** report leaves Adrian's **terminal**, addressed to Benton only, with the chosen conclusion, reviewed records and recorded connections. This is the first unambiguous terminal transmission. No transfer from slate to terminal is described; the visual plan must bridge without inventing it. A neutral completed-send insert may change only after submission, not before. It must not imply a correct theory, approval, reward or wider distribution. Concurrent engineering edits clarified this wording in `scenes.ts` and `Casework.tsx` during M1; they were read and preserved, not authored by this art task.
9. **12:06, maya.promotion:** Maya crosses from compliance with two paper cups, sets one beside the terminal and keeps the other. At the current node's final art state, one cup is on Adrian's desk and one in Maya's hand. Neither two cups still in her hands nor a romantic greeting is the default final frame. Her navy suit, turned cuffs, loose black knot, warm brown skin and watchful eyes come from this prose; Lantern's black sweater is a different scene.
10. **12:08, maya.invitation:** conversation holds. The prior `mayaPromotion.deflect` response slides Adrian's cup closer. Use a small deterministic cup-position variant only for that completed response, not another paid composition. Expressions and internal feelings do not grant contact or mutual romantic meaning.
11. **12:10, maya.case:** Maya sees **Helix and Novagen on the report header**, not the report details. Screen angle, scale and shallow framing must allow the header distinction without leaking contents. Exact header can stay in prose/UI; do not generate legible private evidence into the background. Disclosure choices do not authorize showing Maya restricted pages.
12. **12:11, maya.goodbye:** chosen disclosure response, optional two desk taps if invitation=yes, private thought, then Maya lifts her own cup and starts back toward compliance. A terminal-facing return by Adrian follows. Final departure view may show Maya receding with one cup; Adrian's remains. The taps do not require a separate image under the current node-level resolver. Never substitute touching Adrian.
13. **ending.complete:** Maya is gone from the desk; Adrian takes a sip, coffee still warm, report already sent. This is a real hand/cup change, not a new location or romantic consequence. One retained cup, none left for Maya, no new files/phones.

**Unknowns intentionally preserved:** no authored desk dimensions, chair design/movement, compass orientation, exact hand dominance, Adrian seating after Benton, coat hook/storage, phone rest position, badge lanyard, office weather view at noon, or exact daylight direction. The diagram proposes geography; it does not retroactively turn these details into prose. Keep unauthored portable objects and lower-body transitions outside the frame rather than claiming new custody or gestures.

## H. Environment master specification

One empty 16:9 master, proposed working resolution **3840×2160**, delivery **1920×1080** after deterministic compositing. Higher working resolution supports an honest same-camera evidence crop; final provider capability and price remain unquoted. If source resolution cannot support B at readable quality, review a closer derived environment request rather than silently upscale or invent a new angle.

**Authored requirements:** Strategic Intelligence floor; Adrian desk and divider; work terminal/evidence surface; workable chair relationship without assigning a sitting event; Daniel's two-desks-over relationship; director office with smoked-glass door; open route from that door to the desk edge; compliance approach/departure route. Screens unlettered and neutral. No people/reflections, cups, slate, phone, coat, papers, badges or evidence baked into the base.

**Proposed arrangement for review:** desk long axis north–south in diagram coordinates, terminal on east side facing west toward the operator zone; stable empty chair west/south of that zone. Guest zone at the north desk corner beside a low divider, clear of the monitor and coffee landing area. Director door to northeast. Main aisle across the north connects the office route and east compliance route; Daniel leaves through the shared aisle with no claimed destination. Two neighboring workstations to west express “two desks over.” Leave a clear southwest camera/operator corridor. These directions are proposed, not source facts. Chair remains fixed across drawings; no “pulled out chair” animation is asserted.

Review a roughly 1.6×0.8 m desk and at least 1.2 m clear approach lane as practical scale proposals, not canonical room measurements. Calibrate at final plate approval using one floor plane, horizon and natural human scale; never resize furniture to fit layers. Divider must support Daniel's lean yet keep faces, slate placement and coffee landing area readable. No new full-building topology or mandatory glimpse into Benton's office.

**Coffee-safe region:** north/west accessible corner beside the terminal, separate from slate and controls, reachable by Maya without leaning across Adrian. Terminal faces Adrian; Maya's side view gives her a header, not detailed evidence. Proposed slate dock is simply a reserved flat surface, not a charging device. Placement and screen masks remain independent of the master.

**Style/light:** EVE Art Bible v1.0: polished 2D noir, confident lines, semi-cel shadows, restrained charcoal/gunmetal/cream; readable adult proportions, no photo/CG/anime redesign. Neutral diffuse office daylight and fixed practicals proposed for 08:10–12:11. There is no authored afternoon/sunset transition here. Avoid a strong sunbeam or readable wall clock that would invalidate a hold. Any morning/noon grading is a recorded whole-layer treatment, not regenerated furniture or an invented storm change.

### Property-scoped sources

| Source | Allowed use | Explicit exclusion |
|---|---|---|
| `docs/art/EVE_ART_BIBLE.md`, global cinematic rules | Rendering and shot grammar | No geography or character approval |
| `eve-bg-intelligence-floor-v1` staging | Compare office mood and spatial vocabulary | Not an approved layout/master; existing mugs, portable props and dense foreground desks prevent direct reuse as this prop-free plate |
| Current prose/dialogue | Authored people, slate/cup custody, required door/routes | Does not establish dimensions, left/right directions or a sitting event |
| `adrian-canon-identity-v2` | Face, approximate 34-year age, core hair, clean shave | Not body, pose, wardrobe or office geography |
| `ADRIAN_REFERENCE_AUTHORITY.md` | Lean ordinary body direction; charcoal shirt/trousers, belt, dark shoes, glasses | No generic full-body regeneration; no old broad-shouldered candidate as body authority |
| `eve-cast-daniel-v1`, `eve-cast-benton-v1`, `eve-cast-maya-v1` | Pending visual comparison only | PASS staging is not owner-approved identity authority; obtain bounded selection before their paid layers |
| Existing Lantern approved composite | Later exact scene only | Not an office Maya layer, navy suit or new global identity authority |

The empty office master requires no character identity reference. Prefer Art Bible direction and owner-reviewed office geometry. Do not feed provisional cast art as canonical authority. First review whether the old office staging can supply approved structure after deliberate owner selection; if not, request one new empty master after specification approval. Neither selection happens automatically here.

## I. Minimum camera family

**A — desk wide:** single fixed eye-level oblique camera southwest of the desk, aimed northeast. Natural focal length (about 45–55 mm equivalent as a proposal), no wide-angle stretch. Reserve full headroom for Daniel/Adrian standing and Benton's compact silhouette. Guest zone, divider edge, director route and terminal surface remain legible. Use the same pixels/coordinates for Daniel, Benton, Maya and alone states. Adrian can be omitted from the elevator-end establishing view: this does not assert he has already reached the workstation. Background occupancy remains off-camera; “desk alone” does not mean the entire working floor is empty of employees.

**B — workstation/evidence crop:** a fixed region of A from the same optical center, centered on slate + monitor + evidence surface. This is a compositional anchor, **not a second physical camera or rotated screen**. Object-led, no new seated/typing gesture required. Exact evidence comes from existing UI. At final plate approval, record integer crop bounds, terminal quadrilateral and prop anchor transforms. Do not invent calibrated pixel coordinates before the plate exists. The diagram marks the intended region, not an approved crop measurement.

**C — not needed for this office package.** Director and compliance routes are visible or implied offscreen from A; no separate reverse angle for ordinary entrances. Lobby/elevator/security are separate future opening-spine environments, not paid office views. A future paragraph-level presentation pass may expose intermediate movement; no new cursor or story transition is implemented now.

## J. Character-layer plan

Minimum **six unique paid character/pose sources**, subject to approval and technical viability:

| Layer | Pose/use | Reuse and limits |
|---|---|---|
| Adrian A-neutral | Restrained standing, relaxed shoulders/chest, same charcoal opening clothes, neutral attention toward guest/work surface | Required at Daniel/Benton before any sitting. Reuse for Maya by crop/occlusion without inventing a seating transition. Reviewing terminal is B object-led; no separate generated “typing” pose. If owner chooses a seated post-Benton view, it is a proposed staging choice requiring approval and one additional layer, never retroactive prose |
| Adrian A-sip | Matching same-camera upper-body/forearm-and-cup action for ending.complete | Continuous anatomy, correct single retained cup; no rubber-warped arm or pasted independent hand. Cup/hand contact reviewed together |
| Daniel A-divider | Long-limbed 32-year-old, dark curls, understated office clothing; beside/against divider | One pose across news/reaction; remove only after departure. No new tears, victory gesture or broad expression cycle |
| Benton A-slate | Compact 58-year-old, silver hair, fitted charcoal suit, controlled stance with thin black slate | Same camera and floor scale; slate layer registered to hand. Do not move held source to tabletop while hand remains grasping it; Benton is removed for the deposited slate state |
| Maya A-coffee | Navy suit/cuffs, loose knot; standing in guest zone with her cup, Adrian's cup already on desk | One pose holds promotion/invitation/case. Two-cups-carried arrival is an intermediate future movement, not an extra required paid pose in current reader |
| Maya A-departing | Same figure turning/stepping toward compliance with her cup | Cannot be manufactured by translating or flipping the standing source; one real departure pose. Remove for ending.complete |

Two additional optional layers only if specifically requested later: seated Adrian after approved posture staging; Maya carrying two cups for a future intermediate arrival beat. Do not generate these as speculative inventory. Daniel/Benton walking across the floor are currently prose-only intermediate actions; do not count new full-body sources for them.

## K–L. Props and Helix evidence family

| Independent element | Completed action/state | Implementation plan |
|---|---|---|
| Benton's thin black slate | In Benton's hand at office.benton; on desk after any Benton reply at office.departure | One object identity; hand-held contact/occlusion in Benton layer; matching flat tabletop source or local illustrated object. No second slate or invented device transfer |
| Slate screen | Awake with Helix assignment after departure; before this, no arbitrary unlocked case preview | Screen mask with neutral interface; deadline/distribution are sourced UI text. `benton.promotion` earlier opening is not a universal pre-choice state |
| Terminal | Existing workstation; report explicitly sent here at 11:54; only header visible to Maya | Stable hardware, separate blank screen region; no hardcoded theory, outcome, restricted names or publication |
| Source documents / analysis / review | Only records reviewed, connections recorded and chosen conclusion; no separate attachment picker | One B hold across brief/documents/analysis/review. Existing UI carries exact player state. Do not render a physical spread, Marcus portrait, “correct answer,” unearned Voss link or a fabricated paper dossier |
| Submitted-state insert | Only after actual send to Benton | Optional neutral sent indicator from existing state/UI, never success/approval/confidentiality breach. Different from pre-send review; any generated text must be replaced with controlled typography |
| Adrian paper cup | Beside terminal at Maya arrival; closer only after deflect; retained and lifted for final sip | One movable prop with same paper design, scale and contact shadows. Derive the closer location deterministically. Do not copy Maya's cup into Adrian's hand while leaving another on the desk |
| Maya paper cup | In her hand after placing Adrian's; leaves with her | Contact integrated with both Maya poses; no third cup or abandoned extra cup |
| Coat / phone / badge | Recovered at security; later exact positions unestablished | Not baked into master or placed on desk/chair/hook. Frame away from them. If a future wider shot reveals custody, resolve it explicitly first |

No paid standalone prop insert is assumed necessary for simple slate/cup geometry and controlled screen masks; local illustration/extraction must still pass full/desktop/mobile review. If truthful perspective or hand contact cannot be achieved, reserve **one optional prop sheet** instead of five full investigation scenes. Never cut a prop from an unapproved source and silently treat the result as approved.

## M–N. Maya and shot-family reuse

Maya is an office colleague at the authored desk, not Lantern Maya. Default coffee family: one cup on desk, one held; conversation holds regardless of private friend/love/colleague thoughts. The deflect cup slide is a conditional local transform. Goodbye ends in actual movement toward compliance; the final milestone removes Maya and changes Adrian's cup action. No kiss, hug, shared touch, visible secrets or outcome prediction. Invitation=yes desk taps remain prose at current node granularity.

| Shot ID | Treatment | Anchor / people / props |
|---|---|---|
| `opening.axiom.shot04-desk` | NEW COMPOSITION | A, Daniel waiting; Adrian outside picture. Endpoint establishment only, not lobby coverage |
| `opening.office.shot01-daniel` | LAYER VARIANT | A + Adrian after approach; Daniel holds divider pose. Same environment, meaningful completed approach |
| `opening.office.shot01-departed` | LAYER VARIANT, intermediate only | Remove Daniel before Benton; no current selectable intermediate cursor, excluded from count |
| `opening.office.shot02-benton` | LAYER VARIANT | A, Daniel absent; Benton held slate + standing Adrian |
| `opening.office.shot03-file` | PROP VARIANT | A, Benton absent, slate on desk/file awake; no terminal-submission claim |
| `opening.helix.shot01-brief` | REUSE / derived crop | B object-led slate/workstation, no new source scene |
| `opening.helix.shot02-documents` | INTENTIONAL HOLD | B; exact source content in existing UI; same for helix.analysis |
| `opening.helix.shot03-review` | INTENTIONAL HOLD | B; unsent conclusion/attachments remain in UI |
| `opening.helix.shot04-submitted` | PROP VARIANT | B terminal send state, only after submission, recipient Benton only |
| `opening.maya.shot01-coffee` | LAYER VARIANT | A, Maya held cup + one desk cup; hold invitation/case with conditional closer-cup transform |
| `opening.maya.shot02-departure` | LAYER VARIANT | A, Maya departing with her cup; Adrian's retained |
| `opening.office.shot04-alone` | LAYER / PROP VARIANT | A, no Maya, Adrian single-cup sip; report already sent |

The existing resolver has 11 office shot IDs over 14 nodes. A future integration must register each exact ID, validate phase/wardrobe/slate/cup custody and be reviewed separately; production art alone unlocks **zero** states until approved and bound. No binding is changed here. Because whole-node prose contains several actions, the currently selected final image must not be sold as paragraph-synchronized staging; review final-frame timing before later integration.

## O–Q. Zero-credit output, cost model and coverage impact

This pass creates the two local diagrams, CSVs and structured specification, not a production raster. The renderer and its receipt are saved with the staging package. Neither diagram is entered in the runtime catalog or manifest.

| Category | Minimum likely paid outputs | Assumptions |
|---|---:|---|
| Environment master A | 1 | One approved high-resolution prop-free office plate; B is a deterministic crop |
| Character layers | 6 | Two Adrian actions, Daniel, Benton, Maya conversation, Maya departure; cast authority selected first |
| Props/object inserts | 0 | Slate/cups/screens produced locally or lawfully extracted with review; optional +1 prop sheet if needed |
| Full-scene generations | 0 | All final scene states are deterministic composites |
| **Planning minimum** | **7 outputs** | Not a quote, authorization, guarantee or credit estimate; no retries included |

Contingencies: +1 seated Adrian only if the owner approves that optional staging; +1 separate B plate only if crop quality fails; +1 optional prop sheet. Thus **7 minimum / up to 10 with these named contingencies**, each separately justified and approved. A future paragraph-level two-cup arrival is extra scope and not included. No batch or automatic retry is authorized. Current provider/model/output capabilities and credits must be quoted later for the exact approved single-output request.

**Current opening:** three distinct reachable asset families in total; an ordinary no-inspection opening sees **one**, plus **0–2** optional lease/medical inserts when inspected in supported apartment phases. Office currently contributes **zero**. Later Lantern/clinic images are outside this opening milestone count.

**Potential office:** 11 mapped IDs collapse to **nine meaningful states** on the common path: (1) Daniel waiting, (2) Adrian approaches/Daniel, (3) Benton held slate, (4) Benton gone/slate awake, (5) B evidence view, (6) submitted terminal, (7) Maya with divided cup custody, (8) Maya departure, (9) alone sip. Documents, analysis and review reuse state 5; invitation and case reuse state 7. A completed deflect cup slide adds **one conditional prop state**, not a paid image. Daniel's intermediate departure and two-cup arrival are excluded because they have no current independent reader beat.

After completed approval **and separate integration**, estimate **10 meaningful states** for a normal no-inspection opening, **10–12** with optional apartment inserts; deflect could raise that to **11–13** if its deterministic cup variant is integrated. If submission is left exclusively in text/UI with no art-side insert, subtract one illustrated state. If the owner chooses an environment/Daniel-only hold instead of showing Adrian's approach, subtract one. These are conditional counts of distinct compositions/prop states, not 11 paid images or a claim that the opening spine is complete. Commute/security, mirror and jacket remain gaps.

## Continuity / review checklist

- [ ] Owner approves proposed desk/door/divider/aisle arrangement and one-camera crop strategy; positions are not yet geography authority.
- [ ] Empty plate has no cups, slate, coat, phone, papers, people or reflections baked in; terminal remains blank.
- [ ] A preserves headroom, door/aisle readability, ordinary Adrian scale and Daniel/Benton height distinction; no furniture warped to fit people.
- [ ] B is a recorded crop of the same pixels; final source resolution supports reader delivery; no counterfeit second perspective.
- [ ] Adrian remains standing for Daniel/Benton; later seating/coat custody is not invented; unspecified objects stay outside frame.
- [ ] Slate stays with Benton before response and on desk afterward; file awake is not a terminal send; one device identity.
- [ ] Submission mask follows actual completed action and shows no claim that player's theory is correct.
- [ ] Maya sees header only; Voss and other earned evidence do not leak; Marcus stays absent.
- [ ] Two cups total at Maya visit; deflect shifts only Adrian's; departing Maya takes her own; ending retains one cup with correct hand contact.
- [ ] Every generated source preserves exact model/tool/task/call/asset/cost provenance; every deterministic derivative records hashes, masks, scale, crop and z-order.
- [ ] Full-resolution, desktop-reader and mobile-reader visual reviews separately score identity, anatomy, wardrobe, pose, framing, environment, light, props, branch state, style and shot purpose.
- [ ] Human approval precedes production record; later exact binding/negative-branch tests cannot weaken existing guards or alter frozen saves.

## R–T. Validation, blockers and next paid asset

See [M1 reconciliation and validation](ART_M1_RECONCILIATION.md). No integration types were touched. The two original registry/provenance failures were corrected through factual metadata and stricter receipt accounting, without changing approvals or runtime. A separate current scene-art fixture setup failure is reported there; it was not bypassed. The metadata, source hashes and runtime invariants are checked separately.

**Before paid office work:** owner review of this proposed geometry/camera contract; confirm current supported output resolution and one-output live quote; select explicit style reference scope; approve bounded Daniel/Benton/Maya appearance sources before their layers; resolve any wide-shot coat/posture visibility before requesting it. Final slate/screen/cup masks need perspective/contact review against the approved plate. Later production promotion and binding require their own approvals. Mirror and C5 home failures do not block a prop-free Axiom specification; they must not be silently repaired as part of this package.

**Recommended first paid office asset:** one empty `axiom-opening-office-master-v1` candidate, 16:9, prop-free, with the A composition designed to support B. No characters, evidence text, cups or slate. Review the empty plate before spending on layers. No live quote or generation has occurred.

Roadmap retained: finish opening spine → Chapter 4 shared spine → Chapter 4 route variants → Chapter 5 non-Professional presentation balance → Chapter 6+ when implemented. No generations for those phases begin here.

**STOP FOR HUMAN REVIEW. Uncommitted and unpushed.**
