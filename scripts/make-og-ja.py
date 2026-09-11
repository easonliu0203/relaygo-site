"""Build public/og-image-ja.png from og-image.png: a frosted card replaces the
English copy with Japanese (Noto Sans JP, SIL OFL 1.1)."""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))  # put NotoSansJP.ttf (SIL OFL) next to this script
SRC = "d:/repo/relaygo-site/public/og-image.png"
OUT = os.environ.get("OG_OUT", os.path.join(HERE, "og-image-ja.png"))  # then save as JPEG q88 to public/og-image-ja.jpg
FONT = os.path.join(HERE, "NotoSansJP.ttf")

img = Image.open(SRC).convert("RGB")
W, H = img.size
px = img.load()

# 1) Locate the blue "Relay GO" logo box in the right-middle area. Count blue
#    pixels per column/row: the solid box has ~100 per column, while the thin
#    blue underline under the English tagline only has a few — ignore those.
def is_blue(p):
    r, g, b = p
    return b > 200 and r < 90 and 70 < g < 160

col = {x: sum(is_blue(px[x, y]) for y in range(180, 400)) for x in range(560, 900)}
box_cols = [x for x, n in col.items() if n >= 60]
lx0, lx1 = min(box_cols), max(box_cols)
row = {y: sum(is_blue(px[x, y]) for x in range(lx0, lx1 + 1)) for y in range(180, 400)}
box_rows = [y for y, n in row.items() if n >= 0.5 * (lx1 - lx0)]
ly0, ly1 = min(box_rows), max(box_rows)
# rounded corners: pad a few px so the corners are not clipped
lx0, ly0, lx1, ly1 = lx0 - 2, ly0 - 2, lx1 + 2, ly1 + 2
logo = img.crop((lx0, ly0, lx1 + 1, ly1 + 1))
brand_blue = px[(lx0 + lx1) // 2, ly0 + 6]
print("logo bbox", (lx0, ly0, lx1, ly1), "brand", brand_blue)

# 2) Frosted card over the old logo + English text.
CX0, CY0, CX1, CY1 = 592, 186, 1186, 366
card = img.crop((CX0, CY0, CX1, CY1)).filter(ImageFilter.GaussianBlur(18))
shade = Image.new("RGB", card.size, (12, 16, 28))
card = Image.blend(card, shade, 0.58)
mask = Image.new("L", card.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, card.size[0] - 1, card.size[1] - 1), radius=20, fill=255)
img.paste(card, (CX0, CY0), mask)
d = ImageDraw.Draw(img)
d.rounded_rectangle((CX0, CY0, CX1 - 1, CY1 - 1), radius=20, outline=(255, 255, 255), width=1)
# soften the outline to ~20% white
overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
img = img.convert("RGBA")
ImageDraw.Draw(overlay).rounded_rectangle((CX0, CY0, CX1 - 1, CY1 - 1), radius=20, outline=(255, 255, 255, 60), width=1)
img = Image.alpha_composite(img, overlay)

# 3) Logo, scaled, at the card's left.
PAD = 24
LS = 100
logo_s = logo.resize((LS, round(LS * logo.size[1] / logo.size[0])), Image.LANCZOS).convert("RGBA")
ly = CY0 + (CY1 - CY0 - logo_s.size[1]) // 2
img.alpha_composite(logo_s, (CX0 + PAD, ly))

# 4) Japanese copy.
def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_name(weight)
    return f

tx = CX0 + PAD + LS + 22
lines = [
    ("台湾の空港送迎・貸切チャーター", font(28, "Bold"), (255, 255, 255, 255), 12),
    ("日本語アプリでかんたん予約", font(19, "Medium"), (235, 240, 255, 255), 6),
    ("ドライバーとのチャットは自動翻訳", font(19, "Medium"), (235, 240, 255, 255), 12),
    ("App Store / Google Play", font(15, "Regular"), (200, 208, 225, 255), 0),
]
heights = []
for text, f, _, gap in lines:
    b = f.getbbox(text)
    heights.append(b[3] - b[1] + gap)
ty = CY0 + (CY1 - CY0 - sum(heights) - 6) // 2
dr = ImageDraw.Draw(img)
max_w = CX1 - PAD - tx
for i, (text, f, color, gap) in enumerate(lines):
    b = f.getbbox(text)
    w = b[2] - b[0]
    assert w <= max_w, f"line too wide: {text} {w}>{max_w}"
    dr.text((tx, ty - b[1]), text, font=f, fill=color)
    ty += b[3] - b[1]
    if i == 0:  # brand-blue accent under the headline, like the original
        dr.rectangle((tx, ty + 5, tx + 150, ty + 7), fill=brand_blue + (255,))
        ty += 8
    ty += gap

img.convert("RGB").save(OUT, optimize=True)
print("saved", OUT, os.path.getsize(OUT), "bytes")
