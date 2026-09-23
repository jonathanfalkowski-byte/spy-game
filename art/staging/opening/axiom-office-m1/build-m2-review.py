"""Create deterministic, review-only derivatives for the M2 office master."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
M1 = Path(__file__).resolve().parent
MASTER = OUT / 'axiom-opening-office-master-v1-m2.jpeg'
assert MASTER.is_file(), 'Expected the locally recorded M2 master.'
assert (M1 / 'office-geometry.png').is_file(), 'Expected M1 geometry board.'
assert (M1 / 'camera-anchors.png').is_file(), 'Expected M1 camera board.'

FONT = Path('C:/Windows/Fonts/segoeui.ttf')
BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size, bold=False):
    return ImageFont.truetype(str(BOLD if bold else FONT), size)
def fit(image, box):
    result = image.copy(); result.thumbnail(box, Image.Resampling.LANCZOS); return result
def text(draw, point, value, size=30, color='#e6edf1', bold=False):
    draw.text(point, value, font=font(size, bold), fill=color)

master = Image.open(MASTER).convert('RGB')
assert master.size == (2560, 1440), master.size
# B remains a review proposal from the same M2 pixels, not a new camera or a production asset.
bounds_b = (88, 530, 1504, 1326)
crop_b = master.crop(bounds_b)
crop_b.save(OUT / 'axiom-opening-office-master-v1-m2-anchor-b-proposed.jpeg', quality=95, subsampling=0)

canvas = Image.new('RGB', (2560, 2240), '#101923')
draw = ImageDraw.Draw(canvas)
text(draw, (56, 38), 'EVE / AXIOM OFFICE M2 REVIEW BOARD', 46, bold=True)
text(draw, (56, 98), 'STAGING REVIEW ONLY — generated plate is not promoted or runtime-bound', 28, '#edc775')

master_panel = fit(master, (1440, 810))
canvas.paste(master_panel, (56, 165))
scale_x = master_panel.width / master.width; scale_y = master_panel.height / master.height
rect = tuple(int(v * factor) for v, factor in zip(bounds_b, (scale_x, scale_y, scale_x, scale_y)))
draw.rectangle((56 + rect[0], 165 + rect[1], 56 + rect[2], 165 + rect[3]), outline='#edc775', width=7)
text(draw, (56, 1000), 'M2 master / Anchor A source — primary desk-wide candidate', 26, '#e6edf1', True)
text(draw, (56, 1040), 'Gold rectangle: proposed B source crop. The crop does not cure missing spatial proof.', 23, '#a6bdc9')

geometry = fit(Image.open(M1 / 'office-geometry.png').convert('RGB'), (880, 605))
camera = fit(Image.open(M1 / 'camera-anchors.png').convert('RGB'), (880, 605))
canvas.paste(geometry, (1565, 165)); canvas.paste(camera, (1565, 800))
text(draw, (1565, 790), 'M1 symbolic geometry authority', 25, '#edc775', True)
text(draw, (1565, 1428), 'M1 camera-anchor authority', 25, '#edc775', True)

review_crop = fit(crop_b, (1160, 652))
canvas.paste(review_crop, (56, 1195))
text(draw, (56, 1870), 'Anchor B proposed crop — same pixels, desk/terminal region', 26, '#e6edf1', True)
text(draw, (56, 1910), 'Review finding: chair occlusion and limited shared evidence surface make B weak.', 23, '#ffba80')

right_x = 1260
text(draw, (right_x, 1545), 'Sightline / geometry review', 33, '#edc775', True)
lines = [
    ('A: desk / divider / terminal are present.', '#71cbbb'),
    ('Director smoked-glass office-door relationship is not legible.', '#ffba80'),
    ('Daniel two-desks-over relationship is not established.', '#ffba80'),
    ('B: proposed crop retains a terminal but lacks a robust shared slate plane.', '#ffba80'),
    ('No people, cups, slate, files, coat, badge or readable state props baked in.', '#71cbbb'),
    ('Classification: REVISE — do not promote or bind.', '#ff8f8f'),
]
for index, (line, color) in enumerate(lines):
    text(draw, (right_x, 1610 + index * 78), line, 22, color)
text(draw, (right_x, 2105), 'Source: M2 asset 23ab889c… / task 92685118…', 20, '#a6bdc9')
canvas.save(OUT / 'axiom-opening-office-master-v1-m2-review-board.png')
print('Created M2 review-only proposed B crop and comparison board.')
