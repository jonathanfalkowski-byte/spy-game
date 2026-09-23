# Owner-made explicit frames

Claude sessions make art only up to suggestive or implied. The owner makes explicit
frames directly in ZenCreator, using the method proven on Undertow. This file gives
the owner everything needed for those frames to match the game. It deliberately
contains no explicit prompt text.

## Method (from Undertow)

1. **Model:** `image_editor` with `FLUX_KLEIN_NSFW` (the account has adult content enabled). Ratio 16:9, width 1920, 4 variants per frame, keep the cleanest.
2. **Image 1** is the approved lead-in anchor frame for the scene, listed below. This carries over the room, lamp position, palette and style. Add the character identity refs after it.
3. **Style:** include the locked style string from `EVE_STYLE_LOCK.md` word for word. Flux drifts photoreal, so expect to need step 4.
4. **Identity finishing pass:** `faceswap`, `SEEDREAM_5_PRO`, `swap_type: face`, using the neutral identity refs below. This restores the faces and keeps the pose.
5. **QA before use:** correct limb and hand counts, faces on-model, hair and wardrobe consistent with the anchor, nothing that contradicts the prose.
6. **Poses:** simple, upright two-person poses render cleanest. Reclining-partner poses tend to fuse limbs.
7. **Where frames go:** stage them in `art/staging/owner-explicit/`, then tell design which prose beat each one covers. Design and EVE Code bind them the same way as any other frame.

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
