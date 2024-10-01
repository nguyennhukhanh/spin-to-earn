import { type GetServerSidePropsContext, type PreviewData } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ParsedUrlQuery } from 'querystring';

import { type nsType } from '@/types/i18next';

export const getI18nPaths = () =>
  ['en'].map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  ns = ['common', 'zod']
) => {
  const locale = ctx.locale || 'en';
  const props = {
    ...(await serverSideTranslations(locale, ns)),
  };
  return props;
};

export const makeServerSideProps =
  (ns: Array<nsType> = ['common', 'zod']) =>
  async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    if (process.env.NODE_ENV === 'development') {
      await i18n?.reloadResources();
    }

    return {
      props: await getI18nProps(ctx, ns),
    };
  };
