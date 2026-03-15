import { render, screen } from '@testing-library/react';
import React from 'react';
import MapDisplay from './map.js';

describe('MapDisplay', () => {
  it('renders the player whale at ship position', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<MapDisplay gameState={gameState} />);

    // The player whale (🐳) should be visible
    expect(screen.getByText(/🐳/i)).toBeDefined();
  });

  it('renders island tiles', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>([
          ['8,6', { type: 'island', x: 8, y: 6 }],
        ]),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<MapDisplay gameState={gameState} />);

    expect(screen.getByText(/⛓️/i)).toBeDefined();
  });

  it('renders waystation tiles', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>([
          ['9,8', { type: 'waystation', x: 9, y: 8 }],
        ]),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<MapDisplay gameState={gameState} />);

    expect(screen.getByText(/🏢/i)).toBeDefined();
  });

  it('renders breeding ground tiles', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>([
          ['11,6', { type: 'breedingGround', x: 11, y: 6 }],
        ]),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<MapDisplay gameState={gameState} />);

    expect(screen.getByText(/🌱/i)).toBeDefined();
  });

  it('renders empty ocean tiles', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 0, y: 0 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<MapDisplay gameState={gameState} />);

    // 11x11 grid = 121 dots
    const dots = screen.getAllByText('.');
    expect(dots.length).toBeGreaterThan(0);
  });
});
