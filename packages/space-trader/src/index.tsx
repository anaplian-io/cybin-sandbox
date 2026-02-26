import React from 'react';
import { render, useInput } from 'ink';
import { MapDisplay, StatusDisplay, ControlsDisplay } from './map';
import { GameService, GameState } from './game';

const service = new GameService();

function GameApp() {
  const [state, setState] = React.useState<GameState>(service.initialize());

  useInput((input) => {
    // Handle Ctrl+C
    if (input === '\u0003') {
      process.exit(0);
    }

    // Handle arrow keys (escape sequences)
    if (input === '\u001B[A') {
      // Up
      const newY = Math.max(0, state.shipPosition.y - 1);
      setState(service.moveShip(state, state.shipPosition.x, newY));
    } else if (input === '\u001B[B') {
      // Down
      const newY = Math.min(state.world.height - 1, state.shipPosition.y + 1);
      setState(service.moveShip(state, state.shipPosition.x, newY));
    } else if (input === '\u001B[C') {
      // Right
      const newX = Math.min(state.world.width - 1, state.shipPosition.x + 1);
      setState(service.moveShip(state, newX, state.shipPosition.y));
    } else if (input === '\u001B[D') {
      // Left
      const newX = Math.max(0, state.shipPosition.x - 1);
      setState(service.moveShip(state, newX, state.shipPosition.y));
    }
  });

  return (
    <>
      <MapDisplay gameState={state} />
      <StatusDisplay gameState={state} />
      <ControlsDisplay />
    </>
  );
}

render(<GameApp />);
