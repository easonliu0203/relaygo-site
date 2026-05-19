import { Metadata } from 'next';
import { getBookmarksByCityAndCategory } from '@/lib/bookmarks';
import { localizedCountry, localizedCityBySlug, getCountrySlugs, getCitySlugs } from '@/lib/bookmark-locations';
import { CATEGORIES, localizedCategory } from '@/lib/bookmark-categories';
import BookmarksContent from '../../../BookmarksContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

export function generateStaticParams() {
  const params: Array<{ lang: string; country: string; city: string; category: string }> = [];
  for (const l of locales) {
    const lang = l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l;
    for (const country of getCountrySlugs()) {
      for (const city of getCitySlugs(country)) {
        for (const cat of CATEGORIES) {
          params.push({ lang, country, city, category: cat });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: string; country: string; city: string; category: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const country = localizedCountry(params.country, locale);
  const city = localizedCityBySlug(params.country, params.city, locale);
  const cat = localizedCategory(params.category, locale);
  const seg = localePathMap[locale];
  const canonical = seg
    ? `https://relaygo.pro/${seg}/bookmarks/${params.country}/${params.city}/${params.category}`
    : `https://relaygo.pro/bookmarks/${params.country}/${params.city}/${params.category}`;

  const title = `${city}${cat} | RelayGo 旅遊書籤`;
  const desc = `${city}（${country}）${cat}推薦 — 來自 Instagram、TikTok 的旅遊靈感收藏`;

  return {
    title,
    description: desc,
    robots: { index: false, follow: true },
    openGraph: { title, description: desc, type: 'website', url: canonical, locale: locale.replace('-', '_') },
    alternates: { canonical },
  };
}

export default async function CategoryBookmarksPage({ params }: { params: { lang: string; country: string; city: string; category: string } }) {
  const locale = resolveLocale(params.lang);
  const bookmarks = await getBookmarksByCityAndCategory(params.country, params.city, params.category);
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const country = localizedCountry(params.country, locale);
  const city = localizedCityBySlug(params.country, params.city, locale);
  const cat = localizedCategory(params.category, locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: '旅遊書籤', item: `https://relaygo.pro${langPrefix}/bookmarks` },
      { '@type': 'ListItem', position: 3, name: country, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}` },
      { '@type': 'ListItem', position: 4, name: city, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}/${params.city}` },
      { '@type': 'ListItem', position: 5, name: cat, item: `https://relaygo.pro${langPrefix}/bookmarks/${params.country}/${params.city}/${params.category}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BookmarksContent
        bookmarks={bookmarks}
        initialLang={locale}
        currentCountry={params.country}
        currentCity={params.city}
        currentCategory={params.category}
      />
    </>
  );
}
