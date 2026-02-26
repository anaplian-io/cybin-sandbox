import React from 'react';
import { Text } from 'ink';
import { GameState } from './game';

interface MapProps {
  gameState: GameState;
}

export function MapDisplay({ gameState }: MapProps) {
  const { world, shipPosition } = gameState;

  // Render a small viewport centered on the ship
  const viewSize = 5; // 11x11 viewport (5 tiles each direction)
  const minX = Math.max(0, shipPosition.x - viewSize);
  const maxX = Math.min(world.width - 1, shipPosition.x + viewSize);
  const minY = Math.max(0, shipPosition.y - viewSize);
  const maxY = Math.min(world.height - 1, shipPosition.y + viewSize);

  return (
    <Text>
      {Array.from({ length: maxY - minY + 1 }, (_, dy) => {
        const y = maxY - dy; // Render top to bottom
        return (
          <Text key={y}>
            {Array.from({ length: maxX - minX + 1 }, (_, dx) => {
              const x = minX + dx;
              const key = `${x},${y}`;
              const tile = world.tiles.get(key);

              // Ship position
              if (x === shipPosition.x && y === shipPosition.y) {
                return <Text key={x}>🐳</Text>;
              }

              // Tile symbols
              switch (tile?.type) {
                case 'island':
                  return <Text key={x}>☁️</Text>;
                case 'waystation':
                  return <Text key={x}>⚓</Text>;
                case 'storm':
                  return <Text key={x}>⚡</Text>;
                case 'breedingGround':
                  return <Text key={x}>🦋</Text>;
                default:
                  return <Text key={x}>·</Text>;
              }
            }).map((char, i) => (i > 0 ? ' ' : '') + char)}
          </Text>
        );
      })}
    </Text>
  );
}

export function StatusDisplay({ gameState }: { gameState: GameState }) {
  const { shipPosition, whales, turn } = gameState;
  const primaryWhale = whales[0];

  return (
    <Text>
      <Text>Turn: </Text>
      <Text>{turn}</Text>
      <Text> | Position: </Text>
      <Text>
        ({shipPosition.x}, {shipPosition.y})
      </Text>
      <Text> | Whale: </Text>
      <Text>{primaryWhale?.name || 'None'}</Text>
    </Text>
  );
}

export function ControlsDisplay() {
  return (
    <Text>
      <Text>&larr; &uarr; &rarr; &darr;: Move | Ctrl+C: Quit</Text>
    </Text>
  );
}
