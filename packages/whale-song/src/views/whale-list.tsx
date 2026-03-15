import React from 'react';
import { Box, Text } from 'ink';
import type { Whale } from '../types/index.js';

/**
 * WhaleList - Shows selectable whale fleet members
 *
 * Displays each whale with its generation and traits.
 * User can press number key to select a whale for breeding.
 */
export function WhaleList({ whales }: { whales: Whale[] }) {
  if (whales.length === 0) {
    return (
      <Box borderStyle="single" borderColor="yellow" paddingX={1} paddingY={0}>
        <Text color="gray">No whales in fleet yet.</Text>
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
          Select Whale
        </Text>
      </Box>

      {whales.map((whale, index) => (
        <Box key={index} flexDirection="column" paddingBottom={1}>
          <Text color="cyan">
            [{index + 1}] {whale.name} (Gen {whale.generation})
          </Text>
        </Box>
      ))}

      <Box borderTop={true} borderColor="gray" paddingTop={1} marginTop={1}>
        <Text color="gray">Press number to select, ESC to cancel</Text>
      </Box>
    </Box>
  );
}

export default WhaleList;
