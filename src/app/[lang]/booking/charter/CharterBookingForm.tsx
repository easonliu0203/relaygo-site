'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import './charter.css';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

const UI: Record<string, Record<string, string>> = {
  pageTitle: {
    'zh-TW': '包車預約',
    'zh-CN': '包车预约',
    en: 'Charter Booking',
    ja: 'チャーター予約',
    ko: '전세 예약',
    th: 'จองรถเหมา',
    vi: 'Đặt xe thuê',
    ms: 'Tempahan Charter',
    id: 'Pemesanan Charter',
    fil: 'Charter Booking',
  },
  backToGuide: {
    'zh-TW': '← 返回攻略',
    'zh-CN': '← 返回攻略',
    en: '← Back to Guide',
    ja: '← ガイドに戻る',
    ko: '← 가이드로 돌아가기',
    th: '← กลับไปไกด์',
    vi: '← Quay lại hướng dẫn',
    ms: '← Kembali ke panduan',
    id: '← Kembali ke panduan',
    fil: '← Bumalik sa gabay',
  },
  dateTime: {
    'zh-TW': '預約時間',
    'zh-CN': '预约时间',
    en: 'Pickup Date & Time',
    ja: '予約日時',
    ko: '예약 일시',
    th: 'วันเวลาที่จอง',
    vi: 'Ngày giờ đón',
    ms: 'Tarikh & Masa',
    id: 'Tanggal & Waktu',
    fil: 'Petsa at Oras',
  },
  dateTimePlaceholder: {
    'zh-TW': '請選擇預約時間',
    'zh-CN': '请选择预约时间',
    en: 'Select date and time',
    ja: '日時を選択',
    ko: '날짜와 시간 선택',
    th: 'เลือกวันเวลา',
    vi: 'Chọn ngày giờ',
    ms: 'Pilih tarikh dan masa',
    id: 'Pilih tanggal dan waktu',
    fil: 'Pumili ng petsa at oras',
  },
  pickup: {
    'zh-TW': '上車地點',
    'zh-CN': '上车地点',
    en: 'Pickup Location',
    ja: '乗車場所',
    ko: '탑승 장소',
    th: 'จุดรับ',
    vi: 'Điểm đón',
    ms: 'Lokasi naik',
    id: 'Lokasi jemput',
    fil: 'Lokasyon ng pagsakay',
  },
  pickupPlaceholder: {
    'zh-TW': '請輸入上車地點',
    'zh-CN': '请输入上车地点',
    en: 'Enter pickup location',
    ja: '乗車場所を入力',
    ko: '탑승 장소 입력',
    th: 'กรอกจุดรับ',
    vi: 'Nhập điểm đón',
    ms: 'Masukkan lokasi naik',
    id: 'Masukkan lokasi jemput',
    fil: 'Ilagay ang lokasyon ng pagsakay',
  },
  dropoff: {
    'zh-TW': '下車地點',
    'zh-CN': '下车地点',
    en: 'Dropoff Location',
    ja: '降車場所',
    ko: '하차 장소',
    th: 'จุดส่ง',
    vi: 'Điểm trả',
    ms: 'Lokasi turun',
    id: 'Lokasi turun',
    fil: 'Lokasyon ng pagbaba',
  },
  dropoffPlaceholder: {
    'zh-TW': '請輸入下車地點',
    'zh-CN': '请输入下车地点',
    en: 'Enter dropoff location',
    ja: '降車場所を入力',
    ko: '하차 장소 입력',
    th: 'กรอกจุดส่ง',
    vi: 'Nhập điểm trả',
    ms: 'Masukkan lokasi turun',
    id: 'Masukkan lokasi turun',
    fil: 'Ilagay ang lokasyon ng pagbaba',
  },
  passengers: {
    'zh-TW': '乘客人數',
    'zh-CN': '乘客人数',
    en: 'Passengers',
    ja: '乗客数',
    ko: '탑승 인원',
    th: 'จำนวนผู้โดยสาร',
    vi: 'Số hành khách',
    ms: 'Bilangan penumpang',
    id: 'Jumlah penumpang',
    fil: 'Bilang ng pasahero',
  },
  luggage: {
    'zh-TW': '行李數量（可選）',
    'zh-CN': '行李数量（可选）',
    en: 'Luggage (optional)',
    ja: '荷物数（任意）',
    ko: '수하물 수 (선택)',
    th: 'จำนวนกระเป๋า (ไม่บังคับ)',
    vi: 'Số hành lý (tùy chọn)',
    ms: 'Bilangan bagasi (pilihan)',
    id: 'Jumlah bagasi (opsional)',
    fil: 'Bilang ng bagahe (opsyonal)',
  },
  notes: {
    'zh-TW': '備註（可選）',
    'zh-CN': '备注（可选）',
    en: 'Notes (optional)',
    ja: '備考（任意）',
    ko: '메모 (선택)',
    th: 'หมายเหตุ (ไม่บังคับ)',
    vi: 'Ghi chú (tùy chọn)',
    ms: 'Nota (pilihan)',
    id: 'Catatan (opsional)',
    fil: 'Mga Tala (opsyonal)',
  },
  notesPlaceholder: {
    'zh-TW': '請輸入特殊需求或備註',
    'zh-CN': '请输入特殊需求或备注',
    en: 'Enter special requests or notes',
    ja: '特別なご要望やメモを入力',
    ko: '특별 요청이나 메모 입력',
    th: 'กรอกข้อมูลเพิ่มเติม',
    vi: 'Nhập yêu cầu đặc biệt',
    ms: 'Masukkan permintaan khas',
    id: 'Masukkan permintaan khusus',
    fil: 'Ilagay ang mga espesyal na kahilingan',
  },
  vehicleType: {
    'zh-TW': '車型選擇',
    'zh-CN': '车型选择',
    en: 'Vehicle Type',
    ja: '車種を選択',
    ko: '차종 선택',
    th: 'ประเภทรถ',
    vi: 'Loại xe',
    ms: 'Jenis kenderaan',
    id: 'Jenis kendaraan',
    fil: 'Uri ng sasakyan',
  },
  submit: {
    'zh-TW': '送出預約',
    'zh-CN': '提交预约',
    en: 'Submit Booking',
    ja: '予約を送信',
    ko: '예약 제출',
    th: 'ส่งการจอง',
    vi: 'Gửi đặt xe',
    ms: 'Hantar tempahan',
    id: 'Kirim pemesanan',
    fil: 'Isumite ang booking',
  },
  personUnit: {
    'zh-TW': '人',
    'zh-CN': '人',
    en: '',
    ja: '名',
    ko: '명',
    th: 'คน',
    vi: 'người',
    ms: 'orang',
    id: 'orang',
    fil: 'tao',
  },
  luggageUnit: {
    'zh-TW': '件',
    'zh-CN': '件',
    en: '',
    ja: '個',
    ko: '개',
    th: 'ใบ',
    vi: 'kiện',
    ms: 'beg',
    id: 'buah',
    fil: 'piraso',
  },
  hours: {
    'zh-TW': '小時',
    'zh-CN': '小时',
    en: 'hours',
    ja: '時間',
    ko: '시간',
    th: 'ชั่วโมง',
    vi: 'giờ',
    ms: 'jam',
    id: 'jam',
    fil: 'oras',
  },
  duration: {
    'zh-TW': '用車時數',
    'zh-CN': '用车时长',
    en: 'Duration',
    ja: '利用時間',
    ko: '이용 시간',
    th: 'ระยะเวลา',
    vi: 'Thời lượng',
    ms: 'Tempoh',
    id: 'Durasi',
    fil: 'Tagal',
  },
};

