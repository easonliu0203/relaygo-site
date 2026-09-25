import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import './guide/[slug]/guide.css';
import './faq/faq.css';
import './bookmarks/bookmarks.css';
import {
  locales,
  localePathMap,
  resolveLocale,
  htmlLang,
  type Locale,
} from '@/lib/i18n-config';
import { LANG_TITLES } from '@/lib/i18n';
import { ogImage } from '@/lib/og';
import { AIRPORT_NAMES, VEHICLE_NAMES } from './pricing/pricing-i18n';

interface Props {
  params: { lang: string };
  children: React.ReactNode;
}

const LOCALE_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  'zh-CN': 'RelayGo 提供专业包车服务，安全可靠的司机、即时追踪、多元支付方式。立即下载 App 开始预约！',
  en: 'Book a private car with driver in Taiwan: Taoyuan Airport (TPE) transfers to Taipei, and day tours to Jiufen, Sun Moon Lake, Taroko and more. Fixed prices with tolls and fuel included, English app with auto-translated driver chat.',
  ja: 'RelayGoは、台湾の空港送迎と貸切チャーターを日本語アプリで予約できるサービスです。ドライバーとのチャットは自動で日本語に翻訳。料金は予約時に確定し、高速代・ガソリン代込み。九份や日月潭など人気ルートの貸切観光にも対応します。',
  ko: '대만 택시투어・공항 픽업을 한국어 앱으로 예약하세요. 타오위안 공항↔타이베이 픽업, 예스진지(예류・스펀・지우펀・진과스)・르웨탄・타로코 일일투어까지. 통행료・유류비 포함 확정 요금, 기사님과의 채팅은 한국어로 자동 번역됩니다.',
  th: 'RelayGo ให้บริการรถเหมามืออาชีพในไต้หวัน คนขับปลอดภัย ติดตามแบบเรียลไทม์ หลายช่องทางชำระเงิน ดาวน์โหลดแอปเพื่อจองเลย!',
  vi: 'RelayGo cung cấp dịch vụ thuê xe riêng chuyên nghiệp tại Đài Loan. Tài xế an toàn, theo dõi thời gian thực, nhiều phương thức thanh toán. Tải ứng dụng để đặt xe ngay!',
  ms: 'RelayGo menawarkan perkhidmatan sewa kenderaan profesional di Taiwan. Pemandu selamat, penjejakan masa nyata, pelbagai kaedah pembayaran. Muat turun aplikasi untuk menempah sekarang!',
  id: 'RelayGo menyediakan layanan sewa mobil profesional di Taiwan. Pengemudi aman, pelacakan real-time, berbagai metode pembayaran. Unduh aplikasi untuk memesan sekarang!',
  fil: 'Nag-aalok ang RelayGo ng propesyonal na serbisyo ng charter car sa Taiwan. Ligtas na driver, real-time na pagsubaybay, iba\'t ibang paraan ng pagbabayad. I-download ang app para mag-book ngayon!',
};

