// Add internal links (延伸閱讀) to all guides — placed before transit section
// Links are locale-prefixed (/ja/guide/..., /zh-cn/guide/...) so each language
// version links to pages in the same language; zh-TW is the unprefixed default.
const KEY = process.env.SUPABASE_SERVICE_KEY;
const REF = process.env.SUPABASE_PROJECT_REF;
const BASE = `https://${REF}.supabase.co/rest/v1`;
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' };

// Mirrors localePathMap in src/lib/i18n-config.ts
const LOCALE_SEG = { 'zh-TW': '', 'zh-CN': 'zh-cn', en: 'en', ja: 'ja', ko: 'ko', th: 'th', vi: 'vi', ms: 'ms', id: 'id', fil: 'fil' };

// Guide titles for link text
const TITLES = {
  'taipei-classic': { 'zh-TW': '台北經典巡禮', 'zh-CN': '台北经典巡礼', en: 'Taipei Classics Day Trip', ja: '台北市内 定番スポット巡り' },
  'taipei-jiufen-shifen': { 'zh-TW': '九份十分一日遊', 'zh-CN': '九份十分一日游', en: 'Jiufen & Shifen Day Trip', ja: '九份・十分 日帰りチャーター' },
  'yehliu-shifen-jiufen': { 'zh-TW': '野柳十分九份一日遊', 'zh-CN': '野柳十分九份一日游', en: 'Yehliu, Shifen & Jiufen Day Trip', ja: '野柳・十分・九份 日帰りチャーター' },
  'yilan': { 'zh-TW': '宜蘭一日遊', 'zh-CN': '宜兰一日游', en: 'Yilan Day Trip', ja: '宜蘭 日帰りチャーター' },
  'yangmingshan': { 'zh-TW': '陽明山一日遊', 'zh-CN': '阳明山一日游', en: 'Yangmingshan Day Trip', ja: '陽明山 日帰りチャーター' },
  'north-coast': { 'zh-TW': '北海岸一日遊', 'zh-CN': '北海岸一日游', en: 'North Coast Day Trip', ja: '北海岸 日帰りチャーター' },
  'taoyuan-daxi': { 'zh-TW': '桃園大溪一日遊', 'zh-CN': '桃园大溪一日游', en: 'Taoyuan Daxi Day Trip', ja: '桃園・大渓 日帰りチャーター' },
  'sun-moon-lake': { 'zh-TW': '日月潭清境二日遊', 'zh-CN': '日月潭清境二日游', en: 'Sun Moon Lake & Cingjing', ja: '日月潭・清境 2日間チャーター' },
  'alishan-forest': { 'zh-TW': '阿里山一日遊', 'zh-CN': '阿里山一日游', en: 'Alishan Day Trip', ja: '阿里山 日帰りチャーター' },
  'tainan-salt-coast': { 'zh-TW': '台南鹽系浪漫之旅', 'zh-CN': '台南盐系浪漫之旅', en: 'Tainan Salt Coast Romance', ja: '台南 西海岸の塩田ルート' },
  'tainan-heritage': { 'zh-TW': '府城時光巡禮', 'zh-CN': '府城时光巡礼', en: 'Tainan Heritage Walk', ja: '台南 古都巡り' },
  'kenting-south': { 'zh-TW': '墾丁南台灣一日遊', 'zh-CN': '垦丁南台湾一日游', en: 'Kenting Day Trip', ja: '墾丁 日帰りチャーター' },
  'kaohsiung-port-art': { 'zh-TW': '高雄港都一日遊', 'zh-CN': '高雄港都一日游', en: 'Kaohsiung Port & Art', ja: '高雄 港町とアートの旅' },
  'kaohsiung-mountain-heritage': { 'zh-TW': '高雄山城一日遊', 'zh-CN': '高雄山城一日游', en: 'Kaohsiung Highlands', ja: '高雄郊外 山城と客家文化の旅' },
  'taroko-gorge': { 'zh-TW': '太魯閣一日遊', 'zh-CN': '太鲁阁一日游', en: 'Taroko Gorge Day Trip', ja: '太魯閣峡谷 日帰りチャーター' },
};

