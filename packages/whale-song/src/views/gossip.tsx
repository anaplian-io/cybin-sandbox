import React from 'react';
import { Box, Text } from 'ink';
import type { GossipLog } from '../types/index.js';

type GossipDisplayProps = {
  gossipLog?: GossipLog;
};

/**
 * GossipDisplay - Shows recent gossip entries from factions
 *
 * Displays:
 *   - Latest 5 gossip entries (or fewer if log is empty)
 *   - Each entry shows: Day X: <text>
 */
export function GossipDisplay({ gossipLog }: GossipDisplayProps) {
  const entries = gossipLog?.entries.slice(0, 5) ?? [];

  if (entries.length === 0) {
    return (
      <Box borderStyle="single" borderColor="cyan" paddingX={1} paddingY={0}>
        <Text color="gray">Gossip Log (no rumors yet)</Text>
      </Box>
    );
  }

  return (
    <Box borderStyle="single" borderColor="cyan" paddingX={1} paddingY={0}>
      <Box
        borderBottom={true}
        borderColor="gray"
        paddingBottom={1}
        marginBottom={1}
      >
        <Text color="cyan" bold>
          Gossip Log
        </Text>
      </Box>

      {entries.map((entry, index) => (
        <Box key={index} flexDirection="column" paddingBottom={1}>
          <Text>
            Day {entry.turn}: {entry.text}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default GossipDisplay;
