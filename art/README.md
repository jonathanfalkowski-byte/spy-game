# EVE visual production

The [Art Bible](../docs/art/EVE_ART_BIBLE.md) is production/design authority, not game
state. The [review checklist](../docs/art/ART_REVIEW_CHECKLIST.md) applies to all
important candidates. The supplied [Evelynn gala reference](reference/evelynn/README.md)
and the owner-approved front and three-quarter portraits are the canonical images.

The [cast and scene review gallery](staging/cast-scenes/gallery.html) contains the
new 3:4 cast portraits, 16:9 empty locations, playable-story illustrations and future
Chapter 3 concepts. These remain pending staging artwork. A QA PASS means a candidate
can serve as a provisional conditioning reference; it is not owner approval.
`stagingReferences` keeps these dependencies distinct from `canonicalReferences`.
The coverage map is a production plan, not a runtime asset binding.

## Approved first continuity correction batch — 2026-09-16

The owner authorized the exact four quoted edits (1 credit each, total 4), then delegated
Art Bible review and promotion of passing outputs. All four completed. Codex inspected
the full-size PNGs against the Art Bible and checklist; this is delegated visual review,
not a claim that the owner personally reviewed the new images.

Three assets passed and were copied unchanged into `production/continuity/`: the wardrobe
background, Maya’s black-sweater scene and the daylight office background. The Sloane
scene stays in staging: daylight passes, but the silver streak remains on the wrong
anatomical side. No extra paid retry was submitted. Canonical references are unchanged.

See [the four-image review](staging/cast-scenes/continuity-review.html),
[exact request/quote receipt](staging/cast-scenes/continuity-batch-receipt.json), and
[approved records](production/continuity/records.json). The original quoted proposal is
retained unchanged as historical evidence. Production approval does not turn on runtime
selection; guarded bindings are a separate implementation step.

`editSources` identifies the image being corrected. It does not approve that source as a
canonical identity or conditioning reference. Missing and cyclic correction dependencies
are rejected by the catalog validator.

## Asset roles

- `reference/`: explicitly approved canonical visual references.
- `production/`: approved assets intended for the game; not automatically references.
- `staging/`: unapproved candidates awaiting review.
- `rejected/`: explicitly rejected candidates.

Only populated directories are created now. Future character/environment/wardrobe/
lighting reference folders and portrait/scene/background production folders can be
created as assets arrive. Do not populate them with invented artwork.

## Contracts

`src/visual/schema.ts` defines the lightweight offline `VisualAssetSpec` and asset
record. `src/visual/catalog.ts` is the human-maintained production catalog. Neither is
imported by the running game. This is not an image generator or runtime asset system.

Specs use stable existing character IDs and optional identity IDs as paired subjects:
`characterId: player-character`, `identityId: evelyn`. Display name: **Evelynn Vale**.
The association describes a depiction, not consent, private identity acceptance,
NPC knowledge, or historical biography. Character objects are not modified to embed
artwork or large prompts. Future face/body/profile/outfit slots can reference catalog
asset IDs without creating a second character model.

Specs record a style-bible version explicitly. Optional camera, lighting, expression,
wardrobe, environment, continuity, and presentation-variant metadata stay unspecified
when unknown. Unregistered future location/wardrobe IDs are production labels only;
the schema does not create locations, clothing, or canonical events. Existing scene,
character, and identity references are validated against their current ID schemas.

Approval lives on the asset record, separately from a generation/commissioning spec.
Approved records require a local file path, hash, reviewer, date, and approval source.
The canonical-reference lookup rejects staging, rejected, and production-only entries.
These checks validate a trusted human-authored catalog; they are not cryptographic
proof of an approval and are not an approval API. No candidate can promote itself
through a generator callback because no such integration exists.

## Future workflow — documentation only

Game/story requirement → VisualAssetSpec → canonical references + Art Bible → external
generation or human artist → staging candidate → human review → approved production
asset → optional explicit canonical-reference approval → game asset manifest.

A future ComfyUI, FLUX-family, or other provider can consume exported specs and return
candidate files outside the runtime. It must not import a reducer, mutate state, or
approve its own output. Reference conditioning, pose/depth guidance, and later adapters
remain future production choices, not dependencies of the game.

Future prompts should assemble style, character canon, permitted references, wardrobe,
scene, camera, lighting, and emotional direction. Prompts are not canonical game data.
The artwork illustrates state; it never creates it. Presentation variants must preserve
consent, decisions, disclosures, consequences, and canonical events.
