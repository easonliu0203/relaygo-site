'use client';

import { useState } from 'react';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ICONS, type BookmarkCategory } from '@/lib/bookmark-categories';

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
    'zh-TW': '擷取資訊', 'zh-CN': '抓取信息', en: 'Extract', ja: '取得', ko: '추출',
    th: 'ดึงข้อมูล', vi: 'Trích xuất', ms: 'Ekstrak', id: 'Ekstrak', fil: 'I-extract',
  },
  extracting: {
    'zh-TW': '擷取中...', 'zh-CN': '抓取中...', en: 'Extracting...', ja: '取得中...', ko: '추출 중...',
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
  countryHint: {
    'zh-TW': '輸入國家名稱', 'zh-CN': '输入国家名称', en: 'Enter country name', ja: '国名を入力', ko: '국가 이름 입력',
    th: 'ป้อนชื่อประเทศ', vi: 'Nhập tên quốc gia', ms: 'Masukkan nama negara', id: 'Masukkan nama negara', fil: 'Ilagay ang pangalan ng bansa',
  },
  city: {
    'zh-TW': '城市', 'zh-CN': '城市', en: 'City', ja: '都市', ko: '도시',
    th: 'เมือง', vi: 'Thành phố', ms: 'Bandar', id: 'Kota', fil: 'Lungsod',
  },
  cityHint: {
    'zh-TW': '輸入城市名稱', 'zh-CN': '输入城市名称', en: 'Enter city name', ja: '都市名を入力', ko: '도시 이름 입력',
    th: 'ป้อนชื่อเมือง', vi: 'Nhập tên thành phố', ms: 'Masukkan nama bandar', id: 'Masukkan nama kota', fil: 'Ilagay ang pangalan ng lungsod',
  },
  district: {
    'zh-TW': '地區（選填）', 'zh-CN': '地区（选填）', en: 'District (optional)', ja: '地区（任意）', ko: '지역 (선택)',
    th: 'เขต (ไม่จำเป็น)', vi: 'Quận (tùy chọn)', ms: 'Daerah (pilihan)', id: 'Kecamatan (opsional)', fil: 'Distrito (opsyonal)',
  },
  districtHint: {
    'zh-TW': '輸入地區名稱', 'zh-CN': '输入地区名称', en: 'Enter district name', ja: '地区名を入力', ko: '지역 이름 입력',
    th: 'ป้อนชื่อเขต', vi: 'Nhập tên quận', ms: 'Masukkan nama daerah', id: 'Masukkan nama kecamatan', fil: 'Ilagay ang pangalan ng distrito',
  },
  address: {
    'zh-TW': '完整地址（選填）', 'zh-CN': '完整地址（选填）', en: 'Full Address (optional)', ja: '住所（任意）', ko: '주소 (선택)',
    th: 'ที่อยู่ (ไม่จำเป็น)', vi: 'Địa chỉ (tùy chọn)', ms: 'Alamat (pilihan)', id: 'Alamat (opsional)', fil: 'Address (opsyonal)',
  },
  addressHint: {
    'zh-TW': '輸入完整地址以取得精確座標', 'zh-CN': '输入完整地址以获取精确坐标', en: 'Enter full address for accurate location', ja: '正確な位置を取得するため住所を入力', ko: '정확한 위치를 위해 주소 입력',
    th: 'ป้อนที่อยู่เพื่อระบุตำแหน่ง', vi: 'Nhập địa chỉ để định vị chính xác', ms: 'Masukkan alamat untuk lokasi tepat', id: 'Masukkan alamat untuk lokasi akurat', fil: 'Ilagay ang address para sa tumpak na lokasyon',
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
  autoFilled: {
    'zh-TW': '已自動填入地址資訊', 'zh-CN': '已自动填入地址信息', en: 'Address auto-filled', ja: '住所が自動入力されました', ko: '주소가 자동 입력되었습니다',
    th: 'กรอกที่อยู่อัตโนมัติแล้ว', vi: 'Đã tự động điền địa chỉ', ms: 'Alamat telah diisi', id: 'Alamat telah diisi', fil: 'Ang address ay napunan na',
  },
};

function t(key: string, lang: string): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang as LangCode] || entry['zh-TW'] || key;
}

