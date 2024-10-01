import { type LucideIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';

import { Icons } from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { handleSmcError } from '@/lib/common';
import { networkChain } from '@/lib/const';
import { cn } from '@/lib/utils';

const HeaderSwitchNetwork = () => {
  const { chainId: currentChainId } = useAccount();
  const { switchChain, isPending, failureReason } = useSwitchChain();

  const handleSelectNetwork = (chainId: number) => {
    if (chainId === currentChainId) return;

    switchChain({
      chainId,
    });
  };

  useEffect(() => {
    if (!failureReason) return;

    handleSmcError(failureReason);
  }, [failureReason]);

  const currentNetwork = networkChain.find((network) => network.chainId === currentChainId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={'flex items-center gap-2 transition-all [&[data-state=open]>svg:last-child]:rotate-180'}
          aria-label="Select network"
        >
          {isPending && <TriggerLoading />}
          {!isPending && currentNetwork && <TriggerNetwork icon={currentNetwork.icon} />}
          {!isPending && !currentNetwork && <TriggerWrong />}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56 p-[1.125rem] shadow-2xl" align="end">
        <DropdownMenuGroup className="mt-4 flex flex-col gap-2.5">
          {networkChain.map(({ chainId, icon: Icon, name }) => (
            <DropdownMenuItem
              className="flex cursor-pointer gap-2 text-sm"
              key={chainId}
              onClick={() => handleSelectNetwork(chainId)}
            >
              <Icon width="1.5rem" height="24px" />

              <p
                className={cn({
                  'font-bold': chainId === currentChainId,
                })}
              >
                {name}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { HeaderSwitchNetwork };

const TriggerWrong = () => (
  <>
    <span className="inline-flex aspect-square w-7 items-center justify-center rounded-full border-2 border-red-500">
      <Icons.alert className="fill-red-500" height="1.2rem" />
    </span>

    <Icons.chevronDown className="h-4 w-4 transition-all" />
  </>
);

type TriggerNetworkProps = {
  icon: LucideIcon;
};
const TriggerNetwork = ({ icon: Icon }: TriggerNetworkProps) => (
  <>
    <Icon className="aspect-square w-7" />
    <Icons.chevronDown className="h-4 w-4 transition-all" />
  </>
);

const TriggerLoading = () => (
  <>
    <Spinner className="aspect-square w-7" />

    <p className="text-sm font-medium">Requesting</p>

    <Icons.chevronDown className="h-4 w-4 transition-all" />
  </>
);
