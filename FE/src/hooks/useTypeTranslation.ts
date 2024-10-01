import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

import { type Paths } from '@/types/common.type';
import { type nsType } from '@/types/i18next';

import type common from '../../public/locales/en/common.json';
import type error from '../../public/locales/en/error.json';

type CommonKeys = Paths<typeof common>;
type ErrorKeys = Paths<typeof error>;
export type Keys = CommonKeys | `error:${ErrorKeys}`;

export const useTypeSafeTranslation = (ns: Array<nsType> = ['common', 'zod']) => {
  const { t, ...rest } = useTranslation(ns);

  return {
    t: useCallback((s: Keys, p?: any): string => `${t(s, p) ?? s}`, [t]),
    ...rest,
  };
};
