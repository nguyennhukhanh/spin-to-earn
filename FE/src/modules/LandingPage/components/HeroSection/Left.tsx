import React from 'react';

import { Icons } from '@/assets/icons';
import { HStack } from '@/components/ui/Utilities';
import { prettyNumber } from '@/lib/calc';

const Left = () => {
  return (
    <div className="h-full flex-1 space-y-5">
      <p className="text-xl font-medium text-white lg:text-2xl">Spin to Earn</p>
      <p className="text-4xl font-bold text-white lg:text-5xl">Spin the Wheel, Earn Rewards</p>
      <p className="text-sm text-white/50">
        Spin the wheel and win exciting prizes, including tokens, virtual goods, and NFTs. Join the fun and see how much
        you can win!
      </p>
      <HStack align="center" spacing={20}>
        <Icons.users color="#fff" />
        <p className="text-sm text-white">{prettyNumber(1000)}+ Players</p>
      </HStack>
    </div>
  );
};

export default Left;
