// Whale trait constants and types

export const TRAITS = {
  SPEED: 'speed',
  CAPACITY: 'capacity',
  RESILIENCE: 'resilience',
  THERMOTOLERANCE: 'thermotolerance',
  PREDATOR_DETERRENCE: 'predatorDeterrence',
  EFFICIENCY: 'efficiency',
  CONSUMPTION: 'consumption',
} as const;

export type Trait = (typeof TRAITS)[keyof typeof TRAITS];
