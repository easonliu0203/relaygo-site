import { Metadata } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import GuidesListContent from './GuidesListContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

const GUIDES_DESCS: Record<Locale, string> = {
  'zh-TW': '精選台灣旅遊路線攻略，九份、日月潭、清境、墾丁、花蓮太魯閣等熱門景點。包車行程、在地美食推薦、大眾運輸自由行路線一次搞定。',
  'zh-CN': '精选台湾旅游路线攻略，九份、日月潭、清境、垦丁、花莲太�的鲁阁等热门景点。包车行程、在地美食推荐、大众运输自由行路线一次搞定。',
  en: 'Curated Taiwan travel guides — Jiufen, Sun Moon Lake, Kenting, Taroko Gorge & more. Charter itineraries, local food picks, and public transit routes all in one place.',
  ja: '厳選した台湾旅行ガイド — 九份、日月潭、阿里山、墾丁、太魯閣など人気スポット満載。チャーター旅程、ご当地グルメ、公共交通ルートをまとめてご紹介。',
  ko: '엄선된 대만 여행 가이드 — 지우펀, 르웨탄, 컨딩, 타로코 협곡 등 인기 명소. 차터 일정, 현지 맛집, 대중교통 루트를 한곳에서 확인하세요.',
  th: 'คู่มือท่องเที่ยวไต้หวันคัดสรร — จิ่วเฟิ่น ทะเลสาบสุริยันจันทรา อาลีซาน เคินติง ทาโรโกะ และอื่น ๆ รวมเส้นทางรถเหมา ร้านอาหารท้องถิ่น และเส้นทางขนส่งสาธารณะ',
  vi: 'Cẩm nang du lịch Đài Loan tuyển chọn — Cửu Phần, Nhật Nguyệt Đàm, Khẩn Đinh, hẻm núi Taroko và nhiều hơn nữa. Lộ trình xe riêng, ẩm thực địa phương và tuyến giao thông công cộng.',
  ms: 'Panduan pelancongan Taiwan pilihan — Jiufen, Tasik Sun Moon, Kenting, Taroko & lagi. Jadual sewa kenderaan, makanan tempatan, dan laluan pengangkutan awam.',
  id: 'Panduan wisata Taiwan pilihan — Jiufen, Danau Sun Moon, Kenting, Ngarai Taroko & lainnya. Rute charter, rekomendasi kuliner lokal, dan rute transportasi umum.',
  fil: 'Mga piling gabay sa paglalakbay sa Taiwan — Jiufen, Sun Moon Lake, Kenting, Taroko Gorge at marami pa. Mga ruta ng charter, lokal na pagkain, at ruta ng pampublikong transportasyon.',
};

const GUIDES_KEYWORDS: Record<Locale, string> = {
  'zh-TW': '台灣包車攻略, 包車旅遊路線, 台灣美食攻略, 台灣自由行攻略, 大眾運輸自由行, 台灣背包客, 台灣一日遊, 九份包車, 日月潭包車, 花蓮包車, 台灣夜市',
  'zh-CN': '台湾包车攻略, 包车旅游路线, 台湾美食攻略, 台湾自由行攻略, 台湾背包客, 台湾一日游, 九份包车, 日月潭包车, 花莲包车',
  en: 'Taiwan charter tour, Taiwan travel guide, Taiwan day trip, Jiufen tour, Sun Moon Lake, Taroko Gorge, Taiwan food guide, Taiwan backpacking',
  ja: '台湾チャーターツアー, 台湾旅行ガイド, 九份ツアー, 日月潭, 太魯閣, 台湾グルメ, 台湾一日ツアー, 台湾観光',
  ko: '대만 차터 투어, 대만 여행 가이드, 지우펀 투어, 르웨탄, 타로코 협곡, 대만 맛집, 대만 당일치기',
  th: 'ทัวร์รถเหมาไต้หวัน, คู่มือเที่ยวไต้หวัน, จิ่วเฟิ่น, ทะเลสาบสุริยันจันทรา, ทาโรโกะ, อาหารไต้หวัน, เที่ยวไต้หวันด้วยตัวเอง',
  vi: 'tour charter Đài Loan, cẩm nang du lịch Đài Loan, Cửu Phần, Nhật Nguyệt Đàm, Taroko, ẩm thực Đài Loan, du lịch tự túc Đài Loan',
  ms: 'charter tour Taiwan, panduan pelancongan Taiwan, Jiufen, Tasik Sun Moon, Taroko, makanan Taiwan, melancong Taiwan',
  id: 'charter tour Taiwan, panduan wisata Taiwan, Jiufen, Danau Sun Moon, Taroko, kuliner Taiwan, wisata Taiwan',
  fil: 'charter tour Taiwan, gabay sa paglalakbay Taiwan, Jiufen, Sun Moon Lake, Taroko, pagkain sa Taiwan, lakbay Taiwan',
};

const GUIDES_TITLES: Record<Locale, string> = {
  'zh-TW': '包車攻略 | RelayGo - 台灣包車旅遊路線推薦',
  'zh-CN': '包车攻略 | RelayGo - 台湾包车旅游路线推荐',
  en: 'Travel Guides | RelayGo - Taiwan Charter Tour Routes',
  ja: 'チャーターガイド | RelayGo - 台湾チャーターツアールート',
  ko: '차터 가이드 | RelayGo - 대만 차터 투어 루트',
  th: 'คู่มือเที่ยวรถเหมา | RelayGo - เส้นทางท่องเที่ยวไต้หวัน',
  vi: 'Cẩm nang du lịch | RelayGo - Tuyến du lịch xe riêng Đài Loan',
  ms: 'Panduan Perjalanan | RelayGo - Laluan Pelancongan Sewa Kenderaan Taiwan',
  id: 'Panduan Wisata | RelayGo - Rute Wisata Charter Taiwan',
  fil: 'Mga Gabay sa Paglalakbay | RelayGo - Mga Ruta ng Charter Tour sa Taiwan',
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
    description: GUIDES_DESCS[locale],
    keywords: GUIDES_KEYWORDS[locale],
    openGraph: {
      title: GUIDES_TITLES[locale],
      description: GUIDES_DESCS[locale],
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
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: GUIDES_TITLES[locale].split(' | ')[0],
    description: GUIDES_DESCS[locale],
    url: 'https://relaygo.pro/guides',
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
      { '@type': 'ListItem', position: 2, name: GUIDES_TITLES[locale].split(' | ')[0], item: `https://relaygo.pro${langPrefix}/guides` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GuidesListContent guides={guides} initialLang={locale} />
    </>
  );
}
