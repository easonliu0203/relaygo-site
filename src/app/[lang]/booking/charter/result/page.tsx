import type { Metadata } from 'next';
import { resolveLocale, locales } from '@/lib/i18n-config';
import ResultContent from './ResultContent';

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const titles: Record<string, string> = {
    'zh-TW': '付款結果 | RelayGo', 'zh-CN': '付款结果 | RelayGo', en: 'Payment Result | RelayGo',
    ja: 'お支払い結果 | RelayGo', ko: '결제 결과 | RelayGo', th: 'ผลการชำระเงิน | RelayGo',
    vi: 'Kết quả thanh toán | RelayGo', ms: 'Keputusan Pembayaran | RelayGo',
    id: 'Hasil Pembayaran | RelayGo', fil: 'Resulta ng Bayad | RelayGo',
  };
  return { title: titles[locale] || titles['zh-TW'], robots: { index: false, follow: false } };
}

export default function ResultPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <ResultContent initialLang={locale} />;
}
