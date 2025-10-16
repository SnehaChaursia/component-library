import React from 'react';
import { render, screen } from '@testing-library/react';
import BarLoader from './BarLoader';

describe('BarLoader Component', () => {
  test('renders correctly with 5 bars', () => {
    render(<BarLoader />);
    const bars = screen.getAllByRole('img');
    expect(bars).toHaveLength(5);
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<BarLoader />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('space-x-1');
  });

  test('applies correct CSS classes to each bar', () => {
    render(<BarLoader />);
    const bars = screen.getAllByRole('img');
    bars.forEach(bar => {
      expect(bar).toHaveClass('w-2.5');
      expect(bar).toHaveClass('h-8');
      expect(bar).toHaveClass('bg-emerald-800');
      expect(bar).toHaveClass('animate-ping');
    });
  });

  test('applies correct inline styles for animation delay', () => {
    render(<BarLoader />);
    const bars = screen.getAllByRole('img');
    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle({ animationDelay: `${index * 0.1}s` });
    });
  });
});