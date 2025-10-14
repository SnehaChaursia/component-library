import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb Component', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Product', href: '/category/product' }
  ];

  test('renders correctly with items', () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the nav element', () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('flex');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  test('applies correct CSS classes to the ol element', () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const ol = container.querySelector('ol');
    expect(ol).toHaveClass('inline-flex');
    expect(ol).toHaveClass('items-center');
    expect(ol).toHaveClass('space-x-1');
  });

  test('renders separators between items', () => {
    render(<Breadcrumb items={mockItems} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  test('uses custom separator when provided', () => {
    render(<Breadcrumb items={mockItems} separator=">" />);
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  test('applies correct CSS classes to separators', () => {
    render(<Breadcrumb items={mockItems} />);
    const separator = screen.getByText('/');
    expect(separator).toHaveClass('mx-2');
    expect(separator).toHaveClass('text-theme-muted');
  });

  test('renders links for non-last items', () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const categoryLink = screen.getByRole('link', { name: 'Category' });
    
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveAttribute('href', '/category');
  });

  test('applies correct CSS classes to links', () => {
    render(<Breadcrumb items={mockItems} />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('items-center');
    expect(link).toHaveClass('text-sm');
    expect(link).toHaveClass('font-medium');
    expect(link).toHaveClass('text-theme-primary');
  });

  test('renders span for last item with aria-current', () => {
    render(<Breadcrumb items={mockItems} />);
    const lastItem = screen.getByText('Product');
    expect(lastItem).toBeInTheDocument();
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  test('applies correct CSS classes to last item', () => {
    render(<Breadcrumb items={mockItems} />);
    const lastItem = screen.getByText('Product');
    expect(lastItem).toHaveClass('text-sm');
    expect(lastItem).toHaveClass('font-medium');
    expect(lastItem).toHaveClass('text-theme-secondary');
  });

  test('renders icons when provided', () => {
    const itemsWithIcons = [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Category', href: '/category', icon: '📂' },
      { label: 'Product', href: '/category/product', icon: '📦' }
    ];
    
    render(<Breadcrumb items={itemsWithIcons} />);
    const icons = screen.getAllByText(/🏠|📂|📦/);
    expect(icons).toHaveLength(3);
  });

  test('renders empty breadcrumb when no items provided', () => {
    const { container } = render(<Breadcrumb />);
    const ol = container.querySelector('ol');
    expect(ol).toBeEmptyDOMElement();
  });
});