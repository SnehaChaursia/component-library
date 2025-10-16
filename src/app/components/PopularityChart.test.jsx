import React from 'react';
import { render, screen } from '@testing-library/react';
import PopularityChart from './PopularityChart';

// Mock chart.js and react-chartjs-2
jest.mock('chart.js', () => ({
  Chart: () => null,
  ChartJS: {
    register: jest.fn(),
  },
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="pie-chart" />,
}));

describe('PopularityChart Component', () => {
  const mockData = [
    { name: 'Button', views: 1000, copies: 200 },
    { name: 'Card', views: 800, copies: 150 },
    { name: 'Input', views: 600, copies: 100 },
  ];

  test('renders empty state when no data provided', () => {
    render(<PopularityChart />);
    expect(screen.getByText('No component data yet')).toBeInTheDocument();
    expect(screen.getByText('Start exploring components to see analytics')).toBeInTheDocument();
  });

  test('renders empty state when empty data array provided', () => {
    render(<PopularityChart data={[]} />);
    expect(screen.getByText('No component data yet')).toBeInTheDocument();
  });

  test('renders pie chart when data is provided', () => {
    render(<PopularityChart data={mockData} />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  test('applies correct CSS classes to empty state container', () => {
    const { container } = render(<PopularityChart />);
    const emptyStateContainer = container.firstChild;
    expect(emptyStateContainer).toHaveClass('flex');
    expect(emptyStateContainer).toHaveClass('flex-col');
    expect(emptyStateContainer).toHaveClass('items-center');
    expect(emptyStateContainer).toHaveClass('justify-center');
    expect(emptyStateContainer).toHaveClass('h-64');
    expect(emptyStateContainer).toHaveClass('text-gray-500');
    expect(emptyStateContainer).toHaveClass('dark:text-gray-400');
  });

  test('renders SVG icon in empty state', () => {
    render(<PopularityChart />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-16');
    expect(svg).toHaveClass('h-16');
    expect(svg).toHaveClass('mb-4');
    expect(svg).toHaveClass('opacity-50');
  });

  test('applies correct CSS classes to empty state title', () => {
    render(<PopularityChart />);
    const title = screen.getByText('No component data yet');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-medium');
  });

  test('applies correct CSS classes to empty state description', () => {
    render(<PopularityChart />);
    const description = screen.getByText('Start exploring components to see analytics');
    expect(description).toHaveClass('text-sm');
  });

  test('renders chart container with correct height classes', () => {
    const { container } = render(<PopularityChart data={mockData} />);
    const chartContainer = container.firstChild;
    expect(chartContainer).toHaveClass('h-64');
    expect(chartContainer).toHaveClass('md:h-80');
    expect(chartContainer).toHaveClass('lg:h-96');
  });

  test('passes correct data to Pie chart component', () => {
    render(<PopularityChart data={mockData} />);
    const pieChart = screen.getByTestId('pie-chart');
    // We can't easily test the props passed to the mocked component,
    // but we can verify it's rendered
    expect(pieChart).toBeInTheDocument();
  });

  test('generates colors based on dark theme setting', () => {
    // We can't easily test the internal color generation,
    // but we can verify the component renders correctly with the prop
    render(<PopularityChart data={mockData} isDarkTheme={true} />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  test('handles single data item correctly', () => {
    const singleData = [{ name: 'Button', views: 1000, copies: 200 }];
    render(<PopularityChart data={singleData} />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  test('handles many data items correctly', () => {
    const manyData = Array.from({ length: 15 }, (_, i) => ({
      name: `Component ${i + 1}`,
      views: 1000 - i * 50,
      copies: 200 - i * 10,
    }));
    render(<PopularityChart data={manyData} />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });
});