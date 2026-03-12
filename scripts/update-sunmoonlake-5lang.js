// Update sun-moon-lake tour_guides with ALL 5 languages (zh-TW, en, ja, zh-CN, ko)
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

const PHOTOS = {
  sunmoonBoats: {
    url: 'https://images.unsplash.com/photo-1722824634219-679c9fe9aa6d?w=1200&q=80',
    credit: 'Winston Chen (@winstonchen)',
    creditUrl: 'https://unsplash.com/@winstonchen?utm_source=relaygo&utm_medium=referral',
  },
  sunmoonDock: {
    url: 'https://images.unsplash.com/photo-1605961002058-06a4606c178c?w=1200&q=80',
    credit: 'Imme (@imme)',
    creditUrl: 'https://unsplash.com/@imme?utm_source=relaygo&utm_medium=referral',
  },
  sunmoonCable: {
    url: 'https://images.unsplash.com/photo-1597773138675-521daa750435?w=1200&q=80',
    credit: 'Lisanto (@lisanto_)',
    creditUrl: 'https://unsplash.com/@lisanto_?utm_source=relaygo&utm_medium=referral',
  },
  wenwuTemple: {
    url: 'https://images.unsplash.com/photo-1600168488491-03d6c3486ab5?w=1200&q=80',
    credit: 'Lisanto (@lisanto_)',
    creditUrl: 'https://unsplash.com/@lisanto_?utm_source=relaygo&utm_medium=referral',
  },
  qingjingSheep: {
    url: 'https://images.unsplash.com/photo-1637515755087-3bbf0bc1b255?w=1200&q=80',
    credit: 'Norman Snow (@normansnow)',
    creditUrl: 'https://unsplash.com/@normansnow?utm_source=relaygo&utm_medium=referral',
  },
  qingjingMountain: {
    url: 'https://images.unsplash.com/photo-1681181573779-d4ec890f8628?w=1200&q=80',
    credit: 'Jeremy Kwok (@jxremy)',
    creditUrl: 'https://unsplash.com/@jxremy?utm_source=relaygo&utm_medium=referral',
  },
  hehuanshanRoad: {
    url: 'https://images.unsplash.com/photo-1593689952882-babc725e730e?w=1200&q=80',
    credit: 'Someus Christopher (@tofu44)',
    creditUrl: 'https://unsplash.com/@tofu44?utm_source=relaygo&utm_medium=referral',
  },
  hehuanshanPanorama: {
    url: 'https://images.unsplash.com/photo-1595162848849-d316c786e1f2?w=1200&q=80',
    credit: 'David Guenther (@daguenther)',
    creditUrl: 'https://unsplash.com/@daguenther?utm_source=relaygo&utm_medium=referral',
  },
};

function photoMd(key, alt) {
  const p = PHOTOS[key];
  return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
}

