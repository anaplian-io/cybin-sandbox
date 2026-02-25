import { Trait } from './whale';

export type MatingPair = {
  parentA: Trait[];
  parentB: Trait[];
};

// Invert dependency on randomness for testability
export interface RandomGenerator {
  (): number;
}

export class BreedingService {
  constructor(private readonly random: RandomGenerator) {}

  breedTraits(parentA: Trait[], parentB: Trait[]): Trait[] {
    const allTraits = [...parentA, ...parentB];
    const uniqueTraits = Array.from(new Set(allTraits));
    const selectedTraits: Trait[] = [];

    for (const trait of uniqueTraits) {
      const countA = parentA.filter((t) => t === trait).length;
      const countB = parentB.filter((t) => t === trait).length;
      const combinedCount = countA + countB;
      const inheritChance = combinedCount / 4;

      if (this.random() < inheritChance) {
        selectedTraits.push(trait);
      }
    }

    if (selectedTraits.length === 0 && uniqueTraits.length > 0) {
      const randomTrait =
        uniqueTraits[Math.floor(this.random() * uniqueTraits.length)];
      selectedTraits.push(randomTrait);
    }

    return selectedTraits;
  }

  predictOffspringTraits(
    parentA: Trait[],
    parentB: Trait[],
  ): { trait: Trait; probability: number }[] {
    const allTraits = Array.from(new Set([...parentA, ...parentB]));

    return allTraits.map((trait) => {
      const countA = parentA.filter((t) => t === trait).length;
      const countB = parentB.filter((t) => t === trait).length;
      const isInBoth = countA > 0 && countB > 0;

      return {
        trait,
        probability: isInBoth ? 1 : (countA + countB) / 4,
      };
    });
  }
}
