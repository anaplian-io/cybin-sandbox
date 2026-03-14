import React from 'react';
import { Box, Text } from 'ink';

export default function HelpDisplay() {
  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      <Text bold color="cyan">
        Whale Song 🐳
      </Text>
      <Text>A terminal-based space trading and whale simulation game</Text>
      <Box paddingY={1}>
        <Text bold>Usage:</Text>
        <Text> $ whale-song [options]</Text>
      </Box>

      <Box paddingY={1}>
        <Text bold>Commands:</Text>
        <Text> (none) Launch the game</Text>
        <Text> --version Show version number</Text>
        <Text> --help Show this help message</Text>
      </Box>

      <Box paddingY={1}>
        <Text bold>Controls:</Text>
        <Text> Arrows/WASD Move whale</Text>
        <Text> W Toggle whale fleet status</Text>
        <Text> Enter Open context menu (breeding/trading)</Text>
        <Text> ESC Close menus or exit</Text>
      </Box>

      <Box paddingY={1}>
        <Text bold>Gameplay:</Text>
        <Text>
          {' '}
          • Navigate the ocean grid to find islands, waystations, and breeding
          grounds
        </Text>
        <Text> • Trade aether mist at waystations</Text>
        <Text>
          {' '}
          • Breed whales to combine traits and create stronger offspring
        </Text>
        <Text>
          {' '}
          • Survive seasonal changes as spring→summer→autumn→winter cycle
        </Text>
        <Text>
          {' '}
          • Listen for rumors from merchant, explorer, scholar, and hermit
          factions
        </Text>
      </Box>

      <Text color="gray">Version 0.1.0</Text>
    </Box>
  );
}