const VEHICLES = [
  { type: 'S', name: { 'zh-TW': '五人座轎車', 'zh-CN': '五人座轿车', en: 'Sedan (5 seats)', ja: '5人乗りセダン', ko: '5인승 세단', th: 'รถเก๋ง 5 ที่นั่ง', vi: 'Sedan 5 chỗ', ms: 'Sedan 5 tempat duduk', id: 'Sedan 5 kursi', fil: 'Sedan 5 upuan' }, icon: '🚗', maxPax: 4, maxLuggage: 3 },
  { type: 'M', name: { 'zh-TW': '五人座休旅車', 'zh-CN': '五人座SUV', en: 'SUV (5 seats)', ja: '5人乗りSUV', ko: '5인승 SUV', th: 'SUV 5 ที่นั่ง', vi: 'SUV 5 chỗ', ms: 'SUV 5 tempat duduk', id: 'SUV 5 kursi', fil: 'SUV 5 upuan' }, icon: '🚙', maxPax: 4, maxLuggage: 4 },
  { type: 'L', name: { 'zh-TW': '九人座休旅車', 'zh-CN': '九人座商务车', en: 'Van (9 seats)', ja: '9人乗りバン', ko: '9인승 밴', th: 'รถตู้ 9 ที่นั่ง', vi: 'Van 9 chỗ', ms: 'Van 9 tempat duduk', id: 'Van 9 kursi', fil: 'Van 9 upuan' }, icon: '🚐', maxPax: 8, maxLuggage: 8 },
  { type: 'XL', name: { 'zh-TW': 'Toyota Alphard', 'zh-CN': 'Toyota Alphard', en: 'Toyota Alphard', ja: 'トヨタ アルファード', ko: '토요타 알파드', th: 'Toyota Alphard', vi: 'Toyota Alphard', ms: 'Toyota Alphard', id: 'Toyota Alphard', fil: 'Toyota Alphard' }, icon: '✨', maxPax: 6, maxLuggage: 4 },
];

const DURATION_OPTIONS = [6, 8, 10];

function t(obj: Record<string, string>, lang: string): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

