"""Create a deterministic diagnostic board for the rejected Adrian layer attempt."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
M5 = OUT / "axiom-opening-office-master-v1-m5-single-reference.png"
ATTEMPT = OUT / "adrian-office-seated-working-v1-provider-flat.png"
for item in (M5, ATTEMPT):
    assert item.is_file(), item
FONT = Path("C:/Windows/Fonts/segoeui.ttf")
BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")

def font(size, bold=False): return ImageFont.truetype(str(BOLD if bold else FONT), size)
def text(draw, xy, value, size=24, color="#e6edf1", bold=False): draw.text(xy, value, font=font(size, bold), fill=color)
def fit(image, bounds):
    copy = image.copy(); copy.thumbnail(bounds, Image.Resampling.LANCZOS); return copy

m5 = Image.open(M5).convert("RGB")
attempt = Image.open(ATTEMPT).convert("RGB")
assert m5.size == attempt.size == (1920, 1080)
board = Image.new("RGB", (2560, 1740), "#101923")
draw = ImageDraw.Draw(board)
text(draw, (44, 28), "EVE / ADRIAN SEATED-WORKING REVIEW", 43, bold=True)
text(draw, (44, 88), "HUMAN REVIEW ONLY — ATTEMPT IS REJECTED; NO USABLE COMPOSITE EXISTS", 25, "#ff9696", True)
left = fit(m5, (1210, 681)); right = fit(attempt, (1210, 681))
board.paste(left, (44, 145)); board.paste(right, (1306, 145))
text(draw, (44, 850), "Canonical M5 master / required Adrian desk and chair are central", 21, "#71d2c2", True)
text(draw, (1306, 850), "Provider output / background retained and altered; Adrian is at west workstation", 21, "#ff9696", True)
text(draw, (44, 940), "Blocking findings", 34, "#edc775", True)
findings = [
    ("Desk registration", "BLOCKING ISSUE", "Adrian is seated at the west neighboring workstation, not the approved central Adrian desk."),
    ("Chair registration", "BLOCKING ISSUE", "The required central desk chair is empty; the generated seating position does not register to it."),
    ("Extraction cleanliness", "BLOCKING ISSUE", "The provider retained and repainted the office despite the flat-neutral-backing instruction; no clean layer matte exists."),
    ("Environment preservation", "BLOCKING ISSUE", "Background pixels are baked and changed, so this is neither a layer nor a valid M5-plus-layer composite."),
    ("Identity / style", "MINOR ISSUE", "Glasses, charcoal clothing and 2D linework are broadly present, but cannot rescue the blocked layer contract."),
]
for index, (name, result, note) in enumerate(findings):
    y = 1010 + index * 112
    color = "#ff9696" if result == "BLOCKING ISSUE" else "#ffba80"
    text(draw, (44, y), f"{name} — {result}", 22, color, True)
    text(draw, (44, y + 36), note, 19, "#d5e1e5")
text(draw, (44, 1595), "A/B composite test: NOT CREATED AS A PRODUCTION PREVIEW. The source is not separable and would misrepresent M5 geometry.", 23, "#ff9696", True)
text(draw, (44, 1642), "Classification: REJECT. Exactly one paid output occurred; no retry, promotion, manifest integration or runtime binding.", 23, "#ff9696", True)
board.save(OUT / "adrian-office-seated-working-v1-review-board.png")
print("Created rejected Adrian seated-working diagnostic board.")
