# Floor 80 Technical Audit — Source Extracts

All excerpts below are verbatim from the current working tree under `spell-foundry-merged-floors-5-8/`.

## 1. Tentacle & Boss Definitions (`src/endgame-tower.js`)

Lines `3–8` and `49–53`:
```js
export const KRAKEN_TENTACLE_KINDS = Object.freeze([
  'kraken_ward_tentacle',
  'kraken_heal_tentacle',
  'kraken_ink_tentacle',
  'kraken_crush_tentacle',
]);

  kraken_ward_tentacle: { name: 'หนวดม่านวารี', hp: 1000, armor: 4, ward: 1, attack: 38, color: '#00b4d8', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_heal_tentacle: { name: 'หนวดฟื้นสมุทร', hp: 950, armor: 3, ward: 0, attack: 34, color: '#2ec4b6', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_ink_tentacle: { name: 'หนวดหมึกดำบาดาล', hp: 1050, armor: 3, ward: 0, attack: 42, color: '#5a189a', exp: 40, gold: 35, isBoss: true, affinity: 'water' },
  kraken_crush_tentacle: { name: 'หนวดยักษ์บดขยี้', hp: 1250, armor: 5, ward: 0, attack: 52, color: '#023e8a', exp: 45, gold: 40, isBoss: true, affinity: 'water' },
  abyssal_kraken: { name: 'มหาคราเค่นแห่งห้วงบาดาล', hp: 4600, armor: 5, ward: 1, attack: 72, color: '#0077b6', exp: 280, gold: 260, isBoss: true, affinity: 'water' },
```

Lines `389–390` (Room `199` formation):
```js
    // Floor 80★ Major Boss (room 199): 4 Kraken Tentacles -> True Abyssal Kraken Phase 2
    ['kraken_ward_tentacle', 'kraken_heal_tentacle', 'kraken_ink_tentacle', 'kraken_crush_tentacle'],
```

## 2. Room Constant & Turn Preparation (`src/run.js`)

Line `2058`:
```js
export const FLOOR80_BOSS_ROOM = 199;
```

Lines `2496–2500` (`prepareEnemies`):
```js
    if (enemy.kind === 'abyssal_kraken') {
      const phase = state.turn % 4;
      enemy.ward = enemy.hp > 0 && (phase === 1 || phase === 3) ? 1 : 0;
      enemy.armor = phase === 1 ? 5 : phase === 2 ? 6 : phase === 3 ? 4 : 0;
    }
```

## 3. Phase 2 Transition (`src/run.js` & `src/combat.js`)

`src/run.js` lines `2676–2699`:
```js
export function triggerKrakenPhase2(state, summary = null, events = null) {
  state.krakenPhase = 2;
  delete state.magmaPuddles;
  delete state.blackhole;
  const kraken = createEnemy('abyssal_kraken', 0);
  kraken.slot = 2;
  state.enemies = [kraken];
  if (events) {
    events.push({
      type: 'boss-phase',
      source: kraken.id,
      sourceKind: 'abyssal_kraken',
      phase: 2,
      label: '🐙 หนวดทั้งสี่ขาดสะบั้น! มหาคราเค่นแห่งห้วงบาดาลปรากฏร่างจริง!',
    });
  }
  if (summary) {
    summary.krakenPhase2 = true;
    if (Array.isArray(summary.sequence)) {
      summary.sequence.push('🐙 หนวดทั้งสี่ขาดสะบั้น! มหาคราเค่นแห่งห้วงบาดาล (4,600 HP) โผล่ขึ้นจากห้วงบาดาล!');
    }
  }
  return kraken;
}
```

`src/run.js` lines `4781–4786` (item/non-cast kill path) and `src/combat.js` lines `4083–4088` (spell cast path):
```js
// src/run.js:4781-4786
    if (state.enemies.every(e => e.hp <= 0)) {
      if (!state.krakenPhase && state.enemies.some(e => KRAKEN_TENTACLE_KINDS.includes(e.kind))) {
        triggerKrakenPhase2(state, summary, events);
        prepareEnemies(state);
        return totalDmg;
      }

// src/combat.js:4083-4088
  const krakenPhase2Triggered = player.hp > 0 && !live().length
    && !state.krakenPhase && state.enemies.some(enemy => KRAKEN_TENTACLE_KINDS.includes(enemy.kind));
  if (krakenPhase2Triggered) {
    nextMagmaPuddles.clear();
    triggerKrakenPhase2(state, summary, events);
  }
```

## 4. Tentacle & Kraken Combat Intents (`src/run.js`)

