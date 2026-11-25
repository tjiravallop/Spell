# Boss V2 Multi-Component Animation Framework Specification

## 1. Declarative Boss Definition Contract
Boss modules (`src/boss-art/<boss>-v2.js`) export a frozen definition object consumed by `createBossArt(definition, label)` in `src/boss-art-v2.js`:

```js
export const BOSS_V2_DEF = Object.freeze({
  grid: BODY_GRID,         // string[] (rectangular, '.' = transparent)
  materials: MATERIALS,    // { [charKey]: [materialName, hexColor] }
  parts: {
    partId: {
      anchor: { x, y },    // Master-grid attachment coordinate
      joint: { x, y },     // Optional component-local joint (default { x: 0, y: 0 })
      z: 'behind' | 'front', // Optional render layer relative to main body (default 'front')
      grid: STATIC_GRID,   // Static single-frame component
      // OR:
      frames: [FRAME_0, FRAME_1, ...], // Localized multi-frame component
    },
  },
  animate(state) {
    return {
      materialOverrides: {}, // Optional global { [materialName]: hexColor }
      partStates: {
        partId: {
          visible: true,     // Optional (false hides part)
          frame: 0,          // Optional frame index into part.frames
          dx: 0,             // Pixel-snapped X offset (integer canvas px)
          dy: 0,             // Pixel-snapped Y offset (integer canvas px)
          overrides: null,   // Optional per-part { [materialName]: hexColor }
        },
      },
      effects: [],           // Optional boss-local VFX instructions
    };
  },
});
```

## 2. Core API Signatures (`src/boss-art-v2.js`)
- `validateBossGrid(grid, materials, label)` — validates non-empty rectangular grid and material keys.
- `indexedBossArt(grid, materials, label)` — precomputes `pixels`, RLE `rows`, `colors`, and `opaqueBounds`.
- `indexedPartArt(part, materials, label)` — precomputes RLE `frames[]`, `anchor`, `joint`, and `z`.
- `createBossArt(definition, label)` — builds a frozen Boss V2 art asset with combined `opaqueBounds` and `animate` hook.
- `evaluateBossAnimation(art, animState)` — invokes `art.animate(animState)` safely; returns `{ materialOverrides, partStates, effects }`.
- `drawBossArt(ctx, art, left, top, scale, materialOverrides = null, partStates = null)` — draws `z: 'behind'` parts, then main `body`, then `z: 'front'` parts, aligning `(part.anchor - part.joint)` at integer pixel coordinates.

## 3. `animate(state)` Hook Input & Supported Local VFX (`src/render.js`)
`Battlefield` invokes `evaluateBossAnimation(bossV2, state)` with:
- `frame`, `pose`, `progress`, `reducedMotion`, `now`, `colors`, `attacking`, `charging`, `hurt`.

`Battlefield.prototype.drawBossLocalEffects(effects, metrics, now)` supports:
- `{ type: 'groundShadow', rx, ry, color?, colorIndex? }`
- `{ type: 'groundSpark', dx, y, radius, color?, colorIndex?, coreColor?, coreIndex? }`
- `{ type: 'anchorBolt', anchor, dx1, dy1, dx2, dy2, seed, color?, colorIndex?, coreColor?, coreIndex? }`
- `{ type: 'orbitDiamonds', anchors, count, rx, ry, offsetY, speed, color?, coreColor? }`
