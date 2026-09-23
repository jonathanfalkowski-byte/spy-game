# Opening mirror — zero-credit staging / production contract

> **Superseded runtime update — 2026-09-22:** The owner-reviewed candidate `adrian-first-bathroom-mirror-apartment-v1-candidate` has been promoted unchanged as `adrian-first-bathroom-mirror-apartment-v1-production`. It is runtime-approved only for `opening.apartment.shot01-mirror` at `apartment.bond` and `apartment.reply`; the optional Bathroom mirror inspection holds this same shot, and `apartment.departure` retains the existing apartment master. The status and blocker language below is historical planning context and does not revoke this exact binding.

## Current owner decision — 2026-09-20 (EVE ART M1)

**STAGING COMPOSITION: OWNER APPROVED.** The owner confirmed prior human review of the displayed existing M2 composition: framing concept, camera relationship, and mirror/reflection blocking concept only. This supersedes the diagram receipt's former pending status; it is a newly recorded prior decision, not a backdated production approval. Exact prior review date is not asserted. Original image bytes, source hashes, method and spend are unchanged.

| Stage | Current status |
|---|---|
| Existing M2 staging composition | OWNER APPROVED — planning/staging authority only |
| Final bathroom environment / plate | NOT APPROVED |
| Final Adrian character layer | NOT PRODUCED / NOT APPROVED |
| Final mirror composite / runtime asset | NOT APPROVED / NOT BOUND |
| Production promotion | NOT AUTHORIZED / NOT PERFORMED |

The approved concept does not establish final dimensions, materials, bathroom geography or lighting. The symbolic diagram is not final anatomy. M2 remains distinct from M1. Production remains blocked on the final bathroom plate and shot-specific layer/composite review. The final candidate in `art/staging/opening/records.json` therefore retains `role=staging`, `approvalStatus=pending`. The separately scoped [diagram receipt](../../art/staging/opening/mirror-blocking-v1/receipt.json) now records the owner-approved concept and original pending provenance.

Earlier dated entries below are historical snapshots; their pending **composition** language is superseded by this decision. Their final-environment and production limits remain in force. No generation, credits, promotion or binding.

## Visual staging follow-up — 2026-09-19

The owner requested a picture and delegated the next step. A [zero-credit schematic review board](../../art/staging/opening/mirror-blocking-v1/opening-mirror-blocking-v1.png) now makes the M2 aperture, symbolic upper-body position, ray path and separate approved references visible. [Local receipt](../../art/staging/opening/mirror-blocking-v1/receipt.json) records the output and source hashes. It is an aperture/framing diagram, not a perspective-rendered final shot, bathroom plate, identity composite or art approval. The symbolic torso ends at the waist for measurement; final artwork must use the specified continuous human figure and coherent crop. Bathroom geography remains proposed and production status remains BLOCKED. No paid generation, source-image change or runtime binding; cumulative spend remains 30.

Date: 2026-09-19. Inspected branch: story/chapter-3-design; HEAD: 518c0b73aa5fa82418cf99523693e2820b5c7c60.

**Staging/specification: COMPLETE. Mirror production: BLOCKED — bathroom M2 framing/geometry is not established by the approved opening master.** Adrian face, documented body and wardrobe authority are sufficient; no full-body reference is required. Proposed method B needs one future shot-specific character layer after bathroom staging approval. No generation is authorized here. Spend this pass: 0; cumulative Adrian art spend: 30 credits.

## Exact runtime continuity

Sources: src/content/scenes.ts (inspections and opening nodes), src/content/dialogue.ts (bond/morning choices), src/state/reducer.ts (INSPECT_APARTMENT and availableIntents), src/ui/scene-art.ts (openingShot and shotBindings). These are inspected evidence, not files changed by this pass.

