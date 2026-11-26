import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BOSS_ART_V2,
  detectBossComponentOverflow,
  evaluateBossAnimation,
  resolveBossArt,
} from '../src/boss-art-v2.js';
import {
  BOSS_SIZE_V2,
  getBossAnimatedEnvelope,
  getBossVisualBounds,
  resolveBossScale,
} from '../src/boss-sizes.js';
import { Battlefield } from '../src/render.js';
import { FLOOR80_BOSS_ROOM } from '../src/run.js';

const TENTACLES = [
  { kind: 'cthulhu_ward_tentacle', slot: 0, x: 126, targetH: 48 },
  { kind: 'cthulhu_heal_tentacle', slot: 1, x: 167, targetH: 48 },
  { kind: 'cthulhu_ink_tentacle', slot: 2, x: 208, targetH: 52 },
  { kind: 'cthulhu_crush_tentacle', slot: 3, x: 249, targetH: 52 },
];

function countComponents(pixels) {
  const h = pixels.length;
  const w = pixels[0].length;
  const visited = Array.from({ length: h }, () => new Uint8Array(w));
  const sizes = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!pixels[y][x] || visited[y][x]) continue;
      const stack = [[y, x]];
      visited[y][x] = 1;
      let count = 0;
      while (stack.length > 0) {
        const [cy, cx] = stack.pop();
        count++;
        for (const [dy, dx] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const ny = cy + dy;
          const nx = cx + dx;
          if (ny >= 0 && ny < h && nx >= 0 && nx < w && pixels[ny][nx] && !visited[ny][nx]) {
            visited[ny][nx] = 1;
            stack.push([ny, nx]);
          }
        }
      }
      sizes.push(count);
    }
  }
  return sizes.sort((a, b) => b - a);
}

function bottomRowRange(pixels) {
  for (let y = pixels.length - 1; y >= 0; y--) {
    let minX = Infinity;
    let maxX = -1;
    for (let x = 0; x < pixels[y].length; x++) {
      if (pixels[y][x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
    if (maxX >= minX) return { y, minX, maxX };
  }
  return null;
}

describe('Major Boss V2 — Floor 80 Phase 1 Tentacles (Phase B8.1)', () => {
  it('registers all four tentacles with 32-color palettes, 10 continuous frames, and V1 default fallback', () => {
    for (const { kind, targetH } of TENTACLES) {
      const art = BOSS_ART_V2[kind];
      assert.ok(art, `Missing BOSS_ART_V2 entry for ${kind}`);
      assert.equal(resolveBossArt(kind, { v2: true }), art);
      assert.equal(resolveBossArt(kind, { v2: false }), null);
      assert.equal(Object.keys(art.colors).length, 32, `${kind} should use 32 semantic colors`);
      assert.equal(art.parts?.tentacle?.frames?.length, 10, `${kind} should have 10 continuous frames`);
      assert.equal(BOSS_SIZE_V2[kind].defaultHeight, targetH);
      const scale = resolveBossScale(kind, art, { sizeTier: 'large' });
      assert.ok(Math.abs(art.neutralBounds.height * scale - targetH) < 1e-6);
    }
  });

  it('maintains coherent single-body organic silhouettes, stable rooted bases, and zero overflow across all 10 frames', () => {
    for (const { kind } of TENTACLES) {
      const art = BOSS_ART_V2[kind];
      const frames = art.parts.tentacle.frames;
      const base0 = bottomRowRange(frames[0].pixels);
      assert.ok(base0, `${kind} frame 0 must have a grounded base`);

      const states = frames.map((_, idx) => ({ frame: idx, pose: 'idle', now: idx * 260 }));
      const overflow = detectBossComponentOverflow(art, states);
      assert.equal(overflow.hasOverflow, false, `${kind} overflow: ${JSON.stringify(overflow.entries)}`);

      for (let i = 0; i < frames.length; i++) {
        const comps = countComponents(frames[i].pixels);
        assert.equal(comps.length, 1, `${kind} frame ${i} has ${comps.length} disconnected components: ${comps.join(',')}`);
        const baseI = bottomRowRange(frames[i].pixels);
        assert.equal(baseI.y, base0.y, `${kind} frame ${i} base row shifted from ${base0.y} to ${baseI.y}`);
        assert.ok(Math.abs(baseI.minX - base0.minX) <= 1, `${kind} frame ${i} root minX drifted too far`);
        assert.ok(Math.abs(baseI.maxX - base0.maxX) <= 1, `${kind} frame ${i} root maxX drifted too far`);
      }

      // Smooth loop closure: frame 0 and frame 9 should differ only modestly
      let diff = 0;
      const p0 = frames[0].pixels;
      const p9 = frames[9].pixels;
      for (let y = 0; y < p0.length; y++) {
        for (let x = 0; x < p0[y].length; x++) {
          if (p0[y][x] !== p9[y][x]) diff++;
        }
      }
      assert.ok(diff > 0 && diff < p0.length * p0[0].length * 0.30, `${kind} loop closure diff=${diff}`);
    }
  });

  it('fits all four tentacles inside 320x180 at Floor 80 slots and supports reducedMotion and dead cleanup', () => {
    const f80Enemies = TENTACLES.map(t => ({ id: t.kind, kind: t.kind, slot: t.slot }));
    const mockCtx = { state: { room: FLOOR80_BOSS_ROOM, enemies: f80Enemies }, bossVisuals: { v2: true } };

    for (const { kind, slot, x } of TENTACLES) {
      assert.equal(Battlefield.prototype.enemyX.call(mockCtx, f80Enemies[slot]), x);
      const art = BOSS_ART_V2[kind];
      const metrics = getBossVisualBounds(kind, x, 146, 0, art, { v2: true });
      assert.equal(metrics.bottom, 146);
      const partStates = art.parts.tentacle.frames.map((_, idx) => ({ tentacle: { frame: idx, dx: 0, dy: 0 } }));
      const env = getBossAnimatedEnvelope(kind, x, 146, 0, art, { v2: true }, partStates);
      assert.equal(env.clipsBattlefield, false, `${kind} clips battlefield: ${JSON.stringify(env)}`);

      const reduced = evaluateBossAnimation(art, { frame: 5, pose: 'idle', reducedMotion: true, now: 1300 });
      assert.equal(reduced.partStates.tentacle.frame, 0);
      const dead = evaluateBossAnimation(art, { frame: 2, pose: 'dead', now: 520 });
      assert.equal(dead.partStates.hideParts, true);
    }
  });
});
