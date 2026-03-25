'use client';

import { useState, useMemo } from 'react';
import type { TourGuide } from '@/lib/supabase';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import { localizedCity } from '@/lib/city-names';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  back: { 'zh-TW': '返回攻略列表', 'zh-CN': '返回攻略列表', en: 'Back to Guides', ja: 'ガイド一覧へ', ko: '가이드 목록', th: 'กลับไปรายการไกด์', vi: 'Quay lại danh sách', ms: 'Kembali ke senarai panduan', id: 'Kembali ke Daftar Panduan', fil: 'Bumalik sa Listahan' },
  hours: { 'zh-TW': '小時行程', 'zh-CN': '小时行程', en: 'hour trip', ja: '時間の旅', ko: '시간 여행', th: 'ชั่วโมง', vi: 'giờ', ms: 'jam', id: 'jam perjalanan', fil: 'oras na biyahe' },
  bookNow: { 'zh-TW': '立即預約包車', 'zh-CN': '立即预约包车', en: 'Book Charter Now', ja: '今すぐ予約する', ko: '지금 예약하기', th: 'จองรถเหมาเลย', vi: 'Đặt xe ngay', ms: 'Tempah sekarang', id: 'Pesan Charter Sekarang', fil: 'Mag-book ng Charter Ngayon' },
  downloadApp: { 'zh-TW': '下載APP預約包車', 'zh-CN': '下载APP预约包车', en: 'Download App to Book', ja: 'アプリで予約', ko: '앱 다운로드하여 예약', th: 'ดาวน์โหลดแอปจอง', vi: 'Tải App để đặt', ms: 'Muat turun App untuk tempah', id: 'Unduh Aplikasi untuk Memesan', fil: 'I-download ang App para Mag-book' },
  duration: { 'zh-TW': '建議時數', 'zh-CN': '建议时长', en: 'Duration', ja: '所要時間', ko: '소요 시간', th: 'ระยะเวลา', vi: 'Thời lượng', ms: 'Tempoh', id: 'Durasi', fil: 'Tagal' },
  departure: { 'zh-TW': '出發地', 'zh-CN': '出发地', en: 'Departure', ja: '出発地', ko: '출발지', th: 'จุดออกเดินทาง', vi: 'Điểm khởi hành', ms: 'Lokasi berlepas', id: 'Keberangkatan', fil: 'Pag-alis' },
  tripInfo: { 'zh-TW': '行程資訊', 'zh-CN': '行程信息', en: 'Trip Info', ja: 'ツアー情報', ko: '여행 정보', th: 'ข้อมูลทริป', vi: 'Thông tin chuyến đi', ms: 'Maklumat perjalanan', id: 'Info Perjalanan', fil: 'Impormasyon ng Biyahe' },
  share: { 'zh-TW': '分享', 'zh-CN': '分享', en: 'Share', ja: 'シェア', ko: '공유', th: 'แชร์', vi: 'Chia sẻ', ms: 'Kongsi', id: 'Bagikan', fil: 'Ibahagi' },
  copy: { 'zh-TW': '複製連結', 'zh-CN': '复制链接', en: 'Copy Link', ja: 'リンクコピー', ko: '링크 복사', th: 'คัดลอกลิงก์', vi: 'Sao chép liên kết', ms: 'Salin pautan', id: 'Salin Tautan', fil: 'Kopyahin ang Link' },
  copied: { 'zh-TW': '已複製！', 'zh-CN': '已复制！', en: 'Copied!', ja: 'コピー済み！', ko: '복사됨!', th: 'คัดลอกแล้ว!', vi: 'Đã sao chép!', ms: 'Disalin!', id: 'Tersalin!', fil: 'Nakopya na!' },
  relatedGuides: { 'zh-TW': '其他攻略推薦', 'zh-CN': '其他攻略推荐', en: 'More Guides', ja: '他のガイド', ko: '다른 가이드', th: 'ไกด์อื่นๆ', vi: 'Hướng dẫn khác', ms: 'Panduan lain', id: 'Panduan Lainnya', fil: 'Iba Pang Gabay' },
  itineraryNote: {
    'zh-TW': '行程完全由您自訂，可以自由新增與刪除。網站上的景點路線僅供參考，司機會按照您的路線行駛，路線不順時也會提供專業建議以節省交通時間。',
    'zh-CN': '行程完全由您自定，可以自由新增与删除。网站上的景点路线仅供参考，司机会按照您的路线行驶，路线不顺时也会提供专业建议以节省交通时间。',
    en: 'Your itinerary is fully customizable — feel free to add or remove any stops. The routes on this website are for reference only. Your driver will follow your preferred route and offer professional suggestions to save travel time if the route is not optimal.',
    ja: '行程はすべてお客様のご希望通りにカスタマイズ可能です。立ち寄り先の追加・削除も自由に行えます。本サイトの観光ルートはあくまで参考です。ドライバーはお客様のルートに沿って走行し、効率が悪い場合は交通時間を節約するためのプロのアドバイスもご提供いたします。',
    ko: '일정은 완전히 자유롭게 맞춤 설정할 수 있으며, 원하는 대로 추가하거나 삭제할 수 있습니다. 웹사이트의 관광 노선은 참고용이며, 기사님이 고객님의 노선대로 운행하고, 비효율적인 경우 교통 시간을 절약할 수 있는 전문적인 조언도 제공합니다.',
    th: 'กำหนดการเดินทางปรับแต่งได้ตามใจ สามารถเพิ่มหรือลดจุดแวะได้อย่างอิสระ เส้นทางบนเว็บไซต์เป็นเพียงข้อมูลอ้างอิง คนขับจะขับตามเส้นทางของคุณ และแนะนำเส้นทางที่ดีกว่าเพื่อประหยัดเวลาเดินทาง',
    vi: 'Lộ trình hoàn toàn do bạn tùy chỉnh, có thể tự do thêm hoặc bớt điểm dừng. Các tuyến đường trên trang web chỉ mang tính tham khảo. Tài xế sẽ đi theo lộ trình của bạn và đưa ra gợi ý chuyên nghiệp để tiết kiệm thời gian di chuyển khi cần.',
    ms: 'Jadual perjalanan boleh disesuaikan sepenuhnya — anda bebas menambah atau membuang mana-mana perhentian. Laluan di laman web ini adalah untuk rujukan sahaja. Pemandu akan mengikut laluan pilihan anda dan memberi cadangan profesional untuk menjimatkan masa perjalanan jika perlu.',
    id: 'Rute perjalanan sepenuhnya bisa Anda sesuaikan — bebas menambah atau menghapus titik pemberhentian. Rute di situs ini hanya sebagai referensi. Pengemudi akan mengikuti rute pilihan Anda dan memberikan saran profesional untuk menghemat waktu tempuh jika diperlukan.',
    fil: 'Ang iyong itinerary ay ganap na nako-customize — malayang magdagdag o mag-alis ng mga hintuan. Ang mga ruta sa website na ito ay para sa reperensya lamang. Susundin ng iyong driver ang iyong napiling ruta at mag-aalok ng propesyonal na mungkahi para makatipid ng oras sa biyahe kung kinakailangan.',
  },
};

