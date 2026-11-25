# Spell Foundry — Major Boss V2 Technical Source Audit

เอกสารรวบรวม Source Code จริงและ Technical Reference สำหรับการออกแบบและพัฒนา **Major Boss V2 (Floor 10–100)** โดยอ้างอิงจากสถาปัตยกรรมจริงของโปรเจกต์ใน `spell-foundry-merged-floors-5-8/` และแนวทาง **Summon V2** (Master Sprite Reference → Indexed Pixel Grid + Material Mapping → RLE Span Renderer)

> **หมายเหตุ:** โค้ดทั้งหมดในเอกสารนี้คัดลอกตรงจากไฟล์ Source Code ปัจจุบัน (Read-Only Audit)

---

## 1. Existing Boss Source Code (Floor 10–100)

### 1.1 Boss Definitions & Registry

#### `src/audio.js` (Lines 3–7) — `MAJOR_BOSS_KINDS`
```js
export const MAJOR_BOSS_KINDS = new Set([
  'ember_overlord', 'tempest_archon', 'crown_archivist', 'mirror_regent',
  'loom_sovereign', 'volcano_colossus', 'thunder_drake_emperor',
  'abyssal_kraken', 'nether_dread_lord', 'eternity_overlord', 'eternity_reborn',
]);
```

#### `src/render.js` (Lines 14–22) — `LARGE_BOSS_KINDS` (กำหนด Scale `2×` และ Hitbox)
```js
export const LARGE_BOSS_KINDS = new Set([
  'boss', 'mirror_mage', 'frost_lich', 'storm_titan', 'arch_codex', 'ember_overlord',
  'prism_watcher', 'astral_sentinel', 'elder_grimoire', 'eclipse_mage', 'glacial_sovereign', 'thunder_colossus', 'nexus_codex', 'tempest_archon',
  'seal_curator', 'crown_archivist',
  'gate_weaver', 'mirror_regent', 'seam_warden', 'loom_sovereign',
  'volcano_colossus', 'thunder_drake_emperor', 'ancient_chitin_behemoth', 'abyssal_kraken', 'nether_dread_lord', 'eternity_overlord', 'eternity_reborn',
  'ironforge_automaton', 'tempest_blade_seraph', 'abyssal_tide_colossus', 'magma_core_juggernaut', 'chitin_bastion_behemoth',
  'storm_sovereign_drake', 'void_kraken_leviathan', 'nether_forge_overlord', 'eternity_armory_god',
]);
```

#### `src/run.js` (Lines 99, 111, 116) — Floor 10, 20, 30 Boss Definitions
```js
  ember_overlord: { name: 'จ้าวอัคคีบรรพกาล', hp: 135, armor: 3, ward: 1, attack: 8, color: '#ffad42', exp: 180, gold: 150, isBoss: true, affinity: 'fire' },
  tempest_archon: { name: 'จ้าวพายุอสุนีบาต', hp: 255, armor: 4, ward: 1, attack: 11, color: '#ffe53b', exp: 360, gold: 300, isBoss: true, affinity: 'lightning' },
  crown_archivist: { name: 'เจ้าแห่งหอจารึก', hp: 235, armor: 3, ward: 2, attack: 13, color: '#ffd18e', exp: 260, gold: 215, isBoss: true },
```

#### `src/upper-tower.js` (Lines 11, 13) — Floor 40, 50 Boss Definitions (`RIFT_ENEMIES`)
```js
  mirror_regent: { name: 'ราชันกระจกผลึกเหมันต์', hp: 325, armor: 3, ward: 2, attack: 14, color: '#95c7e6', exp: 150, gold: 150, isBoss: true, swapTurn: 1, wardTurn: 1, heavy: 28, affinity: 'ice' },
  loom_sovereign: { name: 'ราชันกี่ทอโลก', hp: 530, armor: 4, ward: 2, attack: 19, color: '#ddccfb', exp: 220, gold: 210, isBoss: true, swapTurn: 1, wardTurn: 1, heavy: 36, repeatReduction: 70 },
```

