import { MetadataRoute } from 'next';
import { getPublishedGuides } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getPublishedGuides();

  const guideEntries = guides.map((guide) => ({
    url: `https://relaygo.pro/guide/${guide.slug}`,
    lastModified: new Date(guide.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://relaygo.pro',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://relaygo.pro/guides',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://relaygo.pro/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...guideEntries,
  ];
}
