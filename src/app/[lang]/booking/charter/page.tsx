import type { Metadata } from 'next';
import { resolveLocale, locales, type Locale } from '@/lib/i18n-config';
import CharterBookingForm from './CharterBookingForm';

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

const META_TITLE: Record<string, string> = {
  'zh-TW': '包車預約 | RelayGo',
  'zh-CN': '包车预约 | RelayGo',
  en: 'Charter Booking | RelayGo',
  ja: 'チャーター予約 | RelayGo',
  ko: '전세 예약 | RelayGo',
  th: 'จองรถเหมา | RelayGo',
  vi: 'Đặt xe thuê | RelayGo',
  ms: 'Tempahan Charter | RelayGo',
  id: 'Pemesanan Charter | RelayGo',
  fil: 'Charter Booking | RelayGo',
};

const META_DESC: Record<string, string> = {
  'zh-TW': '線上預約台灣包車旅遊，專業司機、即時追蹤、多元支付。選擇車型、日期和行程，輕鬆完成預約。',
  en: 'Book a private charter car in Taiwan online. Professional drivers, real-time tracking, multiple payment options.',
  ja: '台湾のチャーター車をオンライン予約。プロドライバー、リアルタイム追跡、多様な決済方法。',
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  return {
    title: META_TITLE[locale] || META_TITLE['zh-TW'],
    description: META_DESC[locale] || META_DESC['zh-TW'],
    keywords: '包車預約, 台灣包車, charter booking, Taiwan private car',
    robots: { index: false, follow: true },
  };
}

export default function CharterBookingPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <CharterBookingForm initialLang={locale} />;
}
