// Tile type constants—no logic, just definitions

export const TILE_TYPES = {
  EMPTY: 'empty',
  ISLAND: 'island',
  WAYSTATION: 'waystation',
  STORM: 'storm',
  BREEDING_GROUND: 'breedingGround',
} as const;

export type TileType = (typeof TILE_TYPES)[keyof typeof TILE_TYPES];
