import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

export async function PATCH(req: Request) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { bookmark_id, user_id, description, country_slug, city_slug, district, category } = body;

    if (!bookmark_id || !user_id) {
      return NextResponse.json({ error: 'Missing bookmark_id or user_id' }, { status: 400 });
    }

    // Verify ownership: only the creator can edit
    const checkRes = await fetch(
      `${SUPABASE_URL}/travel_bookmarks?id=eq.${encodeURIComponent(bookmark_id)}&created_by=eq.${encodeURIComponent(user_id)}&select=id`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    const rows = await checkRes.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Not found or not authorized' }, { status: 403 });
    }

    // Build update payload — only include fields that were provided
    const update: Record<string, unknown> = {};
    if (description !== undefined) update.description = description || null;
    if (country_slug) update.country_slug = country_slug;
    if (city_slug) update.city_slug = city_slug;
    if (district !== undefined) update.district = district || null;
    if (category) update.category = category;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const res = await fetch(
      `${SUPABASE_URL}/travel_bookmarks?id=eq.${encodeURIComponent(bookmark_id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(update),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase update error:', err);
      return NextResponse.json({ error: 'Failed to update bookmark' }, { status: 500 });
    }

    const data = await res.json();

    // Revalidate
    try {
      revalidatePath('/[lang]/bookmarks', 'page');
      if (country_slug) revalidatePath(`/[lang]/bookmarks/${country_slug}`, 'page');
      if (city_slug) revalidatePath(`/[lang]/bookmarks/${country_slug}/${city_slug}`, 'page');
    } catch { /* best-effort */ }

    return NextResponse.json({ success: true, bookmark: data[0] });
  } catch (error) {
    console.error('Edit API error:', error);
    return NextResponse.json({ error: 'Failed to edit bookmark' }, { status: 500 });
  }
}
