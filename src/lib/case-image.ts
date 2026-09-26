// Service-case photos are stored as full-size originals (~350 KB each) but shown
// as small 4:3 cards, so they're served through Next's image optimizer at card
// widths. Only URLs from our Supabase Storage are rewritten (see next.config.js
// remotePatterns); anything else is returned untouched.
const STORAGE_PREFIX = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/storage/v1/object/public/';
const WIDTHS = [384, 640, 828]; // must be in Next's default imageSizes/deviceSizes

// Cards: 3 columns on desktop, 2 on tablet, full width on phones.
export const CASE_IMG_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

function optimized(url: string, w: number) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=70`;
}

export function caseImage(url: string): { src: string; srcSet?: string } {
  if (!url.startsWith(STORAGE_PREFIX)) return { src: url };
  return {
    src: optimized(url, 640),
    srcSet: WIDTHS.map((w) => `${optimized(url, w)} ${w}w`).join(', '),
  };
}
