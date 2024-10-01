import { erc721Abi } from 'viem';
import { useReadContract } from 'wagmi';

type Props = {
  nftAddress?: `0x${string}`;
  requestId: string;
};

export const useAllowanceNFT = ({ nftAddress, requestId }: Props) => {
  const result = useReadContract({
    address: nftAddress,
    abi: erc721Abi,
    functionName: 'getApproved',
    args: [BigInt(requestId)],
  });

  return result;
};
