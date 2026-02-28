import type {
  SeasonState,
  SeasonConfig,
  SeasonName,
  EnvironmentalPressure,
  SeasonSystem,
} from './season.types';

// Default season configurations
const defaultSeasonConfig: Record<SeasonName, SeasonConfig> = {
  spring: {
    name: 'spring',
    durationTurns: 20,
    environmentalPressure: {
      temperature: 'mild',
      airCurrents: 'moderate',
      breedingSuccessBonus: 0.15, // +15% success rate
    },
  },
  summer: {
    name: 'summer',
    durationTurns: 20,
    environmentalPressure: {
      temperature: 'hot',
      airCurrents: 'moderate',
    },
  },
  autumn: {
    name: 'autumn',
    durationTurns: 20,
    environmentalPressure: {
      temperature: 'mild',
      airCurrents: 'turbulent',
    },
  },
  winter: {
    name: 'winter',
    durationTurns: 20,
    environmentalPressure: {
      temperature: 'cold',
      airCurrents: 'calm',
      breedingSuccessBonus: -0.1, // -10% success rate
    },
  },
};

export function initializeSeasonState(): SeasonState {
  return {
    currentSeason: 'spring',
    turnInSeason: 0,
    totalTurnsInCycle: 80, // 4 seasons × 20 turns each
  };
}

export function advanceSeason(state: SeasonState): SeasonState {
  const seasons: SeasonName[] = ['spring', 'summer', 'autumn', 'winter'];
  const currentIdx = seasons.indexOf(state.currentSeason);
  const nextIdx = (currentIdx + 1) % seasons.length;
  const nextSeason = seasons[nextIdx];

  return {
    currentSeason: nextSeason,
    turnInSeason: 0,
    totalTurnsInCycle: state.totalTurnsInCycle,
  };
}

export function advanceTurn(state: SeasonState): SeasonState {
  const newTurnInSeason = state.turnInSeason + 1;

  // Check if season should advance
  const config = defaultSeasonConfig[state.currentSeason];
  if (newTurnInSeason >= config.durationTurns) {
    return advanceSeason(state);
  }

  return {
    ...state,
    turnInSeason: newTurnInSeason,
  };
}

export function getCurrentEnvironmentalPressure(
  state: SeasonState,
): EnvironmentalPressure {
  return defaultSeasonConfig[state.currentSeason].environmentalPressure;
}

export function getSeasonConfig(season: SeasonName): SeasonConfig {
  return defaultSeasonConfig[season];
}

export function createSeasonSystem(
  initialState?: Partial<SeasonState>,
): SeasonSystem {
  return {
    config: defaultSeasonConfig,
    currentState: {
      ...initializeSeasonState(),
      ...initialState,
    },
  };
}

export function isBreedingBonusSeason(state: SeasonState): boolean {
  const pressure = getCurrentEnvironmentalPressure(state);
  return (pressure.breedingSuccessBonus ?? 0) > 0;
}

export function isBreedingPenaltySeason(state: SeasonState): boolean {
  const pressure = getCurrentEnvironmentalPressure(state);
  return (pressure.breedingSuccessBonus ?? 0) < 0;
}
