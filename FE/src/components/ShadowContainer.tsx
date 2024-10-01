import React, { type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { type FCC } from '@/types';

const ShadowContainer: FCC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className={cn('rounded-lg p-7 shadow-[0rem_0rem_1.25rem_.125rem_rgba(185,185,185,0.25)]', props.className)}>
      {children}
    </div>
  );
};

export { ShadowContainer };
