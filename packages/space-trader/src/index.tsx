import React from 'react';
import { render, useInput } from 'ink';
import {
  MapDisplay,
  StatusDisplay,
  ControlsDisplay,
  BreedingMenu,
  WhaleStatusDisplay,
  WaystationMenu,
} from './map';
import { checkSystem } from './game';
import { GameService, GameState } from './game';

const service = new GameService();

function GameApp() {
  const [state, setState] = React.useState<GameState>(service.initialize());

  useInput((input, key) => {
    // Handle Ctrl+C
    if (key.ctrl && input === 'c') {
      process.exit(0);
    }

    // Handle Escape to close menus
    if (key.escape && (state.breedingMenuOpen || state.waystationMenuOpen)) {
      setState({
        ...state,
        breedingMenuOpen: false,
        waystationMenuOpen: false,
      });
      return;
    }

    // Handle number keys in breeding menu
    if (state.breedingOpportunity && state.breedingMenuOpen) {
      const num = parseInt(input, 10);
      if (
        !isNaN(num) &&
        num >= 1 &&
        num <= state.breedingOpportunity.availablePods.length
      ) {
        const newState = service.breedWhale(state, num - 1);
        setState(newState);
        return;
      }
    }

    // Handle Enter to open breeding menu at breeding grounds
    if (
      key.return &&
      state.breedingOpportunity &&
      !state.breedingMenuOpen &&
      !state.waystationMenuOpen
    ) {
      setState({ ...state, breedingMenuOpen: true });
      return;
    }

    // Handle Enter to open waystation menu at waystations
    if (
      key.return &&
      checkSystem(state) &&
      !state.breedingMenuOpen &&
      !state.waystationMenuOpen
    ) {
      setState({ ...state, waystationMenuOpen: true });
      return;
    }

    // Handle 'W' key to toggle whale status
    if (input.toLowerCase() === 'w') {
      setState(service.toggleWhaleStatus(state));
      return;
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
  });

  return (
    <>
      <MapDisplay gameState={state} />
      <StatusDisplay gameState={state} />
      <ControlsDisplay
        hasBreedingOpportunity={!!state.breedingOpportunity}
        whaleStatusOpen={state.whaleStatusOpen}
      />
      {state.breedingMenuOpen && <BreedingMenu gameState={state} />}
      {state.whaleStatusOpen && <WhaleStatusDisplay whales={state.whales} />}
      {state.waystationMenuOpen && <WaystationMenu gameState={state} />}
    </>
  );
}

render(<GameApp />);
