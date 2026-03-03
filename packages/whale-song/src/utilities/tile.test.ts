import { describe, it, expect } from 'vitest';
import { createTile, getKey } from '../utilities/tile.js';

describe('tile utilities', () => {
  describe('getKey', () => {
    it('creates coordinate key', () => {
      expect(getKey(3, 5)).toBe('3,5');
    });
  });

  describe('createTile', () => {
    it('creates a tile with default type', () => {
      const tile = createTile(2, 4);

      expect(tile.x).toBe(2);
      expect(tile.y).toBe(4);
      expect(tile.type).toBe('empty');
    });

    it('creates a tile with custom type', () => {
      const tile = createTile(2, 4, 'island');

      expect(tile.type).toBe('island');
    });
  });
});
