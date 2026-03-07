import React from 'react';
import { Box, Text } from 'ink';

type MenuItem = {
  label: string;
  value: string;
  description?: string;
};

type MenuDisplayProps = {
  title: string;
  items: MenuItem[];
  prompt?: string;
};

/**
 * MenuDisplay - Reusable modal menu component for breeding/trading
 *
 * Shows a list of items with keyboard shortcuts in a clean layout.
 */
export function MenuDisplay({
  title,
  items,
  prompt = 'Press number to select, ESC to cancel',
}: MenuDisplayProps) {
  return (
    <Box
      borderStyle="single"
      borderColor="cyan"
      paddingX={1}
      paddingY={0}
      flexDirection="column"
    >
      <Box
        borderBottom={true}
        borderColor="gray"
        paddingBottom={1}
        marginBottom={1}
      >
        <Text color="cyan" bold>
          {title}
        </Text>
      </Box>

      <Box flexDirection="column">
        {items.map((item, index) => (
          <Box key={index} flexDirection="row" paddingBottom={0}>
            <Text color="cyan">[{index + 1}]</Text>
            <Text> {item.label}</Text>
            {item.description && (
              <>
                <Text color="gray"> — </Text>
                <Text color="gray">{item.description}</Text>
              </>
            )}
          </Box>
        ))}
      </Box>

      <Box borderTop={true} borderColor="gray" paddingTop={1} marginTop={1}>
        <Text color="gray">{prompt}</Text>
      </Box>
    </Box>
  );
}

export default MenuDisplay;
