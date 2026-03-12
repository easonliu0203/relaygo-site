// Update 九份十分一日遊 guide with per-attraction Unsplash photos and photographer credits
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Photo URLs with Unsplash attribution
const PHOTOS = {
  jiufen: {
    url: 'https://images.unsplash.com/photo-1594792780987-83273a3991dd?w=1200&q=80',
    credit: 'Nat Chen (@nat0408)',
    creditUrl: 'https://unsplash.com/@nat0408?utm_source=relaygo&utm_medium=referral',
  },
  jiufenTea: {
    url: 'https://images.unsplash.com/photo-1677628987592-c3ad2f546fef?w=1200&q=80',
    credit: 'Ricky LK (@rickyrynselo)',
    creditUrl: 'https://unsplash.com/@rickyrynselo?utm_source=relaygo&utm_medium=referral',
  },
  lantern: {
    url: 'https://images.unsplash.com/photo-1568119948624-ff9807d6be20?w=1200&q=80',
    credit: 'Bas Glaap (@basglaap)',
    creditUrl: 'https://unsplash.com/@basglaap?utm_source=relaygo&utm_medium=referral',
  },
  shifenWaterfall: {
    url: 'https://images.unsplash.com/photo-1697128212774-6777be75baca?w=1200&q=80',
    credit: 'James Virtudazo (@jamesvrtdz)',
    creditUrl: 'https://unsplash.com/@jamesvrtdz?utm_source=relaygo&utm_medium=referral',
  },
  yinyangSea: {
    url: 'https://images.unsplash.com/photo-1558251314-0164230213d4?w=1200&q=80',
    credit: 'Chromatograph (@chromatograph)',
    creditUrl: 'https://unsplash.com/@chromatograph?utm_source=relaygo&utm_medium=referral',
  },
  yinyangSea2: {
    url: 'https://images.unsplash.com/photo-1630562392536-0f203d3c9e97?w=1200&q=80',
    credit: 'Andy Kuo (@chyi826)',
    creditUrl: 'https://unsplash.com/@chyi826?utm_source=relaygo&utm_medium=referral',
  },
};

function photoMd(key, alt) {
  const p = PHOTOS[key];
  return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
}

