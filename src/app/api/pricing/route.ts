import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

interface AirportRow {
  vehicle_type: string;
  tpe_price: number;
  tsa_price: number;
  rmq_price: number;
  khh_price: number;
}

interface CharterRow {
  vehicle_type: string;
  duration_hours: number;
  base_price: number;
  overtime_rate: number;
}

export async function GET() {
  try {
    // Fetch airport pricing - get minimum price per vehicle type
    const airportRes = await fetch(
      `${SUPABASE_URL}/airport_transfer_pricing?is_active=eq.true&select=vehicle_type,tpe_price,tsa_price,rmq_price,khh_price`,
      { headers, next: { revalidate: 300 } } // cache 5 min
    );
    const airportData: AirportRow[] = await airportRes.json();

    // Group by vehicle_type and find minimum prices
    const airportByType: Record<string, { tpe: number; tsa: number; rmq: number; khh: number }> = {};
    for (const row of airportData) {
      const vt = row.vehicle_type;
      if (!airportByType[vt]) {
        airportByType[vt] = {
          tpe: row.tpe_price,
          tsa: row.tsa_price,
          rmq: row.rmq_price,
          khh: row.khh_price,
        };
      } else {
        airportByType[vt].tpe = Math.min(airportByType[vt].tpe, row.tpe_price);
        airportByType[vt].tsa = Math.min(airportByType[vt].tsa, row.tsa_price);
        airportByType[vt].rmq = Math.min(airportByType[vt].rmq, row.rmq_price);
        airportByType[vt].khh = Math.min(airportByType[vt].khh, row.khh_price);
      }
    }

    // Fetch charter pricing
    const charterRes = await fetch(
      `${SUPABASE_URL}/vehicle_pricing?is_active=eq.true&country=eq.TW&region=eq.default&select=vehicle_type,duration_hours,base_price,overtime_rate&order=vehicle_type,duration_hours`,
      { headers, next: { revalidate: 300 } }
    );
    const charterData: CharterRow[] = await charterRes.json();

    // Group charter by vehicle_type
    const charterByType: Record<string, { h6: number | null; h8: number | null; overtime: number }> = {};
    for (const row of charterData) {
      const vt = row.vehicle_type;
      if (!charterByType[vt]) {
        charterByType[vt] = { h6: null, h8: null, overtime: row.overtime_rate };
      }
      if (row.duration_hours === 6) charterByType[vt].h6 = row.base_price;
      if (row.duration_hours === 8) charterByType[vt].h8 = row.base_price;
      charterByType[vt].overtime = row.overtime_rate;
    }

    return NextResponse.json({
      airport: airportByType,
      charter: charterByType,
    });
  } catch (error) {
    console.error('Pricing API error:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}
