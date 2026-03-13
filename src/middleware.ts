import { NextRequest, NextResponse } from 'next/server';
import { localePrefixes } from '@/lib/i18n-config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, _next, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const hasLocale = localePrefixes.some(
    (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // No locale prefix → rewrite to /zh-TW/... (default locale) internally
  const url = request.nextUrl.clone();
  url.pathname = `/zh-TW${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
