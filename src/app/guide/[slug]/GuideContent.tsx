'use client';

import { useEffect, useState, useMemo } from 'react';
import type { TourGuide } from '@/lib/supabase';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

const VEHICLE_LABELS: Record<string, Record<LangCode, string>> = {
  S: { 'zh-TW': '五人座轎車', 'zh-CN': '五人座轿车', en: 'Sedan (5 seats)', ja: 'セダン（5人乗り）', ko: '세단 (5인승)' },
  M: { 'zh-TW': '五人座休旅車', 'zh-CN': '五人座休旅车', en: 'SUV (5 seats)', ja: 'SUV（5人乗り）', ko: 'SUV (5인승)' },
  L: { 'zh-TW': '九人座休旅車', 'zh-CN': '九人座休旅车', en: 'Van (9 seats)', ja: 'ミニバン（9人乗り）', ko: '밴 (9인승)' },
  XL: { 'zh-TW': 'Toyota Alphard', 'zh-CN': 'Toyota Alphard', en: 'Toyota Alphard', ja: 'Toyota Alphard', ko: 'Toyota Alphard' },
};

const UI: Record<string, Record<LangCode, string>> = {
  back: { 'zh-TW': '← 返回攻略列表', 'zh-CN': '← 返回攻略列表', en: '← Back to Guides', ja: '← ガイド一覧へ', ko: '← 가이드 목록' },
  hours: { 'zh-TW': '小時', 'zh-CN': '小时', en: 'hours', ja: '時間', ko: '시간' },
  recommend: { 'zh-TW': '推薦車型', 'zh-CN': '推荐车型', en: 'Recommended Vehicle', ja: 'おすすめ車種', ko: '추천 차량' },
  bookNow: { 'zh-TW': '立即預約包車', 'zh-CN': '立即预约包车', en: 'Book Now', ja: '今すぐ予約', ko: '지금 예약' },
  duration: { 'zh-TW': '建議時數', 'zh-CN': '建议时长', en: 'Duration', ja: '所要時間', ko: '소요 시간' },
  departure: { 'zh-TW': '出發地', 'zh-CN': '出发地', en: 'Departure', ja: '出発地', ko: '출발지' },
};

function detectLang(): LangCode {
  if (typeof window === 'undefined') return 'zh-TW';
  const manual = localStorage.getItem('relaygo_lang_manual');
  if (manual && ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'].includes(manual)) return manual as LangCode;
  const browserLang = navigator.language || '';
  if (browserLang.startsWith('zh-CN') || browserLang === 'zh-Hans' || browserLang === 'zh') return 'zh-CN';
  if (browserLang.startsWith('zh')) return 'zh-TW';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('en')) return 'en';
  return 'en';
}

function t(obj: Record<string, string>, lang: LangCode): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function renderMarkdown(md: string): string {
  // Simple markdown to HTML
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="guide-img" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>');

  return `<p>${html}</p>`.replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>').replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>').replace(/<p><blockquote>/g, '<blockquote>').replace(/<\/blockquote><\/p>/g, '</blockquote>');
}

export default function GuideContent({ guide }: { guide: TourGuide }) {
  const [lang, setLang] = useState<LangCode>('zh-TW');

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const title = t(guide.title, lang);
  const description = t(guide.description, lang);
  const contentHtml = useMemo(() => renderMarkdown(t(guide.content, lang)), [guide.content, lang]);
  const vehicleLabel = VEHICLE_LABELS[guide.vehicle_type]?.[lang] || guide.vehicle_type;

  return (
    <div className="guide-page">
      {/* Hero */}
      <div
        className="guide-hero"
        style={guide.cover_image ? { backgroundImage: `url(${guide.cover_image})` } : undefined}
      >
        <div className="guide-hero-overlay" />
        <div className="guide-hero-content">
          <a href="/guides" className="guide-back-link">
            {UI.back[lang]}
          </a>
          <h1 className="guide-title">{title}</h1>
          <p className="guide-desc">{description}</p>
          <div className="guide-meta">
            {guide.tags?.map((tag) => (
              <span key={tag} className="guide-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="guide-body">
        <div className="guide-main">
          <article
            className="guide-article"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Sidebar */}
        <aside className="guide-sidebar">
          <div className="guide-info-card">
            <div className="guide-info-row">
              <span className="guide-info-label">{UI.duration[lang]}</span>
              <span className="guide-info-value">{guide.duration_hours} {UI.hours[lang]}</span>
            </div>
            <div className="guide-info-row">
              <span className="guide-info-label">{UI.departure[lang]}</span>
              <span className="guide-info-value">{guide.city}</span>
            </div>
            <div className="guide-info-row">
              <span className="guide-info-label">{UI.recommend[lang]}</span>
              <span className="guide-info-value">{vehicleLabel}</span>
            </div>
            <a
              href="https://relaygo.pro/#download"
              className="guide-cta-btn"
            >
              {UI.bookNow[lang]}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
