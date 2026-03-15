import { render, screen } from '@testing-library/react';
import React from 'react';
import StatusDisplay from './status.js';

describe('StatusDisplay', () => {
  it('renders all status fields with season state', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [
        {
          id: 'w1',
          name: 'Test',
          traits: [],
          stats: { health: 100, maxHealth: 100, aetherMistProduction: 1 },
          generation: 1,
        },
      ],
      turn: 5,
      aetherMist: 200,
      seasonState: {
        currentSeason: 'spring',
        turnInSeason: 12,
        totalTurnsInCycle: 80,
      },
    };

    render(<StatusDisplay gameState={gameState} />);

    expect(screen.getByText('Position:')).toBeDefined();
    expect(screen.getByText('Turn:')).toBeDefined();
    expect(screen.getByText('Whales:')).toBeDefined();
    expect(screen.getByText('Aether:')).toBeDefined();
    expect(screen.getByText('Season:')).toBeDefined();
  });

  it('renders Unknown season when no season state', () => {
    const gameState = {
      world: {
        width: 20,
        height: 15,
        tiles: new Map<string, { type: string; x: number; y: number }>(),
      },
      shipPosition: { x: 10, y: 7 },
      whales: [],
      turn: 5,
      aetherMist: 200,
      seasonState: undefined,
    };

    render(<StatusDisplay gameState={gameState} />);

    expect(screen.getByText('Unknown season')).toBeDefined();
  });
});
