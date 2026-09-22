from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'work/opening-casework-reproduction'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = ROOT / 'art/production/opening/axiom-opening-office-master-v1-production.png'
source_hash = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
assert source_hash == 'eae37d43e13e8e6203ffe59ec4c2c1dc047cce5149e6933e83a051bfa5388566'
base = Image.open(SOURCE).convert('RGB')
# The neutral slate rests on the existing evidence surface. No invented text,
# evidence, attachments, success checkmark, clock, or cup is drawn.
slate = [(775, 636), (883, 636), (891, 691), (765, 691)]
screen = [(781, 643), (877, 643), (883, 681), (773, 681)]
shadow = [(774, 641), (888, 641), (898, 701), (763, 701)]
scale = 4
canvas = base.resize((1920 * scale, 1080 * scale), Image.Resampling.LANCZOS)
d = ImageDraw.Draw(canvas)
points = lambda polygon: [(x * scale, y * scale) for x, y in polygon]
d.polygon(points(shadow), fill=(43, 46, 44))
d.polygon(points(slate), fill=(24, 30, 32), outline=(9, 15, 17), width=2 * scale)
d.polygon(points(screen), fill=(79, 103, 109), outline=(116, 130, 127), width=scale)
d.line(points([(779, 646), (875, 646)]), fill=(143, 154, 147), width=scale)
variants = [
    ('file', 'opening.office.shot03-file', ['office.departure'], [670, 540, 1150, 810]),
    ('brief', 'opening.helix.shot01-brief', ['helix.brief'], [716, 601, 940, 727]),
    ('documents', 'opening.helix.shot02-documents', ['helix.documents', 'helix.analysis'], [706, 558, 1154, 810]),
    ('review', 'opening.helix.shot03-review', ['helix.review'], [730, 588, 1114, 804]),
    ('submitted', 'opening.helix.shot04-submitted', ['helix.submitted'], [920, 552, 1176, 696]),
]
outputs = []
for name, shot, nodes, crop in variants:
    asset = f'axiom-casework-{name}-v1-production'
    image = canvas.crop([value * scale for value in crop]).resize((1920, 1080), Image.Resampling.LANCZOS)
    path = OUT / f'{asset}.png'
    image.save(path)
    outputs.append(dict(assetId=asset, shotId=shot, nodes=nodes, crop=crop,
                        sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
receipt = dict(source=str(SOURCE.relative_to(ROOT)).replace('\\', '/'), sourceSha256=source_hash,
               method='Pillow 4x supersampled RGB polygon slate overlay then same-perspective 16:9 crop and Lanczos enlargement; no generative fill.',
               slatePolygon=slate, screenPolygon=screen, shadowPolygon=shadow,
               screenSemantics='Unreadable neutral glow only. Game UI owns all evidence and submission information.',
               providerCalls=0, credits=0, outputs=outputs)
(OUT / 'receipt.json').write_text(json.dumps(receipt, indent=2) + '\n', encoding='utf-8')
# Contact sheet for review only, never a runtime asset.
sheet = Image.new('RGB', (960, 900), '#171c22')
draw = ImageDraw.Draw(sheet)
for i, row in enumerate(outputs):
    tile = Image.open(OUT / f"{row['assetId']}.png").resize((480, 270))
    x, y = (i % 2) * 480, (i // 2) * 300
    sheet.paste(tile, (x, y))
    draw.text((x + 10, y + 277), row['shotId'], fill='white')
sheet.save(OUT / 'review.png')
print(json.dumps(receipt, indent=2))
