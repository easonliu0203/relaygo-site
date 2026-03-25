'use client';

import { useState, useCallback } from 'react';
import type { TravelBookmark } from '@/lib/bookmarks';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ICONS, type BookmarkCategory } from '@/lib/bookmark-categories';
import { COUNTRIES, CITIES, localizedCountry, localizedCityBySlug } from '@/lib/bookmark-locations';
import { localePathMap } from '@/lib/i18n-config';
import BookmarkCard from './BookmarkCard';
import SubmitBookmarkModal from './SubmitBookmarkModal';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  pageTitle: {
    'zh-TW': '旅遊書籤', 'zh-CN': '旅游书签', en: 'Travel Bookmarks', ja: '旅のブックマーク', ko: '여행 북마크',
    th: 'บุ๊กมาร์กท่องเที่ยว', vi: 'Dấu trang du lịch', ms: 'Penanda Pelancong', id: 'Bookmark Wisata', fil: 'Travel Bookmark',
  },
  subtitle: {
    'zh-TW': '收集社群上的旅遊靈感，發現下一趟旅程', 'zh-CN': '收集社交媒体上的旅游灵感，发现下一趟旅程', en: 'Collect travel inspiration from social media, discover your next trip', ja: 'SNSの旅のインスピレーションを集めて、次の旅を見つけよう', ko: 'SNS 여행 영감을 모아 다음 여행을 발견하세요',
    th: 'รวบรวมแรงบันดาลใจจากโซเชียล ค้นพบทริปถัดไป', vi: 'Thu thập cảm hứng du lịch từ mạng xã hội', ms: 'Kumpul inspirasi pelancong dari media sosial', id: 'Kumpulkan inspirasi wisata dari media sosial', fil: 'Mag-ipon ng inspirasyon mula sa social media',
  },
  all: {
    'zh-TW': '全部', 'zh-CN': '全部', en: 'All', ja: 'すべて', ko: '전체',
    th: 'ทั้งหมด', vi: 'Tất cả', ms: 'Semua', id: 'Semua', fil: 'Lahat',
  },
  allCountries: {
    'zh-TW': '所有國家', 'zh-CN': '所有国家', en: 'All Countries', ja: 'すべての国', ko: '모든 국가',
    th: 'ทุกประเทศ', vi: 'Tất cả quốc gia', ms: 'Semua Negara', id: 'Semua Negara', fil: 'Lahat ng Bansa',
  },
  allCities: {
    'zh-TW': '所有城市', 'zh-CN': '所有城市', en: 'All Cities', ja: 'すべての都市', ko: '모든 도시',
    th: 'ทุกเมือง', vi: 'Tất cả thành phố', ms: 'Semua Bandar', id: 'Semua Kota', fil: 'Lahat ng Lungsod',
  },
  shareBtn: {
    'zh-TW': '＋ 分享靈感', 'zh-CN': '＋ 分享灵感', en: '+ Share Inspiration', ja: '＋ インスピレーション共有', ko: '+ 영감 공유',
    th: '+ แชร์แรงบันดาลใจ', vi: '+ Chia sẻ', ms: '+ Kongsi', id: '+ Bagikan', fil: '+ Ibahagi',
  },
  empty: {
    'zh-TW': '還沒有書籤，來分享第一個吧！', 'zh-CN': '还没有书签，来分享第一个吧！', en: 'No bookmarks yet. Be the first to share!', ja: 'まだブックマークがありません。最初の共有をしましょう！', ko: '아직 북마크가 없습니다. 첫 번째로 공유하세요!',
    th: 'ยังไม่มีบุ๊กมาร์ก มาแชร์กันเลย!', vi: 'Chưa có dấu trang. Hãy chia sẻ đầu tiên!', ms: 'Belum ada penanda. Jadilah yang pertama!', id: 'Belum ada bookmark. Jadilah yang pertama!', fil: 'Wala pang bookmark. Maging una!',
  },
  home: {
    'zh-TW': '首頁', 'zh-CN': '首页', en: 'Home', ja: 'ホーム', ko: '홈',
    th: 'หน้าแรก', vi: 'Trang chủ', ms: 'Utama', id: 'Beranda', fil: 'Home',
  },
};

function t(key: string, lang: string): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang as LangCode] || entry['zh-TW'] || key;
}

interface Props {
  bookmarks: TravelBookmark[];
  initialLang: string;
  currentCountry?: string;
  currentCity?: string;
  currentCategory?: string;
}