#### `src/endgame-tower.js` (Lines 3–78) — Floor 60, 70, 80, 90, 100 Boss Definitions (`ENDGAME_ENEMIES`)
```js
export const KRAKEN_TENTACLE_KINDS = Object.freeze([
  'kraken_ward_tentacle',
  'kraken_heal_tentacle',
  'kraken_ink_tentacle',
  'kraken_crush_tentacle',
]);

export const NETHER_PILLAR_KINDS = Object.freeze([
  'nether_leech_pillar',
  'nether_curse_pillar',
  'nether_doom_pillar',
]);

export const ETERNITY_PHASE_HP = Object.freeze([3500, 3500, 4500]);
export const ETERNITY_SHIFT_AFFINITIES = Object.freeze(['earth', 'fire', 'ice', 'lightning']);

  // Floor 60
  volcano_colossus: { name: 'ยักษ์อัคนีภูเขาไฟ', hp: 1500, armor: 3, ward: 1, attack: 46, color: '#e63946', exp: 240, gold: 220, isBoss: true, affinity: 'fire' },

  // Floor 70
  thunder_drake_emperor: { name: 'จักรพรรดิมังกรอสุนี', hp: 2800, armor: 5, ward: 1, attack: 58, color: '#ffb703', exp: 260, gold: 240, isBoss: true, affinity: 'lightning' },

  // Floor 80 (Phase 1 Tentacles + Phase 2 True Body)
  kraken_ward_tentacle: { name: 'หนวดม่านวารี', hp: 1000, armor: 4, ward: 1, attack: 38, color: '#00b4d8', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_heal_tentacle: { name: 'หนวดฟื้นสมุทร', hp: 950, armor: 3, ward: 0, attack: 34, color: '#2ec4b6', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_ink_tentacle: { name: 'หนวดหมึกดำบาดาล', hp: 1050, armor: 3, ward: 0, attack: 42, color: '#5a189a', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_crush_tentacle: { name: 'หนวดยักษ์บดขยี้', hp: 1250, armor: 5, ward: 0, attack: 52, color: '#023e8a', exp: 45, gold: 40, isBoss: true, affinity: 'water' },
  abyssal_kraken: { name: 'มหาคราเค่นแห่งห้วงบาดาล', hp: 4600, armor: 5, ward: 1, attack: 72, color: '#0077b6', exp: 280, gold: 260, isBoss: true, affinity: 'water' },

  // Floor 90 (Boss + Tri-Pillar Pact)
  nether_dread_lord: { name: 'จอมอสูรนรกานต์', hp: 7000, armor: 5, ward: 2, attack: 84, color: '#240046', exp: 300, gold: 280, isBoss: true, repeatReduction: 70, affinity: 'wind' },
  nether_leech_pillar: { name: 'เสาดูดวิญญาณ', hp: 1100, armor: 4, ward: 1, attack: 48, color: '#7b2cbf', exp: 55, gold: 48, isBoss: true, affinity: 'wind' },
  nether_curse_pillar: { name: 'เสาคำสาปต้องห้าม', hp: 1050, armor: 3, ward: 1, attack: 54, color: '#9d0208', exp: 55, gold: 48, isBoss: true, affinity: 'fire' },
  nether_doom_pillar: { name: 'เสาพิพากษานรกานต์', hp: 1250, armor: 5, ward: 0, attack: 52, color: '#3a0ca3', exp: 60, gold: 52, isBoss: true, affinity: 'ice' },

  // Floor 100 (Phase 1-2 + Phase 3)
  eternity_overlord: { name: 'มหาเทพราชันอนันตกาล', hp: 10000, armor: 6, ward: 2, attack: 98, color: '#f72585', exp: 500, gold: 500, isBoss: true, repeatReduction: 75, affinity: 'ice' },
  eternity_reborn: { name: 'มหาเทพอนันตกาล · ร่างจุตินิรันดร์', hp: ETERNITY_PHASE_HP[2], armor: 6, ward: 2, attack: 124, color: '#ffd166', exp: 500, gold: 500, isBoss: true, repeatReduction: 50, affinity: 'fire' },
```

---

### 1.2 Encounter Configurations & Room Indices

#### `src/run.js` (Lines 2016–2073)
```js
export const FLOOR10_BOSS_ROOM = 24;
export const FLOOR20_BOSS_ROOM = 49;
export const FLOOR30_BOSS_ROOM = 74;
export const FLOOR40_BOSS_ROOM = 99;
export const FLOOR50_BOSS_ROOM = 124;
export const FLOOR60_BOSS_ROOM = 149;
export const FLOOR70_BOSS_ROOM = 174;
export const FLOOR80_BOSS_ROOM = 199;
export const FLOOR90_BOSS_ROOM = 224;
export const FLOOR100_BOSS_ROOM = 249;
export const ETERNITY_FIRST_FORM_HP = ETERNITY_PHASE_HP[0] + ETERNITY_PHASE_HP[1];
export const ETERNITY_TOTAL_HP = ETERNITY_FIRST_FORM_HP + ETERNITY_PHASE_HP[2];
```

