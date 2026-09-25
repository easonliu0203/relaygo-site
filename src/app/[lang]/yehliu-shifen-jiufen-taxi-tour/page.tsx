import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPricingTables } from '@/lib/supabase';
import { resolveLocale } from '@/lib/i18n-config';
import { ogImage } from '@/lib/og';

// Korean-market landing page for "예스진지 택시투어" (Yehliu・Shifen・Jiufen・
// Jinguashi by private car). "예스진지" is a Korean-only coinage — nobody
// searches it in any other language — so this page exists in ko only; other
// locales 404 rather than carrying a translated copy nobody looks for.
// Prices come from the same vehicle_pricing table as /pricing.
export const revalidate = 3600;
export const dynamicParams = false;

const PATH = '/yehliu-shifen-jiufen-taxi-tour';
const CANONICAL = `https://relaygo.pro/ko${PATH}`;
const HOURS = 10; // recommended length for all four stops
const COVER = 'https://images.unsplash.com/photo-1540187334920-54e87c2771c0?w=1200&q=80';

// Public-transport fare total from the ko guide's transit plan (checked 2026):
// 1815 NT$96 + 862 NT$30 + TRA NT$30 + Pingxi NT$20×2 + 788 NT$15 + 1062 NT$101.
const TRANSIT_FARE = 312;

// 9-seat promo (IG "RG" code). Hidden automatically once it ends.
const PROMO_END = new Date('2027-04-01T00:00:00+08:00');
const PROMO_PRICE = 5110;
const PROMO_POST = 'https://www.instagram.com/p/DdG5aqHBtYB/';

const VEHICLES = [
  { key: 'S', name: '5인승 세단', seats: 3 },
  { key: 'M', name: '5인승 SUV', seats: 4 },
  { key: 'L', name: '9인승 밴', seats: 8 },
  { key: 'XL', name: '토요타 알파드 (프리미엄)', seats: 0 },
] as const;

export function generateStaticParams() {
  return [{ lang: 'ko' }];
}

function nt(n: number) {
  return `NT$${Math.round(n).toLocaleString('en-US')}`;
}

async function getKrwRate(): Promise<number | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/TWD', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const v = Number(data?.rates?.KRW);
    return Number.isFinite(v) && v > 0 ? v : null;
  } catch {
    // No rate → the won reference price is simply left out.
    return null;
  }
}

async function getRows() {
  const pricing = await getPricingTables();
  return VEHICLES.filter((v) => pricing.charter[v.key]?.h8).map((v) => {
    const row = pricing.charter[v.key];
    const h8 = row.h8 as number;
    const h10 = h8 + row.overtime * (HOURS - 8);
    return { ...v, h8, h10, overtime: row.overtime, perHead: v.seats ? h10 / v.seats : null };
  });
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (resolveLocale(params.lang) !== 'ko') return {};
  const rows = await getRows();
  const m = rows.find((r) => r.key === 'M');
  const title = '예스진지 택시투어 가격・코스 총정리｜타이베이 출발 전용 차량 | RelayGo';
  const description =
    `예스진지(예류・스펀・지우펀・진과스) 택시투어를 한국어 앱으로 예약하세요. 타이베이 호텔 픽업, ` +
    (m ? `4인이면 1인 약 ${nt(m.perHead as number)}(10시간), ` : '') +
    '통행료・유류비 포함 확정 요금. 10시간 추천 일정과 버스투어・대중교통 비교, 자주 묻는 질문까지 정리했습니다.';

  return {
    title,
    description,
    keywords:
      '예스진지 택시투어, 예스진지 택시투어 가격, 예스진지 투어, 예스지 택시투어, 대만 택시투어, 지우펀 택시투어, 타이베이 택시투어, 예류 스펀 지우펀, 진과스 황금박물관, 대만 차량 대절, 대만 한국어 예약',
    openGraph: {
      title,
      description,
      type: 'article',
      url: CANONICAL,
      siteName: 'RelayGo',
      locale: 'ko',
      images: [{ url: COVER, width: 1200, height: 800, alt: '지우펀 홍등 거리' }, ogImage('ko')],
    },
    twitter: { card: 'summary_large_image', title, description, images: [COVER] },
    alternates: { canonical: CANONICAL, languages: { ko: CANONICAL } },
  };
}

