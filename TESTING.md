# Testing Guide

This document provides guidelines for testing components in this library.

## Testing Framework

We use [Jest](https://jestjs.io/) as our test runner and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and interacting with React components.

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To run tests with coverage:

```bash
npm test -- --coverage
```

## Writing Tests

### Test Structure

Tests should follow the Arrange-Act-Assert pattern:

1. **Arrange** - Set up the component with props
2. **Act** - Render the component and interact with it
3. **Assert** - Check that the component behaves as expected

### Example Test

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders children correctly', () => {
    // Arrange
    const children = 'Click Me';
    
    // Act
    render(<Button>{children}</Button>);
    
    // Assert
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  test('handles click events', () => {
    // Arrange
    const handleClick = jest.fn();
    
    // Act
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button');
    button.click();
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Common Testing Patterns

#### Testing CSS Classes

```jsx
test('applies correct CSS classes', () => {
  render(<Button variant="primary">Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('bg-blue-500');
  expect(button).toHaveClass('text-white');
});
```

#### Testing Props

```jsx
test('renders with custom className', () => {
  render(<Button className="custom-class">Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('custom-class');
});
```

#### Testing Accessibility

```jsx
test('has correct aria-label', () => {
  render(<Button aria-label="Submit form">Submit</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Submit form');
});
```

#### Testing State Changes

```jsx
test('updates when props change', () => {
  const { rerender } = render(<Button disabled>Test</Button>);
  let button = screen.getByRole('button');
  expect(button).toBeDisabled();
  
  rerender(<Button disabled={false}>Test</Button>);
  button = screen.getByRole('button');
  expect(button).not.toBeDisabled();
});
```

### Mocking Dependencies

For components that use external dependencies (like charts or icons), mock them:

```jsx
// Mock chart.js
jest.mock('chart.js', () => ({
  Chart: () => null,
  ChartJS: {
    register: jest.fn(),
  },
  // ... other mocks
}));
```

### Testing Asynchronous Code

```jsx
test('handles async operations', async () => {
  render(<AsyncComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for async operation to complete
  await screen.findByText('Data loaded');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
```

## Test Coverage

We aim for at least 80% test coverage for all components. Run `npm test -- --coverage` to see current coverage.

## Best Practices

1. **Test behavior, not implementation** - Focus on what the component does rather than how it does it
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText`, etc. over `getByTestId`
3. **Keep tests isolated** - Each test should be able to run independently
4. **Name tests clearly** - Use descriptive test names that explain what is being tested
5. **Test edge cases** - Include tests for error states, empty states, and boundary conditions
6. **Mock external dependencies** - Keep tests fast and reliable by mocking external services
7. **Test accessibility** - Ensure components are accessible by testing ARIA attributes and keyboard navigation

## Common Assertions

- `toBeInTheDocument()` - Check if an element exists
- `toHaveClass()` - Check CSS classes
- `toBeDisabled()` / `not.toBeDisabled()` - Check disabled state
- `toHaveAttribute()` - Check HTML attributes
- `toHaveBeenCalledTimes()` - Check function call count
- `toHaveBeenCalledWith()` - Check function arguments

## CI/CD Integration

Tests are automatically run on every pull request to ensure code quality and prevent regressions.