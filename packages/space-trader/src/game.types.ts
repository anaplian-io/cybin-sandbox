import { World } from './world';
import { Whale } from './whale';
import type { SeasonState } from './season.types';

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

// Turn cost configuration
export interface TurnCostConfig {
  baseCost: number;
  movementMultiplier: number;
}

export const defaultTurnCostConfig: TurnCostConfig = {
  baseCost: 1,
  movementMultiplier: 0.5,
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

// Faction types for gossip sources
export type Faction = 'merchant' | 'explorer' | 'scholar' | 'hermit';

// Gossip system types
export interface Gossip {
  id: string;
  text: string;
  faction?: Faction;
  source?: string;
  turn: number;
  generation: number; // For filtering by relevance
}

export interface GossipLog {
  entries: Gossip[];
  maxEntries?: number;
}

// Evolution system types
export interface EvolutionEvent {
  id: string;
  text: string;
  turn: number;
  faction?: Faction;
}

export interface EvolutionLog {
  entries: EvolutionEvent[];
  maxEntries?: number;
}

// Gossip templates for procedural generation
export interface GossipTemplate {
  text: string;
  factions: Faction[];
}

// Evolution templates for procedural generation
export interface EvolutionTemplate {
  text: string;
  factions?: Faction[];
}

// Available gossip templates
export const gossipTemplates: GossipTemplate[] = [
  {
    text: 'Rumors say the western archipelago has rich breeding grounds.',
    factions: ['explorer', 'merchant'],
  },
  {
    text: 'A new faction has established a waystation in the upper atmosphere.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'Aether mist prices are trending upward this season.',
    factions: ['merchant'],
  },
  {
    text: 'The scholars have discovered a new whale trait combination.',
    factions: ['scholar'],
  },
  {
    text: 'Hermit nomads are offering rare breeding pairs at discounted rates.',
    factions: ['hermit', 'merchant'],
  },
  {
    text: 'Whale pods are developing thermal resistance due to recent heatwaves.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'A massive whale pod has been spotted migrating eastward.',
    factions: ['explorer'],
  },
  {
    text: 'Rich aether mist deposits have been found near the southern floating islands.',
    factions: ['merchant', 'explorer'],
  },
  {
    text: 'Local factions are hosting a trade festival next turn.',
    factions: ['merchant', 'explorer'],
  },
  {
    text: 'Scholars report unusual whale migration patterns this season.',
    factions: ['scholar'],
  },
];

// Available evolution templates
export const evolutionTemplates: EvolutionTemplate[] = [
  {
    text: 'Whale pod developed thermal resistance due to recent heatwaves.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'Whale pod evolved faster swimming speed to catch prey.',
    factions: ['explorer'],
  },
  {
    text: 'Whale pod developed improved aether mist harvesting efficiency.',
    factions: ['merchant'],
  },
  {
    text: 'Whale pod became more elusive, avoiding predators.',
    factions: ['hermit'],
  },
  {
    text: 'Whale pod developed resilience to air currents.',
    factions: ['explorer', 'scholar'],
  },
];

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
  gossipLog?: GossipLog;
  evolutionLog?: EvolutionLog;
  seasonState?: SeasonState;
}
