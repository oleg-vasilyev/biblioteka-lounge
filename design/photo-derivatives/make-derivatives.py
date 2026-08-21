"""Cut every frame the site ships out of the captures in design/photos-inbox.

The build only copies assets/; the crop that turns a 1440-wide capture into a
page-sized frame used to live in somebody's head.  It lives here instead: one
row per shipped file, naming the source, the rectangle taken from it, the long
edge and the JPEG quality.  Re-run after changing a row, or after a new
photograph lands in the inbox.

Run:  python design/photo-derivatives/make-derivatives.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
INBOX = os.path.join(ROOT, 'design', 'photos-inbox')
OUT = os.path.join(ROOT, 'assets', 'img')

DERIVATIVES = [
    # output                    source                                    crop (l, t, r, b)     long edge  quality
    ('hearth-table-800.jpg',    'hero-fireplace-table-DEZ4pssI7jg.jpg',   (0, 60, 1440, 1500),  800,       80),
    ('mural-readers-1100.jpg',  'interior-mural-readers-ClYmUZorSH.jpg',  (0, 0, 1440, 842),    1100,      80),
    ('borscht-croutons-800.jpg', 'food-borscht-typewriter-CnHNyBuoHSd.jpg', (250, 420, 1090, 1260), 800, 80),
    ('games-shelf-800.jpg',     'atmosphere-games-shelf-CFK2bJsWpS.jpg',  (0, 0, 3000, 3000),   800,       80),
]


def main():
    for name, source, box, edge, quality in DERIVATIVES:
        image = Image.open(os.path.join(INBOX, source)).crop(box).convert('RGB')
        image.thumbnail((edge, edge), Image.LANCZOS)
        path = os.path.join(OUT, name)
        image.save(path, quality=quality, optimize=True, progressive=True)
        print('%-26s %4dx%-4d %6.1f KB' % (name, image.width, image.height, os.path.getsize(path) / 1024))


if __name__ == '__main__':
    main()
