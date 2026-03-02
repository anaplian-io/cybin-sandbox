import { describe, it, expect } from 'vitest';
import {
  initializeSeasonState,
  advanceSeason,
  advanceTurn,
  getCurrentEnvironmentalPressure,
  isBreedingBonusSeason,
  isBreedingPenaltySeason,
} from './season.service.js';

describe('SeasonService', () => {
  describe('advanceSeason', () => {
    it('advances to next season in cycle', () => {
      const state = initializeSeasonState();

      const nextState = advanceSeason(state);

      expect(nextState.currentSeason).toBe('summer');
      expect(nextState.turnInSeason).toBe(0);
    });

    it('cycles from winter back to spring', () => {
      const state = initializeSeasonState();
      state.currentSeason = 'winter';

      const nextState = advanceSeason(state);

      expect(nextState.currentSeason).toBe('spring');
    });
  });

  describe('advanceTurn', () => {
    it('increments turn count within season', () => {
      const state = initializeSeasonState();

      const nextState = advanceTurn(state);

      expect(nextState.turnInSeason).toBe(1);
    });

    it('advances season when turn limit reached', () => {
      const state = initializeSeasonState();
      state.turnInSeason = 19; // Last turn of spring

      const nextState = advanceTurn(state);

      expect(nextState.currentSeason).toBe('summer');
    });
  });

  describe('getCurrentEnvironmentalPressure', () => {
    it('returns pressure for spring (breeding bonus)', () => {
      const state = initializeSeasonState();

      const pressure = getCurrentEnvironmentalPressure(state);

      expect(pressure.temperature).toBe('mild');
      expect(pressure.airCurrents).toBe('moderate');
      expect(pressure.breedingSuccessBonus).toBe(0.15);
    });

    it('returns pressure for winter (breeding penalty)', () => {
      const state = initializeSeasonState();
      state.currentSeason = 'winter';

      const pressure = getCurrentEnvironmentalPressure(state);

      expect(pressure.breedingSuccessBonus).toBe(-0.1);
    });
  });

  describe('isBreedingBonusSeason', () => {
    it('returns true for spring', () => {
      const state = initializeSeasonState();
      expect(isBreedingBonusSeason(state)).toBe(true);
    });

    it('returns false for winter', () => {
      const state = initializeSeasonState();
      state.currentSeason = 'winter';
      expect(isBreedingBonusSeason(state)).toBe(false);
    });
  });

  describe('isBreedingPenaltySeason', () => {
    it('returns false for spring', () => {
      const state = initializeSeasonState();
      expect(isBreedingPenaltySeason(state)).toBe(false);
    });

    it('returns true for winter', () => {
      const state = initializeSeasonState();
      state.currentSeason = 'winter';
      expect(isBreedingPenaltySeason(state)).toBe(true);
    });
  });
});
