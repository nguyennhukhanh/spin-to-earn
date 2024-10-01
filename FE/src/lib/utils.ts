import BigNumber from 'bignumber.js';
import { type ClassValue, clsx } from 'clsx';
import bigDecimal from 'js-big-decimal';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': ['text-xxs'],
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function unslugify(str: string) {
  return str.replace(/-/g, ' ');
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

export function closestItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index === -1) {
    return arr[0];
  }
  if (index === arr.length - 1) {
    return arr[arr.length - 2];
  }
  return arr[index + 1];
}

export const formatNumber = (numberFormat: number | string) => {
  return bigDecimal.getPrettyValue(numberFormat);
};

export function compactNumber(n: number, unit: number = 2) {
  if (n < 1e3) return +n.toFixed(unit);
  if (n >= 1e3 && n < 1e6) return `${formatNumber(+BigNumber(n / 1e3).toFixed(unit))}K`;
  if (n >= 1e6 && n < 1e9) return `${formatNumber(+BigNumber(n / 1e6).toFixed(unit))}M`;
  if (n >= 1e9 && n < 1e12) return `${formatNumber(+BigNumber(n / 1e9).toFixed(unit))}B`;
  if (n >= 1e12) return `${formatNumber(+BigNumber(n / 1e12).toFixed(unit))}T`;

  return formatNumber(+n.toFixed(unit));
}

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};
