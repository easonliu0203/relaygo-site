const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

function getHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
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
}

export async function getPublishedBookmarks(limit = 50): Promise<TravelBookmark[]> {
  const res = await fetch(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&order=created_at.desc&limit=${limit}&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getBookmarksByCountry(countrySlug: string, limit = 50): Promise<TravelBookmark[]> {
  const res = await fetch(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&order=created_at.desc&limit=${limit}&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getBookmarksByCity(countrySlug: string, citySlug: string, limit = 50): Promise<TravelBookmark[]> {
  const res = await fetch(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&city_slug=eq.${encodeURIComponent(citySlug)}&order=created_at.desc&limit=${limit}&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getBookmarksByCityAndCategory(countrySlug: string, citySlug: string, category: string, limit = 50): Promise<TravelBookmark[]> {
  const res = await fetch(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&country_slug=eq.${encodeURIComponent(countrySlug)}&city_slug=eq.${encodeURIComponent(citySlug)}&category=eq.${encodeURIComponent(category)}&order=created_at.desc&limit=${limit}&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

/** Get distinct country+city+category combos that have bookmarks (for sitemap) */
export async function getBookmarkCombinations(): Promise<Array<{ country_slug: string; city_slug: string; category: string }>> {
  const res = await fetch(
    `${SUPABASE_URL}/travel_bookmarks?is_published=eq.true&select=country_slug,city_slug,category`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const rows: Array<{ country_slug: string; city_slug: string; category: string }> = await res.json();
  // Deduplicate
  const seen = new Set<string>();
  return rows.filter((r) => {
    const key = `${r.country_slug}|${r.city_slug}|${r.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
