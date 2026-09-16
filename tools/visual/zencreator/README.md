# Evelynn staging adapter

This offline adapter builds ZenCreator MCP image_editor requests from existing VisualAssetSpecs.
The agent calls MCP for upload, exact price estimates, submission, waiting and downloads.
It is not a network client and is never imported into the game.

Only the first four Evelynn canonical-view specs are accepted. Every view uses the original
approved gala source, uploaded without resizing. No generated candidate becomes a source of
canon. Requests use Seedream 5, one image each, no prompt rewrite, batching or LoRA.
The caller must show the exact estimated credits before submitting and must not resubmit
an uncertain task; resume by task ID.

stageCandidate builds only staging/pending records and ignores provider approval/path fields.
Validate its result using VisualAssetRecordSchema before adding it to the human-maintained
catalog. Download original bytes into the derived staging path, hash them, inspect dimensions,
and record the task/call/asset IDs. Do not save signed download URLs or credentials.
Requested dimensions belong to the spec; measured dimensions belong to generation provenance.

PASS/REVISE/REJECT are review recommendations, not human approval.
Stop after four candidates. The remaining five specs are planning records only.

## Separately authorized cast and scene pack

`pack.mjs` and `cast-scenes-plan.json` implement the subsequent owner request for the
remaining cast and scenes, including future Chapter 3 treatment concepts. This does
not expand the four-view adapter's scope. The pack has 9 cast designs, 20 empty
locations, 21 playable-story keyframes (including Executive, Socialite and Shadow
wardrobe preparation variants) and 15 future concepts.

`buildPackRequest` uses ordered image references: environment first, then characters.
`buildTextCastRequest` creates distinct cast designs without image conditioning;
the initial Maya image-conditioned pilot copied Evelynn too closely and was discarded.
All new cast designs and locations are provisional. Reviewed PASS candidates may be
used through `stagingReferences`; canonical-reference lookup still rejects them.

`art/staging/cast-scenes/generation-run.json` stores exact submitted requests and
measured original-file receipts. Submission snapshots retain task IDs for recovery.
`records.json` contains the selected pending candidates. The gallery and review report
separate future concepts, include branch restrictions, and do not bind art to runtime.
