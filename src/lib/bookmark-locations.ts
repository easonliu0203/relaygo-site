type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

export interface LocationEntry {
  slug: string;
  names: Record<LangCode, string>;
}

export const COUNTRIES: LocationEntry[] = [
  { slug: 'taiwan', names: { 'zh-TW': '台灣', 'zh-CN': '台湾', en: 'Taiwan', ja: '台湾', ko: '대만', th: 'ไต้หวัน', vi: 'Đài Loan', ms: 'Taiwan', id: 'Taiwan', fil: 'Taiwan' } },
  { slug: 'japan', names: { 'zh-TW': '日本', 'zh-CN': '日本', en: 'Japan', ja: '日本', ko: '일본', th: 'ญี่ปุ่น', vi: 'Nhật Bản', ms: 'Jepun', id: 'Jepang', fil: 'Japan' } },
  { slug: 'korea', names: { 'zh-TW': '韓國', 'zh-CN': '韩国', en: 'Korea', ja: '韓国', ko: '한국', th: 'เกาหลี', vi: 'Hàn Quốc', ms: 'Korea', id: 'Korea', fil: 'Korea' } },
  { slug: 'thailand', names: { 'zh-TW': '泰國', 'zh-CN': '泰国', en: 'Thailand', ja: 'タイ', ko: '태국', th: 'ไทย', vi: 'Thái Lan', ms: 'Thailand', id: 'Thailand', fil: 'Thailand' } },
  { slug: 'vietnam', names: { 'zh-TW': '越南', 'zh-CN': '越南', en: 'Vietnam', ja: 'ベトナム', ko: '베트남', th: 'เวียดนาม', vi: 'Việt Nam', ms: 'Vietnam', id: 'Vietnam', fil: 'Vietnam' } },
];

