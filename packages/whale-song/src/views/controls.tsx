import React from 'react';
import { Box, Text } from 'ink';

type Props = {
  hasBreedingOpportunity?: boolean;
  whaleStatusOpen?: boolean;
};

/**
 * ControlsDisplay - Shows available keyboard shortcuts
 *
 * Displays instructions for common actions based on game context.
 */
export function ControlsDisplay({
  hasBreedingOpportunity,
  whaleStatusOpen,
}: Props) {
  return (
    <Box borderStyle="single" borderColor="gray" paddingX={1} paddingY={0}>
      <Text color="gray">Controls: Arrows move | W: Whales</Text>

      {hasBreedingOpportunity && (
        <Text color="green"> | Enter: Breed whales</Text>
      )}

      {whaleStatusOpen && <Text color="yellow"> | ESC: Close menu</Text>}

      {!whaleStatusOpen && <Text color="yellow"> | ESC: Exit</Text>}
    </Box>
  );
}

export default ControlsDisplay;