- Inspection title is **Bathroom mirror**. Exact thought: “Thirty-four. Eleven years at Axiom. Senior analyst for four of them. Still waiting for someone else to decide I am ready.” No gesture, walking route, bathroom dimensions or exact standing position is authored.
- At apartment.bond, 06:42, rain crosses the windows; Axiom Tower is visible; Adrian expects the deputy-director decision. His phone lights up on the counter with Maya's drinks invitation. Relationship choices lead to apartment.reply, 06:44, where the invitation awaits an answer. Morning replies lead to apartment.departure, labelled only Morning; the unused jacket remains in the closet.
- The inspection is optional and unordered. availableIntents offers every uninspected apartment item throughout scene=apartment, including bond, reply AND departure. It can follow another inspection, a bond choice or an already-sent morning reply. Do not assert that Maya is unanswered in every mirror branch, or that the exact time is always 06:42.
- Completing INSPECT_APARTMENT with id=mirror adds inspected mirror, fact/knowledge apartment_mirror and the thought to feedback/history; it does not advance the node, move a prop, change wardrobe or establish identity acceptance. Repeat inspection is rejected. The visible composition must work across all three apartment phases without displaying message/reply state.
- There is no fixed following action. Another inspection selects its own insert; a bond/morning choice returns the opening base shot selection; departure CONTINUE reaches commute.arrival. Mere reading/considering choices does not change the ledger or shot.
- The exact mirror selection predicate is scene=apartment AND latest ledger action INSPECT_APARTMENT/mirror. Mirror has no approved binding and retains SHOT_WITHOUT_APPROVED_ASSET/text fallback. This contract does not change that behavior or the existing base-hold guard after inspections.
- At commute.arrival (08:10), Adrian pockets the phone and pulls on his usual coat, then security trays the coat/phone and returns them. None of that has happened at mirror inspection. The separate unused closet jacket stays unworn. Promotion news, Benton/Helix assignment, Maya's office arrival, clinic and transformation are all future.
- Runtime gives no shirt/trouser color, exact glasses construction, posture or bathroom lighting fixture. Those are separately scoped visual canon or proposals below, never retrospectively claimed as prose.

## Shot / authority contract

| Field | Required contract |
|---|---|
| Shot ID / staging asset | opening.apartment.inspect-mirror / apartment-opening-insert-mirror-v1 |
| Trigger | Completed legal mirror inspection, latest action, any opening apartment phase; never before selection |
| Character / body state | Adrian Vale, age 34, pre-transformation; lean ordinary adult male, average-to-slightly-narrow shoulders, restrained physical presence |
| Location | Bathroom mirror M2; NEVER living-area dressing mirror M1 |
| Environment | OPENING-APARTMENT-MASTER-V2 = opening-apartment-master-v2-production, art/production/opening/opening-apartment-master-v2-production.png; SHA256 74a7c8bb5508fb9a603e3742cd0ccb9cb036cc1aa2456caf7df0f5b0af866e99 |
| Environment limits | Master locks visible room geometry, furniture, wall layout, M1 position, objects and rainy light. It does not show M2/basin/interior bathroom. No room regeneration, moved mirror or reclassification of M1 as bathroom |
| Face | adrian-canon-identity-v2, art/reference/adrian/adrian-canon-identity-v2.png; SHA256 0809f5f17547fb2fe44aa9eaa5f014b292cbfa9d1656b10e827fd77a39612c58; face/age/core dark hair/clean-shaven analyst identity only |
| Body / wardrobe | docs/art/ADRIAN_REFERENCE_AUTHORITY.md property-scoped V2 canon; matte charcoal business shirt, charcoal tailored trousers, plain black leather belt, understated black dress shoes only if visible; no tie, jewelry, watch or badge |
| Glasses | Thin understated rectangular dark-neutral professional frames; exact portrait frame geometry is not mandatory |
| Coat | No worn outer layer indoors. Do not invent a coat hanging in frame. Closet jacket remains separate and unworn |
| Time / light | Rainy promotion morning: 06:42 / 06:44 / Morning according to reached node. Preserve master cool dawn/restraint and neutral face readability; no invented clock or dramatic bathroom spotlight. Bathroom light direction remains a review item because its spatial source is unshown |
| Pose | Natural upright balance, shoulders relaxed and unsquared, chest neutral, arms resting naturally at sides. Hands may fall below crop; no cuff/glasses gesture is needed or asserted |
| Expression / purpose | Neutral, thoughtful, mildly preoccupied, competent and pleasant-looking. Low visual amplitude: ordinary restrained life baseline, not sadness, self-loathing, glamour, horror, heroic framing or transformation foreshadowing |
| Camera / crop | Eye-level medium waist-up reflection in a 16:9 delivery frame. Complete head/hair with breathing room; glasses/face/shoulder breadth/torso readable. Belt/trouser top only if natural. No shoe/full-body requirement, hair crop, low angle or broadening perspective |
| Required objects | Bathroom mirror M2 and its frame; basin edge only if the approved geometry warrants it. No handheld object. Phone stays outside this frame; no invented readable screen |
| Forbidden future state | No Evelynn likeness/overlay, altered body, clinic garment, medical result, Helix evidence, future package/card/phone, surveillance device, promotion outcome or chosen romantic meaning |
| Production method | B recommended conditionally; A assessed first; C not selected. See method review |

