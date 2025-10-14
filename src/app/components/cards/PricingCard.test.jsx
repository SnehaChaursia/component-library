import React from 'react';
import { render, screen } from '@testing-library/react';
import PricingCard from './PricingCard';

describe('PricingCard Component', () => {
  const mockFeatures = ['Feature 1', 'Feature 2', 'Feature 3'];

  test('renders plan and price correctly', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('$10/month')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<PricingCard plan="Test" price="$0" features={mockFeatures} />);
    expect(container.firstChild).toHaveClass('p-6');
    expect(container.firstChild).toHaveClass('rounded-2xl');
    expect(container.firstChild).toHaveClass('bg-theme-surface');
    expect(container.firstChild).toHaveClass('shadow-theme-md');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-theme-light');
  });

  test('applies correct CSS classes to the plan name', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const plan = screen.getByText('Basic');
    expect(plan).toHaveClass('text-xl');
    expect(plan).toHaveClass('font-semibold');
    expect(plan).toHaveClass('text-theme-primary');
  });

  test('applies correct CSS classes to the price', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const price = screen.getByText('$10/month');
    expect(price).toHaveClass('text-2xl');
    expect(price).toHaveClass('font-bold');
    expect(price).toHaveClass('bg-gradient-to-r');
    expect(price).toHaveClass('bg-clip-text');
  });

  test('renders features correctly', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    mockFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('applies correct CSS classes to the features list', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('mt-4');
    expect(list).toHaveClass('space-y-2');
    expect(list).toHaveClass('text-sm');
    expect(list).toHaveClass('text-theme-secondary');
  });

  test('renders checkmark icons for features', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(3);
    checkmarks.forEach(checkmark => {
      expect(checkmark).toHaveClass('text-green-500');
    });
  });

  test('renders the choose plan button with correct text', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Choose Basic');
  });

  test('applies correct CSS classes to the button', () => {
    render(<PricingCard plan="Basic" price="$10/month" features={mockFeatures} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('bg-theme-primary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('font-medium');
  });
});