import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge Component', () => {
  test('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('applies correct CSS classes for default variant', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-gray-100');
    expect(container.firstChild).toHaveClass('dark:bg-gray-700');
    expect(container.firstChild).toHaveClass('text-gray-800');
    expect(container.firstChild).toHaveClass('dark:text-gray-200');
  });

  test('applies correct CSS classes for primary variant', () => {
    const { container } = render(<Badge variant="primary">Primary Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-indigo-100');
    expect(container.firstChild).toHaveClass('dark:bg-indigo-900/50');
    expect(container.firstChild).toHaveClass('text-indigo-800');
    expect(container.firstChild).toHaveClass('dark:text-indigo-200');
  });

  test('applies correct CSS classes for success variant', () => {
    const { container } = render(<Badge variant="success">Success Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-green-100');
    expect(container.firstChild).toHaveClass('dark:bg-green-900/50');
    expect(container.firstChild).toHaveClass('text-green-800');
    expect(container.firstChild).toHaveClass('dark:text-green-200');
  });

  test('applies correct CSS classes for warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-yellow-100');
    expect(container.firstChild).toHaveClass('dark:bg-yellow-900/50');
    expect(container.firstChild).toHaveClass('text-yellow-800');
    expect(container.firstChild).toHaveClass('dark:text-yellow-200');
  });

  test('applies correct CSS classes for error variant', () => {
    const { container } = render(<Badge variant="error">Error Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-red-100');
    expect(container.firstChild).toHaveClass('dark:bg-red-900/50');
    expect(container.firstChild).toHaveClass('text-red-800');
    expect(container.firstChild).toHaveClass('dark:text-red-200');
  });

  test('applies correct CSS classes for info variant', () => {
    const { container } = render(<Badge variant="info">Info Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-blue-100');
    expect(container.firstChild).toHaveClass('dark:bg-blue-900/50');
    expect(container.firstChild).toHaveClass('text-blue-800');
    expect(container.firstChild).toHaveClass('dark:text-blue-200');
  });

  test('applies correct CSS classes for different sizes', () => {
    const { container: smContainer } = render(<Badge size="sm">Small Badge</Badge>);
    expect(smContainer.firstChild).toHaveClass('px-2');
    expect(smContainer.firstChild).toHaveClass('py-0.5');
    expect(smContainer.firstChild).toHaveClass('text-xs');

    const { container: mdContainer } = render(<Badge size="md">Medium Badge</Badge>);
    expect(mdContainer.firstChild).toHaveClass('px-2.5');
    expect(mdContainer.firstChild).toHaveClass('py-0.5');
    expect(mdContainer.firstChild).toHaveClass('text-sm');

    const { container: lgContainer } = render(<Badge size="lg">Large Badge</Badge>);
    expect(lgContainer.firstChild).toHaveClass('px-3');
    expect(lgContainer.firstChild).toHaveClass('py-1');
    expect(lgContainer.firstChild).toHaveClass('text-sm');
  });

  test('shows dot when dot prop is true', () => {
    render(<Badge dot>Dot Badge</Badge>);
    const dot = screen.getByRole('img');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass('w-2');
    expect(dot).toHaveClass('h-2');
    expect(dot).toHaveClass('rounded-full');
  });

  test('applies correct dot color for different variants', () => {
    const { container: primaryContainer } = render(<Badge variant="primary" dot>Primary Dot</Badge>);
    const primaryDot = primaryContainer.querySelector('span');
    expect(primaryDot).toHaveClass('bg-indigo-500');
    expect(primaryDot).toHaveClass('dark:bg-indigo-400');

    const { container: successContainer } = render(<Badge variant="success" dot>Success Dot</Badge>);
    const successDot = successContainer.querySelector('span');
    expect(successDot).toHaveClass('bg-green-500');
    expect(successDot).toHaveClass('dark:bg-green-400');
  });

  test('shows remove button when removable is true', () => {
    const handleRemove = jest.fn();
    render(<Badge removable onRemove={handleRemove}>Removable Badge</Badge>);
    const removeButton = screen.getByRole('button');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('×');
  });

  test('calls onRemove when remove button is clicked', () => {
    const handleRemove = jest.fn();
    render(<Badge removable onRemove={handleRemove}>Removable Badge</Badge>);
    const removeButton = screen.getByRole('button');
    removeButton.click();
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test('does not show remove button when removable is false', () => {
    render(<Badge removable={false}>Non-removable Badge</Badge>);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });
});