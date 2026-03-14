import React from 'react';
import { Box, Text } from 'ink';
import type { EvolutionLog } from '../types/index.js';

type EvolutionDisplayProps = {
  evolutionLog?: EvolutionLog;
};

/**
 * EvolutionDisplay - Shows recent whale evolution events
 *
 * Displays:
 *   - Latest 5 evolution entries (or fewer if log is empty)
 *   - Each entry shows: Day X: <text>
 */
export function EvolutionDisplay({ evolutionLog }: EvolutionDisplayProps) {
  const entries = evolutionLog?.entries.slice(0, 5) ?? [];

  if (entries.length === 0) {
    return (
      <Box borderStyle="single" borderColor="yellow" paddingX={1} paddingY={0}>
        <Text color="gray">Evolution Log (no changes yet)</Text>
      </Box>
    );
  }

  return (
    <Box borderStyle="single" borderColor="yellow" paddingX={1} paddingY={0}>
      <Box
        borderBottom={true}
        borderColor="gray"
        paddingBottom={1}
        marginBottom={1}
      >
        <Text color="yellow" bold>
          Evolution Log
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

export default EvolutionDisplay;
