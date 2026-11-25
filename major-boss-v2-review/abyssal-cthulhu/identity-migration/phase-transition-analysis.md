# Floor 80 Phase Transition Analysis (Post-B8.0)

- **Trigger**: Unchanged — all 4 `CTHULHU_TENTACLE_KINDS` must reach `hp <= 0` while `player.hp > 0` and `!state.cthulhuPhase` (`src/combat.js:4083–4088`, `src/run.js:4782–4786`).
- **Transition Function**: `triggerCthulhuPhase2(state, summary, events)` (`src/run.js:2676–2699`):
  - Sets `state.cthulhuPhase = 2`.
  - Clears `state.magmaPuddles` and `state.blackhole`.
  - Replaces `state.enemies` with `[createEnemy('abyssal_cthulhu', 0)]` (`slot = 2`, fresh `4,600 HP`).
  - Preserves player HP/mana/hand/deck and active player summons.
- **Emitted Event**:
  - `{ type: 'boss-phase', source: cthulhu.id, sourceKind: 'abyssal_cthulhu', phase: 2, label: '🐙 หนวดทั้งสี่ขาดสะบั้น! มหาเทพอสูรแห่งห้วงบาดาลปรากฏร่างจริง!' }`
- **Event Consumers Verified**:
  - `src/render.js:1866–1912`: Water tidal surge + expanding cyan rings at `(208, 126)` (respects `reducedMotion`).
  - `src/ui/battle-fx.js:785–801`: `discover` SFX, `boss-ultimate` camera shake, `water` elemental overlay, status banner text.
