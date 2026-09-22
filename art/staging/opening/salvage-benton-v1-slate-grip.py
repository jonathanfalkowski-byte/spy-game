from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging = root / "art" / "staging" / "opening"
layer_path = staging / "benton-opening-office-carrying-slate-v1-extracted-layer.png"
salvaged_layer_path = staging / "benton-opening-office-carrying-slate-v1-grip-corrected-extracted-layer.png"
full_path = staging / "axiom-opening-office-shot02-benton-v4-adrian-benton-v1-grip-corrected-composite.png"
crop_path = staging / "benton-opening-office-carrying-slate-v1-grip-corrected-enlarged.png"
focus_path = staging / "axiom-opening-office-shot02-benton-v1-desk-side-hold-candidate.png"
receipt_path = staging / "benton-opening-office-carrying-slate-v1-grip-correction-receipt.json"
master_path = root / "art" / "production" / "opening" / "axiom-opening-office-master-v1-production.png"
adrian_path = staging / "adrian-opening-office-standing-v4-extracted-layer.png"

layer = Image.open(layer_path).convert("RGBA")
alpha = np.array(layer.getchannel("A"))
n, labels, stats, _ = cv2.connectedComponentsWithStats((alpha > 40).astype(np.uint8), 8)
# The smaller disconnected component is the slate. Preserve all original human pixels as foreground.
component_ids = list(range(1, n))
slate_id = min(component_ids, key=lambda i: stats[i, cv2.CC_STAT_AREA])
slate_mask = (labels == slate_id).astype(np.uint8) * 255
main_mask = np.where(labels == slate_id, 0, alpha).astype(np.uint8)
slate = layer.copy()
slate.putalpha(Image.fromarray(slate_mask))
main = layer.copy()
main.putalpha(Image.fromarray(main_mask))

# Move the existing slate 12 px toward the curled hand and 8 px downward. Composite it first,
# then retain the original hand/edge pixels on top for real occlusion. No new anatomy is drawn.
corrected = Image.new("RGBA", layer.size, (0, 0, 0, 0))
corrected.alpha_composite(slate, (-12, 8))
corrected.alpha_composite(main)
corrected.save(salvaged_layer_path, optimize=True)

full = Image.open(master_path).convert("RGBA")
shadow = Image.new("RGBA", full.size, (0, 0, 0, 0))
ImageDraw.Draw(shadow).ellipse((1205, 769, 1355, 801), fill=(0, 0, 0, 44))
full.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(7)))
full.alpha_composite(Image.open(adrian_path).convert("RGBA"), (849, 614))
full.alpha_composite(corrected, (1214, 492))
full.save(full_path, optimize=True)

# A literal 16:9 crop of the immutable local composite strengthens Benton’s desk-side read.
# It begins right of Adrian’s registered pixels, leaving Adrian off-screen without repainting M5.
full.crop((960, 350, 1920, 890)).resize((1920, 1080), Image.Resampling.LANCZOS).save(focus_path, optimize=True)

# Enlarged review crop shows the physical hand-to-slate contact without concealing it by scale.
corrected.crop((60, 105, 130, 205)).resize((700, 1000), Image.Resampling.NEAREST).save(crop_path)

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest().upper()
receipt = {
  "status": "staging review candidate only; no production promotion; no runtime binding",
  "sourceLayer": {"path": str(layer_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(layer_path)},
  "originalFailedComposite": "art/staging/opening/axiom-opening-office-shot02-benton-v4-adrian-benton-v1-composite.png",
  "repair": {
    "method": "separate existing disconnected slate alpha component; translate (-12,+8) pixels; alpha-composite existing human pixels over it for existing curled-hand occlusion",
    "newAnatomy": False,
    "newPropPixels": False,
    "slateTranslationLayerPixels": [-12, 8],
    "salvagedLayer": {"path": str(salvaged_layer_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(salvaged_layer_path)},
    "enlargedInspection": {"path": str(crop_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(crop_path)},
  },
  "composite": {"path": str(full_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(full_path), "m5Modified": False},
  "deskSideHoldCandidate": {"path": str(focus_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(focus_path), "crop": [960, 350, 1920, 890], "adrianPixelsIncluded": False},
  "remainingLimits": ["Benton remains frontal rather than southwest-facing Adrian", "Benton's extended foot still reads as mid-step", "candidate has no production approval or runtime binding"],
}
receipt_path.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
print(json.dumps(receipt, indent=2))
