/** F80 Tsunami V3: four overlapping breakers. Presentation only.
 * 320x180 logical pixels. Caller controls actual hit marker.
 */
export const PALETTE = Object.freeze({
  ink: '#102e44',
  deep: '#17475e',
  mid: '#206d83',
  water: '#258fa5',
  light: '#4ab8cb',
  rim: '#8ae1e6',
  foam: '#d4f6f6',
  white: '#f4ffff',
});

// Each breaker is a broad, solid wedge of water with a short spilling lip.
// Coordinates 0..100, floor at 100. Not a thin hollow curl.
export const WAVE_LAYERS = [
  ['ink', [[0, 100], [3, 91], [9, 80], [18, 67], [23, 53], [21, 42], [14, 38], [5, 43], [1, 51], [2, 39], [7, 27], [15, 15], [25, 6], [34, 2], [45, 3], [57, 10], [67, 22], [76, 39], [83, 58], [91, 78], [100, 93], [100, 100]]],
  ['deep', [[3, 98], [11, 82], [21, 68], [26, 52], [23, 39], [15, 34], [6, 40], [4, 43], [8, 28], [19, 15], [29, 7], [41, 6], [52, 11], [63, 23], [72, 40], [81, 60], [91, 82], [98, 98]]],
  ['mid', [[7, 97], [17, 83], [28, 69], [32, 54], [29, 41], [21, 30], [12, 32], [7, 38], [13, 25], [25, 13], [37, 9], [49, 14], [60, 27], [67, 43], [74, 63], [84, 82], [94, 97]]],
  ['water', [[13, 97], [23, 83], [34, 66], [37, 53], [34, 40], [27, 28], [18, 26], [12, 30], [22, 17], [35, 12], [45, 15], [54, 27], [61, 44], [66, 62], [76, 82], [87, 97]]],
  ['light', [[17, 94], [29, 78], [40, 62], [42, 48], [36, 35], [30, 27], [22, 24], [18, 26], [26, 18], [36, 16], [45, 22], [51, 33], [54, 48], [51, 64], [44, 77], [32, 90]]],
  ['deep', [[42, 96], [56, 80], [64, 59], [67, 46], [74, 65], [81, 82], [92, 96]]],
  ['mid', [[48, 96], [60, 84], [70, 67], [76, 82], [88, 96]]],
  ['rim', [[3, 42], [7, 28], [15, 16], [24, 9], [34, 5], [45, 7], [54, 13], [61, 23], [53, 18], [46, 13], [38, 12], [30, 14], [24, 19], [18, 24], [14, 30], [9, 34], [6, 43]]],
  ['foam', [[1, 41], [4, 35], [5, 29], [11, 24], [11, 20], [17, 16], [20, 11], [26, 10], [30, 5], [36, 6], [40, 3], [46, 7], [50, 8], [54, 13], [57, 14], [61, 22], [53, 18], [49, 17], [44, 12], [38, 14], [34, 12], [28, 15], [24, 15], [20, 22], [15, 23], [13, 29], [9, 31], [8, 38], [4, 39], [2, 48]]],
  ['white', [[4, 35], [6, 28], [11, 24], [12, 20], [17, 17], [21, 12], [26, 11], [30, 8], [34, 9], [31, 12], [26, 14], [22, 14], [19, 20], [15, 21], [12, 27], [9, 29], [8, 34], [5, 39]]],
  ['rim', [[8, 96], [18, 91], [26, 89], [32, 85], [40, 84], [35, 89], [25, 94], [18, 96], [15, 98]]],
  ['foam', [[1, 98], [9, 94], [16, 95], [22, 91], [28, 92], [34, 88], [31, 94], [24, 97], [16, 97], [11, 99]]],
  ['light', [[48, 96], [56, 91], [66, 88], [71, 89], [77, 94], [85, 96], [91, 98], [77, 98], [67, 96], [59, 98]]],
];

