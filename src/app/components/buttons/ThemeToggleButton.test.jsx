import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeToggleButton from './ThemeToggleButton';

// Mock the ThemeContext
jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeToggleButton Component', () => {
  test('renders correctly with light theme text', () => {
    render(<ThemeToggleButton />);
    expect(screen.getByText('☀️ Light')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<ThemeToggleButton />);
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('rounded-full');
    expect(container.firstChild).toHaveClass('font-semibold');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('dark:bg-gray-800');
    expect(container.firstChild).toHaveClass('text-gray-900');
    expect(container.firstChild).toHaveClass('dark:text-white');
  });

  test('has correct aria-label', () => {
    render(<ThemeToggleButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  test('renders dark theme text when theme is dark', () => {
    // Mock the ThemeContext with dark theme
    jest.mock('../../context/ThemeContext', () => ({
      useTheme: () => ({
        theme: 'dark',
        toggleTheme: jest.fn(),
      }),
    }));

    render(<ThemeToggleButton />);
    expect(screen.getByText('🌙 Dark')).toBeInTheDocument();
  });
});