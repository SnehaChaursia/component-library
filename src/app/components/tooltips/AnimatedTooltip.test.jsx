import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedTooltip from './AnimatedTooltip';

describe('AnimatedTooltip Component', () => {
  test('renders children correctly', () => {
    render(
      <AnimatedTooltip text="Tooltip text">
        <button>Hover me</button>
      </AnimatedTooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('renders tooltip text correctly', () => {
    render(
      <AnimatedTooltip text="Tooltip text">
        <button>Hover me</button>
      </AnimatedTooltip>
    );
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(
      <AnimatedTooltip text="Tooltip text">
        <button>Hover me</button>
      </AnimatedTooltip>
    );
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('group');
  });

  test('applies correct CSS classes to the tooltip', () => {
    render(
      <AnimatedTooltip text="Tooltip text">
        <button>Hover me</button>
      </AnimatedTooltip>
    );
    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip).toHaveClass('absolute');
    expect(tooltip).toHaveClass('bottom-full');
    expect(tooltip).toHaveClass('left-1/2');
    expect(tooltip).toHaveClass('-translate-x-1/2');
    expect(tooltip).toHaveClass('mb-2');
    expect(tooltip).toHaveClass('bg-gray-900');
    expect(tooltip).toHaveClass('text-white');
    expect(tooltip).toHaveClass('text-sm');
    expect(tooltip).toHaveClass('rounded');
    expect(tooltip).toHaveClass('px-2');
    expect(tooltip).toHaveClass('py-1');
    expect(tooltip).toHaveClass('whitespace-nowrap');
    expect(tooltip).toHaveClass('opacity-0');
    expect(tooltip).toHaveClass('transition-opacity');
    expect(tooltip).toHaveClass('duration-300');
  });

  test('tooltip is hidden by default (opacity-0)', () => {
    render(
      <AnimatedTooltip text="Tooltip text">
        <button>Hover me</button>
      </AnimatedTooltip>
    );
    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip).toHaveClass('opacity-0');
  });
});