import Link from 'next/link';
import React from 'react';

import { ROUTE } from '@/types';

const navList = [
  {
    title: 'Home',
    href: ROUTE.HOME,
  },
  {
    title: 'Claim',
    href: ROUTE.CLAIM,
  },
  {
    title: 'Leaderboard',
    href: ROUTE.LEADERBOARD,
  },
  {
    title: 'Contact',
    href: ROUTE.CONTACT,
  },
];

const NavbarDesktop = () => {
  return (
    <ul className="flex items-center gap-4 text-white">
      {navList.map(({ title, href }) => (
        <NavbarItem key={title} title={title} href={href} />
      ))}
    </ul>
  );
};

const NavbarItem = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link href={href} className="group relative text-xs">
      <li className="inline-block">
        {title}
        <span className="duration-400 absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
      </li>
    </Link>
  );
};

export { NavbarDesktop, NavbarItem, navList };
