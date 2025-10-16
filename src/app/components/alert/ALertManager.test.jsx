import React from 'react';
import { render, screen } from '@testing-library/react';
import ALertManager from './ALertManager';

describe('ALertManager Component', () => {
  test('renders all alerts correctly', () => {
    render(<ALertManager />);
    expect(screen.getByText('Profile updated Successfully')).toBeInTheDocument();
    expect(screen.getByText('Failed to save changes')).toBeInTheDocument();
    expect(screen.getByText('New update available')).toBeInTheDocument();
    expect(screen.getByText("Don't do it next time")).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<ALertManager />);
    expect(container.firstChild).toHaveClass('space-y-3');
    expect(container.firstChild).toHaveClass('w-80');
  });

  test('applies correct CSS classes for success alerts', () => {
    render(<ALertManager />);
    const successAlert = screen.getByText('Profile updated Successfully').closest('div');
    expect(successAlert).toHaveClass('bg-green-100');
    expect(successAlert).toHaveClass('border-green-400');
    expect(successAlert).toHaveClass('text-green-700');
  });

  test('applies correct CSS classes for error alerts', () => {
    render(<ALertManager />);
    const errorAlert = screen.getByText('Failed to save changes').closest('div');
    expect(errorAlert).toHaveClass('bg-red-100');
    expect(errorAlert).toHaveClass('border-red-400');
    expect(errorAlert).toHaveClass('text-red-700');
  });

  test('applies correct CSS classes for info alerts', () => {
    render(<ALertManager />);
    const infoAlert = screen.getByText('New update available').closest('div');
    expect(infoAlert).toHaveClass('bg-blue-100');
    expect(infoAlert).toHaveClass('border-blue-400');
    expect(infoAlert).toHaveClass('text-blue-700');
  });

  test('applies correct CSS classes for warning alerts', () => {
    render(<ALertManager />);
    const warningAlert = screen.getByText("Don't do it next time").closest('div');
    expect(warningAlert).toHaveClass('bg-yellow-100');
    expect(warningAlert).toHaveClass('border-yellow-400');
    expect(warningAlert).toHaveClass('text-yellow-700');
  });

  test('applies common CSS classes to all alerts', () => {
    render(<ALertManager />);
    const alerts = screen.getAllByRole('alert');
    alerts.forEach(alert => {
      expect(alert).toHaveClass('border-l-4');
      expect(alert).toHaveClass('p-4');
      expect(alert).toHaveClass('rounded-md');
      expect(alert).toHaveClass('shadow-md');
      expect(alert).toHaveClass('flex');
      expect(alert).toHaveClass('justify-between');
      expect(alert).toHaveClass('items-center');
    });
  });

  test('renders close buttons for all alerts', () => {
    render(<ALertManager />);
    const closeButtons = screen.getAllByText('×');
    expect(closeButtons).toHaveLength(4);
  });

  test('applies correct CSS classes to close buttons', () => {
    render(<ALertManager />);
    const closeButtons = screen.getAllByText('×');
    closeButtons.forEach(button => {
      expect(button).toHaveClass('ml-3');
      expect(button).toHaveClass('font-bold');
      expect(button).toHaveClass('hover:opacity-70');
    });
  });
});