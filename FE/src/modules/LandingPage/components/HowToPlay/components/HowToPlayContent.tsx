import React from 'react';

import { Icons } from '@/assets/icons';
import { VStack } from '@/components/ui/Utilities';

const contents = [
  {
    icon: <Icons.wallet size={40} />,
    title: 'Connect Wallet',
    description: 'Link your cryptocurrency wallet to start playing.',
  },
  {
    icon: <Icons.wheel size={40} />,
    title: 'Spin the Wheel',
    description:
      "Click the 'Buy Ticket' button to purchase your ticket. Once you have a ticket, click the 'Spin Now' button and watch the wheel spin.",
  },
  {
    icon: <Icons.gift size={40} />,
    title: 'Claim Your Reward',
    description: 'Claim your rewards and add them to your crypto wallet.',
  },
];

const HowToPlayContent = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {contents.map((item, index) => (
        <VStack key={index} align="center" className="col-span-1">
          {item?.icon}
          <p className="text-center text-lg font-semibold">{item?.title}</p>
          <p className="text-center text-sm font-medium text-black/60">{item?.description}</p>
        </VStack>
      ))}
    </div>
  );
};

export default HowToPlayContent;
