import json
import tempfile
import unittest
from pathlib import Path

from PIL import Image
from composite import render, sha256


class CompositorTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        Image.new('RGBA', (24, 20), (11, 31, 71, 255)).save(self.root / 'bg.png')
        for name, color in [('red', (255, 0, 0, 255)), ('green', (0, 255, 0, 255))]:
            im = Image.new('RGBA', (4, 4))
            im.paste(color, (1, 1, 3, 3))
            im.save(self.root / (name + '.png'))
        self.manifest = {'assetRoots': ['.'], 'assets': {
            name: {'path': name + '.png', 'sha256': sha256(self.root / (name + '.png')),
                   'kind': 'background' if name == 'bg' else 'prop'}
            for name in ['bg', 'red', 'green']}}
        self.manifest['assets']['bg'].update(immutable=True, environmentCanonVersion='v1')
        self.spec = {'compositionId': 'test', 'shotId': 'shot', 'backgroundAssetId': 'bg',
                     'outputSize': [24, 20], 'environmentCanonVersion': 'v1', 'characters': [],
                     'props': [self.layer('red', 0), self.layer('green', 1)]}

    def layer(self, asset, z):
        return dict(assetId=asset, x=8, y=8, scale=1, anchor='top-left', zIndex=z, custodyNote='test')

    def run_render(self, name='out.png'):
        (self.root / 'spec.json').write_text(json.dumps(self.spec))
        (self.root / 'manifest.json').write_text(json.dumps(self.manifest))
        return render(self.root / 'spec.json', self.root / 'manifest.json', self.root / name)

    def test_background_and_order_and_determinism(self):
        first = self.run_render()
        second = self.run_render('second.png')
        self.assertEqual(first['outputSHA256'], second['outputSHA256'])
        self.assertEqual(first['pixelStability']['changedUncoveredPixels'], 0)
        with Image.open(self.root / 'out.png') as im:
            self.assertEqual(im.getpixel((9, 9)), (0, 255, 0, 255))
            self.assertEqual(im.getpixel((1, 1)), (11, 31, 71, 255))

    def test_background_resize_rejected(self):
        self.spec['outputSize'] = [25, 20]
        with self.assertRaisesRegex(ValueError, 'resize'):
            self.run_render()

    def test_hash_mismatch_rejected(self):
        self.manifest['assets']['bg']['sha256'] = '0' * 64
        with self.assertRaisesRegex(ValueError, 'hash'):
            self.run_render()

    def test_unapproved_flip_rejected_and_approved_allowed(self):
        self.spec['props'][0]['flipX'] = True
        with self.assertRaisesRegex(ValueError, 'approval'):
            self.run_render()
        self.spec['props'][0]['flipApproval'] = 'Explicit test approval'
        self.run_render()

    def test_invalid_scale_rejected(self):
        for value in [0, -1, float('nan'), float('inf'), True]:
            with self.subTest(value=value):
                self.spec['props'][0]['scale'] = value
                with self.assertRaises(ValueError):
                    self.run_render()

    def test_source_overwrite_rejected(self):
        original = sha256(self.root / 'bg.png')
        with self.assertRaisesRegex(ValueError, 'overwrite'):
            self.run_render('bg.png')
        self.assertEqual(original, sha256(self.root / 'bg.png'))

    def test_opaque_layer_rejected(self):
        Image.new('RGB', (4, 4), 'white').save(self.root / 'red.png')
        self.manifest['assets']['red']['sha256'] = sha256(self.root / 'red.png')
        with self.assertRaisesRegex(ValueError, 'transparent'):
            self.run_render()

    def test_root_escape_rejected(self):
        self.manifest['assetRoots'] = ['unrelated']
        with self.assertRaisesRegex(ValueError, 'outside'):
            self.run_render()

    def test_clipping_requires_explicit_flag(self):
        self.spec['props'][0]['x'] = -2
        with self.assertRaisesRegex(ValueError, 'clip'):
            self.run_render()
        self.spec['props'][0]['allowClipping'] = True
        self.run_render()

    def test_scale_aspect_anchor_and_shadow(self):
        self.spec['props'] = [dict(self.layer('red', 2), scale=2, x=12, y=12, anchor='bottom-center')]
        self.manifest['assets']['green']['kind'] = 'shadow'
        self.spec['shadows'] = [dict(self.layer('green', 1), opacity=.2)]
        receipt = self.run_render()
        self.assertEqual(receipt['layers'][1]['renderedSize'], (8, 8))
        self.assertEqual(receipt['layers'][1]['topLeft'], [8, 4])


if __name__ == '__main__':
    unittest.main()
