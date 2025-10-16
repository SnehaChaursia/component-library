import React from 'react';
import { render, screen } from '@testing-library/react';
import RainbowButton from './RainbowButton';

describe('RainbowButton Component', () => {
  test('renders children correctly', () => {
    render(<RainbowButton>Rainbow Button</RainbowButton>);
    expect(screen.getByText('Rainbow Button')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<RainbowButton>Test</RainbowButton>);
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('px-6');
    expect(container.firstChild).toHaveClass('py-3');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('dark:bg-gray-900');
    expect(container.firstChild).toHaveClass('text-gray-900');
    expect(container.firstChild).toHaveClass('dark:text-white');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('font-medium');
    expect(container.firstChild).toHaveClass('transition-all');
    expect(container.firstChild).toHaveClass('duration-200');
    expect(container.firstChild).toHaveClass('border-4');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<RainbowButton className="extra-class">Test</RainbowButton>);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<RainbowButton onClick={handleClick}>Click Me</RainbowButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has inline styles for animation', () => {
    const { container } = render(<RainbowButton>Rainbow</RainbowButton>);
    expect(container.firstChild).toHaveStyle({ animation: 'rainbow-border 3s linear infinite' });
  });
});