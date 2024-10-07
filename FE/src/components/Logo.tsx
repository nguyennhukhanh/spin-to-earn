import Image from 'next/image';
import React, { type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Logo = ({ className, ...props }: Props) => {
  return (
    <div className={cn('relative h-16 w-16', className)} {...props}>
      <Image src="/images/logo.png" fill unoptimized alt="logo" />
    </div>
  );
};

export { Logo };
