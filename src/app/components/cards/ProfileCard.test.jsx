import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';

describe('ProfileCard Component', () => {
  test('renders name and role correctly', () => {
    render(<ProfileCard name="John Doe" role="Software Engineer" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<ProfileCard name="Test" role="Test" />);
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-xl');
    expect(container.firstChild).toHaveClass('bg-theme-surface');
    expect(container.firstChild).toHaveClass('shadow-theme-sm');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-theme-light');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('gap-4');
  });

  test('renders avatar with first letter of name', () => {
    render(<ProfileCard name="Alice Smith" role="Designer" />);
    const avatar = screen.getByText('A');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('h-14');
    expect(avatar).toHaveClass('w-14');
    expect(avatar).toHaveClass('rounded-full');
    expect(avatar).toHaveClass('bg-indigo-100');
    expect(avatar).toHaveClass('dark:bg-indigo-900/50');
    expect(avatar).toHaveClass('flex');
    expect(avatar).toHaveClass('items-center');
    expect(avatar).toHaveClass('justify-center');
    expect(avatar).toHaveClass('text-indigo-600');
    expect(avatar).toHaveClass('dark:text-indigo-400');
    expect(avatar).toHaveClass('font-bold');
  });

  test('uses "U" as default when name is not provided', () => {
    render(<ProfileCard role="Test Role" />);
    const avatar = screen.getByText('U');
    expect(avatar).toBeInTheDocument();
  });

  test('applies correct CSS classes to the name', () => {
    render(<ProfileCard name="John Doe" role="Test" />);
    const name = screen.getByText('John Doe');
    expect(name).toHaveClass('font-semibold');
    expect(name).toHaveClass('text-theme-primary');
  });

  test('applies correct CSS classes to the role', () => {
    render(<ProfileCard name="Test" role="Software Engineer" />);
    const role = screen.getByText('Software Engineer');
    expect(role).toHaveClass('text-sm');
    expect(role).toHaveClass('text-theme-secondary');
  });

  test('renders Follow button', () => {
    render(<ProfileCard name="Test" role="Test" />);
    const button = screen.getByRole('button', { name: 'Follow' });
    expect(button).toBeInTheDocument();
  });

  test('applies correct CSS classes to the Follow button', () => {
    render(<ProfileCard name="Test" role="Test" />);
    const button = screen.getByRole('button', { name: 'Follow' });
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1');
    expect(button).toHaveClass('rounded');
    expect(button).toHaveClass('bg-indigo-50');
    expect(button).toHaveClass('dark:bg-indigo-900/50');
    expect(button).toHaveClass('text-indigo-600');
    expect(button).toHaveClass('dark:text-indigo-400');
  });
});