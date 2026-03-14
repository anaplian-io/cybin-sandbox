import React from 'react';
import { Box, Text, useInput } from 'ink';
import { GameService } from '../services/game.service.js';
import { MapDisplay } from './map.js';
import { StatusDisplay } from './status.js';
import { ControlsDisplay } from './controls.js';
import { MenuDisplay } from './menu.js';
import { GossipDisplay } from './gossip.js';
import type { GameState } from '../types/game.types.js';

type AppProps = {
  gameState?: GameState;
};

// Initialize game state with default world
function initializeGameState(): GameState {
  const service = new GameService();
  return service.initializeWorld();
}

export function App({ gameState }: AppProps) {
  const [currentState, setCurrentState] = React.useState<GameState>(
    gameState ?? initializeGameState(),
  );
  const [breedingMenuOpen, setBreedingMenuOpen] = React.useState(false);
  const [whaleStatusOpen, setWhaleStatusOpen] = React.useState(false);

  useInput((input) => {
    if (breedingMenuOpen || whaleStatusOpen) {
      if (input === '\u001B') {
        // ESC key closes any open menu
        setBreedingMenuOpen(false);
        setWhaleStatusOpen(false);
      }
      return;
    }

    // Movement controls
    const { x, y } = currentState.shipPosition;
    let newX = x;
    let newY = y;

    switch (input) {
      case 'w':
      case '\u001B[A': // Up arrow
        newY = y - 1;
        break;
      case 's':
      case '\u001B[B': // Down arrow
        newY = y + 1;
        break;
      case 'a':
      case '\u001B[D': // Left arrow
        newX = x - 1;
        break;
      case 'd':
      case '\u001B[C': // Right arrow
        newX = x + 1;
        break;
      case 'W':
        setWhaleStatusOpen(true);
        return;
      case '\r': // Enter
        // Check if at breeding ground to open menu
        const key = `${x},${y}`;
        const tile = currentState.world.tiles.get(key);
        if (tile?.type === 'breedingGround') {
          setBreedingMenuOpen(true);
        }
        return;
    }

    // Validate bounds
    if (
      newX >= 0 &&
      newX < currentState.world.width &&
      newY >= 0 &&
      newY < currentState.world.height
    ) {
      // Move and advance turn
      const newState = {
        ...currentState,
        shipPosition: { x: newX, y: newY },
      };

      // Import gossip service dynamically to add gossip every 5 turns
      if (newState.turn !== currentState.turn && newState.turn % 5 === 0) {
        import('../services/gossip.service.js').then(
          ({ addRandomGossipToGameState }) => {
            newState.gossipLog = addRandomGossipToGameState(newState).gossipLog;
            setCurrentState(newState);
          },
        );
      } else {
        setCurrentState(newState);
      }
    }
  });

  const atBreedingGround =
    currentState.world.tiles.get(
      `${currentState.shipPosition.x},${currentState.shipPosition.y}`,
    )?.type === 'breedingGround';

  // Breeding menu items (for now, just show available option)
  const breedingMenuItems = [
    {
      label: 'Breed with wild pod',
      value: 'breed',
      description: 'Combine traits to create new offspring',
    },
  ];

  return (
    <Box flexDirection="column" height="100%">
      {/* Header: Game stats */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        backgroundColor="cyan"
        paddingX={1}
      >
        <Text bold>Whale Song v0.1.0</Text>
        <Text color="black">
          Turn {currentState.turn} | Aether: {currentState.aetherMist}
        </Text>
      </Box>

      {/* Main content: Map (left) + Status (right) */}
      <Box flexDirection="row">
        {/* Map viewport */}
        <Box width="60%" borderStyle="single" borderColor="cyan">
          <MapDisplay gameState={currentState} />
        </Box>

        {/* Status panel */}
        <Box width="40%" borderStyle="single" borderColor="cyan">
          <StatusDisplay gameState={currentState} />
        </Box>
      </Box>

      {/* Whales status modal (optional) */}
      {whaleStatusOpen && (
        <Box
          borderStyle="single"
          borderColor="yellow"
          paddingX={1}
          paddingY={0}
        >
          <Box
            borderBottom={true}
            borderColor="gray"
            paddingBottom={1}
            marginBottom={1}
          >
            <Text color="yellow" bold>
              Your Whale Fleet
            </Text>
          </Box>

          {currentState.whales.length === 0 ? (
            <Text color="gray">No whales in fleet yet.</Text>
          ) : (
            currentState.whales.map((whale, index) => (
              <Box key={index} flexDirection="column" paddingBottom={1}>
                <Text>
                  🐳 Whale #{index + 1} (Gen {whale.generation})
                </Text>
              </Box>
            ))
          )}

          <Box borderTop={true} borderColor="gray" paddingTop={1} marginTop={1}>
            <Text color="gray">Press ESC to close</Text>
          </Box>
        </Box>
      )}

      {/* Breeding menu modal (optional) */}
      {breedingMenuOpen && (
        <Box borderStyle="single" borderColor="green" paddingX={1} paddingY={0}>
          <MenuDisplay title="Breeding Ground" items={breedingMenuItems} />
        </Box>
      )}

      {/* Bottom: Controls */}
      <ControlsDisplay
        hasBreedingOpportunity={atBreedingGround}
        whaleStatusOpen={whaleStatusOpen || breedingMenuOpen}
      />

      {/* Bottom: Gossip log */}
      <GossipDisplay gossipLog={currentState.gossipLog} />
    </Box>
  );
}

export default App;
