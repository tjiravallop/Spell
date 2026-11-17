# Project

The active game is in `spell-foundry-merged-floors-5-8/`. Read its `GAME_PLAN.md` and run game commands from that folder.
Use retro 16-bit pixel art. Support desktop and mobile together.
Word order and repetition change spells. Forecasts must match actual combat.
Keep seven words, four spell slots, six rooms, seeded rewards, and local saves.

## Local skills

Skills are installed in `.agents/skills/`. Read only the skills relevant to the task.

- `phaser-core`: Phaser scenes, loading, animation setup, and pixel rendering if using Phaser. Installation alone does not select or install an engine.
- `game-ai`: enemy intents and behavioral states. Prefer a small state machine.
- `save-systems`: local saves, restore validation, and bounded offline progression.
- `create-game-assets`: consistent pixel grid, palette, sprite dimensions, animation families, and asset provenance.
- `create-game-vfx`: readable effects for casts, contact, blocks, and statuses. Apply the principles to the game's Canvas 2D renderer.
- `gamedev-vfx-impact`: synchronize hit visuals, sound, and brief impact holds.
- `game-feel`: scale feedback to the event and support reduced motion.
- `pixelfx`: preview, recolor, and export pixel-art effects for the Canvas 2D renderer.
- `audio-design`: sound feedback, mixing, and browser audio behavior.
- `game-ui-ux`: readable status displays, controls, responsive layout, and accessibility.
- `performance-optimization`: measure browser performance and keep rendering and simulation lightweight.
- `impeccable`: UI design and visual review. Preserve the requested retro spellcraft aesthetic.

Use the existing Ponytail workflow. Do not add another workflow framework or install additional tools unless the task needs them.
Verify interaction, saving, and rendering in a real browser when a playable build exists.
