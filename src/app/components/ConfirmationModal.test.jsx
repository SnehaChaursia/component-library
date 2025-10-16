import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';
import { AlertTriangle, X } from 'lucide-react';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-triangle-icon" />,
  X: () => <div data-testid="x-icon" />
}));

describe('ConfirmationModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
  });

  test('does not render when isOpen is false', () => {
    render(
      <ConfirmationModal 
        isOpen={false} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders correctly when isOpen is true', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        title="Confirm Action"
        message="Are you sure?"
      />
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the backdrop', () => {
    const { container } = render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const backdrop = container.firstChild;
    expect(backdrop).toHaveClass('fixed');
    expect(backdrop).toHaveClass('inset-0');
    expect(backdrop).toHaveClass('z-50');
    expect(backdrop).toHaveClass('flex');
    expect(backdrop).toHaveClass('items-center');
    expect(backdrop).toHaveClass('justify-center');
    expect(backdrop).toHaveClass('p-4');
    expect(backdrop).toHaveClass('bg-black/50');
    expect(backdrop).toHaveClass('backdrop-blur-sm');
  });

  test('applies correct CSS classes to the modal container', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const modalContainer = screen.getByRole('dialog').firstChild;
    expect(modalContainer).toHaveClass('relative');
    expect(modalContainer).toHaveClass('w-full');
    expect(modalContainer).toHaveClass('max-w-md');
    expect(modalContainer).toHaveClass('bg-white');
    expect(modalContainer).toHaveClass('dark:bg-gray-800');
    expect(modalContainer).toHaveClass('rounded-xl');
    expect(modalContainer).toHaveClass('shadow-xl');
  });

  test('renders close button with correct attributes', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('absolute');
    expect(closeButton).toHaveClass('top-4');
    expect(closeButton).toHaveClass('right-4');
  });

  test('renders alert icon with correct variant styles for warning', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        variant="warning"
      />
    );
    
    const iconContainer = screen.getByTestId('alert-triangle-icon').parentElement;
    expect(iconContainer).toHaveClass('bg-amber-100');
    expect(iconContainer).toHaveClass('dark:bg-amber-900/20');
  });

  test('renders alert icon with correct variant styles for danger', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        variant="danger"
      />
    );
    
    const iconContainer = screen.getByTestId('alert-triangle-icon').parentElement;
    expect(iconContainer).toHaveClass('bg-red-100');
    expect(iconContainer).toHaveClass('dark:bg-red-900/20');
  });

  test('renders alert icon with correct variant styles for info', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        variant="info"
      />
    );
    
    const iconContainer = screen.getByTestId('alert-triangle-icon').parentElement;
    expect(iconContainer).toHaveClass('bg-blue-100');
    expect(iconContainer).toHaveClass('dark:bg-blue-900/20');
  });

  test('renders title with correct CSS classes', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        title="Test Title"
      />
    );
    
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-gray-900');
    expect(title).toHaveClass('dark:text-white');
    expect(title).toHaveClass('text-center');
    expect(title).toHaveClass('mb-2');
  });

  test('renders message with correct CSS classes', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        message="Test Message"
      />
    );
    
    const message = screen.getByText('Test Message');
    expect(message).toHaveClass('text-sm');
    expect(message).toHaveClass('text-gray-600');
    expect(message).toHaveClass('dark:text-gray-300');
    expect(message).toHaveClass('text-center');
    expect(message).toHaveClass('mb-6');
  });

  test('renders cancel button with correct CSS classes', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        cancelText="No, Cancel"
      />
    );
    
    const cancelButton = screen.getByText('No, Cancel');
    expect(cancelButton).toHaveClass('flex-1');
    expect(cancelButton).toHaveClass('px-4');
    expect(cancelButton).toHaveClass('py-2');
    expect(cancelButton).toHaveClass('text-sm');
    expect(cancelButton).toHaveClass('font-medium');
    expect(cancelButton).toHaveClass('bg-gray-100');
    expect(cancelButton).toHaveClass('dark:bg-gray-700');
  });

  test('renders confirm button with correct CSS classes for warning variant', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        confirmText="Yes, Confirm"
        variant="warning"
      />
    );
    
    const confirmButton = screen.getByText('Yes, Confirm');
    expect(confirmButton).toHaveClass('flex-1');
    expect(confirmButton).toHaveClass('px-4');
    expect(confirmButton).toHaveClass('py-2');
    expect(confirmButton).toHaveClass('text-sm');
    expect(confirmButton).toHaveClass('font-medium');
    expect(confirmButton).toHaveClass('text-white');
    expect(confirmButton).toHaveClass('bg-amber-600');
    expect(confirmButton).toHaveClass('hover:bg-amber-700');
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    cancelButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when confirm button is clicked', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const confirmButton = screen.getByText('Confirm');
    confirmButton.click();
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('uses custom button texts when provided', () => {
    render(
      <ConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        confirmText="Yes, Delete"
        cancelText="No, Keep"
      />
    );
    
    expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
    expect(screen.getByText('No, Keep')).toBeInTheDocument();
  });
});