'use client';

import { useState, useCallback, useEffect } from 'react';
import type { TravelBookmark } from '@/lib/bookmarks';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ICONS, type BookmarkCategory } from '@/lib/bookmark-categories';
import { COUNTRIES, CITIES, localizedCountry, localizedCityBySlug } from '@/lib/bookmark-locations';
import { localePathMap } from '@/lib/i18n-config';
import { auth, googleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import BookmarkCard from './BookmarkCard';
import SubmitBookmarkModal from './SubmitBookmarkModal';
import EditBookmarkModal from './EditBookmarkModal';

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
  favorites: {
    'zh-TW': '♥ 我的最愛', 'zh-CN': '♥ 我的收藏', en: '♥ My Favorites', ja: '♥ お気に入り', ko: '♥ 즐겨찾기',
    th: '♥ รายการโปรด', vi: '♥ Yêu thích', ms: '♥ Kegemaran', id: '♥ Favorit', fil: '♥ Paborito',
  },
  loginHint: {
    'zh-TW': '登入後可收藏、編輯自己分享的書籤', 'zh-CN': '登录后可收藏、编辑自己分享的书签', en: 'Log in to save favorites and edit your bookmarks', ja: 'ログインしてお気に入り保存・編集', ko: '로그인하여 즐겨찾기 저장 및 편집',
    th: 'เข้าสู่ระบบเพื่อบันทึกและแก้ไข', vi: 'Đăng nhập để lưu và chỉnh sửa', ms: 'Log masuk untuk simpan dan edit', id: 'Masuk untuk menyimpan dan mengedit', fil: 'Mag-login para mag-save at mag-edit',
  },
  login: {
    'zh-TW': '登入', 'zh-CN': '登录', en: 'Login', ja: 'ログイン', ko: '로그인',
    th: 'เข้าสู่ระบบ', vi: 'Đăng nhập', ms: 'Log Masuk', id: 'Masuk', fil: 'Mag-login',
  },
  logout: {
    'zh-TW': '登出', 'zh-CN': '登出', en: 'Logout', ja: 'ログアウト', ko: '로그아웃',
    th: 'ออกจากระบบ', vi: 'Đăng xuất', ms: 'Log Keluar', id: 'Keluar', fil: 'Mag-logout',
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
  const [editingBookmark, setEditingBookmark] = useState<TravelBookmark | null>(null);
  const [filterCat, setFilterCat] = useState<string>(currentCategory || '');
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());

  // Listen for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Load favorites when user logs in
  useEffect(() => {
    if (!user) { setFavIds(new Set()); return; }
    fetch(`/api/bookmarks/favorite?user_id=${encodeURIComponent(user.uid)}`)
      .then((r) => r.json())
      .then((data) => { if (data.ids) setFavIds(new Set(data.ids)); })
      .catch(() => {});
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch { /* user cancelled */ }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch { /* ignore */ }
  };

  const toggleFavorite = useCallback(async (bookmarkId: string) => {
    if (!user) return;
    const isFav = favIds.has(bookmarkId);
    setFavIds((prev) => {
      const next = new Set(prev);
      if (isFav) next.delete(bookmarkId); else next.add(bookmarkId);
      return next;
    });
    try {
      await fetch('/api/bookmarks/favorite', {
        method: isFav ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.uid, bookmark_id: bookmarkId }),
      });
    } catch {
      setFavIds((prev) => {
        const next = new Set(prev);
        if (isFav) next.add(bookmarkId); else next.delete(bookmarkId);
        return next;
      });
    }
  }, [user, favIds]);

  let filtered = filterCat
    ? bookmarks.filter((b) => b.category.split(',').includes(filterCat))
    : bookmarks;
  if (showFavOnly) {
    filtered = filtered.filter((b) => favIds.has(b.id));
  }

  const handleSubmitted = useCallback(() => {
    setTimeout(() => window.location.reload(), 1500);
  }, []);

  const handleEditSaved = useCallback(() => {
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
        <div className="bm-hero-auth">
          {user ? (
            <div className="bm-auth-info">
              {user.photoURL && <img src={user.photoURL} alt="" className="bm-auth-avatar" referrerPolicy="no-referrer" />}
              <span className="bm-auth-name">{user.displayName || user.email}</span>
              <button className="bm-auth-btn" onClick={handleLogout}>{t('logout', lang)}</button>
            </div>
          ) : (
            <button className="bm-auth-btn bm-auth-btn-login" onClick={handleLogin}>
              {t('login', lang)}
            </button>
          )}
        </div>
        <h1 className="bm-hero-title">{t('pageTitle', lang)}</h1>
        <p className="bm-hero-sub">{t('subtitle', lang)}</p>
        <p className="bm-hero-hint">{t('loginHint', lang)}</p>
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

        <div className="bm-filter-row">
          <button
            className={`bm-filter-pill ${!filterCat && !showFavOnly ? 'active' : ''}`}
            onClick={() => { setFilterCat(''); setShowFavOnly(false); }}
          >
            {t('all', lang)}
          </button>
          {user && (
            <button
              className={`bm-filter-pill bm-filter-pill-fav ${showFavOnly ? 'active' : ''}`}
              onClick={() => { setShowFavOnly(!showFavOnly); setFilterCat(''); }}
            >
              {t('favorites', lang)}
            </button>
          )}
          {CATEGORIES.map((cat) => {
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
            <BookmarkCard
              key={bm.id}
              bookmark={bm}
              lang={lang}
              index={i}
              isFavorited={favIds.has(bm.id)}
              onToggleFavorite={user ? toggleFavorite : undefined}
              isOwner={!!user && bm.created_by === user.uid}
              onEdit={(b) => setEditingBookmark(b)}
            />
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
        userId={user?.uid}
      />

      {editingBookmark && user && (
        <EditBookmarkModal
          bookmark={editingBookmark}
          userId={user.uid}
          isOpen={true}
          onClose={() => setEditingBookmark(null)}
          onSaved={handleEditSaved}
          lang={lang}
        />
      )}
    </div>
  );
}
