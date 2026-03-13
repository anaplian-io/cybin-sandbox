import React from 'react';
import { render } from '@testing-library/react';
import HelpDisplay from './help.js';

describe('HelpDisplay', () => {
  test('renders the help message', () => {
    const { container } = render(<HelpDisplay />);
    const text = container.textContent || '';

    expect(text).toMatch(/Whale Song/);
    expect(text).toMatch(/terminal-based space trading and whale simulation/);
    expect(text).toMatch(/Usage:/);
  });

  test('shows controls section', () => {
    const { container } = render(<HelpDisplay />);
    const text = container.textContent || '';

    expect(text).toMatch(/Controls:/);
    expect(text).toMatch(/Arrows\/WASD/);
  });

  test('shows gameplay section', () => {
    const { container } = render(<HelpDisplay />);
    const text = container.textContent || '';

    expect(text).toMatch(/Gameplay:/);
    expect(text).toMatch(/Navigate the ocean grid/);
  });
});
