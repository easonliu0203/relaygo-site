import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { locales, localePathMap } from '@/lib/i18n-config';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * On-demand revalidation endpoint for service cases.
 * Called by the admin after create / update / delete.
 *
 * No auth: this only invalidates cache (idempotent, non-destructive).
 * Worst case from abuse is forcing a fresh Supabase fetch on the next visit.
 */
async function handle() {
  try {
    revalidateTag('service-cases');

    // Also revalidate the /cases page for every locale (defensive: covers the
    // rare case where a tag miss could keep an old page version cached).
    for (const locale of locales) {
      const seg = localePathMap[locale];
      const path = seg ? `/${seg}/cases` : '/cases';
      revalidatePath(path);
    }

    return NextResponse.json({ ok: true, revalidatedAt: Date.now() }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Revalidation failed' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export const POST = handle;
export const GET = handle;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
