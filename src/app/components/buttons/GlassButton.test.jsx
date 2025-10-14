import React from 'react';
import { render, screen } from '@testing-library/react';
import GlassButton from './GlassButton';

describe('GlassButton Component', () => {
  test('renders children correctly with default text', () => {
    render(<GlassButton />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('renders custom children correctly', () => {
    render(<GlassButton>Custom Text</GlassButton>);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  test('applies correct CSS classes for default size and rounded', () => {
    const { container } = render(<GlassButton>Test</GlassButton>);
    expect(container.firstChild).toHaveClass('inline-flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('py-2');
    expect(container.firstChild).toHaveClass('text-base');
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  test('applies correct CSS classes for different sizes', () => {
    const { container: smContainer } = render(<GlassButton size="sm">Test</GlassButton>);
    expect(smContainer.firstChild).toHaveClass('px-3');
    expect(smContainer.firstChild).toHaveClass('py-1.5');
    expect(smContainer.firstChild).toHaveClass('text-sm');

    const { container: lgContainer } = render(<GlassButton size="lg">Test</GlassButton>);
    expect(lgContainer.firstChild).toHaveClass('px-6');
    expect(lgContainer.firstChild).toHaveClass('py-3');
    expect(lgContainer.firstChild).toHaveClass('text-lg');
  });

  test('applies correct CSS classes for different rounded options', () => {
    const { container: smRoundedContainer } = render(<GlassButton rounded="sm">Test</GlassButton>);
    expect(smRoundedContainer.firstChild).toHaveClass('rounded-sm');

    const { container: fullRoundedContainer } = render(<GlassButton rounded="full">Test</GlassButton>);
    expect(fullRoundedContainer.firstChild).toHaveClass('rounded-full');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<GlassButton className="extra-class">Test</GlassButton>);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  test('applies disabled attribute and styles when disabled', () => {
    render(<GlassButton disabled>Disabled Button</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('handles click events when not disabled', () => {
    const handleClick = jest.fn();
    render(<GlassButton onClick={handleClick}>Click Me</GlassButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when disabled', () => {
    const handleClick = jest.fn();
    render(<GlassButton onClick={handleClick} disabled>Click Me</GlassButton>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});