// Update 日月潭清境二日遊 with per-attraction Unsplash photos
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

const content = {
  'zh-TW': `## 為什麼選這條路線？

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
- **加碼推薦**：時間充裕可加走武嶺（台灣公路最高點 3,275m），從清境上去車程約40分鐘`,

  en: `## Why This Route?

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
- **Bonus**: Add Wuling Pass (3,275m, Taiwan's highest paved road) — 40min drive from Qingjing`,

  ja: `## なぜこのルート？

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
- **おまけ**：時間があれば武嶺（標高3,275m、台湾最高の舗装道路）へ。清境から車で約40分`,
};

async function main() {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.sun-moon-lake`,
    { method: 'PATCH', headers, body: JSON.stringify({ content }) }
  );
  console.log(`sun-moon-lake: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) console.log(await res.text());
}

main();
