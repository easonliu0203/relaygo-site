import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import './guide/[slug]/guide.css';
import './faq/faq.css';
import {
  locales,
  localePathMap,
  resolveLocale,
  htmlLang,
  type Locale,
} from '@/lib/i18n-config';
import { LANG_TITLES } from '@/lib/i18n';

interface Props {
  params: { lang: string };
  children: React.ReactNode;
}

const LOCALE_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  'zh-CN': 'RelayGo 提供专业包车服务，安全可靠的司机、即时追踪、多元支付方式。立即下载 App 开始预约！',
  en: 'RelayGo offers professional charter car service in Taiwan. Safe drivers, real-time tracking, multiple payment options. Download the app to book now!',
  ja: 'RelayGoは台湾の専門チャーターサービスです。安全なドライバー、リアルタイム追跡、多様な決済方法。アプリをダウンロードして予約しましょう！',
  ko: 'RelayGo는 대만 전문 차터 서비스입니다. 안전한 기사, 실시간 추적, 다양한 결제 방식. 앱을 다운로드하여 예약하세요!',
  th: 'RelayGo ให้บริการรถเหมามืออาชีพในไต้หวัน คนขับปลอดภัย ติดตามแบบเรียลไทม์ หลายช่องทางชำระเงิน ดาวน์โหลดแอปเพื่อจองเลย!',
  vi: 'RelayGo cung cấp dịch vụ thuê xe riêng chuyên nghiệp tại Đài Loan. Tài xế an toàn, theo dõi thời gian thực, nhiều phương thức thanh toán. Tải ứng dụng để đặt xe ngay!',
  ms: 'RelayGo menawarkan perkhidmatan sewa kenderaan profesional di Taiwan. Pemandu selamat, penjejakan masa nyata, pelbagai kaedah pembayaran. Muat turun aplikasi untuk menempah sekarang!',
};

const OG_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
  'zh-CN': '安全可靠的专业包车服务，即时追踪、多元支付、AI 旅游规划',
  en: 'Safe & reliable charter service with real-time tracking, multiple payment options & AI travel planning',
  ja: '安全で信頼できるチャーターサービス。リアルタイム追跡・多様な決済・AI旅行プランニング',
  ko: '안전하고 신뢰할 수 있는 차터 서비스. 실시간 추적, 다양한 결제, AI 여행 플래닝',
  th: 'บริการรถเหมาปลอดภัยและเชื่อถือได้ ติดตามแบบเรียลไทม์ หลายช่องทางชำระเงิน และ AI วางแผนเที่ยว',
  vi: 'Dịch vụ xe riêng an toàn và đáng tin cậy, theo dõi thời gian thực, nhiều phương thức thanh toán & AI lên kế hoạch du lịch',
  ms: 'Perkhidmatan sewa kenderaan selamat & boleh dipercayai dengan penjejakan masa nyata, pelbagai kaedah pembayaran & perancangan perjalanan AI',
};

function buildAlternates(path: string = '') {
  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro${path || '/'}` };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    const url = seg ? `https://relaygo.pro/${seg}${path}` : `https://relaygo.pro${path || '/'}`;
    languages[locale] = url;
  }
  return languages;
}

export async function generateStaticParams() {
  return locales.map((lang) => {
    const seg = localePathMap[lang];
    return { lang: seg || lang };
  });
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const title = LANG_TITLES[locale] || LANG_TITLES['zh-TW'];
  const description = LOCALE_DESCRIPTIONS[locale];
  const ogDesc = OG_DESCRIPTIONS[locale];
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/` : 'https://relaygo.pro/';

  return {
    title,
    description,
    keywords: 'RelayGo, 包車, charter service, 專業司機, 即時追蹤, 台灣包車, チャーターサービス',
    openGraph: {
      title,
      description: ogDesc,
      type: 'website',
      url: canonical,
      siteName: 'RelayGo',
      locale: locale.replace('-', '_'),
      images: [
        {
          url: 'https://relaygo.pro/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDesc,
      images: ['https://relaygo.pro/og-image.png'],
    },
    metadataBase: new URL('https://relaygo.pro'),
    alternates: {
      canonical,
      languages: buildAlternates(),
    },
    other: {
      'agd-partner-manual-verification': '',
    },
  };
}

export default function LangLayout({ children, params }: Props) {
  const locale = resolveLocale(params.lang);

  return (
    <html lang={htmlLang(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://emrld.cc/NTAzNDIx.js?t=503421"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'RelayGo',
              url: 'https://relaygo.pro',
              logo: 'https://relaygo.pro/og-image.png',
              description:
                '台灣專業包車服務平台，提供機場接送、包車旅遊、商務用車服務。App 內建多語翻譯（中/英/日/韓/泰/越/馬來文）。Professional charter car service in Taiwan with built-in multilingual translation (Chinese, English, Japanese, Korean, Thai, Vietnamese, Malay).',
              foundingDate: '2024',
              areaServed: {
                '@type': 'Country',
                name: 'Taiwan',
              },
              knowsLanguage: ['zh-TW', 'en', 'ja', 'ko', 'th', 'vi', 'ms'],
              serviceType: [
                '機場接送', '包車旅遊', '商務用車',
                'Airport Transfer', 'Charter Tour', 'Business Transportation',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'RelayGo 包車服務',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '機場接送 Airport Transfer',
                      description: '桃園(TPE)、松山(TSA)、台中(RMQ)、高雄(KHH) 四大機場接送',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '包車旅遊 Charter Tour',
                      description: '6/8 小時包車旅遊，九份、日月潭、太魯閣、墾丁、阿里山等全台熱門景點',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '商務用車 Business Transportation',
                      description: '企業用車、會議接送、VIP 商務包車',
                    },
                  },
                ],
              },
              sameAs: [
                'https://apps.apple.com/app/relaygo/id6670425865',
                'https://play.google.com/store/apps/details?id=com.relaygo.customer',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