const CITY_ICONS: Record<string, string> = {
  '台北': '🏙️', '台中': '🌄', '花蓮': '🏔️', '高雄': '🌊', '嘉義': '🌲',
  '南投': '🏞️', '屏東': '🏖️', '台南': '🏯', '宜蘭': '♨️',
};

function t(obj: Record<string, string>, lang: LangCode): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function renderMarkdownTable(block: string): string {
  const rows = block.trim().split('\n');
  if (rows.length < 2) return block;
  const parseRow = (row: string) =>
    row.split('|').slice(1, -1).map(c => c.trim());
  const headers = parseRow(rows[0]);
  // rows[1] is the separator line (|---|---|)
  const bodyRows = rows.slice(2);
  let html = '<div class="guide-table-wrap"><table class="guide-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';
  bodyRows.forEach(row => {
    const cells = parseRow(row);
    html += '<tr>';
    cells.forEach(c => { html += `<td>${c}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function renderMarkdown(md: string): string {
  // Extract markdown tables first, replace with placeholders
  const tables: string[] = [];
  let processed = md.replace(/(^\|.+\|$\n^\|[-| :]+\|$\n(?:^\|.+\|$\n?)+)/gm, (match) => {
    tables.push(renderMarkdownTable(match));
    return `\n%%TABLE_${tables.length - 1}%%\n`;
  });

  let html = processed
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

  // Restore tables
  tables.forEach((t, i) => {
    html = html.replace(`%%TABLE_${i}%%`, t);
  });

  return `<p>${html}</p>`
    .replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><ol>/g, '<ol>').replace(/<\/ol><\/p>/g, '</ol>')
    .replace(/<p><blockquote>/g, '<blockquote>').replace(/<\/blockquote><\/p>/g, '</blockquote>')
    .replace(/<p><div/g, '<div').replace(/<\/div><\/p>/g, '</div>')
    .replace(/<p><\/p>/g, '');
}

export default function GuideContent({ guide, initialLang, relatedGuides = [] }: { guide: TourGuide; initialLang: Locale; relatedGuides?: TourGuide[] }) {
  const lang = initialLang as LangCode;
  const [copied, setCopied] = useState(false);
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';

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
          <a href={`${langPrefix}/guides`} className="guide-back-link">
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
              <span>{localizedCity(guide.city, lang)}</span>
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
          <div className="guide-itinerary-note">
            <span className="guide-itinerary-note-icon">💡</span>
            <p>{UI.itineraryNote[lang]}</p>
          </div>
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
              <span className="guide-info-value">{localizedCity(guide.city, lang)}</span>
            </div>
            <a href={`${langPrefix}/booking/charter?guide=${guide.slug}&city=${encodeURIComponent(guide.city)}&hours=${guide.duration_hours}`} className="guide-cta-btn">
              🚐 {UI.bookNow[lang]}
            </a>
            <a href={`${langPrefix}/#download`} className="guide-cta-btn guide-cta-btn-secondary">
              📱 {UI.downloadApp[lang]}
            </a>
            <div className="guide-share-row">
              <button className="guide-share-btn" onClick={handleCopy}>
                {copied ? '✅' : '🔗'} {copied ? UI.copied[lang] : UI.copy[lang]}
              </button>
            </div>
          </div>
          {relatedGuides.length > 0 && (
            <div className="guide-related">
              <div className="guide-related-title">{UI.relatedGuides[lang]}</div>
              {relatedGuides.map((rg) => {
                const rgTitle = t(rg.title, lang);
                const rgIcon = CITY_ICONS[rg.city] || '📍';
                return (
                  <a key={rg.slug} href={`${langPrefix}/guide/${rg.slug}`} className="guide-related-link">
                    <span className="guide-related-icon">{rgIcon}</span>
                    <div>
                      <div className="guide-related-name">{rgTitle}</div>
                      <div className="guide-related-meta">{localizedCity(rg.city, lang)} · {rg.duration_hours}h</div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
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
