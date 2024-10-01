import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';

type LinkBlankType = {
  prefix?: boolean;
  suffix?: boolean;
  name: string;
  href: string;
};

const LinkBlank = ({ suffix, prefix, name, href }: LinkBlankType) => {
  return (
    <Link href={href} target="_blank" className="inline-flex items-center gap-1 hover:underline">
      {prefix && <Icons.arrowTopRight size="1rem" />}

      <p>{name}</p>

      {suffix && <Icons.arrowTopRight size="1rem" />}
    </Link>
  );
};

export { LinkBlank };
