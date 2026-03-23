import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import './guide/[slug]/guide.css';
import './faq/faq.css';
import {
  locales,
  localePathMap,
  resolveLocale,
  htmlLang,
  type Locale,
} from '@/lib/i18n-config';
import { LANG_TITLES } from '@/lib/i18n';

interface Props {
  params: { lang: string };
  children: React.ReactNode;
}

const LOCALE_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  'zh-CN': 'RelayGo 提供专业包车服务，安全可靠的司机、即时追踪、多元支付方式。立即下载 App 开始预约！',
  en: 'RelayGo offers professional charter car service in Taiwan. Safe drivers, real-time tracking, multiple payment options. Download the app to book now!',
  ja: 'RelayGoは台湾の専門チャーターサービスです。安全なドライバー、リアルタイム追跡、多様な決済方法。アプリをダウンロードして予約しましょう！',
  ko: 'RelayGo는 대만 전문 차터 서비스입니다. 안전한 기사, 실시간 추적, 다양한 결제 방식. 앱을 다운로드하여 예약하세요!',
  th: 'RelayGo ให้บริการรถเหมามืออาชีพในไต้หวัน คนขับปลอดภัย ติดตามแบบเรียลไทม์ หลายช่องทางชำระเงิน ดาวน์โหลดแอปเพื่อจองเลย!',
  vi: 'RelayGo cung cấp dịch vụ thuê xe riêng chuyên nghiệp tại Đài Loan. Tài xế an toàn, theo dõi thời gian thực, nhiều phương thức thanh toán. Tải ứng dụng để đặt xe ngay!',
  ms: 'RelayGo menawarkan perkhidmatan sewa kenderaan profesional di Taiwan. Pemandu selamat, penjejakan masa nyata, pelbagai kaedah pembayaran. Muat turun aplikasi untuk menempah sekarang!',
  id: 'RelayGo menyediakan layanan sewa mobil profesional di Taiwan. Pengemudi aman, pelacakan real-time, berbagai metode pembayaran. Unduh aplikasi untuk memesan sekarang!',
  fil: 'Nag-aalok ang RelayGo ng propesyonal na serbisyo ng charter car sa Taiwan. Ligtas na driver, real-time na pagsubaybay, iba\'t ibang paraan ng pagbabayad. I-download ang app para mag-book ngayon!',
};

const LOCALE_KEYWORDS: Record<Locale, string> = {
  'zh-TW': 'RelayGo, 台灣包車, 機場接送, 包車旅遊, 台北包車, 九份包車, 日月潭包車, 太魯閣包車, 墾丁包車, 阿里山包車, 桃園機場接送, 松山機場接送, 台灣自由行包車, 專業司機, 即時追蹤',
  'zh-CN': 'RelayGo, 台湾包车, 机场接送, 包车旅游, 台湾自由行包车, 台北包车, 九份包车, 日月潭包车, 太鲁阁包车, 垦丁包车, 桃园机场接送, 包车价格, 专业司机, 台湾一日游包车',
  en: 'RelayGo, Taiwan private car charter, Taiwan airport transfer, Taipei private driver, Taiwan car rental with driver, Jiufen private tour, Sun Moon Lake day trip, Taroko Gorge tour, Taoyuan airport pickup, Taiwan day tour, private sightseeing car Taiwan',
  ja: 'RelayGo, 台湾 チャーター車, 台湾 貸切タクシー, 空港送迎 台湾, 台北 貸切車, 九份 タクシー チャーター, 日月潭 ツアー, 太魯閣 ツアー, 桃園空港 送迎, 台湾 ドライバー付き, 台湾 専用車 予約',
  ko: 'RelayGo, 대만 전용차량 투어, 대만 택시투어, 대만 공항 픽업, 지우펀 택시투어, 대만 프라이빗 차량, 르웨탄 투어, 타로코 투어, 타오위안 공항 픽업, 대만 일일투어, 대만 차량 예약',
  th: 'RelayGo, เช่ารถพร้อมคนขับ ไต้หวัน, รถเช่าส่วนตัว ไต้หวัน, รับส่งสนามบิน ไต้หวัน, ทัวร์ส่วนตัว ไต้หวัน, ทัวร์จิ่วเฟิ่น, ทัวร์ทะเลสาบสุริยันจันทรา, ทัวร์อุทยานทาโรโกะ, รถรับส่งสนามบินเถาหยวน, จองรถ ไต้หวัน',
  vi: 'RelayGo, thuê xe riêng Đài Loan, đưa đón sân bay Đài Loan, thuê xe có tài xế Đài Loan, tour Cửu Phần, tour Hồ Nhật Nguyệt, tour Thái Lỗ Các, đón sân bay Đào Viên, xe riêng Đài Bắc, tour một ngày Đài Loan',
  ms: 'RelayGo, sewa kereta dengan pemandu Taiwan, pindahan lapangan terbang Taiwan, kereta sewa peribadi Taiwan, lawatan Jiufen, lawatan Tasik Matahari Bulan, lawatan Taroko, pengambilan lapangan terbang Taoyuan, kereta sewa harian Taiwan',
  id: 'RelayGo, sewa mobil dengan sopir Taiwan, antar jemput bandara Taiwan, sewa mobil pribadi Taiwan, tur Jiufen, tur Danau Matahari Bulan, tur Taroko, penjemputan bandara Taoyuan, sopir pribadi Taiwan, wisata Taiwan',
  fil: 'RelayGo, Taiwan private car, Taiwan airport transfer, Taiwan tour package, Jiufen tour, Sun Moon Lake tour, Taroko tour, Taoyuan airport pickup, Taiwan day tour from Philippines, Taiwan travel 2026',
};

