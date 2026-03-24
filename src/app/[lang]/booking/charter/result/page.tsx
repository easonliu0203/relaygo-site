import type { Metadata } from 'next';
import { resolveLocale, locales } from '@/lib/i18n-config';
import ResultContent from './ResultContent';

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: '付款結果 | RelayGo', robots: { index: false, follow: false } };
}

export default function ResultPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <ResultContent initialLang={locale} />;
}
