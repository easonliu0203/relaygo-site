import { Metadata } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import GuidesListContent from './GuidesListContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

const GUIDES_TITLES: Record<Locale, string> = {
  'zh-TW': '包車攻略 | RelayGo - 台灣包車旅遊路線推薦',
  'zh-CN': '包车攻略 | RelayGo - 台湾包车旅游路线推荐',
  en: 'Travel Guides | RelayGo - Taiwan Charter Tour Routes',
  ja: 'チャーターガイド | RelayGo - 台湾チャーターツアールート',
  ko: '차터 가이드 | RelayGo - 대만 차터 투어 루트',
  th: 'คู่มือเที่ยวรถเหมา | RelayGo - เส้นทางท่องเที่ยวไต้หวัน',
  vi: 'Cẩm nang du lịch | RelayGo - Tuyến du lịch xe riêng Đài Loan',
  ms: 'Panduan Perjalanan | RelayGo - Laluan Pelancongan Sewa Kenderaan Taiwan',
};

function buildGuidesAlternates() {
  const languages: Record<string, string> = { 'x-default': 'https://relaygo.pro/guides' };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}/guides` : 'https://relaygo.pro/guides';
  }
  return languages;
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/guides` : 'https://relaygo.pro/guides';

  return {
    title: GUIDES_TITLES[locale],
    description: '精選台灣包車旅遊路線攻略，九份、日月潭、清境、墾丁、花蓮太魯閣等熱門景點，專業司機帶路，行程規劃一次搞定。',
    keywords: '台灣包車攻略, 包車旅遊路線, 九份包車, 日月潭包車, 花蓮包車, charter tour Taiwan',
    openGraph: {
      title: GUIDES_TITLES[locale],
      description: '精選台灣包車旅遊路線攻略，專業司機帶路',
      type: 'website',
      url: canonical,
    },
    alternates: {
      canonical,
      languages: buildGuidesAlternates(),
    },
  };
}

export default async function GuidesPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  const guides = await getPublishedGuides();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '包車攻略',
    description: '精選台灣包車旅遊路線攻略',
    url: 'https://relaygo.pro/guides',
    provider: {
      '@type': 'Organization',
      name: 'RelayGo',
      url: 'https://relaygo.pro',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidesListContent guides={guides} initialLang={locale} />
    </>
  );
}
