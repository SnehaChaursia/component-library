import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingButton from './LoadingButton';

describe('LoadingButton Component', () => {
  test('renders children correctly', () => {
    render(<LoadingButton>Submit</LoadingButton>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<LoadingButton>Test</LoadingButton>);
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('bg-amber-400');
    expect(container.firstChild).toHaveClass('dark:bg-amber-500');
    expect(container.firstChild).toHaveClass('text-gray-900');
    expect(container.firstChild).toHaveClass('dark:text-gray-100');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-center');
  });

  test('shows loading spinner when isLoading is true', () => {
    render(<LoadingButton isLoading>Submit</LoadingButton>);
    const spinner = screen.getByRole('img');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  test('does not show loading spinner when isLoading is false', () => {
    render(<LoadingButton isLoading={false}>Submit</LoadingButton>);
    const spinners = screen.queryAllByRole('img');
    expect(spinners).toHaveLength(0);
  });

  test('is disabled when isLoading is true', () => {
    render(<LoadingButton isLoading>Submit</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('is not disabled when isLoading is false', () => {
    render(<LoadingButton isLoading={false}>Submit</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  test('handles click events when not loading', () => {
    const handleClick = jest.fn();
    render(<LoadingButton isLoading={false} onClick={handleClick}>Click Me</LoadingButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when loading', () => {
    const handleClick = jest.fn();
    render(<LoadingButton isLoading onClick={handleClick}>Click Me</LoadingButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});