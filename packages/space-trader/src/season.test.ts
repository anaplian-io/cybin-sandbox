import type { SeasonState, SeasonName } from './season.types';
import {
  initializeSeasonState,
  advanceSeason,
  advanceTurn,
  getCurrentEnvironmentalPressure,
  getSeasonConfig,
  createSeasonSystem,
  isBreedingBonusSeason,
  isBreedingPenaltySeason,
} from './season.service';

describe('Season Service', () => {
  describe('initializeSeasonState', () => {
    it('creates initial season state with spring', () => {
      const state = initializeSeasonState();
      expect(state.currentSeason).toBe('spring');
      expect(state.turnInSeason).toBe(0);
      expect(state.totalTurnsInCycle).toBe(80);
    });
  });

  describe('advanceSeason', () => {
    it('advances from spring to summer', () => {
      const state: SeasonState = {
        currentSeason: 'spring',
        turnInSeason: 20,
        totalTurnsInCycle: 80,
      };
      const newState = advanceSeason(state);
      expect(newState.currentSeason).toBe('summer');
      expect(newState.turnInSeason).toBe(0);
    });

    it('cycles from winter to spring', () => {
      const state: SeasonState = {
        currentSeason: 'winter',
        turnInSeason: 20,
        totalTurnsInCycle: 80,
      };
      const newState = advanceSeason(state);
      expect(newState.currentSeason).toBe('spring');
    });

    it('resets turn counter when season changes', () => {
      const state: SeasonState = {
        currentSeason: 'summer',
        turnInSeason: 20,
        totalTurnsInCycle: 80,
      };
      const newState = advanceSeason(state);
      expect(newState.turnInSeason).toBe(0);
    });
  });

  describe('advanceTurn', () => {
    it('increments turn within season', () => {
      const state = initializeSeasonState();
      const newState = advanceTurn(state);
      expect(newState.turnInSeason).toBe(1);
      expect(newState.currentSeason).toBe('spring');
    });

    it('advances season when turn limit reached', () => {
      const state: SeasonState = {
        currentSeason: 'spring',
        turnInSeason: 19,
        totalTurnsInCycle: 80,
      };
      const newState = advanceTurn(state);
      expect(newState.currentSeason).toBe('summer');
      expect(newState.turnInSeason).toBe(0);
    });

    it('maintains totalTurnsInCycle', () => {
      const state = initializeSeasonState();
      const newState = advanceTurn(state);
      expect(newState.totalTurnsInCycle).toBe(80);
    });
  });

  describe('getCurrentEnvironmentalPressure', () => {
    it('returns spring environmental conditions', () => {
      const state: SeasonState = {
        currentSeason: 'spring',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      const pressure = getCurrentEnvironmentalPressure(state);
      expect(pressure.temperature).toBe('mild');
      expect(pressure.airCurrents).toBe('moderate');
    });

    it('returns summer environmental conditions', () => {
      const state: SeasonState = {
        currentSeason: 'summer',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      const pressure = getCurrentEnvironmentalPressure(state);
      expect(pressure.temperature).toBe('hot');
    });

    it('returns winter environmental conditions', () => {
      const state: SeasonState = {
        currentSeason: 'winter',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      const pressure = getCurrentEnvironmentalPressure(state);
      expect(pressure.temperature).toBe('cold');
      expect(pressure.airCurrents).toBe('calm');
    });
  });

  describe('getSeasonConfig', () => {
    it('returns config for spring', () => {
      const config = getSeasonConfig('spring');
      expect(config.name).toBe('spring');
      expect(config.durationTurns).toBe(20);
    });

    it('returns config for all seasons', () => {
      const seasons: SeasonName[] = ['spring', 'summer', 'autumn', 'winter'];
      for (const season of seasons) {
        const config = getSeasonConfig(season);
        expect(config.name).toBe(season);
      }
    });
  });

  describe('createSeasonSystem', () => {
    it('creates season system with default state', () => {
      const system = createSeasonSystem();
      expect(system.currentState.currentSeason).toBe('spring');
    });

    it('allows custom initial state', () => {
      const system = createSeasonSystem({
        currentSeason: 'autumn',
        turnInSeason: 10,
      });
      expect(system.currentState.currentSeason).toBe('autumn');
      expect(system.currentState.turnInSeason).toBe(10);
    });
  });

  describe('isBreedingBonusSeason', () => {
    it('returns true for spring (breeding bonus)', () => {
      const state: SeasonState = {
        currentSeason: 'spring',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingBonusSeason(state)).toBe(true);
    });

    it('returns false for winter (breeding penalty)', () => {
      const state: SeasonState = {
        currentSeason: 'winter',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingBonusSeason(state)).toBe(false);
    });

    it('returns false for seasons without bonus', () => {
      const summerState: SeasonState = {
        currentSeason: 'summer',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingBonusSeason(summerState)).toBe(false);

      const autumnState: SeasonState = {
        currentSeason: 'autumn',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingBonusSeason(autumnState)).toBe(false);
    });
  });

  describe('isBreedingPenaltySeason', () => {
    it('returns true for winter (breeding penalty)', () => {
      const state: SeasonState = {
        currentSeason: 'winter',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingPenaltySeason(state)).toBe(true);
    });

    it('returns false for spring (breeding bonus)', () => {
      const state: SeasonState = {
        currentSeason: 'spring',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingPenaltySeason(state)).toBe(false);
    });

    it('returns false for seasons without penalty', () => {
      const summerState: SeasonState = {
        currentSeason: 'summer',
        turnInSeason: 5,
        totalTurnsInCycle: 80,
      };
      expect(isBreedingPenaltySeason(summerState)).toBe(false);
    });
  });
});
