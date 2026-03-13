import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs, getPublishedGuides } from '@/lib/supabase';
import GuideContent from './GuideContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

interface Props {
  params: { lang: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  const langParams = locales.map((l) => localePathMap[l] || l);
  return langParams.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return { title: 'Not Found' };

  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const description = guide.description[locale] || guide.description['zh-TW'] || guide.description['en'] || '';
  const seg = localePathMap[locale];
  const canonical = seg
    ? `https://relaygo.pro/${seg}/guide/${params.slug}`
    : `https://relaygo.pro/guide/${params.slug}`;

  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro/guide/${params.slug}` };
  for (const l of locales) {
    const s = localePathMap[l];
    languages[l] = s ? `https://relaygo.pro/${s}/guide/${params.slug}` : `https://relaygo.pro/guide/${params.slug}`;
  }

  return {
    title: `${title} | RelayGo`,
    description,
    keywords: [
      '包車旅遊', '台灣包車', title,
      ...(guide.tags || []),
    ].join(', '),
    openGraph: {
      title: `${title} | RelayGo`,
      description,
      type: 'article',
      url: canonical,
      images: guide.cover_image ? [{ url: guide.cover_image, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

function guideJsonLd(guide: NonNullable<Awaited<ReturnType<typeof getGuideBySlug>>>, locale: Locale) {
  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const desc = guide.description[locale] || guide.description['zh-TW'] || guide.description['en'] || '';
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

function breadcrumbJsonLd(title: string, slug: string, langPrefix: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: '包車攻略', item: `https://relaygo.pro${langPrefix}/guides` },
      { '@type': 'ListItem', position: 3, name: title, item: `https://relaygo.pro${langPrefix}/guide/${slug}` },
    ],
  };
}

export default async function GuidePage({ params }: Props) {
  const locale = resolveLocale(params.lang);
  const [guide, allGuides] = await Promise.all([
    getGuideBySlug(params.slug),
    getPublishedGuides(),
  ]);
  if (!guide) notFound();

  const relatedGuides = allGuides.filter((g) => g.slug !== params.slug).slice(0, 3);
  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(title, params.slug, langPrefix)) }}
      />
      <GuideContent guide={guide} initialLang={locale} relatedGuides={relatedGuides} />
    </>
  );
}
