"""生成 1200x630 的 Open Graph 分享图。

用法：py scripts/generate-og-images.py
输出：
  public/og-default.jpg / og-default-zh.jpg / og-default-ja.jpg
  public/images/og/<原图文件名>.jpg

原图更新后重新运行即可。依赖 Pillow。
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
WIDTH, HEIGHT = 1200, 630

FONT_EN = "C:/Windows/Fonts/segoeuib.ttf"
FONT_ZH = "C:/Windows/Fonts/msyhbd.ttc"
FONT_JA = "C:/Windows/Fonts/YuGothB.ttc"

# 文章页 frontmatter 里用到的图片。新增图片时在这里补一行。
ARTICLE_IMAGES = [
    "zhongkui-04.jpg",
    "wuchang-1.jpg",
    "yanyun-1.jpg",
    "wukong-1.jpg",
    "tides-gwendolyn.jpg",
    "pbzero-1.jpg",
    "pbzero-2.jpg",
    "wukong-2.jpg",
]

DEFAULTS = [
    ("og-default.jpg", FONT_EN, "China AAA Games", "News · Lore · Guides for Chinese AAA Games"),
    ("og-default-zh.jpg", FONT_ZH, "中国 3A 游戏", "黑神话：悟空、钟馗深度解析与资讯"),
    ("og-default-ja.jpg", FONT_JA, "中国3Aゲーム", "黒神話：悟空・鍾馗の攻略とニュース"),
]


def load_font(path, size):
    return ImageFont.truetype(path, size, index=0)


def cover_crop(image, width=WIDTH, height=HEIGHT, top_bias=False):
    """按比例填满画布并居中裁切；竖图偏上裁，避免切掉头部。"""
    scale = max(width / image.width, height / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.LANCZOS,
    )
    left = (resized.width - width) // 2
    top = int((resized.height - height) * (0.0 if top_bias else 0.5))
    top = max(0, min(top, resized.height - height))
    return resized.crop((left, top, left + width, top + height))


def bottom_shade(width=WIDTH, height=HEIGHT, start=0.45, alpha=215):
    """自下而上的黑色渐变，保证文字可读。"""
    mask = Image.new("L", (1, height), 0)
    for y in range(height):
        t = y / height
        value = 0 if t < start else int(alpha * ((t - start) / (1 - start)) ** 1.5)
        mask.putpixel((0, y), value)
    shade = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shade.putalpha(mask.resize((width, height)))
    return shade


def sharpen(image):
    return ImageEnhance.Sharpness(image).enhance(1.12)


def draw_wordmark(draw, x, y, color=(255, 255, 255, 255)):
    font = load_font(FONT_EN, 24)
    text = "CHINA AAA GAMES"
    draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, 180))
    draw.text((x, y), text, font=font, fill=color)


def article_card(source, destination):
    image = Image.open(source).convert("RGB")
    is_portrait = image.width / image.height < 1.45
    card = sharpen(cover_crop(image, top_bias=is_portrait)).convert("RGBA")
    card = Image.alpha_composite(card, bottom_shade(start=0.52, alpha=190))

    draw = ImageDraw.Draw(card)
    draw.rectangle((64, HEIGHT - 96, 68, HEIGHT - 58), fill=(212, 175, 55, 255))
    draw_wordmark(draw, 88, HEIGHT - 92)
    card.convert("RGB").save(destination, "JPEG", quality=88, optimize=True, progressive=True)


def default_card(destination, font_path, title, subtitle):
    background = Image.open(PUBLIC / "images" / "yanyun-hero.jpg").convert("RGB")
    card = sharpen(cover_crop(background)).convert("RGBA")
    card = Image.alpha_composite(card, Image.new("RGBA", (WIDTH, HEIGHT), (6, 8, 12, 90)))
    card = Image.alpha_composite(card, bottom_shade(start=0.3, alpha=225))

    draw = ImageDraw.Draw(card)
    title_font = load_font(font_path, 78)
    subtitle_font = load_font(font_path, 29)
    domain_font = load_font(FONT_EN, 22)

    x = 72
    draw.rectangle((x, 356, x + 76, 361), fill=(212, 175, 55, 255))
    draw.text((x + 2, 398 + 3), title, font=title_font, fill=(0, 0, 0, 170))
    draw.text((x, 398), title, font=title_font, fill=(255, 255, 255, 255))
    draw.text((x + 1, 512 + 2), subtitle, font=subtitle_font, fill=(0, 0, 0, 150))
    draw.text((x, 512), subtitle, font=subtitle_font, fill=(214, 219, 228, 255))
    draw.text((x, HEIGHT - 62), "china3agames.com", font=domain_font, fill=(160, 168, 180, 255))

    card.convert("RGB").save(destination, "JPEG", quality=90, optimize=True, progressive=True)


def main():
    og_dir = PUBLIC / "images" / "og"
    og_dir.mkdir(parents=True, exist_ok=True)

    for filename in ARTICLE_IMAGES:
        source = PUBLIC / "images" / filename
        if not source.exists():
            raise SystemExit(f"缺少原图：{source}")
        destination = og_dir / filename
        article_card(source, destination)
        print(f"生成 {destination.relative_to(ROOT)}")

    for filename, font_path, title, subtitle in DEFAULTS:
        destination = PUBLIC / filename
        default_card(destination, font_path, title, subtitle)
        print(f"生成 {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
