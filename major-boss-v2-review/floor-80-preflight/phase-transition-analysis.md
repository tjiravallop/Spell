# Floor 80 Phase Transition Analysis

## 1. Exact Transition Trigger

Phase 2 triggers when **all 4 Phase 1 tentacles** (`KRAKEN_TENTACLE_KINDS`) reach `hp <= 0` while `player.hp > 0` and `!state.krakenPhase`:
- **Spell cast path**: `src/combat.js:4083–4088` checks `player.hp > 0 && !live().length && !state.krakenPhase && state.enemies.some(enemy => KRAKEN_TENTACLE_KINDS.includes(enemy.kind))` and calls `triggerKrakenPhase2(state, summary, events)`.
- **Item / non-cast damage path**: `src/run.js:4781–4786` checks `state.enemies.every(e => e.hp <= 0)` and `!state.krakenPhase && state.enemies.some(e => KRAKEN_TENTACLE_KINDS.includes(e.kind))`, calling `triggerKrakenPhase2(state, summary, events)` followed by `prepareEnemies(state)`.

## 2. Actor Replacement & State Reset

Inside `triggerKrakenPhase2` (`src/run.js:2676–2699`):
- **Actor lifecycle**: Existing tentacle actors are **replaced** (`state.enemies = [kraken]`) by a brand-new `createEnemy('abyssal_kraken', 0)` instance with `id = 'enemy-0'` and `slot = 2`.
- **HP, armor, and status transfer**: **None** — `abyssal_kraken` spawns fresh at `4600 HP`, `armor: 5`, `ward: 1`, with zero inherited burn/chill/freeze/sealed statuses.
- **Battlefield hazards**: `delete state.magmaPuddles`, `delete state.blackhole` (and `nextMagmaPuddles.clear()` in `combat.js`).
- **Summoned creatures**: **Remain active** (`clearSummon(state)` is NOT called during `triggerKrakenPhase2`, only on defeat or full battle victory).
- **Turn & combat state**: `state.krakenPhase = 2` is set; `state.turn` and `state.phase === 'battle'` remain unchanged.

## 3. Existing Animation Event & Reduced-Motion Behavior

- `triggerKrakenPhase2` pushes `{ type: 'boss-phase', source: kraken.id, sourceKind: 'abyssal_kraken', phase: 2, label: '...' }`.
- **UI/FX handler** (`src/ui/battle-fx.js:785–801`):
  - Plays `audio.play('discover')`.
  - Calls `triggerCameraScreenShake('boss-ultimate', 'abyssal_kraken')` (skipped if `reducedMotion`).
  - Calls `pulseElementalOverlay('water', 65, 58, { grand: true, withVignette: true })`.
  - Updates status bar text to `event.label`.
- **Canvas renderer** (`src/render.js:1866–1912`):
  - When `!this.settings.reducedMotion`, draws a rising `water` tidal surge (`tideH = Math.round(wave * 44)` across `y: 150 - tideH .. 150`), `drawElementalImpactFlash(208, 126, 'water', fraction, 1.8)`, and expanding cyan/white `pixelCircle` rings at `(208, 126)`.
  - When `reducedMotion` is enabled, the tidal surge and expanding rings are suppressed, while the phase popup text and boss swap still occur cleanly.

## 4. Visual-Only Awakening Sequence Feasibility

A **visual-only awakening sequence** (e.g., Abyssal Cthulhu emerging from the trench / unfurling wings / tentacle splash) can be implemented using the existing `boss-phase` event hook in `src/render.js` (`event.type === 'boss-phase' && event.sourceKind === 'abyssal_kraken'`) and `animate()` (`pose` / `progress`) without altering combat timing, `triggerKrakenPhase2`, or save state.
