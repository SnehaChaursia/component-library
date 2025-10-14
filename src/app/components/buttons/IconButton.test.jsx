import React from 'react';
import { render, screen } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton Component', () => {
  test('renders children correctly', () => {
    const icon = <span>★</span>;
    render(<IconButton>{icon}</IconButton>);
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<IconButton>★</IconButton>);
    expect(container.firstChild).toHaveClass('p-2');
    expect(container.firstChild).toHaveClass('rounded-md');
    expect(container.firstChild).toHaveClass('inline-flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('text-gray-800');
    expect(container.firstChild).toHaveClass('dark:text-gray-200');
  });

  test('applies additional props when provided', () => {
    render(<IconButton id="icon-button" aria-label="Favorite">★</IconButton>);
    const button = screen.getByLabelText('Favorite');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'icon-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick}>★</IconButton>);
    const button = screen.getByText('★');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});