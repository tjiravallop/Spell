import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BOSS_ART_V2,
  detectBossComponentOverflow,
  evaluateBossAnimation,
  resolveBossArt,
} from '../src/boss-art-v2.js';
import {
  PALETTE as CONDUCTIVITY_PALETTE,
  SURFACE_ARCS,
  conductivityPixels,
  drawCthulhuConductivity,
} from '../src/boss-art/cthulhu-conductivity-vfx.js';
import {
  BREAKERS as TSUNAMI_BREAKERS,
  PALETTE as TSUNAMI_PALETTE,
  WAVE_LAYERS as TSUNAMI_WAVE_LAYERS,
  tsunamiPixels,
} from '../src/boss-art/abyssal-tsunami-v3.js';
import {
  PALETTE as RIFT_PALETTE,
  awakeningState,
  revealState,
  riftPixels,
} from '../src/boss-art/abyssal-rift-v2.js';
import {
  BOSS_SIZE_V2,
  getBossAnimatedEnvelope,
  getBossVisualBounds,
  resolveBossScale,
} from '../src/boss-sizes.js';
import { Battlefield } from '../src/render.js';
import { FLOOR80_BOSS_ROOM } from '../src/run.js';

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

describe('Major Boss V2 — Abyssal Cthulhu True Form (Phase B8.2)', () => {
  it('registers abyssal_cthulhu with 32 semantic colors, 8 continuous frames, and V1 default fallback', () => {
    const art = BOSS_ART_V2.abyssal_cthulhu;
    assert.ok(art);
    assert.equal(resolveBossArt('abyssal_cthulhu', { v2: true }), art);
    assert.equal(resolveBossArt('abyssal_cthulhu', { v2: false }), null);
    assert.equal(Object.keys(art.colors).length, 32);
    assert.equal(art.parts?.cthulhuBody?.frames?.length, 8);
    assert.equal(BOSS_SIZE_V2.abyssal_cthulhu.defaultHeight, 120);
    assert.equal(BOSS_SIZE_V2.abyssal_cthulhu.offset.baseline, 0);
    const scale = resolveBossScale('abyssal_cthulhu', art, { sizeTier: 'large' });
    assert.ok(Math.abs(art.neutralBounds.height * scale - 120) < 1e-6);
  });

  it('maintains coherent connected body, grounded feet, zero overflow, and smooth loop closure across 8 frames', () => {
    const art = BOSS_ART_V2.abyssal_cthulhu;
    const frames = art.parts.cthulhuBody.frames;
    const base0 = bottomRowRange(frames[0].pixels);
    assert.ok(base0);

    const states = frames.map((_, idx) => ({ frame: idx, pose: 'idle', now: idx * 280 }));
    const overflow = detectBossComponentOverflow(art, states);
    assert.equal(overflow.hasOverflow, false, JSON.stringify(overflow.entries));

    for (let i = 0; i < frames.length; i++) {
      const comps = countComponents(frames[i].pixels);
      assert.equal(comps.length, 1, `frame ${i} has ${comps.length} components: ${comps.join(',')}`);
      const baseI = bottomRowRange(frames[i].pixels);
      assert.equal(baseI.y, base0.y, `frame ${i} foot baseline shifted`);
      assert.ok(Math.abs(baseI.minX - base0.minX) <= 1, `frame ${i} foot minX drifted`);
      assert.ok(Math.abs(baseI.maxX - base0.maxX) <= 1, `frame ${i} foot maxX drifted`);
    }

    let diff = 0;
    const p0 = frames[0].pixels;
    const p7 = frames[7].pixels;
    for (let y = 0; y < p0.length; y++) {
      for (let x = 0; x < p0[y].length; x++) {
        if (p0[y][x] !== p7[y][x]) diff++;
      }
    }
    assert.ok(diff > 0 && diff < p0.length * p0[0].length * 0.25, `loop closure diff=${diff}`);
  });

  it('positions Phase 2 Cthulhu inside 320x180 without overlapping player/summon, uses body-aware Ward, and supports reducedMotion & dead', () => {
    const art = BOSS_ART_V2.abyssal_cthulhu;
    const f80Boss = [{ id: 'cth', kind: 'abyssal_cthulhu', slot: 0 }];
    const mockV2 = { state: { room: FLOOR80_BOSS_ROOM, enemies: f80Boss }, bossVisuals: { v2: true } };
    const mockV1 = { state: { room: FLOOR80_BOSS_ROOM, enemies: f80Boss }, bossVisuals: { v2: false } };

    assert.equal(Battlefield.prototype.enemyX.call(mockV2, f80Boss[0]), 216);
    assert.equal(Battlefield.prototype.enemyX.call(mockV1, f80Boss[0]), 126);

    const metrics = getBossVisualBounds('abyssal_cthulhu', 216, 146, 0, art, { v2: true });
    assert.equal(metrics.height, 120);
    assert.equal(metrics.bottom, 146);
    assert.ok(metrics.left >= 118, `left=${metrics.left} should leave room for player & summon`);
    assert.ok(metrics.right <= 316, `right=${metrics.right} should fit inside 320`);
    assert.ok(metrics.ward.width < metrics.width * 0.65, 'Ward should surround central body mass, not full wingspan');

    const partStates = art.parts.cthulhuBody.frames.map((_, idx) => ({ cthulhuBody: { frame: idx, dx: 0, dy: 0 } }));
    const env = getBossAnimatedEnvelope('abyssal_cthulhu', 216, 146, 0, art, { v2: true }, partStates);
    assert.equal(env.clipsBattlefield, false, JSON.stringify(env));

    const reduced = evaluateBossAnimation(art, { frame: 4, pose: 'idle', reducedMotion: true, now: 1120 });
    assert.equal(reduced.partStates.cthulhuBody.frame, 0);
    const dead = evaluateBossAnimation(art, { frame: 2, pose: 'dead', now: 560 });
    assert.equal(dead.partStates.hideParts, true);
    assert.equal(dead.effects.length, 0);
  });

  it('emits Phase 1 dimensional rifts, role-specific abilities, Phase 2 combat/Tsunami/Lightning/exposed effects, and cleans up on death (Phase B8.3)', () => {
    for (const kind of ['cthulhu_ward_tentacle', 'cthulhu_heal_tentacle', 'cthulhu_ink_tentacle', 'cthulhu_crush_tentacle']) {
      const art = BOSS_ART_V2[kind];
      const idle = evaluateBossAnimation(art, { frame: 1, pose: 'idle', now: 300 });
      assert.ok(idle.effects.some(fx => fx.type === 'abyssalRift'), `${kind} should emit abyssalRift`);
      const dead = evaluateBossAnimation(art, { frame: 1, pose: 'dead', now: 300 });
      assert.equal(dead.effects.length, 0, `${kind} rift must collapse on death`);
      assert.equal(dead.partStates.hideParts, true);
    }

    const wardSupport = evaluateBossAnimation(BOSS_ART_V2.cthulhu_ward_tentacle, { frame: 0, supporting: true, now: 200 });
    assert.ok(wardSupport.effects.some(fx => fx.type === 'abyssalPulse'));
    const healSupport = evaluateBossAnimation(BOSS_ART_V2.cthulhu_heal_tentacle, { frame: 0, supporting: true, now: 200 });
    assert.ok(healSupport.effects.some(fx => fx.type === 'abyssalPulse'));
    const crushCharge = evaluateBossAnimation(BOSS_ART_V2.cthulhu_crush_tentacle, { frame: 0, charging: true, now: 200 });
    assert.ok(crushCharge.effects.some(fx => fx.type === 'abyssalPulse'));

    const cth = BOSS_ART_V2.abyssal_cthulhu;
    const t1 = evaluateBossAnimation(cth, { frame: 0, attacking: true, progress: 0.4, now: 200 });
    assert.ok(t1.effects.some(fx => fx.type === 'clawSlash'));
    const t2 = evaluateBossAnimation(cth, { frame: 0, attacking: true, selfHeal: 120, progress: 0.4, now: 200 });
    assert.ok(t2.effects.some(fx => fx.type === 'linkBolt'));
    const t3 = evaluateBossAnimation(cth, { frame: 0, charging: true, now: 200 });
    assert.ok(t3.effects.some(fx => fx.type === 'orbitDiamonds'));
    const shockedExposed = evaluateBossAnimation(cth, { frame: 0, armor: 0, shocked: true, now: 200 });
    assert.ok(shockedExposed.materialOverrides !== null);
    assert.equal(shockedExposed.effects.some(fx => fx.type === 'linkBolt' || fx.type === 'anchorBolt'), false);

    // Surface conductivity pixel-mask clipping & sequential propagation
    const metrics = getBossVisualBounds('abyssal_cthulhu', 216, 146, 0, cth, { v2: true });
    const frame0 = cth.parts.cthulhuBody.frames[0];
    const scale = metrics.scale;
    const isOpaque = (lx, ly) => {
      const px = Math.floor((lx - metrics.left) / scale);
      const py = Math.floor((ly - metrics.top) / scale);
      return Boolean(frame0.pixels?.[py]?.[px]);
    };
    const rect = { x: metrics.left, y: metrics.top, width: metrics.width, height: metrics.height };
    assert.equal(SURFACE_ARCS.length, 8);
    let totalDrawn = 0;
    for (const p of [0.1, 0.3, 0.5, 0.75, 0.9]) {
      const pix = conductivityPixels(p, rect, { isOpaque });
      totalDrawn += pix.length;
      for (const pt of pix) {
        assert.ok(Number.isInteger(pt.x) && Number.isInteger(pt.y));
        assert.ok(isOpaque(pt.x, pt.y), `Conductivity pixel (${pt.x},${pt.y}) must be on opaque sprite`);
        assert.ok(Object.values(CONDUCTIVITY_PALETTE).includes(pt.color));
      }
    }
    assert.ok(totalDrawn > 0, 'Conductivity should emit surface arc pixels across progress');
    assert.equal(conductivityPixels(1.0, rect, { isOpaque }).length, 0, 'Must clean up at progress >= 1');
    const rmEarly = conductivityPixels(0.2, rect, { isOpaque, reducedMotion: true });
    assert.ok(rmEarly.length > 0);
    assert.equal(conductivityPixels(0.5, rect, { isOpaque, reducedMotion: true }).length, 0);

    // Abyssal Tsunami V3 four-breaker geometry & right-to-left surge
    assert.equal(TSUNAMI_BREAKERS.length, 4);
    assert.ok(TSUNAMI_WAVE_LAYERS.length >= 13);
    assert.equal(Object.keys(TSUNAMI_PALETTE).length, 8);
    const peak = tsunamiPixels(0.62, { sourceX: 150, targetX: 56, groundY: 146, impactProgress: 0.62 });
    assert.ok(peak.length > 2000, 'Peak tsunami should form a thick connected water mass');
    const xs = peak.map(p => p.x);
    const ys = peak.map(p => p.y);
    const w = Math.max(...xs) - Math.min(...xs) + 1;
    const h = Math.max(...ys) - Math.min(...ys) + 1;
    assert.ok(w >= 145 && w <= 170, `Tsunami width=${w} should be ~160px`);
    assert.ok(h >= 82 && h <= 96, `Tsunami height=${h} should be ~91px`);
    const early = tsunamiPixels(0.25, { sourceX: 150, targetX: 56, groundY: 146, impactProgress: 0.62 });
    assert.ok(Math.min(...xs) < Math.min(...early.map(p => p.x)), 'Tsunami must move right-to-left');
    assert.equal(tsunamiPixels(1.0, {}).length, 0, 'Tsunami must clean up at progress >= 1');
    assert.equal(tsunamiPixels(0.1, { reducedMotion: true, impactProgress: 0.62 }).length, 0);
    assert.ok(tsunamiPixels(0.62, { reducedMotion: true, impactProgress: 0.62 }).length > 0);

    // Abyssal Rift V2 floor rifts & awakening reveal
    assert.equal(Object.keys(RIFT_PALETTE).length, 11);
    const floorRift = riftPixels({ kind: 'floor', x: 126, groundY: 146, phase: 0.25, openness: 1 });
    assert.ok(floorRift.length > 100);
    assert.equal(riftPixels({ kind: 'floor', x: 126, groundY: 146, phase: 0.25, openness: 0 }).length, 0);
    const awOpen = riftPixels({ kind: 'awakening', progress: 0.45, x: 216, groundY: 146 });
    assert.ok(awOpen.length > 1000);
    const revMid = revealState(0.50, { x: 122, y: 26, w: 188, h: 120 });
    assert.equal(revMid.silhouette, true);
    assert.ok(revMid.clip.h > 0 && revMid.clip.h < 120);
    const revDone = revealState(1.0, { x: 122, y: 26, w: 188, h: 120 });
    assert.equal(revDone.done, true);
    assert.equal(revDone.portalScale, 0);
    assert.equal(awakeningState(0.5, { reducedMotion: true }).silhouette, false);
  });
});
