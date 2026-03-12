import { Metadata } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import GuidesListContent from './GuidesListContent';

export const metadata: Metadata = {
  title: '包車攻略 | RelayGo - 台灣包車旅遊路線推薦',
  description: '精選台灣包車旅遊路線攻略，九份、日月潭、清境、墾丁、花蓮太魯閣等熱門景點，專業司機帶路，行程規劃一次搞定。',
  keywords: '台灣包車攻略, 包車旅遊路線, 九份包車, 日月潭包車, 花蓮包車, charter tour Taiwan',
  openGraph: {
    title: '包車攻略 | RelayGo',
    description: '精選台灣包車旅遊路線攻略，專業司機帶路',
    type: 'website',
    url: 'https://relaygo.pro/guides',
  },
  alternates: {
    canonical: 'https://relaygo.pro/guides',
  },
};

export default async function GuidesPage() {
  const guides = await getPublishedGuides();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '包車攻略',
    description: '精選台灣包車旅遊路線攻略',
    url: 'https://relaygo.pro/guides',
    provider: {
      '@type': 'Organization',
      name: 'RelayGo',
      url: 'https://relaygo.pro',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidesListContent guides={guides} />
    </>
  );
}
