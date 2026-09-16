# Apartment package delivery — 2026-09-16

## Latest update: outfit images generated

The owner accepted the background and instructed generation. All six outfit PNGs now exist: executive, socialite and shadow/plain, before and after Glass House. The new batch cost 6 quoted credits (9 total including the earlier backgrounds). See [outfit gallery](outfits.html). They remain staging/pending. Review notes flag scale, shoe and plain-dress differences; nothing was promoted. Prior hold statements below are historical and superseded.


Current status: generation authorized; three environment PNGs generated and all marked
REVISE. The first has a ghost jacket in the mirror; the correction removes it but the
floor remains elongated. The evening pass still misses the floor grid and evening light.
Three completed requests were quoted at one credit each (3 credits total). Exact params,
task/call/provider IDs, file hashes, dimensions and reviews are in `execution.json`,
`correction-execution.json` and `evening-execution.json`. Original outputs are retained.

The requested outfit images are NOT complete. Six pending specifications now cover
executive suit, socialite gown and shadow/plain dress for pre- and post-Glass House home
beats. Further generation is held until an environment passes; no tasks remain queued.
No asset was promoted or bound to runtime. Naming an asset `canon` does not grant approval.
Validation: 32 visual tests and TypeScript typecheck pass. Changes remain uncommitted.

The sections below describe the initial specification handoff before generation.

## Inspection result

Twelve apartment image/spec pairs were found in the selected cast-scenes catalog and
production plan. All twelve PNGs were inspected at full size and their original hashes
checked. No approved apartment image was found. Review details, original metadata and
prior decisions remain in `inspection.json`; `review.html` displays each original.

`eve-bg-apartment-day-v1` is the best partial base (PASS for fragment review only).
It is a blue-dawn window/chair/kitchen corner, not a whole-apartment layout. Eleven
other apartment candidates are REVISE for this continuity package. None is discarded;
their historical reviews and files are unchanged. The new review does not imply a
retroactive rejection of every image's style or character rendering.

Main differences: two versus three window columns, padded versus exposed-arm chair,
counter/curtain changes, flat-topped versus spired tower, moving lamp and jacket,
unlocated foreground desks, wrong pre-gala lighting/case placement and unchosen attire.
There is no inspected source for bedroom, bathroom, sofa or full-length mirror geometry.

## Decisions and files

`docs/art/APARTMENT_CANON.md` defines sourced facts, observed corner geometry and
proposed unseen geography separately. It includes modest fixed furniture, materials,
palette, a no-balcony proposal, personal anchors, grounded employer-support cues,
mirror physics, transient props and a scene-by-scene continuity cross-check.

Four cameras: entry/living wide, wardrobe mirror, couch and kitchen/private-hall
transition. Five time/use specs: day, evening, night, post-clinic and post-Glass House.
The master plus these nine views make ten stable pending IDs in `records.json`.

Created:

- `docs/art/APARTMENT_CANON.md`
- `art/staging/apartment/README.md`, `inspection.json`, `records.json`, `review.html`, `price-estimates.json`
- `tools/visual/zencreator/apartment-plan.json`
- `tests/state/apartment-canon.test.ts`

Modified only the offline catalog import and documentation indexes:
`src/visual/catalog.ts`, `art/README.md`, `tools/visual/zencreator/README.md`.
The gameplay, story prose, save schema, content version, original images, coverage
bindings and existing approvals were not modified. The unrelated dirty
`review-results/journal-narrow-final.png` was left alone.

## Provider / cost

ZenCreator `image_editor` / `SEEDREAM_5`, 16:9, width 1920, intended 1080 height, one
output, batch/sequential/rewrite false. The exact held master payload and source UUID
are saved in the plan. Master quote: **1 credit**. Configuration comparison found this
among the cheapest available options; stronger-fidelity options cost 2 or more.
Actual cost: **0 credits**. No new generated asset IDs or task IDs exist.

Tentative budget is 3 credits for three unique images: master, night, mirror. Only the
master has a concrete quote; follow-ups require the reviewed master UUID and fresh
quotes. Day and entry roles may reuse master bytes only if composition passes those
purposes. Nothing is auto-approved by reuse. No video, upscaling or broad variants.

## Validation and approval boundary

31 visual tests passed, including all four new apartment tests. Typecheck and tracked
diff whitespace checks passed. Tests verify exact pending IDs, catalog validation,
no fake receipts, original hashes/reviews, source UUID and no runtime tool imports.
No external network behavior is tested.

Generation is held under the owner's Phase 6 instruction allowing a spec-first stop.
Approve or revise: the unseen entry/private-hall/bedroom/bathroom layout; separate
bathroom and dressing mirrors; jacket in closet; fixed chair orientation relative to
the window; modest sofa/work/bed furnishings; flat-topped Axiom skyline identity.
These choices are currently proposals, not facts extracted from the day image.

Story follow-ups are identified in the canon document, not silently applied: closet
versus hook, the named bathroom mirror versus full-body observations, chair facing
the rain, case beside wardrobe, actual weather/lighting/outfit and treatment status
notes. No hard implementation requirement for a content-version change was found.

After spec approval, generate only the master and review its geometry. Final image
approval remains a separate owner decision. Stop at this apartment package.
