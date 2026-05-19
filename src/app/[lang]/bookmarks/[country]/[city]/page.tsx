import { Metadata } from 'next';
import { getBookmarksByCity } from '@/lib/bookmarks';
import { localizedCountry, localizedCityBySlug, getCountrySlugs, getCitySlugs } from '@/lib/bookmark-locations';
import BookmarksContent from '../../BookmarksContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

export function generateStaticParams() {
  const params: Array<{ lang: string; country: string; city: string }> = [];
  for (const l of locales) {
    const lang = l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l;
    for (const country of getCountrySlugs()) {
      for (const city of getCitySlugs(country)) {
        params.push({ lang, country, city });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: string; country: string; city: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const country = localizedCountry(params.country, locale);
  const city = localizedCityBySlug(params.country, params.city, locale);
  const seg = localePathMap[locale];
  const canonical = seg
    ? `https://relaygo.pro/${seg}/bookmarks/${params.country}/${params.city}`
    : `https://relaygo.pro/bookmarks/${params.country}/${params.city}`;

  const title = `${city} 旅遊書籤 | RelayGo`;
  const desc = `${city}（${country}）旅遊靈感 — 美食、景點、咖啡、秘境等社群推薦`;

  return {
    title,
    description: desc,
    robots: { index: true, follow: true },
    openGraph: { title, description: desc, type: 'website', url: canonical, locale: locale.replace('-', '_') },
    alternates: { canonical },
  };
}

export default async function CityBookmarksPage({ params }: { params: { lang: string; country: string; city: string } }) {
  const locale = resolveLocale(params.lang);
  const bookmarks = await getBookmarksByCity(params.country, params.city);
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const country = localizedCountry(params.country, locale);
  const city = localizedCityBySlug(params.country, params.city, locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: '旅遊書籤', item: `https://relaygo.pro${langPrefix}/bookmarks` },
      { '@type': 'ListItem', position: 3, name: country, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}` },
      { '@type': 'ListItem', position: 4, name: city, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}/${params.city}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BookmarksContent bookmarks={bookmarks} initialLang={locale} currentCountry={params.country} currentCity={params.city} />
    </>
  );
}
