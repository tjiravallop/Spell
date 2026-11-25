# Floor 80 Major Boss Technical Audit (Phase B8.0)

**Target**: Floor 80★ Major Boss (`FLOOR80_BOSS_ROOM = 199`) — Phase 1 (4 Kraken Tentacles) → Phase 2 (`abyssal_kraken` → provisional redesign **Abyssal Cthulhu**)  
**Audit Scope**: Strict READ-ONLY inspection of current working tree, source code, tests, and production browser captures.

---

## 1. Current Project Baseline

- **Floors 10–60 Boss V2 Status** (verified in `src/boss-art-v2.js:164–171` and `src/boss-sizes.js:11–116`):
  - **Implemented in `BOSS_ART_V2` (6 bosses)**: `ember_overlord` (F10), `tempest_archon` (F20), `crown_archivist` (F30), `mirror_regent` (F40), `loom_sovereign` (F50), `volcano_colossus` (F60).
  - **Floor 70 (`thunder_drake_emperor`)**: Not yet in `BOSS_ART_V2` or `BOSS_SIZE_V2`.
  - **Floor 60 (`volcano_colossus`)**: Integrated in `BOSS_ART_V2`, `BOSS_SIZE_V2`, `src/render.js:553` (`FLOOR60_BOSS_ROOM` rear-layer formation), and `test/volcano-colossus-v2.test.js`.
- **B0.2 Combined-Bounds Infrastructure** (`src/boss-art-v2.js:69–150`, `src/boss-sizes.js:128–137`):
  - `createBossArt` computes `bodyBounds`, `neutralBounds` (frame 0), `envelopeBounds` (all frames), and `overflow`.
  - `detectBossComponentOverflow(art, animStates)` checks per-frame component bounds against `0..width-1, 0..height-1`.
  - `resolveBossBounds(art)` returns `art?.neutralBounds ?? art?.opaqueBounds ?? getOpaqueBounds(art)`.
- **Generic Boss-Local VFX (`drawBossLocalEffects`, `src/render.js:589–633`)**:
  - Supports `groundShadow`, `groundSpark`, `anchorBolt`, `orbitDiamonds`, and `fateThread` (with dynamic `from`/`to` anchor endpoints).
- **Regression Test Status**:
  - `node --test`: **314/314 tests passing** (0 failures, 0 skipped).

---

## 2. Floor 80 Encounter Configuration

- **Room Index**: `FLOOR80_BOSS_ROOM = 199` (`src/run.js:2058`).
- **Phase 1 Formation** (`src/endgame-tower.js:389–390`):
  - `['kraken_ward_tentacle', 'kraken_heal_tentacle', 'kraken_ink_tentacle', 'kraken_crush_tentacle']`
  - Slots: `0, 1, 2, 3`; Combat order: left-to-right (`slot 0 -> 3`).
- **Phase 2 Formation** (`src/run.js:2680–2682`):
  - Single actor: `createEnemy('abyssal_kraken', 0)` with `id = 'enemy-0'`, `slot = 2`.

---

## 3. Phase 1 — Tentacle Mechanics

All 4 tentacles are `isBoss: true`, `affinity: 'water'` (`+25%` damage from Lightning/Ice, `-20%` from Water), and have **4 distinct procedural sprite functions** in `src/middle-sprites.js:1088–1175` (all drawn on a `32×32` native grid at `scale = 1`, `32×32` rendered):

| ID | Thai Name | HP | Armor | Ward | Atk | Unique Mechanic / Schedule | Battlefield X |
|---|---|---|---|---|---|---|---|
| `kraken_ward_tentacle` | หนวดม่านวารี | 1000 | 4 | 1 | 38 | Odd turns (`turn % 2 === 1`): grants `+1` Ward to all other live tentacles (`sealed` blocks) | `126` |
| `kraken_heal_tentacle` | หนวดฟื้นสมุทร | 950 | 3 | 0 | 34 | Even turns (`turn % 2 === 0`): heals lowest-HP% live tentacle `+220 HP` (`burn`/heal-cut halves, `sealed` blocks) | `167` |
| `kraken_ink_tentacle` | หนวดหมึกดำบาดาล | 1050 | 3 | 0 | 42 | `turn % 3 === 2`: Ink Siphon `42` dmg + `manaDrain: 2` (`-2 MP`) | `208` |
| `kraken_crush_tentacle` | หนวดยักษ์บดขยี้ | 1250 | 5 | 0 | 52 | 3-turn cycle: `cycle 1` 52 dmg → `cycle 2` Charge → `cycle 0` Heavy Slam **92 dmg** | `249` |

- **Progression**: All 4 tentacles must reach `hp <= 0` to trigger Phase 2 (`src/combat.js:4083–4088`, `src/run.js:4781–4786`).
- **V2 Feasibility**: Each tentacle has its own enemy `kind` and can receive an independent V2 definition and signature animation.

