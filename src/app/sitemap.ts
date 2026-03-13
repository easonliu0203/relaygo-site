import { MetadataRoute } from 'next';
import { getPublishedGuides } from '@/lib/supabase';
import { locales, localePathMap } from '@/lib/i18n-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getPublishedGuides();
  const base = 'https://relaygo.pro';

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

    entries.push({
      url: `${base}${prefix || '/'}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: locale === 'zh-TW' ? 1.0 : 0.9,
    });

    entries.push({
      url: `${base}${prefix}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    entries.push({
      url: `${base}${prefix}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
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
  }

  return entries;
}
