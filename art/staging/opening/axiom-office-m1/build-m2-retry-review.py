"""Create deterministic, staging-only comparison derivatives for M2 retry review."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
M1 = Path(__file__).resolve().parent
FIRST = OUT / 'axiom-opening-office-master-v1-m2.jpeg'
RETRY = OUT / 'axiom-opening-office-master-v1-m2-retry.jpeg'
for item in (FIRST, RETRY, M1 / 'office-geometry.png', M1 / 'camera-anchors.png'):
    assert item.is_file(), f'Missing staged review input: {item}'

FONT = Path('C:/Windows/Fonts/segoeui.ttf')
BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size, bold=False): return ImageFont.truetype(str(BOLD if bold else FONT), size)
def fit(image, bounds):
    value = image.copy(); value.thumbnail(bounds, Image.Resampling.LANCZOS); return value
def label(draw, xy, value, size=28, color='#e6edf1', bold=False):
    draw.text(xy, value, font=font(size, bold), fill=color)

first = Image.open(FIRST).convert('RGB')
retry = Image.open(RETRY).convert('RGB')
assert first.size == retry.size == (2560, 1440)
# Review-only B proposal: source pixels are copied; no new viewpoint is created.
b_bounds = (560, 450, 1980, 1249)
b_crop = retry.crop(b_bounds)
b_crop.save(OUT / 'axiom-opening-office-master-v1-m2-retry-anchor-b-proposed.jpeg', quality=95, subsampling=0)

board = Image.new('RGB', (2560, 2360), '#101923')
draw = ImageDraw.Draw(board)
label(draw, (52, 34), 'EVE / AXIOM OFFICE M2 RETRY COMPARISON', 45, bold=True)
label(draw, (52, 94), 'STAGING REVIEW ONLY — retry is not promoted or runtime-bound', 27, '#edc775')

first_panel = fit(first, (1170, 658)); retry_panel = fit(retry, (1170, 658))
board.paste(first_panel, (52, 150)); board.paste(retry_panel, (1338, 150))
label(draw, (52, 830), 'FIRST MASTER / REVISE', 25, '#ffba80', True)
label(draw, (1338, 830), 'RETRY MASTER / REVISE', 25, '#ffba80', True)
label(draw, (52, 870), 'Opaque corridor door; no workstation proof; weak desk evidence crop.', 21, '#a6bdc9')
label(draw, (1338, 870), 'Glass director doorway and desks appear; high divider, clock and photoreal style remain.', 21, '#a6bdc9')

geometry = fit(Image.open(M1 / 'office-geometry.png').convert('RGB'), (800, 550))
anchors = fit(Image.open(M1 / 'camera-anchors.png').convert('RGB'), (800, 550))
board.paste(geometry, (52, 970)); board.paste(anchors, (890, 970))
label(draw, (52, 1540), 'M1 geometry authority', 24, '#edc775', True)
label(draw, (890, 1540), 'M1 camera-anchor authority', 24, '#edc775', True)

b_panel = fit(b_crop, (800, 450)); board.paste(b_panel, (1720, 970))
label(draw, (1720, 1440), 'Retry Anchor B proposed crop', 24, '#edc775', True)
label(draw, (1720, 1480), 'Same retry pixels; desk/terminal/evidence region.', 20, '#a6bdc9')

label(draw, (52, 1660), 'Comparison findings', 34, '#edc775', True)
findings = [
    ('Improved: director glass, neighboring workstations, more desk surface, clear right aisle.', '#71cbbb'),
    ('Still blocking: divider is a tall cubicle wall, not the low Daniel-lean divider.', '#ff8f8f'),
    ('Still blocking: A frames the desk too frontally; guest zone / exact paths remain unregistered.', '#ff8f8f'),
    ('Still blocking: readable wall clock fixes an unsupported time in a 08:10–12:11 hold.', '#ff8f8f'),
    ('Important: photoreal office rendering misses EVE polished 2D semi-cel style.', '#ffba80'),
    ('Important: multiple foreground chairs still consume standing-layer and B-crop space.', '#ffba80'),
    ('Recommendation: REVISE. Do not promote, bind, or generate another output automatically.', '#ff8f8f'),
]
for row, (value, color) in enumerate(findings):
    label(draw, (52, 1725 + row * 72), value, 23, color)
label(draw, (52, 2240), 'Sources: M2 task 92685118… / retry task ba43e258… / M1 staging geometry.', 20, '#a6bdc9')
board.save(OUT / 'axiom-opening-office-master-v1-m2-retry-comparison-board.png')
print('Created retry review-only B crop and three-way comparison board.')