## Mirror geometry — feasible proposal, not newly approved geography

APARTMENT_CANON.md explicitly distinguishes M1 on the wardrobe return from M2 above a basin in the bathroom. Its private-hall location and approximate M2 size are proposals. The master does not establish the bathroom doorway destination or wall layout. Do not derive a bathroom by cropping the visible tall dressing mirror, and do not use a mirrored copy of the living-room master as a background.

Local coordinate notes provide a physically possible staging solution for owner review; metres are illustrative, not canonical Adrian height or surveyed apartment measurements. Let mirror plane be y=0, real room y>0, x lateral, z up. Proposed M2 aperture: x=-0.325..+0.325, z=1.00..1.85 (0.65 by 0.85 m). Adrian centre stands at (0,0.75), eyes z=1.65; illustrative shoulder envelope x=+/-0.20. Camera C=(0.48,1.20,1.65), aimed toward the virtual upper body. Adrian looks into his own reflection, not toward the camera. Use natural perspective, not a wide-angle body stretch.

For any real point P=(x,0.75,z), its virtual reflection P'=(x,-0.75,z). The straight line C to P' intersects y=0 at fraction 1.20/1.95. Face centre hits x=0.185; shoulders hit x=0.062..0.308, within the aperture. A hair top z=1.80 hits z=1.742; waist z=1.00 hits z=1.250. Thus complete head through waist fits without stretching body or mirror. These are preflight dimensions, to be recalibrated against an approved bathroom plate.

Camera self-reflection hits mirror x=0.48, outside the right edge 0.325. At Adrian's depth the face sightline passes x=0.369, outside the +/-0.20 body envelope: the camera can see the reflection without looking through Adrian. Frame the mirror and a narrow wall margin; no direct Adrian body portion is needed. If any direct shoulder enters a final crop, it must agree with this same pose and occlusion, not become a second independently posed Adrian.

Top view (diagram only):

    virtual Adrian (0,-0.75)
               .
    -------- M2: y=0, x +/-0.325 --------
               .  reflected ray
    Adrian (0,0.75)       C (0.48,1.20)
    real bathroom y>0

Reflection shows only Adrian and an approved plain bathroom wall behind him. Do not insert Axiom/window/kitchen/door reflections without a verified ray path. Proposed basin is below the torso sightline; its actual dimensions/occlusion need the same bathroom review. Mirror transform reflects depth, not an arbitrary horizontal flip of a portrait; facial asymmetry, shirt seams, lighting and any visible hand must agree with a single real figure.

## Beat / layer plan

| Beat | Condition and visual result |
|---|---|
| Before inspection | Preserve current lawful visual/fallback; no preview of mirror action |
| Completed mirror action | One M2 medium insert, Adrian's normal baseline, exact thought shown by existing UI |
| Reading / choices pending | Hold; no extra cut for expression, dialogue or micro-gesture |
| Next completed action | Use actual resolver result; do not carry reflection across another inspection or departure |

Future layer order: approved bathroom plate and empty reflected wall; one shot-specific Adrian reflected layer; aperture mask; existing frame/basin foreground occlusion; only physically justified glass treatment. Record plate and layer hashes, camera coordinates, uniform scale, crop, mask and z-order. Preserve all uncovered plate pixels; no repaint of master architecture or relighting to conceal mismatch. The present pass creates no raster composite because neither a truthful bathroom plate nor compatible Adrian pose layer exists.

## A / B / C method review

