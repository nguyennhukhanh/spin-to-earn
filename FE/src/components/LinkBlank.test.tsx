import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { LinkBlank } from './LinkBlank';

test('renders <LinkBlank />', () => {
  render(<LinkBlank name="link here" href="/href" />);

  const link = screen.getByRole('link', { name: 'link here' });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/href');
  expect(link).toHaveAttribute('target', '_blank');
});