// Related guide mapping — contextually relevant, not random
const RELATED = {
  'taipei-classic': ['taipei-jiufen-shifen', 'yangmingshan', 'yilan'],
  'taipei-jiufen-shifen': ['yehliu-shifen-jiufen', 'north-coast', 'yangmingshan'],
  'yehliu-shifen-jiufen': ['taipei-jiufen-shifen', 'north-coast', 'yilan'],
  'yilan': ['taipei-jiufen-shifen', 'yangmingshan', 'taoyuan-daxi'],
  'yangmingshan': ['north-coast', 'taipei-jiufen-shifen', 'taoyuan-daxi'],
  'north-coast': ['yehliu-shifen-jiufen', 'yangmingshan', 'taipei-jiufen-shifen'],
  'taoyuan-daxi': ['yangmingshan', 'yilan', 'north-coast'],
  'sun-moon-lake': ['alishan-forest', 'taoyuan-daxi', 'taroko-gorge'],
  'alishan-forest': ['sun-moon-lake', 'kaohsiung-mountain-heritage', 'tainan-salt-coast'],
  'tainan-salt-coast': ['tainan-heritage', 'kaohsiung-port-art', 'alishan-forest'],
  'tainan-heritage': ['tainan-salt-coast', 'kaohsiung-port-art', 'alishan-forest'],
  'kenting-south': ['kaohsiung-port-art', 'kaohsiung-mountain-heritage', 'tainan-salt-coast'],
  'kaohsiung-port-art': ['kaohsiung-mountain-heritage', 'kenting-south', 'tainan-heritage'],
  'kaohsiung-mountain-heritage': ['kaohsiung-port-art', 'kenting-south', 'alishan-forest'],
  'taroko-gorge': ['yilan', 'sun-moon-lake', 'taipei-jiufen-shifen'],
};

// Context phrases explaining WHY this guide is related
const CONTEXT_ZH = {
  'taipei-classic': '中正紀念堂、故宮、台北101，台北市區經典路線',
  'taipei-jiufen-shifen': '同樣經過瑞芳，加碼平溪線天燈體驗',
  'yehliu-shifen-jiufen': '多加野柳地質奇觀，北海岸一次玩透',
  'north-coast': '沿著北海岸公路一路玩到淡水',
  'yangmingshan': '台北近郊的火山秘境和花田',
  'yilan': '台北出發一小時，溫泉、傳藝、夜市一次滿足',
  'taoyuan-daxi': '老街、水庫、茶廠，桃園的慢旅風格',
  'sun-moon-lake': '中台灣最美的湖光山色',
  'alishan-forest': '雲海、神木、小火車，嘉義的仙境體驗',
  'tainan-salt-coast': '台南西濱的純白鹽田與夕陽',
  'tainan-heritage': '安平古堡到赤崁樓，四百年府城散策',
  'kenting-south': '台灣最南端的陽光海岸',
  'kaohsiung-port-art': '旗津渡輪、駁二文創、龍虎塔祈福',
  'kaohsiung-mountain-heritage': '月世界、佛光山、美濃客家村深度遊',
  'taroko-gorge': '太魯閣峽谷的壯麗步道體驗',
};

const CONTEXT_ZH_CN = {
  'taipei-classic': '中正纪念堂、故宫、台北101，台北市区经典路线',
  'taipei-jiufen-shifen': '同样经过瑞芳，加码平溪线天灯体验',
  'yehliu-shifen-jiufen': '多加野柳地质奇观，北海岸一次玩透',
  'north-coast': '沿着北海岸公路一路玩到淡水',
  'yangmingshan': '台北近郊的火山秘境和花田',
  'yilan': '台北出发一小时，温泉、传艺、夜市一次满足',
  'taoyuan-daxi': '老街、水库、茶厂，桃园的慢旅风格',
  'sun-moon-lake': '中台湾最美的湖光山色',
  'alishan-forest': '云海、神木、小火车，嘉义的仙境体验',
  'tainan-salt-coast': '台南西滨的纯白盐田与夕阳',
  'tainan-heritage': '安平古堡到赤崁楼，四百年府城散策',
  'kenting-south': '台湾最南端的阳光海岸',
  'kaohsiung-port-art': '旗津渡轮、驳二文创、龙虎塔祈福',
  'kaohsiung-mountain-heritage': '月世界、佛光山、美浓客家村深度游',
  'taroko-gorge': '太鲁阁峡谷的壮丽步道体验',
};

const CONTEXT_JA = {
  'taipei-classic': '中正紀念堂・故宮・台北101、台北市内の定番ルート',
  'taipei-jiufen-shifen': '提灯の九份と十分のランタン上げを1日で',
  'yehliu-shifen-jiufen': '野柳地質公園の奇岩も加えた北海岸の王道ルート',
  'north-coast': '北海岸の海沿いの道を淡水までドライブ',
  'yangmingshan': '台北近郊の火山地形と花畑',
  'yilan': '台北から約1時間、温泉・伝統芸術・夜市をまとめて',
  'taoyuan-daxi': '大渓老街・石門水庫・慈湖、桃園ののんびり旅',
  'sun-moon-lake': '台湾中部の湖と高原の絶景',
  'alishan-forest': '雲海・巨木・森林鉄道、嘉義の山の絶景',
  'tainan-salt-coast': '台南西海岸の真っ白な塩田と夕日',
  'tainan-heritage': '安平古堡から赤崁楼へ、400年の古都散策',
  'kenting-south': '台湾最南端、陽光あふれる海岸',
  'kaohsiung-port-art': '旗津のフェリー・駁二アート・龍虎塔',
  'kaohsiung-mountain-heritage': '月世界・佛光山・美濃客家の奥深い高雄',
  'taroko-gorge': '大理石の大峡谷・太魯閣の絶景',
};

