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

// Gossip system types
export interface Gossip {
  id: string;
  text: string;
  faction?: string;
  source?: string;
  turn: number;
  generation: number; // For filtering by relevance
}

export interface GossipLog {
  entries: Gossip[];
  maxEntries?: number;
}

export const defaultGossipLog: GossipLog = {
  entries: [],
  maxEntries: 50,
};

// Faction types for gossip sources
export type Faction = 'merchant' | 'explorer' | 'scholar' | 'hermit';

// Gossip templates for procedural generation
export interface GossipTemplate {
  text: string;
  factions?: Faction[];
}

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
}
