from PIL import Image, ImageDraw
from pathlib import Path
import hashlib, json

out_dir = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design\art\staging\opening")
png = out_dir / "maya-opening-office-coffee-clean-conditioning-plate.png"
receipt = out_dir / "maya-opening-office-coffee-clean-conditioning-plate.json"
W, H = 1920, 1080
im = Image.new("RGB", (W, H), (102, 107, 113))
d = ImageDraw.Draw(im)

# One unannotated, separable character-only construction guide. The cup overlaps the existing hand.
d.ellipse((802, 118, 1002, 328), fill=(162, 107, 77), outline=(49, 43, 43), width=9)
d.ellipse((792, 91, 1010, 224), fill=(16, 19, 23), outline=(7, 9, 11), width=8)  # loose knot/hair mass
d.polygon([(805, 335), (1005, 335), (1080, 620), (733, 620)], fill=(29, 57, 90), outline=(18, 31, 45))
d.line((806, 352, 747, 599), fill=(26, 50, 79), width=50)  # relaxed arm
d.line((1005, 356, 1120, 515), fill=(26, 50, 79), width=48)  # cup-carrying arm
d.ellipse((1082, 489, 1147, 551), fill=(162, 107, 77), outline=(49, 43, 43), width=6)  # existing hand at cup
d.rounded_rectangle((1106, 454, 1190, 571), radius=12, fill=(205, 194, 168), outline=(67, 59, 50), width=7)  # plain paper cup behind hand
d.ellipse((1106, 449, 1190, 472), fill=(83, 76, 66), outline=(52, 48, 43), width=5)
d.polygon([(754, 619), (907, 619), (892, 891), (735, 891)], fill=(25, 43, 66), outline=(17, 26, 39))
d.polygon([(912, 619), (1049, 619), (1091, 891), (923, 891)], fill=(25, 43, 66), outline=(17, 26, 39))
d.polygon([(710, 881), (898, 881), (917, 931), (686, 931)], fill=(25, 28, 32), outline=(14, 16, 18))
d.polygon([(913, 881), (1111, 881), (1140, 931), (914, 931)], fill=(25, 28, 32), outline=(14, 16, 18))
d.ellipse((665, 909, 1160, 960), fill=(84, 89, 94))
im.save(png, optimize=True)
sha = hashlib.sha256(png.read_bytes()).hexdigest().upper()
data = {
  "assetId": "maya-opening-office-coffee-clean-conditioning-plate",
  "kind": "zero-cost clean character-only pose and cup-contact conditioning guide",
  "dimensions": {"width": W, "height": H, "aspect": "16:9"}, "sha256": sha,
  "providerUploadAuthority": "one clean guide only; M5 office and prior scene compositions excluded",
  "figure": {"subject": "Maya Reyes", "identity": "33, warm brown skin, watchful dark eyes, black hair in a loose knot, navy suit with turned-back cuffs", "pose": "settled three-quarter southwest desk-side stance, neutral friendly professional address", "cup": "one plain unmarked paper cup physically overlapped by the existing hand", "background": "uniform neutral extraction background", "exclusions": ["office", "Adrian", "Daniel", "Benton", "second cup", "text", "logos", "case files"]},
  "m5RegistrationTarget": {"canvas": [1920,1080], "bbox": [1202,492,1334,784], "footPoint": [1268,784], "eyeLine": [1266,558], "orientation": "southwest toward Adrian at central desk", "ownCup": "held naturally; local Adrian cup will be a separate deterministic desk prop beside terminal"},
  "status": "staging-only; not production-approved; not runtime-bound"
}
receipt.write_text(json.dumps(data, indent=2)+"\n", encoding="utf-8")
print(json.dumps({"png":str(png),"sha256":sha,"receipt":str(receipt)}))
