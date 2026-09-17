# Apartment V2 reproducibility bundle

All input PNGs and numeric settings are local to this checkout. `assets.json` uses relative paths. Run `test_apartment_production.py` in the compositor directory with Pillow 12.3.0.

The test derives the night background and cleaned alpha from their original inputs, verifies their approved hashes, then reconstructs the production PNG exactly. Source RGB is not repainted. Receipts/review.json are historical provenance; approval.json above remains the production approval authority. No approval is conferred on the original rejected scene or raw layers as identity/body/wardrobe masters.
