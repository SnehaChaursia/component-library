import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders checkbox input correctly', () => {
    render(<Checkbox onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(<Checkbox label="Accept terms" onChange={mockOnChange} />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  test('renders description when provided', () => {
    render(<Checkbox description="Please accept the terms" onChange={mockOnChange} />);
    expect(screen.getByText('Please accept the terms')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<Checkbox onChange={mockOnChange} />);
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-start');
  });

  test('applies correct CSS classes to the checkbox container', () => {
    const { container } = render(<Checkbox onChange={mockOnChange} />);
    const checkboxContainer = container.querySelector('div.flex.items-center');
    expect(checkboxContainer).toHaveClass('flex');
    expect(checkboxContainer).toHaveClass('items-center');
    expect(checkboxContainer).toHaveClass('h-5');
  });

  test('applies correct CSS classes to the checkbox input', () => {
    render(<Checkbox onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('w-4');
    expect(checkbox).toHaveClass('h-4');
    expect(checkbox).toHaveClass('bg-theme-surface');
    expect(checkbox).toHaveClass('border-theme');
    expect(checkbox).toHaveClass('rounded');
  });

  test('applies checked styles when checked', () => {
    render(<Checkbox checked onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('checked:bg-theme-primary');
    expect(checkbox).toHaveClass('checked:border-theme-primary');
  });

  test('applies disabled styles when disabled', () => {
    render(<Checkbox disabled onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('opacity-50');
    expect(checkbox).toHaveClass('cursor-not-allowed');
  });

  test('applies hover styles when not disabled', () => {
    render(<Checkbox onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('hover:border-theme-primary');
    expect(checkbox).toHaveClass('cursor-pointer');
  });

  test('calls onChange when clicked', () => {
    render(<Checkbox onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled', () => {
    render(<Checkbox disabled onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test('applies correct CSS classes to label container', () => {
    const { container } = render(<Checkbox label="Test" onChange={mockOnChange} />);
    const labelContainer = container.querySelector('div.ml-3');
    expect(labelContainer).toHaveClass('ml-3');
    expect(labelContainer).toHaveClass('text-sm');
  });

  test('applies disabled styles to label when disabled', () => {
    render(<Checkbox label="Test" disabled onChange={mockOnChange} />);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('opacity-50');
  });

  test('applies disabled styles to description when disabled', () => {
    render(<Checkbox description="Test" disabled onChange={mockOnChange} />);
    const description = screen.getByText('Test');
    expect(description).toHaveClass('opacity-50');
  });
});