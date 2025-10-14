import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertCard from './AlertCard';

describe('AlertCard Component', () => {
  test('renders title and description correctly', () => {
    render(<AlertCard title="Alert Title" description="Alert description" />);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert description')).toBeInTheDocument();
  });

  test('applies correct CSS classes for info type', () => {
    const { container } = render(<AlertCard type="info" title="Info" description="Info description" />);
    expect(container.firstChild).toHaveClass('bg-blue-100');
    expect(container.firstChild).toHaveClass('text-blue-800');
  });

  test('applies correct CSS classes for warning type', () => {
    const { container } = render(<AlertCard type="warning" title="Warning" description="Warning description" />);
    expect(container.firstChild).toHaveClass('bg-yellow-100');
    expect(container.firstChild).toHaveClass('text-yellow-800');
  });

  test('applies correct CSS classes for error type', () => {
    const { container } = render(<AlertCard type="error" title="Error" description="Error description" />);
    expect(container.firstChild).toHaveClass('bg-red-100');
    expect(container.firstChild).toHaveClass('text-red-800');
  });

  test('applies correct CSS classes for success type', () => {
    const { container } = render(<AlertCard type="success" title="Success" description="Success description" />);
    expect(container.firstChild).toHaveClass('bg-green-100');
    expect(container.firstChild).toHaveClass('text-green-800');
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<AlertCard title="Test" description="Test" />);
    expect(container.firstChild).toHaveClass('p-4');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('shadow-md');
  });

  test('applies correct CSS classes to the title', () => {
    render(<AlertCard title="Alert Title" description="Test" />);
    const title = screen.getByText('Alert Title');
    expect(title).toHaveClass('font-semibold');
  });

  test('applies correct CSS classes to the description', () => {
    render(<AlertCard title="Test" description="Alert description" />);
    const description = screen.getByText('Alert description');
    expect(description).toHaveClass('mt-1');
  });
});