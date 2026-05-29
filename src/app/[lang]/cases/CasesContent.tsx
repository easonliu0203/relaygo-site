'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ServiceCase } from '@/lib/supabase';
import { localizedCaption } from '@/lib/supabase';
import type { Locale } from '@/lib/i18n-config';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  back: {
    'zh-TW': '← 返回首頁', 'zh-CN': '← 返回首页', en: '← Back to home', ja: '← トップへ戻る', ko: '← 홈으로',
    th: '← กลับหน้าหลัก', vi: '← Về trang chủ', ms: '← Kembali ke laman utama', id: '← Kembali ke beranda', fil: '← Bumalik sa home',
  },
  privacy: {
    'zh-TW': '🔒 所有人臉皆已馬賽克處理',
    'zh-CN': '🔒 所有人脸皆已马赛克处理',
    en: '🔒 All faces are mosaiced for privacy',
    ja: '🔒 すべての顔はモザイク処理済み',
    ko: '🔒 모든 얼굴은 모자이크 처리됨',
    th: '🔒 ใบหน้าทั้งหมดถูกเซ็นเซอร์',
    vi: '🔒 Mọi khuôn mặt đã được làm mờ',
    ms: '🔒 Semua wajah telah dimosaik',
    id: '🔒 Semua wajah telah disensor',
    fil: '🔒 Lahat ng mukha ay na-mosaic',
  },
};

interface Props {
  cases: ServiceCase[];
  locale: Locale;
  langPrefix: string;
  labels: { title: string; desc: string; empty: string; home: string };
}

export default function CasesContent({ cases, locale, langPrefix, labels }: Props) {
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    const bump = () => setMountKey((k) => k + 1);
    window.addEventListener('popstate', bump);
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) bump(); };
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('popstate', bump);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  useEffect(() => {
    const fadeEls = document.querySelectorAll('.cases-page-section .fade-up');
    fadeEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    fadeEls.forEach((el) => { if (!el.classList.contains('visible')) observer.observe(el); });
    return () => observer.disconnect();
  }, [mountKey]);

  const lang = locale as LangCode;

  return (
    <main key={mountKey} className="cases-page-section">
      <div className="section-inner">
        <div className="cases-page-header fade-up">
          <Link href={langPrefix || '/'} style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--gray-500)', fontSize: '14px', textDecoration: 'none' }}>
            {UI.back[lang] || UI.back['en']}
          </Link>
          <h1>{labels.title}</h1>
          <p>{labels.desc}</p>
          <div className="privacy-note">{UI.privacy[lang] || UI.privacy['en']}</div>
        </div>

        {cases.length === 0 ? (
          <div className="cases-empty">{labels.empty}</div>
        ) : (
          <div className="cases-grid">
            {cases.map((c) => {
              const caption = localizedCaption(c, locale);
              return (
                <div key={c.id} className="case-card fade-up">
                  <div className="case-img-wrap">
                    <img
                      src={c.photo_url}
                      alt={c.alt_text || caption}
                      loading="lazy"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="case-caption">{caption}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
