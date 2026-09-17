"""Verify the approved Chapter 5 cut against its actual portable art inputs."""
import json
import tempfile
import unittest
from pathlib import Path
from PIL import Image, ImageChops
from composite import render, sha256

ROOT = Path(__file__).resolve().parents[3]
PRODUCTION = ROOT / 'art/production/chapter5'
EVIDENCE = PRODUCTION / 'harbour-evidence'


class HarbourProductionPairTests(unittest.TestCase):
    def test_reproduces_both_approved_pngs_and_changes_only_departing_character(self):
        manifest = EVIDENCE / 'assets.json'
        specs = [json.loads((EVIDENCE / (name + '-composition.json')).read_text())
                 for name in ['master', 'departed']]
        self.assertEqual(specs[0]['characters'][0], specs[1]['characters'][0])
        self.assertEqual(len(specs[1]['characters']), 1)
        self.assertEqual(specs[0]['backgroundAssetId'], specs[1]['backgroundAssetId'])
        with tempfile.TemporaryDirectory() as temporary:
            rendered = []
            for name, spec in zip(['master', 'departed'], specs):
                output = Path(temporary) / (name + '.png')
                receipt = render(EVIDENCE / (name + '-composition.json'), manifest, output)
                self.assertEqual(receipt['pixelStability']['changedUncoveredPixels'], 0)
                self.assertEqual(sha256(output), sha256(PRODUCTION / (spec['compositionId'] + '.png')))
                rendered.append(Image.open(output).convert('RGB'))
            difference = ImageChops.difference(*rendered)
            channels = difference.split()
            changed = ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2])
            layer = Image.open(PRODUCTION / 'harbour-components/harbour-julian-generated-layer-v1.png').convert('RGBA')
            alpha = layer.resize((126, 502), Image.Resampling.LANCZOS).getchannel('A')
            mask = Image.new('L', (1920, 1080), 0)
            mask.paste(alpha.point(lambda value: 255 if value else 0), (597, 277))
            self.assertIsNotNone(changed.getbbox())
            self.assertIsNone(ImageChops.multiply(changed, ImageChops.invert(mask)).getbbox())


if __name__ == '__main__':
    unittest.main()
