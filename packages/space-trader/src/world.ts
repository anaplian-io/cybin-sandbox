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
): Tile {
  return { x, y, type };
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
  const waystationPositions = [
    [7, 7],
    [12, 5],
  ];

  for (const [x, y] of waystationPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'waystation'));
    }
  }

  return { width, height, tiles };
}

export function getTile(world: World, x: number, y: number): Tile | undefined {
  return world.tiles.get(getKey(x, y));
}

export function setTile(
  world: World,
  x: number,
  y: number,
  type: TileType,
): void {
  world.tiles.set(getKey(x, y), createTile(x, y, type));
}
