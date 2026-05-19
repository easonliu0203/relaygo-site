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

export interface TravelBookmark {
  id: string;
  url: string;
  platform: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  country_slug: string;
  city_slug: string;
  district: string | null;
  category: string;
  author: string | null;
  og_data: Record<string, unknown>;
  is_published: boolean;
  created_at: string;
  created_by: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

export async function getPublishedBookmarks(limit = 50): Promise<TravelBookmark[]> {
  return safeJson<TravelBookmark[]>(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&order=created_at.desc&limit=${limit}&select=*`,
    []
  );
}

export async function getBookmarksByCountry(countrySlug: string, limit = 50): Promise<TravelBookmark[]> {
  return safeJson<TravelBookmark[]>(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&order=created_at.desc&limit=${limit}&select=*`,
    []
  );
}

export async function getBookmarksByCity(countrySlug: string, citySlug: string, limit = 50): Promise<TravelBookmark[]> {
  return safeJson<TravelBookmark[]>(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&city_slug=eq.${encodeURIComponent(citySlug)}&order=created_at.desc&limit=${limit}&select=*`,
    []
  );
}

export async function getBookmarksByCityAndCategory(countrySlug: string, citySlug: string, category: string, limit = 50): Promise<TravelBookmark[]> {
  return safeJson<TravelBookmark[]>(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&city_slug=eq.${encodeURIComponent(citySlug)}&category=like.*${encodeURIComponent(category)}*&order=created_at.desc&limit=${limit}&select=*`,
    []
  );
}

/** Get distinct country+city+category combos that have bookmarks (for sitemap) */
export async function getBookmarkCombinations(): Promise<Array<{ country_slug: string; city_slug: string; category: string }>> {
  const rows = await safeJson<Array<{ country_slug: string; city_slug: string; category: string }>>(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&select=country_slug,city_slug,category`,
    []
  );
  // Deduplicate
  const seen = new Set<string>();
  return rows.filter((r) => {
    const key = `${r.country_slug}|${r.city_slug}|${r.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
