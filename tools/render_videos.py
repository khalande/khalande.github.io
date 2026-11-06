"""Cinematic brand loops for Bluenxt (re-render with:  pip install pycairo numpy pillow
    then  python3 tools/render_videos.py full [agents platform about consulting academy domain]).
Requires ffmpeg. Output goes to public/media/<name>.mp4.

Styled after the bn-ecosystem brand film, styled after the bn-ecosystem brand film:
deep blue + teal/cyan holographic glow, warm amber contrast, HUD interfaces,
3D perspective, depth of field and bloom. Each scene is a pure function of
t in [0, 1) so the 10-second videos loop seamlessly.
"""
import math
import random
import subprocess
import sys

import cairo
import numpy as np
from PIL import Image, ImageFilter

W, H, FPS, SECONDS = 1280, 720, 24, 10
FRAMES = FPS * SECONDS
TAU = math.tau

TEAL = (0.22, 0.95, 0.86)
CYAN = (0.13, 0.83, 0.95)
BLUE = (0.18, 0.42, 1.0)
AMBER = (1.0, 0.70, 0.28)
WHITE = (1.0, 1.0, 1.0)
MONO = "DejaVu Sans Mono"


# ------------------------------------------------------------------ helpers
def smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def osc(t, k=1, ph=0.0):
    return math.sin(TAU * (k * t + ph))


class Cam:
    def __init__(self, yaw=0.0, pitch=0.0, dist=900.0, fov=950.0, cx=W / 2, cy=H / 2, height=0.0):
        self.cy_, self.sy_ = math.cos(yaw), math.sin(yaw)
        self.cp_, self.sp_ = math.cos(pitch), math.sin(pitch)
        self.dist, self.fov, self.cx, self.cy, self.height = dist, fov, cx, cy, height

    def p(self, x, y, z):
        x, z = x * self.cy_ - z * self.sy_, x * self.sy_ + z * self.cy_
        y = y - self.height
        y, z = y * self.cp_ - z * self.sp_, y * self.sp_ + z * self.cp_
        z += self.dist
        if z < 20:
            return None
        s = self.fov / z
        return (self.cx + x * s, self.cy - y * s, z, s)


def bg(ctx, top=(0.020, 0.040, 0.095), bottom=(0.010, 0.020, 0.050)):
    g = cairo.LinearGradient(0, 0, 0, H)
    g.add_color_stop_rgb(0, *top)
    g.add_color_stop_rgb(1, *bottom)
    ctx.set_source(g)
    ctx.paint()


def soft(ctx, x, y, r, color, a):
    """Soft disc: glows, bokeh, atmosphere."""
    if r <= 0 or a <= 0.003:
        return
    g = cairo.RadialGradient(x, y, 0, x, y, r)
    g.add_color_stop_rgba(0, *color, a)
    g.add_color_stop_rgba(0.45, *color, a * 0.45)
    g.add_color_stop_rgba(1, *color, 0)
    ctx.set_source(g)
    ctx.arc(x, y, r, 0, TAU)
    ctx.fill()


def bokeh(ctx, x, y, r, color, a):
    """Defocused light: flat disc with a slightly brighter rim, like a lens."""
    ctx.set_source_rgba(*color, a * 0.55)
    ctx.arc(x, y, r, 0, TAU)
    ctx.fill()
    ctx.set_source_rgba(*color, a * 0.5)
    ctx.set_line_width(max(1, r * 0.08))
    ctx.arc(x, y, r * 0.96, 0, TAU)
    ctx.stroke()


def dot(ctx, x, y, r, color, a=1.0, glow=4.0):
    soft(ctx, x, y, r * glow, color, 0.6 * a)
    ctx.set_source_rgba(*color, a)
    ctx.arc(x, y, r, 0, TAU)
    ctx.fill()


def seg(ctx, a, b, color, alpha, width=1.0):
    ctx.set_source_rgba(*color, alpha)
    ctx.set_line_width(width)
    ctx.move_to(a[0], a[1])
    ctx.line_to(b[0], b[1])
    ctx.stroke()


def text(ctx, s, x, y, size=13, color=TEAL, a=1.0, weight=cairo.FONT_WEIGHT_NORMAL, align="left"):
    ctx.select_font_face(MONO, cairo.FONT_SLANT_NORMAL, weight)
    ctx.set_font_size(size)
    if align != "left":
        ext = ctx.text_extents(s)
        x -= ext.x_advance if align == "right" else ext.x_advance / 2
    ctx.set_source_rgba(*color, a)
    ctx.move_to(x, y)
    ctx.show_text(s)


def brackets(ctx, x, y, w, h, l=14, color=TEAL, a=0.9, lw=1.6):
    ctx.set_source_rgba(*color, a)
    ctx.set_line_width(lw)
    for cx, cy, dx, dy in ((x, y, 1, 1), (x + w, y, -1, 1), (x, y + h, 1, -1), (x + w, y + h, -1, -1)):
        ctx.move_to(cx + dx * l, cy)
        ctx.line_to(cx, cy)
        ctx.line_to(cx, cy + dy * l)
    ctx.stroke()


def panel(ctx, x, y, w, h, a=1.0):
    ctx.set_source_rgba(0.02, 0.10, 0.16, 0.55 * a)
    ctx.rectangle(x, y, w, h)
    ctx.fill()
    ctx.set_source_rgba(*TEAL, 0.25 * a)
    ctx.set_line_width(1)
    ctx.rectangle(x + 0.5, y + 0.5, w - 1, h - 1)
    ctx.stroke()
    brackets(ctx, x - 4, y - 4, w + 8, h + 8, 12, TEAL, 0.85 * a)