// ---------------------------------------------------------------------------
// zh-TW  (Traditional Chinese — original)
// ---------------------------------------------------------------------------
const zhTW = `## 為什麼選這條路線？

日月潭與清境農場是台灣中部最具代表性的兩大景點。日月潭的湖光山色被《國家地理雜誌》評選為全球最美的單車路線之一，而清境農場的高山草原有「台灣小瑞士」的美譽。兩天一夜的行程，讓你從湖畔到高山，完整體驗台灣中部的壯闊與寧靜。

## 行程亮點

### 🌊 日月潭 — 台灣的瑰寶

${photoMd('sunmoonBoats', '日月潭湖面與小船 — 清晨薄霧中的寧靜')}

日月潭海拔748公尺，是全台最大的天然湖泊。湖面被拉魯島分為「日潭」與「月潭」，因此得名。清晨的日月潭常有薄霧繚繞，湖面如鏡，是攝影愛好者的天堂。

**遊湖方式：**
- **遊湖船**：三大碼頭巡迴（水社→玄光寺→伊達邵），班次密集
- **環湖自行車道**：全長約30公里，其中「向山段」被CNN評為全球最美單車道之一
- **SUP 立槳**：日月潭上划 SUP 是近年最熱門的體驗

${photoMd('sunmoonDock', '日月潭碼頭 — 湖畔的悠閒時光')}

**在地美食：**
- **伊達邵碼頭美食街** — 刈包、山豬肉香腸、小米麻糬、紅茶蛋
- **日月潭紅茶** — 全台最頂級的阿薩姆紅茶產區，推薦台茶18號「紅玉」，茶香中帶有薄荷與肉桂香
- **總統魚** — 日月潭特有的曲腰魚，因蔣經國總統喜愛而得名

**隱藏景點：**
- **向山遊客中心** — 日本建築師團紀彥設計，清水模建築本身就是藝術品
- **日月老茶廠** — 百年茶廠改建，免費參觀，可品茶購茶
- **猫囒山步道** — 輕鬆的茶園步道，山頂可360度俯瞰日月潭全景

**拍照秘訣：** 清晨6:00-7:00是日月潭最美的時刻，薄霧繚繞的湖面配上遠山剪影。向山遊客中心的懸臂觀景台是取景最佳角度。

### ⛩️ 文武廟 — 居高臨下的湖畔廟宇

${photoMd('wenwuTemple', '文武廟 — 俯瞰日月潭的壯觀廟宇')}

文武廟位於日月潭北岸山腰，是全台唯一開門就能看到湖景的廟宇。金碧輝煌的殿堂配上日月潭的碧綠湖水，氣勢恢弘。廟前的365階年梯，每一階刻著一個日期，找到自己生日的那一階拍照是遊客必做的事。

### 🐑 清境農場 — 台灣的小瑞士

${photoMd('qingjingSheep', '清境農場 — 青青草原上的悠閒綿羊')}

清境農場位於海拔1,700-2,000公尺的高山上，廣闊的青青草原、悠閒的綿羊、遠處的中央山脈，加上常出現的雲海，真的有種置身歐洲的錯覺。

**必看體驗：**
- **綿羊秀**（每週六日 09:30/14:30）— 紐西蘭籍牧羊人表演剪羊毛秀，互動性十足
- **馬術秀**（每週二至日 10:45/15:45）— 騎師表演各種馬術特技
- **天空步道** — 全長1.6公里的高架步道，海拔1,700公尺眺望中央山脈
- **老英格蘭莊園** — 不住也可以參觀大廳，歐式城堡建築超好拍

${photoMd('qingjingMountain', '從清境農場遠眺中央山脈 — 雲海翻騰的壯闊景色')}

**觀星秘境：** 清境的光害少、海拔高，是台灣最佳的觀星地點之一。夏天的銀河特別壯觀，記得帶件外套在戶外等待。

**拍照秘訣：** 上午10:00前草原上的光線最柔和，適合拍羊群。傍晚的雲海最壯觀，天空步道上是最佳觀景點。

### 🏔️ 合歡山（加碼推薦）

${photoMd('hehuanshanRoad', '合歡山公路 — 雲霧繚繞的高山公路')}

如果時間充裕，從清境往上開約40分鐘就能到武嶺 — 台灣公路最高點（海拔3,275公尺）。站在武嶺停車場，腳下是層層疊疊的山巒和翻騰的雲海，天氣好的時候可以一路看到太平洋。

${photoMd('hehuanshanPanorama', '合歡山群峰 — 台灣的屋脊')}

**拍照秘訣：** 武嶺停車場是最佳觀景點，清晨日出和傍晚雲海都是絕佳拍攝時機。冬天若遇到積雪，整片白雪覆蓋的山頭搭配藍天是台灣難得一見的雪景。

> 小提醒：合歡山海拔高，部分人可能會有輕微高山反應（頭暈、頭痛），建議慢慢走、多喝水。冬天武嶺可能下雪，務必確認路況。

## 建議行程安排

### Day 1 — 日月潭

1. **08:00** 台北/台中出發（台中出發約1.5小時，台北約3.5小時）
2. **10:00** 向山遊客中心，環湖自行車道騎行（約1.5小時）
3. **11:30** 搭遊湖船，水社→玄光寺（步行到玄光寺品嚐阿婆茶葉蛋）
4. **12:30** 船到伊達邵碼頭，美食街午餐
5. **14:00** 文武廟（居高臨下的壯觀廟宇，找年梯上自己的生日）
6. **15:00** 日月老茶廠（品茶、買伴手禮）
7. **16:30** 入住湖畔飯店，自由活動
8. **傍晚** 湖畔散步看夕陽

### Day 2 — 清境

1. **08:30** 退房出發前往清境（車程約1.5小時）
2. **10:00** 青青草原散步、與綿羊互動、看綿羊秀
3. **11:30** 天空步道（高架步道眺望中央山脈）
4. **12:30** 午餐 — 推薦清境雲舞樓或清境好雞婆土雞城
5. **13:30** 小瑞士花園（歐式花園、水池倒影）
6. **14:30** 返程下山（或加碼合歡山武嶺 +1.5小時）
7. **17:00-18:00** 抵達台中/台北

## 實用貼士

- **最佳季節**：秋冬（10-2月）天氣涼爽、雲海出現機率高；春天（3-4月）清境有櫻花
- **住宿推薦**：日月潭湖畔有多種選擇，從精品民宿到五星飯店都有
- **穿著建議**：清境比平地低10度以上，冬天可能接近0度，務必帶厚外套。日月潭湖邊早晚涼，薄外套即可
- **週末避開**：清境假日人潮爆滿，建議安排週間前往
- **單車租借**：向山遊客中心旁邊有多家腳踏車出租店，電動腳踏車最輕鬆
- **加碼推薦**：時間充裕可加走武嶺（台灣公路最高點 3,275m），從清境上去車程約40分鐘`;

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
const en = `## Why This Route?

Sun Moon Lake and Qingjing Farm are central Taiwan's two crown jewels. Sun Moon Lake was named one of the world's most beautiful cycling routes by National Geographic, while Qingjing Farm's highland meadows are known as "Taiwan's Little Switzerland." This 2-day itinerary takes you from lakeside tranquility to mountain grandeur.

## Highlights

### 🌊 Sun Moon Lake — Taiwan's Treasure

${photoMd('sunmoonBoats', 'Sun Moon Lake — fishing boats in the morning mist')}

At 748 meters elevation, Sun Moon Lake is Taiwan's largest natural lake. The lake is split by Lalu Island into a "sun" side and "moon" side, hence the name. Dawn brings mystical mist that turns the lake into a mirror — a photographer's paradise.

**Ways to Explore:**
- **Boat Tour**: Connects three piers (Shuishe → Xuanguang → Ita Thao), frequent departures
- **Cycling**: The 30km lakeside path was named one of the world's most beautiful by CNN
- **SUP Paddleboarding**: The trendiest way to experience the lake up close

${photoMd('sunmoonDock', 'Sun Moon Lake pier — peaceful moments by the water')}

**Local Food:**
- **Ita Thao Food Street** — Wild boar sausage, millet mochi, tea eggs
- **Sun Moon Lake Black Tea** — Taiwan's finest Assam tea region. Try "Ruby" (Tea #18) with its unique hint of mint and cinnamon
- **President Fish** — A local species named after former President Chiang Ching-kuo

**Hidden Gems:**
- **Xiangshan Visitor Center** — Designed by Japanese architect Dan Norihiko, the concrete building is art itself
- **Sun Moon Lake Old Tea Factory** — Century-old factory turned tea gallery, free entry
- **Maolan Mountain Trail** — Easy tea garden trail with 360° panoramic lake views from the top

**Photo Tips:** The best time is dawn, 6:00-7:00 AM when mist blankets the lake. The cantilevered platform at Xiangshan Visitor Center offers the most iconic angle.

### ⛩️ Wenwu Temple — Lakeside Temple with a View

${photoMd('wenwuTemple', 'Wenwu Temple — grand temple overlooking Sun Moon Lake')}

Wenwu Temple sits on the northern hillside of Sun Moon Lake — the only temple in Taiwan where you see a lake the moment you step through the gate. The gilded halls against the emerald lake create a stunning contrast. Don't miss the 365-step "Year Ladder" — find the step with your birthday and snap a photo.

### 🐑 Qingjing Farm — Taiwan's Little Switzerland

${photoMd('qingjingSheep', 'Qingjing Farm — sheep grazing on green highland meadows')}

Perched at 1,700-2,000m, Qingjing's rolling green meadows, grazing sheep, and Central Mountain Range backdrop genuinely evoke the Swiss Alps.

**Must-See:**
- **Sheep Show** (Sat-Sun 09:30/14:30) — Interactive sheep-shearing by New Zealand shepherds
- **Skywalk** — 1.6km elevated walkway at 1,700m with mountain panoramas
- **Old England Manor** — Gothic castle architecture, amazing photo spot even without staying

${photoMd('qingjingMountain', 'View from Qingjing Farm — clouds rolling over the Central Mountain Range')}

**Stargazing:** With minimal light pollution at this altitude, Qingjing is one of Taiwan's best stargazing spots. The Milky Way is especially stunning in summer.

**Photo Tips:** Morning light before 10:00 AM is softest for photographing sheep on the grassland. The Skywalk offers the best vantage point for dramatic cloud sea shots at sunset.

### 🏔️ Hehuanshan (Bonus Stop)

${photoMd('hehuanshanRoad', 'Hehuanshan mountain road — winding through misty peaks')}

If time allows, Wuling Pass is just 40 minutes up from Qingjing — at 3,275m, it's Taiwan's highest paved road. Standing at the parking lot, you'll see layers of mountains and rolling clouds beneath you. On clear days, you can see all the way to the Pacific.

${photoMd('hehuanshanPanorama', 'Hehuanshan peaks — the rooftop of Taiwan')}

**Photo Tips:** Wuling Pass parking lot is the prime viewpoint. Dawn and sunset cloud seas make for dramatic shots. If you catch a rare winter snowfall, the snow-capped peaks against blue sky are Taiwan's most extraordinary alpine scenery.

> Note: Some visitors may experience mild altitude sickness (dizziness, headache). Walk slowly and stay hydrated. In winter, Wuling may have snow — check road conditions before heading up.

## Suggested Itinerary

### Day 1 — Sun Moon Lake

1. **08:00** Depart Taipei/Taichung (1.5hrs from Taichung, 3.5hrs from Taipei)
2. **10:00** Xiangshan Visitor Center + lakeside cycling (~1.5hrs)
3. **11:30** Boat to Xuanguang Temple (try the famous tea eggs)
4. **12:30** Lunch at Ita Thao food street
5. **14:00** Wenwu Temple (find your birthday on the Year Ladder)
6. **15:00** Sun Moon Lake Old Tea Factory
7. **16:30** Check in to lakeside hotel
8. **Evening** Sunset stroll along the lake

### Day 2 — Qingjing

1. **08:30** Check out, drive to Qingjing (~1.5hrs)
2. **10:00** Green Grassland — sheep interaction, sheep show
3. **11:30** Skywalk with mountain views
4. **12:30** Lunch (Qingjing Yunwulou or Haojipo Chicken)
5. **13:30** Small Swiss Garden
6. **14:30** Return trip (or add Wuling Pass +1.5hrs)
7. **17:00-18:00** Arrive Taichung/Taipei

## Practical Tips

- **Best Season**: Fall/winter (Oct-Feb) for cool weather and cloud seas; spring (Mar-Apr) for cherry blossoms at Qingjing
- **Clothing**: Qingjing is 10°C+ cooler than lowlands — bring warm layers. Sun Moon Lake is mild, a light jacket for morning/evening
- **Avoid Weekends**: Qingjing gets extremely crowded on holidays and weekends
- **Bike Rental**: Several shops near Xiangshan Visitor Center rent bikes; e-bikes are the easiest option
- **Bonus**: Add Wuling Pass (3,275m, Taiwan's highest paved road) — 40min drive from Qingjing`;

