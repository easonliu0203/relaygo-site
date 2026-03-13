// Update 阿里山森林一日遊 guide with all 5 languages: zh-TW, zh-CN, en, ja, ko
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Photo URLs with Unsplash attribution (all verified HTTP 200)
const PHOTOS = {
  forestPath: {
    url: 'https://images.unsplash.com/photo-1619573138735-2b39a835d824?w=1200&q=80',
    credit: 'Winston Chen (@winstonchen)',
    creditUrl: 'https://unsplash.com/@winstonchen?utm_source=relaygo&utm_medium=referral',
  },
  ancientTrees: {
    url: 'https://images.unsplash.com/photo-1619573137077-6f833d56a98d?w=1200&q=80',
    credit: 'Winston Chen (@winstonchen)',
    creditUrl: 'https://unsplash.com/@winstonchen?utm_source=relaygo&utm_medium=referral',
  },
  railway: {
    // location: 台灣嘉義縣阿里山, description: Taiwan Alishan Train
    url: 'https://images.unsplash.com/photo-1587522938909-02d96ccdcdfc?w=1200&q=80',
    credit: '旭展 姚 (@doremiyao)',
    creditUrl: 'https://unsplash.com/@doremiyao?utm_source=relaygo&utm_medium=referral',
  },
  railwayForest: {
    // location: Alishan, Alishan Township, Taiwan
    url: 'https://images.unsplash.com/photo-1759577362632-ce321d4387ce?w=1200&q=80',
    credit: 'Michelle Sun (@notmichelle)',
    creditUrl: 'https://unsplash.com/@notmichelle?utm_source=relaygo&utm_medium=referral',
  },
  sunrise: {
    // location: Longtou Ping, Fanlu Township, Chiayi County, Taiwan
    // description: Alishan valley at sunrise
    url: 'https://images.unsplash.com/photo-1587108639646-c6ea7b46b247?w=1200&q=80',
    credit: 'Eric BARBEAU (@ericbarbeau)',
    creditUrl: 'https://unsplash.com/@ericbarbeau?utm_source=relaygo&utm_medium=referral',
  },
  teaFields: {
    // location: Alishan, Alishan Township, Chiayi County, Taiwan
    // description: tea fields near Alishan
    url: 'https://images.unsplash.com/photo-1575467627652-0c597f6dba77?w=1200&q=80',
    credit: 'Alexa Soh (@alexasoh)',
    creditUrl: 'https://unsplash.com/@alexasoh?utm_source=relaygo&utm_medium=referral',
  },
  sisterPonds: {
    // description: Pond in Alishan National Forest Recreation Area
    // location: Alishan National Forest Recreation Area
    url: 'https://images.unsplash.com/photo-1602130781025-15086e93a59b?w=1200&q=80',
    credit: 'Y S (@santonii)',
    creditUrl: 'https://unsplash.com/@santonii?utm_source=relaygo&utm_medium=referral',
  },
  seaOfClouds: {
    // description: The Mountains of Taiwan
    // location: Taiwan
    url: 'https://images.unsplash.com/photo-1690547976964-5ae86be6a69e?w=1200&q=80',
    credit: 'Ainsley Myles (@mylesinthesky)',
    creditUrl: 'https://unsplash.com/@mylesinthesky?utm_source=relaygo&utm_medium=referral',
  },
};

function photoMd(key, alt) {
  const p = PHOTOS[key];
  return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
}

