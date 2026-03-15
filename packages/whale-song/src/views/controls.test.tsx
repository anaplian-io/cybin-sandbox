import { render, screen } from '@testing-library/react';
import React from 'react';
import ControlsDisplay from './controls.js';

describe('ControlsDisplay', () => {
  it('renders base controls', () => {
    render(<ControlsDisplay />);

    expect(screen.getByText(/Controls:/i)).toBeDefined();
    expect(screen.getByText(/Arrows move/i)).toBeDefined();
    expect(screen.getByText(/W: Whales/i)).toBeDefined();
  });

  it('shows breed whales when breeding opportunity exists', () => {
    render(<ControlsDisplay hasBreedingOpportunity={true} />);

    expect(screen.getByText(/Enter: Breed whales/i)).toBeDefined();
  });

  it('shows ESC close menu when whale status is open', () => {
    render(<ControlsDisplay whaleStatusOpen={true} />);

    expect(screen.getByText(/ESC: Close menu/i)).toBeDefined();
  });

  it('shows ESC exit when whale status is closed', () => {
    render(<ControlsDisplay whaleStatusOpen={false} />);

    expect(screen.getByText(/ESC: Exit/i)).toBeDefined();
  });
});
