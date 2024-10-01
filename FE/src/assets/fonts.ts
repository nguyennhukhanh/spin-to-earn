import { Inter, Open_Sans, Poppins as FontSans, Roboto } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '900'],
});

export const fontRoboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

export const fontOpenSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['600'],
});

export const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400'],
});

export const fontSerif = fontSans;
