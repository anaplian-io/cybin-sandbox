import type { World } from '../utilities/world-data.js';
import type { GameState } from '../types/game.types.js';
import type { SeasonState } from '../types/season.js';

export class GameService {
  constructor(private readonly initialSeasonState?: Partial<SeasonState>) {}

  initializeWorld(width: number = 20, height: number = 15): GameState {
    const world = createWorldInternal(width, height);
    const seasonState: SeasonState = this.createSeasonState();

    return {
      world,
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
      seasonState,
    };
  }

  private createSeasonState(): SeasonState {
    const defaultState: SeasonState = {
      currentSeason: 'spring',
      turnInSeason: 0,
      totalTurnsInCycle: 0,
    };

    if (!this.initialSeasonState) {
      return defaultState;
    }

    return {
      currentSeason: this.initialSeasonState.currentSeason ?? 'spring',
      turnInSeason: this.initialSeasonState.turnInSeason ?? 0,
      totalTurnsInCycle: this.initialSeasonState.totalTurnsInCycle ?? 0,
    };
  }
}

// Internal helper to create world (used by tests too)
export function createWorldInternal(width: number, height: number): World {
  const tiles = new Map<
    string,
    { type: string; x: number; y: number; name?: string }
  >();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.set(`${x},${y}`, { type: 'empty', x, y });
    }
  }

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

  // Add islands
  for (const [x, y] of islandPositions) {
    if (x < width && y < height) {
      tiles.set(`${x},${y}`, { type: 'island', x, y });
    }
  }

  // Add waystations
  for (const [x, y, name] of waystationPositions) {
    if (x < width && y < height) {
      tiles.set(`${x},${y}`, { type: 'waystation', x, y, name });
    }
  }

  // Add breeding grounds
  for (const [x, y, name] of breedingPositions) {
    if (x < width && y < height) {
      tiles.set(`${x},${y}`, { type: 'breedingGround', x, y, name });
    }
  }

  return {
    width,
    height,
    tiles,
  };
}
