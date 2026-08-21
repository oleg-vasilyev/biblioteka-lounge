"""Render the link-preview image from the traced logo.

og:image has to be a raster, so the one place the logo exists as pixels is
here: the same lockup the page draws, on the same night background, sized for
the 1200x630 card every chat app crops to.  Needs Microsoft Edge, which every
Windows machine has; nothing else in the repo does.

Run:  python design/logo-trace/make-social-cover.py
Writes: assets/img/social-cover.png
"""
import os, pathlib, re, subprocess, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
CARD = (1200, 630)
LOGO_WIDTH_ON_THE_CARD = 660
PAPER, INK = '#F3EDE2', '#221B14'


def lockup_pieces():
    source = open(os.path.join(ROOT, 'src', 'shared', 'brand', 'brand-lockup.ts'), encoding='utf-8').read()
    grab = lambda name: re.search(r"const %s = '([^']+)'" % name, source).group(1)
    viewbox = re.search(r'const LOCKUP_VIEWBOX = "([^"]+)"', source).group(1)
    return viewbox, grab('COIN'), grab('EMBLEM'), grab('LETTERS')


def main():
    viewbox, coin, emblem, letters = lockup_pieces()
    width, height = CARD
    page = (f'<body style="margin:0;width:{width}px;height:{height}px;background:{INK};'
            f'display:flex;align-items:center;justify-content:center">'
            f'<svg width="{LOGO_WIDTH_ON_THE_CARD}" viewBox="{viewbox}" xmlns="http://www.w3.org/2000/svg">'
            f'<style>.coin{{fill:{PAPER}}}.emblem{{fill:{INK}}}.letters{{fill:{PAPER}}}</style>'
            f'{coin}{emblem}{letters}</svg></body>')
    folder = tempfile.mkdtemp()
    html = os.path.join(folder, 'cover.html')
    open(html, 'w', encoding='utf-8').write(page)
    out = os.path.join(ROOT, 'assets', 'img', 'social-cover.png')
    subprocess.run([EDGE, '--headless=new', '--disable-gpu', '--hide-scrollbars',
                    '--user-data-dir=' + os.path.join(folder, 'profile'),
                    '--screenshot=' + out, '--window-size=%d,%d' % CARD,
                    '--virtual-time-budget=4000', pathlib.Path(html).as_uri()],
                   check=True, capture_output=True)
    print('social-cover.png %6.1f KB' % (os.path.getsize(out) / 1024))


if __name__ == '__main__':
    main()
