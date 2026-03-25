'use client';

import { useState, useEffect } from 'react';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import { auth, googleProvider, appleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, type User } from 'firebase/auth';
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
  S: { 'zh-TW': '五人座轎車', 'zh-CN': '五人座轿车', en: 'Sedan', ja: 'セダン(5名)', ko: '세단(5인승)', th: 'รถเก๋ง 5 ที่นั่ง', vi: 'Sedan 5 chỗ', ms: 'Sedan 5 tempat duduk', id: 'Sedan 5 kursi', fil: 'Sedan 5 upuan' },
  M: { 'zh-TW': '五人座休旅車', 'zh-CN': '五人座休旅车', en: 'SUV', ja: 'SUV(5名)', ko: 'SUV(5인승)', th: 'SUV 5 ที่นั่ง', vi: 'SUV 5 chỗ', ms: 'SUV 5 tempat duduk', id: 'SUV 5 kursi', fil: 'SUV 5 upuan' },
  L: { 'zh-TW': '九人座休旅車', 'zh-CN': '九人座休旅车', en: 'Van (9 seats)', ja: 'ワゴン(9名)', ko: '밴(9인승)', th: 'รถตู้ 9 ที่นั่ง', vi: 'Xe van 9 chỗ', ms: 'Van 9 tempat duduk', id: 'Van 9 kursi', fil: 'Van 9 upuan' },
  XL: { 'zh-TW': 'Toyota Alphard', 'zh-CN': 'Toyota Alphard', en: 'Toyota Alphard', ja: 'Toyota Alphard', ko: 'Toyota Alphard', th: 'Toyota Alphard', vi: 'Toyota Alphard', ms: 'Toyota Alphard', id: 'Toyota Alphard', fil: 'Toyota Alphard' },
};

