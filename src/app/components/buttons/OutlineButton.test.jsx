import React from 'react';
import { render, screen } from '@testing-library/react';
import OutlineButton from './OutlineButton';

describe('OutlineButton Component', () => {
  test('renders children correctly', () => {
    render(<OutlineButton>Outline Button</OutlineButton>);
    expect(screen.getByText('Outline Button')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<OutlineButton>Test</OutlineButton>);
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('border-2');
    expect(container.firstChild).toHaveClass('border-theme-primary');
    expect(container.firstChild).toHaveClass('text-theme-primary');
    expect(container.firstChild).toHaveClass('border-gray-500');
    expect(container.firstChild).toHaveClass('text-gray-900');
  });

  test('applies additional props when provided', () => {
    render(<OutlineButton id="outline-button" aria-label="Action">Outline</OutlineButton>);
    const button = screen.getByLabelText('Action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'outline-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<OutlineButton onClick={handleClick}>Click Me</OutlineButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});