#### Encounter Formations (`src/run.js`, `src/upper-tower.js`, `src/endgame-tower.js`)
- **Floor 10 (Room 24):** `['ember_overlord']` (`src/run.js:2920`)
- **Floor 20 (Room 49):** `['tempest_archon']` (`src/run.js:2951`)
- **Floor 30 (Room 74):** `['crown_archivist', 'rune_ram', 'ward_scribe']` (`src/run.js:2982`)
- **Floor 40 (Room 99):** `['mirror_regent', 'ward_scribe', 'thread_archer']` (`src/upper-tower.js:55`)
- **Floor 50 (Room 124):** `['loom_sovereign', 'rift_runner', 'ward_scribe', 'thread_archer']` (`src/upper-tower.js:65`)
- **Floor 60 (Room 149):** `['volcano_colossus', 'magma_tortoise', 'cinder_drake', 'magma_tortoise']` (`src/endgame-tower.js:328`)
- **Floor 70 (Room 174):** `['thunder_drake_emperor', 'sand_stalker', 'spark_wraith', 'sand_stalker']` (`src/endgame-tower.js:359`)
- **Floor 80 (Room 199):**
  - Phase 1: `['kraken_ward_tentacle', 'kraken_heal_tentacle', 'kraken_ink_tentacle', 'kraken_crush_tentacle']` (`src/endgame-tower.js:390`)
  - Phase 2: `['abyssal_kraken']` (spawned by `triggerKrakenPhase2`)
- **Floor 90 (Room 224):** `['nether_dread_lord', 'nether_leech_pillar', 'nether_curse_pillar', 'nether_doom_pillar']` (`src/endgame-tower.js:421`)
- **Floor 100 (Room 249):**
  - Phase 1–2: `['eternity_overlord', 'zenith_templar', 'chronos_keeper', 'chaos_weaver']` (`src/endgame-tower.js:452`)
  - Phase 3: `['eternity_reborn']` (spawned by `triggerEternityPhase3`)

---

### 1.3 Boss Sprite Definitions (Procedural Rectangle Grid)

#### `src/render.js` (Lines 710–755) — `ember_overlord` & `tempest_archon`
```js
    } else if (kind === 'ember_overlord') {
      const flicker = this.settings.reducedMotion ? 0 : (frame % 2);
      // Flame crown & horns (animated flicker)
      r(7, 1 - flicker, 3, 5 + flicker, C[30]); r(11, 0, 3, 4, C[31]); r(15, 0, 2, 5, C[31]); r(18, 0, 3, 4, C[31]); r(22, 1 - (1 - flicker), 3, 5 + (1 - flicker), C[30]);
      r(4, 3, 3, 6, C[16]); r(25, 3, 3, 6, C[16]);
      // Helm & glowing eyes
      r(9, 5, 14, 8, C[10]); r(10, 6, 12, 3, C[16]); r(11, 8, 10, 4, C[0]);
      r(12, 9, 3, 2, C[31]); r(17, 9, 3, 2, C[31]);
      // Blazing armor & magma core
      r(5, 13, 22, 14, C[16]); r(8, 14, 16, 11, C[10]);
      r(12, 15, 8, 7, C[30]); r(14, 16, 4, 5, flicker ? C[9] : C[31]);
      r(6, 12, 5, 4, C[30]); r(21, 12, 5, 4, C[30]);
      // Flame gauntlets, cape & greaves
      r(1, 14, 5, 10, C[17]); r(2, 15, 3, 6, C[30]);
      r(26, 14, 5, 10, C[17]); r(27, 15, 3, 6, C[30]);
      r(8, 27, 6, 5, C[10]); r(18, 27, 6, 5, C[10]);
      r(10, 28, 2, 3, C[30]); r(20, 28, 2, 3, C[30]);
      // Magma scepter & floating ember sparks
      r(29, 6, 2, 25, C[11]); r(27, 2, 6, 5, C[30]); r(28, 3, 4, 3, C[31]);
      if (!this.settings.reducedMotion) {
        r(0, 7 + (frame % 3), 2, 2, C[30]);
        r(30, 12 - (frame % 3), 2, 2, C[31]);
      }
    } else if (kind === 'tempest_archon') {
      const spark = this.settings.reducedMotion ? 0 : (frame % 2);
      // Storm crown & lightning wings
      r(7, 1 - spark, 3, 5 + spark, C[31]); r(11, 0, 3, 4, C[27]); r(15, 0, 2, 5, C[9]); r(18, 0, 3, 4, C[27]); r(22, 1 - (1 - spark), 3, 5 + (1 - spark), C[31]);
      r(1, 5 + spark, 4, 12, C[22]); r(27, 5 + (1 - spark), 4, 12, C[22]);
      r(2, 7 + spark, 2, 8, C[31]); r(28, 7 + (1 - spark), 2, 8, C[31]);
      // Astral helm & glowing storm visor
      r(9, 5, 14, 8, C[20]); r(10, 6, 12, 3, C[22]); r(11, 8, 10, 4, C[0]);
      r(12, 9, 3, 2, C[31]); r(17, 9, 3, 2, C[31]);
      // Tempest armor & arc reactor core
      r(5, 13, 22, 14, C[20]); r(8, 14, 16, 11, C[21]);
      r(12, 15, 8, 7, C[27]); r(14, 16, 4, 5, spark ? C[9] : C[31]);
      r(6, 12, 5, 4, C[31]); r(21, 12, 5, 4, C[31]);
      // Storm gauntlets, lightning staff & greaves
      r(1, 16, 5, 9, C[21]); r(2, 17, 3, 5, C[31]);
      r(26, 16, 5, 9, C[21]); r(27, 17, 3, 5, C[31]);
      r(8, 27, 6, 5, C[20]); r(18, 27, 6, 5, C[20]);
      r(10, 28, 2, 3, C[31]); r(20, 28, 2, 3, C[31]);
      r(29, 4, 2, 27, C[22]); r(27, 1, 6, 5, C[31]); r(28, 2, 4, 3, C[9]);
      if (!this.settings.reducedMotion) {
        r(0, 10 + (frame % 3), 2, 2, C[27]);
        r(30, 14 - (frame % 3), 2, 2, C[31]);
      }
```

