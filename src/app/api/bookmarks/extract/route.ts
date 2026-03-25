import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function detectPlatform(url: string): string {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('facebook.com') || host.includes('fb.com') || host.includes('fb.watch')) return 'facebook';
    if (host.includes('twitter.com') || host.includes('x.com')) return 'x';
    if (host.includes('tiktok.com')) return 'tiktok';
    if (host.includes('threads.net')) return 'threads';
    if (host.includes('xiaohongshu.com') || host.includes('xhslink.com')) return 'xiaohongshu';
    return 'other';
  } catch {
    return 'other';
  }
}

function extractOGTags(html: string): Record<string, string> {
  const tags: Record<string, string> = {};
  const regex = /<meta\s+(?:property|name)=["'](og:|twitter:)?([^"']+)["']\s+content=["']([^"']*)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const key = (match[1] || '') + match[2];
    tags[key] = match[3];
  }
  // Also try reversed attribute order: content before property
  const regex2 = /<meta\s+content=["']([^"']*)["']\s+(?:property|name)=["'](og:|twitter:)?([^"']+)["']/gi;
  while ((match = regex2.exec(html)) !== null) {
    const key = (match[2] || '') + match[3];
    if (!tags[key]) tags[key] = match[1];
  }
  // Extract <title> as fallback
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) tags['page_title'] = titleMatch[1].trim();
  return tags;
}

async function extractViaOEmbed(oembedUrl: string): Promise<{ title?: string; thumbnail_url?: string; author_name?: string } | null> {
  try {
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function extractMetadata(url: string, platform: string) {
  let title: string | undefined;
  let thumbnail_url: string | undefined;
  let og_data: Record<string, unknown> = {};

  // Try oEmbed for supported platforms
  if (platform === 'instagram') {
    const data = await extractViaOEmbed(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`);
    if (data) {
      title = data.title || data.author_name;
      thumbnail_url = data.thumbnail_url;
      og_data = data as Record<string, unknown>;
    }
  } else if (platform === 'tiktok') {
    const data = await extractViaOEmbed(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    if (data) {
      title = data.title || data.author_name;
      thumbnail_url = data.thumbnail_url;
      og_data = data as Record<string, unknown>;
    }
  }

  // Fallback: scrape OG tags from HTML
  if (!title || !thumbnail_url) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RelayGoBot/1.0)' },
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const html = await res.text();
        const tags = extractOGTags(html);
        og_data = { ...og_data, ...tags };
        if (!title) title = tags['og:title'] || tags['twitter:title'] || tags['page_title'];
        if (!thumbnail_url) thumbnail_url = tags['og:image'] || tags['twitter:image'];
      }
    } catch {
      // ignore scrape errors
    }
  }

  return { title: title || null, thumbnail_url: thumbnail_url || null, og_data };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const platform = detectPlatform(url);
    const { title, thumbnail_url, og_data } = await extractMetadata(url, platform);

    return NextResponse.json({ platform, title, thumbnail_url, og_data });
  } catch (error) {
    console.error('Extract API error:', error);
    return NextResponse.json({ error: 'Failed to extract metadata' }, { status: 500 });
  }
}
