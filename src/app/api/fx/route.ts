import { NextResponse } from 'next/server';

// The route itself stays dynamic so an upstream outage can't freeze a 503 into
// the build output; the fetch below is what's cached, so the upstream API is
// still called at most once an hour.
export const dynamic = 'force-dynamic';

// Only the currencies the site's 10 locales actually need.
const CURRENCIES = ['JPY', 'KRW', 'USD', 'CNY', 'THB', 'VND', 'MYR', 'IDR', 'PHP'] as const;

const SOURCE = 'https://open.er-api.com/v6/latest/TWD';

export async function GET() {
  try {
    const res = await fetch(SOURCE, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json();
    if (data?.result !== 'success' || !data?.rates) throw new Error('unexpected payload');

    const rates: Record<string, number> = {};
    for (const c of CURRENCIES) {
      const v = Number(data.rates[c]);
      if (Number.isFinite(v) && v > 0) rates[c] = v;
    }

    return NextResponse.json({
      base: 'TWD',
      rates,
      updated: data.time_last_update_utc || null,
    });
  } catch (error) {
    // A missing rate just hides the secondary price — never break the page.
    console.error('FX API error:', error);
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 503 });
  }
}
