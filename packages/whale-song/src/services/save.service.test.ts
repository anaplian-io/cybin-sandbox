import { generateSaveId, createSave, SaveService } from './save.service.js';
import type { GameState, SaveGame, SaveSlotList } from '../types/index.js';

class MockStorage {
  private saves: Record<string, SaveGame> = {};

  async list(): Promise<SaveSlotList> {
    const slots: SaveSlotList = {};
    for (const [slotId, save] of Object.entries(this.saves)) {
      slots[slotId] = {
        id: slotId,
        timestamp: save.timestamp,
        turn: save.gameState.turn,
        whalesCount: save.gameState.whales.length,
        aetherMist: save.gameState.aetherMist,
      };
    }
    return slots;
  }

  async get(slotId: string): Promise<SaveGame | null> {
    return this.saves[slotId] ?? null;
  }

  async save(slotId: string, game: SaveGame): Promise<void> {
    this.saves[slotId] = game;
  }

  async delete(slotId: string): Promise<void> {
    delete this.saves[slotId];
  }
}

describe('SaveService', () => {
  let service: SaveService;
  let mockStorage: MockStorage;

  beforeEach(() => {
    mockStorage = new MockStorage();
    service = new SaveService(mockStorage);
  });

  it('generates save IDs with correct format', () => {
    const id = generateSaveId();
    expect(id).toMatch(/^save-\d+$/);
  });

  it('creates save with correct structure', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 1,
      aetherMist: 0,
      tradeInventory: { aetherMist: 0 },
    } as GameState;

    const timestamp = 1234567890;
    const save = createSave(gameState, timestamp);

    expect(save.version).toBe('1.0.0');
    expect(save.timestamp).toBe(timestamp);
    expect(save.gameState).toBe(gameState);
  });

  it('creates save with default timestamp', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 1,
      aetherMist: 0,
      tradeInventory: { aetherMist: 0 },
    } as GameState;

    const save = createSave(gameState);

    expect(save.version).toBe('1.0.0');
    expect(typeof save.timestamp).toBe('number');
    expect(save.gameState).toBe(gameState);
  });

  it('lists saves', async () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 1,
      aetherMist: 0,
      tradeInventory: { aetherMist: 0 },
    } as GameState;

    await service.save('slot-1', gameState);
    await service.save('slot-2', gameState);

    const saves = await service.listSaves();
    expect(Object.keys(saves).length).toBe(2);
  });

  it('saves game state', async () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 5,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    } as GameState;

    await service.save('my-save', gameState);

    const loaded = await service.load('my-save');
    expect(loaded).toBeDefined();
    expect(loaded?.turn).toBe(5);
    expect(loaded?.aetherMist).toBe(100);
  });

  it('loads returns null for non-existent save', async () => {
    const loaded = await service.load('nonexistent');
    expect(loaded).toBeNull();
  });

  it('deletes save', async () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 1,
      aetherMist: 0,
      tradeInventory: { aetherMist: 0 },
    } as GameState;

    await service.save('to-delete', gameState);
    expect(await service.hasSave('to-delete')).toBe(true);

    await service.delete('to-delete');
    expect(await service.hasSave('to-delete')).toBe(false);
  });
});