export default async function YesjinjiTaxiTourPage({ params }: { params: { lang: string } }) {
  if (resolveLocale(params.lang) !== 'ko') notFound();

  const [rows, krw] = await Promise.all([getRows(), getKrwRate()]);
  const won = (twd: number) =>
    krw ? `약 ₩${(Math.round((twd * krw) / 1000) * 1000).toLocaleString('ko-KR')}` : '';
  const s = rows.find((r) => r.key === 'S');
  const m = rows.find((r) => r.key === 'M');
  const minOvertime = Math.min(...rows.map((r) => r.overtime));
  const showPromo = Date.now() < PROMO_END.getTime();

  const faqs = [
    {
      q: '예스진지 네 곳을 다 돌려면 몇 시간이 필요한가요?',
      a: `예류・스펀・지우펀・진과스를 여유 있게 보려면 10시간을 추천합니다. 8시간이면 예류・스펀・지우펀 세 곳 위주로 돌고 진과스는 짧게 들르거나 빼는 일정이 됩니다. 예약 시간을 넘기면 시간당 추가 요금(${nt(minOvertime)}부터)이 부과됩니다.`,
    },
    {
      q: '기사님이 한국어를 하나요?',
      a: '기사님은 주로 중국어를 사용하지만, RelayGo 앱의 채팅은 한국어로 자동 번역됩니다. 픽업 장소 확인이나 일정 변경도 앱에서 한국어로 편하게 주고받을 수 있습니다.',
    },
    {
      q: '천등 비용과 입장료도 요금에 포함되나요?',
      a: '요금에는 차량, 기사님, 유류비, 통행료, 주차비가 포함됩니다. 예류 지질공원 입장료, 천등 비용, 식비 같은 개인 비용은 별도입니다.',
    },
    {
      q: '비가 오면 어떻게 하나요?',
      a: '북해안과 지우펀은 비가 잦지만, 비 오는 지우펀은 안개 낀 홍등 거리가 오히려 더 운치 있습니다. 돌계단이 미끄러우니 미끄럼 방지 신발과 우비를 챙기세요. 택시투어는 비를 맞으며 버스를 기다릴 필요가 없어 편합니다.',
    },
    {
      q: '공항에서 바로 출발하거나 공항에서 끝낼 수 있나요?',
      a: '네. 같은 예약에 공항 픽업・샌딩을 추가하면 캐리어를 차에 싣고 바로 출발하거나 투어 후 공항으로 갈 수 있습니다. 공항 픽업을 추가하면 지역 외 요금도 면제됩니다.',
    },
    {
      q: '몇 명까지 탈 수 있나요?',
      a: '기사님을 제외하고 5인승 세단은 3명, 5인승 SUV는 4명, 9인승 밴은 8명까지 탈 수 있습니다(어린이・유아 포함). 캐리어가 많다면 한 단계 큰 차량을 추천합니다.',
    },
    {
      q: '일정이 일찍 끝나면 남은 시간은 환불되나요?',
      a: '택시투어는 예약제로 운영되어 기사님이 출발한 뒤에는 해당 시간이 고객님 전용으로 확보됩니다. 일정이 일찍 끝나더라도 미사용 시간은 환불되지 않습니다.',
    },
  ];

  const tripLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${CANONICAL}#trip`,
    name: '예스진지 택시투어 (예류・스펀・지우펀・진과스)',
    description: '타이베이 호텔에서 출발해 예류 지질공원, 스펀, 진과스, 지우펀을 전용 차량으로 하루에 도는 택시투어',
    inLanguage: 'ko',
    touristType: ['가족 여행', '커플 여행', '자유여행'],
    image: COVER,
    provider: { '@id': 'https://relaygo.pro/#organization' },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: ['예류 지질공원', '스펀 옛거리', '진과스 황금박물관', '지우펀 옛거리'].map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'TouristAttraction', name },
      })),
    },
    offers: rows.map((r) => ({
      '@type': 'Offer',
      name: `${r.name} ${HOURS}시간`,
      price: String(r.h10),
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      url: CANONICAL,
    })),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ko',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://relaygo.pro/ko' },
      { '@type': 'ListItem', position: 2, name: '택시투어 코스', item: 'https://relaygo.pro/ko/guides' },
      { '@type': 'ListItem', position: 3, name: '예스진지 택시투어', item: CANONICAL },
    ],
  };

  const schedule = [
    { time: '09:00', what: '타이베이 호텔 픽업', note: '예류까지 약 1시간' },
    { time: '10:00', what: '예류 지질공원', note: '여왕머리 바위・버섯바위 (약 1.5시간)' },
    { time: '11:30', what: '스펀으로 이동', note: '약 40분' },
    { time: '12:10', what: '스펀 옛거리・스펀 폭포', note: '점심, 기찻길 위 천등 날리기, 폭포 산책 (약 2시간)' },
    { time: '14:10', what: '진과스로 이동', note: '약 45분' },
    { time: '15:00', what: '진과스 황금박물관・황금폭포・음양해', note: '약 1시간 (황금박물관은 매월 첫째 주 월요일 휴관)' },
    { time: '16:10', what: '지우펀 옛거리', note: '먹거리, 찻집, 해 질 녘 홍등이 켜진 수치루 (약 1시간 50분)' },
    { time: '18:00', what: '타이베이로 출발', note: '19:00경 호텔 도착' },
  ];

  const compare = [
    {
      label: '요금',
      relay: s && m ? `차량 1대 ${nt(s.h10)}부터 (4인이면 1인 ${nt(m.perHead as number)})` : '차량 1대 기준 확정 요금',
      bus: '1인 요금 (상품마다 다름)',
      transit: `1인 약 ${nt(TRANSIT_FARE)}`,
    },
    { label: '출발', relay: '호텔 픽업, 원하는 시간', bus: '지정 장소・시간에 집합', transit: '07:30 타이베이역 출발 권장' },
    { label: '체류 시간', relay: '자유롭게 조절', bus: '명소별로 정해짐', transit: '버스・기차 시간표에 맞춤' },
    { label: '환승', relay: '없음', bus: '없음', transit: '3~4회 (핑시선 약 1시간 간격)' },
    { label: '이동 시간', relay: '직행 약 2시간', bus: '상품마다 다름', transit: '환승 포함 약 4시간' },
    { label: '추천', relay: '가족・어르신・3인 이상', bus: '혼자 여행', transit: '배낭여행・예산 중시' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="pricing-page">
        <div className="pricing-page-inner">
          <nav className="pricing-crumbs" aria-label="Breadcrumb">
            <a href="/ko">홈</a>
            <span aria-hidden="true"> / </span>
            <a href="/ko/guides">택시투어 코스</a>
            <span aria-hidden="true"> / </span>
            <span>예스진지 택시투어</span>
          </nav>

          <h1 className="pricing-page-h1">예스진지 택시투어 가격・코스 총정리</h1>
          <p className="pricing-page-intro">
            예스진지는 예류(野柳)・스펀(十分)・지우펀(九份)・진과스(金瓜石)의 앞 글자를 딴 말로, 타이베이 근교 북부를 하루에 도는
            한국인 여행자 인기 코스입니다. 네 곳 사이에는 직통 버스가 없어 대중교통으로는 환승이 3~4번 필요하지만, RelayGo
            택시투어는 호텔에서 전용 차량으로 출발해 원하는 곳에 원하는 만큼 머무를 수 있습니다. 예약은 한국어 앱으로 하고,
            기사님과의 채팅은 한국어로 자동 번역됩니다.
          </p>

          <img
            className="landing-cover"
            src={COVER}
            alt="해 질 녘 홍등이 켜진 지우펀 옛거리"
            width={1200}
            height={800}
            fetchPriority="high"
          />

          <h2 className="pricing-page-h2">예스진지 택시투어 가격 (차량 1대 기준)</h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>차량</th>
                  <th>탑승 인원</th>
                  <th>8시간</th>
                  <th>{HOURS}시간 (추천)</th>
                  <th>1인당 ({HOURS}시간)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td>{r.name}</td>
                    <td>{r.seats ? `최대 ${r.seats}명` : '좌석・수하물 유연 배치'}</td>
                    <td>
                      <span className="price-val">{nt(r.h8)}</span>
                      {krw && <div className="transfer-sub">{won(r.h8)}</div>}
                    </td>
                    <td>
                      <span className="price-val">{nt(r.h10)}</span>
                      {krw && <div className="transfer-sub">{won(r.h10)}</div>}
                    </td>
                    <td>
                      {r.perHead ? (
                        <>
                          <span className="price-val">{nt(r.perHead)}</span>
                          <div className="transfer-sub">{r.seats}명 기준</div>
                        </>
                      ) : (
                        <span className="price-na">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="landing-notes">
            <li>통행료・유류비・주차비가 포함된 확정 요금이며, 이동 중 추가 요금은 없습니다.</li>
            <li>{HOURS}시간 요금은 8시간 요금에 시간당 추가 요금 2시간을 더한 금액입니다.</li>
            <li>타이베이 시내 호텔 픽업・샌딩 기준이며 지역 외 요금이 없습니다.</li>
            {krw && <li>원화는 오늘 환율 기준 참고 금액이며, 결제는 대만 달러(TWD)로 진행됩니다.</li>}
          </ul>
          {showPromo && (
            <p className="landing-promo">
              🎉 <strong>9인승 밴 8시간 프로모션가 {nt(PROMO_PRICE)}</strong> (약 30% 할인) —{' '}
              <a href={PROMO_POST} target="_blank" rel="noopener noreferrer">
                인스타그램 게시물
              </a>
              에 &ldquo;RG&rdquo; 댓글을 남기면 할인 코드를 받을 수 있습니다. (2027년 3월 31일까지)
            </p>
          )}

          <h2 className="pricing-page-h2">추천 일정 ({HOURS}시간)</h2>
          <ol className="landing-timeline">
            {schedule.map((x) => (
              <li key={x.time}>
                <span className="landing-time">{x.time}</span>
                <div>
                  <strong>{x.what}</strong>
                  <div className="transfer-sub">{x.note}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="pricing-page-body">
            8시간으로 줄이려면 진과스를 빼고 지우펀을 17:00경 마무리하는 일정을 추천합니다. 다만 지우펀의 홍등은 해 질 무렵부터
            켜지니, 야경을 보고 싶다면 {HOURS}시간 일정이 좋습니다. 출발 시간과 순서는 자유롭게 바꿀 수 있고, 비효율적인 동선은
            기사님이 조언해 드립니다.
          </p>

          <h2 className="pricing-page-h2">택시투어 vs 버스투어 vs 대중교통</h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table transfer-compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th>RelayGo 택시투어</th>
                  <th>단체 버스투어</th>
                  <th>대중교통</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((c) => (
                  <tr key={c.label}>
                    <td>{c.label}</td>
                    <td className="landing-col-highlight">{c.relay}</td>
                    <td>{c.bus}</td>
                    <td>{c.transit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="pricing-page-h2">RelayGo 택시투어가 편한 이유</h2>
          <ul className="transfer-points">
            <li><span aria-hidden="true">💬</span>한국어 앱으로 예약하고, 기사님과의 채팅은 한국어로 자동 번역</li>
            <li><span aria-hidden="true">🧾</span>통행료・유류비・주차비 포함 확정 요금, 이동 중 추가 요금 없음</li>
            <li><span aria-hidden="true">🏨</span>타이베이 호텔・에어비앤비 등 원하는 곳에서 픽업</li>
            <li><span aria-hidden="true">🛡️</span>정식 등록 차량과 승객 보험, 리뷰가 검증된 기사님만 배정</li>
            <li><span aria-hidden="true">✈️</span>공항 픽업・샌딩을 추가하면 지역 외 요금 면제</li>
          </ul>

          <h2 className="pricing-page-h2">예약 방법</h2>
          <ol className="landing-steps">
            <li>RelayGo 앱을 설치합니다 (iOS・Android).</li>
            <li>날짜, 인원, 차량을 고르고 원하는 코스(예스진지)를 입력합니다.</li>
            <li>신용카드로 예약금을 결제하면 예약이 확정됩니다.</li>
            <li>출발 전날부터 앱 채팅으로 기사님과 픽업 시간・장소를 확인합니다.</li>
          </ol>
          <p className="pricing-page-note">성수기에는 차량이 빨리 마감되므로 1개월 전 예약을 권장합니다.</p>

          <h2 className="pricing-page-h2">자주 묻는 질문</h2>
          <div className="transfer-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <p className="pricing-page-note transfer-disclaimer">
            대중교통 요금과 소요 시간은 2026년 참고 정보이며 실제와 다를 수 있습니다. 명소 운영 시간과 입장료는 방문 전 공식
            사이트에서 확인해 주세요.
          </p>
          <p className="pricing-page-note">
            <a href="/ko/guide/yehliu-shifen-jiufen">예류・스펀・지우펀 코스 상세 가이드</a>
            {' ・ '}
            <a href="/ko/pricing">전체 요금표</a>
            {' ・ '}
            <a href="/ko/taoyuan-airport-to-taipei">타오위안 공항에서 타이베이 가는 법</a>
          </p>

          <div className="pricing-page-cta">
            <a href="/ko#download" className="guides-view-all">
              한국어 앱으로 예약하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
