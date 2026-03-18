export const defaultLocale = 'zh-TW';

export const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'th', 'vi', 'ms', 'id', 'fil'] as const;
export type Locale = (typeof locales)[number];

// URL path segment for each locale (empty string = default, no prefix)
export const localePathMap: Record<Locale, string> = {
  'zh-TW': '',
  'zh-CN': 'zh-cn',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  th: 'th',
  vi: 'vi',
  ms: 'ms',
  id: 'id',
  fil: 'fil',
};

// Reverse: path segment → locale
export const pathToLocale: Record<string, Locale> = {
  'zh-TW': 'zh-TW',
  'zh-cn': 'zh-CN',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  th: 'th',
  vi: 'vi',
  ms: 'ms',
  id: 'id',
  fil: 'fil',
};

// All non-default path segments
export const localePrefixes = locales
  .map((l) => localePathMap[l])
  .filter(Boolean);

// Get locale from [lang] route param
export function resolveLocale(langParam: string): Locale {
  return pathToLocale[langParam] || defaultLocale;
}

// Get the URL prefix for a locale (e.g. '/en' or '' for default)
export function localePrefix(locale: Locale): string {
  const seg = localePathMap[locale];
  return seg ? `/${seg}` : '';
}

// HTML lang attribute value
export function htmlLang(locale: Locale): string {
  if (locale === 'zh-TW') return 'zh-Hant-TW';
  if (locale === 'zh-CN') return 'zh-Hans-CN';
  return locale;
}
