import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

export async function POST(req: Request) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url, platform, title, description, thumbnail_url, country_slug, city_slug, district, category, og_data, author } = body;

    // Validation
    if (!url || !platform || !city_slug || !category) {
      return NextResponse.json({ error: 'Missing required fields: url, platform, city_slug, category' }, { status: 400 });
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