Lines `5029–5062`, `5165–5167`, `5268–5274`, `5530–5547`:
```js
  // Floor 80★ Kraken Tentacles (Phase 1): distinct cooldown roles
  if (enemy.kind === 'kraken_ward_tentacle' && turn % 2 === 1) {
    const allies = enemies.filter(other => other.id !== enemy.id && other.hp > 0);
    if (allies.length) {
      if (enemy.sealed) return { type: 'sealed', amount: 0, label: 'ติดผนึก · ข้ามการกางม่านให้หนวดอื่น' };
      return {
        type: 'ward-grant-all',
        amount: 1,
        targets: allies.map(other => other.id),
        shortLabel: `ม่าน ×${allies.length}`,
        label: `กางม่านวารี +1 ชั้นให้หนวดเส้นอื่นทั้งหมด (${allies.length} เส้น) ในเทิร์นถัดไป · คูลดาวน์ 2 เทิร์น`,
      };
    }
  }
  if (enemy.kind === 'kraken_heal_tentacle' && turn % 2 === 0) {
    const injured = enemies
      .filter(other => other.hp > 0 && other.hp < other.maxHp)
      .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp || a.slot - b.slot)[0];
    if (injured) {
      if (enemy.sealed) return { type: 'sealed', amount: 0, label: 'ติดผนึก · ข้ามการฟื้นฟูหนวด' };
      return {
        type: 'heal',
        amount: 220,
        target: injured.id,
        shortLabel: `ฮีล #${injured.slot + 1} +220`,
        label: `ฟื้นฟู +220 HP ให้ ${ENEMIES[injured.kind].name} (ช่อง ${injured.slot + 1}) · คูลดาวน์ 2 เทิร์น`,
      };
    }
  }
  if (enemy.kind === 'kraken_crush_tentacle' && cycle === 2) {
    if (enemy.freeze > 0) return { type: 'frozen', amount: 0, label: 'แช่แข็ง · ข้ามการชาร์จ' };
    const next = Math.max(0, 92 + enemyClimaxBonus(turn + 1, room) - (enemy.chill || 0) - (enemy.obscured ? 4 : 0));
    return { type: 'charge', amount: 0, shortLabel: `ชาร์จ ${next}`, label: `ยกหนวดยักษ์บดขยี้ · เทิร์นหน้าฟาดหนัก ${next}!` };
  }
```

## 5. Lightning Conductivity Passive (`src/combat.js`)

Lines `856–871`:
```js
    const hasLightningElement = elements.some(id => getElementComponents(id).includes('lightning'));
    const canShockKraken = enemy.kind === 'abyssal_kraken'
      || (enemy.kind === 'void_kraken_leviathan' && !live().some(ally => ally.kind === 'void_rift_tentacle'));
    if (canShockKraken && hasLightningElement && enemy.hp > 0) {
      damage(enemy, 15, 'lightning', enemy.armor);
      const alreadyShocked = enemy.abyssalShockUntil >= turn + 1;
      enemy.abyssalShockUntil = turn + 1;
      if (!alreadyShocked && enemy.armor > 0) {
        const reduced = Math.min(enemy.armor, 2);
        enemy.armor = Math.max(0, enemy.armor - reduced);
        events.push({ type: 'armor-shred', target: enemy.id, amount: reduced, armor: enemy.armor });
        summary.sequence.push(`สายฟ้าช็อตผิวน้ำบาดาล · +15 ดาเมจทะลุเกราะ และลดเกราะ −${reduced} (เหลือ ${enemy.armor})`);
      } else {
        summary.sequence.push('สายฟ้าช็อตผิวน้ำบาดาล · +15 ดาเมจทะลุเกราะ');
      }
    }
```

## 6. Save Validation (`src/save.js`)

Lines `245–261`:
```js
  const completedKraken = state.room === FLOOR80_BOSS_ROOM && !state.rift
    && state.phase === 'sanctuary' && state.enemies?.length === 1
    && state.enemies[0]?.kind === 'abyssal_kraken' && state.enemies[0]?.hp === 0;
  const expectedKinds = gearRiftStage3Kinds
    ? gearRiftStage3Kinds
    : (state.krakenPhase === 2 || completedKraken)
      ? ['abyssal_kraken']
      : (state.eternityPhase === 3 || completedEternity)
        ? ['eternity_reborn']
        : state.rooms[state.room];
  if (!Array.isArray(state.enemies) || state.enemies.length !== expectedKinds.length) invalid();
  state.enemies.forEach((enemy, index) => {
    if (!object(enemy) || enemy.id !== `enemy-${index}` || enemy.kind !== expectedKinds[index]) invalid();
```
