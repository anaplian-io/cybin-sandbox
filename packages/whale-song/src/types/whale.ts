import type { Trait } from './trait.js';

export interface WhaleStats {
  health: number;
  maxHealth: number;
  aetherMistProduction: number;
}

export interface Whale {
  id: string;
  name: string;
  traits: Trait[];
  stats: WhaleStats;
  generation: number;
}

export function createWhale(name: string, traits: Trait[] = []): Whale {
  return {
    id: `whale-${Date.now()}`,
    name,
    traits,
    stats: {
      health: 100,
      maxHealth: 100,
      aetherMistProduction: 1,
    },
    generation: 1,
  };
}
