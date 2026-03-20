'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import '../charter.css';

const APP_STORE_URL = 'https://apps.apple.com/tw/app/relay-go/id6756459981';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.relaygo.customer';

const UI: Record<string, Record<string, string>> = {
  successTitle: { 'zh-TW': '預約完成！', en: 'Booking Confirmed!' },
  failedTitle: { 'zh-TW': '支付失敗', en: 'Payment Failed' },
  pendingTitle: { 'zh-TW': '處理中', en: 'Processing' },
  successMsg: {
    'zh-TW': '您的訂金已收到，我們將盡快為您安排司機。\n您可以在 APP 中查看訂單狀態、與司機即時聯繫。',
    en: 'Your deposit has been received. We will arrange a driver for you soon.\nYou can check order status and contact your driver in the APP.',
  },
  failedMsg: {
    'zh-TW': '付款未完成，請重試或聯繫客服。',
    en: 'Payment was not completed. Please try again or contact support.',
  },
  pendingMsg: {
    'zh-TW': '支付正在處理中，請稍候。您可以在 APP 中查看最新狀態。',
    en: 'Payment is being processed. You can check the latest status in the APP.',
  },
  orderNo: { 'zh-TW': '訂單編號', en: 'Order No.' },
  downloadApp: { 'zh-TW': '下載 RelayGo APP', en: 'Download RelayGo APP' },
  downloadHint: {
    'zh-TW': '下載 APP 查看訂單、即時聯繫司機、享受更多功能',
    en: 'Download the APP to check orders, contact drivers, and enjoy more features',
  },
  backHome: { 'zh-TW': '返回首頁', en: 'Back to Home' },
  retry: { 'zh-TW': '重新預約', en: 'Book Again' },
  contactUs: { 'zh-TW': '聯繫客服', en: 'Contact Us' },
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