#### `src/middle-sprites.js` — Floor 30–100 Major Bosses & Phase Forms
- **Floor 30 (`crown_archivist`, Lines 341–377):**
```js
  crown_archivist(r, c, pose, frame) {
    // เจ้าแห่งหอจารึก (The Crown Archivist - Floor 30★ Major Boss, auto 2x scale)
    const atk = pose === 'attack';
    const floatY = [0, -1, 0, 1][frame % 4];
    const light = atk ? c[31] : frame % 2 ? c[30] : c[31];
    r(12, 2, 8, 5, c[30]);
    r(11, 0, 10, 3, c[31]);
    r(10, -1, 2, 3, c[9]);
    r(15, -2, 2, 4, c[9]);
    r(20, -1, 2, 3, c[9]);
    r(13, 6, 6, 6, c[15]);
    r(14, 7, 2, 2, c[31]);
    r(17, 7, 2, 2, c[31]);
    r(2, 6 + floatY, 8, 18, c[21]);
    r(4, 8 + floatY, 6, 14, c[23]);
    r(1, 4 + floatY, 4, 6, c[31]);
    r(22, 6 + floatY, 8, 18, c[21]);
    r(22, 8 + floatY, 6, 14, c[23]);
    r(27, 4 + floatY, 4, 6, c[31]);
    r(10, 11, 12, 18, c[20]);
    r(11, 13, 10, 15, c[22]);
    r(13, 12, 6, 17, c[30]);
    r(14, 13, 4, 15, c[31]);
    r(12, 21, 2, 2, c[31]);
    r(18, 21, 2, 2, c[31]);
    r(15, 25, 2, 2, c[9]);
    r(0, 13 + floatY, 5, 8, c[14]);
    r(1, 14 + floatY, 3, 6, light);
    r(27, 13 - floatY, 5, 8, c[14]);
    r(28, 14 - floatY, 3, 6, light);
    r(14, 4, 4, 2, c[9]);
  },
```
- **Floor 40 (`mirror_regent`, Lines 15–25):**
```js
  mirror_regent(r, c, pose, frame) {
    const flare = pose === 'attack' ? 2 : frame % 2;
    r(12, 0, 8, 3, c[30]); r(9, 2, 14, 3, c[22]);
    r(5, 5, 22, 3, c[20]); r(3, 8, 26, 17, c[20]);
    r(5, 9, 22, 14, c[25]); r(7, 10, 18, 12, c[26]);
    r(8, 10, 3, 11, c[27]); r(12, 11, 2, 8, c[9]);
    r(14, 12, 5, 6, c[21]); r(15, 13, 1, 2, c[31]); r(18, 13, 1, 2, c[31]);
    r(20, 10, 2, 10, c[9]); r(23, 9, 2, 12, c[23]);
    r(7, 25, 18, 3, c[22]); r(4, 28, 24, 3, c[20]);
    r(0, 12 - flare, 3, 6, c[27]); r(29, 16 + flare, 3, 5, c[23]);
  },
```
- **Floor 50 (`loom_sovereign`, Lines 55–86):**
```js
  loom_sovereign(r, c, pose, frame) {
    const atk = pose === 'attack';
    const pulse = atk ? c[31] : frame % 2 ? c[23] : c[30];
    const floatY = [0, -1, 0, 1][frame % 4];
    r(3, 1, 3, 30, c[12]); r(26, 1, 3, 30, c[12]);
    r(4, 0, 24, 3, c[14]); r(4, 29, 24, 3, c[14]);
    r(7, 3, 1, 26, c[23]); r(10, 3, 1, 26, pulse); r(21, 3, 1, 26, pulse); r(24, 3, 1, 26, c[23]);
    r(11, 2, 10, 4, c[30]); r(13, 0, 6, 3, c[31]); r(15, -2, 2, 3, c[9]);
    r(12, 5 + floatY, 8, 7, c[20]);
    r(13, 6 + floatY, 6, 5, c[15]);
    r(14, 7 + floatY, 2, 2, c[31]); r(17, 7 + floatY, 2, 2, c[31]);
    r(10, 12 + floatY, 12, 16, c[20]);
    r(11, 14 + floatY, 10, 13, c[21]);
    r(13, 13 + floatY, 6, 14, c[23]);
    r(14, 15 + floatY, 4, 10, pulse);
    r(15, 17 + floatY, 2, 3, c[9]);
    r(0, 10 + floatY, 4, 6, pulse); r(1, 11 + floatY, 2, 4, c[31]);
    r(28, 10 - floatY, 4, 6, pulse); r(29, 11 - floatY, 2, 4, c[31]);
    r(0, 22 - floatY, 4, 5, c[23]); r(28, 22 + floatY, 4, 5, c[23]);
    if (atk) {
      r(6, 14, 20, 2, c[31]);
      r(12, 8, 8, 8, c[31]);
    }
  },
```
- **Floor 60 (`volcano_colossus`, Lines 483–507):**
```js
  volcano_colossus(r, c, pose, frame) {
    const atk = pose === 'attack';
    const core = atk ? c[31] : frame % 2 ? c[19] : c[30];
    const arm = atk ? 4 : 0;
    r(10, 1, 12, 4, c[10]);
    r(12, -1, 8, 3, c[18]); r(14, -2, 4, 2, c[31]);
    r(2, 6 - arm, 9, 9, c[11]); r(4, 8 - arm, 5, 5, core);
    r(21, 6, 9, 9, c[11]); r(23, 8, 5, 5, core);
    r(11, 5, 10, 6, c[10]);
    r(13, 6, 2, 2, c[31]); r(17, 6, 2, 2, c[31]);
    r(7, 11, 18, 13, c[10]);
    r(9, 13, 14, 9, c[12]);
    r(13, 12, 5, 10, core); r(10, 15, 11, 3, core);
    r(1, 15 - arm, 7, 12, c[11]); r(24, 15, 7, 12, c[11]);
    r(8, 24, 6, 7, c[10]); r(18, 24, 6, 7, c[10]);
    if (atk) {
      r(0, 26, 32, 4, c[31]);
    }
  },
```
- **Floor 70 (`thunder_drake_emperor`, Lines 594–616):**
```js
  thunder_drake_emperor(r, c, pose, frame) {
    const atk = pose === 'attack';
    const bolt = atk ? c[31] : frame % 2 ? c[30] : c[31];
    const flap = atk ? 3 : 0;
    r(1, 2 + flap, 11, 16, c[12]); r(3, 4 + flap, 7, 12, bolt);
    r(20, 2 - flap, 11, 16, c[12]); r(22, 4 - flap, 7, 12, bolt);
    r(12, 1, 8, 6, c[13]);
    r(9, -2, 4, 5, bolt); r(19, -2, 4, 5, bolt);
    r(13, 3, 2, 2, c[31]); r(17, 3, 2, 2, c[31]);
    r(9, 7, 14, 14, c[10]); r(11, 9, 10, 10, c[13]);
    r(13, 11, 6, 7, bolt);
    r(5, 15, 6, 9, c[12]); r(21, 15, 6, 9, c[12]);
    r(3, 17, 4, 4, bolt); r(25, 17, 4, 4, bolt);
    r(9, 22, 5, 8, c[10]); r(18, 22, 5, 8, c[10]);
    if (atk) {
      r(0, 18, 32, 3, c[31]);
    }
  },
```
- **Floor 80 Phase 1 (`kraken_ward_tentacle`, `kraken_heal_tentacle`, `kraken_ink_tentacle`, `kraken_crush_tentacle`, Lines 1088–1175) & Phase 2 (`abyssal_kraken`, Lines 1176–1214):**
  *(ดูโค้ดเต็มใน `src/middle-sprites.js:1088-1214`; หนวดทั้ง 4 เส้นไม่ได้อยู่ใน `LARGE_BOSS_KINDS` จึงวาดที่ `scale = 1` ส่วน `abyssal_kraken` อยู่ใน `LARGE_BOSS_KINDS` จึงวาดที่ `scale = 2`)*
