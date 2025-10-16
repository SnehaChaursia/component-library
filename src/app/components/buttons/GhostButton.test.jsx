import React from 'react';
import { render, screen } from '@testing-library/react';
import GhostButton from './GhostButton';

describe('GhostButton Component', () => {
  test('renders children correctly', () => {
    render(<GhostButton>Click Me</GhostButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<GhostButton>Test</GhostButton>);
    expect(container.firstChild).toHaveClass('border-2');
    expect(container.firstChild).toHaveClass('border-gray-500');
    expect(container.firstChild).toHaveClass('dark:border-gray-400');
    expect(container.firstChild).toHaveClass('text-gray-800');
    expect(container.firstChild).toHaveClass('dark:text-gray-200');
    expect(container.firstChild).toHaveClass('px-3');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  test('applies additional props when provided', () => {
    render(<GhostButton id="test-button" data-testid="ghost-button">Test</GhostButton>);
    const button = screen.getByTestId('ghost-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'test-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<GhostButton onClick={handleClick}>Click Me</GhostButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});