"""Create zero-credit human-review blocking for M5 Adrian layer planning."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
MASTER = OUT / "axiom-opening-office-master-v1-m5-single-reference.png"
assert MASTER.is_file()
FONT = Path("C:/Windows/Fonts/segoeui.ttf")
BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")

def f(size, bold=False): return ImageFont.truetype(str(BOLD if bold else FONT), size)
def label(d, xy, value, size=21, color="#e6edf1", bold=False): d.text(xy, value, font=f(size, bold), fill=color)
def panel(name, person, note):
    image = Image.open(MASTER).convert("RGB").resize((960, 540))
    draw = ImageDraw.Draw(image, "RGBA")
    x, y, w, h = person
    draw.ellipse((x + 17, y, x + w - 17, y + 48), fill="#7ad8ccbb")
    draw.rounded_rectangle((x, y + 44, x + w, y + h), 18, fill="#7ad8ccbb")
    draw.ellipse((x - 12, y + h - 4, x + w + 12, y + h + 18), fill="#15242ccc")
    label(draw, (20, 18), name, 23, "#f0cf7d", True)
    label(draw, (20, 488), note, 16, "#e6edf1")
    return image

items = [
    panel("1 STANDING / DANIEL", (390, 245, 82, 205), "desk-side stance; west/divider sightline clear"),
    panel("2 STANDING / BENTON", (520, 245, 82, 205), "desk-side stance; northeast approach clear"),
    panel("3 SEATED / WORKING", (432, 325, 86, 130), "terminal/evidence visible; works for states 4–8"),
    panel("4 SEATED / SIP", (432, 325, 86, 130), "one later cup layer; state 9 only"),
]
board = Image.new("RGB", (1960, 1240), "#101923")
d = ImageDraw.Draw(board)
label(d, (36, 26), "EVE / M5 ADRIAN LAYER BLOCKING", 42, bold=True)
label(d, (36, 82), "ZERO-CREDIT HUMAN REVIEW — silhouettes only; M5 furniture and camera remain fixed", 23, "#edc775")
for i, image in enumerate(items): board.paste(image, (28 + (i % 2) * 970, 135 + (i // 2) * 550))
label(d, (36, 1210), "Floor contact, desk registration, screen/evidence clearance and Daniel/Benton/Maya paths are retained in every proposal.", 20, "#71d2c2")
board.save(OUT / "axiom-opening-office-m5-adrian-blocking-board.png")
print("Created M5 Adrian blocking board.")
