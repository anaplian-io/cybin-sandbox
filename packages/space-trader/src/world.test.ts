import { createWorld, getTile, setTile, getKey, createTile } from './world';

describe('World', () => {
  it('creates a world with default dimensions', () => {
    const world = createWorld();

    expect(world.width).toBe(20);
    expect(world.height).toBe(15);
    expect(world.tiles.size).toBe(300); // 20 * 15
  });

  it('creates a world with custom dimensions', () => {
    const world = createWorld(10, 8);

    expect(world.width).toBe(10);
    expect(world.height).toBe(8);
    expect(world.tiles.size).toBe(80);
  });

  it('places islands at specified positions', () => {
    const world = createWorld();

    expect(getTile(world, 5, 5)?.type).toBe('island');
    expect(getTile(world, 10, 8)?.type).toBe('island');
  });

  it('places waystations at specified positions', () => {
    const world = createWorld();

    expect(getTile(world, 7, 7)?.type).toBe('waystation');
    expect(getTile(world, 12, 5)?.type).toBe('waystation');
  });

  it('returns undefined for out of bounds', () => {
    const world = createWorld(5, 5);

    expect(getTile(world, -1, 0)).toBeUndefined();
    expect(getTile(world, 5, 0)).toBeUndefined();
    expect(getTile(world, 0, 5)).toBeUndefined();
  });

  it('can set tile type', () => {
    const world = createWorld(5, 5);

    setTile(world, 2, 2, 'storm');
    expect(getTile(world, 2, 2)?.type).toBe('storm');
  });

  it('generates correct key for coordinates', () => {
    expect(getKey(0, 0)).toBe('0,0');
    expect(getKey(5, 3)).toBe('5,3');
    expect(getKey(-1, -1)).toBe('-1,-1');
  });

  it('creates a tile with default type', () => {
    const tile = createTile(3, 4);
    expect(tile.type).toBe('empty');
  });
});
