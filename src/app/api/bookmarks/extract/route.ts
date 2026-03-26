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

/** Decode common HTML entities (&#x...; &#...; &amp; &quot; etc.) */
function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'");
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
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('json')) return null;
    const text = await res.text();
    if (!text || text[0] === '<') return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function extractMetadata(url: string, platform: string) {
  let title: string | undefined;
  let description: string | undefined;
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
        if (!description) description = tags['og:description'] || tags['description'];
      }
    } catch {
      // ignore scrape errors
    }
  }

  // Decode HTML entities FIRST, then extract caption & author
  if (title) title = decodeHTMLEntities(title);
  if (description) description = decodeHTMLEntities(description);
  if (thumbnail_url) thumbnail_url = decodeHTMLEntities(thumbnail_url);

  // Extract author from multiple sources
  let author: string | undefined;

  // 1. From og:description: "43K likes - username on March 2, 2026: "caption""
  if (description) {
    const authorMatch = description.match(/- (.+?) on \w+ \d/);
    if (authorMatch) author = authorMatch[1];
  }
  // 2. From title: "username on Instagram: "caption""  or  "display_name (@handle) • Instagram reel"
  if (!author && title) {
    const m1 = title.match(/^(.+?) on Instagram/);
    if (m1) author = m1[1];
    if (!author) {
      const m2 = title.match(/\(@([^)]+)\)/);
      if (m2) author = m2[1];
    }
  }
  // 3. From og:url: "instagram.com/username/reel/..."
  if (!author && og_data) {
    const ogUrl = (og_data['og:url'] || '') as string;
    if (ogUrl) {
      const m = ogUrl.match(/instagram\.com\/([^/]+)\/(reel|p)\//);
      if (m) author = m[1];
    }
  }
  // 4. From input URL path
  if (!author) {
    try {
      const urlObj = new URL(url);
      if (platform === 'instagram') {
        const pathMatch = urlObj.pathname.match(/^\/([^/]+)\//);
        if (pathMatch && !['reel', 'p', 'stories', 'explore'].includes(pathMatch[1])) {
          author = pathMatch[1];
        }
      }
    } catch {}
  }
  if (author) author = author.replace(/^@/, '');

  // Clean up title: remove " • Instagram reel" suffix
  if (title) {
    title = title.replace(/\s*[•·]\s*Instagram\s*(reel|photo|video)?$/i, '').trim();
  }

  // Extract post caption from description or title
  // IG format: "43K likes - user on March 2, 2026: "actual caption""
  // or title: "display_name on Instagram: "actual caption""
  const extractCaption = (text: string): string | null => {
    const m = text.match(/:\s*"([\s\S]+)"\.?\s*$/);
    return m ? m[1] : null;
  };

  if (description) {
    const caption = extractCaption(description);
    if (caption) description = caption;
  }

  // If no description, try extracting caption from title
  if (!description && title) {
    const caption = extractCaption(title);
    if (caption) {
      description = caption;
      // Clean title to just the author/display name part
      title = title.replace(/\s*on Instagram.*$/, '').trim();
    }
  }

  // Extract address from description or title
  let address: string | null = null;
  const addrText = [description, title].filter(Boolean).join('\n');
  // Patterns: 📍：地址, 地址：xxx, 住所：xxx, 📍 台北市..., or lines containing 市...區...路/街...號
  const addrPatterns = [
    /(?:📍|地址|住所|Address)[：:\s]*([^\n]{5,60}[號号])/i,
    /(?:📍|地址|住所|Address)[：:\s]*([^\n]{5,60})/i,
    /((?:台[北中南東]|新北|高雄|基隆|桃園|新竹|苗栗|彰化|南投|雲林|嘉義|屏東|宜蘭|花蓮|台東|澎湖)[市縣][\S]{3,50}[號号])/,
    /((?:東京|大阪|京都|神戸|福岡|名古屋|札幌|沖縄)(?:都|府|県)?[\S]{3,50})/,
  ];
  for (const pattern of addrPatterns) {
    const m = addrText.match(pattern);
    if (m) {
      address = m[1].trim().replace(/\n.*$/, '').trim();
      break;
    }
  }

  return {
    title: title || null,
    description: description || null,
    thumbnail_url: thumbnail_url || null,
    author: author || null,
    address,
    og_data,
  };
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
    const { title, description, thumbnail_url, author, address, og_data } = await extractMetadata(url, platform);

    return NextResponse.json({ platform, title, description, thumbnail_url, author, address, og_data });
  } catch (error) {
    console.error('Extract API error:', error);
    return NextResponse.json({ error: 'Failed to extract metadata' }, { status: 500 });
  }
}
