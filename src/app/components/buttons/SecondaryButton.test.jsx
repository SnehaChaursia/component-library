import React from 'react';
import { render, screen } from '@testing-library/react';
import SecondaryButton from './SecondaryButton';

describe('SecondaryButton Component', () => {
  test('renders children correctly', () => {
    render(<SecondaryButton>Click Me</SecondaryButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<SecondaryButton>Test</SecondaryButton>);
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('rounded-lg');
  });
});