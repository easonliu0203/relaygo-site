'use client';

import { useState } from 'react';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ICONS, type BookmarkCategory } from '@/lib/bookmark-categories';
import { COUNTRIES, CITIES } from '@/lib/bookmark-locations';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  modalTitle: {
    'zh-TW': '分享旅遊靈感', 'zh-CN': '分享旅游灵感', en: 'Share Travel Inspiration', ja: '旅のインスピレーションを共有', ko: '여행 영감 공유',
    th: 'แชร์แรงบันดาลใจ', vi: 'Chia sẻ cảm hứng', ms: 'Kongsi Inspirasi', id: 'Bagikan Inspirasi', fil: 'Ibahagi ang Inspirasyon',
  },
  pasteUrl: {
    'zh-TW': '貼上社群媒體網址', 'zh-CN': '粘贴社交媒体链接', en: 'Paste social media URL', ja: 'SNSリンクを貼り付け', ko: 'SNS 링크 붙여넣기',
    th: 'วาง URL โซเชียล', vi: 'Dán URL mạng xã hội', ms: 'Tampal URL media sosial', id: 'Tempel URL media sosial', fil: 'I-paste ang URL',
  },
  extract: {
    'zh-TW': '抓取資訊', 'zh-CN': '抓取信息', en: 'Extract', ja: '取得', ko: '추출',
    th: 'ดึงข้อมูล', vi: 'Trích xuất', ms: 'Ekstrak', id: 'Ekstrak', fil: 'I-extract',
  },
  extracting: {
    'zh-TW': '抓取中...', 'zh-CN': '抓取中...', en: 'Extracting...', ja: '取得中...', ko: '추출 중...',
    th: 'กำลังดึง...', vi: 'Đang trích xuất...', ms: 'Mengekstrak...', id: 'Mengekstrak...', fil: 'Ini-extract...',
  },
  description: {
    'zh-TW': '描述（選填）', 'zh-CN': '描述（选填）', en: 'Description (optional)', ja: '説明（任意）', ko: '설명 (선택)',
    th: 'คำอธิบาย (ไม่จำเป็น)', vi: 'Mô tả (tùy chọn)', ms: 'Penerangan (pilihan)', id: 'Deskripsi (opsional)', fil: 'Paglalarawan (opsyonal)',
  },
  country: {
    'zh-TW': '國家', 'zh-CN': '国家', en: 'Country', ja: '国', ko: '국가',
    th: 'ประเทศ', vi: 'Quốc gia', ms: 'Negara', id: 'Negara', fil: 'Bansa',
  },
  city: {
    'zh-TW': '城市', 'zh-CN': '城市', en: 'City', ja: '都市', ko: '도시',
    th: 'เมือง', vi: 'Thành phố', ms: 'Bandar', id: 'Kota', fil: 'Lungsod',
  },
  district: {
    'zh-TW': '地區（選填）', 'zh-CN': '地区（选填）', en: 'District (optional)', ja: '地区（任意）', ko: '지역 (선택)',
    th: 'เขต (ไม่จำเป็น)', vi: 'Quận (tùy chọn)', ms: 'Daerah (pilihan)', id: 'Kecamatan (opsional)', fil: 'Distrito (opsyonal)',
  },
  category: {
    'zh-TW': '分類', 'zh-CN': '分类', en: 'Category', ja: 'カテゴリー', ko: '카테고리',
    th: 'หมวดหมู่', vi: 'Danh mục', ms: 'Kategori', id: 'Kategori', fil: 'Kategorya',
  },
  submit: {
    'zh-TW': '分享', 'zh-CN': '分享', en: 'Share', ja: '共有', ko: '공유',
    th: 'แชร์', vi: 'Chia sẻ', ms: 'Kongsi', id: 'Bagikan', fil: 'Ibahagi',
  },
  submitting: {
    'zh-TW': '送出中...', 'zh-CN': '提交中...', en: 'Submitting...', ja: '送信中...', ko: '제출 중...',
    th: 'กำลังส่ง...', vi: 'Đang gửi...', ms: 'Menghantar...', id: 'Mengirim...', fil: 'Isinusumite...',
  },
  success: {
    'zh-TW': '分享成功！', 'zh-CN': '分享成功！', en: 'Shared successfully!', ja: '共有しました！', ko: '공유 완료!',
    th: 'แชร์สำเร็จ!', vi: 'Chia sẻ thành công!', ms: 'Berjaya dikongsi!', id: 'Berhasil dibagikan!', fil: 'Matagumpay na naibahagi!',
  },
  close: {
    'zh-TW': '關閉', 'zh-CN': '关闭', en: 'Close', ja: '閉じる', ko: '닫기',
    th: 'ปิด', vi: 'Đóng', ms: 'Tutup', id: 'Tutup', fil: 'Isara',
  },
};

function t(key: string, lang: string): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang as LangCode] || entry['zh-TW'] || key;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  onSubmitted?: () => void;
  userId?: string;
}

