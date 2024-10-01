import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { TextArea } from './textarea';

test('renders textarea with initial value', () => {
  const initialValue = 'Initial value';
  const { container } = render(<TextArea value={initialValue} onChange={() => {}} />);
  const textareaElement = container.querySelector('textarea');

  expect(textareaElement).toBeInTheDocument();
  expect(textareaElement).toHaveValue(initialValue);
});

test('renders with fullWidth', () => {
  const { container } = render(<TextArea fullWidth />);
  const textareaElement = container.querySelector('textarea');

  expect(textareaElement).toHaveClass('w-full');
});

test('change values via the fireEvent.change method', () => {
  const handleChange = jest.fn();
  const { container } = render(<TextArea onChange={handleChange} />);
  const textarea = container.firstChild! as HTMLTextAreaElement;
  const newValue = 'New value';

  fireEvent.change(textarea, { target: { value: newValue } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(textarea.value).toBe(newValue);
});
