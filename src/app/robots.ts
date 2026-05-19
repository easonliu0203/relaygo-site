import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/bookmarks/*/*/*',
          '/*/bookmarks/*/*/*',
        ],
      },
    ],
    sitemap: 'https://relaygo.pro/sitemap.xml',
  };
}
