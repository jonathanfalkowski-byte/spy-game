"""Rebuild the shot-specific approved apartment using only portable repository inputs."""
import json
import tempfile
import unittest
from pathlib import Path
from composite import render, sha256
from derive_layers import derive

ROOT = Path(__file__).resolve().parents[3] / 'art/production/chapter5'
EVIDENCE = ROOT / 'apartment-evidence'
COMPONENTS = ROOT / 'apartment-components'


class ApartmentProductionTest(unittest.TestCase):
    def test_approved_output_and_both_derivations_reproduce(self):
        with tempfile.TemporaryDirectory() as folder:
            tmp = Path(folder)
            for source, settings, expected in [
                ('apartment-evening-v1.png', 'night-settings.json', 'apartment-night-canon-derived-v1.png'),
                ('evelynn-character-layer-v1.png', 'matte-settings.json', 'evelynn-character-layer-clean-v2.png'),
            ]:
                receipt = derive(COMPONENTS/source, EVIDENCE/settings, tmp/expected)
                self.assertEqual(receipt['outputSHA256'], sha256(COMPONENTS/expected))
            name = 'C5-S12-SHOT05-PHONE-COMPOSITE-V2.png'
            result = render(EVIDENCE/'composition.json', EVIDENCE/'assets.json', tmp/name)
            self.assertEqual(result['outputSHA256'], sha256(ROOT/name))
            self.assertEqual(result['pixelStability']['changedUncoveredPixels'], 0)
            placement = json.loads((EVIDENCE/'v1-placement-reference.json').read_text())
            spec = json.loads((EVIDENCE/'composition.json').read_text())
            self.assertEqual({k:spec[k] for k in placement}, placement)


if __name__ == '__main__':
    unittest.main()
