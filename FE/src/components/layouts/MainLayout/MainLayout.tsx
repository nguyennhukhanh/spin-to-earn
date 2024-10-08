import { useRouter } from 'next/router';
import React from 'react';

import { DialogConnectWallet } from '@/components/authentication/DialogConnectWallet';
import { requireLoginPathname } from '@/lib/const';
import { type FCC } from '@/types';

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

      <main className={className}>{children}</main>

      <Footer />

      <DialogConnectWallet requireLogin={requireLoginPathname?.includes(pathname)} />
    </div>
  );
};

export default MainLayout;
