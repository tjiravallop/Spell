# Parallel Development Contract — Phase B1.2 & Phase B2.1

## Shared Prep Status
Completed in Phase B0.1 (`src/boss-art-v2.js` and `src/render.js`). Both Ember Overlord (`EMBER_OVERLORD_V2_DEF`) and Tempest Archon (`TEMPEST_ARCHON_V2_DEF`) are already registered via `createBossArt(...)`.

## Independent Ownership Boundaries

### Phase B1.2 — Ember Overlord
- **Allowed files:**
  - `src/boss-art/ember-overlord-v2.js`
  - Ember-specific component data modules (e.g. `src/boss-art/ember-overlord-parts.js`, if needed)
  - `test/ember-overlord-v2.test.js`
  - `major-boss-v2-review/ember-overlord/`
- **Forbidden shared files:** `src/render.js`, `src/boss-art-v2.js`, `test/boss-art-v2.test.js`, `src/ui/*`, Summon V2 files.

### Phase B2.1 — Tempest Archon
- **Allowed files:**
  - `src/boss-art/tempest-archon-v2.js`
  - Tempest-specific component data modules (e.g. `src/boss-art/tempest-archon-parts.js`, if needed)
  - `test/tempest-archon-v2.test.js`
  - `major-boss-v2-review/tempest-archon/`
- **Forbidden shared files:** `src/render.js`, `src/boss-art-v2.js`, `test/boss-art-v2.test.js`, `src/ui/*`, Summon V2 files.

## Remaining Shared Dependencies (Transparency)
- **Attack projectile VFX** (`drawEnemyAttackVfx` in `src/render.js`) and **size/anchor metadata** (`BOSS_SIZE_V2` in `src/boss-sizes.js`) remain in shared files. If B1.2 or B2.1 only add component grids, frames, `z` layers, `animate()` motion, material pulses, and `drawBossLocalEffects` instructions (`groundShadow`, `groundSpark`, `anchorBolt`, `orbitDiamonds`), **zero shared runtime edits are needed**.
- **Combined bounds note:** `combinedPartsBounds` clamps `minX..maxX` and `minY..maxY` to `[0, width-1]` / `[0, height-1]` for body-relative centering, so any new component frames extending beyond the current master grid should keep the main grid padded or rely on `bodyBox` for Ward bounds.
