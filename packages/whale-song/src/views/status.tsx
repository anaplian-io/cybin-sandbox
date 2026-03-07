import React from 'react';
import { Box, Text } from 'ink';

type StatusDisplayProps = {
  gameState: GameState;
};

type GameState = {
  world: World;
  shipPosition: Position;
  whales: Whale[];
  turn: number;
  aetherMist: number;
  tradeInventory: { aetherMist: number };
  seasonState?: SeasonState;
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

type SeasonState = {
  currentSeason: string;
  turnInSeason: number;
  totalTurnsInCycle: number;
};

type Tile = {
  type: string;
  x: number;
  y: number;
  name?: string;
};

/**
 * StatusDisplay - Shows game status and context information
 *
 * Displays:
 *   - Player position (x, y)
 *   - Current turn
 *   - Number of whales in fleet
 *   - Aether mist count
 *   - Current season and turn within season
 */
export function StatusDisplay({ gameState }: StatusDisplayProps) {
  const { shipPosition, turn, whales, aetherMist, seasonState } = gameState;

  const seasonInfo = seasonState
    ? `${seasonState.currentSeason} (Turn ${seasonState.turnInSeason}/${seasonState.totalTurnsInCycle})`
    : 'Unknown season';

  return (
    <Box
      borderStyle="single"
      borderColor="cyan"
      paddingX={1}
      paddingY={0}
      flexDirection="column"
    >
      <Box flexDirection="row" justifyContent="space-between">
        <Text>Position:</Text>
        <Text color="cyan">
          ({shipPosition.x}, {shipPosition.y})
        </Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text>Turn:</Text>
        <Text color="yellow">{turn}</Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text>Whales:</Text>
        <Text color="green">{whales.length}</Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text>Aether:</Text>
        <Text color="blue">{aetherMist}</Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text>Season:</Text>
        <Text color="magenta">{seasonInfo}</Text>
      </Box>
    </Box>
  );
}

export default StatusDisplay;
