import bigDecimal from 'js-big-decimal';
import { type RoundingModes } from 'js-big-decimal/dist/node/roundingModes';
import { formatEther, formatUnits, parseUnits } from 'viem';

export const prettyNumber = (number: number | string, digits = 3, separator = ',') =>
  bigDecimal.getPrettyValue(number, digits, separator);

export const roundNumber = (
  number: string | number,
  round = 8,
  roundMode: RoundingModes = bigDecimal.RoundingModes.DOWN
) => bigDecimal.round(number, round, roundMode);

export const balanceFormat = (balance?: bigint) => {
  return balance ? formatEther(balance) : '0';
};

export const balanceFormatStableCoin = (balance?: bigint, unit = 6) => {
  return balance ? formatUnits(balance, unit) : '0';
};

export const parseStableCoin = (value?: string, unit = 6) => {
  return value ? parseUnits(value, unit) : '0';
};
