import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { PaginationList } from './Pagination';

test('renders correctly with default props', () => {
  const mockOnPageChange = jest.fn();
  const { container } = render(
    <PaginationList onPageChange={mockOnPageChange} totalCount={100} currentPage={1} pageSize={10} />
  );
  expect(container.querySelector('.pagination-container')).toBeInTheDocument();
});

test('calls onPageChange when a page number is clicked', () => {
  const mockOnPageChange = jest.fn();
  const { getByText } = render(
    <PaginationList onPageChange={mockOnPageChange} totalCount={100} currentPage={1} pageSize={10} />
  );
  fireEvent.click(getByText('2'));
  expect(mockOnPageChange).toHaveBeenCalledWith(2);
});

test('disables previous button on first page', () => {
  const mockOnPageChange = jest.fn();
  const { container } = render(
    <PaginationList onPageChange={mockOnPageChange} totalCount={100} currentPage={1} pageSize={10} />
  );
  const prevButton = container.querySelector('.previous-page');
  expect(prevButton).toBeDisabled();
});

test('disables next button on last page', () => {
  const mockOnPageChange = jest.fn();
  const { container } = render(
    <PaginationList onPageChange={mockOnPageChange} totalCount={100} currentPage={10} pageSize={10} />
  );
  const nextButton = container.querySelector('.next-page');
  expect(nextButton).toBeDisabled();
});
