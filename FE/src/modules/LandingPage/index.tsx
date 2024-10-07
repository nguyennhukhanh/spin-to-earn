import dynamic from 'next/dynamic';
import React from 'react';

const HeroSection = dynamic(() => import('./components/HeroSection'));

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default LandingPage;
