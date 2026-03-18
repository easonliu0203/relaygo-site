'use client';

import type { TourGuide } from '@/lib/supabase';
import { localePathMap, type Locale } from '@/lib/i18n-config';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  pageTitle: { 'zh-TW': '包車攻略', 'zh-CN': '包车攻略', en: 'Travel Guides', ja: 'チャーターガイド', ko: '차터 가이드', th: 'คู่มือเที่ยวรถเหมา', vi: 'Cẩm nang du lịch', ms: 'Panduan perjalanan', id: 'Panduan Wisata', fil: 'Mga Gabay sa Paglalakbay' },
  pageSubtitle: {
    'zh-TW': '精選台灣包車旅遊路線，專業司機帶路，行程規劃一次搞定',
    'zh-CN': '精选台湾包车旅游路线，专业司机带路，行程规划一次搞定',
    en: 'Curated charter tour routes in Taiwan with professional drivers',
    ja: '厳選した台湾チャーターツアールート、プロドライバーがご案内',
    ko: '전문 기사와 함께하는 엄선된 대만 차터 투어 루트',
    th: 'เส้นทางท่องเที่ยวรถเหมาคัดสรรในไต้หวัน พร้อมคนขับมืออาชีพ',
    vi: 'Tuyến du lịch xe riêng tuyển chọn tại Đài Loan cùng tài xế chuyên nghiệp',
    ms: 'Laluan pelancongan sewa kenderaan terpilih di Taiwan bersama pemandu profesional',
    id: 'Rute wisata charter terpilih di Taiwan dengan pengemudi profesional',
    fil: 'Mga piling charter tour route sa Taiwan kasama ang mga propesyonal na driver',
  },
  hours: { 'zh-TW': '小時', 'zh-CN': '小时', en: 'hrs', ja: '時間', ko: '시간', th: 'ชม.', vi: 'giờ', ms: 'jam', id: 'jam', fil: 'oras' },
  readMore: { 'zh-TW': '查看攻略', 'zh-CN': '查看攻略', en: 'Read More', ja: '詳細を見る', ko: '자세히 보기', th: 'อ่านเพิ่มเติม', vi: 'Xem thêm', ms: 'Baca lagi', id: 'Baca Selengkapnya', fil: 'Basahin Pa' },
  home: { 'zh-TW': '返回首頁', 'zh-CN': '返回首页', en: 'Home', ja: 'トップへ', ko: '홈으로', th: 'หน้าหลัก', vi: 'Trang chủ', ms: 'Laman utama', id: 'Beranda', fil: 'Home' },
  noGuides: { 'zh-TW': '攻略即將上線，敬請期待！', 'zh-CN': '攻略即将上线，敬请期待！', en: 'Guides coming soon!', ja: 'ガイド準備中！', ko: '가이드 준비 중!', th: 'คู่มือกำลังจะมาเร็ว ๆ นี้!', vi: 'Cẩm nang sắp ra mắt!', ms: 'Panduan akan datang tidak lama lagi!', id: 'Panduan segera hadir!', fil: 'Mga gabay ay paparating na!' },
  north: { 'zh-TW': '北部', 'zh-CN': '北部', en: 'Northern Taiwan', ja: '北部', ko: '북부', th: 'ภาคเหนือ', vi: 'Miền Bắc', ms: 'Utara', id: 'Taiwan Utara', fil: 'Hilagang Taiwan' },
  central: { 'zh-TW': '中部', 'zh-CN': '中部', en: 'Central Taiwan', ja: '中部', ko: '중부', th: 'ภาคกลาง', vi: 'Miền Trung', ms: 'Tengah', id: 'Taiwan Tengah', fil: 'Gitnang Taiwan' },
  south: { 'zh-TW': '南部', 'zh-CN': '南部', en: 'Southern Taiwan', ja: '南部', ko: '남부', th: 'ภาคใต้', vi: 'Miền Nam', ms: 'Selatan', id: 'Taiwan Selatan', fil: 'Timog Taiwan' },
  east: { 'zh-TW': '東部', 'zh-CN': '东部', en: 'Eastern Taiwan', ja: '東部', ko: '동부', th: 'ภาคตะวันออก', vi: 'Miền Đông', ms: 'Timur', id: 'Taiwan Timur', fil: 'Silangang Taiwan' },
};

