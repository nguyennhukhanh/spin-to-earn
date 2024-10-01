import { erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

type Props = {
  tokenAddress?: `0x${string}`;
  contractAddress?: `0x${string}`;
};

const useAllowanceToken = ({ tokenAddress, contractAddress }: Props) => {
  const { address } = useAccount();
  const enabled = !!address && !!contractAddress;

  const result = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: enabled ? [address, contractAddress] : undefined,
  });

  return result;
};

export { useAllowanceToken };
