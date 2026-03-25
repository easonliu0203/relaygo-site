'use client';

import { useState, useEffect } from 'react';
import type { TravelBookmark } from '@/lib/bookmarks';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ICONS, type BookmarkCategory } from '@/lib/bookmark-categories';
import { COUNTRIES, CITIES } from '@/lib/bookmark-locations';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<LangCode, string>> = {
  editTitle: {
    'zh-TW': '編輯書籤', 'zh-CN': '编辑书签', en: 'Edit Bookmark', ja: 'ブックマークを編集', ko: '북마크 편집',
    th: 'แก้ไขบุ๊กมาร์ก', vi: 'Chỉnh sửa', ms: 'Edit Penanda', id: 'Edit Bookmark', fil: 'I-edit',
  },
  description: {
    'zh-TW': '描述', 'zh-CN': '描述', en: 'Description', ja: '説明', ko: '설명',
    th: 'คำอธิบาย', vi: 'Mô tả', ms: 'Penerangan', id: 'Deskripsi', fil: 'Paglalarawan',
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
  save: {
    'zh-TW': '儲存', 'zh-CN': '保存', en: 'Save', ja: '保存', ko: '저장',
    th: 'บันทึก', vi: 'Lưu', ms: 'Simpan', id: 'Simpan', fil: 'I-save',
  },
  saving: {
    'zh-TW': '儲存中...', 'zh-CN': '保存中...', en: 'Saving...', ja: '保存中...', ko: '저장 중...',
    th: 'กำลังบันทึก...', vi: 'Đang lưu...', ms: 'Menyimpan...', id: 'Menyimpan...', fil: 'Sine-save...',
  },
  saved: {
    'zh-TW': '已儲存！', 'zh-CN': '已保存！', en: 'Saved!', ja: '保存しました！', ko: '저장됨!',
    th: 'บันทึกแล้ว!', vi: 'Đã lưu!', ms: 'Disimpan!', id: 'Tersimpan!', fil: 'Na-save!',
  },
};

function t(key: string, lang: string): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang as LangCode] || entry['zh-TW'] || key;
}

interface Props {
  bookmark: TravelBookmark;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  lang: string;
}

export default function EditBookmarkModal({ bookmark, userId, isOpen, onClose, onSaved, lang }: Props) {
  const [description, setDescription] = useState(bookmark.description || '');
  const [countrySlug, setCountrySlug] = useState(bookmark.country_slug);
  const [citySlug, setCitySlug] = useState(bookmark.city_slug);
  const [district, setDistrict] = useState(bookmark.district || '');
  const [categories, setCategories] = useState<BookmarkCategory[]>(
    bookmark.category.split(',').filter(Boolean) as BookmarkCategory[]
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const cities = CITIES[countrySlug] || [];

  // Reset form when bookmark changes
  useEffect(() => {
    setDescription(bookmark.description || '');
    setCountrySlug(bookmark.country_slug);
    setCitySlug(bookmark.city_slug);
    setDistrict(bookmark.district || '');
    setCategories(bookmark.category.split(',').filter(Boolean) as BookmarkCategory[]);
    setSaved(false);
    setError('');
  }, [bookmark]);

  const handleSave = async () => {
    if (categories.length === 0 || !citySlug) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/bookmarks/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookmark_id: bookmark.id,
          user_id: userId,
          description: description.trim(),
          country_slug: countrySlug,
          city_slug: citySlug,
          district: district.trim(),
          category: categories.join(','),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSaved(true);
        onSaved();
      }
    } catch {
      setError('Failed to save');
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="bm-modal-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={onClose}>&times;</button>
        <h2 className="bm-modal-title">{t('editTitle', lang)}</h2>

        {saved ? (
          <div className="bm-modal-success">
            <div className="bm-modal-success-icon">&#10003;</div>
            <p>{t('saved', lang)}</p>
            <button className="bm-modal-btn" onClick={onClose}>{t('save', lang)}</button>
          </div>
        ) : (
          <>
            {/* Preview */}
            <div className="bm-modal-preview">
              {bookmark.thumbnail_url && (
                <img src={bookmark.thumbnail_url} alt="" className="bm-modal-preview-img" />
              )}
              <div className="bm-modal-preview-info">
                <span className="bm-modal-preview-platform">{bookmark.platform}</span>
                {bookmark.author && <span className="bm-modal-preview-author">@{bookmark.author}</span>}
                {bookmark.title && <p className="bm-modal-preview-title">{bookmark.title}</p>}
              </div>
            </div>

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
                    onClick={() => setCategories((prev) =>
                      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                    )}
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
              onClick={handleSave}
              disabled={saving || !citySlug || categories.length === 0}
            >
              {saving ? t('saving', lang) : t('save', lang)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
