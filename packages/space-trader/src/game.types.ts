import { World } from './world';
import { Whale } from './whale';

export interface Position {
  x: number;
  y: number;
}

// Aether mist production configuration
export interface AetherMistConfig {
  baseProduction: number;
  generationMultiplier: number;
  efficiencyBonus: number;
  consumptionPenalty: number;
}

export const defaultAetherMistConfig: AetherMistConfig = {
  baseProduction: 1,
  generationMultiplier: 0.5, // +1 per 2 generations
  efficiencyBonus: 0.5, // +50% for efficiency trait
  consumptionPenalty: 0.3, // -30% for consumption trait
};

// Trade price configuration
export interface TradeConfig {
  buyPricePerUnit: number;
  sellPricePerUnit: number;
}

export const defaultTradeConfig: TradeConfig = {
  buyPricePerUnit: 2,
  sellPricePerUnit: 1,
};

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
  waystationMenuOpen?: boolean;
  tradeInventory: {
    aetherMist: number;
  };
}
