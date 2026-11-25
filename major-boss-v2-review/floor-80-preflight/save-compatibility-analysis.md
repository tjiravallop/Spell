# Floor 80 Internal ID & Save Compatibility Analysis

## 1. Scope of Existing References

Across `src/` and `test/`, the internal IDs `abyssal_kraken` and `KRAKEN_TENTACLE_KINDS` (`kraken_ward_tentacle`, `kraken_heal_tentacle`, `kraken_ink_tentacle`, `kraken_crush_tentacle`) are deeply wired into:
- **Encounter & Room Data**: `src/endgame-tower.js` (`ENDGAME_ENEMIES`, `KRAKEN_TENTACLE_KINDS`, room `199`).
- **Combat & AI**: `src/combat.js` (`canShockKraken` conductivity passive, `isSpecialBoss`, `KRAKEN_TENTACLE_KINDS` phase 2 trigger) and `src/run.js` (`FLOOR80_BOSS_ROOM = 199`, `prepareEnemies`, `triggerKrakenPhase2`, `intent` 4-turn schedule, `isMajorClimaxRelease`).
- **Save Validation**: `src/save.js` (`SAVE_KEY = 'spell-foundry.run.v2'`, `validateRun` checking `state.krakenPhase === 2 || completedKraken` -> `expectedKinds = ['abyssal_kraken']` and `enemy.kind === expectedKinds[index]`).
- **Profile / Bestiary / Audio / VFX**: `src/audio.js`, `src/render.js` (`LARGE_BOSS_KINDS`, `drawEnemyAttackVfx`, `boss-phase`), `src/ui/battle-fx.js`, `src/ui/battle-render.js`, `src/upper-tower.js`.
- **Tests**: `test/endgame-tower.test.js` (extensive Floor 80 Phase 1, Phase 2, conductivity, and save roundtrip tests) and `test/features-speed-bestiary-audio.test.js` (bestiary set roundtrip with `'abyssal_kraken'`).

## 2. Recommendation: Option A — Preserve All Internal IDs

**Strongly recommend Option A: Preserve all original internal IDs** (`abyssal_kraken`, `kraken_ward_tentacle`, `kraken_heal_tentacle`, `kraken_ink_tentacle`, `kraken_crush_tentacle`, `state.krakenPhase`, `FLOOR80_BOSS_ROOM = 199`) and change **only**:
1. Visual art (`BOSS_ART_V2.abyssal_kraken` and tentacle V2 definitions when `bossArt=v2` is enabled, or when promoted).
2. Visible display names/flavor text in `ENDGAME_ENEMIES`, `ENEMY_TRAITS`, `battle-fx.js`, and `triggerKrakenPhase2` labels (only in the future implementation phase, NOT in B8.0).

**Why Option A is safest**:
- Zero risk of breaking existing `spell-foundry.run.v2` local saves mid-Floor 80 or in `post80` sanctuary (`completedKraken` check).
- Zero risk of breaking `spell-foundry.profile.v1` bestiary records (`accountBestiary`).
- Zero churn in `combat.js`, `run.js`, `save.js`, and `endgame-tower.test.js` mechanics assertions.
- Note: Summon `kraken` (`SUMMON_ART.kraken`) is a completely separate player summon creature ID and is unaffected.
