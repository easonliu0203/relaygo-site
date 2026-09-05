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

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

    entries.push({
      url: `${base}${prefix || '/'}`,
      lastModified: staticLastMod,
      changeFrequency: 'daily',
      priority: locale === 'zh-TW' ? 1.0 : 0.9,
    });

    entries.push({
      url: `${base}${prefix}/guides`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    entries.push({
      url: `${base}${prefix}/pricing`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    entries.push({
      url: `${base}${prefix}/faq`,
      lastModified: staticLastMod,
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

    // Bookmarks sub-pages based on actual data
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
