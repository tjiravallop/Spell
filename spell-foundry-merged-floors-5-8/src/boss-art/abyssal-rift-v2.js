/** Spell Foundry F80: authored dimensional rift / awakening. Visual only.
 * Render in logical 320x180 coordinates. No time sources, RNG, DOM, or combat writes.
 * Draw portal BEHIND the boss. The caller draws the real actor once using revealState().
 */
export const PALETTE = Object.freeze({
  void: '#080b1c',
  abyss: '#10132e',
  deep: '#1e1941',
  plum: '#382457',
  violet: '#65408d',
  lilac: '#a16ac8',
  blue: '#24446d',
  teal: '#286f91',
  cyan: '#4cb7cb',
  pale: '#a5edee',
  white: '#e0ffff',
});

const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => { const c = clamp(x); return c * c * (3 - 2 * c); };
const frames = new Map();

function hash(x, y) {
  let n = Math.imul(x + 313, 374761393) ^ Math.imul(y + 719, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return (n ^ (n >>> 16)) >>> 0;
}

// Hand-selected uneven radial silhouette, with distinct torn shoulders and narrow tips.
const PROFILE = [1.00, 0.98, 1.04, 0.91, 1.08, 0.97, 1.02, 0.94, 1.07, 0.98, 0.90, 1.04, 1.01, 0.93, 1.08, 0.98, 1.04, 0.92, 0.99, 1.06, 0.95, 1.01, 0.91, 1.05];

function edge(a) {
  const t = ((a / TAU + 1) % 1) * PROFILE.length;
  const i = Math.floor(t);
  const f = t - i;
  return PROFILE[i] * (1 - f) + PROFILE[(i + 1) % PROFILE.length] * f;
}

// The 24 phase-indexed source frames are cached. Actual draw is clipped to the arena.
function build(kind, frame) {
  const key = `${kind}:${frame}`;
  if (frames.has(key)) return frames.get(key);
  const floor = kind === 'floor';
  const rx = floor ? 19 : 83;
  const ry = floor ? 6 : 67;
  const pad = floor ? 3 : 7;
  const phase = (frame / 24) * TAU;
  const out = [];
  for (let y = -ry - pad; y <= ry + pad; y++) {
    for (let x = -rx - pad; x <= rx + pad; x++) {
      const u = x / rx;
      const v = y / ry;
      const a = Math.atan2(v, u);
      const r = Math.hypot(u, v);
      const e = edge(a) + 0.018 * Math.sin(a * 5 + phase);
      const d = (r - e) * Math.min(rx, ry);
      const h = hash(x, y) % 100;
      let c = null;
      if (r < e) {
        const twist = a * 3.0 - r * 13 + phase;
        const spiral = Math.sin(twist) + 0.34 * Math.sin(a * 7 + r * 5 - phase);
        c = r < 0.42 ? 'void' : r < 0.70 ? 'abyss' : 'deep';
        if (!floor && r > 0.28 && r < 0.92 && spiral > 0.74) c = spiral > 1.10 ? 'plum' : 'deep';
        if (!floor && r > 0.53 && r < 0.91 && spiral > 1.18 && Math.sin(a * 5 - phase + r * 4) > 0.25) c = 'blue';
        const seg = Math.sin(a * 9 - phase * 2) + 0.55 * Math.sin(a * 17 + phase);
        if (d > -(floor ? 3 : 12)) c = seg > 0.20 ? 'blue' : 'plum';
        if (d > -(floor ? 2 : 8)) c = seg > 0.05 ? 'teal' : 'violet';
        if (d > -(floor ? 1 : 4)) c = seg > -0.30 ? 'cyan' : 'lilac';
        if (d > -(floor ? 0.55 : 1.6)) c = seg > 0.55 ? 'pale' : seg < -0.7 ? 'violet' : 'lilac';
        if (d > -(floor ? 2 : 5) && d < 0 && Math.sin(a * 15 + phase * 2) > 0.86 && h < 65) c = 'pale';
        if (d > -(floor ? 1 : 3) && Math.sin(a * 15 + phase * 2) > 0.96 && h < 25) c = 'white';
      } else if (!floor && d < 3.6 && Math.sin(a * 19 + phase * 2) > 0.67 && h < 72) {
        c = d < 1.7 ? 'violet' : 'plum';
      }
      if (c) out.push({ x, y, color: PALETTE[c] });
    }
  }
  if (!floor) {
    for (let j = 0; j < 15; j++) {
      const a = (j * TAU) / 15 + phase * 0.35;
      const rr = edge(a) + 0.035 + 0.035 * (1 + Math.sin(j * 2.1 + phase));
      const x = Math.round(rx * rr * Math.cos(a));
      const y = Math.round(ry * rr * Math.sin(a));
      out.push({ x, y, color: PALETTE[j % 3 === 0 ? 'pale' : 'violet'] });
      if (j % 3 === 0) out.push({ x: x + 1, y: y + 1, color: PALETTE.teal });
    }
  }
  frames.set(key, out);
  return out;
}

export function awakeningState(progress, { reducedMotion = false } = {}) {
  const p = Number.isFinite(progress) ? clamp(progress) : 1;
  if (p >= 1) return { portalScale: 0, reveal: 1, silhouette: false, groundPulse: 0, done: true };
  if (reducedMotion) {
    return {
      portalScale: p < 0.10 ? 0 : 0.78 * (1 - ease((p - 0.60) / 0.27)),
      reveal: p < 0.32 ? 0 : 1,
      silhouette: false,
      groundPulse: 0,
      done: false,
    };
  }
  const portalScale = ease(p / 0.24) * (1 - ease((p - 0.72) / 0.28));
  return {
    portalScale,
    reveal: ease((p - 0.34) / 0.36),
    silhouette: p >= 0.25 && p < 0.70,
    groundPulse: Math.max(0, Math.sin(Math.PI * clamp((p - 0.67) / 0.19))),
    done: false,
  };
}

/** progress is 0..1 for awakening; floor rifts use explicit phase/time from caller.
 * Floor lifecycle: openness=1 for living actor, animate to 0 on collapse or hide immediately on death.
 * Returned pixels are integer coordinates and unique; no drawing outside arena.
 */
export function riftPixels({ kind = 'awakening', progress = 0, phase = 0, openness = 1, x = 216, groundY = 146, reducedMotion = false, width = 320, height = 180 } = {}) {
  if (kind !== 'awakening' && kind !== 'floor') throw new RangeError('Unknown rift kind');
  if (![progress, phase, openness, x, groundY, width, height].every(Number.isFinite)) return [];
  const floor = kind === 'floor';
  const st = awakeningState(progress, { reducedMotion });
  const s = floor ? clamp(openness) : st.portalScale;
  if (s < 0.015) return [];
  const frame = reducedMotion ? 0 : ((Math.floor((floor ? phase : progress * 2.0) * 24) % 24) + 24) % 24;
  const src = build(kind, frame);
  const cy = floor ? groundY - 2 : groundY - 70 * s;
  const out = new Map();
  for (const q of src) {
    const px = Math.round(x + q.x * s);
    const py = Math.round(cy + q.y * s);
    if (px >= 0 && px < width && py >= 0 && py < height && py <= groundY + (floor ? 5 : 0)) {
      out.set(py * width + px, { x: px, y: py, color: q.color });
    }
  }
  return [...out.values()];
}

/** Coalesce equal-color horizontal runs for Canvas performance. */
export function drawAbyssalRift(ctx, options = {}) {
  const px = riftPixels(options).sort((a, b) => a.y - b.y || a.x - b.x);
  ctx.save();
  try {
    for (let i = 0; i < px.length;) {
      const p = px[i];
      let j = i + 1;
      while (j < px.length && px[j].y === p.y && px[j].color === p.color && px[j].x === px[j - 1].x + 1) j++;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, j - i, 1);
      i = j;
    }
  } finally {
    ctx.restore();
  }
  return px.length;
}

