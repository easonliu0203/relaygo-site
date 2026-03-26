import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

/** Geocode an address string → { lat, lng } or null */
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const geoKey = process.env.GOOGLE_GEOCODING_KEY;
  if (!geoKey || !address) return null;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${geoKey}&language=zh-TW`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === 'OK' && data.results?.[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    console.log('[Geocoding] No results for:', address, 'status:', data.status);
    return null;
  } catch (e) {
    console.error('[Geocoding] Error:', e);
    return null;
  }
}

export async function POST(req: Request) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url, platform, title, description, thumbnail_url, country_slug, city_slug, district, category, og_data, author, created_by, address } = body;

    // Validation
    if (!url || !platform || !city_slug || !category) {
      return NextResponse.json({ error: 'Missing required fields: url, platform, city_slug, category' }, { status: 400 });
    }

    // Geocode address if provided
    let latitude: number | null = null;
    let longitude: number | null = null;
    if (address) {
      const coords = await geocodeAddress(address);
      if (coords) {
        latitude = coords.lat;
        longitude = coords.lng;
      }
    }

    const row = {
      url,
      platform,
      title: title || null,
      description: description || null,
      thumbnail_url: thumbnail_url || null,
      country_slug: country_slug || 'taiwan',
      city_slug,
      district: district || null,
      category,
      author: author || null,
      og_data: og_data || {},
      is_published: true,
      created_by: created_by || null,
      address: address || null,
      latitude,
      longitude,
    };

    const res = await fetch(`${SUPABASE_URL}/travel_bookmarks`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase insert error:', err);
      return NextResponse.json({ error: 'Failed to save bookmark' }, { status: 500 });
    }

    const data = await res.json();

    // Revalidate bookmark pages so the new card shows immediately
    const cs = row.country_slug;
    const cty = row.city_slug;
    const cat = row.category;
    try {
      revalidatePath('/[lang]/bookmarks', 'page');
      revalidatePath(`/[lang]/bookmarks/${cs}`, 'page');
      revalidatePath(`/[lang]/bookmarks/${cs}/${cty}`, 'page');
      revalidatePath(`/[lang]/bookmarks/${cs}/${cty}/${cat}`, 'page');
    } catch { /* revalidation is best-effort */ }

    return NextResponse.json({ success: true, bookmark: data[0] });
  } catch (error) {
    console.error('Submit API error:', error);
    return NextResponse.json({ error: 'Failed to submit bookmark' }, { status: 500 });
  }
}
