import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar Component', () => {
  test('renders image with correct src and alt attributes', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    const img = screen.getByAltText('Test User');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('uses default alt text when not provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" />);
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('inline-block');
  });

  test('applies correct CSS classes to the image', () => {
    render(<Avatar src="https://example.com/avatar.jpg" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toHaveClass('rounded-full');
    expect(img).toHaveClass('object-cover');
  });

  test('applies correct size classes for small avatar', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="sm" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toHaveClass('w-8');
    expect(img).toHaveClass('h-8');
  });

  test('applies correct size classes for medium avatar', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="md" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toHaveClass('w-12');
    expect(img).toHaveClass('h-12');
  });

  test('applies correct size classes for large avatar', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="lg" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toHaveClass('w-16');
    expect(img).toHaveClass('h-16');
  });

  test('does not render online indicator when online is false', () => {
    render(<Avatar src="https://example.com/avatar.jpg" online={false} />);
    const indicators = screen.queryAllByRole('img');
    expect(indicators).toHaveLength(1); // Only the avatar image
  });

  test('renders online indicator when online is true', () => {
    render(<Avatar src="https://example.com/avatar.jpg" online />);
    const indicator = screen.getByRole('img', { hidden: true });
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('absolute');
    expect(indicator).toHaveClass('bottom-0');
    expect(indicator).toHaveClass('right-0');
    expect(indicator).toHaveClass('block');
    expect(indicator).toHaveClass('rounded-full');
    expect(indicator).toHaveClass('border-2');
    expect(indicator).toHaveClass('bg-green-500');
  });

  test('applies correct size classes to online indicator', () => {
    render(<Avatar src="https://example.com/avatar.jpg" online size="sm" />);
    const indicator = screen.getByRole('img', { hidden: true });
    expect(indicator).toHaveClass('w-2');
    expect(indicator).toHaveClass('h-2');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });
});

describe('AvatarGroup Component', () => {
  const mockAvatars = [
    { src: 'https://example.com/avatar1.jpg', alt: 'User 1' },
    { src: 'https://example.com/avatar2.jpg', alt: 'User 2' },
    { src: 'https://example.com/avatar3.jpg', alt: 'User 3' }
  ];

  test('renders avatars correctly', () => {
    render(<AvatarGroup avatars={mockAvatars} />);
    expect(screen.getByAltText('User 1')).toBeInTheDocument();
    expect(screen.getByAltText('User 2')).toBeInTheDocument();
    expect(screen.getByAltText('User 3')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<AvatarGroup avatars={mockAvatars} />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('-space-x-3');
  });

  test('renders extra count when avatars exceed max', () => {
    const manyAvatars = [
      { src: '1.jpg', alt: 'User 1' },
      { src: '2.jpg', alt: 'User 2' },
      { src: '3.jpg', alt: 'User 3' },
      { src: '4.jpg', alt: 'User 4' },
      { src: '5.jpg', alt: 'User 5' },
      { src: '6.jpg', alt: 'User 6' }
    ];
    
    render(<AvatarGroup avatars={manyAvatars} max={3} />);
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  test('does not render extra count when avatars are within max', () => {
    render(<AvatarGroup avatars={mockAvatars} max={5} />);
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  test('applies correct CSS classes to extra count element', () => {
    const manyAvatars = [...mockAvatars, 
      { src: '4.jpg', alt: 'User 4' },
      { src: '5.jpg', alt: 'User 5' },
      { src: '6.jpg', alt: 'User 6' }
    ];
    
    render(<AvatarGroup avatars={manyAvatars} max={3} />);
    const extraCount = screen.getByText('+3');
    expect(extraCount).toHaveClass('flex');
    expect(extraCount).toHaveClass('items-center');
    expect(extraCount).toHaveClass('justify-center');
    expect(extraCount).toHaveClass('rounded-full');
    expect(extraCount).toHaveClass('bg-gray-300');
    expect(extraCount).toHaveClass('dark:bg-gray-700');
    expect(extraCount).toHaveClass('text-gray-800');
    expect(extraCount).toHaveClass('dark:text-gray-200');
    expect(extraCount).toHaveClass('font-medium');
  });

  test('applies correct size classes to extra count element', () => {
    const manyAvatars = [...mockAvatars, 
      { src: '4.jpg', alt: 'User 4' },
      { src: '5.jpg', alt: 'User 5' },
      { src: '6.jpg', alt: 'User 6' }
    ];
    
    render(<AvatarGroup avatars={manyAvatars} max={3} size="sm" />);
    const extraCount = screen.getByText('+3');
    expect(extraCount).toHaveClass('w-8');
    expect(extraCount).toHaveClass('h-8');
    expect(extraCount).toHaveClass('text-xs');
  });
});