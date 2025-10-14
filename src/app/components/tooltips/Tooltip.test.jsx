import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
  test('renders children correctly', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('renders tooltip text correctly', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('group');
  });

  test('applies correct CSS classes to the tooltip', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip).toHaveClass('absolute');
    expect(tooltip).toHaveClass('bottom-full');
    expect(tooltip).toHaveClass('mb-2');
    expect(tooltip).toHaveClass('hidden');
    expect(tooltip).toHaveClass('group-hover:block');
    expect(tooltip).toHaveClass('bg-gray-800');
    expect(tooltip).toHaveClass('text-white');
    expect(tooltip).toHaveClass('text-sm');
    expect(tooltip).toHaveClass('rounded');
    expect(tooltip).toHaveClass('px-2');
    expect(tooltip).toHaveClass('py-1');
    expect(tooltip).toHaveClass('whitespace-nowrap');
  });

  test('tooltip is hidden by default (hidden class)', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip).toHaveClass('hidden');
  });
});