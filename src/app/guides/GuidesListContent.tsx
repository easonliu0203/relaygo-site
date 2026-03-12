'use client';

import { useEffect, useState } from 'react';
import type { TourGuide } from '@/lib/supabase';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

const UI: Record<string, Record<LangCode, string>> = {
  pageTitle: { 'zh-TW': '包車攻略', 'zh-CN': '包车攻略', en: 'Travel Guides', ja: 'チャーターガイド', ko: '차터 가이드' },
  pageSubtitle: {
    'zh-TW': '精選台灣包車旅遊路線，專業司機帶路，行程規劃一次搞定',
    'zh-CN': '精选台湾包车旅游路线，专业司机带路，行程规划一次搞定',
    en: 'Curated charter tour routes in Taiwan with professional drivers',
    ja: '厳選した台湾チャーターツアールート、プロドライバーがご案内',
    ko: '전문 기사와 함께하는 엄선된 대만 차터 투어 루트',
  },
  hours: { 'zh-TW': '小時', 'zh-CN': '小时', en: 'hrs', ja: '時間', ko: '시간' },
  readMore: { 'zh-TW': '查看攻略', 'zh-CN': '查看攻略', en: 'Read More', ja: '詳細を見る', ko: '자세히 보기' },
  home: { 'zh-TW': '返回首頁', 'zh-CN': '返回首页', en: 'Home', ja: 'トップへ', ko: '홈으로' },
  noGuides: { 'zh-TW': '攻略即將上線，敬請期待！', 'zh-CN': '攻略即将上线，敬请期待！', en: 'Guides coming soon!', ja: 'ガイド準備中！', ko: '가이드 준비 중!' },
};

const CITY_ICONS: Record<string, string> = {
  '台北': '🏙️', '台中': '🌄', '花蓮': '🏔️', '高雄': '🌊', '嘉義': '🌲',
  '南投': '🏞️', '屏東': '🏖️', '台南': '🏯', '宜蘭': '♨️',
};

const ROUTE_ICONS: Record<string, string> = {
  'taipei-jiufen-shifen': '🏮',
  'sun-moon-lake': '🌅',
  'taroko-gorge': '⛰️',
  'kenting-south': '🏖️',
  'alishan-forest': '🌲',
};

function detectLang(): LangCode {
  if (typeof window === 'undefined') return 'zh-TW';
  const manual = localStorage.getItem('relaygo_lang_manual');
  if (manual && ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'].includes(manual)) return manual as LangCode;
  const bl = navigator.language || '';
  if (bl.startsWith('zh-CN') || bl === 'zh-Hans' || bl === 'zh') return 'zh-CN';
  if (bl.startsWith('zh')) return 'zh-TW';
  if (bl.startsWith('ja')) return 'ja';
  if (bl.startsWith('ko')) return 'ko';
  return 'en';
}

function t(obj: Record<string, string>, lang: LangCode): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

export default function GuidesListContent({ guides }: { guides: TourGuide[] }) {
  const [lang, setLang] = useState<LangCode>('zh-TW');

  useEffect(() => {
    setLang(detectLang());
  }, []);

  return (
    <div className="guides-page">
      {/* Header */}
      <div className="guides-header">
        <div className="guides-header-inner">
          <a href="/" className="guide-back-link">← {UI.home[lang]}</a>
          <h1 className="guides-page-title">{UI.pageTitle[lang]}</h1>
          <p className="guides-page-subtitle">{UI.pageSubtitle[lang]}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="guides-grid-wrap">
        {guides.length === 0 ? (
          <p className="guides-empty">{UI.noGuides[lang]}</p>
        ) : (
          <div className="guides-grid">
            {guides.map((guide) => (
              <a key={guide.id} href={`/guide/${guide.slug}`} className="guide-card">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
