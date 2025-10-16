import React from 'react';
import { render, screen } from '@testing-library/react';
import PillButton from './PillButton';

describe('PillButton Component', () => {
  test('renders children correctly', () => {
    render(<PillButton>Pill Button</PillButton>);
    expect(screen.getByText('Pill Button')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<PillButton>Test</PillButton>);
    expect(container.firstChild).toHaveClass('px-5');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-full');
    expect(container.firstChild).toHaveClass('bg-teal-500');
    expect(container.firstChild).toHaveClass('dark:bg-teal-400');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('font-semibold');
  });

  test('applies additional props when provided', () => {
    render(<PillButton id="pill-button" aria-label="Pill Action">Pill</PillButton>);
    const button = screen.getByLabelText('Pill Action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'pill-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<PillButton onClick={handleClick}>Click Me</PillButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});