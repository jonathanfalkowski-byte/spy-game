# Apartment camera calibration: immutable wide plate

Production metadata only, prepared 2026-09-17. No story, save schema or runtime binding changes.

## Authority and limits

Background: `art/staging/apartment/apartment-evening-v1.png`, 1920 x 1080.
SHA256: `326579ca20394213b388ab204e328303cf81fd0b67a5734ede57f73984fc65ee`.
The owner accepted this empty plate for conditioning, recorded in
`art/staging/apartment/outfit-execution.json`. It preserves a usable empty room,
including the original table and mirror. It is not the rejected Chapter 5 generated
room and is not a new production promotion. The occupied post-Glass-House production
image remains an existing reference; no character removal or architecture repaint was
performed on it.

This empty plate has a bright exterior despite its filename. It does **not** establish
a passing 22:30 Chapter 5 lighting state. Preserve it unchanged; a separately approved
night plate would be needed for a final night shot. Do not conceal this mismatch by
silently relighting the background.

## Screen-space anchors

Coordinates are original canvas pixels, origin top left. They are manually observed
visual guides, not surveyed measurements or a claim about canonical physical height.

| Anchor | Canvas position |
|---|---|
| Original tabletop polygon | (232,978), (501,979), (646,917), (398,908) |
| Armchair seat | (722,817) |
| Armchair floor contact | (824,938) |
| Mirror top / visible base | (330,352) / (437,765) |
| Crouching character near foot | approximately (850,975) |
| Releasing fingertips | approximately (603,932), just beyond placed phone |
| Door | Cropped: do not use as a measured full-height ruler |

Read depth from floor lines and the chair/table contacts together. The crouched
silhouette should fit beside the chair; extrapolated standing height must fit the
room at the same depth. Never compensate by scaling furniture. A single scalar does
not solve an incompatible pose perspective: review feet, pelvis, reach and occlusion.

## Chapter 5 compositor proof

Calibration ID: `apartment-evening-wide-v1`. Composition:
`C5-S12-SHOT05-PHONE-COMPOSITE-V1`, shot `c05.s12.shot05-phone`.

The new isolated layer is 1464 x 1821. Uniform scale **0.20**, top-left **(600,615)**,
renders **293 x 364** pixels. Its crouch is about 360 pixels high; the slightly more
distant chair is about 260 pixels from back to feet. This is a plausible visual-fit
estimate for review, not a calibrated 3D camera solution. Full head, hands and shoes
remain in frame. No horizontal flip.

Phone layers are 160 x 80 with transparent padding, uniform scale 0.48:
Axiom center **(481,956)**, purchased personal phone center **(560,931)**.
Both complete visible alpha silhouettes fit inside the measured original tabletop.
Exactly two phones; no object remains in her hand. Fingers extend past the placed
phone in a release posture; the depicted movement timing remains subject to review.
Adrian's jacket remains unseen inside the closed wardrobe. Mirror and hooks are intact.

Branch: professional; purchased phone unboxed; place-phone completed; editorial
declined; no issue/photo/new evening arrangement. Generic handset shell designs
identify custody via metadata, not invented branding or device capabilities.

The external staging folder `eve-chapter-5-art-production/staging/compositor/apartment-phone-v1`
(sibling project under `outputs`) contains `assets.json`, `composition.json`,
`calibration.json`, calibration overlay, source/extraction receipts, PNG and coverage
mask. The compositor records SHA256 and unchanged uncovered pixels. Its mask proof
does not replace visual review.

**Review: REVISE.** Room preservation and reduced scale pass this technical/visual
proof; the character still has high heels, apparent shoulder cutouts and an ambiguous
ear loop, with small white matte holes in the hair. The plate's bright exterior does
not match the final night state. No automatic retry or promotion. These are layer/
approved-plate readiness issues, not permission to redraw the apartment.

## V2: authorized zero-credit technical cleanup

The preceding review describes V1. V2 keeps every character/phone/shadow placement
unchanged and uses the separately derived `apartment-night-canon-derived-v1` candidate.
No canonical source or production image is modified. New night-plate SHA256:
`9be6cd50a7cc21633f22837b4bbb9b6ee3e2525299c467e4b1b8a53a28ba9b4f`.

Lighting-only transform: base gamma1.06/RGB gains0.64,0.67,0.72; four original window
panes gamma1.12/gains0.19,0.23,0.28 with 1px mask blur; existing practical-light pool
gamma1.02/gains0.97,0.87,0.74, 100px mask blur, opacity0.78. Exact mask vertices/LUTs
are in the external V2 `night-settings.json` and derivation receipt. Geometry retains
identical coordinates; RGB colors intentionally differ. Repeated derivations match.

Character cleanup changes alpha only: near-neutral brightness fade210→242, maximum
channel spread25, hair cleanup polygon, protected face/blouse polygons and 2px edge
neighborhood. Exact polygons are in V2 `matte-settings.json`. 12,335 alpha pixels
changed, zero RGB changes, identical 1464x1821 dimensions. Canonical identity and
wardrobe authority remain separate.

V2 receipts verify **2,014,484 uncovered pixels identical to the derived night plate**,
zero changed uncovered pixels, identical repeat renders and unchanged V1 transforms.

Game-size inspection uses unchanged `src/ui/styles.css` in an offline Chromium review
harness, without runtime binding. At desktop viewports1920 and1440 the image is
880x495 and896x504 CSS pixels; at mobile390 it is350x196.875. Device scale factor1.
This distinguishes game visibility from magnifying the isolated character source.
The external review and screenshots live under
`eve-chapter-5-art-production/staging/compositor/apartment-phone-v2`.

**V2 review: PASS with LOW/POLISH notes, pending human acceptance/promotion.** At the
measured display sizes the shoes read as ordinary dark pumps, shoulder color reads
as warm contour light, and the tiny ear line is not identifiable as dangling jewelry.
The source's higher heels remain a non-authoritative source detail; this scene does
not redefine footwear canon or become a character/wardrobe master. Hair no longer
draws attention as a cutout; nighttime read is established without geometry change.
If accepted, authority is limited to this exact shot, placement, lighting and reached
professional phone-state branch. No other branch is approved by this review.
