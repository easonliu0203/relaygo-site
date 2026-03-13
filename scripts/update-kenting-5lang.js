// Update 墾丁南台灣一日遊 guide with all 5 languages: zh-TW, zh-CN, en, ja, ko
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
  eluanbi: {
    url: 'https://images.unsplash.com/photo-1678197434806-a275ec32ff40?w=1200&q=80',
    credit: 'Houses Cheung (@housescheung)',
    creditUrl: 'https://unsplash.com/@housescheung?utm_source=relaygo&utm_medium=referral',
  },
  southBay: {
    url: 'https://images.unsplash.com/photo-1576332946878-20324ed6e6c8?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
  longpan: {
    url: 'https://images.unsplash.com/photo-1621315875054-3adb72ab43bf?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
  maobitou: {
    url: 'https://images.unsplash.com/photo-1576332822067-aa628ac8f0ae?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
  kentingSunset: {
    url: 'https://images.unsplash.com/photo-1604998621792-269a15506674?w=1200&q=80',
    credit: 'M. X. (@custom_project)',
    creditUrl: 'https://unsplash.com/@custom_project?utm_source=relaygo&utm_medium=referral',
  },
  kentingCoast: {
    url: 'https://images.unsplash.com/photo-1576332941800-dcf7be3c8999?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
};

function photoMd(key, alt) {
  const p = PHOTOS[key];
  return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
}

const content = {
  'zh-TW': `## 為什麼選這條路線？

墾丁是全台灣最南端的度假勝地，一整天就能把燈塔、海灣、珊瑚礁海岸和夜市全部收入行囊。從高雄出發車程約2小時，沿途經過枋寮、楓港，一路從都市切換到熱帶海洋風光，是喜歡陽光、海水和海鮮的旅客絕對不能錯過的路線。

## 行程亮點

### 🏠 鵝鑾鼻燈塔 — 台灣最南端的白色地標

${photoMd('eluanbi', '鵝鑾鼻燈塔 — 純白色燈塔矗立在台灣最南端')}

鵝鑾鼻燈塔是台灣最南點的標誌性建築，也是全世界少數武裝燈塔之一（清朝時期為防海盜，燈塔四周設有壕溝和槍孔）。純白色的塔身搭配湛藍的天空和海洋，怎麼拍都好看。燈塔周圍的鵝鑾鼻公園有珊瑚礁石灰岩地形，走在步道上可以看到各種奇岩怪石，大約30-40分鐘就能走完一圈。

從停車場走到「台灣最南點」的意象碑大約15分鐘，那裡是正式的台灣最南端，站在木棧道上看著巴士海峽和太平洋交會，有種「站在世界盡頭」的感動。

**必吃美食：**
- **鵝鑾鼻公園旁的烤飛魚攤** — 在地人推薦，整條飛魚炭烤鹹香入味
- **哈利波特玉米杯** — 墾丁國小前面的小攤，玉米濃湯加起司超濃郁

**拍照秘訣：** 上午9-10點光線最好，燈塔正面朝東，順光拍攝塔身最白最漂亮。下午逆光反而適合拍剪影。避開正中午，白色塔身過曝嚴重。

### 🏖️ 南灣 — 墾丁最熱鬧的月牙海灘

${photoMd('southBay', '南灣海灘 — 墾丁最南端的碧藍海岸線')}

南灣是墾丁最具代表性的海灘，金黃色的沙灘呈完美的月牙形，海水從淺到深呈現漸層的Tiffany藍。這裡是墾丁水上活動的集散地，香蕉船、水上摩托車、浮潛⋯⋯想得到的水上活動這裡都有。即使不下水，光是坐在沙灘上看衝浪客乘浪就很療癒。

南灣的日落也是一絕——太陽緩緩沉入海平面，天空從金黃漸變成橘紅再到紫藍，搭配遠方的大尖山剪影，是墾丁最經典的畫面之一。

**必吃美食：**
- **南灣海灘旁的烤玉米** — 碳烤刷上特製醬料，在海風中吃特別香
- **迪迪小吃** — 南洋風味的在地名店，椒麻雞和打拋豬飯是招牌

**拍照秘訣：** 日落前1小時到南灣，找靠近西側的位置。用手機低角度貼近水面拍攝，可以拍出天空和海面同時倒映夕陽的效果。

### 🌊 龍磐公園 — 無邊際的斷崖草原

${photoMd('longpan', '龍磐公園 — 翠綠草原延伸到蔚藍海岸線')}

龍磐公園是墾丁最震撼的自然景觀，站在高聳的珊瑚礁斷崖上，腳下就是太平洋無邊無際的深藍。不同於南灣的柔和，這裡的海岸充滿野性——崎嶇的珊瑚礁、被海風吹歪的矮樹叢、一望無際的草原，讓人有種站在世界邊緣的壯闊感。

龍磐也是全台灣觀星條件最好的地方之一，因為光害極低，銀河季（4-9月）肉眼就能看到清晰的銀河拱橋。如果你的包車行程延伸到晚上，這裡絕對值得一停。

**拍照秘訣：** 下午3-4點的光線最漂亮，草原被染成金綠色，搭配深藍海面的對比超好拍。風很大，帽子要抓好。觀星拍銀河建議凌晨2-4點，需要腳架和手動曝光設定。

### 🐱 貓鼻頭公園 — 巴士海峽的絕美觀景台

${photoMd('maobitou', '貓鼻頭 — 俯瞰巴士海峽的壯闊海岸線')}

貓鼻頭的名字來自一塊形似蹲坐貓咪的珊瑚礁岩，從觀景台望去，蔚藍的巴士海峽一覽無遺。這裡的裙礁海岸地形是台灣本島最發達的，退潮時可以看到一整片平坦的珊瑚礁平台，潮間帶生物豐富，海膽、海參、小魚在淺水區穿梭。

從停車場到觀景台大約走10分鐘，路程輕鬆適合所有年齡層。觀景台有兩層，上層看遠景，下層有角度可以拍到貓咪造型的那塊珊瑚礁。園區不大，大約20-30分鐘就能走完。

**必吃美食：**
- **園區入口的炸花枝丸** — 現炸現吃，外酥內Q彈

**拍照秘訣：** 觀景台的下層角度最好，可以同時拍到貓咪岩和海岸線。退潮時拍裙礁更壯觀，可先查潮汐表。

### 🌅 墾丁大街 — 南台灣最熱鬧的夜市一條街

${photoMd('kentingSunset', '墾丁海岸的夕陽 — 墾丁大街就在這片海岸旁')}

墾丁大街白天是普通的省道，到了傍晚搖身一變成為全台灣最有海洋度假風情的夜市。不像台北夜市擠在巷弄裡，墾丁大街兩旁是椰子樹和衝浪店，空氣中混著烤肉香和海風鹹味，光是走在路上就很有渡假的感覺。

**必吃美食：**
- **小杜包子** — 墾丁排隊名店，招牌獅子頭包和蛋黃香菇肉包，下午就開始排隊
- **一品滷味** — 墾丁大街上的老字號，自選食材現滷現吃
- **泰國蝦** — 夜市裡好幾攤在烤泰國蝦，選蝦身飽滿、現烤的最新鮮
- **QQ蛋奶** — 雞蛋造型的雞蛋糕加上濃郁奶茶，是墾丁大街的招牌甜點

**拍照秘訣：** 傍晚6點左右夜市剛開，攤位都亮了燈但人潮還沒湧入，是最好的街景拍攝時機。

## 建議行程

### 上午 — 最南端巡禮
1. **07:00** 高雄市區出發，走國道3號接台1線南下（車程約2小時）
2. **09:00** 抵達鵝鑾鼻燈塔，參觀燈塔和公園步道（約1小時）
3. **10:00** 步行至台灣最南點意象碑拍照打卡（約30分鐘來回）

### 下午 — 海岸線巡遊
4. **10:40** 開車前往龍磐公園（約10分鐘車程）
5. **10:50** 龍磐公園觀景，斷崖草原拍照（約40分鐘）
6. **11:40** 前往南灣（約15分鐘車程）
7. **11:50** 南灣午餐 + 海灘漫步或水上活動（約2小時）
8. **14:00** 前往貓鼻頭公園（約10分鐘車程）
9. **14:10** 貓鼻頭觀景台散步（約30分鐘）

### 傍晚 — 大街與夕陽
10. **14:50** 前往墾丁大街（約15分鐘車程）
11. **15:00** 墾丁大街周邊逛街，小杜包子買伴手禮
12. **17:00** 到南灣或船帆石附近看日落（約10分鐘）
13. **17:30** 墾丁大街夜市晚餐
14. **19:00** 返回高雄（車程約2小時，約21:00抵達）

## 實用資訊

- **最佳季節**：10月到隔年4月是墾丁最舒適的季節，氣溫25-30度，不會太熱也不太冷。避開7-9月颱風季
- **避開人潮**：平日比假日人少很多。春吶期間（4月初）和跨年是爆滿高峰，訂車要提早
- **穿著建議**：防曬是第一要務——帽子、太陽眼鏡、防曬乳必備。龍磐公園風很大，帶件薄外套。鵝鑾鼻公園步道有珊瑚礁碎石，穿包鞋比涼鞋安全
- **落山風注意**：10月到隔年3月恆春半島有強烈落山風，龍磐和貓鼻頭體感特別強烈，注意帽子和隨身物品
- **墾丁大街夜市**：通常傍晚5-6點開始營業，週末比平日熱鬧`,

  'zh-CN': `## 为什么选这条路线？

垦丁是整个台湾岛最南端的度假胜地，一天时间就能把灯塔、海湾、珊瑚礁海岸和夜市统统打卡一遍。从高雄出发车程大约2小时，一路从城市切换到热带海洋风光，阳光、沙滩、海鲜一样不缺，绝对是来台湾不能错过的宝藏路线。

## 行程亮点

### 🏠 鹅銮鼻灯塔 — 台湾最南端的白色地标

${photoMd('eluanbi', '鹅銮鼻灯塔 — 台湾最南端的纯白灯塔')}

鹅銮鼻灯塔是台湾最南端的标志性建筑，也是世界上少有的武装灯塔（清朝时期为了防海盗，灯塔周围修了壕沟和射击孔）。纯白色塔身配上蔚蓝的天空和海面，随便一拍就是大片。灯塔周边的鹅銮鼻公园有珊瑚礁石灰岩地貌，走一圈步道大约30-40分钟，各种奇形怪状的礁石特别出片。

从停车场走到「台湾最南点」意象碑大约15分钟，这是真正意义上的台湾最南端。站在木栈道上看着巴士海峡和太平洋的交汇处，有种站在天涯海角的仪式感。

**必吃推荐：**
- **鹅銮鼻公园旁的烤飞鱼摊** — 整条飞鱼碳烤，咸香味超正
- **哈利波特玉米杯** — 垦丁国小前的小摊位，芝士玉米浓汤好喝到不行

**拍照攻略：** 上午9-10点顺光拍灯塔最好看，塔身最白最亮。中午过曝严重，下午适合拍剪影。

### 🏖️ 南湾 — 垦丁人气最高的月牙沙滩

${photoMd('southBay', '南湾 — 垦丁最具代表性的碧蓝海岸')}

南湾是垦丁的C位海滩，金色沙滩呈完美月牙形，海水渐变的蒂芙尼蓝简直绝了。这里是垦丁水上项目的大本营，香蕉船、摩托艇、浮潜……想玩的这里全有。就算不下水，坐在沙滩上看冲浪也很解压。

南湾的落日也超赞——太阳沉入海面的那一刻，天空从金色渐变成橘红再到紫蓝，配上远处大尖山的剪影，出片率极高。

**必吃推荐：**
- **南湾海滩旁的烤玉米** — 碳烤刷特调酱汁，海风里吃格外香
- **迪迪小吃** — 南洋风味在地名店，椒麻鸡和打抛猪必点

**拍照攻略：** 日落前1小时到南湾西侧，手机低角度贴水面拍，能拍出天空和海面同时倒映夕阳的绝美效果。

### 🌊 龙磐公园 — 无边际的断崖草原

${photoMd('longpan', '龙磐公园 — 翠绿草原延伸至蔚蓝海岸')}

龙磐公园是垦丁最震撼的自然景观，站在高耸的珊瑚礁断崖上，脚下就是太平洋无边无际的深蓝。和南湾的温柔不同，这里的海岸线充满野性——崎岖的珊瑚礁、被海风吹歪的矮树丛、一望无际的草原，站在这里有种世界尽头的感觉，拍照氛围感拉满。

龙磐还是全台湾观星条件最好的地方之一，光污染极低，银河季（4-9月）肉眼就能看到银河拱桥。如果包车行程能延伸到晚上，这里绝对值得一停。

**拍照攻略：** 下午3-4点光线最美，草原被夕阳染成金绿色，搭配深蓝海面的反差感绝了。风巨大，帽子要拿稳。拍银河建议凌晨2-4点带三脚架。

### 🐱 猫鼻头公园 — 巴士海峡的绝美观景台

${photoMd('maobitou', '猫鼻头 — 俯瞰巴士海峡的壮阔海岸线')}

猫鼻头的名字来源于一块形似蹲坐猫咪的珊瑚礁岩，从观景台望去，蔚蓝的巴士海峡尽收眼底。这里的裙礁海岸是台湾本岛最发达的，退潮时能看到一整片平坦的珊瑚礁平台，潮间带生物丰富得像天然水族馆。

从停车场到观景台大约走10分钟，老少皆宜。观景台分上下两层，上层看全景，下层角度能拍到猫咪造型的珊瑚礁。整个园区不大，20-30分钟就能逛完。

**必吃推荐：**
- **入口处的炸花枝丸** — 现炸现吃，外酥里Q弹

**拍照攻略：** 下层观景台角度最佳，能同时拍到猫咪岩和海岸线。退潮时裙礁更壮观，建议提前查潮汐表。

### 🌅 垦丁大街 — 南台湾最有氛围的夜市

${photoMd('kentingSunset', '垦丁海岸日落 — 垦丁大街就在这片海岸旁')}

垦丁大街白天是普通省道，一到傍晚就变身成全台最有度假感的夜市。两旁是椰子树和冲浪店，空气里混着烧烤香和海风的咸味，光走在路上就已经很有度假氛围了，和城市里的夜市体验完全不同。

**必吃推荐：**
- **小杜包子** — 排队名店，狮子头包和蛋黄香菇肉包是招牌，下午就开始排
- **一品卤味** — 大街上的老字号，自选食材现卤现吃
- **泰国虾** — 夜市好几家在烤泰国虾，挑虾身饱满的现烤最鲜
- **QQ蛋奶** — 鸡蛋造型的蛋糕配浓郁奶茶，垦丁大街打卡甜品

**拍照攻略：** 傍晚6点夜市刚开灯但人还没挤进来的时候，是拍街景的最佳时机。

## 建议行程

### 上午 — 最南端打卡
1. **07:00** 高雄市区出发，走国道3号接台1线南下（约2小时）
2. **09:00** 到达鹅銮鼻灯塔，逛公园步道（约1小时）
3. **10:00** 步行到台湾最南点拍照打卡（来回约30分钟）

### 下午 — 海岸线巡游
4. **10:40** 开车到龙磐公园（约10分钟）
5. **10:50** 龙磐公园拍照打卡（约40分钟）
6. **11:40** 前往南湾（约15分钟）
7. **11:50** 南湾午餐 + 海滩（约2小时）
8. **14:00** 前往猫鼻头（约10分钟）
9. **14:10** 猫鼻头观景台（约30分钟）

### 傍晚 — 大街与日落
10. **14:50** 前往垦丁大街（约15分钟）
11. **15:00** 逛街 + 小杜包子买伴手礼
12. **17:00** 到南湾或船帆石看日落（约10分钟）
13. **17:30** 垦丁大街夜市晚餐
14. **19:00** 返回高雄（约2小时，大约21:00到达）

## 实用信息

- **最佳季节**：10月到次年4月最舒适，气温25-30度。7-9月台风季尽量避开
- **避开人潮**：工作日人少很多。春天呐喊（4月初）和跨年是爆满高峰，订车要趁早
- **穿搭建议**：防晒第一位——帽子、墨镜、防晒霜必备。龙磐风大带件薄外套。鹅銮鼻步道有碎珊瑚石，穿运动鞋比凉鞋安全
- **落山风提醒**：10月到次年3月恒春半岛有强烈落山风，龙磐和猫鼻头体感最明显，注意随身物品
- **垦丁大街夜市**：通常下午5-6点开始，周末比工作日热闹`,

  en: `## Why This Route?

Kenting is Taiwan's southernmost resort region — a tropical paradise where you can tick off a historic lighthouse, turquoise bays, dramatic coral-reef cliffs, and a beachside night market all in a single day. The drive from Kaohsiung takes about 2 hours, transitioning from urban cityscape to palm-lined coastal roads. If you love sunshine, ocean, and fresh seafood, this is the route for you.

## Highlights

### 🏠 Eluanbi Lighthouse — Taiwan's Southernmost Landmark

${photoMd('eluanbi', 'Eluanbi Lighthouse — a white lighthouse at Taiwan southernmost tip')}

Eluanbi Lighthouse is the iconic marker of Taiwan's southernmost point and one of the few armed lighthouses in the world — built during the Qing Dynasty with a surrounding moat and gun ports to fend off pirates. The snow-white tower framed against deep-blue sky and ocean is effortlessly photogenic.

The surrounding Eluanbi Park features coral limestone formations along a loop trail that takes about 30-40 minutes. From the parking lot, a 15-minute walk leads to the "Southernmost Point of Taiwan" monument, where a wooden boardwalk overlooks the convergence of the Bashi Channel and the Pacific Ocean — a genuinely moving spot.

**Must-Eat:**
- **Grilled flying fish stall** next to the park — whole charcoal-grilled flying fish with a smoky, savory glaze
- **Harry Potter Corn Cup** — a cheesy corn-soup cup from a tiny stall by Kenting Elementary School

**Photo Tips:** Morning (9-10 AM) offers the best front-lit angle on the east-facing lighthouse. Midday causes harsh overexposure on the white tower. Afternoon backlighting works well for silhouettes.

### 🏖️ Nanwan (South Bay) — Kenting's Most Popular Crescent Beach

${photoMd('southBay', 'Nanwan South Bay — turquoise waters along Kenting southernmost coast')}

Nanwan is Kenting's signature beach — a golden crescent of sand backed by Tiffany-blue water that deepens to cobalt offshore. It's the hub for water sports: banana boats, jet skis, snorkeling, parasailing — you name it. Even if you skip the water, just watching surfers ride the swells is hypnotically relaxing.

Sunset at Nanwan is equally stunning — the sky shifts from gold to tangerine to deep violet, with the silhouette of Dajian Mountain (大尖山) punctuating the horizon. One of Kenting's most iconic views.

**Must-Eat:**
- **Charcoal-roasted corn** from the beachside stalls — brushed with a house-made sauce, irresistible in the sea breeze
- **Didi Xiaochi 迪迪小吃** — a beloved local restaurant with Southeast-Asian-inspired dishes; the pepper-fried chicken and basil pork rice are signatures

**Photo Tips:** Arrive 1 hour before sunset and position yourself on the west side of the beach. Hold your phone low, just above the waterline, to capture the sky and sea mirroring the setting sun simultaneously.

### 🌊 Longpan Park — Boundless Clifftop Grasslands

${photoMd('longpan', 'Longpan Park — lush green grassland meeting the blue Pacific coast')}

Longpan Park is Kenting's most awe-inspiring natural landscape. Standing atop towering coral-reef cliffs, you look straight down into the endless deep blue of the Pacific. Unlike Nanwan's gentle curves, the coastline here is raw and wild — jagged coral outcrops, wind-bent shrubs, and vast grasslands stretching to the horizon create a feeling of standing at the edge of the world.

Longpan is also one of Taiwan's premier stargazing spots thanks to minimal light pollution. During Milky Way season (April-September), the galactic arch is clearly visible to the naked eye. If your charter extends into the evening, this is an unmissable stop.

**Photo Tips:** The golden hour around 3-4 PM paints the grasslands in warm gold-green tones that contrast beautifully against the deep-blue ocean. Wind is fierce here — hold onto hats and loose items. For Milky Way shots, visit between 2-4 AM with a tripod and manual exposure settings.

### 🐱 Maobitou Park — Bashi Channel Panoramic Viewpoint

${photoMd('maobitou', 'Maobitou coast — sweeping views over the Bashi Channel')}

Maobitou ("Cat's Nose Cape") gets its name from a coral-rock formation that resembles a crouching cat. From the observation deck, you get an unobstructed panorama of the azure Bashi Channel. The fringing reef here is the most developed on Taiwan's main island — at low tide, a vast coral platform emerges, teeming with sea urchins, sea cucumbers, and tiny fish darting through the shallows.

The walk from the parking lot to the viewpoint takes about 10 minutes on an easy, flat path suitable for all ages. The two-level observation deck offers wide-angle views from above and a lower angle that perfectly frames the cat-shaped rock. Budget 20-30 minutes for the full loop.

**Must-Eat:**
- **Fried squid balls** at the park entrance — freshly deep-fried, crispy outside and springy inside

**Photo Tips:** The lower observation deck gives the best composition, capturing both the cat rock and the coastline in one frame. The reef platform is most dramatic at low tide — check tide charts in advance.

### 🌅 Kenting Main Street — Taiwan's Most Tropical Night Market

${photoMd('kentingSunset', 'Kenting coast at sunset — Kenting Main Street sits right along this shoreline')}

By day, Kenting Main Street is an ordinary provincial highway. By dusk, it transforms into Taiwan's most vacation-vibed night market. Instead of city alleyways, here you stroll beneath palm trees past surf shops, with the smell of grilled meat mingling with salt air. It feels more like a beach boardwalk than a traditional market.

**Must-Eat:**
- **Xiaodu Baozi 小杜包子** — Kenting's most famous queue-worthy shop; the lion's-head bun and egg-yolk mushroom pork bun are legendary — the line starts in the afternoon
- **Yipin Luwei 一品滷味** — a long-standing stall where you pick your ingredients and they braise them on the spot
- **Grilled Thai shrimp** — multiple stalls grill jumbo prawns live; pick the plumpest ones for peak freshness
- **QQ Egg Milk** — egg-shaped cakes paired with rich milk tea, a signature Kenting street sweet

**Photo Tips:** Around 6 PM, the stalls light up but crowds haven't peaked yet — the best window for atmospheric street shots.

## Suggested Itinerary

### Morning — Southernmost Point Exploration
1. **07:00** Depart Kaohsiung city center via Freeway 3 → Provincial Highway 1 south (~2 hours)
2. **09:00** Arrive at Eluanbi Lighthouse, explore the park trail (~1 hour)
3. **10:00** Walk to Southernmost Point of Taiwan monument for photos (~30 min round-trip)

### Afternoon — Coastal Loop
4. **10:40** Drive to Longpan Park (~10 min)
5. **10:50** Clifftop grassland walk and photos (~40 min)
6. **11:40** Head to Nanwan / South Bay (~15 min)
7. **11:50** Lunch at Nanwan + beach time or water sports (~2 hours)
8. **14:00** Drive to Maobitou Park (~10 min)
9. **14:10** Maobitou observation deck stroll (~30 min)

### Evening — Night Market & Sunset
10. **14:50** Head to Kenting Main Street (~15 min)
11. **15:00** Browse shops, grab Xiaodu Baozi souvenirs
12. **17:00** Catch sunset at Nanwan or Sail Rock / Chuanfanshi (~10 min)
13. **17:30** Dinner at Kenting Main Street night market
14. **19:00** Return to Kaohsiung (~2 hours, arrive ~21:00)

## Practical Tips

- **Best Season**: October through April is most comfortable (25-30°C / 77-86°F). Avoid July-September typhoon season
- **Avoid Crowds**: Weekdays are significantly quieter. Spring Scream (early April) and New Year's Eve are peak-packed — book your charter early
- **What to Wear**: Sun protection is priority #1 — hat, sunglasses, sunscreen are non-negotiable. Bring a light jacket for Longpan's fierce wind. Wear closed-toe shoes for Eluanbi's coral-gravel trails
- **Foehn Wind Warning**: October through March brings powerful "Luoshan Wind" (foehn) to the Hengchun Peninsula; Longpan and Maobitou are especially exposed — secure loose belongings
- **Kenting Night Market**: Usually opens around 5-6 PM; weekends are livelier than weekdays`,

  ja: `## このルートの魅力は？

墾丁（ケンティン）は台湾最南端のリゾート地。灯台、ビーチ、珊瑚礁の断崖、夜市を1日で満喫できる贅沢なルートです。高雄から車で約2時間、南国の海と太陽を存分に楽しめます。

## ハイライト

### 🏠 鵝鑾鼻灯台 — 台湾最南端の白い灯台

${photoMd('eluanbi', '鵝鑾鼻灯台 — 台湾最南端に立つ白亜の灯台')}

鵝鑾鼻（エルアンビー）灯台は台湾最南端のランドマーク。清朝時代に海賊対策として堀や銃眼を備えた世界でも珍しい武装灯台です。真っ白な灯台と青い空・海のコントラストは、どの角度から撮っても絵になります。

周辺の公園には珊瑚礁の石灰岩地形が広がり、遊歩道を30〜40分で一周できます。駐車場から「台湾最南点」の碑まで徒歩約15分。バシー海峡と太平洋が交わる絶景ポイントです。

**おすすめグルメ：**
- **鵝鑾鼻公園横の焼き飛魚屋台** — 丸ごと炭火焼きで香ばしい一品
- **ハリーポターコーンカップ** — 墾丁小学校前の小さな屋台、チーズ入りコーンスープが濃厚

**撮影のコツ：** 午前9〜10時が順光でベスト。灯台は東向きなので午前中に白さが際立ちます。午後は逆光でシルエット撮影向き。

### 🏖️ 南湾 — 墾丁で一番人気の三日月ビーチ

${photoMd('southBay', '南湾ビーチ — 墾丁最南端のターコイズブルーの海岸線')}

南湾（ナンワン）は墾丁を代表するビーチ。金色の砂浜が美しい三日月形を描き、海はティファニーブルーからコバルトブルーへとグラデーション。バナナボート、ジェットスキー、シュノーケリングなど、マリンアクティビティも充実しています。

夕暮れ時は空がゴールドからオレンジ、紫へと変化し、遠くに大尖山のシルエットが浮かぶ、墾丁屈指の夕日スポットです。

**おすすめグルメ：**
- **ビーチ横の焼きとうもろこし** — 特製タレで炭火焼き、潮風と一緒に味わう絶品
- **迪迪小吃** — 東南アジア風の地元名店、ペッパーチキンとバジル豚ライスが看板メニュー

**撮影のコツ：** 日没1時間前に西側へ。スマホを水面ギリギリまで低く構えると、空と海に映る夕日を同時に撮影できます。

### 🌊 龍磐公園 — 果てしない断崖と草原

${photoMd('longpan', '龍磐公園 — 緑の草原が青い海岸線まで広がる絶景')}

龍磐（ロンパン）公園は墾丁で最もダイナミックな自然景観。珊瑚礁の断崖の上に立つと、眼下には太平洋の果てしない紺碧が広がります。風に煽られた低木と広大な草原が、まるで世界の果てに立っているような壮大なスケール感を演出します。

光害が極めて少なく、台湾有数の星空スポットでもあります。天の川シーズン（4〜9月）には肉眼で天の川のアーチが見える贅沢な場所です。

**撮影のコツ：** 午後3〜4時の光が最も美しく、草原が金緑色に染まります。風が非常に強いので帽子にご注意。天の川撮影は深夜2〜4時、三脚とマニュアル露出が必須です。

### 🐱 猫鼻頭公園 — バシー海峡の絶景展望台

${photoMd('maobitou', '猫鼻頭 — バシー海峡を一望する壮大な海岸線')}

猫鼻頭（マオビートウ）は、座った猫の形をした珊瑚礁の岩が名前の由来。展望台からはバシー海峡の蒼い海が一望できます。台湾本島で最も発達した裾礁海岸があり、干潮時には広大な珊瑚礁の棚が現れ、ウニやナマコ、小魚が行き交います。

駐車場から展望台まで約10分の楽な歩き。園内は20〜30分で回れるコンパクトさです。

**おすすめグルメ：**
- **入口の揚げイカ団子** — 揚げたてアツアツ、外はサクサク中はプリプリ

**撮影のコツ：** 展望台の下段が猫岩と海岸線を同時に収められるベストアングル。干潮時の裾礁は迫力倍増です。

### 🌅 墾丁大街 — 南台湾で最もリゾート感あふれる夜市

${photoMd('kentingSunset', '墾丁海岸の夕暮れ — 墾丁大街はこの海岸沿いにある')}

墾丁大街は昼間はただの県道ですが、夕方になると台湾一リゾート感のある夜市に変身。ヤシの木とサーフショップの間を歩くと、BBQの香りと潮風が混じり合い、歩いているだけで南国気分に浸れます。

**おすすめグルメ：**
- **小杜包子** — 墾丁の行列店。獅子頭まんと卵黄キノコ肉まんが看板、午後から行列が始まります
- **一品滷味** — 好きな食材を選んで煮込んでもらうセミオーダー式
- **焼きタイエビ** — 身がぎっしり詰まった活きエビを目の前で炭火焼き
- **QQ蛋奶** — 卵型カステラ＋濃厚ミルクティー、墾丁大街の定番スイーツ

**撮影のコツ：** 夕方6時頃、屋台が灯りをつけ始めるまだ空いている時間帯がストリート撮影のゴールデンタイム。

## モデルコース

### 午前 — 最南端めぐり
1. **07:00** 高雄市内出発、国道3号→台1線で南下（約2時間）
2. **09:00** 鵝鑾鼻灯台到着、公園散策（約1時間）
3. **10:00** 台湾最南点の碑まで徒歩往復（約30分）

### 午後 — 海岸線ドライブ
4. **10:40** 龍磐公園へ移動（約10分）
5. **10:50** 断崖草原の絶景鑑賞（約40分）
6. **11:40** 南湾へ移動（約15分）
7. **11:50** 南湾でランチ＋ビーチ散策（約2時間）
8. **14:00** 猫鼻頭公園へ移動（約10分）
9. **14:10** 猫鼻頭展望台（約30分）

### 夕方 — 夜市と夕日
10. **14:50** 墾丁大街へ移動（約15分）
11. **15:00** 街ブラ＋小杜包子でお土産購入
12. **17:00** 南湾か帆船石付近で夕日鑑賞（約10分移動）
13. **17:30** 墾丁大街夜市で夕食
14. **19:00** 高雄へ出発（約2時間、21:00頃到着）

## 実用情報

- **ベストシーズン**：10月〜翌年4月が快適（25〜30℃）。7〜9月の台風シーズンは避けましょう
- **混雑回避**：平日は断然空いています。春天吶喊（4月初旬）と年越しは大混雑、チャーター予約はお早めに
- **服装**：日焼け対策最優先 — 帽子・サングラス・日焼け止めは必須。龍磐は強風なので薄手の上着を。鵝鑾鼻の遊歩道は珊瑚礁の砂利道、スニーカーがおすすめ
- **落山風に注意**：10月〜3月は恒春半島に強い落山風（フェーン）が吹きます。龍磐と猫鼻頭は特に強烈
- **墾丁大街夜市**：通常17〜18時オープン、週末のほうが賑やか`,

  ko: `## 왜 이 코스인가요?

컨딩(墾丁)은 타이완 최남단의 리조트 지역으로, 하루 동안 등대, 해변, 산호초 절벽, 야시장까지 전부 즐길 수 있는 알찬 코스입니다. 가오슝에서 차로 약 2시간, 도시에서 열대 해안으로 풍경이 완전히 바뀌는 드라이브도 매력 포인트. 햇살, 바다, 해산물을 사랑하는 여행자라면 필수 코스입니다.

## 하이라이트

### 🏠 어란비 등대 鵝鑾鼻燈塔 — 타이완 최남단의 하얀 랜드마크

${photoMd('eluanbi', '어란비 등대 — 타이완 최남단에 우뚝 선 하얀 등대')}

어란비(鵝鑾鼻) 등대는 타이완 최남단의 상징적 건축물이자, 청나라 시대 해적 방어용으로 해자와 총안을 갖춘 세계적으로도 드문 무장 등대입니다. 새하얀 등대와 푸른 하늘, 바다의 대비가 어떤 각도에서든 인생샷을 만들어 줍니다.

주변 어란비 공원에는 산호초 석회암 지형이 펼쳐져 있고, 산책로를 한 바퀴 도는 데 약 30~40분. 주차장에서 '타이완 최남점' 기념비까지는 도보 약 15분으로, 바시 해협과 태평양이 만나는 곳에서 세상 끝에 선 느낌을 경험할 수 있습니다.

**맛집 추천:**
- **어란비 공원 옆 숯불 날치 구이** — 통째로 숯불에 구운 날치, 짭조름한 풍미가 일품
- **해리포터 콘컵** — 컨딩 초등학교 앞 작은 포장마차, 치즈 콘수프가 진하고 맛있어요

**촬영 팁:** 오전 9~10시가 순광으로 등대가 가장 하얗게 빛납니다. 정오는 과다노출 심하고, 오후에는 실루엣 촬영에 좋아요.

### 🏖️ 난완 南灣 — 컨딩에서 가장 인기 있는 초승달 해변

${photoMd('southBay', '난완 해변 — 컨딩 최남단의 터키석빛 해안선')}

난완(南灣)은 컨딩의 대표 해변으로, 금빛 모래사장이 완벽한 초승달 모양을 그리고 바닷물은 티파니 블루에서 코발트 블루로 그라데이션됩니다. 바나나보트, 제트스키, 스노클링 등 해양 액티비티의 중심지이기도 해요. 물에 안 들어가더라도 서퍼들 구경만으로도 힐링됩니다.

일몰 때는 하늘이 금색에서 주황, 보라로 변하며 멀리 다지엔산(大尖山) 실루엣이 드라마틱한 배경을 만들어 줍니다.

**맛집 추천:**
- **해변 옆 숯불 옥수수** — 특제 소스로 구운 옥수수, 바닷바람과 함께 먹으면 최고
- **디디샤오츠 迪迪小吃** — 동남아 스타일 로컬 맛집, 마라치킨과 바질 돼지고기 덮밥이 시그니처

**촬영 팁:** 일몰 1시간 전에 해변 서쪽에 자리 잡고, 핸드폰을 수면 가까이 낮게 잡으면 하늘과 바다에 동시에 노을이 반사되는 사진을 찍을 수 있어요.

### 🌊 룽판 공원 龍磐公園 — 끝없는 절벽 초원

${photoMd('longpan', '룽판 공원 — 초록 초원이 푸른 해안선까지 펼쳐진 절경')}

룽판(龍磐) 공원은 컨딩에서 가장 웅장한 자연경관을 자랑합니다. 높이 솟은 산호초 절벽 위에 서면 발아래로 태평양의 끝없는 짙은 파란이 펼쳐집니다. 울퉁불퉁한 산호초, 바람에 휘어진 관목, 광활한 초원이 어우러져 세상 끝에 선 듯한 스케일을 체감할 수 있어요.

빛 공해가 거의 없어 타이완 최고의 별 관측 스팟이기도 합니다. 은하수 시즌(4~9월)에는 맨눈으로 은하수 아치를 볼 수 있는 럭셔리한 장소입니다.

**촬영 팁:** 오후 3~4시 빛이 가장 아름다워요. 초원이 금빛 초록으로 물들고 짙은 바다와 대비가 멋집니다. 바람이 매우 세니 모자 조심! 은하수 촬영은 새벽 2~4시, 삼각대와 수동 노출 필수.

### 🐱 마오비터우 공원 貓鼻頭公園 — 바시 해협 파노라마 전망대

${photoMd('maobitou', '마오비터우 — 바시 해협을 한눈에 내려다보는 웅장한 해안선')}

마오비터우(貓鼻頭, '고양이 코 곶')는 웅크린 고양이 모양의 산호초 바위에서 이름이 유래했어요. 전망대에서는 바시 해협의 쪽빛 바다가 한눈에 들어옵니다. 타이완 본섬에서 가장 발달한 치마초(裙礁) 해안이 있어, 썰물 때는 넓은 산호초 플랫폼이 드러나며 성게, 해삼, 작은 물고기들이 가득한 천연 수족관이 됩니다.

주차장에서 전망대까지 약 10분, 누구나 편하게 걸을 수 있어요. 전체 공원은 20~30분이면 충분합니다.

**맛집 추천:**
- **입구의 튀긴 오징어 완자** — 갓 튀겨서 바삭바삭, 속은 쫄깃

**촬영 팁:** 전망대 하층이 고양이 바위와 해안선을 동시에 담을 수 있는 베스트 앵글. 썰물 때 치마초가 더 장관이니 조석표를 미리 확인하세요.

### 🌅 컨딩 대가 墾丁大街 — 남타이완 최고의 분위기 야시장

${photoMd('kentingSunset', '컨딩 해안의 일몰 — 컨딩 대가는 바로 이 해안가에 있어요')}

컨딩 대가(墾丁大街)는 낮에는 평범한 도로지만, 해 질 무렵이면 타이완에서 가장 리조트 느낌 나는 야시장으로 변신합니다. 야자수와 서핑숍 사이를 거닐며 숯불 향과 짭짤한 바닷바람을 동시에 즐기는 이 분위기, 도시 야시장과는 차원이 다릅니다.

**맛집 추천:**
- **샤오두 바오즈 小杜包子** — 컨딩 줄 서는 맛집, 사자머리 만두와 계란노른자 버섯 고기만두가 시그니처. 오후부터 줄이 생겨요
- **이핀루웨이 一品滷味** — 원하는 재료를 골라서 바로 조리해 주는 즉석 루웨이
- **태국 새우 구이** — 야시장 곳곳에서 통통한 왕새우를 숯불에 구워 줘요
- **QQ에그밀크** — 달걀 모양 카스테라 + 진한 밀크티, 컨딩 대가 필수 디저트

**촬영 팁:** 저녁 6시쯤 포장마차에 불이 켜지지만 아직 사람이 몰리기 전, 거리 사진 찍기 딱 좋은 타이밍이에요.

## 추천 일정

### 오전 — 최남단 탐방
1. **07:00** 가오슝 시내 출발, 국도3호→대1선 남하 (약 2시간)
2. **09:00** 어란비 등대 도착, 공원 산책 (약 1시간)
3. **10:00** 타이완 최남점 기념비까지 도보 왕복 (약 30분)

### 오후 — 해안 드라이브
4. **10:40** 룽판 공원으로 이동 (약 10분)
5. **10:50** 절벽 초원 감상 및 촬영 (약 40분)
6. **11:40** 난완으로 이동 (약 15분)
7. **11:50** 난완에서 점심 + 해변 (약 2시간)
8. **14:00** 마오비터우 공원으로 이동 (약 10분)
9. **14:10** 마오비터우 전망대 (약 30분)

### 저녁 — 야시장과 일몰
10. **14:50** 컨딩 대가로 이동 (약 15분)
11. **15:00** 쇼핑 + 샤오두 바오즈 기념품 구매
12. **17:00** 난완 또는 범선바위 근처에서 일몰 감상 (이동 약 10분)
13. **17:30** 컨딩 대가 야시장에서 저녁 식사
14. **19:00** 가오슝으로 출발 (약 2시간, 21:00경 도착)

## 실용 정보

- **베스트 시즌**: 10월~이듬해 4월이 가장 쾌적 (25~30°C). 7~9월 태풍 시즌은 피하세요
- **인파 피하기**: 평일이 훨씬 한가합니다. 춘톈나한(봄 음악 페스티벌, 4월 초)과 연말연시는 대혼잡, 차터 예약은 일찍 하세요
- **복장 추천**: 자외선 차단이 최우선 — 모자, 선글라스, 선크림 필수. 룽판은 강풍이라 얇은 겉옷 필요. 어란비 산책로는 산호초 자갈길이라 운동화 추천
- **뤄산풍(落山風) 주의**: 10월~3월 헝춘 반도에 강한 푄(Foehn) 바람이 불어요. 룽판과 마오비터우가 특히 강력하니 소지품 조심
- **컨딩 대가 야시장**: 보통 오후 5~6시 오픈, 주말이 더 활기차요`,
};

async function main() {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.kenting-south`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        content,
        cover_image: PHOTOS.southBay.url,
      }),
    }
  );
  const data = await res.text();
  console.log(`Status: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) console.log(data);
  else console.log('✅ 墾丁南台灣一日遊 updated with all 5 languages (zh-TW, zh-CN, en, ja, ko) + 6 Unsplash photos!');
}

main();
