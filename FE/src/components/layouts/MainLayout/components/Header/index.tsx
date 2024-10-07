import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useAccount } from 'wagmi';

import ConnectWalletButton from '@/components/authentication/ConnectWalletButton';
import { LogoText } from '@/components/LogoText';
import { HStack, Show } from '@/components/ui/Utilities';
import { useMounted } from '@/hooks/use-mounted';
import { ROUTE } from '@/types';

import { HeaderSwitchNetwork } from '../../HeaderSwitchNetwork';
import { NavbarDesktop } from './Navbar';

export interface HeaderProps {
  onLogOut: () => void;
}

const Header = () => {
  const isMounted = useMounted();
  const { isConnected } = useAccount();

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
      className="sticky left-0 right-0 top-0 z-50 flex h-header w-full items-center justify-between bg-black py-[.81rem]"
    >
      <HStack pos="apart" align="center" spacing={16} className="container">
        <Link href={ROUTE.HOME} aria-label="Home">
          <LogoText className="h-header w-28" />
        </Link>

        <HStack align="center" pos="right" spacing={8} className="flex-1 lg:gap-4" noWrap>
          <NavbarDesktop />

          <Show when={isMounted && isConnected}>
            <HeaderSwitchNetwork />
          </Show>

          <ConnectWalletButton />
        </HStack>
      </HStack>
    </motion.header>
  );
};

export default Header;
