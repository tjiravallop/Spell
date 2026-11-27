import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BOSS_ART_V2, evaluateBossAnimation, resolveBossArt, resolveContextBossArt } from '../src/boss-art-v2.js';
import { BOSS_SIZE_V2 } from '../src/boss-sizes.js';
import { ENEMY_ART_V2 } from '../src/enemy-art-v2.js';
import { classifyCouncilEvent, councilPixels, councilProtectionState, drawEternityCouncil } from '../src/boss-art/eternity-council-vfx.js';
import { isElementalShift, isPrismaticReflectionEvent } from '../src/boss-art/eternity-prismatic-vfx.js';
import { isChronoRewindEvent, isPrismShatterEvent } from '../src/boss-art/eternity-chrono-prism-vfx.js';
import { classifyEternityWave } from '../src/boss-art/eternity-waves-vfx.js';
import { Battlefield } from '../src/render.js';
import { renderEnemies } from '../src/ui/battle-render.js';
import { loadRun, SAVE_KEY } from '../src/save.js';
import {
  FLOOR50_BOSS_ROOM,
  FLOOR100_BOSS_ROOM,
  ETERNITY_PHASE_HP,
  checkEternityPhase2,
  createEnemy,
  createRun,
  enterRoom,
  startRiftRun,
  triggerEternityPhase3,
} from '../src/run.js';
import { buildEndgameTowerRooms } from '../src/endgame-tower.js';

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
    measureText: () => ({ width: 20 }),
  };
  return {
    width: 320,
    height: 180,
    getContext() { return ctx; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 320, height: 180 }; },
  };
}

function setupGlobals() {
  if (!globalThis.Image) globalThis.Image = class { set src(_) {} };
  if (!globalThis.document) globalThis.document = { createElement: () => createMockCanvas() };
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = () => 0;
}

function makeFloor100State() {
  setupGlobals();
  const base = createRun('f100-test');
  base.room = FLOOR100_BOSS_ROOM;
  return enterRoom(base);
}