// ---------------------------------------------------------------------------
// zh-TW — 最詳細，台灣口語風格
// ---------------------------------------------------------------------------
const zhTW = `## 為什麼選這條路線？

阿里山是台灣最具代表性的高山景點，海拔2,200公尺的原始森林、穿梭雲霧間的紅色小火車、破曉時分的祝山日出——這些畫面就是很多人心中「台灣最美的風景」。從嘉義市區出發包車上山約2.5小時，沿途從熱帶林相一路變化到溫帶針葉林，光是車窗外的景色就值得這趟旅程。

## 行程亮點

### 🌲 阿里山神木群 — 千年巨木的震撼

${photoMd('forestPath', '阿里山森林步道，兩側參天巨木')}

走進阿里山的巨木群棧道，你會被眼前的景象震撼到——樹齡超過千年的紅檜和扁柏，樹幹粗到五六個人牽手才能環抱。這裡的空氣帶著一股清甜的檜木香，深深吸一口，整個人都被洗滌了。

巨木群棧道分為一號和二號兩條路線，全程走完大約1.5-2小時，步道鋪設完善、坡度平緩，就算是帶長輩或小孩也能輕鬆走完。二號棧道盡頭的「阿里山香林神木」是目前園區內最大的神木，樹齡約2,300年，站在它面前你會深刻體會到什麼叫「人在自然面前的渺小」。

${photoMd('ancientTrees', '千年紅檜巨木群')}

**必吃：**
- **阿里山愛玉** — 用山上採的野生愛玉子手洗的，口感跟平地的完全不同，滑嫩到不行
- **阿里山高山茶** — 海拔1,000公尺以上的茶園產的烏龍茶，回甘特別持久

**拍照秘訣：** 清晨7:00-8:00陽光斜射入森林時最夢幻，光線穿過樹冠層形成一道道光柱，隨手拍都像電影場景。建議帶腳架拍長曝光。

### 🚂 阿里山森林鐵路 — 穿越百年的紅色小火車

${photoMd('railway', '阿里山森林鐵路小火車')}

阿里山森林鐵路是全世界僅存的三條登山鐵路之一，從海拔30公尺的嘉義市區一路爬升到2,274公尺的阿里山站，沿途會經過獨立山的螺旋型路線和之字形折返——火車在同一座山上繞三圈才能到山頂，這種工程技術在全球鐵路史上都是傳奇。

園區內的「沼平線」和「神木線」是最受歡迎的兩段，車程各約10分鐘。紅色車廂穿過翠綠森林的畫面，是阿里山最經典的明信片角度。

${photoMd('railwayForest', '紅色小火車穿越翠綠森林')}

**拍照秘訣：** 沼平車站旁的櫻花鐵道是最經典的拍攝點，3月櫻花季時粉紅花瓣飄落在鐵軌上美到不真實。非櫻花季節在神木車站附近的彎道也很好拍，列車過彎時車身傾斜的弧度超有動感。

### 🌅 祝山日出 — 雲海上的第一道曙光

${photoMd('sunrise', '阿里山祝山觀日出')}

看阿里山日出是很多台灣人一輩子一定要做一次的事。凌晨摸黑搭上祝山線小火車（發車時間隨季節調整，約清晨4:00-5:00），抵達祝山觀日平台後，在滿天星斗中等待東方天際線慢慢亮起。太陽從玉山山脈的稜線後方緩緩升起，金色光芒灑在整片雲海上的那一刻——你會覺得早起的每一秒都值得。

日出時間隨季節變化很大：夏天約5:00-5:30，冬天約6:30-7:00。建議前一天在遊客中心確認隔天的日出時間和祝山線發車時刻。

**拍照秘訣：** 帶望遠鏡頭（200mm以上）可以拍到太陽從玉山背後升起的特寫。日出前20分鐘的「魔幻時刻」天空色彩最豐富——橘紅、粉紫、金黃層層交疊，比日出本身還美。記得帶保暖外套，山上清晨只有5-10度。

### 🏞️ 姊妹潭 — 森林裡的祕境湖泊

${photoMd('sisterPonds', '阿里山姊妹潭，森林環繞的寧靜湖面')}

姊妹潭是阿里山森林遊樂區裡最寧靜的角落。兩座大小不同的天然湖泊鑲嵌在原始森林中，湖面倒映著四周的參天巨木，水面平靜得像一面鏡子。傳說兩位原住民姊妹因為同時愛上一名男子，分別投入大小兩潭，化為湖中的守護精靈。

大姊妹潭中央有一座木造涼亭，是園區裡最有意境的拍照點。環潭步道全程平坦，走一圈約20分鐘，沿途設有木棧道和休憩座椅，是飯後散步的好去處。

**拍照秘訣：** 清晨無風時湖面最平靜，倒影最清晰。如果遇到起霧的日子更有仙境感，霧氣在湖面上緩緩飄動的畫面非常夢幻。

### ☁️ 雲海 — 腳下踩著一片白色大海

${photoMd('seaOfClouds', '阿里山雲海，壯闊的雲瀑從山谷湧上')}

阿里山雲海被譽為台灣八景之一，當條件對了的時候，整片嘉南平原被白色雲層覆蓋，只露出遠方的山頭，腳下真的就像踩在雲上一樣。秋冬季節（10月-隔年3月）是雲海最容易出現的時段，尤其是午後14:00-16:00，暖溼氣流上升遇冷凝結，雲海最為壯觀。

觀賞雲海的最佳地點是小笠原山觀景台和慈雲寺觀景台，兩處都能看到360度的環景。如果運氣好遇到「雲瀑」——雲海像瀑布一樣從山谷傾瀉而下——那是比日出還難得的奇景。

**拍照秘訣：** 帶廣角鏡頭才能拍出雲海的壯闊感。縮時攝影特別推薦，雲海的流動肉眼看起來很慢，但縮時影片的效果非常震撼。

### 🍱 奮起湖 — 山城老街與傳說中的便當

${photoMd('teaFields', '阿里山茶園，海拔千米的翠綠茶田')}

奮起湖海拔1,400公尺，是阿里山森林鐵路的中繼站，因為周圍三面環山地形像畚箕，閩南語「畚箕」諧音「奮起」，加上經常雲霧繚繞像一座湖，因此得名「奮起湖」。這裡最有名的就是鐵路便當——早年火車在此停靠加水加煤，旅客趁機下車買便當吃，形成了獨特的「便當文化」。

老街不長，大約20分鐘就能走完一圈，但每家店都有故事。除了便當，山葵料理也是這裡的特色——阿里山的氣候特別適合山葵生長，現磨的新鮮山葵配上生魚片，辛嗆中帶著一股清甜，跟超市買的管裝芥末完全是兩個世界。

**必吃：**
- **奮起湖便當** — 排骨飯是經典款，木盒裝的特別有懷舊感
- **山葵料理** — 山葵豆腐、山葵冰淇淋，意想不到的好吃

## 建議行程安排

### 清晨 — 追日出
1. **04:30** 搭乘祝山線小火車前往祝山觀日平台（前一天購票）
2. **05:00-06:00** 觀賞日出（時間依季節調整）
3. **06:30** 回到旅館享用早餐

### 上午 — 森林漫步
4. **08:00** 巨木群棧道一號（約60分鐘）
5. **09:15** 姊妹潭環潭步道（約30分鐘）
6. **10:00** 沼平公園、沼平車站拍照（約30分鐘）
7. **10:40** 搭乘神木線小火車到神木車站（約10分鐘）

### 下午 — 雲海與老街
8. **11:30** 午餐（園區內餐廳或自備便當）
9. **12:30** 小笠原山觀景台看雲海（約60分鐘）
10. **14:00** 開車下山前往奮起湖（車程約1小時）
11. **15:00** 逛奮起湖老街、吃鐵路便當（約60分鐘）
12. **16:00** 從奮起湖返回嘉義市區（車程約1.5小時）

## 實用貼士

- **最佳季節**：3月櫻花季是人氣最旺的時候，粉紅櫻花配紅色小火車的畫面超夢幻。10-12月秋冬季雲海出現機率最高，人潮也比較少
- **避開人潮**：平日上山人少很多。週末和連假建議前一晚住在山上，隔天一早趁遊客還沒上山前逛景點
- **穿著建議**：山上氣溫比平地低10-15度，夏天也建議帶薄外套。看日出時清晨只有5-10度，保暖外套和毛帽必備。步道好走但建議穿防滑的運動鞋
- **高山反應**：海拔2,200公尺，有些人可能會有輕微頭暈或喘，放慢腳步多喝水就好
- **車程提醒**：嘉義市區到阿里山約2.5小時車程（台18線阿里山公路），彎道多容易暈車，建議備暈車藥`;

