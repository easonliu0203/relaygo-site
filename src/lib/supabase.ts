const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const FETCH_TIMEOUT_MS = 8000;

function getHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

async function safeJson<T>(url: string, fallback: T): Promise<T> {
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
      signal: ctrl.signal,
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface TourGuide {
  id: string;
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  content: Record<string, string>;
  cover_image: string | null;
  duration_hours: number;
  city: string;
  tags: string[];
  vehicle_type: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function getPublishedGuides(): Promise<TourGuide[]> {
  return safeJson<TourGuide[]>(
    `${SUPABASE_URL}/tour_guides?is_published=eq.true&order=sort_order.asc,created_at.desc&select=*`,
    []
  );
}

export async function getGuideBySlug(slug: string): Promise<TourGuide | null> {
  const data = await safeJson<TourGuide[]>(
    `${SUPABASE_URL}/tour_guides?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=*`,
    []
  );
  return data[0] || null;
}

export async function getAllGuideSlugs(): Promise<string[]> {
  const data = await safeJson<{ slug: string }[]>(
    `${SUPABASE_URL}/tour_guides?is_published=eq.true&select=slug`,
    []
  );
  return data.map((r) => r.slug);
}

export interface ServiceCase {
  id: string;
  photo_url: string;
  captions: Record<string, string>;
  alt_text: string | null;
  sort_order: number;
}

export async function getServiceCases(limit?: number): Promise<ServiceCase[]> {
  const cap = typeof limit === 'number' ? `&limit=${limit}` : '';
  const url = `${SUPABASE_URL}/service_cases?is_published=eq.true&order=sort_order.asc,created_at.desc&select=id,photo_url,captions,alt_text,sort_order${cap}`;
  // Short revalidate so admin edits show up within 60s; also tag for on-demand revalidation.
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, {
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '', Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}` },
      next: { revalidate: 60, tags: ['service-cases'] },
      signal: ctrl.signal,
    });
    if (!res.ok) return [];
    return (await res.json()) as ServiceCase[];
  } catch {
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

export function localizedCaption(c: ServiceCase, lang: string): string {
  return c.captions[lang] || c.captions['en'] || c.captions['zh-TW'] || '';
}
