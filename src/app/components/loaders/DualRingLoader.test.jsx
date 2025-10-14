import React from 'react';
import { render, screen } from '@testing-library/react';
import DualRingLoader from './DualRingLoader';

describe('DualRingLoader Component', () => {
  test('renders correctly with dual ring structure', () => {
    const { container } = render(<DualRingLoader />);
    // Check that we have the outer container
    expect(container.firstChild).toBeInTheDocument();
    // Check that we have the relative container
    const relativeContainer = container.querySelector('div.relative');
    expect(relativeContainer).toBeInTheDocument();
    // Check that we have two ring divs
    const rings = container.querySelectorAll('div.absolute');
    expect(rings).toHaveLength(2);
  });

  test('applies correct CSS classes to the outer container', () => {
    const { container } = render(<DualRingLoader />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('h-full');
  });

  test('applies correct CSS classes to the relative container', () => {
    const { container } = render(<DualRingLoader />);
    const relativeContainer = container.querySelector('div.relative');
    expect(relativeContainer).toHaveClass('relative');
    expect(relativeContainer).toHaveClass('w-20');
    expect(relativeContainer).toHaveClass('h-20');
  });

  test('applies correct CSS classes to the first ring', () => {
    const { container } = render(<DualRingLoader />);
    const rings = container.querySelectorAll('div.absolute');
    const firstRing = rings[0];
    expect(firstRing).toHaveClass('absolute');
    expect(firstRing).toHaveClass('top-0');
    expect(firstRing).toHaveClass('left-0');
    expect(firstRing).toHaveClass('w-full');
    expect(firstRing).toHaveClass('h-full');
    expect(firstRing).toHaveClass('border-6');
    expect(firstRing).toHaveClass('border-blue-100');
    expect(firstRing).toHaveClass('border-t-transparent');
    expect(firstRing).toHaveClass('rounded-full');
    expect(firstRing).toHaveClass('animate-spin');
  });

  test('applies correct CSS classes to the second ring', () => {
    const { container } = render(<DualRingLoader />);
    const rings = container.querySelectorAll('div.absolute');
    const secondRing = rings[1];
    expect(secondRing).toHaveClass('absolute');
    expect(secondRing).toHaveClass('top-0');
    expect(secondRing).toHaveClass('left-0');
    expect(secondRing).toHaveClass('w-full');
    expect(secondRing).toHaveClass('h-full');
    expect(secondRing).toHaveClass('border-4');
    expect(secondRing).toHaveClass('border-gray-900');
    expect(secondRing).toHaveClass('rounded-full');
  });
});