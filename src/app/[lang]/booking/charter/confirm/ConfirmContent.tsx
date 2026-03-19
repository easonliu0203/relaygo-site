'use client';

import { useState, useEffect } from 'react';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import '../charter.css';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

interface BookingData {
  packageId: string;
  packageName: string;
  packageDesc: string;
  vehicleType: string;
  duration: number;
  price: number;
  originalPrice: number;
  overtimeRate: number;
  passengers: number;
  luggage: number;
  dateTime: string;
  pickup: string;
  dropoff: string;
  notes: string;
  city: string;
  region: string;
  addAirportPickup: boolean;
  pickupAirport?: string;
  pickupFlight?: string;
  pickupFlightInfo?: { airportName: string; airportCode: string; terminal?: string; scheduledTime?: string };
  addAirportDropoff: boolean;
  dropoffAirport?: string;
  dropoffFlight?: string;
  dropoffFlightInfo?: { airportName: string; airportCode: string; terminal?: string; scheduledTime?: string };
  guideSlug: string;
  lang: string;
}

const VEHICLE_ICONS: Record<string, string> = { S: '🚗', M: '🚙', L: '🚐', XL: '✨' };
const VEHICLE_NAMES: Record<string, Record<string, string>> = {
  S: { 'zh-TW': '五人座轎車', en: 'Sedan' },
  M: { 'zh-TW': '五人座休旅車', en: 'SUV' },
  L: { 'zh-TW': '九人座休旅車', en: 'Van (9 seats)' },
  XL: { 'zh-TW': 'Toyota Alphard', en: 'Toyota Alphard' },
};

