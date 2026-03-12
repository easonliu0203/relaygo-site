// Update tour guide articles with rich, magazine-quality content
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

async function updateGuide(slug, content) {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.${slug}`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ content }),
    }
  );
  const data = await res.json();
  console.log(`${slug}: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) console.log(JSON.stringify(data));
}

async function main() {

// ===== 1. 九份十分 =====
await updateGuide('taipei-jiufen-shifen', {
'zh-TW': `## 為什麼選這條路線？

九份與十分是北台灣最具代表性的包車路線，一天之內就能體驗「山城懷舊」與「鐵道浪漫」兩種截然不同的氛圍。從台北出發車程約1小時，沿途還能順遊黃金瀑布、陰陽海等自然奇觀，是第一次來台灣的旅客必訪路線。

## 行程亮點

### 🏮 九份老街 — 宮崎駿靈感之地

九份因電影《悲情城市》聲名大噪，層層堆疊的山城建築、蜿蜒的石階巷弄、紅燈籠高掛的茶樓，營造出獨特的懷舊氛圍。許多人說這裡是宮崎駿《神隱少女》的靈感來源（雖然吉卜力官方未證實），但走在基山街上，你很難不聯想到動畫中的場景。

**必吃美食：**
- **阿柑姨芋圓** — 九份最有名的芋圓店，位在山頂可以邊吃邊看海景，一碗 NT$50
- **賴阿婆芋圓** — 另一家老字號，口感略有不同，各有擁護者
- **阿蘭草仔粿** — 鹹甜兩種口味，銅板價的在地古早味
- **護理長的店** — 滷肉飯配一碗魚丸湯，在地人的午餐選擇
- **九份茶坊** — 在百年老屋裡品茶看海，推薦東方美人茶

**拍照秘訣：** 豎崎路的階梯是最經典的取景角度，建議傍晚時分燈籠亮起後拍攝最有氛圍。平日人潮較少，更容易拍到好照片。

### 🎆 十分老街 — 鐵道上的天燈祈願

十分老街最特別的地方在於——火車會直接從老街中間穿過。在鐵軌上放天燈是全台灣獨一無二的體驗，看著天燈緩緩升空、帶著你的願望飛向天際，是很多旅客來台灣最難忘的回憶。

**天燈價格：**
- 單色天燈 NT$150（紅色最受歡迎）
- 四色天燈 NT$200（可以四面寫不同願望）
- 店家會幫忙拍照和點火

> 小提醒：天燈施放前記得確認火車時刻！雖然有工作人員會提醒，但自己注意更安全。

### 💧 十分瀑布 — 台灣版尼加拉瀑布

十分瀑布寬度約40公尺、落差約20公尺，是全台最大的簾幕式瀑布。水量充沛時氣勢磅礡，站在觀景台上能感受到水霧撲面。從老街步行到瀑布約15-20分鐘，沿途步道平坦好走。

**門票：** 免費入場（開放時間 09:00-17:00，最後入場 16:30）

### ✨ 黃金瀑布 & 陰陽海 — 大自然的調色盤

黃金瀑布因為礦物質氧化，整座瀑布呈現金黃色澤，在陽光下閃閃發光。附近的陰陽海則是因為酸礦水匯入海洋，形成一半金黃、一半湛藍的奇特景觀。這兩個景點距離很近，車停路邊就能欣賞，不需要走很多路。

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

## 費用估算

| 項目 | 費用 |
|------|------|
| 天燈（四色） | NT$200/個 |
| 九份美食 | NT$200-400/人 |
| 茶館品茶 | NT$200-500/人 |
| 十分瀑布 | 免費 |
| **小計（不含包車）** | **約 NT$400-900/人** |

## 實用貼士

- **最佳季節**：全年皆宜，但秋冬（10-12月）最有氛圍 — 山城裡雲霧繚繞，配上燈籠別有一番風味
- **避開人潮**：平日前往人潮少很多；假日建議早上9點前出發，避開中午的觀光巴士團
- **穿著建議**：九份全程都是階梯，請穿好走的鞋子。山上比平地涼3-5度，帶件薄外套
- **雨具必備**：九份全年降雨機率高（尤其東北季風季節），務必帶傘或雨衣
- **拍照時機**：豎崎路的最佳拍攝時間是傍晚 16:30-17:30，天色漸暗、燈籠亮起時最美`,

en: `## Why This Route?

Jiufen and Shifen represent the best of northern Taiwan in a single day — nostalgic mountain town charm meets railway romance. Just one hour from Taipei, this route also includes the stunning Golden Waterfall and Yin-Yang Sea, making it an essential first-time visitor experience.

## Highlights

### 🏮 Jiufen Old Street — Studio Ghibli's Inspiration

Jiufen rose to fame through the film "A City of Sadness" and is often linked to the aesthetic of Miyazaki's "Spirited Away." Narrow stone-paved alleys wind through hillside buildings draped in red lanterns, with tea houses overlooking the Pacific Ocean.

**Must-Eat Foods:**
- **Ah-Gan Auntie Taro Balls** — The most famous taro ball shop, with ocean views from the hilltop, NT$50/bowl
- **Grandma Lai's Taro Balls** — The other classic option, slightly different texture
- **Ah-Lan Grass Cake** — Traditional savory-sweet rice cakes, under NT$20 each
- **Jiufen Teahouse** — Sip Oriental Beauty tea in a century-old building with sea views

**Photo Tips:** The stone stairway at Shuqi Road is the iconic angle. Visit in late afternoon when the lanterns light up (around 5PM) for the most atmospheric shots.

### 🎆 Shifen Old Street — Sky Lantern Wishes on Railway Tracks

What makes Shifen unique is that trains run right through the middle of the old street. Writing your wishes on a sky lantern and watching it float into the sky above the railway tracks is one of Taiwan's most unforgettable experiences.

**Sky Lantern Prices:**
- Single-color lantern: NT$150 (red is most popular)
- Four-color lantern: NT$200 (write different wishes on each side)
- Shop staff will help with photos and lighting

### 💧 Shifen Waterfall — Taiwan's Niagara

At 40 meters wide and 20 meters tall, Shifen Waterfall is Taiwan's largest curtain-type waterfall. The walk from the old street takes about 15-20 minutes on flat, well-maintained trails. Free admission.

### ✨ Golden Waterfall & Yin-Yang Sea

The Golden Waterfall gets its color from mineral oxidation, creating a shimmering golden cascade. Nearby, the Yin-Yang Sea shows a dramatic split between golden-brown and deep blue waters where mineral-rich streams meet the ocean.

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

## Cost Estimate

| Item | Cost |
|------|------|
| Sky lantern (4-color) | NT$200 each |
| Jiufen street food | NT$200-400/person |
| Teahouse | NT$200-500/person |
| Shifen Waterfall | Free |
| **Subtotal (excl. charter)** | **~NT$400-900/person** |

## Practical Tips

- **Best Season**: Year-round, but autumn/winter (Oct-Dec) is most atmospheric with mountain mist
- **Avoid Crowds**: Weekdays are much quieter; on weekends, depart before 9AM
- **Wear**: Comfortable walking shoes — Jiufen is all stairs. Bring a light jacket (3-5°C cooler than Taipei)
- **Bring Umbrella**: Jiufen is rainy year-round, especially during northeast monsoon season
- **Best Photo Time**: Shuqi Road stairs look best at 4:30-5:30PM when lanterns light up`,

ja: `## なぜこのルート？

九份と十分は北台湾を代表する包車ルートです。ノスタルジックな山城と鉄道ロマンスを一日で体験できます。台北から約1時間、黄金瀑布や陰陽海も含めた、初めての台湾旅行に最適なコースです。

## ハイライト

### 🏮 九份老街 — ジブリの世界

映画『悲情城市』で有名になった九份は、石畳の路地、赤い提灯が揺れる茶楼、太平洋を望む絶景が特徴です。宮崎駿の『千と千尋の神隠し』のモデルとも言われています。

**必食グルメ：**
- **阿柑姨芋圓** — 山頂から海を眺めながら食べるタロイモ団子、NT$50
- **阿蘭草仔粿** — 伝統的な草餅、1個NT$20以下
- **九份茶坊** — 百年の建物で東方美人茶を楽しむ

### 🎆 十分老街 — 線路上のランタン

十分の最大の特徴は、列車が商店街の真ん中を通ること。線路の上でランタンに願いを書いて空に放つ体験は、台湾旅行で最も印象的な思い出になるでしょう。

**ランタン料金：** 単色NT$150、四色NT$200

### 💧 十分瀑布 — 台湾のナイアガラ

幅40m、落差20mの台湾最大のカーテン型瀑布。入場無料。

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
- **撮影ベストタイム**：16:30-17:30、提灯が灯る時間帯`
});

// ===== 2. 日月潭清境 =====
await updateGuide('sun-moon-lake', {
'zh-TW': `## 為什麼選這條路線？

日月潭與清境農場是台灣中部最具代表性的兩大景點。日月潭的湖光山色被《國家地理雜誌》評選為全球最美的單車路線之一，而清境農場的高山草原有「台灣小瑞士」的美譽。兩天一夜的行程，讓你從湖畔到高山，完整體驗台灣中部的壯闊與寧靜。

## 行程亮點

### 🌊 日月潭 — 台灣的瑰寶

日月潭海拔748公尺，是全台最大的天然湖泊。湖面被拉魯島分為「日潭」與「月潭」，因此得名。清晨的日月潭常有薄霧繚繞，湖面如鏡，是攝影愛好者的天堂。

**遊湖方式：**
- **遊湖船**：三大碼頭巡迴（水社→玄光寺→伊達邵），船票 NT$300/人，班次密集
- **環湖自行車道**：全長約30公里，其中「向山段」被CNN評為全球最美單車道之一。腳踏車租借約 NT$200-300/天
- **SUP 立槳**：日月潭上划 SUP 是近年最熱門的體驗，約 NT$1,200-1,500/人

**在地美食：**
- **伊達邵碼頭美食街** — 刈包、山豬肉香腸、小米麻糬、紅茶蛋
- **日月潭紅茶** — 全台最頂級的阿薩姆紅茶產區，推薦台茶18號「紅玉」，茶香中帶有薄荷與肉桂香
- **總統魚** — 日月潭特有的曲腰魚，因蔣經國總統喜愛而得名

**隱藏景點：**
- **向山遊客中心** — 日本建築師團紀彥設計，清水模建築本身就是藝術品
- **日月老茶廠** — 百年茶廠改建，免費參觀，可品茶購茶
- **猫囒山步道** — 輕鬆的茶園步道，山頂可360度俯瞰日月潭全景

### 🐑 清境農場 — 台灣的小瑞士

清境農場位於海拔1,700-2,000公尺的高山上，廣闊的青青草原、悠閒的綿羊、遠處的中央山脈，加上常出現的雲海，真的有種置身歐洲的錯覺。

**必看體驗：**
- **綿羊秀**（每週六日 09:30/14:30）— 紐西蘭籍牧羊人表演剪羊毛秀，互動性十足
- **馬術秀**（每週二至日 10:45/15:45）— 騎師表演各種馬術特技
- **天空步道** — 海拔1,700公尺的高架步道，全長1.6公里，門票 NT$50
- **老英格蘭莊園** — 不住也可以參觀大廳，歐式城堡建築超好拍

**觀星秘境：** 清境的光害少、海拔高，是台灣最佳的觀星地點之一。夏天的銀河特別壯觀。

## 建議行程安排

### Day 1 — 日月潭
1. **08:00** 台北/台中出發（台中出發約1.5小時，台北約3.5小時）
2. **10:00** 向山遊客中心，環湖自行車道騎行（約1.5小時）
3. **11:30** 搭遊湖船，水社→玄光寺（步行到玄光寺品嚐阿婆茶葉蛋）
4. **12:30** 船到伊達邵碼頭，美食街午餐
5. **14:00** 文武廟（居高臨下的壯觀廟宇，可以丟許願法器）
6. **15:00** 日月老茶廠（品茶、買伴手禮）
7. **16:30** 入住湖畔飯店，自由活動
8. **傍晚** 湖畔散步看夕陽

### Day 2 — 清境
1. **08:30** 退房出發前往清境（車程約1.5小時）
2. **10:00** 青青草原散步、與綿羊互動、看綿羊秀
3. **11:30** 天空步道（高架步道眺望中央山脈）
4. **12:30** 午餐 — 推薦清境雲舞樓或清境好雞婆土雞城
5. **13:30** 小瑞士花園（歐式花園、水池倒影）
6. **14:30** 返程下山
7. **17:00-18:00** 抵達台中/台北

## 費用估算

| 項目 | 費用 |
|------|------|
| 遊湖船 | NT$300/人 |
| 自行車租借 | NT$200-300/天 |
| 清境農場門票 | NT$200/人（假日）/ NT$160（平日） |
| 天空步道 | NT$50/人 |
| 住宿（湖畔中價位） | NT$3,000-6,000/晚 |
| 餐飲 | NT$600-1,000/人/天 |
| **小計（不含包車）** | **約 NT$4,000-8,000/人** |

## 實用貼士

- **最佳季節**：秋冬（10-2月）天氣涼爽、雲海出現機率高；春天（3-4月）清境有櫻花
- **住宿推薦**：日月潭 — 涵碧樓（頂級）、雲品酒店（中高）、民宿群（親民）
- **穿著建議**：清境比平地低10度以上，冬天可能接近0度，務必帶厚外套
- **週末避開**：清境假日人潮爆滿，建議安排週間前往
- **加碼推薦**：如果時間充裕，可以加走武嶺（台灣公路最高點 3,275m），從清境上去車程約40分鐘`,

en: `## Why This Route?

Sun Moon Lake and Qingjing Farm are central Taiwan's two crown jewels. Sun Moon Lake was named one of the world's most beautiful cycling routes by National Geographic, while Qingjing Farm's highland meadows are known as "Taiwan's Little Switzerland." This 2-day itinerary takes you from lakeside tranquility to mountain grandeur.

## Highlights

### 🌊 Sun Moon Lake — Taiwan's Treasure

At 748 meters elevation, Sun Moon Lake is Taiwan's largest natural lake. The lake is split by Lalu Island into a "sun" side and "moon" side, hence the name. Dawn brings mystical mist that makes the lake look like a mirror.

**Ways to Explore:**
- **Boat Tour**: Connects three piers (Shuishe→Xuanguang→Ita Thao), NT$300/person
- **Cycling**: The 30km lakeside path was named one of the world's most beautiful by CNN. Bike rental ~NT$200-300/day
- **SUP Paddleboarding**: The most popular new activity, ~NT$1,200-1,500/person

**Local Food:**
- **Ita Thao Food Street** — Wild boar sausage, mochi, tea eggs
- **Sun Moon Lake Black Tea** — Taiwan's finest Assam tea region. Try "Ruby" (Tea #18)
- **President Fish** — A local species loved by former President Chiang Ching-kuo

### 🐑 Qingjing Farm — Taiwan's Little Switzerland

Perched at 1,700-2,000m, Qingjing's rolling green meadows, grazing sheep, and Central Mountain Range backdrop genuinely evoke the Swiss Alps.

**Must-See:**
- **Sheep Show** (Sat-Sun 09:30/14:30) — Interactive sheep-shearing by New Zealand shepherds
- **Skywalk** — 1.6km elevated walkway at 1,700m, NT$50
- **Old England Manor** — Gothic-style castle, amazing photo spot even if you don't stay

## Itinerary

### Day 1 — Sun Moon Lake
1. **08:00** Depart Taipei/Taichung
2. **10:00** Xiangshan Visitor Center + cycling (~1.5hrs)
3. **11:30** Boat to Xuanguang Temple (try the famous tea eggs)
4. **12:30** Lunch at Ita Thao food street
5. **14:00** Wenwu Temple
6. **15:00** Sun Moon Lake Old Tea Factory
7. **16:30** Check in, sunset walk by the lake

### Day 2 — Qingjing
1. **08:30** Drive to Qingjing (~1.5hrs)
2. **10:00** Green Grassland, sheep interaction
3. **11:30** Skywalk with mountain views
4. **12:30** Lunch
5. **13:30** Small Swiss Garden
6. **14:30** Return trip
7. **17:00-18:00** Arrive Taichung/Taipei

## Practical Tips

- **Best Season**: Fall/winter for cloud seas; spring (Mar-Apr) for cherry blossoms at Qingjing
- **Clothing**: Qingjing is 10°C+ cooler than lowlands; bring warm layers
- **Avoid Weekends**: Qingjing gets extremely crowded on holidays
- **Bonus**: Add Wuling Pass (3,275m, Taiwan's highest paved road) — 40min drive from Qingjing`
});

// ===== 3. 太魯閣 =====
await updateGuide('taroko-gorge', {
'zh-TW': `## 為什麼選這條路線？

太魯閣國家公園是台灣最壯觀的自然地景，歷經數百萬年的立霧溪切割，形成了世界級的大理石峽谷。峽谷最窄處不到10公尺，兩側卻是數百公尺高的垂直峭壁，大自然的鬼斧神工令人震撼。搭配蘇花公路上的清水斷崖和東海岸的七星潭，這條路線濃縮了台灣東部最壯麗的山海景觀。

## 行程亮點

### ⛰️ 太魯閣國家公園 — 大理石峽谷奇觀

太魯閣（Taroko）源自太魯閣族語，意為「山腰」。這裡的大理石岩層已有2.5億年歷史，經過立霧溪長年侵蝕，形成了深達1,000多公尺的峽谷。走在峽谷中的步道，你會被四周的巨大岩壁包圍，仰望只見一線天光。

### 🌊 砂卡礑步道 — 翡翠色的秘境溪谷

砂卡礑步道沿著砂卡礑溪而建，溪水因為含有大理石的碳酸鈣成分，呈現令人驚艷的翡翠綠色。步道平坦好走，沿途可以近距離觀賞褶皺的大理石岩壁和清澈見底的溪水。

**步道資訊：**
- 全長 4.1 公里（單程約1.5小時）
- 難度：簡單，適合全家大小
- 建議走到三間屋折返（來回約2小時）

### 🦅 燕子口步道 — 峽谷最窄處的壯麗

燕子口是太魯閣峽谷最精華的路段。峽谷在此收窄到最小，兩側大理石峭壁垂直聳立，壺穴、印地安酋長岩等奇特地形讓人目不暇給。步道是沿著峭壁開鑿的人行道，走在上面有種懸空的刺激感。

> 安全提醒：燕子口有落石風險，入口處有免費安全帽可以借用，請務必佩戴。

### 🏔️ 清水斷崖 — 山海交界的震撼

蘇花公路上最著名的一段，清水斷崖是全球少見的幾近90度垂直入海的斷崖地形。花崗岩和大理石的峭壁從海平面直上2,400公尺，一邊是碧綠的太平洋、一邊是垂直的懸崖，視覺衝擊力極強。

**最佳觀賞點：** 匯德隧道旁的觀景台，可以同時看到斷崖全貌和遠方的海岸線。

### 🌊 七星潭 — 太平洋畔的療癒海灘

七星潭是花蓮最美的海灘，弧形的礫石海灘面對浩瀚的太平洋，天氣好的時候可以看到日出從海平面升起。這裡的石頭經過海浪長年沖刷，圓潤光滑，很多人會在這裡堆石頭、聽海浪、放空。

**特色體驗：** 定置漁網捕魚體驗（清晨5-6點，視漁民出海情況而定）

## 建議行程安排

### 上午 — 清水斷崖 + 砂卡礑
1. **07:30** 花蓮市區出發（建議早出發避開午後落石風險）
2. **08:00** 清水斷崖觀景台（停留約30分鐘，早上光線最好）
3. **08:45** 開車進入太魯閣國家公園
4. **09:00** 太魯閣遊客中心（了解步道開放狀況、借安全帽）
5. **09:20** 砂卡礑步道（來回約2小時）

### 下午 — 峽谷精華
6. **11:30** 開車經過錐麓古道入口（如有事先申請可走一段）
7. **12:00** 天祥午餐（天祥晶英酒店的自助餐不錯，或帶便當在河邊吃）
8. **13:00** 燕子口步道（約1小時，記得戴安全帽）
9. **14:15** 長春祠（瀑布旁的中式祠堂，拍照約20分鐘）

### 傍晚 — 七星潭
10. **15:00** 開車到七星潭（約30分鐘）
11. **15:30** 七星潭海灘散步、堆石頭、看飛機起降（約1小時）
12. **16:30** 返回花蓮市區，逛東大門夜市

## 費用估算

| 項目 | 費用 |
|------|------|
| 太魯閣國家公園 | 免費 |
| 安全帽租借 | 免費（遊客中心） |
| 午餐 | NT$200-500/人 |
| 停車費 | NT$0-100 |
| **小計（不含包車）** | **約 NT$200-600/人** |

## 實用貼士

- **最佳季節**：4-6月和9-11月（避開7-8月颱風季）
- **步道確認**：出發前至太魯閣國家公園官網確認步道開放狀況，落石或施工時會封閉
- **安全第一**：落石區務必戴安全帽，下雨天不建議走峽谷步道
- **防曬防蟲**：七星潭無遮蔽，防曬乳必備；步道區有小黑蚊，建議穿長褲
- **加碼推薦**：如果是兩天行程，強烈建議加走「錐麓古道」— 需要事先上網申請入山許可（每日限額96人），但那是太魯閣最驚豔的步道，走在500公尺高的斷崖上俯瞰峽谷`,

en: `## Why This Route?

Taroko National Park is Taiwan's most spectacular natural landscape. Millions of years of erosion by the Liwu River carved a world-class marble gorge — at its narrowest, just 10 meters wide with vertical cliffs towering hundreds of meters on each side. Combined with Qingshui Cliff and Qixingtan Beach, this route captures the most dramatic mountain-meets-ocean scenery on Taiwan's east coast.

## Highlights

### ⛰️ Taroko National Park — Marble Gorge Wonder

"Taroko" comes from the indigenous Truku language, meaning "mountainside." The marble formations here are 250 million years old, carved into a gorge over 1,000 meters deep. Walking the trails, you're surrounded by massive rock walls with only a sliver of sky visible above.

### 🌊 Shakadang Trail — Emerald Secret Valley

This trail follows the Shakadang River, whose waters turn a mesmerizing emerald green from dissolved marble calcium carbonate. The flat, easy trail offers close-up views of folded marble walls and crystal-clear water.

**Trail Info:** 4.1km one-way (~1.5hrs), easy difficulty, suitable for all ages

### 🦅 Swallow Grotto Trail — The Gorge's Heart

The narrowest and most dramatic section of Taroko. The trail is carved into sheer cliff faces, giving a thrilling sense of walking on air. Look for the "Indian Chief" rock formation and thousands of tiny pot holes carved by ancient rivers.

> Safety: Free helmets available at the entrance — please wear one. Rockfall risk is real.

### 🏔️ Qingshui Cliff — Where Mountains Plunge Into the Sea

One of the world's most dramatic near-vertical sea cliffs. Granite and marble walls rise 2,400 meters from sea level while the turquoise Pacific crashes below.

### 🌊 Qixingtan Beach — Pacific Healing

Hualien's most beautiful beach — a crescent of smooth pebbles facing the vast Pacific Ocean.

## Itinerary

### Morning
1. **07:30** Depart Hualien (early start to avoid afternoon rockfall risk)
2. **08:00** Qingshui Cliff viewpoint (~30min, best morning light)
3. **09:00** Taroko Visitor Center (check trail status, borrow helmets)
4. **09:20** Shakadang Trail (~2hrs round trip)

### Afternoon
5. **12:00** Lunch at Tianxiang
6. **13:00** Swallow Grotto Trail (~1hr, wear helmet)
7. **14:15** Eternal Spring Shrine (~20min)

### Evening
8. **15:30** Qixingtan Beach (~1hr)
9. **16:30** Return to Hualien, visit Dongdamen Night Market

## Practical Tips

- **Best Season**: Apr-Jun and Sep-Nov (avoid typhoon season Jul-Aug)
- **Check Trail Status**: Verify at the Taroko NP website before going — trails close for rockfall/construction
- **Safety First**: Always wear a helmet in the gorge; avoid canyon trails in rain
- **Bonus**: For a 2-day trip, add the **Zhuilu Old Trail** — permits required (96 people/day limit), but it's the most breathtaking trail in all of Taroko, walking 500m above the gorge floor`
});

// ===== 4. 墾丁 =====
await updateGuide('kenting-south', {
'zh-TW': `## 為什麼選這條路線？

墾丁是台灣最南端的熱帶半島，擁有全台灣最美的白沙海灘、壯闊的太平洋海岸線、和豐富的海洋生態。從高雄出發約2小時車程，你就能從都市跳進一個陽光、海風、棕櫚樹的度假天堂。這條路線集合了墾丁最精華的自然景觀，從斷崖草原到燈塔沙灘，一天之內看遍台灣最南端的壯麗。

## 行程亮點

### 🌊 龍磐公園 — 站在台灣的盡頭

龍磐公園位於恆春半島最東邊，是一片延伸到太平洋邊緣的珊瑚礁草原。站在斷崖上，腳下就是碧藍的太平洋，風從海上吹來，草原隨風起伏，視野可以延伸到天際線。這裡也是台灣觀星密度最高的地方，光害極低，夏天肉眼就能看到銀河。

**拍照秘訣：** 早上10點前光線最柔和，草原翠綠配湛藍大海是絕佳的風景照構圖。

### 🏠 鵝鑾鼻燈塔 — 台灣最南端的地標

鵝鑾鼻燈塔建於1883年，是全台灣最南端的燈塔，也是世界上少數有武裝防禦設施的燈塔（當年為了防範原住民攻擊）。純白色的燈塔配上藍天綠草，是墾丁最經典的打卡照。

**園區內必走：**
- 濱海步道 — 珊瑚礁岩岸步道，可以看到海蝕洞和珊瑚礁地形
- 最南端觀海平台 — 台灣本島最南端的地標，GPS座標 21°54'N
- 門票 NT$60/人

### 🏖️ 白沙灣 — 電影場景級的夢幻沙灘

白沙灣是《少年Pi的奇幻漂流》結局主角上岸的取景地（雖然電影設定在墨西哥）。這裡有墾丁最美的白色細沙，海水清澈見底，且商業氣息比南灣少很多，更有私密海灘的感覺。

**水上活動：** 浮潛 NT$350起、香蕉船 NT$300、水上摩托車 NT$500起

### 🦐 後壁湖 — CP值爆表的海鮮天堂

後壁湖漁港旁的海產店是墾丁吃海鮮最划算的地方。這裡的生魚片以厚切聞名，一盤20片只要 NT$100-200，新鮮度完全不輸高檔日料店。

**必點：**
- **生魚片** — 厚切鮪魚或旗魚，一盤 NT$100-200
- **炒海瓜子** — 在地人必點的下酒菜
- **龍蝦味噌湯** — 看當天漁獲而定，鮮甜無比
- 推薦店家：輝哥生魚片、阿利海產

### 🏄 南灣 — 墾丁最熱鬧的海灘

南灣是墾丁最具代表性的海灘，金黃色的沙灘、各種水上活動、沿岸的酒吧和餐廳，是墾丁度假氛圍最濃厚的地方。這裡也是欣賞夕陽的好地點。

## 建議行程安排

### 上午 — 壯麗自然景觀
1. **08:30** 高雄市區出發（走國道三號 + 省道26線，約2小時）
2. **10:30** 龍磐公園（停留30-40分鐘，拍照看海）
3. **11:15** 鵝鑾鼻公園 & 燈塔（園區散步 + 最南端觀海台，約1小時）

### 下午 — 海灘 & 美食
4. **12:30** 後壁湖海鮮午餐（推薦輝哥生魚片，用餐約1小時）
5. **13:45** 白沙灣海灘（玩水、浮潛或單純放空，約1-1.5小時）
6. **15:15** 南灣海灘自由活動（水上活動、沙灘漫步，約1小時）
7. **16:30** 返程回高雄
8. **18:30** 抵達高雄

## 費用估算

| 項目 | 費用 |
|------|------|
| 鵝鑾鼻公園門票 | NT$60/人 |
| 後壁湖海鮮午餐 | NT$300-600/人 |
| 白沙灣浮潛 | NT$350/人（可選） |
| 水上活動 | NT$300-800/項 |
| **小計（不含包車）** | **約 NT$500-1,500/人** |

## 實用貼士

- **最佳季節**：4-10月（水上活動最佳）；冬天有落山風，風力強勁但別有一番風味
- **防曬為重**：墾丁紫外線超強，SPF50防曬乳必備，建議每2小時補擦
- **穿著建議**：輕便衣物 + 泳衣 + 夾腳拖。龍磐公園風大，帶件防風外套
- **用餐時段**：後壁湖假日中午12-1點排隊可能等30分鐘，建議11:30前或13:00後前往
- **順遊推薦**：恆春古城門（全台保存最完整的古城）、出火特別景觀區（地面天然氣孔冒火，夜間更壯觀）`,

en: `## Why This Route?

Kenting is Taiwan's southernmost tropical peninsula with the country's finest white sand beaches, dramatic Pacific coastline, and rich marine ecology. Just 2 hours from Kaohsiung, you'll trade the city for a paradise of sunshine, ocean breeze, and palm trees. This route covers Kenting's greatest natural hits — from clifftop grasslands to lighthouse beaches — all in one day.

## Highlights

### 🌊 Longpan Park — Standing at Taiwan's Edge

A coral reef grassland extending to the Pacific's edge. Standing on the cliffs, the ocean stretches endlessly below while grass ripples in the sea breeze. This is also Taiwan's best stargazing spot — minimal light pollution means you can see the Milky Way with the naked eye in summer.

### 🏠 Eluanbi Lighthouse — Taiwan's Southernmost Landmark

Built in 1883, this is Taiwan's southernmost lighthouse and one of the world's few armed lighthouses (built with defensive fortifications). The white lighthouse against blue sky and green grass is Kenting's most iconic photo.

**Inside the Park:** Coral reef coastal trail, sea caves, and Taiwan's southernmost viewing platform at GPS 21°54'N. Admission NT$60.

### 🏖️ White Sand Bay — Movie-Set Dream Beach

This is where the final scene of "Life of Pi" was filmed (the scene where Pi reaches shore). The finest white sand in Kenting with crystal-clear water, and far less crowded than South Bay.

### 🦐 Houbihu — Best-Value Seafood in Taiwan

The seafood stalls near Houbihu fishing port serve famously thick-cut sashimi — 20 pieces for just NT$100-200, as fresh as high-end Japanese restaurants at a fraction of the price.

### 🏄 South Bay — Kenting's Party Beach

Golden sand, water sports, beachside bars — the most quintessential Kenting beach experience. Great sunset views too.

## Itinerary

### Morning
1. **08:30** Depart Kaohsiung (~2hrs drive)
2. **10:30** Longpan Park (30-40min, photos & ocean views)
3. **11:15** Eluanbi Park & Lighthouse (~1hr)

### Afternoon
4. **12:30** Seafood lunch at Houbihu (~1hr)
5. **13:45** White Sand Bay beach time (~1-1.5hrs)
6. **15:15** South Bay free time (~1hr)
7. **16:30** Return to Kaohsiung
8. **18:30** Arrive Kaohsiung

## Practical Tips

- **Best Season**: Apr-Oct for water activities; winter has strong Luoshan winds but unique atmosphere
- **Sunscreen Essential**: Kenting UV is intense — SPF50 mandatory, reapply every 2hrs
- **Dining Tip**: Houbihu gets crowded 12-1PM on weekends — go before 11:30 or after 1PM
- **Bonus**: Add Hengchun Old Town Gate (Taiwan's best-preserved ancient city gate) or Chuhuo Fire (natural gas vents creating flames — more dramatic at night)`
});

// ===== 5. 阿里山 =====
await updateGuide('alishan-forest', {
'zh-TW': `## 為什麼選這條路線？

阿里山是台灣最具國際知名度的景點之一，與日月潭並列為台灣觀光的兩大名片。百年森林鐵路、千年神木群、壯觀的日出雲海、春天的櫻花隧道——阿里山的四大奇景讓全世界的旅客慕名而來。從嘉義出發，沿著蜿蜒的山路一路爬升到海拔2,000多公尺，沿途的植被從熱帶闊葉林漸變為溫帶針葉林，本身就是一場精彩的生態之旅。

## 行程亮點

### 🚂 阿里山森林鐵路 — 世界遺產級的百年鐵道

阿里山森林鐵路建於1912年，全長71.4公里，從海拔30公尺的嘉義一路爬升到2,274公尺的阿里山，是世界上僅存的三條登山鐵路之一（另兩條在印度和瑞士）。小火車穿梭在雲霧繚繞的森林中，經過螺旋形路段和之字形折返，是一段充滿驚喜的鐵道旅程。

**目前營運路線：**
- **本線**：嘉義→竹崎→奮起湖（約2小時）
- **支線**：沼平線、神木線、祝山線
- 票價：依路線 NT$100-600 不等
- 建議提前上網訂票，假日常常秒殺

### 🌲 巨木群步道 — 與千年巨木對話

阿里山的巨木群步道分為兩段，沿途可以近距離觀賞超過20棵千年以上的紅檜巨木。其中最著名的「阿里山神木」（第二代）樹齡約2,000年，高45公尺，需要十幾人才能合抱。

**步道資訊：**
- 第一巨木群步道：600公尺，約30分鐘（較平坦，適合全家）
- 第二巨木群步道：1,100公尺，約60分鐘（有階梯，可以看到更多巨木）
- 兩段可以連走，慢慢走約2小時

**森林浴小知識：** 紅檜會釋放「芬多精」（phytoncide），據研究有助於降低壓力荷爾蒙、提升免疫力。在巨木群步道深呼吸，就是最天然的森林療癒。

### 🌅 祝山觀日出 — 海拔2,489公尺的日出體驗

祝山觀日平台是全台灣最著名的日出觀賞點。凌晨搭乘祝山線小火車上山，在2,489公尺的觀景台上等待太陽從玉山山脈後方升起，金色的光芒灑落在層層疊疊的雲海上，那一刻的感動無法用言語形容。

> 日出時間隨季節變化（冬天約06:30、夏天約05:00），火車會配合日出時間發車。需前一天住宿阿里山，凌晨3:30-4:00搭車。

### 🌸 櫻花季（3-4月限定）

每年3月中旬到4月中旬是阿里山的櫻花季，園區內種植了超過3,000株各品種櫻花，從緋寒櫻到吉野櫻依序綻放。最經典的畫面是小火車緩緩駛過粉紅色的櫻花隧道，是攝影師們爭相捕捉的夢幻場景。

### 🍱 奮起湖 — 鐵路便當的故鄉

奮起湖因地形像畚箕而得名（台語「畚箕湖」），是森林鐵路的中繼站。這裡最有名的就是鐵路便當，以排骨飯為主，配上筍絲、醃蘿蔔等配菜，一個 NT$100-150。當年火車在此停靠加水加煤，旅客趁機買便當果腹，成為台灣鐵道文化的經典記憶。

**奮起湖必體驗：**
- **奮起湖便當** — 推薦「奮起湖大飯店便當」和「登山食堂」
- **老街散步** — 百年老街保留了日治時期的木造建築
- **奮起湖步道群** — 杉林棧道可以看到檜木原始林
- **愛玉** — 山上手洗愛玉加檸檬，消暑聖品

## 建議行程安排

### 一日遊（推薦）
1. **06:00** 嘉義市區出發（走台18線阿里山公路，車程約2.5小時）
2. **08:30** 抵達阿里山國家森林遊樂區（門票 NT$300/人）
3. **09:00** 巨木群步道第一段 + 第二段（慢走約2小時）
4. **11:00** 沼平公園周邊散步（姊妹潭、受鎮宮）
5. **11:30** 搭森林小火車「神木線」到神木站（體驗小火車 + 看神木遺跡）
6. **12:30** 下山到奮起湖，鐵路便當午餐
7. **13:30** 奮起湖老街散步、買山葵相關伴手禮
8. **14:30** 返程下山（走台18線，沿途可在石棹觀景台停留看茶園）
9. **17:00** 抵達嘉義

### 兩天一夜（含日出）
- Day 1：與一日遊相同，下午入住阿里山園區內飯店
- Day 2：凌晨搭祝山線小火車看日出 → 退房 → 下山

## 費用估算

| 項目 | 費用 |
|------|------|
| 森林遊樂區門票 | NT$300/人（假日）/ NT$200（平日） |
| 森林小火車（神木線） | NT$100/人 |
| 祝山線小火車 | NT$150/人 |
| 奮起湖便當 | NT$100-150/個 |
| 住宿（園區內） | NT$2,500-5,000/晚 |
| **一日遊小計（不含包車）** | **約 NT$600-800/人** |
| **兩天一夜小計** | **約 NT$3,500-6,000/人** |

## 實用貼士

- **最佳季節**：3-4月（櫻花季）、10-12月（楓紅季）、冬天看雲海機率最高
- **穿著建議**：阿里山海拔2,000m以上，氣溫比平地低12-15度。夏天也要帶薄外套，冬天需要羽絨衣
- **高山反應**：海拔雖不算極高，但快速上升可能引起輕微頭痛，多喝水、放慢腳步
- **交通提醒**：阿里山公路彎道多，容易暈車的人建議吃暈車藥。包車司機熟悉路況，會比自駕安心很多
- **伴手禮推薦**：阿里山高山茶（特別是烏龍茶）、山葵（wasabi）製品、愛玉子`,

en: `## Why This Route?

Alishan is one of Taiwan's most internationally famous destinations, alongside Sun Moon Lake. Four natural wonders draw visitors from around the world: the century-old forest railway, thousand-year-old giant trees, magnificent sunrise above a sea of clouds, and spring cherry blossom tunnels. The drive from Chiayi climbs from sea level to over 2,000m, with vegetation shifting from tropical broadleaf to temperate conifer forest — a stunning ecological journey in itself.

## Highlights

### 🚂 Alishan Forest Railway — Century-Old Heritage

Built in 1912, this 71.4km railway climbs from 30m to 2,274m elevation — one of only three mountain railways remaining in the world (the others are in India and Switzerland). The narrow-gauge train winds through misty forests, spiral loops, and switchbacks.

**Current Routes:**
- **Main Line**: Chiayi → Zhuqi → Fenqihu (~2hrs)
- **Branch Lines**: Zhaoping, Sacred Tree, Zhushan
- Tickets: NT$100-600 depending on route (book online early — weekend tickets sell out fast)

### 🌲 Giant Tree Trail — Walking Among Ancients

Over 20 red cypress trees older than 1,000 years line this trail. The most famous "Alishan Sacred Tree" (2nd generation) is ~2,000 years old, 45m tall, and requires a dozen people to encircle.

**Trail Info:**
- Trail 1: 600m, ~30min (flat, family-friendly)
- Trail 2: 1,100m, ~60min (stairs, more giant trees)
- Combined: ~2hrs at a leisurely pace

**Forest Bathing Note:** Red cypress trees release phytoncides — studies show these reduce stress hormones and boost immunity. Deep breathing here is nature's therapy.

### 🌅 Zhushan Sunrise — Dawn at 2,489m

Taiwan's most famous sunrise viewing point. Take the pre-dawn Zhushan train to the 2,489m platform and watch the sun rise behind the Jade Mountain range, golden light flooding across layers of cloud sea. The emotion of that moment defies description.

> Sunrise times vary by season (winter ~06:30, summer ~05:00). Requires overnight stay; train departs ~3:30-4:00AM.

### 🌸 Cherry Blossom Season (March-April Only)

Over 3,000 cherry trees bloom in sequence from Taiwan cherry to Yoshino cherry. The iconic image: the forest train gliding through a tunnel of pink blossoms.

### 🍱 Fenqihu — Birthplace of Railway Bento

Fenqihu is the railway's midpoint station, famous for its railway bento boxes (pork chop rice, NT$100-150). The tradition began when passengers bought lunch during the coal-and-water stop.

**Must-Do:** Railway bento, century-old wooden street, cypress forest trail, hand-made aiyu jelly

## Itinerary

### Day Trip (Recommended)
1. **06:00** Depart Chiayi (Route 18, ~2.5hrs drive)
2. **08:30** Arrive Alishan National Forest (admission NT$300)
3. **09:00** Giant Tree Trails 1 & 2 (~2hrs)
4. **11:00** Zhaoping Park, Sister Ponds
5. **11:30** Sacred Tree train ride
6. **12:30** Fenqihu railway bento lunch
7. **13:30** Fenqihu Old Street, souvenirs
8. **14:30** Return (stop at Shizuo tea plantation viewpoint)
9. **17:00** Arrive Chiayi

## Practical Tips

- **Best Season**: Mar-Apr (cherry blossoms), Oct-Dec (autumn foliage), winter for cloud seas
- **Clothing**: 12-15°C cooler than lowlands. Bring warm jacket even in summer; down jacket in winter
- **Motion Sickness**: The mountain road has many curves — take medication if needed. Charter drivers know the road well, much safer than self-driving
- **Souvenirs**: Alishan high-mountain oolong tea, wasabi products, aiyu seeds`
});

  console.log('\n✅ All 5 guides updated with rich content!');
}

main();
