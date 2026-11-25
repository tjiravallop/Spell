# Component Definition Example

```js
export const EXAMPLE_BOSS_DEF = Object.freeze({
  grid: BODY_GRID,
  materials: {
    k: ['ink', '#120b18'],
    b: ['body', '#4b305c'],
    w: ['wing', '#2e9ef5'],
    f: ['flame', '#f26a1b'],
  },
  parts: {
    // Wing attached to shoulder at master (20, 14), local joint (4, 6), drawn behind body
    leftWing: {
      anchor: { x: 20, y: 14 },
      joint: { x: 4, y: 6 },
      z: 'behind',
      frames: [WING_UP_GRID, WING_MID_GRID, WING_DOWN_GRID, WING_MID_GRID],
    },
    // Floating flame crown drawn in front of body
    crownFlame: {
      anchor: { x: 16, y: 2 },
      z: 'front',
      frames: [FLAME_0, FLAME_1],
    },
  },
  animate({ frame, attacking, reducedMotion, colors }) {
    const rm = Boolean(reducedMotion);
    return {
      materialOverrides: attacking ? { flame: '#fff29c' } : null,
      partStates: {
        leftWing: { frame: rm ? 0 : frame % 4, dx: 0, dy: 0 },
        crownFlame: { frame: rm ? 0 : frame % 2, dx: 0, dy: rm ? 0 : -1 },
      },
      effects: [],
    };
  },
});
```
