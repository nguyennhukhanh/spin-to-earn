import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { Icons } from '@/assets/icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIntersectionStore } from '@/stores';

import { Show } from '../ui/Utilities';
import { ConnectWalletConnector } from './ConnectWalletConnector';

const DialogConnectWallet = ({ requireLogin }: { requireLogin?: boolean }) => {
  const targetInView = useIntersectionStore.use.targetInView();
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  const { isConnected } = useAccount();

  const handleCancelConnect = useCallback(() => {
    // if (requireLogin) return;
    setTargetInView('');
  }, [setTargetInView]);

  return (
    <Dialog open={targetInView === 'connectWallet' && !isConnected} onOpenChange={handleCancelConnect}>
      <DialogContent className="max-w-[43.4375rem] space-y-6 p-8" closeable={false}>
        <DialogHeader className="flex flex-col gap-2">
          <Show when={!requireLogin}>
            <button className="w-fit self-end hover:opacity-60" onClick={handleCancelConnect}>
              <Icons.X2 width={30} height={30} />
            </button>
          </Show>

          <DialogTitle className="text-2xl lg:text-3xl">Connect wallet</DialogTitle>
        </DialogHeader>

        <ConnectWalletConnector />
      </DialogContent>
    </Dialog>
  );
};

export { DialogConnectWallet };
