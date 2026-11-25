# Regression Verification Results (Phase B8.0)

- **Command**: `node --test test/*.test.js`
- **Before Migration**: `316/316` passing (`0` failures, `0` skipped).
- **After Migration**: **`351/351` passing** (`0` failures, `0` skipped).
- **Stale Reference Check**: `Select-String` across `src/` and `test/` for `abyssal_kraken`, `kraken_ward_tentacle`, `kraken_heal_tentacle`, `kraken_ink_tentacle`, `kraken_crush_tentacle`, `KRAKEN_TENTACLE_KINDS`, `triggerKrakenPhase2`, `krakenPhase`, `completedKraken` returned **0 matches**.
- **Verified Suites**:
  - `test/endgame-tower.test.js`: Floor 80 Phase 1 (4 Water tentacles), Phase 1 → Phase 2 transition (spell & item), Phase 2 `abyssal_cthulhu` 4-turn schedule, Lightning conductivity (`+15` dmg & `-2` armor), save/load roundtrip, and `gaia_emblem_80` victory.
  - `test/features-speed-bestiary-audio.test.js`: Bestiary roundtrip with `abyssal_cthulhu` and audio cue mapping for `abyssal_cthulhu` and `cthulhu_ink_tentacle`.
  - Floor 10–70 Boss V2 (`ember-overlord`, `tempest-archon`, `boss-art-v2`, `loom-sovereign`, `mirror-regent`, `volcano-colossus`, `thunder-drake-emperor`) and Summon V2 suites all pass unchanged.
