import { Metadata } from 'next';
import FAQContent from './FAQContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';
import { FAQS, type LangCode } from '@/lib/faq-data';

const FAQ_TITLES: Record<Locale, string> = {
  'zh-TW': '常見問題 FAQ | RelayGo 包車服務',
  'zh-CN': '常见问题 FAQ | RelayGo 包车服务',
  en: 'FAQ | RelayGo Charter Service',
  ja: 'よくある質問 | RelayGo チャーターサービス',
  ko: '자주 묻는 질문 | RelayGo 차터 서비스',
  th: 'คำถามที่พบบ่อย | RelayGo บริการรถเหมา',
  vi: 'Câu hỏi thường gặp | RelayGo Dịch vụ xe riêng',
  ms: 'Soalan Lazim | RelayGo Perkhidmatan Sewa Kenderaan',
  id: 'FAQ | RelayGo Layanan Sewa Mobil',
  fil: 'FAQ | RelayGo Serbisyo ng Charter Car',
};

const FAQ_DESCS: Record<Locale, string> = {
  'zh-TW': '包車旅遊常見問題：到府接送、司機素質、車輛合法性、費用說明、行程自訂、預約方式等。',
  'zh-CN': '包车旅游常见问题：上门接送、司机素质、车辆合法性、费用说明、行程自定、预约方式等。',
  en: 'Charter service FAQ: door-to-door pickup, driver quality, vehicle legality, pricing, itinerary customization, booking methods.',
  ja: 'チャーターサービスFAQ：送迎、ドライバーの質、車両の安全性、料金、行程カスタマイズ、予約方法。',
  ko: '차터 서비스 FAQ: 숙소 픽업, 기사 품질, 차량 안전, 요금, 일정 맞춤, 예약 방법.',
  th: 'คำถามที่พบบ่อยเกี่ยวกับบริการรถเหมา: รับ-ส่งถึงที่ คุณภาพคนขับ ความปลอดภัยรถ ค่าบริการ ปรับแต่งเส้นทาง วิธีจอง',
  vi: 'FAQ dịch vụ xe riêng: đón tận nơi, chất lượng tài xế, xe hợp pháp, giá cả, tùy chỉnh lộ trình, cách đặt xe.',
  ms: 'FAQ perkhidmatan charter: jemput dari pintu ke pintu, kualiti pemandu, keselamatan kenderaan, harga, penyesuaian jadual, kaedah tempahan.',
  id: 'FAQ layanan charter: jemput di lokasi, kualitas pengemudi, keamanan kendaraan, harga, kustomisasi rute, cara pemesanan.',
  fil: 'FAQ ng charter service: door-to-door pickup, kalidad ng driver, ligalidad ng sasakyan, presyo, pag-customize ng ruta, paraan ng pag-book.',
};

const BREADCRUMB_HOME: Record<Locale, string> = {
  'zh-TW': 'RelayGo', 'zh-CN': 'RelayGo', en: 'RelayGo', ja: 'RelayGo',
  ko: 'RelayGo', th: 'RelayGo', vi: 'RelayGo', ms: 'RelayGo', id: 'RelayGo', fil: 'RelayGo',
};

const BREADCRUMB_FAQ: Record<Locale, string> = {
  'zh-TW': '常見問題', 'zh-CN': '常见问题', en: 'FAQ', ja: 'よくある質問',
  ko: '자주 묻는 질문', th: 'คำถามที่พบบ่อย', vi: 'Câu hỏi thường gặp', ms: 'Soalan Lazim',
  id: 'Pertanyaan Umum', fil: 'Mga Madalas na Tanong',
};

function buildFaqAlternates() {
  const languages: Record<string, string> = { 'x-default': 'https://relaygo.pro/faq' };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}/faq` : 'https://relaygo.pro/faq';
  }
  return languages;
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/faq` : 'https://relaygo.pro/faq';

  return {
    title: FAQ_TITLES[locale],
    description: FAQ_DESCS[locale],
    openGraph: {
      title: FAQ_TITLES[locale],
      description: FAQ_DESCS[locale],
      type: 'website',
      url: canonical,
      locale: locale.replace('-', '_'),
    },
    alternates: {
      canonical,
      languages: buildFaqAlternates(),
    },
  };
}

function faqPageJsonLd(locale: Locale) {
  const lang = locale as LangCode;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question[lang] || faq.question['zh-TW'],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[lang] || faq.answer['zh-TW'],
      },
    })),
  };
}

function breadcrumbJsonLd(locale: Locale) {
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BREADCRUMB_HOME[locale], item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB_FAQ[locale], item: `https://relaygo.pro${langPrefix}/faq` },
    ],
  };
}

export default function FAQPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale)) }}
      />
      <FAQContent initialLang={locale} />
    </>
  );
}
