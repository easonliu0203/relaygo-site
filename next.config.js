/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'vlyhwegpvpnjyocqmfqc.supabase.co', pathname: '/storage/v1/object/public/**' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: '**.tiktokcdn.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
  compress: true,
  async redirects() {
    return [
      // Retired ko landing page (2026-09-26) — it duplicated the guide + /pricing.
      {
        source: '/ko/yehliu-shifen-jiufen-taxi-tour',
        destination: '/ko/guide/yehliu-shifen-jiufen',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
