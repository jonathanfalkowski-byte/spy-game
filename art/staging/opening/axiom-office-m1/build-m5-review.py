"""Create the deterministic, human-only M5 geometry review board."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
M5 = OUT / "axiom-opening-office-master-v1-m5-single-reference.png"
CLEAN = OUT / "axiom-office-clean-structural-conditioning-plate.png"
STATES = OUT / "axiom-office-geometry-locked-nine-state-blocking-board.png"
for item in (M5, CLEAN, STATES):
    assert item.is_file(), item

FONT = Path("C:/Windows/Fonts/segoeui.ttf")
BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")


def font(size, bold=False):
    return ImageFont.truetype(str(BOLD if bold else FONT), size)


def fit(image, bounds):
    value = image.copy()
    value.thumbnail(bounds, Image.Resampling.LANCZOS)
    return value


def text(draw, xy, value, size=24, color="#e6edf1", bold=False):
    draw.text(xy, value, font=font(size, bold), fill=color)


m5 = Image.open(M5).convert("RGB")
clean = Image.open(CLEAN).convert("RGB")
states = Image.open(STATES).convert("RGB")
assert m5.size == (1920, 1080)

board = Image.new("RGB", (2560, 2480), "#101923")
draw = ImageDraw.Draw(board)
text(draw, (44, 28), "EVE / AXIOM M5 SINGLE-REFERENCE REVIEW", 43, bold=True)
text(draw, (44, 88), "HUMAN REVIEW ONLY — M5 is staging and not promoted or runtime-bound", 25, "#edc775")

m5_panel = fit(m5, (1450, 816))
board.paste(m5_panel, (44, 145))
text(draw, (44, 980), "M5: single structural image edited in place; composition, furniture and empty production space are retained.", 22, "#71d2c2")
clean_panel = fit(clean, (930, 523))
board.paste(clean_panel, (1570, 145))
text(draw, (1570, 690), "Clean structural authority / only provider reference", 21, "#71d2c2", True)

text(draw, (44, 1045), "Fifteen-point geometry result", 32, "#edc775", True)
points = [
    ("1 camera / perspective", "PASS", "same plate composition and room view"),
    ("2 desk footprint", "PASS", "central desk footprint retained"),
    ("3 desk orientation", "PASS", "locked desk orientation retained"),
    ("4 divider", "PASS", "low divider remains in place"),
    ("5 guest zone", "PASS", "open left-side guest zone retained"),
    ("6 common floor plane", "PASS", "continuous, uncluttered circulation"),
    ("7 Daniel workstation", "PASS", "west neighboring workstations retained"),
    ("8 Daniel route", "PASS", "clear path to Adrian desk retained"),
    ("9 Benton route", "PASS", "northeast director route remains open"),
    ("10 Maya approach / departure", "PASS", "state-safe open approach space retained"),
    ("11 smoked-glass office", "PASS", "northeast glass relationship retained"),
    ("12 evidence surface", "PASS", "surface exists without state-specific contents"),
    ("13 terminal", "PASS", "fixed position, blank/state-neutral display"),
    ("14 anchor A", "PASS", "same master framing remains usable"),
    ("15 anchor B", "PASS", "same-pixel desk/evidence crop remains usable"),
]
for index, (name, status, reason) in enumerate(points):
    column = index % 2
    row = index // 2
    x = 44 + column * 1230
    y = 1105 + row * 98
    text(draw, (x, y), f"{name} — {status}", 18, "#71d2c2", True)
    text(draw, (x, y + 30), reason, 16, "#c6d4da")

states_panel = fit(states, (960, 540))
board.paste(states_panel, (44, 1905))
text(draw, (1055, 1905), "Nine-state reuse and contamination result", 30, "#edc775", True)
for index, line in enumerate([
    "1–9: PASS. Fixed furniture, scale, routes and camera framing remain usable.",
    "No person, silhouette, reflection, portrait, text, label, annotation, clock,",
    "readable terminal UI, coffee, wine, drink, paperwork, file, evidence, phone,",
    "slate, personal object, meeting table or added foreground clutter is present.",
    "Style: PASS. The result is a dark, readable 2D illustrated office with controlled",
    "linework, semi-cel shading, restrained practical lighting and non-photographic",
    "materials. It is intentionally still staging-only pending owner approval.",
    "Classification: PASS — no promotion, binding, manifest integration or retry."
]):
    color = "#71d2c2" if index in (0, 6, 7) else "#e6edf1"
    text(draw, (1055, 1965 + index * 55), line, 22, color, index in (0, 6, 7))

board.save(OUT / "axiom-opening-office-master-v1-m5-single-reference-review-board.png")
print("Created M5 human-only geometry and contamination review board.")
