import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'RelayGo - 專業包車服務平台 | Professional Charter Service',
  description: 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  keywords: 'RelayGo, 包車, charter service, 專業司機, 即時追蹤, 台灣包車, チャーターサービス',
  openGraph: {
    title: 'RelayGo - 專業包車服務平台',
    description: '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
    type: 'website',
    url: 'https://relaygo.pro',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://emrld.cc/NTAzNDIx.js?t=503421"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
