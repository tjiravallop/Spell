import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BOSS_ART_V2, evaluateBossAnimation, resolveBossArt } from '../src/boss-art-v2.js';
import { BOSS_SIZE_V2, getBossVisualBounds } from '../src/boss-sizes.js';
import { netherEventKind } from '../src/boss-art/nether-combat-vfx.js';
import { Battlefield } from '../src/render.js';
import { simulateTurn } from '../src/combat.js';
import {
  FLOOR90_BOSS_ROOM,
  NETHER_PILLAR_KINDS,
  checkNetherPhase2,
  createEnemy,
  enterRoom,
  createRun,
} from '../src/run.js';

function createMockCanvas() {
  const ctx = {
    fillStyle: '#000000',
    strokeStyle: '#000000',
    lineWidth: 1,
    globalAlpha: 1,
    fillRect() {},
    strokeRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    save() {},
    restore() {},
    translate() {},
    drawImage() {},
    fillText() {},
  };
  return {
    width: 320,
    height: 180,
    getContext() { return ctx; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 320, height: 180 }; },
  };
}

function makeFloor90State() {
  if (!globalThis.Image) {
    globalThis.Image = class {
      set src(_) {}
    };
  }
  if (!globalThis.document) {
    globalThis.document = {
      createElement: () => createMockCanvas(),
    };
  }
  if (!globalThis.requestAnimationFrame) {
    globalThis.requestAnimationFrame = () => 0;
  }
  const base = createRun('floor90-test');
  base.room = FLOOR90_BOSS_ROOM;
  return enterRoom(base);
}

