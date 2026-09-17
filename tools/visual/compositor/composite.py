"""Offline, local-only, deterministic RGBA composition. Never imported by runtime."""
from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageOps, __version__ as PILLOW_VERSION

MAX_SIDE = 8192
MAX_PIXELS = 32_000_000
ANCHORS = {
    "top-left": (0, 0), "top-center": (.5, 0), "top-right": (1, 0),
    "center": (.5, .5), "bottom-left": (0, 1),
    "bottom-center": (.5, 1), "bottom-right": (1, 1),
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def number(value, name, minimum, maximum):
    require(type(value) in (int, float) and math.isfinite(value), f"{name}: finite number required")
    require(minimum <= value <= maximum, f"{name}: out of range")
    return value


def size(value):
    require(isinstance(value, list) and len(value) == 2, "outputSize must be [width,height]")
    require(all(type(v) is int and 1 <= v <= MAX_SIDE for v in value), "invalid dimensions")
    require(value[0] * value[1] <= MAX_PIXELS, "image exceeds pixel budget")
    return tuple(value)


def asset_path(manifest_path, manifest, record):
    roots = [Path(p) if Path(p).is_absolute() else manifest_path.parent / p
             for p in manifest["assetRoots"]]
    candidate = Path(record["path"])
    path = (candidate if candidate.is_absolute() else manifest_path.parent / candidate).resolve()
    require(any(path.is_relative_to(root.resolve()) for root in roots), "asset outside declared roots")
    require(path.is_file() and path.suffix.lower() == ".png", "asset must be local PNG")
    require(path.stat().st_size <= 100_000_000, "asset file too large")
    require(sha256(path).lower() == record["sha256"].lower(), "asset hash mismatch: " + str(path))
    return path


def load_png(path):
    with Image.open(path) as source:
        size(list(source.size))
        require(source.format == "PNG", "PNG content required")
        source.load()
        return source.convert("RGBA")


def validate_spec(spec):
    required = {"compositionId", "shotId", "backgroundAssetId", "outputSize",
                "environmentCanonVersion", "characters", "props"}
    require(required <= spec.keys(), "missing composition fields")
    require(spec.keys() <= required | {"shadows", "calibrationId", "branchState", "notes"},
            "unknown composition field")
    for key in ("compositionId", "shotId", "backgroundAssetId", "environmentCanonVersion"):
        require(isinstance(spec[key], str) and bool(spec[key].strip()), f"{key} required")
    size(spec["outputSize"])
    entries = []
    for group in ("shadows", "characters", "props"):
        layers = spec.get(group, [])
        require(isinstance(layers, list), group + " must be array")
        require(len(layers) <= 64, "too many layers")
        for layer in layers:
            require(isinstance(layer, dict), "placement must be object")
            keys = {"x", "y", "scale", "anchor", "zIndex"}
            keys |= ({"characterAssetId", "identityReference", "wardrobeId", "poseId"}
                     if group == "characters" else {"assetId", "custodyNote"})
            require(keys <= layer.keys(), "missing " + group + " placement fields")
            require(layer.keys() <= keys | {"flipX", "flipApproval", "allowClipping", "opacity"},
                    "unknown placement field")
            for field in keys - {"x", "y", "scale", "zIndex"}:
                require(isinstance(layer[field], str) and bool(layer[field]), field + " required")
            require(layer["anchor"] in ANCHORS, "unknown anchor")
            number(layer["scale"], "scale", .001, 32)
            number(layer["x"], "x", -MAX_SIDE, MAX_SIDE * 2)
            number(layer["y"], "y", -MAX_SIDE, MAX_SIDE * 2)
            require(type(layer["zIndex"]) is int, "zIndex must be integer")
            require(type(layer.get("flipX", False)) is bool, "flipX must be boolean")
            if layer.get("flipX"):
                require(isinstance(layer.get("flipApproval"), str) and bool(layer["flipApproval"].strip()),
                        "horizontal flip requires recorded approval")
            require(type(layer.get("allowClipping", False)) is bool, "allowClipping must be boolean")
            number(layer.get("opacity", 1), "opacity", 0, 1)
            entries.append((group, layer))
    require(len(entries) <= 128, "too many total layers")
    return entries


def render(spec_path: Path, manifest_path: Path, output: Path):
    spec_path, manifest_path, output = map(lambda p: Path(p).resolve(), (spec_path, manifest_path, output))
    require(output.suffix.lower() == ".png", "output must be PNG")
    metadata_path = output.with_suffix(".composition.json")
    mask_path = output.with_suffix(".coverage.png")
    spec = json.loads(spec_path.read_text(encoding="utf-8-sig"))
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    entries = validate_spec(spec)
    require(isinstance(manifest.get("assetRoots"), list) and manifest["assetRoots"], "assetRoots required")
    assets = manifest["assets"]
    # All manifest sources are protected against output overwrite, not only used ones.
    sources = {asset_path(manifest_path, manifest, record) for record in assets.values()}
    outputs = {output, metadata_path, mask_path}
    require(not outputs.intersection(sources | {spec_path, manifest_path}), "output would overwrite source")
    require(not any(p.exists() for p in outputs), "output already exists; use a new review filename")
    bg_record = assets[spec["backgroundAssetId"]]
    require(bg_record["kind"] == "background" and bg_record.get("immutable") is True,
            "background must be explicitly immutable")
    require(bg_record.get("environmentCanonVersion") == spec["environmentCanonVersion"],
            "environment canon version mismatch")
    background_path = asset_path(manifest_path, manifest, bg_record)
    base = load_png(background_path)
    require(base.size == size(spec["outputSize"]), "background resize/crop is forbidden")
    require(base.getchannel("A").getextrema() == (255, 255), "background must be opaque")
    canvas = base.copy()
    coverage = Image.new("L", base.size, 0)
    placements = []
    # Stable tie order: shadows, characters, props, then source array order.
    for group, placement in sorted(entries, key=lambda item: item[1]["zIndex"]):
        if group == "characters":
            require(placement["identityReference"] in assets, "unknown identity reference")
            require(assets[placement["identityReference"]]["kind"] == "reference", "identity reference kind")
        asset_id = placement.get("characterAssetId", placement.get("assetId"))
        record = assets[asset_id]
        require(record["kind"] == {"characters": "character", "props": "prop", "shadows": "shadow"}[group],
                "layer kind mismatch")
        path = asset_path(manifest_path, manifest, record)
        layer = load_png(path)
        low, high = layer.getchannel("A").getextrema()
        require(low == 0 and high > 0, "foreground requires transparent padding and visible content")
        if placement.get("flipX"):
            layer = ImageOps.mirror(layer)
        dimensions = tuple(max(1, math.floor(v * placement["scale"] + .5)) for v in layer.size)
        size(list(dimensions))
        layer = layer.resize(dimensions, Image.Resampling.LANCZOS)
        opacity = placement.get("opacity", 1)
        if opacity != 1:
            layer.putalpha(layer.getchannel("A").point([round(v * opacity) for v in range(256)]))
        ax, ay = ANCHORS[placement["anchor"]]
        left = math.floor(placement["x"] - dimensions[0] * ax + .5)
        top = math.floor(placement["y"] - dimensions[1] * ay + .5)
        if not placement.get("allowClipping"):
            require(left >= 0 and top >= 0 and left + dimensions[0] <= base.width
                    and top + dimensions[1] <= base.height, "layer would clip; explicit approval required")
        surface = Image.new("RGBA", base.size, (0, 0, 0, 0))
        surface.paste(layer, (left, top))
        coverage = ImageChops.lighter(coverage, surface.getchannel("A"))
        canvas = Image.alpha_composite(canvas, surface)
        placements.append({"group": group, "assetId": asset_id, "sourceSHA256": record["sha256"],
                           "placement": placement, "renderedSize": dimensions, "topLeft": [left, top]})
    # Verify all RGB channels; ImageChops RGBA getbbox alone can miss RGB changes.
    difference = ImageChops.difference(base.convert("RGB"), canvas.convert("RGB"))
    uncovered = coverage.point(lambda value: 255 if value == 0 else 0)
    changed = ImageChops.lighter(ImageChops.lighter(*difference.split()[:2]), difference.split()[2])
    require(ImageChops.multiply(changed, uncovered).getbbox() is None, "uncovered background changed")
    require(sha256(background_path).lower() == bg_record["sha256"].lower(), "source changed during render")
    metadata = {"compositionId": spec["compositionId"], "shotId": spec["shotId"],
                "environmentCanonVersion": spec["environmentCanonVersion"], "status": "STAGING",
                "review": "PENDING", "productionApproved": False, "backgroundAssetId": spec["backgroundAssetId"],
                "backgroundSHA256": bg_record["sha256"], "specSHA256": sha256(spec_path),
                "manifestSHA256": sha256(manifest_path), "pillowVersion": PILLOW_VERSION,
                "outputSize": list(base.size), "layers": placements,
                "pixelStability": {"uncoveredPixels": uncovered.histogram()[255],
                                   "changedUncoveredPixels": 0, "backgroundFileUnchanged": True},
                "compositionSpec": spec}
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, format="PNG", compress_level=9)
    coverage.save(mask_path, format="PNG", compress_level=9)
    metadata["outputSHA256"] = sha256(output)
    metadata["coverageSHA256"] = sha256(mask_path)
    metadata_path.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    return metadata


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("spec", type=Path)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    receipt = render(args.spec, args.manifest, args.output)
    print(json.dumps({"output": str(args.output), "sha256": receipt["outputSHA256"],
                      "pixelStability": receipt["pixelStability"]}, indent=2))
