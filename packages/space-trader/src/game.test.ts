import { GameService, checkSystem, AetherMistConfig } from './game';
import { Whale, createWhale } from './whale';

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

    it('sets breedingOpportunity when moving to breeding ground', () => {
      const service = new GameService();
      const state = service.initialize();

      // Move to a known breeding ground position
      const newState = service.moveShip(state, 2, 10);

      expect(newState.breedingOpportunity).toBeDefined();
      expect(newState.breedingOpportunity?.locationName).toBe(
        'Whispering Shoals',
      );
    });

    it('clears breedingOpportunity when moving off breeding ground', () => {
      const service = new GameService();
      let state = service.initialize();

      // First move to breeding ground
      state = service.moveShip(state, 2, 10);
      expect(state.breedingOpportunity).toBeDefined();

      // Then move away
      const newState = service.moveShip(state, 3, 10);
      expect(newState.breedingOpportunity).toBeUndefined();
    });

    it('does not set breedingOpportunity when moving to non-breeding ground', () => {
      const service = new GameService();
      const state = service.initialize();

      // Move to a regular empty tile (not breeding ground)
      const newState = service.moveShip(state, 1, 0);

      expect(newState.breedingOpportunity).toBeUndefined();
    });

    it('uses fallback name when breeding ground tile has no name', () => {
      const service = new GameService();
      const state = service.initialize();

      // Create a tile manually without a name
      const unnamedBreedingGround = {
        x: 7,
        y: 7,
        type: 'breedingGround' as const,
      };
      state.world.tiles.set('7,7', unnamedBreedingGround);

      const newState = service.moveShip(state, 7, 7);
      expect(newState.breedingOpportunity).toBeDefined();
      expect(newState.breedingOpportunity?.locationName).toBe(
        'Breeding Ground',
      );
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

  describe('generateWildPods', () => {
    it('generates wild pods with valid traits', () => {
      const service = new GameService();
      const pods = service.generateWildPods(0);

      expect(pods.length).toBeGreaterThan(0);
      for (const pod of pods) {
        expect(pod.name).toMatch(/^Wild Pod \d+$/);
        expect(pod.traits.length).toBeGreaterThan(0);
        for (const trait of pod.traits) {
          expect([
            'speed',
            'resilience',
            'capacity',
            'thermotolerance',
            'predatorDeterrence',
          ]).toContain(trait);
        }
      }
    });

    it('increases pod count over time', () => {
      const service = new GameService();

      // At turn 0, should have ~3 pods
      const earlyPods = service.generateWildPods(0);
      expect(earlyPods.length).toBeGreaterThanOrEqual(3);

      // At turn 10, should have more pods
      const laterPods = service.generateWildPods(10);
      expect(laterPods.length).toBeGreaterThan(earlyPods.length);
    });
  });

  describe('checkSystem', () => {
    it('returns true', () => {
      expect(checkSystem()).toBe(true);
    });
  });

  describe('breedWhale', () => {
    it('returns original state when no breeding opportunity exists', () => {
      const service = new GameService();
      const state = service.initialize();
      expect(state.breedingOpportunity).toBeUndefined();
      const newState = service.breedWhale(state, 0);
      expect(newState).toBe(state);
    });

    it('creates offspring with blended traits from both parents', () => {
      const service = new GameService(() => 0.5); // deterministic
      let state = service.initialize();

      // Move to a breeding ground to get pods
      state = service.moveShip(state, 2, 10);
      expect(state.breedingOpportunity).toBeDefined();

      const opportunity = state.breedingOpportunity;
      expect(opportunity?.availablePods.length).toBeGreaterThan(0);

      // Breed with the first pod
      const newState = service.breedWhale(state, 0);

      // Offspring should be added to whales array
      expect(newState.whales.length).toBe(state.whales.length + 1);

      // Original breeding opportunity should be cleared
      expect(newState.breedingOpportunity).toBeUndefined();

      // New whale's name should reference both parents
      const newWhale = newState.whales[newState.whales.length - 1];
      expect(newWhale.name).toContain('Aurora'); // primary whale
    });

    it('returns original state when selected pod index is out of range', () => {
      const service = new GameService(() => 0.5);
      let state = service.initialize();
      state = service.moveShip(state, 2, 10);
      const newState = service.breedWhale(state, 99); // out of range
      expect(newState).toBe(state);
    });

    it('returns original state when no whales exist', () => {
      const service = new GameService(() => 0.5);
      const baseState = service.initialize();
      // Clear whales array
      const state = {
        ...baseState,
        whales: [],
        breedingOpportunity: {
          locationName: 'Test',
          availablePods: [createWhale('Pod 1', ['speed'])],
        },
      };
      const newState = service.breedWhale(state, 0);
      expect(newState).toBe(state);
    });
  });

  describe('toggleWhaleStatus', () => {
    it('toggles whale status menu state', () => {
      const service = new GameService();
      let state = service.initialize();
      expect(state.whaleStatusOpen).toBe(false);

      // Toggle on
      state = service.toggleWhaleStatus(state);
      expect(state.whaleStatusOpen).toBe(true);

      // Toggle off
      state = service.toggleWhaleStatus(state);
      expect(state.whaleStatusOpen).toBe(false);
    });
  });

  describe('calculateAetherMistChange', () => {
    it('returns positive change for whales with efficiency trait', () => {
      const config: AetherMistConfig = {
        baseProduction: 1,
        generationMultiplier: 0.5,
        efficiencyBonus: 0.5,
        consumptionPenalty: 0.3,
      };
      const service = new GameService(undefined, config);
      const whales: Whale[] = [
        { ...createWhale('Efficient', ['efficiency']), generation: 2 },
      ];
      const change = service.calculateAetherMistChange(whales);
      expect(change).toBeGreaterThan(2); // 1 + 1 (gen) = 2, * 1.5 efficiency = 3
    });

    it('returns lower change for whales with consumption trait', () => {
      const config: AetherMistConfig = {
        baseProduction: 1,
        generationMultiplier: 0.5,
        efficiencyBonus: 0.5,
        consumptionPenalty: 0.3,
      };
      const service = new GameService(undefined, config);
      const whales: Whale[] = [
        { ...createWhale('Consumer Whale', ['consumption']), generation: 1 },
      ];
      const change = service.calculateAetherMistChange(whales);
      expect(change).toBeLessThan(1); // 1 + 0 (gen) = 1, * 0.7 consumption = 0
    });

    it('returns higher change for whales with efficiency trait', () => {
      const config: AetherMistConfig = {
        baseProduction: 1,
        generationMultiplier: 0.5,
        efficiencyBonus: 0.5,
        consumptionPenalty: 0.3,
      };
      const service = new GameService(undefined, config);
      // High generation produces, consumption reduces
      const whales: Whale[] = [
        { ...createWhale('High Gen', ['speed']), generation: 10 }, // High gen produces
        { ...createWhale('Consumer', ['consumption']), generation: 1 }, // Consumes
      ];
      const change = service.calculateAetherMistChange(whales);
      // Should be positive since high gen produces more than consumption reduces
      expect(change).toBeGreaterThan(0);
    });
  });
});
