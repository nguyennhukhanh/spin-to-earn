import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import FullScreenLoading from './FullScreenLoading';

test('renders <FullScreenLoading /> with loading', () => {
  const { container } = render(<FullScreenLoading loading />);

  const loadingIcon = container.querySelector('.animate-spin');
  expect(loadingIcon).toBeInTheDocument();
});

test('renders <FullScreenLoading /> without loading', () => {
  const { container } = render(<FullScreenLoading />);

  const loadingIcon = container.querySelector('.animate-spin');
  expect(loadingIcon).not.toBeInTheDocument();
});
