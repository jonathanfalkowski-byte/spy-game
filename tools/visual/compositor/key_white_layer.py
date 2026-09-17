"""Remove edge-connected near-white backing from a character-only PNG, offline."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw
from composite import sha256, load_png


def extract(source, output):
    source, output = Path(source).resolve(), Path(output).resolve()
    outputs = {output, output.with_suffix('.extraction.json'), output.with_suffix('.matte-review.png')}
    if source in outputs or any(p.exists() for p in outputs):
        raise ValueError('Use a new output, never overwrite source or existing layer')
    if output.suffix.lower() != '.png':
        raise ValueError('Output must be PNG')
    im = load_png(source)
    r, g, b = im.convert('RGB').split()
    light = ImageChops.darker(ImageChops.darker(r, g), b)
    candidate = light.point(lambda value: 255 if value >= 235 else 0)
    # Remove only backing connected to the border; protect enclosed ivory clothing.
    for point in [(0,0), (im.width-1,0), (0,im.height-1), (im.width-1,im.height-1)]:
        if candidate.getpixel(point) == 255:
            ImageDraw.floodfill(candidate, point, 128, thresh=0)
    alpha = candidate.point(lambda value: 0 if value == 128 else 255)
    bounds = alpha.getbbox()
    if not bounds:
        raise ValueError('No character remains')
    im.putalpha(alpha)
    bounds = (max(0,bounds[0]-8), max(0,bounds[1]-8),
              min(im.width,bounds[2]+8), min(im.height,bounds[3]+8))
    im = im.crop(bounds)
    output.parent.mkdir(parents=True,exist_ok=True)
    im.save(output)
    receipt = dict(source=str(source),sourceSHA256=sha256(source),crop=bounds,
                   method='Edge-connected near-white key; threshold235; no RGB repaint',
                   outputSHA256=sha256(output),size=im.size,
                   limitations=['Enclosed white holes or antialias fringes require manual visual review'])
    output.with_suffix('.extraction.json').write_text(json.dumps(receipt,indent=2)+'\n')
    checker = Image.new('RGBA',im.size,'#c1cad5')
    Image.alpha_composite(checker,im).save(output.with_suffix('.matte-review.png'))
    return receipt


if __name__ == '__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source');p.add_argument('output')
    a=p.parse_args()
    print(json.dumps(extract(a.source,a.output),indent=2))
