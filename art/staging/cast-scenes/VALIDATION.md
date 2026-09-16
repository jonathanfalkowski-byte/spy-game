# Pack validation — 2026-09-16

## Executive duplicate suit correction

The selected Executive image now contains exactly one suit held by Evelynn, with the evening gown and plain cocktail dress on the rail. The duplicate-suit candidate is archived as REVISE. Corrected PNG measured 1920 × 1080; hash and four pack tests passed. Current totals: 65 selected images, 69 generated originals including four archived candidates, 69 ledger-confirmed credits. This correction cost 1 credit. Earlier validation sections are historical.

## Three wardrobe-choice variants and perspective correction

Verified source options in src/content/clinic.ts: executive (dark suit), socialite (evening dress), shadow (understated cocktail outfit). Three new 1920 × 1080 PNGs show Evelynn in a robe holding the selected garment beside the rail, with feet, contact shadows and a short natural reach visible. The previous oversized robe image is archived with REVISE. Tactical gear was removed from the new scenes. The executive variant retains a spare blazer on the rail, recorded as a minor background refinement.

Current totals: 65 selected images (9 cast, 20 backgrounds, 21 playable keyframes, 15 future concepts), 52 QA PASS and 13 REVISE; 68 generated originals including three archived candidates; 68 ledger-confirmed credits. The new task cost 3 credits. Exact inputs and receipts are preserved. Four pack tests passed, including three explicit outfitDraft variants, and original-file hash verification passed. All artwork remains pending; no runtime asset binding or story logic changed.

## Owner-requested preparation correction

The selected wardrobe scene now shows Evelynn in an opaque tied ivory bathrobe before putting on the gown. The previous scene is archived. Current totals: 63 selected images, 50 QA PASS and 13 REVISE; 65 generated originals including two archived candidates; 65 ledger-confirmed credits. The revision is a 1920 × 1080 PNG, verified by SHA-256. Four pack provenance tests and git diff --check passed after replacing the gallery entry. The owner's style praise was recorded as feedback, not blanket canonical asset approval.

## Initial pack validation (before correction)

- 63 selected originals: 9 cast portraits, 20 empty backgrounds, 19 playable-story keyframes and 15 future Chapter 3 concepts.
- 49 QA PASS recommendations; 14 REVISE recommendations. All remain staging/pending owner review.
- One additional Maya pilot is excluded and marked REJECT; original and provenance retained.
- All 64 original PNG SHA-256 hashes verified against saved receipts.
- Portraits measured 1536 × 2048; backgrounds and scenes measured 1920 × 1080. All match requested dimensions.
- Six provider tasks completed, with ledger-confirmed charges totaling 64 credits. Exact requests, task/call IDs and task-specific transactions are in generation-run.json.
- 14 focused visual tests passed across visual.test.ts, visual-production.test.ts and visual-pack.test.ts.
- Typecheck and production build passed. Existing large-bundle warning remains.
- Gallery checked at 1440px and 390px viewport widths. All 64 images decoded, no broken images, no page errors, no horizontal overflow.
- git diff --check passed. Changes are uncommitted and unpushed. Existing unrelated review-results/journal-narrow-final.png modification was preserved.

The gallery's per-image notes and REVIEW.md describe required revisions. No art is bound into the running game, and no story, gameplay, save logic or dependencies were changed.
