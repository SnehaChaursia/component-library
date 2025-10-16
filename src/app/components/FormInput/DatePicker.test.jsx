import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker Component', () => {
  test('renders label correctly', () => {
    render(<DatePicker label="Select Birth Date" />);
    expect(screen.getByLabelText('Select Birth Date')).toBeInTheDocument();
  });

  test('associates label with input field', () => {
    render(<DatePicker label="Select Date" />);
    const input = screen.getByLabelText('Select Date');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  test('applies required attribute when required prop is true', () => {
    render(<DatePicker label="Required Date" required />);
    const input = screen.getByLabelText('Required Date');
    expect(input).toBeRequired();
  });

  test('applies disabled attribute when disabled prop is true', () => {
    render(<DatePicker label="Disabled Date" disabled />);
    const input = screen.getByLabelText('Disabled Date');
    expect(input).toBeDisabled();
  });

  test('displays selected date', () => {
    const onChange = jest.fn();
    render(<DatePicker label="Select Date" onChange={onChange} />);
    const input = screen.getByLabelText('Select Date');
    
    // Simulate user input
    input.value = '2023-01-01';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    
    expect(onChange).toHaveBeenCalledWith('2023-01-01');
  });

  test('renders with custom id', () => {
    render(<DatePicker label="Custom ID Date" id="custom-date-picker" />);
    const input = screen.getByLabelText('Custom ID Date');
    expect(input).toHaveAttribute('id', 'custom-date-picker');
  });

  test('renders with min and max dates', () => {
    render(<DatePicker label="Date Range" min="2023-01-01" max="2023-12-31" />);
    const input = screen.getByLabelText('Date Range');
    expect(input).toHaveAttribute('min', '2023-01-01');
    expect(input).toHaveAttribute('max', '2023-12-31');
  });
});