/** Reveal from head to feet, using the real boss assembly. Caller clips existing drawBossArt.
 * Use silhouette via source-in offscreen mask, never a second independently drawn boss.
 * At progress>=1 return to normal unmasked rendering. No state mutations.
 */
export function revealState(progress, bounds, options = {}) {
  const s = awakeningState(progress, options);
  const { x, y, w, h } = bounds;
  return { ...s, clip: { x, y, w, h: Math.max(0, Math.min(h, Math.round(h * s.reveal))) } };
}

/** Optional front-layer arrival pulse; use after the boss draw. */
export function drawAbyssalArrivalPulse(ctx, progress, { x = 216, groundY = 146, reducedMotion = false, width = 320, height = 180 } = {}) {
  const v = awakeningState(progress, { reducedMotion }).groundPulse;
  if (v <= 0.05) return 0;
  const r = Math.floor(17 + 50 * v);
  const cy = Math.round(groundY) + 1;
  if (cy < 0 || cy >= height) return 0;
  let n = 0;
  ctx.save();
  try {
    ctx.fillStyle = PALETTE.cyan;
    for (const [a, b] of [[Math.round(x) - r, Math.round(x) - 5], [Math.round(x) + 5, Math.round(x) + r]]) {
      const l = Math.max(0, a);
      const h = Math.min(width - 1, b);
      if (h >= l) {
        ctx.fillRect(l, cy, h - l + 1, 1);
        n += h - l + 1;
      }
    }
  } finally {
    ctx.restore();
  }
  return n;
}
