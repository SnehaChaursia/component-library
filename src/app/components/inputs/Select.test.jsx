import React from 'react';
import { render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  test('renders select input correctly', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(<Select label="Choose an option" options={mockOptions} />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  test('renders placeholder option', () => {
    render(<Select options={mockOptions} placeholder="Select something..." />);
    expect(screen.getByText('Select something...')).toBeInTheDocument();
  });

  test('renders options correctly', () => {
    render(<Select options={mockOptions} />);
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<Select options={mockOptions} />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  test('applies correct CSS classes to the label', () => {
    render(<Select label="Test Label" options={mockOptions} />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block');
    expect(label).toHaveClass('text-gray-100');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('text-theme-primary');
    expect(label).toHaveClass('mb-1');
  });

  test('shows asterisk when required', () => {
    render(<Select label="Test Label" required options={mockOptions} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the select element', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('w-full');
    expect(select).toHaveClass('px-3');
    expect(select).toHaveClass('py-2');
    expect(select).toHaveClass('border');
    expect(select).toHaveClass('rounded-md');
    expect(select).toHaveClass('shadow-theme-sm');
    expect(select).toHaveClass('bg-theme-surface');
    expect(select).toHaveClass('text-theme-primary');
  });

  test('applies hover styles when not in error state', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('hover:border-theme-primary');
  });

  test('applies error styles when error is provided', () => {
    render(<Select options={mockOptions} error="This field is required" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-400');
    expect(select).toHaveClass('focus:ring-red-500');
    expect(select).toHaveClass('focus:border-red-500');
  });

  test('renders error message when provided', () => {
    render(<Select options={mockOptions} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('applies correct CSS classes to error message', () => {
    render(<Select options={mockOptions} error="This field is required" />);
    const error = screen.getByText('This field is required');
    expect(error).toHaveClass('mt-1');
    expect(error).toHaveClass('text-sm');
    expect(error).toHaveClass('text-red-500');
  });

  test('applies correct CSS classes to option elements', () => {
    render(<Select options={mockOptions} />);
    const options = screen.getAllByRole('option');
    // Skip the first option which is the placeholder
    const actualOptions = options.slice(1);
    actualOptions.forEach(option => {
      expect(option).toHaveClass('bg-theme-surface');
      expect(option).toHaveClass('text-theme-primary');
    });
  });

  test('renders empty select when no options provided', () => {
    render(<Select />);
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1); // Just the placeholder
  });
});