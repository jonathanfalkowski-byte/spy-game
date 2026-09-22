from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging = root / "art" / "staging" / "opening"
source_path = staging / "maya-opening-office-coffee-v1-provider-original.png"
layer_path = staging / "maya-opening-office-coffee-v1-extracted-layer.png"
full_path = staging / "axiom-opening-office-shot01-maya-v4-adrian-maya-v1-coffee-composite.png"
deflect_path = staging / "axiom-opening-office-shot01-maya-v4-adrian-maya-v1-coffee-deflect-position-proof.png"
medium_path = staging / "axiom-opening-office-shot01-maya-v1-medium-desk-side-hold-candidate.png"
receipt_path = staging / "maya-opening-office-coffee-v1-composite-receipt.json"
master_path = root / "art" / "production" / "opening" / "axiom-opening-office-master-v1-production.png"
adrian_path = staging / "adrian-opening-office-standing-v4-extracted-layer.png"

source = cv2.imread(str(source_path), cv2.IMREAD_COLOR)
mask = np.zeros(source.shape[:2], np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)
cv2.grabCut(source, mask, (610, 50, 650, 980), bgd_model, fgd_model, 8, cv2.GC_INIT_WITH_RECT)
alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")
ys, xs = np.where(alpha > 0)
x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
rgba = cv2.cvtColor(source, cv2.COLOR_BGR2RGBA)
rgba[:, :, 3] = alpha
high = Image.fromarray(rgba).crop((x0, y0, x1, y1))

def make_desk_cup(width=25, height=38, scale=1):
    w, h = round(width * scale), round(height * scale)
    cup = Image.new("RGBA", (w + round(16 * scale), h + round(12 * scale)), (0, 0, 0, 0))
    d = ImageDraw.Draw(cup)
    x, y = round(8 * scale), 0
    d.polygon([(x, round(5*scale)), (x+w, round(3*scale)), (x+w-round(4*scale), h), (x+round(3*scale), h)], fill=(205, 194, 168, 255), outline=(67, 59, 50, 255))
    d.ellipse((x, 0, x+w, round(8*scale)), fill=(83, 76, 66, 255), outline=(52,48,43,255))
    d.ellipse((x+round(3*scale), round(2*scale), x+w-round(3*scale), round(6*scale)), fill=(153,143,124,255))
    return cup

def add_shadow(canvas, box):
    shadow = Image.new("RGBA", canvas.size, (0,0,0,0))
    d = ImageDraw.Draw(shadow)
    d.ellipse(box, fill=(0,0,0,38))
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(5)))

def add_retained_slate(canvas):
    # Approved deterministic casework slate geometry; neutral unreadable surface only.
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.polygon([(763,701),(898,701),(888,641),(774,641)], fill=(0,0,0,42))
    d.polygon([(775,636),(883,636),(891,691),(765,691)], fill=(24,29,34,255), outline=(11,14,17,255))
    d.polygon([(781,643),(877,643),(883,681),(773,681)], fill=(67,77,82,255))
    canvas.alpha_composite(overlay)

# Full M5 state: Adrian standing, Maya holding her own cup, and Adrian's separate cup beside terminal.
full = Image.open(master_path).convert("RGBA")
add_retained_slate(full)
add_shadow(full, (1196, 768, 1345, 799))
full.alpha_composite(Image.open(adrian_path).convert("RGBA"), (849, 614))
base_cup_anchor = (985, 690)  # left of terminal and outside the medium crop.
deflect_cup_anchor = (955, 690)  # moved toward Adrian, still outside the medium crop.
full.alpha_composite(make_desk_cup(), base_cup_anchor)
layer = high.resize((132, 292), Image.Resampling.LANCZOS)
layer.putalpha(layer.getchannel("A").filter(ImageFilter.GaussianBlur(0.55)))
layer.save(layer_path, optimize=True)
full.alpha_composite(layer, (1202, 492))
full.save(full_path, optimize=True)

