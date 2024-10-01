'use client';

import { createConfig, http, WagmiProvider } from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

import type { FCC } from '../types';

const projectId = 'da3c8394dfe7fea81d4517ee9825ce5a';

const connectors =
  typeof window !== 'undefined'
    ? [
        injected({
          target: 'metaMask',
        }),
        walletConnect({
          projectId,
        }),
        coinbaseWallet({
          appName: 'Spin to Earn',
        }),
      ]
    : [];

// Set up wagmi config
const config = createConfig({
  chains: [mainnet, bscTestnet, bsc, sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors,
  ssr: true,
});

const WagmiProviderLib: FCC = ({ children }) => {
  return (
    <WagmiProvider reconnectOnMount config={config}>
      {children}
    </WagmiProvider>
  );
};

export { WagmiProviderLib };
