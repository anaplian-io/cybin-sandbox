import type { GameState } from './game.types.js';

// Save file format (extends GameState with metadata)
export interface SaveGame {
  version: string;
  timestamp: number; // Unix epoch
  gameState: GameState;
}

// Save slot data (summary for listing)
export interface SaveSlot {
  id: string; // filename without extension
  timestamp: number;
  turn: number;
  whalesCount: number;
  aetherMist: number;
}

// Available save slots
export interface SaveSlotList {
  [key: string]: SaveSlot;
}

// Storage interface for different backends
export interface SaveStorage {
  list(): Promise<SaveSlotList>;
  get(slotId: string): Promise<SaveGame | null>;
  save(slotId: string, game: SaveGame): Promise<void>;
  delete(slotId: string): Promise<void>;
}
