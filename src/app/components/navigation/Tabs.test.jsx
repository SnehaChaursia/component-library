import React from 'react';
import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

describe('Tabs Component', () => {
  const mockTabs = [
    { label: 'Tab 1', content: 'Content 1' },
    { label: 'Tab 2', content: 'Content 2' },
    { label: 'Tab 3', content: 'Content 3' }
  ];

  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  test('renders correctly with tabs', () => {
    render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    
    // Check tab labels
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check initial content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('applies correct CSS classes to the container', () => {
    const { container } = render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  test('applies correct CSS classes to the tab headers container', () => {
    const { container } = render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    const headersContainer = container.querySelector('div.border-b');
    expect(headersContainer).toHaveClass('border-b');
    expect(headersContainer).toHaveClass('border-theme');
  });

  test('applies correct CSS classes to the nav element', () => {
    const { container } = render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('-mb-px');
    expect(nav).toHaveClass('flex');
    expect(nav).toHaveClass('space-x-8');
    expect(nav).toHaveAttribute('aria-label', 'Tabs');
  });

  test('highlights active tab with correct CSS classes', () => {
    render(<Tabs tabs={mockTabs} defaultTab={1} onTabChange={mockOnTabChange} />);
    const activeTab = screen.getByRole('button', { name: 'Tab 2' });
    expect(activeTab).toHaveClass('border-theme-primary');
    expect(activeTab).toHaveClass('text-theme-primary');
    expect(activeTab).toHaveAttribute('aria-current', 'page');
  });

  test('applies correct CSS classes to inactive tabs', () => {
    render(<Tabs tabs={mockTabs} defaultTab={1} onTabChange={mockOnTabChange} />);
    const inactiveTab = screen.getByRole('button', { name: 'Tab 1' });
    expect(inactiveTab).toHaveClass('border-transparent');
    expect(inactiveTab).toHaveClass('text-theme-secondary');
  });

  test('renders tab content correctly', () => {
    render(<Tabs tabs={mockTabs} defaultTab={1} onTabChange={mockOnTabChange} />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test('changes active tab when clicked', () => {
    render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    
    // Initially shows first tab content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click second tab
    const secondTab = screen.getByRole('button', { name: 'Tab 2' });
    secondTab.click();
    
    // Now shows second tab content
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test('calls onTabChange when tab is clicked', () => {
    render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);
    
    const secondTab = screen.getByRole('button', { name: 'Tab 2' });
    secondTab.click();
    
    expect(mockOnTabChange).toHaveBeenCalledWith(1, mockTabs[1]);
  });

  test('renders badge when provided', () => {
    const tabsWithBadges = [
      { label: 'Tab 1', content: 'Content 1', badge: '5' },
      { label: 'Tab 2', content: 'Content 2', badge: '12' }
    ];
    
    render(<Tabs tabs={tabsWithBadges} onTabChange={mockOnTabChange} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('applies correct CSS classes to active tab badge', () => {
    const tabsWithBadges = [
      { label: 'Tab 1', content: 'Content 1', badge: '5' },
      { label: 'Tab 2', content: 'Content 2', badge: '12' }
    ];
    
    render(<Tabs tabs={tabsWithBadges} defaultTab={0} onTabChange={mockOnTabChange} />);
    
    const activeBadge = screen.getByText('5').parentElement;
    expect(activeBadge).toHaveClass('bg-theme-primary');
    expect(activeBadge).toHaveClass('text-white');
  });

  test('applies correct CSS classes to inactive tab badge', () => {
    const tabsWithBadges = [
      { label: 'Tab 1', content: 'Content 1', badge: '5' },
      { label: 'Tab 2', content: 'Content 2', badge: '12' }
    ];
    
    render(<Tabs tabs={tabsWithBadges} defaultTab={0} onTabChange={mockOnTabChange} />);
    
    const inactiveBadge = screen.getByText('12').parentElement;
    expect(inactiveBadge).toHaveClass('bg-theme-surface-hover');
    expect(inactiveBadge).toHaveClass('text-theme-secondary');
  });

  test('renders empty when no tabs provided', () => {
    const { container } = render(<Tabs onTabChange={mockOnTabChange} />);
    const nav = container.querySelector('nav');
    expect(nav).toBeEmptyDOMElement();
  });
});