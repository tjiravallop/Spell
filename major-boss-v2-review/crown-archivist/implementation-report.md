# Crown Archivist V2 — Phase B3 Implementation Report

## 1. Locked / Provisional Configuration
- **Boss ID:** `crown_archivist` (Floor 30, Room Index 74)
- **Native Grid:** `98×104` (3-component indexed pixel art)
  - `body`: `98×104`, opaque `(0,0)..(94,103)`, detached floating books removed
  - `leftGrimoire`: `22×23` at local anchor `(8, 5)`
  - `rightGrimoire`: `21×23` at local anchor `(77, 12)`
- **Combined Opaque Bounds:** `98×104` (`minX=0, maxX=97, minY=0, maxY=103`)
- **Selected Palette:** 32-color handcrafted semantic palette (`CROWN_ARCHIVIST_V2_MATERIALS`)
- **Size Configuration:**
  - Standard: `96 px`
  - Large (provisional default): `104 px` (`scale = 1.00×`)
  - Grand: `112 px`
- **Rear-Layer Placement:** `layer: 'rear'`, `enemyX` = `244` in Room 74 when `?bossArt=v2` is enabled; foreground `rune_ram` (`167`) and `ward_scribe` (`208`) overlap the lower robe while keeping the crown, face, chest, and both floating grimoires unobstructed.
- **Body-Aware Ward Box:** `{ minX: 25, maxX: 73, minY: 6, maxY: 103 }`
- **Semantic Anchors:**
  - `head`: `(48, 20)`
  - `chest`: `(47, 40)`
  - `weapon` (left grimoire): `(19, 17)`
  - `rightBook` (right grimoire): `(87, 23)`
  - `bodyCenter`: `(48, 52)`

## 2. Independent Grimoire Animation
- **Idle:** Main body bobs `±1 px`; `leftGrimoire` and `rightGrimoire` oscillate `±4 px` vertically and `±1 px` horizontally with asynchronous phases (`0` vs `0.65π`), with subtle teal rune pulses.
- **Charge:** Both floating grimoires rise (`-5 px` / `-6 px`), runes brighten, and restrained teal arcane particles orbit each book anchor.
- **Attack:** Both floating grimoires surge toward the player (`-6 px`..`-9 px`), pages and runes flash bright, and `drawEnemyAttackVfx` emits a teal-and-violet arcane bolt from the left grimoire anchor (`enemyX - 28, y = 62`).
- **Death:** Both floating grimoires disappear with the main boss (`pose === 'dead'`), leaving zero orphaned book sprites.
- **Reduced Motion:** All bob/drift offsets and orbital particles are suppressed.

## 3. Modified Files
- `spell-foundry-merged-floors-5-8/src/boss-art/crown-archivist-v2.js` (new)
- `spell-foundry-merged-floors-5-8/src/boss-art-v2.js`
- `spell-foundry-merged-floors-5-8/src/boss-sizes.js`
- `spell-foundry-merged-floors-5-8/src/render.js`
- `spell-foundry-merged-floors-5-8/dev/boss-lab.html`
- `spell-foundry-merged-floors-5-8/test/boss-art-v2.test.js`

## 4. Verification Results
- **Unit & Regression Tests:** `node --test test/boss-art-v2.test.js test/dragon-art-v2.test.js test/summon-size-v2.test.js test/summon-system.test.js` — **40/40 passed** (`0` failed, `0` skipped).
- **Real Gameplay & Click Targeting (Floor 30, Room 74):** Verified clicking unobstructed rear boss (`244, 62`) selects `crown_archivist`, and clicking overlapping foreground `rune_ram` (`167, 130`) / `ward_scribe` (`208, 130`) selects the respective minion.
- **Production Default:** V1 remains the production default (`?bossArt=v2` required for V2).
