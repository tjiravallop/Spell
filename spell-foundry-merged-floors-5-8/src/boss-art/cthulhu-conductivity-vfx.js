/**
 * Spell Foundry / F80 — hand-authored surface conductivity pixel patterns.
 * Reference: approved Cthulhu idle preview, logical bounds x122..309, y26..145.
 * Adapted for production Boss V2 renderer; progress is normalized 0..1.
 */
export const REFERENCE_SIZE = Object.freeze({ width: 188, height: 120 });
export const PALETTE = Object.freeze({ rim: '#2386be', arc: '#57dfff', core: '#e8ffff' });

// Each row is one short, deliberately drawn surface path + a tiny branch.
// Coordinates are on the reference sprite, not global arena coordinates.
export const SURFACE_ARCS = Object.freeze([
  { name: 'ward-ridge', start: 0.00, end: 0.34, path: [[48, 19], [51, 22], [50, 25], [54, 26], [53, 30]], branch: [[50, 25], [47, 27], [46, 29]] },
  { name: 'brow-ridge', start: 0.07, end: 0.39, path: [[86, 19], [83, 22], [85, 25], [82, 28], [83, 31]], branch: [[85, 25], [88, 26], [90, 25]] },
  { name: 'left-wing-rib', start: 0.17, end: 0.48, path: [[31, 18], [28, 21], [24, 22], [23, 25], [19, 28]], branch: [[24, 22], [25, 26], [22, 29]] },
  { name: 'right-wing-rib', start: 0.24, end: 0.55, path: [[149, 13], [153, 16], [157, 17], [159, 20], [163, 22]], branch: [[157, 17], [156, 21], [158, 24]] },
  { name: 'ink-ridge', start: 0.35, end: 0.66, path: [[135, 34], [138, 35], [140, 32], [143, 34], [146, 35]], branch: [[140, 32], [141, 30], [144, 31]] },
  { name: 'near-forearm', start: 0.43, end: 0.76, path: [[117, 60], [114, 63], [116, 67], [113, 70], [114, 74]], branch: [[116, 67], [119, 68], [120, 65]] },
  { name: 'crush-shell', start: 0.51, end: 0.84, path: [[145, 65], [149, 68], [152, 66], [154, 70], [151, 73]], branch: [[154, 70], [158, 71], [159, 74]] },
  { name: 'near-shin', start: 0.64, end: 0.93, path: [[64, 93], [61, 96], [62, 99], [58, 102], [57, 106]], branch: [[62, 99], [65, 100], [65, 103]] },
]);

function rasterPath(points) {
  const out = [];
  for (let i = 1; i < points.length; i++) {
    let [x, y] = points[i - 1]; const [x1, y1] = points[i];
    const dx = Math.abs(x1 - x), dy = -Math.abs(y1 - y);
    const sx = x < x1 ? 1 : -1, sy = y < y1 ? 1 : -1;
    let e = dx + dy;
    while (true) {
      if (!out.length || out.at(-1)[0] !== x || out.at(-1)[1] !== y) out.push([x, y]);
      if (x === x1 && y === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) { e += dy; x += sx; }
      if (e2 <= dx) { e += dx; y += sy; }
    }
  }
  return out;
}
const PATHS = SURFACE_ARCS.map(a => ({ ...a, pixels: rasterPath(a.path), branchPixels: rasterPath(a.branch) }));

/**
 * bounds: current rendered full sprite rectangle in LOGICAL canvas coordinates.
 * isOpaque(x,y): test current sprite assembly alpha, not the composited arena.
 * Returns integer pixels with fixed RGB colors, no line/stroke primitives.
 */
export function conductivityPixels(progress, bounds, { isOpaque, reducedMotion = false } = {}) {
  if (!Number.isFinite(progress) || progress < 0 || progress >= 1) return [];
  if (!bounds || ![bounds.x, bounds.y, bounds.width, bounds.height].every(Number.isFinite) || bounds.width <= 0 || bounds.height <= 0) return [];
  if (typeof isOpaque !== 'function') return []; // fail closed: no off-body arcs
  const pixels = new Map();
  const rank = { rim: 0, arc: 1, core: 2 };
  function put(rx, ry, tone) {
    const x = Math.round(bounds.x + rx * bounds.width / REFERENCE_SIZE.width);
    const y = Math.round(bounds.y + ry * bounds.height / REFERENCE_SIZE.height);
    if (x < bounds.x || x >= bounds.x + bounds.width || y < bounds.y || y >= bounds.y + bounds.height || !isOpaque(x, y)) return;
    const key = `${x},${y}`;
    if (!pixels.has(key) || rank[tone] > rank[pixels.get(key).tone]) pixels.set(key, { x, y, tone, color: PALETTE[tone] });
  }
  if (reducedMotion) {
    // One short, non-repeating accent instead of travelling arcs.
    if (progress >= 0.45) return [];
    for (const a of [PATHS[1], PATHS[5]]) for (const [x, y] of a.pixels.slice(2, 7)) put(x, y, 'arc');
    return [...pixels.values()];
  }
  for (const a of PATHS) {
    if (progress < a.start || progress >= a.end) continue;
    const t = (progress - a.start) / (a.end - a.start);
    const n = a.pixels.length;
    // A small travelling packet, not a bolt linking remote regions.
    const lead = Math.floor(t * (n + 5));
    for (let i = Math.max(0, lead - 7); i < Math.min(n, lead + 1); i++) {
      const [x, y] = a.pixels[i]; const lag = lead - i;
      put(x, y, lag <= 2 ? 'core' : lag <= 5 ? 'arc' : 'rim');
      if (lag === 2 || lag === 4) put(x + 1, y, 'rim');
    }
    if (t >= 0.35 && t < 0.72) {
      const m = Math.min(a.branchPixels.length, Math.ceil((t - 0.35) * 18));
      for (const [x, y] of a.branchPixels.slice(0, m)) put(x, y, 'arc');
    }
  }
  return [...pixels.values()];
}

/** Draw after Cthulhu's sprite, before HUD, on the logical pixel canvas. */
export function drawCthulhuConductivity(ctx, progress, bounds, options) {
  const pixels = conductivityPixels(progress, bounds, options);
  ctx.save();
  for (const p of pixels) { ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 1, 1); }
  ctx.restore();
  return pixels.length;
}
