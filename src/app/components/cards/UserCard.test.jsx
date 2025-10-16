import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard Component', () => {
  test('renders name, email, and role with default values', () => {
    render(<UserCard />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('renders custom name, email, and role correctly', () => {
    render(<UserCard name="Alice Smith" email="alice@example.com" role="Designer" />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the card container', () => {
    const { container } = render(<UserCard />);
    expect(container.firstChild).toHaveClass('max-w-sm');
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('rounded-2xl');
    expect(container.firstChild).toHaveClass('shadow-lg');
    expect(container.firstChild).toHaveClass('backdrop-blur-sm');
    expect(container.firstChild).toHaveClass('bg-white/10');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-white/20');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('space-x-4');
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  test('renders avatar with correct src and alt attributes', () => {
    render(<UserCard name="John Doe" avatar="https://example.com/avatar.jpg" />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('applies correct CSS classes to the avatar', () => {
    const { container } = render(<UserCard />);
    const avatar = container.querySelector('img');
    expect(avatar).toHaveClass('w-16');
    expect(avatar).toHaveClass('h-16');
    expect(avatar).toHaveClass('rounded-full');
    expect(avatar).toHaveClass('object-cover');
    expect(avatar).toHaveClass('border');
    expect(avatar).toHaveClass('border-white/30');
    expect(avatar).toHaveClass('shadow-md');
  });

  test('applies correct CSS classes to the text container', () => {
    const { container } = render(<UserCard />);
    const textContainer = container.querySelector('div.flex-col');
    expect(textContainer).toHaveClass('flex');
    expect(textContainer).toHaveClass('flex-col');
    expect(textContainer).toHaveClass('text-white');
  });

  test('applies correct CSS classes to the name', () => {
    render(<UserCard name="John Doe" />);
    const name = screen.getByText('John Doe');
    expect(name).toHaveClass('text-lg');
    expect(name).toHaveClass('font-semibold');
  });

  test('applies correct CSS classes to the email', () => {
    render(<UserCard email="johndoe@example.com" />);
    const email = screen.getByText('johndoe@example.com');
    expect(email).toHaveClass('text-sm');
    expect(email).toHaveClass('text-white/70');
  });

  test('applies correct CSS classes to the role', () => {
    render(<UserCard role="Software Engineer" />);
    const role = screen.getByText('Software Engineer');
    expect(role).toHaveClass('text-xs');
    expect(role).toHaveClass('mt-1');
    expect(role).toHaveClass('text-white/60');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<UserCard onClick={handleClick} />);
    const card = screen.getByRole('button');
    card.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});