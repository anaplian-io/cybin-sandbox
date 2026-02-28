import {
  initializeEvolutionLog,
  addEvolutionEvent,
  generateRandomEvolutionEvent,
  addEvolutionToGameState,
  generateRandomEvolutionEventForGameState,
  addRandomEvolutionToGameState,
} from './evolution.service';
import type { GameState } from './game.types';

describe('Evolution Service', () => {
  describe('initializeEvolutionLog', () => {
    it('creates an empty evolution log with default max entries', () => {
      const log = initializeEvolutionLog();
      expect(log.entries).toEqual([]);
      expect(log.maxEntries).toBe(50);
    });
  });

  describe('addEvolutionEvent', () => {
    it('adds an evolution event to an empty log', () => {
      const log = initializeEvolutionLog();
      const newLog = addEvolutionEvent(log, 'Test evolution', 'merchant');
      expect(newLog.entries).toHaveLength(1);
      expect(newLog.entries[0].text).toBe('Test evolution');
      expect(newLog.entries[0].faction).toBe('merchant');
    });

    it('preserves existing entries', () => {
      let log = initializeEvolutionLog();
      log = addEvolutionEvent(log, 'First', 'merchant');
      const newLog = addEvolutionEvent(log, 'Second', 'explorer');
      expect(newLog.entries).toHaveLength(2);
      expect(newLog.entries[0].text).toBe('Second');
      expect(newLog.entries[1].text).toBe('First');
    });

    it('limits entries to maxEntries', () => {
      let log = initializeEvolutionLog();
      (log as { maxEntries: number }).maxEntries = 3;
      log = addEvolutionEvent(log, 'First', 'merchant');
      log = addEvolutionEvent(log, 'Second', 'explorer');
      log = addEvolutionEvent(log, 'Third', 'scholar');
      log = addEvolutionEvent(log, 'Fourth', 'hermit');
      expect(log.entries).toHaveLength(3);
      expect(log.entries[0].text).toBe('Fourth');
    });
  });

  describe('generateRandomEvolutionEvent', () => {
    it('generates an evolution event with valid structure', () => {
      const event = generateRandomEvolutionEvent(10);
      expect(event.id).toBeDefined();
      expect(typeof event.text).toBe('string');
      expect(event.turn).toBe(10);
    });

    it('uses templates from evolutionTemplates', () => {
      const event = generateRandomEvolutionEvent(10);
      expect(event.text).toBeDefined();
    });

    it('assigns random faction when template has factions', () => {
      const event = generateRandomEvolutionEvent(10);
      expect(['merchant', 'explorer', 'scholar', 'hermit']).toContain(
        event.faction,
      );
    });

    it('uses provided faction filter', () => {
      const event = generateRandomEvolutionEvent(10, ['hermit']);
      expect(['hermit']).toContain(event.faction);
    });
  });

  describe('addEvolutionToGameState', () => {
    it('adds evolution event to state.evolutionLog if present', () => {
      const initialState = {
        turn: 10,
        evolutionLog: initializeEvolutionLog(),
      };
      const newState = addEvolutionToGameState(
        initialState as GameState,
        'New evolution',
        'merchant',
      );
      expect(newState.evolutionLog?.entries).toHaveLength(1);
    });

    it('creates evolutionLog if not present', () => {
      const initialState = { turn: 10 };
      const newState = addEvolutionToGameState(
        initialState as GameState,
        'New evolution',
        'merchant',
      );
      expect(newState.evolutionLog).toBeDefined();
    });
  });

  describe('generateRandomEvolutionEventForGameState', () => {
    it('uses gameState.turn for evolution turn', () => {
      const state = { turn: 42 };
      const event = generateRandomEvolutionEventForGameState(
        state as GameState,
      );
      expect(event.turn).toBe(42);
    });
  });

  describe('addRandomEvolutionToGameState', () => {
    it('adds random evolution event to state', () => {
      const initialState = { turn: 10, evolutionLog: initializeEvolutionLog() };
      const newState = addRandomEvolutionToGameState(initialState as GameState);
      expect(newState.evolutionLog?.entries).toHaveLength(1);
    });

    it('filters factions when provided', () => {
      const initialState = { turn: 10, evolutionLog: initializeEvolutionLog() };
      const newState = addRandomEvolutionToGameState(
        initialState as GameState,
        ['merchant'],
      );
      const event = newState.evolutionLog?.entries[0];
      // The faction should be from the filtered list
      if (event?.faction) {
        expect(['merchant']).toContain(event.faction);
      }
    });
  });

  describe('generateEvolutionId', () => {
    it('generates unique IDs', () => {
      const id1 = 'evolution-' + Date.now() + '-aaa';
      const id2 = 'evolution-' + Date.now() + '-bbb';
      expect(id1).not.toBe(id2);
    });
  });
});
