import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert Component', () => {
  test('renders title and message correctly', () => {
    render(<Alert title="Alert Title" message="Alert message" />);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  test('applies correct CSS classes for info type', () => {
    const { container } = render(<Alert type="info" message="Info message" />);
    expect(container.firstChild).toHaveClass('bg-blue-50');
    expect(container.firstChild).toHaveClass('dark:bg-blue-900/20');
    expect(container.firstChild).toHaveClass('border-blue-200');
    expect(container.firstChild).toHaveClass('dark:border-blue-800');
    expect(container.firstChild).toHaveClass('text-blue-800');
    expect(container.firstChild).toHaveClass('dark:text-blue-200');
  });

  test('applies correct CSS classes for success type', () => {
    const { container } = render(<Alert type="success" message="Success message" />);
    expect(container.firstChild).toHaveClass('bg-green-50');
    expect(container.firstChild).toHaveClass('dark:bg-green-900/20');
    expect(container.firstChild).toHaveClass('border-green-200');
    expect(container.firstChild).toHaveClass('dark:border-green-800');
    expect(container.firstChild).toHaveClass('text-green-800');
    expect(container.firstChild).toHaveClass('dark:text-green-200');
  });

  test('applies correct CSS classes for warning type', () => {
    const { container } = render(<Alert type="warning" message="Warning message" />);
    expect(container.firstChild).toHaveClass('bg-yellow-50');
    expect(container.firstChild).toHaveClass('dark:bg-yellow-900/20');
    expect(container.firstChild).toHaveClass('border-yellow-200');
    expect(container.firstChild).toHaveClass('dark:border-yellow-800');
    expect(container.firstChild).toHaveClass('text-yellow-800');
    expect(container.firstChild).toHaveClass('dark:text-yellow-200');
  });

  test('applies correct CSS classes for error type', () => {
    const { container } = render(<Alert type="error" message="Error message" />);
    expect(container.firstChild).toHaveClass('bg-red-50');
    expect(container.firstChild).toHaveClass('dark:bg-red-900/20');
    expect(container.firstChild).toHaveClass('border-red-200');
    expect(container.firstChild).toHaveClass('dark:border-red-800');
    expect(container.firstChild).toHaveClass('text-red-800');
    expect(container.firstChild).toHaveClass('dark:text-red-200');
  });

  test('shows icon by default', () => {
    render(<Alert message="Test message" />);
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  test('hides icon when icon prop is false', () => {
    render(<Alert message="Test message" icon={false} />);
    expect(screen.queryByText('ℹ')).not.toBeInTheDocument();
  });

  test('shows dismiss button when dismissible is true', () => {
    const handleClose = jest.fn();
    render(<Alert message="Test message" dismissible onClose={handleClose} />);
    const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
    expect(dismissButton).toBeInTheDocument();
  });

  test('calls onClose when dismiss button is clicked', () => {
    const handleClose = jest.fn();
    render(<Alert message="Test message" dismissible onClose={handleClose} />);
    const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
    dismissButton.click();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not show dismiss button when dismissible is false', () => {
    render(<Alert message="Test message" dismissible={false} />);
    const dismissButtons = screen.queryAllByRole('button', { name: 'Dismiss' });
    expect(dismissButtons).toHaveLength(0);
  });
});