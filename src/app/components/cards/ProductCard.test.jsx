import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return ({ alt, ...props }) => <img alt={alt} {...props} />;
});

// Mock PrimaryButton component
jest.mock('../buttons/PrimaryButton', () => {
  return ({ children, className, ...props }) => (
    <button className={className} {...props}>{children}</button>
  );
});

describe('ProductCard Component', () => {
  test('renders name and price correctly', () => {
    render(<ProductCard name="Product Name" price="$29.99" image="/product.jpg" />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<ProductCard name="Test" price="$0" image="/test.jpg" />);
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('shadow-md');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('overflow-hidden');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('flex-col');
  });

  test('renders image when provided', () => {
    render(<ProductCard name="Test" price="$0" image="/product.jpg" />);
    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/product.jpg');
  });

  test('applies correct CSS classes to the image container', () => {
    const { container } = render(<ProductCard name="Test" price="$0" image="/test.jpg" />);
    const imageContainer = container.querySelector('div.relative');
    expect(imageContainer).toHaveClass('relative');
    expect(imageContainer).toHaveClass('w-full');
    expect(imageContainer).toHaveClass('h-48');
  });

  test('applies correct CSS classes to the content container', () => {
    const { container } = render(<ProductCard name="Test" price="$0" image="/test.jpg" />);
    const contentContainer = container.querySelector('div.p-4');
    expect(contentContainer).toHaveClass('p-4');
    expect(contentContainer).toHaveClass('flex');
    expect(contentContainer).toHaveClass('flex-col');
    expect(contentContainer).toHaveClass('flex-grow');
  });

  test('applies correct CSS classes to the product name', () => {
    render(<ProductCard name="Product Name" price="$0" image="/test.jpg" />);
    const name = screen.getByText('Product Name');
    expect(name).toHaveClass('text-lg');
    expect(name).toHaveClass('font-semibold');
    expect(name).toHaveClass('text-gray-900');
  });

  test('applies correct CSS classes to the price', () => {
    render(<ProductCard name="Test" price="$29.99" image="/test.jpg" />);
    const price = screen.getByText('$29.99');
    expect(price).toHaveClass('text-gray-700');
    expect(price).toHaveClass('mt-1');
  });

  test('renders Buy Now button', () => {
    render(<ProductCard name="Test" price="$0" image="/test.jpg" />);
    const button = screen.getByRole('button', { name: 'Buy Now' });
    expect(button).toBeInTheDocument();
  });

  test('applies correct CSS classes to the button', () => {
    render(<ProductCard name="Test" price="$0" image="/test.jpg" />);
    const button = screen.getByRole('button', { name: 'Buy Now' });
    expect(button).toHaveClass('mt-auto');
  });
});