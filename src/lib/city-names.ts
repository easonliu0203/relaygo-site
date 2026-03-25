type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

/** Localized city names — key is the zh-TW city stored in DB */
export const CITY_NAMES: Record<string, Record<LangCode, string>> = {
  '台北': { 'zh-TW': '台北', 'zh-CN': '台北', en: 'Taipei', ja: '台北', ko: '타이베이', th: 'ไทเป', vi: 'Đài Bắc', ms: 'Taipei', id: 'Taipei', fil: 'Taipei' },
  '新北': { 'zh-TW': '新北', 'zh-CN': '新北', en: 'New Taipei', ja: '新北', ko: '신베이', th: 'ซินเป่ย', vi: 'Tân Bắc', ms: 'New Taipei', id: 'New Taipei', fil: 'New Taipei' },
  '基隆': { 'zh-TW': '基隆', 'zh-CN': '基隆', en: 'Keelung', ja: '基隆', ko: '지룽', th: 'จีหลง', vi: 'Cơ Long', ms: 'Keelung', id: 'Keelung', fil: 'Keelung' },
  '桃園': { 'zh-TW': '桃園', 'zh-CN': '桃园', en: 'Taoyuan', ja: '桃園', ko: '타오위안', th: 'เถาหยวน', vi: 'Đào Viên', ms: 'Taoyuan', id: 'Taoyuan', fil: 'Taoyuan' },
  '新竹': { 'zh-TW': '新竹', 'zh-CN': '新竹', en: 'Hsinchu', ja: '新竹', ko: '신주', th: 'ซินจู๋', vi: 'Tân Trúc', ms: 'Hsinchu', id: 'Hsinchu', fil: 'Hsinchu' },
  '宜蘭': { 'zh-TW': '宜蘭', 'zh-CN': '宜兰', en: 'Yilan', ja: '宜蘭', ko: '이란', th: 'อี๋หลาน', vi: 'Nghi Lan', ms: 'Yilan', id: 'Yilan', fil: 'Yilan' },
  '苗栗': { 'zh-TW': '苗栗', 'zh-CN': '苗栗', en: 'Miaoli', ja: '苗栗', ko: '먀오리', th: 'เหมียวลี่', vi: 'Miêu Lật', ms: 'Miaoli', id: 'Miaoli', fil: 'Miaoli' },
  '台中': { 'zh-TW': '台中', 'zh-CN': '台中', en: 'Taichung', ja: '台中', ko: '타이중', th: 'ไถจง', vi: 'Đài Trung', ms: 'Taichung', id: 'Taichung', fil: 'Taichung' },
  '彰化': { 'zh-TW': '彰化', 'zh-CN': '彰化', en: 'Changhua', ja: '彰化', ko: '장화', th: 'จางฮว่า', vi: 'Chương Hóa', ms: 'Changhua', id: 'Changhua', fil: 'Changhua' },
  '南投': { 'zh-TW': '南投', 'zh-CN': '南投', en: 'Nantou', ja: '南投', ko: '난터우', th: 'หนานโถว', vi: 'Nam Đầu', ms: 'Nantou', id: 'Nantou', fil: 'Nantou' },
  '雲林': { 'zh-TW': '雲林', 'zh-CN': '云林', en: 'Yunlin', ja: '雲林', ko: '윈린', th: 'หยุนหลิน', vi: 'Vân Lâm', ms: 'Yunlin', id: 'Yunlin', fil: 'Yunlin' },
  '嘉義': { 'zh-TW': '嘉義', 'zh-CN': '嘉义', en: 'Chiayi', ja: '嘉義', ko: '자이', th: 'เจียอี้', vi: 'Gia Nghĩa', ms: 'Chiayi', id: 'Chiayi', fil: 'Chiayi' },
  '台南': { 'zh-TW': '台南', 'zh-CN': '台南', en: 'Tainan', ja: '台南', ko: '타이난', th: 'ไถหนาน', vi: 'Đài Nam', ms: 'Tainan', id: 'Tainan', fil: 'Tainan' },
  '高雄': { 'zh-TW': '高雄', 'zh-CN': '高雄', en: 'Kaohsiung', ja: '高雄', ko: '가오슝', th: 'เกาสง', vi: 'Cao Hùng', ms: 'Kaohsiung', id: 'Kaohsiung', fil: 'Kaohsiung' },
  '屏東': { 'zh-TW': '屏東', 'zh-CN': '屏东', en: 'Pingtung', ja: '屏東', ko: '핑둥', th: 'ผิงตง', vi: 'Bình Đông', ms: 'Pingtung', id: 'Pingtung', fil: 'Pingtung' },
  '花蓮': { 'zh-TW': '花蓮', 'zh-CN': '花莲', en: 'Hualien', ja: '花蓮', ko: '화롄', th: 'ฮัวเหลียน', vi: 'Hoa Liên', ms: 'Hualien', id: 'Hualien', fil: 'Hualien' },
  '台東': { 'zh-TW': '台東', 'zh-CN': '台东', en: 'Taitung', ja: '台東', ko: '타이둥', th: 'ไถตง', vi: 'Đài Đông', ms: 'Taitung', id: 'Taitung', fil: 'Taitung' },
};

/** Get localized city name, fallback to original */
export function localizedCity(city: string, lang: string): string {
  const entry = CITY_NAMES[city];
  if (!entry) return city;
  return entry[lang as LangCode] || entry['zh-TW'] || city;
}
