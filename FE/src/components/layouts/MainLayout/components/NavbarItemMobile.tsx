import Link from 'next/link';
import React from 'react';

const NavbarItemMobile = ({ title, href, onClick }: { title: string; href: string; onClick?: () => void }) => {
  return (
    <Link href={href} className="text-4 font-semibold" onClick={onClick}>
      <p>{title}</p>
    </Link>
  );
};

export default NavbarItemMobile;
