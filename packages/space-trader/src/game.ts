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
  aetherMist: number;
  breedingOpportunity?: {
    locationName: string;
    availablePods: Whale[];
  };
  breedingMenuOpen?: boolean;
  whaleStatusOpen?: boolean;
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
      aetherMist: 50, // Starting amount
      whaleStatusOpen: false,
    };
  }

  nextTurn(state: GameState): GameState {
    const newWhales = this.updateWhalePopulation(state.whales);
    const aetherMistChange = this.calculateAetherMistChange(state.whales);

    return {
      ...state,
      whales: newWhales,
      aetherMist: state.aetherMist + aetherMistChange,
      turn: state.turn + 1,
    };
  }

  calculateAetherMistChange(whales: Whale[]): number {
    // Each whale produces aether mist based on traits and generation
    // Higher generation = more production
    // 'efficiency' trait increases production, 'consumption' trait decreases it
    let change = 0;
    for (const whale of whales) {
      const baseProduction = 1 + Math.floor(whale.generation / 2);
      let multiplier = 1;

      if (whale.traits.includes('efficiency')) {
        multiplier += 0.5;
      }
      if (whale.traits.includes('consumption')) {
        multiplier -= 0.3;
      }

      change += Math.floor(baseProduction * multiplier);
    }
    return change;
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

  breedWhale(state: GameState, selectedPodIndex: number): GameState {
    if (!state.breedingOpportunity) {
      return state;
    }

    const selectedPod =
      state.breedingOpportunity.availablePods[selectedPodIndex];
    if (!selectedPod) {
      return state;
    }

    const primaryWhale = state.whales[0];
    if (!primaryWhale) {
      return state;
    }

    // Create offspring using BreedingService
    const newTraits = this.breedingService.breedTraits(
      primaryWhale.traits,
      selectedPod.traits,
    );

    const offspring = createWhale(
      `${primaryWhale.name} x ${selectedPod.name}`,
      newTraits,
    );

    // Close breeding menu and add offspring to fleet
    return {
      ...state,
      whales: [...state.whales, offspring],
      breedingOpportunity: undefined,
    };
  }

  toggleWhaleStatus(state: GameState): GameState {
    return { ...state, whaleStatusOpen: !state.whaleStatusOpen };
  }
}

export function checkSystem(): boolean {
  return true;
}
