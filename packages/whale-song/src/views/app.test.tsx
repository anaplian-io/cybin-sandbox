import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    expect(screen.getByText(/Whale Song v0\.1\.0/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Turn 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Aether: 100/i)).toBeInTheDocument();
  });
});
