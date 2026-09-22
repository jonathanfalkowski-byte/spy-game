from PIL import Image, ImageDraw
from pathlib import Path
import hashlib, json

out_dir = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design\art\staging\opening")
png = out_dir / "benton-opening-office-carrying-slate-clean-conditioning-plate.png"
receipt = out_dir / "benton-opening-office-carrying-slate-clean-conditioning-plate.json"
W, H = 1920, 1080
im = Image.new("RGB", (W, H), (102, 107, 113))
d = ImageDraw.Draw(im)
d.ellipse((800, 112, 1030, 342), fill=(187, 190, 191), outline=(53, 57, 61), width=9)
d.polygon([(812, 336), (1015, 336), (1080, 637), (745, 637)], fill=(94, 100, 106), outline=(53, 57, 61))
d.line((812, 344, 759, 624), fill=(53, 57, 61), width=50)
d.line((1009, 353, 1130, 565), fill=(53, 57, 61), width=48)
d.rounded_rectangle((1088, 515, 1170, 652), radius=10, fill=(29, 32, 35), outline=(10, 12, 14), width=8)
d.polygon([(776, 633), (922, 633), (910, 884), (753, 884)], fill=(66, 70, 74), outline=(45, 48, 51))
d.polygon([(925, 633), (1052, 635), (1090, 884), (926, 884)], fill=(66, 70, 74), outline=(45, 48, 51))
d.polygon([(730, 875), (915, 875), (929, 928), (704, 928)], fill=(35, 37, 40), outline=(21, 23, 25))
d.polygon([(917, 875), (1112, 875), (1140, 928), (918, 928)], fill=(35, 37, 40), outline=(21, 23, 25))
d.ellipse((670, 907, 1160, 959), fill=(84, 89, 94))
im.save(png, optimize=True)
sha = hashlib.sha256(png.read_bytes()).hexdigest().upper()
data = {
    "assetId": "benton-opening-office-carrying-slate-clean-conditioning-plate",
    "kind": "zero-cost clean structural character-only conditioning guide",
    "dimensions": {"width": W, "height": H, "aspect": "16:9"},
    "sha256": sha,
    "providerUploadAuthority": "single clean guide only; M5 office master excluded",
    "figure": {
        "subject": "Elias Benton",
        "body": "compact adult male, age 58, settled planted stance, three-quarter southwest orientation",
        "prop": "one thin blank black data slate carried in hand; not on desk",
        "background": "plain neutral extraction background",
        "exclusions": ["text", "logos", "office environment", "Adrian", "Daniel", "additional props"],
    },
    "m5RegistrationTarget": {
        "canvas": [1920, 1080], "bbox": [1214, 492, 1344, 786],
        "footPoint": [1278, 786], "eyeLine": [1275, 559],
        "orientation": "southwest, facing Adrian at central desk",
        "spacing": "east-side guest/approach zone; clear of terminal and divider; slate remains off the desk",
    },
    "status": "staging-only; not production-approved; not runtime-bound",
}
receipt.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"png": str(png), "sha256": sha, "receipt": str(receipt)}))
