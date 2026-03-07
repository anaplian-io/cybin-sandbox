import { render, screen } from '@testing-library/react';
import React from 'react';
import MenuDisplay from './menu.js';

describe('MenuDisplay', () => {
  it('renders the title and items correctly', () => {
    const items = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ];

    render(<MenuDisplay title="Test Menu" items={items} />);

    expect(screen.getByText('Test Menu')).toBeDefined();
    // Ink renders items in a specific format; check key parts
    expect(screen.getByText('Option 1')).toBeDefined();
    expect(screen.getByText('Option 2')).toBeDefined();
    expect(
      screen.getByText('Press number to select, ESC to cancel'),
    ).toBeDefined();
  });

  it('renders with custom prompt', () => {
    const items = [{ label: 'Test', value: 'test' }];

    render(
      <MenuDisplay title="Custom" items={items} prompt="Custom prompt text" />,
    );

    expect(screen.getByText('Custom prompt text')).toBeDefined();
  });

  it('handles empty items array', () => {
    render(<MenuDisplay title="Empty" items={[]} />);

    expect(screen.getByText('Empty')).toBeDefined();
  });

  it('renders description for items', () => {
    const items = [
      {
        label: 'Breed Whale',
        value: 'breed',
        description: 'Select a wild pod to breed with your fleet',
      },
    ];

    render(<MenuDisplay title="Breeding" items={items} />);

    expect(screen.getByText('Breed Whale')).toBeDefined();
    expect(
      screen.getByText('Select a wild pod to breed with your fleet'),
    ).toBeDefined();
  });
});
