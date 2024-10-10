import React, { type ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useIntersectionStore } from '@/stores';
import { type FCC } from '@/types';

interface Props {
  children: ReactNode;
}

const AuthLayout: FCC<Props> = ({ children }) => {
  const { isConnected } = useAccount();
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  useEffect(() => {
    if (!isConnected) setTargetInView('connectWallet');
  }, [isConnected, setTargetInView]);

  return <>{children}</>;
};

export default AuthLayout;