| Method | Assessment |
|---|---|
| A: deterministic existing-material composite | First preference, currently not credible. Inspected canonical V2 is a bare-shoulder identity portrait, not a waist-up clothed pose. The three-quarter candidate crops head/hair and hands and retains broad chest/shoulders. Historic full-body attempts have rejected posture/proportions/framing. Cropping, face-pasting or nonuniform narrowing cannot honestly recover missing silhouette or perspective. Wardrobe-color evidence is reusable; rejected body/pose never becomes authority. No approved M2 plate exists either |
| B: one shot-specific Adrian layer | Recommended after bathroom staging approval. One complete-head-to-waist layer, relaxed arms/chest, V2 identity and documented wardrobe, perspective/light matched to approved M2. This is a future real-shot need, not another generic reference. A compatible approved bathroom plate is a separate prerequisite; one character layer alone cannot solve missing geography. No call/quote/spend here |
| C: generated complete scene | Not selected. Would risk recreating locked apartment geometry and spending on a problem B can address once a bounded bathroom view is approved. Only revisit if A and B demonstrably fail and owner explicitly authorizes the scope |

## Future review / unblock criteria

Owner review must first confirm a bounded M2 bathroom view and aperture/camera/lighting proposal consistent with M1 remaining unchanged. An existing verified M2 source or an explicitly approved local bathroom set specification/plate can satisfy this; a new full-body Adrian reference cannot. No proposal here grants environment approval. Until then: **BLOCKED for production; specification complete and reviewable**.

For eventual final shot, review at full resolution, desktop-reader and mobile-reader scale: recognizable V2 identity and clean shave; complete hair/head; thin readable glasses; lean nonheroic shoulders/torso; natural restrained pose and thoughtful expression; correct charcoal shirt/belt/trouser state; credible sightlines, aperture, occlusion and one consistent reflection; bathroom M2 rather than dressing M1; preserved environment/light; no future props, wardrobe leakage or narrative outcome; ordinary life tone without self-loathing/glamour/gender commentary. Record PASS/REVISE/REJECT per property. Human art approval, any later production promotion and exact binding are separate gates outside this pass.

## Next reusable office production family

Recommend axiom-opening-office-master-v1: lock Strategic Intelligence desk/divider layout, smoked-glass director door, Daniel's two-desks-away relationship, entry paths and evidence surface. Follow with a restrained shot-specific Adrian layer, Daniel entry layer, Benton/slate layer, state-specific Helix dossier inserts, Maya/two-coffee arrival and departure layers, then quiet alone aftermath. Reuse one environment wherever exact reached state permits. Review morning-to-midday/afternoon light rather than blindly reusing identical exposure. Remove Daniel before Benton; do not show Maya before arrival or after goodbye. Evidence/document selections and submitted conclusions cannot leak across branches. Existing Benton white-shirt staging is not Adrian wardrobe authority. No office art generated here.

## Boundaries and validation

This is planning/staging metadata only. No image promotion, runtime binding, save/schema/content revision, provider operation, commit or push. Source image bytes remain unchanged. Current staging record stays role=staging / approvalStatus=pending, with no fabricated file, hash, provider receipt or generation cost.

Validation: check:references PASS (both frozen source hashes unchanged); five visual test files: 26 PASS / 1 FAIL; typecheck PASS; build PASS (existing large-chunk warning); git diff --check PASS. The failing visual-pack provenance test expects every eve-cast-scenes-v1 receipt in cast-scenes-plan.json, but existing adrian-opening-full-body-v1 and adrian-opening-full-body-v2-outpaint are absent there. The test, plan, catalog and Adrian records match the pre-edit file hashes; the mirror record has no generation receipt and is outside that test's filtered records. This pre-existing mismatch was left untouched.

Preservation audit compared 1,396 pre-edit tracked/untracked file hashes. Only the six intended existing art documentation/metadata files changed through this pass, plus an externally changed vite.config.ts (not edited by this pass; left untouched). The new mirror contract is the sole new repo file from this pass. All other baseline files, including runtime/content/persistence/QA, manifest and image bytes, match. HEAD remains 518c0b73aa5fa82418cf99523693e2820b5c7c60. Nothing committed or pushed.
