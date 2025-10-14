import React from 'react';
import { render, screen } from '@testing-library/react';
import DataCard from './DataCard';

describe('DataCard Component', () => {
  test('renders title and value correctly', () => {
    render(<DataCard title="Total Revenue" value="$12,345" />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<DataCard title="Test" value="$0" />);
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-xl');
    expect(container.firstChild).toHaveClass('bg-theme-surface');
    expect(container.firstChild).toHaveClass('shadow-theme-sm');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-theme-light');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('gap-4');
  });

  test('renders default icon when not provided', () => {
    render(<DataCard title="Test" value="$0" />);
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  test('renders custom icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">★</span>;
    render(<DataCard title="Test" value="$0" icon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the icon container', () => {
    const { container } = render(<DataCard title="Test" value="$0" />);
    const iconContainer = container.querySelector('div.h-12');
    expect(iconContainer).toHaveClass('h-12');
    expect(iconContainer).toHaveClass('w-12');
    expect(iconContainer).toHaveClass('rounded-lg');
    expect(iconContainer).toHaveClass('flex');
    expect(iconContainer).toHaveClass('items-center');
    expect(iconContainer).toHaveClass('justify-center');
    expect(iconContainer).toHaveClass('bg-indigo-100');
    expect(iconContainer).toHaveClass('dark:bg-indigo-900/50');
    expect(iconContainer).toHaveClass('text-indigo-600');
    expect(iconContainer).toHaveClass('dark:text-indigo-400');
    expect(iconContainer).toHaveClass('text-2xl');
  });

  test('applies correct CSS classes to the title', () => {
    render(<DataCard title="Total Revenue" value="$0" />);
    const title = screen.getByText('Total Revenue');
    expect(title).toHaveClass('text-sm');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('text-theme-secondary');
  });

  test('applies correct CSS classes to the value', () => {
    render(<DataCard title="Test" value="$12,345" />);
    const value = screen.getByText('$12,345');
    expect(value).toHaveClass('text-xl');
    expect(value).toHaveClass('font-semibold');
    expect(value).toHaveClass('text-theme-primary');
  });

  test('renders positive trend correctly', () => {
    render(<DataCard title="Test" value="$0" trend={5.2} />);
    expect(screen.getByText('▲ 5.2%')).toBeInTheDocument();
  });

  test('renders negative trend correctly', () => {
    render(<DataCard title="Test" value="$0" trend={-3.7} />);
    expect(screen.getByText('▼ 3.7%')).toBeInTheDocument();
  });

  test('applies correct CSS classes to positive trend', () => {
    render(<DataCard title="Test" value="$0" trend={5.2} />);
    const trend = screen.getByText('▲ 5.2%');
    expect(trend).toHaveClass('text-green-600');
    expect(trend).toHaveClass('dark:text-green-400');
  });

  test('applies correct CSS classes to negative trend', () => {
    render(<DataCard title="Test" value="$0" trend={-3.7} />);
    const trend = screen.getByText('▼ 3.7%');
    expect(trend).toHaveClass('text-red-600');
    expect(trend).toHaveClass('dark:text-red-400');
  });

  test('does not render trend when not provided', () => {
    render(<DataCard title="Test" value="$0" />);
    expect(screen.queryByText(/▲/)).not.toBeInTheDocument();
    expect(screen.queryByText(/▼/)).not.toBeInTheDocument();
  });
});