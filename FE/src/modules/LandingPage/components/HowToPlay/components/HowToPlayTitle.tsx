import React from 'react';

import { VStack } from '@/components/ui/Utilities';

const HowToPlayTitle = () => {
  return (
    <VStack align="center">
      <p className="text-center text-3xl font-semibold text-black">How to Play</p>
      <p className="text-center text-black/60">
        Our spin wheel game is easy to play and offers exciting rewards. Follow these simple steps to get started.
      </p>
    </VStack>
  );
};

export default HowToPlayTitle;
