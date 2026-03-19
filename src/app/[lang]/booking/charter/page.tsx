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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  return {
    title: META_TITLE[locale] || META_TITLE['zh-TW'],
  };
}

export default function CharterBookingPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <CharterBookingForm initialLang={locale} />;
}
