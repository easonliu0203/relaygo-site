'use client';

import { useState, useEffect } from 'react';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import { auth, googleProvider, appleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, type User } from 'firebase/auth';
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
  pickupLat?: number;
  pickupLng?: number;
  dropoff: string;
  dropoffLat?: number;
  dropoffLng?: number;
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

const API_BASE = 'https://api.relaygo.pro';
const VEHICLE_ICONS: Record<string, string> = { S: '🚗', M: '🚙', L: '🚐', XL: '✨' };
const VEHICLE_NAMES: Record<string, Record<string, string>> = {
  S: { 'zh-TW': '五人座轎車', en: 'Sedan' },
  M: { 'zh-TW': '五人座休旅車', en: 'SUV' },
  L: { 'zh-TW': '九人座休旅車', en: 'Van (9 seats)' },
  XL: { 'zh-TW': 'Toyota Alphard', en: 'Toyota Alphard' },
};

const UI: Record<string, Record<string, string>> = {
  title: { 'zh-TW': '確認訂單', en: 'Confirm Order' },
  back: { 'zh-TW': '← 返回修改', en: '← Back to Edit' },
  tourPlan: { 'zh-TW': '旅遊方案', en: 'Tour Plan' },
  vehicle: { 'zh-TW': '車型方案', en: 'Vehicle Plan' },
  bookingTime: { 'zh-TW': '預約時間', en: 'Booking Time' },
  pickupLabel: { 'zh-TW': '上車地點', en: 'Pickup' },
  dropoffLabel: { 'zh-TW': '下車地點', en: 'Dropoff' },
  pax: { 'zh-TW': '乘客 / 行李', en: 'Passengers / Luggage' },
  airportPickup: { 'zh-TW': '加購接機', en: 'Airport Pickup' },
  airportDropoff: { 'zh-TW': '加購送機', en: 'Airport Dropoff' },
  notesLabel: { 'zh-TW': '備註', en: 'Notes' },
  charterFee: { 'zh-TW': '包車費用', en: 'Charter Fee' },
  discount: { 'zh-TW': '優惠折扣', en: 'Discount' },
  crossRegion: { 'zh-TW': '跨區費', en: 'Cross-Region Fee' },
  calcSurcharge: { 'zh-TW': '計算跨區費中...', en: 'Calculating surcharge...' },
  deposit: { 'zh-TW': '訂金（30%）', en: 'Deposit (30%)' },
  payDeposit: { 'zh-TW': '支付訂金', en: 'Pay Deposit' },
  hours: { 'zh-TW': '小時', en: 'hrs' },
  overtime: { 'zh-TW': '超時費率', en: 'Overtime rate' },
  perHour: { 'zh-TW': '/小時', en: '/hr' },
  noData: { 'zh-TW': '無訂單資料，請重新填寫', en: 'No booking data, please go back' },
  // Promo code
  promoCode: { 'zh-TW': '優惠碼', en: 'Promo Code' },
  promoPlaceholder: { 'zh-TW': '輸入優惠碼', en: 'Enter promo code' },
  apply: { 'zh-TW': '套用', en: 'Apply' },
  clear: { 'zh-TW': '清除', en: 'Clear' },
  promoApplied: { 'zh-TW': '優惠碼已套用', en: 'Promo code applied' },
  // Cancel policy
  cancelPolicy: { 'zh-TW': '取消政策', en: 'Cancellation Policy' },
  cancelPolicyFallback: {
    'zh-TW': '<p>載入中...</p>',
    en: '<p>Loading...</p>',
  },
  agreePolicy: { 'zh-TW': '我已閱讀並同意取消政策', en: 'I have read and agree to the cancellation policy' },
  agreePolicyRequired: { 'zh-TW': '請先同意取消政策', en: 'Please agree to the cancellation policy first' },
  // Login
  loginTitle: { 'zh-TW': '登入後即可支付', en: 'Sign in to pay' },
  email: { 'zh-TW': '電子郵件', en: 'Email' },
  password: { 'zh-TW': '密碼', en: 'Password' },
  loginEmail: { 'zh-TW': '電子郵件登入', en: 'Sign in with Email' },
  registerEmail: { 'zh-TW': '電子郵件註冊', en: 'Register with Email' },
  loginBtn: { 'zh-TW': '登入', en: 'Sign In' },
  registerBtn: { 'zh-TW': '註冊', en: 'Register' },
  loginGoogle: { 'zh-TW': '以 Google 登入', en: 'Sign in with Google' },
  loginApple: { 'zh-TW': '以 Apple 登入', en: 'Sign in with Apple' },
  loginAgree: { 'zh-TW': '點擊登入即同意', en: 'By signing in, you agree to our' },
  privacyPolicy: { 'zh-TW': '隱私權政策', en: 'Privacy Policy' },
  loggedInAs: { 'zh-TW': '已登入', en: 'Signed in as' },
  logout: { 'zh-TW': '登出', en: 'Sign out' },
  // Profile
  profileTitle: { 'zh-TW': '填寫基本資料', en: 'Complete Your Profile' },
  profileSubtitle: { 'zh-TW': '以下資料為必填，用於預約確認', en: 'Required for booking confirmation' },
  lastName: { 'zh-TW': '姓氏', en: 'Last Name' },
  firstName: { 'zh-TW': '名字', en: 'First Name' },
  phone: { 'zh-TW': '電話號碼', en: 'Phone Number' },
  confirmPw: { 'zh-TW': '確認密碼', en: 'Confirm Password' },
  saveProfile: { 'zh-TW': '儲存並繼續', en: 'Save & Continue' },
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

  // Auth
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [authStep, setAuthStep] = useState<'choose' | 'email-login' | 'email-register' | 'profile'>('choose');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  // Profile fields
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileNationality, setProfileNationality] = useState('TW');
  const [profilePhoneCode, setProfilePhoneCode] = useState('+886');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Policy
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [policyHtml, setPolicyHtml] = useState('');

  // Cross-region surcharge
  const [surcharge, setSurcharge] = useState(0);
  const [surchargeLoading, setSurchargeLoading] = useState(false);
  const [surchargeInfo, setSurchargeInfo] = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem('relaygo_booking');
    if (raw) { try { setBooking(JSON.parse(raw)); } catch { /* skip */ } }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthLoading(false); });
    return unsub;
  }, []);

  // Handle redirect result (fallback for popup blocked)
  useEffect(() => {
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await onAuthSuccess(result.user);
      }
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch cancellation policy from Supabase
  useEffect(() => {
    const apiLang = lang === 'zh-CN' ? 'zh-CN' : lang === 'en' ? 'en' : lang === 'ja' ? 'ja' : 'zh-TW';
    fetch(`${API_BASE}/api/legal/documents/by-id/d3c9461a-b790-4e5b-a898-7d95d54d824b?lang=${apiLang}`)
      .then(r => r.json())
      .then(res => { if (res.success && res.data?.content) setPolicyHtml(res.data.content); })
      .catch(() => {});
  }, [lang]);

  // Calculate cross-region surcharge (using coordinates from booking data)
  useEffect(() => {
    if (!booking?.city || !booking?.vehicleType) return;
    setSurchargeLoading(true);
    const params = new URLSearchParams({
      city: booking.city,
      vehicle_type: booking.vehicleType,
    });
    // Add coordinates if available
    if (booking.pickupLat && booking.pickupLng) {
      params.set('pickup_lat', String(booking.pickupLat));
      params.set('pickup_lng', String(booking.pickupLng));
    }
    if (booking.dropoffLat && booking.dropoffLng) {
      params.set('dropoff_lat', String(booking.dropoffLat));
      params.set('dropoff_lng', String(booking.dropoffLng));
    }
    // Airport codes override coordinates
    if (booking.addAirportPickup && booking.pickupAirport) params.set('pickup_airport_code', booking.pickupAirport);
    if (booking.addAirportDropoff && booking.dropoffAirport) params.set('dropoff_airport_code', booking.dropoffAirport);
    fetch(`${API_BASE}/api/pricing/charter-surcharge?${params}`)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) {
          setSurcharge(res.data.surcharge || 0);
          if (res.data.surcharge > 0) {
            setSurchargeInfo(`${res.data.total_distance_km}km × ${formatPrice(res.data.rate_per_km)}/km`);
          }
        }
      })
      .catch((err) => console.error('[Surcharge]', err))
      .finally(() => setSurchargeLoading(false));
  }, [booking]);

  // --- Promo code handlers ---
  const handleApplyPromo = async () => {
    if (!promoCode.trim() || !booking) return;
    setPromoError('');
    try {
      const r = await fetch(`${API_BASE}/api/promo-codes/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promo_code: promoCode.trim(),
          original_price: booking.price,
          user_id: user?.uid || '',
          service_type: 'charter',
        }),
      });
      const res = await r.json();
      if (res.success && res.valid) {
        setPromoApplied(true);
        setPromoDiscount(res.total_discount || res.discount_amount || 0);
      } else {
        setPromoError(res.message || res.error || 'Invalid promo code');
      }
    } catch {
      setPromoError('Network error');
    }
  };

  const handleClearPromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoError('');
  };

  // --- Auth helpers ---
  const syncUserToBackend = async (firebaseUid: string, email: string) => {
    try {
      await fetch(`${API_BASE}/api/auth/register-or-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseUid, email, role: 'customer' }),
      });
    } catch { /* non-blocking */ }
  };

  const checkProfileComplete = async (uid: string): Promise<boolean> => {
    try {
      const r = await fetch(`${API_BASE}/api/profile/upsert?firebaseUid=${uid}`);
      const res = await r.json();
      if (!res.success || !res.data) return false;
      const p = res.data;
      return !!(p.firstName?.trim() && p.lastName?.trim() && p.phone?.trim() && p.nationalityCode?.trim() && p.phoneCountryCode?.trim());
    } catch { return false; }
  };

  const saveProfile = async (uid: string) => {
    setProfileSaving(true);
    try {
      const phone = profilePhone ? `${profilePhoneCode}${profilePhone}` : null;
      await fetch(`${API_BASE}/api/profile/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebaseUid: uid,
          firstName: profileFirstName.trim(),
          lastName: profileLastName.trim(),
          phone,
          phoneCountryCode: profilePhoneCode,
          nationalityCode: profileNationality,
        }),
      });
      setShowLogin(false);
    } catch {
      setLoginError(lang === 'zh-TW' ? '儲存失敗，請重試' : 'Save failed, please retry');
    } finally { setProfileSaving(false); }
  };

  const onAuthSuccess = async (fbUser: User) => {
    await syncUserToBackend(fbUser.uid, fbUser.email || '');
    const complete = await checkProfileComplete(fbUser.uid);
    if (complete) {
      setShowLogin(false);
    } else {
      setAuthStep('profile');
    }
  };

  // --- Login handlers ---
  const handleEmailLogin = async () => {
    if (!loginEmail || !loginPassword) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      await onAuthSuccess(cred.user);
    } catch (e: unknown) {
      const msg = (e as { code?: string }).code || '';
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setLoginError(lang === 'zh-TW' ? '帳號或密碼錯誤' : 'Invalid email or password');
      } else {
        setLoginError(msg);
      }
    } finally { setLoginLoading(false); }
  };

  const handleEmailRegister = async () => {
    if (!loginEmail || !loginPassword || !profileFirstName || !profileLastName || !profilePhone) {
      setLoginError(lang === 'zh-TW' ? '請填寫所有必填欄位' : 'Please fill in all required fields');
      return;
    }
    if (loginPassword !== confirmPassword) {
      setLoginError(lang === 'zh-TW' ? '密碼不一致' : 'Passwords do not match');
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError(lang === 'zh-TW' ? '密碼至少 6 個字元' : 'Password must be at least 6 characters');
      return;
    }
    setLoginLoading(true);
    setLoginError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      await syncUserToBackend(cred.user.uid, cred.user.email || '');
      await saveProfile(cred.user.uid);
    } catch (e: unknown) {
      const msg = (e as { code?: string }).code || '';
      if (msg.includes('email-already-in-use')) {
        setLoginError(lang === 'zh-TW' ? '此信箱已註冊，請改用登入' : 'Email already registered, please sign in');
      } else {
        setLoginError(msg);
      }
    } finally { setLoginLoading(false); }
  };

  const handleGoogleLogin = () => {
    signInWithRedirect(auth, googleProvider);
  };

  const handleAppleLogin = () => {
    signInWithRedirect(auth, appleProvider);
  };

  // --- Pay handler ---
  const handlePay = async () => {
    if (!policyAgreed) {
      alert(t(UI.agreePolicyRequired, lang));
      return;
    }
    if (!user) {
      setAuthStep('choose');
      setLoginError('');
      setShowLogin(true);
      return;
    }
    // Check profile completeness
    const complete = await checkProfileComplete(user.uid);
    if (!complete) {
      setAuthStep('profile');
      setLoginError('');
      setShowLogin(true);
      return;
    }
    // TODO: create booking → pay deposit → redirect to GomyPay
    alert(lang === 'zh-TW' ? '支付功能即將上線，敬請期待！' : 'Payment coming soon!');
  };

  // --- No data ---
  if (!booking) {
    return (
      <div className="charter-page">
        <div className="charter-header"><div className="charter-header-inner"><h1 className="charter-title">{t(UI.title, lang)}</h1></div></div>
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

  const charterFee = booking.price;
  const totalBeforeDiscount = charterFee + surcharge;
  const totalAfterDiscount = Math.max(0, totalBeforeDiscount - promoDiscount);
  const depositRate = 0.3;
  const depositAmount = Math.ceil(totalAfterDiscount * depositRate);
  const vehicleName = VEHICLE_NAMES[booking.vehicleType]?.[lang] || VEHICLE_NAMES[booking.vehicleType]?.['zh-TW'] || booking.vehicleType;
  const vehicleIcon = VEHICLE_ICONS[booking.vehicleType] || '🚗';

  return (
    <div className="charter-page">
      <div className="charter-header">
        <div className="charter-header-inner">
          <a href={`${langPrefix}/booking/charter`} className="charter-back-link">{t(UI.back, lang)}</a>
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
                {' '}{booking.pickupFlight} {booking.pickupFlightInfo.scheduledTime || ''}
              </span>
            </div>
          )}
          {booking.addAirportDropoff && booking.dropoffFlightInfo && (
            <div className="confirm-row">
              <span className="confirm-label">✈️ {t(UI.airportDropoff, lang)}</span>
              <span className="confirm-value">
                {booking.dropoffFlightInfo.airportName}({booking.dropoffFlightInfo.airportCode})
                {booking.dropoffFlightInfo.terminal ? ` ${booking.dropoffFlightInfo.terminal}` : ''}
                {' '}{booking.dropoffFlight} {booking.dropoffFlightInfo.scheduledTime || ''}
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

        {/* Promo Code */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.promoCode, lang)}</label>
          <div className="confirm-promo-row">
            <input
              type="text"
              className="charter-input"
              placeholder={t(UI.promoPlaceholder, lang)}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              disabled={promoApplied}
              style={{ flex: 1 }}
            />
            {promoApplied ? (
              <button type="button" className="confirm-promo-btn clear" onClick={handleClearPromo}>
                {t(UI.clear, lang)}
              </button>
            ) : (
              <button type="button" className="confirm-promo-btn apply" onClick={handleApplyPromo} disabled={!promoCode.trim()}>
                {t(UI.apply, lang)}
              </button>
            )}
          </div>
          {promoApplied && (
            <p className="confirm-promo-success">✅ {t(UI.promoApplied, lang)} — -{formatPrice(promoDiscount)}</p>
          )}
          {promoError && <p className="confirm-promo-error">❌ {promoError}</p>}
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
          {surcharge > 0 && (
            <div className="confirm-price-row">
              <span>{t(UI.crossRegion, lang)}</span>
              <span>{formatPrice(surcharge)}</span>
            </div>
          )}
          {surcharge > 0 && surchargeInfo && (
            <div className="confirm-price-row sub">
              <span>{surchargeInfo}</span>
              <span></span>
            </div>
          )}
          {surchargeLoading && (
            <div className="confirm-price-row sub">
              <span>{t(UI.calcSurcharge, lang)}</span>
              <span></span>
            </div>
          )}
          {promoApplied && promoDiscount > 0 && (
            <div className="confirm-price-row" style={{ color: 'var(--accent)' }}>
              <span>{t(UI.discount, lang)}</span>
              <span>-{formatPrice(promoDiscount)}</span>
            </div>
          )}
          <div className="confirm-divider" />
          <div className="confirm-price-row deposit">
            <span>{t(UI.deposit, lang)}</span>
            <span className="confirm-deposit-amount">{formatPrice(depositAmount)}</span>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="charter-section">
          <label className="charter-label">{t(UI.cancelPolicy, lang)}</label>
          <div
            className="confirm-policy-text"
            dangerouslySetInnerHTML={{ __html: policyHtml || t(UI.cancelPolicyFallback, lang) }}
          />
          <label className="confirm-policy-agree" onClick={() => setPolicyAgreed(!policyAgreed)}>
            <span className={`confirm-checkbox ${policyAgreed ? 'checked' : ''}`}>
              {policyAgreed && '✓'}
            </span>
            <span>{t(UI.agreePolicy, lang)}</span>
          </label>
        </div>

        {/* Auth status */}
        {!authLoading && user && (
          <div className="charter-section confirm-auth-status">
            <span>✅ {t(UI.loggedInAs, lang)}: {user.email}</span>
            <button type="button" className="confirm-logout-btn" onClick={() => auth.signOut()}>
              {t(UI.logout, lang)}
            </button>
          </div>
        )}

        {/* Pay Button */}
        <button
          type="button"
          className={`charter-submit-btn ${!policyAgreed ? 'disabled' : ''}`}
          onClick={handlePay}
          disabled={!policyAgreed}
        >
          💳 {t(UI.payDeposit, lang)} — {formatPrice(depositAmount)}
        </button>
      </div>

      {/* Login / Register / Profile Modal */}
      {showLogin && (
        <div className="confirm-login-overlay" onClick={() => setShowLogin(false)}>
          <div className="confirm-login-modal" onClick={(e) => e.stopPropagation()}>

            {/* Step: Choose method */}
            {authStep === 'choose' && (<>
              <h2 className="confirm-login-title">{t(UI.loginTitle, lang)}</h2>
              <button type="button" className="confirm-login-btn google" onClick={handleGoogleLogin} disabled={loginLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t(UI.loginGoogle, lang)}
              </button>
              <button type="button" className="confirm-login-btn apple" onClick={handleAppleLogin} disabled={loginLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.62 4.22-3.74 4.25z"/></svg>
                {t(UI.loginApple, lang)}
              </button>
              <div className="confirm-login-divider"><span>or</span></div>
              <button type="button" className="confirm-login-btn email" onClick={() => { setAuthStep('email-login'); setLoginError(''); }}>
                📧 {t(UI.loginEmail, lang)}
              </button>
              <button type="button" className="confirm-login-btn-link" onClick={() => { setAuthStep('email-register'); setLoginError(''); }}>
                {t(UI.registerEmail, lang)}
              </button>
              <p className="confirm-login-agree">
                {t(UI.loginAgree, lang)}{' '}
                <a href={`${langPrefix}/privacy-policy`} target="_blank" rel="noopener">{t(UI.privacyPolicy, lang)}</a>
              </p>
            </>)}

            {/* Step: Email Login */}
            {authStep === 'email-login' && (<>
              <button type="button" className="confirm-login-back" onClick={() => setAuthStep('choose')}>← {t(UI.back, lang)}</button>
              <h2 className="confirm-login-title">{t(UI.loginEmail, lang)}</h2>
              <div className="confirm-login-field">
                <input type="email" className="charter-input" placeholder={t(UI.email, lang)} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="confirm-login-field">
                <input type="password" className="charter-input" placeholder={t(UI.password, lang)} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleEmailLogin()} />
              </div>
              {loginError && <p className="confirm-login-error">{loginError}</p>}
              <button type="button" className="confirm-login-btn email" onClick={handleEmailLogin} disabled={loginLoading}>
                {loginLoading ? '...' : t(UI.loginBtn, lang)}
              </button>
            </>)}

            {/* Step: Email Register */}
            {authStep === 'email-register' && (<>
              <button type="button" className="confirm-login-back" onClick={() => setAuthStep('choose')}>← {t(UI.back, lang)}</button>
              <h2 className="confirm-login-title">{t(UI.registerEmail, lang)}</h2>
              <div className="confirm-login-field">
                <input type="email" className="charter-input" placeholder={t(UI.email, lang)} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="confirm-login-row">
                <input type="text" className="charter-input" placeholder={t(UI.lastName, lang)} value={profileLastName} onChange={(e) => setProfileLastName(e.target.value)} />
                <input type="text" className="charter-input" placeholder={t(UI.firstName, lang)} value={profileFirstName} onChange={(e) => setProfileFirstName(e.target.value)} />
              </div>
              <div className="confirm-login-field">
                <select className="charter-input charter-select" value={profileNationality} onChange={(e) => setProfileNationality(e.target.value)}>
                  <option value="TW">🇹🇼 Taiwan</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="KR">🇰🇷 Korea</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="HK">🇭🇰 Hong Kong</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="MY">🇲🇾 Malaysia</option>
                  <option value="TH">🇹🇭 Thailand</option>
                  <option value="VN">🇻🇳 Vietnam</option>
                  <option value="ID">🇮🇩 Indonesia</option>
                  <option value="PH">🇵🇭 Philippines</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                </select>
              </div>
              <div className="confirm-login-row">
                <select className="charter-input charter-select" value={profilePhoneCode} onChange={(e) => setProfilePhoneCode(e.target.value)} style={{ flex: '0 0 110px' }}>
                  <option value="+886">🇹🇼 +886</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+852">🇭🇰 +852</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+60">🇲🇾 +60</option>
                  <option value="+66">🇹🇭 +66</option>
                  <option value="+84">🇻🇳 +84</option>
                  <option value="+62">🇮🇩 +62</option>
                  <option value="+63">🇵🇭 +63</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <input type="tel" className="charter-input" placeholder={t(UI.phone, lang)} value={profilePhone} onChange={(e) => setProfilePhone(e.target.value.replace(/[^0-9]/g, ''))} />
              </div>
              <div className="confirm-login-field">
                <input type="password" className="charter-input" placeholder={t(UI.password, lang)} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
              <div className="confirm-login-field">
                <input type="password" className="charter-input" placeholder={t(UI.confirmPw, lang)} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              {loginError && <p className="confirm-login-error">{loginError}</p>}
              <button type="button" className="confirm-login-btn email" onClick={handleEmailRegister} disabled={loginLoading}>
                {loginLoading ? '...' : t(UI.registerBtn, lang)}
              </button>
            </>)}

            {/* Step: Profile completion (after social login) */}
            {authStep === 'profile' && (<>
              <h2 className="confirm-login-title">{t(UI.profileTitle, lang)}</h2>
              <p className="confirm-login-subtitle">{t(UI.profileSubtitle, lang)}</p>
              <div className="confirm-login-row">
                <input type="text" className="charter-input" placeholder={t(UI.lastName, lang)} value={profileLastName} onChange={(e) => setProfileLastName(e.target.value)} />
                <input type="text" className="charter-input" placeholder={t(UI.firstName, lang)} value={profileFirstName} onChange={(e) => setProfileFirstName(e.target.value)} />
              </div>
              <div className="confirm-login-field">
                <select className="charter-input charter-select" value={profileNationality} onChange={(e) => setProfileNationality(e.target.value)}>
                  <option value="TW">🇹🇼 Taiwan</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="KR">🇰🇷 Korea</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="HK">🇭🇰 Hong Kong</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="MY">🇲🇾 Malaysia</option>
                  <option value="TH">🇹🇭 Thailand</option>
                  <option value="VN">🇻🇳 Vietnam</option>
                  <option value="ID">🇮🇩 Indonesia</option>
                  <option value="PH">🇵🇭 Philippines</option>
                  <option value="CN">🇨🇳 China</option>
                </select>
              </div>
              <div className="confirm-login-row">
                <select className="charter-input charter-select" value={profilePhoneCode} onChange={(e) => setProfilePhoneCode(e.target.value)} style={{ flex: '0 0 110px' }}>
                  <option value="+886">🇹🇼 +886</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+852">🇭🇰 +852</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+60">🇲🇾 +60</option>
                  <option value="+66">🇹🇭 +66</option>
                  <option value="+84">🇻🇳 +84</option>
                  <option value="+62">🇮🇩 +62</option>
                  <option value="+63">🇵🇭 +63</option>
                  <option value="+86">🇨🇳 +86</option>
                </select>
                <input type="tel" className="charter-input" placeholder={t(UI.phone, lang)} value={profilePhone} onChange={(e) => setProfilePhone(e.target.value.replace(/[^0-9]/g, ''))} />
              </div>
              {loginError && <p className="confirm-login-error">{loginError}</p>}
              <button type="button" className="confirm-login-btn email" onClick={() => user && saveProfile(user.uid)} disabled={profileSaving || !profileFirstName || !profileLastName || !profilePhone}>
                {profileSaving ? '...' : t(UI.saveProfile, lang)}
              </button>
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}
