import { GameService, checkSystem } from './game';
import { Whale } from './whale';

describe('Game', () => {
  describe('initialize', () => {
    it('creates a game state with world, ship, whales, and turn 0', () => {
      const service = new GameService();
      const state = service.initialize();

      expect(state.world.width).toBe(20);
      expect(state.world.height).toBe(15);
      expect(state.shipPosition.x).toBe(0);
      expect(state.shipPosition.y).toBe(0);
      expect(state.whales.length).toBeGreaterThan(0);
      expect(state.turn).toBe(0);
    });

    it('allows custom random generator for deterministic tests', () => {
      const seed = 0.5;
      const service = new GameService(() => seed);
      const state = service.initialize();

      expect(state.whales.length).toBeGreaterThan(0);
    });
  });

  describe('nextTurn', () => {
    it('advances turn count', () => {
      const service = new GameService();
      const state = service.initialize();

      const newState = service.nextTurn(state);

      expect(newState.turn).toBe(state.turn + 1);
    });

    it('preserves other state properties', () => {
      const service = new GameService();
      const state = service.initialize();
      const originalWhalesCount = state.whales.length;

      const newState = service.nextTurn(state);

      expect(newState.world).toBe(state.world);
      expect(newState.shipPosition).toEqual(state.shipPosition);
      expect(newState.whales.length).toBe(originalWhalesCount);
    });
  });

  describe('moveShip', () => {
    it('updates ship position', () => {
      const service = new GameService();
      const state = service.initialize();

      const newState = service.moveShip(state, 5, 7);

      expect(newState.shipPosition.x).toBe(5);
      expect(newState.shipPosition.y).toBe(7);
    });

    it('preserves other state properties', () => {
      const service = new GameService();
      const state = service.initialize();

      const newState = service.moveShip(state, 3, 4);

      expect(newState.turn).toBe(state.turn);
      expect(newState.whales).toEqual(state.whales);
    });
  });

  describe('updateWhalePopulation', () => {
    it('returns existing whales when no breeding conditions met', () => {
      const service = new GameService();
      const whale1: Whale = {
        id: 'w1',
        name: 'W1',
        traits: ['speed'],
        stats: { health: 100, maxHealth: 100, aetherMistProduction: 1 },
        generation: 1,
      };
      const whale2: Whale = {
        id: 'w2',
        name: 'W2',
        traits: ['capacity'],
        stats: { health: 100, maxHealth: 100, aetherMistProduction: 1 },
        generation: 1,
      };
      const whales = [whale1, whale2];

      const result = service.updateWhalePopulation(whales);

      expect(result).toEqual(whales);
    });
  });

  describe('checkSystem', () => {
    it('returns true', () => {
      expect(checkSystem()).toBe(true);
    });
  });
});
