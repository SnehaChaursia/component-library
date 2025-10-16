import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard Component', () => {
  test('renders name, role, and quote correctly', () => {
    render(<TestimonialCard name="John Doe" role="CEO, Company" quote="This is an amazing product!" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO, Company')).toBeInTheDocument();
    expect(screen.getByText('"This is an amazing product!"')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<TestimonialCard name="Test" role="Test" quote="Test" />);
    expect(container.firstChild).toHaveClass('p-6');
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('shadow-lg');
    expect(container.firstChild).toHaveClass('bg-white');
  });

  test('applies correct CSS classes to the quote', () => {
    render(<TestimonialCard name="Test" role="Test" quote="This is a great product!" />);
    const quote = screen.getByText('"This is a great product!"');
    expect(quote).toHaveClass('text-gray-700');
    expect(quote).toHaveClass('italic');
  });

  test('applies correct CSS classes to the name container', () => {
    const { container } = render(<TestimonialCard name="Test" role="Test" quote="Test" />);
    const nameContainer = container.querySelector('div.mt-4');
    expect(nameContainer).toHaveClass('mt-4');
  });

  test('applies correct CSS classes to the name', () => {
    render(<TestimonialCard name="John Doe" role="Test" quote="Test" />);
    const name = screen.getByText('John Doe');
    expect(name).toHaveClass('text-lg');
    expect(name).toHaveClass('font-semibold');
    expect(name).toHaveClass('text-gray-900');
  });

  test('applies correct CSS classes to the role', () => {
    render(<TestimonialCard name="Test" role="CEO, Company" quote="Test" />);
    const role = screen.getByText('CEO, Company');
    expect(role).toHaveClass('text-sm');
    expect(role).toHaveClass('text-gray-500');
  });
});