- **Floor 90 (`nether_dread_lord`, Lines 815–836):**
```js
  nether_dread_lord(r, c, pose, frame) {
    const atk = pose === 'attack';
    const glow = atk ? c[31] : c[18];
    r(11, 2, 10, 7, c[20]);
    r(7, -2, 4, 6, c[17]); r(21, -2, 4, 6, c[17]);
    r(5, -4, 3, 4, c[18]); r(24, -4, 3, 4, c[18]);
    r(13, 4, 2, 2, glow); r(17, 4, 2, 2, glow);
    r(0, 3, 11, 18, c[20]); r(2, 5, 7, 14, c[21]);
    r(21, 3, 11, 18, c[20]); r(23, 5, 7, 14, c[21]);
    r(8, 9, 16, 14, c[20]); r(10, 11, 12, 10, c[21]);
    r(13, 12, 6, 7, glow);
    r(4, 15, 6, 11, c[17]); r(22, 15, 6, 11, c[17]);
    r(8, 23, 6, 8, c[20]); r(18, 23, 6, 8, c[20]);
    if (atk) {
      r(0, 20, 32, 5, c[18]);
    }
  },
```
- **Floor 100 Phase 1–2 (`eternity_overlord`, Lines 1009–1043) & Phase 3 (`eternity_reborn`, Lines 1044–1085):**
  *(ดู `src/middle-sprites.js:1009-1085`; ใน `src/render.js:653` กำหนดให้ `eternity_overlord` และ `eternity_reborn` ใช้ `C` ตรงๆ แทน `palette` ที่เปลี่ยนตาม Floor)*

