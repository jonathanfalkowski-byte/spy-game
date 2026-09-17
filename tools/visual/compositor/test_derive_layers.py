import json
import tempfile
import unittest
from pathlib import Path
from PIL import Image
from composite import sha256
from derive_layers import clean_alpha, lighting, derive
from key_white_layer import extract


class DerivativeTests(unittest.TestCase):
    def test_white_key_preserves_enclosed_light_area_and_refuses_sidecar_overwrite(self):
        with tempfile.TemporaryDirectory() as d:
            d=Path(d); source=d/'source.png'
            im=Image.new('RGBA',(20,20),'white')
            im.paste((20,20,20,255),(6,6,14,14))
            im.putpixel((10,10),(250,250,250,255))
            im.save(source)
            original=sha256(source)
            out=d/'cutout.png'
            extract(source,out)
            with Image.open(out) as cleaned:
                self.assertEqual(cleaned.getpixel((0,0))[3],0)
                self.assertEqual(cleaned.getpixel((10,10)),(250,250,250,255))
            (d/'other.extraction.json').write_text('preserved')
            with self.assertRaisesRegex(ValueError,'overwrite'):
                extract(source,d/'other.png')
            self.assertEqual(sha256(source),original)
            self.assertEqual((d/'other.extraction.json').read_text(),'preserved')

    def test_matte_changes_only_eligible_alpha_and_protects_face(self):
        im=Image.new('RGBA',(12,12),(250,250,250,255))
        im.putpixel((3,3),(30,20,20,255))
        cfg=dict(fadeStart=210,transparentAt=242,maxChannelSpread=25,edgeRadius=0,
                 cleanupPolygons=[[[0,0],[6,0],[6,11],[0,11]]],
                 protectedPolygons=[[[1,1],[2,1],[2,2],[1,2]]])
        out,report=clean_alpha(im,cfg)
        self.assertEqual(out.getpixel((0,0))[3],0)
        self.assertEqual(out.getpixel((1,1))[3],255)
        self.assertEqual(out.getpixel((3,3))[3],255)
        self.assertEqual(out.getpixel((10,10))[3],255)
        self.assertEqual(out.convert('RGB').tobytes(),im.convert('RGB').tobytes())
        self.assertTrue(report['protectedAlphaUnchanged'])

    def test_night_preserves_coordinate_grid_alpha_and_dimensions(self):
        im=Image.new('RGBA',(12,10))
        for y in range(10):
            for x in range(12):
                im.putpixel((x,y),(x*20,y*20,100,x+y))
        out,report=lighting(im,dict(base=dict(gamma=1,gains=[.5,.5,.5]),regions=[]))
        self.assertEqual(out.size,im.size)
        self.assertEqual(out.getchannel('A').tobytes(),im.getchannel('A').tobytes())
        for y in range(10):
            for x in range(12):
                self.assertEqual(out.getpixel((x,y)),(x*10,y*10,50,x+y))
        self.assertFalse(report['spatialResampling'])

    def test_masked_lighting_changes_only_declared_area(self):
        im=Image.new('RGBA',(8,8),(200,180,160,255))
        out,_=lighting(im,dict(base=dict(gamma=1,gains=[1,1,1]),regions=[dict(
            name='window',polygons=[[[1,1],[3,1],[3,3],[1,3]]],
            grade=dict(gamma=1,gains=[.5,.5,.5]))]))
        self.assertEqual(out.getpixel((2,2)),(100,90,80,255))
        self.assertEqual(out.getpixel((5,5)),im.getpixel((5,5)))

    def test_repeated_derivative_hash_and_immutable_source(self):
        with tempfile.TemporaryDirectory() as d:
            d=Path(d); source=d/'source.png'; cfg=d/'settings.json'
            Image.new('RGBA',(12,12),(220,200,180,255)).save(source)
            original=sha256(source)
            cfg.write_text(json.dumps(dict(sourceSHA256=original,dimensions=[12,12],
                operation='lighting-only',settings=dict(base=dict(gamma=1.1,gains=[.6,.65,.7]),regions=[]))))
            first=derive(source,cfg,d/'one.png');second=derive(source,cfg,d/'two.png')
            self.assertEqual(first['outputSHA256'],second['outputSHA256'])
            self.assertEqual(sha256(source),original)
            with self.assertRaisesRegex(ValueError,'overwrite'):
                derive(source,cfg,source)
            with self.assertRaisesRegex(ValueError,'exists'):
                derive(source,cfg,d/'one.png')


if __name__ == '__main__':
    unittest.main()
