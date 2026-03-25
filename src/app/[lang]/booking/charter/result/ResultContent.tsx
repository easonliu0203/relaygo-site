'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import '../charter.css';

const APP_STORE_URL = 'https://apps.apple.com/tw/app/relay-go/id6756459981';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.relaygo.customer';

const UI: Record<string, Record<string, string>> = {
  successTitle: {
    'zh-TW': '預約完成！',
    'zh-CN': '预约完成！',
    en: 'Booking Confirmed!',
    ja: '予約完了！',
    ko: '예약 완료!',
    th: 'จองสำเร็จแล้ว!',
    vi: 'Đặt chỗ thành công!',
    ms: 'Tempahan Disahkan!',
    id: 'Pemesanan Dikonfirmasi!',
    fil: 'Nakumpirma ang Booking!',
  },
  failedTitle: {
    'zh-TW': '支付失敗',
    'zh-CN': '支付失败',
    en: 'Payment Failed',
    ja: '決済失敗',
    ko: '결제 실패',
    th: 'การชำระเงินล้มเหลว',
    vi: 'Thanh toán thất bại',
    ms: 'Pembayaran Gagal',
    id: 'Pembayaran Gagal',
    fil: 'Nabigo ang Pagbabayad',
  },
  pendingTitle: {
    'zh-TW': '處理中',
    'zh-CN': '处理中',
    en: 'Processing',
    ja: '処理中',
    ko: '처리 중',
    th: 'กำลังดำเนินการ',
    vi: 'Đang xử lý',
    ms: 'Sedang Diproses',
    id: 'Sedang Diproses',
    fil: 'Pinoproseso',
  },
  successMsg: {
    'zh-TW': '您的訂金已收到，我們將盡快為您安排司機。\n您可以在 APP 中查看訂單狀態、與司機即時聯繫。',
    'zh-CN': '您的订金已收到，我们将尽快为您安排司机。\n您可以在 APP 中查看订单状态、与司机即时联系。',
    en: 'Your deposit has been received. We will arrange a driver for you soon.\nYou can check order status and contact your driver in the APP.',
    ja: 'デポジットを受領しました。まもなくドライバーを手配いたします。\nアプリで注文状況の確認やドライバーへの連絡ができます。',
    ko: '예약금이 접수되었습니다. 빠른 시일 내에 기사를 배정해 드리겠습니다.\n앱에서 주문 상태 확인 및 기사와 실시간 연락이 가능합니다.',
    th: 'ได้รับเงินมัดจำของคุณแล้ว เราจะจัดหาคนขับให้คุณโดยเร็ว\nคุณสามารถตรวจสอบสถานะการจองและติดต่อคนขับได้ในแอป',
    vi: 'Chúng tôi đã nhận được tiền đặt cọc của bạn. Chúng tôi sẽ sắp xếp tài xế cho bạn sớm nhất.\nBạn có thể kiểm tra trạng thái đơn hàng và liên hệ tài xế trong ứng dụng.',
    ms: 'Deposit anda telah diterima. Kami akan mengatur pemandu untuk anda secepat mungkin.\nAnda boleh menyemak status pesanan dan menghubungi pemandu dalam APP.',
    id: 'Deposit Anda telah diterima. Kami akan segera mengatur pengemudi untuk Anda.\nAnda dapat memeriksa status pesanan dan menghubungi pengemudi di aplikasi.',
    fil: 'Natanggap na ang iyong deposito. Maglalaan kami ng driver para sa iyo sa lalong madaling panahon.\nMaaari mong tingnan ang status ng order at makipag-ugnayan sa driver sa APP.',
  },
  failedMsg: {
    'zh-TW': '付款未完成，請重試或聯繫客服。',
    'zh-CN': '付款未完成，请重试或联系客服。',
    en: 'Payment was not completed. Please try again or contact support.',
    ja: '決済が完了しませんでした。再度お試しいただくか、サポートまでお問い合わせください。',
    ko: '결제가 완료되지 않았습니다. 다시 시도하거나 고객센터에 문의해 주세요.',
    th: 'การชำระเงินไม่สำเร็จ กรุณาลองใหม่อีกครั้งหรือติดต่อฝ่ายบริการลูกค้า',
    vi: 'Thanh toán chưa hoàn tất. Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ.',
    ms: 'Pembayaran tidak berjaya. Sila cuba lagi atau hubungi khidmat pelanggan.',
    id: 'Pembayaran tidak berhasil. Silakan coba lagi atau hubungi layanan pelanggan.',
    fil: 'Hindi nakumpleto ang pagbabayad. Pakisubukan muli o makipag-ugnayan sa customer service.',
  },
  pendingMsg: {
    'zh-TW': '支付正在處理中，請稍候。您可以在 APP 中查看最新狀態。',
    'zh-CN': '支付正在处理中，请稍候。您可以在 APP 中查看最新状态。',
    en: 'Payment is being processed. You can check the latest status in the APP.',
    ja: '決済処理中です。しばらくお待ちください。アプリで最新の状況をご確認いただけます。',
    ko: '결제가 처리 중입니다. 잠시만 기다려 주세요. 앱에서 최신 상태를 확인할 수 있습니다.',
    th: 'กำลังดำเนินการชำระเงิน กรุณารอสักครู่ คุณสามารถตรวจสอบสถานะล่าสุดได้ในแอป',
    vi: 'Thanh toán đang được xử lý. Vui lòng đợi. Bạn có thể kiểm tra trạng thái mới nhất trong ứng dụng.',
    ms: 'Pembayaran sedang diproses. Sila tunggu sebentar. Anda boleh menyemak status terkini dalam APP.',
    id: 'Pembayaran sedang diproses. Harap tunggu sebentar. Anda dapat memeriksa status terbaru di aplikasi.',
    fil: 'Pinoproseso ang pagbabayad. Pakihintay lamang. Maaari mong tingnan ang pinakabagong status sa APP.',
  },
  orderNo: {
    'zh-TW': '訂單編號',
    'zh-CN': '订单编号',
    en: 'Order No.',
    ja: '注文番号',
    ko: '주문 번호',
    th: 'หมายเลขคำสั่งซื้อ',
    vi: 'Mã đơn hàng',
    ms: 'No. Pesanan',
    id: 'No. Pesanan',
    fil: 'Order No.',
  },
  downloadApp: {
    'zh-TW': '下載 RelayGo APP',
    'zh-CN': '下载 RelayGo APP',
    en: 'Download RelayGo APP',
    ja: 'RelayGo アプリをダウンロード',
    ko: 'RelayGo 앱 다운로드',
    th: 'ดาวน์โหลดแอป RelayGo',
    vi: 'Tải ứng dụng RelayGo',
    ms: 'Muat Turun APP RelayGo',
    id: 'Unduh Aplikasi RelayGo',
    fil: 'I-download ang RelayGo APP',
  },
  downloadHint: {
    'zh-TW': '下載 APP 查看訂單、即時聯繫司機、享受更多功能',
    'zh-CN': '下载 APP 查看订单、即时联系司机、享受更多功能',
    en: 'Download the APP to check orders, contact drivers, and enjoy more features',
    ja: 'アプリをダウンロードして注文確認、ドライバーへの連絡、その他の機能をご利用ください',
    ko: '앱을 다운로드하여 주문 확인, 기사 연락, 더 많은 기능을 이용하세요',
    th: 'ดาวน์โหลดแอปเพื่อตรวจสอบคำสั่งซื้อ ติดต่อคนขับ และใช้งานฟีเจอร์เพิ่มเติม',
    vi: 'Tải ứng dụng để xem đơn hàng, liên hệ tài xế và sử dụng thêm nhiều tính năng',
    ms: 'Muat turun APP untuk menyemak pesanan, menghubungi pemandu dan menikmati lebih banyak ciri',
    id: 'Unduh aplikasi untuk melihat pesanan, menghubungi pengemudi, dan menikmati lebih banyak fitur',
    fil: 'I-download ang APP para tingnan ang mga order, makipag-ugnayan sa driver, at mag-enjoy ng mas maraming feature',
  },
  backHome: {
    'zh-TW': '返回首頁',
    'zh-CN': '返回首页',
    en: 'Back to Home',
    ja: 'ホームに戻る',
    ko: '홈으로 돌아가기',
    th: 'กลับหน้าหลัก',
    vi: 'Về trang chủ',
    ms: 'Kembali ke Laman Utama',
    id: 'Kembali ke Beranda',
    fil: 'Bumalik sa Home',
  },
  retry: {
    'zh-TW': '重新預約',
    'zh-CN': '重新预约',
    en: 'Book Again',
    ja: '再予約',
    ko: '다시 예약',
    th: 'จองใหม่',
    vi: 'Đặt lại',
    ms: 'Tempah Semula',
    id: 'Pesan Lagi',
    fil: 'Mag-book Muli',
  },
  contactUs: {
    'zh-TW': '聯繫客服',
    'zh-CN': '联系客服',
    en: 'Contact Us',
    ja: 'お問い合わせ',
    ko: '고객센터',
    th: 'ติดต่อเรา',
    vi: 'Liên hệ hỗ trợ',
    ms: 'Hubungi Kami',
    id: 'Hubungi Kami',
    fil: 'Makipag-ugnayan sa Amin',
  },
};

