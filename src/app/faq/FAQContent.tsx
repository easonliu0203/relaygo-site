'use client';

import { useState, useEffect, useCallback } from 'react';

type LangCode = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

interface FAQ {
  question: Record<LangCode, string>;
  answer: Record<LangCode, string>;
}

const FAQS: FAQ[] = [
  {
    question: {
      'zh-TW': '包車是否能到府接送？',
      'zh-CN': '包车可以上门接送吗？',
      en: 'Does RelayGo offer door-to-door pickup?',
      ja: 'RelayGoは送迎サービスに対応していますか？',
      ko: 'RelayGo는 숙소 픽업이 가능한가요?',
    },
    answer: {
      'zh-TW': '可以。包車就是免去自駕的困擾，直接在家到府或指定地點上下車接送。',
      'zh-CN': '可以。包车服务直接到您的住所或指定地点接送，免去自驾的烦恼。',
      en: 'Yes. Our charter service picks you up at your hotel, Airbnb, or any designated location — no need to rent a car or navigate public transit.',
      ja: 'はい。ご宿泊先やご指定の場所まで送迎いたします。レンタカーや公共交通機関の心配は不要です。',
      ko: '네. 호텔, 에어비앤비 등 원하시는 장소로 픽업·샌딩 서비스를 제공합니다.',
    },
  },
  {
    question: {
      'zh-TW': '司機素質如何？',
      'zh-CN': '司机素质怎么样？',
      en: 'How is driver quality ensured?',
      ja: 'ドライバーの質はどうですか？',
      ko: '기사님 서비스 품질은 어떤가요?',
    },
    answer: {
      'zh-TW': '所有司機皆具長期包車經驗且無負評。曾受負評之司機一概不派用，確保每一趟旅程的服務品質。',
      'zh-CN': '所有司机均具备长期包车经验且零差评。收到差评的司机一律不再派遣，确保每一趟服务品质。',
      en: 'All drivers are experienced professionals with zero negative reviews. Any driver who receives a complaint is immediately removed from the roster.',
      ja: '全ドライバーはチャーター経験豊富で、低評価のないプロフェッショナルです。クレームを受けたドライバーは即座に登録解除されます。',
      ko: '모든 기사님은 풍부한 차량 대절 경험을 갖추고 있으며 부정적 리뷰가 없는 분만 배정합니다.',
    },
  },
  {
    question: {
      'zh-TW': '車輛是否合法？',
      'zh-CN': '车辆是否合法合规？',
      en: 'Are the vehicles legally registered?',
      ja: '車両は合法ですか？',
      ko: '차량은 합법인가요?',
    },
    answer: {
      'zh-TW': '所有車輛皆為合法營業之租賃車或多元計程車，絕非無保險理賠的白牌車，乘客權益有完整保障。',
      'zh-CN': '所有车辆均为合法运营的租赁车或网约车，绝非无保险的黑车，乘客权益有完整保障。',
      en: 'Absolutely. Every vehicle is a licensed rental car or registered rideshare vehicle with full insurance coverage — never an unlicensed vehicle.',
      ja: 'すべての車両は正規のレンタカーまたは登録済みライドシェア車両で、保険も完備しています。無許可の白タクは一切使用しません。',
      ko: '모든 차량은 정식 등록된 렌터카 또는 다원택시로, 보험이 완비되어 있습니다. 무허가 차량은 절대 배정하지 않습니다.',
    },
  },
  {
    question: {
      'zh-TW': '費用是否包含停車費、過路費等額外費用？',
      'zh-CN': '费用包含停车费、过路费等额外费用吗？',
      en: 'Are tolls, parking, and fuel included in the price?',
      ja: '料金には駐車場代・通行料・燃料費が含まれていますか？',
      ko: '요금에 주차비, 통행료, 유류비가 포함되나요?',
    },
    answer: {
      'zh-TW': '報價時會將司機誤餐費、住宿費、停車費、燃料費、過路費等詳細記載，絕不會在用車過程中臨時加價。',
      'zh-CN': '报价时会将司机餐费、住宿费、停车费、燃油费、过路费等详细列明，绝不会在用车过程中临时加价。',
      en: 'All costs — driver meals, accommodation, parking, fuel, and tolls — are clearly listed upfront. There are never any surprise surcharges during your trip.',
      ja: 'ドライバーの食事代・宿泊費・駐車場代・燃料費・通行料など、すべての費用を事前に明示します。追加請求は一切ございません。',
      ko: '기사 식비, 숙박비, 주차비, 유류비, 통행료 등 모든 비용을 사전에 명확히 안내드리며 추가 요금은 없습니다.',
    },
  },
  {
    question: {
      'zh-TW': '包車需要給司機小費嗎？',
      'zh-CN': '包车需要给司机小费吗？',
      en: 'Is tipping the driver expected?',
      ja: 'チップは必要ですか？',
      ko: '기사님께 팁을 줘야 하나요?',
    },
    answer: {
      'zh-TW': '小費為鼓勵性質的額外補貼，並非強制。若您覺得司機服務周到且辛苦，歡迎自由給予小費鼓勵。',
      'zh-CN': '小费属于鼓励性质，并非强制。如果您觉得司机服务周到，可以自愿给予小费以示感谢。',
      en: 'Tipping is not mandatory. It is entirely at your discretion — if you feel the driver provided excellent service, a tip is always appreciated.',
      ja: 'チップは義務ではありません。ドライバーのサービスにご満足いただけた場合、お気持ちとしてお渡しいただければ幸いです。',
      ko: '팁은 필수가 아닙니다. 기사님의 서비스가 만족스러우셨다면 자유롭게 감사의 마음을 전하실 수 있습니다.',
    },
  },
  {
    question: {
      'zh-TW': '詢問報價需要提供哪些資訊？',
      'zh-CN': '询价需要提供哪些信息？',
      en: 'What information do I need to get a quote?',
      ja: '見積もりに必要な情報は？',
      ko: '견적을 받으려면 어떤 정보가 필요한가요?',
    },
    answer: {
      'zh-TW': '需要提供：日期（確認是否還有車）、人數（確認車款容納）、出發位置（確認安排哪區的車）、大致行程及用車天數（確認路程遠近及司機住宿等費用）。',
      'zh-CN': '需要提供：日期（确认车辆排期）、人数（确认车型）、出发地点（安排就近车辆）、大致行程和用车天数（计算路程和司机住宿费用）。',
      en: 'Please provide: date (to check availability), number of passengers (to assign the right vehicle), pickup location (to arrange a nearby driver), and a rough itinerary with number of days (to estimate distance and driver accommodation costs).',
      ja: 'ご提供いただく情報：日程（空車確認）、人数（車種選定）、出発場所（エリアの車両手配）、おおよその行程と日数（距離とドライバー宿泊費の見積もり）。',
      ko: '필요한 정보: 날짜(차량 가용 확인), 인원수(차종 결정), 출발 장소(해당 지역 차량 배정), 대략적인 일정과 이용 일수(거리 및 기사 숙박비 산정).',
    },
  },
  {
    question: {
      'zh-TW': '包車行程可以自訂嗎？',
      'zh-CN': '包车行程可以自定义吗？',
      en: 'Can I customize the itinerary?',
      ja: '行程のカスタマイズは可能ですか？',
      ko: '일정을 직접 짤 수 있나요?',
    },
    answer: {
      'zh-TW': '行程完全由您自訂。網站上的景點路線僅供參考，司機會按照您的路線行駛，路線不順時也會提供專業建議以節省交通時間。',
      'zh-CN': '行程完全由您自定。网站上的景点路线仅供参考，司机会按照您的路线行驶，路线不顺时也会提供专业建议以节省交通时间。',
      en: "Absolutely. You plan the route, and your driver follows it. The routes on our website are suggestions only. If a route isn't optimal, your driver will offer professional advice to save travel time.",
      ja: 'もちろんです。お客様のご希望ルートに沿って走行します。サイト掲載のルートは参考例です。効率的でないルートの場合はドライバーがアドバイスいたします。',
      ko: '네, 일정은 자유롭게 구성 가능합니다. 사이트의 코스는 참고용이며, 비효율적인 동선은 기사님이 전문적으로 조언해 드립니다.',
    },
  },
  {
    question: {
      'zh-TW': '有沒有限制用車出發時間？',
      'zh-CN': '出发时间有限制吗？',
      en: 'Is there a restriction on departure time?',
      ja: '出発時間に制限はありますか？',
      ko: '출발 시간에 제한이 있나요?',
    },
    answer: {
      'zh-TW': '每日出發時間由您自訂，請最晚於前一天告知客服或司機。建議不要晚於上午 11 點出發，以確保充足的遊覽時間。',
      'zh-CN': '每天出发时间由您自定，请最晚提前一天告知客服或司机。建议不要晚于上午11点出发，以确保充足的游览时间。',
      en: 'You choose the departure time. Just inform customer service or your driver by the day before. We recommend departing no later than 11 AM to maximize your touring time.',
      ja: '出発時間はお客様が自由に設定できます。前日までにカスタマーサポートまたはドライバーにお伝えください。十分な観光時間のため、午前11時までの出発をおすすめします。',
      ko: '출발 시간은 자유롭게 정하실 수 있습니다. 전날까지 고객센터 또는 기사님께 알려주세요. 충분한 관광 시간을 위해 오전 11시 이전 출발을 권장합니다.',
    },
  },
  {
    question: {
      'zh-TW': '用車時數未使用完畢是否能退費？',
      'zh-CN': '用车时间没用完可以退费吗？',
      en: 'Can I get a refund for unused hours?',
      ja: '利用時間が余った場合、返金はありますか？',
      ko: '이용 시간을 다 쓰지 못하면 환불되나요?',
    },
    answer: {
      'zh-TW': '包車為預約制，司機出發後工作時間已保留給您。若因行程提早結束而未用完時數，恕無法另外退費。',
      'zh-CN': '包车为预约制，司机出发后已为您保留工作时间。若行程提前结束未用完时长，无法另外退费。',
      en: "Our charter service is reservation-based. Once the driver departs, the time is reserved for you. If your itinerary ends early, unused hours are non-refundable as the driver's schedule has been committed.",
      ja: 'チャーターサービスは予約制です。ドライバー出発後の時間はお客様専用に確保されています。行程が早く終了した場合でも、未使用時間の返金は致しかねます。',
      ko: '차량 대절은 예약제로 운영됩니다. 기사님 출발 후 해당 시간은 고객님 전용으로 확보되므로, 일정이 일찍 끝나더라도 미사용 시간 환불은 어렵습니다.',
    },
  },
  {
    question: {
      'zh-TW': '如何預約包車？',
      'zh-CN': '如何预约包车？',
      en: 'How do I book a charter?',
      ja: 'どうやって予約しますか？',
      ko: '어떻게 예약하나요?',
    },
    answer: {
      'zh-TW': '使用 RelayGo App 預約，預約完畢後可在 App 聊天頁面聯繫客服完成預約流程。建議一個月前預訂，以免旺季無車可訂。',
      'zh-CN': '使用 RelayGo App 预约，预约完成后可在 App 聊天页面联系客服完成预约流程。建议提前一个月预订，避免旺季无车可订。',
      en: 'Book through the RelayGo app. After booking, you can contact customer service via the in-app chat. We recommend booking at least one month in advance during peak season.',
      ja: 'RelayGo アプリからご予約ください。予約後、アプリ内チャットでカスタマーサポートに連絡できます。繁忙期は1ヶ月前のご予約をおすすめします。',
      ko: 'RelayGo 앱에서 예약하세요. 예약 후 앱 내 채팅으로 고객센터에 문의할 수 있습니다. 성수기에는 1개월 전 예약을 권장합니다.',
    },
  },
  {
    question: {
      'zh-TW': '訂車是否需先預付訂金？',
      'zh-CN': '订车需要预付定金吗？',
      en: 'Is a deposit required?',
      ja: 'デポジット（前金）は必要ですか？',
      ko: '보증금을 미리 내야 하나요?',
    },
    answer: {
      'zh-TW': '是的，訂車皆須預付訂金才算完成訂車程序。',
      'zh-CN': '是的，预订车辆需要预付定金才算完成订车流程。',
      en: 'Yes. A deposit is required to confirm your booking.',
      ja: 'はい。予約確定にはデポジット（前金）のお支払いが必要です。',
      ko: '네, 예약 확정을 위해 보증금 선결제가 필요합니다.',
    },
  },
  {
    question: {
      'zh-TW': '付款方式有哪些？',
      'zh-CN': '有哪些付款方式？',
      en: 'What payment methods are accepted?',
      ja: '支払い方法は？',
      ko: '결제 방법은 어떻게 되나요?',
    },
    answer: {
      'zh-TW': '支援 App 內線上刷卡支付，需預付訂金才完成訂車程序。',
      'zh-CN': '支持 App 内在线信用卡支付，需预付定金完成订车流程。',
      en: 'Online credit card payment through the app. A deposit is required to confirm your booking.',
      ja: 'アプリ内でクレジットカード決済が可能です。予約確定にはデポジット（前金）が必要です。',
      ko: '앱 내 신용카드 온라인 결제를 지원하며, 예약 확정을 위해 보증금 선결제가 필요합니다.',
    },
  },
  {
    question: {
      'zh-TW': '出發前如何聯繫司機？',
      'zh-CN': '出发前怎么联系司机？',
      en: 'How do I contact my driver before the trip?',
      ja: '出発前にドライバーと連絡できますか？',
      ko: '출발 전에 기사님과 연락할 수 있나요?',
    },
    answer: {
      'zh-TW': '出發前一日即可透過 App 聊天頁面與司機直接聯絡，確認接送細節。',
      'zh-CN': '出发前一天即可通过 App 聊天页面与司机直接联系，确认接送细节。',
      en: 'You can message your driver directly through the in-app chat the day before departure to confirm pickup details.',
      ja: '出発前日からアプリ内チャットでドライバーと直接やり取りし、ピックアップの詳細を確認できます。',
      ko: '출발 전날부터 앱 내 채팅으로 기사님과 직접 연락하여 픽업 세부사항을 확인할 수 있습니다.',
    },
  },
  {
    question: {
      'zh-TW': '需要提早多久預訂？',
      'zh-CN': '需要提前多久预订？',
      en: 'How far in advance should I book?',
      ja: 'どのくらい前に予約すべきですか？',
      ko: '얼마나 전에 예약해야 하나요?',
    },
    answer: {
      'zh-TW': '建議一個月前預訂，旺季期間車輛容易額滿。越早預訂，越能確保有車可用。',
      'zh-CN': '建议提前一个月预订，旺季期间车辆容易满额。越早预订越有保障。',
      en: 'We recommend booking at least one month in advance. During peak season, vehicles fill up quickly — the earlier you book, the better.',
      ja: '1ヶ月前のご予約をおすすめします。繁忙期は車両がすぐに埋まりますので、早めのご予約が確実です。',
      ko: '1개월 전 예약을 권장합니다. 성수기에는 차량이 빨리 마감되므로 빠를수록 좋습니다.',
    },
  },
];