---

### 1.4 Boss Health Bar & Enemy Card UI (`src/ui/battle-render.js` & `src/ui/battle-fx.js` & `battle-ui.css`)

- **Enemy Card Positioning (`src/ui/battle-render.js:559`):**
  ```js
  style="--enemy-x:${positions.get(enemy.id) / 3.2}%;--enemy-y:${ENEMIES[enemy.kind]?.isBoss ? 42 : 56}%"
  ```
- **CSS Positioning (`battle-ui.css:251-263`):**
  ```css
  #enemy-list .enemy-card {
    position: absolute;
    --enemy-edge: clamp(28px, 11%, 75px);
    left: clamp(var(--enemy-edge), var(--enemy-x), calc(100% - var(--enemy-edge)));
    top: var(--enemy-y);
    translate: -50% -100%;
    max-width: min(150px, 22%);
  }
  ```
- **Floor 100 Special 3-Phase Boss Meter (`src/ui/battle-fx.js:34-64`):** `renderEternityMeter(health)` แสดงหลอด HP แยก 3 ช่วง (`[3500, 3500, 4500]`) เหนือสนามรบ

---

## 2. Rendering Architecture

### สรุปวิธีการแสดงผลจริงของ Major Boss ปัจจุบัน
Major Boss ทั้ง 10 ตัวใน Runtime ปัจจุบันใช้ **Procedural Rectangle-based Drawing (`fillRect` บน Grid 32×32)** เท่านั้น:
- ไม่ได้ใช้ PNG Sprite Assets (`this.spriteArt[originalKind]` เป็น `undefined` สำหรับบอส 10–100)
- ไม่ได้ใช้ Pixel Grid / RLE แบบ Summon V2
- วาดผ่าน `Battlefield.prototype.sprite()` (`src/render.js:609-656`) โดย Floor 10–20 วาดแบบ inline ใน `render.js` และ Floor 30–100 วาดผ่าน `middleSprites[kind]` ใน `src/middle-sprites.js`

### 2.1 Logical Resolution, Viewport Scaling & Image Smoothing
- **Canvas Size (`src/render.js:232` & `index.html`):** `320 × 180` logical pixels
- **Viewport Scaling (`battle-ui.css:231-242`):**
  ```css
  #battle-canvas {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: fill; image-rendering: pixelated;
  }
  ```
  (บน Viewport `1280 × 800` ขนาดเรนเดอร์จริงวัดได้ `598 × 336.38 CSS px` หรือ `1.86875×`)
- **Image Smoothing (`src/render.js:1096`):** `g.imageSmoothingEnabled = false;`

### 2.2 Ground Baseline, Enemy Positioning & Sprite Scaling (`src/render.js`)
- **Enemy X Positioning (`src/render.js:549-553`):**
  ```js
  enemyX(enemy, slot = enemy.slot) {
    if (this.state?.room >= FLOOR21_START_ROOM) return 126 + slot * 41;
    if (LARGE_BOSS_KINDS.has(enemy.kind)) return 235 + slot * 10;
    return this.state?.enemies.length === 1 ? 216 + slot * 17 : 149 + slot * 33;
  }
  ```
- **Ground Baseline:** Player วาดที่ `x = 51, baseline = 147` (`render.js:1203`); Enemy วาดที่ `baseline = 146` (`render.js:1329`)
- **Sprite Scale & Offset (`src/render.js:610-618`):**
  ```js
  const boss = LARGE_BOSS_KINDS.has(kind);
  const scale = boss ? 2 : 1;
  const bob = this.settings.reducedMotion ? 0 : [0, -1, 0, 1][frame % 4];
  const baseY = baseline - (boss ? 64 : 32) + bob;
  const left = Math.round(x - (boss ? 32 : 16));
  const r = (a, b, w, h, c) => { g.fillStyle = c; g.fillRect(left + a * scale, baseY + b * scale, w * scale, h * scale); };
  ```
