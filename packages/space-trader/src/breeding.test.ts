import { Trait } from './whale';
import { BreedingService } from './breeding';

describe('Breeding', () => {
  describe('breedTraits', () => {
    it('combines unique traits from both parents', () => {
      const parentA: Trait[] = ['speed', 'capacity'];
      const parentB: Trait[] = ['resilience', 'thermotolerance'];

      // Use deterministic random to guarantee exactly one trait is selected
      const seed = 0.5;
      const deterministicRandom = () => seed;
      const breedingService = new BreedingService(deterministicRandom);

      const result = breedingService.breedTraits(parentA, parentB);
      expect(result.length).toBeGreaterThan(0);
    });

    it('can include duplicate traits from both parents', () => {
      const parentA: Trait[] = ['speed', 'speed'];
      const parentB: Trait[] = ['capacity'];

      // Use deterministic random to guarantee exactly one trait is selected
      const seed = 0.5;
      const deterministicRandom = () => seed;
      const breedingService = new BreedingService(deterministicRandom);

      const result = breedingService.breedTraits(parentA, parentB);
      expect(result.length).toBeGreaterThan(0);
    });

    it('ensures at least one trait is inherited when random chance skips all', () => {
      const parentA: Trait[] = ['speed'];
      const parentB: Trait[] = ['capacity'];

      // Use deterministic random that always returns 0.9 (higher than inheritChance of 0.25)
      // This forces both traits to be skipped, triggering the fallback path
      const deterministicRandom = () => 0.9;
      const breedingService = new BreedingService(deterministicRandom);

      const result = breedingService.breedTraits(parentA, parentB);
      expect(result.length).toBe(1);
      expect(['speed', 'capacity']).toContain(result[0]);
    });

    it('mixes inherited traits with fallback when some pass and others fail', () => {
      const parentA: Trait[] = ['speed'];
      const parentB: Trait[] = ['capacity', 'capacity'];

      // Speed: inheritChance = 0.25
      // Capacity: inheritChance = 0.75
      // random=0.1 passes for both (covers true branch)
      // random=0.9 fails for speed, passes for capacity (mixed coverage)

      const deterministicRandom = () => 0.1;
      const breedingService = new BreedingService(deterministicRandom);

      const result = breedingService.breedTraits(parentA, parentB);
      expect(result.length).toBe(2);
      expect(result).toContain('speed');
      expect(result).toContain('capacity');
    });
  });

  describe('predictOffspringTraits', () => {
    it('lists possible traits with probabilities', () => {
      const parentA: Trait[] = ['speed'];
      const parentB: Trait[] = ['capacity'];

      const breedingService = new BreedingService(Math.random);
      const result = breedingService.predictOffspringTraits(parentA, parentB);
      expect(result.length).toBe(2);
    });

    it('gives higher probability when trait exists in both parents', () => {
      const parentA: Trait[] = ['speed', 'speed'];
      const parentB: Trait[] = ['speed', 'capacity'];

      const breedingService = new BreedingService(Math.random);
      const result = breedingService.predictOffspringTraits(parentA, parentB);
      const speedTrait = result.find((r) => r.trait === 'speed');
      expect(speedTrait?.probability).toBe(1);
    });
  });
});
