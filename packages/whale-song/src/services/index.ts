// Services barrel for Whale Song

export { BreedingService } from './breeding.service.js';
export type { RandomGenerator } from './breeding.service.js';

export {
  initializeSeasonState,
  advanceSeason,
  advanceTurn,
  getCurrentEnvironmentalPressure,
  isBreedingBonusSeason,
  isBreedingPenaltySeason,
} from './season.service.js';

export {
  initializeGossipLog,
  addGossip,
  generateRandomGossip,
  addGossipToGameState,
  generateRandomGossipForGameState,
  addRandomGossipToGameState,
} from './gossip.service.js';

export {
  initializeEvolutionLog,
  addEvolution,
  generateRandomEvolution,
  addEvolutionToGameState,
  generateRandomEvolutionForGameState,
  addRandomEvolutionToGameState,
} from './evolution.service.js';

export { GameService } from './game.service.js';
export { TradeService } from './trade.service.js';

// Re-export views for convenience
export {
  MapDisplay,
  StatusDisplay,
  ControlsDisplay,
  MenuDisplay,
} from '../views/index.js';