export default function BookmarksContent({ bookmarks, initialLang, currentCountry, currentCity, currentCategory }: Props) {
  const lang = initialLang;
  const langPrefix = localePathMap[lang as LangCode] ? `/${localePathMap[lang as LangCode]}` : '';
  const [modalOpen, setModalOpen] = useState(false);
  const [filterCat, setFilterCat] = useState<string>(currentCategory || '');

  const filtered = filterCat
    ? bookmarks.filter((b) => b.category === filterCat)
    : bookmarks;

  const handleSubmitted = useCallback(() => {
    // Reload page to show new bookmark (ISR will catch up)
    setTimeout(() => window.location.reload(), 1500);
  }, []);

  // Build breadcrumbs
  const crumbs: Array<{ label: string; href: string }> = [
    { label: t('home', lang), href: langPrefix || '/' },
    { label: t('pageTitle', lang), href: `${langPrefix}/bookmarks` },
  ];
  if (currentCountry) {
    crumbs.push({
      label: localizedCountry(currentCountry, lang),
      href: `${langPrefix}/bookmarks/${currentCountry}`,
    });
  }
  if (currentCountry && currentCity) {
    crumbs.push({
      label: localizedCityBySlug(currentCountry, currentCity, lang),
      href: `${langPrefix}/bookmarks/${currentCountry}/${currentCity}`,
    });
  }
  if (currentCategory) {
    const catName = CATEGORY_NAMES[currentCategory as BookmarkCategory];
    if (catName) {
      crumbs.push({
        label: catName[lang as LangCode] || catName['zh-TW'],
        href: '#',
      });
    }
  }

  return (
    <div className="bm-page">
      {/* Hero */}
      <section className="bm-hero">
        <h1 className="bm-hero-title">{t('pageTitle', lang)}</h1>
        <p className="bm-hero-sub">{t('subtitle', lang)}</p>
      </section>

      {/* Breadcrumbs */}
      <nav className="bm-breadcrumbs">
        {crumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span className="bm-breadcrumb-sep">/</span>}
            {i < crumbs.length - 1 ? (
              <a href={c.href} className="bm-breadcrumb-link">{c.label}</a>
            ) : (
              <span className="bm-breadcrumb-current">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Filters */}
      <div className="bm-filters">
        {/* Country / City nav pills — only show on main page */}
        {!currentCountry && (
          <div className="bm-filter-row">
            {COUNTRIES.map((c) => (
              <a key={c.slug} href={`${langPrefix}/bookmarks/${c.slug}`} className="bm-filter-pill bm-filter-pill-loc">
                {c.names[lang as LangCode] || c.names['zh-TW']}
              </a>
            ))}
          </div>
        )}
        {currentCountry && !currentCity && (
          <div className="bm-filter-row">
            {(CITIES[currentCountry] || []).map((c) => (
              <a key={c.slug} href={`${langPrefix}/bookmarks/${currentCountry}/${c.slug}`} className="bm-filter-pill bm-filter-pill-loc">
                {c.names[lang as LangCode] || c.names['zh-TW']}
              </a>
            ))}
          </div>
        )}

        {/* Category pills */}
        <div className="bm-filter-row">
          <button
            className={`bm-filter-pill ${!filterCat ? 'active' : ''}`}
            onClick={() => setFilterCat('')}
          >
            {t('all', lang)}
          </button>
          {CATEGORIES.map((cat) => {
            // If on a category sub-page, link instead of filter
            if (currentCountry && currentCity && !currentCategory) {
              return (
                <a
                  key={cat}
                  href={`${langPrefix}/bookmarks/${currentCountry}/${currentCity}/${cat}`}
                  className="bm-filter-pill"
                >
                  {CATEGORY_ICONS[cat]} {CATEGORY_NAMES[cat][lang as LangCode] || CATEGORY_NAMES[cat]['zh-TW']}
                </a>
              );
            }
            return (
              <button
                key={cat}
                className={`bm-filter-pill ${filterCat === cat ? 'active' : ''}`}
                onClick={() => setFilterCat(filterCat === cat ? '' : cat)}
              >
                {CATEGORY_ICONS[cat]} {CATEGORY_NAMES[cat][lang as LangCode] || CATEGORY_NAMES[cat]['zh-TW']}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="bm-grid">
          {filtered.map((bm, i) => (
            <BookmarkCard key={bm.id} bookmark={bm} lang={lang} index={i} />
          ))}
        </div>
      ) : (
        <div className="bm-empty">
          <p>{t('empty', lang)}</p>
        </div>
      )}

      {/* FAB */}
      <button className="bm-fab" onClick={() => setModalOpen(true)}>
        {t('shareBtn', lang)}
      </button>

      <SubmitBookmarkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        onSubmitted={handleSubmitted}
      />
    </div>
  );
}
