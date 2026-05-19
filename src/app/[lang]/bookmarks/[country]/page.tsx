import { Metadata } from 'next';
import { getBookmarksByCountry } from '@/lib/bookmarks';
import { localizedCountry, getCountrySlugs } from '@/lib/bookmark-locations';
import BookmarksContent from '../BookmarksContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

export function generateStaticParams() {
  const params: Array<{ lang: string; country: string }> = [];
  for (const l of locales) {
    const lang = l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l;
    for (const country of getCountrySlugs()) {
      params.push({ lang, country });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: string; country: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const country = localizedCountry(params.country, locale);
  const seg = localePathMap[locale];
  const canonical = seg
    ? `https://relaygo.pro/${seg}/bookmarks/${params.country}`
    : `https://relaygo.pro/bookmarks/${params.country}`;

  const title = `${country} 旅遊書籤 | RelayGo`;
  const desc = `${country} 旅遊靈感收藏 — 美食、景點、咖啡、秘境等社群推薦`;

  return {
    title,
    description: desc,
    robots: { index: true, follow: true },
    openGraph: { title, description: desc, type: 'website', url: canonical, locale: locale.replace('-', '_') },
    alternates: { canonical },
  };
}

export default async function CountryBookmarksPage({ params }: { params: { lang: string; country: string } }) {
  const locale = resolveLocale(params.lang);
  const bookmarks = await getBookmarksByCountry(params.country);
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const country = localizedCountry(params.country, locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: '旅遊書籤', item: `https://relaygo.pro${langPrefix}/bookmarks` },
      { '@type': 'ListItem', position: 3, name: country, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BookmarksContent bookmarks={bookmarks} initialLang={locale} currentCountry={params.country} />
    </>
  );
}
