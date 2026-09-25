import { Metadata } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import GuidesListContent from './GuidesListContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';
import { ogImage } from '@/lib/og';

const GUIDES_DESCS: Record<Locale, string> = {
  'zh-TW': '精選台灣旅遊路線攻略，九份、日月潭、清境、墾丁、花蓮太魯閣等熱門景點。包車行程、在地美食推薦、大眾運輸自由行路線一次搞定。',
  'zh-CN': '精选台湾旅游路线攻略，九份、日月潭、清境、垦丁、花莲太鲁阁等热门景点。包车行程、在地美食推荐、大众运输自由行路线一次搞定。',
  en: 'Curated Taiwan travel guides — Jiufen, Sun Moon Lake, Kenting, Taroko Gorge & more. Charter itineraries, local food picks, and public transit routes all in one place.',
  ja: '台北・九份・日月潭・阿里山・台南・墾丁・太魯閣など、台湾の人気観光地を貸切車で巡るモデルルート15選。所要時間やおすすめの回り方、ご当地グルメに加え、電車やバスで行く方法もまとめています。',
  ko: '예스진지(예류・스펀・지우펀・진과스), 르웨탄, 타로코 협곡, 컨딩 등 대만 인기 여행지를 택시투어로 도는 추천 코스. 소요 시간, 현지 맛집, 대중교통으로 가는 방법까지 한곳에 정리했습니다.',
  th: 'คู่มือท่องเที่ยวไต้หวันคัดสรร — จิ่วเฟิ่น ทะเลสาบสุริยันจันทรา อาลีซาน เคินติง ทาโรโกะ และอื่น ๆ รวมเส้นทางรถเหมา ร้านอาหารท้องถิ่น และเส้นทางขนส่งสาธารณะ',
  vi: 'Cẩm nang du lịch Đài Loan tuyển chọn — Cửu Phần, Nhật Nguyệt Đàm, Khẩn Đinh, hẻm núi Taroko và nhiều hơn nữa. Lộ trình xe riêng, ẩm thực địa phương và tuyến giao thông công cộng.',
  ms: 'Panduan pelancongan Taiwan pilihan — Jiufen, Tasik Sun Moon, Kenting, Taroko & lagi. Jadual sewa kenderaan, makanan tempatan, dan laluan pengangkutan awam.',
  id: 'Panduan wisata Taiwan pilihan — Jiufen, Danau Sun Moon, Kenting, Ngarai Taroko & lainnya. Rute charter, rekomendasi kuliner lokal, dan rute transportasi umum.',
  fil: 'Mga piling gabay sa paglalakbay sa Taiwan — Jiufen, Sun Moon Lake, Kenting, Taroko Gorge at marami pa. Mga ruta ng charter, lokal na pagkain, at ruta ng pampublikong transportasyon.',
};

const GUIDES_KEYWORDS: Record<Locale, string> = {
  'zh-TW': '台灣包車攻略, 包車旅遊路線, 台灣美食攻略, 台灣自由行攻略, 大眾運輸自由行, 台灣背包客, 台灣一日遊, 九份包車, 日月潭包車, 花蓮包車, 台灣夜市',
  'zh-CN': '台湾包车攻略, 包车旅游路线, 台湾美食攻略, 台湾自由行攻略, 台湾背包客, 台湾一日游, 九份包车, 日月潭包车, 花莲包车',
  en: 'Taiwan itinerary, Taiwan day trip from Taipei, Jiufen day trip, Yehliu Jiufen Shifen tour, Sun Moon Lake day trip, Taroko Gorge tour, Taiwan private tour, Taiwan travel guide, Taiwan food guide, Taiwan backpacking',
  ja: '台湾 貸切チャーター, 台湾 貸切タクシー, 台湾旅行ガイド, 九份 ツアー, 日月潭 ツアー, 太魯閣 ツアー, 台湾 日帰りツアー, 台湾観光',
  ko: '대만 택시투어 코스, 예스진지 택시투어, 지우펀 택시투어, 르웨탄 투어, 타로코 협곡 투어, 대만 여행 코스, 대만 맛집, 대만 당일치기, 대만 자유여행',
  th: 'ทัวร์รถเหมาไต้หวัน, คู่มือเที่ยวไต้หวัน, จิ่วเฟิ่น, ทะเลสาบสุริยันจันทรา, ทาโรโกะ, อาหารไต้หวัน, เที่ยวไต้หวันด้วยตัวเอง',
  vi: 'tour charter Đài Loan, cẩm nang du lịch Đài Loan, Cửu Phần, Nhật Nguyệt Đàm, Taroko, ẩm thực Đài Loan, du lịch tự túc Đài Loan',
  ms: 'charter tour Taiwan, panduan pelancongan Taiwan, Jiufen, Tasik Sun Moon, Taroko, makanan Taiwan, melancong Taiwan',
  id: 'charter tour Taiwan, panduan wisata Taiwan, Jiufen, Danau Sun Moon, Taroko, kuliner Taiwan, wisata Taiwan',
  fil: 'charter tour Taiwan, gabay sa paglalakbay Taiwan, Jiufen, Sun Moon Lake, Taroko, pagkain sa Taiwan, lakbay Taiwan',
};

const GUIDES_TITLES: Record<Locale, string> = {
  'zh-TW': '包車攻略 | RelayGo - 台灣包車旅遊路線推薦',
  'zh-CN': '包车攻略 | RelayGo - 台湾包车旅游路线推荐',
  en: 'Taiwan Day Trips by Private Driver: Jiufen, Taroko | RelayGo',
  ja: '台湾 貸切チャーター観光ルート｜九份・日月潭・太魯閣 | RelayGo',
  ko: '대만 택시투어 코스 추천｜예스진지・르웨탄・타로코 | RelayGo',
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
      locale: locale.replace('-', '_'),
      images: [ogImage(locale)],
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
