# Ember Overlord V2 — Phase B1.2 Signature Animation Report

## 1. Summary

Ember Overlord (`ember_overlord`, 92×80 native grid, 24 semantic colors, default 88 canvas px) has been decomposed into **8 independently animated components** plus the **main armored body** using the Phase B0.1 multi-component framework (`src/boss-art-v2.js`). Frame 0 of all components assembles losslessly with `EMBER_OVERLORD_V2_BODY_GRID` to reproduce the approved B1.1 92×80 sprite with **0 pixel difference**.

## 2. Component Architecture

| Component | `z` | Anchor `(x, y)` | Joint `(x, y)` | Size | Frames | Purpose |
|---|---|---|---|---|---|---|
| `mainBody` | base | `(0, 0)` | `(0, 0)` | 92×80 | 1 | Armored torso, helmet, visor, scepter shaft & cradle |
| `flameCrown` | `front` | `(48, 17)` | `(11, 15)` | 23×17 | 5 | Organic crown flame tips & internal hot clusters; F4 is charge/attack flare |
| `leftShoulderFlame` | `front` | `(33, 28)` | `(4, 7)` | 10×8 | 4 | Left pauldron flame spikes (phase-offset `+1` from right shoulder) |
| `rightShoulderFlame` | `front` | `(70, 25)` | `(10, 17)` | 21×19 | 4 | Right pauldron flame plume pinned to golden pauldron |
| `scepterOrb` | `front` | `(15, 20)` | `(15, 20)` | 40×27 | 4 | Magma scepter orb core swirl & sweeping upper flame plume |
| `capeRight` | `behind` | `(66, 46)` | `(6, 6)` | 32×40 | 4 | Behind-body billowing right cape pinned at shoulder/back |
| `capeLeft` | `behind` | `(17, 62)` | `(11, 4)` | 14×22 | 4 | Behind-body left cape tail (phase-offset `+2` from `capeRight`) |
| `scepterEmbers` | `front` | `(3, 4)` | `(0, 0)` | 40×35 | 4 | Detached ember sparks rising around scepter orb |
| `shoulderEmbers` | `front` | `(79, 13)` | `(0, 0)` | 9×23 | 4 | Detached ember sparks rising beside right shoulder |

## 3. Animation States & Timings

- **Idle**: 4-step loop driven by Battlefield `frame % 4` (~180 ms/step) + vertical `bob` `[0, -1, 0, 1]`. Asynchronous shoulder flames (`+1` phase) and capes (`+2` phase), slow magma core & `flameLight` pulse on `f === 2`, and alternating `groundSpark` on even frames.
- **Charge**: `flameCrown` alternates between `F4` and `F2`; `scepterOrb` alternates `F2`/`F1`; detached embers lift (`dy: -1`); `materialOverrides` brighten `lavaMid`, `flame`, `flameLight`, `emberBright`, and `core` (`#ffffff`); `effects` add `orbitDiamonds` around `weapon` (`rx: 10, ry: 7, speed: 320`) + `groundSpark`.
- **Attack**: Driven by `progress` (`Math.sin(progress * Math.PI)`). Attached parts stay pinned (`dx: 0, dy: 0`) with flared frames (`flameCrown: 4`, `scepterOrb: 2`); detached embers surge forward (`dx` up to `-2`, `dy` up to `-1`) and return smoothly to `0` at `progress = 1`.
- **Hurt**: Maintains stable component attachment (`dx: 0, dy: 0`), alternates `F0`/`F3`, `effects: []`.
- **Death**: Returns `partStates: { hideParts: true, ...visible: false }` and `effects: []`; `src/render.js` also returns early on `pose === 'dead'` before `drawBossArt`.
- **Reduced Motion**: Locks all components to `frame: 0, dx: 0, dy: 0`, `effects: []`, `materialOverrides: null` in idle/hurt (non-oscillating charge/attack highlight preserved for gameplay readability).

## 4. Modified & Created Files (Strict Ownership)

- Created: `spell-foundry-merged-floors-5-8/src/boss-art/ember-overlord-v2-parts.js`
- Modified: `spell-foundry-merged-floors-5-8/src/boss-art/ember-overlord-v2.js`
- Created: `spell-foundry-merged-floors-5-8/test/ember-overlord-v2.test.js`
- Created: `major-boss-v2-review/ember-overlord/signature-animation/*` (10 deliverables)

## 5. Test Results

- `node --test test/ember-overlord-v2.test.js test/boss-animation-framework.test.js`: **8/8 passing** (4 framework + 4 Ember Overlord B1.2).
- `node --test test/boss-art-v2.test.js`: **Shared-file blocker observed** (see Section 6).

## 6. Shared-File Blocker (Reported, Not Modified)

Per Section 6 file ownership rules, `src/boss-sizes.js` was **not** modified. However, `src/boss-sizes.js` currently has a shared bug when any Boss V2 separates edge pixels from `definition.grid` into `parts`:

1. `src/boss-sizes.js` line 71 (`resolveBossScale`) calls `getOpaqueBounds(art)` (imported from `src/summon-sizes.js`, which scans `art.pixels` = body-only grid and ignores `art.opaqueBounds`) instead of `art?.opaqueBounds ?? getOpaqueBounds(art)` (which `getBossVisualBounds` on line 93 already uses).
2. Because `EMBER_OVERLORD_V2_BODY_GRID` removes `scepterOrb` (top/left edges) and `capeRight` (right edge), `getOpaqueBounds(art)` returns `77×69` instead of `92×80`, causing `resolveBossScale` to compute `88 / 69 = 1.275` (`102px` height) instead of `88 / 80 = 1.1` (`88px` height), and causing `test/boss-art-v2.test.js` lines 40, 93, and 108 to fail (and similarly `Tempest Archon` line 66).

**Exact shared fix required** (in `src/boss-sizes.js`):
- Update `getOpaqueBounds` export or `resolveBossScale` line 71 to prefer `art?.opaqueBounds ?? getOpaqueBounds(art)` so `resolveBossScale` and `test/boss-art-v2.test.js` use `combinedPartsBounds`.
