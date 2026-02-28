// Game types and exports barrel—business logic in game.service.ts
import type {
  GameState,
  Position,
  AetherMistConfig,
  TradeConfig,
} from './game.types';
import {
  GameService,
  checkSystem,
  defaultAetherMistConfig,
  defaultTradeConfig,
} from './game.service';

export type { GameState, Position, AetherMistConfig, TradeConfig };
export {
  GameService,
  checkSystem,
  defaultAetherMistConfig,
  defaultTradeConfig,
};
