// Add cover images and in-content images to tour guides
// Using Unsplash free images (license: free for commercial use)
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Unsplash images optimized at 1200px width for web
const COVERS = {
  'taipei-jiufen-shifen': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80', // Jiufen lanterns
  'sun-moon-lake': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80', // mountain lake scenery
  'taroko-gorge': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // dramatic mountain gorge
  'kenting-south': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // tropical beach
  'alishan-forest': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', // misty forest
};

async function main() {
  for (const [slug, coverUrl] of Object.entries(COVERS)) {
    const res = await fetch(
      `${SUPABASE_URL}/tour_guides?slug=eq.${slug}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ cover_image: coverUrl }),
      }
    );
    console.log(`${slug} cover: ${res.status} ${res.ok ? '✅' : '❌'}`);
  }
  console.log('\n✅ All cover images added!');
}

main();
