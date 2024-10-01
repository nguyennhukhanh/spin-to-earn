import React from 'react';

import { Icons } from '@/assets/icons';
import { Tooltip } from '@/components/ui/tooltip';
import { type FCC } from '@/types';

const ValueBoxItem: FCC<{ label: string; tooltip?: string }> = ({ children, label, tooltip = '' }) => {
  return (
    <div className="flex h-full flex-col space-y-3 rounded-lg border border-[#D9D9D9] px-4 py-2">
      <div className="flex flex-1 items-center justify-between gap-2">
        <p className="whitespace-nowrap text-sm font-medium text-[#929292]">{label}</p>

        {tooltip !== '' && (
          <Tooltip label={tooltip}>
            <Icons.alertCircle />
          </Tooltip>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export { ValueBoxItem };
