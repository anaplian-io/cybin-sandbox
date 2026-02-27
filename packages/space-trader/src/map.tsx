import React from 'react';
import { Text, Newline } from 'ink';
import { GameState } from './game';
import { Whale } from './whale';

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
  const { shipPosition, whales, turn, breedingOpportunity } = gameState;
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

      {/* Breeding opportunity indicator */}
      {breedingOpportunity && (
        <Text>
          {'\n'}
          <Text color="green">Breeding Available at </Text>
          <Text bold>{breedingOpportunity.locationName}</Text>
          <Text> (Enter to breed)</Text>
        </Text>
      )}
    </Text>
  );
}

export function WhaleStatusDisplay({ whales }: { whales: Whale[] }) {
  return (
    <Text>
      <Newline />
      <Text color="cyan" bold>
        Whale Status
      </Text>
      <Newline />
      {whales.map((whale, index) => (
        <Text key={index}>
          <Text color="yellow">[{index + 1}]</Text> {whale.name}
          <Text color="white"> (Gen {whale.generation})</Text>
          <Newline />
          <Text color="green">
            {' '}
            Health: {whale.stats.health}/{whale.stats.maxHealth}
          </Text>
          <Newline />
          <Text color="blue"> Traits: {whale.traits.join(', ')}</Text>
          <Newline />
        </Text>
      ))}
      <Text color="yellow">Press 'W' to close</Text>
    </Text>
  );
}

export function ControlsDisplay({
  hasBreedingOpportunity,
  whaleStatusOpen,
}: {
  hasBreedingOpportunity: boolean;
  whaleStatusOpen?: boolean;
}) {
  return (
    <Text>
      <Text>&larr; &uarr; &rarr; &darr;: Move </Text>
      {hasBreedingOpportunity && <Text>| Enter: Breed </Text>}
      {!whaleStatusOpen && <Text>| W: Whale Status </Text>}
      <Text>| Ctrl+C: Quit</Text>
    </Text>
  );
}

export function BreedingMenu({ gameState }: { gameState: GameState }) {
  const { breedingOpportunity } = gameState;

  if (!breedingOpportunity || !breedingOpportunity.availablePods.length) {
    return null;
  }

  return (
    <Text>
      <Newline />
      <Text color="cyan" bold>
        BREEDING MENU
      </Text>
      <Newline />
      <Text color="cyan">Select a wild pod to breed with your whale:</Text>
      <Newline />
      {breedingOpportunity.availablePods.map((pod, index) => {
        const traitDisplay = pod.traits.join(', ');
        return (
          <Text key={index}>
            <Text color="green">[{index + 1}]</Text> {pod.name}
            <Text> — Traits: </Text>
            <Text>{traitDisplay}</Text>
          </Text>
        );
      })}
      <Newline />
      <Text color="yellow">Press number key to select, Escape to close</Text>
    </Text>
  );
}
