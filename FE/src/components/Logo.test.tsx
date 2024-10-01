import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Logo } from './Logo';

test('renders <Logo />', () => {
  const { container } = render(<Logo />);

  const svgs = container.querySelectorAll('svg');
  expect(svgs.length).toBe(2);
});
