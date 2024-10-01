/**
 * @jest-environment node
 */

import '@testing-library/react';

import { balanceFormat, prettyNumber, roundNumber } from './calc';

test('prettyNumber 1000 to equal 1,000', () => {
  expect(prettyNumber(1000)).toBe('1,000');
});

test('balanceFormat 209335293872483600000 to equal 209.335293872483598336', () => {
  expect(balanceFormat(BigInt(209335293872483600000))).toBe('209.335293872483598336');
});

test('roundNumber 1.029 to equal 1.02', () => {
  expect(roundNumber(1.029)).toBe('1.02');
});

test('prettyNumber, balanceFormat, roundNumber 2093352938724836000000 to equal 2,093.35', () => {
  expect(prettyNumber(roundNumber(balanceFormat(BigInt(2093352938724836000000))))).toBe('2,093.35');
});
