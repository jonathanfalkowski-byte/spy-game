# Art job — relight in-game art that fails the dark-noir gate (2026-09-24)

**Owner-approved** (2026-09-24): the art already shown in the game that is too bright should be
darker, matching the "dark noir, always" rule in [EVE_STYLE_LOCK.md](../art/EVE_STYLE_LOCK.md)
(the "Superseded" block and its luminance gate).

## What was measured

Every image the game references (`public/art`, matched against names in `src/ui/`) was checked on
a 320×180 greyscale downsample. **121 checked, 26 fail** the gate (mean ≤ 85 and ≥ 40% of pixels
< 50). Numbers below are `mean / near-black %`.

## Method (same as the gap-scene dark relight)

- Each v2 **relights the current file as image 1**, so layout, props and staging hold.
- Image 2 = a dark **lighting** anchor: `opening-apartment-master-v3-production`,
  `gap-scenes/service-garage-noir-v1-production`, or the harbour composite. Never sloane-brief,
  the daytime apartment v2 or clinic reception as the lighting anchor.
- Check the gate before anything reaches a comparison sheet; report each pick's numbers.
- Low-key: most of the frame charcoal/black, light as shapes, one warm practical against a cold
  window. Daytime = overcast/rain, blinds half-drawn, interior lights off.

## Step 0 — confirm each file is actually shown

The scan matched names referenced in `src/ui/`. Before spending credits, confirm with EVE Code
(`resolveSceneArt`) that each target is **runtime-bound**, not just a record or orphan. Skip and
list any that aren't. This matters most for the office v1 frames in Pass B.

## Pass A — backgrounds and objects (no faces). Do first.

| File | Now | Note |
|---|---|---|
| continuity/eve-bg-wardrobe-continuity-v2 | 141 / 21% | beige, bright vanity bulbs |
| continuity/eve-bg-glass-lobby-v1-production | 120 / 15% | beige lobby |
| continuity/eve-bg-sloane-office-continuity-v2 | 116 / 21% | sunlit office |
| continuity/eve-bg-glass-entrance-v1-production | 105 / 21% | light touch, already dusk rain |
| opening/axiom-casework-file-v1-production | 97 / 17% | flat grey, barely reads as a place: **redo** as a readable noir casework surface, not only a relight |
| continuity/car-rain-window-v1-production | 87 / 45% | borderline |
| opening/chapter4-assignment-index-v1-production | 83 / 40% | borderline |

## Pass B — character frames (identity must hold)

Use the style lock's faceswap finishing pass if a face drifts. Keep the clinic's clinical
white/steel/cyan identity in low-key: dim room, the window a cold overcast slab, light from the
practicals and monitors. **The clinic is never sexualized.**

| File | Now | Note |
|---|---|---|
| apartment/apartment-post-glasshouse-executive-v1 | 100 / 27% | old soft-blue apartment: **redo** on the v3 dark apartment geography; Evelynn styled per canon (hair done, heels) |
| opening/clinic-reception-v1-production | 103 / 23% | |
| opening/clinic-privacy-private-v1-production | 118 / 33% | |
| opening/clinic-privacy-stay-v1-production | 112 / 37% | |
| opening/clinic-privacy-v1-production | 102 / 42% | |
| opening/clinic-preparation-v1-production | 95 / 29% | |
| opening/clinic-voice-v1-production | 92 / 30% | |
| opening/clinic-voice-pause-v1-production | 88 / 33% | |
| opening/clinic-exam-private-v1-production | 87 / 47% | |
| opening/clinic-protocol-v1-production | 82 / 39% | |
| opening/clinic-recovery-mirror-look-v1-production | 81 / 27% | |
| opening/sloane-brief-v1-production | 89 / 54% | borderline; **keep v1 on disk**, it is the ink reference |
| opening/sloane-allegation-v1-production | 88 / 53% | borderline |
| opening/axiom-opening-office-shot04-alone-v1-production | 90 / 9% | may be an unbound v1 superseded by v3; confirm in step 0 |
| opening/axiom-opening-office-shot01-daniel-v1-production | 72 / 26% | same |
| opening/axiom-opening-office-shot02-benton-v1-production | 64 / 38% | same |
| opening/axiom-office-arrival-v1-production | 64 / 36% | same |

**Exempt:** `opening-apartment-housing-notice-v2` and `opening-apartment-medical-package-v2`.
They're document cards; leave them.

## Process

1. Quote the credit estimate (the last relight ran ~1 credit per candidate; ~24 targets × 2
   candidates ≈ 50 credits, plus any face fixes). Owner approves ZenCreator work, so proceed after
   quoting.
2. Stage as v2 candidates + records under `art/staging/full-game/relight-ingame/`, one comparison
   sheet **per pass** (before vs after, with numbers). No commits; production untouched.
3. Send Pass A as soon as it's ready; don't wait for Pass B.
4. On owner approval: promote as `-v2-production`, mark the replaced files not-runtime, and hand
   EVE Code the rebind list. Design verifies the build and suite, then commits.