// ---------------------------------------------------------------------------
// zh-CN — 简体中文，大陆游客视角
// ---------------------------------------------------------------------------
const zhCN = `## 为什么选这条路线？

阿里山是台湾最具代表性的高山景区，海拔2,200米的原始森林、穿行于云雾中的红色小火车、破晓时分的祝山日出——这些画面堪称"台湾最美的风景"。从嘉义市区包车上山约2.5小时，沿途植被从热带到温带逐渐变化，车窗外的景色已经值回票价。

## 行程亮点

### 🌲 阿里山神木群 — 千年古木的震撼

${photoMd('forestPath', '阿里山森林步道，参天巨木林立')}

走进阿里山的巨木群栈道，眼前的景象让人叹为观止——树龄超千年的红桧和扁柏，树干粗到五六个人手拉手才能合抱。空气里弥漫着一股清甜的桧木香气，深吸一口，神清气爽。

巨木群栈道分一号和二号两条线路，全程走完约1.5-2小时，步道铺设完善、坡度平缓，老人小孩都能轻松完成。二号栈道尽头的"阿里山香林神木"是园区内最大的神木，树龄约2,300年。

${photoMd('ancientTrees', '千年红桧巨木群')}

**必吃：**
- **阿里山爱玉** — 用山上采的野生爱玉子手工制作，口感滑嫩，和山下的完全不同
- **阿里山高山茶** — 海拔1,000米以上茶园产的乌龙茶，回甘持久

**拍照攻略：** 清晨7:00-8:00阳光斜射入林间，光柱穿透树冠层，随手一拍就是大片。建议带三脚架拍慢门。

### 🚂 阿里山森林铁路 — 穿越百年的红色小火车

${photoMd('railway', '阿里山森林铁路小火车')}

阿里山森林铁路是全世界仅存的三条登山铁路之一，从海拔30米的嘉义市区一路攀升到2,274米的阿里山站。沿途会经过独立山的螺旋型路线和之字形折返——火车在同一座山上绕三圈才能登顶，堪称世界铁路工程史上的奇迹。

园区内的"沼平线"和"神木线"最受欢迎，车程各约10分钟。红色车厢穿越翠绿森林的画面，就是阿里山最经典的打卡角度。

${photoMd('railwayForest', '红色小火车穿越翠绿森林')}

**拍照攻略：** 沼平车站旁的樱花铁道是最经典的机位，3月樱花季粉色花瓣飘落在铁轨上，美到不真实。非樱花季在神木车站附近的弯道也很出片。

### 🌅 祝山日出 — 云海之上的第一缕阳光

${photoMd('sunrise', '阿里山祝山观日出')}

看阿里山日出是来台湾必打卡的体验。凌晨摸黑搭祝山线小火车（发车时间随季节调整，约清晨4:00-5:00），到达祝山观日平台后，在满天星光中等待东方天际渐渐泛红。太阳从玉山山脉的棱线后缓缓升起，金色光芒洒满整片云海的瞬间——绝对值得牺牲一晚的睡眠。

日出时间季节变化大：夏季约5:00-5:30，冬季约6:30-7:00。建议前一天在游客中心确认隔天的日出时间和火车班次。

**拍照攻略：** 长焦镜头（200mm以上）可以拍到太阳从玉山背后升起的特写。日出前20分钟天空色彩最丰富，橘红、粉紫、金黄层层叠叠。山上清晨只有5-10度，一定要带保暖外套。

### 🏞️ 姊妹潭 — 原始森林里的秘境湖泊

${photoMd('sisterPonds', '阿里山姊妹潭，森林环绕的宁静湖面')}

姊妹潭是阿里山森林游乐区最宁静的角落。两座大小不同的天然湖泊镶嵌在原始森林中，湖面倒映着四周参天巨木，平静得像一面镜子。传说两位原住民姊妹因同时爱上一名男子，分别投入大小两潭，化为湖中守护精灵。

环潭步道全程平坦，走一圈约20分钟，沿途设有木栈道和休息座椅。

**拍照攻略：** 清晨无风时湖面最平静，倒影最清晰。若遇雾天更有意境，雾气在湖面上缓缓飘动，宛如仙境。

### ☁️ 云海 — 脚下踩着一片白色海洋

${photoMd('seaOfClouds', '阿里山云海，壮阔的云层覆盖整片山谷')}

阿里山云海是台湾八景之一。条件合适时，整片嘉南平原被白色云层覆盖，只露出远方山头，脚下如同踩在云端。秋冬季节（10月至次年3月）是云海高发期，尤其午后14:00-16:00最壮观。

最佳观赏点是小笠原山观景台和慈云寺观景台，两处都能看到360度全景。运气好的话还能看到"云瀑"——云海像瀑布一样从山谷倾泻而下，比日出更难得一见。

**拍照攻略：** 广角镜头才能拍出云海的壮阔。延时摄影效果特别震撼，云海流动的画面非常有冲击力。

### 🍱 奋起湖 — 山城老街与铁路便当

${photoMd('teaFields', '阿里山茶园，海拔千米的翠绿茶田')}

奋起湖海拔1,400米，是阿里山森林铁路的中途站。因三面环山地形似畚箕（闽南语谐音"奋起"），加上常年云雾缭绕如湖面，故名"奋起湖"。这里最出名的就是铁路便当——早年火车在此停靠补给，旅客趁机下车买便当，形成了独特的便当文化。

老街不长，20分钟走完一圈，但家家有特色。除了便当，山葵料理也值得一试——阿里山气候特别适合山葵生长，现磨的新鲜山葵配生鱼片，和超市里的管装芥末完全不是一回事。

**必吃：**
- **奋起湖便当** — 排骨饭是经典，木盒装特别有怀旧感
- **山葵料理** — 山葵豆腐、山葵冰淇淋，出乎意料地好吃

## 建议行程

### 清晨 — 追日出
1. **04:30** 搭祝山线小火车前往观日平台（需前一天购票）
2. **05:00-06:00** 观赏日出（时间随季节调整）
3. **06:30** 回酒店吃早餐

### 上午 — 森林徒步
4. **08:00** 巨木群栈道一号（约60分钟）
5. **09:15** 姊妹潭环潭步道（约30分钟）
6. **10:00** 沼平公园、沼平车站拍照（约30分钟）
7. **10:40** 搭神木线小火车到神木车站（约10分钟）

### 下午 — 云海与老街
8. **11:30** 午餐
9. **12:30** 小笠原山观景台看云海（约60分钟）
10. **14:00** 驱车前往奋起湖（车程约1小时）
11. **15:00** 逛奋起湖老街、吃铁路便当（约60分钟）
12. **16:00** 从奋起湖返回嘉义市区（车程约1.5小时）

## 实用贴士

- **最佳季节**：3月樱花季人气最旺，樱花配小火车超出片。10-12月秋冬季云海出现概率最高，游客也少
- **避开人潮**：工作日上山人少很多。周末建议前一晚住山上，第二天一早趁团客未到先逛景点
- **穿着建议**：山上比平地低10-15度，夏天也要带薄外套。看日出时只有5-10度，保暖外套和帽子必带。步道好走但建议穿防滑运动鞋
- **高反提醒**：海拔2,200米，少数人可能轻微头晕或气喘，放慢节奏多喝水即可
- **车程提醒**：嘉义市区到阿里山约2.5小时（台18线），弯道较多容易晕车，建议备晕车药`;

