import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders correctly with default props', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    // Check page info
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    
    // Check page numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the nav element', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('flex');
    expect(nav).toHaveClass('items-center');
    expect(nav).toHaveClass('justify-between');
  });

  test('applies correct CSS classes to the buttons container', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const buttonsContainer = container.querySelector('div.flex.items-center');
    expect(buttonsContainer).toHaveClass('flex');
    expect(buttonsContainer).toHaveClass('items-center');
    expect(buttonsContainer).toHaveClass('space-x-1');
  });

  test('renders First and Last buttons by default', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Last' })).toBeInTheDocument();
  });

  test('renders Previous and Next buttons by default', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('does not render First button when on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.queryByRole('button', { name: 'First' })).not.toBeInTheDocument();
  });

  test('does not render Last button when on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.queryByRole('button', { name: 'Last' })).not.toBeInTheDocument();
  });

  test('disables Previous button when on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button when on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  test('highlights current page with correct CSS classes', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const currentPageButton = screen.getByRole('button', { name: '3' });
    expect(currentPageButton).toHaveClass('text-white');
    expect(currentPageButton).toHaveClass('bg-theme-primary');
    expect(currentPageButton).toHaveClass('border-theme-primary');
  });

  test('applies correct CSS classes to non-current pages', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const nonCurrentPageButton = screen.getByRole('button', { name: '2' });
    expect(nonCurrentPageButton).toHaveClass('text-theme-secondary');
    expect(nonCurrentPageButton).toHaveClass('bg-theme-surface');
    expect(nonCurrentPageButton).toHaveClass('border-theme');
  });

  test('calls onPageChange when page button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const pageButton = screen.getByRole('button', { name: '3' });
    pageButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange when Previous button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    prevButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange when Next button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('calls onPageChange when First button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const firstButton = screen.getByRole('button', { name: 'First' });
    firstButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange when Last button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const lastButton = screen.getByRole('button', { name: 'Last' });
    lastButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  test('does not call onPageChange when clicking current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    const currentPageButton = screen.getByRole('button', { name: '3' });
    currentPageButton.click();
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test('does not render First and Last buttons when showFirstLast is false', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
        showFirstLast={false} 
      />
    );
    expect(screen.queryByRole('button', { name: 'First' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Last' })).not.toBeInTheDocument();
  });

  test('does not render Previous and Next buttons when showPrevNext is false', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
        showPrevNext={false} 
      />
    );
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });
});