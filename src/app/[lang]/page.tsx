import { getPricingTables } from '@/lib/supabase';
import HomeContent from './HomeContent';

// Prices are read here on the server so the homepage HTML carries the live
// rates (same source as /pricing). The client still refreshes them from
// /api/pricing after load; this only makes the first paint — and what crawlers
// see — correct instead of the placeholder numbers in bodyhtml.ts.
export const revalidate = 3600;

export default async function HomePage() {
  const pricing = await getPricingTables();
  return <HomeContent pricing={pricing} />;
}
