import { describe, it, expect } from 'vitest';
import { GameService, createWorldInternal } from './game.service.js';
import { DEFAULT_WORLD_CONFIG } from '../data/world-config.js';

describe('GameService', () => {
  it('initializes world with default dimensions and positions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    expect(gameState.world.width).toBe(DEFAULT_WORLD_CONFIG.width);
    expect(gameState.world.height).toBe(DEFAULT_WORLD_CONFIG.height);
    expect(gameState.shipPosition.x).toBe(10);
    expect(gameState.shipPosition.y).toBe(7);
  });

  it('initializes world with custom dimensions', () => {
    const service = new GameService({ width: 10, height: 8 });
    const gameState = service.initializeWorld();

    expect(gameState.world.width).toBe(10);
    expect(gameState.world.height).toBe(8);
  });

  it('places islands at predefined positions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    const { world } = gameState;
    expect(world.tiles.get('5,5')?.type).toBe('island');
    expect(world.tiles.get('10,8')?.type).toBe('island');
  });

  it('places waystations at predefined positions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    const { world } = gameState;
    expect(world.tiles.get('7,7')?.type).toBe('waystation');
    expect(world.tiles.get('12,5')?.type).toBe('waystation');
  });

  it('places breeding grounds at predefined positions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    const { world } = gameState;
    expect(world.tiles.get('2,10')?.type).toBe('breedingGround');
    expect(world.tiles.get('16,8')?.type).toBe('breedingGround');
  });

  it('defaults to spring season if none provided', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('spring');
    expect(gameState.seasonState?.turnInSeason).toBe(0);
  });

  it('uses provided initial season state', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: 'summer',
      turnInSeason: 5,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('summer');
    expect(gameState.seasonState?.turnInSeason).toBe(5);
  });

  it('uses provided totalTurnsInCycle', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: 'autumn',
      turnInSeason: 3,
      totalTurnsInCycle: 10,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('autumn');
    expect(gameState.seasonState?.turnInSeason).toBe(3);
    expect(gameState.seasonState?.totalTurnsInCycle).toBe(10);
  });

  it('falls back to default totalTurnsInCycle', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: 'winter',
      turnInSeason: 2,
      totalTurnsInCycle: undefined,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('winter');
    expect(gameState.seasonState?.turnInSeason).toBe(2);
    expect(gameState.seasonState?.totalTurnsInCycle).toBe(0);
  });

  it('falls back to default turnInSeason when undefined', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: 'spring',
      turnInSeason: undefined,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('spring');
    expect(gameState.seasonState?.turnInSeason).toBe(0);
  });

  it('falls back to all defaults when only currentSeason is provided', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: 'autumn',
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('autumn');
    expect(gameState.seasonState?.turnInSeason).toBe(0);
    expect(gameState.seasonState?.totalTurnsInCycle).toBe(0);
  });

  it('falls back to default currentSeason when explicitly undefined', () => {
    const service = new GameService(DEFAULT_WORLD_CONFIG, {
      currentSeason: undefined,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('spring');
  });
});

describe('createWorldInternal', () => {
  it('creates empty world with correct dimensions', () => {
    const world = createWorldInternal(5, 4, [], [], []);

    expect(world.width).toBe(5);
    expect(world.height).toBe(4);
    expect(world.tiles.size).toBe(20);
  });

  it('places islands at provided positions', () => {
    const world = createWorldInternal(10, 10, [{ x: 2, y: 3 }], [], []);

    expect(world.tiles.get('2,3')?.type).toBe('island');
  });

  it('places waystations at provided positions', () => {
    const world = createWorldInternal(
      10,
      10,
      [],
      [{ x: 4, y: 5, name: 'Test' }],
      [],
    );

    expect(world.tiles.get('4,5')?.type).toBe('waystation');
    expect(world.tiles.get('4,5')?.name).toBe('Test');
  });

  it('places breeding grounds at provided positions', () => {
    const world = createWorldInternal(
      10,
      10,
      [],
      [],
      [{ x: 7, y: 8, name: 'Breeding' }],
    );

    expect(world.tiles.get('7,8')?.type).toBe('breedingGround');
    expect(world.tiles.get('7,8')?.name).toBe('Breeding');
  });
});