const LOCALE_KEYWORDS: Record<Locale, string> = {
  'zh-TW': 'RelayGo, 台灣包車, 機場接送, 包車旅遊, 台灣自由行, 台灣自由行攻略, 台灣背包客, 背包客行程, 台灣美食, 台灣小吃, 台灣夜市, 九份美食, 九份老街美食, 台北包車, 九份包車, 日月潭包車, 太魯閣包車, 墾丁包車, 阿里山包車, 桃園機場接送, 松山機場接送, 台灣自由行包車, 大眾運輸自由行, 台灣火車旅行, 平溪線, 台灣一日遊, 親子旅遊台灣, 專業司機, 即時追蹤',
  'zh-CN': 'RelayGo, 台湾包车, 机场接送, 包车旅游, 台湾自由行, 台湾自由行攻略, 台湾背包客, 台湾美食, 台湾小吃, 台湾夜市, 九份美食, 台湾自由行包车, 台北包车, 九份包车, 日月潭包车, 太鲁阁包车, 垦丁包车, 桃园机场接送, 包车价格, 专业司机, 台湾一日游包车, 大众运输自由行, 台湾火车旅行, 亲子游台湾',
  en: 'RelayGo, Taiwan private driver, Taiwan private car charter, Taiwan chauffeur service, Taipei private driver, Taipei private tour, Taoyuan airport transfer, Taoyuan airport to Taipei, Taipei airport taxi, TPE airport pickup, Jiufen private tour, Yehliu Jiufen Shifen tour, Taiwan airport transfer, Taiwan independent travel, Taiwan backpacking, Taiwan budget travel, Taiwan food tour, Taiwan street food, Taiwan night market, Taiwan local cuisine, Taipei private driver, Taiwan car rental with driver, Jiufen food guide, Jiufen private tour, Sun Moon Lake day trip, Taroko Gorge tour, Taoyuan airport pickup, Taiwan day tour, Taiwan public transit guide, Taiwan train travel, Pingxi Line, Taiwan family trip, private sightseeing car Taiwan',
  ja: 'RelayGo, 台湾 貸切タクシー, 台湾 チャーター車, 台湾 観光タクシー, 台北 貸切タクシー, 九份 貸切タクシー, 九份 タクシー, 桃園空港 台北 移動, 桃園空港 送迎, 台湾 空港送迎 日本語, 台湾 日本語 ドライバー, 野柳 九份 十分 ツアー, 日月潭 日帰り,台湾 自由旅行, 台湾 バックパッカー, 台湾 一人旅, 台湾 グルメ, 台湾 屋台, 台湾 夜市, 九份 グルメ, 空港送迎 台湾, 台北 貸切車, 九份 タクシー チャーター, 日月潭 ツアー, 太魯閣 ツアー, 桃園空港 送迎, 台湾 ドライバー付き, 台湾 専用車 予約, 台湾 電車旅行, 平渓線, 台湾 家族旅行',
  ko: 'RelayGo, 대만 택시투어, 예스진지 택시투어, 예스진지 투어, 지우펀 택시투어, 타이베이 택시투어, 대만 공항픽업, 타오위안 공항 픽업, 타오위안 공항 타이베이, 대만 차량 대절, 대만 한국어 기사, 르웨탄 택시투어, 화롄 타로코 투어, 대만 전용차량 투어,대만 자유여행, 대만 배낭여행, 대만 맛집, 대만 길거리음식, 대만 야시장, 지우펀 맛집, 대만 공항 픽업, 지우펀 택시투어, 대만 프라이빗 차량, 르웨탄 투어, 타로코 투어, 타오위안 공항 픽업, 대만 일일투어, 대만 차량 예약, 대만 대중교통, 대만 기차여행, 핑시선, 대만 가족여행',
  th: 'RelayGo, เช่ารถพร้อมคนขับ ไต้หวัน, รถเช่าส่วนตัว ไต้หวัน, เที่ยวไต้หวันด้วยตัวเอง, แบกเป้เที่ยว ไต้หวัน, อาหารไต้หวัน, อาหารข้างทาง ไต้หวัน, ตลาดกลางคืน ไต้หวัน, รับส่งสนามบิน ไต้หวัน, ทัวร์ส่วนตัว ไต้หวัน, ทัวร์จิ่วเฟิ่น, ทัวร์ทะเลสาบสุริยันจันทรา, ทัวร์อุทยานทาโรโกะ, รถรับส่งสนามบินเถาหยวน, จองรถ ไต้หวัน, ขนส่งสาธารณะ ไต้หวัน, เที่ยวไต้หวันกับครอบครัว',
  vi: 'RelayGo, thuê xe riêng Đài Loan, đưa đón sân bay Đài Loan, du lịch tự túc Đài Loan, du lịch bụi Đài Loan, ẩm thực Đài Loan, món ăn đường phố Đài Loan, chợ đêm Đài Loan, thuê xe có tài xế Đài Loan, tour Cửu Phần, tour Hồ Nhật Nguyệt, tour Thái Lỗ Các, đón sân bay Đào Viên, xe riêng Đài Bắc, tour một ngày Đài Loan, phương tiện công cộng Đài Loan, du lịch gia đình Đài Loan',
  ms: 'RelayGo, sewa kereta dengan pemandu Taiwan, pindahan lapangan terbang Taiwan, melancong sendiri Taiwan, backpacking Taiwan, makanan Taiwan, makanan jalanan Taiwan, pasar malam Taiwan, kereta sewa peribadi Taiwan, lawatan Jiufen, lawatan Tasik Matahari Bulan, lawatan Taroko, pengambilan lapangan terbang Taoyuan, kereta sewa harian Taiwan, pengangkutan awam Taiwan, percutian keluarga Taiwan',
  id: 'RelayGo, sewa mobil dengan sopir Taiwan, antar jemput bandara Taiwan, wisata mandiri Taiwan, backpacking Taiwan, kuliner Taiwan, jajanan kaki lima Taiwan, pasar malam Taiwan, sewa mobil pribadi Taiwan, tur Jiufen, tur Danau Matahari Bulan, tur Taroko, penjemputan bandara Taoyuan, sopir pribadi Taiwan, wisata Taiwan, transportasi umum Taiwan, wisata keluarga Taiwan',
  fil: 'RelayGo, Taiwan private car, Taiwan airport transfer, Taiwan independent travel, Taiwan backpacking, Taiwan food tour, Taiwan street food, Taiwan night market, Taiwan tour package, Jiufen tour, Sun Moon Lake tour, Taroko tour, Taoyuan airport pickup, Taiwan day tour from Philippines, Taiwan public transit guide, Taiwan family trip',
};