const content = {
  'zh-TW': `## 為什麼選這條路線？

九份與十分是北台灣最具代表性的包車路線，一天之內就能體驗「山城懷舊」與「鐵道浪漫」兩種截然不同的氛圍。從台北出發車程約1小時，沿途還能順遊黃金瀑布、陰陽海等自然奇觀，是第一次來台灣的旅客必訪路線。

## 行程亮點

### 🏮 九份老街 — 宮崎駿靈感之地

${photoMd('jiufen', '九份老街的紅燈籠與石階巷弄')}

九份因電影《悲情城市》聲名大噪，層層堆疊的山城建築、蜿蜒的石階巷弄、紅燈籠高掛的茶樓，營造出獨特的懷舊氛圍。許多人說這裡是宮崎駿《神隱少女》的靈感來源（雖然吉卜力官方未證實），但走在基山街上，你很難不聯想到動畫中的場景。

**必吃美食：**
- **阿柑姨芋圓** — 九份最有名的芋圓店，位在山頂可以邊吃邊看海景
- **賴阿婆芋圓** — 另一家老字號，口感略有不同，各有擁護者
- **阿蘭草仔粿** — 鹹甜兩種口味，銅板價的在地古早味
- **護理長的店** — 滷肉飯配一碗魚丸湯，在地人的午餐選擇

${photoMd('jiufenTea', '九份茶樓 — 百年老屋裡品茶看海')}

- **九份茶坊** — 在百年老屋裡品茶看海，推薦東方美人茶

**拍照秘訣：** 豎崎路的階梯是最經典的取景角度，建議傍晚時分燈籠亮起後拍攝最有氛圍。平日人潮較少，更容易拍到好照片。

### 🎆 十分老街 — 鐵道上的天燈祈願

${photoMd('lantern', '十分天燈 — 在鐵道上放天燈許願')}

十分老街最特別的地方在於——火車會直接從老街中間穿過。在鐵軌上放天燈是全台灣獨一無二的體驗，看著天燈緩緩升空、帶著你的願望飛向天際，是很多旅客來台灣最難忘的回憶。

**天燈小知識：**
- 單色天燈以紅色最受歡迎（代表幸福）
- 四色天燈可以四面寫不同願望
- 店家會幫忙拍照和點火

> 小提醒：天燈施放前記得確認火車時刻！雖然有工作人員會提醒，但自己注意更安全。

### 💧 十分瀑布 — 台灣版尼加拉瀑布

${photoMd('shifenWaterfall', '十分瀑布 — 全台最大簾幕式瀑布')}

十分瀑布寬度約40公尺、落差約20公尺，是全台最大的簾幕式瀑布。水量充沛時氣勢磅礡，站在觀景台上能感受到水霧撲面。從老街步行到瀑布約15-20分鐘，沿途步道平坦好走。

**拍照秘訣：** 瀑布下方的觀景台是最佳拍攝點，可以拍到完整的簾幕狀水瀑。雨季（5-9月）水量最大最壯觀。建議帶防水袋保護手機，水霧很大。

### ✨ 黃金瀑布 & 陰陽海 — 大自然的調色盤

${photoMd('yinyangSea', '陰陽海 — 金黃與湛藍的交界')}

黃金瀑布因為礦物質氧化，整座瀑布呈現金黃色澤，在陽光下閃閃發光。附近的陰陽海則是因為酸礦水匯入海洋，形成一半金黃、一半湛藍的奇特景觀。這兩個景點距離很近，車停路邊就能欣賞，不需要走很多路。

${photoMd('yinyangSea2', '從山上俯瞰陰陽海全景')}

**拍照秘訣：** 黃金瀑布在陽光直射時最金黃耀眼，建議下午時段前往。陰陽海的最佳觀景點在水湳洞停車場旁的高處，可以同時拍到金黃與湛藍的分界線。

## 建議行程安排

### 上午 — 十分放天燈
1. **09:00** 台北市區飯店出發，走國道一號接62快速道路
2. **10:00** 抵達十分老街，選一家天燈店、寫願望、放天燈（約45分鐘）
3. **10:50** 步行前往十分瀑布（步道約15分鐘）
4. **11:10** 十分瀑布觀景、拍照（約40分鐘）

### 下午 — 九份探索
5. **12:00** 開車前往九份（車程約30分鐘）
6. **12:30** 午餐 — 在九份老街吃美食（推薦阿柑姨芋圓 + 阿蘭草仔粿）
7. **13:30** 悠閒逛九份老街，走訪基山街、豎崎路、昇平戲院（約2小時）
8. **15:30** 喝杯茶看海（推薦九份茶坊或阿妹茶樓）

### 傍晚 — 自然奇景
9. **16:15** 開車到黃金瀑布（車程5分鐘，停留約15分鐘）
10. **16:40** 陰陽海觀景台（停留10分鐘）
11. **17:00** 返回台北（約1-1.5小時，視車流量而定）

## 實用貼士

- **最佳季節**：全年皆宜，但秋冬（10-12月）最有氛圍 — 山城裡雲霧繚繞，配上燈籠別有一番風味
- **避開人潮**：平日前往人潮少很多；假日建議早上9點前出發，避開中午的觀光巴士團
- **穿著建議**：九份全程都是階梯，請穿好走的鞋子。山上比平地涼3-5度，帶件薄外套
- **雨具必備**：九份全年降雨機率高（尤其東北季風季節），務必帶傘或雨衣
- **拍照時機**：豎崎路的最佳拍攝時間是傍晚 16:30-17:30，天色漸暗、燈籠亮起時最美`,

  'en': `## Why This Route?

Jiufen and Shifen represent the best of northern Taiwan in a single day — nostalgic mountain town charm meets railway romance. Just one hour from Taipei, this route also includes the stunning Golden Waterfall and Yin-Yang Sea, making it an essential first-time visitor experience.

## Highlights

### 🏮 Jiufen Old Street — Studio Ghibli's Inspiration

${photoMd('jiufen', 'Red lanterns and stone steps of Jiufen Old Street')}

Jiufen rose to fame through the film "A City of Sadness" and is often linked to the aesthetic of Miyazaki's "Spirited Away." Narrow stone-paved alleys wind through hillside buildings draped in red lanterns, with tea houses overlooking the Pacific Ocean.

**Must-Eat Foods:**
- **Ah-Gan Auntie Taro Balls** — The most famous taro ball shop, with ocean views from the hilltop
- **Grandma Lai's Taro Balls** — The other classic option, slightly different texture
- **Ah-Lan Grass Cake** — Traditional savory-sweet rice cakes, affordable local snack

${photoMd('jiufenTea', 'Jiufen teahouse — sipping tea with ocean views in a century-old building')}

- **Jiufen Teahouse** — Sip Oriental Beauty tea in a century-old building with sea views

**Photo Tips:** The stone stairway at Shuqi Road is the iconic angle. Visit in late afternoon when the lanterns light up (around 5PM) for the most atmospheric shots.

### 🎆 Shifen Old Street — Sky Lantern Wishes on Railway Tracks

${photoMd('lantern', 'Sky lanterns floating above Shifen railway tracks')}

What makes Shifen unique is that trains run right through the middle of the old street. Writing your wishes on a sky lantern and watching it float into the sky above the railway tracks is one of Taiwan's most unforgettable experiences.

**Sky Lantern Tips:**
- Single-color lanterns: red is most popular (symbolizes happiness)
- Four-color lanterns: write different wishes on each side
- Shop staff will help with photos and lighting

### 💧 Shifen Waterfall — Taiwan's Niagara

${photoMd('shifenWaterfall', "Shifen Waterfall — Taiwan's largest curtain waterfall")}

Shifen Waterfall spans about 40 meters wide with a 20-meter drop, making it Taiwan's largest curtain-type waterfall. When water flow is strong, the mist can be felt from the viewing platform. It's a 15-20 minute walk from the old street along a flat, easy trail.

**Photo Tips:** The lower viewing platform gives the best full-width shot of the curtain falls. Rainy season (May-Sep) brings the most impressive water volume. Bring a waterproof bag — the mist is heavy.

### ✨ Golden Waterfall & Yin-Yang Sea

${photoMd('yinyangSea', 'Yin-Yang Sea — where golden meets deep blue')}

The Golden Waterfall gets its color from mineral oxidation, creating a shimmering golden cascade. Nearby, the Yin-Yang Sea shows a dramatic split between golden-brown and deep blue waters where mineral-rich streams meet the ocean.

${photoMd('yinyangSea2', 'Aerial view of the Yin-Yang Sea coastline')}

**Photo Tips:** The Golden Waterfall shines brightest under direct afternoon sunlight. For the Yin-Yang Sea, the elevated viewpoint near the Shuinandong parking area captures the striking color divide between gold and blue.

## Suggested Itinerary

### Morning — Sky Lanterns at Shifen
1. **09:00** Depart from Taipei hotel
2. **10:00** Shifen Old Street — write wishes, release sky lantern (~45min)
3. **10:50** Walk to Shifen Waterfall (~15min trail)
4. **11:10** Enjoy the waterfall views (~40min)

### Afternoon — Explore Jiufen
5. **12:00** Drive to Jiufen (~30min)
6. **12:30** Lunch along Jiufen Old Street
7. **13:30** Explore Jishan Street, Shuqi Road, Shengping Theater (~2hrs)
8. **15:30** Afternoon tea with ocean views

### Evening — Natural Wonders
9. **16:15** Golden Waterfall (5min drive, ~15min stop)
10. **16:40** Yin-Yang Sea viewpoint (~10min)
11. **17:00** Return to Taipei (~1-1.5hrs)

## Practical Tips

- **Best Season**: Year-round, but autumn/winter (Oct-Dec) is most atmospheric with mountain mist
- **Avoid Crowds**: Weekdays are much quieter; on weekends, depart before 9AM
- **Wear**: Comfortable walking shoes — Jiufen is all stairs. Bring a light jacket (3-5°C cooler than Taipei)
- **Bring Umbrella**: Jiufen is rainy year-round, especially during northeast monsoon season
- **Best Photo Time**: Shuqi Road stairs look best at 4:30-5:30PM when lanterns light up`,

  'ja': `## なぜこのルート？

九份と十分は北台湾を代表する包車ルートです。ノスタルジックな山城と鉄道ロマンスを一日で体験できます。台北から約1時間、黄金瀑布や陰陽海も含めた、初めての台湾旅行に最適なコースです。

## ハイライト

### 🏮 九份老街 — ジブリの世界

${photoMd('jiufen', '九份老街の赤い提灯と石段')}

映画『悲情城市』で有名になった九份は、石畳の路地、赤い提灯が揺れる茶楼、太平洋を望む絶景が特徴です。宮崎駿の『千と千尋の神隠し』のモデルとも言われています。

**必食グルメ：**
- **阿柑姨芋圓** — 山頂から海を眺めながら食べるタロイモ団子
- **阿蘭草仔粿** — 伝統的な草餅、リーズナブルな地元のおやつ

${photoMd('jiufenTea', '九份の茶館 — 百年の建物で海を眺めながらお茶を')}

- **九份茶坊** — 百年の建物で東方美人茶を楽しむ

### 🎆 十分老街 — 線路上のランタン

${photoMd('lantern', '十分の空に浮かぶ天灯')}

十分の最大の特徴は、列車が商店街の真ん中を通ること。線路の上でランタンに願いを書いて空に放つ体験は、台湾旅行で最も印象的な思い出になるでしょう。

**ランタン豆知識：**
- 単色は赤が一番人気（幸福の象徴）
- 四色ランタンなら四面に違う願い事を

### 💧 十分瀑布 — 台湾のナイアガラ

${photoMd('shifenWaterfall', '十分瀑布 — 台湾最大のカーテン型瀑布')}

幅40m、落差20mの台湾最大のカーテン型瀑布。水量が多い時は迫力満点で、展望台から水しぶきを感じられます。老街から徒歩15-20分、平坦な遊歩道です。

**撮影のコツ：** 下の展望台からカーテン状の滝を一望できます。雨季（5-9月）が最も迫力あり。水しぶきが多いため防水対策を。

### ✨ 黄金瀑布 & 陰陽海

${photoMd('yinyangSea', '陰陽海 — 金色と深い青の境界')}

鉱物の酸化で金色に輝く黄金瀑布と、酸性鉱水が海に流れ込んで半分金色・半分青色になる陰陽海。どちらも車を停めてすぐ見られます。

${photoMd('yinyangSea2', '山の上から陰陽海を一望')}

**撮影のコツ：** 黄金瀑布は午後の直射日光で最も金色に輝きます。陰陽海は水湳洞駐車場近くの高台から、金色と青色の境界線を一枚に収められます。

## おすすめ行程

### 午前
1. **09:00** 台北市内ホテル出発
2. **10:00** 十分老街でランタン体験（約45分）
3. **10:50** 十分瀑布へ徒歩移動
4. **11:10** 瀑布観賞（約40分）

### 午後
5. **12:30** 九份老街でランチ
6. **13:30** 九份散策（約2時間）
7. **15:30** 茶館でアフタヌーンティー

### 夕方
8. **16:15** 黄金瀑布（約15分）
9. **16:40** 陰陽海（約10分）
10. **17:00** 台北へ戻る

## 実用情報

- **ベストシーズン**：通年OK、秋冬（10-12月）が最も雰囲気抜群
- **服装**：歩きやすい靴必須（階段だらけ）、薄手の上着を持参
- **傘必携**：九份は年間を通して雨が多い
- **撮影ベストタイム**：16:30-17:30、提灯が灯る時間帯`,
};

async function main() {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.taipei-jiufen-shifen`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ content }),
    }
  );
  const data = await res.text();
  console.log(`Status: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) console.log(data);
  else console.log('✅ 九份十分一日遊 updated with per-attraction photos!');
}

main();
