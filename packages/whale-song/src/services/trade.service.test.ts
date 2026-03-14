import { describe, it, expect } from 'vitest';
import { TradeService } from './trade.service.js';
import type { GameState } from '../types/index.js';

describe('TradeService', () => {
  describe('buy', () => {
    it('should buy aether mist when affordable', () => {
      const service = new TradeService();
      const initialState: GameState = {
        aetherMist: 100,
        tradeInventory: { aetherMist: 0 },
        turn: 1,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
      };

      const result = service.buy(initialState, 10);

      expect(result.aetherMist).toBe(80); // 100 - (10 * 2)
      expect(result.tradeInventory.aetherMist).toBe(10);
      expect(result.turn).toBe(2);
    });

    it('should not buy when insufficient funds', () => {
      const service = new TradeService();
      const initialState: GameState = {
        aetherMist: 10,
        tradeInventory: { aetherMist: 0 },
        turn: 1,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
      };

      const result = service.buy(initialState, 10);

      expect(result.aetherMist).toBe(10);
      expect(result.tradeInventory.aetherMist).toBe(0);
      expect(result.turn).toBe(1); // No turn advance
    });

    it('should calculate correct cost', () => {
      const service = new TradeService();
      expect(service.getBuyPrice()).toBe(2);
    });
  });

  describe('sell', () => {
    it('should sell aether mist when in inventory', () => {
      const service = new TradeService();
      const initialState: GameState = {
        aetherMist: 50,
        tradeInventory: { aetherMist: 20 },
        turn: 1,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
      };

      const result = service.sell(initialState, 10);

      expect(result.aetherMist).toBe(60); // 50 + (10 * 1)
      expect(result.tradeInventory.aetherMist).toBe(10);
      expect(result.turn).toBe(2);
    });

    it('should not sell when insufficient inventory', () => {
      const service = new TradeService();
      const initialState: GameState = {
        aetherMist: 50,
        tradeInventory: { aetherMist: 5 },
        turn: 1,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
      };

      const result = service.sell(initialState, 10);

      expect(result.aetherMist).toBe(50);
      expect(result.tradeInventory.aetherMist).toBe(5);
      expect(result.turn).toBe(1); // No turn advance
    });

    it('should calculate correct revenue', () => {
      const service = new TradeService();
      expect(service.getSellPrice()).toBe(1);
    });
  });
});