// ---------------------------------------------------------------------------
// Japanese
// ---------------------------------------------------------------------------
const ja = `## なぜこのルート？

日月潭と清境農場は台湾中部を代表する二大観光地です。日月潭はナショナルジオグラフィック誌で世界最美のサイクリングルートに選ばれ、清境農場の高原牧場は「台湾のスイス」と呼ばれています。1泊2日で湖畔から高山まで、台湾中部の魅力を満喫できるコースです。

## ハイライト

### 🌊 日月潭 — 台湾の宝石

${photoMd('sunmoonBoats', '日月潭 — 朝霧に包まれた湖面と小舟')}

標高748mに位置する台湾最大の天然湖。ラルー島によって「日潭」と「月潭」に分かれることが名前の由来です。早朝の霧に包まれた湖面は鏡のように美しく、写真愛好家に人気のスポットです。

**楽しみ方：**
- **遊覧船**：三大埠頭を巡回（水社→玄光寺→伊達邵）
- **サイクリング**：全長30kmの湖畔コース、CNNが世界最美と評価
- **SUP**：湖上でのSUP体験が大人気

${photoMd('sunmoonDock', '日月潭の桟橋 — 湖畔の穏やかなひととき')}

**グルメ：**
- **伊達邵美食街** — 猪肉ソーセージ、小米もち、紅茶卵
- **日月潭紅茶** — 台湾最高級のアッサムティー産地。台茶18号「紅玉」がおすすめ
- **総統魚** — 日月潭固有の魚、蒋経国元総統が愛したことから命名

**撮影のコツ：** 早朝6:00-7:00が最も美しい時間帯。向山ビジターセンターの展望台がベストアングル。

### ⛩️ 文武廟 — 湖を見下ろす壮大な廟

${photoMd('wenwuTemple', '文武廟 — 日月潭を一望する金色の廟')}

日月潭北岸の山腹に建つ文武廟は、門をくぐった瞬間に湖景が広がる台湾唯一の廟。365段の「年梯」で自分の誕生日の段を探すのが定番です。

### 🐑 清境農場 — 台湾のスイス

${photoMd('qingjingSheep', '清境農場 — 緑の草原で草を食む羊たち')}

標高1,700-2,000mの高原牧場。広々とした緑の草原、のんびりとした羊たち、背景に聳える中央山脈 — まるでヨーロッパにいるような錯覚を覚えます。

**見どころ：**
- **羊ショー**（土日 09:30/14:30）— ニュージーランド出身の羊飼いによる羊毛刈りショー
- **天空歩道** — 標高1,700mの高架遊歩道から中央山脈を一望
- **老英格蘭荘園** — ゴシック建築の城、宿泊しなくてもロビー見学可能

${photoMd('qingjingMountain', '清境農場から望む中央山脈と雲海')}

**星空観賞：** 光害が少なく高標高の清境は、台湾屈指の星空スポット。夏の天の川は格別です。

### 🏔️ 合歡山（おまけ）

${photoMd('hehuanshanRoad', '合歡山の山岳道路 — 雲の中を走る')}

時間があれば、清境から車で約40分の武嶺へ。標高3,275m、台湾の舗装道路最高地点です。足元に広がる雲海と山々のパノラマは圧巻。

${photoMd('hehuanshanPanorama', '合歡山連峰 — 台湾の屋根')}

**撮影のコツ：** 武嶺駐車場がベストビューポイント。早朝の日の出や夕方の雲海が狙い目。冬に雪が積もれば、台湾では珍しい雪山の絶景を撮影できます。

> 注意：高山病の症状（めまい、頭痛）が出る場合があります。ゆっくり歩き、水分補給を。冬季は積雪の可能性があるため、事前に路面状況をご確認ください。

## おすすめ行程

### 1日目 — 日月潭

1. **08:00** 台北/台中出発
2. **10:00** 向山ビジターセンター＆サイクリング（約1.5時間）
3. **11:30** 遊覧船で玄光寺へ（名物の茶葉卵を試食）
4. **12:30** 伊達邵美食街でランチ
5. **14:00** 文武廟（年梯で自分の誕生日を探す）
6. **15:00** 日月老茶廠（お茶の試飲とお土産）
7. **16:30** 湖畔のホテルにチェックイン
8. **夕方** 湖畔の夕焼け散歩

### 2日目 — 清境

1. **08:30** チェックアウト、清境へ出発（約1.5時間）
2. **10:00** 青青草原散策、羊との触れ合い
3. **11:30** 天空歩道
4. **12:30** ランチ
5. **13:30** スイスガーデン
6. **14:30** 下山（または武嶺追加 +1.5時間）
7. **17:00-18:00** 台中/台北到着

## 実用情報

- **ベストシーズン**：秋冬（10-2月）は雲海が見やすい。春（3-4月）は清境で桜
- **服装**：清境は平地より10度以上涼しい。冬は0度近くになるため防寒必須
- **週末回避**：清境は休日に大混雑。平日がおすすめ
- **おまけ**：時間があれば武嶺（標高3,275m、台湾最高の舗装道路）へ。清境から車で約40分`;

