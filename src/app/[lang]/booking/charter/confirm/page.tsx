import type { Metadata } from 'next';
import { resolveLocale, locales } from '@/lib/i18n-config';
import ConfirmContent from './ConfirmContent';

export function generateStaticParams() {
  return locales.map((l) => ({
    lang: l === 'zh-TW' ? 'zh-TW' : l === 'zh-CN' ? 'zh-cn' : l,
  }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const titles: Record<string, string> = {
    'zh-TW': '確認訂單 | RelayGo', 'zh-CN': '确认订单 | RelayGo', en: 'Confirm Order | RelayGo',
  };
  return { title: titles[locale] || titles['zh-TW'] };
}

export default function ConfirmPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return <ConfirmContent initialLang={locale} />;
}
