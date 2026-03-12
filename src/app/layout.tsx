import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './guide/[slug]/guide.css';

export const metadata: Metadata = {
  title: 'RelayGo - 專業包車服務平台 | Professional Charter Service',
  description: 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  keywords: 'RelayGo, 包車, charter service, 專業司機, 即時追蹤, 台灣包車, チャーターサービス',
  openGraph: {
    title: 'RelayGo - 專業包車服務平台',
    description: '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
    type: 'website',
    url: 'https://relaygo.pro',
    siteName: 'RelayGo',
    locale: 'zh_TW',
    images: [
      {
        url: 'https://relaygo.pro/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RelayGo 專業包車服務平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RelayGo - 專業包車服務平台',
    description: '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
    images: ['https://relaygo.pro/og-image.png'],
  },
  metadataBase: new URL('https://relaygo.pro'),
  alternates: {
    canonical: '/',
  },
  other: {
    'agd-partner-manual-verification': '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
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
              knowsLanguage: [
                'zh-TW', 'en', 'ja', 'ko', 'th', 'vi', 'ms',
              ],
              serviceType: [
                '機場接送',
                '包車旅遊',
                '商務用車',
                'Airport Transfer',
                'Charter Tour',
                'Business Transportation',
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
                      description:
                        '桃園(TPE)、松山(TSA)、台中(RMQ)、高雄(KHH) 四大機場接送',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '包車旅遊 Charter Tour',
                      description:
                        '6/8 小時包車旅遊，九份、日月潭、太魯閣、墾丁、阿里山等全台熱門景點',
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
