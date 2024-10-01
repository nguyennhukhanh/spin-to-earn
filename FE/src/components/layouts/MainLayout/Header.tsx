import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { useAccount, useDisconnect } from 'wagmi';

import { Logo } from '@/components/Logo';
import { Show } from '@/components/ui/Utilities';
import { useMounted } from '@/hooks/use-mounted';
import { useTypeSafeTranslation } from '@/hooks/useTypeTranslation';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores';
import { ROUTE } from '@/types';

import { HeaderSwitchNetwork } from './HeaderSwitchNetwork';

export interface HeaderProps {
  onLogOut: () => void;
}

const Header = () => {
  const isMounted = useMounted();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { t } = useTypeSafeTranslation();
  const logout = useUserStore.use.logout();

  const handleLogout = async () => {
    await disconnectAsync();
    logout();
    toast.success(`${t('signOutSuccessfully')}`);
  };

  return (
    <motion.header
      viewport={{ once: true }}
      variants={{
        visible: { y: 0 },
        hidden: { y: -20 },
      }}
      whileInView="visible"
      initial="hidden"
      transition={{ duration: 0.3 }}
      className="sticky left-0 right-0 top-0 z-50 flex h-header w-full items-center justify-between bg-white py-[.81rem]"
    >
      <div className={'container flex items-center justify-between gap-2'}>
        <div className="flex items-center gap-[3.75rem]">
          <span>
            <Link href={ROUTE.HOME} aria-label="Home">
              <Logo />
            </Link>
          </span>
        </div>

        <div className={cn('flex items-center gap-2 lg:gap-4')}>
          <div className="flex items-center gap-2 lg:gap-4">
            <Show when={isMounted && isConnected}>
              <HeaderSwitchNetwork />
            </Show>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
