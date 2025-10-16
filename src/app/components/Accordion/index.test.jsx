import React from 'react';
import { render, screen } from '@testing-library/react';
import Accordion from './index';

describe('Accordion Component', () => {
  const sampleItems = [
    { title: 'First Item', content: 'First item content' },
    { title: 'Second Item', content: 'Second item content' },
    { title: 'Third Item', content: 'Third item content' },
  ];

  test('renders accordion with items', () => {
    render(<Accordion items={sampleItems} />);
    
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  test('applies aria-expanded attribute to accordion headers', () => {
    render(<Accordion items={sampleItems} />);
    
    const headers = screen.getAllByRole('button');
    headers.forEach(header => {
      expect(header).toHaveAttribute('aria-expanded');
    });
  });

  test('associates headers with panels using aria-controls', () => {
    render(<Accordion items={sampleItems} />);
    
    const headers = screen.getAllByRole('button');
    headers.forEach((header, index) => {
      const controlId = header.getAttribute('aria-controls');
      expect(controlId).toMatch(/^accordion-panel-/);
      
      // Check that the controlled panel exists
      const panel = document.getElementById(controlId);
      expect(panel).toBeInTheDocument();
    });
  });

  test('sets aria-expanded to false for closed items', () => {
    render(<Accordion items={sampleItems} />);
    
    const headers = screen.getAllByRole('button');
    headers.forEach(header => {
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test('sets aria-expanded to true for open items', () => {
    render(<Accordion items={sampleItems} defaultOpen={0} />);
    
    const firstHeader = screen.getAllByRole('button')[0];
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
  });

  test('renders with proper ARIA roles', () => {
    render(<Accordion items={sampleItems} headingTitle="Test Accordion" />);
    
    // Check that the main accordion has a region role
    const accordion = screen.getByRole('region');
    expect(accordion).toBeInTheDocument();
    
    // Check that headers have button roles
    const headers = screen.getAllByRole('button');
    expect(headers).toHaveLength(sampleItems.length);
  });

  test('applies keyboard navigation attributes', () => {
    render(<Accordion items={sampleItems} />);
    
    const headers = screen.getAllByRole('button');
    headers.forEach(header => {
      expect(header).toHaveAttribute('id');
      expect(header.id).toMatch(/^accordion-header-/);
    });
  });

  test('renders with custom id', () => {
    render(<Accordion items={sampleItems} id="custom-accordion" />);
    
    const accordion = screen.getByRole('region');
    expect(accordion).toHaveAttribute('id', 'custom-accordion');
  });
});