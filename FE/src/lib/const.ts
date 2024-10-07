import { Icons } from '@/assets/icons';
import { type ChainNetwork } from '@/types';
import { type Address } from '@/types/common.type';

const isProduction = process.env.NODE_ENV === 'production';
const signatureMessage =
  process.env.NEXT_PUBLIC_SIGNATURE_MESSAGE ??
  'Welcome. By signing this message you are verifying your digital identity. This is completely secure and does not cost anything!';

export const env = {
  isProduction,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  USE_TESTNET: process.env.NEXT_PUBLIC_USE_TESTNET ?? 'false',
  BSC_SCAN_URL: process.env.NEXT_PUBLIC_BSC_SCAN_URL ?? 'https://testnet.bscscan.com',
  SPIN_CONTRACT: (process.env.NEXT_PUBLIC_SPIN_CONTRACT ?? '0x') as Address,
  TOKEN_CONTRACT: (process.env.NEXT_PUBLIC_TOKEN_CONTRACT ?? '0x') as Address,
  signatureMessage,
};

export const isServer = typeof window === 'undefined';
export const isUseTestnet = env.USE_TESTNET === 'true';

const defaultNetworkChain: ChainNetwork[] = [
  {
    name: 'BNB Smart Chain',
    chainId: 56,
    icon: Icons.bnbSmartChain,
  },
];

export const networkChain = !isUseTestnet
  ? defaultNetworkChain
  : [
      {
        name: 'BNB Smart Chain Testnet',
        chainId: 97,
        icon: Icons.bnbSmartChain,
      },
    ].concat(defaultNetworkChain);
