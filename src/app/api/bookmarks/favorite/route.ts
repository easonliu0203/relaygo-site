import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

function getHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

/** GET — get user's favorite bookmark IDs */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  if (!userId) return NextResponse.json({ error: 'user_id required' }, { status: 400 });

  const res = await fetch(
    `${SUPABASE_URL}/user_favorites?user_id=eq.${encodeURIComponent(userId)}&select=bookmark_id`,
    { headers: getHeaders() }
  );
  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  const data: Array<{ bookmark_id: string }> = await res.json();
  return NextResponse.json({ ids: data.map((r) => r.bookmark_id) });
}

/** POST — add favorite */
export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, bookmark_id } = body;
  if (!user_id || !bookmark_id) return NextResponse.json({ error: 'user_id and bookmark_id required' }, { status: 400 });

  const res = await fetch(`${SUPABASE_URL}/user_favorites`, {
    method: 'POST',
    headers: { ...getHeaders(), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ user_id, bookmark_id }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('Favorite add error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

/** DELETE — remove favorite */
export async function DELETE(req: Request) {
  const body = await req.json();
  const { user_id, bookmark_id } = body;
  if (!user_id || !bookmark_id) return NextResponse.json({ error: 'user_id and bookmark_id required' }, { status: 400 });

  const res = await fetch(
    `${SUPABASE_URL}/user_favorites?user_id=eq.${encodeURIComponent(user_id)}&bookmark_id=eq.${encodeURIComponent(bookmark_id)}`,
    { method: 'DELETE', headers: getHeaders() }
  );
  if (!res.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}
