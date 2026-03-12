import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/supabase';
import GuideContent from './GuideContent';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return { title: 'Not Found' };

  const title = guide.title['zh-TW'] || guide.title['en'] || '';
  const description = guide.description['zh-TW'] || guide.description['en'] || '';

  return {
    title: `${title} | RelayGo 包車攻略`,
    description,
    keywords: [
      '包車旅遊', '台灣包車', title,
      ...(guide.tags || []),
    ].join(', '),
    openGraph: {
      title: `${title} | RelayGo`,
      description,
      type: 'article',
      url: `https://relaygo.pro/guide/${params.slug}`,
      images: guide.cover_image ? [{ url: guide.cover_image, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: `https://relaygo.pro/guide/${params.slug}`,
    },
  };
}

function guideJsonLd(guide: NonNullable<Awaited<ReturnType<typeof getGuideBySlug>>>) {
  const title = guide.title['zh-TW'] || guide.title['en'] || '';
  const desc = guide.description['zh-TW'] || guide.description['en'] || '';
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: title,
    description: desc,
    touristType: '包車旅遊',
    image: guide.cover_image || '',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TWD',
    },
    provider: {
      '@type': 'Organization',
      name: 'RelayGo',
      url: 'https://relaygo.pro',
    },
  };
}

function breadcrumbJsonLd(title: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: 'https://relaygo.pro' },
      { '@type': 'ListItem', position: 2, name: '包車攻略', item: 'https://relaygo.pro/guides' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://relaygo.pro/guide/${slug}` },
    ],
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) notFound();

  const title = guide.title['zh-TW'] || guide.title['en'] || '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(title, params.slug)) }}
      />
      <GuideContent guide={guide} />
    </>
  );
}
