export type Trait =
  | 'speed'
  | 'capacity'
  | 'resilience'
  | 'thermotolerance'
  | 'predatorDeterrence'
  | 'efficiency'
  | 'consumption';

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

export function getTraitBonus(whale: Whale, trait: Trait): number {
  const hasTrait = whale.traits.includes(trait);
  return hasTrait ? 1 : 0;
}

export function calculateAetherMistProduction(whale: Whale): number {
  const base = 1;
  const capacityBonus = getTraitBonus(whale, 'capacity');
  const resilienceBonus = getTraitBonus(whale, 'resilience');
  return base + capacityBonus * 0.5 + resilienceBonus * 0.25;
}
