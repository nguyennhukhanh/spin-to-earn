import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container flex flex-col justify-between py-6 lg:flex-row">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="text-sm font-medium text-white">Spin to Earn © Copyright 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
