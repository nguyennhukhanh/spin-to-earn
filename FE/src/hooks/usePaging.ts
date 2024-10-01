import { useCallback, useState } from 'react';

interface IPagingFilter {
  page_size: number;
  page_number: number;
  total: number;
}

interface State<T extends object = any> {
  paging: IPagingFilter;
  filter: T;
}

const usePaging = <T extends object>(page_size: number, initFilter: T) => {
  const [state, setState] = useState<State<T>>({
    paging: {
      page_size,
      page_number: 1,
      total: 0,
    },
    filter: initFilter,
  });

  const onTotalItemsChange = useCallback((totalItems: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        total: totalItems,
      },
    }));
  }, []);

  const onPageChange = useCallback((currentPage: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        page_number: currentPage,
      },
    }));
  }, []);

  const onPageSizeChange = useCallback((currentSize: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        page_size: currentSize,
      },
    }));
  }, []);

  const handleFilterChange = useCallback(<TKey extends keyof T>(key: TKey, value: T[TKey]) => {
    setState((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        [key]: value,
      },
    }));
  }, []);

  return {
    paging: state.paging,
    filter: state.filter,
    onPageChange,
    onPageSizeChange,
    onTotalItemsChange,
    handleFilterChange,
  };
};

export default usePaging;
