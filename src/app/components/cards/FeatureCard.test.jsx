import React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';

describe('FeatureCard Component', () => {
  test('renders title and description correctly', () => {
    render(<FeatureCard title="Feature Title" description="Feature description" />);
    expect(screen.getByText('Feature Title')).toBeInTheDocument();
    expect(screen.getByText('Feature description')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<FeatureCard title="Test" description="Test" />);
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-2xl');
    expect(container.firstChild).toHaveClass('bg-gradient-to-br');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-theme-light');
    expect(container.firstChild).toHaveClass('shadow-theme-sm');
  });

  test('applies correct CSS classes to the title', () => {
    render(<FeatureCard title="Feature Title" description="Test" />);
    const title = screen.getByText('Feature Title');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('text-theme-primary');
  });

  test('applies correct CSS classes to the description', () => {
    render(<FeatureCard title="Test" description="Feature description" />);
    const description = screen.getByText('Feature description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-theme-secondary');
    expect(description).toHaveClass('mt-2');
  });

  test('renders feature list items', () => {
    render(<FeatureCard title="Test" description="Test" />);
    expect(screen.getByText('Fast to use')).toBeInTheDocument();
    expect(screen.getByText('Accessible')).toBeInTheDocument();
    expect(screen.getByText('Small bundle size')).toBeInTheDocument();
  });

  test('applies correct CSS classes to feature list', () => {
    render(<FeatureCard title="Test" description="Test" />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('mt-3');
    expect(list).toHaveClass('space-y-1');
    expect(list).toHaveClass('text-sm');
    expect(list).toHaveClass('text-theme-secondary');
  });

  test('renders checkmark icons for features', () => {
    render(<FeatureCard title="Test" description="Test" />);
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(3);
    checkmarks.forEach(checkmark => {
      expect(checkmark).toHaveClass('text-green-500');
    });
  });
});