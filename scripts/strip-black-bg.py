"""Strip near-black backgrounds from product photos and save as transparent PNG.

Usage:
    python3 scripts/strip-black-bg.py INPUT [OUTPUT] [--threshold N] [--feather N]

Strategy:
    1. Convert to RGBA.
    2. Build a mask: pixels darker than `threshold` (max(r,g,b) <= threshold) -> transparent.
    3. Flood-fill from the four image corners using the same threshold so only the
       outer background is removed (preserves dark shadows inside the subject).
    4. Slight feather on the alpha edge so the cutout doesn't look jagged.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageFilter


def strip_black(
    in_path: Path,
    out_path: Path,
    threshold: int = 24,
    feather: int = 1,
) -> None:
    img = Image.open(in_path).convert("RGBA")
    w, h = img.size
    px = img.load()

    visited = [[False] * w for _ in range(h)]
    stack: list[tuple[int, int]] = []
    for cx, cy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        stack.append((cx, cy))

    def is_bg(r: int, g: int, b: int) -> bool:
        return max(r, g, b) <= threshold

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        r, g, b, _a = px[x, y]
        if not is_bg(r, g, b):
            continue
        visited[y][x] = True
        px[x, y] = (0, 0, 0, 0)
        stack.append((x + 1, y))
        stack.append((x - 1, y))
        stack.append((x, y + 1))
        stack.append((x, y - 1))

    if feather > 0:
        r, g, b, a = img.split()
        a = a.filter(ImageFilter.GaussianBlur(radius=feather))
        img = Image.merge("RGBA", (r, g, b, a))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"Wrote {out_path} ({out_path.stat().st_size:,} bytes)")


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("input", type=Path)
    p.add_argument("output", nargs="?", type=Path)
    p.add_argument("--threshold", type=int, default=24)
    p.add_argument("--feather", type=int, default=1)
    args = p.parse_args()

    out = args.output or args.input.with_name(args.input.stem + ".transparent.png")
    strip_black(args.input, out, threshold=args.threshold, feather=args.feather)
    return 0


if __name__ == "__main__":
    sys.exit(main())
