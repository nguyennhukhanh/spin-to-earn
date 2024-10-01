import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Tabs from './Tabs';

const mockData = [
  { name: 'Tab 1', value: 1 },
  { name: 'Tab 2', value: 2 },
  { name: 'Tab 3', value: 3 },
];

test('renders tabs correctly', () => {
  const onChange = jest.fn();
  render(<Tabs data={mockData} onChange={onChange} value={1} />);

  const tabs = screen.getAllByRole('listitem');
  expect(tabs).toHaveLength(3);
  expect(tabs[0]).toHaveTextContent('Tab 1');
  expect(tabs[1]).toHaveTextContent('Tab 2');
  expect(tabs[2]).toHaveTextContent('Tab 3');
});

test('calls onChange when a tab is clicked', () => {
  const onChange = jest.fn();
  render(<Tabs data={mockData} onChange={onChange} value={1} />);

  const tabs = screen.getAllByRole('listitem');
  fireEvent.click(tabs[1]);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(2);
});

test('renders extras correctly', () => {
  const extras = <button>Extra Button</button>;
  const onChange = jest.fn();
  render(<Tabs data={mockData} onChange={onChange} value={1} extras={extras} />);

  const extraButton = screen.getByText('Extra Button');
  expect(extraButton).toBeInTheDocument();
});
