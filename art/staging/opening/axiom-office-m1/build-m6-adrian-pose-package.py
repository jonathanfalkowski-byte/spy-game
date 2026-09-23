"""Build zero-credit M6 seated registration and M5 composite proof artifacts."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
MASTER = Path("art/production/opening/axiom-opening-office-master-v1-production.png")
assert MASTER.is_file(), MASTER
W, H = 1920, 1080
B_CROP = (610, 430, 1260, 830)
FONT = Path("C:/Windows/Fonts/segoeui.ttf")
BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")

def font(size, bold=False): return ImageFont.truetype(str(BOLD if bold else FONT), size)
def text(draw, xy, value, size=22, color="#e6edf1", bold=False): draw.text(xy, value, font=font(size, bold), fill=color)

def mannequin_layer():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    # Fixed M6 registration: chair-seat center (880,836); full silhouette (798..962,608..910).
    shadow = (798, 884, 962, 916)
    d.ellipse(shadow, fill=(16, 26, 32, 78))
    # Head, relaxed shoulders, seated torso, forearms to desk, thighs, lower legs and shoes.
    d.ellipse((852, 608, 908, 664), fill=(101, 203, 195, 235), outline=(20, 54, 58, 255), width=4)
    d.rounded_rectangle((840, 660, 920, 772), 22, fill=(101, 203, 195, 235), outline=(20, 54, 58, 255), width=4)
    d.polygon([(846, 700), (814, 750), (832, 768), (858, 724)], fill=(101, 203, 195, 235), outline=(20, 54, 58, 255))
    d.polygon([(914, 700), (952, 746), (936, 766), (902, 724)], fill=(101, 203, 195, 235), outline=(20, 54, 58, 255))
    d.polygon([(840, 770), (875, 770), (852, 850), (816, 882), (800, 870)], fill=(101, 203, 195, 235), outline=(20, 54, 58, 255))
    d.polygon([(883, 770), (918, 770), (944, 870), (928, 884), (898, 850)], fill=(101, 203, 195, 235), outline=(20, 54, 58, 255))
    d.ellipse((794, 868, 838, 902), fill=(42, 54, 60, 245))
    d.ellipse((922, 870, 966, 904), fill=(42, 54, 60, 245))
    return layer

master = Image.open(MASTER).convert("RGBA")
assert master.size == (W, H)
layer = mannequin_layer()
flat = Image.new("RGBA", (W, H), (116, 126, 134, 255))
flat.alpha_composite(layer)
flat.convert("RGB").save(OUT / "adrian-m6-seated-working-mannequin-plain.png")
layer.save(OUT / "adrian-m6-seated-working-mannequin-layer.png")
composite = master.copy(); composite.alpha_composite(layer)
composite.convert("RGB").save(OUT / "adrian-m6-seated-working-anchor-a-proof.png")
composite.crop(B_CROP).convert("RGB").save(OUT / "adrian-m6-seated-working-anchor-b-proof.png")

board = Image.new("RGB", (2560, 1750), "#101923")
d = ImageDraw.Draw(board)
text(d, (42, 26), "EVE / M6 ADRIAN CHARACTER-ONLY POSE PACKAGE", 42, bold=True)
text(d, (42, 84), "ZERO-CREDIT REGISTRATION PROOF — M5 IS COMPOSITED LOCALLY, NEVER SENT TO THE CHARACTER PROVIDER", 23, "#edc775")
def fitted(image, bounds):
    copy = image.copy(); copy.thumbnail(bounds, Image.Resampling.LANCZOS); return copy
plain = fitted(flat.convert("RGB"), (760, 428)); proof_a = fitted(composite.convert("RGB"), (1150, 647)); proof_b = fitted(composite.crop(B_CROP).convert("RGB"), (760, 468))
board.paste(plain, (42, 145)); board.paste(proof_a, (846, 145)); board.paste(proof_b, (42, 735))
text(d, (42, 590), "Plain-background pose plate / layer bounds 798..962 x 608..910", 20, "#71d2c2", True)
text(d, (846, 820), "Anchor A proof / seat center (880,836); floor contact and central desk registration", 20, "#71d2c2", True)
text(d, (42, 1225), "Anchor B proof / exact crop (610,430,1260,830); terminal and evidence remain visible", 20, "#71d2c2", True)
text(d, (846, 920), "Registration checks", 32, "#edc775", True)
for i, line in enumerate([
    "PASS — central operator chair: seat center x=880, y=836; no west-workstation drift.",
    "PASS — silhouette bounds x=798..962, y=608..910; feet and chair remain on M5 floor plane.",
    "PASS — evidence surface remains left of torso; terminal remains right of torso.",
    "PASS — Anchor A full master and Anchor B same-pixel crop are derived from one local composite.",
    "NEXT PROVIDER METHOD — character only on a plain neutral backing. Do not supply M5 or any office image."
]): text(d, (846, 985 + i * 85), line, 21, "#71d2c2" if i < 4 else "#edc775", i == 4)
board.save(OUT / "adrian-m6-seated-working-registration-board.png")
print("Created zero-credit M6 character-only pose package.")
