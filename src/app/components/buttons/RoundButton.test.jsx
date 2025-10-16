import React from 'react';
import { render, screen } from '@testing-library/react';
import RoundButton from './RoundButton';

describe('RoundButton Component', () => {
  test('renders children correctly', () => {
    const icon = <span>★</span>;
    render(<RoundButton>{icon}</RoundButton>);
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<RoundButton>★</RoundButton>);
    expect(container.firstChild).toHaveClass('w-10');
    expect(container.firstChild).toHaveClass('h-10');
    expect(container.firstChild).toHaveClass('rounded-full');
    expect(container.firstChild).toHaveClass('bg-theme-primary');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-center');
  });

  test('applies additional props when provided', () => {
    render(<RoundButton id="round-button" aria-label="Round Action">★</RoundButton>);
    const button = screen.getByLabelText('Round Action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'round-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<RoundButton onClick={handleClick}>★</RoundButton>);
    const button = screen.getByText('★');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});