// Insert tour guide articles into Supabase
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const guides = [
  {
    slug: 'taipei-jiufen-shifen',
    title: { 'zh-TW': '九份十分一日遊', 'zh-CN': '九份十分一日游', en: 'Jiufen & Shifen Day Trip', ja: '九份・十分日帰りツアー', ko: '지우펀 & 스펀 당일 여행' },
    description: {
      'zh-TW': '從台北出發，走訪九份老街、十分放天燈，沿途欣賞北海岸美景。最經典的北台灣包車路線。',
      'zh-CN': '从台北出发，走访九份老街、十分放天灯，沿途欣赏北海岸美景。最经典的北台湾包车路线。',
      en: 'Depart from Taipei to explore Jiufen Old Street and release sky lanterns at Shifen. The most classic North Taiwan charter route.',
      ja: '台北から出発し、九份老街を散策、十分でランタンを飛ばします。北台湾で最も人気のチャータールートです。',
      ko: '타이베이에서 출발하여 지우펀 거리를 탐험하고 스펀에서 천등을 날려보세요.',
    },
    content: {
      'zh-TW': `## 行程亮點

- **九份老街**：漫步於石階巷弄，品嚐芋圓、草仔粿等道地小吃
- **十分瀑布**：全台最大的簾幕式瀑布，有「台灣尼加拉」之稱
- **十分老街**：在鐵道旁放天燈，許下美好願望
- **黃金瀑布**：金黃色的瀑布奇景，絕佳拍照景點

## 建議行程

### 上午
1. **09:00** 台北市區飯店出發
2. **10:00** 抵達十分老街，放天燈體驗（約1小時）
3. **11:15** 十分瀑布步道（約45分鐘）

### 下午
4. **12:30** 午餐 - 推薦九份老街美食
5. **13:30** 九份老街散步（約2小時）
6. **15:30** 黃金瀑布 & 陰陽海（約30分鐘）
7. **16:30** 返回台北

## 實用資訊

> 天燈費用約 NT$150-200/個，不含在包車費用內

- **最佳季節**：全年皆宜，秋冬有雲霧繚繞的山城氛圍
- **穿著建議**：九份多階梯，建議穿好走的鞋子
- **雨具必備**：九份經常下雨，記得帶傘`,
      en: `## Highlights

- **Jiufen Old Street**: Stroll through stone-paved alleys and taste local treats like taro balls
- **Shifen Waterfall**: Taiwan's largest curtain waterfall, known as "Taiwan's Niagara"
- **Shifen Old Street**: Release sky lanterns by the railway tracks
- **Golden Waterfall**: Stunning golden-colored waterfall, perfect photo spot

## Suggested Itinerary

### Morning
1. **09:00** Depart from Taipei hotel
2. **10:00** Shifen Old Street, sky lantern experience (~1hr)
3. **11:15** Shifen Waterfall trail (~45min)

### Afternoon
4. **12:30** Lunch at Jiufen Old Street
5. **13:30** Explore Jiufen (~2hrs)
6. **15:30** Golden Waterfall & Yin-Yang Sea (~30min)
7. **16:30** Return to Taipei

## Practical Info

> Sky lantern costs about NT$150-200 each, not included in charter fee

- **Best season**: Year-round; autumn/winter offers misty mountain atmosphere
- **Wear**: Comfortable shoes (many stairs)
- **Bring umbrella**: Jiufen is often rainy`,
      ja: `## ハイライト

- **九份老街**：石畳の路地を散策し、タロイモ団子などの地元グルメを堪能
- **十分瀑布**：台湾最大のカーテン滝、「台湾のナイアガラ」
- **十分老街**：線路沿いでランタンを空に放つ
- **黄金瀑布**：黄金色に輝く滝、絶景フォトスポット

## おすすめ行程

### 午前
1. **09:00** 台北市内ホテル出発
2. **10:00** 十分老街、ランタン体験（約1時間）
3. **11:15** 十分瀑布ハイキング（約45分）

### 午後
4. **12:30** 九份老街でランチ
5. **13:30** 九份散策（約2時間）
6. **15:30** 黄金瀑布＆陰陽海（約30分）
7. **16:30** 台北へ戻る`,
    },
    duration_hours: 8,
    city: '台北',
    tags: ['九份', '十分', '天燈', '老街', '北海岸'],
    vehicle_type: 'M',
    is_published: true,
    sort_order: 1,
  },
  {
    slug: 'sun-moon-lake',
    title: { 'zh-TW': '日月潭清境二日遊', 'zh-CN': '日月潭清境二日游', en: 'Sun Moon Lake & Qingjing 2-Day Tour', ja: '日月潭・清境2日間ツアー', ko: '르웨탄 & 칭징 2일 여행' },
    description: {
      'zh-TW': '深入南投秘境，遊覽日月潭湖光山色、清境農場高山風光，體驗最美的台灣中部之旅。',
      en: 'Explore the beauty of central Taiwan with Sun Moon Lake and Qingjing Farm highland scenery.',
      ja: '南投の秘境を巡り、日月潭の湖畔の美しさと清境農場の高原風景をお楽しみください。',
    },
    content: {
      'zh-TW': `## 行程亮點

- **日月潭**：台灣最美的高山湖泊，搭船遊湖、環湖自行車道
- **清境農場**：海拔1,700公尺的高山牧場，青青草原綿羊秀
- **老英格蘭莊園**：歐式城堡建築，彷彿置身英國鄉間
- **武嶺**：台灣公路最高點（海拔3,275公尺）

## 建議行程

### Day 1 - 日月潭
1. **08:00** 台北/台中出發
2. **10:30** 抵達日月潭，搭遊湖船
3. **12:00** 伊達邵碼頭午餐
4. **13:30** 向山遊客中心 & 自行車道
5. **15:30** 玄光寺、文武廟
6. **17:00** 入住日月潭湖畔飯店

### Day 2 - 清境
1. **09:00** 出發前往清境農場
2. **10:30** 青青草原、綿羊秀
3. **12:00** 午餐
4. **13:30** 小瑞士花園
5. **15:00** 返程
6. **18:00** 抵達台北/台中

## 實用資訊

> 日月潭遊湖船票約 NT$300/人、清境農場門票 NT$200/人

- **最佳季節**：秋冬（10-2月）天氣涼爽、雲海壯觀
- **住宿推薦**：日月潭周邊民宿或涵碧樓
- **注意事項**：清境海拔高，注意保暖`,
      en: `## Highlights

- **Sun Moon Lake**: Taiwan's most beautiful alpine lake
- **Qingjing Farm**: Highland farm at 1,700m altitude
- **Old England Manor**: European castle-style architecture

## Itinerary

### Day 1 - Sun Moon Lake
1. **08:00** Depart from Taipei/Taichung
2. **10:30** Sun Moon Lake boat tour
3. **12:00** Lunch at Ita Thao Pier
4. **13:30** Xiangshan Visitor Center & bike path
5. **15:30** Xuanguang Temple
6. **17:00** Check-in lakeside hotel

### Day 2 - Qingjing
1. **09:00** Drive to Qingjing Farm
2. **10:30** Green Grassland & sheep show
3. **12:00** Lunch
4. **13:30** Small Swiss Garden
5. **15:00** Return trip`,
    },
    duration_hours: 8,
    city: '台中',
    tags: ['日月潭', '清境', '南投', '高山', '湖泊'],
    vehicle_type: 'M',
    is_published: true,
    sort_order: 2,
  },
  {
    slug: 'taroko-gorge',
    title: { 'zh-TW': '花蓮太魯閣峽谷一日遊', 'zh-CN': '花莲太鲁阁峡谷一日游', en: 'Taroko Gorge Day Trip', ja: '太魯閣峡谷日帰りツアー', ko: '타로코 협곡 당일 여행' },
    description: {
      'zh-TW': '壯觀的大理石峽谷、清水斷崖、七星潭，花蓮最經典的自然景觀包車路線。',
      en: 'Spectacular marble gorge, Qingshui Cliff, and Qixingtan Beach - the most iconic Hualien nature route.',
      ja: '壮大な大理石の峡谷、清水断崖、七星潭。花蓮で最も人気の自然景観ルート。',
    },
    content: {
      'zh-TW': `## 行程亮點

- **太魯閣國家公園**：世界級大理石峽谷地形
- **燕子口步道**：峽谷最窄處，壯麗的峭壁景觀
- **砂卡礑步道**：翡翠綠溪水，絕美的親水步道
- **清水斷崖**：蘇花公路最美路段，山海交接的震撼
- **七星潭**：弧形的礫石海灘，遠眺太平洋

## 建議行程

### 上午
1. **08:00** 花蓮市區出發
2. **08:30** 清水斷崖觀景台（約30分鐘）
3. **09:30** 太魯閣遊客中心
4. **10:00** 砂卡礑步道（約1.5小時）

### 下午
5. **12:00** 天祥午餐
6. **13:00** 燕子口步道（約1小時）
7. **14:30** 長春祠（約30分鐘）
8. **15:30** 七星潭（約1小時）
9. **17:00** 返回花蓮市區

## 實用資訊

> 太魯閣國家公園免費入園，部分步道需申請入山證

- **最佳季節**：4-6月、9-11月（避開颱風季）
- **安全提醒**：落石區域請戴安全帽（遊客中心可借）
- **穿著建議**：防滑鞋、防曬用品`,
      en: `## Highlights

- **Taroko National Park**: World-class marble gorge
- **Swallow Grotto Trail**: Narrowest section with towering cliffs
- **Shakadang Trail**: Emerald green river, stunning waterside walk
- **Qingshui Cliff**: Where mountains meet the Pacific Ocean
- **Qixingtan Beach**: Crescent-shaped pebble beach

## Itinerary

### Morning
1. **08:00** Depart Hualien city
2. **08:30** Qingshui Cliff viewpoint (~30min)
3. **09:30** Taroko Visitor Center
4. **10:00** Shakadang Trail (~1.5hrs)

### Afternoon
5. **12:00** Lunch at Tianxiang
6. **13:00** Swallow Grotto Trail (~1hr)
7. **14:30** Eternal Spring Shrine (~30min)
8. **15:30** Qixingtan Beach (~1hr)
9. **17:00** Return to Hualien`,
    },
    duration_hours: 8,
    city: '花蓮',
    tags: ['太魯閣', '峽谷', '清水斷崖', '七星潭', '國家公園'],
    vehicle_type: 'M',
    is_published: true,
    sort_order: 3,
  },
  {
    slug: 'kenting-south',
    title: { 'zh-TW': '墾丁南灣一日遊', 'zh-CN': '垦丁南湾一日游', en: 'Kenting South Bay Day Trip', ja: '墾丁サウスベイ日帰りツアー', ko: '컨딩 사우스베이 당일 여행' },
    description: {
      'zh-TW': '台灣最南端的熱帶天堂，白沙灣、鵝鑾鼻燈塔、龍磐草原，感受南台灣的陽光與海風。',
      en: "Taiwan's southernmost tropical paradise - White Sand Bay, Eluanbi Lighthouse, and Longpan Grassland.",
      ja: '台湾最南端のトロピカルパラダイス。白砂湾、鵝鑾鼻灯台、龍磐草原。',
    },
    content: {
      'zh-TW': `## 行程亮點

- **鵝鑾鼻燈塔**：台灣最南端的地標，百年歷史燈塔
- **龍磐公園**：站在斷崖上俯瞰太平洋，草原與大海的壯闊
- **白沙灣**：《少年Pi》取景地，純白沙灘、清澈海水
- **後壁湖**：新鮮海產市集，CP值超高的海鮮午餐
- **南灣**：墾丁最熱鬧的海灘，水上活動天堂

## 建議行程

### 上午
1. **08:30** 高雄/屏東出發
2. **10:30** 龍磐公園（約30分鐘）
3. **11:15** 鵝鑾鼻公園 & 燈塔（約1小時）

### 下午
4. **12:30** 後壁湖海鮮午餐
5. **13:30** 白沙灣（約1小時）
6. **15:00** 南灣海灘自由活動
7. **16:30** 返程

## 實用資訊

> 鵝鑾鼻公園門票 NT$60/人

- **最佳季節**：4-10月（適合水上活動）
- **必帶物品**：防曬乳、泳衣、墨鏡
- **推薦美食**：後壁湖生魚片、恆春綠豆蒜`,
      en: `## Highlights

- **Eluanbi Lighthouse**: Taiwan's southernmost landmark
- **Longpan Park**: Pacific Ocean cliffs and grasslands
- **White Sand Bay**: Life of Pi filming location
- **Houbihu**: Fresh seafood market

## Itinerary

### Morning
1. **08:30** Depart from Kaohsiung
2. **10:30** Longpan Park (~30min)
3. **11:15** Eluanbi Park & Lighthouse (~1hr)

### Afternoon
4. **12:30** Seafood lunch at Houbihu
5. **13:30** White Sand Bay (~1hr)
6. **15:00** South Bay free time
7. **16:30** Return trip`,
    },
    duration_hours: 8,
    city: '高雄',
    tags: ['墾丁', '海灘', '燈塔', '海鮮', '南台灣'],
    vehicle_type: 'M',
    is_published: true,
    sort_order: 4,
  },
  {
    slug: 'alishan-forest',
    title: { 'zh-TW': '阿里山森林鐵路一日遊', 'zh-CN': '阿里山森林铁路一日游', en: 'Alishan Forest Railway Day Trip', ja: '阿里山森林鉄道日帰りツアー', ko: '아리산 산림철도 당일 여행' },
    description: {
      'zh-TW': '搭乘百年森林小火車、漫步神木群、觀賞壯麗日出雲海，阿里山是台灣最具代表性的山林之旅。',
      en: 'Ride the century-old forest railway, walk among ancient trees, and witness the magnificent sunrise at Alishan.',
      ja: '百年の森林鉄道に乗り、巨木群を散策、壮大な日の出と雲海を鑑賞。',
    },
    content: {
      'zh-TW': `## 行程亮點

- **阿里山森林鐵路**：世界僅存的三條高山鐵路之一
- **神木群步道**：千年紅檜巨木，森林浴的最佳去處
- **姊妹潭**：靜謐的高山湖泊，傳說中的姊妹愛情故事
- **祝山觀日平台**：海拔2,489公尺，觀賞玉山日出最佳地點
- **奮起湖**：鐵路便當的發源地，懷舊的山城小鎮

## 建議行程

### 上午
1. **06:00** 嘉義市區出發
2. **08:30** 抵達阿里山國家森林遊樂區
3. **09:00** 巨木群步道（約1.5小時）
4. **10:30** 姊妹潭 & 受鎮宮

### 下午
5. **11:30** 搭乘森林小火車至神木站
6. **12:30** 奮起湖鐵路便當午餐
7. **14:00** 奮起湖老街散步
8. **15:00** 返程下山
9. **17:30** 抵達嘉義

## 實用資訊

> 阿里山森林遊樂區門票 NT$300/人、森林鐵路單程約 NT$100

- **最佳季節**：3-4月（櫻花季）、10-12月（楓葉季）
- **日出觀賞**：需前一天住宿阿里山，凌晨搭祝山線小火車
- **穿著建議**：山上氣溫比平地低10度以上，務必帶外套`,
      en: `## Highlights

- **Alishan Forest Railway**: One of only 3 mountain railways in the world
- **Giant Tree Trail**: Thousand-year-old red cypress, perfect forest bathing
- **Sister Ponds**: Serene alpine lakes with romantic legends
- **Zhushan Sunrise Platform**: Best sunrise viewing at 2,489m

## Itinerary

### Morning
1. **06:00** Depart from Chiayi
2. **08:30** Arrive at Alishan National Forest
3. **09:00** Giant Tree Trail (~1.5hrs)
4. **10:30** Sister Ponds

### Afternoon
5. **11:30** Forest railway to Sacred Tree Station
6. **12:30** Railway bento lunch at Fenqihu
7. **14:00** Fenqihu Old Street
8. **15:00** Return trip
9. **17:30** Arrive Chiayi`,
    },
    duration_hours: 8,
    city: '嘉義',
    tags: ['阿里山', '森林鐵路', '日出', '神木', '雲海'],
    vehicle_type: 'M',
    is_published: true,
    sort_order: 5,
  },
];

async function insertGuides() {
  const res = await fetch(`${SUPABASE_URL}/tour_guides`, {
    method: 'POST',
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(guides),
  });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Inserted:', Array.isArray(data) ? data.length : 0, 'guides');
  if (!res.ok) console.log('Error:', JSON.stringify(data, null, 2));
}

insertGuides();
