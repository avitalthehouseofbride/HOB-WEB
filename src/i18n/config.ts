export const locales = ['he', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'he';
export const dirFor = (locale: Locale): 'rtl' | 'ltr' => (locale === 'he' ? 'rtl' : 'ltr');
