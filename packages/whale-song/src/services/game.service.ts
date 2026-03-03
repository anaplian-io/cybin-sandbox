import type { World } from '../utilities/world-data.js';
import type {
  GameState,
  SeasonState,
  WorldConfig,
} from '../types/game.types.js';
import {
  DEFAULT_WORLD_CONFIG,
  ISLAND_LOCATIONS,
  WAYSTATION_LOCATIONS,
  BREEDING_LOCATIONS,
} from '../data/world-config.js';

export class GameService {
  constructor(
    private readonly worldConfig: WorldConfig = DEFAULT_WORLD_CONFIG,
    private readonly initialSeasonState?: Partial<SeasonState>,
  ) {}

  initializeWorld(): GameState {
    const world = createWorldInternal(
      this.worldConfig.width,
      this.worldConfig.height,
      ISLAND_LOCATIONS,
      WAYSTATION_LOCATIONS,
      BREEDING_LOCATIONS,
    );
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
export function createWorldInternal(
  width: number,
  height: number,
  islandLocations: { x: number; y: number }[],
  waystationLocations: { x: number; y: number; name?: string }[],
  breedingLocations: { x: number; y: number; name?: string }[],
): World {
  const tiles = new Map<
    string,
    { type: string; x: number; y: number; name?: string }
  >();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.set(`${x},${y}`, { type: 'empty', x, y });
    }
  }

  // Add islands
  for (const { x, y } of islandLocations) {
    if (x < width && y < height) {
      tiles.set(`${x},${y}`, { type: 'island', x, y });
    }
  }

  // Add waystations
  for (const { x, y, name } of waystationLocations) {
    if (x < width && y < height) {
      tiles.set(`${x},${y}`, { type: 'waystation', x, y, name });
    }
  }

  // Add breeding grounds
  for (const { x, y, name } of breedingLocations) {
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
