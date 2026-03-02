import { getKey } from './world.utils.js';

export interface Tile {
  type: string;
  x: number;
  y: number;
  name?: string; // Named locations (waystations, breeding grounds)
}

export interface World {
  width: number;
  height: number;
  tiles: Map<string, Tile>;
}

// Export constants
export const WORLD_WIDTH = 20;
export const WORLD_HEIGHT = 15;

// Island positions (x, y)
const islandPositions: [number, number][] = [
  [5, 5],
  [10, 8],
  [15, 3],
  [3, 12],
];

// Waystation positions (x, y, name)
const waystationPositions: [number, number, string][] = [
  [7, 7, 'Circuit Waystation'],
  [12, 5, 'Vortex Outpost'],
];

// Breeding ground positions (x, y, name)
const breedingPositions: [number, number, string][] = [
  [2, 10, 'Whispering Shoals'],
  [16, 8, 'Aurora Drift'],
  [9, 2, 'Skyward Nest'],
];

export function createWorld(
  width: number = WORLD_WIDTH,
  height: number = WORLD_HEIGHT,
): World {
  const tiles = new Map<string, Tile>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.set(getKey(x, y), createTile(x, y, 'empty'));
    }
  }

  // Add islands
  for (const [x, y] of islandPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'island'));
    }
  }

  // Add waystations
  for (const [x, y, name] of waystationPositions) {
    if (x < width && y < height) {
      tiles.set(getKey(x, y), createTile(x, y, 'waystation', name));
    }
  }

  // Add breeding grounds
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

export function createTile(
  x: number,
  y: number,
  type: string = 'empty',
  name?: string,
): Tile {
  return { x, y, type, name };
}