const OG_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
  'zh-CN': '安全可靠的专业包车服务，即时追踪、多元支付、AI 旅游规划',
  en: 'Taiwan private driver & airport transfer — fixed prices, English app, auto-translated driver chat',
  ja: '日本語アプリで予約、ドライバーとは自動翻訳チャット。台湾の空港送迎・貸切チャーターならRelayGo',
  ko: '대만 택시투어・공항 픽업 — 한국어 앱 예약, 확정 요금, 기사님 채팅 자동 번역',
  th: 'บริการรถเหมาปลอดภัยและเชื่อถือได้ ติดตามแบบเรียลไทม์ หลายช่องทางชำระเงิน และ AI วางแผนเที่ยว',
  vi: 'Dịch vụ xe riêng an toàn và đáng tin cậy, theo dõi thời gian thực, nhiều phương thức thanh toán & AI lên kế hoạch du lịch',
  ms: 'Perkhidmatan sewa kenderaan selamat & boleh dipercayai dengan penjejakan masa nyata, pelbagai kaedah pembayaran & perancangan perjalanan AI',
  id: 'Layanan sewa mobil aman & terpercaya dengan pelacakan real-time, berbagai metode pembayaran & perencanaan wisata AI',
  fil: 'Ligtas at mapagkakatiwalaang serbisyo ng charter car na may real-time na pagsubaybay, iba\'t ibang paraan ng pagbabayad at AI travel planning',
};

function buildAlternates(path: string = '') {
  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro${path || '/'}` };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    const url = seg ? `https://relaygo.pro/${seg}${path}` : `https://relaygo.pro${path || '/'}`;
    languages[locale] = url;
  }
  return languages;
}

