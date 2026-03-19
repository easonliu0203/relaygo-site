'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { localePathMap, type Locale } from '@/lib/i18n-config';
import '../charter.css';

const UI: Record<string, Record<string, string>> = {
  success: { 'zh-TW': '付款成功', en: 'Payment Successful' },
  failed: { 'zh-TW': '付款失敗', en: 'Payment Failed' },
  successMsg: { 'zh-TW': '您的訂金已收到，我們將盡快為您安排司機。', en: 'Your deposit has been received. We will arrange a driver for you soon.' },
  failedMsg: { 'zh-TW': '付款未完成，請重試或聯繫客服。', en: 'Payment was not completed. Please try again or contact support.' },
  backHome: { 'zh-TW': '返回首頁', en: 'Back to Home' },
  retry: { 'zh-TW': '重新預約', en: 'Book Again' },
  orderNo: { 'zh-TW': '訂單編號', en: 'Order No.' },
};

function t(obj: Record<string, string>, lang: string): string {
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

function ResultInner({ initialLang }: { initialLang: Locale }) {
  const lang = initialLang;
  const langPrefix = localePathMap[initialLang] ? `/${localePathMap[initialLang]}` : '';
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'unknown';
  const orderNo = searchParams.get('orderNo') || '';
  const isSuccess = status === 'success';

  return (
    <div className="charter-page">
      <div className="charter-header">
        <div className="charter-header-inner">
          <h1 className="charter-title">{isSuccess ? '✅' : '❌'} {t(isSuccess ? UI.success : UI.failed, lang)}</h1>
        </div>
      </div>
      <div className="charter-form">
        <div className="charter-section" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '20px' }}>
            {t(isSuccess ? UI.successMsg : UI.failedMsg, lang)}
          </p>
          {orderNo && (
            <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '24px' }}>
              {t(UI.orderNo, lang)}: <strong>{orderNo}</strong>
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`${langPrefix}/`} className="charter-submit-btn" style={{ width: 'auto', padding: '14px 32px' }}>
              {t(UI.backHome, lang)}
            </a>
            {!isSuccess && (
              <a href={`${langPrefix}/booking/charter`} className="charter-submit-btn" style={{ width: 'auto', padding: '14px 32px', background: 'linear-gradient(135deg, #6c63ff 0%, #4834d4 100%)' }}>
                {t(UI.retry, lang)}
              </a>
            )}
          </div>
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
