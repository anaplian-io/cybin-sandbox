import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Version from './version.js';

describe('Version', () => {
  it('renders the version number "0.1.0"', () => {
    render(<Version />);
    expect(screen.getByText('0.1.0')).toBeInTheDocument();
  });
});
