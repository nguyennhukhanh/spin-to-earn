import type { DefaultOptions } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { memo } from 'react';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/ThemeProvider';
import type { FCC } from '@/types';

import { WagmiProviderLib } from './wagmi';

interface Props {}

const queryOption: DefaultOptions['queries'] = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

const queryClient = new QueryClient({ defaultOptions: { queries: queryOption } });

const Provider: FCC<Props> = ({ children }) => {
  const [_queryClient] = React.useState(() => queryClient);

  return (
    <WagmiProviderLib>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
        <QueryClientProvider client={_queryClient}>
          {children}
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </ThemeProvider>
      <Toaster />
    </WagmiProviderLib>
  );
};

export default memo(Provider);