const UI: Record<string, Record<string, string>> = {
  title: {
    'zh-TW': '確認訂單', 'zh-CN': '确认订单', en: 'Confirm Order', ja: '注文確認',
    ko: '주문 확인', th: 'ยืนยันคำสั่ง', vi: 'Xác nhận đơn', ms: 'Sahkan tempahan',
    id: 'Konfirmasi pesanan', fil: 'Kumpirmahin',
  },
  back: {
    'zh-TW': '← 返回修改', 'zh-CN': '← 返回修改', en: '← Back to Edit', ja: '← 修正に戻る',
    ko: '← 수정으로 돌아가기', th: '← กลับแก้ไข', vi: '← Quay lại sửa', ms: '← Kembali edit',
    id: '← Kembali edit', fil: '← Bumalik sa pag-edit',
  },
  tourPlan: {
    'zh-TW': '旅遊方案', 'zh-CN': '旅游方案', en: 'Tour Plan', ja: 'ツアープラン',
    ko: '투어 플랜', th: 'แผนทัวร์', vi: 'Gói tour', ms: 'Pelan lawatan',
    id: 'Paket wisata', fil: 'Tour plan',
  },
  vehicle: {
    'zh-TW': '車型方案', 'zh-CN': '车型方案', en: 'Vehicle Plan', ja: '車種プラン',
    ko: '차종 플랜', th: 'แผนรถ', vi: 'Gói xe', ms: 'Pelan kenderaan',
    id: 'Paket kendaraan', fil: 'Plano ng sasakyan',
  },
  bookingTime: {
    'zh-TW': '預約時間', 'zh-CN': '预约时间', en: 'Booking Time', ja: '予約日時',
    ko: '예약 일시', th: 'วันเวลาจอง', vi: 'Thời gian', ms: 'Masa tempahan',
    id: 'Waktu pemesanan', fil: 'Oras ng booking',
  },
  pickupLabel: {
    'zh-TW': '上車地點', 'zh-CN': '上车地点', en: 'Pickup', ja: '乗車場所',
    ko: '탑승 장소', th: 'จุดรับ', vi: 'Điểm đón', ms: 'Lokasi naik',
    id: 'Jemput', fil: 'Pickup',
  },
  dropoffLabel: {
    'zh-TW': '下車地點', 'zh-CN': '下车地点', en: 'Dropoff', ja: '降車場所',
    ko: '하차 장소', th: 'จุดส่ง', vi: 'Điểm trả', ms: 'Lokasi turun',
    id: 'Turun', fil: 'Dropoff',
  },
  pax: {
    'zh-TW': '乘客 / 行李', 'zh-CN': '乘客 / 行李', en: 'Passengers / Luggage', ja: '乗客 / 荷物',
    ko: '탑승 / 수하물', th: 'ผู้โดยสาร / กระเป๋า', vi: 'Hành khách / Hành lý', ms: 'Penumpang / Bagasi',
    id: 'Penumpang / Bagasi', fil: 'Pasahero / Bagahe',
  },
  airportPickup: {
    'zh-TW': '加購接機', 'zh-CN': '加购接机', en: 'Airport Pickup', ja: '空港送迎',
    ko: '공항 픽업', th: 'รับสนามบิน', vi: 'Đón sân bay', ms: 'Jemput lapangan terbang',
    id: 'Jemput bandara', fil: 'Airport pickup',
  },
  airportDropoff: {
    'zh-TW': '加購送機', 'zh-CN': '加购送机', en: 'Airport Dropoff', ja: '空港送り',
    ko: '공항 드롭오프', th: 'ส่งสนามบิน', vi: 'Đưa sân bay', ms: 'Hantar lapangan terbang',
    id: 'Antar bandara', fil: 'Airport dropoff',
  },
  notesLabel: {
    'zh-TW': '備註', 'zh-CN': '备注', en: 'Notes', ja: '備考',
    ko: '메모', th: 'หมายเหตุ', vi: 'Ghi chú', ms: 'Nota',
    id: 'Catatan', fil: 'Tala',
  },
  charterFee: {
    'zh-TW': '包車費用', 'zh-CN': '包车费用', en: 'Charter Fee', ja: 'チャーター料金',
    ko: '전세 요금', th: 'ค่ารถเหมา', vi: 'Phí thuê xe', ms: 'Caj charter',
    id: 'Biaya charter', fil: 'Charter fee',
  },
  deposit: {
    'zh-TW': '訂金（30%）', 'zh-CN': '订金（30%）', en: 'Deposit (30%)', ja: 'デポジット（30%）',
    ko: '보증금 (30%)', th: 'มัดจำ (30%)', vi: 'Đặt cọc (30%)', ms: 'Deposit (30%)',
    id: 'Deposit (30%)', fil: 'Deposito (30%)',
  },
  payDeposit: {
    'zh-TW': '支付訂金', 'zh-CN': '支付订金', en: 'Pay Deposit', ja: 'デポジットを支払う',
    ko: '보증금 결제', th: 'ชำระมัดจำ', vi: 'Thanh toán đặt cọc', ms: 'Bayar deposit',
    id: 'Bayar deposit', fil: 'Magbayad ng deposito',
  },
  hours: {
    'zh-TW': '小時', 'zh-CN': '小时', en: 'hrs', ja: '時間', ko: '시간', th: 'ชม.', vi: 'giờ', ms: 'jam', id: 'jam', fil: 'oras',
  },
  overtime: {
    'zh-TW': '超時費率', 'zh-CN': '超时费率', en: 'Overtime rate', ja: '超過料金', ko: '초과 요금',
    th: 'ค่าล่วงเวลา', vi: 'Phí ngoài giờ', ms: 'Kadar lebih masa', id: 'Tarif lembur', fil: 'Overtime',
  },
  perHour: {
    'zh-TW': '/小時', 'zh-CN': '/小时', en: '/hr', ja: '/時間', ko: '/시간', th: '/ชม.', vi: '/giờ', ms: '/jam', id: '/jam', fil: '/oras',
  },
  noData: {
    'zh-TW': '無訂單資料，請重新填寫', 'zh-CN': '无订单数据，请重新填写', en: 'No booking data, please go back',
    ja: '予約データがありません', ko: '예약 데이터 없음', th: 'ไม่มีข้อมูล', vi: 'Không có dữ liệu',
    ms: 'Tiada data', id: 'Tidak ada data', fil: 'Walang data',
  },
  loginRequired: {
    'zh-TW': '支付功能即將上線，敬請期待！', 'zh-CN': '支付功能即将上线，敬请期待！',
    en: 'Payment feature coming soon!', ja: '支払い機能は近日公開予定です',
    ko: '결제 기능 곧 출시 예정', th: 'ฟังก์ชันชำระเงินเร็วๆ นี้', vi: 'Tính năng thanh toán sắp ra mắt',
    ms: 'Ciri pembayaran akan datang', id: 'Fitur pembayaran segera hadir', fil: 'Payment feature coming soon',
  },
};