def city_bokeh(ctx, t, seed=1, count=46, y0=0.55):
    rnd = random.Random(seed)
    for _ in range(count):
        x = rnd.uniform(-60, W + 60) + 18 * osc(t, 1, rnd.random())
        y = rnd.uniform(H * y0, H + 30)
        r = rnd.uniform(8, 34)
        col = AMBER if rnd.random() < 0.55 else (TEAL if rnd.random() < 0.5 else BLUE)
        bokeh(ctx, x, y, r, col, rnd.uniform(0.05, 0.16) * (0.75 + 0.25 * osc(t, 2, rnd.random())))


# ------------------------------------------------------------- post process
_yy, _xx = np.mgrid[0:H, 0:W]
_d = np.sqrt(((_xx - W / 2) / (W / 2)) ** 2 + ((_yy - H / 2) / (H / 2)) ** 2)
VIGNETTE = np.clip(1.15 - 0.42 * _d ** 1.6, 0.35, 1.0)[..., None].astype(np.float32)
LIFT = np.array([4, 9, 20], np.float32)
_grain_rng = np.random.default_rng(3)
GRAIN = [_grain_rng.normal(0, 3.2, (H, W, 1)).astype(np.float32) for _ in range(6)]


def post(surface, f):
    buf = np.ndarray((H, W, 4), np.uint8, surface.get_data())
    rgb = buf[..., 2::-1].astype(np.float32)  # BGRA -> RGB
    lum = rgb.max(axis=2, keepdims=True)
    bright = np.clip((lum - 120) / 135, 0, 1) * rgb
    bimg = Image.fromarray(bright.astype(np.uint8))
    wide = np.asarray(bimg.filter(ImageFilter.GaussianBlur(22)), np.float32)
    tight = np.asarray(bimg.filter(ImageFilter.GaussianBlur(6)), np.float32)
    out = rgb + wide * 1.1 + tight * 0.7
    out = out * VIGNETTE * 0.96 + LIFT + GRAIN[f % len(GRAIN)]
    return np.clip(out, 0, 255).astype(np.uint8).tobytes()


# ================================================================== SCENES
# ---------------------------------------------------------------- agents
rnd = random.Random(21)
GRID = 60.0
TILE_Z = 1440.0          # pattern repeats every TILE_Z along the flight path
SPAN_X = 1500.0
TRACES = []
for _ in range(64):
    x = round(rnd.uniform(-SPAN_X, SPAN_X) / GRID) * GRID
    z = round(rnd.uniform(0, TILE_Z) / GRID) * GRID
    pts = [(x, z)]
    for _ in range(rnd.randint(3, 7)):
        if rnd.random() < 0.55:
            z += rnd.choice([1, 2, 3, 4]) * GRID
        else:
            x += rnd.choice([-3, -2, -1, 1, 2, 3]) * GRID
        pts.append((x, z))
    TRACES.append((pts, rnd.choice([1, 2]), rnd.random(), rnd.random() < 0.2))
CHIPS = []
for _ in range(26):
    x = round(rnd.uniform(-SPAN_X, SPAN_X) / GRID) * GRID
    z = round(rnd.uniform(0, TILE_Z) / GRID) * GRID
    if abs(x) < 130:
        continue
    CHIPS.append((x, z, rnd.choice([1, 1, 2]) * GRID * 0.8, rnd.choice([1, 2]) * GRID * 0.8, rnd.uniform(20, 90), rnd.random() < 0.3))


