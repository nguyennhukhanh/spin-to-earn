import React from 'react';

import { HStack } from '@/components/ui/Utilities';

import Left from './Left';
import Right from './Right';

const HeroSection = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-20">
      <HStack pos="center" spacing={16} className="container h-full">
        <Left />

        <Right />
      </HStack>
    </div>
  );
};

export default HeroSection;
