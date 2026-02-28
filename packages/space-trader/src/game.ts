// Game types and exports barrel—business logic in game.service.ts
export type {
  GameState,
  Position,
  AetherMistConfig,
  TradeConfig,
} from './game.types';
export { GameService, checkSystem } from './game.service';
