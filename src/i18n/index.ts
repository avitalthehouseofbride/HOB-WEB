import { defaultLocale, locales, type Locale } from './config';
import he from './he';
import en from './en';

const dictionaries = { he, en } as const;

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

export function t(locale: Locale) {
  return dictionaries[locale];
}

/** Path for the same page in another locale. Hebrew has no prefix; English lives under /en. */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return locale === 'he' ? clean : `/en${clean === '/' ? '/' : clean}`;
}

export { defaultLocale, locales, type Locale } from './config';
