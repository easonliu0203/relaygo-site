// Update 太魯閣峽谷一日遊 guide with all 5 languages: zh-TW, zh-CN, en, ja, ko
const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Photo URLs with Unsplash attribution
// Each photo verified: location tag checked, HTTP 200 confirmed
const PHOTOS = {
  tarokoGorge: {
    url: 'https://images.unsplash.com/photo-1542479860-a2548d4da9b0?w=1200&q=80',
    credit: 'David Brooke Martin (@dbmartin00)',
    creditUrl: 'https://unsplash.com/@dbmartin00?utm_source=relaygo&utm_medium=referral',
  },
  qingshuiCliff: {
    url: 'https://images.unsplash.com/photo-1583736209710-ce157f48e350?w=1200&q=80',
    credit: 'Eric BARBEAU (@ericbarbeau)',
    creditUrl: 'https://unsplash.com/@ericbarbeau?utm_source=relaygo&utm_medium=referral',
  },
  shakadang: {
    url: 'https://images.unsplash.com/photo-1635245707349-8a5612a447c5?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
  qixingtan: {
    url: 'https://images.unsplash.com/photo-1607830816242-e485db8aa398?w=1200&q=80',
    credit: 'Moralis Tsai (@moralis)',
    creditUrl: 'https://unsplash.com/@moralis?utm_source=relaygo&utm_medium=referral',
  },
  changchun: {
    url: 'https://images.unsplash.com/photo-1635245775863-1a59681f4e64?w=1200&q=80',
    credit: 'Timo Volz (@magict1911)',
    creditUrl: 'https://unsplash.com/@magict1911?utm_source=relaygo&utm_medium=referral',
  },
  tarokoBridge: {
    url: 'https://images.unsplash.com/photo-1591960885011-64727e3d11df?w=1200&q=80',
    credit: 'Maren Wilczek (@averagepony)',
    creditUrl: 'https://unsplash.com/@averagepony?utm_source=relaygo&utm_medium=referral',
  },
};

function photoMd(key, alt) {
  const p = PHOTOS[key];
  return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
}

const content = {
  'zh-TW': `## 為什麼選這條路線？

太魯閣是台灣最壯觀的自然景觀，沒有之一。大理石峽谷被立霧溪切割出的鬼斧神工，配上清水斷崖的太平洋絕景、七星潭的月牙灣弧線，這條路線濃縮了花蓮最精華的一面。不管你是第一次來花蓮還是第三次，太魯閣永遠看不膩。

## 行程亮點

### 🏔️ 太魯閣峽谷・燕子口 — 走進大理石切割的鬼斧神工

${photoMd('tarokoGorge', '太魯閣峽谷的壯觀大理石峭壁與瀑布')}

從花蓮市區開車約30分鐘就能抵達太魯閣牌樓入口，一路沿著中橫公路深入峽谷，兩側的大理石峭壁越來越高、越來越近，像是走進一本活生生的地質教科書。燕子口步道是整條峽谷最精華的路段，峭壁上密密麻麻的壺穴，是溪水花了幾百萬年慢慢鑽出來的，春夏季節還能看到燕子在洞裡築巢飛進飛出。

走在燕子口步道上，頭頂是幾乎要合攏的峽谷，腳下是碧綠的立霧溪水，那種被大自然包圍的壓迫感和震撼感，照片完全拍不出來。步道全長約1.4公里，來回大概40分鐘，沿途有幾個觀景平台可以停下來慢慢拍。

${photoMd('tarokoBridge', '太魯閣峽谷中的吊橋與翠綠山谷')}

**拍照秘訣：** 上午9-10點太陽照進峽谷時光線最好，溪水會呈現最漂亮的碧綠色。燕子口步道中段有一處峽谷最窄的地方，用廣角鏡頭仰拍可以拍出震撼的「一線天」效果。記得帶安全帽（入口有借），落石區域禁止停留。

### 🌊 清水斷崖 — 太平洋上最驚心動魄的海岸線

${photoMd('qingshuiCliff', '清水斷崖 — 山壁直落太平洋的絕美海岸線')}

從太魯閣往北開約40分鐘，就會來到蘇花公路上最壯觀的路段——清水斷崖。這裡的山壁幾乎是垂直落入太平洋，斷崖高度超過800公尺，是全台灣最震撼的海岸線景觀。

站在觀景台上往下看，海水因為深度不同呈現出好幾層顏色：靠近岸邊是淺淺的土耳其藍，往外漸漸變成寶石藍、深邃的靛藍。天氣好的時候那個漸層美到不真實，像是上帝打翻了調色盤。很多人說這裡是台灣最美的海岸線，來過的人很少會反駁。

**拍照秘訣：** 崇德觀景台是最佳拍攝點，上午順光時海水顏色最漂亮。如果想要更壯觀的角度，可以請司機開到匯德休息站，從高處俯瞰整條斷崖的弧線。晴天必訪，陰天霧氣重會看不到海水的顏色層次。

### 🏞️ 砂卡礑步道 — 碧綠溪水與大理石河床

${photoMd('shakadang', '砂卡礑步道旁碧綠的溪水與峽谷')}

砂卡礑步道就在太魯閣遊客中心旁邊，走過一座紅色拱橋就到了入口。這條步道沿著砂卡礑溪開鑿在峽谷壁上，腳下的溪水清澈到可以看見河底的大理石紋路，那個碧綠色不是P圖，是大理石河床折射出來的天然顏色。

步道前段（約1.5公里到五間屋）路況平坦好走，沿途可以看到原住民太魯閣族的傳統圖騰。溪谷裡巨大的白色大理石散落在碧綠溪水中，隨便一個角度都超好拍。夏天的午後經常會有原住民小朋友在溪裡玩水，那個畫面非常療癒。

**拍照秘訣：** 步道入口的紅色砂卡礑橋是俯拍溪水的最佳角度，中午前後陽光直射溪面時顏色最翠綠。步道中段有幾處可以下到溪邊的地方，近距離拍大理石河床的紋路非常震撼。

### 🏛️ 長春祠 — 瀑布懸崖上的永恆紀念

${photoMd('changchun', '長春祠 — 飛瀑旁建在懸崖上的中式祠堂')}

長春祠是太魯閣最具代表性的人文景觀，一座精緻的中式祠堂就建在半山腰的懸崖邊，旁邊一道瀑布終年不斷地奔流而下。這座祠堂是為了紀念開鑿中橫公路時殉難的工人而建，整條中橫公路從台中到花蓮貫穿中央山脈，當年靠人力一鑿一鑿打出來，犧牲了超過200條人命。

站在對面的觀景台遠望，祠堂、瀑布、峽谷三者融為一體的畫面，是太魯閣最經典的明信片角度。如果體力夠，可以走過吊橋上去祠堂，沿途的步道雖然陡但風景極好。

**拍照秘訣：** 觀景台在公路旁，停車後步行3分鐘即到。下午2-3點的光線最均勻，瀑布和祠堂都不會背光。雨後水量大的時候瀑布最壯觀，但步道可能會關閉，遠觀即可。

### 🏖️ 七星潭 — 月牙灣上的太平洋日出

${photoMd('qixingtan', '七星潭 — 花蓮最美的礫石海灘與太平洋海浪')}

七星潭不是潭，是一片漂亮的月牙形礫石海灘。踩在圓滾滾的鵝卵石上，聽著海浪拍打石頭發出的清脆聲響，看著太平洋無邊無際地展開——這是很多花蓮人下班後最喜歡來放空的地方。

七星潭的特別之處在於它背靠中央山脈，天氣好的時候可以同時看到山和海。海灘上的石頭被海水沖刷得圓潤光滑，很多人會在這裡堆石頭、撿漂亮的石頭。黃昏時分的七星潭特別美，夕陽把整片海面染成金色，配上遠方的山脈剪影，是花蓮最療癒的畫面。

**必吃美食：**
- **公正包子** — 花蓮最有名的小籠包，皮薄餡多汁，從早上5點就開始排隊
- **液香扁食** — 開了超過60年的老店，扁食（餛飩）湯鮮肉嫩，花蓮人的早餐首選
- **戴記扁食** — 跟液香各有擁護者，皮更薄更滑嫩
- **炸彈蔥油餅** — 花蓮市區必吃的路邊攤，半熟蛋在餅裡面爆開超過癮
- **廟口紅茶** — 古早味紅茶配上特殊的鋼管杯，是花蓮的獨特風景

**拍照秘訣：** 日出時分是七星潭最夢幻的時刻，清晨5-6點太陽從太平洋升起。如果不想早起，傍晚5-6點的光線也很好拍，可以用慢速快門拍出海浪在礫石間流動的絲綢感。海灘最北端人比較少，可以拍到乾淨的空景。

## 建議行程

### 上午 — 峽谷探險
1. **08:00** 花蓮市區出發（車程約30分鐘到太魯閣）
2. **08:30** 太魯閣遊客中心，拿地圖、了解步道開放狀況（~20分鐘）
3. **09:00** 砂卡礑步道，走到五間屋折返（~1.5小時）
4. **10:30** 長春祠觀景台（~30分鐘）
5. **11:00** 燕子口步道（~1小時）

### 下午 — 海岸線絕景
1. **12:00** 回到太魯閣閣口附近午餐
2. **13:00** 開車前往清水斷崖（車程約40分鐘）
3. **13:40** 清水斷崖觀景台（~40分鐘）
4. **14:30** 返回花蓮方向，前往七星潭（車程約40分鐘）
5. **15:30** 七星潭海灘漫步（~1.5小時）

### 傍晚 — 花蓮市區美食巡禮
1. **17:00** 回到花蓮市區
2. **17:30** 公正包子、液香扁食、炸彈蔥油餅，一次吃個夠
3. **18:30** 東大門夜市散步（如果還吃得下）

## 實用資訊
- **最佳季節：** 10月到隔年4月是最佳造訪季節，天氣穩定、雨量少。夏天（6-9月）容易遇到颱風，步道經常因落石封閉。
- **避開人潮：** 平日比假日人少非常多。如果只能假日去，建議8點前就進太魯閣，趁遊覽車大軍還沒到。
- **穿著建議：** 運動鞋或登山鞋必備，步道有些路段濕滑。夏天帶防曬和足夠的水，峽谷裡比想像中熱。
- **天氣注意：** 太魯閣地形特殊，天氣變化快。出發前查看太管處官網的步道開放狀況，下雨天燕子口和砂卡礑步道可能封閉。
- **安全帽：** 燕子口步道入口有免費借用安全帽，一定要戴，落石是真的會發生的。`,

  'zh-CN': `## 为什么选这条路线？

太鲁阁是台湾最壮观的自然景观，大理石峡谷被溪水切割了几百万年，加上清水断崖的太平洋绝景和七星潭的鹅卵石海滩，这条路线浓缩了花莲最精华的景色。不管你是第一次来台湾还是已经来过好几次，太鲁阁都值得专门打卡。

## 行程亮点

### 🏔️ 太鲁阁峡谷・燕子口 — 大理石切出来的地质奇观

${photoMd('tarokoGorge', '太鲁阁峡谷的壮观大理石峭壁与瀑布')}

从花莲市区开车大约30分钟就到太鲁阁入口，沿着中横公路一路深入峡谷，两侧的大理石峭壁越来越高，像走进了一个天然的地质博物馆。燕子口步道是整条峡谷最出片的路段，峭壁上全是溪水用几百万年钻出来的壶穴，春夏还能看到燕子在洞里筑巢。

走在步道上，头顶是快要合拢的峡谷，脚下是碧绿的立雾溪，那种被大自然包裹的感觉，手机根本拍不出十分之一。步道全长1.4公里，来回差不多40分钟，沿途有好几个观景平台可以慢慢拍。

${photoMd('tarokoBridge', '太鲁阁峡谷中的吊桥与翠绿山谷')}

**拍照tips：** 上午9-10点阳光照进峡谷的时候光线最好，溪水颜色最翠绿。步道中段有一处峡谷最窄的地方，广角仰拍可以出"一线天"的大片。落石区域不要停留，入口记得借安全帽。

### 🌊 清水断崖 — 太平洋边上最震撼的海岸线

${photoMd('qingshuiCliff', '清水断崖 — 山壁直落太平洋的绝美海岸线')}

从太鲁阁往北开大约40分钟，就到了苏花公路上最壮观的清水断崖。这里的山壁几乎垂直插入太平洋，断崖高度超过800米，是台湾颜值最高的海岸线。

站在观景台往下看，海水因为深度不同呈现出好几种蓝：浅处是土耳其蓝，越往深处变成宝石蓝、靛蓝，晴天的时候那个渐变色太出片了，像是上帝打翻了调色盘。很多旅行博主都说这是台湾必打卡的地方，实际来了你会发现比照片还要震撼。

**拍照tips：** 崇德观景台是最佳机位，上午顺光海水颜色最好看。汇德休息站可以从高处俯瞰断崖全貌，想拍大场面必去。晴天来效果最好，阴天雾大基本看不到渐变色。

### 🏞️ 砂卡礑步道 — 碧绿溪水与大理石河床

${photoMd('shakadang', '砂卡礑步道旁碧绿的溪水与峡谷')}

砂卡礑步道就在太鲁阁游客中心旁边，过一座红色拱桥就到入口。步道沿着砂卡礑溪开在峡谷壁上，脚下的溪水清澈到能看见河底的大理石纹路，那个碧绿色不是调色，是大理石河床折射出来的天然色。

前段1.5公里到五间屋很好走，一路都是巨大的白色大理石散落在碧绿溪水里，随手一拍都是大片。夏天午后经常有当地小朋友在溪里玩水，特别有生活气息。

**拍照tips：** 入口的红色砂卡礑桥俯拍溪水最好看，中午前后阳光直射时颜色最翠绿。步道中段可以下到溪边，近距离拍大理石河床的纹理很出片。

### 🏛️ 长春祠 — 悬崖瀑布旁的纪念祠堂

${photoMd('changchun', '长春祠 — 飞瀑旁建在悬崖上的中式祠堂')}

长春祠是太鲁阁最有人文感的景点，一座精致的中式祠堂建在半山腰悬崖边上，旁边一道瀑布常年不断。这里是为了纪念修中横公路牺牲的200多名工人——整条中横从台中到花莲，当年靠人力一凿一凿打通中央山脈，这个数字想想就让人敬佩。

对面观景台远望过去，祠堂、瀑布、峡谷融为一体，是太鲁阁最经典的打卡角度。体力好的话可以走过吊桥上去祠堂，步道虽然陡但风景绝了。

**拍照tips：** 下午2-3点光线最均匀，瀑布和祠堂都不会逆光。雨后水量大瀑布更壮观，但步道可能关闭，远观就好。

### 🏖️ 七星潭 — 鹅卵石海滩上看太平洋

${photoMd('qixingtan', '七星潭 — 花莲最美的砾石海滩与太平洋海浪')}

七星潭其实不是潭，是一片漂亮的月牙形鹅卵石海滩。踩在圆滚滚的石头上，听海浪打石头的声音，看太平洋一望无际地展开，很多花莲本地人下班后就来这里发呆放空。

这里的特别之处是背靠中央山脉，晴天可以同时看到雪山和大海。海滩上的石头被冲得圆润光滑，很多人在这堆石头玩。傍晚的七星潭特别出片，夕阳把海面染成金色，配上远处山脉的剪影，是花莲最治愈的画面。

**必吃美食：**
- **公正包子** — 花莲排队王，皮薄汁多，早上5点就有人排
- **液香扁食** — 60多年的老店，馄饨汤鲜肉嫩，本地人的早餐标配
- **戴记扁食** — 跟液香两家粉丝互不相让，皮更薄更滑
- **炸弹葱油饼** — 花莲必吃路边摊，半熟蛋在饼里爆开，性价比超高
- **庙口红茶** — 古早味红茶配上特有的钢管杯，是花莲的城市符号

**拍照tips：** 日出时七星潭最梦幻，清晨5-6点太阳从海面升起。不想早起的话傍晚5-6点光线也不错，慢门可以拍出海浪在石头间流动的丝滑感。海滩最北端人少，适合拍空镜。

## 建议行程

### 上午 — 峡谷探险
1. **08:00** 花莲市区出发（车程约30分钟到太鲁阁）
2. **08:30** 太鲁阁游客中心拿地图、看步道开放情况（~20分钟）
3. **09:00** 砂卡礑步道，走到五间屋折返（~1.5小时）
4. **10:30** 长春祠观景台（~30分钟）
5. **11:00** 燕子口步道（~1小时）

### 下午 — 海岸线打卡
1. **12:00** 太鲁阁阁口附近吃午饭
2. **13:00** 开车去清水断崖（车程约40分钟）
3. **13:40** 清水断崖观景台（~40分钟）
4. **14:30** 返回花莲方向去七星潭（车程约40分钟）
5. **15:30** 七星潭海滩漫步（~1.5小时）

### 傍晚 — 花莲美食打卡
1. **17:00** 回到花莲市区
2. **17:30** 公正包子、液香扁食、炸弹葱油饼一条龙
3. **18:30** 东大门夜市逛逛（如果还吃得下的话）

## 实用信息
- **最佳季节：** 10月到次年4月天气稳定、雨少。夏天（6-9月）台风多，步道经常因落石封闭。
- **避开人潮：** 工作日比周末人少很多。周末建议8点前进太鲁阁，赶在旅游大巴之前。
- **穿着建议：** 运动鞋或徒步鞋必备，有些路段湿滑。夏天带防晒和够喝的水，峡谷里比想象中热。
- **天气提醒：** 太鲁阁地形复杂天气变化快，出发前在太管处官网查步道开放状态。雨天燕子口和砂卡礑可能封闭。
- **安全帽：** 燕子口入口免费借，必须戴，落石真的会发生。`,

  en: `## Why This Route?

Taroko Gorge is Taiwan's most dramatic natural wonder — a marble canyon carved over millions of years by the Liwu River. Pair it with Qingshui Cliff's jaw-dropping Pacific coastline and the crescent pebble beach at Qixingtan, and you've got the greatest hits of Hualien in a single day. Whether it's your first time in Taiwan or your fifth, Taroko never disappoints.

## Highlights

### 🏔️ Taroko Gorge & Swallow Grotto 燕子口 — Walking Through a Living Marble Cathedral

${photoMd('tarokoGorge', 'Dramatic marble cliffs and waterfall in Taroko Gorge')}

It's only about 30 minutes from downtown Hualien to the Taroko Gorge entrance gate, but it feels like crossing into another world. The Central Cross-Island Highway threads deeper and deeper into the canyon, the marble walls rising higher on both sides until they nearly close overhead. Swallow Grotto (Yanzikou) is the highlight — a 1.4-kilometer trail carved into the cliff face where you walk with sheer marble walls above and the emerald Liwu River far below.

The potholes dotting the cliff walls took millions of years for the river to drill out, and in spring and summer you'll see swallows darting in and out of them, exactly as the name suggests. The scale of it all is hard to convey in photos — standing on the trail with the gorge narrowing to barely a sliver of sky overhead is one of those moments you just have to experience in person.

${photoMd('tarokoBridge', 'Suspension bridge spanning a lush green valley in Taroko')}

**Photo Tips:** The best light hits the canyon between 9-10 AM, when the river glows its deepest emerald green. At the narrowest point mid-trail, shoot straight up with a wide-angle lens for a stunning "sky crack" composition. Pick up a free hard hat at the trailhead — rockfall is real here.

### 🌊 Qingshui Cliff 清水斷崖 — The Most Heart-Stopping Coastline in the Pacific

${photoMd('qingshuiCliff', 'Qingshui Cliff — sheer mountains plunging into the turquoise Pacific')}

About 40 minutes north of Taroko, the Suhua Highway hugs what might be the most dramatic coastline in all of Asia. Qingshui Cliff rises over 800 meters almost vertically from the Pacific, and the view from the lookout is the kind that makes you involuntarily whisper "wow."

The ocean below shifts through impossible layers of color — pale turquoise near shore, deepening to sapphire, then ink-dark indigo further out. On a clear day the gradient looks almost fake, like someone cranked up the saturation in post. But it's real, and it's even more stunning in person than any photo can capture.

**Photo Tips:** Chongde Lookout is the classic viewpoint — best in morning light when the water colors pop. For a higher perspective, ask your driver to stop at Huide Rest Area, which offers a sweeping view of the entire cliff arc. Skip overcast days if you can — the layered ocean colors disappear in fog.

### 🏞️ Shakadang Trail 砂卡礑步道 — Turquoise Water Over White Marble

${photoMd('shakadang', 'Crystal-clear turquoise water flowing through Shakadang gorge')}

Right next to the Taroko Visitor Center, a red arch bridge leads to the start of Shakadang Trail. This path is carved into the canyon wall above Shakadang Creek, and the water below is so clear you can trace every marble vein on the riverbed. That surreal blue-green color isn't a filter — it's natural refraction from the white marble.

The first 1.5 kilometers to Wujianwu (Five Cabins) is flat and easy, winding past enormous white marble boulders scattered in turquoise pools. You'll spot Truku indigenous carvings along the way. On summer afternoons, local kids splash around in the shallows — a scene that somehow makes the whole place feel even more magical.

**Photo Tips:** The red Shakadang Bridge at the trailhead is the best angle for shooting straight down at the turquoise water. Colors are most vivid around noon when sunlight hits the creek directly. Midway along the trail, you can scramble down to water level for intimate shots of the marble textures.

### 🏛️ Changchun Shrine 長春祠 — Eternal Spring Above the Gorge

${photoMd('changchun', 'Changchun Shrine — a traditional temple built into the cliff beside a waterfall')}

Changchun Shrine (Eternal Spring Shrine) is Taroko's most iconic man-made landmark — a delicate Chinese temple perched on a cliff ledge with a waterfall cascading beside it year-round. It was built to honor the more than 200 workers who lost their lives constructing the Central Cross-Island Highway, a road that was literally hammered through the Central Mountain Range by hand in the 1950s.

From the viewpoint across the road, the shrine, waterfall, and gorge form one of Taroko's most photographed compositions — it's the image you'll see on every postcard. If you've got the energy, cross the suspension bridge and climb up to the shrine itself for a closer look and surprisingly beautiful canyon views.

**Photo Tips:** The roadside viewpoint is a 3-minute walk from the parking area. Afternoon around 2-3 PM gives the most even lighting on both the shrine and waterfall. The waterfall is most impressive after rain, though the trail up may be closed — the view from across the gorge is still excellent.

### 🏖️ Qixingtan Beach 七星潭 — Pacific Sunrise on a Crescent of Stones

${photoMd('qixingtan', 'Qixingtan Beach — waves rolling onto a pebble beach with Pacific Ocean views')}

Despite its name ("Seven Star Pond"), Qixingtan is actually a sweeping crescent beach — but instead of sand, it's made of smooth, rounded pebbles polished by centuries of Pacific waves. Walking on the stones with their satisfying crunch underfoot, watching the endless blue Pacific stretch to the horizon, you'll understand why Hualien locals come here after work just to breathe.

What makes Qixingtan special is its backdrop — the Central Mountain Range rises dramatically behind the beach, so on clear days you get mountains and ocean in a single frame. At sunset the entire scene turns gold, with the mountain silhouettes creating a layered composition that's almost unfairly photogenic.

**Must-Eat (Back in Hualien City):**
- **Gongzheng Baozi 公正包子** — Hualien's most famous steamed buns, with a line forming from 5 AM. Thin-skinned, bursting with juice
- **Ye Xiang Wontons 液香扁食** — Over 60 years old, serving delicate pork wontons in clear broth — a Hualien breakfast institution
- **Dai Ji Wontons 戴記扁食** — The eternal rival to Ye Xiang, with even thinner, silkier wrappers
- **Bomb Scallion Pancake 炸彈蔥油餅** — A street-side legend: a flaky scallion pancake with a runny egg that "explodes" when you bite in
- **Temple Mouth Black Tea 廟口紅茶** — Old-school black tea served through vintage steel pipes — a uniquely Hualien experience

**Photo Tips:** Sunrise (5-6 AM) is Qixingtan at its most magical, with the sun rising straight out of the Pacific. If mornings aren't your thing, the golden hour around 5-6 PM is equally gorgeous. Use a slow shutter to capture the silky flow of waves retreating through the pebbles. The far northern end of the beach is less crowded for cleaner compositions.

## Suggested Itinerary

### Morning — Into the Gorge
1. **08:00** Depart Hualien city (~30 min drive to Taroko)
2. **08:30** Taroko Visitor Center — grab a map, check trail status (~20 min)
3. **09:00** Shakadang Trail to Wujianwu and back (~1.5 hrs)
4. **10:30** Changchun Shrine viewpoint (~30 min)
5. **11:00** Swallow Grotto Trail (~1 hr)

### Afternoon — Coastal Grandeur
1. **12:00** Lunch near Taroko entrance
2. **13:00** Drive to Qingshui Cliff (~40 min)
3. **13:40** Qingshui Cliff lookouts (~40 min)
4. **14:30** Drive toward Hualien, head to Qixingtan (~40 min)
5. **15:30** Qixingtan Beach stroll (~1.5 hrs)

### Evening — Hualien Food Crawl
1. **17:00** Return to Hualien city
2. **17:30** Hit Gongzheng Baozi, Ye Xiang Wontons, and the Bomb Scallion Pancake stand
3. **18:30** Dongdamen Night Market for more (if you still have room)

## Practical Tips
- **Best Season:** October through April — stable weather, less rain. Summer (June–September) brings typhoons that frequently close trails due to rockfall.
- **Avoid Crowds:** Weekdays are dramatically quieter. If visiting on a weekend, enter Taroko before 8 AM to beat the tour bus convoys.
- **Wear:** Sturdy shoes are essential — some trail sections are wet and slippery. In summer, bring sunscreen and plenty of water; the gorge is hotter than you'd expect.
- **Weather Warning:** Taroko's terrain creates unpredictable weather. Check the Taroko National Park website for real-time trail closures before heading out. Swallow Grotto and Shakadang close in rain.
- **Hard Hats:** Free to borrow at the Swallow Grotto trailhead. Wear one — rockfall is a genuine hazard, not just a sign.`,

  ja: `## なぜこのルート？

太魯閣（タロコ）は台湾で最も壮大な自然景観です。大理石の峡谷、太平洋に切り落ちる清水断崖、月牙形の七星潭ビーチ——花蓮の魅力を1日で凝縮した贅沢なルートです。

## 見どころ

### 🏔️ 太魯閣峡谷・燕子口 — 大理石が織りなす圧巻の渓谷

${photoMd('tarokoGorge', '太魯閣峡谷の壮大な大理石の断崖と滝')}

花蓮市内から車で約30分、太魯閣の入口に到着します。中部横貫公路を峡谷の奥へ進むと、両側の大理石の断崖がどんどん高くなり、まるで地質の教科書の中に入り込んだような感覚です。

燕子口（イエンズコウ）歩道は峡谷のハイライト。全長約1.4km、往復40分ほどのコースで、頭上はほぼ閉じかけた峡谷、足元はエメラルドグリーンの立霧渓。断崖に無数に開いた壺穴は、渓流が何百万年もかけて削り出したものです。春夏にはツバメが巣を作る姿も見られます。

${photoMd('tarokoBridge', '太魯閣峡谷に架かる吊り橋と緑の渓谷')}

**撮影のコツ：** 午前9〜10時、太陽が峡谷に差し込む時間帯が最も美しい光。歩道中間の最狭部で広角レンズを使って真上を撮ると、「一線天」の迫力ある構図に。入口でヘルメットを無料貸出しているので必ず着用を。

### 🌊 清水断崖 — 太平洋に落ちる800mの絶壁

${photoMd('qingshuiCliff', '清水断崖 — 山が太平洋に直接落ち込む絶景')}

太魯閣から北へ約40分、蘇花公路沿いに清水断崖があります。高さ800m以上の断崖が太平洋にほぼ垂直に落ち込む光景は、台湾随一の海岸絶景です。

展望台から見下ろすと、海の色が深度によって何層にも変化します。岸辺のターコイズブルーから、サファイアブルー、深いインディゴブルーへ。晴天のグラデーションは写真では伝えきれない美しさです。

**撮影のコツ：** 崇徳展望台が定番スポット。午前中の順光で海の色が最も映えます。匯徳休憩所からは断崖全体を俯瞰できるので、壮大な構図を狙うならこちらへ。曇りの日は色のグラデーションが見えにくいので、晴天を狙って。

### 🏞️ 砂卡礑歩道 — エメラルドの渓流と大理石の河床

${photoMd('shakadang', '砂卡礑歩道沿いの透き通ったエメラルドグリーンの渓流')}

太魯閣ビジターセンターのすぐ隣、赤いアーチ橋を渡ると砂卡礑（シャカダン）歩道の入口です。峡谷壁に沿って造られた歩道から見下ろす砂卡礑渓は、大理石の河床が光を反射して不思議なエメラルドグリーンに輝いています。

五間屋までの前半1.5kmは平坦で歩きやすく、巨大な白い大理石が碧い渓流の中に点在する風景が続きます。太魯閣族（タロコ族）の伝統的な紋様も沿道で見られます。

**撮影のコツ：** 入口の赤い砂卡礑橋から渓流を俯瞰するのがおすすめアングル。正午前後、陽光が直射する時に水の色が最も鮮やか。歩道中間から川辺に降りられる場所があり、大理石の紋様を間近に撮影できます。

### 🏛️ 長春祠 — 断崖の瀧のほとりに建つ祈りの祠

${photoMd('changchun', '長春祠 — 滝の横の断崖に建つ中国式の祠堂')}

長春祠（チャンチュンツー）は太魯閣を代表する人文景観です。半山腹の断崖に建つ優美な中国式祠堂のそばを、一年中途切れることのない滝が流れ落ちています。中部横貫公路の建設で犠牲になった200人以上の作業員を祀るために建てられました。

道路向かいの展望台からは、祠堂・滝・峡谷が一体となった太魯閣の象徴的な風景を望めます。

**撮影のコツ：** 午後2〜3時が最も均一な光。雨後は瀑布の水量が増して迫力が出ますが、歩道は閉鎖される場合も。展望台からの遠景でも十分絵になります。

### 🏖️ 七星潭 — 太平洋の朝日を浴びる三日月形ビーチ

${photoMd('qixingtan', '七星潭 — 丸い玉石の浜辺に打ち寄せる太平洋の波')}

七星潭（チーシンタン）は名前に反して池ではなく、美しい三日月形の玉石ビーチです。丸く磨かれた小石を踏みしめながら、太平洋の水平線を眺める——花蓮の地元の方が仕事帰りにふらっと立ち寄る憩いの場所です。

背後に中央山脈がそびえ、晴れた日には山と海を同時に楽しめます。夕暮れ時は海面が金色に染まり、山々のシルエットと相まって花蓮で最も癒やされる風景になります。

**おすすめグルメ（花蓮市内）：**
- **公正包子** — 花蓮一の行列店。朝5時から並ぶ人も。皮が薄くて肉汁たっぷりの小籠包
- **液香扁食** — 創業60年以上。透き通ったスープに包まれたワンタンは花蓮の朝食の定番
- **戴記扁食** — 液香のライバル店。さらに薄い皮が特徴
- **炸弾葱油餅** — 屋台の名物。半熟卵がパリパリの葱餅の中で弾ける食感がクセになる
- **廟口紅茶** — 昔ながらの紅茶をステンレスパイプで注ぐ花蓮独特のスタイル

**撮影のコツ：** 日の出（5〜6時）が最も幻想的。夕方5〜6時のゴールデンアワーも美しい。スローシャッターで波が玉石の間を流れる絹のような表現が撮れます。ビーチ北端は人が少なく、すっきりとした構図が狙えます。

## おすすめ行程

### 午前 — 峡谷探検
1. **08:00** 花蓮市内出発（太魯閣まで車で約30分）
2. **08:30** 太魯閣ビジターセンターで地図入手・歩道開放状況確認（〜20分）
3. **09:00** 砂卡礑歩道、五間屋まで往復（〜1.5時間）
4. **10:30** 長春祠展望台（〜30分）
5. **11:00** 燕子口歩道（〜1時間）

### 午後 — 海岸線の絶景
1. **12:00** 太魯閣入口付近で昼食
2. **13:00** 清水断崖へ出発（車で約40分）
3. **13:40** 清水断崖展望台（〜40分）
4. **14:30** 花蓮方面へ戻り七星潭へ（車で約40分）
5. **15:30** 七星潭ビーチ散策（〜1.5時間）

### 夕方 — 花蓮グルメ巡り
1. **17:00** 花蓮市内に戻る
2. **17:30** 公正包子→液香扁食→炸弾葱油餅のハシゴ
3. **18:30** 東大門夜市で締め（お腹に余裕があれば）

## 実用情報
- **ベストシーズン：** 10月〜翌4月が天候安定。夏（6〜9月）は台風で歩道閉鎖が頻繁。
- **混雑回避：** 平日が圧倒的におすすめ。週末は8時前に入場すれば団体バスの前に回れます。
- **服装：** 運動靴またはトレッキングシューズ必須。夏は日焼け止めと十分な飲料水を。峡谷内は想像以上に暑いです。
- **天候注意：** 太魯閣は地形の関係で天候が急変します。出発前に太魯閣国立公園のサイトで歩道状況を確認。雨天は燕子口・砂卡礑が閉鎖の可能性あり。
- **ヘルメット：** 燕子口入口で無料貸出。必ず着用してください。落石は本当に起きます。`,

  ko: `## 왜 이 루트인가요?

타이루거 太魯閣는 타이완에서 가장 장엄한 자연경관입니다. 수백만 년에 걸쳐 깎인 대리석 협곡, 태평양으로 수직 낙하하는 칭수이 단애, 초승달 모양의 치싱탄 해변까지 — 화롄의 하이라이트를 하루에 모두 담은 루트입니다.

## 주요 명소

### 🏔️ 타이루거 협곡・옌쯔코우 燕子口 — 대리석이 만들어낸 자연의 걸작

${photoMd('tarokoGorge', '타이루거 협곡의 장엄한 대리석 절벽과 폭포')}

화롄 시내에서 차로 약 30분이면 타이루거 입구에 도착합니다. 중부횡관공로를 따라 협곡 깊숙이 들어가면 양쪽 대리석 절벽이 점점 높아지며 마치 살아있는 지질 박물관에 들어선 느낌입니다.

옌쯔코우(제비 동굴) 산책로는 협곡의 하이라이트입니다. 전체 길이 약 1.4km, 왕복 40분 정도의 코스로, 머리 위로는 거의 닫힐 듯한 협곡, 발아래로는 에메랄드빛 리우시 渓流가 흐릅니다. 절벽에 무수히 뚫린 구멍은 물이 수백만 년간 뚫어낸 것이며, 봄여름에는 제비가 둥지를 틀고 날아다닙니다.

${photoMd('tarokoBridge', '타이루거 협곡의 현수교와 초록빛 계곡')}

**촬영 팁:** 오전 9~10시에 햇빛이 협곡에 들어올 때 계곡물 색이 가장 아름답습니다. 산책로 중간 가장 좁은 지점에서 광각 렌즈로 위를 올려 찍으면 "일선천" 구도를 담을 수 있어요. 입구에서 무료 안전모를 꼭 빌려 쓰세요.

### 🌊 칭수이 단애 清水斷崖 — 태평양 위 800m 절벽

${photoMd('qingshuiCliff', '칭수이 단애 — 산이 태평양으로 직접 떨어지는 절경')}

타이루거에서 북쪽으로 약 40분 거리, 쑤화공로에 자리한 칭수이 단애는 높이 800m 이상의 절벽이 태평양으로 거의 수직 낙하하는 타이완 최고의 해안 절경입니다.

전망대에서 내려다보면 바다 색이 깊이에 따라 여러 겹으로 변합니다. 해안 가까이는 옅은 터키색, 점점 사파이어 블루, 짙은 인디고로 바뀌는 그라데이션이 맑은 날에는 믿기 어려울 정도로 아름답습니다.

**촬영 팁:** 충더 전망대가 베스트 포인트. 오전 순광 때 바다 색이 가장 선명합니다. 후이더 휴게소에서는 단애 전체를 내려다볼 수 있어 파노라마 샷에 좋아요. 흐린 날은 색 그라데이션이 안 보이니 맑은 날을 노리세요.

### 🏞️ 샤카당 산책로 砂卡礑步道 — 에메랄드빛 계곡과 대리석 하상

${photoMd('shakadang', '샤카당 산책로의 맑고 푸른 계곡물과 협곡')}

타이루거 방문자센터 바로 옆, 빨간 아치 다리를 건너면 샤카당 산책로 입구입니다. 협곡 벽을 따라 조성된 길에서 내려다보는 샤카당 계곡은 대리석 하상이 빛을 반사해 비현실적인 에메랄드 그린을 띱니다. 필터가 아니라 자연 그대로의 색입니다.

우젠우(五間屋)까지 전반 1.5km는 평탄해서 걷기 쉽고, 거대한 흰 대리석이 푸른 물속에 점점이 흩어진 풍경이 계속됩니다. 타이루거 원주민의 전통 문양도 곳곳에서 볼 수 있어요.

**촬영 팁:** 입구의 빨간 샤카당 다리에서 계곡을 내려다보는 앵글이 최고. 정오 전후 직사광선이 비출 때 물 색이 가장 선명합니다. 산책로 중간에 계곡으로 내려갈 수 있는 곳이 있어 대리석 질감을 가까이 찍을 수 있어요.

### 🏛️ 장춘사 長春祠 — 폭포 옆 절벽에 세워진 영원한 기념비

${photoMd('changchun', '장춘사 — 폭포 옆 절벽에 지어진 중국식 사당')}

장춘사(영원한 봄 사당)는 타이루거의 대표적인 인문 경관입니다. 절벽 중턱에 세워진 정교한 중국식 사당 옆으로 일 년 내내 폭포가 흐릅니다. 중부횡관공로 건설 중 순직한 200여 명의 노동자를 기리기 위해 세워졌습니다.

도로 건너편 전망대에서 바라보면 사당, 폭포, 협곡이 하나의 그림처럼 어우러지는 타이루거의 상징적인 풍경을 만날 수 있습니다.

**촬영 팁:** 오후 2~3시에 빛이 가장 고르게 비춰 사당과 폭포 모두 역광 없이 찍을 수 있어요. 비 온 뒤에는 폭포 수량이 많아져 더 장관이지만, 산책로가 폐쇄될 수 있으니 전망대에서 감상을 추천합니다.

### 🏖️ 치싱탄 七星潭 — 태평양 일출을 품은 초승달 해변

${photoMd('qixingtan', '치싱탄 — 파도가 밀려오는 화롄의 자갈 해변')}

치싱탄(七星潭)은 이름과 달리 연못이 아니라 아름다운 초승달 모양의 자갈 해변입니다. 둥글게 다듬어진 자갈을 밟으며 태평양의 끝없는 수평선을 바라보는 것 — 화롄 현지인들이 퇴근 후 멍 때리러 오는 힐링 스팟입니다.

뒤로는 중앙산맥이 솟아 있어 맑은 날에는 산과 바다를 동시에 즐길 수 있어요. 해질 무렵에는 바다 전체가 황금빛으로 물들고, 먼 산맥의 실루엣과 어우러져 화롄에서 가장 감성적인 풍경이 펼쳐집니다.

**필수 맛집 (화롄 시내):**
- **공정바오쯔 公正包子** — 화롄 최고 인기 만두. 새벽 5시부터 줄 서는 곳. 피 얇고 육즙 가득
- **예샹비엔스 液香扁食** — 60년 넘은 노포. 맑은 국물에 부드러운 완탕이 화롄 조식의 정석
- **다이지비엔스 戴記扁食** — 예샹의 라이벌. 더 얇고 매끈한 피가 특징
- **폭탄파전 炸彈蔥油餅** — 화롄 필수 길거리 음식. 반숙 달걀이 파전 안에서 터지는 식감이 중독적
- **먀오코우홍차 廟口紅茶** — 스틸 파이프로 따르는 전통 홍차, 화롄만의 독특한 풍경

**촬영 팁:** 일출(오전 5~6시)이 가장 환상적인 시간. 저녁 5~6시 골든 아워도 아름다워요. 슬로우 셔터로 파도가 자갈 사이로 흘러가는 비단 같은 느낌을 담을 수 있어요. 해변 북쪽 끝은 사람이 적어 깔끔한 구도를 잡기 좋습니다.

## 추천 일정

### 오전 — 협곡 탐험
1. **08:00** 화롄 시내 출발 (타이루거까지 차로 약 30분)
2. **08:30** 타이루거 방문자센터에서 지도 수령·산책로 개방 확인 (~20분)
3. **09:00** 샤카당 산책로, 우젠우까지 왕복 (~1.5시간)
4. **10:30** 장춘사 전망대 (~30분)
5. **11:00** 옌쯔코우 산책로 (~1시간)

### 오후 — 해안선 절경
1. **12:00** 타이루거 입구 근처에서 점심
2. **13:00** 칭수이 단애로 이동 (차로 약 40분)
3. **13:40** 칭수이 단애 전망대 (~40분)
4. **14:30** 화롄 방향으로 돌아가 치싱탄으로 이동 (차로 약 40분)
5. **15:30** 치싱탄 해변 산책 (~1.5시간)

### 저녁 — 화롄 맛집 투어
1. **17:00** 화롄 시내 복귀
2. **17:30** 공정바오쯔 → 예샹비엔스 → 폭탄파전 맛집 순례
3. **18:30** 동다먼 야시장 구경 (배에 여유가 있다면)

## 실용 정보
- **최적 시기:** 10월~이듬해 4월이 날씨가 안정적이고 비가 적습니다. 여름(6~9월)은 태풍으로 산책로가 자주 폐쇄됩니다.
- **인파 피하기:** 평일이 압도적으로 한적합니다. 주말에는 오전 8시 전에 입장하면 관광버스보다 먼저 돌아볼 수 있어요.
- **복장:** 운동화 또는 트레킹화 필수. 일부 구간이 젖어 미끄럽습니다. 여름에는 자외선 차단제와 충분한 물을 챙기세요.
- **날씨 주의:** 타이루거는 지형 특성상 날씨가 급변합니다. 출발 전 타이루거 국립공원 홈페이지에서 산책로 개방 상황을 확인하세요.
- **안전모:** 옌쯔코우 입구에서 무료 대여. 반드시 착용하세요. 낙석은 실제로 일어납니다.`,
};

async function main() {
  const body = {
    content,
    cover_image: PHOTOS.qingshuiCliff.url,
  };

  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.taroko-gorge`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    console.error('PATCH failed:', res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  console.log('Updated taroko-gorge guide with 5 languages and photos.');
  console.log('Cover image:', PHOTOS.qingshuiCliff.url);
  console.log('Languages:', Object.keys(content).join(', '));
  console.log('Response:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
