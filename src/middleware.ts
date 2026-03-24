import { NextRequest, NextResponse } from 'next/server';
import { localePrefixes, localePathMap } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';

// Browser language → our locale mapping
const LANG_MAP: Record<string, Locale> = {
  'zh-tw': 'zh-TW', 'zh-hant': 'zh-TW', 'zh': 'zh-TW',
  'zh-cn': 'zh-CN', 'zh-hans': 'zh-CN',
  'en': 'en', 'en-us': 'en', 'en-gb': 'en',
  'ja': 'ja', 'ja-jp': 'ja',
  'ko': 'ko', 'ko-kr': 'ko',
  'th': 'th', 'th-th': 'th',
  'vi': 'vi', 'vi-vn': 'vi',
  'ms': 'ms', 'ms-my': 'ms',
  'id': 'id', 'id-id': 'id',
  'fil': 'fil', 'tl': 'fil',
};

function detectLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  // Parse Accept-Language: "ja,en-US;q=0.9,en;q=0.8,zh-TW;q=0.7"
  const langs = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase());

  for (const lang of langs) {
    // Try exact match first
    if (LANG_MAP[lang]) return LANG_MAP[lang];
    // Try base language (e.g., "ja-jp" → "ja")
    const base = lang.split('-')[0];
    if (LANG_MAP[base]) return LANG_MAP[base];
  }
  return null;
}

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

  // Already has a locale prefix → proceed
  const hasLocale = localePrefixes.some(
    (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );
  if (hasLocale) return NextResponse.next();

  // No locale prefix → detect browser language
  const acceptLang = request.headers.get('accept-language');
  const detected = detectLocale(acceptLang);

  // If detected language is zh-TW (default) or not detected → rewrite to zh-TW (no redirect, keep clean URL)
  if (!detected || detected === 'zh-TW') {
    const url = request.nextUrl.clone();
    url.pathname = `/zh-TW${pathname}`;
    return NextResponse.rewrite(url);
  }

  // For other languages → redirect to the localized URL
  // Only redirect if user hasn't manually chosen (check cookie)
  const langCookie = request.cookies.get('preferred-lang');
  if (langCookie) {
    // User manually chose a language before → respect that choice
    const chosen = LANG_MAP[langCookie.value.toLowerCase()] || 'zh-TW';
    if (chosen === 'zh-TW') {
      const url = request.nextUrl.clone();
      url.pathname = `/zh-TW${pathname}`;
      return NextResponse.rewrite(url);
    }
    const seg = localePathMap[chosen];
    const url = request.nextUrl.clone();
    url.pathname = `/${seg}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Auto-detect: redirect to detected language
  const seg = localePathMap[detected];
  const url = request.nextUrl.clone();
  url.pathname = `/${seg}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