// ---------------------------------------------------------------------------
// en — Travel-magazine tone, romanized names
// ---------------------------------------------------------------------------
const en = `## Why This Route?

Alishan (阿里山) is Taiwan's most iconic mountain destination — a primeval forest at 2,200 meters elevation, a century-old narrow-gauge railway threading through clouds, and sunrises that paint the sky above a sea of clouds. The 2.5-hour drive from Chiayi city climbs through five distinct climate zones, transforming the landscape from tropical lowlands to misty cypress groves. It's the single most "Taiwan" experience you can have in one day.

## Highlights

### 🌲 Sacred Tree Trail — Walking Among 2,000-Year-Old Giants

${photoMd('forestPath', 'Alishan forest trail flanked by towering ancient trees')}

The Giant Tree Boardwalks wind through groves of Formosan red cypress (Chamaecyparis formosensis) and Taiwan incense cedar, some over 2,000 years old. The trunks are so massive that five or six people linking hands can barely encircle them. The air carries a clean, sweet hinoki fragrance that feels almost medicinal — breathing it in is one of those sensory memories you'll carry home from Taiwan.

Two numbered routes (Trail 1 and Trail 2) cover the highlights in about 1.5-2 hours total. The boardwalks are well-maintained and gentle enough for families. At the end of Trail 2 stands the "Xianglin Sacred Tree," the park's largest — 2,300 years old, a living relic that predates the Roman Empire.

${photoMd('ancientTrees', 'Thousand-year-old Formosan red cypress grove')}

**Must-Eat:**
- **Alishan Aiyu Jelly** — Hand-washed from wild fig seeds harvested on the mountain; the texture is silkier and more fragrant than any lowland version
- **Alishan High-Mountain Oolong Tea** — Grown above 1,000m where cool temperatures and mist produce a lingering sweet aftertaste

**Photo Tips:** Between 7:00-8:00 AM, angled sunlight pierces the canopy in dramatic shafts — every direction is cinematic. Bring a tripod for long-exposure forest mist shots.

### 🚂 Alishan Forest Railway — A Red Train Through the Clouds

${photoMd('railway', 'Alishan Forest Railway red train on mountain tracks')}

The Alishan Forest Railway is one of only three mountain railways still operating worldwide. It climbs from 30 meters at Chiayi Station to 2,274 meters at Alishan Station, using spiraling loops around Dulishan Mountain and switchback zigzags — the train circles the same mountain three times to gain elevation, an engineering marvel that has run since 1912.

Inside the recreation area, the "Zhaoping Line" and "Sacred Tree Line" are the two most popular segments (about 10 minutes each). The sight of a red carriage gliding through emerald forest is Alishan's most photographed scene.

${photoMd('railwayForest', 'Red train winding through dense green forest')}

**Photo Tips:** The cherry-blossom railway near Zhaoping Station is the iconic shot — in March, pink petals drift onto the tracks. Outside cherry season, the curve near Sacred Tree Station captures beautiful motion as the train leans into the bend.

### 🌅 Zhushan Sunrise — First Light Above the Clouds

${photoMd('sunrise', 'Sunrise over Alishan mountain valley')}

Watching the sunrise from Alishan is a bucket-list experience in Taiwan. You board the Zhushan Line train in the pre-dawn darkness (departure time shifts seasonally, roughly 4:00-5:00 AM), arrive at the Zhushan Sunrise Platform, and wait beneath a canopy of stars as the eastern horizon slowly ignites. When the sun clears the ridgeline of the Yushan Range and floods the cloud sea with gold — you understand why people set alarms for 3 AM.

Sunrise times vary widely: around 5:00-5:30 in summer, 6:30-7:00 in winter. Check with the visitor center the evening before for the exact time and train schedule.

**Photo Tips:** A telephoto lens (200mm+) captures the sun rising directly behind Yushan (Jade Mountain). The "magic 20 minutes" before the sun breaks the ridge offer the richest colors — tangerine, violet, and gold layered across the sky. Bring a warm jacket; dawn temperatures hover around 5-10°C even in summer.

### 🏞️ Sister Ponds (Zimei Tan) — A Mirror in the Forest

${photoMd('sisterPonds', 'Sister Ponds in Alishan National Forest — still water reflecting towering trees')}

Sister Ponds are two natural pools nestled deep within old-growth forest, their surfaces so still they mirror the surrounding cypress canopy perfectly. Legend has it that two indigenous sisters, both in love with the same man, walked into the two ponds and became guardian spirits of the lake.

A wooden pavilion sits at the center of the larger pond — it's the most tranquil photo spot in the entire park. The loop trail is flat and takes about 20 minutes, with benches along the way for quiet contemplation.

**Photo Tips:** Visit at dawn when there's no wind for the clearest reflections. On misty mornings, wisps of fog drift across the water surface, creating an ethereal atmosphere that's impossible to stage.

### ☁️ Sea of Clouds — Standing on Top of a White Ocean

${photoMd('seaOfClouds', 'Alishan sea of clouds blanketing the valley below mountain peaks')}

The Alishan Sea of Clouds is listed among Taiwan's "Eight Great Views." When conditions align, the entire Chiayi-Tainan plain disappears under a white blanket of cloud, with only distant peaks poking through — you're literally standing above the clouds. Autumn and winter (October through March) offer the highest probability, with the most dramatic formations typically appearing between 2:00-4:00 PM as warm, moist air rises and condenses.

The best vantage points are the Ogasawara Mountain Platform and the Ciyun Temple Platform, both offering 360-degree panoramas. If you're lucky enough to witness a "cloud waterfall" — where the cloud sea pours over a ridge like a slow-motion cascade — you've seen something rarer than the sunrise itself.

**Photo Tips:** Wide-angle lenses are essential to capture the scale. Time-lapse video is highly recommended — the slow-rolling motion of the cloud sea translates into mesmerizing footage.

### 🍱 Fenqihu (奮起湖) — Mountain Village & Legendary Lunch Boxes

${photoMd('teaFields', 'Alishan tea plantation — emerald green fields at 1,000 meters')}

Fenqihu sits at 1,400 meters and served as the midway refueling stop on the Forest Railway. Its name literally means "Dustpan Lake" — the village is cupped by mountains on three sides (shaped like a dustpan, or "fenqi" in Hokkien), and the ever-present mist gives it the appearance of a lake. The famous Fenqihu Lunchbox (奮起湖便當) was born here: passengers would hop off during the stop to grab a boxed meal, creating a food tradition that survives today.

The old street is short — a 20-minute loop — but every stall has character. Beyond the lunchboxes, wasabi is the local specialty. Alishan's cool climate is ideal for fresh wasabi; grated-to-order on sashimi, it has a clean heat with a sweet finish that's worlds apart from the tube paste most people know.

**Must-Eat:**
- **Fenqihu Lunchbox** — Pork chop over rice in a wooden box; nostalgic railway comfort food
- **Wasabi dishes** — Wasabi tofu, wasabi ice cream — surprisingly delicious

## Suggested Itinerary

### Early Morning — Chasing Sunrise
1. **04:30** Board the Zhushan Line train to the sunrise platform (tickets purchased the day before)
2. **05:00-06:00** Watch the sunrise (time varies by season)
3. **06:30** Return to hotel for breakfast

### Morning — Forest Walk
4. **08:00** Giant Tree Boardwalk Trail 1 (~60 min)
5. **09:15** Sister Ponds loop trail (~30 min)
6. **10:00** Zhaoping Park and Zhaoping Station for photos (~30 min)
7. **10:40** Ride the Sacred Tree Line train to Sacred Tree Station (~10 min)

### Afternoon — Clouds & Village
8. **11:30** Lunch in the recreation area
9. **12:30** Ogasawara Mountain Platform for sea of clouds (~60 min)
10. **14:00** Drive down to Fenqihu (~1 hour)
11. **15:00** Explore Fenqihu Old Street, grab a lunchbox (~60 min)
12. **16:00** Return to Chiayi city (~1.5 hours)

## Practical Tips

- **Best Season:** March for cherry blossom season — pink blossoms framing a red train is Alishan's signature image. Oct-Dec for the best cloud sea conditions and thinner crowds
- **Beat the Crowds:** Weekdays see far fewer visitors. On weekends, stay overnight on the mountain and explore early before the tour buses arrive
- **What to Wear:** Temperatures are 10-15°C cooler than the lowlands. Even in summer, bring a light jacket. For sunrise, pack a warm coat and hat — dawn temperatures drop to 5-10°C. Wear non-slip walking shoes for the boardwalks
- **Altitude Note:** At 2,200m, some visitors may feel mildly lightheaded. Take it slow and stay hydrated
- **Drive Time:** Chiayi city to Alishan is approximately 2.5 hours via Provincial Highway 18 (Alishan Highway). The road is winding — motion sickness pills recommended`;

