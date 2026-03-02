import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from './app.js';

describe('App', () => {
  it('renders default greeting when name is not provided', () => {
    render(<App name={undefined} />);
    expect(screen.getByText('Stranger')).toBeInTheDocument();
  });

  it('renders the name in green', () => {
    render(<App name="Alice" />);
    const nameText = screen.getByText('Alice');
    expect(nameText).toBeInTheDocument();
  });
});
