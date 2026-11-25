# Regression Results — Phase B0.1

## Automated Tests
Command:
`node --test test/boss-animation-framework.test.js test/boss-art-v2.test.js test/dragon-art-v2.test.js test/summon-size-v2.test.js test/summon-system.test.js`

- **Result:** 44/44 passed (`0` failed, `0` skipped) — updated below after final run.

## Visual & Playwright Verification
- `crown-archivist-before-after.png`: Identical Floor 30 rear-layer Crown Archivist V2 composition before and after declarative migration.
- `component-layer-test.png` & `localized-frame-animation.gif`: Verified `z: 'behind'` wing, main `body`, and `z: 'front'` flame with `joint` pinning across 4 localized frames.
