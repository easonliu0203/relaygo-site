import type { Metadata } from 'next';
import { resolveLocale, locales, type Locale } from '@/lib/i18n-config';
import CharterBookingForm from './CharterBookingForm';

const META_KEYWORDS: Record<string, string> = {
  'zh-TW': '包車預約, 台灣包車, charter booking, Taiwan private car',
  'zh-CN': '包车预约, 台湾包车, charter booking',
  en: 'charter booking, Taiwan private car, Taiwan tour, hire driver Taiwan',
  ja: 'チャーター予約, 台湾チャーター, 台湾貸切車',
  ko: '전세 예약, 대만 전용차, 대만 투어',
  th: 'จองรถเหมา, รถเหมาไต้หวัน, ทัวร์ไต้หวัน',
  vi: 'đặt xe charter, xe riêng Đài Loan, tour Đài Loan',
  ms: 'tempahan charter, kereta sewa Taiwan, lawatan Taiwan',
  id: 'pemesanan charter, mobil charter Taiwan, tur Taiwan',
  fil: 'charter booking, private car Taiwan, tour Taiwan',
};

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
  'zh-CN': '在线预约台湾包车旅游，专业司机、即时追踪、多元支付。选择车型、日期和行程，轻松完成预约。',
  en: 'Book a private charter car in Taiwan online. Professional drivers, real-time tracking, multiple payment options.',
  ja: '台湾のチャーター車をオンライン予約。プロドライバー、リアルタイム追跡、多様な決済方法。',
  ko: '대만 전용차를 온라인으로 예약하세요. 전문 기사, 실시간 추적, 다양한 결제 수단.',
  th: 'จองรถเหมาส่วนตัวในไต้หวันออนไลน์ คนขับมืออาชีพ ติดตามแบบเรียลไทม์ ชำระเงินหลายช่องทาง',
  vi: 'Đặt xe riêng tại Đài Loan trực tuyến. Tài xế chuyên nghiệp, theo dõi thời gian thực, nhiều phương thức thanh toán.',
  ms: 'Tempah kereta sewa persendirian di Taiwan secara dalam talian. Pemandu profesional, penjejakan masa nyata, pelbagai pilihan pembayaran.',
  id: 'Pesan mobil charter pribadi di Taiwan secara online. Pengemudi profesional, pelacakan real-time, berbagai opsi pembayaran.',
  fil: 'Mag-book ng pribadong charter car sa Taiwan online. Propesyonal na driver, real-time tracking, iba\'t ibang paraan ng pagbabayad.',
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  return {
    title: META_TITLE[locale] || META_TITLE['zh-TW'],
    description: META_DESC[locale] || META_DESC['zh-TW'],
    keywords: META_KEYWORDS[locale] || '包車預約, 台灣包車, charter booking, Taiwan private car',
    robots: { index: false, follow: true },
  };
}

export default function CharterBookingPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <CharterBookingForm initialLang={locale} />;
}
