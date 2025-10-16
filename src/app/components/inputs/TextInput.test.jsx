import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  test('renders input element correctly', () => {
    render(<TextInput />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(<TextInput label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  test('renders placeholder when provided', () => {
    render(<TextInput placeholder="Enter your email" />);
    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<TextInput />);
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('space-y-2');
    expect(container.firstChild).toHaveClass('relative');
  });

  test('applies correct CSS classes to the label', () => {
    render(<TextInput label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block');
    expect(label).toHaveClass('text-gray-700');
    expect(label).toHaveClass('dark:text-gray-300');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('mb-2');
  });

  test('shows asterisk when required', () => {
    render(<TextInput label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the input element', () => {
    render(<TextInput />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('shadow-sm');
    expect(input).toHaveClass('bg-white');
    expect(input).toHaveClass('dark:bg-gray-800');
    expect(input).toHaveClass('text-gray-900');
    expect(input).toHaveClass('dark:text-white');
  });

  test('applies correct type attribute', () => {
    render(<TextInput type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('renders password input with show/hide button', () => {
    render(<TextInput type="password" />);
    const input = screen.getByLabelText('password', { selector: 'input' });
    const button = screen.getByRole('button');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Show password');
  });

  test('toggles password visibility when button is clicked', () => {
    render(<TextInput type="password" />);
    const input = screen.getByLabelText('password', { selector: 'input' });
    const button = screen.getByRole('button');
    
    // Initially password is hidden
    expect(input).toHaveAttribute('type', 'password');
    expect(button).toHaveAttribute('aria-label', 'Show password');
    
    // Click to show password
    button.click();
    expect(input).toHaveAttribute('type', 'text');
    expect(button).toHaveAttribute('aria-label', 'Hide password');
  });

  test('applies error styles when error is provided', () => {
    render(<TextInput error="This field is required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-400');
    expect(input).toHaveClass('focus:ring-red-500');
    expect(input).toHaveClass('focus:border-red-500');
  });

  test('renders error message when provided', () => {
    render(<TextInput error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('applies correct CSS classes to error message', () => {
    render(<TextInput error="This field is required" />);
    const error = screen.getByText('This field is required');
    expect(error).toHaveClass('mt-1');
    expect(error).toHaveClass('text-sm');
    expect(error).toHaveClass('text-red-500');
  });

  test('renders helper text when provided and no error', () => {
    render(<TextInput helperText="Please enter a valid email address" />);
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('does not render helper text when error is present', () => {
    render(<TextInput helperText="Please enter a valid email" error="Invalid email" />);
    expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('applies correct CSS classes to helper text', () => {
    render(<TextInput helperText="Helper text" />);
    const helper = screen.getByText('Helper text');
    expect(helper).toHaveClass('mt-1');
    expect(helper).toHaveClass('text-sm');
    expect(helper).toHaveClass('text-gray-600');
    expect(helper).toHaveClass('dark:text-gray-400');
  });

  test('applies hover styles when not in error state', () => {
    render(<TextInput />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('hover:border-gray-400');
    expect(input).toHaveClass('dark:hover:border-gray-500');
  });
});