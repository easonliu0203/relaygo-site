import { NextResponse } from 'next/server';
import { getServiceCases } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? Math.max(1, Math.min(50, parseInt(limitParam, 10))) : undefined;

  try {
    const cases = await getServiceCases(limit);
    return NextResponse.json({ cases });
  } catch (error) {
    console.error('Cases API error:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
