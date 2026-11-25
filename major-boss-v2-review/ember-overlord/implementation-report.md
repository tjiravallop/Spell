# Ember Overlord V2 (Floor 10) — Implementation Report

## 1. Modified and Added Files

### Added
- `spell-foundry-merged-floors-5-8/src/boss-art/ember-overlord-v2.js` (`EMBER_OVERLORD_V2_GRID`, `EMBER_OVERLORD_V2_MATERIALS`)
- `spell-foundry-merged-floors-5-8/src/boss-art-v2.js` (`indexedBossArt`, `BOSS_ART_V2`, `resolveBossArt`, `drawBossArt`)
- `spell-foundry-merged-floors-5-8/src/boss-sizes.js` (`BOSS_SIZE_TIERS`, `BOSS_SIZE_V2`, `getOpaqueBounds`, `resolveBossScale`, `resolveBossOffset`, `resolveBossLayer`)
- `spell-foundry-merged-floors-5-8/dev/boss-lab.html` (Isolated Boss Visual Lab)
- `spell-foundry-merged-floors-5-8/test/boss-art-v2.test.js` (Unit tests for grid, materials, V1/V2 flag isolation, uniform scaling, and rear-layer support)

### Modified
- `spell-foundry-merged-floors-5-8/src/app.js` (Added localhost-only `?bossArt=v2` and `?bossSize=standard|large|grand` developer flags)
- `spell-foundry-merged-floors-5-8/src/render.js` (Added `bossVisuals` parameter to `Battlefield`, V2 sprite dispatch in `sprite()`, semantic flame/core pulse, and Rear Boss Layer ordering in `draw()`)

---

## 2. Native Grid Resolution & Opaque Bounds
- **Isolated Master Reference:** `619 × 536` px
- **Native Logical Grid:** `92 × 80` logical pixels (preserved `1.15 : 1` aspect ratio; widened from 64 to 92 to retain the magma scepter and flowing crimson cape without horizontal compression)
- **Actual Opaque Bounds:** `92 × 80` px (`minX=0, minY=0, maxX=91, maxY=79`)

---

## 3. Colors & Material System
- **16 Semantic Materials (`EMBER_OVERLORD_V2_MATERIALS`):**
  `ink` (`#18101c`), `armorDeep` (`#2c1e34`), `armorShadow` (`#42304c`), `armorMid` (`#614a6b`), `armorLight` (`#886e91`), `bronzeShadow` (`#935536`), `goldMid` (`#cf893f`), `goldLight` (`#f4c65d`), `capeShadow` (`#6e1d26`), `capeMid` (`#a7292c`), `capeLight` (`#d3432b`), `lavaDark` (`#801c16`), `lavaMid` (`#c93a1a`), `flame` (`#f26a1b`), `flameLight` (`#ffb838`), `core` (`#fff29c`)
- **Handcrafted Palette:** Preserves warm gold highlights, deep purple-charcoal armor contrast, and saturated fire accents; does not use Summon elemental tinting or `towerArtPalette`.

---

## 4. Image Conversion Method
1. Deterministic border flood-fill foreground isolation (`dist < 30`, outer flame halo `lum < 30`, bottom ground shadow `lum < 42`) + interior pocket cleanup.
2. Premultiplied RGBA Lanczos downsampling to `92 × 80` followed by hard alpha cutoff (`alpha >= 120`) for crisp 1-bit pixel edges.
3. Perceptual CIE Lab nearest-color quantization into the 16-material palette.
4. Indexed character-grid export and RLE row-span encoding (`pixelSpans`).

---

## 5. Rendering Architecture & Scale Tiers
- **Renderer:** `drawBossArt` in `src/boss-art-v2.js` draws pixel-snapped RLE spans (`Math.round(row * scale)` / `Math.round(start * scale)`).
- **Render Scale (`targetHeight / opaqueBounds.height`):**
  - **V1 Reference:** `2×` on `32×32` grid (`64 × 64` canvas px)
  - **V2 Standard (`76 px`):** `76 / 80 = 0.95×` → `87 × 76` canvas px
  - **V2 Large (`88 px`):** `88 / 80 = 1.10×` → `101 × 88` canvas px
  - **V2 Grand (`96 px`):** `96 / 80 = 1.20×` → `110 × 96` canvas px
- **Future Rear Layer Support:** `resolveBossLayer()` partitions `state.enemies` into `rear` and `foreground` render passes in `Battlefield.draw()` without altering enemy array order, targeting, or combat logic.

---

## 6. V1/V2 Compatibility & Animation Verification
- Default production behavior (`?bossArt=v2` disabled) uses the original V1 renderer untouched.
- Verified **Idle**, **Attack**, **Hurt**, **Ward (1 layer)**, and **Death** states in `dev/boss-lab.html`.
- Verified `test/boss-art-v2.test.js`, `test/dragon-art-v2.test.js`, and `test/summon-size-v2.test.js` (10/10 tests passing).

---

## 7. Visual Differences & Remaining Limitations
- At `92×80` logical pixels, fine 1px inner-armor details (such as the smallest belt diamond facet) quantize into 2–3px gold/core clusters, while the overall silhouette, crown, eyes, chest core, scepter, and cape remain clearly recognizable.
- On white/light backgrounds, a few dark `ink`/`lavaDark` pixels from the reference's outer flame glow remain around the scepter flame; on the game's dark `#10191b` arena background they read naturally as a dark flame outline.
- In full-UI gameplay screenshots (`gameplay-v2-88px.png`, `gameplay-v2-96px.png`), the existing `.enemy-card` at `--enemy-y: 42%` overlaps the upper crown/helmet slightly at larger heights (existing UI behavior, out of scope for Phase B1).
