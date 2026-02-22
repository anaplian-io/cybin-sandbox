import { Ship } from './ship';

describe('Ship', () => {
  it('starts at origin by default', () => {
    const ship = new Ship();
    expect(ship.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('starts at specified position', () => {
    const ship = new Ship(5, -3);
    expect(ship.getPosition()).toEqual({ x: 5, y: -3 });
  });

  it('moves up', () => {
    const ship = new Ship();
    ship.moveUp();
    expect(ship.getPosition()).toEqual({ x: 0, y: -1 });
  });

  it('moves down', () => {
    const ship = new Ship();
    ship.moveDown();
    expect(ship.getPosition()).toEqual({ x: 0, y: 1 });
  });

  it('moves left', () => {
    const ship = new Ship();
    ship.moveLeft();
    expect(ship.getPosition()).toEqual({ x: -1, y: 0 });
  });

  it('moves right', () => {
    const ship = new Ship();
    ship.moveRight();
    expect(ship.getPosition()).toEqual({ x: 1, y: 0 });
  });

  it('handles multiple moves', () => {
    const ship = new Ship();
    ship.moveUp();
    ship.moveRight();
    ship.moveRight();
    expect(ship.getPosition()).toEqual({ x: 2, y: -1 });
  });
});
