import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsCard from './StatsCard';

describe('StatsCard Component', () => {
  test('renders title and value correctly', () => {
    render(<StatsCard title="Total Users" value="1,234" />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<StatsCard title="Test" value="0" />);
    expect(container.firstChild).toHaveClass('p-4');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('shadow-md');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-between');
  });

  test('renders icon correctly', () => {
    const icon = <span>📊</span>;
    render(<StatsCard title="Test" value="0" icon={icon} />);
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the title', () => {
    render(<StatsCard title="Total Users" value="0" />);
    const title = screen.getByText('Total Users');
    expect(title).toHaveClass('text-sm');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('text-gray-500');
  });

  test('applies correct CSS classes to the value', () => {
    render(<StatsCard title="Test" value="1,234" />);
    const value = screen.getByText('1,234');
    expect(value).toHaveClass('text-2xl');
    expect(value).toHaveClass('font-semibold');
    expect(value).toHaveClass('text-gray-900');
  });

  test('renders positive trend correctly', () => {
    render(<StatsCard title="Test" value="0" trend={12.5} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });

  test('renders negative trend correctly', () => {
    render(<StatsCard title="Test" value="0" trend={-5.2} />);
    expect(screen.getByText('-5.2%')).toBeInTheDocument();
  });

  test('applies correct CSS classes to positive trend', () => {
    render(<StatsCard title="Test" value="0" trend={12.5} />);
    const trend = screen.getByText('+12.5%');
    expect(trend).toHaveClass('text-green-600');
  });

  test('applies correct CSS classes to negative trend', () => {
    render(<StatsCard title="Test" value="0" trend={-5.2} />);
    const trend = screen.getByText('-5.2%');
    expect(trend).toHaveClass('text-red-600');
  });

  test('does not render trend when not provided', () => {
    render(<StatsCard title="Test" value="0" />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});