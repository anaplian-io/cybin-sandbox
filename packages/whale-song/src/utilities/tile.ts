export interface Tile {
  type: string;
  x: number;
  y: number;
  name?: string; // Named locations (waystations, breeding grounds)
}

export function createTile(
  x: number,
  y: number,
  type: string = 'empty',
  name?: string,
): Tile {
  return { x, y, type, name };
}

export function getKey(x: number, y: number): string {
  return `${x},${y}`;
}
