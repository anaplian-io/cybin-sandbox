import { FileSaveStorage } from './file-save-storage.js';
import type { GameState } from '../types/game.types.js';
import * as fs from 'fs';

describe('FileSaveStorage', () => {
  let storage: FileSaveStorage;
  let testDir: string;

  beforeEach(() => {
    // Use a unique test directory for each test
    testDir =
      '/tmp/whale-song-test-saves-' +
      Date.now() +
      '-' +
      Math.random().toString(36).substring(7);
    storage = new FileSaveStorage(testDir);
  });

  afterEach(() => {
    // Clean up test directory after each test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('lists empty saves when no files exist', async () => {
    const saves = await storage.list();
    expect(Object.keys(saves).length).toBe(0);
  });

  it('saves and loads game state', async () => {
    const saveGame = {
      version: '1.0.0',
      timestamp: Date.now(),
      gameState: {
        world: {
          width: 20,
          height: 15,
          tiles: new Map(),
        },
        shipPosition: { x: 10, y: 7 },
        whales: [],
        turn: 5,
        aetherMist: 100,
        tradeInventory: { aetherMist: 0 },
      } as GameState,
    };

    await storage.save('test-save', saveGame);

    const loaded = await storage.get('test-save');
    expect(loaded).toBeDefined();
    expect(loaded?.version).toBe('1.0.0');
  });

  it('lists saves correctly', async () => {
    const saveGame = {
      version: '1.0.0',
      timestamp: 1234567890,
      gameState: {
        world: {
          width: 20,
          height: 15,
          tiles: new Map(),
        },
        shipPosition: { x: 10, y: 7 },
        whales: [],
        turn: 5,
        aetherMist: 100,
        tradeInventory: { aetherMist: 0 },
      } as GameState,
    };

    await storage.save('save-1', saveGame);
    await storage.save('save-2', { ...saveGame, timestamp: 1234567891 });

    const saves = await storage.list();
    expect(Object.keys(saves).length).toBe(2);
    expect(saves['save-1']).toBeDefined();
    expect(saves['save-2']).toBeDefined();
  });

  it('deletes save correctly', async () => {
    const saveGame = {
      version: '1.0.0',
      timestamp: Date.now(),
      gameState: {
        world: {
          width: 20,
          height: 15,
          tiles: new Map(),
        },
        shipPosition: { x: 10, y: 7 },
        whales: [],
        turn: 5,
        aetherMist: 100,
        tradeInventory: { aetherMist: 0 },
      } as GameState,
    };

    await storage.save('to-delete', saveGame);
    expect(await storage.get('to-delete')).toBeDefined();

    await storage.delete('to-delete');
    expect(await storage.get('to-delete')).toBeNull();
  });

  it('returns null for non-existent save', async () => {
    const result = await storage.get('nonexistent');
    expect(result).toBeNull();
  });

  it('handles corrupted save files', async () => {
    // Create test directory and a malformed JSON file
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testDir + '/corrupted.json', '{invalid json');

    const result = await storage.get('corrupted');
    expect(result).toBeNull();
  });

  it('handles deleting non-existent save', async () => {
    // Deleting a file that doesn't exist should not throw
    await expect(storage.delete('nonexistent')).resolves.not.toThrow();
  });
});
