import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkButton from './LinkButton';

describe('LinkButton Component', () => {
  test('renders children correctly', () => {
    render(<LinkButton>Link Text</LinkButton>);
    expect(screen.getByText('Link Text')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<LinkButton>Test</LinkButton>);
    expect(container.firstChild).toHaveClass('bg-blue-300');
    expect(container.firstChild).toHaveClass('px-3');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-md');
    expect(container.firstChild).toHaveClass('text-gray-500');
    expect(container.firstChild).toHaveClass('underline');
    expect(container.firstChild).toHaveClass('underline-offset-4');
  });

  test('applies additional props when provided', () => {
    render(<LinkButton id="link-button" aria-label="Navigate">Link</LinkButton>);
    const button = screen.getByLabelText('Navigate');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'link-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<LinkButton onClick={handleClick}>Click Me</LinkButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});