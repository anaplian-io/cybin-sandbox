import React from 'react';
import { Box, Text } from 'ink';

/**
 * SaveMenu - Menu for selecting a save slot
 *
 * Shows available saves with turn count and timestamp.
 */
export function SaveMenu({
  saves,
}: {
  saves: Record<
    string,
    { turn: number; timestamp: number; whalesCount: number }
  >;
}) {
  const slotIds = Object.keys(saves).sort(
    (a, b) => saves[b].timestamp - saves[a].timestamp,
  );

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
          Load Game
        </Text>
      </Box>

      {slotIds.length === 0 ? (
        <Text color="gray">No saved games found.</Text>
      ) : (
        <>
          {slotIds.map((slotId, index) => {
            const save = saves[slotId];
            const date = new Date(save.timestamp);
            return (
              <Box key={slotId} flexDirection="column" paddingBottom={1}>
                <Text>
                  [{index + 1}] {slotId}
                </Text>
                <Text color="gray">
                  • Turn {save.turn} • {date.toLocaleDateString()}
                </Text>
              </Box>
            );
          })}
        </>
      )}

      <Box borderTop={true} borderColor="gray" paddingTop={1} marginTop={1}>
        <Text color="gray">Press number to load, ESC to cancel</Text>
      </Box>
    </Box>
  );
}

export default SaveMenu;
