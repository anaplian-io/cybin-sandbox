import { render, screen } from '@testing-library/react';
import React from 'react';
import EvolutionDisplay from './evolution.js';

describe('EvolutionDisplay', () => {
  it('shows placeholder when no evolution log provided', () => {
    render(<EvolutionDisplay />);

    expect(screen.getByText(/Evolution Log \(no changes yet\)/i)).toBeDefined();
  });

  it('shows placeholder when evolution log is empty', () => {
    render(<EvolutionDisplay evolutionLog={{ entries: [], maxEntries: 50 }} />);

    expect(screen.getByText(/Evolution Log \(no changes yet\)/i)).toBeDefined();
  });

  it('displays evolution entries in order', () => {
    render(
      <EvolutionDisplay
        evolutionLog={{
          entries: [
            {
              id: 'evolution-1',
              text: 'Whale pod developed thermal resistance',
              turn: 12,
            },
          ],
          maxEntries: 50,
        }}
      />,
    );

    expect(screen.getByText(/Day 12:/i)).toBeDefined();
    expect(
      screen.getByText(/Whale pod developed thermal resistance/i),
    ).toBeDefined();
  });

  it('limits display to 5 entries (most recent)', () => {
    const manyEntries = Array.from({ length: 10 }).map((_, i) => ({
      id: `evolution-${i}`,
      text: `Evolution event ${i + 1}`,
      turn: i,
    }));

    render(
      <EvolutionDisplay
        evolutionLog={{ entries: manyEntries, maxEntries: 50 }}
      />,
    );

    // Entries are rendered in array order, sliced to first 5
    expect(screen.getByText(/Day 0:/i)).toBeDefined();
    expect(screen.getByText(/Evolution event 1/i)).toBeDefined();
    expect(screen.getByText(/Day 4:/i)).toBeDefined();
    expect(screen.getByText(/Evolution event 5/i)).toBeDefined();
    // Entry 6 should NOT be shown (only first 5)
    expect(screen.queryByText(/Day 5:/i)).toBeNull();
    expect(screen.queryByText(/Evolution event 6/i)).toBeNull();
  });
});