function t(obj: Record<string, string>, lang: string): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function ResultInner({ initialLang }: { initialLang: Locale }) {
  const lang = initialLang;
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'pending';
  const orderNo = searchParams.get('orderNo') || '';
  const isSuccess = status === 'success';
  const isFailed = status === 'failed';

  return (
    <div className="charter-page">
      <div className="charter-header" style={{ paddingBottom: '36px' }}>
        <div className="charter-header-inner" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
            {isSuccess ? '🎉' : isFailed ? '❌' : '⏳'}
          </div>
          <h1 className="charter-title">
            {isSuccess ? t(UI.successTitle, lang) : isFailed ? t(UI.failedTitle, lang) : t(UI.pendingTitle, lang)}
          </h1>
        </div>
      </div>

      <div className="charter-form">
        {/* Status message */}
        <div className="charter-section" style={{ textAlign: 'center', padding: '32px 24px' }}>
          {t(isSuccess ? UI.successMsg : isFailed ? UI.failedMsg : UI.pendingMsg, lang).split('\n').map((line, i) => (
            <p key={i} style={{ fontSize: '1rem', lineHeight: 1.7, color: '#4A5568', marginBottom: '8px' }}>{line}</p>
          ))}
          {orderNo && (
            <div style={{ marginTop: '16px', padding: '12px 20px', background: 'rgba(108,99,255,0.06)', borderRadius: '12px', display: 'inline-block' }}>
              <span style={{ fontSize: '0.85rem', color: '#718096' }}>{t(UI.orderNo, lang)}: </span>
              <strong style={{ fontSize: '1rem', color: '#1a1a2e' }}>{orderNo}</strong>
            </div>
          )}
        </div>

        {/* APP Download */}
        {(isSuccess || status === 'pending') && (
          <div className="charter-section" style={{ textAlign: 'center', padding: '28px 24px' }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>
              📱 {t(UI.downloadApp, lang)}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#718096', marginBottom: '20px' }}>
              {t(UI.downloadHint, lang)}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="result-store-btn apple"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.62 4.22-3.74 4.25z"/></svg>
                App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="result-store-btn google"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/></svg>
                Google Play
              </a>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
          <a href={`${langPrefix}/`} className="charter-submit-btn" style={{ width: 'auto', padding: '14px 32px', fontSize: '0.95rem' }}>
            {t(UI.backHome, lang)}
          </a>
          {isFailed && (
            <a href={`${langPrefix}/booking/charter`} className="charter-submit-btn" style={{ width: 'auto', padding: '14px 32px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #6c63ff 0%, #4834d4 100%)' }}>
              {t(UI.retry, lang)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultContent({ initialLang }: { initialLang: Locale }) {
  return (
    <Suspense fallback={<div className="charter-page"><div className="charter-header"><div className="charter-header-inner"><h1 className="charter-title">...</h1></div></div></div>}>
      <ResultInner initialLang={initialLang} />
    </Suspense>
  );
}
