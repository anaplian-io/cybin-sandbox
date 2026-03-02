import { describe, it, expect } from 'vitest';
import {
  createWorld,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  getTile,
  isBreedingGround,
} from '../data/index.js';

describe('world', () => {
  it('creates a world with correct dimensions', () => {
    const world = createWorld();

    expect(world.width).toBe(WORLD_WIDTH);
    expect(world.height).toBe(WORLD_HEIGHT);
  });

  it('creates a world with custom dimensions', () => {
    const world = createWorld(10, 8);

    expect(world.width).toBe(10);
    expect(world.height).toBe(8);
  });

  it('creates tiles at all positions', () => {
    const world = createWorld(3, 2);
    expect(world.tiles.size).toBe(6);

    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 3; x++) {
        const tile = getTile(world, x, y);
        expect(tile).toBeDefined();
        expect(tile?.x).toBe(x);
        expect(tile?.y).toBe(y);
      }
    }
  });

  it('creates islands at predefined positions', () => {
    const world = createWorld();

    expect(getTile(world, 5, 5)?.type).toBe('island');
    expect(getTile(world, 10, 8)?.type).toBe('island');
  });

  it('creates waystations at predefined positions', () => {
    const world = createWorld();

    expect(getTile(world, 7, 7)?.type).toBe('waystation');
    expect(getTile(world, 12, 5)?.type).toBe('waystation');
  });

  it('creates breeding grounds at predefined positions', () => {
    const world = createWorld();

    expect(getTile(world, 2, 10)?.type).toBe('breedingGround');
    expect(getTile(world, 16, 8)?.type).toBe('breedingGround');
  });

  it('identifies breeding grounds correctly', () => {
    const world = createWorld();

    expect(isBreedingGround(world, 2, 10)).toBe(true);
    expect(isBreedingGround(world, 5, 5)).toBe(false); // Island
    expect(isBreedingGround(world, 7, 7)).toBe(false); // Waystation
  });
});
