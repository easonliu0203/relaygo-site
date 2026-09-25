import { MetadataRoute } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import { getBookmarkCombinations } from '@/lib/bookmarks';
import { locales, localePathMap } from '@/lib/i18n-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, bmCombos] = await Promise.all([
    getPublishedGuides(),
    getBookmarkCombinations(),
  ]);
  const base = 'https://relaygo.pro';
  // Static pages get a fixed date, bumped by hand when their copy actually
  // changes. Using `new Date()` told Google every page changed on every deploy,
  // which trains it to ignore our lastmod entirely.
  const staticLastMod = new Date('2026-09-05');
  // Pages whose copy/metadata last changed (2026-09-25: en/ko SEO pass).
  const copyLastMod = new Date('2026-09-25');

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

    entries.push({
      url: `${base}${prefix || '/'}`,
      lastModified: copyLastMod,
      changeFrequency: 'daily',
      priority: locale === 'zh-TW' ? 1.0 : 0.9,
    });

    entries.push({
      url: `${base}${prefix}/guides`,
      lastModified: copyLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    entries.push({
      url: `${base}${prefix}/pricing`,
      lastModified: copyLastMod,
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    entries.push({
      url: `${base}${prefix}/taoyuan-airport-to-taipei`,
      lastModified: copyLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Korean-only keyword landing page ("예스진지 택시투어").
    if (locale === 'ko') {
      entries.push({
        url: `${base}/ko/yehliu-shifen-jiufen-taxi-tour`,
        lastModified: copyLastMod,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    entries.push({
      url: `${base}${prefix}/faq`,
      lastModified: copyLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    entries.push({
      url: `${base}${prefix}/cases`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    for (const guide of guides) {
      entries.push({
        url: `${base}${prefix}/guide/${guide.slug}`,
        lastModified: new Date(guide.updated_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    // Bookmarks main page
    entries.push({
      url: `${base}${prefix}/bookmarks`,
      lastModified: staticLastMod,
      changeFrequency: 'daily',
      priority: 0.8,
    });

    // Bookmarks sub-pages based on actual data — zh-TW only (other locales are
    // noindex: the posts themselves are Chinese, see bookmarks/[country]/page.tsx)
    if (locale !== 'zh-TW') continue;
    const countrySlugs = Array.from(new Set(bmCombos.map((c) => c.country_slug)));
    const cityCombos = Array.from(new Set(bmCombos.map((c) => `${c.country_slug}/${c.city_slug}`)));

    for (const country of countrySlugs) {
      entries.push({
        url: `${base}${prefix}/bookmarks/${country}`,
        lastModified: staticLastMod,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    for (const combo of cityCombos) {
      entries.push({
        url: `${base}${prefix}/bookmarks/${combo}`,
        lastModified: staticLastMod,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