const UI: Record<string, Record<string, string>> = {
  title: { 'zh-TW': '確認訂單', 'zh-CN': '确认订单', en: 'Confirm Order', ja: '注文確認', ko: '주문 확인', th: 'ยืนยันการจอง', vi: 'Xác nhận đơn', ms: 'Sahkan Tempahan', id: 'Konfirmasi Pesanan', fil: 'Kumpirmahin ang Order' },
  back: { 'zh-TW': '← 返回修改', 'zh-CN': '← 返回修改', en: '← Back to Edit', ja: '← 編集に戻る', ko: '← 수정으로 돌아가기', th: '← กลับไปแก้ไข', vi: '← Quay lại chỉnh sửa', ms: '← Kembali untuk edit', id: '← Kembali untuk edit', fil: '← Bumalik para i-edit' },
  tourPlan: { 'zh-TW': '旅遊方案', 'zh-CN': '旅游方案', en: 'Tour Plan', ja: 'ツアープラン', ko: '투어 플랜', th: 'แผนทัวร์', vi: 'Gói tour', ms: 'Pelan Lawatan', id: 'Paket Tur', fil: 'Plano ng Tour' },
  vehicle: { 'zh-TW': '車型方案', 'zh-CN': '车型方案', en: 'Vehicle Plan', ja: '車両プラン', ko: '차량 플랜', th: 'แผนรถ', vi: 'Phương tiện', ms: 'Pelan Kenderaan', id: 'Paket Kendaraan', fil: 'Plano ng Sasakyan' },
  bookingTime: { 'zh-TW': '預約時間', 'zh-CN': '预约时间', en: 'Booking Time', ja: '予約日時', ko: '예약 시간', th: 'เวลาจอง', vi: 'Thời gian đặt', ms: 'Masa Tempahan', id: 'Waktu Pemesanan', fil: 'Oras ng Booking' },
  pickupLabel: { 'zh-TW': '上車地點', 'zh-CN': '上车地点', en: 'Pickup', ja: '乗車場所', ko: '탑승 장소', th: 'จุดรับ', vi: 'Điểm đón', ms: 'Lokasi Naik', id: 'Lokasi Jemput', fil: 'Pickup Location' },
  dropoffLabel: { 'zh-TW': '下車地點', 'zh-CN': '下车地点', en: 'Dropoff', ja: '降車場所', ko: '하차 장소', th: 'จุดส่ง', vi: 'Điểm trả', ms: 'Lokasi Turun', id: 'Lokasi Turun', fil: 'Dropoff Location' },
  pax: { 'zh-TW': '乘客 / 行李', 'zh-CN': '乘客 / 行李', en: 'Passengers / Luggage', ja: '乗客 / 荷物', ko: '승객 / 수하물', th: 'ผู้โดยสาร / สัมภาระ', vi: 'Hành khách / Hành lý', ms: 'Penumpang / Bagasi', id: 'Penumpang / Bagasi', fil: 'Pasahero / Bagahe' },
  airportPickup: { 'zh-TW': '加購接機', 'zh-CN': '加购接机', en: 'Airport Pickup', ja: '空港送迎（到着）', ko: '공항 픽업 추가', th: 'เพิ่มรับสนามบิน', vi: 'Thêm đón sân bay', ms: 'Tambah Jemput Lapangan Terbang', id: 'Tambah Jemput Bandara', fil: 'Dagdag na Airport Pickup' },
  airportDropoff: { 'zh-TW': '加購送機', 'zh-CN': '加购送机', en: 'Airport Dropoff', ja: '空港送迎（出発）', ko: '공항 샌딩 추가', th: 'เพิ่มส่งสนามบิน', vi: 'Thêm đưa sân bay', ms: 'Tambah Hantar Lapangan Terbang', id: 'Tambah Antar Bandara', fil: 'Dagdag na Airport Dropoff' },
  notesLabel: { 'zh-TW': '備註', 'zh-CN': '备注', en: 'Notes', ja: '備考', ko: '비고', th: 'หมายเหตุ', vi: 'Ghi chú', ms: 'Nota', id: 'Catatan', fil: 'Mga Tala' },
  charterFee: { 'zh-TW': '包車費用', 'zh-CN': '包车费用', en: 'Charter Fee', ja: 'チャーター料金', ko: '전세 요금', th: 'ค่าเช่ารถ', vi: 'Phí thuê xe', ms: 'Caj Sewa', id: 'Biaya Sewa', fil: 'Bayad sa Charter' },
  discount: { 'zh-TW': '優惠折扣', 'zh-CN': '优惠折扣', en: 'Discount', ja: '割引', ko: '할인', th: 'ส่วนลด', vi: 'Giảm giá', ms: 'Diskaun', id: 'Diskon', fil: 'Diskwento' },
  crossRegion: { 'zh-TW': '跨區費', 'zh-CN': '跨区费', en: 'Cross-Region Fee', ja: 'エリア外料金', ko: '지역 외 요금', th: 'ค่าข้ามเขต', vi: 'Phí liên vùng', ms: 'Caj Rentas Zon', id: 'Biaya Lintas Wilayah', fil: 'Bayad sa Cross-Region' },
  calcSurcharge: { 'zh-TW': '計算跨區費中...', 'zh-CN': '计算跨区费中...', en: 'Calculating surcharge...', ja: 'エリア外料金を計算中...', ko: '추가 요금 계산 중...', th: 'กำลังคำนวณค่าข้ามเขต...', vi: 'Đang tính phụ phí...', ms: 'Mengira surcaj...', id: 'Menghitung biaya tambahan...', fil: 'Kinakalkula ang surcharge...' },
  total: { 'zh-TW': '預估總額', 'zh-CN': '预估总额', en: 'Estimated Total', ja: '見積合計', ko: '예상 합계', th: 'ยอดรวมโดยประมาณ', vi: 'Tổng ước tính', ms: 'Anggaran Jumlah', id: 'Estimasi Total', fil: 'Tinatayang Kabuuan' },
  deposit: { 'zh-TW': '訂金（25%）', 'zh-CN': '订金（25%）', en: 'Deposit (25%)', ja: 'デポジット（25%）', ko: '보증금 (25%)', th: 'มัดจำ (25%)', vi: 'Đặt cọc (25%)', ms: 'Deposit (25%)', id: 'Deposit (25%)', fil: 'Deposito (25%)' },
  depositFull: { 'zh-TW': '全額付款（急單）', 'zh-CN': '全额付款（急单）', en: 'Full Payment (Urgent)', ja: '全額支払い（緊急）', ko: '전액 결제 (긴급)', th: 'ชำระเต็มจำนวน (เร่งด่วน)', vi: 'Thanh toán toàn bộ (gấp)', ms: 'Bayaran Penuh (Segera)', id: 'Pembayaran Penuh (Mendesak)', fil: 'Buong Bayad (Urgent)' },
  airportPickupFee: { 'zh-TW': '接機費用', 'zh-CN': '接机费用', en: 'Airport Pickup Fee', ja: '空港迎え料金', ko: '공항 픽업 요금', th: 'ค่ารับสนามบิน', vi: 'Phí đón sân bay', ms: 'Caj Jemput Lapangan Terbang', id: 'Biaya Jemput Bandara', fil: 'Bayad sa Airport Pickup' },
  airportDropoffFee: { 'zh-TW': '送機費用', 'zh-CN': '送机费用', en: 'Airport Dropoff Fee', ja: '空港送り料金', ko: '공항 샌딩 요금', th: 'ค่าส่งสนามบิน', vi: 'Phí đưa sân bay', ms: 'Caj Hantar Lapangan Terbang', id: 'Biaya Antar Bandara', fil: 'Bayad sa Airport Dropoff' },
  urgentNote: { 'zh-TW': '⚠️ 出發時間不足 1 小時，需支付全額', 'zh-CN': '⚠️ 出发时间不足 1 小时，需支付全额', en: '⚠️ Less than 1 hour to departure, full payment required', ja: '⚠️ 出発まで1時間未満のため、全額お支払いが必要です', ko: '⚠️ 출발까지 1시간 미만, 전액 결제 필요', th: '⚠️ เหลือเวลาไม่ถึง 1 ชั่วโมง ต้องชำระเต็มจำนวน', vi: '⚠️ Còn dưới 1 giờ trước khởi hành, cần thanh toán toàn bộ', ms: '⚠️ Kurang dari 1 jam sebelum berlepas, bayaran penuh diperlukan', id: '⚠️ Kurang dari 1 jam sebelum keberangkatan, pembayaran penuh diperlukan', fil: '⚠️ Wala pang 1 oras bago umalis, kailangang bayaran nang buo' },
  payDeposit: { 'zh-TW': '支付訂金', 'zh-CN': '支付订金', en: 'Pay Deposit', ja: 'デポジットを支払う', ko: '보증금 결제', th: 'ชำระมัดจำ', vi: 'Thanh toán đặt cọc', ms: 'Bayar Deposit', id: 'Bayar Deposit', fil: 'Magbayad ng Deposito' },
  hours: { 'zh-TW': '小時', 'zh-CN': '小时', en: 'hrs', ja: '時間', ko: '시간', th: 'ชั่วโมง', vi: 'giờ', ms: 'jam', id: 'jam', fil: 'oras' },
  overtime: { 'zh-TW': '超時費率', 'zh-CN': '超时费率', en: 'Overtime rate', ja: '延長料金', ko: '초과 요금', th: 'อัตราค่าล่วงเวลา', vi: 'Phí ngoài giờ', ms: 'Kadar lebih masa', id: 'Tarif lembur', fil: 'Overtime rate' },
  perHour: { 'zh-TW': '/小時', 'zh-CN': '/小时', en: '/hr', ja: '/時間', ko: '/시간', th: '/ชั่วโมง', vi: '/giờ', ms: '/jam', id: '/jam', fil: '/oras' },
  noData: { 'zh-TW': '無訂單資料，請重新填寫', 'zh-CN': '无订单资料，请重新填写', en: 'No booking data, please go back', ja: '予約データがありません。入力し直してください', ko: '예약 데이터가 없습니다. 다시 입력해 주세요', th: 'ไม่มีข้อมูลการจอง กรุณากลับไปกรอกใหม่', vi: 'Không có dữ liệu đặt chỗ, vui lòng quay lại', ms: 'Tiada data tempahan, sila kembali', id: 'Tidak ada data pemesanan, silakan kembali', fil: 'Walang booking data, pakibalik at punan muli' },
  // Promo code
  promoCode: { 'zh-TW': '優惠碼', 'zh-CN': '优惠码', en: 'Promo Code', ja: 'プロモコード', ko: '프로모 코드', th: 'โค้ดส่วนลด', vi: 'Mã khuyến mãi', ms: 'Kod Promo', id: 'Kode Promo', fil: 'Promo Code' },
  promoPlaceholder: { 'zh-TW': '輸入優惠碼', 'zh-CN': '输入优惠码', en: 'Enter promo code', ja: 'プロモコードを入力', ko: '프로모 코드 입력', th: 'กรอกโค้ดส่วนลด', vi: 'Nhập mã khuyến mãi', ms: 'Masukkan kod promo', id: 'Masukkan kode promo', fil: 'Ilagay ang promo code' },
  apply: { 'zh-TW': '套用', 'zh-CN': '应用', en: 'Apply', ja: '適用', ko: '적용', th: 'ใช้', vi: 'Áp dụng', ms: 'Guna', id: 'Terapkan', fil: 'Gamitin' },
  clear: { 'zh-TW': '清除', 'zh-CN': '清除', en: 'Clear', ja: 'クリア', ko: '지우기', th: 'ล้าง', vi: 'Xóa', ms: 'Padam', id: 'Hapus', fil: 'I-clear' },
  promoApplied: { 'zh-TW': '優惠碼已套用', 'zh-CN': '优惠码已应用', en: 'Promo code applied', ja: 'プロモコード適用済み', ko: '프로모 코드 적용됨', th: 'ใช้โค้ดส่วนลดแล้ว', vi: 'Đã áp dụng mã khuyến mãi', ms: 'Kod promo telah digunakan', id: 'Kode promo diterapkan', fil: 'Na-apply na ang promo code' },
  // Cancel policy
  cancelPolicy: { 'zh-TW': '取消政策', 'zh-CN': '取消政策', en: 'Cancellation Policy', ja: 'キャンセルポリシー', ko: '취소 정책', th: 'นโยบายการยกเลิก', vi: 'Chính sách hủy', ms: 'Dasar Pembatalan', id: 'Kebijakan Pembatalan', fil: 'Patakaran sa Pagkansela' },
  cancelPolicyFallback: {
    'zh-TW': '<p>載入中...</p>',
    'zh-CN': '<p>加载中...</p>',
    en: '<p>Loading...</p>',
    ja: '<p>読み込み中...</p>',
    ko: '<p>로딩 중...</p>',
    th: '<p>กำลังโหลด...</p>',
    vi: '<p>Đang tải...</p>',
    ms: '<p>Memuatkan...</p>',
    id: '<p>Memuat...</p>',
    fil: '<p>Naglo-load...</p>',
  },
  agreePolicy: { 'zh-TW': '我已閱讀並同意取消政策', 'zh-CN': '我已阅读并同意取消政策', en: 'I have read and agree to the cancellation policy', ja: 'キャンセルポリシーに同意します', ko: '취소 정책을 읽었으며 동의합니다', th: 'ฉันได้อ่านและยอมรับนโยบายการยกเลิก', vi: 'Tôi đã đọc và đồng ý chính sách hủy', ms: 'Saya telah membaca dan bersetuju dengan dasar pembatalan', id: 'Saya telah membaca dan menyetujui kebijakan pembatalan', fil: 'Nabasa ko at sumasang-ayon ako sa patakaran sa pagkansela' },
  agreePolicyRequired: { 'zh-TW': '請先同意取消政策', 'zh-CN': '请先同意取消政策', en: 'Please agree to the cancellation policy first', ja: '先にキャンセルポリシーに同意してください', ko: '먼저 취소 정책에 동의해 주세요', th: 'กรุณายอมรับนโยบายการยกเลิกก่อน', vi: 'Vui lòng đồng ý chính sách hủy trước', ms: 'Sila setuju dengan dasar pembatalan terlebih dahulu', id: 'Silakan setujui kebijakan pembatalan terlebih dahulu', fil: 'Pakisang-ayunan muna ang patakaran sa pagkansela' },
  // Login
  loginTitle: { 'zh-TW': '登入後即可支付', 'zh-CN': '登录后即可支付', en: 'Sign in to pay', ja: 'ログインしてお支払い', ko: '로그인 후 결제', th: 'เข้าสู่ระบบเพื่อชำระเงิน', vi: 'Đăng nhập để thanh toán', ms: 'Log masuk untuk membayar', id: 'Masuk untuk membayar', fil: 'Mag-sign in para magbayad' },
  email: { 'zh-TW': '電子郵件', 'zh-CN': '电子邮件', en: 'Email', ja: 'メールアドレス', ko: '이메일', th: 'อีเมล', vi: 'Email', ms: 'E-mel', id: 'Email', fil: 'Email' },
  password: { 'zh-TW': '密碼', 'zh-CN': '密码', en: 'Password', ja: 'パスワード', ko: '비밀번호', th: 'รหัสผ่าน', vi: 'Mật khẩu', ms: 'Kata laluan', id: 'Kata sandi', fil: 'Password' },
  loginEmail: { 'zh-TW': '電子郵件登入', 'zh-CN': '电子邮件登录', en: 'Sign in with Email', ja: 'メールでログイン', ko: '이메일로 로그인', th: 'เข้าสู่ระบบด้วยอีเมล', vi: 'Đăng nhập bằng Email', ms: 'Log masuk dengan E-mel', id: 'Masuk dengan Email', fil: 'Mag-sign in gamit ang Email' },
  registerEmail: { 'zh-TW': '電子郵件註冊', 'zh-CN': '电子邮件注册', en: 'Register with Email', ja: 'メールで登録', ko: '이메일로 가입', th: 'สมัครด้วยอีเมล', vi: 'Đăng ký bằng Email', ms: 'Daftar dengan E-mel', id: 'Daftar dengan Email', fil: 'Mag-register gamit ang Email' },
  loginBtn: { 'zh-TW': '登入', 'zh-CN': '登录', en: 'Sign In', ja: 'ログイン', ko: '로그인', th: 'เข้าสู่ระบบ', vi: 'Đăng nhập', ms: 'Log Masuk', id: 'Masuk', fil: 'Mag-sign In' },
  registerBtn: { 'zh-TW': '註冊', 'zh-CN': '注册', en: 'Register', ja: '登録', ko: '가입', th: 'สมัคร', vi: 'Đăng ký', ms: 'Daftar', id: 'Daftar', fil: 'Mag-register' },
  loginGoogle: { 'zh-TW': '以 Google 登入', 'zh-CN': '使用 Google 登录', en: 'Sign in with Google', ja: 'Googleでログイン', ko: 'Google로 로그인', th: 'เข้าสู่ระบบด้วย Google', vi: 'Đăng nhập bằng Google', ms: 'Log masuk dengan Google', id: 'Masuk dengan Google', fil: 'Mag-sign in gamit ang Google' },
  loginApple: { 'zh-TW': '以 Apple 登入', 'zh-CN': '使用 Apple 登录', en: 'Sign in with Apple', ja: 'Appleでログイン', ko: 'Apple로 로그인', th: 'เข้าสู่ระบบด้วย Apple', vi: 'Đăng nhập bằng Apple', ms: 'Log masuk dengan Apple', id: 'Masuk dengan Apple', fil: 'Mag-sign in gamit ang Apple' },
  loginAgree: { 'zh-TW': '點擊登入即同意', 'zh-CN': '点击登录即同意', en: 'By signing in, you agree to our', ja: 'ログインすると同意したことになります', ko: '로그인하면 다음에 동의하게 됩니다', th: 'การเข้าสู่ระบบถือว่ายอมรับ', vi: 'Khi đăng nhập, bạn đồng ý với', ms: 'Dengan log masuk, anda bersetuju dengan', id: 'Dengan masuk, Anda menyetujui', fil: 'Sa pag-sign in, sumasang-ayon ka sa aming' },
  privacyPolicy: { 'zh-TW': '隱私權政策', 'zh-CN': '隐私政策', en: 'Privacy Policy', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách quyền riêng tư', ms: 'Dasar Privasi', id: 'Kebijakan Privasi', fil: 'Patakaran sa Privacy' },
  loggedInAs: { 'zh-TW': '已登入', 'zh-CN': '已登录', en: 'Signed in as', ja: 'ログイン中', ko: '로그인됨', th: 'เข้าสู่ระบบในชื่อ', vi: 'Đã đăng nhập với', ms: 'Log masuk sebagai', id: 'Masuk sebagai', fil: 'Naka-sign in bilang' },
  logout: { 'zh-TW': '登出', 'zh-CN': '退出登录', en: 'Sign out', ja: 'ログアウト', ko: '로그아웃', th: 'ออกจากระบบ', vi: 'Đăng xuất', ms: 'Log keluar', id: 'Keluar', fil: 'Mag-sign out' },
  // Profile
  profileTitle: { 'zh-TW': '填寫基本資料', 'zh-CN': '填写基本资料', en: 'Complete Your Profile', ja: 'プロフィール入力', ko: '기본 정보 입력', th: 'กรอกข้อมูลส่วนตัว', vi: 'Hoàn tất hồ sơ', ms: 'Lengkapkan Profil Anda', id: 'Lengkapi Profil Anda', fil: 'Kumpletuhin ang Iyong Profile' },
  profileSubtitle: { 'zh-TW': '以下資料為必填，用於預約確認', 'zh-CN': '以下资料为必填，用于预约确认', en: 'Required for booking confirmation', ja: '予約確認に必要な情報です', ko: '예약 확인에 필요한 정보입니다', th: 'จำเป็นสำหรับการยืนยันการจอง', vi: 'Bắt buộc để xác nhận đặt chỗ', ms: 'Diperlukan untuk pengesahan tempahan', id: 'Diperlukan untuk konfirmasi pemesanan', fil: 'Kinakailangan para sa kumpirmasyon ng booking' },
  lastName: { 'zh-TW': '姓氏', 'zh-CN': '姓氏', en: 'Last Name', ja: '姓', ko: '성', th: 'นามสกุล', vi: 'Họ', ms: 'Nama Keluarga', id: 'Nama Belakang', fil: 'Apelyido' },
  firstName: { 'zh-TW': '名字', 'zh-CN': '名字', en: 'First Name', ja: '名', ko: '이름', th: 'ชื่อ', vi: 'Tên', ms: 'Nama Pertama', id: 'Nama Depan', fil: 'Pangalan' },
  phone: { 'zh-TW': '電話號碼', 'zh-CN': '电话号码', en: 'Phone Number', ja: '電話番号', ko: '전화번호', th: 'หมายเลขโทรศัพท์', vi: 'Số điện thoại', ms: 'Nombor Telefon', id: 'Nomor Telepon', fil: 'Numero ng Telepono' },
  confirmPw: { 'zh-TW': '確認密碼', 'zh-CN': '确认密码', en: 'Confirm Password', ja: 'パスワード確認', ko: '비밀번호 확인', th: 'ยืนยันรหัสผ่าน', vi: 'Xác nhận mật khẩu', ms: 'Sahkan Kata Laluan', id: 'Konfirmasi Kata Sandi', fil: 'Kumpirmahin ang Password' },
  saveProfile: { 'zh-TW': '儲存並繼續', 'zh-CN': '保存并继续', en: 'Save & Continue', ja: '保存して続行', ko: '저장 후 계속', th: 'บันทึกและดำเนินการต่อ', vi: 'Lưu và tiếp tục', ms: 'Simpan & Teruskan', id: 'Simpan & Lanjutkan', fil: 'I-save at Magpatuloy' },
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

  // Fees
  const [surcharge, setSurcharge] = useState(0);
  const [surchargeLoading, setSurchargeLoading] = useState(false);
  const [surchargeInfo, setSurchargeInfo] = useState('');
  const [airportPickupPrice, setAirportPickupPrice] = useState<number | null>(null);
  const [airportDropoffPrice, setAirportDropoffPrice] = useState<number | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('relaygo_booking');
    if (raw) { try { setBooking(JSON.parse(raw)); } catch { /* skip */ } }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthLoading(false); });
    return unsub;
  }, []);


  // Fetch cancellation policy from Supabase
  useEffect(() => {
    const apiLang = lang === 'zh-CN' ? 'zh-CN' : lang === 'en' ? 'en' : lang === 'ja' ? 'ja' : 'zh-TW';
    fetch(`${API_BASE}/api/legal/documents/by-id/d3c9461a-b790-4e5b-a898-7d95d54d824b?lang=${apiLang}`)
      .then(r => r.json())
      .then(res => { if (res.success && res.data?.content) setPolicyHtml(res.data.content); })
      .catch(() => {});
  }, [lang]);

  // 跨區費計算 — 與手機端 (package_selection_page.dart) 使用同一個後端 API
  // 加購接送機時傳 has_airport_pickup/dropoff=1 → 後端直接回 surcharge=0
  useEffect(() => {
    if (!booking?.city || !booking?.vehicleType) return;
    setSurchargeLoading(true);
    const params = new URLSearchParams({
      city: booking.city,
      vehicle_type: booking.vehicleType,
    });
    // 加購接送機 → 後端直接回 surcharge=0
    if (booking.addAirportPickup) params.set('has_airport_pickup', '1');
    if (booking.addAirportDropoff) params.set('has_airport_dropoff', '1');
    // Add coordinates if available
    if (booking.pickupLat && booking.pickupLng) {
      params.set('pickup_lat', String(booking.pickupLat));
      params.set('pickup_lng', String(booking.pickupLng));
    }
    if (booking.dropoffLat && booking.dropoffLng) {
      params.set('dropoff_lat', String(booking.dropoffLat));
      params.set('dropoff_lng', String(booking.dropoffLng));
    }
    fetch(`${API_BASE}/api/pricing/charter-surcharge?${params}`)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) {
          setSurcharge(res.data.surcharge || 0);
          if (res.data.surcharge > 0) {
            const d = res.data;
            setSurchargeInfo(`${d.estimated_road_km || d.straight_distance_km || 0}km，超出${d.free_km || 50}km 部分 × ${formatPrice(d.rate_per_km)}/km`);
          }
        }
      })
      .catch((err) => console.error('[Surcharge]', err))
      .finally(() => setSurchargeLoading(false));
  }, [booking]);

  // 接送機價格查詢 — 呼叫後端 /api/pricing/airport-transfer-price（查表制）
  // 手機端直接查 Supabase（airport_transfer_pricing_service.dart），路徑不同但同表同價
  useEffect(() => {
    if (!booking) return;
    const fetchAirportPrice = (airportCode: string, city: string, lat?: number, lng?: number) => {
      const params = new URLSearchParams({ airport_code: airportCode, vehicle_type: booking.vehicleType, city });
      if (lat && lng) { params.set('lat', String(lat)); params.set('lng', String(lng)); }
      return fetch(`${API_BASE}/api/pricing/airport-transfer-price?${params}`)
        .then(r => r.json())
        .then(res => res.success ? (res.data?.price ?? null) : null)
        .catch(() => null);
    };
    if (booking.addAirportPickup && booking.pickupAirport) {
      // 接機：用 dropoff 的座標/城市來查地區費率
      console.log('[ConfirmContent] 接機費查詢:', { airport: booking.pickupAirport, city: booking.city, lat: booking.dropoffLat, lng: booking.dropoffLng });
      fetchAirportPrice(booking.pickupAirport, booking.city, booking.dropoffLat, booking.dropoffLng)
        .then(p => { console.log('[ConfirmContent] 接機費結果:', p); setAirportPickupPrice(p); });
    } else if (booking.addAirportPickup) {
      console.warn('[ConfirmContent] 加購接機但缺少 pickupAirport:', booking.pickupAirport);
    }
    if (booking.addAirportDropoff && booking.dropoffAirport) {
      // 送機：用 pickup 的座標/城市來查地區費率
      console.log('[ConfirmContent] 送機費查詢:', { airport: booking.dropoffAirport, city: booking.city, lat: booking.pickupLat, lng: booking.pickupLng });
      fetchAirportPrice(booking.dropoffAirport, booking.city, booking.pickupLat, booking.pickupLng)
        .then(p => { console.log('[ConfirmContent] 送機費結果:', p); setAirportDropoffPrice(p); });
    } else if (booking.addAirportDropoff) {
      console.warn('[ConfirmContent] 加購送機但缺少 dropoffAirport:', booking.dropoffAirport);
    }
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

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    setLoginError('');
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await onAuthSuccess(cred.user);
    } catch (e: unknown) {
      const code = (e as { code?: string }).code || '';
      if (!code.includes('cancelled') && !code.includes('closed')) {
        setLoginError(code);
      }
    } finally { setLoginLoading(false); }
  };

  const handleAppleLogin = async () => {
    setLoginLoading(true);
    setLoginError('');
    try {
      const cred = await signInWithPopup(auth, appleProvider);
      await onAuthSuccess(cred.user);
    } catch (e: unknown) {
      const code = (e as { code?: string }).code || '';
      if (!code.includes('cancelled') && !code.includes('closed')) {
        setLoginError(code);
      }
    } finally { setLoginLoading(false); }
  };

  // --- Pay handler ---
  const [paying, setPaying] = useState(false);

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

    if (!booking) return;
    setPaying(true);

    try {
      // 1. Create booking
      const bookingBody = {
        customerUid: user.uid,
        serviceType: 'charter',
        country: 'TW',
        bookingTime: booking.dateTime,
        passengerCount: booking.passengers,
        luggageCount: booking.luggage,
        notes: booking.notes || '',
        policyAgreed: true,
        vehicleType: booking.vehicleType,
        packageId: booking.packageId,
        packageName: booking.packageName,
        estimatedFare: actualPrice,
        originalPrice: estimatedFare,
        finalPrice: actualPrice,
        discountAmount: promoDiscount,
        charterSurcharge: surcharge || 0,
        promoCode: promoApplied ? promoCode : undefined,
        urgentFullPayment: isUrgent,
        // Pickup
        pickupAddress: booking.addAirportPickup
          ? `${booking.pickupFlightInfo?.airportName || ''}(${booking.pickupAirport}) ${booking.pickupFlight || ''}`
          : booking.pickup,
        pickupLatitude: booking.pickupLat || 0,
        pickupLongitude: booking.pickupLng || 0,
        // Dropoff
        dropoffAddress: booking.addAirportDropoff
          ? `${booking.dropoffFlightInfo?.airportName || ''}(${booking.dropoffAirport}) ${booking.dropoffFlight || ''}`
          : booking.dropoff,
        dropoffLatitude: booking.dropoffLat || 0,
        dropoffLongitude: booking.dropoffLng || 0,
        // Airport pickup
        addAirportPickup: booking.addAirportPickup || false,
        pickupFlightNumber: booking.pickupFlight || undefined,
        pickupAirportCode: booking.pickupAirport || undefined,
        pickupScheduledTime: booking.pickupFlightInfo?.scheduledTime || undefined,
        pickupTerminal: booking.pickupFlightInfo?.terminal || undefined,
        pickupTransferPrice: airportPickupPrice || undefined,
        pickupTransferVehicleType: booking.addAirportPickup ? booking.vehicleType : undefined,
        // Airport dropoff
        addAirportDropoff: booking.addAirportDropoff || false,
        dropoffFlightNumber: booking.dropoffFlight || undefined,
        dropoffAirportCode: booking.dropoffAirport || undefined,
        dropoffScheduledTime: booking.dropoffFlightInfo?.scheduledTime || undefined,
        dropoffTerminal: booking.dropoffFlightInfo?.terminal || undefined,
        dropoffTransferPrice: airportDropoffPrice || undefined,
        dropoffTransferVehicleType: booking.addAirportDropoff ? booking.vehicleType : undefined,
      };

      const createRes = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingBody),
      });
      const createData = await createRes.json();

      if (!createData.success || !createData.data?.id) {
        alert(createData.error || createData.message || '建立訂單失敗');
        setPaying(false);
        return;
      }

      const bookingId = createData.data.id;

      // 2. Pay deposit → get GomyPay URL
      const webReturnUrl = `${window.location.origin}${langPrefix}/booking/charter/result`;
      const payRes = await fetch(`${API_BASE}/api/bookings/${bookingId}/pay-deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          customerUid: user.uid,
          paymentMethod: 'credit_card',
          webReturnUrl,
        }),
      });
      const payData = await payRes.json();

      if (!payData.success || !payData.data?.paymentUrl) {
        alert(payData.error || '發起支付失敗');
        setPaying(false);
        return;
      }

      // 3. Redirect to GomyPay
      sessionStorage.removeItem('relaygo_booking');
      window.location.href = payData.data.paymentUrl;
    } catch (err) {
      console.error('[Pay]', err);
      alert(lang === 'zh-TW' ? '支付過程發生錯誤，請重試' : 'Payment error, please try again');
      setPaying(false);
    }
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
  const pickupFee = airportPickupPrice || 0;
  const dropoffFee = airportDropoffPrice || 0;
  const estimatedFare = charterFee + pickupFee + dropoffFee + surcharge;
  const actualPrice = promoApplied && promoDiscount > 0 ? Math.max(0, estimatedFare - promoDiscount) : estimatedFare;
  // 同手機端：一般 25%，急單（<2hr）100%
  const isUrgent = booking.dateTime ? (new Date(booking.dateTime).getTime() - Date.now()) < 1 * 60 * 60 * 1000 : false;
  const depositRate = isUrgent ? 1.0 : 0.25;
  const depositAmount = Math.ceil(actualPrice * depositRate);
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
            <span className="confirm-value">
              {booking.addAirportPickup && booking.pickupFlightInfo ? (
                <>✈️ {booking.pickupFlightInfo.airportName}({booking.pickupFlightInfo.airportCode})
                {booking.pickupFlightInfo.terminal ? ` ${booking.pickupFlightInfo.terminal}` : ''}
                {' '}{booking.pickupFlight} {booking.pickupFlightInfo.scheduledTime || ''}</>
              ) : (booking.pickup || '—')}
            </span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.dropoffLabel, lang)}</span>
            <span className="confirm-value">
              {booking.addAirportDropoff && booking.dropoffFlightInfo ? (
                <>✈️ {booking.dropoffFlightInfo.airportName}({booking.dropoffFlightInfo.airportCode})
                {booking.dropoffFlightInfo.terminal ? ` ${booking.dropoffFlightInfo.terminal}` : ''}
                {' '}{booking.dropoffFlight} {booking.dropoffFlightInfo.scheduledTime || ''}</>
              ) : (booking.dropoff || '—')}
            </span>
          </div>
          <div className="confirm-row">
            <span className="confirm-label">{t(UI.pax, lang)}</span>
            <span className="confirm-value">👤 {booking.passengers} 🧳 {booking.luggage}</span>
          </div>
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
          {/* Charter fee */}
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

          {/* Airport pickup fee */}
          {booking.addAirportPickup && (
            <div className="confirm-price-row">
              <span>✈️ {t(UI.airportPickupFee, lang)}</span>
              <span>{airportPickupPrice != null ? `+${formatPrice(airportPickupPrice)}` : '...'}</span>
            </div>
          )}

          {/* Airport dropoff fee */}
          {booking.addAirportDropoff && (
            <div className="confirm-price-row">
              <span>✈️ {t(UI.airportDropoffFee, lang)}</span>
              <span>{airportDropoffPrice != null ? `+${formatPrice(airportDropoffPrice)}` : '...'}</span>
            </div>
          )}

          {/* Cross-region surcharge */}
          {surcharge > 0 && (
            <div className="confirm-price-row">
              <span>{t(UI.crossRegion, lang)}</span>
              <span>+{formatPrice(surcharge)}</span>
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

          {/* Promo discount */}
          {promoApplied && promoDiscount > 0 && (
            <div className="confirm-price-row" style={{ color: 'var(--accent)' }}>
              <span>{t(UI.discount, lang)}</span>
              <span>-{formatPrice(promoDiscount)}</span>
            </div>
          )}

          <div className="confirm-divider" />

          {/* Total */}
          <div className="confirm-price-row">
            <span>{t(UI.total, lang)}</span>
            <span style={{ fontWeight: 700 }}>
              {promoApplied && promoDiscount > 0 && (
                <span style={{ textDecoration: 'line-through', color: 'var(--gray-500)', marginRight: 8, fontSize: '0.85rem' }}>{formatPrice(estimatedFare)}</span>
              )}
              {formatPrice(actualPrice)}
            </span>
          </div>

          <div className="confirm-divider" />

          {/* Deposit */}
          <div className="confirm-price-row deposit">
            <span>{isUrgent ? t(UI.depositFull, lang) : t(UI.deposit, lang)}</span>
            <span className="confirm-deposit-amount">{formatPrice(depositAmount)}</span>
          </div>

          {/* Urgent warning */}
          {isUrgent && (
            <p className="confirm-urgent-note">{t(UI.urgentNote, lang)}</p>
          )}
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
          className={`charter-submit-btn ${!policyAgreed || paying ? 'disabled' : ''}`}
          onClick={handlePay}
          disabled={!policyAgreed || paying}
        >
          {paying ? '處理中...' : `💳 ${t(UI.payDeposit, lang)} — ${formatPrice(depositAmount)}`}
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
