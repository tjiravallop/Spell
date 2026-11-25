# Modified Files — Phase B0.1

- `spell-foundry-merged-floors-5-8/src/boss-art-v2.js` — Generic `validateBossGrid`, `indexedPartArt` (multi-frame + `joint` + `z`), `combinedPartsBounds`, `createBossArt`, `evaluateBossAnimation`, and layered `drawBossArt`.
- `spell-foundry-merged-floors-5-8/src/render.js` — Replaced boss-specific `if/else if` chains in `sprite()` and `draw()` with `evaluateBossAnimation(...)` and `drawBossLocalEffects(...)`.
- `spell-foundry-merged-floors-5-8/src/boss-art/ember-overlord-v2.js` — Added `EMBER_OVERLORD_V2_DEF` with existing flame/core `animate()` hook.
- `spell-foundry-merged-floors-5-8/src/boss-art/tempest-archon-v2.js` — Added `TEMPEST_ARCHON_V2_DEF` with existing crystal/storm `animate()` hook and local shadow/spark/bolt effects.
- `spell-foundry-merged-floors-5-8/src/boss-art/crown-archivist-v2.js` — Added `CROWN_ARCHIVIST_V2_DEF` with `leftGrimoire`, `rightGrimoire`, and `animate()` hook.
- `spell-foundry-merged-floors-5-8/test/boss-animation-framework.test.js` — New framework unit test suite.
