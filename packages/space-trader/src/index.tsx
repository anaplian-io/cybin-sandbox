import React from 'react';
import { render } from 'ink';
import { MapDisplay, StatusDisplay, ControlsDisplay } from './map';
import { GameService, GameState } from './game';

const service = new GameService();
let state: GameState = service.initialize();

console.clear();
console.log('Whale Song: Nomadic Skybound');
console.log('');

const instance = render(
  <>
    <MapDisplay gameState={state} />
    <StatusDisplay gameState={state} />
    <ControlsDisplay />
  </>,
);

function updateUI() {
  instance.rerender(
    <>
      <MapDisplay gameState={state} />
      <StatusDisplay gameState={state} />
      <ControlsDisplay />
    </>,
  );
}

// Basic REPL loop
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key: string) => {
  if (key === '\u0003') {
    process.exit(0);
  }

  let newX = state.shipPosition.x;
  let newY = state.shipPosition.y;

  // Handle arrow keys
  if (key === '\u001B[A') {
    newY = Math.max(0, state.shipPosition.y - 1);
  } else if (key === '\u001B[B') {
    newY = Math.min(state.world.height - 1, state.shipPosition.y + 1);
  } else if (key === '\u001B[C') {
    newX = Math.min(state.world.width - 1, state.shipPosition.x + 1);
  } else if (key === '\u001B[D') {
    newX = Math.max(0, state.shipPosition.x - 1);
  }

  if (newX !== state.shipPosition.x || newY !== state.shipPosition.y) {
    state = service.moveShip(state, newX, newY);
    console.clear();
    console.log('Whale Song: Nomadic Skybound');
    console.log('');
    updateUI();
  }
});