// ---------------------------------------------------------------------------
// ja — 丁寧なです/ます体、簡潔
// ---------------------------------------------------------------------------
const ja = `## このルートの魅力

阿里山（アリサン）は台湾を代表する山岳景勝地です。標高2,200mの原生林、雲の中を走る赤い登山列車、祝山から望む御来光——台湾の「最も美しい風景」がここに凝縮されています。嘉義市内からチャーター車で約2.5時間。道中、熱帯から温帯への植生の変化も見どころです。

## 見どころ

### 🌲 阿里山神木群 — 樹齢2,000年の巨木

${photoMd('forestPath', '阿里山の森林歩道、両側にそびえる巨木')}

巨木群桟道に足を踏み入れると、樹齢千年超のベニヒノキやタイワンヒノキの巨木が迎えてくれます。幹は5〜6人が手をつないでようやく一周できるほど。清涼なヒノキの香りに包まれる贅沢な体験です。

1号・2号の2ルートがあり、全行程約1.5〜2時間。歩道は整備され、勾配も緩やかなので、ご年配の方やお子様連れでも安心です。2号桟道の終点にある「香林神木」は樹齢約2,300年、園内最大の御神木です。

${photoMd('ancientTrees', '千年紅檜の巨木群')}

**おすすめグルメ：**
- **阿里山愛玉ゼリー** — 山で採れた野生の愛玉子で手作り。滑らかな食感は格別
- **阿里山高山烏龍茶** — 標高1,000m以上の茶畑で育った烏龍茶。甘い余韻が長く続きます

**撮影のコツ：** 早朝7:00〜8:00、斜光が樹冠を突き抜けて光の柱を作ります。三脚持参で長時間露光がおすすめ。

### 🚂 阿里山森林鉄道 — 百年の歴史を走る赤い列車

${photoMd('railway', '阿里山森林鉄道の赤い列車')}

阿里山森林鉄道は、世界に3つしか残っていない山岳鉄道のひとつ。嘉義駅（標高30m）から阿里山駅（標高2,274m）まで、スパイラルループとスイッチバックを駆使して登ります。1912年の開業以来、100年以上走り続ける鉄道遺産です。

園内では「沼平線」と「神木線」が人気で、各約10分の乗車。緑深い森を赤い車両が走る光景は、阿里山を象徴する絶景です。

${photoMd('railwayForest', '深い緑の森を走る赤い列車')}

**撮影のコツ：** 沼平駅近くの桜並木鉄道が定番スポット。3月の桜の季節には、ピンクの花びらが線路に舞い散る幻想的な光景が楽しめます。

### 🌅 祝山の御来光 — 雲海の上に昇る朝日

${photoMd('sunrise', '阿里山・祝山から望む日の出')}

阿里山の日の出は台湾旅行のハイライト。未明に祝山線列車に乗車（季節により発車時刻変動、概ね4:00〜5:00）、祝山展望台で満天の星の下、東の空が白む瞬間を待ちます。太陽が玉山山脈の稜線から姿を現し、雲海を金色に染める瞬間は鳥肌ものです。

日の出時刻は夏季約5:00〜5:30、冬季約6:30〜7:00。前日にビジターセンターで確認を。

**撮影のコツ：** 望遠レンズ（200mm以上）で玉山バックの日の出が狙えます。日の出20分前の「マジックアワー」が最も色彩豊か。山頂の早朝は5〜10℃、防寒着必携です。

### 🏞️ 姉妹潭 — 森に佇む静寂の湖

${photoMd('sisterPonds', '阿里山姉妹潭、森に囲まれた鏡のような水面')}

大小2つの天然池が原生林に抱かれるように佇んでいます。湖面は鏡のように静かで、周囲の巨木を完璧に映し出します。先住民族の姉妹にまつわる悲恋の伝説が残る場所です。

環潭歩道は平坦で一周約20分。大姉妹潭の中央にある東屋は園内随一の趣ある撮影スポットです。

**撮影のコツ：** 早朝の無風時が水面最も穏やか。霧の日は水面を漂う霧が幻想的な雰囲気を演出します。

### ☁️ 雲海 — 足元に広がる白い海

${photoMd('seaOfClouds', '阿里山の雲海、山々の間を埋め尽くす白い雲')}

阿里山の雲海は「台湾八景」のひとつ。条件が揃うと、嘉南平野が一面の白い雲に覆われ、遠くの山頂だけが顔を出します。秋冬（10月〜3月）が発生率最高。特に午後14:00〜16:00が壮観です。

小笠原山展望台と慈雲寺展望台が絶好のビューポイント。「雲瀑（雲の滝）」——雲海が山谷を滝のように流れ落ちる現象——に出会えたら、日の出以上に貴重な体験です。

**撮影のコツ：** 広角レンズで壮大なスケール感を。タイムラプス撮影は特におすすめです。

### 🍱 奮起湖 — 山あいの駅弁の里

${photoMd('teaFields', '阿里山の茶畑、標高1,000mの翠緑の茶園')}

奮起湖（フェンチーフー）は標高1,400m、森林鉄道の中間駅。三方を山に囲まれた地形が「畚箕（塵取り）」に似ていることと、常に霧がかかり湖のように見えることが名前の由来です。名物は鉄道弁当——かつて列車が給水停車する間に旅客が買い求めたのが始まりです。

老街は短いですが（一周約20分）、店ごとに個性があります。わさび料理もぜひ。阿里山の気候はわさび栽培に最適で、おろしたての生わさびは爽やかな辛さと甘みが格別です。

**おすすめグルメ：**
- **奮起湖弁当** — 豚カツご飯が定番。木箱入りでレトロな雰囲気
- **わさび料理** — わさび豆腐、わさびアイスクリームが意外な美味しさ

## おすすめ行程

### 早朝 — 御来光
1. **04:30** 祝山線列車で展望台へ（前日にチケット購入）
2. **05:00-06:00** 日の出鑑賞（季節により変動）
3. **06:30** ホテルで朝食

### 午前 — 森林散策
4. **08:00** 巨木群桟道1号（約60分）
5. **09:15** 姉妹潭周遊歩道（約30分）
6. **10:00** 沼平公園・沼平駅で撮影（約30分）
7. **10:40** 神木線列車で神木駅へ（約10分）

### 午後 — 雲海と老街
8. **11:30** 昼食
9. **12:30** 小笠原山展望台で雲海鑑賞（約60分）
10. **14:00** 奮起湖へ車で移動（約1時間）
11. **15:00** 奮起湖老街散策・駅弁（約60分）
12. **16:00** 嘉義市内へ帰路（約1.5時間）

## 実用情報

- **ベストシーズン**：3月は桜の季節、桜×赤い列車は阿里山の代名詞。10〜12月は雲海の出現率が最も高く、人出も少なめ
- **混雑回避**：平日がおすすめ。週末は前泊して早朝から回ると快適
- **服装**：山上は平地より10〜15℃涼しいです。夏でも薄手の上着を。日の出観賞時は5〜10℃、防寒着と帽子を必ずお持ちください。歩道は歩きやすいですが滑りにくい靴を推奨
- **高山病**：標高2,200m。軽い頭痛やめまいが出る方もいます。ゆっくり行動し水分補給を
- **所要時間**：嘉義市内から阿里山まで約2.5時間（台18号線）。カーブが多いので酔い止め推奨`;

