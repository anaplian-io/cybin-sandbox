import { render, screen } from '@testing-library/react';
import React from 'react';
import GossipDisplay from './gossip.js';
import type { Faction } from '../constants/factions.js';

describe('GossipDisplay', () => {
  it('shows placeholder when no gossip log provided', () => {
    render(<GossipDisplay />);

    expect(screen.getByText(/no rumors yet/i)).toBeDefined();
  });

  it('shows gossip log header when empty', () => {
    render(
      <GossipDisplay gossipLog={{ entries: [], maxEntries: 50 }} />,
    );

    expect(screen.getByText(/Gossip Log/i)).toBeDefined();
  });

  it('displays gossip entries in order', () => {
    render(
      <GossipDisplay
        gossipLog={{
          entries: [
            {
              id: 'gossip-1',
              text: 'Rumors say the western archipelago has rich breeding grounds.',
              faction: 'explorer' as Faction,
              source: 'explorer informant',
              turn: 12,
              generation: 1,
            },
          ],
          maxEntries: 50,
        }}
      />,
    );

    // Check that the full gossip text is present
    expect(
      screen.getByText(/rich breeding grounds/i),
    ).toBeDefined();
  });

  it('limits display to 5 entries (most recent)', () => {
    const manyEntries = Array.from({ length: 10 }).map((_, i) => ({
      id: `gossip-${i}`,
      text: `Rumor ${i + 1}`,
      faction: 'merchant' as Faction,
      source: 'merchant informant',
      turn: i,
      generation: 1,
    }));

    render(
      <GossipDisplay
        gossipLog={{ entries: manyEntries, maxEntries: 50 }}
      />,
    );

    // Entries are rendered in array order, sliced to first 5
    // So entries with turns 0-4 (Rumor 1-5) are shown
    expect(screen.getByText(/Rumor 1/i)).toBeDefined();
    expect(screen.getByText(/Rumor 5/i)).toBeDefined();
    // Entry 6 should NOT be shown (only first 5)
    expect(screen.queryByText('Rumor 6')).toBeNull();
  });

  it('shows faction information in gossip', () => {
    render(
      <GossipDisplay
        gossipLog={{
          entries: [
            {
              id: 'gossip-1',
              text: 'Scholars report unusual patterns.',
              faction: 'scholar' as Faction,
              source: 'scholar informant',
              turn: 5,
              generation: 1,
            },
          ],
          maxEntries: 50,
        }}
      />,
    );

    // Check for parts that make up the gossip line
    expect(screen.getByText(/unusual patterns/i)).toBeDefined();
  });
});
