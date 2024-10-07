import dynamic from 'next/dynamic';
import React from 'react';

const HeroSection = dynamic(() => import('./components/HeroSection'));
const HowToPlay = dynamic(() => import('./components/HowToPlay'));

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <HowToPlay />
    </div>
  );
};

export default LandingPage;
