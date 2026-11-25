# Phase B7.1 — Thunder Drake Emperor Animation Reconstruction Report

## 1. Root-Cause Analysis (Previous B7 Failure)

Inspection of `component-breakdown.png`, `component-joint-verification.png`, `idle-animation.gif`, and the prior `thunder-drake-emperor-v2.js` revealed four structural defects:

1. **Fragmented `mainBody`:** Almost all continuous anatomy (`head`, `lowerJaw`, `whiskers`, `mane`, `upperBodyCoil`, `lowerBodyCoil`, `dorsalFins`, `tail`) was sliced into rectangular bounding boxes, leaving `mainBody` with only the foreclaws and isolated specks.
2. **Rectangular Seam Tearing & Internal Holes:** `shift_grid(..., row_wave, col_wave)` operated independently inside each rectangular cutout, causing pixels along shared borders (`x=58/59`, `x=83/84`, `y=45/46`, `y=95/96`) to tear apart or overwrite adjacent pixels into 1px transparent holes.
3. **Uncoordinated Motion Drivers:** Adjacent body segments used different frame intervals and offsets (`240ms`, `210ms+0`, `210ms+2`, `190ms+1`, `210ms+4`), making upper and lower coils jitter asynchronously rather than swimming as one creature.

## 2. Previous vs. Reconstructed Component Architecture

| Aspect | Previous B7 | Reconstructed B7.1 |
|---|---|---|
| **Component Count** | 11 (`mainBody` + 10 fragmented parts) | **3 coherent parts** (`dragonBody` + `thunderOrbLeft` + `thunderOrbRight`) |
| **Dragon Body** | 8 disconnected rectangular cutouts | **1 continuous 8-frame full-body grid (`144×124`, anchored at `9, 0`)** |
| **Motion Driver** | Independent per-box `row_wave`/`col_wave` + different `divMs` | **Single shared phase** (`280ms/frame`, ~2.24s loop) driving a smooth traveling wave (`Head → Neck → Coils → Tail`) |
| **Sampling Method** | Forward pixel overwrite (`out[ny][nx] = ch`) on `139×124` grid | **Continuous inverse-mapped displacement** on the `797×711` clean master before nearest-neighbor downsampling (zero seams, zero internal holes) |
| **Twin Thunder Orbs** | Independent 6-frame orbs | Preserved as 2 independent 6-frame floating components (`thunderOrbLeft`, `thunderOrbRight`) with asynchronous elliptical orbits |

## 3. Staged Verification Outputs (`animation-reconstruction/`)

- **Stage A (Clean Static Baseline):** `static-reconstruction.png`, `static-reconstruction-4x.png`, `original-vs-reconstructed.png`
- **Stage B & C (Coherent Continuous Body Idle):** `dragon-body-only-idle.gif`, `dragon-secondary-motion-idle.gif`
- **Stage D (Twin Thunder Orbs & Combined Idle):** `dragon-orbs-only.gif`, `dragon-combined-idle.gif` (4×), `dragon-combined-idle-1x.gif` (1×), `old-vs-new-animation.gif`

## 4. Modified Files

- `spell-foundry-merged-floors-5-8/src/boss-art/thunder-drake-emperor-v2.js` — Reconstructed 3-component `THUNDER_DRAKE_EMPEROR_V2_DEF` (8-frame continuous `dragonBody` + 6-frame `thunderOrbLeft` & `thunderOrbRight`)
- `spell-foundry-merged-floors-5-8/test/thunder-drake-emperor-v2.test.js` — Updated component & animation assertions for the 3-component B7.1 architecture

## 5. Regression Test Results

- **Full Test Suite (`node --test test/*.test.js`):** **351/351 passed** (`8` suites, `0` failed, `0` skipped)
- Floor 80 Cthulhu migration (`CTHULHU_TENTACLE_KINDS` in `src/endgame-tower.js` & `src/run.js`) was confirmed intact and untouched.
- V1 remains the production default (`?bossArt=v2` enables V2).

## 6. Remaining Visual Limitations & Approval Gate

- **Idle-focused reconstruction:** Per Phase B7.1 scope, this milestone stops after reconstructing the coherent continuous idle animation and isolated visual comparisons. Charge, attack, hurt, reflection, and full-gameplay combat animations await explicit visual approval of the reconstructed idle motion.
- **Amplitude restraint:** Displacement amplitudes (`amp_x = 0.85`, `amp_y = 1.35` native px) are intentionally restrained to preserve crisp pixel-art outlines and coherent scale clusters without tearing.
