# Abyssal Cthulhu Master Asset Specification (Future B8.2)

## 1. Height & Battlefield Space Evaluation (320×180 Logical Arena)

Phase 2 spawns `abyssal_cthulhu` at `slot = 2` (`x = 208` via `126 + slot * 41`). With `BOSS_SIZE_V2.abyssal_cthulhu.offset.x = +27`, the visual center sits at **`x = 235, baseline = 146`**, leaving:
- **Left clearance**: `~107 px` to Grand Summon XXL right edge (`x ≈ 128`).
- **Right clearance**: `85 px` to canvas edge (`x = 320`).
- **Top clearance**: `134 px` from `baseline = 146` to `y = 12` (minimum Ward/popup margin).

| Candidate Height | Neutral Envelope (`W×H`) | Top Y | Clearance Above Top | Verdict |
|---|---|---|---|---|
| **112 px** | `136×112` | `y = 34` | `22 px` above top | Good, slightly compact vs Floor 50/70 (`120 px`) |
| **120 px (Recommended)** | **`144×120`** | **`y = 26`** | **`14 px` above top** | **Optimal**: matches Floor 50/70 grand scale, fits Ward + popups cleanly, `x = 163..307` |
| **128 px** | `154×128` | `y = 18` | `6 px` above top | Tight for Ward bar & floating damage popups above wings/head |

- **Recommended Maximum Dimensions**: **148 px width × 124 px height** (neutral `144×120`).

## 2. Anatomical & Layering Specification

- **Orientation**: Left-facing / 3/4 left-facing grounded stance (`baseline = 146`).
- **Anatomy**:
  - `behind` layer: Large tattered **membranous eldritch wings** (`leftWing`, `rightWing`), background **clawed arm** (`rearArm`).
  - `mainBody`: Massive hunched abyssal torso with trench-rune carapace and bioluminescent veins.
  - `front` layer: Bulbous octopus-like **head** with blazing eldritch eyes, **jaw/maw**, **3–4 independently animated facial tentacles**, and foreground **long clawed arm** (`frontArm`).
- **Elemental & Palette**: Retain Water affinity; 28–32 semantic colors (deep trench ink, abyssal teal-slate, bioluminescent cyan-aquamarine, eldritch violet accents, pale bone claws) + Lightning conductivity shock feedback (`abyssalShockUntil`).