/** 從地址文字自動偵測國家/城市/地區 */
function parseAddress(address: string): { country: string; city: string; district: string } {
  let country = '';
  let city = '';
  let district = '';

  // 台灣城市偵測
  const twCities = ['台北', '新北', '桃園', '台中', '台南', '高雄', '基隆', '新竹', '苗栗', '彰化', '南投', '雲林', '嘉義', '屏東', '宜蘭', '花蓮', '台東', '澎湖'];
  for (const c of twCities) {
    if (address.includes(c)) {
      country = '台灣';
      city = c;
      break;
    }
  }

  // 日本城市偵測
  if (!country) {
    const jpMap: Record<string, string> = { '東京': 'Tokyo', '大阪': 'Osaka', '京都': 'Kyoto', '福岡': 'Fukuoka', '沖繩': 'Okinawa', '北海道': 'Hokkaido', '名古屋': 'Nagoya' };
    for (const [zh, en] of Object.entries(jpMap)) {
      if (address.includes(zh) || address.toLowerCase().includes(en.toLowerCase())) {
        country = '日本';
        city = zh;
        break;
      }
    }
  }

  // 韓國
  if (!country) {
    const krMap: Record<string, string> = { '首爾': 'Seoul', '釜山': 'Busan', '濟州': 'Jeju' };
    for (const [zh, en] of Object.entries(krMap)) {
      if (address.includes(zh) || address.toLowerCase().includes(en.toLowerCase())) {
        country = '韓國';
        city = zh;
        break;
      }
    }
  }

  // 泰國
  if (!country && (address.includes('曼谷') || address.toLowerCase().includes('bangkok'))) {
    country = '泰國';
    city = '曼谷';
  }

  // 通用國家名偵測
  if (!country) {
    const countryMap: Record<string, string> = {
      'Taiwan': '台灣', 'Japan': '日本', 'Korea': '韓國', 'Thailand': '泰國', 'Vietnam': '越南',
      'Singapore': '新加坡', 'Malaysia': '馬來西亞', 'Indonesia': '印尼', 'Philippines': '菲律賓',
    };
    for (const [en, zh] of Object.entries(countryMap)) {
      if (address.includes(zh) || address.toLowerCase().includes(en.toLowerCase())) {
        country = zh;
        break;
      }
    }
  }

  // 地區（X區、X郡、X町）
  const districtMatch = address.match(/(.{1,4}[區郡町村])/);
  if (districtMatch) {
    district = districtMatch[1];
  }

  return { country, city, district };
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
  const [extracted, setExtracted] = useState<{ platform: string; title: string | null; description: string | null; thumbnail_url: string | null; author: string | null; address: string | null; og_data: Record<string, unknown> } | null>(null);
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState<BookmarkCategory[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [autoFilled, setAutoFilled] = useState(false);

  const handleExtract = async () => {
    if (!url.trim()) return;
    setExtracting(true);
    setError('');
    setAutoFilled(false);
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
        // Auto-fill description
        if (data.description && !description) {
          setDescription(data.description);
        }
        // Auto-fill address field
        if (data.address && !address) {
          setAddress(data.address);
        }
        // Auto-fill country/city/district from address
        if (data.address) {
          const parsed = parseAddress(data.address);
          if (parsed.country && !country) setCountry(parsed.country);
          if (parsed.city && !city) setCity(parsed.city);
          if (parsed.district && !district) setDistrict(parsed.district);
          if (parsed.country || parsed.city) setAutoFilled(true);
        }
      }
    } catch {
      setError('Failed to extract');
    }
    setExtracting(false);
  };

  const handleSubmit = async () => {
    if (!city.trim() || categories.length === 0 || !extracted) return;
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
          country_slug: country.trim() || null,
          city_slug: city.trim(),
          district: district.trim() || null,
          category: categories.join(','),
          og_data: extracted.og_data,
          created_by: userId || null,
          address: address.trim() || extracted.address || null,
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
    setCountry('');
    setCity('');
    setDistrict('');
    setAddress('');
    setCategories([]);
    setSuccess(false);
    setError('');
    setAutoFilled(false);
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

                {autoFilled && (
                  <p className="bm-modal-autofill-hint">{t('autoFilled', lang)}</p>
                )}

                <div className="bm-modal-row">
                  <div className="bm-modal-field bm-modal-field-half">
                    <label>{t('country', lang)}</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder={t('countryHint', lang)}
                      className="bm-modal-input"
                      maxLength={30}
                    />
                  </div>
                  <div className="bm-modal-field bm-modal-field-half">
                    <label>{t('city', lang)}</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t('cityHint', lang)}
                      className="bm-modal-input"
                      maxLength={30}
                    />
                  </div>
                </div>

                <div className="bm-modal-field">
                  <label>{t('district', lang)}</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder={t('districtHint', lang)}
                    className="bm-modal-input"
                    maxLength={30}
                  />
                </div>

                <div className="bm-modal-field">
                  <label>{t('address', lang)}</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('addressHint', lang)}
                    className="bm-modal-input"
                    maxLength={100}
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
                  disabled={submitting || !city.trim() || categories.length === 0}
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