- **Render Order / Z-Order (`src/render.js:1132-1445`):**
  1. `this.background` (`library-tower.png` ขนาด `320×180`)
  2. Boss ultimate strobe overlay (`1134-1146`)
  3. Magma puddles & Blackhole gravity wells (`1154-1167`)
  4. Grand Summon (ถ้า `grandBehindActors` เป็น true วาดก่อน Player/Enemy, แล้วค่อยวาดหลอด HP ทีหลัง)
  5. Player shadow + Caster aura + Player `wizard` sprite + Player shield dome (`1198-1251`)
  6. Normal/non-behind Summon (`1253-1255`)
  7. Loop `this.state.enemies` (`1257-1425`): Target ring → Attack afterimage → `this.sprite()` → Enemy Ward bubble → Chill/Freeze/Burn/Charge VFX
  8. Ambient dust particles & Active combat event VFX (`1428+`)

### 2.3 Palette System (`src/render.js:11` & `src/tower-enemy-art.js:1-37`)
- `PALETTE` (`C`) มี 32 สีตายตัว
- `towerArtPalette(floor, C)` ปรับสี `result[22]`, `result[23]` (และบาง Floor ปรับ `[25, 26]` / `[18, 30]` / `[21, 27]`) ตามช่วง Floor จากตาราง `WINGS`
- ยกเว้น `ember_overlord` / `tempest_archon` (ใช้ `C` ตรงๆ ใน `render.js`) และ `eternity_overlord` / `eternity_reborn` (`render.js:653` บังคับใช้ `C` ตรงๆ)

### 2.4 Animation Frame, Hit/Hurt & Death (`src/render.js`)
- **Frame Selection (`1115`):** `const frame = Math.floor((held ? this.started + eventStart + contactDelay : now) / 180) % 4;`
- **Pose Selection (`1316-1320`):** `'dead' | 'break' | 'attack' | 'exposed' | 'hurt' | 'charge' | 'ready' | 'ward' | 'idle'`
- **Hurt Shake (`1321`):** `hurt && frame % 2 && !this.settings.reducedMotion ? 3 : 0` (เลื่อน X +3px สลับเฟรม)
- **Dead (`619-622`):** วาดแถบเศษซากกว้าง `Math.max(4, 18 - frame % 4 * 3)` สูง `3px` ที่ `baseline - 3`

---

## 3. Summon V2 Implementation Reference

Summon V2 เป็นต้นแบบ Pipeline ที่โปรเจกต์ใช้เปลี่ยนจาก Procedural Polygon/Rect มาเป็น **Indexed Pixel Grid + Material Mapping + RLE Span Renderer + Centralized Size System**

### 3.1 Master Pixel Grid & Material Mapping (`src/dragon-art-v2.js`)
รูปแบบไฟล์ Grid 1 ตัวอักษรต่อ 1 Logical Pixel (`.` = โปร่งใส) พร้อมตาราง Material Mapping:
```js
// src/dragon-art-v2.js (40×34)
export const DRAGON_V2_MATERIALS = {
  i: ['ink', '#181b27'],
  d: ['bodyShadow', '#502634'],
  w: ['wingRib', '#743a44'],
  s: ['scale', '#a6494b'],
  l: ['scaleLight', '#d66a60'],
  m: ['membrane', '#b57a60'],
  n: ['membraneLight', '#dfa575'],
  b: ['belly', '#c39865'],
  p: ['bellyLight', '#edb983'],
  h: ['horn', '#f3d19b'],
  c: ['claw', '#f8dfb6'],
  e: ['core', '#ffc851'],
};
```
*(ดู `DRAGON_V2_GRID` 40×34 เต็มใน `src/dragon-art-v2.js:3-38`)*

### 3.2 RLE Span Conversion & Dynamic Element Palette (`src/summon-art.js`)
1. `pixelSpans(row)` (`lines 35-44`): แปลงแต่ละแถวของ `pixels` ให้เป็น Run-Length Encoded spans `[material, startX, endX]`
2. `indexedSummonArt(original, grid, materials)` (`lines 568-578`): แปลง `GRID` + `MATERIALS` เป็น `{ width, height, colors, pixels, rows, lift, grandScale }`
3. `tintMaterials(art, palette)` (`lines 635-665`):
   - **V2 Path (`palette.midtone`):** Normalize ค่า Luminance (`linearRgb` → `luminance`) เฉพาะ Body Materials (ยกเว้น `'ink'`, `'spark'`, `'core'`) แล้ว map เข้ากับ 3-stop ramp (`shadow` → `midtone` → `highlight`) จาก `FUSION_SUMMON_PALETTES` (`src/summon-palettes.js`)
