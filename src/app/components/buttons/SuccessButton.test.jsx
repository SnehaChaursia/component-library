import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessButton from './SuccessButton';

describe('SuccessButton Component', () => {
  test('renders children correctly', () => {
    render(<SuccessButton>Success</SuccessButton>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<SuccessButton>Test</SuccessButton>);
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('bg-green-600');
    expect(container.firstChild).toHaveClass('dark:bg-green-500');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('hover:bg-green-700');
    expect(container.firstChild).toHaveClass('dark:hover:bg-green-600');
  });

  test('applies additional props when provided', () => {
    render(<SuccessButton id="success-button" aria-label="Success Action">Success</SuccessButton>);
    const button = screen.getByLabelText('Success Action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'success-button');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<SuccessButton onClick={handleClick}>Click Me</SuccessButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});