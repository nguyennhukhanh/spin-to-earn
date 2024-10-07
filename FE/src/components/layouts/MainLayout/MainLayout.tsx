import { useRouter } from 'next/router';
import React from 'react';

import { DialogConnectWallet } from '@/components/authentication/DialogConnectWallet';
import { cn } from '@/lib/utils';
import { type FCC, ROUTE } from '@/types';

import Header from './components/Header';
import Footer from './Footer';

interface Props {
  className?: string;
}

const MainLayout: FCC<Props> = ({ children, className }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="overflow-clip">
      <Header />

      <main className={cn('min-h-screen', className)}>{children}</main>

      <Footer />

      <DialogConnectWallet requireLogin={pathname === ROUTE.HOME} />
    </div>
  );
};

export default MainLayout;
