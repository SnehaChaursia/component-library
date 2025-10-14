import React from 'react';
import { render, screen } from '@testing-library/react';
import DotsLoader from './DotsLoader';

describe('DotsLoader Component', () => {
  test('renders correctly with 3 dots', () => {
    render(<DotsLoader />);
    const dots = screen.getAllByRole('img');
    expect(dots).toHaveLength(3);
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<DotsLoader />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('space-x-2');
  });

  test('applies correct CSS classes to each dot', () => {
    render(<DotsLoader />);
    const dots = screen.getAllByRole('img');
    dots.forEach(dot => {
      expect(dot).toHaveClass('w-8');
      expect(dot).toHaveClass('h-8');
      expect(dot).toHaveClass('rounded-full');
      expect(dot).toHaveClass('animate-bounce');
    });
  });

  test('applies correct colors to each dot', () => {
    render(<DotsLoader />);
    const dots = screen.getAllByRole('img');
    
    expect(dots[0]).toHaveClass('bg-red-500');
    expect(dots[1]).toHaveClass('bg-green-500');
    expect(dots[2]).toHaveClass('bg-blue-500');
  });

  test('applies correct animation delays to each dot', () => {
    render(<DotsLoader />);
    const dots = screen.getAllByRole('img');
    
    expect(dots[0]).toHaveClass('[animation-delay:-0.3s]');
    expect(dots[1]).toHaveClass('[animation-delay:-0.15s]');
    expect(dots[2]).not.toHaveClass('[animation-delay:');
  });
});