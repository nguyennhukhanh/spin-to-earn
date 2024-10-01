import { useEffect } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { handleSmcError } from '@/lib/common';

const useCommonWriteContract = () => {
  const {
    data: resultContract,
    isError: isErrorContract,
    error: errorContract,
    isPending: isPendingContract,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({ hash: resultContract });

  useEffect(() => {
    if (!isErrorContract || !errorContract) return;
    handleSmcError(errorContract);
  }, [errorContract, isErrorContract]);

  useEffect(() => {
    if (!isTransactionError || !transactionError) return;
    handleSmcError(transactionError);
  }, [transactionError, isTransactionError]);

  return {
    writeContract,
    isPendingContract,
    isTransactionSuccess,
    isTransactionLoading,
    isErrorContract,
    errorContract,
    isTransactionError,
    transactionError,
  };
};

export { useCommonWriteContract };
