import { Metadata } from 'next';
import { getPublishedBookmarks } from '@/lib/bookmarks';
import BookmarksContent from './BookmarksContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

const TITLES: Record<Locale, string> = {
  'zh-TW': '旅遊書籤 | RelayGo — 收藏社群旅遊靈感',
  'zh-CN': '旅游书签 | RelayGo — 收藏社交媒体旅游灵感',
  en: 'Travel Bookmarks | RelayGo — Curate Social Travel Inspiration',
  ja: '旅のブックマーク | RelayGo — SNS旅行インスピレーション',
  ko: '여행 북마크 | RelayGo — SNS 여행 영감 큐레이션',
  th: 'บุ๊กมาร์กท่องเที่ยว | RelayGo — รวมแรงบันดาลใจจากโซเชียล',
  vi: 'Dấu trang du lịch | RelayGo — Cảm hứng du lịch từ mạng xã hội',
  ms: 'Penanda Pelancong | RelayGo — Inspirasi Pelancongan Sosial',
  id: 'Bookmark Wisata | RelayGo — Inspirasi Wisata dari Media Sosial',
  fil: 'Travel Bookmark | RelayGo — Inspirasyon mula sa Social Media',
};

const DESCS: Record<Locale, string> = {
  'zh-TW': '從 Instagram、TikTok、Facebook 收集旅遊靈感，依國家、城市、分類瀏覽美食、景點、咖啡、秘境等書籤卡片。',
  'zh-CN': '从 Instagram、TikTok、Facebook 收集旅游灵感，按国家、城市、分类浏览美食、景点、咖啡、秘境等书签卡片。',
  en: 'Collect travel inspiration from Instagram, TikTok & Facebook. Browse bookmark cards by country, city, and category — food, attractions, cafes, hidden gems & more.',
  ja: 'Instagram・TikTok・Facebookから旅のインスピレーションを収集。国・都市・カテゴリー別にグルメ・観光・カフェ・秘境などを閲覧。',
  ko: 'Instagram, TikTok, Facebook에서 여행 영감을 수집하세요. 국가, 도시, 카테고리별로 맛집, 명소, 카페, 숨은 명소를 탐색하세요.',
  th: 'รวบรวมแรงบันดาลใจจาก Instagram, TikTok, Facebook เรียกดูบุ๊กมาร์กตามประเทศ เมือง หมวดหมู่',
  vi: 'Thu thập cảm hứng du lịch từ Instagram, TikTok, Facebook. Duyệt dấu trang theo quốc gia, thành phố và danh mục.',
  ms: 'Kumpul inspirasi pelancongan dari Instagram, TikTok, Facebook. Layari penanda mengikut negara, bandar dan kategori.',
  id: 'Kumpulkan inspirasi wisata dari Instagram, TikTok, Facebook. Jelajahi bookmark berdasarkan negara, kota, dan kategori.',
  fil: 'Mag-ipon ng travel inspiration mula sa Instagram, TikTok, Facebook. I-browse ang mga bookmark ayon sa bansa, lungsod at kategorya.',
};

const KEYWORDS: Record<Locale, string> = {
  'zh-TW': '旅遊書籤, 旅遊靈感, Instagram美食, TikTok景點, 台灣美食, 日本旅遊, 韓國咖啡, 秘境推薦',
  'zh-CN': '旅游书签, 旅游灵感, Instagram美食, TikTok景点, 台湾美食, 日本旅游, 韩国咖啡, 秘境推荐',
  en: 'travel bookmarks, travel inspiration, Instagram food, TikTok attractions, Taiwan food, Japan travel, hidden gems',
  ja: '旅ブックマーク, 旅インスピレーション, Instagramグルメ, TikTok観光, 台湾グルメ, 日本旅行, 秘境',
  ko: '여행 북마크, 여행 영감, 인스타 맛집, 틱톡 명소, 대만 맛집, 일본 여행, 숨은 명소',
  th: 'บุ๊กมาร์กเที่ยว, แรงบันดาลใจเที่ยว, อาหาร Instagram, สถานที่ TikTok',
  vi: 'dấu trang du lịch, cảm hứng du lịch, ẩm thực Instagram, điểm đến TikTok',
  ms: 'penanda pelancong, inspirasi pelancong, makanan Instagram, tempat menarik TikTok',
  id: 'bookmark wisata, inspirasi wisata, kuliner Instagram, wisata TikTok',
  fil: 'travel bookmark, travel inspiration, Instagram food, TikTok attraction',
};

function buildAlternates() {
  const languages: Record<string, string> = { 'x-default': 'https://relaygo.pro/bookmarks' };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}/bookmarks` : 'https://relaygo.pro/bookmarks';
  }
  return languages;
}

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/bookmarks` : 'https://relaygo.pro/bookmarks';

  return {
    title: TITLES[locale],
    description: DESCS[locale],
    keywords: KEYWORDS[locale],
    openGraph: {
      title: TITLES[locale],
      description: DESCS[locale],
      type: 'website',
      url: canonical,
      locale: locale.replace('-', '_'),
    },
    alternates: {
      canonical,
      languages: buildAlternates(),
    },
  };
}

export default async function BookmarksPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  const bookmarks = await getPublishedBookmarks();
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLES[locale].split(' | ')[0],
    description: DESCS[locale],
    url: 'https://relaygo.pro/bookmarks',
    provider: {
      '@type': 'Organization',
      name: 'RelayGo',
      url: 'https://relaygo.pro',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: TITLES[locale].split(' | ')[0], item: `https://relaygo.pro${langPrefix}/bookmarks` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BookmarksContent bookmarks={bookmarks} initialLang={locale} />
    </>
  );
}