4. `drawSummonArt(ctx, art, left, top, scale, elementPalette, showMark)` (`lines 683-701`):
   - วาดแต่ละ span ด้วย **Pixel Snapping** (`Math.round(row * scale)` และ `Math.round(start * scale)`) เพื่อป้องกันรอยแตก Sub-pixel เมื่อ Scale ไม่เป็นจำนวนเต็ม
   - Cache ผลลัพธ์ต่อ Palette ด้วย `WeakMap` (`elementalVariants`)

### 3.3 Size Class System & Bounds (`src/summon-sizes.js` & `src/render.js`)
- **`SUMMON_SIZE_V2` (`src/summon-sizes.js:7-50`):** แบ่ง 6 Size Classes (`XS`, `S`, `M`, `L`, `XL`, `XXL`) แยก `normalScale`, `grandScale`, `normalOffset`, `grandOffset` อิสระจาก Combat Stats และ Palette
- **`getOpaqueBounds(art)` (`src/summon-sizes.js:52-67`):** สแกน `art.pixels` หา Tight Bounding Box ของพิกเซลที่ไม่โปร่งใส (`minX, minY, maxX, maxY, width, height`)
- **`resolveCreatureScale` & `resolveCreatureOffset` (`src/summon-sizes.js:69-80`):** คำนวณ Scale และ Anchor Offset ตาม `sizeV2` และ `phoenixV2` flags
- **Anchor & Bounds (`src/render.js:183-210`):** `NORMAL_SUMMON_ANCHOR = { x: 88, baseline: 147 }`, `GRAND_SUMMON_ANCHOR = { x: 78, baseline: 143 }`, คำนวณ `getSummonBounds` และ `getSummonHudLayout` เพื่อวาง `.summon-card` อัตโนมัติไม่ให้ชนขอบบน

### 3.4 Developer Toggles & Visual Testing Tools
- **URL Query Flags (`src/app.js:127-134`):** ทำงานเฉพาะบน `localhost`:
  - `?fusionVisuals=v2` (`v2`)
  - `?dragonArt=v2` (`dragonV2`)
  - `?phoenixArt=v2` (`phoenixV2`)
  - `?summonSize=v2` (`sizeV2`)
- **Visual Labs:**
  - `dev/dragon-lab.html`: ทดสอบ Summon Size V2 ครบ 27 species (XS → XXL), เปรียบเทียบ V1 vs V2, ทดสอบทุก Element/Fusion Palette, ปรับ Scale แบบ Live พร้อม Production `Battlefield` และ HUD
  - `dev/fusion-lab.html`: ทดสอบ Fusion Palette V2

---

## 4. Existing Character Art References

รวบรวมภาพอ้างอิงที่สกัดจากตัวเรนเดอร์จริงของเกม (ทั้ง Native Pixel และ 4× Nearest-neighbor) เพื่อใช้กำหนด Art Direction ให้ Major Boss V2 สอดคล้องกับงานศิลปะของเกม:

| Category | Reference Name | Native Size | Files |
|---|---|---|---|
| **Player** | Wizard (`wizard`) | `28 × 32 px` | [native](references/player-wizard-native.png) · [4×](references/player-wizard-4x.png) |
| **Representative Mob** | Sand Stalker (`sand_stalker`, F66–69) | `30 × 22 px` | [native](references/mob-sand-stalker-native.png) · [4×](references/mob-sand-stalker-4x.png) |
| **Representative Sub-boss** | Seam Warden (`seam_warden`, F45) | `48 × 48 px` | [native](references/subboss-seam-warden-native.png) · [4×](references/subboss-seam-warden-4x.png) |
| **Dragon V2 (Master Ref)** | `DRAGON_ART_V2` (Base) | `40 × 34 px` | [native](references/dragon-v2-base-native.png) · [4×](references/dragon-v2-base-4x.png) |
| **Dragon V2 (Fusion Tint)** | `DRAGON_ART_V2` (`magma`) | `40 × 34 px` | [native](references/dragon-v2-magma-native.png) · [4×](references/dragon-v2-magma-4x.png) |
| **High-Detail Summon V2** | `PHOENIX_ART_V2` (Base) | `54 × 45 px` | [native](references/phoenix-v2-base-native.png) · [4×](references/phoenix-v2-base-4x.png) |
| **High-Detail Summon V2 (Tint)** | `PHOENIX_ART_V2` (`plasma`) | `54 × 45 px` | [native](references/phoenix-v2-plasma-native.png) · [4×](references/phoenix-v2-plasma-4x.png) |
| **Existing Major Bosses (F10–100)** | All 10 Floors + F80 P1 + F100 P3 | `60–72 × 62–74 px` | [Sheet A (Scale)](boss-actual-scale-comparison.png) · [Sheet B (8× Design)](boss-isolated-design-contact-sheet.png) · [sprites/](sprites/) |
