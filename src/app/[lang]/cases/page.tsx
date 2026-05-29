import { Metadata } from 'next';
import { getServiceCases } from '@/lib/supabase';
import CasesContent from './CasesContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';
import { I18N } from '@/lib/i18n';

// Re-render at most once per minute so admin updates show up promptly.
// Combined with on-demand revalidation via /api/revalidate-cases when admin saves.
export const revalidate = 60;

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

const CASES_TITLES: Record<Locale, string> = {
  'zh-TW': '實際服務案例｜RelayGo 真實旅程紀錄',
  'zh-CN': '实际服务案例｜RelayGo 真实旅程记录',
  en: 'Real Service Cases | RelayGo Actual Trip Records',
  ja: '実際のサービス事例｜RelayGo 旅のリアル記録',
  ko: '실제 서비스 사례｜RelayGo 진짜 여행 기록',
  th: 'กรณีศึกษาบริการจริง｜RelayGo บันทึกการเดินทาง',
  vi: 'Trường hợp dịch vụ thực tế｜RelayGo Ghi chép hành trình thật',
  ms: 'Kes Perkhidmatan Sebenar｜RelayGo Rekod Perjalanan',
  id: 'Kasus Layanan Nyata｜RelayGo Catatan Perjalanan',
  fil: 'Tunay na Mga Kaso ng Serbisyo｜RelayGo Rekord ng Biyahe',
};

const CASES_DESCS: Record<Locale, string> = {
  'zh-TW': 'RelayGo 真實的旅客服務紀錄：機場接送、包車旅遊、各國旅客的實際旅程。為保護客戶隱私，所有人臉皆已馬賽克處理。',
  'zh-CN': 'RelayGo 真实的旅客服务记录：机场接送、包车旅游、各国旅客的实际旅程。为保护客户隐私，所有人脸皆已马赛克处理。',
  en: 'Real customer service records from RelayGo: airport transfers, charter tours, trips with travelers from around the world. All faces in photos are mosaiced to protect customer privacy.',
  ja: 'RelayGo の実際のお客様サービス事例：空港送迎、チャーターツアー、各国からのお客様の旅程記録。プライバシー保護のため、すべての顔をモザイク処理しています。',
  ko: 'RelayGo 실제 고객 서비스 기록: 공항 픽업, 전세 투어, 각국 여행객의 실제 여정. 고객 프라이버시 보호를 위해 모든 얼굴이 모자이크 처리되었습니다.',
  th: 'บันทึกบริการลูกค้าจริงจาก RelayGo: รับ-ส่งสนามบิน เช่ารถพร้อมคนขับ การเดินทางของนักท่องเที่ยวจากทั่วโลก ใบหน้าทุกคนถูกเซ็นเซอร์เพื่อปกป้องความเป็นส่วนตัว',
  vi: 'Ghi chép dịch vụ khách hàng thực tế của RelayGo: đưa đón sân bay, thuê xe có tài xế, hành trình của du khách từ khắp nơi. Mọi khuôn mặt trong ảnh đều đã được làm mờ để bảo vệ quyền riêng tư.',
  ms: 'Rekod perkhidmatan pelanggan sebenar RelayGo: pemindahan lapangan terbang, sewa kereta, perjalanan pelancong dari seluruh dunia. Semua wajah dalam foto dimosaik untuk melindungi privasi.',
  id: 'Catatan layanan pelanggan nyata RelayGo: antar-jemput bandara, sewa mobil, perjalanan wisatawan dari berbagai negara. Semua wajah dalam foto disensor untuk melindungi privasi.',
  fil: 'Tunay na rekord ng serbisyo sa customer mula sa RelayGo: airport transfer, charter tour, biyahe ng mga turistang galing sa iba’t ibang bansa. Lahat ng mukha sa larawan ay na-mosaic para protektahan ang privacy.',
};

const CASES_KEYWORDS: Record<Locale, string> = {
  'zh-TW': 'RelayGo 實際案例, 包車服務案例, 機場接送案例, 台灣包車旅遊, 真實旅客評價, 包車服務見證',
  'zh-CN': 'RelayGo 实际案例, 包车服务案例, 机场接送案例, 台湾包车旅游, 真实旅客评价',
  en: 'RelayGo real cases, charter service cases, airport transfer testimonials, Taiwan charter tour reviews, real customer trips',
  ja: 'RelayGo 実際事例, チャーターサービス事例, 空港送迎事例, 台湾チャータージャー旅行, 実際のお客様',
  ko: 'RelayGo 실제 사례, 차터 서비스 사례, 공항 픽업 후기, 대만 차터 투어 후기',
  th: 'RelayGo เคสจริง, บริการเช่ารถเคสจริง, รับส่งสนามบินรีวิว, ทัวร์รถเหมาไต้หวันรีวิว',
  vi: 'RelayGo trường hợp thực tế, dịch vụ thuê xe thực tế, đánh giá đưa đón sân bay, tour thuê xe Đài Loan',
  ms: 'RelayGo kes sebenar, kes sewa kereta, testimoni pemindahan lapangan terbang, ulasan charter Taiwan',
  id: 'RelayGo kasus nyata, kasus sewa mobil, testimoni antar-jemput bandara, ulasan charter Taiwan',
  fil: 'RelayGo tunay na kaso, charter service cases, airport transfer testimonials, Taiwan charter reviews',
};

function buildCasesAlternates() {
  const languages: Record<string, string> = { 'x-default': 'https://relaygo.pro/cases' };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}/cases` : 'https://relaygo.pro/cases';
  }
  return languages;
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/cases` : 'https://relaygo.pro/cases';

  return {
    title: CASES_TITLES[locale],
    description: CASES_DESCS[locale],
    keywords: CASES_KEYWORDS[locale],
    openGraph: {
      title: CASES_TITLES[locale],
      description: CASES_DESCS[locale],
      type: 'website',
      url: canonical,
      locale: locale.replace('-', '_'),
    },
    alternates: {
      canonical,
      languages: buildCasesAlternates(),
    },
  };
}

export default async function CasesPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  const cases = await getServiceCases();
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const dict = I18N[locale] || I18N['zh-TW'];

  const pageName = CASES_TITLES[locale].split('｜')[0].split(' | ')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageName,
    description: CASES_DESCS[locale],
    url: `https://relaygo.pro${langPrefix}/cases`,
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
      { '@type': 'ListItem', position: 2, name: pageName, item: `https://relaygo.pro${langPrefix}/cases` },
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
      <CasesContent
        cases={cases}
        locale={locale}
        langPrefix={langPrefix}
        labels={{
          title: dict.cases_title || '真實服務紀錄',
          desc: dict.cases_desc || '為保護客戶隱私，照片中所有人臉皆已馬賽克處理。',
          empty: dict.cases_empty || '案例陸續更新中。',
          home: dict.nav_services ? (dict.nav_services as string) : 'Home',
        }}
      />
    </>
  );
}
