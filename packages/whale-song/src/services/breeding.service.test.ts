import { describe, it, expect, vi } from 'vitest';
import type { Trait } from '../types/trait.js';
import { BreedingService } from './breeding.service.js';

describe('BreedingService', () => {
  describe('breedTraits', () => {
    it('returns traits from both parents when inheritChance is 1.0', () => {
      const random = vi.fn().mockReturnValue(0); // Always inherit
      const service = new BreedingService(random);

      const parentA: Trait[] = ['speed', 'capacity'];
      const parentB: Trait[] = ['resilience', 'thermotolerance'];

      const traits = service.breedTraits(parentA, parentB);

      expect(traits).toEqual(
        expect.arrayContaining([
          'speed',
          'capacity',
          'resilience',
          'thermotolerance',
        ]),
      );
    });

    it('returns traits from one parent when inheritChance is 0', () => {
      const random = vi.fn().mockReturnValue(1); // Never inherit
      const service = new BreedingService(random);

      const parentA: Trait[] = ['speed', 'capacity'];
      const parentB: Trait[] = ['resilience', 'thermotolerance'];

      const traits = service.breedTraits(parentA, parentB);

      // Should get at least one trait (fallback)
      expect(traits.length).toBeGreaterThan(0);
    });
  });

  describe('predictOffspringTraits', () => {
    it('returns probability 1 for traits in both parents', () => {
      const service = new BreedingService(() => 0.5);

      const parentA: Trait[] = ['speed', 'capacity'];
      const parentB: Trait[] = ['speed', 'resilience'];

      const predictions = service.predictOffspringTraits(parentA, parentB);

      expect(predictions.find((p) => p.trait === 'speed')?.probability).toBe(1);
    });

    it('returns probability based on presence in parents', () => {
      const service = new BreedingService(() => 0.5);

      const parentA: Trait[] = ['speed'];
      const parentB: Trait[] = ['capacity'];

      const predictions = service.predictOffspringTraits(parentA, parentB);

      expect(predictions.find((p) => p.trait === 'speed')?.probability).toBe(
        0.25,
      );
      expect(predictions.find((p) => p.trait === 'capacity')?.probability).toBe(
        0.25,
      );
    });
  });
});
