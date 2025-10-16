import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  test('renders with correct aria attributes', () => {
    render(<ProgressBar value={50} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('calculates percentage correctly', () => {
    render(<ProgressBar value={25} max={100} showPercentage />);
    
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('clamps percentage to 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={-10} max={100} showPercentage />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    
    rerender(<ProgressBar value={150} max={100} showPercentage />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(<ProgressBar value={50} label="Loading..." />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('associates with external label using aria-labelledby', () => {
    render(
      <>
        <span id="progress-label">Upload Progress</span>
        <ProgressBar value={75} ariaLabelledby="progress-label" />
      </>
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-labelledby', 'progress-label');
  });

  test('applies aria-label directly', () => {
    render(<ProgressBar value={30} ariaLabel="Download progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Download progress');
  });

  test('applies custom id', () => {
    render(<ProgressBar value={60} id="upload-progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('id', 'upload-progress');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<ProgressBar value={50} size="sm" />);
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar.parentElement).toHaveClass('h-1');
    
    rerender(<ProgressBar value={50} size="md" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar.parentElement).toHaveClass('h-2');
    
    rerender(<ProgressBar value={50} size="lg" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar.parentElement).toHaveClass('h-3');
  });

  test('renders with different colors', () => {
    render(<ProgressBar value={50} color="green" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-green-600');
  });
});