# Explicit authored-deflect position proof. Only the existing local Adrian cup position changes.
deflect = Image.open(master_path).convert("RGBA")
add_retained_slate(deflect)
add_shadow(deflect, (1196, 768, 1345, 799))
deflect.alpha_composite(Image.open(adrian_path).convert("RGBA"), (849, 614))
deflect.alpha_composite(make_desk_cup(), deflect_cup_anchor)
deflect.alpha_composite(layer, (1202, 492))
deflect.save(deflect_path, optimize=True)

# Medium hold: literal M5 crop with Adrian outside view; re-render foreground directly from high source.
crop_box = (1052, 480, 1500, 732)
cw, ch = crop_box[2]-crop_box[0], crop_box[3]-crop_box[1]
sx, sy = 1920/cw, 1080/ch
medium = Image.open(master_path).convert("RGBA").crop(crop_box).resize((1920,1080), Image.Resampling.LANCZOS)
# The cup beside Adrian's terminal is retained in the full composition. It is intentionally
# off-frame for this tighter Maya hold: at this crop it would read as a detached foreground prop.
medium_layer = high.resize((round(132*sx), round(292*sy)), Image.Resampling.LANCZOS)
medium_layer.putalpha(medium_layer.getchannel("A").filter(ImageFilter.GaussianBlur(0.55)))
medium.alpha_composite(medium_layer, (round((1202-crop_box[0])*sx), round((492-crop_box[1])*sy)))
medium.save(medium_path, optimize=True)

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest().upper()
receipt = {
  "status": "staging review candidate only; no production promotion; no runtime binding",
  "sources": {"m5": {"path": str(master_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(master_path), "providerUpload": False}, "mayaProviderOriginal": {"path": str(source_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(source_path)}, "adrianV4": {"path": str(adrian_path.relative_to(root)).replace("\\\\", "/"), "sha256": sha(adrian_path)}},
  "extraction": {"method": "OpenCV GrabCut character-plus-held-cup rectangle, then 0.55px alpha feather", "sourceCrop": [int(x0),int(y0),int(x1),int(y1)], "layer": {"path":str(layer_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(layer_path)}},
  "registration": {"maya":{"bbox":[1202,492,1334,784],"footPoint":[1268,784],"eyeLine":[1266,558],"ownCup":"provider cup held in Maya hand"},"adrian":{"bbox":[849,614,941,904]},"adrianCup":{"localDeterministicProp":"plain unmarked cup left of terminal","baseAnchor":list(base_cup_anchor),"baseBounds":[985,690,1026,740],"deflectAnchor":list(deflect_cup_anchor),"deflectBounds":[955,690,996,740]},"daniel":"absent","benton":"absent after departure","slate":{"status":"retained on desk after Benton departure","approvedPolygon":[[775,636],[883,636],[891,691],[765,691]],"approvedShadowMaxX":898,"mediumCrop":"wholly outside illustrated field; crop begins x=1052"}},
  "fullComposite": {"path":str(full_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(full_path)},
  "deflectPositionProof": {"path":str(deflect_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(deflect_path),"adrianCupBounds":[955,690,996,740]},
  "mediumCandidate": {"path":str(medium_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(medium_path),"literalM5Crop":list(crop_box),"adrianPixelsIncluded":False,"adrianCup":"outside illustrated field: base and deflect bounds both end before crop x=1052","foreground":"re-rendered from full-resolution provider source"},
  "stateAssessment": {"maya.promotion":"full composition is truthful after Maya has set Adrian cup left of terminal and retains her own", "maya.invitation":"holds", "maya.case":"holds; no report text is shown", "mayaPromotion.deflect":"separate zero-cost position proof moves Adrian cup toward Adrian while keeping it outside medium crop"}
}
receipt_path.write_text(json.dumps(receipt,indent=2)+"\n",encoding="utf-8")
print(json.dumps(receipt,indent=2))
