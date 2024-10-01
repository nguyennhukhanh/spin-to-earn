import React from 'react';

import { cn } from '@/lib/utils';
import type { FCC } from '@/types';

import { Spinner } from './ui/spinner';

const FullScreenLoading: FCC<{ loading?: boolean }> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className={cn('fixed inset-0 z-50 flex  items-center justify-center bg-background/20 backdrop-blur-md')}>
      <Spinner size="3rem" />
    </div>
  );
};

export default FullScreenLoading;
