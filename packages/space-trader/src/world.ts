export type TileType =
  | 'empty'
  | 'island'
  | 'waystation'
  | 'storm'
  | 'breedingGround';

export interface Tile {
  type: TileType;
  x: number;
  y: number;
  name?: string; // Named locations (waystations, breeding grounds)
}

export interface World {
  width: number;
  height: number;
  tiles: Map<string, Tile>;
}

export function createTile(
  x: number,
  y: number,
  type: TileType = 'empty',
  name?: string,
): Tile {
  return { x, y, type, name };
}

export function getKey(x: number, y: number): string {
  return `${x},${y}`;
}

export function createWorld(width: number = 20, height: number = 15): World {
  const tiles = new Map<string, Tile>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.set(getKey(x, y), createTile(x, y, 'empty'));
    }
  }

  // Add some islands
  const islandPositions = [
    [5, 5],
    [10, 8],
    [15, 3],
    [3, 12],
  ];

  for (const [x, y] of islandPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'island'));
    }
  }

  // Add waystations
  const waystationPositions: [number, number, string][] = [
    [7, 7, 'Circuit Waystation'],
    [12, 5, 'Vortex Outpost'],
  ];

  for (const [x, y, name] of waystationPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'waystation', name));
    }
  }

  // Add breeding grounds
  const breedingPositions: [number, number, string][] = [
    [2, 10, 'Whispering Shoals'],
    [16, 8, 'Aurora Drift'],
    [9, 2, 'Skyward Nest'],
  ];

  for (const [x, y, name] of breedingPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'breedingGround', name));
    }
  }

  return { width, height, tiles };
}

export function getTile(world: World, x: number, y: number): Tile | undefined {
  return world.tiles.get(getKey(x, y));
}

export function isBreedingGround(world: World, x: number, y: number): boolean {
  const tile = world.tiles.get(getKey(x, y));
  return tile?.type === 'breedingGround';
}

export function setTile(
  world: World,
  x: number,
  y: number,
  type: TileType,
): void {
  world.tiles.set(getKey(x, y), createTile(x, y, type));
}
