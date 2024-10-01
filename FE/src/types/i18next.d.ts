/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next';
import 'react-i18next';
import 'next-i18next';

import type common from '../public/locales/en/common.json';
import type error from '../public/locales/en/error.json';
import type validation from '../public/locales/en/validation.json';
import type zod from '../public/locales/en/zod.json';

interface I18nNamespaces {
  common: typeof common;
  validation: typeof validation;
  error: typeof error;
  zod: typeof zod;
}

export type nsType = keyof I18nNamespaces;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    ns: Array<nsType>;
    resources: I18nNamespaces;
  }
}

declare module 'next-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }

  export interface Resources {
    common: typeof common;
    validation: typeof validation;
    error: typeof error;
    zod: typeof zod;
  }
}
