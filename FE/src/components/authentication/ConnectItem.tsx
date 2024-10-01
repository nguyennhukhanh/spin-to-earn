// @flow
import Image from 'next/image';
import React from 'react';
import { type Connector } from 'wagmi';

import { Icons } from '@/assets/icons';

type Props = {
  connector: Connector;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
};
export const ConnectItem = ({ connector, onClick, loading, disabled }: Props) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector, setReady]);

  const handleConnectWallet = () => {
    if (connector.id === 'metaMask' && !ready) {
      window.open(`https://metamask.app.link/dapp/${window.location.href}`, '_blank');
    } else if (connector.id === 'trustWallet' && !ready) {
      window.open('https://trustwallet.com/download', '_blank');
    } else {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleConnectWallet}
      type="button"
      className="group/btnConnect col-span-1 flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 fill-white px-2 transition hover:fill-slate-300"
    >
      <div className="flex aspect-square items-start justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Icons.reload className="h-12 w-12 animate-spin" />
            {connector.id === 'metaMask' && (
              <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">MetaMask</p>
            )}
            {connector.id === 'walletConnect' && (
              <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Wallet Connect</p>
            )}
            {connector.id === 'coinbaseWalletSDK' && (
              <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Coinbase Wallet</p>
            )}
            {connector.id === 'trustWallet' && (
              <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Trust Wallet</p>
            )}
            {connector.id === 'io.metamask' && (
              <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">{connector.name}</p>
            )}
          </div>
        ) : (
          <>
            {connector.id === 'metaMask' && (
              <div className="flex flex-col items-center gap-4">
                <Icons.metamask width={50} height={50} className="text-[#C5C5C5] group-hover/btnConnect:text-black" />
                <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">MetaMask</p>
              </div>
            )}
            {connector.id === 'walletConnect' && (
              <div className="flex flex-col items-center  gap-4">
                <Icons.walletConnect
                  width={50}
                  height={50}
                  className="text-[#C5C5C5] group-hover/btnConnect:text-black"
                />
                <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Wallet Connect</p>
              </div>
            )}
            {connector.id === 'coinbaseWalletSDK' && (
              <div className="flex flex-col items-center  gap-4">
                <Icons.coinbaseWallet
                  width={50}
                  height={50}
                  className="text-[#C5C5C5] group-hover/btnConnect:text-black"
                />
                <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Coinbase Wallet</p>
              </div>
            )}
            {connector.id === 'trustWallet' && (
              <div className="flex flex-col items-center  gap-4">
                <Icons.trustWallet
                  width={50}
                  height={50}
                  className="text-[#C5C5C5] group-hover/btnConnect:text-black"
                />
                <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">Trust Wallet</p>
              </div>
            )}
            {connector.id === 'io.metamask' && (
              <>
                <Image src={connector.icon as string} width={49} height={49} alt="metamask" />
                <p className="max-w-[4.25rem] text-xs text-[#7F7F7F] [text-wrap:balance]">{connector.name}</p>
              </>
            )}
          </>
        )}
      </div>
    </button>
  );
};
