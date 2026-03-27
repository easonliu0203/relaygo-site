import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';

// ─────────────────────────────────────────────────────────────────────────────
// 架構決策：統一 Submit API（方案 B）
// ─────────────────────────────────────────────────────────────────────────────
// 所有書籤提交（網頁端 + 手機端 APP）都統一走這個 API。
//
// 為什麼不讓手機端直接寫 Supabase？
// 1. 單一真實來源 — 地址擷取、geocoding、分類邏輯改一次就全平台生效
// 2. API key 安全 — Google Geocoding key 只在伺服器端，不暴露在手機端
// 3. 可擴展 — 之後加審核、spam 過濾、AI 分類都只改這個 API
// 4. 一致性 — 網頁和 APP 提交的資料經過相同的處理流程
//
// 手機端做法：
// - 用 http.post 呼叫 https://relaygo.pro/api/bookmarks/submit
// - 傳入 url, platform, description, city_slug, category, created_by 等欄位
// - 不需要傳 address/latitude/longitude，伺服器端會自動從 description 擷取
// ─────────────────────────────────────────────────────────────────────────────

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

/**
 * 從貼文內文自動擷取地址（國際化支援）
 *
 * 支援格式：
 * - 台灣：台北市中山區民生東路一段41號
 * - 日本：東京都渋谷区神宮前1-2-3
 * - 韓國：서울시 강남구 역삼동 123-45
 * - 泰國：กรุงเทพมหานคร / ถนน / ซอย 等
 * - 英文：123 Main Street, City（帶門牌號碼）
 * - 通用：📍/🗺️/地址/Address/住所 前綴
 */
function extractAddress(text: string): string | null {
  if (!text) return null;

  const patterns = [
    // 0. 📍 + 〒 日本郵遞區號（最高優先，明確地址標記）
    /📍[：:\s]*([〒\d][^\n]{8,80})/,

    // 1. 📍 前綴（通用，不限結尾）
    /📍[：:\s]*([^\n]{10,80})/,

    // 2. 台灣完整地址（市/縣 + 區 + 路/街 + 號）
    /((?:台[北中南東]|新北|高雄|基隆|桃園|新竹|苗栗|彰化|南投|雲林|嘉義|屏東|宜蘭|花蓮|台東|澎湖)[市縣][\S]{3,50}[號号])/,

    // 3. 日本地址（〒郵遞區號開頭）
    /(〒\d{3}-?\d{4}\s*[\S\s]{5,60})/,

    // 4. 日本地址（都/府/県 + 必須含「区/市/町/村/郡」才算地址，避免匹配標題）
    /((?:東京都|大阪府|京都府|北海道|[^\n]{1,4}県)[\S]*?(?:区|市|町|村|郡)[\S]{2,50})/,

    // 5. 韓國地址（시/구/동/로 + 番號）
    /((?:서울|부산|인천|대구|대전|광주|울산|제주)[\S가-힣\s]{5,60})/,

    // 6. 帶前綴標記的地址（🗺️/地址/住所/Address/ที่อยู่/주소）
    /(?:🗺️|地址|住所|Address|ที่อยู่|주소|Alamat)[：:\s]*([^\n]{10,80})/i,

    // 7. 英文地址（門牌號碼 + 路名 + Street/Road/Ave 等）
    /(\d{1,5}\s+[\w\s]{3,40}(?:Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Ln|Drive|Dr)[\w\s,]{0,40})/i,
  ];

  for (const pattern of patterns) {
    const m = text.match(pattern);
    if (m) {
      return m[1].trim().replace(/\n.*$/, '').trim();
    }
  }
  return null;
}

/** AI 地址擷取 fallback — 走後端 Gemini proxy */
async function extractAddressWithAI(text: string): Promise<{
  address: string | null;
  country: string | null;
  city: string | null;
  district: string | null;
} | null> {
  if (!text) return null;
  try {
    const res = await fetch('https://api.relaygo.pro/api/ai/extract-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.slice(0, 2000) }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json() as Record<string, any>;
    if (data.address || data.country || data.city) return data as any;
    return null;
  } catch (e) {
    console.error('[AI Extract] Error:', e);
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
    const { url, platform, title, description, thumbnail_url, country_slug, city_slug, district, category, og_data, author, created_by, address: clientAddress, latitude: clientLat, longitude: clientLng } = body;

    // Validation
    if (!url || !platform || !city_slug || !category) {
      return NextResponse.json({ error: 'Missing required fields: url, platform, city_slug, category' }, { status: 400 });
    }

    // 地址擷取：客戶端傳的 → AI（Gemini Flash）
    const addrText = [description, title].filter(Boolean).join('\n');
    let address = clientAddress || null;

    // 沒有客戶端地址 → 用 AI 擷取
    if (!address && addrText.length > 10) {
      const aiResult = await extractAddressWithAI(addrText);
      if (aiResult?.address) {
        address = aiResult.address;
        console.log('[Submit] AI extracted address:', address);
      }
    }

    // 座標：優先用客戶端傳的（Google Maps URL 解析的），否則 geocode
    let latitude: number | null = typeof clientLat === 'number' ? clientLat : null;
    let longitude: number | null = typeof clientLng === 'number' ? clientLng : null;
    if (!latitude && !longitude && address) {
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
