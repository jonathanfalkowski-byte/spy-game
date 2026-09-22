"""Create a local, provenance-preserving repair for the Approach V1 entrance text."""

from __future__ import annotations

import hashlib
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "axiom-approach-v1-provider-original.png"
OUTPUT = ROOT / "axiom-approach-v1-signage-cleanup.png"
EXPECTED_SOURCE_SHA256 = "E3C92F80ED83A36CFA58DC7C117CED2AD92C0126BE413B10DBD207D01E1577E6"

# Inclusive/exclusive coordinates in the 2736x1536 provider original.
# This is the narrow entrance-header region containing the generated EVE letters.
REPAIR_REGION = (1768, 828, 1852, 872)


def sha256(path: Path) -> str:
    return hashlib.file_digest(path.open("rb"), "sha256").hexdigest().upper()


def main() -> None:
    if sha256(SOURCE) != EXPECTED_SOURCE_SHA256:
        raise RuntimeError("Refusing to edit an unexpected provider-original file.")

    image = cv2.imread(str(SOURCE), cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError("Provider original could not be decoded.")
    height, width = image.shape[:2]
    if (width, height) != (2736, 1536):
        raise RuntimeError("Unexpected provider-original dimensions.")

    x1, y1, x2, y2 = REPAIR_REGION
    roi = image[y1:y2, x1:x2]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

    # The lettering is the only compact, low-saturation highlight in this header.
    # Restrict the mask to bright glyph pixels, then feather two pixels into their edges.
    mask = cv2.inRange(hsv, np.array([0, 0, 125]), np.array([180, 95, 255]))
    mask = cv2.dilate(mask, np.ones((3, 3), dtype=np.uint8), iterations=1)

    repaired_roi = cv2.inpaint(roi, mask, 3, cv2.INPAINT_TELEA)
    repaired = image.copy()
    repaired[y1:y2, x1:x2] = repaired_roi
    if not cv2.imwrite(str(OUTPUT), repaired):
        raise RuntimeError("Could not write repaired staging derivative.")

    if sha256(SOURCE) != EXPECTED_SOURCE_SHA256:
        raise RuntimeError("Provider original changed during repair.")

    print(f"source_sha256={EXPECTED_SOURCE_SHA256}")
    print(f"output_sha256={sha256(OUTPUT)}")
    print(f"repair_region={x1},{y1},{x2},{y2}")
    print("repair_method=masked low-saturation highlight inpaint (OpenCV Telea, radius=3)")


if __name__ == "__main__":
    main()