function t(obj: Record<string, string>, lang: string): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString()}`;
}

function formatDateTime(dt: string, lang: string): string {
  try {
    const d = new Date(dt);
    return d.toLocaleString(lang === 'en' ? 'en-US' : 'zh-TW', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return dt; }
}

export default function ConfirmContent({ initialLang }: { initialLang: Locale }) {
  const lang = initialLang as LangCode;
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('relaygo_booking');
    if (raw) {
      try { setBooking(JSON.parse(raw)); } catch { /* skip */ }
    }
  }, []);

  if (!booking) {
    return (
      <div className="charter-page">
        <div className="charter-header">
          <div className="charter-header-inner">
            <h1 className="charter-title">{t(UI.title, lang)}</h1>
          </div>
        </div>
        <div className="charter-form">
          <div className="charter-section" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <p>{t(UI.noData, lang)}</p>
            <a href={`${langPrefix}/booking/charter`} className="charter-submit-btn" style={{ display: 'inline-flex', width: 'auto', marginTop: '16px', padding: '12px 32px' }}>
              {t(UI.back, lang)}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const depositRate = 0.3;
  const charterFee = booking.price;
  const totalPrice = charterFee; // TODO: + airport fee + surcharge
  const depositAmount = Math.ceil(totalPrice * depositRate);
  const vehicleName = VEHICLE_NAMES[booking.vehicleType]?.[lang] || VEHICLE_NAMES[booking.vehicleType]?.['zh-TW'] || booking.vehicleType;
  const vehicleIcon = VEHICLE_ICONS[booking.vehicleType] || '🚗';

  const handlePay = () => {
    // TODO: Firebase login check → create booking → pay deposit → redirect to GomyPay
    alert(t(UI.loginRequired, lang));
  };

  return (
    <div className="charter-page">
      <div className="charter-header">
        <div className="charter-header-inner">
          <a href={`${langPrefix}/booking/charter`} className="charter-back-link">
            {t(UI.back, lang)}
          </a>
          <h1 className="charter-title">{t(UI.title, lang)}</h1>
        </div>
      </div>

      <div className="charter-form">
        {/* Order Summary */}
        <div className="charter-section confirm-summary">
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.tourPlan, lang)}</span>
            <span className="confirm-value">📍 {booking.city}</span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.vehicle, lang)}</span>
            <span className="confirm-value">{vehicleIcon} {vehicleName} · {booking.duration}{t(UI.hours, lang)}</span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.bookingTime, lang)}</span>
            <span className="confirm-value">{formatDateTime(booking.dateTime, lang)}</span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.pickupLabel, lang)}</span>
            <span className="confirm-value">{booking.pickup || '—'}</span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.dropoffLabel, lang)}</span>
            <span className="confirm-value">{booking.dropoff || '—'}</span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.pax, lang)}</span>
            <span className="confirm-value">👤 {booking.passengers} 🧳 {booking.luggage}</span>
          </div>

          {booking.addAirportPickup && booking.pickupFlightInfo && (
            <div className="confirm-row">
              <span className="confirm-label">✈️ {t(UI.airportPickup, lang)}</span>
              <span className="confirm-value">
                {booking.pickupFlightInfo.airportName}({booking.pickupFlightInfo.airportCode})
                {booking.pickupFlightInfo.terminal ? ` ${booking.pickupFlightInfo.terminal}` : ''}
                {' '}{booking.pickupFlight}
                {booking.pickupFlightInfo.scheduledTime ? ` ${booking.pickupFlightInfo.scheduledTime}` : ''}
              </span>
            </div>
          )}

          {booking.addAirportDropoff && booking.dropoffFlightInfo && (
            <div className="confirm-row">
              <span className="confirm-label">✈️ {t(UI.airportDropoff, lang)}</span>
              <span className="confirm-value">
                {booking.dropoffFlightInfo.airportName}({booking.dropoffFlightInfo.airportCode})
                {booking.dropoffFlightInfo.terminal ? ` ${booking.dropoffFlightInfo.terminal}` : ''}
                {' '}{booking.dropoffFlight}
                {booking.dropoffFlightInfo.scheduledTime ? ` ${booking.dropoffFlightInfo.scheduledTime}` : ''}
              </span>
            </div>
          )}

          {booking.notes && (
            <div className="confirm-row">
              <span className="confirm-label">{t(UI.notesLabel, lang)}</span>
              <span className="confirm-value">{booking.notes}</span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="charter-section confirm-pricing">
          <div className="confirm-price-row">
            <span>{t(UI.charterFee, lang)}</span>
            <span>{formatPrice(charterFee)}</span>
          </div>
          <div className="confirm-price-row sub">
            <span>{vehicleIcon} {vehicleName} {booking.duration}{t(UI.hours, lang)}</span>
            <span></span>
          </div>
          <div className="confirm-price-row sub">
            <span>{t(UI.overtime, lang)}: {formatPrice(booking.overtimeRate)}{t(UI.perHour, lang)}</span>
            <span></span>
          </div>

          <div className="confirm-divider" />

          <div className="confirm-price-row deposit">
            <span>{t(UI.deposit, lang)}</span>
            <span className="confirm-deposit-amount">{formatPrice(depositAmount)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <button type="button" className="charter-submit-btn" onClick={handlePay}>
          💳 {t(UI.payDeposit, lang)} — {formatPrice(depositAmount)}
        </button>
      </div>
    </div>
  );
}
