import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Minimal', () => {
  it('should render a heading', () => {
    render(<h1>Hello, World!</h1>);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello, World!');
  });
});
