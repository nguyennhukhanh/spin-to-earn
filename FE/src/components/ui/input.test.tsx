import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { Input } from './input';

test('renders input with initial value', () => {
  const initialValue = 'Initial value';
  const handleChange = jest.fn();

  const { container } = render(<Input type="text" value={initialValue} onChange={handleChange} />);
  const input = container.querySelector('input')!;

  expect(input).toBeInTheDocument();
  expect(input.value).toBe(initialValue);
});

test('renders with fullWidth', () => {
  const { container } = render(<Input fullWidth type="text" />);
  const input = container.firstChild;

  expect(input).toHaveClass('w-full');
});

test('change values via the fireEvent.change method', () => {
  const handleChange = jest.fn();

  const { container } = render(<Input onChange={handleChange} type="text" />);
  const input = container.querySelector('input')!;
  const newValue = 'New value';

  fireEvent.change(input, { target: { value: newValue } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe(newValue);
});
