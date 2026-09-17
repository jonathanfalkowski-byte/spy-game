# Offline scene compositor

Deterministic Pillow tooling only. No network client, gameplay/runtime import, save
schema change or new package dependency. Use the existing local Python with Pillow.

Pipeline: immutable background → transparent characters/props/shadows → explicit
scale/position → flattened PNG and production metadata → human review.

```powershell
python tools/visual/compositor/composite.py composition.json assets.json review.png
python -m unittest discover -s tools/visual/compositor -v
```

`SceneCompositionSpec.schema.json` documents the spec. `composite.py` validates the
operational contract without installing a JSON-schema dependency. Asset manifest:

```json
{
  "assetRoots": ["./layers", "C:/approved-art"],
  "assets": {
    "room": {
      "path": "C:/approved-art/room.png",
      "sha256": "actual-file-sha256",
      "kind": "background",
      "immutable": true,
      "environmentCanonVersion": "room-camera-v1"
    }
  }
}
```

Paths resolve relative to the manifest unless absolute. All files must lie within
declared roots and match their SHA256. Kinds: `background`, `character`, `prop`,
`shadow`, `reference`. The background is opaque PNG at exact output dimensions.
Foreground PNGs must have real transparency and transparent padding. Character
identityReference points to a `reference` manifest asset. Shadow images are ordinary
transparent layers, never lighting re-generation of the room.

Positions use top-left-origin canvas pixels. `(x,y)` locates the named anchor on the
scaled layer. Scale is a uniform factor; width/height independently rounding to
pixels is the only aspect deviation. Half-pixel positions round via floor(v+0.5).
zIndex sorts ascending; ties retain shadows, characters, props and then array order.
Horizontal flip requires a nonempty recorded `flipApproval`. No implicit flip,
rotation, warp or background crop/resize. Off-canvas layers need `allowClipping`.

The tool refuses source overwrite, existing output/sidecars, hash changes, invalid
dimensions/scales and undeclared fields. Outputs: flattened PNG, `.coverage.png`
(union of effective layer alpha), `.composition.json` with the full spec, source and
output hashes, Pillow version and deterministic placement receipts. No timestamps in
render receipts. Identical bytes/spec/Pillow version yield identical PNG hashes.

Every uncovered RGB pixel is checked against the original background. A mask that
contains unwanted room pixels can still pass that numerical invariant: visual matte,
anatomy, prop custody and perspective review remain mandatory. PASS is never
automatic production approval.

Pilot-specific assembly scripts, rejected extraction evidence and all review images
remain in the external art-production staging workspace, outside this tooling commit.
The accepted empty plate provenance and calibration are documented under
`docs/art/APARTMENT_CAMERA_CALIBRATION.md`. The earlier occupied outfit image is not
a clean background and must not be used to erase/repaint architecture.

`key_white_layer.py source.png new-layer.png` removes edge-connected near-white
backing from an isolated generated character. It preserves enclosed light clothing;
enclosed white hair holes may remain and require visual review. It never repaints RGB.

## Alpha cleanup and explicitly authorized lighting derivatives

```powershell
python tools/visual/compositor/derive_layers.py source.png settings.json new-layer.png
```

Settings declare `operation` (`alpha-cleanup` or `lighting-only`), exact `sourceSHA256`,
`dimensions` and a `settings` object. New files only; source, settings and existing
output/receipt cannot be overwritten. Derivation receipts contain the full settings,
hashes, operation metrics and Pillow version. Outputs always start STAGING/PENDING.

Alpha cleanup settings: `fadeStart`, `transparentAt`, `maxChannelSpread`,
`cleanupPolygons`, `protectedPolygons`, optional `edgeRadius` (0–4 source pixels).
Near-neutral bright backing gets reduced alpha in the declared polygons or near an
existing transparent edge. Protected polygons take precedence. RGB, dimensions and
pose coordinates never change. This is not a general segmentation model: visually
review masks and protect light garments, eyes and facial highlights explicitly.

Lighting settings: `base: {gamma, gains:[r,g,b]}` plus optional `regions` containing
`name`, `polygons`, `maskBlur`, `opacity`, `grade:{gamma,gains}`. Each channel uses
`round(255 * (value/255)^gamma * gain)`, clamped to 0–255. Regions blend LUT-graded
versions of the **same source pixels**, in listed order. Blur applies only to lighting
masks. No source pixel is spatially moved/resampled; source alpha is retained.

Lighting is an explicit exception to RGB pixel identity, not to geometry authority.
Create a separately named/hashed variant, never mutate the original environment.
Once chosen as a composition background, that variant is again immutable and the
compositor checks all uncovered RGB pixels against **it**. Deriving a variant does
not approve its lighting or authorize production promotion. No image synthesis,
content-aware fill, body reshaping or garment changes occur in these helpers.

## Approved Chapter 5 movement proof

`art/production/chapter5/harbour-evidence` contains portable master/departed specs,
the shared manifest, movement contract and review evidence. Technical source layers
live in `harbour-components`; those copies grant no new character-reference authority.
The existing `c05.s06.shot15-departed` beat has Julian absent, so the only operation
is removing his layer. Evelynn/coffee placement and the environment stay identical.
`test_production_pair.py` reproduces both approved PNG hashes and verifies that no
pixel outside Julian's former alpha changes. Run all compositor checks with:

```powershell
python -m unittest discover -s tools/visual/compositor -p 'test_*.py'
```
