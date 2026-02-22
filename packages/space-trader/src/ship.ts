export type Position = { x: number; y: number };

export class Ship {
  private position: Position;

  constructor(initialX = 0, initialY = 0) {
    this.position = { x: initialX, y: initialY };
  }

  getPosition(): Position {
    return this.position;
  }

  moveUp(): void {
    this.position.y -= 1;
  }

  moveDown(): void {
    this.position.y += 1;
  }

  moveLeft(): void {
    this.position.x -= 1;
  }

  moveRight(): void {
    this.position.x += 1;
  }
}
