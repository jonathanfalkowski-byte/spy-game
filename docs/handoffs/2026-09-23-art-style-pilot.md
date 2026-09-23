# Art job 1 — ZenCreator style-match pilot (2026-09-23)

Goal: prove ZenCreator reproduces the approved ChatGPT look before any batch.

1. Read `docs/art/EVE_STYLE_LOCK.md`, `docs/art/MAYA_EVELYNN_VISUAL_IDENTITY.md`, `docs/LANES.md`.
2. Upload the six style references listed in the lock's asset-id table (full size, no resize) and write their asset ids into that table.
3. Pilot frame: Chapter 5 shopping street with Evelynn (`C5-S02`).
   - Image 1: `art/production/chapter5/C5-S02-SHOPPING-STREET-MASTER-V1.png` (environment + style authority).
   - Image 2: `art/production/chapter5/apartment-components/evelynn-canon-three-quarter-v1.png` (identity).
   - `image_editor`, `SEEDREAM_5`, 16:9, width 1920, 2 images. Show the price estimate before submitting.
   - Before prompting, read the exact C5-S02 prose in `src/content/chapter5*.ts` for wardrobe, time and what she carries; do not add purchases she has not made yet.
4. Save candidates to `art/staging/full-game/chapter5/` with the usual provenance record (task/asset ids, hash, dimensions; no signed URLs).
5. Run the full-size QA gate from the lock and write a PASS/REVISE/REJECT note beside the candidates. Put the best candidate side-by-side with `sloane-brief-v1-production.png` for the owner.
6. Stop and message **EVE design overview** with the result. No batch generation until the owner confirms the style match.
