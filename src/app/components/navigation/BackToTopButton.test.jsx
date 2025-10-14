import React from 'react';
import { render, screen } from '@testing-library/react';
import BackToTopButton from './BackToTopButton';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

describe('BackToTopButton Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    window.scrollTo.mockClear();
  });

  test('renders correctly when visible', () => {
    // Mock scrollY to be greater than 300 to make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('does not render when not visible (scrollY <= 300)', () => {
    // Mock scrollY to be less than or equal to 300 to make button invisible
    Object.defineProperty(window, 'scrollY', {
      value: 200,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  test('applies correct CSS classes to the button', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-6');
    expect(button).toHaveClass('right-6');
    expect(button).toHaveClass('z-50');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('shadow-lg');
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).toHaveClass('p-3');
  });

  test('has correct aria-label', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Back to top');
  });

  test('renders SVG icon', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('calls window.scrollTo when clicked', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });
    
    render(<BackToTopButton />);
    const button = screen.getByRole('button');
    button.click();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});