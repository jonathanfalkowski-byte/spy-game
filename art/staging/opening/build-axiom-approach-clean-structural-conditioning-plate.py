"""Create a local, annotation-free structural reference for Axiom's exterior approach."""

from pathlib import Path

from PIL import Image, ImageDraw


W, H = 1920, 1080
OUT = Path(__file__).with_name('axiom-approach-clean-structural-conditioning-plate.png')


def polygon(draw, points, fill, outline=None, width=1):
    draw.polygon(points, fill=fill)
    if outline:
        draw.line([*points, points[0]], fill=outline, width=width, joint='curve')


image = Image.new('RGB', (W, H), '#101923')
draw = ImageDraw.Draw(image)

# Rain-muted morning sky and distant city massing.
draw.rectangle((0, 0, W, 420), fill='#172635')
for x, top, width in [(0, 200, 260), (210, 130, 230), (510, 240, 195), (1360, 190, 190), (1550, 150, 370)]:
    draw.rectangle((x, top, x + width, 620), fill='#1d2d3c')

# Axiom's recessed stone-and-glass tower occupies the right frame; its unlabelled employee entry is visible.
polygon(draw, [(1050, 70), (1770, 70), (1870, 800), (890, 800)], '#243748', '#648ca4', 4)
polygon(draw, [(1190, 70), (1370, 70), (1320, 800), (1085, 800)], '#192a39', '#496d84', 3)
polygon(draw, [(1415, 70), (1610, 70), (1685, 800), (1435, 800)], '#1a2c3a', '#496d84', 3)
for y in range(150, 690, 110):
    draw.polygon([(1110, y), (1720, y), (1740, y + 36), (1098, y + 36)], fill='#4f7890')
    draw.line((1110, y, 1720, y), fill='#89b5c9', width=2)

polygon(draw, [(1290, 512), (1552, 512), (1590, 800), (1260, 800)], '#0d161f', '#92c3d0', 5)
draw.rectangle((1378, 540, 1484, 800), fill='#1e3949', outline='#9ac9d1', width=4)
draw.line((1431, 540, 1431, 800), fill='#9ac9d1', width=3)

# Side building and wet street establish a low-medium approach perspective.
polygon(draw, [(0, 360), (590, 410), (790, 805), (0, 875)], '#263545', '#496d84', 3)
for y in (450, 560, 670):
    draw.line((40, y, 640, y + 55), fill='#3e6177', width=3)
polygon(draw, [(0, 780), (1920, 780), (1920, 1080), (0, 1080)], '#172530')
polygon(draw, [(0, 836), (1920, 777), (1920, 1080), (0, 1080)], '#263947')
draw.line((0, 836, 1920, 777), fill='#6b98aa', width=4)
for x in range(-200, 2100, 160):
    draw.line((x, 1080, 1280 + (x - 640) // 4, 800), fill='#456b7f', width=2)

# Reflections and restrained rain strokes, without captions or guide marks.
for x in range(90, 1850, 95):
    draw.line((x, 90 + (x % 170), x - 42, 430 + (x % 130)), fill='#456c82', width=2)
for x in range(80, 1870, 220):
    draw.line((x, 900, x + 210, 862), fill='#5c8da0', width=3)


def employee(cx, base, scale, coat):
    head = int(24 * scale)
    draw.ellipse((cx - head, base - int(220 * scale), cx + head, base - int(172 * scale)), fill='#6e8291')
    polygon(
        draw,
        [(cx - int(34 * scale), base - int(165 * scale)), (cx + int(30 * scale), base - int(165 * scale)),
         (cx + int(45 * scale), base - int(42 * scale)), (cx - int(42 * scale), base - int(42 * scale))],
        coat,
        '#9aabb4',
        2,
    )
    draw.line((cx - int(18 * scale), base - int(42 * scale), cx - int(28 * scale), base), fill='#26323b', width=max(2, int(7 * scale)))
    draw.line((cx + int(16 * scale), base - int(42 * scale), cx + int(25 * scale), base), fill='#26323b', width=max(2, int(7 * scale)))


# Small commuter grouping reads as employee flow; foreground person remains anonymous and rear-facing.
employee(1140, 790, 0.45, '#384d5a')
employee(1196, 794, 0.42, '#3b5260')
employee(1642, 810, 0.55, '#314653')
employee(570, 950, 0.9, '#435563')

image.save(OUT)
print(OUT)
