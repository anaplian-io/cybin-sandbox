import { describe, it, expect, vi } from 'vitest';
import {
  initializeGossipLog,
  addGossip,
  generateRandomGossip,
} from './gossip.service.js';

describe('GossipService', () => {
  describe('initializeGossipLog', () => {
    it('returns empty gossip log with maxEntries', () => {
      const log = initializeGossipLog();

      expect(log.entries).toEqual([]);
      expect(log.maxEntries).toBe(50);
    });
  });

  describe('addGossip', () => {
    it('adds a new gossip entry', () => {
      const log = initializeGossipLog();
      const gossipText = 'Rumors say there are rich breeding grounds west.';

      const result = addGossip(log, gossipText, 'merchant');

      expect(result.entries.length).toBe(1);
      expect(result.entries[0].text).toBe(gossipText);
      expect(result.entries[0].faction).toBe('merchant');
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
  });
});
