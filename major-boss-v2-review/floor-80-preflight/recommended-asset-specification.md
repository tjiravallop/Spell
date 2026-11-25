# Recommended V2 Asset Specification — Floor 80 (Abyssal Cthulhu)

## 1. Phase 1 Assets (4 Independent Tentacle Actors)

### Design Strategy
- **4 distinct tentacle V2 definitions** (or 4 distinct native grids sharing a cohesive abyssal Water/eldritch palette), preserving each tentacle's unique mechanical identity:
  1. `kraken_ward_tentacle` (Slot 0, `x = 126`): Coiling abyssal prism tentacle with floating water-ward rune ring; distinct glow/pulse during odd-turn `ward-grant-all`.
  2. `kraken_heal_tentacle` (Slot 1, `x = 167`): Twin-tendril cradle holding a luminous oceanic pearl; distinct pulse during even-turn `heal`.
  3. `kraken_ink_tentacle` (Slot 2, `x = 208`): Dark violet-indigo abyssal siphon stalk with glowing mana-drain nozzle and dripping ink globules; distinct ink-jet flare on `cycle === 2` (`manaDrain: 2`).
  4. `kraken_crush_tentacle` (Slot 3, `x = 249`): Heavy barnacle-armored spiked tentacle club; distinct raised coil in `charge` (`cycle === 2`) and heavy slam in `attack` (`cycle === 0`, 92 dmg).
- **Recommended Native & Gameplay Dimensions**:
  - Native grid: **48×48** (or **44×48**) per tentacle, rendered at **~44–48 canvas px** height (`scale ~ 1.0`, compared to current 32×32).
  - Horizontal spacing: Phase 1 uses `enemyX = 126 + slot * 41` (`126, 167, 208, 249`), giving **41 px** center-to-center spacing; keeping rendered width `<= 40–44 px` prevents adjacent tentacles from muddying each other's silhouettes and keeps `hitTest` clean.
- **Required Animation States**: `idle` (4+ localized frames), `charge` (for `kraken_crush_tentacle` and support telegraphs), `attack` (localized lash/slam/ink-spray), `hurt`, `dead` (`hideParts`), `reducedMotion`.

## 2. Phase 2 Asset — Abyssal Cthulhu (`abyssal_kraken`)

### Anatomy & Orientation
- **Orientation**: Left-facing (or 3/4 left-facing) combat stance toward the player (`x = 51`) and summon (`x = 88`), grounded or low-hovering at `baseline = 146` (trench floor / swirling abyssal foam).
- **Non-Human Eldritch Silhouette**:
  - **Head & Facial Tentacles**: Bulbous cephalopod/cthulhoid cranium with multiple blazing abyssal eyes and **3–4 independently animated facial tentacles** (`z: 'front'`) curling around the maw.
  - **Jaw / Maw**: Articulated or pulsing abyssal mandibles/maw (`jaw` component) that flare open on `charge` (Turn 3) and `attack` (Turn 4 tsunami 108 dmg).
  - **Torso / Carapace**: Heavy hunched aquatic-eldritch torso with bioluminescent trench-rune markings and barnacle/chitin plates.
  - **Arms & Claws**: Long, asymmetric foreground & background clawed arms (`leftArm` / `rightArm`, `z: 'front'` / `'behind'`) with webbed talons reaching toward the arena.
  - **Wings**: Large, tattered membranous abyssal wings (`leftWing` / `rightWing`, `z: 'behind'`) folded/swept behind the hunched torso so they frame the silhouette without clipping past `x = 320` or crowding `x = 128` (Grand Summon right edge).
- **Elemental Affinity & Semantic Palette**:
  - Retain **Water** affinity (`lightning`/`ice` +25% weakness).
  - Suggested **28–32 semantic color palette**: deep trench obsidian/ink, abyssal teal-slate skin, bioluminescent cyan-aquamarine (`#00b4d8` / `#52ebde` / `#b7d9bd`), eldritch violet-indigo accents (echoing `kraken_ink_tentacle`), and pale bone/coral claws.
  - **Conductivity Visual Feedback**: When `abyssalShockUntil >= turn` (or on lightning hit), support electric/shocked material highlight or `anchorBolt` feedback.

### Recommended Dimensions & Placement
- **Neutral Master Grid**: **136×112** (or **140×112**), default gameplay height **112 px** (`scale = 1.0`, `offset = { x: 0, baseline: 0 }`, `layer: 'foreground'` or `'rear'`).
- **Battlefield Fit at `x = 235, baseline = 146`**:
  - Horizontal span: `235 - 68 = 167` to `235 + 68 = 303` (leaves **39 px** clearance from Grand Summon XXL right edge at `~128` and **17 px** from `x = 320`).
  - Vertical span: `y = 34..146` (leaves **22 px** above head/wings for Ward bar and damage popups above `y = 12`).
  - `bodyBox`: Tightly around hunched torso & head (excluding wing tips and extended claw reach) so the Ward barrier frames the core body cleanly.

## 3. Recommended Phased Implementation Plan

1. **B8.1 — Phase 1 Tentacles (4 V2 Definitions & Signature Animations)**:
   - Create `src/boss-art/kraken-tentacles-v2.js` (4 independent tentacle V2 defs) + `test/kraken-tentacles-v2.test.js`.
   - Register in `BOSS_ART_V2` and `BOSS_SIZE_V2` (`src/boss-art-v2.js`, `src/boss-sizes.js`).
2. **B8.2 — Abyssal Cthulhu Master Asset & Signature Animation**:
   - Create `src/boss-art/abyssal-kraken-v2.js` (keeping internal ID `abyssal_kraken`) + `test/abyssal-kraken-v2.test.js`.
   - Register in `BOSS_ART_V2` and `BOSS_SIZE_V2`.
3. **B8.3 — Phase Transition Awakening, Visible Naming & Regression Verification**:
   - Optional visual-only `boss-phase` awakening polish in `src/render.js` for `abyssal_kraken`.
   - Update visible Thai/English display names/descriptions in `src/endgame-tower.js`, `src/enemy-traits.js`, `src/run.js`, `src/ui/battle-fx.js`, `src/ui/battle-render.js` (preserving all internal IDs!).
   - Run full `node --test` + `boss-art-v2.test.js` + `endgame-tower.test.js` + real browser Floor 80 Phase 1 → Transition → Phase 2 verification.
