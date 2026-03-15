import * as fs from 'fs';
import * as path from 'path';
import os from 'os';
import type { SaveGame, SaveSlotList, SaveStorage } from '../types/save.js';

const SAVE_DIR = path.join(os.homedir(), '.whale-song', 'saves');

export class FileSaveStorage implements SaveStorage {
  constructor(saveDir: string = SAVE_DIR) {
    this.saveDir = saveDir;
  }

  private saveDir: string;

  private ensureDir(): void {
    if (!fs.existsSync(this.saveDir)) {
      fs.mkdirSync(this.saveDir, { recursive: true });
    }
  }

  async list(): Promise<SaveSlotList> {
    this.ensureDir();

    const files = fs.readdirSync(this.saveDir);
    const saves: SaveSlotList = {};

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      try {
        const content = fs.readFileSync(path.join(this.saveDir, file), 'utf-8');
        const save: SaveGame = JSON.parse(content);
        const slotId = file.replace('.json', '');

        saves[slotId] = {
          id: slotId,
          timestamp: save.timestamp,
          turn: save.gameState.turn,
          whalesCount: save.gameState.whales.length,
          aetherMist: save.gameState.aetherMist,
        };
      } catch {
        // Skip corrupted saves
      }
    }

    return saves;
  }

  async get(slotId: string): Promise<SaveGame | null> {
    this.ensureDir();

    const filePath = path.join(this.saveDir, `${slotId}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  async save(slotId: string, game: SaveGame): Promise<void> {
    this.ensureDir();

    const filePath = path.join(this.saveDir, `${slotId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(game, null, 2));
  }

  async delete(slotId: string): Promise<void> {
    this.ensureDir();

    const filePath = path.join(this.saveDir, `${slotId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
