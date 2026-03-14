import type { GameState } from '../types/index.js';
import { defaultTradeConfig } from '../types/game.types.js';

export class TradeService {
  buy(state: GameState, amount: number): GameState {
    const cost = amount * defaultTradeConfig.buyPricePerUnit;
    if (state.aetherMist < cost) {
      // Can't afford
      return state;
    }
    return {
      ...state,
      aetherMist: state.aetherMist - cost,
      tradeInventory: {
        ...state.tradeInventory,
        aetherMist: state.tradeInventory.aetherMist + amount,
      },
      turn: state.turn + 1,
    };
  }

  sell(state: GameState, amount: number): GameState {
    const inventory = state.tradeInventory.aetherMist;
    if (inventory < amount) {
      // Can't sell what you don't have
      return state;
    }
    const revenue = amount * defaultTradeConfig.sellPricePerUnit;
    return {
      ...state,
      aetherMist: state.aetherMist + revenue,
      tradeInventory: {
        ...state.tradeInventory,
        aetherMist: inventory - amount,
      },
      turn: state.turn + 1,
    };
  }

  getBuyPrice(): number {
    return defaultTradeConfig.buyPricePerUnit;
  }

  getSellPrice(): number {
    return defaultTradeConfig.sellPricePerUnit;
  }
}
