import {
  createWhale,
  getTraitBonus,
  calculateAetherMistProduction,
  Trait,
} from './whale';

describe('Whale', () => {
  it('creates a whale with default stats', () => {
    const whale = createWhale('Test Whale');

    expect(whale.name).toBe('Test Whale');
    expect(whale.traits).toEqual([]);
    expect(whale.stats.health).toBe(100);
    expect(whale.stats.maxHealth).toBe(100);
    expect(whale.generation).toBe(1);
  });

  it('creates a whale with traits', () => {
    const traits: Trait[] = ['speed', 'capacity'];
    const whale = createWhale('Fast Whale', traits);

    expect(whale.traits).toEqual(['speed', 'capacity']);
  });

  it('returns 0 for non-existent trait', () => {
    const whale = createWhale('No Traits Whale');

    expect(getTraitBonus(whale, 'speed')).toBe(0);
  });

  it('returns 1 for existing trait', () => {
    const whale = createWhale('Speed Whale', ['speed']);

    expect(getTraitBonus(whale, 'speed')).toBe(1);
  });

  it('calculates aether mist production with no traits', () => {
    const whale = createWhale('Base Whale');

    expect(calculateAetherMistProduction(whale)).toBe(1);
  });

  it('calculates aether mist production with capacity trait', () => {
    const whale = createWhale('Capacity Whale', ['capacity']);

    expect(calculateAetherMistProduction(whale)).toBe(1.5);
  });

  it('calculates aether mist production with multiple traits', () => {
    const whale = createWhale('Multitrait Whale', ['capacity', 'resilience']);

    expect(calculateAetherMistProduction(whale)).toBe(1.75);
  });
});
