'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import './charter.css';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko' | 'th' | 'vi' | 'ms' | 'id' | 'fil';

interface VehiclePackage {
  id: string;
  name: string;
  description: string;
  capacityInfo: string;
  duration: number;
  originalPrice: number;
  discountPrice: number;
  overtimeRate: number;
  vehicleType: string;
}

const API_BASE = 'https://api.relaygo.pro';

const UI: Record<string, Record<string, string>> = {
  pageTitle: {
    'zh-TW': '包車預約', 'zh-CN': '包车预约', en: 'Charter Booking', ja: 'チャーター予約',
    ko: '전세 예약', th: 'จองรถเหมา', vi: 'Đặt xe thuê', ms: 'Tempahan Charter',
    id: 'Pemesanan Charter', fil: 'Charter Booking',
  },
  backToGuide: {
    'zh-TW': '← 返回攻略', 'zh-CN': '← 返回攻略', en: '← Back to Guide', ja: '← ガイドに戻る',
    ko: '← 가이드로 돌아가기', th: '← กลับไปไกด์', vi: '← Quay lại hướng dẫn', ms: '← Kembali ke panduan',
    id: '← Kembali ke panduan', fil: '← Bumalik sa gabay',
  },
  dateTime: {
    'zh-TW': '預約時間', 'zh-CN': '预约时间', en: 'Pickup Date & Time', ja: '予約日時',
    ko: '예약 일시', th: 'วันเวลาที่จอง', vi: 'Ngày giờ đón', ms: 'Tarikh & Masa',
    id: 'Tanggal & Waktu', fil: 'Petsa at Oras',
  },
  pickup: {
    'zh-TW': '上車地點', 'zh-CN': '上车地点', en: 'Pickup Location', ja: '乗車場所',
    ko: '탑승 장소', th: 'จุดรับ', vi: 'Điểm đón', ms: 'Lokasi naik',
    id: 'Lokasi jemput', fil: 'Lokasyon ng pagsakay',
  },
  pickupPlaceholder: {
    'zh-TW': '請輸入上車地點', 'zh-CN': '请输入上车地点', en: 'Enter pickup location', ja: '乗車場所を入力',
    ko: '탑승 장소 입력', th: 'กรอกจุดรับ', vi: 'Nhập điểm đón', ms: 'Masukkan lokasi naik',
    id: 'Masukkan lokasi jemput', fil: 'Ilagay ang lokasyon ng pagsakay',
  },
  dropoff: {
    'zh-TW': '下車地點', 'zh-CN': '下车地点', en: 'Dropoff Location', ja: '降車場所',
    ko: '하차 장소', th: 'จุดส่ง', vi: 'Điểm trả', ms: 'Lokasi turun',
    id: 'Lokasi turun', fil: 'Lokasyon ng pagbaba',
  },
  dropoffPlaceholder: {
    'zh-TW': '請輸入下車地點', 'zh-CN': '请输入下车地点', en: 'Enter dropoff location', ja: '降車場所を入力',
    ko: '하차 장소 입력', th: 'กรอกจุดส่ง', vi: 'Nhập điểm trả', ms: 'Masukkan lokasi turun',
    id: 'Masukkan lokasi turun', fil: 'Ilagay ang lokasyon ng pagbaba',
  },
  passengers: {
    'zh-TW': '乘客人數', 'zh-CN': '乘客人数', en: 'Passengers', ja: '乗客数',
    ko: '탑승 인원', th: 'จำนวนผู้โดยสาร', vi: 'Số hành khách', ms: 'Bilangan penumpang',
    id: 'Jumlah penumpang', fil: 'Bilang ng pasahero',
  },
  luggage: {
    'zh-TW': '行李數量（可選）', 'zh-CN': '行李数量（可选）', en: 'Luggage (optional)', ja: '荷物数（任意）',
    ko: '수하물 수 (선택)', th: 'จำนวนกระเป๋า (ไม่บังคับ)', vi: 'Số hành lý (tùy chọn)', ms: 'Bilangan bagasi (pilihan)',
    id: 'Jumlah bagasi (opsional)', fil: 'Bilang ng bagahe (opsyonal)',
  },
  notes: {
    'zh-TW': '備註（可選）', 'zh-CN': '备注（可选）', en: 'Notes (optional)', ja: '備考（任意）',
    ko: '메모 (선택)', th: 'หมายเหตุ (ไม่บังคับ)', vi: 'Ghi chú (tùy chọn)', ms: 'Nota (pilihan)',
    id: 'Catatan (opsional)', fil: 'Mga Tala (opsyonal)',
  },
  notesPlaceholder: {
    'zh-TW': '請輸入特殊需求或備註', 'zh-CN': '请输入特殊需求或备注', en: 'Enter special requests or notes', ja: '特別なご要望やメモを入力',
    ko: '특별 요청이나 메모 입력', th: 'กรอกข้อมูลเพิ่มเติม', vi: 'Nhập yêu cầu đặc biệt', ms: 'Masukkan permintaan khas',
    id: 'Masukkan permintaan khusus', fil: 'Ilagay ang mga espesyal na kahilingan',
  },
  vehicleType: {
    'zh-TW': '車型與方案', 'zh-CN': '车型与方案', en: 'Vehicle & Plan', ja: '車種とプラン',
    ko: '차종 및 플랜', th: 'ประเภทรถและแผน', vi: 'Loại xe & Gói', ms: 'Jenis & Pelan',
    id: 'Jenis & Paket', fil: 'Uri & Plano',
  },
  submit: {
    'zh-TW': '送出預約', 'zh-CN': '提交预约', en: 'Submit Booking', ja: '予約を送信',
    ko: '예약 제출', th: 'ส่งการจอง', vi: 'Gửi đặt xe', ms: 'Hantar tempahan',
    id: 'Kirim pemesanan', fil: 'Isumite ang booking',
  },
  personUnit: {
    'zh-TW': '人', 'zh-CN': '人', en: '', ja: '名', ko: '명', th: 'คน', vi: 'người', ms: 'orang', id: 'orang', fil: 'tao',
  },
  luggageUnit: {
    'zh-TW': '件', 'zh-CN': '件', en: '', ja: '個', ko: '개', th: 'ใบ', vi: 'kiện', ms: 'beg', id: 'buah', fil: 'piraso',
  },
  hours: {
    'zh-TW': '小時', 'zh-CN': '小时', en: 'hrs', ja: '時間', ko: '시간', th: 'ชม.', vi: 'giờ', ms: 'jam', id: 'jam', fil: 'oras',
  },
  overtimeRate: {
    'zh-TW': '超時費率', 'zh-CN': '超时费率', en: 'Overtime', ja: '超過料金', ko: '초과 요금', th: 'ค่าล่วงเวลา', vi: 'Phí ngoài giờ', ms: 'Kadar lebih masa', id: 'Tarif lembur', fil: 'Overtime rate',
  },
  perHour: {
    'zh-TW': '/小時', 'zh-CN': '/小时', en: '/hr', ja: '/時間', ko: '/시간', th: '/ชม.', vi: '/giờ', ms: '/jam', id: '/jam', fil: '/oras',
  },
  loading: {
    'zh-TW': '載入方案中...', 'zh-CN': '加载方案中...', en: 'Loading plans...', ja: 'プラン読み込み中...',
    ko: '플랜 로딩 중...', th: 'กำลังโหลด...', vi: 'Đang tải...', ms: 'Memuatkan...',
    id: 'Memuat...', fil: 'Naglo-load...',
  },
  selectPlan: {
    'zh-TW': '請選擇方案', 'zh-CN': '请选择方案', en: 'Please select a plan', ja: 'プランを選択してください',
    ko: '플랜을 선택하세요', th: 'กรุณาเลือกแผน', vi: 'Vui lòng chọn gói', ms: 'Sila pilih pelan',
    id: 'Silakan pilih paket', fil: 'Pumili ng plano',
  },
  plans: {
    'zh-TW': '個方案', 'zh-CN': '个方案', en: 'plans', ja: 'プラン', ko: '플랜', th: 'แผน', vi: 'gói', ms: 'pelan', id: 'paket', fil: 'plano',
  },
};

