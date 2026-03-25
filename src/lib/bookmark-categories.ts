type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

export const CATEGORIES = ['food', 'attraction', 'photo', 'stay', 'activity', 'hiking', 'dessert', 'hidden', 'shop', 'cafe'] as const;
export type BookmarkCategory = typeof CATEGORIES[number];

export const CATEGORY_NAMES: Record<BookmarkCategory, Record<LangCode, string>> = {
  food:       { 'zh-TW': '美食', 'zh-CN': '美食', en: 'Food', ja: 'グルメ', ko: '맛집', th: 'อาหาร', vi: 'Ẩm thực', ms: 'Makanan', id: 'Kuliner', fil: 'Pagkain' },
  attraction: { 'zh-TW': '景點', 'zh-CN': '景点', en: 'Attractions', ja: '観光', ko: '명소', th: 'สถานที่', vi: 'Điểm đến', ms: 'Tempat Menarik', id: 'Wisata', fil: 'Destinasyon' },
  photo:      { 'zh-TW': '攝影', 'zh-CN': '摄影', en: 'Photography', ja: '撮影', ko: '사진', th: 'ถ่ายรูป', vi: 'Nhiếp ảnh', ms: 'Fotografi', id: 'Fotografi', fil: 'Litrato' },
  stay:       { 'zh-TW': '住宿', 'zh-CN': '住宿', en: 'Stay', ja: '宿泊', ko: '숙소', th: 'ที่พัก', vi: 'Lưu trú', ms: 'Penginapan', id: 'Penginapan', fil: 'Tuluyan' },
  activity:   { 'zh-TW': '活動', 'zh-CN': '活动', en: 'Activities', ja: 'イベント', ko: '액티비티', th: 'กิจกรรม', vi: 'Hoạt động', ms: 'Aktiviti', id: 'Aktivitas', fil: 'Aktibidad' },
  hiking:     { 'zh-TW': '登山', 'zh-CN': '登山', en: 'Hiking', ja: '登山', ko: '등산', th: 'เดินป่า', vi: 'Leo núi', ms: 'Mendaki', id: 'Mendaki', fil: 'Hiking' },
  dessert:    { 'zh-TW': '甜點', 'zh-CN': '甜点', en: 'Desserts', ja: 'スイーツ', ko: '디저트', th: 'ขนม', vi: 'Tráng miệng', ms: 'Pencuci Mulut', id: 'Dessert', fil: 'Panghimagas' },
  hidden:     { 'zh-TW': '秘境', 'zh-CN': '秘境', en: 'Hidden Gems', ja: '秘境', ko: '숨은 명소', th: 'ที่ลับ', vi: 'Bí cảnh', ms: 'Permata Tersembunyi', id: 'Tempat Tersembunyi', fil: 'Nakatagong Yaman' },
  shop:       { 'zh-TW': '探店', 'zh-CN': '探店', en: 'Shop', ja: 'ショップ', ko: '탐방', th: 'ร้านค้า', vi: 'Khám phá', ms: 'Kedai', id: 'Toko', fil: 'Tindahan' },
  cafe:       { 'zh-TW': '咖啡', 'zh-CN': '咖啡', en: 'Cafe', ja: 'カフェ', ko: '카페', th: 'คาเฟ่', vi: 'Cà phê', ms: 'Kafe', id: 'Kafe', fil: 'Kape' },
};

export const CATEGORY_ICONS: Record<BookmarkCategory, string> = {
  food: '🍜', attraction: '📍', photo: '📸', stay: '🏨',
  activity: '🎉', hiking: '🥾', dessert: '🍰', hidden: '🔮',
  shop: '🛍️', cafe: '☕',
};

export function localizedCategory(cat: string, lang: string): string {
  const entry = CATEGORY_NAMES[cat as BookmarkCategory];
  if (!entry) return cat;
  return entry[lang as LangCode] || entry['zh-TW'] || cat;
}

export function categoryIcon(cat: string): string {
  return CATEGORY_ICONS[cat as BookmarkCategory] || '📌';
}
