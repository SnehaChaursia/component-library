import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleCard from './SimpleCard';

describe('SimpleCard Component', () => {
  test('renders title and description correctly', () => {
    render(<SimpleCard title="Card Title" description="Card description" />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<SimpleCard title="Test" description="Test" />);
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-xl');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('dark:bg-gray-800');
    expect(container.firstChild).toHaveClass('shadow-sm');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-gray-200');
    expect(container.firstChild).toHaveClass('dark:border-gray-700');
  });

  test('applies correct CSS classes to the title', () => {
    render(<SimpleCard title="Card Title" description="Test" />);
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('text-gray-900');
    expect(title).toHaveClass('dark:text-white');
  });

  test('applies correct CSS classes to the description', () => {
    render(<SimpleCard title="Test" description="Card description" />);
    const description = screen.getByText('Card description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-gray-600');
    expect(description).toHaveClass('dark:text-gray-300');
    expect(description).toHaveClass('mt-2');
  });

  test('renders action buttons', () => {
    render(<SimpleCard title="Test" description="Test" />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  test('applies correct CSS classes to action buttons', () => {
    render(<SimpleCard title="Test" description="Test" />);
    const actionButton = screen.getByText('Action');
    const moreButton = screen.getByText('More');
    
    expect(actionButton).toHaveClass('text-sm');
    expect(actionButton).toHaveClass('px-3');
    expect(actionButton).toHaveClass('py-1');
    expect(actionButton).toHaveClass('rounded');
    expect(actionButton).toHaveClass('bg-indigo-50');
    
    expect(moreButton).toHaveClass('text-sm');
    expect(moreButton).toHaveClass('px-3');
    expect(moreButton).toHaveClass('py-1');
    expect(moreButton).toHaveClass('rounded');
    expect(moreButton).toHaveClass('bg-gray-100');
  });
});