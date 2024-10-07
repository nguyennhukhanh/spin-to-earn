import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import { Icons } from '@/assets/icons';
import { shortenAddress } from '@/lib/common';
import { useIntersectionStore } from '@/stores';

import { Button } from '../ui/button';
import { Tooltip } from '../ui/tooltip';
import { HStack, Show } from '../ui/Utilities';

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  return (
    <>
      <Show when={!isConnected}>
        <Button
          className="bg-white text-black hover:bg-gray-700/50 hover:text-white active:scale-90"
          onClick={() => setTargetInView('connectWallet')}
        >
          Connect Wallet
        </Button>
      </Show>

      <Show when={isConnected}>
        <HStack spacing={16} noWrap className="h-full rounded-sm border border-white px-2 py-1">
          <Icons.user color="#fff" />

          <HStack align="center" noWrap spacing={4}>
            <p className="text-white">{shortenAddress(address)}</p>

            <Tooltip label="Disconnect" className="!h-5">
              <button className="h-fit">
                <Icons.x color="#fff" onClick={() => disconnectAsync()} size={20} />
              </button>
            </Tooltip>
          </HStack>
        </HStack>
      </Show>
    </>
  );
};

export default ConnectWalletButton;
