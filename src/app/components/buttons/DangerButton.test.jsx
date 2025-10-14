import React from 'react';
import { render, screen } from '@testing-library/react';
import DangerButton from './DangerButton';

describe('DangerButton Component', () => {
  test('renders children correctly', () => {
    render(<DangerButton>Click Me</DangerButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<DangerButton>Test</DangerButton>);
    expect(container.firstChild).toHaveClass('bg-red-600');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('rounded-lg');
  });
});