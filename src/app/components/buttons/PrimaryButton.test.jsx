import React from 'react';
import { render, screen } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton Component', () => {
  test('renders children correctly', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<PrimaryButton>Test</PrimaryButton>);
    expect(container.firstChild).toHaveClass('bg-blue-500');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<PrimaryButton className="extra-class">Test</PrimaryButton>);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  test('applies disabled attribute and styles when disabled', () => {
    render(<PrimaryButton disabled>Disabled Button</PrimaryButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-400');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('applies aria-label when provided', () => {
    render(<PrimaryButton ariaLabel="Submit form">Submit</PrimaryButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });

  test('applies aria-describedby when provided', () => {
    render(
      <>
        <div id="description">This button submits the form</div>
        <PrimaryButton ariaDescribedby="description">Submit</PrimaryButton>
      </>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'description');
  });
});