// ---------------------------------------------------------------------------
// ko — 합니다/해요 체, Korean transliterations
// ---------------------------------------------------------------------------
const ko = `## 왜 이 코스인가요?

아리산(阿里山)은 대만을 대표하는 산악 명소입니다. 해발 2,200m의 원시림, 구름 속을 달리는 빨간 산악 열차, 주산(祝山)에서 맞이하는 일출——"대만에서 가장 아름다운 풍경"이 이곳에 모두 있습니다. 자이(嘉義) 시내에서 차량으로 약 2.5시간이면 도착하며, 가는 길에 열대에서 온대까지 식생이 변하는 풍경도 볼거리입니다.

## 하이라이트

### 🌲 아리산 신목군(神木群) — 2,000년 된 거목의 숲

${photoMd('forestPath', '아리산 숲길, 양쪽으로 우뚝 선 거목들')}

거목군 잔도(棧道)에 들어서면 수령 천 년 이상의 홍회(紅檜)와 편백 거목들이 눈앞에 펼쳐집니다. 줄기가 어찌나 굵은지 다섯여섯 명이 손을 잡아야 겨우 한 바퀴 감쌀 수 있을 정도예요. 청량한 편백 향이 숲 전체에 감돌아 심호흡 한 번이면 머리가 맑아집니다.

1호·2호 두 개 코스가 있으며, 전체 약 1.5~2시간 소요됩니다. 데크 보도가 잘 정비되어 있어 어르신이나 아이와 함께해도 무리 없어요. 2호 코스 끝의 "향림신목(香林神木)"은 수령 약 2,300년, 원구 내 최대 신목입니다.

${photoMd('ancientTrees', '천년 홍회 거목군')}

**꼭 먹어야 할 것:**
- **아리산 아이위(愛玉) 젤리** — 산에서 채취한 야생 아이위자로 직접 만든 것. 식감이 평지 것과 차원이 다릅니다
- **아리산 고산차** — 해발 1,000m 이상에서 재배한 우롱차. 달콤한 여운이 오래 남아요

**촬영 팁:** 아침 7:00~8:00에 사선으로 들어오는 햇살이 수관 사이로 빛기둥을 만듭니다. 삼각대를 챙겨 장노출 촬영을 추천합니다.

### 🚂 아리산 삼림철도(森林鐵路) — 백 년을 달리는 빨간 열차

${photoMd('railway', '아리산 삼림철도 빨간 열차')}

아리산 삼림철도는 세계에 세 곳밖에 남지 않은 산악 철도 중 하나입니다. 자이역(해발 30m)에서 아리산역(해발 2,274m)까지, 나선형 루프와 스위치백을 이용해 올라갑니다. 같은 산을 세 바퀴 돌아 정상에 도달하는 공법은 세계 철도 역사에서도 전설적이에요.

원구 내 "소평선(沼平線)"과 "신목선(神木線)"이 가장 인기 있으며, 각각 약 10분 승차합니다. 초록 숲을 빨간 객차가 지나는 장면은 아리산의 시그니처 풍경입니다.

${photoMd('railwayForest', '푸른 숲 속을 달리는 빨간 열차')}

**촬영 팁:** 소평역 옆 벚꽃 철도가 대표 촬영 포인트. 3월 벚꽃 시즌에는 분홍 꽃잎이 선로 위로 흩날려 환상적입니다.

### 🌅 주산 일출(祝山日出) — 운해 위의 첫 햇살

${photoMd('sunrise', '아리산 주산에서 바라본 일출')}

아리산 일출은 대만 여행의 하이라이트입니다. 새벽 어둠 속에서 주산선 열차에 올라(계절에 따라 출발 시각 변동, 대략 새벽 4:00~5:00), 주산 전망대에서 별이 가득한 하늘 아래 동쪽 지평선이 밝아오길 기다립니다. 태양이 위산(玉山) 산맥 능선 뒤로 솟아오르며 운해를 금빛으로 물들이는 순간은 정말 소름이 돋아요.

일출 시각은 여름 약 5:00~5:30, 겨울 약 6:30~7:00. 전날 방문자센터에서 확인하세요.

**촬영 팁:** 망원 렌즈(200mm 이상)로 위산 뒤에서 떠오르는 태양을 클로즈업할 수 있어요. 일출 20분 전 "매직아워"가 색감이 가장 풍부합니다. 산 위 새벽 기온은 5~10°C이니 방한복 필수!

### 🏞️ 자매담(姊妹潭) — 숲속의 비경 호수

${photoMd('sisterPonds', '아리산 자매담, 숲에 둘러싸인 고요한 수면')}

크고 작은 두 개의 천연 호수가 원시림 안에 자리 잡고 있습니다. 수면이 거울처럼 고요해 주변 거목들이 완벽하게 비칩니다. 같은 남자를 사랑한 원주민 자매가 각각 두 호수에 몸을 던졌다는 전설이 전해져요.

환담 보도는 평탄하고 한 바퀴 약 20분. 큰 자매담 한가운데 있는 나무 정자는 원구 내 가장 운치 있는 포토 스팟입니다.

**촬영 팁:** 이른 아침 바람 없을 때 반영이 가장 선명합니다. 안개 낀 날은 수면 위로 안개가 흘러다니는 모습이 몽환적이에요.

### ☁️ 운해(雲海) — 발아래 펼쳐진 하얀 바다

${photoMd('seaOfClouds', '아리산 운해, 산봉우리 사이를 가득 채운 구름')}

아리산 운해는 "대만 8경" 중 하나입니다. 조건이 맞으면 자이난 평야 전체가 하얀 구름에 뒤덮여 멀리 산봉우리만 솟아 보이는데, 정말 구름 위에 서 있는 기분이에요. 가을·겨울(10월~3월)이 출현 확률 최고이며, 특히 오후 14:00~16:00에 가장 장관입니다.

오가사와라산 전망대와 자운사 전망대가 최고의 뷰 포인트로 360도 파노라마를 즐길 수 있어요. 운이 좋으면 "운폭(雲瀑)"——구름이 폭포처럼 산골짜기로 쏟아지는 현상——도 볼 수 있는데, 일출보다 더 귀한 장면입니다.

**촬영 팁:** 광각 렌즈로 장대한 스케일을 담으세요. 타임랩스 촬영을 강력 추천합니다.

### 🍱 펀치후(奮起湖) — 산골 마을과 전설의 도시락

${photoMd('teaFields', '아리산 차밭, 해발 천 미터의 푸른 차 농원')}

펀치후는 해발 1,400m, 삼림철도의 중간 정차역입니다. 삼면이 산으로 둘러싸인 지형이 키(畚箕)를 닮았고(민남어 발음이 "펀치"), 늘 운무가 자욱해 호수처럼 보여 "펀치후(奮起湖)"라는 이름이 붙었어요. 명물은 철도 도시락——옛날 열차가 이곳에서 급수하는 동안 승객들이 내려서 도시락을 사 먹던 문화가 지금까지 이어지고 있습니다.

옛 거리는 짧아서 한 바퀴 약 20분이면 되지만, 가게마다 특색이 있어요. 도시락 외에 와사비 요리도 꼭 드셔보세요. 아리산의 기후는 와사비 재배에 최적이라, 갓 갈아낸 생와사비를 회에 곁들이면 시판 튜브 와사비와는 차원이 다릅니다.

**꼭 먹어야 할 것:**
- **펀치후 도시락** — 돈가스덮밥이 대표 메뉴. 나무 상자에 담겨 나와 레트로 감성 만점
- **와사비 요리** — 와사비 두부, 와사비 아이스크림 등 의외의 맛있음

## 추천 일정

### 이른 아침 — 일출 보기
1. **04:30** 주산선 열차로 전망대 이동 (전날 표 구매)
2. **05:00-06:00** 일출 감상 (계절에 따라 시각 변동)
3. **06:30** 숙소로 돌아와 아침 식사

### 오전 — 숲 산책
4. **08:00** 거목군 잔도 1호 (약 60분)
5. **09:15** 자매담 환담 보도 (약 30분)
6. **10:00** 소평공원·소평역 촬영 (약 30분)
7. **10:40** 신목선 열차로 신목역 이동 (약 10분)

### 오후 — 운해와 옛 거리
8. **11:30** 점심 식사
9. **12:30** 오가사와라산 전망대에서 운해 감상 (약 60분)
10. **14:00** 펀치후로 차량 이동 (약 1시간)
11. **15:00** 펀치후 옛 거리 탐방·도시락 (약 60분)
12. **16:00** 자이 시내로 귀환 (약 1.5시간)

## 실용 정보

- **베스트 시즌**: 3월 벚꽃 시즌이 최고 인기 — 벚꽃과 빨간 열차의 조합은 아리산의 상징. 10~12월은 운해 출현 확률이 가장 높고 인파도 적습니다
- **인파 피하기**: 평일이 훨씬 한가합니다. 주말에는 전날 밤 산에서 숙박하고 이른 아침에 움직이세요
- **복장 추천**: 산 위는 평지보다 10~15°C 서늘합니다. 여름에도 얇은 겉옷을 챙기세요. 일출 감상 시 새벽 기온 5~10°C이므로 방한복과 모자 필수. 보도는 걷기 좋지만 미끄럼 방지 운동화를 추천합니다
- **고산 반응**: 해발 2,200m라 가벼운 두통이나 어지러움이 올 수 있어요. 천천히 움직이고 물을 많이 드세요
- **이동 시간**: 자이 시내에서 아리산까지 약 2.5시간 (타이18선 아리산 공로). 커브가 많아 멀미약을 챙기는 게 좋습니다`;

const content = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en': en,
  'ja': ja,
  'ko': ko,
};

async function main() {
  console.log('Updating alishan-forest guide with 5 languages...');
  console.log(`Content lengths: zh-TW=${zhTW.length}, zh-CN=${zhCN.length}, en=${en.length}, ja=${ja.length}, ko=${ko.length}`);

  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.alishan-forest`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        content,
        cover_image: PHOTOS.sunrise.url,
      }),
    }
  );
  const data = await res.text();
  console.log(`Status: ${res.status} ${res.ok ? '✅' : '❌'}`);
  if (!res.ok) console.log(data);
  else console.log('✅ 阿里山森林一日遊 updated with all 5 languages (zh-TW, zh-CN, en, ja, ko) and photos!');
}

main();
