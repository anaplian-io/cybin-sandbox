// Types barrel for Whale Song

export type {
  Position,
  AetherMistConfig,
  TradeConfig,
  TurnCostConfig,
  Gossip,
  GossipLog,
  EvolutionEvent,
  EvolutionLog,
  GossipTemplate,
  EvolutionTemplate,
  GameState,
} from './game.types.js';

export {
  defaultAetherMistConfig,
  defaultTradeConfig,
  defaultTurnCostConfig,
} from './game.types.js';

export type { Trait } from './trait.js';
export type { Whale, WhaleStats } from './whale.js';

export type {
  SeasonName,
  SeasonConfig,
  EnvironmentalPressure,
  SeasonState,
} from './season.js';

export type { Faction } from '../constants/factions.js';
export { FACTIONS } from '../constants/factions.js';
