import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { type ISegments } from '@/components/SpinWheel';
import { VStack } from '@/components/ui/Utilities';
import { useMounted } from '@/hooks/use-mounted';
import { env } from '@/lib/const';

import BuyTicketDialog from './BuyTicketDialog';

const SpinWheel = dynamic(() => import('@/components/SpinWheel'), { ssr: false });

const Right = () => {
  const isMounted = useMounted();
  const { isConnected } = useAccount();
  const [segments, setSegments] = useState<ISegments[]>([]);

  const generateColors = useCallback((prizes: string[]) => {
    const colorMap: Record<string, string> = {};
    const newColors: string[] = [];

    prizes.forEach((prize) => {
      if (!colorMap[prize]) {
        colorMap[prize] = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 25 + 25}%)`;
      }
      newColors.push(colorMap[prize]);
    });

    return newColors;
  }, []);

  const generatePrizes = useCallback(() => {
    const prizes = ['x100'];
    const ratios = {
      'x1.5': 2,
      // eslint-disable-next-line prettier/prettier
      'x1': 3,
      'x1.25': 3,
      'x0.75': 3,
      'x0.5': 2,
      'x0.25': 1,
    };

    Object.entries(ratios).forEach(([prize, count]) => {
      for (let i = 0; i < count; i++) {
        prizes.push(prize);
      }
    });

    while (prizes.length < Number(env.NUMBER_PRIZE)) {
      prizes.push('x1');
    }

    for (let i = prizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [prizes[i], prizes[j]] = [prizes[j], prizes[i]];
    }

    return prizes.slice(0, Number(env.NUMBER_PRIZE));
  }, []);

  const prizes = useMemo(() => generatePrizes(), [generatePrizes]);
  const colors = useMemo(() => generateColors(prizes), [generateColors, prizes]);

  const segmentsData = useMemo(
    () =>
      Array.from({ length: prizes.length }).map((_, index) => ({
        segmentText: prizes[index],
        segColor: colors[index],
      })),
    [colors, prizes]
  );

  useEffect(() => {
    setSegments(segmentsData);
  }, [segmentsData]);

  const renderBuyTicketBtn = useCallback(() => {
    if (isConnected) {
      return <BuyTicketDialog />;
    }

    return null;
  }, [isConnected]);

  if (!isMounted) return null;

  return (
    <div className="h-full flex-1">
      <VStack align="center" className="w-full">
        {renderBuyTicketBtn()}

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
      </VStack>
    </div>
  );
};

export default Right;
