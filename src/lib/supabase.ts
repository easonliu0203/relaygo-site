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

// Card-sized guide: everything the listing and "related guides" strips render,
// minus `content`. That one column holds the full article body in every locale,
// and pulling it into a list of 15 guides pushed ~1.1 MB of serialized props
// into the RSC payload of /guides and of every guide detail page.
export type TourGuideSummary = Omit<TourGuide, 'content'>;

const GUIDE_SUMMARY_COLUMNS =
  'id,slug,title,description,cover_image,duration_hours,city,tags,vehicle_type,is_published,sort_order,created_at,updated_at';

export async function getPublishedGuides(): Promise<TourGuideSummary[]> {
  return safeJson<TourGuideSummary[]>(
    `${SUPABASE_URL}/tour_guides?is_published=eq.true&order=sort_order.asc,created_at.desc&select=${GUIDE_SUMMARY_COLUMNS}`,
    []
  );
}

export interface PricingTables {
  airport: Record<string, { tpe: number; tsa: number; rmq: number; khh: number }>;
  charter: Record<string, { h6: number | null; h8: number | null; overtime: number }>;
}

// Fallback mirrors the figures the homepage ships statically, so a DB hiccup at
// build time degrades to stale-but-correct prices instead of an empty table.
const PRICING_FALLBACK: PricingTables = {
  airport: {
    S: { tpe: 1000, tsa: 900, rmq: 3700, khh: 7200 },
    M: { tpe: 1300, tsa: 1200, rmq: 3900, khh: 7500 },
    L: { tpe: 1800, tsa: 1800, rmq: 4600, khh: 8500 },
  },
  charter: {
    S: { h6: 3000, h8: 3900, overtime: 350 },
    M: { h6: null, h8: 4500, overtime: 450 },
    L: { h6: null, h8: 7500, overtime: 600 },
    XL: { h6: null, h8: 10000, overtime: 800 },
  },
};

interface AirportPriceRow {
  vehicle_type: string;
  tpe_price: number;
  tsa_price: number;
  rmq_price: number;
  khh_price: number;
}

interface CharterPriceRow {
  vehicle_type: string;
  duration_hours: number;
  base_price: number;
  overtime_rate: number;
}

// Server-side twin of /api/pricing. The API route fills the homepage table in
// the browser; this one puts the same numbers into the static HTML of /pricing
// so search engines actually see the prices they are asked to rank.
export async function getPricingTables(): Promise<PricingTables> {
  const [airportRows, charterRows] = await Promise.all([
    safeJson<AirportPriceRow[]>(
      `${SUPABASE_URL}/airport_transfer_pricing?is_active=eq.true&select=vehicle_type,tpe_price,tsa_price,rmq_price,khh_price`,
      []
    ),
    safeJson<CharterPriceRow[]>(
      `${SUPABASE_URL}/vehicle_pricing?is_active=eq.true&country=eq.TW&region=eq.default&select=vehicle_type,duration_hours,base_price,overtime_rate&order=vehicle_type,duration_hours`,
      []
    ),
  ]);

  if (!airportRows.length || !charterRows.length) return PRICING_FALLBACK;

  const airport: PricingTables['airport'] = {};
  for (const row of airportRows) {
    const cur = airport[row.vehicle_type];
    // Many regions map to one vehicle type — advertise the cheapest as the "from" price.
    airport[row.vehicle_type] = cur
      ? {
          tpe: Math.min(cur.tpe, row.tpe_price),
          tsa: Math.min(cur.tsa, row.tsa_price),
          rmq: Math.min(cur.rmq, row.rmq_price),
          khh: Math.min(cur.khh, row.khh_price),
        }
      : { tpe: row.tpe_price, tsa: row.tsa_price, rmq: row.rmq_price, khh: row.khh_price };
  }

  const charter: PricingTables['charter'] = {};
  for (const row of charterRows) {
    const cur = charter[row.vehicle_type] || { h6: null, h8: null, overtime: row.overtime_rate };
    if (row.duration_hours === 6) cur.h6 = row.base_price;
    if (row.duration_hours === 8) cur.h8 = row.base_price;
    cur.overtime = row.overtime_rate;
    charter[row.vehicle_type] = cur;
  }

  return { airport, charter };
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
