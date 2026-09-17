"""Offline alpha cleanup and lighting-only derivatives. No synthesis or spatial warp."""
import argparse
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, __version__ as PILLOW_VERSION
from composite import load_png, require, sha256, number


def polygon_mask(dimensions, polygons):
    mask = Image.new('L', dimensions)
    draw = ImageDraw.Draw(mask)
    require(isinstance(polygons, list) and len(polygons) <= 64, 'invalid polygons')
    for polygon in polygons:
        require(3 <= len(polygon) <= 128, 'invalid polygon')
        points = []
        for point in polygon:
            require(len(point) == 2, 'point must have two coordinates')
            points.append(tuple(number(v, 'coordinate', 0, dimensions[i]-1) for i,v in enumerate(point)))
        draw.polygon(points, fill=255)
    return mask


def count_nonzero(mask):
    return sum(mask.histogram()[1:])


def clean_alpha(source, settings):
    """Modify alpha only: near-white matte in declared areas, excluding protected areas."""
    r,g,b,a = source.split()
    minimum = ImageChops.darker(ImageChops.darker(r,g),b)
    maximum = ImageChops.lighter(ImageChops.lighter(r,g),b)
    low = number(settings['fadeStart'], 'fadeStart', 0, 254)
    high = number(settings['transparentAt'], 'transparentAt', low+1, 255)
    spread = number(settings['maxChannelSpread'], 'maxChannelSpread', 0, 255)
    eligibility = polygon_mask(source.size, settings['cleanupPolygons'])
    protected = polygon_mask(source.size, settings['protectedPolygons'])
    edge_radius = settings.get('edgeRadius', 0)
    require(type(edge_radius) is int and 0 <= edge_radius <= 4, 'invalid edgeRadius')
    if edge_radius:
        transparent_neighbor = a.filter(ImageFilter.MinFilter(2*edge_radius+1)).point(lambda v: 255 if v == 0 else 0)
        eligibility = ImageChops.lighter(eligibility, transparent_neighbor)
    eligibility = ImageChops.multiply(eligibility, ImageChops.invert(protected))
    neutral = ImageChops.subtract(maximum,minimum).point(lambda v: 255 if v <= spread else 0)
    amount = minimum.point([round(255*min(1,max(0,(v-low)/(high-low)))) for v in range(256)])
    amount = ImageChops.multiply(ImageChops.multiply(amount, neutral), eligibility)
    new_alpha = ImageChops.multiply(a, ImageChops.invert(amount))
    result = Image.merge('RGBA', (r,g,b,new_alpha))
    require(ImageChops.difference(source.convert('RGB'),result.convert('RGB')).getbbox() is None,
            'alpha cleanup changed RGB')
    return result, dict(changedAlphaPixels=count_nonzero(ImageChops.difference(a,new_alpha)),
                        changedRGBPixels=0, dimensionsUnchanged=True, protectedAlphaUnchanged=
                        ImageChops.multiply(ImageChops.difference(a,new_alpha),protected).getbbox() is None)


def grade(source, params):
    gamma = number(params['gamma'], 'gamma', .1, 4)
    gains = params['gains']
    require(len(gains) == 3, 'three gains required')
    tables = [[min(255, max(0, round(255 * (v/255)**gamma * number(gain,'gain',0,2))))
               for v in range(256)] for gain in gains]
    channels = [channel.point(table) for channel,table in zip(source.convert('RGB').split(),tables)]
    return Image.merge('RGB',channels), tables


def lighting(source, settings):
    """Per-pixel LUTs blended by recorded masks; never resample the source image."""
    base, base_tables = grade(source, settings['base'])
    receipt = dict(baseLUTs=base_tables, regionLUTs=[])
    regions = settings.get('regions',[])
    require(isinstance(regions,list) and len(regions) <= 16, 'too many lighting regions')
    for region in regions:
        mask = polygon_mask(source.size,region['polygons'])
        blur = number(region.get('maskBlur',0),'maskBlur',0,256)
        if blur:
            mask = mask.filter(ImageFilter.GaussianBlur(blur))
        opacity = number(region.get('opacity',1),'opacity',0,1)
        mask = mask.point([round(v*opacity) for v in range(256)])
        local, tables = grade(source,region['grade'])
        base = Image.composite(local,base,mask)
        receipt['regionLUTs'].append(dict(name=region['name'],tables=tables))
    result = base.convert('RGBA')
    result.putalpha(source.getchannel('A'))
    receipt.update(dimensionsUnchanged=True,alphaUnchanged=True,spatialResampling=False,
                   geometryCoordinatesUnchanged=True,
                   rgbPixelIdentity=False)
    return result,receipt


def derive(source_path, settings_path, output):
    source_path,settings_path,output = [Path(p).resolve() for p in (source_path,settings_path,output)]
    receipt_path = output.with_suffix('.derivation.json')
    require(output.suffix.lower() == '.png','output must be PNG')
    require(not {output,receipt_path}.intersection({source_path,settings_path}),'source overwrite forbidden')
    require(not output.exists() and not receipt_path.exists(),'output already exists')
    settings = json.loads(settings_path.read_text(encoding='utf-8-sig'))
    source_hash = sha256(source_path)
    require(source_hash == settings['sourceSHA256'],'source hash mismatch')
    im = load_png(source_path)
    require(list(im.size) == settings['dimensions'],'source dimensions mismatch')
    operation = settings['operation']
    require(operation in ('alpha-cleanup','lighting-only'),'unknown operation')
    result, metrics = (clean_alpha if operation == 'alpha-cleanup' else lighting)(im,settings['settings'])
    require(im.size == result.size,'dimension changes forbidden')
    require(sha256(source_path) == source_hash,'source changed during operation')
    output.parent.mkdir(parents=True,exist_ok=True)
    result.save(output,format='PNG',compress_level=9)
    receipt = dict(source=str(source_path),sourceSHA256=source_hash,sourceFileUnchanged=True,
                   outputSHA256=sha256(output),settingsSHA256=sha256(settings_path),
                   settings=settings,metrics=metrics,pillowVersion=PILLOW_VERSION,
                   status='STAGING',review='PENDING',productionApproved=False)
    receipt_path.write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
    return receipt


if __name__ == '__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source');p.add_argument('settings');p.add_argument('output')
    args=p.parse_args()
    result=derive(args.source,args.settings,args.output)
    summary={k:v for k,v in result['metrics'].items() if not k.endswith('LUTs')}
    print(json.dumps(dict(output=args.output,sha256=result['outputSHA256'],metrics=summary),indent=2))
