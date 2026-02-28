// Season configuration
export interface SeasonConfig {
  name: SeasonName;
  durationTurns: number;
  environmentalPressure: EnvironmentalPressure;
}

export type SeasonName = 'spring' | 'summer' | 'autumn' | 'winter';

export interface EnvironmentalPressure {
  temperature: 'cold' | 'mild' | 'hot';
  airCurrents: 'calm' | 'moderate' | 'turbulent';
  breedingSuccessBonus?: number;
}

// Current season state
export interface SeasonState {
  currentSeason: SeasonName;
  turnInSeason: number;
  totalTurnsInCycle: number; // 4 seasons × duration
}

// Season progression system
export interface SeasonSystem {
  config: Record<SeasonName, SeasonConfig>;
  currentState: SeasonState;
}