describe('Floor 100 Ultimate Final Boss V2 integration', () => {
  it('registers all 5 Floor 100 actors in BOSS_ART_V2 and BOSS_SIZE_V2 with V1 default and preserves 53 E9 + 21 Boss roles', () => {
    assert.equal(Object.keys(BOSS_ART_V2).length, 21);
    assert.equal(Object.keys(BOSS_SIZE_V2).length, 21);
    assert.equal(Object.keys(ENEMY_ART_V2).length, 53);
    assert.ok(ENEMY_ART_V2.cosmic_silk_oracle);
    assert.ok(ENEMY_ART_V2.astral_vanguard);
    assert.ok(ENEMY_ART_V2.aeon_oracle);
    assert.equal(ENEMY_ART_V2.chaos_weaver, undefined);
    assert.equal(BOSS_ART_V2.astral_vanguard, undefined);

    const ids = ['eternity_overlord', 'eternity_reborn', 'aeon_oracle', 'council_zenith_templar', 'chaos_weaver'];
    for (const id of ids) {
      assert.ok(BOSS_ART_V2[id], `missing BOSS_ART_V2[${id}]`);
      assert.ok(BOSS_SIZE_V2[id], `missing BOSS_SIZE_V2[${id}]`);
      assert.equal(resolveBossArt(id, null), null);
      assert.equal(resolveBossArt(id, { v2: true }), BOSS_ART_V2[id]);
    }
    const p1 = evaluateBossAnimation(BOSS_ART_V2.eternity_overlord, { eternityPhase: 1, affinity: 'ice' });
    const p2 = evaluateBossAnimation(BOSS_ART_V2.eternity_overlord, { eternityPhase: 2, affinity: 'fire' });
    assert.ok(p1.partStates && p2.partStates);
  });

  it('scopes Floor 100 V2 art to room 249 non-rift and enforces Council exclusivity across tower and rifts', () => {
    setupGlobals();
    const bf = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: true });
    bf.state = { room: 240, rift: null, enemies: [createEnemy('aeon_oracle', 0), createEnemy('eternity_overlord', 1)] };
    assert.equal(bf.resolveContextBossArt('aeon_oracle'), null);
    assert.equal(bf.resolveContextBossArt('eternity_overlord'), null);
    assert.equal(bf.resolveContextBossArt('cosmic_silk_oracle'), null);
    assert.equal(bf.resolveContextBossArt('astral_vanguard'), null);

    bf.state = makeFloor100State();
    assert.deepEqual(bf.state.enemies.map(e => e.kind), ['eternity_overlord', 'council_zenith_templar', 'aeon_oracle', 'chaos_weaver']);
    assert.ok(bf.resolveContextBossArt('aeon_oracle'));
    assert.ok(bf.resolveContextBossArt('council_zenith_templar'));
    assert.ok(bf.resolveContextBossArt('chaos_weaver'));
    assert.ok(bf.resolveContextBossArt('eternity_overlord'));
    assert.deepEqual(bf.positions(), [228, 172, 220, 268]);

    // Exclusivity: 0 occurrences of council_zenith_templar or chaos_weaver in rooms 0..248, 18 cosmic_silk_oracle slots across all F91..94 branches
    const pre100 = bf.state.rooms.slice(0, FLOOR100_BOSS_ROOM).flat();
    assert.equal(pre100.filter(k => k === 'council_zenith_templar').length, 0);
    assert.equal(pre100.filter(k => k === 'chaos_weaver').length, 0);
    assert.ok(pre100.filter(k => k === 'cosmic_silk_oracle').length >= 8);
    assert.ok(pre100.filter(k => k === 'astral_vanguard').length >= 10);
    const allEndgamePre100 = buildEndgameTowerRooms(choices => choices.flat()).slice(0, -1).flat();
    assert.equal(allEndgamePre100.filter(k => k === 'chaos_weaver').length, 0);
    assert.equal(allEndgamePre100.filter(k => k === 'council_zenith_templar').length, 0);
    assert.equal(allEndgamePre100.filter(k => k === 'cosmic_silk_oracle').length, 18);

    // Card Rift tier 100 stage 2 (room 249 with state.rift) must not spawn exclusive Council identities
    const preRift = createRun('rift-100-excl', false);
    preRift.clearedRooms = [FLOOR100_BOSS_ROOM];
    preRift.highestRoom = FLOOR100_BOSS_ROOM;
    preRift.phase = 'sanctuary';
    const riftRun = startRiftRun(preRift, 100, new Date('2026-11-27T12:00:00Z'));
    riftRun.rift.stage = 2;
    riftRun.room = FLOOR100_BOSS_ROOM;
    enterRoom(riftRun);
    assert.deepEqual(riftRun.enemies.map(e => e.kind), ['eternity_overlord', 'astral_vanguard', 'aeon_oracle', 'cosmic_silk_oracle']);
  });

  it('captures exact absorbedIds for 0..3 surviving Council members and outgoingBoss for Phase 3', () => {
    for (const aliveCount of [0, 1, 2, 3]) {
      const s = makeFloor100State();
      const boss = s.enemies.find(e => e.kind === 'eternity_overlord');
      const allies = s.enemies.filter(e => e.id !== boss.id);
      for (let i = 0; i < allies.length; i++) {
        if (i >= aliveCount) allies[i].hp = 0;
      }
      const expectedIds = allies.filter(a => a.hp > 0).map(a => a.id);
      boss.hp = ETERNITY_PHASE_HP[1];
      const events = [];
      checkEternityPhase2(s, { sequence: [] }, events);
      assert.equal(events[0].mode, 'prism');
      assert.equal(events[0].absorbed, aliveCount);
      assert.deepEqual(events[0].absorbedIds, expectedIds);
    }

    const s3 = makeFloor100State();
    s3.eternityPhase = 2;
    s3.player.summon = { creatureId: 'dragon', name: 'มังกร', element: 'fire', isGrand: true, hp: 90, maxHp: 90 };
    const p3Events = [];
    triggerEternityPhase3(s3, { sequence: [] }, p3Events);
    assert.equal(p3Events[0].mode, 'reborn');
    assert.equal(p3Events[0].outgoingBoss.kind, 'eternity_overlord');
    assert.equal(p3Events[0].outgoingBoss.eternityPhase, 2);
    assert.ok(s3.player.summon);
  });

  it('reserves 2500ms empty hold for Phase 2->3 Rebirth at 1x, 2x, 3x and delays boss-phase contact', () => {
    const s = makeFloor100State();
    s.eternityPhase = 3;
    const reborn = createEnemy('eternity_reborn', 0);
    reborn.slot = 2;
    s.enemies = [reborn];
    const events = [
      { type: 'damage', target: 'enemy-0', amount: 100, killed: true },
      { type: 'boss-phase', source: reborn.id, sourceKind: 'eternity_reborn', phase: 3, mode: 'reborn', outgoingBoss: { id: 'enemy-0', kind: 'eternity_overlord', slot: 0, affinity: 'ice', eternityPhase: 2 } },
    ];
    for (const speed of [1, 2, 3]) {
      const bf = new Battlefield(createMockCanvas(), { reducedMotion: false, combatSpeed: speed }, null, { v2: true });
      bf.state = s;
      const total = bf.animate(events, () => {}, () => {});
      assert.ok(bf.rebirthPlan, `missing rebirthPlan at ${speed}x`);
      assert.equal(bf.rebirthPlan.timing.emptyMs, 2500);
      assert.ok(total >= 2500);
      const phaseContact = bf.contacts.find(c => c.event.type === 'boss-phase');
      assert.ok(phaseContact.at >= bf.rebirthPlan.timing.collapseMs + 2500);
    }
  });

  it('validates all 7 Floor 100 VFX classifiers and Council exclusivity in guard state', () => {
    assert.equal(isPrismaticReflectionEvent({ type: 'cosmic-echo', sourceKind: 'eternity_overlord' }), true);
    assert.equal(isPrismaticReflectionEvent({ type: 'cosmic-echo', sourceKind: 'eternity_armory_god' }), false);
    assert.equal(isElementalShift({ id: 'b1', kind: 'eternity_overlord', affinity: 'earth' }, { id: 'b1', kind: 'eternity_overlord', affinity: 'fire' }), true);
    assert.equal(isElementalShift({ id: 'b1', kind: 'eternity_overlord', affinity: 'earth' }, { id: 'b1', kind: 'eternity_overlord', affinity: 'earth' }), false);
    assert.equal(isChronoRewindEvent({ type: 'heal', source: 'b1', target: 'b1', amount: 400, isChronosRewind: true }, { id: 'b1', kind: 'eternity_reborn' }), true);
    assert.equal(isChronoRewindEvent({ type: 'heal', source: 'b1', target: 'b1', amount: 0, isChronosRewind: true }, { id: 'b1', kind: 'eternity_reborn' }), false);
    assert.equal(isPrismShatterEvent({ type: 'prism-shatter', target: 'b1', amount: 60 }, { id: 'b1', kind: 'eternity_overlord' }), true);
    assert.equal(classifyEternityWave({ type: 'attack', sourceKind: 'eternity_overlord', ultimate: true }, { room: FLOOR100_BOSS_ROOM, rift: false, turn: 4 }), 'space');
    assert.equal(classifyEternityWave({ type: 'attack', sourceKind: 'eternity_reborn', ultimate: false }, { room: FLOOR100_BOSS_ROOM, rift: false, turn: 1 }), 'void');
    assert.equal(classifyCouncilEvent({ type: 'ward-grant', source: 'c1', target: 'b1' }, {
      room: FLOOR100_BOSS_ROOM,
      rift: false,
      phase: 1,
      source: { id: 'c1', kind: 'aeon_oracle' },
      target: { id: 'b1', kind: 'eternity_overlord', alive: true },
    }), 'ward');
    const guard = councilProtectionState({
      room: FLOOR100_BOSS_ROOM,
      rift: false,
      phase: 1,
      boss: { id: 'b', kind: 'eternity_overlord', alive: true, x: 228, y: 76 },
      members: [
        { id: 'm1', kind: 'council_zenith_templar', alive: true, x: 172, y: 112 },
        { id: 'm2', kind: 'aeon_oracle', alive: true, x: 220, y: 112 },
        { id: 'm3', kind: 'chaos_weaver', alive: true, x: 268, y: 112 },
      ],
    });
    assert.equal(guard.length, 3);
    assert.equal(councilProtectionState({
      room: FLOOR100_BOSS_ROOM,
      rift: false,
      phase: 1,
      boss: { id: 'b', kind: 'eternity_overlord', alive: true, x: 228, y: 76 },
      members: [{ id: 'm1', kind: 'astral_vanguard', alive: true, x: 172, y: 112 }],
    }).length, 0);
  });

  it('draws Council Protection pixels equivalently via offscreen scratch surface and mock fallback', () => {
    const opts = {
      room: FLOOR100_BOSS_ROOM,
      rift: false,
      phase: 1,
      layer: 'front',
      hit: true,
      reducedMotion: false,
      width: 320,
      height: 180,
      boss: { id: 'b', kind: 'eternity_overlord', alive: true, x: 228, y: 76 },
      members: [
        { id: 'm1', kind: 'council_zenith_templar', alive: true, x: 172, y: 112 },
        { id: 'm2', kind: 'aeon_oracle', alive: true, x: 220, y: 112 },
        { id: 'm3', kind: 'chaos_weaver', alive: true, x: 268, y: 112 },
      ],
    };
    const px = councilPixels('guard', 0.4, opts);
    assert.ok(px.length > 100);
    const rects = [];
    const spanCtx = { save() {}, restore() {}, set fillStyle(v) { this._c = v; }, fillRect(x, y, w, h) { rects.push({ x, y, w, h, c: this._c }); } };
    const n = drawEternityCouncil(spanCtx, 'guard', 0.4, opts);
    assert.ok(n > 0);
    const drawnPx = new Set();
    for (const r of rects) {
      for (let yy = r.y; yy < r.y + r.h; yy++) {
        for (let xx = r.x; xx < r.x + r.w; xx++) drawnPx.add(`${xx},${yy}:${r.c}`);
      }
    }
    assert.equal(drawnPx.size, px.length);
    for (const p of px) assert.ok(drawnPx.has(`${p.x},${p.y}:${p.color}`));
  });

  it('draws Council Protection hit and Chrono Rewind frames without ReferenceError in normal and reduced motion', () => {
    for (const reducedMotion of [false, true]) {
      const s1 = makeFloor100State();
      const bf1 = new Battlefield(createMockCanvas(), { reducedMotion, combatSpeed: 1 }, {}, { v2: true });
      bf1.state = s1;
      bf1.animate([{ type: 'damage', target: s1.enemies[0].id, amount: 120, element: 'fire' }], () => {}, () => {});
      bf1.draw(bf1.started + Math.floor(bf1.duration * 0.6));

      const s3 = makeFloor100State();
      s3.eternityPhase = 3;
      s3.enemies = [createEnemy('eternity_reborn', 0, FLOOR100_BOSS_ROOM)];
      const bf3 = new Battlefield(createMockCanvas(), { reducedMotion, combatSpeed: 1 }, {}, { v2: true });
      bf3.state = s3;
      bf3.animate([{ type: 'heal', source: s3.enemies[0].id, target: s3.enemies[0].id, amount: 450, isChronosRewind: true }], () => {}, () => {});
      bf3.draw(bf3.started + Math.floor(bf3.duration * 0.5));
    }
  });

  it('routes HUD V2 boss cards using context-aware boss art across Floor 97-3, Room 240, Room 249, Rift 100, and V1 default', () => {
    setupGlobals();
    const prevDoc = globalThis.document;
    const mkNode = (id, init = {}) => ({
      id,
      hidden: false,
      innerHTML: '',
      classList: { contains: c => (init.classes || []).includes(c) },
      ...init,
    });
    const nodes = {
      'major-boss-hud': mkNode('major-boss-hud'),
      'enemy-list': mkNode('enemy-list'),
      'summon-panel': mkNode('summon-panel'),
      'battle-view': mkNode('battle-view', { classes: ['hud-v3'] }),
    };
    globalThis.document = {
      ...prevDoc,
      getElementById: id => nodes[id] ?? null,
    };
    try {
      // Room 240 (intermediate Floor 97-2): astral_vanguard & aeon_oracle must stay in #enemy-list
      const s240 = {
        ...createRun('hud-240', false),
        room: 240,
        rift: null,
        enemies: [createEnemy('astral_vanguard', 0, 240), createEnemy('aeon_oracle', 1, 240), createEnemy('astral_vanguard', 2, 240)],
      };
      const bf240 = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: true });
      bf240.state = s240;
      renderEnemies({ state: s240, battlefield: bf240, targetId: s240.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, true);
      assert.equal(nodes['major-boss-hud'].innerHTML, '');
      assert.match(nodes['enemy-list'].innerHTML, /enemy-kind-astral_vanguard/);
      assert.match(nodes['enemy-list'].innerHTML, /enemy-kind-aeon_oracle/);

      // Room 242 (intermediate Floor 97-3): eternity_overlord avatar must stay in #enemy-list when V2 art is suppressed
      const s242 = {
        ...s240,
        room: 242,
        enemies: [createEnemy('eternity_overlord', 0, 242), createEnemy('astral_vanguard', 1, 242)],
      };
      bf240.state = s242;
      renderEnemies({ state: s242, battlefield: bf240, targetId: s242.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, true);
      assert.match(nodes['enemy-list'].innerHTML, /enemy-kind-eternity_overlord/);

      // Room 249 Card Rift (state.rift set): Floor 100 V2 art is suppressed, so #major-boss-hud stays hidden
      const sRift = makeFloor100State();
      sRift.rift = { type: 'card', tier: 100, stage: 2 };
      bf240.state = sRift;
      renderEnemies({ state: sRift, battlefield: bf240, targetId: sRift.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, true);
      assert.equal(resolveContextBossArt('eternity_overlord', sRift, { v2: true }, FLOOR100_BOSS_ROOM), null);

      // Canonical Floor 100 Room 249 with ?bossArt=v2: all 4 actors route to #major-boss-hud
      const s249 = makeFloor100State();
      bf240.state = s249;
      renderEnemies({ state: s249, battlefield: bf240, targetId: s249.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, false);
      assert.match(nodes['major-boss-hud'].innerHTML, /enemy-kind-eternity_overlord/);
      assert.match(nodes['major-boss-hud'].innerHTML, /enemy-kind-council_zenith_templar/);
      assert.match(nodes['major-boss-hud'].innerHTML, /enemy-kind-chaos_weaver/);
      assert.equal(nodes['enemy-list'].innerHTML, '');

      // Canonical Floor 50 rear boss + 3 minions with V2: Loom Sovereign in boss HUD, 3 minions in #enemy-list
      const s50 = createRun('hud-50', false);
      s50.room = FLOOR50_BOSS_ROOM;
      enterRoom(s50);
      bf240.state = s50;
      renderEnemies({ state: s50, battlefield: bf240, targetId: s50.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, false);
      assert.match(nodes['major-boss-hud'].innerHTML, /enemy-kind-loom_sovereign/);
      assert.match(nodes['enemy-list'].innerHTML, /data-rear-boss-minion="0"/);

      // Independent V1 flag: when bossVisuals.v2 is false, Floor 100 uses #enemy-list
      const bfV1 = new Battlefield(createMockCanvas(), { reducedMotion: false }, null, { v2: false });
      bfV1.state = s249;
      renderEnemies({ state: s249, battlefield: bfV1, targetId: s249.enemies[0].id, busy: false }, null);
      assert.equal(nodes['major-boss-hud'].hidden, true);
      assert.match(nodes['enemy-list'].innerHTML, /enemy-kind-eternity_overlord/);
    } finally {
      globalThis.document = prevDoc;
    }
  });

  it('normalizes legacy zenith_templar, chronos_keeper, chaos_weaver, and E9 saves contextually without regenerating battles', () => {
    const legacy = makeFloor100State();
    legacy.rooms[225] = ['chaos_weaver', 'astral_chimera'];
    legacy.rooms[240] = ['zenith_templar', 'chronos_keeper'];
    legacy.rooms[249] = ['eternity_overlord', 'zenith_templar', 'chronos_keeper', 'chaos_weaver'];
    legacy.enemies = [
      { ...createEnemy('eternity_overlord', 0, FLOOR100_BOSS_ROOM), hp: 6123, armor: 4, ward: 1 },
      { ...createEnemy('council_zenith_templar', 1, FLOOR100_BOSS_ROOM), kind: 'zenith_templar', hp: 999 },
      { ...createEnemy('aeon_oracle', 2, FLOOR100_BOSS_ROOM), kind: 'chronos_keeper', hp: 888 },
      { ...createEnemy('chaos_weaver', 3, FLOOR100_BOSS_ROOM), hp: 777 },
    ];
    const map = new Map([[SAVE_KEY, JSON.stringify(legacy)]]);
    const store = {
      getItem: k => map.get(k) ?? null,
      setItem: (k, v) => map.set(k, v),
      removeItem: k => map.delete(k),
    };
    const loaded = loadRun(store);
    assert.equal(loaded.ok, true, loaded.error);
    assert.deepEqual(loaded.state.rooms[225], ['cosmic_silk_oracle', 'astral_chimera']);
    assert.deepEqual(loaded.state.rooms[240], ['astral_vanguard', 'aeon_oracle']);
    assert.deepEqual(loaded.state.enemies.map(e => e.kind), ['eternity_overlord', 'council_zenith_templar', 'aeon_oracle', 'chaos_weaver']);
    assert.deepEqual(loaded.state.enemies.map(e => e.hp), [6123, 999, 888, 777]);

    // Also migrate an active Floor 91-94 save holding legacy chaos_weaver without losing HP/slot
    const f91 = createRun('f91-legacy-cw', false);
    f91.rooms[225] = ['chaos_weaver', 'astral_chimera'];
    f91.room = 225;
    enterRoom(f91);
    f91.enemies[0] = { ...f91.enemies[0], kind: 'chaos_weaver', hp: 654 };
    const map91 = new Map([[SAVE_KEY, JSON.stringify(f91)]]);
    const loaded91 = loadRun({ getItem: k => map91.get(k) ?? null, setItem: (k, v) => map91.set(k, v), removeItem: k => map91.delete(k) });
    assert.equal(loaded91.ok, true, loaded91.error);
    assert.equal(loaded91.state.enemies[0].kind, 'cosmic_silk_oracle');
    assert.equal(loaded91.state.enemies[0].hp, 654);

    // Also migrate an intermediate E9 save holding astral_vanguard at Floor 100 room 249 into council_zenith_templar
    const f100e9 = makeFloor100State();
    f100e9.rooms[249] = ['eternity_overlord', 'astral_vanguard', 'aeon_oracle', 'chaos_weaver'];
    f100e9.enemies[1] = { ...f100e9.enemies[1], kind: 'astral_vanguard', hp: 1111 };
    const mapE9 = new Map([[SAVE_KEY, JSON.stringify(f100e9)]]);
    const loadedE9 = loadRun({ getItem: k => mapE9.get(k) ?? null, setItem: (k, v) => mapE9.set(k, v), removeItem: k => mapE9.delete(k) });
    assert.equal(loadedE9.ok, true, loadedE9.error);
    assert.equal(loadedE9.state.enemies[1].kind, 'council_zenith_templar');
    assert.equal(loadedE9.state.enemies[1].hp, 1111);
  });

  it('activates Major Boss V2 by default in app.js with ?bossArt=v1 emergency rollback', () => {
    const appSrc = readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
    assert.match(appSrc, /v2:\s*devOptions\.get\('bossArt'\)\s*!==\s*'v1'/);
    assert.doesNotMatch(appSrc, /v2:\s*localDev\s*&&\s*devOptions\.get\('bossArt'\)\s*===\s*'v2'/);
    assert.match(appSrc, /playerArtV2:\s*true/);
    assert.match(appSrc, /enemyArtV2:\s*!\(localDev\s*&&\s*devOptions\.get\('enemyArt'\)\s*===\s*'v1'\)/);
  });

  it('draws representative bosses beyond Floor 100 cleanly across animation, overrides, and reduced motion', () => {
    setupGlobals();
    const cases = [
      { kind: 'ember_overlord', ctx: { pose: 'attack', attacking: true, progress: 0.5, frame: 2 } },
      { kind: 'loom_sovereign', ctx: { pose: 'idle', supporting: true, frame: 3 } },
      { kind: 'abyssal_cthulhu', ctx: { pose: 'idle', armor: 0, frame: 4 } },
      { kind: 'nether_dread_lord', ctx: { netherPhase: 2, unsealed: true, purged: true, pose: 'attack', attacking: true, progress: 0.4, frame: 1 } },
    ];
    for (const reducedMotion of [false, true]) {
      for (const entry of cases) {
        const art = BOSS_ART_V2[entry.kind];
        assert.ok(art);
        const anim = evaluateBossAnimation(art, { ...entry.ctx, reducedMotion, now: 640 });
        assert.ok(anim && typeof anim === 'object');
        const bf = new Battlefield(createMockCanvas(), { reducedMotion, combatSpeed: 1 }, { enemyArtV2: true, playerArtV2: true }, { v2: true });
        const s = createRun(`boss-v2-${entry.kind}-${reducedMotion}`, false);
        const targetRoom = entry.kind === 'ember_overlord' ? 24
          : entry.kind === 'loom_sovereign' ? FLOOR50_BOSS_ROOM
            : entry.kind === 'abyssal_cthulhu' ? 199
              : 224;
        s.room = targetRoom;
        enterRoom(s);
        if (entry.kind === 'abyssal_cthulhu') {
          s.cthulhuPhase = 2;
          s.enemies = [createEnemy('abyssal_cthulhu', 0, 199)];
        }
        bf.set(s, null);
        bf.stop();
        bf.draw(performance.now());
      }
    }
  });
});
