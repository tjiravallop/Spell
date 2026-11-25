# Phase B0.2 — Shared Multi-Component Bounds Correction Report

## 1. Confirmed Root Cause
`resolveBossScale()` in `src/boss-sizes.js` previously called `getOpaqueBounds(art)`, which scanned only `art.pixels` (the main body grid after component separation) instead of `art.opaqueBounds` (the combined neutral assembly bounds). Meanwhile, `getBossVisualBounds()` used `art.opaqueBounds` for positioning (`left`, `top`), creating both oversized scaling and anchor misalignment on multi-component bosses.

## 2. Modified Shared Files
- `spell-foundry-merged-floors-5-8/src/boss-art-v2.js`:
  - Separated `bodyBounds` (body-only), `neutralBounds` (frame-0 unclamped assembly, exposed as `art.opaqueBounds`), and `envelopeBounds` (all-frame unclamped union), plus `art.overflow` and `detectBossComponentOverflow(art, animStates)`.
- `spell-foundry-merged-floors-5-8/src/boss-sizes.js`:
  - Added `resolveBossBounds(art)` and updated `resolveBossScale()` and `getBossVisualBounds()` to use `neutralBounds` consistently for scaling and positioning while keeping `bodyBox` / `bodyBounds` for body-aware Ward.
  - Added `getBossAnimatedEnvelope(...)` for 320×180 battlefield overflow verification.
- `spell-foundry-merged-floors-5-8/test/boss-art-v2.test.js` & `spell-foundry-merged-floors-5-8/test/boss-animation-framework.test.js`:
  - Updated to distinguish `bodyBounds`, `neutralBounds`, and `envelopeBounds` and verify overflow detection without rescaling.

## 3. Bounds & Corrected Scales

| Boss | Body-Only | Neutral Assembly | Animated Envelope | Overflow | Target Height | Corrected Scale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ember_overlord` | `77×69` | `92×80` | `92×80` | `false` | `88 px` | `1.100000` (`88 / 80`) |
| `tempest_archon` | `78×80` | `119×86` | `119×86` | `false` | `96 px` | `1.116279` (`96 / 86`) |
| `crown_archivist` | `95×104` | `98×104` | `98×104` | `false` | `104 px` | `1.000000` (`104 / 104`) |
| `mirror_regent` | `116×108` | `120×108` | `120×108` | `false` | `112 px` | `1.037037` (`112 / 108`) |

## 4. Regression Results
`node --test test/boss-animation-framework.test.js test/boss-art-v2.test.js test/ember-overlord-v2.test.js test/tempest-archon-v2.test.js test/mirror-regent-v2.test.js test/dragon-art-v2.test.js test/summon-size-v2.test.js test/summon-system.test.js`
- **57/57 passed** (`0` failed, `0` skipped).