// ---------------------------------------------------------------------------
// zh-CN  (Simplified Chinese — mainland expressions, NOT a transliteration)
// ---------------------------------------------------------------------------
const zhCN = `## 为什么选这条线路？

日月潭和清境农场是台湾中部最值得去的两个地方。日月潭被《国家地理》评为全球最美骑行路线之一，清境农场的高山牧场号称"台湾小瑞士"。两天一夜，从湖边到高山，性价比超高的中部经典线路。

## 行程亮点

### 🌊 日月潭 — 台湾必打卡的湖

${photoMd('sunmoonBoats', '日月潭湖面与小船 — 清晨薄雾中的宁静')}

海拔748米，台湾最大的天然湖。拉鲁岛把湖面分成"日潭"和"月潭"，所以叫日月潭。清晨湖面上经常起雾，像镜子一样，拍照特别出片。

**玩法推荐：**
- **游船**：三个码头循环（水社→玄光寺→伊达邵），班次多不用等
- **骑行环湖**：全程约30公里，其中"向山段"被CNN评为全球最美自行车道之一
- **SUP桨板**：在日月潭上玩SUP，近几年超火的玩法

${photoMd('sunmoonDock', '日月潭码头 — 湖畔悠闲时光')}

**必吃美食：**
- **伊达邵美食街** — 刈包、山猪肉香肠、小米麻糬、红茶蛋，走一圈吃到撑
- **日月潭红茶** — 台湾最好的阿萨姆红茶产区，强烈推荐台茶18号"红玉"，有薄荷和肉桂的特殊香气
- **总统鱼** — 日月潭特有的曲腰鱼，据说蒋经国特别爱吃

**小众景点：**
- **向山游客中心** — 日本建筑师团纪彦设计的清水混凝土建筑，建筑本身就是打卡点
- **日月老茶厂** — 百年老厂改造，免费参观，可以品茶买手信
- **猫囒山步道** — 轻松的茶园步道，山顶能360度俯瞰整个日月潭

**拍照攻略：** 早上6:00-7:00是日月潭最出片的时间，晨雾+远山剪影绝了。向山游客中心的悬挑观景平台是最佳机位。

### ⛩️ 文武庙 — 能看到湖景的庙

${photoMd('wenwuTemple', '文武庙 — 俯瞰日月潭的壮观庙宇')}

文武庙在日月潭北岸半山腰，是台湾唯一推开门就能看到湖的庙。金碧辉煌的大殿配上碧绿的日月潭，气势没得说。庙前有365级"年梯"，每级刻着一个日期，找到自己生日那级打卡是必做的事。

### 🐑 清境农场 — 台湾版小瑞士

${photoMd('qingjingSheep', '清境农场 — 草原上悠闲的绵羊')}

海拔1,700-2,000米的高山牧场，绿油油的大草原、悠闲的羊群、远处的中央山脉，再加上经常出现的云海，真的有种到了欧洲的感觉。

**必玩体验：**
- **绵羊秀**（周六日 09:30/14:30）— 新西兰牧羊人现场剪羊毛，互动感很强
- **马术秀**（周二至周日 10:45/15:45）— 骑手表演各种马术特技
- **天空步道** — 1.6公里的高架栈道，海拔1,700米看中央山脉，视野超开阔
- **老英格兰庄园** — 不住店也能进大堂参观，欧式城堡建筑拍照绝了

${photoMd('qingjingMountain', '从清境农场远眺中央山脉 — 云海翻涌')}

**看星星：** 清境光污染小、海拔高，是台湾最好的观星地之一。夏天的银河肉眼可见，记得带件外套。

**拍照攻略：** 上午10:00前草原光线最柔，拍羊群最好看。傍晚云海最壮观，天空步道上是最佳观景位。

### 🏔️ 合欢山（加餐推荐）

${photoMd('hehuanshanRoad', '合欢山公路 — 云雾缭绕的山路')}

时间够的话，从清境再往上开40分钟就到武岭 — 台湾公路最高点（海拔3,275米）。站在武岭停车场往下看，层峦叠嶂加翻涌的云海，天气好能看到太平洋。

${photoMd('hehuanshanPanorama', '合欢山群峰 — 台湾的屋脊')}

**拍照攻略：** 武岭停车场就是最佳观景台，日出和傍晚云海都是出片时刻。冬天如果赶上下雪，蓝天白雪的画面在台湾可遇不可求。

> 温馨提示：合欢山海拔高，有些人会有轻微高反（头晕、头疼），慢慢走多喝水就好。冬天武岭可能有积雪，出发前查好路况。

## 建议行程

### Day 1 — 日月潭

1. **08:00** 台北/台中出发（台中过去约1.5小时，台北约3.5小时）
2. **10:00** 向山游客中心，骑车环湖（约1.5小时）
3. **11:30** 坐游船到玄光寺（一定要尝阿婆茶叶蛋）
4. **12:30** 到伊达邵码头，美食街解决午饭
5. **14:00** 文武庙（找年梯上自己的生日打卡）
6. **15:00** 日月老茶厂（品茶、买伴手礼）
7. **16:30** 入住湖边酒店，自由活动
8. **傍晚** 湖边散步看日落

### Day 2 — 清境

1. **08:30** 退房出发去清境（车程约1.5小时）
2. **10:00** 青青草原逛逛、跟羊互动、看绵羊秀
3. **11:30** 天空步道（高架栈道看中央山脉）
4. **12:30** 午饭 — 推荐清境云舞楼或好鸡婆土鸡城
5. **13:30** 小瑞士花园（欧式花园，水池倒影拍照好看）
6. **14:30** 返程下山（或者加个合欢山武岭 +1.5小时）
7. **17:00-18:00** 到达台中/台北

## 实用信息

- **最佳时间**：秋冬（10-2月）凉爽舒适、云海概率高；春天（3-4月）清境有樱花
- **住宿**：日月潭湖边选择很多，从精品民宿到五星酒店都有
- **穿衣提醒**：清境比山下低10度以上，冬天可能接近0度，厚外套必备。日月潭湖边早晚凉，带件薄外套就行
- **避开周末**：清境节假日人挤人，尽量安排工作日去
- **租车骑行**：向山游客中心旁边有好几家租车店，电动车最省力
- **加餐推荐**：时间够可以上武岭（台湾公路最高点 3,275m），从清境开上去约40分钟`;