def scene_agents(ctx, t):
    bg(ctx, (0.012, 0.03, 0.075), (0.008, 0.02, 0.05))
    travel = t * TILE_Z
    cam = Cam(yaw=0.04 * osc(t), pitch=-0.16, dist=0, fov=820, cy=H * 0.5, height=240)
    HZ = H * 0.5 - 820 * math.tan(0.16)  # horizon line

    def P(x, y, z):
        return cam.p(x, y, z - travel + 60)

    # horizon glow + AI core at the vanishing point
    soft(ctx, W / 2, HZ - 10, 620, BLUE, 0.35)
    soft(ctx, W / 2, HZ - 10, 240, TEAL, 0.35 + 0.08 * osc(t, 4))
    for k in range(3):
        f = (t * 3 + k / 3) % 1
        ctx.set_source_rgba(*TEAL, 0.5 * (1 - f))
        ctx.set_line_width(2)
        ctx.save()
        ctx.translate(W / 2, HZ - 10)
        ctx.scale(1, 0.32)
        ctx.arc(0, 0, 40 + f * 420, 0, TAU)
        ctx.restore()
        ctx.stroke()
    dot(ctx, W / 2, HZ - 10, 9, WHITE, 1, 6)

    for rep in (0, 1, 2):
        zoff = rep * TILE_Z
        for pts, speed, ph, hot in TRACES:
            proj = [P(x, 0, z + zoff) for x, z in pts]
            for i in range(len(proj) - 1):
                a, b = proj[i], proj[i + 1]
                if not a or not b:
                    continue
                fog = max(0.0, 1 - (a[2] / 3000))
                seg(ctx, a, b, AMBER if hot else TEAL, 0.38 * fog, 1.3)
            # pulse travelling along the trace
            lens = [math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
            total = sum(lens)
            d = ((t * speed + ph) % 1) * total
            for i, L in enumerate(lens):
                if d <= L:
                    f = d / L
                    x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f
                    z = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f
                    q = P(x, 0, z + zoff)
                    if q:
                        fog = max(0.0, 1 - q[2] / 3600)
                        dot(ctx, q[0], q[1], 2.6 * q[3] * 1.6 + 1, WHITE if not hot else AMBER, fog, 4)
                    break
                d -= L
        # chips (painter's order: far first)
        for x, z, w, d_, h, led in sorted(CHIPS, key=lambda c: -(c[1] + zoff)):
            corners = [(x, z), (x + w, z), (x + w, z + d_), (x, z + d_)]
            top = [P(cx, h, cz + zoff) for cx, cz in corners]
            base = [P(cx, 0, cz + zoff) for cx, cz in corners]
            if not all(top) or not all(base):
                continue
            fog = max(0.0, 1 - top[0][2] / 3600)
            if fog <= 0:
                continue
            # front face
            ctx.set_source_rgba(0.02, 0.06, 0.12, 0.92 * fog)
            ctx.move_to(*base[0][:2]); ctx.line_to(*base[1][:2]); ctx.line_to(*top[1][:2]); ctx.line_to(*top[0][:2]); ctx.close_path(); ctx.fill()
            # top face
            ctx.set_source_rgba(0.04, 0.12, 0.22, 0.95 * fog)
            ctx.move_to(*top[0][:2])
            for q in top[1:]:
                ctx.line_to(*q[:2])
            ctx.close_path()
            ctx.fill_preserve()
            ctx.set_source_rgba(*TEAL, 0.75 * fog)
            ctx.set_line_width(1.2)
            ctx.stroke()
            seg(ctx, base[0], top[0], TEAL, 0.4 * fog)
            seg(ctx, base[1], top[1], TEAL, 0.4 * fog)
            if led:
                c = P(x + w / 2, h, z + d_ / 2 + zoff)
                if c:
                    dot(ctx, c[0], c[1], 2.5 * c[3] + 1, AMBER, fog * (0.6 + 0.4 * osc(t, 6, x * 0.001)), 5)

    # HUD overlay
    text(ctx, "AGENT MESH // AUTONOMOUS OPS", 48, 58, 13, TEAL, 0.8)
    text(ctx, f"ACTIVE AGENTS {128 + int(6 * osc(t, 2)):03d}   TASKS/S {9.4 + 0.6 * osc(t, 3):.1f}", 48, 80, 12, CYAN, 0.6)
    brackets(ctx, 36, 36, 400, 58, 12, TEAL, 0.7)


# ---------------------------------------------------------------- platform
def gauge(ctx, cx, cy, r, t, value):
    rot = TAU * t / 6
    for i in range(90):
        a = rot + TAU * i / 90
        long = i % 5 == 0
        r1, r2 = r + 18, r + (30 if long else 24)
        seg(ctx, (cx + math.cos(a) * r1, cy + math.sin(a) * r1), (cx + math.cos(a) * r2, cy + math.sin(a) * r2), TEAL, 0.7 if long else 0.3, 1.4)
    ctx.set_line_width(10)
    ctx.set_source_rgba(*TEAL, 0.12)
    ctx.arc(cx, cy, r, 0, TAU)
    ctx.stroke()
    sweep = 0.62 + 0.3 * smooth((osc(t) + 1) / 2)
    ctx.set_source_rgba(*TEAL, 0.95)
    ctx.arc(cx, cy, r, -math.pi / 2, -math.pi / 2 + TAU * sweep)
    ctx.stroke()
    ctx.set_line_width(2)
    ctx.set_source_rgba(*CYAN, 0.55)
    ctx.arc_negative(cx, cy, r - 22, math.pi / 2 + TAU * t, math.pi / 2 + TAU * t - 2.2)
    ctx.stroke()
    text(ctx, f"{value * sweep / 0.92:.1f}", cx, cy + 14, 46, WHITE, 0.95, cairo.FONT_WEIGHT_BOLD, "center")
    text(ctx, "WORKFORCE READINESS %", cx, cy + 40, 11, TEAL, 0.8, align="center")


def hexagon(ctx, cx, cy, r, rot):
    ctx.new_path()
    for k in range(6):
        a = rot + TAU * k / 6
        ctx.line_to(cx + math.cos(a) * r, cy + math.sin(a) * r)
    ctx.close_path()


def scene_platform(ctx, t):
    bg(ctx, (0.02, 0.06, 0.11), (0.01, 0.025, 0.06))
    soft(ctx, W * 0.5, H * 0.5, 700, TEAL, 0.12)
    city_bokeh(ctx, t, seed=4, count=30, y0=0.1)
    # floor grid in perspective
    cam = Cam(pitch=0.5, dist=0, fov=700, cy=H * 0.18, height=260)
    off = (t * 2 * 80) % 80
    for i in range(-14, 15):
        a, b = cam.p(i * 80, 0, 200), cam.p(i * 80, 0, 3000)
        if a and b:
            seg(ctx, a, b, TEAL, 0.10)
    for j in range(0, 40):
        z = 200 + j * 80 - off
        a, b = cam.p(-1200, 0, z), cam.p(1200, 0, z)
        if a and b:
            seg(ctx, a, b, TEAL, 0.10 * max(0, 1 - z / 3000))

    drift_x, drift_y = 10 * osc(t), 6 * osc(t, 1, 0.25)
    # --- left panel: gauge (slight perspective via shear)
    ctx.save()
    ctx.translate(250 + drift_x, 330 + drift_y)
    ctx.transform(cairo.Matrix(1, -0.06, 0.0, 1, 0, 0))
    panel(ctx, -170, -190, 340, 380)
    text(ctx, "INHRSIGHT // LIVE", -150, -160, 12, TEAL, 0.85)
    gauge(ctx, 0, 0, 105, t, 98.4)
    for i in range(4):
        w = 60 + 70 * (0.5 + 0.5 * osc(t, 1, i * 0.2))
        ctx.set_source_rgba(*(AMBER if i == 2 else TEAL), 0.75)
        ctx.rectangle(-150, 150 + i * 9, w, 4)
        ctx.fill()
    ctx.restore()

    # --- centre: hex emblem (film signature)
    cx, cy = 640 + drift_x * 0.5, 300 + drift_y
    soft(ctx, cx, cy, 190, TEAL, 0.28)
    for k, (r, sp, a) in enumerate(((120, 1, 0.9), (98, -2, 0.6), (72, 1, 0.8), (40, -1, 0.9))):
        hexagon(ctx, cx, cy, r, TAU * t * sp / 6 + k * 0.2)
        ctx.set_source_rgba(*TEAL, a)
        ctx.set_line_width(2 if k % 2 == 0 else 1)
        ctx.stroke()
    for k in range(6):
        a = TAU * t + TAU * k / 6
        x, y = cx + math.cos(a) * 120, cy + math.sin(a) * 120
        dot(ctx, x, y, 3.5, AMBER if k == 0 else WHITE, 1, 4)
        seg(ctx, (cx, cy), (x, y), TEAL, 0.25)
    dot(ctx, cx, cy, 8, WHITE, 1, 6)
    text(ctx, "SKILLS GRAPH", cx, cy + 165, 13, TEAL, 0.9, align="center")
    text(ctx, f"NODES 30,{502 + int(20 * osc(t)):03d}", cx, cy + 184, 11, CYAN, 0.6, align="center")

    # --- right panel: chart (opposite shear)
    ctx.save()
    ctx.translate(1010 - drift_x, 300 - drift_y)
    ctx.transform(cairo.Matrix(1, 0.06, 0.0, 1, 0, 0))
    panel(ctx, -175, -150, 350, 300)
    text(ctx, "ATTRITION RISK // 12 MO", -155, -122, 12, TEAL, 0.85)
    pts = []
    for i in range(41):
        f = i / 40
        v = 0.5 + 0.25 * math.sin(TAU * (1.5 * f + t)) + 0.12 * math.sin(TAU * (4 * f - 2 * t))
        pts.append((-150 + f * 300, 90 - v * 170))
    ctx.move_to(*pts[0])
    for q in pts[1:]:
        ctx.line_to(*q)
    ctx.set_source_rgba(*TEAL, 0.95)
    ctx.set_line_width(2.4)
    ctx.stroke()
    head = pts[int((t * 40) % 40)]
    dot(ctx, head[0], head[1], 4, WHITE, 1, 5)
    for i in range(14):
        h = 14 + 40 * (0.5 + 0.5 * osc(t, 2, i * 0.11))
        ctx.set_source_rgba(*(AMBER if i in (4, 9) else TEAL), 0.7)
        ctx.rectangle(-150 + i * 21.5, 130 - h, 13, h)
        ctx.fill()
    ctx.restore()

    # sweeping scan line
    sx = (t * 2 % 1) * (W + 200) - 100
    g = cairo.LinearGradient(sx - 140, 0, sx, 0)
    g.add_color_stop_rgba(0, *TEAL, 0)
    g.add_color_stop_rgba(1, *TEAL, 0.10)
    ctx.set_source(g)
    ctx.rectangle(sx - 140, 0, 140, H)
    ctx.fill()
    seg(ctx, (sx, 0), (sx, H), TEAL, 0.35, 1)
    for i in range(30):
        rr = random.Random(i)
        x = rr.uniform(0, W)
        y = (rr.uniform(0, H) - t * H * rr.choice([1, 2])) % H
        dot(ctx, x, y, 1.2, TEAL, 0.5, 3)


# ---------------------------------------------------------------- about
HUBS = [("DUBAI", 25.2, 55.3), ("MUMBAI", 19.1, 72.9), ("JOHANNESBURG", -26.2, 28.0)]
rnd = random.Random(9)
STARS = [(rnd.uniform(0, W), rnd.uniform(0, H), rnd.uniform(0.4, 1.6), rnd.random()) for _ in range(160)]


def sph(lat, lon, rot, tilt, cx, cy, r):
    la, lo = math.radians(lat), math.radians(lon) + rot
    x = math.cos(la) * math.sin(lo)
    y = math.sin(la)
    z = math.cos(la) * math.cos(lo)
    y, z = y * math.cos(tilt) - z * math.sin(tilt), y * math.sin(tilt) + z * math.cos(tilt)
    return cx + x * r, cy - y * r, z


def scene_about(ctx, t):
    bg(ctx, (0.012, 0.03, 0.08), (0.005, 0.012, 0.04))
    for x, y, r, ph in STARS:
        ctx.set_source_rgba(0.7, 0.85, 1, 0.25 + 0.35 * (0.5 + 0.5 * osc(t, 2, ph)))
        ctx.arc(x, y, r, 0, TAU)
        ctx.fill()
    cx, cy, R = W * 0.5, H * 0.53, 255
    rot = -math.radians(48) + math.radians(14) * osc(t)
    tilt = 0.32
    soft(ctx, cx, cy, R * 1.55, BLUE, 0.42)
    soft(ctx, cx, cy, R * 1.12, TEAL, 0.22)
    ctx.set_source_rgba(0.02, 0.06, 0.14, 1)
    ctx.arc(cx, cy, R, 0, TAU)
    ctx.fill()
    # wireframe
    for lat in range(-60, 90, 30):
        ctx.new_path()
        prev = None
        for lon in range(0, 362, 6):
            x, y, z = sph(lat, lon, rot, tilt, cx, cy, R)
            if z > 0 and prev:
                seg(ctx, prev, (x, y), TEAL, 0.10 + 0.18 * z, 1)
            prev = (x, y) if z > 0 else None
    for lon in range(0, 360, 30):
        prev = None
        for lat in range(-90, 92, 6):
            x, y, z = sph(lat, lon, rot, tilt, cx, cy, R)
            if z > 0 and prev:
                seg(ctx, prev, (x, y), TEAL, 0.08 + 0.15 * z, 1)
            prev = (x, y) if z > 0 else None
    # dot field
    for lat in range(-78, 84, 6):
        n = max(6, int(60 * math.cos(math.radians(lat))))
        for k in range(n):
            x, y, z = sph(lat, k * 360 / n, rot, tilt, cx, cy, R)
            if z > 0.05:
                ctx.set_source_rgba(*CYAN, 0.10 + 0.45 * z)
                ctx.arc(x, y, 0.9 + 1.1 * z, 0, TAU)
                ctx.fill()
    # rim light
    ctx.set_source_rgba(*TEAL, 0.55)
    ctx.set_line_width(2)
    ctx.arc(cx, cy, R, 0, TAU)
    ctx.stroke()
    # HUD orbit rings (tilted ellipses)
    for k, (rx, ry, ang, sp) in enumerate(((R * 1.42, R * 0.36, -0.25, 1), (R * 1.25, R * 0.52, 0.35, -1))):
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(ang)
        ctx.scale(1, ry / rx)
        ctx.arc(0, 0, rx, 0, TAU)
        ctx.restore()
        ctx.set_source_rgba(*TEAL, 0.35)
        ctx.set_line_width(1.2)
        ctx.stroke()
        for i in range(48):
            a = TAU * i / 48 + TAU * t * sp / 8
            px, py = math.cos(a) * rx, math.sin(a) * ry
            qx = cx + px * math.cos(ang) - py * math.sin(ang)
            qy = cy + px * math.sin(ang) + py * math.cos(ang)
            ctx.set_source_rgba(*TEAL, 0.32 if i % 4 == 0 else 0.12)
            ctx.arc(qx, qy, 1.4 if i % 4 == 0 else 0.9, 0, TAU)
            ctx.fill()
        a = TAU * (t * sp + k * 0.4)
        px, py = math.cos(a) * rx, math.sin(a) * ry
        dot(ctx, cx + px * math.cos(ang) - py * math.sin(ang), cy + px * math.sin(ang) + py * math.cos(ang), 4, AMBER if k else WHITE, 1, 5)
    # hubs, arcs, comets
    pts = {n: sph(la, lo, rot, tilt, cx, cy, R) for n, la, lo in HUBS}
    pairs = [("DUBAI", "MUMBAI"), ("DUBAI", "JOHANNESBURG"), ("MUMBAI", "JOHANNESBURG")]
    for i, (a, b) in enumerate(pairs):
        (x1, y1, z1), (x2, y2, z2) = pts[a], pts[b]
        if z1 < 0 or z2 < 0:
            continue
        mx, my = (x1 + x2) / 2 + (cx - (x1 + x2) / 2) * -0.35, (y1 + y2) / 2 - 110
        ctx.set_source_rgba(*AMBER, 0.6)
        ctx.set_line_width(1.8)
        ctx.move_to(x1, y1)
        ctx.curve_to(mx, my, mx, my, x2, y2)
        ctx.stroke()
        for trail in range(10):
            f = ((t * 2 + i / 3) - trail * 0.012) % 1
            u = 1 - f
            x = u ** 3 * x1 + 3 * u * u * f * mx + 3 * u * f * f * mx + f ** 3 * x2
            y = u ** 3 * y1 + 3 * u * u * f * my + 3 * u * f * f * my + f ** 3 * y2
            dot(ctx, x, y, 3 - trail * 0.25, WHITE if trail == 0 else AMBER, 1 - trail * 0.09, 3)
    for n, (x, y, z) in pts.items():
        if z < 0:
            continue
        for k in range(2):
            f = (t * 2 + k / 2) % 1
            ctx.set_source_rgba(*AMBER, 0.7 * (1 - f))
            ctx.set_line_width(1.5)
            ctx.arc(x, y, 6 + f * 30, 0, TAU)
            ctx.stroke()
        dot(ctx, x, y, 5, AMBER, 1, 6)
        dx, dy = {"DUBAI": (-170, -60), "MUMBAI": (90, -50), "JOHANNESBURG": (-200, 50)}[n]
        lx, ly = x + dx, y + dy
        ex = lx + (130 if dx > 0 else -10)
        seg(ctx, (x, y), (lx + (0 if dx > 0 else 130), ly), TEAL, 0.7)
        seg(ctx, (lx, ly), (lx + 130, ly), TEAL, 0.7)
        text(ctx, n, lx + 2, ly - 7, 12, WHITE, 0.95, cairo.FONT_WEIGHT_BOLD)
    text(ctx, "GLOBAL DELIVERY NETWORK", 48, 58, 13, TEAL, 0.85)
    text(ctx, "UAE  ·  INDIA  ·  SOUTH AFRICA", 48, 80, 12, CYAN, 0.6)
    brackets(ctx, 36, 36, 330, 58, 12, TEAL, 0.7)


# ---------------------------------------------------------------- consulting
rnd = random.Random(31)
NODES = []
LEVELS = [1, 4, 12, 30]
parents_prev = []
for li, n in enumerate(LEVELS):
    cur = []
    for k in range(n):
        ang = TAU * k / n + li * 0.3
        rad = [0, 230, 430, 620][li]
        tx, ty, tz = math.cos(ang) * rad, 260 - li * 170, math.sin(ang) * rad
        u, v = rnd.uniform(-1, 1), rnd.uniform(0, TAU)
        rr = 520 * rnd.uniform(0.35, 1) ** 0.5
        nx, ny, nz = math.sqrt(1 - u * u) * math.cos(v) * rr * 1.25, u * rr * 0.55, math.sqrt(1 - u * u) * math.sin(v) * rr
        parent = parents_prev[k * len(parents_prev) // n] if parents_prev else -1
        NODES.append(((tx, ty, tz), (nx, ny, nz), parent, li))
        cur.append(len(NODES) - 1)
    parents_prev = cur
NET = []
for i, (_, a, _, _) in enumerate(NODES):
    near = sorted(range(len(NODES)), key=lambda j: math.dist(a, NODES[j][1]))[1:4]
    NET += [(i, j) for j in near if (j, i) not in NET]
CALLOUTS = [(3, "ROLE ARCHITECTURE", "SPAN 1:8  LAYERS 4"), (9, "SKILLS MATCH", "92%  +18 VS BASELINE"), (25, "TALENT POD", "7 ROLES  3 GIGS")]


def scene_consulting(ctx, t):
    bg(ctx, (0.015, 0.035, 0.085), (0.01, 0.02, 0.05))
    city_bokeh(ctx, t, seed=7, count=55, y0=0.45)
    soft(ctx, W * 0.5, H * 0.45, 600, BLUE, 0.25)
    m = smooth((1 - math.cos(TAU * t)) / 2)
    cam = Cam(yaw=0.55 * osc(t) + 0.3, pitch=0.28, dist=1500, fov=1050, cy=H * 0.47)
    P = []
    for (tp, np_, _, _) in NODES:
        x, y, z = (tp[i] + (np_[i] - tp[i]) * m for i in range(3))
        P.append(cam.p(x, y, z))
    for i, (_, _, par, _) in enumerate(NODES):
        if par >= 0 and P[i] and P[par]:
            seg(ctx, P[i], P[par], TEAL, 0.45 * (1 - m) + 0.04, 1.2)
    for e, (i, j) in enumerate(NET):
        if P[i] and P[j]:
            depth = 1 - min(1, (P[i][2] - 900) / 1300)
            seg(ctx, P[i], P[j], CYAN, (0.10 + 0.32 * depth) * m, 1)
            if e % 4 == 0:
                f = (t * 3 + e * 0.071) % 1
                dot(ctx, P[i][0] + (P[j][0] - P[i][0]) * f, P[i][1] + (P[j][1] - P[i][1]) * f, 2, WHITE, 0.8 * m, 3)
    order = sorted(range(len(NODES)), key=lambda i: -(P[i][2] if P[i] else 0))
    for i in order:
        q = P[i]
        if not q:
            continue
        li = NODES[i][3]
        depth = min(1, max(0, (q[2] - 800) / 1400))
        size = [9, 7, 5, 4][li] * q[3] * 1.4
        col = AMBER if li == 1 else (TEAL if li < 3 else CYAN)
        if depth > 0.62:  # out of focus: bokeh
            bokeh(ctx, q[0], q[1], size * 2.6, col, 0.35)
        else:
            dot(ctx, q[0], q[1], size, col, 1, 4)
    # HUD callouts
    for k, (idx, title, sub) in enumerate(CALLOUTS):
        q = P[idx]
        if not q:
            continue
        vis = smooth(1 - abs(((t * 2 + k / 3) % 1) - 0.5) * 2.6)
        if vis <= 0:
            continue
        lx, ly = q[0] + 60, q[1] - 70
        seg(ctx, q, (lx, ly), TEAL, 0.8 * vis)
        seg(ctx, (lx, ly), (lx + 30, ly), TEAL, 0.8 * vis)
        ctx.set_source_rgba(0.02, 0.10, 0.16, 0.7 * vis)
        ctx.rectangle(lx + 30, ly - 30, 220, 46)
        ctx.fill()
        brackets(ctx, lx + 30, ly - 30, 220, 46, 10, TEAL, vis)
        text(ctx, title, lx + 42, ly - 10, 12, WHITE, vis, cairo.FONT_WEIGHT_BOLD)
        text(ctx, sub, lx + 42, ly + 8, 11, TEAL, 0.85 * vis)
        dot(ctx, q[0], q[1], 4, WHITE, vis, 5)
    text(ctx, "WORK ARCHITECTURE // REDESIGN", 48, 58, 13, TEAL, 0.85)
    text(ctx, "HIERARCHY  >  NETWORK" if m > 0.5 else "NETWORK  <  HIERARCHY", 48, 80, 12, CYAN, 0.6)
    brackets(ctx, 36, 36, 340, 58, 12, TEAL, 0.7)


# ---------------------------------------------------------------- academy
rnd = random.Random(41)
LEARNERS = [(rnd.uniform(0, TAU), rnd.uniform(900, 1700), rnd.random(), rnd.random() < 0.3) for _ in range(46)]
LEVEL_LABELS = ["ASSESS", "LEARN", "PRACTISE", "LAUNCH"]


def scene_academy(ctx, t):
    bg(ctx, (0.015, 0.04, 0.09), (0.008, 0.02, 0.05))
    city_bokeh(ctx, t, seed=11, count=26, y0=0.0)
    cam = Cam(yaw=0.35 * osc(t), pitch=0.36, dist=1500, fov=1000, cy=H * 0.52, height=150)
    for i in range(-12, 13):
        a, b = cam.p(i * 110, 0, -1300), cam.p(i * 110, 0, 1300)
        if a and b:
            seg(ctx, a, b, TEAL, 0.10)
        a, b = cam.p(-1300, 0, i * 110), cam.p(1300, 0, i * 110)
        if a and b:
            seg(ctx, a, b, TEAL, 0.10)

    def ring(r, y, color, alpha, width=1.6, rot=0.0, dash=None):
        prev = None
        for k in range(73):
            a = rot + TAU * k / 72
            q = cam.p(math.cos(a) * r, y, math.sin(a) * r)
            if q and prev and (dash is None or (k // dash) % 2 == 0):
                seg(ctx, prev, q, color, alpha, width)
            prev = q

    # projector base
    for k, r in enumerate((90, 150, 220)):
        ring(r, 0, TEAL, 0.7 - k * 0.15, 2, TAU * t * (1 if k % 2 else -1) / 4, 3 if k == 1 else None)
    base = cam.p(0, 0, 0)
    soft(ctx, base[0], base[1], 260, TEAL, 0.35)
    # light beam
    top = cam.p(0, 640, 0)
    g = cairo.LinearGradient(0, base[1], 0, top[1])
    g.add_color_stop_rgba(0, *TEAL, 0.28)
    g.add_color_stop_rgba(1, *TEAL, 0.0)
    ctx.set_source(g)
    bl, br = cam.p(-95, 0, 0), cam.p(95, 0, 0)
    tl, tr = cam.p(-200, 640, 0), cam.p(200, 640, 0)
    ctx.move_to(*bl[:2]); ctx.line_to(*br[:2]); ctx.line_to(*tr[:2]); ctx.line_to(*tl[:2]); ctx.close_path(); ctx.fill()
    # level rings + labels
    for k, lab in enumerate(LEVEL_LABELS):
        y = 140 + k * 135
        r = 110 + k * 22
        ring(r, y, CYAN if k < 3 else AMBER, 0.55, 1.4, TAU * t * (1 if k % 2 else -1) / 3, 2)
        q = cam.p(r, y, 0)
        if q:
            seg(ctx, q, (q[0] + 70, q[1]), TEAL, 0.7)
            text(ctx, f"0{k + 1} {lab}", q[0] + 76, q[1] + 4, 12, WHITE if k < 3 else AMBER, 0.9, cairo.FONT_WEIGHT_BOLD)
    # learners: walk in along the floor, then rise through the beam
    for ang, dist, ph, amber in LEARNERS:
        f = (t + ph) % 1
        col = AMBER if amber else CYAN
        if f < 0.6:
            g_ = smooth(f / 0.6)
            r = dist * (1 - g_) + 40 * g_
            a = ang + 0.6 * g_
            q = cam.p(math.cos(a) * r, 0, math.sin(a) * r)
            if q:
                dot(ctx, q[0], q[1], 1.6 + q[3] * 1.4, col, 0.9, 4)
        else:
            g_ = (f - 0.6) / 0.4
            a = ang + TAU * g_
            q = cam.p(math.cos(a) * 60, g_ * 620, math.sin(a) * 60)
            if q:
                dot(ctx, q[0], q[1], 2.2, col, 1 - g_ * 0.6, 4)
    text(ctx, "BLUENXT ACADEMY // LEARNER JOURNEY", 48, 58, 13, TEAL, 0.85)
    text(ctx, f"ACTIVE LEARNERS {10452 + int(40 * osc(t)):,}", 48, 80, 12, CYAN, 0.6)
    brackets(ctx, 36, 36, 420, 58, 12, TEAL, 0.7)


# ---------------------------------------------------------------- domain
HEX_R = 52
HEXES = []
for q in range(-9, 10):
    for r in range(-9, 10):
        x = HEX_R * 1.5 * q
        z = HEX_R * math.sqrt(3) * (r + q / 2)
        if math.hypot(x, z) < 700:
            HEXES.append((x, z))
SOURCES = [(-300, -200, 0.0), (350, 150, 0.33), (0, 500, 0.66)]
TAGS = [(5, "DATA LITERACY", "+18%"), (40, "PEOPLE ANALYTICS", "+24%"), (80, "CHANGE LEADERSHIP", "+11%")]


def scene_domain(ctx, t):
    bg(ctx, (0.015, 0.035, 0.085), (0.008, 0.02, 0.05))
    city_bokeh(ctx, t, seed=13, count=24, y0=0.0)
    cam = Cam(yaw=0.35 * osc(t) + 0.5, pitch=-0.62, dist=1750, fov=1050, cy=H * 0.52)
    heights = []
    for x, z in HEXES:
        h = 0.0
        for sx, sz, ph in SOURCES:
            d = math.hypot(x - sx, z - sz)
            w = ((t + ph) % 1) * 1300
            h += math.exp(-((d - w) ** 2) / (2 * 110 ** 2)) * max(0, 1 - w / 1300) * smooth(w / 260)
        heights.append(min(1.0, h))
    order = sorted(range(len(HEXES)), key=lambda i: -(cam.p(HEXES[i][0], 0, HEXES[i][1]) or (0, 0, 0))[2])
    tag_pos = {}
    for i in order:
        x, z = HEXES[i]
        h = 8 + heights[i] * 170
        topq = [cam.p(x + math.cos(TAU * k / 6) * (HEX_R - 5), h, z + math.sin(TAU * k / 6) * (HEX_R - 5)) for k in range(6)]
        botq = [cam.p(x + math.cos(TAU * k / 6) * (HEX_R - 5), 0, z + math.sin(TAU * k / 6) * (HEX_R - 5)) for k in range(6)]
        if not all(topq) or not all(botq):
            continue
        for k in range(6):
            a, b = topq[k], topq[(k + 1) % 6]
            c, d = botq[(k + 1) % 6], botq[k]
            ctx.move_to(*a[:2]); ctx.line_to(*b[:2]); ctx.line_to(*c[:2]); ctx.line_to(*d[:2]); ctx.close_path()
            ctx.set_source_rgba(0.02 + 0.05 * heights[i], 0.07 + 0.14 * heights[i], 0.14 + 0.18 * heights[i], 0.95)
            ctx.fill()
        ctx.move_to(*topq[0][:2])
        for q in topq[1:]:
            ctx.line_to(*q[:2])
        ctx.close_path()
        hi = heights[i]
        ctx.set_source_rgba(0.04 + 0.1 * hi, 0.12 + 0.5 * hi, 0.2 + 0.45 * hi, 0.95)
        ctx.fill_preserve()
        ctx.set_source_rgba(*(AMBER if hi > 0.85 else TEAL), 0.35 + 0.6 * hi)
        ctx.set_line_width(1.2)
        ctx.stroke()
        tag_pos[i] = cam.p(x, h, z)
    for idx, name, val in TAGS:
        q = tag_pos.get(idx)
        if not q:
            continue
        vis = smooth(heights[idx] * 2.2 - 0.3)
        if vis <= 0:
            continue
        lx, ly = q[0] + 40, q[1] - 60
        seg(ctx, q, (lx, ly), TEAL, 0.8 * vis)
        ctx.set_source_rgba(0.02, 0.10, 0.16, 0.75 * vis)
        ctx.rectangle(lx, ly - 30, 200, 44)
        ctx.fill()
        brackets(ctx, lx, ly - 30, 200, 44, 10, TEAL, vis)
        text(ctx, name, lx + 12, ly - 10, 12, WHITE, vis, cairo.FONT_WEIGHT_BOLD)
        text(ctx, f"CAPABILITY {val}", lx + 12, ly + 7, 11, AMBER, vis)
    text(ctx, "CAPABILITY MAP // LIVE", 48, 58, 13, TEAL, 0.85)
    text(ctx, "SKILLS-BASED WORKFORCE DESIGN", 48, 80, 12, CYAN, 0.6)
    brackets(ctx, 36, 36, 330, 58, 12, TEAL, 0.7)


SCENES = {
    "agents": scene_agents,
    "platform": scene_platform,
    "about": scene_about,
    "consulting": scene_consulting,
    "academy": scene_academy,
    "domain": scene_domain,
}


def render(name, out, preview_frames=(), frames=FRAMES):
    surface = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
    ctx = cairo.Context(surface)
    ff = subprocess.Popen(
        ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
         "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "26",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
        stdin=subprocess.PIPE,
    )
    for f in range(frames):
        ctx.save()
        SCENES[name](ctx, f / FRAMES)
        ctx.restore()
        surface.flush()
        data = post(surface, f)
        if f in preview_frames:
            Image.frombytes("RGB", (W, H), data).save(f"/tmp/v2_{name}_{f}.png")
        ff.stdin.write(data)
    ff.stdin.close()
    ff.wait()


if __name__ == "__main__":
    mode = sys.argv[1]
    names = sys.argv[2:] or list(SCENES)
    for n in names:
        if mode == "preview":
            # render just two still frames quickly
            surface = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
            ctx = cairo.Context(surface)
            for f in (0, FRAMES // 3):
                ctx.save(); SCENES[n](ctx, f / FRAMES); ctx.restore(); surface.flush()
                Image.frombytes("RGB", (W, H), post(surface, f)).save(f"/tmp/v2_{n}_{f}.png")
        else:
            render(n, f"public/media/{n}.mp4", preview_frames=(FRAMES // 3,))
        print("done", n, flush=True)