const CITY_ICONS: Record<string, string> = {
  '台北': '🏙️', '台中': '🌄', '花蓮': '🏔️', '高雄': '🌊', '嘉義': '🌲',
  '南投': '🏞️', '屏東': '🏖️', '台南': '🏯', '宜蘭': '♨️', '桃園': '🌸',
};

const ROUTE_ICONS: Record<string, string> = {
  'taipei-jiufen-shifen': '🏮',
  'sun-moon-lake': '🌅',
  'taroko-gorge': '⛰️',
  'kenting-south': '🏖️',
  'alishan-forest': '🌲',
};

// 北部: 台北、新北、基隆、桃園、新竹、宜蘭
// 中部: 台中、苗栗、彰化、南投、雲林
// 南部: 高雄、台南、嘉義、屏東
// 東部: 花蓮、台東
const REGION_MAP: Record<string, 'north' | 'central' | 'south' | 'east'> = {
  '台北': 'north', '新北': 'north', '基隆': 'north', '桃園': 'north', '新竹': 'north', '宜蘭': 'north',
  '台中': 'central', '苗栗': 'central', '彰化': 'central', '南投': 'central', '雲林': 'central',
  '高雄': 'south', '台南': 'south', '嘉義': 'south', '屏東': 'south',
  '花蓮': 'east', '台東': 'east',
};

const REGION_ORDER: Array<'north' | 'central' | 'south' | 'east'> = ['north', 'central', 'south', 'east'];

const REGION_EMOJI: Record<string, string> = {
  north: '🏙️', central: '🌄', south: '🌊', east: '🏔️',
};

function t(obj: Record<string, string>, lang: LangCode): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function GuideCard({ guide, langPrefix, lang }: { guide: TourGuide; langPrefix: string; lang: LangCode }) {
  return (
    <a href={`${langPrefix}/guide/${guide.slug}`} className="guide-card">
      <div
        className="guide-card-img"
        style={guide.cover_image ? { backgroundImage: `url(${guide.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <span className="guide-card-img-icon">
          {ROUTE_ICONS[guide.slug] || CITY_ICONS[guide.city] || '📍'}
        </span>
        <span className="guide-card-city-badge">
          {CITY_ICONS[guide.city] || '📍'} {guide.city}
        </span>
      </div>
      <div className="guide-card-body">
        <div className="guide-card-tags">
          {guide.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="guide-card-tag">{tag}</span>
          ))}
        </div>
        <h2 className="guide-card-title">{t(guide.title, lang)}</h2>
        <p className="guide-card-desc">{t(guide.description, lang)}</p>
        <div className="guide-card-footer">
          <span className="guide-card-duration">
            <span className="guide-card-duration-icon">⏱️</span>
            {guide.duration_hours} {UI.hours[lang]}
          </span>
          <span className="guide-card-more">
            {UI.readMore[lang]} →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function GuidesListContent({ guides, initialLang }: { guides: TourGuide[]; initialLang: Locale }) {
  const lang = initialLang as LangCode;
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';

  // Group guides by region
  const grouped = guides.reduce<Record<string, TourGuide[]>>((acc, guide) => {
    const region = REGION_MAP[guide.city] ?? 'north';
    if (!acc[region]) acc[region] = [];
    acc[region].push(guide);
    return acc;
  }, {});

  return (
    <div className="guides-page">
      <div className="guides-header">
        <div className="guides-header-inner">
          <a href={langPrefix || '/'} className="guide-back-link">← {UI.home[lang]}</a>
          <h1 className="guides-page-title">{UI.pageTitle[lang]}</h1>
          <p className="guides-page-subtitle">{UI.pageSubtitle[lang]}</p>
        </div>
      </div>

      <div className="guides-grid-wrap">
        {guides.length === 0 ? (
          <p className="guides-empty">{UI.noGuides[lang]}</p>
        ) : (
          REGION_ORDER.filter((r) => grouped[r]?.length).map((region) => (
            <section key={region} className="guides-region-section">
              <div className="guides-region-header">
                <span className="guides-region-emoji">{REGION_EMOJI[region]}</span>
                <h2 className="guides-region-title">{t(UI[region], lang)}</h2>
                <span className="guides-region-count">{grouped[region].length}</span>
              </div>
              <div className="guides-grid">
                {grouped[region].map((guide) => (
                  <GuideCard key={guide.id} guide={guide} langPrefix={langPrefix} lang={lang} />
                ))}
              </div>
            </section>
          ))
        )}
        <div className="guide-photo-credit">
          Photos by <a href="https://unsplash.com/?utm_source=relaygo&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
      </div>
    </div>
  );
}