export async function generateStaticParams() {
  return locales.map((lang) => {
    const seg = localePathMap[lang];
    return { lang: seg || lang };
  });
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const title = LANG_TITLES[locale] || LANG_TITLES['zh-TW'];
  const description = LOCALE_DESCRIPTIONS[locale];
  const ogDesc = OG_DESCRIPTIONS[locale];
  const seg = localePathMap[locale];
  // No trailing slash on locale homes: /ja/ 308-redirects to /ja, and hreflang
  // + sitemap already use /ja — a slashed canonical sent Google mixed signals.
  const canonical = seg ? `https://relaygo.pro/${seg}` : 'https://relaygo.pro/';

  return {
    title,
    description,
    keywords: LOCALE_KEYWORDS[locale] || LOCALE_KEYWORDS['zh-TW'],
    openGraph: {
      title,
      description: ogDesc,
      type: 'website',
      url: canonical,
      siteName: 'RelayGo',
      locale: locale.replace('-', '_'),
      images: [ogImage(locale, title)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDesc,
      images: [ogImage(locale).url],
    },
    metadataBase: new URL('https://relaygo.pro'),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical,
      languages: buildAlternates(),
    },
    other: {
      'agd-partner-manual-verification': '',
    },
  };
}

// Organization offer catalog, worded per locale so /en, /ja, /ko … don't ship
// Chinese-only service names in their structured data.
const SVC: Record<'airport' | 'charter' | 'charter8h' | 'business' | 'trip' | 'hours8', Record<Locale, string>> = {
  airport: {
    'zh-TW': '機場接送', 'zh-CN': '机场接送', en: 'Airport Transfer', ja: '空港送迎', ko: '공항 픽업',
    th: 'รับส่งสนามบิน', vi: 'Đưa đón sân bay', ms: 'Pindahan Lapangan Terbang', id: 'Antar Jemput Bandara', fil: 'Airport Transfer',
  },
  charter: {
    'zh-TW': '包車旅遊', 'zh-CN': '包车旅游', en: 'Private Car Charter Tour', ja: '貸切チャーター観光', ko: '대만 택시투어',
    th: 'ทัวร์เหมารถส่วนตัว', vi: 'Tour xe riêng có tài xế', ms: 'Lawatan Kereta Sewa dengan Pemandu', id: 'Tur Sewa Mobil dengan Sopir', fil: 'Private Car Charter Tour',
  },
  charter8h: {
    'zh-TW': '8 小時包車旅遊', 'zh-CN': '8 小时包车旅游', en: '8-Hour Private Driver Day Tour', ja: '8時間 貸切タクシー観光', ko: '8시간 택시투어',
    th: 'เหมารถพร้อมคนขับ 8 ชั่วโมง', vi: 'Thuê xe riêng có tài xế 8 giờ', ms: 'Sewa Kereta dengan Pemandu 8 Jam', id: 'Sewa Mobil dengan Sopir 8 Jam', fil: '8-Oras na Private Car Tour',
  },
  business: {
    'zh-TW': '商務用車', 'zh-CN': '商务用车', en: 'Business Transportation', ja: 'ビジネス送迎', ko: '비즈니스 차량',
    th: 'รถรับส่งเพื่อธุรกิจ', vi: 'Xe đưa đón doanh nghiệp', ms: 'Pengangkutan Korporat', id: 'Transportasi Bisnis', fil: 'Business Transportation',
  },
  trip: {
    'zh-TW': '趟', 'zh-CN': '趟', en: 'one way', ja: '片道', ko: '편도',
    th: 'เที่ยว', vi: 'một chiều', ms: 'sehala', id: 'sekali jalan', fil: 'one way',
  },
  hours8: {
    'zh-TW': '8 小時', 'zh-CN': '8 小时', en: '8 hours', ja: '8時間', ko: '8시간',
    th: '8 ชั่วโมง', vi: '8 giờ', ms: '8 jam', id: '8 jam', fil: '8 oras',
  },
};

function serviceTypes(locale: Locale) {
  const own = [SVC.airport[locale], SVC.charter[locale], SVC.business[locale]];
  const en = [SVC.airport.en, SVC.charter.en, SVC.business.en];
  return Array.from(new Set([...own, ...en]));
}

