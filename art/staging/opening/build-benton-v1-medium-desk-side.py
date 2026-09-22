from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image

root = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging = root / "art" / "staging" / "opening"
source_path = staging / "benton-opening-office-carrying-slate-v1-provider-original.png"
master_path = root / "art" / "production" / "opening" / "axiom-opening-office-master-v1-production.png"
output_path = staging / "axiom-opening-office-shot02-benton-v1-medium-desk-side-hold-candidate.png"
receipt_path = staging / "benton-opening-office-carrying-slate-v1-medium-desk-side-receipt.json"

# Exact 16:9 M5 source crop: desk terminal edge, Benton, and smoked-glass door;
# the crop starts right of Adrian's registered x=941 boundary.
crop_box = (1052, 480, 1500, 732)
crop_w, crop_h = crop_box[2] - crop_box[0], crop_box[3] - crop_box[1]
scale_x, scale_y = 1920 / crop_w, 1080 / crop_h
background = Image.open(master_path).convert("RGBA").crop(crop_box).resize((1920, 1080), Image.Resampling.LANCZOS)

source = cv2.imread(str(source_path), cv2.IMREAD_COLOR)
mask = np.zeros(source.shape[:2], np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)
cv2.grabCut(source, mask, (720, 65, 500, 980), bgd_model, fgd_model, 8, cv2.GC_INIT_WITH_RECT)
alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")
ys, xs = np.where(alpha > 0)
x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
rgba = cv2.cvtColor(source, cv2.COLOR_BGR2RGBA)
rgba[:, :, 3] = alpha
full_crop = Image.fromarray(rgba).crop((x0, y0, x1, y1))
full_alpha = np.array(full_crop.getchannel("A"))
n, labels, stats, _ = cv2.connectedComponentsWithStats((full_alpha > 40).astype(np.uint8), 8)
slate_id = min(range(1, n), key=lambda i: stats[i, cv2.CC_STAT_AREA])
slate_mask = (labels == slate_id).astype(np.uint8) * 255
main_mask = np.where(labels == slate_id, 0, full_alpha).astype(np.uint8)
slate = full_crop.copy(); slate.putalpha(Image.fromarray(slate_mask))
main = full_crop.copy(); main.putalpha(Image.fromarray(main_mask))

# Translate only the existing slate at source resolution by the equivalent correction.
source_dx = round(-12 * full_crop.width / 130)
source_dy = round(8 * full_crop.height / 294)
corrected = Image.new("RGBA", full_crop.size, (0, 0, 0, 0))
corrected.alpha_composite(slate, (source_dx, source_dy))
corrected.alpha_composite(main)

# Equivalent placement to full-frame Benton bbox x=1214..1344, y=492..786, rendered directly once.
target_w, target_h = round(130 * scale_x), round(294 * scale_y)
foreground = corrected.resize((target_w, target_h), Image.Resampling.LANCZOS)
target_x = round((1214 - crop_box[0]) * scale_x)
target_y = round((492 - crop_box[1]) * scale_y)
background.alpha_composite(foreground, (target_x, target_y))
background.save(output_path, optimize=True)

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest().upper()
receipt = {
  "status": "staging review candidate only; no production promotion; no runtime binding",
  "m5": {"path": str(master_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(master_path), "literalCrop": list(crop_box), "adrianPixelsIncluded": False},
  "foreground": {
    "providerOriginal": str(source_path.relative_to(root)).replace("\\\\", "/"), "providerOriginalSha256": sha(source_path),
    "method": "full-resolution GrabCut extraction; source-equivalent existing-slate translation; one final resize to crop-equivalent registration",
    "sourceCrop": [int(x0), int(y0), int(x1), int(y1)],
    "slateTranslationSourcePixels": [source_dx, source_dy],
    "newAnatomy": False, "newPropPixels": False,
    "targetRect": [target_x, target_y, target_x + target_w, target_y + target_h],
  },
  "output": {"path": str(output_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(output_path)},
  "scope": "medium conversation framing; character legs leave at bottom image boundary by design; no claim of full-figure authority",
}
receipt_path.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
print(json.dumps(receipt, indent=2))