const OG_DESCRIPTIONS: Record<Locale, string> = {
  'zh-TW': '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
  'zh-CN': '安全可靠的专业包车服务，即时追踪、多元支付、AI 旅游规划',
  en: 'Safe & reliable charter service with real-time tracking, multiple payment options & AI travel planning',
  ja: '安全で信頼できるチャーターサービス。リアルタイム追跡・多様な決済・AI旅行プランニング',
  ko: '안전하고 신뢰할 수 있는 차터 서비스. 실시간 추적, 다양한 결제, AI 여행 플래닝',
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
  const canonical = seg ? `https://relaygo.pro/${seg}/` : 'https://relaygo.pro/';

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
      images: [
        {
          url: 'https://relaygo.pro/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDesc,
      images: ['https://relaygo.pro/og-image.png'],
    },
    metadataBase: new URL('https://relaygo.pro'),
    alternates: {
      canonical,
      languages: buildAlternates(),
    },
    other: {
      'agd-partner-manual-verification': '',
    },
  };
}

export default function LangLayout({ children, params }: Props) {
  const locale = resolveLocale(params.lang);

  return (
    <html lang={htmlLang(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'RelayGo',
              url: 'https://relaygo.pro',
              logo: 'https://relaygo.pro/og-image.png',
              description:
                '台灣專業包車服務平台，提供機場接送、包車旅遊、商務用車服務。App 內建多語翻譯（中/英/日/韓/泰/越/馬來文）。Professional charter car service in Taiwan with built-in multilingual translation (Chinese, English, Japanese, Korean, Thai, Vietnamese, Malay).',
              foundingDate: '2024',
              areaServed: {
                '@type': 'Country',
                name: 'Taiwan',
              },
              knowsLanguage: ['zh-TW', 'en', 'ja', 'ko', 'th', 'vi', 'ms', 'id', 'fil'],
              serviceType: [
                '機場接送', '包車旅遊', '商務用車',
                'Airport Transfer', 'Charter Tour', 'Business Transportation',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'RelayGo 包車服務',
                itemListElement: [
                  {
                    '@type': 'OfferCatalog',
                    name: '機場接送 Airport Transfer',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: '桃園機場接送 (TPE)',
                        description: '桃園國際機場接送服務，轎車/休旅/大型車可選',
                        priceCurrency: 'TWD',
                        price: '1000',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '1000', priceCurrency: 'TWD', unitText: '趟' },
                        itemOffered: { '@type': 'Service', name: '桃園機場接送 TPE Airport Transfer' },
                      },
                      {
                        '@type': 'Offer',
                        name: '松山機場接送 (TSA)',
                        description: '松山機場接送服務',
                        priceCurrency: 'TWD',
                        price: '900',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '900', priceCurrency: 'TWD', unitText: '趟' },
                        itemOffered: { '@type': 'Service', name: '松山機場接送 TSA Airport Transfer' },
                      },
                      {
                        '@type': 'Offer',
                        name: '台中機場接送 (RMQ)',
                        description: '台中清泉崗機場接送服務',
                        priceCurrency: 'TWD',
                        price: '3700',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '3700', priceCurrency: 'TWD', unitText: '趟' },
                        itemOffered: { '@type': 'Service', name: '台中機場接送 RMQ Airport Transfer' },
                      },
                      {
                        '@type': 'Offer',
                        name: '高雄機場接送 (KHH)',
                        description: '高雄小港機場接送服務',
                        priceCurrency: 'TWD',
                        price: '7200',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '7200', priceCurrency: 'TWD', unitText: '趟' },
                        itemOffered: { '@type': 'Service', name: '高雄機場接送 KHH Airport Transfer' },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: '包車旅遊 Charter Tour',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: '8 小時包車旅遊 (轎車)',
                        priceCurrency: 'TWD',
                        price: '3900',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '3900', priceCurrency: 'TWD', unitText: '8小時' },
                        itemOffered: { '@type': 'Service', name: '包車旅遊 Charter Tour', description: '全台熱門景點包車旅遊，九份、日月潭、太魯閣、墾丁、阿里山等' },
                      },
                      {
                        '@type': 'Offer',
                        name: '8 小時包車旅遊 (休旅)',
                        priceCurrency: 'TWD',
                        price: '4500',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '4500', priceCurrency: 'TWD', unitText: '8小時' },
                        itemOffered: { '@type': 'Service', name: '包車旅遊 Charter Tour (M)' },
                      },
                      {
                        '@type': 'Offer',
                        name: '8 小時包車旅遊 (大型)',
                        priceCurrency: 'TWD',
                        price: '7500',
                        priceSpecification: { '@type': 'UnitPriceSpecification', price: '7500', priceCurrency: 'TWD', unitText: '8小時' },
                        itemOffered: { '@type': 'Service', name: '包車旅遊 Charter Tour (L)' },
                      },
                    ],
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '商務用車 Business Transportation',
                      description: '企業用車、會議接送、VIP 商務包車',
                    },
                  },
                ],
              },
              sameAs: [
                'https://apps.apple.com/app/relaygo/id6670425865',
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