function offerCatalog(locale: Locale) {
  const airportOffer = (code: 'tpe' | 'tsa' | 'rmq' | 'khh', price: string) => {
    const name = `${AIRPORT_NAMES[code][locale]} ${SVC.airport[locale]}`;
    return {
      '@type': 'Offer',
      name,
      priceCurrency: 'TWD',
      price,
      priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'TWD', unitText: SVC.trip[locale] },
      itemOffered: { '@type': 'Service', name, areaServed: 'Taiwan' },
    };
  };
  const charterOffer = (vehicle: 'S' | 'M' | 'L', price: string) => {
    const name = `${SVC.charter8h[locale]} — ${VEHICLE_NAMES[vehicle][locale]}`;
    return {
      '@type': 'Offer',
      name,
      priceCurrency: 'TWD',
      price,
      priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'TWD', unitText: SVC.hours8[locale] },
      itemOffered: { '@type': 'Service', name, areaServed: 'Taiwan' },
    };
  };
  return {
    '@type': 'OfferCatalog',
    name: `RelayGo — ${SVC.airport[locale]} / ${SVC.charter[locale]}`,
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: SVC.airport[locale],
        itemListElement: [
          airportOffer('tpe', '1000'),
          airportOffer('tsa', '900'),
          airportOffer('rmq', '3700'),
          airportOffer('khh', '7200'),
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: SVC.charter[locale],
        itemListElement: [charterOffer('S', '3900'), charterOffer('M', '4500'), charterOffer('L', '7500')],
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: SVC.business[locale], areaServed: 'Taiwan' },
      },
    ],
  };
}

// Only the CJK family the page's language actually uses (see globals.css
// html[lang] rules). Requesting all four made the render-blocking font CSS
// ~470 KB gzipped on every page; one family is ~95 KB, none is a few KB.
const CJK_FONT: Partial<Record<Locale, string>> = {
  'zh-TW': 'Noto+Sans+TC',
  'zh-CN': 'Noto+Sans+SC',
  ja: 'Noto+Sans+JP',
  ko: 'Noto+Sans+KR',
};

function fontsHref(locale: Locale) {
  const cjk = CJK_FONT[locale];
  return (
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800' +
    (cjk ? `&family=${cjk}:wght@400;500;700;900` : '') +
    '&display=swap'
  );
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function LangLayout({ children, params }: Props) {
  const locale = resolveLocale(params.lang);
  const orgDesc = OG_DESCRIPTIONS[locale];

  return (
    <html lang={htmlLang(locale)}>
      <head>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={fontsHref(locale)}
          rel="stylesheet"
        />
      </head>
      <body>
        {/* WebSite JSON-LD — binds the domain to the brand name + alternateName,
            reinforces "relaygo" and "Relay Go" both as the same entity. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://relaygo.pro/#website',
              url: 'https://relaygo.pro',
              name: 'RelayGo',
              alternateName: ['Relay Go', 'relaygo', 'RELAYGO', 'relaygo.pro'],
              inLanguage: locale,
              publisher: { '@id': 'https://relaygo.pro/#organization' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://relaygo.pro/#organization',
              name: 'RelayGo',
              // Tell Google these are all the same brand — fixes "relaygo" (no space) not matching
              alternateName: ['Relay Go', 'relaygo', 'RELAYGO', 'relaygo.pro'],
              legalName: 'RelayGo',
              url: 'https://relaygo.pro',
              logo: 'https://relaygo.pro/icon-192.png', // square brand mark (Google: >=112px); og-image is a 1200x630 photo
              description: orgDesc,
              foundingDate: '2024',
              areaServed: {
                '@type': 'Country',
                name: 'Taiwan',
              },
              knowsLanguage: ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'th', 'vi', 'ms', 'id', 'fil'],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'support@relaygo.pro',
                areaServed: 'TW',
                availableLanguage: ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'th', 'vi', 'ms', 'id', 'fil'],
              },
              serviceType: serviceTypes(locale),
              hasOfferCatalog: offerCatalog(locale),
              sameAs: [
                'https://apps.apple.com/tw/app/relay-go/id6756459981',
                'https://play.google.com/store/apps/details?id=com.relaygo.customer',
                'https://www.instagram.com/relaygo.official',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
