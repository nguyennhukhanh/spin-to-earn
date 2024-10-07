import React from 'react';

import HowToPlayContent from './components/HowToPlayContent';
import HowToPlayTitle from './components/HowToPlayTitle';

const HowToPlay = () => {
  return (
    <div className="container space-y-14 bg-white py-20">
      <HowToPlayTitle />
      <HowToPlayContent />
    </div>
  );
};

export default HowToPlay;