// ---------------------------------------------------------------------------
// Korean  (polite form, natural travel expressions, concise & practical)
// ---------------------------------------------------------------------------
const ko = `## 왜 이 코스인가요?

르웨탄 日月潭과 칭징농장 清境農場은 대만 중부를 대표하는 두 대 관광지입니다. 르웨탄은 내셔널지오그래픽이 선정한 세계에서 가장 아름다운 자전거 코스 중 하나이고, 칭징농장의 고산 초원은 "대만의 작은 스위스"로 불립니다. 1박 2일로 호숫가에서 고산까지, 대만 중부의 매력을 한 번에 즐길 수 있는 필수 코스입니다.

## 코스 하이라이트

### 🌊 르웨탄 日月潭 — 대만의 보석

${photoMd('sunmoonBoats', '르웨탄 — 아침 안개 속 호수와 작은 배')}

해발 748m에 위치한 대만 최대의 천연 호수입니다. 라루섬이 호수를 "일담(해)"과 "월담(달)"으로 나누어 이름이 붙었습니다. 이른 아침 안개가 호수를 거울처럼 만들어 사진 찍기에 최고입니다.

**즐기는 방법：**
- **유람선**：3개 선착장 순환 운항（수이서 水社→쉬안광쓰 玄光寺→이다사오 伊達邵）
- **자전거 환호**：전체 약 30km, CNN이 세계에서 가장 아름다운 자전거 도로로 선정
- **SUP 패들보드**：르웨탄에서 SUP 체험이 최근 가장 인기 있는 액티비티

${photoMd('sunmoonDock', '르웨탄 선착장 — 호숫가의 여유로운 시간')}

**맛집 추천：**
- **이다사오 미식거리 伊達邵美食街** — 과바오(대만식 햄버거), 산돼지 소시지, 좁쌀 찹쌀떡, 홍차 달걀
- **르웨탄 홍차** — 대만 최고급 아삼 홍차 산지. 타이차 18호 "홍위(紅玉)" 강력 추천, 민트와 시나몬 향이 특징
- **총통어 總統魚** — 르웨탄 고유종으로, 장징궈 총통이 즐겨 먹어서 이름이 붙은 생선

**숨은 명소：**
- **샹산 방문자센터 向山遊客中心** — 일본 건축가 단 노리히코 설계, 노출 콘크리트 건축 자체가 작품
- **르웨 라오차창 日月老茶廠** — 100년 역사의 찻잎 공장 리모델링, 무료 입장, 시음 및 구매 가능
- **마오란산 步道 猫囒山** — 가벼운 차밭 산책로, 정상에서 르웨탄 360도 전망

**촬영 팁：** 아침 6:00-7:00이 가장 아름다운 시간대입니다. 안개 낀 호수와 원경 산 실루엣이 환상적. 샹산 방문자센터의 캔틸레버 전망대가 최고의 앵글입니다.

### ⛩️ 원우먀오 文武廟 — 호수가 내려다보이는 사원

${photoMd('wenwuTemple', '원우먀오 — 르웨탄을 내려다보는 웅장한 사원')}

르웨탄 북쪽 산허리에 위치한 원우먀오는 대만에서 유일하게 문을 열면 바로 호수가 보이는 사원입니다. 황금빛 전각과 에메랄드빛 호수의 대비가 장관. 사원 앞 365계단 "연계(年梯)"에서 자기 생일 날짜가 새겨진 계단을 찾아 사진 찍는 것이 필수 코스입니다.

### 🐑 칭징농장 清境農場 — 대만의 작은 스위스

${photoMd('qingjingSheep', '칭징농장 — 초원 위의 한가로운 양떼')}

해발 1,700-2,000m의 고산 목장입니다. 넓은 초원, 한가로운 양떼, 배경의 중앙산맥, 그리고 자주 나타나는 운해까지 — 정말 유럽에 온 것 같은 착각이 듭니다.

**필수 체험：**
- **양 쇼**（토·일 09:30/14:30）— 뉴질랜드 출신 목동의 양털 깎기 쇼, 관객 참여형
- **마술 쇼**（화~일 10:45/15:45）— 기수의 다양한 승마 묘기
- **하늘 산책로 天空步道** — 전체 1.6km 고가 산책로, 해발 1,700m에서 중앙산맥 조망
- **올드 잉글랜드 장원 老英格蘭莊園** — 숙박하지 않아도 로비 관람 가능, 유럽풍 성 건축이 포토 스팟

${photoMd('qingjingMountain', '칭징농장에서 바라본 중앙산맥과 운해')}

**별 관측：** 칭징은 빛 공해가 적고 해발이 높아 대만 최고의 별 관측 장소 중 하나입니다. 여름 은하수가 특히 장관이니 겉옷을 꼭 챙기세요.

**촬영 팁：** 오전 10:00 전 초원의 빛이 가장 부드러워 양떼 촬영에 최적. 저녁 운해가 가장 장관이며, 하늘 산책로 위가 베스트 뷰포인트입니다.

### 🏔️ 허환산 合歡山（보너스 추천）

${photoMd('hehuanshanRoad', '허환산 도로 — 구름 속을 달리는 고산 도로')}

시간 여유가 있다면 칭징에서 약 40분만 더 올라가면 우링 武嶺에 도착합니다. 해발 3,275m로 대만 포장도로 최고 지점입니다. 주차장에서 내려다보면 겹겹이 펼쳐진 산과 운해가 압권. 날씨 좋으면 태평양까지 보입니다.

${photoMd('hehuanshanPanorama', '허환산 연봉 — 대만의 지붕')}

**촬영 팁：** 우링 주차장이 최고의 뷰포인트. 새벽 일출과 저녁 운해 모두 절호의 촬영 타이밍입니다. 겨울에 눈이 쌓이면 파란 하늘과 설산의 조합은 대만에서 보기 힘든 절경입니다.

> 참고：해발이 높아 가벼운 고산 증상（어지러움, 두통）이 나타날 수 있습니다. 천천히 걷고 물을 충분히 마시세요. 겨울에는 적설 가능성이 있으니 출발 전 도로 상황을 확인하세요.

## 추천 일정

### 1일차 — 르웨탄 日月潭

1. **08:00** 타이베이/타이중 출발（타이중에서 약 1.5시간, 타이베이에서 약 3.5시간）
2. **10:00** 샹산 방문자센터, 자전거 환호（약 1.5시간）
3. **11:30** 유람선으로 쉬안광쓰로 이동（명물 아포 차예단 茶葉蛋 꼭 맛보기）
4. **12:30** 이다사오 미식거리에서 점심
5. **14:00** 원우먀오（연계에서 내 생일 찾기）
6. **15:00** 르웨 라오차창（차 시음 & 기념품）
7. **16:30** 호숫가 호텔 체크인
8. **저녁** 호숫가 산책하며 노을 감상

### 2일차 — 칭징 清境

1. **08:30** 체크아웃, 칭징으로 출발（약 1.5시간）
2. **10:00** 칭칭초원 산책, 양과 교감, 양 쇼 관람
3. **11:30** 하늘 산책로（중앙산맥 조망）
4. **12:30** 점심 — 칭징 윈우러우 雲舞樓 또는 하오지포 토종닭 好雞婆土雞城 추천
5. **13:30** 소 스위스 화원 小瑞士花園（유럽풍 정원, 연못 반영 사진 예쁨）
6. **14:30** 하산 귀환（또는 허환산 우링 추가 +1.5시간）
7. **17:00-18:00** 타이중/타이베이 도착

## 실용 정보

- **베스트 시즌**：가을~겨울（10-2월）선선하고 운해 확률 높음. 봄（3-4월）칭징에 벚꽃
- **복장**：칭징은 평지보다 10도 이상 낮음. 겨울엔 0도 가까이 내려가므로 두꺼운 외투 필수. 르웨탄 호숫가는 아침저녁만 쌀쌀하니 얇은 겉옷이면 충분
- **주말 피하기**：칭징은 주말·공휴일에 사람이 엄청 많으니 평일 추천
- **자전거 대여**：샹산 방문자센터 옆에 대여점 여러 곳. 전동자전거가 가장 편함
- **보너스**：시간 여유 있으면 우링（해발 3,275m, 대만 최고 포장도로）추가. 칭징에서 차로 약 40분`;

// ---------------------------------------------------------------------------
// Build final content object & PATCH
// ---------------------------------------------------------------------------
const content = { 'zh-TW': zhTW, en, ja, 'zh-CN': zhCN, ko };

async function main() {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.sun-moon-lake`,
    { method: 'PATCH', headers, body: JSON.stringify({ content }) }
  );
  console.log(`sun-moon-lake 5-lang update: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) {
    console.log(await res.text());
  } else {
    const data = await res.json();
    const langs = data[0] ? Object.keys(data[0].content) : [];
    console.log(`Languages in content: ${langs.join(', ')}`);
  }
}

main();
