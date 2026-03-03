// Data barrel for Whale Song
// This file now only exports data; logic has moved to utilities/

export {
  createWorld,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  getTile,
  isBreedingGround,
} from '../utilities/world-data.js';
export { type Tile } from '../utilities/tile.js';
