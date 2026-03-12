const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

function getHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
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
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?is_published=eq.true&order=sort_order.asc,created_at.desc&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getGuideBySlug(slug: string): Promise<TourGuide | null> {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=*`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

export async function getAllGuideSlugs(): Promise<string[]> {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?is_published=eq.true&select=slug`,
    { headers: getHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((r: { slug: string }) => r.slug);
}
