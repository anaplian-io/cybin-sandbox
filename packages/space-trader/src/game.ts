import { World, createWorld } from './world';
import { Whale, createWhale, Trait } from './whale';
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
  breedingOpportunity?: {
    locationName: string;
    availablePods: Whale[];
  };
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
    const tile = state.world.tiles.get(`${targetX},${targetY}`);
    let breedingOpportunity: GameState['breedingOpportunity'] | undefined;

    // Check if new position is a breeding ground
    if (tile?.type === 'breedingGround') {
      const availablePods = this.generateWildPods(state.turn);
      breedingOpportunity = {
        locationName: tile.name || 'Breeding Ground',
        availablePods,
      };
    }

    return {
      ...state,
      shipPosition: { x: targetX, y: targetY },
      breedingOpportunity,
    };
  }

  updateWhalePopulation(whales: Whale[]): Whale[] {
    // For now, just return existing whales
    // Future: add breeding logic using BreedingService when whales share a tile
    return whales;
  }

  generateWildPods(turn: number): Whale[] {
    // Generate different wild pods based on turn/season
    const podCount = Math.floor(turn / 5) + 3; // Increase pods over time

    const traitSets: Trait[][] = [
      ['speed', 'resilience'],
      ['capacity', 'thermotolerance'],
      ['predatorDeterrence', 'resilience'],
    ];

    const pods: Whale[] = [];
    for (let i = 0; i < podCount; i++) {
      const traits = traitSets[i % traitSets.length];
      pods.push(createWhale(`Wild Pod ${i + 1}`, traits));
    }

    return pods;
  }
}

export function checkSystem(): boolean {
  return true;
}