const CONTEXT_EN = {
  'taipei-classic': 'CKS Memorial, Palace Museum, Taipei 101 — Taipei city essentials',
  'taipei-jiufen-shifen': 'Also passes through Ruifang — add Pingxi Line sky lanterns',
  'yehliu-shifen-jiufen': 'Adds Yehliu Geopark to the mix',
  'north-coast': 'Cruise the North Coast highway all the way to Tamsui',
  'yangmingshan': 'Taipei\'s nearby volcanic landscape and flower fields',
  'yilan': 'Hot springs, traditional arts, and night market — 1 hour from Taipei',
  'taoyuan-daxi': 'Baroque old street, reservoir, and tea factory',
  'sun-moon-lake': 'Central Taiwan\'s most stunning lake scenery',
  'alishan-forest': 'Sea of clouds, sacred trees, and forest railway',
  'tainan-salt-coast': 'Pure white salt fields and sunset on Tainan\'s west coast',
  'tainan-heritage': 'Anping Fort to Chihkan Tower — 400 years of history',
  'kenting-south': 'Taiwan\'s southernmost sunny coast',
  'kaohsiung-port-art': 'Cijin ferry, Pier-2 art, Dragon Tiger Pagodas',
  'kaohsiung-mountain-heritage': 'Moon World, Fo Guang Shan, Hakka village deep dive',
  'taroko-gorge': 'Taroko Gorge\'s magnificent trail experience',
};

// ko/th/vi/ms/id/fil have no dictionary here yet: they fall back to English and
// must be translated by hand afterwards (the skill requires native-quality text).
const HEADINGS = { 'zh-TW': '## 延伸閱讀', 'zh-CN': '## 延伸阅读', ja: '## 関連ガイド' };
const CONTEXTS = { 'zh-TW': CONTEXT_ZH, 'zh-CN': CONTEXT_ZH_CN, ja: CONTEXT_JA };

function buildSection(slug, lang) {
  const related = RELATED[slug];
  if (!related) return null;

  const heading = HEADINGS[lang] || '## More Routes to Explore';
  const context = CONTEXTS[lang] || CONTEXT_EN;
  const prefix = LOCALE_SEG[lang] ? `/${LOCALE_SEG[lang]}` : '';

  const links = related.map(rSlug => {
    const title = TITLES[rSlug]?.[lang] || TITLES[rSlug]?.['en'] || rSlug;
    const ctx = context[rSlug] || '';
    return `- [${title}](${prefix}/guide/${rSlug}) — ${ctx}`;
  });

  return `\n${heading}\n\n${links.join('\n')}\n`;
}

async function main() {
  // Fetch all guides
  const res = await fetch(`${BASE}/tour_guides?select=slug,content&is_published=eq.true`, { headers });
  const guides = await res.json();

  let updated = 0;
  for (const guide of guides) {
    const slug = guide.slug;
    if (!RELATED[slug]) { console.log(`⏭️  ${slug}: no related mapping, skip`); continue; }

    const content = guide.content;
    let changed = false;

    for (const lang of Object.keys(content)) {
      const text = content[lang];
      // Skip if the locale already has a related-guides section (any language)
      if (/\n## [^\n]+\n\n- \[[^\]]+\]\(\/(?:[a-z-]+\/)?guide\//.test(text)) continue;

      const section = buildSection(slug, lang);
      if (!section) continue;

      // Insert before transit section (🚌) or at the end
      const transitIdx = text.indexOf('## 🚌');
      if (transitIdx > 0) {
        content[lang] = text.slice(0, transitIdx).trimEnd() + '\n' + section + '\n' + text.slice(transitIdx);
      } else {
        content[lang] = text.trimEnd() + '\n' + section;
      }
      changed = true;
    }

    if (changed) {
      const patchRes = await fetch(`${BASE}/tour_guides?slug=eq.${slug}`, {
        method: 'PATCH', headers, body: JSON.stringify({ content, updated_at: new Date().toISOString() }),
      });
      console.log(`✅ ${slug}: ${patchRes.status}`);
      updated++;
    } else {
      console.log(`⏭️  ${slug}: already has links`);
    }
  }

  console.log(`\nDone! Updated ${updated} guides with internal links.`);
}
main();
