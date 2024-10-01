import React from 'react';

import { DOTS, usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

type Props = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const PaginationList = (props: Props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // if (currentPage === 0 || paginationRange?.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const disablePrev = currentPage === 1;
  const disabledNext = !lastPage || currentPage === lastPage;

  return (
    <Pagination className={cn(props.className, 'pagination-container font-opensans text-[13px] font-semibold')}>
      <PaginationContent className="gap-[.3125rem]">
        <PaginationItem onClick={disablePrev ? undefined : onPrevious}>
          <PaginationPrevious disabled={disablePrev} className="aspect-square h-8 border-[#F1F1F1] text-[#000000]" />
        </PaginationItem>

        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={pageNumber + i}>
                <PaginationEllipsis className="aspect-square h-8" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem onClick={() => onPageChange(pageNumber as number)} key={pageNumber}>
              <Button
                size="md"
                className={cn('aspect-square h-8 rounded-md p-0 font-semibold', {
                  'border-[#F1F1F1]': pageNumber !== currentPage,
                })}
                variant={pageNumber === currentPage ? 'loyalBlue' : 'outline'}
              >
                {pageNumber}
              </Button>
            </PaginationItem>
          );
        })}

        <PaginationItem onClick={disabledNext ? undefined : onNext}>
          <PaginationNext disabled={disabledNext} className="aspect-square h-8 border-[#F1F1F1] text-[#000000]" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationList };
