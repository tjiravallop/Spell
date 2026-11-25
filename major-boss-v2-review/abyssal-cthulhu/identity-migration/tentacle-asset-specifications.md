# Phase 1 Tentacle Asset Specifications (Future B8.1)

All 4 tentacles are **independently targetable combat actors** (`isBoss: true`, `affinity: 'water'`) at Phase 1 anchors `X126`, `X167`, `X208`, `X249` (41 px center-to-center spacing, `baseline = 146`).

| Actor ID | Slot / Anchor X | Native Grid | Gameplay Dimensions | Required States | Signature Visuals |
|---|---|---|---|---|---|
| `cthulhu_ward_tentacle` | Slot 0 / `X126` | `44×48` | `~40×48 px` | `idle`, `attack`, `hurt`, `dead`, `reducedMotion` | Coiling abyssal prism tentacle + floating water-ward rune ring |
| `cthulhu_heal_tentacle` | Slot 1 / `X167` | `44×48` | `~40×48 px` | `idle`, `attack`, `hurt`, `dead`, `reducedMotion` | Twin-tendril cradle holding a pulsing bioluminescent sea pearl |
| `cthulhu_ink_tentacle` | Slot 2 / `X208` | `44×48` | `~40×48 px` | `idle`, `attack`, `hurt`, `dead`, `reducedMotion` | Dark violet-indigo siphon stalk + glowing mana-drain nozzle & ink drips |
| `cthulhu_crush_tentacle` | Slot 3 / `X249` | `44×48` | `~40×48 px` | `idle`, `charge`, `attack`, `hurt`, `dead`, `reducedMotion` | Heavy barnacle-armored spiked club; rises in `charge`, slams in `attack` |

- **Spacing & Envelope Constraint**: Keep each tentacle's animated horizontal envelope `<= 42 px` wide (`<= 21 px` from anchor) so adjacent tentacles remain cleanly separated for mouse/touch `hitTest` and Ward bars.
