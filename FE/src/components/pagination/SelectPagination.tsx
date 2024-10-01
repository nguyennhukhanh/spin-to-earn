import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  type selectTriggerVariants,
  SelectValue,
} from '../ui/select';
import { Show } from '../ui/Utilities';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof selectTriggerVariants> {
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  value?: string;
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  containerClassName?: string;
}

const SelectPagination = ({
  label,
  required,
  variant,
  inputSize,
  fullWidth,
  className,
  labelClassName,
  currentPage,
  placeholder = 'Please select',
  onPageChange,
  totalCount,
  pageSize,
  containerClassName,
  ...props
}: Props) => {
  const handlePageChange = (pageNumber: string) => {
    if (onPageChange) {
      onPageChange(Number(pageNumber));
    }
  };

  const ArrData = React.useMemo(() => {
    return Array.from({ length: Math.ceil(totalCount / pageSize) }).map((_, i) => i + 1);
  }, [pageSize, totalCount]);

  return (
    <div
      className={cn(
        'relative flex items-center gap-2.5 font-opensans text-[#333333]',
        fullWidth ? 'w-full' : '',
        containerClassName
      )}
    >
      <span className="text-sm font-semibold leading-normal">Page</span>
      <Select
        onValueChange={handlePageChange}
        defaultValue={String(ArrData[0])}
        value={(currentPage ?? '').toString()}
        disabled={props.disabled}
      >
        <div>
          <Show when={!!label}>
            <span className={labelClassName}>
              {label} {required && <span className="text-error-light">*</span>}
            </span>
          </Show>
          <SelectTrigger
            variant={variant}
            inputSize={inputSize}
            className={cn(
              'h-[42px] min-w-[70px] rounded-md border-[#DDD] px-[15px] py-2 text-sm font-semibold',
              className,
              {
                'w-full': fullWidth,
              }
            )}
            iconClassName="w-4 h-4"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </div>

        <SelectContent>
          {ArrData.map((_, i) => (
            <SelectItem key={i} value={String(i + 1)}>
              <span>{i + 1}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="whitespace-nowrap text-sm font-semibold leading-normal text-[#333]">of {ArrData.length}</span>
    </div>
  );
};

export { SelectPagination };
