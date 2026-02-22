import { render, Text } from 'ink';
import React, { useState } from 'react';
import { useInput } from 'ink';

type Position = { x: number; y: number };

export function ShipGame() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useInput((input, key) => {
    if (key.upArrow) {
      setPosition((prev) => ({ ...prev, y: prev.y - 1 }));
    } else if (key.downArrow) {
      setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    } else if (key.leftArrow) {
      setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
    } else if (key.rightArrow) {
      setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
    }
  });

  return (
    <div>
      <Text>Use arrow keys to move the ship</Text>
      <Text>{'\n'}</Text>
      <Text>
        Position: ({position.x}, {position.y})
      </Text>
      <Text>{'\n'}</Text>
      <Text>Ship: 🚀</Text>
    </div>
  );
}

render(<ShipGame />);
