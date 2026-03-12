// Remove all price mentions (NT$, 門票, 費用估算 table) from tour guide content
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

function removePrices(text) {
  if (!text) return text;

  let result = text
    // Remove entire 費用估算 / Cost Estimate sections (## heading + table until next ## or end)
    .replace(/## 費用估算[\s\S]*?(?=\n## |$)/g, '')
    .replace(/## Cost Estimate[\s\S]*?(?=\n## |$)/g, '')
    // Remove price lines like "- 門票 NT$60/人" or "Admission NT$60"
    .replace(/^.*門票.*NT\$.*$/gm, '')
    .replace(/^.*Admission.*NT\$.*$/gm, '')
    .replace(/^.*入場.*NT\$.*$/gm, '')
    // Remove standalone NT$ mentions in list items, keeping the rest of the line
    // e.g. "一碗 NT$50" -> "一碗", "約 NT$150-200/個" -> ""
    .replace(/[，,]?\s*(?:一[碗個盤杯份]|每[人位]|約|票價|費用|門票)?\s*NT\$[\d,.]+-?[\d,.]*\/?\w*/g, '')
    .replace(/[，,]?\s*~?NT\$[\d,.]+-?[\d,.]*\/?(?:人|個|天|晚|項|each|person|day)?/gi, '')
    // Remove "票價：依路線 NT$..." lines
    .replace(/^.*票價[：:].*$/gm, '')
    // Remove price table rows
    .replace(/^\|.*NT\$.*\|$/gm, '')
    .replace(/^\|.*小計.*\|$/gm, '')
    .replace(/^\|.*Subtotal.*\|$/gm, '')
    // Remove table headers and separators left orphaned
    .replace(/## 費用估算\n/g, '')
    // Remove lines with only "免費" cost info
    .replace(/^.*\|\s*免費\s*\|$/gm, '')
    .replace(/^.*\|\s*Free\s*\|$/gm, '')
    // Remove orphaned table structures (header + separator with no rows)
    .replace(/\| 項目 \| 費用 \|\n\|---+\|---+\|\n(\n|$)/g, '')
    .replace(/\| Item \| Cost \|\n\|---+\|---+\|\n(\n|$)/g, '')
    // Clean up "（免費入場）" or "免費入場" standalone references
    // Keep "免費" when it's a useful info point, but remove price-centric lines
    // Remove "**門票：** 免費入場..." lines
    .replace(/^\*\*門票[：:]\*\*.*$/gm, '')
    // Remove "Admission NT$..." or "Free admission" as standalone
    .replace(/^.*Free admission.*$/gm, '')
    // Clean up multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return result;
}

async function main() {
  // Fetch all guides
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?select=slug,content`,
    { headers }
  );
  const guides = await res.json();
  console.log(`Found ${guides.length} guides to process\n`);

  for (const guide of guides) {
    const newContent = {};
    let changed = false;

    for (const [lang, text] of Object.entries(guide.content)) {
      const cleaned = removePrices(text);
      newContent[lang] = cleaned;
      if (cleaned !== text) changed = true;
    }

    if (changed) {
      const patchRes = await fetch(
        `${SUPABASE_URL}/tour_guides?slug=eq.${guide.slug}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ content: newContent }),
        }
      );
      console.log(`${guide.slug}: ${patchRes.status} ${patchRes.ok ? '✅' : '❌'}`);
    } else {
      console.log(`${guide.slug}: no changes needed`);
    }
  }

  console.log('\n✅ Done! All prices removed.');
}

main();
