import { render, screen } from '@testing-library/react';
import React from 'react';
import { App as AppComponent } from './app.js';

describe('App', () => {
  it('renders the Whale Song header', () => {
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

    render(<AppComponent gameState={gameState} />);
    expect(screen.getByText(/Whale Song v0\.1\.0/i)).toBeDefined();
  });

  it('renders map viewport', () => {
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

    render(<AppComponent gameState={gameState} />);
    expect(screen.getByText(/Turn 1/i)).toBeDefined();
    expect(screen.getByText(/Aether: 100/i)).toBeDefined();
  });

  it('renders status panel with ship position', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 5, y: 8 },
      whales: [],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<AppComponent gameState={gameState} />);
    expect(screen.getByText(/Position:/i)).toBeDefined();
  });

  it('shows whale count in status panel', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [
        {
          id: 'whale-1',
          name: 'Blue Whale',
          traits: [],
          stats: {
            health: 100,
            maxHealth: 100,
            aetherMistProduction: 1,
          },
          generation: 1,
        },
      ],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<AppComponent gameState={gameState} />);
    expect(screen.getByText(/Whales:/i)).toBeDefined();
  });

  it('does not show whale fleet modal by default', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [
        {
          id: 'whale-1',
          name: 'Blue Whale',
          traits: [],
          stats: {
            health: 100,
            maxHealth: 100,
            aetherMistProduction: 1,
          },
          generation: 1,
        },
      ],
      turn: 1,
      aetherMist: 100,
      tradeInventory: { aetherMist: 0 },
    };

    render(<AppComponent gameState={gameState} />);

    // Whale fleet modal should NOT be visible by default
    expect(screen.queryByText(/Your Whale Fleet/i)).toBeNull();
  });
});
