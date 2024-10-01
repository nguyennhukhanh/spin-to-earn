// @flow
import React, { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';

import { useAuth } from '@/hooks/useAuth';
import { handleSmcError } from '@/lib/common';
import { isUseTestnet } from '@/lib/const';
import { useIntersectionStore } from '@/stores';

import { ConnectItem } from './ConnectItem';

export const ConnectWalletConnector = () => {
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  const { isLoggedIn } = useAuth();
  const { isConnected, address } = useAccount();
  const connectors = useConnectors();
  // const chainId = useChainId();
  const chainId = isUseTestnet ? 97 : 56;
  const { disconnect } = useDisconnect();
  const {
    connect,
    variables,
    status,
    isError: isErrorConnect,
    error: errorConnect,
    reset: resetConnect,
  } = useConnect();

  const handleConnectSuccess = useCallback(() => {
    toast.success('Your wallet is connected.');
    setTargetInView('');
    resetConnect();
  }, [resetConnect, setTargetInView]);

  useEffect(() => {
    if (isErrorConnect) {
      handleSmcError(errorConnect);
    }

    disconnect();
  }, [disconnect, errorConnect, isErrorConnect]);

  useEffect(() => {
    if (!isConnected || !address) return;

    if (isLoggedIn) {
      handleConnectSuccess();
    }
  }, [address, handleConnectSuccess, isConnected, isLoggedIn]);

  const isLoadingConnect = status === 'pending';

  return (
    <div className="flex items-start justify-center gap-8">
      {connectors.map((connector) => {
        const isLoading = variables?.connector === connector && isLoadingConnect;
        return (
          <ConnectItem
            key={connector.uid}
            connector={connector}
            disabled={status === 'pending'}
            loading={isLoading}
            onClick={() => {
              resetConnect();
              connect({ connector, chainId });
            }}
          />
        );
      })}
    </div>
  );
};
