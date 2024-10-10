import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { requireLoginPathname } from '@/lib/const';
import { useIntersectionStore } from '@/stores';

import { ConnectWalletConnector } from './ConnectWalletConnector';

const DialogConnectWallet = ({ requireLogin }: { requireLogin?: boolean }) => {
  const targetInView = useIntersectionStore.use.targetInView();
  const setTargetInView = useIntersectionStore.use.setTargetInView();
  const pathname = usePathname();
  const { isConnected } = useAccount();

  const handleCancelConnect = useCallback(() => {
    if (requireLogin || requireLoginPathname?.includes(pathname)) return;
    setTargetInView('');
  }, [pathname, requireLogin, setTargetInView]);

  return (
    <Dialog open={targetInView === 'connectWallet' && !isConnected} onOpenChange={handleCancelConnect}>
      <DialogContent
        className="max-w-[43.4375rem] space-y-6 p-8"
        closeable={!requireLogin && !requireLoginPathname?.includes(pathname)}
      >
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-2xl lg:text-3xl">Connect wallet</DialogTitle>
        </DialogHeader>

        <ConnectWalletConnector />
      </DialogContent>
    </Dialog>
  );
};

export { DialogConnectWallet };