export default function SubmitBookmarkModal({ isOpen, onClose, lang, onSubmitted, userId }: Props) {
  const [url, setUrl] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState<{ platform: string; title: string | null; description: string | null; thumbnail_url: string | null; author: string | null; og_data: Record<string, unknown> } | null>(null);
  const [description, setDescription] = useState('');
  const [countrySlug, setCountrySlug] = useState('taiwan');
  const [citySlug, setCitySlug] = useState('');
  const [district, setDistrict] = useState('');
  const [categories, setCategories] = useState<BookmarkCategory[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const cities = CITIES[countrySlug] || [];

  const handleExtract = async () => {
    if (!url.trim()) return;
    setExtracting(true);
    setError('');
    try {
      const res = await fetch('/api/bookmarks/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setExtracted(data);
        // Auto-fill description from extracted post content
        if (data.description && !description) {
          setDescription(data.description);
        }
      }
    } catch {
      setError('Failed to extract');
    }
    setExtracting(false);
  };

  const handleSubmit = async () => {
    if (!citySlug || categories.length === 0 || !extracted) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/bookmarks/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          platform: extracted.platform,
          title: extracted.title,
          description: description.trim() || null,
          thumbnail_url: extracted.thumbnail_url,
          author: extracted.author,
          country_slug: countrySlug,
          city_slug: citySlug,
          district: district.trim() || null,
          category: categories.join(','),
          og_data: extracted.og_data,
          created_by: userId || null,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        onSubmitted?.();
      }
    } catch {
      setError('Failed to submit');
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setUrl('');
    setExtracted(null);
    setDescription('');
    setCountrySlug('taiwan');
    setCitySlug('');
    setDistrict('');
    setCategories([]);
    setSuccess(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bm-modal-overlay" onClick={handleClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={handleClose}>&times;</button>
        <h2 className="bm-modal-title">{t('modalTitle', lang)}</h2>

        {success ? (
          <div className="bm-modal-success">
            <div className="bm-modal-success-icon">&#10003;</div>
            <p>{t('success', lang)}</p>
            <button className="bm-modal-btn" onClick={handleClose}>{t('close', lang)}</button>
          </div>
        ) : (
          <>
            {/* Step 1: URL */}
            <div className="bm-modal-field">
              <label>{t('pasteUrl', lang)}</label>
              <div className="bm-modal-url-row">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="bm-modal-input"
                  onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
                />
                <button
                  className="bm-modal-btn bm-modal-btn-extract"
                  onClick={handleExtract}
                  disabled={extracting || !url.trim()}
                >
                  {extracting ? t('extracting', lang) : t('extract', lang)}
                </button>
              </div>
            </div>

            {/* Preview */}
            {extracted && (
              <div className="bm-modal-preview">
                {extracted.thumbnail_url && (
                  <img src={extracted.thumbnail_url} alt="" className="bm-modal-preview-img" />
                )}
                <div className="bm-modal-preview-info">
                  <span className="bm-modal-preview-platform">{extracted.platform}</span>
                  {extracted.author && <span className="bm-modal-preview-author">@{extracted.author}</span>}
                  {extracted.title && <p className="bm-modal-preview-title">{extracted.title}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {extracted && (
              <>
                <div className="bm-modal-field">
                  <label>{t('description', lang)}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bm-modal-textarea"
                    rows={4}
                    maxLength={500}
                  />
                </div>

                <div className="bm-modal-row">
                  <div className="bm-modal-field bm-modal-field-half">
                    <label>{t('country', lang)}</label>
                    <select
                      value={countrySlug}
                      onChange={(e) => { setCountrySlug(e.target.value); setCitySlug(''); }}
                      className="bm-modal-select"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.names[lang as LangCode] || c.names['zh-TW']}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="bm-modal-field bm-modal-field-half">
                    <label>{t('city', lang)}</label>
                    <select
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                      className="bm-modal-select"
                    >
                      <option value="">--</option>
                      {cities.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.names[lang as LangCode] || c.names['zh-TW']}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bm-modal-field">
                  <label>{t('district', lang)}</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="bm-modal-input"
                    maxLength={30}
                  />
                </div>

                <div className="bm-modal-field">
                  <label>{t('category', lang)}</label>
                  <div className="bm-modal-cat-grid">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        className={`bm-modal-cat-btn ${categories.includes(cat) ? 'active' : ''}`}
                        onClick={() => setCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])}
                        type="button"
                      >
                        {CATEGORY_ICONS[cat]} {CATEGORY_NAMES[cat][lang as LangCode] || CATEGORY_NAMES[cat]['zh-TW']}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="bm-modal-error">{error}</p>}

                <button
                  className="bm-modal-btn bm-modal-btn-submit"
                  onClick={handleSubmit}
                  disabled={submitting || !citySlug || categories.length === 0}
                >
                  {submitting ? t('submitting', lang) : t('submit', lang)}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
