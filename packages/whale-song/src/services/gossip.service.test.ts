import { describe, it, expect } from 'vitest';
import {
  initializeGossipLog,
  addGossip,
  generateRandomGossip,
  addRandomGossipToGameState,
} from './gossip.service.js';
import type { GameState } from '../types/index.js';

describe('GossipService', () => {
  describe('initializeGossipLog', () => {
    it('returns empty gossip log with maxEntries', () => {
      const log = initializeGossipLog();

      expect(log.entries).toEqual([]);
      expect(log.maxEntries).toBe(50);
    });
  });

  describe('addGossip', () => {
    it('adds a new gossip entry with faction', () => {
      const log = initializeGossipLog();
      const gossipText = 'Rumors say there are rich breeding grounds west.';

      const result = addGossip(log, gossipText, 'merchant');

      expect(result.entries.length).toBe(1);
      expect(result.entries[0].text).toBe(gossipText);
      expect(result.entries[0].faction).toBe('merchant');
    });

    it('adds a new gossip entry without faction', () => {
      const log = initializeGossipLog();
      const gossipText = 'Traveler says something interesting.';

      const result = addGossip(log, gossipText);

      expect(result.entries.length).toBe(1);
      expect(result.entries[0].text).toBe(gossipText);
      expect(result.entries[0].faction).toBeUndefined();
    });

    it('accumulates multiple entries', () => {
      const log = initializeGossipLog();
      const result1 = addGossip(log, 'First gossip', 'merchant');
      const result2 = addGossip(result1, 'Second gossip', 'explorer');

      expect(result2.entries.length).toBe(2);
    });
  });

  describe('generateRandomGossip', () => {
    it('generates gossip with valid faction', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const gossip = generateRandomGossip(10, ['merchant']);

      expect(gossip.text).toBeDefined();
      expect(['merchant', 'explorer', 'scholar', 'hermit']).toContain(
        gossip.faction,
      );
    });

    it('uses filter when provided', () => {
      const gossip = generateRandomGossip(10, ['hermit']);

      expect(gossip.faction).toBe('hermit');
    });

    it('uses all factions when no filter provided', () => {
      const gossip = generateRandomGossip(10);

      expect(['merchant', 'explorer', 'scholar', 'hermit']).toContain(
        gossip.faction,
      );
    });
  });

  describe('addRandomGossipToGameState', () => {
    it('adds random gossip to game state', () => {
      const initialState: GameState = {
        turn: 5,
        aetherMist: 100,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
        tradeInventory: { aetherMist: 50 },
      };
      const result = addRandomGossipToGameState(initialState, ['merchant']);

      expect(result.gossipLog?.entries.length).toBe(1);
    });
  });
});
