"""Sub-pixel contour extraction, used by trace-the-logo.py.

load()      crop, upscale and soften a region of the photograph
marching()  follow the iso-contour at a grey level, returning closed loops
dp()        Douglas-Peucker, dropping points no further out than a tolerance
"""
import math
import os
from PIL import Image

SRC = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                   'design', 'photos-inbox', 'brand-fortune-cookie-logo-CFK2bJsWpS.jpg')

def load(box, up, blur):
    im = Image.open(SRC).convert('L').crop(box)
    im = im.resize((im.width*up, im.height*up), Image.LANCZOS)
    if blur:
        from PIL import ImageFilter
        im = im.filter(ImageFilter.GaussianBlur(blur))
    return im

def marching(im, level):
    w, h = im.size
    px = im.load()
    def inside(x, y): return px[x, y] < level          # ink is dark
    def hpt(x, y):                                      # crossing on edge (x,y)-(x+1,y)
        a, b = px[x, y], px[x+1, y]
        t = 0.5 if a == b else (level - a) / (b - a)
        return (x + t, y)
    def vpt(x, y):
        a, b = px[x, y], px[x, y+1]
        t = 0.5 if a == b else (level - a) / (b - a)
        return (x, y + t)
    links = {}
    def link(a, b):
        links.setdefault(a, []).append(b)
    for y in range(h-1):
        for x in range(w-1):
            tl, tr, br, bl = inside(x,y), inside(x+1,y), inside(x+1,y+1), inside(x,y+1)
            case = (tl<<3) | (tr<<2) | (br<<1) | bl
            if case in (0, 15): continue
            T, R, B, L = ('h',x,y), ('v',x+1,y), ('h',x,y+1), ('v',x,y)
            # walk keeps ink on the left: emit directed segments
            if case in (1,):        link(B, L)
            elif case in (2,):      link(R, B)
            elif case in (3,):      link(R, L)
            elif case in (4,):      link(T, R)
            elif case in (6,):      link(T, B)
            elif case in (7,):      link(T, L)
            elif case in (8,):      link(L, T)
            elif case in (9,):      link(B, T)
            elif case in (11,):     link(R, T)
            elif case in (12,):     link(L, R)
            elif case in (13,):     link(B, R)
            elif case in (14,):     link(L, B)
            elif case == 5:
                if (px[x,y]+px[x+1,y]+px[x+1,y+1]+px[x,y+1])/4 < level:
                    link(T, R); link(B, L)
                else:
                    link(T, L); link(B, R)
            elif case == 10:
                if (px[x,y]+px[x+1,y]+px[x+1,y+1]+px[x,y+1])/4 < level:
                    link(L, T); link(R, B)
                else:
                    link(L, B); link(R, T)
    coord = {}
    def xy(key):
        if key not in coord:
            k, x, y = key
            coord[key] = hpt(x, y) if k == 'h' else vpt(x, y)
        return coord[key]
    loops, used = [], set()
    for start in list(links):
        if start in used: continue
        chain, cur = [], start
        while cur in links and cur not in used:
            used.add(cur); chain.append(xy(cur))
            nxts = [n for n in links[cur] if n not in used]
            if not nxts:
                cur = links[cur][0]; break
            cur = nxts[0]
        if len(chain) >= 8: loops.append(chain)
    return loops

def dp(pts, eps):
    if len(pts) < 3: return pts
    keep = [False]*len(pts); keep[0] = keep[-1] = True
    stack = [(0, len(pts)-1)]
    while stack:
        i, j = stack.pop()
        if j <= i+1: continue
        ax, ay = pts[i]; bx, by = pts[j]
        dx, dy = bx-ax, by-ay
        norm = math.hypot(dx, dy) or 1e-9
        best, bi = -1, i
        for k in range(i+1, j):
            px_, py_ = pts[k]
            d = abs(dy*(px_-ax) - dx*(py_-ay)) / norm
            if d > best: best, bi = d, k
        if best > eps:
            keep[bi] = True; stack.append((i, bi)); stack.append((bi, j))
    return [p for p, k in zip(pts, keep) if k]
