import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs, getPublishedGuides } from '@/lib/supabase';
import { tagsForLocale } from '@/lib/guide-tags';
import GuideContent from './GuideContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

interface Props {
  params: { lang: string; slug: string };
}

const TOURIST_TYPE: Record<Locale, string> = {
  'zh-TW': '包車旅遊', 'zh-CN': '包车旅游', en: 'Charter Tour', ja: 'チャーターツアー', ko: '차터 투어',
  th: 'ทัวร์รถเหมา', vi: 'Tour xe riêng', ms: 'Lawatan Charter', id: 'Tur Charter', fil: 'Charter Tour',
};

const BREADCRUMB_GUIDES: Record<Locale, string> = {
  'zh-TW': '包車攻略', 'zh-CN': '包车攻略', en: 'Travel Guides', ja: 'チャーターガイド', ko: '차터 가이드',
  th: 'คู่มือเที่ยวรถเหมา', vi: 'Cẩm nang du lịch', ms: 'Panduan Perjalanan', id: 'Panduan Wisata', fil: 'Mga Gabay sa Paglalakbay',
};

const GUIDE_META_KEYWORDS: Record<Locale, string[]> = {
  'zh-TW': ['包車旅遊', '台灣包車', '台灣美食', '台灣小吃', '台灣自由行', '背包客', '大眾運輸', '台灣一日遊'],
  'zh-CN': ['包车旅游', '台湾包车', '台湾美食', '台湾小吃', '台湾自由行', '背包客', '大众运输', '台湾一日游'],
  en: ['charter tour', 'Taiwan charter', 'Taiwan food', 'Taiwan street food', 'Taiwan independent travel', 'backpacking Taiwan', 'Taiwan day trip'],
  ja: ['台湾 貸切タクシー', '台北 貸切チャーター', 'チャーターツアー', '台湾チャーター', '台湾グルメ', '台湾自由旅行', '台湾日帰りツアー', '台湾観光'],
  ko: ['차터 투어', '대만 차터', '대만 맛집', '대만 길거리 음식', '대만 자유여행', '대만 당일치기', '대만 관광'],
  th: ['ทัวร์รถเหมา', 'เช่ารถไต้หวัน', 'อาหารไต้หวัน', 'สตรีทฟู้ดไต้หวัน', 'เที่ยวไต้หวันด้วยตัวเอง', 'เที่ยวไต้หวันวันเดียว'],
  vi: ['tour charter', 'thuê xe Đài Loan', 'ẩm thực Đài Loan', 'đồ ăn đường phố Đài Loan', 'du lịch tự túc Đài Loan', 'tour trong ngày Đài Loan'],
  ms: ['charter tour', 'sewa kereta Taiwan', 'makanan Taiwan', 'makanan jalanan Taiwan', 'melancong sendiri Taiwan', 'lawatan sehari Taiwan'],
  id: ['charter tour', 'sewa mobil Taiwan', 'kuliner Taiwan', 'jajanan kaki lima Taiwan', 'wisata mandiri Taiwan', 'wisata sehari Taiwan'],
  fil: ['charter tour', 'arkila sasakyan Taiwan', 'pagkain sa Taiwan', 'street food Taiwan', 'sariling lakbay Taiwan', 'day trip Taiwan'],
};

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  const langParams = locales.map((l) => localePathMap[l] || l);
  return langParams.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return { title: 'Not Found' };

  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const description = guide.description[locale] || guide.description['zh-TW'] || guide.description['en'] || '';
  const seg = localePathMap[locale];
  const canonical = seg
    ? `https://relaygo.pro/${seg}/guide/${params.slug}`
    : `https://relaygo.pro/guide/${params.slug}`;

  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro/guide/${params.slug}` };
  for (const l of locales) {
    const s = localePathMap[l];
    languages[l] = s ? `https://relaygo.pro/${s}/guide/${params.slug}` : `https://relaygo.pro/guide/${params.slug}`;
  }

  return {
    title: `${title} | RelayGo`,
    description,
    keywords: [
      ...GUIDE_META_KEYWORDS[locale],
      title,
      ...tagsForLocale(guide.tags, locale),
    ].join(', '),
    openGraph: {
      title: `${title} | RelayGo`,
      description,
      type: 'article',
      url: canonical,
      locale: locale.replace('-', '_'),
      images: guide.cover_image ? [{ url: guide.cover_image, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

function guideJsonLd(guide: NonNullable<Awaited<ReturnType<typeof getGuideBySlug>>>, locale: Locale) {
  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const desc = guide.description[locale] || guide.description['zh-TW'] || guide.description['en'] || '';
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: title,
    description: desc,
    touristType: TOURIST_TYPE[locale],
    image: guide.cover_image || '',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TWD',
    },
    provider: {
      '@type': 'Organization',
      name: 'RelayGo',
      url: 'https://relaygo.pro',
    },
  };
}

// Per-route FAQ for rich snippets — AI search engines love this
const GUIDE_FAQS: Record<string, { q: Record<string, string>; a: Record<string, string> }[]> = {
  'taipei-classic': [
    {
      q: { 'zh-TW': '台北經典一日遊包含哪些景點？', 'zh-CN': '台北经典一日游包含哪些景点？', en: 'What does the Taipei Classics day trip include?', ja: '台北クラシック日帰りツアーにはどんなスポットが含まれますか？', ko: '타이베이 클래식 일일 투어에는 어떤 명소가 포함되나요?', th: 'ทริปวันเดียวไทเปคลาสสิกมีอะไรบ้าง?', vi: 'Tour một ngày Đài Bắc kinh điển bao gồm những điểm nào?', ms: 'Apakah yang termasuk dalam lawatan sehari Taipei Klasik?', id: 'Apa saja yang termasuk dalam tur sehari Taipei Klasik?', fil: 'Ano ang kasama sa Taipei Classics day trip?' },
      a: { 'zh-TW': '中正紀念堂（儀隊交接）、永康街（鼎泰豐小籠包）、故宮博物院（翠玉白菜）、台北101觀景台，四大地標一天走完。', 'zh-CN': '中正纪念堂（仪队交接）、永康街（鼎泰丰小笼包）、故宫博物院（翠玉白菜）、台北101观景台，四大地标一天走完。', en: 'CKS Memorial Hall (guard change), Yongkang Street (Din Tai Fung), National Palace Museum (Jadeite Cabbage), and Taipei 101 observatory — four iconic landmarks in one day.', ja: '中正紀念堂（衛兵交代式）、永康街（鼎泰豊の小籠包）、故宮博物院（翡翠白菜）、台北101展望台 — 四大ランドマークを1日で巡ります。', ko: '중정기념당(위병 교대식), 용캉제(딘타이펑 샤오롱바오), 고궁박물원(취옥백채), 타이베이 101 전망대 — 4대 랜드마크를 하루에 둘러봅니다.', th: 'อนุสรณ์สถานเจียงไคเช็ก (พิธีเปลี่ยนเวรทหาร) ถนนหย่งคัง (ติ่นไท่ฟง) พิพิธภัณฑ์พระราชวัง (ผักกาดหยก) และจุดชมวิวไทเป 101 — สี่แลนด์มาร์กในวันเดียว', vi: 'Nhà tưởng niệm Tưởng Giới Thạch (lễ đổi gác), phố Yongkang (Din Tai Fung), Bảo tàng Cung điện Quốc gia (Bắp cải Ngọc bích), đài quan sát Taipei 101 — bốn địa danh mang tính biểu tượng trong một ngày.', ms: 'Dewan Peringatan CKS (pertukaran pengawal), Jalan Yongkang (Din Tai Fung), Muzium Istana Negara (Kubis Jed), dan menara observatori Taipei 101 — empat mercu tanda ikonik dalam sehari.', id: 'CKS Memorial Hall (pergantian penjaga), Jalan Yongkang (Din Tai Fung), Museum Istana Nasional (Kubis Giok), dan observatorium Taipei 101 — empat landmark ikonik dalam satu hari.', fil: 'CKS Memorial Hall (pagpapalit ng guwardiya), Yongkang Street (Din Tai Fung), National Palace Museum (Jadeite Cabbage), at Taipei 101 observatory — apat na iconic na landmark sa isang araw.' },
    },
    {
      q: { 'zh-TW': '故宮博物院要逛多久？', 'zh-CN': '故宫博物院要逛多久？', en: 'How long should I spend at the National Palace Museum?', ja: '故宮博物院はどのくらい時間をかけるべきですか？', ko: '고궁박물원은 얼마나 시간을 할애해야 하나요?', th: 'ควรใช้เวลาเที่ยวพิพิธภัณฑ์พระราชวังนานแค่ไหน?', vi: 'Nên dành bao lâu để tham quan Bảo tàng Cung điện Quốc gia?', ms: 'Berapa lama perlu diperuntukkan di Muzium Istana Negara?', id: 'Berapa lama waktu yang dibutuhkan di Museum Istana Nasional?', fil: 'Gaano katagal dapat kong gugulin sa National Palace Museum?' },
      a: { 'zh-TW': '建議至少1.5-2小時。翠玉白菜、肉形石和毛公鼎是必看三寶，認真逛可以半天。', 'zh-CN': '建议至少1.5-2小时。翠玉白菜、肉形石和毛公鼎是必看三宝，认真逛可以半天。', en: 'Allow at least 1.5-2 hours. The Jadeite Cabbage, Meat-shaped Stone, and Mao Gong Ding are the must-see top three.', ja: '最低1.5〜2時間は必要です。翡翠白菜、肉形石、毛公鼎は必見の三大至宝です。', ko: '최소 1.5~2시간은 잡으세요. 취옥백채, 육형석, 모공정이 반드시 봐야 할 3대 보물입니다.', th: 'แนะนำอย่างน้อย 1.5-2 ชั่วโมง ผักกาดหยก หินรูปเนื้อ และหม้อสามขาเหมากง คือสามสิ่งที่ต้องดู', vi: 'Nên dành ít nhất 1,5-2 giờ. Bắp cải Ngọc bích, Đá hình thịt và Đỉnh Mao Công là ba bảo vật phải xem.', ms: 'Peruntukkan sekurang-kurangnya 1.5-2 jam. Kubis Jed, Batu Berbentuk Daging, dan Mao Gong Ding adalah tiga khazanah wajib lihat.', id: 'Siapkan minimal 1,5-2 jam. Kubis Giok, Batu Berbentuk Daging, dan Mao Gong Ding adalah tiga harta karun yang wajib dilihat.', fil: 'Maglaan ng hindi bababa sa 1.5-2 oras. Ang Jadeite Cabbage, Meat-shaped Stone, at Mao Gong Ding ang tatlong dapat na makita.' },
    },
  ],
  'taipei-jiufen-shifen': [
    {
      q: { 'zh-TW': '台北到九份包車要多久？', 'zh-CN': '台北到九份包车要多久？', en: 'How long from Taipei to Jiufen by charter car?', ja: '台北から九份までチャーターカーでどのくらいかかりますか？', ko: '타이베이에서 지우펀까지 전용차로 얼마나 걸리나요?', th: 'จากไทเปไปจิ่วเฟิ่นด้วยรถเช่าเหมาใช้เวลานานแค่ไหน?', vi: 'Từ Đài Bắc đến Cửu Phần bằng xe riêng mất bao lâu?', ms: 'Berapa lama dari Taipei ke Jiufen dengan kereta sewa?', id: 'Berapa lama dari Taipei ke Jiufen dengan mobil charter?', fil: 'Gaano katagal mula Taipei hanggang Jiufen sa charter car?' },
      a: { 'zh-TW': '台北市區到九份車程約1小時。一日遊通常搭配十分天燈、黃金瀑布、陰陽海，整趟約8小時。', 'zh-CN': '台北市区到九份车程约1小时。一日游通常搭配十分天灯、黄金瀑布、阴阳海，整趟约8小时。', en: 'About 1 hour from central Taipei. A day trip typically includes Shifen sky lanterns, Golden Waterfall, and Yin-Yang Sea — around 8 hours total.', ja: '台北市内から約1時間です。日帰りツアーでは通常、十分のランタン飛ばし、黄金の滝、陰陽海を組み合わせ、全行程約8時間です。', ko: '타이베이 시내에서 약 1시간입니다. 일일 투어에는 보통 스펀 천등, 황금폭포, 음양해가 포함되며 전체 약 8시간입니다.', th: 'จากใจกลางไทเปประมาณ 1 ชั่วโมง ทริปวันเดียวมักรวมปล่อยโคมลอยที่สือเฟิ่น น้ำตกทองคำ และทะเลหยินหยาง รวมประมาณ 8 ชั่วโมง', vi: 'Khoảng 1 giờ từ trung tâm Đài Bắc. Tour trong ngày thường bao gồm thả đèn trời Thập Phần, Thác Vàng và Biển Âm Dương — tổng cộng khoảng 8 giờ.', ms: 'Kira-kira 1 jam dari pusat Taipei. Lawatan sehari biasanya termasuk tanglung langit Shifen, Air Terjun Emas, dan Laut Yin-Yang — kira-kira 8 jam keseluruhannya.', id: 'Sekitar 1 jam dari pusat kota Taipei. Tur sehari biasanya termasuk lentera langit Shifen, Air Terjun Emas, dan Laut Yin-Yang — sekitar 8 jam total.', fil: 'Mga 1 oras mula sa sentro ng Taipei. Karaniwang kasama sa day trip ang Shifen sky lanterns, Golden Waterfall, at Yin-Yang Sea — mga 8 oras lahat.' },
    },
    {
      q: { 'zh-TW': '九份什麼時候去最美？', 'zh-CN': '九份什么时候去最美？', en: 'When is the best time to visit Jiufen?', ja: '九份に行くベストな時期はいつですか？', ko: '지우펀은 언제 방문하는 것이 가장 좋나요?', th: 'ช่วงไหนไปจิ่วเฟิ่นสวยที่สุด?', vi: 'Khi nào đi Cửu Phần đẹp nhất?', ms: 'Bilakah masa terbaik untuk melawat Jiufen?', id: 'Kapan waktu terbaik mengunjungi Jiufen?', fil: 'Kailan ang pinakamainam na panahon para bumisita sa Jiufen?' },
      a: { 'zh-TW': '傍晚16:30-17:30燈籠亮起時最有氛圍。秋冬（10-12月）山城雲霧繚繞特別美，平日人潮也比較少。', 'zh-CN': '傍晚16:30-17:30灯笼亮起时最有氛围。秋冬（10-12月）山城云雾缭绕特别美，平日人潮也比较少。', en: 'Late afternoon (4:30-5:30 PM) when the lanterns light up. Autumn/winter (Oct-Dec) brings atmospheric mountain mist with fewer crowds on weekdays.', ja: '夕方16:30〜17:30に提灯が灯る頃が最も雰囲気があります。秋冬（10〜12月）は山間に霧が立ち込め格別の美しさで、平日は人も少なめです。', ko: '오후 4시 30분~5시 30분에 홍등이 켜질 때가 가장 분위기 있습니다. 가을/겨울(10~12월)에는 산간 마을에 안개가 자욱해 특히 아름답고, 평일에는 인파도 적습니다.', th: 'ช่วงเย็น 16:30-17:30 เมื่อโคมไฟเริ่มสว่างจะบรรยากาศดีที่สุด ฤดูใบไม้ร่วง/หนาว (ต.ค.-ธ.ค.) หมอกปกคลุมภูเขาสวยมาก วันธรรมดาคนน้อยกว่า', vi: 'Chiều muộn (16:30-17:30) khi đèn lồng bắt đầu sáng là lúc đẹp nhất. Mùa thu/đông (tháng 10-12) sương mù bao phủ núi đồi rất thơ mộng, ngày thường ít đông hơn.', ms: 'Petang lewat (4:30-5:30 PM) apabila tanglung menyala. Musim luruh/sejuk (Okt-Dis) membawa kabus gunung yang mempesona dengan orang ramai lebih sedikit pada hari biasa.', id: 'Sore hari (16:30-17:30) saat lentera mulai menyala. Musim gugur/dingin (Okt-Des) menghadirkan kabut pegunungan yang memesona dengan pengunjung lebih sedikit di hari kerja.', fil: 'Sa hapon (4:30-5:30 PM) kapag nagsisimulang mag-ilaw ang mga lantern. Taglagas/taglamig (Okt-Des) may magandang hamog sa bundok na mas kaunti ang tao sa weekdays.' },
    },
    {
      q: { 'zh-TW': '九份是《神隱少女》的場景原型嗎？', 'zh-CN': '九份是《千与千寻》的原型吗？', en: 'Is Jiufen the inspiration for Spirited Away?', ja: '九份は『千と千尋の神隠し』のモデルですか？', ko: '지우펀이 〈센과 치히로의 행방불명〉의 모델인가요?', th: 'จิ่วเฟิ่นเป็นต้นแบบของ Spirited Away หรือเปล่า?', vi: 'Cửu Phần có phải nguyên mẫu của phim Vùng đất linh hồn không?', ms: 'Adakah Jiufen inspirasi filem Spirited Away?', id: 'Apakah Jiufen inspirasi film Spirited Away?', fil: 'Ang Jiufen ba ang inspirasyon ng Spirited Away?' },
      a: { 'zh-TW': '吉卜力官方沒有承認過。不過滿街紅燈籠的階梯巷弄和依山而建的茶樓，氣氛跟電影很像，所以特別受日本旅客喜愛。燈籠亮起的傍晚 16:30-17:30，豎崎路和阿妹茶樓一帶是最經典的拍照點。', 'zh-CN': '吉卜力官方从未承认过。不过挂满红灯笼的石阶小巷和依山而建的茶楼，氛围和电影很像，所以特别受日本游客喜爱。灯笼亮起的傍晚 16:30-17:30，竖崎路和阿妹茶楼一带是最经典的出片点。', en: 'Studio Ghibli has never confirmed it. Still, the lantern-lined stairways and teahouses clinging to the hillside feel so much like the film that Jiufen is hugely popular with Japanese visitors. The classic photo spot is Shuqi Road and A-Mei Teahouse at dusk (4:30-5:30 PM), when the lanterns light up.', ja: 'スタジオジブリは公式にモデルと認めていません。ただ、赤い提灯が連なる石段の路地や山の斜面に建つ茶楼の景色が映画の世界観を思わせるため、日本からの旅行者に特に人気です。提灯が灯る夕方16:30〜17:30ごろの豎崎路と阿妹茶樓の周辺が定番の撮影スポットです。', ko: '스튜디오 지브리가 공식적으로 인정한 적은 없습니다. 하지만 홍등이 늘어선 계단 골목과 산비탈에 자리한 찻집 풍경이 영화 분위기와 닮아 특히 일본 여행객에게 인기가 많습니다. 홍등이 켜지는 오후 4시 30분~5시 30분, 수치루와 아메이차루 주변이 대표 인생샷 명소입니다.', th: 'สตูดิโอจิบลิไม่เคยยืนยันอย่างเป็นทางการ แต่ตรอกบันไดที่ประดับโคมแดงเรียงราย และโรงน้ำชาที่เกาะอยู่บนไหล่เขาให้บรรยากาศเหมือนในหนังมาก จึงเป็นที่นิยมมากในหมู่นักท่องเที่ยวญี่ปุ่น จุดถ่ายรูปยอดฮิตคือถนนซู่ฉีและร้านน้ำชาอาเหม่ย ช่วงเย็น 16:30-17:30 ตอนโคมไฟเริ่มสว่าง', vi: 'Studio Ghibli chưa từng xác nhận chính thức. Tuy vậy, những con dốc bậc thang treo đầy đèn lồng đỏ và các quán trà bám sườn núi mang không khí rất giống trong phim, nên Cửu Phần đặc biệt được du khách Nhật yêu thích. Điểm chụp ảnh kinh điển là đường Thụ Kỳ và quán trà A Muội lúc chiều muộn (16:30-17:30) khi đèn lồng bắt đầu sáng.', ms: 'Studio Ghibli tidak pernah mengesahkannya secara rasmi. Namun, lorong bertangga yang dihiasi tanglung merah dan rumah teh di lereng bukit sangat mirip suasana filem itu, jadi Jiufen amat popular dalam kalangan pelancong Jepun. Lokasi foto klasik ialah Jalan Shuqi dan Rumah Teh A-Mei pada waktu senja (4:30-5:30 petang) apabila tanglung mula menyala.', id: 'Studio Ghibli tidak pernah mengonfirmasinya secara resmi. Namun, gang bertangga yang dipenuhi lentera merah dan rumah teh di lereng bukit sangat mirip suasana filmnya, sehingga Jiufen sangat populer di kalangan wisatawan Jepang. Spot foto klasiknya adalah Jalan Shuqi dan Rumah Teh A-Mei saat senja (16:30-17:30) ketika lentera mulai menyala.', fil: 'Hindi ito kailanman kinumpirma ng Studio Ghibli. Pero ang mga hagdang eskinita na puno ng pulang lantern at ang mga teahouse sa gilid ng bundok ay parang eksena sa pelikula, kaya patok ang Jiufen sa mga Japanese na turista. Ang classic na photo spot ay ang Shuqi Road at A-Mei Teahouse sa dapithapon (4:30-5:30 PM) kapag nagsisindi na ang mga lantern.' },
    },
  ],
  'yehliu-shifen-jiufen': [
    {
      q: { 'zh-TW': '野柳十分九份一天走得完嗎？', 'zh-CN': '野柳十分九份一天走得完吗？', en: 'Can I visit Yehliu, Shifen, and Jiufen in one day?', ja: '野柳・十分・九份を1日で回れますか？', ko: '예류, 스펀, 지우펀을 하루에 다 돌 수 있나요?', th: 'เที่ยวเย่หลิ่ว สือเฟิ่น จิ่วเฟิ่น วันเดียวครบไหม?', vi: 'Có thể tham quan Dã Liễu, Thập Phần và Cửu Phần trong một ngày không?', ms: 'Bolehkah saya melawat Yehliu, Shifen dan Jiufen dalam sehari?', id: 'Bisakah mengunjungi Yehliu, Shifen, dan Jiufen dalam satu hari?', fil: 'Kaya bang bisitahin ang Yehliu, Shifen, at Jiufen sa isang araw?' },
      a: { 'zh-TW': '包車可以。三個景點車程串連很順，8小時行程綽綽有餘。搭大眾運輸需要轉乘3-4次，行程會比較趕。', 'zh-CN': '包车可以。三个景点车程串联很顺，8小时行程绰绰有余。搭大众运输需要转乘3-4次，行程会比较赶。', en: 'By charter car, absolutely — the three spots connect smoothly in an 8-hour itinerary. By public transit, it requires 3-4 transfers and is quite rushed.', ja: 'チャーターカーなら余裕で回れます。3つのスポットはスムーズにつながり、8時間あれば十分です。公共交通では3〜4回の乗り換えが必要で、かなり慌ただしくなります。', ko: '전용차라면 충분합니다. 세 곳이 순조롭게 연결되어 8시간이면 넉넉합니다. 대중교통은 3~4번 환승해야 해서 상당히 빠듯합니다.', th: 'เช่ารถเหมาได้สบาย สามจุดเชื่อมต่อกันราบรื่น 8 ชั่วโมงเหลือเฟือ ถ้าขนส่งสาธารณะต้องต่อรถ 3-4 ครั้ง ค่อนข้างเร่งรีบ', vi: 'Đi xe riêng thì hoàn toàn được. Ba điểm nối tiếp nhau rất thuận, 8 giờ là dư dả. Đi phương tiện công cộng phải chuyển xe 3-4 lần, khá gấp rút.', ms: 'Dengan kereta sewa, pasti boleh — ketiga-tiga tempat bersambung dengan lancar dalam jadual 8 jam. Dengan pengangkutan awam, perlu bertukar 3-4 kali dan agak tergesa-gesa.', id: 'Dengan mobil charter, tentu bisa — tiga tempat terhubung dengan mulus dalam jadwal 8 jam. Dengan transportasi umum, perlu transit 3-4 kali dan cukup terburu-buru.', fil: 'Sa charter car, oo naman — ang tatlong lugar ay magkakasunod nang maayos sa 8-oras na itinerary. Sa pampublikong transportasyon, kailangan ng 3-4 na paglipat at medyo nagmamadali.' },
    },
  ],
  'yangmingshan': [
    {
      q: { 'zh-TW': '陽明山什麼時候花最多？', 'zh-CN': '阳明山什么时候花最多？', en: 'When are the best flower seasons at Yangmingshan?', ja: '陽明山の花のベストシーズンはいつですか？', ko: '양밍산 꽃이 가장 많은 시기는 언제인가요?', th: 'ดอกไม้ที่หยางหมิงซานบานสวยสุดช่วงไหน?', vi: 'Mùa hoa đẹp nhất ở Dương Minh Sơn là khi nào?', ms: 'Bilakah musim bunga terbaik di Yangmingshan?', id: 'Kapan musim bunga terbaik di Yangmingshan?', fil: 'Kailan ang pinakamagandang season ng bulaklak sa Yangmingshan?' },
      a: { 'zh-TW': '2-3月海芋季（竹子湖）、5-6月繡球花季最受歡迎。櫻花約在1-2月。花季期間假日人非常多，建議平日前往。', 'zh-CN': '2-3月海芋季（竹子湖）、5-6月绣球花季最受欢迎。樱花约在1-2月。花季期间假日人非常多，建议平日前往。', en: 'Calla lilies in Feb-Mar (Zhuzihu) and hydrangeas in May-Jun are the most popular. Cherry blossoms bloom Jan-Feb. Weekdays are much less crowded during flower season.', ja: '2〜3月のカラー（竹子湖）と5〜6月のアジサイが最も人気です。桜は1〜2月頃。花のシーズンは週末が非常に混むので、平日がおすすめです。', ko: '2~3월 카라(주자후)와 5~6월 수국 시즌이 가장 인기입니다. 벚꽃은 1~2월경입니다. 꽃 시즌 주말은 매우 붐비니 평일을 추천합니다.', th: 'ดอกคาลล่าลิลลี่ ก.พ.-มี.ค. (จู๋จื่อหู) และไฮเดรนเยีย พ.ค.-มิ.ย. ได้รับความนิยมที่สุด ซากุระบาน ม.ค.-ก.พ. ช่วงเทศกาลดอกไม้วันหยุดคนเยอะมาก แนะนำไปวันธรรมดา', vi: 'Mùa hoa rum tháng 2-3 (Trúc Tử Hồ) và cẩm tú cầu tháng 5-6 được yêu thích nhất. Hoa anh đào nở tháng 1-2. Mùa hoa cuối tuần rất đông, nên đi ngày thường.', ms: 'Bunga calla lily pada Feb-Mac (Zhuzihu) dan hydrangea pada Mei-Jun paling popular. Bunga sakura mekar Jan-Feb. Hari biasa kurang sesak semasa musim bunga.', id: 'Bunga calla lily Feb-Mar (Zhuzihu) dan hydrangea Mei-Jun paling populer. Bunga sakura mekar Jan-Feb. Hari kerja jauh lebih sepi selama musim bunga.', fil: 'Calla lilies sa Feb-Mar (Zhuzihu) at hydrangeas sa May-Jun ang pinakapopular. Namumulaklak ang cherry blossoms sa Jan-Feb. Mas kaunti ang tao sa weekdays kapag flower season.' },
    },
  ],
  'yilan': [
    {
      q: { 'zh-TW': '台北到宜蘭包車要多久？', 'zh-CN': '台北到宜兰包车要多久？', en: 'How long from Taipei to Yilan by charter car?', ja: '台北から宜蘭までチャーターカーでどのくらいかかりますか？', ko: '타이베이에서 이란까지 전용차로 얼마나 걸리나요?', th: 'จากไทเปไปอี๋หลานด้วยรถเช่าเหมาใช้เวลานานแค่ไหน?', vi: 'Từ Đài Bắc đến Nghi Lan bằng xe riêng mất bao lâu?', ms: 'Berapa lama dari Taipei ke Yilan dengan kereta sewa?', id: 'Berapa lama dari Taipei ke Yilan dengan mobil charter?', fil: 'Gaano katagal mula Taipei hanggang Yilan sa charter car?' },
      a: { 'zh-TW': '走雪山隧道約45分鐘。宜蘭一日遊包含礁溪溫泉、傳藝中心、羅東夜市，行程約10小時。', 'zh-CN': '走雪山隧道约45分钟。宜兰一日游包含礁溪温泉、传艺中心、罗东夜市，行程约10小时。', en: 'About 45 minutes via the Xueshan Tunnel. A Yilan day trip includes Jiaoxi hot springs, traditional arts center, and Luodong Night Market — around 10 hours.', ja: '雪山トンネル経由で約45分です。宜蘭日帰りツアーでは礁渓温泉、伝統芸術センター、羅東夜市を巡り、約10時間です。', ko: '쉐산 터널 경유 약 45분입니다. 이란 일일 투어에는 자오시 온천, 전통예술센터, 뤄둥 야시장이 포함되며 약 10시간입니다.', th: 'ผ่านอุโมงค์เสวี่ยซานประมาณ 45 นาที ทริปวันเดียวอี๋หลานรวมน้ำพุร้อนเจียวซี ศูนย์ศิลปะดั้งเดิม และตลาดกลางคืนหลัวตง ประมาณ 10 ชั่วโมง', vi: 'Khoảng 45 phút qua hầm Tuyết Sơn. Tour trong ngày Nghi Lan bao gồm suối nước nóng Jiaoxi, Trung tâm Nghệ thuật Truyền thống và Chợ đêm Luodong — khoảng 10 giờ.', ms: 'Kira-kira 45 minit melalui Terowong Xueshan. Lawatan sehari Yilan termasuk mata air panas Jiaoxi, pusat seni tradisional, dan Pasar Malam Luodong — kira-kira 10 jam.', id: 'Sekitar 45 menit melalui Terowongan Xueshan. Tur sehari Yilan termasuk pemandian air panas Jiaoxi, pusat seni tradisional, dan Pasar Malam Luodong — sekitar 10 jam.', fil: 'Mga 45 minuto sa Xueshan Tunnel. Kasama sa Yilan day trip ang Jiaoxi hot springs, traditional arts center, at Luodong Night Market — mga 10 oras.' },
    },
  ],
  'alishan-forest': [
    {
      q: { 'zh-TW': '阿里山一日遊來得及嗎？', 'zh-CN': '阿里山一日游来得及吗？', en: 'Is a one-day trip to Alishan enough?', ja: '阿里山は日帰りで足りますか？', ko: '아리산 당일치기로 충분한가요?', th: 'ไปอาลีซานวันเดียวพอไหม?', vi: 'Đi A Lý Sơn một ngày có đủ không?', ms: 'Adakah lawatan sehari ke Alishan mencukupi?', id: 'Apakah wisata sehari ke Alishan cukup?', fil: 'Sapat ba ang isang araw na biyahe sa Alishan?' },
      a: { 'zh-TW': '一日包車（10小時）可以走完奮起湖老街＋阿里山森林園區主要步道。但如果想看日出，必須住一晚，清晨4:30搭祝山線小火車是最經典的體驗。', 'zh-CN': '一日包车（10小时）可以走完奋起湖老街＋阿里山森林园区主要步道。但如果想看日出，必须住一晚，清晨4:30搭祝山线小火车是最经典的体验。', en: 'A one-day charter (10 hours) covers Fenqihu and the main forest trails. To see the famous sunrise, you must stay overnight — the 4:30 AM Zhushan Line train is Alishan\'s signature experience.', ja: '1日チャーター（10時間）で奮起湖の老街と森林遊楽区の主要な遊歩道を回れます。しかし有名な日の出を見るには1泊必要です。早朝4:30の祝山線ミニトレインが阿里山の代名詞的体験です。', ko: '당일 전용차(10시간)로 펀치후 옛거리와 주요 삼림 산책로를 둘러볼 수 있습니다. 하지만 유명한 일출을 보려면 1박이 필요합니다. 새벽 4시 30분 주산선 꼬마열차가 아리산의 대표 체험입니다.', th: 'เช่ารถเหมาวันเดียว (10 ชม.) เที่ยวถนนเก่าเฟิ่นฉี่หูและเส้นทางเดินป่าหลักได้ แต่ถ้าอยากดูพระอาทิตย์ขึ้นต้องค้างคืน รถไฟสายจู้ซานตี 4.30 น. คือประสบการณ์ที่ห้ามพลาด', vi: 'Thuê xe một ngày (10 giờ) có thể đi hết phố cổ Phấn Khởi Hồ và các đường mòn chính trong khu rừng. Nhưng nếu muốn ngắm bình minh thì phải ở lại một đêm — chuyến tàu nhỏ tuyến Chúc Sơn lúc 4:30 sáng là trải nghiệm đặc trưng nhất của A Lý Sơn.', ms: 'Charter sehari (10 jam) boleh meliputi Fenqihu dan laluan hutan utama. Untuk melihat matahari terbit yang terkenal, anda perlu bermalam — kereta api Zhushan Line jam 4:30 pagi adalah pengalaman ikonik Alishan.', id: 'Charter sehari (10 jam) bisa mencakup Fenqihu dan jalur hutan utama. Untuk melihat matahari terbit yang terkenal, harus menginap — kereta api Zhushan Line pukul 4:30 pagi adalah pengalaman khas Alishan.', fil: 'Ang isang araw na charter (10 oras) ay sakop ang Fenqihu at mga pangunahing forest trail. Para makita ang sikat na sunrise, kailangan mag-overnight — ang 4:30 AM Zhushan Line train ang signature experience ng Alishan.' },
    },
  ],
  'sun-moon-lake': [
    {
      q: { 'zh-TW': '日月潭一日遊包車從哪裡出發？', 'zh-CN': '日月潭一日游包车从哪里出发？', en: 'Where does a Sun Moon Lake charter day trip start from?', ja: '日月潭日帰りチャーターツアーはどこから出発しますか？', ko: '르웨탄 당일 전용차 투어는 어디서 출발하나요?', th: 'ทริปวันเดียวทะเลสาบสุริยันจันทราออกเดินทางจากไหน?', vi: 'Tour trong ngày Nhật Nguyệt Đàm khởi hành từ đâu?', ms: 'Dari manakah lawatan sehari charter Tasik Sun Moon bermula?', id: 'Dari mana tur charter sehari Danau Sun Moon berangkat?', fil: 'Saan nagsisimula ang Sun Moon Lake charter day trip?' },
      a: { 'zh-TW': '通常從台中市區或高鐵台中站出發，車程約1.5小時。可以環湖搭船、騎自行車，還能搭配附近的清境農場（需兩天一夜）。', 'zh-CN': '通常从台中市区或高铁台中站出发，车程约1.5小时。可以环湖搭船、骑自行车，还能搭配附近的清境农场（需两天一夜）。', en: 'Usually from Taichung city or HSR Taichung Station, about 1.5 hours drive. You can boat around the lake, cycle, or combine with Cingjing Farm (requires overnight).', ja: '通常は台中市内または高鉄台中駅から出発し、車で約1.5時間です。湖を遊覧船で周ったり、サイクリングしたり、近くの清境農場と組み合わせることもできます（1泊必要）。', ko: '보통 타이중 시내 또는 고속철도 타이중역에서 출발하며, 차로 약 1.5시간입니다. 유람선, 자전거를 즐기거나 근처 칭징농장과 함께 방문할 수 있습니다(1박 필요).', th: 'ปกติออกจากตัวเมืองไถจงหรือสถานีรถไฟความเร็วสูงไถจง ใช้เวลาประมาณ 1.5 ชม. ล่องเรือรอบทะเลสาบ ปั่นจักรยาน หรือรวมกับฟาร์มชิงจิง (ต้องค้างคืน)', vi: 'Thường khởi hành từ trung tâm Đài Trung hoặc ga cao tốc Đài Trung, khoảng 1,5 giờ lái xe. Có thể đi thuyền quanh hồ, đạp xe, hoặc kết hợp Nông trại Thanh Cảnh (cần qua đêm).', ms: 'Biasanya dari bandar Taichung atau Stesen HSR Taichung, kira-kira 1.5 jam perjalanan. Anda boleh menaiki bot mengelilingi tasik, berbasikal, atau menggabungkan dengan Ladang Cingjing (perlu bermalam).', id: 'Biasanya dari kota Taichung atau Stasiun HSR Taichung, sekitar 1,5 jam perjalanan. Bisa naik perahu keliling danau, bersepeda, atau dikombinasikan dengan Cingjing Farm (perlu menginap).', fil: 'Karaniwang mula sa Taichung city o HSR Taichung Station, mga 1.5 oras na biyahe. Puwedeng mag-boat sa paligid ng lawa, mag-bike, o isama ang Cingjing Farm (kailangan mag-overnight).' },
    },
  ],
  'tainan-salt-coast': [
    {
      q: { 'zh-TW': '台南鹽田什麼時候去最美？', 'zh-CN': '台南盐田什么时候去最美？', en: 'When is the best time to visit Tainan salt fields?', ja: '台南の塩田はいつ行くのが一番きれいですか？', ko: '타이난 염전은 언제 방문하는 것이 가장 아름다운가요?', th: 'ไปนาเกลือไถหนานช่วงไหนสวยที่สุด?', vi: 'Khi nào đi ruộng muối Đài Nam đẹp nhất?', ms: 'Bilakah masa terbaik untuk melawat ladang garam Tainan?', id: 'Kapan waktu terbaik mengunjungi ladang garam Tainan?', fil: 'Kailan ang pinakamagandang panahon para bumisita sa Tainan salt fields?' },
      a: { 'zh-TW': '傍晚日落前30分鐘最美 — 整片鹽田變成鏡面，倒映火燒雲的夕陽。10-3月天氣最舒適，夏天非常曬。', 'zh-CN': '傍晚日落前30分钟最美 — 整片盐田变成镜面，倒映火烧云的夕阳。10-3月天气最舒适，夏天非常晒。', en: 'About 30 minutes before sunset is most beautiful — the entire salt field becomes a mirror reflecting the blazing sky. Oct-Mar has the most comfortable weather; summer is extremely hot.', ja: '日没30分前が最も美しく、塩田全体が鏡のようになり、燃えるような夕焼け空を映し出します。10〜3月が最も快適な気候で、夏は非常に暑いです。', ko: '해질녘 30분 전이 가장 아름답습니다 — 염전 전체가 거울처럼 변해 불타는 하늘을 반사합니다. 10~3월이 가장 쾌적하며, 여름은 매우 덥습니다.', th: 'ช่วง 30 นาทีก่อนพระอาทิตย์ตกสวยที่สุด — นาเกลือทั้งผืนกลายเป็นกระจกสะท้อนท้องฟ้าสีส้มแดง ต.ค.-มี.ค. อากาศสบายที่สุด หน้าร้อนแดดจัดมาก', vi: 'Khoảng 30 phút trước hoàng hôn là đẹp nhất — cả cánh đồng muối biến thành tấm gương phản chiếu bầu trời rực lửa. Tháng 10-3 thời tiết dễ chịu nhất; mùa hè rất nắng nóng.', ms: 'Kira-kira 30 minit sebelum matahari terbenam paling cantik — seluruh ladang garam menjadi cermin memantulkan langit yang menyala. Okt-Mac cuaca paling selesa; musim panas sangat panas.', id: 'Sekitar 30 menit sebelum matahari terbenam paling indah — seluruh ladang garam menjadi cermin yang memantulkan langit membara. Okt-Mar cuaca paling nyaman; musim panas sangat terik.', fil: 'Mga 30 minuto bago lumubog ang araw ang pinakamaganda — ang buong salt field ay nagiging salamin na nagre-reflect ng nagniningas na kalangitan. Okt-Mar ang pinakakomportableng panahon; sobrang init sa tag-araw.' },
    },
  ],
  'tainan-heritage': [
    {
      q: { 'zh-TW': '台南古蹟一日遊包含哪些景點？', 'zh-CN': '台南古迹一日游包含哪些景点？', en: 'What does the Tainan Heritage day trip include?', ja: '台南古跡日帰りツアーにはどんなスポットが含まれますか？', ko: '타이난 유적 일일 투어에는 어떤 명소가 포함되나요?', th: 'ทริปวันเดียวโบราณสถานไถหนานมีอะไรบ้าง?', vi: 'Tour di tích Đài Nam một ngày bao gồm những điểm nào?', ms: 'Apakah yang termasuk dalam lawatan sehari warisan Tainan?', id: 'Apa saja yang termasuk dalam tur warisan sehari Tainan?', fil: 'Ano ang kasama sa Tainan Heritage day trip?' },
      a: { 'zh-TW': '安平老街、安平樹屋、安平古堡、林百貨、赤崁樓、台南孔廟，六個景點串連四百年府城歷史。', 'zh-CN': '安平老街、安平树屋、安平古堡、林百货、赤崁楼、台南孔庙，六个景点串联四百年府城历史。', en: 'Anping Old Street, Anping Tree House, Anping Fort, Hayashi Department Store, Chihkan Tower, and Tainan Confucius Temple — six sites spanning 400 years of history.', ja: '安平老街、安平樹屋、安平古堡、林百貨店、赤崁楼、台南孔子廟 — 400年の府城の歴史をつなぐ6つのスポットです。', ko: '안핑 옛거리, 안핑 수옥, 안핑 고성, 하야시 백화점, 츠칸러우, 타이난 공묘 — 400년 부성 역사를 잇는 6곳입니다.', th: 'ถนนเก่าอันผิง บ้านต้นไม้อันผิง ป้อมอันผิง ห้างหลินไป่ฮั่ว หอฉือคัน และวัดขงจื้อไถหนาน — หกสถานที่เชื่อมต่อ 400 ปีประวัติศาสตร์', vi: 'Phố cổ An Bình, Nhà cây An Bình, Cổ bảo An Bình, Cửa hàng Hayashi, Tháp Xích Khảm, Văn miếu Đài Nam — sáu địa danh nối liền 400 năm lịch sử.', ms: 'Jalan Lama Anping, Rumah Pokok Anping, Kubu Anping, Gedung Hayashi, Menara Chihkan, dan Kuil Konfusius Tainan — enam tapak merentangi 400 tahun sejarah.', id: 'Jalan Lama Anping, Rumah Pohon Anping, Benteng Anping, Hayashi Department Store, Menara Chihkan, dan Kuil Konfusius Tainan — enam situs yang mencakup 400 tahun sejarah.', fil: 'Anping Old Street, Anping Tree House, Anping Fort, Hayashi Department Store, Chihkan Tower, at Tainan Confucius Temple — anim na lugar na sumasaklaw sa 400 taon ng kasaysayan.' },
    },
  ],
  'kaohsiung-port-art': [
    {
      q: { 'zh-TW': '高雄旗津怎麼去？需要包車嗎？', 'zh-CN': '高雄旗津怎么去？需要包车吗？', en: 'How do I get to Cijin Island in Kaohsiung?', ja: '高雄の旗津にはどう行きますか？チャーターカーは必要ですか？', ko: '가오슝 치진도는 어떻게 가나요? 전용차가 필요한가요?', th: 'ไปเกาะฉีจินเกาสงยังไง? ต้องเช่ารถเหมาไหม?', vi: 'Làm sao đến đảo Kỳ Tân ở Cao Hùng? Có cần thuê xe riêng không?', ms: 'Bagaimana untuk ke Pulau Cijin di Kaohsiung? Perlukah kereta sewa?', id: 'Bagaimana cara ke Pulau Cijin di Kaohsiung? Apakah perlu charter mobil?', fil: 'Paano pumunta sa Cijin Island sa Kaohsiung? Kailangan ba ng charter car?' },
      a: { 'zh-TW': '旗津需要搭渡輪（鼓山碼頭出發，5分鐘船程）。包車會送你到碼頭，逛完旗津搭渡輪回來後司機在鼓山接你，省去找路的麻煩。', 'zh-CN': '旗津需要搭渡轮（鼓山码头出发，5分钟船程）。包车会送你到码头，逛完旗津搭渡轮回来后司机在鼓山接你，省去找路的麻烦。', en: 'Cijin requires a ferry (5 min from Gushan Pier). Your charter driver drops you at the pier and picks you up when you return — no need to figure out transport on your own.', ja: '旗津へはフェリーが必要です（鼓山埠頭から5分）。チャーターカーのドライバーが埠頭まで送迎し、観光後にフェリーで戻ったら鼓山で迎えてくれます。', ko: '치진은 페리를 타야 합니다(구산 부두에서 5분). 전용차 기사가 부두까지 데려다주고, 관광 후 페리로 돌아오면 구산에서 픽업해줍니다.', th: 'ไปฉีจินต้องนั่งเรือข้ามฟาก (จากท่าเรือกู่ซาน 5 นาที) คนขับรถเหมาจะส่งที่ท่าเรือ เที่ยวเสร็จนั่งเรือกลับแล้วคนขับมารับที่กู่ซาน ไม่ต้องหาทางเอง', vi: 'Đến Kỳ Tân cần đi phà (5 phút từ bến Cổ Sơn). Tài xế xe riêng sẽ đưa bạn đến bến, tham quan xong đi phà về tài xế đón bạn tại Cổ Sơn — không cần tự tìm đường.', ms: 'Cijin memerlukan feri (5 min dari Jeti Gushan). Pemandu charter menghantar anda ke jeti dan menjemput anda apabila pulang — tidak perlu cari pengangkutan sendiri.', id: 'Cijin perlu naik feri (5 menit dari Dermaga Gushan). Pengemudi charter mengantar Anda ke dermaga dan menjemput saat kembali — tidak perlu cari transportasi sendiri.', fil: 'Kailangan ng ferry papuntang Cijin (5 min mula sa Gushan Pier). Ihahatid ka ng charter driver sa pier at susunduin ka pagbalik — hindi mo na kailangang mag-isip ng transportasyon.' },
    },
  ],
  'kaohsiung-mountain-heritage': [
    {
      q: { 'zh-TW': '佛光山需要門票嗎？', 'zh-CN': '佛光山需要门票吗？', en: 'Is there an entrance fee for Fo Guang Shan?', ja: '佛光山に入場料はかかりますか？', ko: '포광산 입장료가 있나요?', th: 'ฝอกวงซานเก็บค่าเข้าไหม?', vi: 'Phật Quang Sơn có tính phí vào cửa không?', ms: 'Adakah bayaran masuk ke Fo Guang Shan?', id: 'Apakah ada biaya masuk ke Fo Guang Shan?', fil: 'May entrance fee ba sa Fo Guang Shan?' },
      a: { 'zh-TW': '佛光山佛陀紀念館免費入場，但需遵守寺院禮儀 — 穿著不要太暴露、輕聲細語、拍照不用閃光燈。園區很大，建議安排至少2小時。', 'zh-CN': '佛光山佛陀纪念馆免费入场，但需遵守寺院礼仪 — 穿着不要太暴露、轻声细语、拍照不用闪光灯。园区很大，建议安排至少2小时。', en: 'Fo Guang Shan Buddha Memorial Center is free to enter. Follow temple etiquette — modest clothing, quiet voices, no flash photography. The campus is large; allow at least 2 hours.', ja: '佛光山佛陀紀念館は入場無料です。寺院のマナーを守りましょう — 露出の少ない服装、静かに話す、フラッシュ撮影禁止。敷地が広いので、少なくとも2時間は必要です。', ko: '포광산 불타기념관은 무료 입장입니다. 사찰 예절을 지켜주세요 — 단정한 복장, 조용한 목소리, 플래시 촬영 금지. 부지가 넓으니 최소 2시간은 잡으세요.', th: 'พิพิธภัณฑ์ฝอกวงซานเข้าชมฟรี แต่ต้องรักษามารยาทในวัด — แต่งกายสุภาพ พูดเบา ๆ ไม่ใช้แฟลชถ่ายรูป พื้นที่กว้างมาก ควรจัดเวลาอย่างน้อย 2 ชั่วโมง', vi: 'Bảo tàng Phật Quang Sơn miễn phí vào cửa. Hãy tuân thủ quy tắc chùa chiền — ăn mặc kín đáo, nói nhỏ, không dùng đèn flash. Khuôn viên rất rộng, nên dành ít nhất 2 giờ.', ms: 'Pusat Peringatan Buddha Fo Guang Shan percuma masuk. Ikut adab kuil — pakaian sopan, bercakap perlahan, tiada fotografi kilat. Kawasan sangat luas; peruntukkan sekurang-kurangnya 2 jam.', id: 'Pusat Peringatan Buddha Fo Guang Shan gratis masuk. Ikuti etika kuil — berpakaian sopan, bicara pelan, tanpa flash foto. Areanya sangat luas; siapkan minimal 2 jam.', fil: 'Libre ang pasok sa Fo Guang Shan Buddha Memorial Center. Sundin ang temple etiquette — maayos na damit, mahina ang boses, walang flash photography. Malaki ang campus; maglaan ng hindi bababa sa 2 oras.' },
    },
  ],
  'kenting-south': [
    {
      q: { 'zh-TW': '墾丁一日遊從哪裡出發？', 'zh-CN': '垦丁一日游从哪里出发？', en: 'Where does a Kenting day trip start from?', ja: '墾丁日帰りツアーはどこから出発しますか？', ko: '컨딩 당일치기 투어는 어디서 출발하나요?', th: 'ทริปวันเดียวเคินติงออกจากไหน?', vi: 'Tour trong ngày Khẩn Đinh khởi hành từ đâu?', ms: 'Dari manakah lawatan sehari Kenting bermula?', id: 'Dari mana tur sehari Kenting berangkat?', fil: 'Saan nagsisimula ang Kenting day trip?' },
      a: { 'zh-TW': '通常從高雄市區或高鐵左營站出發，車程約2小時。景點沿30公里海岸線分布，包車是最有效率的方式。', 'zh-CN': '通常从高雄市区或高铁左营站出发，车程约2小时。景点沿30公里海岸线分布，包车是最有效率的方式。', en: 'Usually from Kaohsiung city or HSR Zuoying Station, about 2 hours drive. Attractions span 30 km of coastline — a charter car is the most efficient way to cover them.', ja: '通常は高雄市内または高鉄左営駅から出発し、車で約2時間です。見どころが30kmの海岸線に沿って点在しており、チャーターカーが最も効率的です。', ko: '보통 가오슝 시내 또는 고속철도 좌영역에서 출발하며, 차로 약 2시간입니다. 명소가 30km 해안선을 따라 분포해 있어 전용차가 가장 효율적입니다.', th: 'ปกติออกจากตัวเมืองเกาสงหรือสถานีรถไฟความเร็วสูงจั่วอิ๋ง ใช้เวลาประมาณ 2 ชม. จุดท่องเที่ยวกระจายตามชายฝั่ง 30 กม. รถเหมาสะดวกที่สุด', vi: 'Thường khởi hành từ trung tâm Cao Hùng hoặc ga cao tốc Tả Doanh, khoảng 2 giờ lái xe. Các điểm tham quan trải dọc 30 km bờ biển — xe riêng là cách hiệu quả nhất.', ms: 'Biasanya dari bandar Kaohsiung atau Stesen HSR Zuoying, kira-kira 2 jam perjalanan. Tarikan merentasi 30 km pantai — kereta sewa adalah cara paling cekap.', id: 'Biasanya dari kota Kaohsiung atau Stasiun HSR Zuoying, sekitar 2 jam perjalanan. Tempat wisata tersebar sepanjang 30 km garis pantai — mobil charter adalah cara paling efisien.', fil: 'Karaniwang mula sa Kaohsiung city o HSR Zuoying Station, mga 2 oras na biyahe. Ang mga atraksyon ay nakakalat sa 30 km na baybayin — charter car ang pinaka-efficient na paraan.' },
    },
  ],
  'taroko-gorge': [
    {
      q: { 'zh-TW': '太魯閣一日遊夠嗎？', 'zh-CN': '太鲁阁一日游够吗？', en: 'Is one day enough for Taroko Gorge?', ja: '太魯閣は1日で足りますか？', ko: '타로코 협곡 당일치기로 충분한가요?', th: 'ไปทาโรโกะวันเดียวพอไหม?', vi: 'Đi hẻm núi Taroko một ngày có đủ không?', ms: 'Adakah sehari mencukupi untuk Taroko Gorge?', id: 'Apakah satu hari cukup untuk Ngarai Taroko?', fil: 'Sapat ba ang isang araw para sa Taroko Gorge?' },
      a: { 'zh-TW': '地震後太魯閣部分步道仍封閉（燕子口、長春祠步道等）。依 2026 年 6 月資訊，包車一日遊可以走1-2條開放中的步道（例如全線開放的得卡倫步道、需預約的九曲洞步道），再加上清水斷崖和七星潭。開放狀況會變動，出發前請先查太魯閣國家公園官網。花蓮市區到太魯閣車程約30-40分鐘。', 'zh-CN': '地震后太鲁阁部分步道仍封闭（燕子口、长春祠步道等）。根据2026年6月的信息，包车一日游可以走1-2条开放中的步道（例如全线开放的得卡伦步道、需预约的九曲洞步道），再加上清水断崖和七星潭。开放情况会变动，出发前请先查太鲁阁国家公园官网。花莲市区到太鲁阁车程约30-40分钟。', en: 'Some trails are still closed after the 2024 earthquake (including Swallow Grotto and the Changchun Shrine trail). As of June 2026, a charter day trip can include 1–2 open trails — such as the fully open Dekalun Trail or the Jiuqudong Trail (reservation required) — plus Qingshui Cliff and Qixingtan Beach. Conditions change, so check the Taroko National Park website before you go. About 30–40 min from Hualien city.', ja: '2024年の地震の影響で、燕子口や長春祠の遊歩道など一部は現在も閉鎖中です。2026年6月時点では、日帰りチャーターで開放中の遊歩道を1〜2本（全線開放の得卡倫歩道、予約制の九曲洞歩道など）歩き、清水断崖と七星潭を組み合わせるのがおすすめです。開放状況は変わるため、出発前に太魯閣国家公園の公式サイトをご確認ください。花蓮市内から約30〜40分です。', ko: '2024년 지진의 영향으로 옌쯔코우, 장춘사 산책로 등 일부 산책로가 아직 폐쇄되어 있습니다. 2026년 6월 기준, 당일 전용차 투어로 개방 중인 산책로 1~2곳(전 구간 개방된 더카룬 산책로, 예약제인 주취동 산책로 등)을 걷고 칭수이 단애와 치싱탄을 함께 둘러보는 일정을 추천합니다. 개방 상황이 바뀔 수 있으니 출발 전 타이루거 국립공원 공식 사이트를 확인하세요. 화롄 시내에서 약 30~40분.', th: 'หลังแผ่นดินไหวปี 2024 เส้นทางเดินบางส่วนยังปิดอยู่ (เช่น เยี่ยนจื่อโข่ว และเส้นทางศาลเจ้าฉางชุน) ข้อมูล ณ มิถุนายน 2026 เช่ารถเหมาวันเดียวเดินเส้นทางที่เปิดอยู่ได้ 1–2 เส้น (เช่น เส้นทางเต๋อข่าหลุนที่เปิดตลอดเส้นทาง หรือเส้นทางจิ่วชวีต้งที่ต้องจองล่วงหน้า) แล้วต่อด้วยหน้าผาชิงสุ่ยและหาดฉีซิงถาน สถานการณ์อาจเปลี่ยน ควรเช็กเว็บไซต์อุทยานแห่งชาติทาโรโกะก่อนไป จากตัวเมืองฮัวเหลียนประมาณ 30–40 นาที', vi: 'Sau trận động đất năm 2024, một số đường mòn vẫn đang đóng (như Yến Tử Khẩu và đường mòn Đền Trường Xuân). Theo thông tin tháng 6/2026, tour xe riêng trong ngày có thể đi 1–2 đường mòn đang mở (như đường mòn Dekalun mở toàn tuyến hoặc đường mòn Cửu Khúc Động cần đặt chỗ), kết hợp Vách đá Thanh Thủy và bãi biển Thất Tinh Đàm. Tình hình có thể thay đổi, hãy kiểm tra trang chính thức của Công viên Quốc gia Taroko trước khi đi. Từ thành phố Hoa Liên khoảng 30–40 phút.', ms: 'Sesetengah denai masih ditutup selepas gempa bumi 2024 (termasuk Yanzikou dan denai Kuil Changchun). Setakat Jun 2026, charter sehari boleh merangkumi 1–2 denai yang dibuka — seperti Denai Dekalun yang dibuka sepenuhnya atau Denai Jiuqudong (perlu tempahan) — serta Tebing Qingshui dan Pantai Qixingtan. Keadaan boleh berubah, jadi semak laman rasmi Taman Negara Taroko sebelum pergi. Kira-kira 30–40 minit dari bandar Hualien.', id: 'Beberapa jalur masih ditutup setelah gempa 2024 (termasuk Gua Walet/Yanzikou dan jalur Kuil Changchun). Per Juni 2026, charter sehari bisa mencakup 1–2 jalur yang buka — seperti Jalur Dekalun yang dibuka penuh atau Jalur Jiuqudong (wajib reservasi) — ditambah Tebing Qingshui dan Pantai Qixingtan. Kondisinya bisa berubah, jadi cek situs resmi Taman Nasional Taroko sebelum berangkat. Sekitar 30–40 menit dari kota Hualien.', fil: 'May ilang trail na sarado pa rin matapos ang lindol noong 2024 (kasama ang Swallow Grotto at ang Changchun Shrine trail). Noong Hunyo 2026, pwedeng isama sa charter day trip ang 1–2 bukas na trail — gaya ng Dekalun Trail na bukas nang buo o ng Jiuqudong Trail (kailangan ng reservation) — kasama ang Qingshui Cliff at Qixingtan Beach. Pwedeng magbago ang sitwasyon, kaya i-check ang website ng Taroko National Park bago pumunta. Mga 30–40 minuto mula Hualien city.' },
    },
  ],
  'north-coast': [
    {
      q: { 'zh-TW': '北海岸一日遊有哪些景點？', 'zh-CN': '北海岸一日游有哪些景点？', en: 'What are the highlights of a North Coast day trip?', ja: '北海岸日帰りツアーの見どころは何ですか？', ko: '북해안 일일 투어의 주요 명소는 무엇인가요?', th: 'ทริปวันเดียวชายฝั่งเหนือมีอะไรน่าเที่ยวบ้าง?', vi: 'Tour một ngày Bắc Hải Ngạn có những điểm nổi bật nào?', ms: 'Apakah tarikan utama lawatan sehari Pantai Utara?', id: 'Apa saja highlight tur sehari Pantai Utara?', fil: 'Ano ang mga highlight ng North Coast day trip?' },
      a: { 'zh-TW': '野柳地質公園（女王頭）、金山老街（鴨肉）、石門洞、富貴角燈塔（台灣最北端）、淡水老街看夕陽。包車8小時可以全部走完。', 'zh-CN': '野柳地质公园（女王头）、金山老街（鸭肉）、石门洞、富贵角灯塔（台湾最北端）、淡水老街看夕阳。包车8小时可以全部走完。', en: 'Yehliu Geopark (Queen\'s Head), Jinshan Old Street, Shimen Cave, Fugui Cape Lighthouse (Taiwan\'s northernmost point), and Tamsui sunset. An 8-hour charter covers them all.', ja: '野柳ジオパーク（女王頭）、金山老街、石門洞、富貴角灯台（台湾最北端）、淡水老街で夕日鑑賞。8時間チャーターですべて回れます。', ko: '예류 지질공원(여왕두), 진산 옛거리, 스먼동, 푸귀자오 등대(대만 최북단), 단수이 옛거리 석양 감상. 8시간 전용차로 모두 둘러볼 수 있습니다.', th: 'อุทยานธรณีเย่หลิ่ว (หินหัวราชินี) ถนนเก่าจินซาน ถ้ำสือเหมิน ประภาคารฟู่กุ้ย (จุดเหนือสุดของไต้หวัน) และชมพระอาทิตย์ตกที่ถนนเก่าตั้นสุ่ย เช่ารถ 8 ชม. เที่ยวครบ', vi: 'Công viên Địa chất Dã Liễu (Đầu Nữ Hoàng), Phố cổ Kim Sơn, Hang Thạch Môn, Hải đăng Phú Quý (cực Bắc Đài Loan), ngắm hoàng hôn Phố cổ Đạm Thủy. Xe riêng 8 giờ đi hết được.', ms: 'Geopark Yehliu (Queen\'s Head), Jalan Lama Jinshan, Gua Shimen, Rumah Api Fugui Cape (titik paling utara Taiwan), dan matahari terbenam Tamsui. Charter 8 jam meliputi semuanya.', id: 'Geopark Yehliu (Queen\'s Head), Jalan Lama Jinshan, Gua Shimen, Mercusuar Fugui Cape (titik paling utara Taiwan), dan matahari terbenam Tamsui. Charter 8 jam mencakup semuanya.', fil: 'Yehliu Geopark (Queen\'s Head), Jinshan Old Street, Shimen Cave, Fugui Cape Lighthouse (pinakanorteng punto ng Taiwan), at Tamsui sunset. Sakop lahat ng 8-oras na charter.' },
    },
  ],
  'taoyuan-daxi': [
    {
      q: { 'zh-TW': '桃園大溪有什麼好玩的？', 'zh-CN': '桃园大溪有什么好玩的？', en: 'What is there to do in Taoyuan Daxi?', ja: '桃園の大渓にはどんな見どころがありますか？', ko: '타오위안 다시에는 뭐가 있나요?', th: 'ต้าซีเถาหยวนมีอะไรน่าเที่ยว?', vi: 'Đào Viên Đại Khê có gì hay?', ms: 'Apakah yang menarik di Taoyuan Daxi?', id: 'Apa yang menarik di Taoyuan Daxi?', fil: 'Ano ang mga magagawa sa Taoyuan Daxi?' },
      a: { 'zh-TW': '大溪老街的巴洛克建築和豆干是必訪，石門水庫吃活魚也是經典。慈湖和角板山公車很少到，包車才方便。', 'zh-CN': '大溪老街的巴洛克建筑和豆干是必访，石门水库吃活鱼也是经典。慈湖和角板山公车很少到，包车才方便。', en: 'Daxi Old Street\'s baroque architecture and dried tofu are must-visits, plus fresh fish at Shimen Reservoir. Cihu and Jiaobanshan have very limited bus service — charter car is the practical choice.', ja: '大渓老街のバロック建築と豆干は必見、石門ダムの活魚料理も名物です。慈湖と角板山はバスがほとんどないため、チャーターカーが便利です。', ko: '다시 옛거리의 바로크 건축과 두부 간식은 필수 방문, 스먼 저수지의 활어 요리도 명물입니다. 츠후와 자오반산은 버스가 거의 없어 전용차가 편리합니다.', th: 'สถาปัตยกรรมบาโรกและเต้าหู้แผ่นที่ถนนเก่าต้าซีต้องไป กินปลาสดที่เขื่อนสือเหมินก็คลาสสิก ฉือหูและเจียวป่านซานรถเมล์แทบไม่มี เช่ารถเหมาสะดวกกว่า', vi: 'Kiến trúc Baroque và đậu phụ khô ở Phố cổ Đại Khê là điểm phải ghé, cá tươi ở Hồ chứa Thạch Môn cũng là đặc sản. Từ Hồ và Giác Bản Sơn xe buýt rất ít — thuê xe riêng mới tiện.', ms: 'Seni bina barok dan tauhu kering di Jalan Lama Daxi wajib dilawati, serta ikan segar di Empangan Shimen. Cihu dan Jiaobanshan mempunyai perkhidmatan bas yang sangat terhad — kereta sewa adalah pilihan praktikal.', id: 'Arsitektur barok dan tahu kering di Jalan Lama Daxi wajib dikunjungi, plus ikan segar di Waduk Shimen. Cihu dan Jiaobanshan layanan busnya sangat terbatas — mobil charter adalah pilihan praktis.', fil: 'Ang baroque architecture at dried tofu sa Daxi Old Street ay must-visit, pati na rin ang fresh fish sa Shimen Reservoir. Ang Cihu at Jiaobanshan ay halos walang bus service — charter car ang praktikal na pagpipilian.' },
    },
  ],
};

function guideFaqJsonLd(slug: string, locale: Locale) {
  const faqs = GUIDE_FAQS[slug];
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q[locale] || faq.q['zh-TW'] || faq.q['en'] || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a[locale] || faq.a['zh-TW'] || faq.a['en'] || '',
      },
    })),
  };
}

function breadcrumbJsonLd(title: string, slug: string, langPrefix: string, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB_GUIDES[locale], item: `https://relaygo.pro${langPrefix}/guides` },
      { '@type': 'ListItem', position: 3, name: title, item: `https://relaygo.pro${langPrefix}/guide/${slug}` },
    ],
  };
}

export default async function GuidePage({ params }: Props) {
  const locale = resolveLocale(params.lang);
  const [guide, allGuides] = await Promise.all([
    getGuideBySlug(params.slug),
    getPublishedGuides(),
  ]);
  if (!guide) notFound();

  const relatedGuides = allGuides.filter((g) => g.slug !== params.slug).slice(0, 3);
  const title = guide.title[locale] || guide.title['zh-TW'] || guide.title['en'] || '';
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const faqLd = guideFaqJsonLd(params.slug, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(title, params.slug, langPrefix, locale)) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <GuideContent guide={guide} initialLang={locale} relatedGuides={relatedGuides} />
    </>
  );
}
