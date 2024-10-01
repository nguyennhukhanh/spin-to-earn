import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Badge } from './badge';

test('renders with default variant', () => {
  const { container } = render(<Badge>Hello</Badge>);
  const badge = container.firstChild;

  expect(badge).toHaveClass('border-transparent', 'bg-primary', 'text-primary-foreground');
});

test('renders with secondary variant', () => {
  const { container } = render(<Badge variant="secondary">Hello</Badge>);
  const badge = container.firstChild;

  expect(badge).toHaveClass('border-transparent', 'bg-secondary', 'text-secondary-foreground');
});

test('renders with additional className', () => {
  const { container } = render(<Badge className="custom-class">Hello</Badge>);
  const badge = container.firstChild;

  expect(badge).toHaveClass('custom-class');
});
