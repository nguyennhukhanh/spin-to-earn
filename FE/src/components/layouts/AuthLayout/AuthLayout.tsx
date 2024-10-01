import { useRouter } from 'next/router';
import React, { type ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { type FCC, ROUTE } from '@/types';

interface Props {
  children: ReactNode;
}

const AuthLayout: FCC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push(ROUTE.HOME);
  }, [isLoggedIn, router]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      <div className="relative h-screen max-h-[12.375rem] w-full overflow-hidden bg-authBg bg-cover bg-top bg-no-repeat bg-origin-border md:max-h-[20rem] lg:max-h-none lg:flex-1 lg:bg-center" />

      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
