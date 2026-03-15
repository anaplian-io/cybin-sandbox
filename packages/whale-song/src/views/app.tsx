import React from 'react';
import { Box, Text, useInput } from 'ink';
import { GameService } from '../services/game.service.js';
import { TradeService } from '../services/trade.service.js';
import { MapDisplay } from './map.js';
import { StatusDisplay } from './status.js';
import { ControlsDisplay } from './controls.js';
import { MenuDisplay } from './menu.js';
import { GossipDisplay } from './gossip.js';
import { EvolutionDisplay } from './evolution.js';
import type { GameState, Whale } from '../types/index.js';
import { TRAITS } from '../types/trait.js';

type AppProps = {
  gameState?: GameState;
};

// Initialize game state with default world
function initializeGameState(): GameState {
  const service = new GameService();
  return service.initializeWorld();
}

// Initialize services
const tradeService = new TradeService();

export function App({ gameState }: AppProps) {
  const [currentState, setCurrentState] = React.useState<GameState>(
    gameState ?? initializeGameState(),
  );
  const [breedingMenuOpen, setBreedingMenuOpen] = React.useState(false);
  const [whaleStatusOpen, setWhaleStatusOpen] = React.useState(false);
  const [waystationMenuOpen, setWaystationMenuOpen] = React.useState(false);
  const [selectedWhaleIndex, setSelectedWhaleIndex] = React.useState<
    number | null
  >(null);

  useInput((input) => {
    if (breedingMenuOpen || whaleStatusOpen || waystationMenuOpen) {
      if (input === '\u001B') {
        // ESC key closes any open menu
        setBreedingMenuOpen(false);
        setWhaleStatusOpen(false);
        setWaystationMenuOpen(false);
        setSelectedWhaleIndex(null);
        return;
      }

      // Handle number keys 1-9 for whale selection in breeding menu
      if (breedingMenuOpen && /^[1-9]$/.test(input)) {
        const selectedIndex = parseInt(input, 10) - 1;
        if (selectedIndex < currentState.whales.length) {
          setSelectedWhaleIndex(selectedIndex);
        }
        return;
      }

      // Handle Enter on breeding menu
      if (input === '\r' && breedingMenuOpen) {
        // If we have a selected whale and fleet has ≥2 whales, breed
        if (selectedWhaleIndex !== null && currentState.whales.length >= 2) {
          // Find the other whale (not the selected one)
          const otherIndex = selectedWhaleIndex === 0 ? 1 : 0;
          const service = new GameService();
          const newState = service.breedWhales(
            currentState,
            selectedWhaleIndex,
            otherIndex,
          );
          setCurrentState(newState);
          setBreedingMenuOpen(false);
          setSelectedWhaleIndex(null);
          return;
        }

        // Perform the selected action
        if (
          breedingMenuItems[0].value === 'join' &&
          currentState.whales.length === 1
        ) {
          // Add a whale to the fleet (wild pod joins)
          const newWhale: Whale = {
            id: `whale-${Date.now()}`,
            name: 'Wild Pod Companion',
            traits: [TRAITS.SPEED, TRAITS.EFFICIENCY],
            stats: {
              health: 100,
              maxHealth: 100,
              aetherMistProduction: 1,
            },
            generation: 1,
          };
          setCurrentState({
            ...currentState,
            whales: [...currentState.whales, newWhale],
            turn: currentState.turn + 1,
          });
          setBreedingMenuOpen(false);
        }
      } else if (waystationMenuOpen) {
        // Handle Enter on waystation menu
        if (
          waystationMenuItems[0].value === 'buy' &&
          currentState.tradeInventory.aetherMist >= 0
        ) {
          // Buy aether mist (default 10 units)
          const amount = 10;
          const newState = tradeService.buy(currentState, amount);
          setCurrentState(newState);
          setWaystationMenuOpen(false);
        } else if (waystationMenuItems[1].value === 'sell') {
          // Sell aether mist (default 5 units)
          const amount = 5;
          const newState = tradeService.sell(currentState, amount);
          setCurrentState(newState);
          setWaystationMenuOpen(false);
        }
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
        // Check if at breeding ground or waystation to open menu
        const key = `${x},${y}`;
        const tile = currentState.world.tiles.get(key);
        if (tile?.type === 'breedingGround') {
          setBreedingMenuOpen(true);
        } else if (tile?.type === 'waystation') {
          setWaystationMenuOpen(true);
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

      // Import services dynamically to add evolution every turn and gossip every 5 turns
      Promise.all([
        import('../services/evolution.service.js'),
        newState.turn !== currentState.turn && newState.turn % 5 === 0
          ? import('../services/gossip.service.js')
          : null,
      ]).then(([evolutionModule, gossipModule]) => {
        newState.evolutionLog =
          evolutionModule.addRandomEvolutionToGameState(newState).evolutionLog;

        // Add gossip every 5 turns
        if (
          gossipModule &&
          newState.turn !== currentState.turn &&
          newState.turn % 5 === 0
        ) {
          newState.gossipLog =
            gossipModule.addRandomGossipToGameState(newState).gossipLog;
        }

        setCurrentState(newState);
      });
    }
  });

  const atBreedingGround =
    currentState.world.tiles.get(
      `${currentState.shipPosition.x},${currentState.shipPosition.y}`,
    )?.type === 'breedingGround';

  // Breeding menu items - show each whale when ≥2 whales exist
  const breedingMenuItems =
    currentState.whales.length >= 2
      ? currentState.whales.map((whale, index) => ({
          label: `Breed with ${whale.name}`,
          value: `breed-${index}` as const,
          description: `Select ${whale.name} as first parent`,
        }))
      : currentState.whales.length === 1
        ? [
            {
              label: 'Add whale to fleet',
              value: 'join',
              description: 'A wild pod joins your fleet (no breeding)',
            },
          ]
        : [
            {
              label: 'No whales yet',
              value: 'none',
              description: 'Navigate to breeding grounds with a wild pod first',
            },
          ];

  // Waystation menu items - show trade options when at waystation
  const waystationMenuItems = [
    {
      label: `Buy aether mist (${tradeService.getBuyPrice()} each)`,
      value: 'buy',
      description: 'Purchase aether mist for your inventory',
    },
    {
      label: `Sell aether mist (${tradeService.getSellPrice()} each)`,
      value: 'sell',
      description: 'Sell excess aether mist for credits',
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
          <MenuDisplay
            title="Breeding Ground"
            items={breedingMenuItems}
            prompt={
              currentState.whales.length === 0
                ? 'Navigate with a wild pod first'
                : breedingMenuItems[0].value === 'breed'
                  ? 'Press number to select, ESC to cancel'
                  : 'Press Enter to join fleet, ESC to cancel'
            }
          />
        </Box>
      )}

      {/* Bottom: Controls */}
      <ControlsDisplay
        hasBreedingOpportunity={atBreedingGround}
        whaleStatusOpen={whaleStatusOpen || breedingMenuOpen}
      />

      {/* Bottom: Gossip log */}
      <GossipDisplay gossipLog={currentState.gossipLog} />

      {/* Bottom: Evolution log */}
      <EvolutionDisplay evolutionLog={currentState.evolutionLog} />
    </Box>
  );
}

export default App;
