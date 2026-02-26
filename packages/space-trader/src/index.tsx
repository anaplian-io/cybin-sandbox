import React from 'react';
import { render, useInput } from 'ink';
import { MapDisplay, StatusDisplay, ControlsDisplay } from './map';
import { GameService, GameState } from './game';

const service = new GameService();

function GameApp() {
  const [state, setState] = React.useState<GameState>(service.initialize());

  useInput((input, key) => {
    // Handle Ctrl+C
    if (key.ctrl && input === 'c') {
      process.exit(0);
    }

    // Handle arrow keys using Ink's key object
    if (key.upArrow) {
      const newY = Math.max(0, state.shipPosition.y - 1);
      setState(service.moveShip(state, state.shipPosition.x, newY));
    } else if (key.downArrow) {
      const newY = Math.min(state.world.height - 1, state.shipPosition.y + 1);
      setState(service.moveShip(state, state.shipPosition.x, newY));
    } else if (key.rightArrow) {
      const newX = Math.min(state.world.width - 1, state.shipPosition.x + 1);
      setState(service.moveShip(state, newX, state.shipPosition.y));
    } else if (key.leftArrow) {
      const newX = Math.max(0, state.shipPosition.x - 1);
      setState(service.moveShip(state, newX, state.shipPosition.y));
    }

    // Handle Enter key for breeding
    if (key.return && state.breedingOpportunity) {
      console.log('Breeding menu not yet implemented');
    }
  });

  return (
    <>
      <MapDisplay gameState={state} />
      <StatusDisplay gameState={state} />
      <ControlsDisplay hasBreedingOpportunity={!!state.breedingOpportunity} />
    </>
  );
}

render(<GameApp />);
