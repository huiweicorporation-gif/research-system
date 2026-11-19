"""Draws the channel art of Why Humans: avatar, banner and video watermark (PNG).

Motif: a cave-art hand stencil (ochre pigment sprayed around a hand, the hand itself left as bare rock).
Run: py ve_nhan_dien.py   (writes the PNG files next to this script). Pillow + numpy only.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(__file__).resolve().parent
FONTS = Path("C:/Windows/Fonts")
ROCK = (14, 36, 52)          # deep blue-grey rock
ROCK_LIGHT = (28, 60, 80)
OCHRE = (214, 120, 58)       # red ochre
OCHRE_DARK = (150, 70, 34)
CREAM = (242, 227, 198)
RNG = np.random.default_rng(1)   # fixed seed: the same art on every run

# One hand in unit coordinates (palm centre 0,0; y grows downward). The palm is a polygon; fingers are capsules:
# base point inside the palm's top edge, angle from straight up in degrees (negative = to the left), length, width.
PALM = [(-0.29, -0.16), (-0.10, -0.21), (0.10, -0.20), (0.27, -0.12), (0.31, 0.10), (0.27, 0.32), (0.20, 0.46),
        (-0.17, 0.46), (-0.25, 0.32), (-0.31, 0.12)]
FINGERS = [((-0.20, -0.12), -17, 0.55, 0.135),
           ((-0.065, -0.16), -5, 0.63, 0.140),
           ((0.075, -0.15), 7, 0.58, 0.135),
           ((0.205, -0.08), 20, 0.45, 0.120),
           ((-0.24, 0.16), -60, 0.43, 0.160)]          # thumb


def hand_mask(size, scale: float, centre: tuple, wrist: float = 0.9, tilt: float = -8) -> Image.Image:
    """White hand on black, drawn 4x larger, joints rounded by blur + threshold, then reduced (smooth edges)."""
    k = 4
    w, h = (size, size) if isinstance(size, int) else size
    big = Image.new("L", (w * k, h * k), 0)
    d = ImageDraw.Draw(big)
    cx, cy, s, rot = centre[0] * k, centre[1] * k, scale * k, math.radians(tilt)

    def pt(x, y):
        return (cx + (x * math.cos(rot) - y * math.sin(rot)) * s, cy + (x * math.sin(rot) + y * math.cos(rot)) * s)

    def capsule(p0, p1, wd):
        (x0, y0), (x1, y1) = pt(*p0), pt(*p1)
        r = wd * s / 2
        ang = math.atan2(y1 - y0, x1 - x0) + math.pi / 2
        dx, dy = math.cos(ang) * r, math.sin(ang) * r
        d.polygon([(x0 + dx, y0 + dy), (x1 + dx, y1 + dy), (x1 - dx, y1 - dy), (x0 - dx, y0 - dy)], fill=255)
        for x, y in ((x0, y0), (x1, y1)):
            d.ellipse([x - r, y - r, x + r, y + r], fill=255)

    d.polygon([pt(x, y) for x, y in PALM], fill=255)
    d.polygon([pt(-0.18, 0.40), pt(0.21, 0.40), pt(0.23, 0.46 + wrist), pt(-0.19, 0.46 + wrist)], fill=255)
    for (bx, by), deg, length, wd in FINGERS:
        a = math.radians(deg)
        capsule((bx, by), (bx + math.sin(a) * length, by - math.cos(a) * length), wd)
    big = big.filter(ImageFilter.GaussianBlur(0.012 * s)).point(lambda v: 255 if v > 128 else 0)
    return big.resize((w, h), Image.LANCZOS)


def rock(w: int, h: int, base=ROCK, light=ROCK_LIGHT) -> Image.Image:
    """Rock wall: soft light from the top left plus fine grain."""
    yy, xx = np.mgrid[0:h, 0:w]
    glow = np.clip(1 - np.hypot(xx / w - 0.3, yy / h - 0.25) * 1.2, 0, 1)[..., None]
    img = np.array(base, float) + (np.array(light, float) - np.array(base, float)) * glow
    blotch = np.array(Image.fromarray((RNG.random((h // 16 + 1, w // 16 + 1)) * 255).astype(np.uint8))
                      .resize((w, h), Image.BICUBIC), float)[..., None] / 255
    grain = RNG.normal(0, 5, (h, w, 1))
    img = img * (0.88 + 0.24 * blotch) + grain
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB")


def stencil(bg: Image.Image, mask: Image.Image, spread: float, strength: float = 1.0) -> Image.Image:
    """Ochre sprayed round the hand: dense at the edge, mottled, fading out in speckles; the hand stays bare rock."""
    m = np.array(mask, float) / 255
    near = np.array(mask.filter(ImageFilter.GaussianBlur(spread * 0.35)), float) / 255
    far = np.array(mask.filter(ImageFilter.GaussianBlur(spread)), float) / 255
    halo = np.clip(near / max(near.max(), 1e-6) * 1.2 + far / max(far.max(), 1e-6) * 1.6, 0, 1)
    hgt, wid = m.shape
    mottle = np.array(Image.fromarray((RNG.random((hgt // 24 + 1, wid // 24 + 1)) * 255).astype(np.uint8))
                      .resize((wid, hgt), Image.BICUBIC), float) / 255
    speck = RNG.random(m.shape)
    paint = np.clip(halo ** 0.9 * (0.40 + 0.50 * mottle + 0.35 * speck) * strength, 0, 0.97)
    paint *= 1 - np.array(mask.filter(ImageFilter.GaussianBlur(1.0)), float) / 255
    colour = np.where((speck > 0.8)[..., None], np.array(OCHRE_DARK, float), np.array(OCHRE, float))
    out = np.array(bg, float) * (1 - paint[..., None]) + colour * paint[..., None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def font(name: str, px: int, variation: str | None = None) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONTS / name), px)
    if variation:
        f.set_variation_by_name(variation)
    return f


def avatar() -> Path:
    n = 800
    img = stencil(rock(n, n), hand_mask(n, 300, (n * 0.52, n * 0.50), wrist=1.1, tilt=-10), spread=70)
    p = OUT / "anh-dai-dien-800.png"
    img.save(p, optimize=True)
    return p


def banner() -> Path:
    w, h = 2560, 1440
    img = rock(w, h)
    cx, cy = w // 2, h // 2                          # safe area 1546 x 423 round the centre
    img = stencil(img, hand_mask((w, h), 175, (cx - 560, cy + 10), wrist=0.6, tilt=-14), spread=34)
    d = ImageDraw.Draw(img)
    title = font("bahnschrift.ttf", 150, "Bold Condensed")
    sub = font("bahnschrift.ttf", 46, "SemiLight")
    tx = cx - 400
    d.text((tx, cy - 115), "WHY HUMANS", font=title, fill=CREAM)
    d.text((tx + 4, cy + 62), "Why your body and mind work the way they do", font=sub, fill=(226, 190, 150))
    # timeline under the words: ochre dots from a campfire (past) to a phone screen (now)
    ly = cy + 150
    x_left, x_right = tx, tx + 1060
    d.line([(x_left, ly), (x_right, ly)], fill=(196, 132, 82), width=3)
    for i in range(9):
        x = x_left + (x_right - x_left) * i / 8
        r = 6 if i in (0, 8) else 4
        d.ellipse([x - r, ly - r, x + r, ly + r], fill=OCHRE)
    fx, fy = x_left - 40, ly                      # small flame
    d.polygon([(fx - 13, fy + 12), (fx, fy - 26), (fx + 13, fy + 12)], fill=OCHRE)
    d.polygon([(fx - 6, fy + 12), (fx, fy - 8), (fx + 6, fy + 12)], fill=CREAM)
    px, py = x_right + 34, ly                     # small phone
    d.rounded_rectangle([px - 11, py - 20, px + 11, py + 20], radius=4, outline=CREAM, width=3)
    d.line([(px - 4, py + 14), (px + 4, py + 14)], fill=CREAM, width=2)
    p = OUT / "anh-bia-2560x1440.png"
    img.save(p, optimize=True)
    img.save(p.with_suffix(".jpg"), quality=92)     # spare copy well under YouTube's 6 MB limit
    return p


def watermark() -> Path:
    """150 x 150 transparent PNG for YouTube's video watermark: an ochre hand in a thin ring."""
    n, k = 150, 4
    big = Image.new("RGBA", (n * k, n * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    d.ellipse([10, 10, n * k - 10, n * k - 10], fill=(14, 36, 52, 150), outline=CREAM + (235,), width=14)
    hand = hand_mask(n * k, 210, (n * k * 0.5, n * k * 0.5), wrist=0.35)
    big.paste(Image.new("RGBA", big.size, OCHRE + (255,)), (0, 0), hand)
    img = big.resize((n, n), Image.LANCZOS)
    p = OUT / "logo-dong-dau-150.png"
    img.save(p, optimize=True)
    return p


if __name__ == "__main__":
    for f in (avatar(), banner(), watermark()):
        print(f, f.stat().st_size // 1024, "KB")
