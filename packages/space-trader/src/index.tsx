import { render, Text } from 'ink';
import React, { useState, useEffect } from 'react';
import { useInput } from 'ink';
import { Ship } from './ship';

type Position = { x: number; y: number };

export function ShipGame() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const ship = new Ship();

  useEffect(() => {
    setPosition(ship.getPosition());
  }, []);

  useInput((input, key) => {
    if (key.upArrow) {
      ship.moveUp();
    } else if (key.downArrow) {
      ship.moveDown();
    } else if (key.leftArrow) {
      ship.moveLeft();
    } else if (key.rightArrow) {
      ship.moveRight();
    }
    setPosition(ship.getPosition());
  });

  return (
    <div>
      <Text>Use arrow keys to move the ship</Text>
      <Text />
      <Text>
        Position: ({position.x}, {position.y})
      </Text>
    </div>
  );
}

render(<ShipGame />);