// Four offset crests, back to front. They overlap into a continuous surge.
export const BREAKERS = [{ x: 94, w: 66, h: 77 }, { x: 58, w: 83, h: 91 }, { x: 29, w: 82, h: 79 }, { x: 0, w: 72, h: 60 }];
const STREAKS = [[[39, 24], [45, 33], [48, 44], [47, 54], [43, 64]], [[37, 71], [32, 78], [26, 83]], [[61, 67], [57, 78], [51, 85]], [[70, 81], [76, 89], [82, 92]]];

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => x * x * (3 - 2 * x);
const lerp = (a, b, t) => a + (b - a) * t;

function poly(points, put) {
  const lo = Math.min(...points.map(p => p[1]));
  const hi = Math.max(...points.map(p => p[1]));
  for (let y = lo; y < hi; y++) {
    const hits = [];
    const s = y + 0.5;
    for (let i = 0; i < points.length; i++) {
      const [a, b] = points[i];
      const [c, d] = points[(i + 1) % points.length];
      if ((b <= s && d > s) || (d <= s && b > s)) hits.push(a + (s - b) * (c - a) / (d - b));
    }
    hits.sort((a, b) => a - b);
    for (let j = 0; j + 1 < hits.length; j += 2) {
      for (let x = Math.ceil(hits[j] - 0.5); x < hits[j + 1] - 0.5; x++) put(x, y);
    }
  }
}

function line(a, b, put) {
  let [x, y] = a;
  const [u, v] = b;
  const dx = Math.abs(u - x);
  const dy = -Math.abs(v - y);
  const sx = x < u ? 1 : -1;
  const sy = y < v ? 1 : -1;
  let e = dx + dy;
  for (;;) {
    put(x, y);
    if (x === u && y === v) break;
    const q = 2 * e;
    if (q >= dy) { e += dy; x += sx; }
    if (q <= dx) { e += dx; y += sy; }
  }
}

