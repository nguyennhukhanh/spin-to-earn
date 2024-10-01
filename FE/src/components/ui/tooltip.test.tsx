import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from './tooltip';

test('renders children correctly', () => {
  const label = 'This is a tooltip';

  const { container } = render(
    <Tooltip label={label}>
      <p>Hover me</p>
    </Tooltip>
  );

  const p = container.querySelector('p')!;
  expect(p).toBeInTheDocument();
});

test('shows tooltip on hover', async () => {
  const label = 'This is a tooltip';
  const user = userEvent.setup();

  const { container } = render(
    <Tooltip label={label}>
      <p>Hover me</p>
    </Tooltip>
  );

  const text = container.querySelector('p')!;
  await user.hover(text);

  const tooltip = screen.getAllByText(label)[0];
  expect(tooltip).toBeInTheDocument();
});