const UI = {
  title: {
    'zh-TW': '常見問題',
    'zh-CN': '常见问题',
    en: 'Frequently Asked Questions',
    ja: 'よくある質問',
    ko: '자주 묻는 질문',
  },
  subtitle: {
    'zh-TW': '包車旅遊常見問題，一次解答',
    'zh-CN': '包车旅游常见问题，一次解答',
    en: 'Everything you need to know about our charter service',
    ja: 'チャーターサービスに関するよくある質問',
    ko: '차량 대절 서비스에 대해 자주 묻는 질문',
  },
  back: {
    'zh-TW': '← 返回首頁',
    'zh-CN': '← 返回首页',
    en: '← Back to Home',
    ja: '← ホームへ戻る',
    ko: '← 홈으로 돌아가기',
  },
  cta: {
    'zh-TW': '立即下載 App 預約包車',
    'zh-CN': '立即下载 App 预约包车',
    en: 'Download App to Book Now',
    ja: '今すぐアプリをダウンロードして予約',
    ko: '지금 앱 다운로드하고 예약하기',
  },
};

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'zh-TW', label: '繁中' },
  { code: 'zh-CN', label: '简中' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
  { code: 'ko', label: 'KO' },
];

function detectLang(): LangCode {
  if (typeof window === 'undefined') return 'zh-TW';
  const stored = localStorage.getItem('relaygo-lang') as LangCode | null;
  if (stored && LANGS.some((l) => l.code === stored)) return stored;
  const nav = navigator.language || '';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('zh') && nav.includes('CN')) return 'zh-CN';
  if (nav.startsWith('en')) return 'en';
  return 'zh-TW';
}

export default function FAQContent() {
  const [lang, setLang] = useState<LangCode>('zh-TW');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const changeLang = useCallback((code: LangCode) => {
    setLang(code);
    localStorage.setItem('relaygo-lang', code);
  }, []);

  return (
    <div className="faq-page">
      <nav className="faq-nav">
        <a href="/" className="faq-back">{UI.back[lang]}</a>
        <div className="faq-lang-pills">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`faq-lang-pill ${lang === l.code ? 'active' : ''}`}
              onClick={() => changeLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </nav>

      <header className="faq-header">
        <h1>{UI.title[lang]}</h1>
        <p>{UI.subtitle[lang]}</p>
      </header>

      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{faq.question[lang]}</span>
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>{faq.answer[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-cta">
        <a
          href="https://apps.apple.com/tw/app/relay-go/id6756459981"
          target="_blank"
          rel="noopener"
          className="faq-cta-btn"
        >
          {UI.cta[lang]}
        </a>
      </div>
    </div>
  );
}
