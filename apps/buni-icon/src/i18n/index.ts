import { useTranslations as useNextTranslations, useLocale as useNextLocale } from 'next-intl';

export { locales, defaultLocale, messages } from './config';
export type { Locale } from './config';

export const useTranslations: typeof useNextTranslations = useNextTranslations;
export const useLocale: typeof useNextLocale = useNextLocale;

export { NextIntlClientProvider } from 'next-intl';
