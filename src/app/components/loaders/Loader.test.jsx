import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  test('renders correctly with spinner', () => {
    const { container } = render(<Loader />);
    // Check that we have the outer container
    expect(container.firstChild).toBeInTheDocument();
    // Check that we have the spinner div
    const spinner = container.querySelector('div.w-20');
    expect(spinner).toBeInTheDocument();
  });

  test('applies correct CSS classes to the outer container', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('h-full');
  });

  test('applies correct CSS classes to the spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('div.w-20');
    expect(spinner).toHaveClass('w-20');
    expect(spinner).toHaveClass('h-20');
    expect(spinner).toHaveClass('border-4');
    expect(spinner).toHaveClass('border-gray-300');
    expect(spinner).toHaveClass('border-t-blue-800');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('animate-spin');
  });
});