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
    description: '包車旅遊常見問題：到府接送、司機素質、車輛合法性、費用說明、行程自訂、預約方式等。Charter service FAQ: pickup, driver quality, pricing, booking.',
    openGraph: {
      title: FAQ_TITLES[locale],
      description: '包車旅遊常見問題一次解答',
      type: 'website',
      url: canonical,
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