---

## 4. Phase 2 — Existing Abyssal Kraken

- **ID & Name**: `abyssal_kraken` — `มหาคราเค่นแห่งห้วงบาดาล` (`src/endgame-tower.js:53`).
- **Stats**: `hp: 4600`, `armor: 5` (dynamic by turn), `ward: 1` (dynamic by turn), `attack: 72`, `exp: 280`, `gold: 260`, `isBoss: true`, `affinity: 'water'`.
- **4-Turn Schedule** (`src/run.js:2496–2500, 5165–5167, 5268–5271, 5539–5547`):
  - **Turn 1 (`turn % 4 === 1`)**: Armor `5`, Ward `1`, Tidal Wave `72` dmg.
  - **Turn 2 (`turn % 4 === 2`)**: Armor `6`, Ward `0`, Siphon Wave `58` dmg + `selfHeal: 120`.
  - **Turn 3 (`turn % 4 === 3`)**: Armor `4`, Ward `1`, **Charge** (Tsunami telegraph).
  - **Turn 4 (`turn % 4 === 0`)**: Armor `0`, Ward `0` (Exposed `+35%` spell damage), **Tsunami 108 dmg** (`isMajorClimaxRelease`).
- **Lightning Conductivity Passive** (`src/combat.js:856–871`): Any Lightning hit deals `+15` armor-piercing damage and shreds `-2` armor until next turn (`abyssalShockUntil`).
- **Existing Rendering**: `src/middle-sprites.js:1176–1214` (`32×32` native grid, rendered at `2×` = `64×64` via `LARGE_BOSS_KINDS` in `src/render.js:22, 699–705`, positioned at `x = 126 + 2 * 41 = 208`? Wait—let's check `enemyX`!).
  - **Important Coordinate Observation** (`src/render.js:573–575`): Because `FLOOR80_BOSS_ROOM (199) >= FLOOR21_START_ROOM`, `enemyX` hits line `573`: `return 126 + slot * 41;`! Since `kraken.slot = 2`, Phase 2 `abyssal_kraken` renders at **`x = 126 + 2 * 41 = 208`** (NOT `235`!). Let's verify this in the live browser screenshot!

---

## 5. Boss V2 Framework Compatibility

- **Supported out-of-the-box**:
  - 4 independent tentacle V2 definitions + 1 Phase 2 Cthulhu V2 definition via `BOSS_ART_V2` & `BOSS_SIZE_V2`.
  - Large Cthulhu wings (`z: 'behind'`), facial tentacles / arms / jaw (`z: 'front'`), localized pixel frames, B0.2 `neutralBounds`/`envelopeBounds` scaling, and `boss-phase` canvas event hooks.
- **Minor Gaps / Considerations**:
  - `enemyX` (`src/render.js:573`) currently places `abyssal_kraken` (`slot = 2`) at `x = 208` instead of `235`. If a wide 136px+ Cthulhu is centered at `x = 208`, its left edge (`208 - 68 = 140`) still clears Grand Summon (`~128`), or `BOSS_SIZE_V2.abyssal_kraken.offset.x` (`+20` to `+27`) can shift it to `~228–235` without touching `enemyX`!
  - `drawBossLocalEffects` does not yet have a dedicated water-tentacle/splash effect, though `groundSpark`/`orbitDiamonds`/`anchorBolt` work and `boss-phase` already draws water surges.

---

## 6. Deliverables Index

All audit files and captures are stored in `major-boss-v2-review/floor-80-preflight/`:
- [floor-80-technical-audit.md](file:///c:/Users/thanachot/Downloads/Spell%20V4/major-boss-v2-review/floor-80-preflight/floor-80-technical-audit.md)
- [floor-80-source-extracts.md](file:///c:/Users/thanachot/Downloads/Spell%20V4/major-boss-v2-review/floor-80-preflight/floor-80-source-extracts.md)
- [phase-transition-analysis.md](file:///c:/Users/thanachot/Downloads/Spell%20V4/major-boss-v2-review/floor-80-preflight/phase-transition-analysis.md)
- [save-compatibility-analysis.md](file:///c:/Users/thanachot/Downloads/Spell%20V4/major-boss-v2-review/floor-80-preflight/save-compatibility-analysis.md)
- [recommended-asset-specification.md](file:///c:/Users/thanachot/Downloads/Spell%20V4/major-boss-v2-review/floor-80-preflight/recommended-asset-specification.md)
- Visual captures: `phase-1-gameplay.png`, `phase-1-battlefield.png`, `phase-1-targeting.png`, `phase-transition.gif`, `phase-2-gameplay.png`, `phase-2-battlefield.png`, `phase-2-grand-summon.png`, `phase-2-mobile.png`, `tentacle-sprite-comparison.png`, `existing-boss-sprite.png`, `battlefield-space-analysis.png`.
