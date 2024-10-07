import { formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import SpinToEarnAbi from '@/contracts/SpinToEarnABI.json';
import { env } from '@/lib/const';

const useGetTicketPrice = () => {
  const result = useReadContract({
    address: env.SPIN_CONTRACT,
    abi: SpinToEarnAbi,
    functionName: 'ticketPrice',
    args: undefined,
  });

  return {
    result,
    ticketPrice: result ? Number(formatUnits(BigInt(Number(result?.data) || 0), 16)) : 0,
  };
};

export { useGetTicketPrice };
