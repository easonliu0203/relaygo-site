'use client';

import { useEffect, useState, useMemo } from 'react';
import type { TourGuide } from '@/lib/supabase';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

const UI: Record<string, Record<LangCode, string>> = {
  back: { 'zh-TW': '返回攻略列表', 'zh-CN': '返回攻略列表', en: 'Back to Guides', ja: 'ガイド一覧へ', ko: '가이드 목록' },
  hours: { 'zh-TW': '小時行程', 'zh-CN': '小时行程', en: 'hour trip', ja: '時間の旅', ko: '시간 여행' },
  bookNow: { 'zh-TW': '立即預約包車', 'zh-CN': '立即预约包车', en: 'Book Charter Now', ja: '今すぐ予約する', ko: '지금 예약하기' },
  duration: { 'zh-TW': '建議時數', 'zh-CN': '建议时长', en: 'Duration', ja: '所要時間', ko: '소요 시간' },
  departure: { 'zh-TW': '出發地', 'zh-CN': '出发地', en: 'Departure', ja: '出発地', ko: '출발지' },
  tripInfo: { 'zh-TW': '行程資訊', 'zh-CN': '行程信息', en: 'Trip Info', ja: 'ツアー情報', ko: '여행 정보' },
  share: { 'zh-TW': '分享', 'zh-CN': '分享', en: 'Share', ja: 'シェア', ko: '공유' },
  copy: { 'zh-TW': '複製連結', 'zh-CN': '复制链接', en: 'Copy Link', ja: 'リンクコピー', ko: '링크 복사' },
  copied: { 'zh-TW': '已複製！', 'zh-CN': '已复制！', en: 'Copied!', ja: 'コピー済み！', ko: '복사됨!' },
};

const CITY_ICONS: Record<string, string> = {
  '台北': '🏙️', '台中': '🌄', '花蓮': '🏔️', '高雄': '🌊', '嘉義': '🌲',
  '南投': '🏞️', '屏東': '🏖️', '台南': '🏯', '宜蘭': '♨️',
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
  if (bl.startsWith('en')) return 'en';
  return 'en';
}

function t(obj: Record<string, string>, lang: LangCode): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="guide-img" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Ordered lists (numbered items)
    .replace(/^(\d+)\. (.+)$/gm, '<oli>$2</oli>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/(<oli>.*<\/oli>\n?)+/g, (match) => '<ol>' + match.replace(/oli>/g, 'li>') + '</ol>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>');

  return `<p>${html}</p>`
    .replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><ol>/g, '<ol>').replace(/<\/ol><\/p>/g, '</ol>')
    .replace(/<p><blockquote>/g, '<blockquote>').replace(/<\/blockquote><\/p>/g, '</blockquote>')
    .replace(/<p><\/p>/g, '');
}

export default function GuideContent({ guide }: { guide: TourGuide }) {
  const [lang, setLang] = useState<LangCode>('zh-TW');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const title = t(guide.title, lang);
  const description = t(guide.description, lang);
  const contentHtml = useMemo(() => renderMarkdown(t(guide.content, lang)), [guide.content, lang]);
  const cityIcon = CITY_ICONS[guide.city] || '📍';

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="guide-page">
      {/* Hero */}
      <div
        className="guide-hero"
        style={guide.cover_image ? { backgroundImage: `url(${guide.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="guide-hero-overlay" />
        <div className="guide-hero-content">
          <a href="/guides" className="guide-back-link">
            ← {UI.back[lang]}
          </a>
          <h1 className="guide-title">{title}</h1>
          <p className="guide-desc">{description}</p>

          {/* Stats bar */}
          <div className="guide-hero-stats">
            <div className="guide-hero-stat">
              <span className="guide-hero-stat-icon">⏱️</span>
              <span>{guide.duration_hours} {UI.hours[lang]}</span>
            </div>
            <div className="guide-hero-stat">
              <span className="guide-hero-stat-icon">{cityIcon}</span>
              <span>{guide.city}</span>
            </div>
          </div>

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
            <div className="guide-info-card-title">{UI.tripInfo[lang]}</div>
            <div className="guide-info-row">
              <span className="guide-info-label">
                <span className="guide-info-icon">⏱️</span>
                {UI.duration[lang]}
              </span>
              <span className="guide-info-value">{guide.duration_hours}h</span>
            </div>
            <div className="guide-info-row">
              <span className="guide-info-label">
                <span className="guide-info-icon">{cityIcon}</span>
                {UI.departure[lang]}
              </span>
              <span className="guide-info-value">{guide.city}</span>
            </div>
            <a href="https://relaygo.pro/#download" className="guide-cta-btn">
              📱 {UI.bookNow[lang]}
            </a>
            <div className="guide-share-row">
              <button className="guide-share-btn" onClick={handleCopy}>
                {copied ? '✅' : '🔗'} {copied ? UI.copied[lang] : UI.copy[lang]}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Photo Credit */}
      {guide.cover_image && guide.cover_image.includes('unsplash.com') && (
        <div className="guide-photo-credit">
          Photo by <a href="https://unsplash.com/?utm_source=relaygo&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
      )}
    </div>
  );
}
