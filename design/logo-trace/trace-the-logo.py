"""Redraw the venue's own logo as vector paths.

The only picture of the logo we have is the bottom of a promo photograph
(design/photos-inbox/brand-fortune-cookie-logo-*.jpg): flat 1-bit artwork,
black ink on light paper.  That makes it traceable exactly rather than
imitated: threshold the pixels, follow the iso-contour with marching squares
at sub-pixel accuracy, simplify each loop, and emit one even-odd path.  Ink
becomes filled, and every white counter inside it -- brick faces, the flame,
the LOUNGE panel -- becomes a hole, at whatever nesting depth.

The emblem is separated from the letters by area: the largest loop is the
emblem's outline, and every loop that fits inside its box belongs to it.  The
page needs them apart, because on the dark hero the letters reverse to paper
while the emblem keeps its own ink-on-paper reading, on a paper coin.

Run:  python design/logo-trace/trace-the-logo.py
Writes: src/shared/brand/brand-lockup.ts, assets/favicon.svg
"""
import importlib
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ms = importlib.import_module('marching-squares')

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LOGO_IN_THE_PHOTOGRAPH = (152, 1114, 853, 1315)
UPSCALE, INK_BELOW, SOFTEN, TOLERANCE = 5, 150, 0.25, 1.6
VIEWBOX_WIDTH = 1000.0
COIN_MARGIN = 1.02
DECIMALS = 1

MODULE = '''import { html, raw, type TrustedHtml } from "#shared/html/html.ts";


const LOCKUP_VIEWBOX = "0 0 %(width).0f %(height).1f";

const COIN = '<circle class="coin" cx="%(cx).1f" cy="%(cy).1f" r="%(r).1f"/>';

const EMBLEM = '<path class="emblem" fill-rule="evenodd" d="%(emblem)s"/>';

const LETTERS = '<path class="letters" fill-rule="evenodd" d="%(letters)s"/>';

export const brandLockup = (name: string): TrustedHtml =>
  raw(
    html`<svg class="logo" viewBox="${LOCKUP_VIEWBOX}" role="img" aria-label="${name}">` +
      COIN +
      EMBLEM +
      LETTERS +
      "</svg>",
  );
'''

FAVICON = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%(x).1f %(y).1f %(side).1f %(side).1f">'
           '<circle cx="%(cx).1f" cy="%(cy).1f" r="%(r).1f" fill="#F3EDE2"/>'
           '<path fill="#221B14" fill-rule="evenodd" d="%(emblem)s"/></svg>\n')


def num(v):
    s = ('%.*f' % (DECIMALS, v)).rstrip('0').rstrip('.')
    if s in ('-0', ''):
        return '0'
    if s.startswith('0.'):
        return s[1:]
    if s.startswith('-0.'):
        return '-' + s[2:]
    return s


def compact(loops, ox, oy, scale):
    """Loops to one path string, relative and shorthanded: 'm dx,dy h dx v dy l dx,dy z'."""
    out, cx, cy = [], 0.0, 0.0
    for loop in loops:
        points = []
        for x, y in loop:
            p = (round((x - ox) * scale, DECIMALS), round((y - oy) * scale, DECIMALS))
            if not points or p != points[-1]:
                points.append(p)
        if len(points) > 1 and points[0] == points[-1]:
            points.pop()
        if len(points) < 3:
            continue
        segment = ['m' + num(points[0][0] - cx) + ',' + num(points[0][1] - cy)]
        cx, cy = points[0]
        last = ''
        for x, y in points[1:]:
            dx, dy = round(x - cx, DECIMALS), round(y - cy, DECIMALS)
            if dx == 0 and dy == 0:
                continue
            if dy == 0:
                command, argument = 'h', num(dx)
            elif dx == 0:
                command, argument = 'v', num(dy)
            else:
                command, argument = 'l', num(dx) + ',' + num(dy)
            if command == last:
                segment.append(('' if argument.startswith('-') else ' ') + argument)
            else:
                segment.append(command + argument)
            last, cx, cy = command, x, y
        segment.append('z')
        out.append(''.join(segment))
    return ''.join(out)


def bounds(loop):
    xs = [p[0] for p in loop]
    ys = [p[1] for p in loop]
    return min(xs), min(ys), max(xs), max(ys)


def main():
    image = ms.load(LOGO_IN_THE_PHOTOGRAPH, UPSCALE, SOFTEN)
    loops = [ms.dp(loop, TOLERANCE) for loop in ms.marching(image, INK_BELOW)]
    loops = [loop for loop in loops if len(loop) >= 3]
    boxes = [bounds(loop) for loop in loops]

    widest = max(range(len(loops)), key=lambda i: (boxes[i][2] - boxes[i][0]) * (boxes[i][3] - boxes[i][1]))
    ex0, ey0, ex1, ey1 = boxes[widest]
    within = lambda b: b[0] >= ex0 - 2 and b[2] <= ex1 + 2 and b[1] >= ey0 - 2 and b[3] <= ey1 + 2
    emblem = [loop for loop, box in zip(loops, boxes) if within(box)]
    letters = [loop for loop, box in zip(loops, boxes) if not within(box)]

    xs = [p[0] for loop in loops for p in loop]
    ys = [p[1] for loop in loops for p in loop]
    ox, oy = min(xs), min(ys)
    scale = VIEWBOX_WIDTH / (max(xs) - ox)
    numbers = {
        'width': VIEWBOX_WIDTH,
        'height': (max(ys) - oy) * scale,
        'cx': ((ex0 + ex1) / 2 - ox) * scale,
        'cy': ((ey0 + ey1) / 2 - oy) * scale,
        'r': max(ex1 - ex0, ey1 - ey0) / 2 * scale * COIN_MARGIN,
        'emblem': compact(emblem, ox, oy, scale),
        'letters': compact(letters, ox, oy, scale),
    }
    numbers['x'] = numbers['cx'] - numbers['r']
    numbers['y'] = numbers['cy'] - numbers['r']
    numbers['side'] = numbers['r'] * 2

    module = os.path.join(ROOT, 'src', 'shared', 'brand', 'brand-lockup.ts')
    os.makedirs(os.path.dirname(module), exist_ok=True)
    open(module, 'w', encoding='utf-8', newline='').write(MODULE % numbers)
    open(os.path.join(ROOT, 'assets', 'favicon.svg'), 'w', encoding='utf-8', newline='').write(FAVICON % numbers)

    print('lockup %d chars, viewBox 0 0 %.0f %.1f' % (
        len(numbers['emblem']) + len(numbers['letters']), VIEWBOX_WIDTH, numbers['height']))


if __name__ == '__main__':
    main()
