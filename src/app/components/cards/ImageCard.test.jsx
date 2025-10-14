import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageCard from './ImageCard';

describe('ImageCard Component', () => {
  test('renders title and description correctly', () => {
    render(<ImageCard title="Image Card" description="Image card description" />);
    expect(screen.getByText('Image Card')).toBeInTheDocument();
    expect(screen.getByText('Image card description')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<ImageCard title="Test" description="Test" />);
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-xl');
    expect(container.firstChild).toHaveClass('bg-theme-surface');
    expect(container.firstChild).toHaveClass('shadow-theme-sm');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-theme-light');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('flex-col');
  });

  test('applies correct CSS classes to the image container', () => {
    const { container } = render(<ImageCard title="Test" description="Test" />);
    const imageContainer = container.querySelector('div.h-36');
    expect(imageContainer).toHaveClass('h-36');
    expect(imageContainer).toHaveClass('w-full');
    expect(imageContainer).toHaveClass('rounded-md');
    expect(imageContainer).toHaveClass('bg-gradient-to-r');
    expect(imageContainer).toHaveClass('flex');
    expect(imageContainer).toHaveClass('items-center');
    expect(imageContainer).toHaveClass('justify-center');
  });

  test('renders SVG image', () => {
    render(<ImageCard title="Test" description="Test" />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '80');
    expect(svg).toHaveAttribute('height', '80');
  });

  test('applies correct CSS classes to the title', () => {
    render(<ImageCard title="Image Card" description="Test" />);
    const title = screen.getByText('Image Card');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('mt-4');
    expect(title).toHaveClass('text-theme-primary');
  });

  test('applies correct CSS classes to the description', () => {
    render(<ImageCard title="Test" description="Image card description" />);
    const description = screen.getByText('Image card description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-theme-secondary');
    expect(description).toHaveClass('mt-2');
  });
});