/** Taiwan cities — slug → localized names (matches city-names.ts keys) */
export const CITIES: Record<string, LocationEntry[]> = {
  taiwan: [
    { slug: 'taipei', names: { 'zh-TW': '台北', 'zh-CN': '台北', en: 'Taipei', ja: '台北', ko: '타이베이', th: 'ไทเป', vi: 'Đài Bắc', ms: 'Taipei', id: 'Taipei', fil: 'Taipei' } },
    { slug: 'new-taipei', names: { 'zh-TW': '新北', 'zh-CN': '新北', en: 'New Taipei', ja: '新北', ko: '신베이', th: 'ซินเป่ย', vi: 'Tân Bắc', ms: 'New Taipei', id: 'New Taipei', fil: 'New Taipei' } },
    { slug: 'keelung', names: { 'zh-TW': '基隆', 'zh-CN': '基隆', en: 'Keelung', ja: '基隆', ko: '지룽', th: 'จีหลง', vi: 'Cơ Long', ms: 'Keelung', id: 'Keelung', fil: 'Keelung' } },
    { slug: 'taoyuan', names: { 'zh-TW': '桃園', 'zh-CN': '桃园', en: 'Taoyuan', ja: '桃園', ko: '타오위안', th: 'เถาหยวน', vi: 'Đào Viên', ms: 'Taoyuan', id: 'Taoyuan', fil: 'Taoyuan' } },
    { slug: 'hsinchu', names: { 'zh-TW': '新竹', 'zh-CN': '新竹', en: 'Hsinchu', ja: '新竹', ko: '신주', th: 'ซินจู๋', vi: 'Tân Trúc', ms: 'Hsinchu', id: 'Hsinchu', fil: 'Hsinchu' } },
    { slug: 'yilan', names: { 'zh-TW': '宜蘭', 'zh-CN': '宜兰', en: 'Yilan', ja: '宜蘭', ko: '이란', th: 'อี๋หลาน', vi: 'Nghi Lan', ms: 'Yilan', id: 'Yilan', fil: 'Yilan' } },
    { slug: 'miaoli', names: { 'zh-TW': '苗栗', 'zh-CN': '苗栗', en: 'Miaoli', ja: '苗栗', ko: '먀오리', th: 'เหมียวลี่', vi: 'Miêu Lật', ms: 'Miaoli', id: 'Miaoli', fil: 'Miaoli' } },
    { slug: 'taichung', names: { 'zh-TW': '台中', 'zh-CN': '台中', en: 'Taichung', ja: '台中', ko: '타이중', th: 'ไถจง', vi: 'Đài Trung', ms: 'Taichung', id: 'Taichung', fil: 'Taichung' } },
    { slug: 'changhua', names: { 'zh-TW': '彰化', 'zh-CN': '彰化', en: 'Changhua', ja: '彰化', ko: '장화', th: 'จางฮว่า', vi: 'Chương Hóa', ms: 'Changhua', id: 'Changhua', fil: 'Changhua' } },
    { slug: 'nantou', names: { 'zh-TW': '南投', 'zh-CN': '南投', en: 'Nantou', ja: '南投', ko: '난터우', th: 'หนานโถว', vi: 'Nam Đầu', ms: 'Nantou', id: 'Nantou', fil: 'Nantou' } },
    { slug: 'yunlin', names: { 'zh-TW': '雲林', 'zh-CN': '云林', en: 'Yunlin', ja: '雲林', ko: '윈린', th: 'หยุนหลิน', vi: 'Vân Lâm', ms: 'Yunlin', id: 'Yunlin', fil: 'Yunlin' } },
    { slug: 'chiayi', names: { 'zh-TW': '嘉義', 'zh-CN': '嘉义', en: 'Chiayi', ja: '嘉義', ko: '자이', th: 'เจียอี้', vi: 'Gia Nghĩa', ms: 'Chiayi', id: 'Chiayi', fil: 'Chiayi' } },
    { slug: 'tainan', names: { 'zh-TW': '台南', 'zh-CN': '台南', en: 'Tainan', ja: '台南', ko: '타이난', th: 'ไถหนาน', vi: 'Đài Nam', ms: 'Tainan', id: 'Tainan', fil: 'Tainan' } },
    { slug: 'kaohsiung', names: { 'zh-TW': '高雄', 'zh-CN': '高雄', en: 'Kaohsiung', ja: '高雄', ko: '가오슝', th: 'เกาสง', vi: 'Cao Hùng', ms: 'Kaohsiung', id: 'Kaohsiung', fil: 'Kaohsiung' } },
    { slug: 'pingtung', names: { 'zh-TW': '屏東', 'zh-CN': '屏东', en: 'Pingtung', ja: '屏東', ko: '핑둥', th: 'ผิงตง', vi: 'Bình Đông', ms: 'Pingtung', id: 'Pingtung', fil: 'Pingtung' } },
    { slug: 'hualien', names: { 'zh-TW': '花蓮', 'zh-CN': '花莲', en: 'Hualien', ja: '花蓮', ko: '화롄', th: 'ฮัวเหลียน', vi: 'Hoa Liên', ms: 'Hualien', id: 'Hualien', fil: 'Hualien' } },
    { slug: 'taitung', names: { 'zh-TW': '台東', 'zh-CN': '台东', en: 'Taitung', ja: '台東', ko: '타이둥', th: 'ไถตง', vi: 'Đài Đông', ms: 'Taitung', id: 'Taitung', fil: 'Taitung' } },
  ],
  japan: [
    { slug: 'tokyo', names: { 'zh-TW': '東京', 'zh-CN': '东京', en: 'Tokyo', ja: '東京', ko: '도쿄', th: 'โตเกียว', vi: 'Tokyo', ms: 'Tokyo', id: 'Tokyo', fil: 'Tokyo' } },
    { slug: 'osaka', names: { 'zh-TW': '大阪', 'zh-CN': '大阪', en: 'Osaka', ja: '大阪', ko: '오사카', th: 'โอซากา', vi: 'Osaka', ms: 'Osaka', id: 'Osaka', fil: 'Osaka' } },
    { slug: 'kyoto', names: { 'zh-TW': '京都', 'zh-CN': '京都', en: 'Kyoto', ja: '京都', ko: '교토', th: 'เกียวโต', vi: 'Kyoto', ms: 'Kyoto', id: 'Kyoto', fil: 'Kyoto' } },
    { slug: 'fukuoka', names: { 'zh-TW': '福岡', 'zh-CN': '福冈', en: 'Fukuoka', ja: '福岡', ko: '후쿠오카', th: 'ฟุกุโอกะ', vi: 'Fukuoka', ms: 'Fukuoka', id: 'Fukuoka', fil: 'Fukuoka' } },
    { slug: 'okinawa', names: { 'zh-TW': '沖繩', 'zh-CN': '冲绳', en: 'Okinawa', ja: '沖縄', ko: '오키나와', th: 'โอกินาวา', vi: 'Okinawa', ms: 'Okinawa', id: 'Okinawa', fil: 'Okinawa' } },
    { slug: 'hokkaido', names: { 'zh-TW': '北海道', 'zh-CN': '北海道', en: 'Hokkaido', ja: '北海道', ko: '홋카이도', th: 'ฮอกไกโด', vi: 'Hokkaido', ms: 'Hokkaido', id: 'Hokkaido', fil: 'Hokkaido' } },
  ],
  korea: [
    { slug: 'seoul', names: { 'zh-TW': '首爾', 'zh-CN': '首尔', en: 'Seoul', ja: 'ソウル', ko: '서울', th: 'โซล', vi: 'Seoul', ms: 'Seoul', id: 'Seoul', fil: 'Seoul' } },
    { slug: 'busan', names: { 'zh-TW': '釜山', 'zh-CN': '釜山', en: 'Busan', ja: '釜山', ko: '부산', th: 'ปูซาน', vi: 'Busan', ms: 'Busan', id: 'Busan', fil: 'Busan' } },
    { slug: 'jeju', names: { 'zh-TW': '濟州', 'zh-CN': '济州', en: 'Jeju', ja: '済州', ko: '제주', th: 'เชจู', vi: 'Jeju', ms: 'Jeju', id: 'Jeju', fil: 'Jeju' } },
  ],
  thailand: [
    { slug: 'bangkok', names: { 'zh-TW': '曼谷', 'zh-CN': '曼谷', en: 'Bangkok', ja: 'バンコク', ko: '방콕', th: 'กรุงเทพ', vi: 'Bangkok', ms: 'Bangkok', id: 'Bangkok', fil: 'Bangkok' } },
    { slug: 'chiang-mai', names: { 'zh-TW': '清邁', 'zh-CN': '清迈', en: 'Chiang Mai', ja: 'チェンマイ', ko: '치앙마이', th: 'เชียงใหม่', vi: 'Chiang Mai', ms: 'Chiang Mai', id: 'Chiang Mai', fil: 'Chiang Mai' } },
    { slug: 'phuket', names: { 'zh-TW': '普吉島', 'zh-CN': '普吉岛', en: 'Phuket', ja: 'プーケット', ko: '푸켓', th: 'ภูเก็ต', vi: 'Phuket', ms: 'Phuket', id: 'Phuket', fil: 'Phuket' } },
  ],
  vietnam: [
    { slug: 'hanoi', names: { 'zh-TW': '河內', 'zh-CN': '河内', en: 'Hanoi', ja: 'ハノイ', ko: '하노이', th: 'ฮานอย', vi: 'Hà Nội', ms: 'Hanoi', id: 'Hanoi', fil: 'Hanoi' } },
    { slug: 'ho-chi-minh', names: { 'zh-TW': '胡志明市', 'zh-CN': '胡志明市', en: 'Ho Chi Minh City', ja: 'ホーチミン', ko: '호찌민', th: 'โฮจิมินห์', vi: 'TP. Hồ Chí Minh', ms: 'Ho Chi Minh', id: 'Ho Chi Minh', fil: 'Ho Chi Minh' } },
    { slug: 'da-nang', names: { 'zh-TW': '峴港', 'zh-CN': '岘港', en: 'Da Nang', ja: 'ダナン', ko: '다낭', th: 'ดานัง', vi: 'Đà Nẵng', ms: 'Da Nang', id: 'Da Nang', fil: 'Da Nang' } },
  ],
};

/** Get all country slugs */
export function getCountrySlugs(): string[] {
  return COUNTRIES.map((c) => c.slug);
}

/** Get all city slugs for a country */
export function getCitySlugs(countrySlug: string): string[] {
  return (CITIES[countrySlug] || []).map((c) => c.slug);
}

/** Localized country name */
export function localizedCountry(slug: string, lang: string): string {
  const entry = COUNTRIES.find((c) => c.slug === slug);
  if (!entry) return slug;
  return entry.names[lang as LangCode] || entry.names['zh-TW'] || slug;
}

/** Localized city name */
export function localizedCityBySlug(countrySlug: string, citySlug: string, lang: string): string {
  const cities = CITIES[countrySlug] || [];
  const entry = cities.find((c) => c.slug === citySlug);
  if (!entry) return citySlug;
  return entry.names[lang as LangCode] || entry.names['zh-TW'] || citySlug;
}

/** Validate a country slug exists */
export function isValidCountry(slug: string): boolean {
  return COUNTRIES.some((c) => c.slug === slug);
}

/** Validate a city slug exists under a country */
export function isValidCity(countrySlug: string, citySlug: string): boolean {
  return (CITIES[countrySlug] || []).some((c) => c.slug === citySlug);
}
