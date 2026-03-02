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
