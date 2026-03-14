import { describe, it, expect } from 'vitest';
import {
  initializeEvolutionLog,
  addEvolution,
  generateRandomEvolution,
  addEvolutionToGameState,
  generateRandomEvolutionForGameState,
  addRandomEvolutionToGameState,
} from './evolution.service.js';
import type { Faction, EvolutionLog, GameState } from '../types/index.js';

describe('Evolution Service', () => {
  describe('initializeEvolutionLog', () => {
    it('should create an empty evolution log with maxEntries of 50', () => {
      const log = initializeEvolutionLog();
      expect(log).toEqual({
        entries: [],
        maxEntries: 50,
      });
    });
  });

  describe('addEvolution', () => {
    it('should add a new evolution event to the log', () => {
      const log = initializeEvolutionLog();
      const result = addEvolution(
        log,
        'Whale pod developed thermal resistance',
        0,
        'scholar',
      );

      expect(result.entries.length).toBe(1);
      expect(result.entries[0].text).toBe(
        'Whale pod developed thermal resistance',
      );
      expect(result.entries[0].faction).toBe('scholar');
    });

    it('should limit entries to maxEntries', () => {
      const log: EvolutionLog = {
        entries: Array.from({ length: 50 }, (_, i) => ({
          id: `evolution-${i}`,
          text: `Event ${i}`,
          turn: i,
        })),
        maxEntries: 50,
      };
      const result = addEvolution(log, 'New event', 99, 'merchant');

      expect(result.entries.length).toBe(50);
      expect(result.entries[0].text).toBe('New event');
      expect(result.entries[49].text).toBe('Event 48');
    });
  });

  describe('generateRandomEvolution', () => {
    it('should generate an evolution event with a valid template text', () => {
      const event = generateRandomEvolution(10);
      expect(event.turn).toBe(10);
      expect(event.id).toBeDefined();
      expect(event.text).toBeDefined();

      const validFactions: Faction[] = [
        'merchant',
        'explorer',
        'scholar',
        'hermit',
      ];
      expect(event.faction).toBeDefined();
      expect(validFactions).toContain(event.faction);
    });

    it('should respect faction filter', () => {
      const event = generateRandomEvolution(5, ['hermit']);
      expect(event.faction).toBe('hermit');
    });
  });

  describe('addEvolutionToGameState', () => {
    it('should add evolution to game state', () => {
      const initialState: GameState = {
        turn: 1,
        aetherMist: 100,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
        tradeInventory: { aetherMist: 50 },
      };
      const result = addEvolutionToGameState(
        initialState,
        'Test event',
        'explorer',
      );

      expect(result.evolutionLog?.entries.length).toBe(1);
      expect(result.evolutionLog?.entries[0].text).toBe('Test event');
    });
  });

  describe('generateRandomEvolutionForGameState', () => {
    it('should use game state turn for the event', () => {
      const gameState: GameState = {
        turn: 25,
        aetherMist: 100,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
        tradeInventory: { aetherMist: 50 },
      };
      const event = generateRandomEvolutionForGameState(gameState);

      expect(event.turn).toBe(25);
    });
  });

  describe('addRandomEvolutionToGameState', () => {
    it('should add a random evolution to game state', () => {
      const initialState: GameState = {
        turn: 15,
        aetherMist: 100,
        world: { width: 20, height: 15, tiles: new Map() },
        shipPosition: { x: 0, y: 0 },
        whales: [],
        tradeInventory: { aetherMist: 50 },
      };
      const result = addRandomEvolutionToGameState(initialState);

      expect(result.evolutionLog?.entries.length).toBe(1);
      expect(result.evolutionLog?.entries[0].turn).toBe(15);
    });
  });
});
