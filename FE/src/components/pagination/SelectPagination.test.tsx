import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import { SelectPagination } from './SelectPagination';

test('renders with default props', () => {
  const onPageChangeMock = jest.fn();
  const { getByText } = render(
    <SelectPagination onPageChange={onPageChangeMock} totalCount={100} currentPage={1} pageSize={10} />
  );

  expect(getByText('Page')).toBeInTheDocument();
  expect(getByText('of 10')).toBeInTheDocument();
});

test('renders with label', () => {
  const onPageChangeMock = jest.fn();
  const { getByText } = render(
    <SelectPagination
      onPageChange={onPageChangeMock}
      totalCount={100}
      currentPage={1}
      pageSize={10}
      label="Page Number"
    />
  );

  expect(getByText('Page Number')).toBeInTheDocument();
});
