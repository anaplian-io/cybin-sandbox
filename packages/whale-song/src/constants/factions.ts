// Faction constants

export const FACTIONS = {
  MERCHANT: 'merchant',
  EXPLORER: 'explorer',
  SCHOLAR: 'scholar',
  HERMIT: 'hermit',
} as const;

export type Faction = (typeof FACTIONS)[keyof typeof FACTIONS];
