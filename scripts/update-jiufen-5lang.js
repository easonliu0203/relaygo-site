// Update 九份十分一日遊 guide with all 5 languages: zh-TW, en, ja, zh-CN, ko
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

  'zh-CN': `## 为什么选这条线路？

九份和十分是北台湾最经典的包车线路，一天就能打卡"山城怀旧"和"铁道浪漫"两种完全不同的风格。从台北出发大约1小时车程，沿途还能顺路看黄金瀑布、阴阳海这些自然奇观，性价比超高，第一次来台湾强烈推荐。

## 行程亮点

### 🏮 九份老街 — 千与千寻同款取景地

${photoMd('jiufen', '九份老街的红灯笼与石阶小巷')}

九份因为侯孝贤的《悲情城市》出圈，层层叠叠的山城建筑、弯弯绕绕的石阶小巷、挂满红灯笼的茶楼，怎么拍都好看。很多人说这里就是宫崎骏《千与千寻》的灵感来源（虽然吉卜力官方没有承认），但走在基山街上，真的很难不联想到动画里的场景。

**必吃美食：**
- **阿柑姨芋圆** — 九份人气最高的芋圆店，在山顶边吃边看海，出片率超高
- **赖阿婆芋圆** — 另一家老字号，口感偏Q弹，各有粉丝
- **阿兰草仔粿** — 咸甜两种口味都有，铜板小吃，地道古早味
- **护理长的店** — 卤肉饭配鱼丸汤，本地人的平价午餐之选

${photoMd('jiufenTea', '九份茶楼 — 在百年老屋里喝茶看海')}

- **九份茶坊** — 百年老屋改的茶馆，推荐东方美人茶，边喝边看海超惬意

**拍照攻略：** 竖崎路的阶梯是最出片的机位，建议傍晚灯笼亮起后再拍，氛围感拉满。工作日来人少很多，不用排队等机位。最佳拍摄时间是16:30-17:30，天色渐暗、灯笼刚亮的时候。

### 🎆 十分老街 — 在铁轨上放天灯许愿

${photoMd('lantern', '十分天灯 — 铁道上放天灯的浪漫瞬间')}

十分老街最特别的地方就是——火车直接从街中间开过去。在铁轨上放天灯是全台湾独一份的体验，看着天灯慢慢飘上天空、带着你的愿望越飞越高，很多人说这是来台湾最难忘的瞬间。

**天灯小贴士：**
- 单色天灯红色最热门（代表幸福好运）
- 四色天灯可以四面写不同的愿望，适合拍照打卡
- 店家会帮忙拍照和点火，不用担心操作问题

> 温馨提示：放天灯之前记得看一下火车时刻表！虽然现场有工作人员提醒，但自己注意一下更稳妥。

### 💧 十分瀑布 — 台湾版尼亚加拉瀑布

${photoMd('shifenWaterfall', '十分瀑布 — 全台最大的帘幕式瀑布')}

十分瀑布宽约40米、落差约20米，是全台湾最大的帘幕式瀑布。水量大的时候气势磅礴，站在观景台上能感觉到水雾扑面而来。从老街走到瀑布大约15-20分钟，步道很平坦，老人小孩都能走。

**拍照攻略：** 瀑布下方的观景台是最佳机位，能拍到完整的帘幕状水瀑全景。雨季（5-9月）水量最大最壮观。建议带个防水袋保护手机，水雾真的很大。

### ✨ 黄金瀑布 & 阴阳海 — 大自然的调色盘

${photoMd('yinyangSea', '阴阳海 — 金黄与湛蓝的分界线')}

黄金瀑布因为矿物质氧化，整个瀑布呈现金黄色，阳光下闪闪发光，随手一拍就是大片。旁边的阴阳海是因为酸性矿水流入大海，形成一半金黄一半湛蓝的奇观。这两个点离得很近，路边停车就能看，完全不用走路。

${photoMd('yinyangSea2', '从山上俯瞰阴阳海全景')}

**拍照攻略：** 黄金瀑布在下午阳光直射时最好看，金灿灿的特别上镜。阴阳海最佳观景点在水湳洞停车场旁边的高处，能同时拍到金色和蓝色的分界线，航拍视角更绝。

## 建议行程安排

### 上午 — 十分放天灯
1. **09:00** 台北市区酒店出发，走高速接62快速路
2. **10:00** 到达十分老街，选一家天灯店、写愿望、放天灯（约45分钟）
3. **10:50** 步行前往十分瀑布（步道约15分钟）
4. **11:10** 十分瀑布观景拍照（约40分钟）

### 下午 — 九份逛吃
5. **12:00** 开车前往九份（车程约30分钟）
6. **12:30** 午饭 — 在九份老街逛吃（推荐阿柑姨芋圆 + 阿兰草仔粿）
7. **13:30** 慢慢逛九份老街，打卡基山街、竖崎路、升平戏院（约2小时）
8. **15:30** 找个茶馆坐下喝茶看海（推荐九份茶坊或阿妹茶楼）

### 傍晚 — 自然奇观
9. **16:15** 开车到黄金瀑布（车程5分钟，停留约15分钟）
10. **16:40** 阴阳海观景台（停留10分钟）
11. **17:00** 返回台北（约1-1.5小时，看路况）

## 实用tips

- **最佳季节**：全年都能去，但秋冬（10-12月）氛围最好 — 山城云雾缭绕，配上红灯笼特别出片
- **避开人流**：工作日去人少很多；周末建议早上9点前出发，避开中午的旅游大巴团
- **穿搭建议**：九份全程都是台阶，一定穿舒服的运动鞋。山上比市区凉3-5度，带件薄外套
- **雨具必带**：九份常年下雨（尤其冬天东北季风的时候），一定要带伞或者雨衣
- **拍照时间**：竖崎路最佳拍摄时间是傍晚16:30-17:30，天色渐暗灯笼亮起的时候最有feel`,

  'ko': `## 왜 이 코스인가요?

지우펀(九份)과 스펀(十分)은 북부 타이완에서 가장 인기 있는 차량 투어 코스입니다. 하루 만에 "산성 마을의 옛 정취"와 "철도 위의 로맨스"를 모두 체험할 수 있어요. 타이베이에서 약 1시간 거리이며, 황금폭포와 음양해까지 포함된 타이완 첫 여행 필수 코스입니다.

## 주요 볼거리

### 🏮 지우펀 老街 — 지브리 애니메이션 속 그곳

${photoMd('jiufen', '지우펀 老街의 붉은 등불과 돌계단 골목')}

영화 '비정성시(悲情城市)'로 유명해진 지우펀은 돌계단 골목, 붉은 등불이 흔들리는 찻집, 태평양이 내려다보이는 절경이 특징입니다. 미야자키 하야오의 '센과 치히로의 행방불명'의 모델이라는 이야기도 있어요(지브리 공식 확인은 없지만, 직접 가보면 정말 그 분위기가 납니다).

**꼭 먹어야 할 맛집:**
- **아간이 芋圓(阿柑姨芋圓)** — 지우펀에서 가장 유명한 토란 경단 가게, 산꼭대기에서 바다를 보며 먹는 맛이 일품
- **라이아포 芋圓(賴阿婆芋圓)** — 또 다른 노포, 식감이 조금 다르니 취향껏 선택
- **아란 草仔粿(阿蘭草仔粿)** — 짭짤한 맛과 달콤한 맛 두 종류, 저렴한 전통 간식
- **후리장의 가게(護理長的店)** — 루로우판(滷肉飯)에 어묵탕 한 그릇, 현지인 추천 점심 맛집

${photoMd('jiufenTea', '지우펀 찻집 — 백 년 된 건물에서 차 한잔과 바다 풍경')}

- **지우펀 茶坊(九份茶坊)** — 백 년 고택에서 동방미인차를 즐기며 바다 감상, 여유로운 오후에 추천

**사진 촬영 팁:** 수치루(豎崎路) 계단이 가장 인생샷 포인트입니다. 저녁에 등불이 켜진 후(16:30-17:30)에 촬영하면 분위기가 최고예요. 평일에 가면 사람이 훨씬 적어서 좋은 사진을 찍기 쉽습니다.

### 🎆 스펀 老街 — 철도 위에서 띄우는 천등 소원

${photoMd('lantern', '스펀 천등 — 철도 위에서 하늘로 날아가는 소원등')}

스펀 老街의 가장 특별한 점은 기차가 거리 한가운데를 지나간다는 것입니다. 철도 위에서 천등에 소원을 적고 하늘로 날려보내는 체험은 타이완에서만 할 수 있는 유일무이한 경험이에요. 천등이 천천히 하늘로 올라가는 모습을 보면 정말 감동적입니다.

**천등 알아두면 좋은 정보:**
- 단색 천등은 빨간색이 가장 인기(행복을 상징)
- 4색 천등은 네 면에 각각 다른 소원을 쓸 수 있어요
- 가게 직원이 사진 촬영과 점화를 도와줍니다

> 참고: 천등을 날리기 전에 기차 시간표를 꼭 확인하세요! 현장 직원이 안내해주지만, 본인도 주의하는 게 안전합니다.

### 💧 스펀 瀑布 — 타이완의 나이아가라

${photoMd('shifenWaterfall', '스펀 瀑布 — 타이완 최대의 커튼형 폭포')}

스펀 폭포는 폭 약 40m, 낙차 약 20m로 타이완 최대의 커튼형 폭포입니다. 수량이 많을 때는 정말 장관이고, 전망대에서 물보라를 느낄 수 있어요. 老街에서 도보 15-20분, 산책로가 평탄해서 걷기 편합니다.

**사진 촬영 팁:** 폭포 아래쪽 전망대에서 커튼형 폭포 전경을 담을 수 있습니다. 우기(5-9월)에 수량이 가장 많아 가장 장관이에요. 물보라가 많으니 핸드폰 방수 케이스를 꼭 준비하세요.

### ✨ 황금폭포 & 음양해 — 자연이 만든 팔레트

${photoMd('yinyangSea', '음양해 — 금빛과 짙은 파란색의 경계')}

황금폭포는 광물 산화 때문에 폭포 전체가 금빛을 띠며, 햇빛 아래에서 반짝반짝 빛납니다. 바로 옆의 음양해는 산성 광천수가 바다로 흘러들어가 한쪽은 금빛, 한쪽은 짙은 파란색인 신기한 풍경을 만들어냅니다. 두 곳 다 차에서 내리면 바로 볼 수 있어서 편해요.

${photoMd('yinyangSea2', '산 위에서 내려다본 음양해 전경')}

**사진 촬영 팁:** 황금폭포는 오후 직사광선이 비칠 때 가장 금빛으로 빛납니다. 음양해는 수이난동(水湳洞) 주차장 옆 높은 곳에서 금색과 파란색 경계선을 한 프레임에 담을 수 있어요.

## 추천 일정

### 오전 — 스펀에서 천등 날리기
1. **09:00** 타이베이 시내 호텔 출발
2. **10:00** 스펀 老街 도착, 천등 가게에서 소원 적고 천등 날리기 (약 45분)
3. **10:50** 스펀 폭포로 도보 이동 (약 15분)
4. **11:10** 폭포 감상 및 사진 촬영 (약 40분)

### 오후 — 지우펀 탐방
5. **12:00** 지우펀으로 이동 (차로 약 30분)
6. **12:30** 점심 — 지우펀 老街에서 맛집 탐방 (아간이 芋圓 + 아란 草仔粿 추천)
7. **13:30** 지우펀 老街 산책, 기산제(基山街)·수치루(豎崎路)·승평극장(昇平戲院) 둘러보기 (약 2시간)
8. **15:30** 찻집에서 차 한잔하며 바다 감상 (九份茶坊 또는 아메이 茶樓 추천)

### 저녁 — 자연 절경
9. **16:15** 황금폭포로 이동 (차로 5분, 약 15분 체류)
10. **16:40** 음양해 전망대 (약 10분)
11. **17:00** 타이베이로 귀환 (약 1-1.5시간)

## 실용 정보

- **베스트 시즌**: 연중 가능하지만, 가을·겨울(10-12월)이 분위기 최고 — 산성 마을에 운무가 끼고 등불이 어우러져 환상적
- **인파 피하기**: 평일이 훨씬 한가합니다. 주말에는 오전 9시 전에 출발해서 점심 관광버스 단체를 피하세요
- **복장 추천**: 지우펀은 전부 계단이라 편한 운동화 필수. 산 위는 시내보다 3-5도 서늘하니 얇은 겉옷을 챙기세요
- **우산 필수**: 지우펀은 연중 비가 많습니다(특히 겨울 북동 계절풍 시기). 우산이나 우비를 꼭 가져가세요
- **촬영 골든타임**: 수치루 계단의 베스트 촬영 시간은 16:30-17:30, 해가 지면서 등불이 켜지는 그 순간이 최고입니다`,
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
  else console.log('✅ 九份十分一日遊 updated with all 5 languages (zh-TW, en, ja, zh-CN, ko)!');
}

main();
