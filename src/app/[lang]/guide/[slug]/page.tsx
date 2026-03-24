import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs, getPublishedGuides } from '@/lib/supabase';
import GuideContent from './GuideContent';
import { resolveLocale, localePathMap, locales, type Locale } from '@/lib/i18n-config';

interface Props {
  params: { lang: string; slug: string };
}

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
      '包車旅遊', '台灣包車', '台灣美食', '台灣小吃', '台灣自由行', '背包客', '大眾運輸', '台灣一日遊', title,
      ...(guide.tags || []),
    ].join(', '),
    openGraph: {
      title: `${title} | RelayGo`,
      description,
      type: 'article',
      url: canonical,
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
    touristType: '包車旅遊',
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
    { q: { 'zh-TW': '台北經典一日遊包含哪些景點？', en: 'What does the Taipei Classics day trip include?' }, a: { 'zh-TW': '中正紀念堂（儀隊交接）、永康街（鼎泰豐小籠包）、故宮博物院（翠玉白菜）、台北101觀景台，四大地標一天走完。', en: 'CKS Memorial Hall (guard change), Yongkang Street (Din Tai Fung), National Palace Museum (Jadeite Cabbage), and Taipei 101 observatory — four iconic landmarks in one day.' } },
    { q: { 'zh-TW': '故宮博物院要逛多久？', en: 'How long should I spend at the National Palace Museum?' }, a: { 'zh-TW': '建議至少1.5-2小時。翠玉白菜、肉形石和毛公鼎是必看三寶，認真逛可以半天。', en: 'Allow at least 1.5-2 hours. The Jadeite Cabbage, Meat-shaped Stone, and Mao Gong Ding are the must-see top three.' } },
  ],
  'taipei-jiufen-shifen': [
    { q: { 'zh-TW': '台北到九份包車要多久？', en: 'How long from Taipei to Jiufen by charter car?' }, a: { 'zh-TW': '台北市區到九份車程約1小時。一日遊通常搭配十分天燈、黃金瀑布、陰陽海，整趟約8小時。', en: 'About 1 hour from central Taipei. A day trip typically includes Shifen sky lanterns, Golden Waterfall, and Yin-Yang Sea — around 8 hours total.' } },
    { q: { 'zh-TW': '九份什麼時候去最美？', en: 'When is the best time to visit Jiufen?' }, a: { 'zh-TW': '傍晚16:30-17:30燈籠亮起時最有氛圍。秋冬（10-12月）山城雲霧繚繞特別美，平日人潮也比較少。', en: 'Late afternoon (4:30-5:30 PM) when the lanterns light up. Autumn/winter (Oct-Dec) brings atmospheric mountain mist with fewer crowds on weekdays.' } },
  ],
  'yehliu-shifen-jiufen': [
    { q: { 'zh-TW': '野柳十分九份一天走得完嗎？', en: 'Can I visit Yehliu, Shifen, and Jiufen in one day?' }, a: { 'zh-TW': '包車可以。三個景點車程串連很順，8小時行程綽綽有餘。搭大眾運輸需要轉乘3-4次，行程會比較趕。', en: 'By charter car, absolutely — the three spots connect smoothly in an 8-hour itinerary. By public transit, it requires 3-4 transfers and is quite rushed.' } },
  ],
  'yangmingshan': [
    { q: { 'zh-TW': '陽明山什麼時候花最多？', en: 'When are the best flower seasons at Yangmingshan?' }, a: { 'zh-TW': '2-3月海芋季（竹子湖）、5-6月繡球花季最受歡迎。櫻花約在1-2月。花季期間假日人非常多，建議平日前往。', en: 'Calla lilies in Feb-Mar (Zhuzihu) and hydrangeas in May-Jun are the most popular. Cherry blossoms bloom Jan-Feb. Weekdays are much less crowded during flower season.' } },
  ],
  'yilan': [
    { q: { 'zh-TW': '台北到宜蘭包車要多久？', en: 'How long from Taipei to Yilan by charter car?' }, a: { 'zh-TW': '走雪山隧道約45分鐘。宜蘭一日遊包含礁溪溫泉、傳藝中心、羅東夜市，行程約10小時。', en: 'About 45 minutes via the Xueshan Tunnel. A Yilan day trip includes Jiaoxi hot springs, traditional arts center, and Luodong Night Market — around 10 hours.' } },
  ],
  'alishan-forest': [
    { q: { 'zh-TW': '阿里山一日遊來得及嗎？', en: 'Is a one-day trip to Alishan enough?' }, a: { 'zh-TW': '一日包車（10小時）可以走完奮起湖老街＋阿里山森林園區主要步道。但如果想看日出，必須住一晚，清晨4:30搭祝山線小火車是最經典的體驗。', en: 'A one-day charter (10 hours) covers Fenqihu and the main forest trails. To see the famous sunrise, you must stay overnight — the 4:30 AM Zhushan Line train is Alishan\'s signature experience.' } },
  ],
  'sun-moon-lake': [
    { q: { 'zh-TW': '日月潭一日遊包車從哪裡出發？', en: 'Where does a Sun Moon Lake charter day trip start from?' }, a: { 'zh-TW': '通常從台中市區或高鐵台中站出發，車程約1.5小時。可以環湖搭船、騎自行車，還能搭配附近的清境農場（需兩天一夜）。', en: 'Usually from Taichung city or HSR Taichung Station, about 1.5 hours drive. You can boat around the lake, cycle, or combine with Cingjing Farm (requires overnight).' } },
  ],
  'tainan-salt-coast': [
    { q: { 'zh-TW': '台南鹽田什麼時候去最美？', en: 'When is the best time to visit Tainan salt fields?' }, a: { 'zh-TW': '傍晚日落前30分鐘最美 — 整片鹽田變成鏡面，倒映火燒雲的夕陽。10-3月天氣最舒適，夏天非常曬。', en: 'About 30 minutes before sunset is most beautiful — the entire salt field becomes a mirror reflecting the blazing sky. Oct-Mar has the most comfortable weather; summer is extremely hot.' } },
  ],
  'tainan-heritage': [
    { q: { 'zh-TW': '台南古蹟一日遊包含哪些景點？', en: 'What does the Tainan Heritage day trip include?' }, a: { 'zh-TW': '安平老街、安平樹屋、安平古堡、林百貨、赤崁樓、台南孔廟，六個景點串連四百年府城歷史。', en: 'Anping Old Street, Anping Tree House, Anping Fort, Hayashi Department Store, Chihkan Tower, and Tainan Confucius Temple — six sites spanning 400 years of history.' } },
  ],
  'kaohsiung-port-art': [
    { q: { 'zh-TW': '高雄旗津怎麼去？需要包車嗎？', en: 'How do I get to Cijin Island in Kaohsiung?' }, a: { 'zh-TW': '旗津需要搭渡輪（鼓山碼頭出發，5分鐘船程）。包車會送你到碼頭，逛完旗津搭渡輪回來後司機在鼓山接你，省去找路的麻煩。', en: 'Cijin requires a ferry (5 min from Gushan Pier). Your charter driver drops you at the pier and picks you up when you return — no need to figure out transport on your own.' } },
  ],
  'kaohsiung-mountain-heritage': [
    { q: { 'zh-TW': '佛光山需要門票嗎？', en: 'Is there an entrance fee for Fo Guang Shan?' }, a: { 'zh-TW': '佛光山佛陀紀念館免費入場，但需遵守寺院禮儀 — 穿著不要太暴露、輕聲細語、拍照不用閃光燈。園區很大，建議安排至少2小時。', en: 'Fo Guang Shan Buddha Memorial Center is free to enter. Follow temple etiquette — modest clothing, quiet voices, no flash photography. The campus is large; allow at least 2 hours.' } },
  ],
  'kenting-south': [
    { q: { 'zh-TW': '墾丁一日遊從哪裡出發？', en: 'Where does a Kenting day trip start from?' }, a: { 'zh-TW': '通常從高雄市區或高鐵左營站出發，車程約2小時。景點沿30公里海岸線分布，包車是最有效率的方式。', en: 'Usually from Kaohsiung city or HSR Zuoying Station, about 2 hours drive. Attractions span 30 km of coastline — a charter car is the most efficient way to cover them.' } },
  ],
  'taroko-gorge': [
    { q: { 'zh-TW': '太魯閣一日遊夠嗎？', en: 'Is one day enough for Taroko Gorge?' }, a: { 'zh-TW': '包車一日遊可以走2-3條步道（砂卡礑、燕子口、白楊），但峽谷全長20公里，認真玩建議兩天。從花蓮市區到太魯閣車程約40分鐘。', en: 'A charter day trip covers 2-3 trails (Shakadang, Swallow Grotto, Baiyang), but the gorge stretches 20 km — serious hikers should consider 2 days. About 40 min from Hualien city.' } },
  ],
  'north-coast': [
    { q: { 'zh-TW': '北海岸一日遊有哪些景點？', en: 'What are the highlights of a North Coast day trip?' }, a: { 'zh-TW': '野柳地質公園（女王頭）、金山老街（鴨肉）、石門洞、富貴角燈塔（台灣最北端）、淡水老街看夕陽。包車8小時可以全部走完。', en: 'Yehliu Geopark (Queen\'s Head), Jinshan Old Street, Shimen Cave, Fugui Cape Lighthouse (Taiwan\'s northernmost point), and Tamsui sunset. An 8-hour charter covers them all.' } },
  ],
  'taoyuan-daxi': [
    { q: { 'zh-TW': '桃園大溪有什麼好玩的？', en: 'What is there to do in Taoyuan Daxi?' }, a: { 'zh-TW': '大溪老街的巴洛克建築和豆干是必訪，石門水庫吃活魚也是經典。慈湖和角板山公車很少到，包車才方便。', en: 'Daxi Old Street\'s baroque architecture and dried tofu are must-visits, plus fresh fish at Shimen Reservoir. Cihu and Jiaobanshan have very limited bus service — charter car is the practical choice.' } },
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

function breadcrumbJsonLd(title: string, slug: string, langPrefix: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RelayGo', item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: '包車攻略', item: `https://relaygo.pro${langPrefix}/guides` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(title, params.slug, langPrefix)) }}
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