export default function CharterBookingForm({ initialLang }: { initialLang: Locale }) {
  return (
    <Suspense fallback={<div className="charter-page"><div className="charter-header"><div className="charter-header-inner"><h1 className="charter-title">{t(UI.pageTitle, initialLang)}</h1></div></div></div>}>
      <CharterBookingInner initialLang={initialLang} />
    </Suspense>
  );
}

function CharterBookingInner({ initialLang }: { initialLang: Locale }) {
  const lang = initialLang as LangCode;
  const searchParams = useSearchParams();
  const guideSlug = searchParams.get('guide') || '';
  const guideCity = searchParams.get('city') || '';
  const guideHours = parseInt(searchParams.get('hours') || '8', 10);
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';

  const [selectedVehicle, setSelectedVehicle] = useState('M');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(0);
  const [duration, setDuration] = useState(guideHours || 8);
  const [dateTime, setDateTime] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [notes, setNotes] = useState('');

  const currentVehicle = VEHICLES.find((v) => v.type === selectedVehicle)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend API
    const bookingData = {
      vehicleType: selectedVehicle,
      passengers,
      luggage,
      duration,
      dateTime,
      pickup,
      dropoff,
      notes,
      guideSlug,
      guideCity,
      lang: initialLang,
    };
    console.log('Booking data:', bookingData);
    alert(lang === 'zh-TW' || lang === 'zh-CN' ? '預約功能即將上線，敬請期待！' : 'Booking feature coming soon!');
  };

  // Minimum datetime: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0);
  const minDateTime = tomorrow.toISOString().slice(0, 16);

  return (
    <div className="charter-page">
      <div className="charter-header">
        <div className="charter-header-inner">
          {guideSlug && (
            <a href={`${langPrefix}/guide/${guideSlug}`} className="charter-back-link">
              {t(UI.backToGuide, lang)}
            </a>
          )}
          <h1 className="charter-title">{t(UI.pageTitle, lang)}</h1>
          {guideCity && (
            <p className="charter-subtitle">📍 {guideCity} · {duration}{t(UI.hours, lang)}</p>
          )}
        </div>
      </div>

      <form className="charter-form" onSubmit={handleSubmit}>
        {/* Date & Time */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.dateTime, lang)}</label>
          <input
            type="datetime-local"
            className="charter-input"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            min={minDateTime}
            required
          />
        </div>

        {/* Pickup */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.pickup, lang)}</label>
          <input
            type="text"
            className="charter-input"
            placeholder={t(UI.pickupPlaceholder, lang)}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>

        {/* Dropoff */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.dropoff, lang)}</label>
          <input
            type="text"
            className="charter-input"
            placeholder={t(UI.dropoffPlaceholder, lang)}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>

        {/* Duration */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.duration, lang)}</label>
          <div className="charter-duration-row">
            {DURATION_OPTIONS.map((h) => (
              <button
                key={h}
                type="button"
                className={`charter-duration-btn ${duration === h ? 'active' : ''}`}
                onClick={() => setDuration(h)}
              >
                {h} {t(UI.hours, lang)}
              </button>
            ))}
          </div>
        </div>

        {/* Passengers */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.passengers, lang)}</label>
          <div className="charter-stepper">
            <button type="button" className="charter-stepper-btn" onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
            <span className="charter-stepper-value">{passengers} {t(UI.personUnit, lang)}</span>
            <button type="button" className="charter-stepper-btn" onClick={() => setPassengers(Math.min(currentVehicle.maxPax, passengers + 1))}>+</button>
          </div>
        </div>

        {/* Luggage */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.luggage, lang)}</label>
          <div className="charter-stepper">
            <button type="button" className="charter-stepper-btn" onClick={() => setLuggage(Math.max(0, luggage - 1))}>−</button>
            <span className="charter-stepper-value">{luggage} {t(UI.luggageUnit, lang)}</span>
            <button type="button" className="charter-stepper-btn" onClick={() => setLuggage(Math.min(currentVehicle.maxLuggage, luggage + 1))}>+</button>
          </div>
        </div>

        {/* Notes */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.notes, lang)}</label>
          <textarea
            className="charter-input charter-textarea"
            placeholder={t(UI.notesPlaceholder, lang)}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Vehicle Selection */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.vehicleType, lang)}</label>
          <div className="charter-vehicles">
            {VEHICLES.map((v) => (
              <button
                key={v.type}
                type="button"
                className={`charter-vehicle-card ${selectedVehicle === v.type ? 'active' : ''}`}
                onClick={() => {
                  setSelectedVehicle(v.type);
                  if (passengers > v.maxPax) setPassengers(v.maxPax);
                  if (luggage > v.maxLuggage) setLuggage(v.maxLuggage);
                }}
              >
                <span className="charter-vehicle-icon">{v.icon}</span>
                <span className="charter-vehicle-name">{t(v.name, lang)}</span>
                <span className="charter-vehicle-pax">👤 {v.maxPax} 🧳 {v.maxLuggage}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="charter-submit-btn">
          {t(UI.submit, lang)}
        </button>
      </form>
    </div>
  );
}
