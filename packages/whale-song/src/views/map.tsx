import React from 'react';
import { Box, Text } from 'ink';

type MapDisplayProps = {
  gameState: GameState;
};

type GameState = {
  world: World;
  shipPosition: Position;
  whales: Whale[];
  turn: number;
  aetherMist: number;
  tradeInventory: { aetherMist: number };
};

type World = {
  width: number;
  height: number;
  tiles: Map<string, Tile>;
};

type Position = {
  x: number;
  y: number;
};

type Whale = {
  id: string;
  traits: Record<string, number>;
  generation: number;
};

type Tile = {
  type: string;
  x: number;
  y: number;
  name?: string;
};

/**
 * MapDisplay - Renders the 11x11 viewport centered on player
 *
 * Shows tiles within 5 spaces in each direction from the ship position.
 * Uses emoji for visual distinction:
 *   🐳 = Player ship
 *   ⛓️ = Island
 *   🏢 = Waystation
 *   🌱 = Breeding ground
 *   .  = Empty ocean (dimmed)
 */
export function MapDisplay({ gameState }: MapDisplayProps) {
  const { world, shipPosition } = gameState;
  const viewportSize = 11; // 5 tiles each direction + center
  const halfSize = Math.floor(viewportSize / 2);

  // Calculate viewport bounds
  const minX = Math.max(0, shipPosition.x - halfSize);
  const maxX = Math.min(world.width - 1, shipPosition.x + halfSize);
  const minY = Math.max(0, shipPosition.y - halfSize);
  const maxY = Math.min(world.height - 1, shipPosition.y + halfSize);

  // Generate viewport tiles as an array of arrays
  const tileGrid: React.ReactNode[][] = [];
  for (let y = minY; y <= maxY; y++) {
    const row: React.ReactNode[] = [];
    for (let x = minX; x <= maxX; x++) {
      const key = `${x},${y}`;
      const tile = world.tiles.get(key);

      let content: React.ReactNode;
      if (x === shipPosition.x && y === shipPosition.y) {
        content = (
          <Text key={`${x},${y}`} color="cyan">
            🐳
          </Text>
        );
      } else if (tile?.type === 'island') {
        content = <Text key={`${x},${y}`}>⛓️</Text>;
      } else if (tile?.type === 'waystation') {
        content = (
          <Text key={`${x},${y}`} color="yellow">
            🏢
          </Text>
        );
      } else if (tile?.type === 'breedingGround') {
        content = (
          <Text key={`${x},${y}`} color="green">
            🌱
          </Text>
        );
      } else {
        content = (
          <Text key={`${x},${y}`} color="gray">
            .
          </Text>
        );
      }

      row.push(content);
    }
    tileGrid.push(row);
  }

  return (
    <Box
      borderStyle="single"
      borderColor="cyan"
      paddingX={1}
      paddingY={0}
      flexDirection="column"
    >
      {tileGrid.map((row, rowIndex) => (
        <Box key={rowIndex} flexDirection="row">
          {row}
        </Box>
      ))}
    </Box>
  );
}

export default MapDisplay;
