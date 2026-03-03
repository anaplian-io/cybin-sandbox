import { describe, it, expect } from 'vitest';
import { GameService } from './game.service.js';

describe('GameService', () => {
  it('initializes world with default dimensions and positions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld();

    expect(gameState.world.width).toBe(20);
    expect(gameState.world.height).toBe(15);
    expect(gameState.shipPosition.x).toBe(10);
    expect(gameState.shipPosition.y).toBe(7);
  });

  it('initializes world with custom dimensions', () => {
    const service = new GameService();
    const gameState = service.initializeWorld(10, 8);

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
    const service = new GameService({
      currentSeason: 'summer',
      turnInSeason: 5,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('summer');
    expect(gameState.seasonState?.turnInSeason).toBe(5);
    expect(gameState.seasonState?.totalTurnsInCycle).toBe(0);
  });

  it('falls back to defaults when partial season state is provided', () => {
    const service = new GameService({
      currentSeason: 'autumn' as const,
      turnInSeason: undefined,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('autumn');
    expect(gameState.seasonState?.turnInSeason).toBe(0);
  });

  it('falls back to default currentSeason when undefined is provided', () => {
    const service = new GameService({
      currentSeason: undefined,
      turnInSeason: 2,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('spring');
    expect(gameState.seasonState?.turnInSeason).toBe(2);
  });

  it('uses provided totalTurnsInCycle', () => {
    const service = new GameService({
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
    const service = new GameService({
      currentSeason: 'winter',
      turnInSeason: 2,
      totalTurnsInCycle: undefined,
    });
    const gameState = service.initializeWorld();

    expect(gameState.seasonState?.currentSeason).toBe('winter');
    expect(gameState.seasonState?.turnInSeason).toBe(2);
    expect(gameState.seasonState?.totalTurnsInCycle).toBe(0);
  });
});
