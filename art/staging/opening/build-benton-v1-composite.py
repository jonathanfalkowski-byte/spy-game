from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging = root / "art" / "staging" / "opening"
source_path = staging / "benton-opening-office-carrying-slate-v1-provider-original.png"
layer_path = staging / "benton-opening-office-carrying-slate-v1-extracted-layer.png"
composite_path = staging / "axiom-opening-office-shot02-benton-v4-adrian-benton-v1-composite.png"
receipt_path = staging / "benton-opening-office-carrying-slate-v1-composite-receipt.json"
master_path = root / "art" / "production" / "opening" / "axiom-opening-office-master-v1-production.png"
adrian_path = staging / "adrian-opening-office-standing-v4-extracted-layer.png"

source = cv2.imread(str(source_path), cv2.IMREAD_COLOR)
mask = np.zeros(source.shape[:2], np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)
# Subject-only rectangle excludes all clean background margins before GrabCut refines the silhouette.
cv2.grabCut(source, mask, (720, 65, 500, 980), bgd_model, fgd_model, 8, cv2.GC_INIT_WITH_RECT)
alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")
ys, xs = np.where(alpha > 0)
x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
rgba = cv2.cvtColor(source, cv2.COLOR_BGR2RGBA)
rgba[:, :, 3] = alpha
crop = Image.fromarray(rgba).crop((x0, y0, x1, y1))
# Scale to the locked east-side guest-zone registration; no environment pixels are generated or changed.
layer = crop.resize((130, 294), Image.Resampling.LANCZOS)
soft_alpha = layer.getchannel("A").filter(ImageFilter.GaussianBlur(0.55))
layer.putalpha(soft_alpha)
layer.save(layer_path, optimize=True)

master = Image.open(master_path).convert("RGBA")
shadow = Image.new("RGBA", master.size, (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.ellipse((1205, 769, 1355, 801), fill=(0, 0, 0, 44))
shadow = shadow.filter(ImageFilter.GaussianBlur(7))
master.alpha_composite(shadow)
master.alpha_composite(Image.open(adrian_path).convert("RGBA"), (849, 614))
master.alpha_composite(layer, (1214, 492))
master.save(composite_path, optimize=True)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest().upper()

receipt = {
    "assetId": "axiom-opening-office-shot02-benton-v4-adrian-benton-v1-composite",
    "status": "staging review candidate only; no production promotion; no runtime binding",
    "sources": {
        "m5Office": {"path": str(master_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(master_path), "providerUpload": False},
        "bentonProviderOriginal": {"path": str(source_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(source_path)},
        "adrianV4Extracted": {"path": str(adrian_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(adrian_path)},
    },
    "extraction": {"method": "OpenCV GrabCut subject rectangle then 0.55px alpha feather", "sourceCrop": [int(x0), int(y0), int(x1), int(y1)], "output": str(layer_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(layer_path)},
    "registration": {
        "benton": {"bbox": [1214, 492, 1344, 786], "footPoint": [1278, 786], "eyeLine": [1275, 559], "orientation": "southwest toward Adrian", "slate": "held in hand, clear of desk"},
        "adrianV4": {"bbox": [849, 614, 941, 904], "footPoint": [895, 904]},
        "daniel": "absent",
    },
    "localComposite": {"path": str(composite_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(composite_path), "contactShadow": "local soft ellipse at Benton feet only"},
}
receipt_path.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
print(json.dumps(receipt, indent=2))
