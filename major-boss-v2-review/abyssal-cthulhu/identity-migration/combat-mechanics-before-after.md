# Floor 80 Combat Mechanics — Before vs After

All Phase 1 and Phase 2 combat statistics, schedules, and passives were verified directly against `src/endgame-tower.js`, `src/run.js`, and `src/combat.js` and remain **100% unchanged**.

## Phase 1 (Room `199`, Slots `0..3`, Water Affinity)

| Actor | HP | Armor | Ward | Attack | Before & After Behavior |
|---|---|---|---|---|---|
| `cthulhu_ward_tentacle` | 1000 | 4 | 1 | 38 | Odd turns (`turn % 2 === 1`): `ward-grant-all` `+1` Ward to all other live tentacles (`sealed` blocks) |
| `cthulhu_heal_tentacle` | 950 | 3 | 0 | 34 | Even turns (`turn % 2 === 0`): heals lowest-HP% live tentacle `+220 HP` (`burn`/heal-cut halves, `sealed` blocks) |
| `cthulhu_ink_tentacle` | 1050 | 3 | 0 | 42 | `turn % 3 === 2`: Ink Siphon `42` dmg + `manaDrain: 2` (`-2 MP`) |
| `cthulhu_crush_tentacle` | 1250 | 5 | 0 | 52 | 3-turn cycle: `cycle 1` 52 dmg → `cycle 2` Charge → `cycle 0` Heavy Slam `92` dmg |

## Phase 2 (`abyssal_cthulhu`, Slot `2`, Water Affinity)

- **HP**: `4,600` (`exp: 280`, `gold: 260`, `isBoss: true`, `affinity: 'water'`)
- **4-Turn Schedule**:
  - Turn 1 (`turn % 4 === 1`): Armor `5`, Ward `1`, Attack `72`
  - Turn 2 (`turn % 4 === 2`): Armor `6`, Ward `0`, Attack `58` + `selfHeal: 120`
  - Turn 3 (`turn % 4 === 3`): Armor `4`, Ward `1`, `charge`
  - Turn 4 (`turn % 4 === 0`): Armor `0`, Ward `0` (Exposed `+35%` spell damage), Tsunami `108` (`isMajorClimaxRelease`)
- **Lightning Conductivity Passive** (`src/combat.js:857`): Any Lightning element hit deals `+15` armor-piercing damage and reduces Armor by `-2` until next turn (`abyssalShockUntil`).