describe('Floor 90 Nether Dread Lord V2 integration', () => {
  it('registers all four Floor 90 actors in BOSS_ART_V2 and BOSS_SIZE_V2 while keeping V1 default', () => {
    const ids = ['nether_dread_lord', ...NETHER_PILLAR_KINDS];
    for (const id of ids) {
      assert.ok(BOSS_ART_V2[id], `missing BOSS_ART_V2[${id}]`);
      assert.ok(BOSS_SIZE_V2[id], `missing BOSS_SIZE_V2[${id}]`);
      assert.equal(resolveBossArt(id, null), null);
      assert.equal(resolveBossArt(id, { v2: false }), null);
      assert.equal(resolveBossArt(id, { v2: true }), BOSS_ART_V2[id]);
    }
    const boss = BOSS_ART_V2.nether_dread_lord;
    const p1 = evaluateBossAnimation(boss, { frame: 0, netherPhase: 1, unsealed: false });
    assert.equal(p1.partStates.soulAuraRear.visible, false);
    const p2 = evaluateBossAnimation(boss, { frame: 0, netherPhase: 2, unsealed: true });
    assert.equal(p2.partStates.soulAuraRear.visible, true);
  });

  it('uses Floor 90 rear formation only when V2 bossVisuals is enabled', () => {
    const state = makeFloor90State();
    const v1 = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: false });
    v1.state = state;
    assert.deepEqual(v1.positions(), [126, 167, 249, 290]);

    const v2 = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: true });
    v2.state = state;
    assert.deepEqual(v2.positions(), [226, 172, 220, 268]);

    const bossMetrics = getBossVisualBounds('nether_dread_lord', 226, 146, 0, BOSS_ART_V2.nether_dread_lord, { v2: true });
    assert.ok(bossMetrics.sealLeft && bossMetrics.sealCenter && bossMetrics.sealRight);
    assert.ok(bossMetrics.weapon && bossMetrics.chest && bossMetrics.ground);
  });

  it('handles broken-seal and sacrifice phase transitions with exact sacrificedIds and summon preservation', () => {
    // Broken seal
    const sBroken = makeFloor90State();
    sBroken.player.summon = { creatureId: 'wolf', name: 'หมาป่า', element: 'fire', hp: 30, maxHp: 30, armor: 0, ward: 0 };
    for (const e of sBroken.enemies) if (NETHER_PILLAR_KINDS.includes(e.kind)) e.hp = 0;
    const brokenEvents = [];
    const brokenRes = checkNetherPhase2(sBroken, { sequence: [] }, brokenEvents);
    assert.equal(brokenRes, true);
    assert.equal(sBroken.netherPhase, 2);
    assert.equal(brokenEvents[0].mode, 'broken');
    assert.ok(sBroken.player.summon);

    // Sacrifice with 1 prior kill -> 2 surviving pillars
    const sSac = makeFloor90State();
    sSac.player.summon = { creatureId: 'dragon', name: 'มังกร', element: 'fire', isGrand: true, hp: 50, maxHp: 50, armor: 0, ward: 0 };
    const boss = sSac.enemies.find(e => e.kind === 'nether_dread_lord');
    const leech = sSac.enemies.find(e => e.kind === 'nether_leech_pillar');
    const curse = sSac.enemies.find(e => e.kind === 'nether_curse_pillar');
    const doom = sSac.enemies.find(e => e.kind === 'nether_doom_pillar');
    leech.hp = 0; // prior kill
    boss.hp = Math.floor(boss.maxHp / 2);
    boss.healCutUntil = sSac.turn; // heal cut active
    const sacEvents = [];
    const sacRes = checkNetherPhase2(sSac, { sequence: [] }, sacEvents);
    assert.equal(sacRes, true);
    assert.equal(sSac.netherPhase, 2);
    assert.equal(sacEvents[0].mode, 'sacrifice');
    assert.equal(sacEvents[0].sacrificed, 2);
    assert.deepEqual(sacEvents[0].sacrificedIds, [curse.id, doom.id]);
    assert.equal(sacEvents[0].healed, 350); // 2 * 350 / 2 due to healCut
    assert.ok(sSac.player.summon);
  });

  it('emits nether-purge on Fire/Lightning hit even at zero armor', () => {
    const state = makeFloor90State();
    const boss = state.enemies.find(e => e.kind === 'nether_dread_lord');
    boss.armor = 0;
    boss.ward = 0;
    state.player.hand = ['shot', 'fire'];
    state.player.mana = 12;
    const res = simulateTurn(state, ['shot', 'fire'], boss.id);
    const purgeEv = res.events.find(e => e.type === 'nether-purge' && e.target === boss.id);
    assert.ok(purgeEv);
    assert.equal(purgeEv.element, 'fire');
    assert.equal(res.summary.enemyStatus[boss.id].netherPurgeUntil, state.turn + 1);
  });

  it('tracks presentation snapshots for netherPhase, sacrificedIds, and netherEventKind mappings', () => {
    const state = makeFloor90State();
    const boss = state.enemies.find(e => e.kind === 'nether_dread_lord');
    const curse = state.enemies.find(e => e.kind === 'nether_curse_pillar');
    const doom = state.enemies.find(e => e.kind === 'nether_doom_pillar');
    state.netherPhase = 2; // final post-simulation state
    curse.hp = 0;
    doom.hp = 0;

    const bf = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: true });
    bf.state = state;
    const events = [
      { type: 'attack', source: doom.id, sourceKind: 'nether_doom_pillar', target: 'summon', amount: 10 },
      { type: 'boss-phase', source: boss.id, sourceKind: 'nether_dread_lord', phase: 2, mode: 'sacrifice', sacrificed: 2, sacrificedIds: [curse.id, doom.id] },
      { type: 'nether-purge', target: boss.id, targetKind: 'nether_dread_lord', element: 'lightning' },
      { type: 'attack', source: boss.id, sourceKind: 'nether_dread_lord', amount: 20, ultimate: true },
    ];
    bf.animate(events, () => {}, () => {});

    // Before boss-phase: phase 1, sacrificed pillars still alive in presentation
    assert.equal(bf.snapshots[0].netherPhase, 1);
    assert.equal(bf.snapshots[0].dead.has(curse.id), false);
    assert.equal(bf.snapshots[0].dead.has(doom.id), false);
    assert.equal(bf.snapshots[0].netherPurged, false);

    // After boss-phase: phase 2, sacrificed pillars dead
    assert.equal(bf.snapshots[2].netherPhase, 2);
    assert.equal(bf.snapshots[2].dead.has(curse.id), true);
    assert.equal(bf.snapshots[2].dead.has(doom.id), true);

    // After nether-purge
    assert.equal(bf.snapshots[3].netherPurged, true);

    // Verify netherEventKind mappings
    const resolveKind = id => state.enemies.find(e => e.id === id)?.kind ?? null;
    assert.equal(netherEventKind(events[0], resolveKind), 'frost-shot');
    assert.equal(netherEventKind(events[1], resolveKind), 'sacrifice');
    assert.equal(netherEventKind(events[3], resolveKind), 'climax');
  });
});
