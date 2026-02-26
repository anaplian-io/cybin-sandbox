import { World, createWorld } from './world';
import { Whale, createWhale } from './whale';
import { BreedingService, RandomGenerator } from './breeding';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  world: World;
  shipPosition: Position;
  whales: Whale[];
  turn: number;
}

export class GameService {
  private breedingService: BreedingService;

  constructor(private readonly random?: RandomGenerator) {
    this.breedingService = new BreedingService(random ?? Math.random);
  }

  initialize(): GameState {
    const world = createWorld(20, 15);
    return {
      world,
      shipPosition: { x: 0, y: 0 },
      whales: [createWhale('Aurora', ['speed', 'capacity'])],
      turn: 0,
    };
  }

  nextTurn(state: GameState): GameState {
    const newWhales = this.updateWhalePopulation(state.whales);

    return {
      ...state,
      whales: newWhales,
      turn: state.turn + 1,
    };
  }

  moveShip(state: GameState, targetX: number, targetY: number): GameState {
    // Simple movement - update ship position
    return {
      ...state,
      shipPosition: { x: targetX, y: targetY },
    };
  }

  updateWhalePopulation(whales: Whale[]): Whale[] {
    // For now, just return existing whales
    // Future: add breeding logic using BreedingService when whales share a tile
    return whales;
  }
}

export function checkSystem(): boolean {
  return true;
}
