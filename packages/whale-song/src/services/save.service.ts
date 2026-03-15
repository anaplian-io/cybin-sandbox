import type { GameState } from '../types/game.types.js';
import type { SaveGame, SaveSlotList } from '../types/save.js';
import type { SaveStorage } from '../types/save.js';

// Generate a save slot ID based on timestamp
export function generateSaveId(): string {
  return `save-${Date.now()}`;
}

// Create a save game from current state
export function createSave(
  gameState: GameState,
  timestamp = Date.now(),
): SaveGame {
  return {
    version: '1.0.0',
    timestamp,
    gameState,
  };
}

// Service class for save/load operations
export class SaveService {
  constructor(private storage: SaveStorage) {}

  // List all available saves
  async listSaves(): Promise<SaveSlotList> {
    return this.storage.list();
  }

  // Save current game state to a slot
  async save(slotId: string, gameState: GameState): Promise<void> {
    const save = createSave(gameState);
    await this.storage.save(slotId, save);
  }

  // Load game state from a slot
  async load(slotId: string): Promise<GameState | null> {
    const save = await this.storage.get(slotId);
    return save?.gameState ?? null;
  }

  // Delete a save
  async delete(slotId: string): Promise<void> {
    await this.storage.delete(slotId);
  }

  // Check if a save slot exists
  async hasSave(slotId: string): Promise<boolean> {
    const save = await this.storage.get(slotId);
    return save !== null;
  }
}