export function tsunamiPixels(progress, { sourceX = 150, targetX = 56, groundY = 146, impactProgress = 0.68, reducedMotion = false, width = 320, height = 180 } = {}) {
  if (!Number.isFinite(progress) || progress < 0 || progress >= 1) return [];
  const p = progress;
  const hit = clamp(impactProgress, 0.1, 0.95);
  const pre = p < hit;
  const t = pre ? p / hit : (p - hit) / (1 - hit);
  if (reducedMotion && (p < hit - 0.08 || p > hit + 0.08)) return [];
  const g = pre ? ease(clamp(t / 0.48)) : 1;
  const collapse = pre ? 0 : ease(t);
  let front = pre ? lerp(sourceX, targetX - 8, ease(clamp((t - 0.12) / 0.88))) : lerp(targetX - 8, targetX - 24, collapse);
  let xs = pre ? lerp(0.45, 1, g) : lerp(1, 1.05, collapse);
  let ys = pre ? lerp(0.12, 1, g) : lerp(1, 0, collapse);
  if (reducedMotion) { front = targetX - 8; xs = 0.85; ys = 0.65; }

  const map = new Map();
  const key = (x, y) => y * width + x;
  function valid(x, y) { return x >= 0 && x < width && y >= 0 && y < height && y < groundY; }
  function put(x, y, c) { if (valid(x, y)) map.set(key(x, y), { x, y, color: PALETTE[c] }); }

  if (!reducedMotion && ys < 0.05 && !pre) {
    const life = clamp((1 - t) / 0.18);
    for (let j = 0; j < 19; j++) {
      const x = Math.round(front + j * 7);
      const n = Math.round((4 + j % 5) * life);
      for (let i = 0; i < n; i++) put(x + i, groundY - 1 - j % 2, j % 3 === 0 ? 'foam' : 'rim');
    }
    return [...map.values()];
  }

  // Shared thick water foundation, then four overlapping breakers from back to front.
  const base = [[0, 0], [9, -9], [27, -17], [52, -22], [78, -20], [108, -18], [135, -12], [160, -4], [160, 0]].map(([x, y]) => [Math.round(front + x * xs), Math.round(groundY + y * ys)]);
  poly(base, (x, y) => put(x, y, 'deep'));

  BREAKERS.forEach((b, i) => {
    const phase = p * 12 + i * 1.4;
    const bob = reducedMotion ? 0 : Math.round(Math.sin(phase) * 2);
    const h = Math.max(1, (b.h + bob) * ys);
    const x0 = front + b.x * xs;
    const lean = [-3, 2, -2, 1][i];
    const transform = ([x, y]) => [Math.round(x0 + (x * b.w / 100 + lean * (100 - y) / 100) * xs), Math.round(groundY - (100 - y) * h / 100)];
    const mask = new Set();
    WAVE_LAYERS.forEach(([c, shape], n) => poly(shape.map(transform), (x, y) => {
      if (!valid(x, y)) return;
      const k = key(x, y);
      if (n === 0) mask.add(k);
      if (mask.has(k)) put(x, y, c);
    }));
    STREAKS.forEach((s, j) => {
      const shift = reducedMotion ? 0 : Math.round(Math.sin(phase + j) * 2);
      const a = s.map(([x, y]) => transform([x, y + shift]));
      for (let k = 1; k < a.length; k++) line(a[k - 1], a[k], (x, y) => { if (mask.has(key(x, y))) put(x, y, j % 3 === 0 ? 'rim' : 'light'); });
    });
    // Embedded broken foam clusters on the moving faces, not just a white outline.
    const patches = [[[28, 20], [33, 18], [37, 21], [35, 24], [31, 23]], [[37, 38], [41, 42], [43, 48], [40, 47], [37, 43]], [[25, 78], [31, 74], [35, 74], [31, 78], [26, 80]], [[53, 89], [59, 86], [64, 87], [60, 90], [56, 91]]];
    patches.forEach((shape, j) => poly(shape.map(([x, y]) => transform([x + (i % 2) * 2, y + (reducedMotion ? 0 : Math.round(Math.sin(phase + j)))])), (x, y) => {
      if (mask.has(key(x, y))) put(x, y, j === 0 ? 'foam' : 'rim');
    }));
    if (!reducedMotion && g > 0.35 && t < 0.88) {
      for (let j = 0; j < 5; j++) {
        let [x, y] = transform([3 + j * 5, Math.max(2, 30 - j * 5)]);
        x -= 2 + Math.round((j % 3 + 1) * (1 + Math.sin(phase + j)));
        y -= 2 + (j % 3) * 2;
        if ((Math.floor(p * 24) + j + i) % 5 === 0) continue;
        put(x, y, 'foam');
        if (j % 2 === 0) put(x - 1, y + 1, 'rim');
      }
    }
  });

  // Foreground shore foam stitches the four bases into one continuous surge.
  if (ys > 0.15) {
    const shore = [[0, 0], [3, -3], [11, -5], [20, -3], [30, -7], [39, -4], [49, -8], [60, -5], [72, -8], [84, -4], [98, -7], [109, -3], [123, -6], [138, -3], [151, -4], [160, 0]].map(([x, y]) => [Math.round(front + x * xs), Math.round(groundY + y * ys)]);
    poly(shore, (x, y) => put(x, y, 'rim'));
  }
  if (!pre && !reducedMotion && t < 0.8) {
    const burst = Math.sin(Math.PI * t / 0.8);
    for (let i = 0; i < 29; i++) {
      const x = Math.round(targetX - 3 - (8 + i * 1.6) * t + (i % 4) * 3);
      const y = Math.round(groundY - 2 - (8 + (i % 7) * 5) * burst);
      put(x, y, i % 4 === 0 ? 'white' : 'foam');
      if (i % 3 === 0) put(x + 1, y + 1, 'rim');
    }
  }
  return [...map.values()];
}

export function drawAbyssalTsunami(ctx, progress, options = {}) {
  const px = tsunamiPixels(progress, options);
  ctx.save();
  try {
    for (const { x, y, color } of px) { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); }
  } finally {
    ctx.restore();
  }
  return px.length;
}
