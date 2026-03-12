import { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: '常見問題 FAQ | RelayGo 包車服務',
  description:
    '包車旅遊常見問題：到府接送、司機素質、車輛合法性、費用說明、行程自訂、預約方式等。Charter service FAQ: pickup, driver quality, pricing, booking.',
  openGraph: {
    title: '常見問題 FAQ | RelayGo',
    description: '包車旅遊常見問題一次解答',
    type: 'website',
    url: 'https://relaygo.pro/faq',
  },
  alternates: {
    canonical: 'https://relaygo.pro/faq',
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
