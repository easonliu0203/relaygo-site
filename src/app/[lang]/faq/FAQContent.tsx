'use client';

import { useState } from 'react';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import { FAQS, type LangCode } from '@/lib/faq-data';

const UI: Record<string, Record<string, string>> = {
  title: {
    'zh-TW': '常見問題',
    'zh-CN': '常见问题',
    en: 'Frequently Asked Questions',
    ja: 'よくある質問',
    ko: '자주 묻는 질문',
    th: 'คำถามที่พบบ่อย',
    vi: 'Câu hỏi thường gặp',
    ms: 'Soalan Lazim',
  },
  subtitle: {
    'zh-TW': '包車旅遊常見問題，一次解答',
    'zh-CN': '包车旅游常见问题，一次解答',
    en: 'Everything you need to know about our charter service',
    ja: 'チャーターサービスに関するよくある質問',
    ko: '차량 대절 서비스에 대해 자주 묻는 질문',
    th: 'ทุกสิ่งที่คุณอยากรู้เกี่ยวกับบริการรถเหมา',
    vi: 'Mọi điều bạn cần biết về dịch vụ xe riêng của chúng tôi',
    ms: 'Semua yang anda perlu tahu tentang perkhidmatan sewa kenderaan kami',
  },
  back: {
    'zh-TW': '← 返回首頁',
    'zh-CN': '← 返回首页',
    en: '← Back to Home',
    ja: '← ホームへ戻る',
    ko: '← 홈으로 돌아가기',
    th: '← กลับหน้าหลัก',
    vi: '← Về trang chủ',
    ms: '← Kembali ke Laman Utama',
  },
  cta: {
    'zh-TW': '立即下載 App 預約包車',
    'zh-CN': '立即下载 App 预约包车',
    en: 'Download App to Book Now',
    ja: '今すぐアプリをダウンロードして予約',
    ko: '지금 앱 다운로드하고 예약하기',
    th: 'ดาวน์โหลดแอปเพื่อจองเลย',
    vi: 'Tải ứng dụng để đặt xe ngay',
    ms: 'Muat turun aplikasi untuk tempah sekarang',
  },
};

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'zh-TW', label: '繁中' },
  { code: 'zh-CN', label: '简中' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
  { code: 'ko', label: 'KO' },
  { code: 'th', label: 'TH' },
  { code: 'vi', label: 'VI' },
  { code: 'ms', label: 'MS' },
  { code: 'id', label: 'ID' },
  { code: 'fil', label: 'FIL' },
];

export default function FAQContent({ initialLang }: { initialLang: Locale }) {
  const lang = initialLang as LangCode;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';

  return (
    <div className="faq-page">
      <nav className="faq-nav">
        <a href={langPrefix || '/'} className="faq-back">{UI.back[lang]}</a>
        <div className="faq-lang-pills">
          {LANGS.map((l) => {
            const seg = localePathMap[l.code as Locale];
            const href = seg ? `/${seg}/faq` : '/faq';
            return (
              <a
                key={l.code}
                href={href}
                className={`faq-lang-pill ${lang === l.code ? 'active' : ''}`}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </nav>

      <header className="faq-header">
        <h1>{UI.title[lang]}</h1>
        <p>{UI.subtitle[lang]}</p>
      </header>

      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{faq.question[lang]}</span>
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>{faq.answer[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-cta">
        <a
          href="https://apps.apple.com/tw/app/relay-go/id6756459981"
          target="_blank"
          rel="noopener"
          className="faq-cta-btn"
        >
          {UI.cta[lang]}
        </a>
      </div>
    </div>
  );
}
