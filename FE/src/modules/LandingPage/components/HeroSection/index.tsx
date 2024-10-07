import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Icons } from '@/assets/icons';
import { type ISegments } from '@/components/SpinWheel';
import { HStack } from '@/components/ui/Utilities';
import { prettyNumber } from '@/lib/calc';

const SpinWheel = dynamic(() => import('@/components/SpinWheel'), { ssr: false });

const generateColors = (count: number) => {
  const newColors = [];

  for (let i = 0; i < count; i++) {
    const color = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 25 + 25}%)`;
    newColors.push(color);
  }

  return newColors;
};

const generatePrizes = () => {
  const prizes = [];

  prizes.push('x100');
  prizes.push('x1.5', 'x1.5');

  prizes.push('x1', 'x1', 'x1');
  prizes.push('x1.25', 'x1.25', 'x1.25');
  prizes.push('x0.75', 'x0.75', 'x0.75');
  prizes.push('x0.5', 'x0.5');
  prizes.push('x0.25');

  for (let i = prizes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [prizes[i], prizes[j]] = [prizes[j], prizes[i]];
  }

  return prizes;
};

const prizes = generatePrizes();
const colors = generateColors(prizes?.length);

const segmentsData = Array.from({ length: prizes?.length }).map((_, index) => ({
  segmentText: prizes[index],
  segColor: colors[index],
}));

const HeroSection = () => {
  const [segments, setSegments] = useState<ISegments[]>([]);

  useEffect(() => {
    setSegments(segmentsData);
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-20">
      <HStack pos="center" spacing={16} className="container h-full">
        <div className="h-full flex-1 space-y-5">
          <p className="text-xl font-medium text-white lg:text-2xl">Spin to Earn</p>
          <p className="text-4xl font-bold text-white lg:text-5xl">Spin the Wheel, Earn Rewards</p>
          <p className="text-sm text-white/50">
            Spin the wheel and win exciting prizes, including tokens, virtual goods, and NFTs. Join the fun and see how
            much you can win!
          </p>
          <HStack align="center" spacing={20}>
            <Icons.users color="#fff" />
            <p className="text-sm text-white">{prettyNumber(1000)}+ Players</p>
          </HStack>
        </div>
        <div className="h-full flex-1">
          <HStack pos="center" className="w-full">
            <div className="relative aspect-square w-full lg:w-2/3">
              <Image src="/images/border-wheel.png" alt="border wheel" fill priority unoptimized className="z-10" />
              <SpinWheel
                className="relative z-20 h-full w-full"
                segments={segments}
                onFinished={(result) => {
                  console.log('🚀 ~ LandingPage ~ result:', result);
                }}
              />
            </div>
          </HStack>
        </div>
      </HStack>
    </div>
  );
};

export default HeroSection;