const VEHICLE_ICONS: Record<string, string> = { S: '🚗', M: '🚙', L: '🚐', XL: '✨' };
const VEHICLE_MAX_PAX: Record<string, number> = { S: 4, M: 4, L: 8, XL: 6 };
const VEHICLE_MAX_LUG: Record<string, number> = { S: 3, M: 4, L: 8, XL: 4 };

function t(obj: Record<string, string>, lang: string): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString()}`;
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
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';

  // Packages from API
  const [packages, setPackages] = useState<VehiclePackage[]>([]);
  const [loadingPkgs, setLoadingPkgs] = useState(true);
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<VehiclePackage | null>(null);

  // Form state
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch packages from backend
  useEffect(() => {
    const langMap: Record<string, string> = {
      'zh-TW': 'zh-TW', 'zh-CN': 'zh-CN', en: 'en', ja: 'ja', ko: 'ko',
      th: 'th', vi: 'vi', ms: 'ms', id: 'id', fil: 'fil',
    };
    const apiLang = langMap[lang] || 'zh-TW';
    const url = `${API_BASE}/api/pricing/packages?lang=${apiLang}`;

    fetch(url)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setPackages(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingPkgs(false));
  }, [lang]);

  // Group packages by vehicle type
  const typeOrder = ['S', 'M', 'L', 'XL'];
  const grouped = typeOrder
    .map((vt) => ({
      type: vt,
      plans: packages.filter((p) => p.vehicleType === vt).sort((a, b) => a.duration - b.duration),
    }))
    .filter((g) => g.plans.length > 0);

  const handleToggle = (type: string) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const handleSelectPlan = (pkg: VehiclePackage) => {
    setSelectedPkg(pkg);
    const maxPax = VEHICLE_MAX_PAX[pkg.vehicleType] || 4;
    const maxLug = VEHICLE_MAX_LUG[pkg.vehicleType] || 4;
    if (passengers > maxPax) setPassengers(maxPax);
    if (luggage > maxLug) setLuggage(maxLug);
  };

  const currentMaxPax = selectedPkg ? (VEHICLE_MAX_PAX[selectedPkg.vehicleType] || 4) : 8;
  const currentMaxLug = selectedPkg ? (VEHICLE_MAX_LUG[selectedPkg.vehicleType] || 4) : 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;
    const bookingData = {
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      vehicleType: selectedPkg.vehicleType,
      duration: selectedPkg.duration,
      price: selectedPkg.discountPrice,
      overtimeRate: selectedPkg.overtimeRate,
      passengers,
      luggage,
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

  // Minimum datetime: tomorrow 6AM
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
            <p className="charter-subtitle">📍 {guideCity}</p>
          )}
        </div>
      </div>

      <form className="charter-form" onSubmit={handleSubmit}>
        {/* Vehicle & Plan Selection — top priority like mobile */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.vehicleType, lang)}</label>
          {loadingPkgs ? (
            <div className="charter-loading">{t(UI.loading, lang)}</div>
          ) : (
            <div className="charter-vehicle-groups">
              {grouped.map((group) => {
                const isExpanded = expandedType === group.type;
                const icon = VEHICLE_ICONS[group.type] || '🚗';
                const firstName = group.plans[0]?.description || group.type;
                const planCount = group.plans.length;

                return (
                  <div key={group.type} className={`charter-vg ${isExpanded ? 'expanded' : ''}`}>
                    {/* Vehicle type header — tap to expand */}
                    <button
                      type="button"
                      className="charter-vg-header"
                      onClick={() => handleToggle(group.type)}
                    >
                      <span className="charter-vg-icon">{icon}</span>
                      <div className="charter-vg-info">
                        <span className="charter-vg-name">{firstName}</span>
                        <span className="charter-vg-meta">
                          {group.plans[0]?.capacityInfo} · {planCount} {t(UI.plans, lang)}
                        </span>
                      </div>
                      <span className={`charter-vg-arrow ${isExpanded ? 'open' : ''}`}>▼</span>
                    </button>

                    {/* Expanded plan list */}
                    {isExpanded && (
                      <div className="charter-vg-plans">
                        {group.plans.map((pkg) => {
                          const isSelected = selectedPkg?.id === pkg.id;
                          const hasDiscount = pkg.discountPrice < pkg.originalPrice;

                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              className={`charter-plan-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleSelectPlan(pkg)}
                            >
                              <div className="charter-plan-top">
                                <span className="charter-plan-duration">
                                  {pkg.duration} {t(UI.hours, lang)}
                                </span>
                                {isSelected && <span className="charter-plan-check">✓</span>}
                              </div>
                              <div className="charter-plan-prices">
                                {hasDiscount && (
                                  <span className="charter-plan-original">{formatPrice(pkg.originalPrice)}</span>
                                )}
                                <span className="charter-plan-price">{formatPrice(pkg.discountPrice)}</span>
                              </div>
                              <div className="charter-plan-overtime">
                                {t(UI.overtimeRate, lang)}: {formatPrice(pkg.overtimeRate)}{t(UI.perHour, lang)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

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

        {/* Passengers */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.passengers, lang)}</label>
          <div className="charter-stepper">
            <button type="button" className="charter-stepper-btn" onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
            <span className="charter-stepper-value">{passengers} {t(UI.personUnit, lang)}</span>
            <button type="button" className="charter-stepper-btn" onClick={() => setPassengers(Math.min(currentMaxPax, passengers + 1))}>+</button>
          </div>
        </div>

        {/* Luggage */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.luggage, lang)}</label>
          <div className="charter-stepper">
            <button type="button" className="charter-stepper-btn" onClick={() => setLuggage(Math.max(0, luggage - 1))}>−</button>
            <span className="charter-stepper-value">{luggage} {t(UI.luggageUnit, lang)}</span>
            <button type="button" className="charter-stepper-btn" onClick={() => setLuggage(Math.min(currentMaxLug, luggage + 1))}>+</button>
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

        {/* Selected summary + Submit */}
        {selectedPkg && (
          <div className="charter-summary">
            <div className="charter-summary-row">
              <span>{VEHICLE_ICONS[selectedPkg.vehicleType]} {selectedPkg.name}</span>
              <span className="charter-summary-price">{formatPrice(selectedPkg.discountPrice)}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`charter-submit-btn ${!selectedPkg ? 'disabled' : ''}`}
          disabled={!selectedPkg}
        >
          {selectedPkg ? t(UI.submit, lang) : t(UI.selectPlan, lang)}
        </button>
      </form>
    </div>
  );
}
