import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { AvailableNetwork } from './AvailableNetwork';

test('renders <AvailableNetwork />', () => {
  const { container } = render(<AvailableNetwork />);

  const element = container.querySelector('svg');
  expect(element).toBeInTheDocument();
});
