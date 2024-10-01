import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { Button } from './button';

test('renders button with correct text', () => {
  const { container } = render(<Button>Click me</Button>);

  const buttonElement = container.firstChild!;
  expect(buttonElement).toBeInTheDocument();
});

test('button with click event', () => {
  const onClick = jest.fn();

  const { container } = render(<Button onClick={onClick}>Click me</Button>);
  const buttonElement = container.firstChild!;

  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('button disabled', () => {
  const onClick = jest.fn();

  const { container } = render(
    <Button onClick={onClick} disabled>
      Click me
    </Button>
  );

  const buttonElement = container.firstChild!;
  expect(buttonElement).toBeDisabled();

  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(0);
});

test('button loading', () => {
  const { container } = render(<Button loading>Click me</Button>);

  const loadingIcon = container.querySelector('.animate-spin');
  expect(loadingIcon).toBeInTheDocument();
});
