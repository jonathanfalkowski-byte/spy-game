# Owner-made explicit frames

> **SHELVED (owner, 2026-09-24).** EVE is now a Mature game: no explicit CGs in the base
> game; intimate CGs are heat 3 at most. See
> [../story/CONTENT_DIRECTION.md](../story/CONTENT_DIRECTION.md). This workflow is kept only
> in case an optional consensual-only 18+ patch is ever made.

Explicit CGs are in scope for EVE (owner, 2026-09-23), in the **same noir house style**
as every other frame. This is the standing pipeline for them: the **owner** generates the
explicit images and their prompts directly in ZenCreator, using the method proven on
Undertow, anchored on the approved noir frames so they match the game. Claude sessions
supply the anchors, identity refs, wardrobe/camera/continuity and the explicit *prose*;
they do not generate explicit images or write explicit-image prompts. This file
deliberately contains no explicit prompt text — the per-scene physical reference is the
scene's explicit prose card (e.g. `docs/story/intimate/cards/c5-sebastian-night.md`),
which already lists the continuity facts, numbered physical beats and heat.

## Method (from Undertow)

1. **Model:** `image_editor` with `FLUX_KLEIN_NSFW` (the account has adult content enabled). Ratio 16:9, width 1920. Generate **4 variants per frame** and cull the cleanest — Flux is artifact-prone per generation, so culling is how you get a clean one.
2. **Image 1** is the approved **noir** lead-in anchor frame for the scene (below). It carries the room, lamp position, palette and — critically — the noir style. Add the character identity refs after it.
3. **Style:** include the locked noir style string from `EVE_STYLE_LOCK.md` word for word. Flux drifts photoreal and off-style, so expect to need step 4 to pull it back to noir and on-model.
4. **Identity + style finishing pass:** `faceswap`, `SEEDREAM_5_PRO`, `swap_type: face`, using the neutral identity refs below, and/or a Seedream restyle pass anchored on the noir frame. This restores the faces and the noir look while keeping the pose.
5. **Poses:** simple, upright poses render cleanest (standing, kneeling-behind, seated). Reclining-partner poses fuse limbs. Flux also **exaggerates male anatomy** — constrain it in the prompt and check it.
6. **One frame per position/movement beat.** The picture must match the prose pose exactly (strip → nude-standing; "on top" → that pose). Regenerate rather than hand-wave a mismatch.
7. **Where frames go:** stage in `art/staging/owner-explicit/`, then tell design which prose beat each covers. Design and EVE Code bind them like any other frame.

## HARD QA gate — every explicit frame, full-size (never skip)

Review each pick at **full resolution**, not the contact sheet (contact sheets under-detect these). Reject and reroll on any failure:

1. **Anatomy:** each person has exactly two arms and two legs, all present, no fused/extra/missing limbs; hands ~five fingers; one head each.
2. **Pose matches the scene:** the depicted position matches the prose beat this frame is for; no contradiction with the words.
3. **Identity on-model:** faces match the canon refs; Evelynn and Maya stay distinct; Sloane's streak never appears on anyone else.
4. **Style is noir:** ink lines, flat cel shading, hard graphic shadows — not photoreal, not Undertow's illustrated look.
5. **Wardrobe/props consistent with the anchor** and with what the prose has removed or kept.
6. **No hard-limit breach:** never the clinic sexualized, never a coercion scene; only scenes Evelynn chooses.

A frame that fails any check is not used. Approval and runtime binding follow the normal record process.

## Identity refs

| Character | Asset id |
|---|---|
| Evelynn, no jewellery (neutral) | `0555c297-b834-4e6f-8148-9f6295c194e6` |
| Sebastian, portrait B | `3fe07f0e…` (full id in `art/staging/full-game/chapter5/jobs-5-6-records.json`) |

## Scene packs

### C5 · Sebastian, hotel room (`c5-sebastian-night`)

- **Anchors:** art job 7, frame 7 lead-in master `1f4df211-70d8-43dc-a33e-1bdaffbdaa93` (clothed kiss by the lamp, his hand at her nape, rings on the dresser), and frame 8 aftermath `f0382b59-4511-476e-9c9c-5c4dd68cd8e1` (same room and camera, covered, implied). Staged in `art/staging/full-game/sebastian/`.
- **Room:** small warm hotel room, one lamp (keep its position from the anchor), overhead light off, the cello case against the wall, lit towers through the window, silver rings on the dresser.
- **Evelynn:** hair down after the pins come out. The charcoal dress and black heels come off during the scene.
- **Sebastian:** black open-collar shirt and dark trousers, rings already off.
- **Prose beats:** see `docs/story/intimate/cards/c5-sebastian-night.md`. One frame per position or movement beat, and the picture must match the words (Undertow rule).
