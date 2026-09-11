import type { Locale } from './i18n-config';

// Share-card image per locale. Japanese pages get a Japanese card because LINE
// and X previews are the main way links travel in Japan.
export function ogImage(locale: Locale, alt?: string) {
  const url = locale === 'ja' ? 'https://relaygo.pro/og-image-ja.jpg' : 'https://relaygo.pro/og-image.png';
  return { url, width: 1200, height: 630, ...(alt ? { alt } : {}) };
}
