import React, { useEffect } from 'react';
import { useSwitchChain } from 'wagmi';

import { handleSmcError } from '@/lib/common';
import { cn } from '@/lib/utils';
import { type FCC } from '@/types';

import { Button } from './ui/button';

const SwitchNetwork: FCC<{ chainId: number; btnClassName?: string }> = ({ chainId, btnClassName }) => {
  const { switchChain, isPending, failureReason } = useSwitchChain();

  const handleSwitchNetwork = async () => {
    switchChain({
      chainId,
    });
  };

  useEffect(() => {
    if (!failureReason) return;

    handleSmcError(failureReason);
  }, [failureReason]);

  return (
    <Button
      onClick={handleSwitchNetwork}
      loading={isPending}
      fullWidth
      type="button"
      className={cn('h-11 text-sm', btnClassName)}
    >
      Switch Network
    </Button>
  );
};

export { SwitchNetwork };
