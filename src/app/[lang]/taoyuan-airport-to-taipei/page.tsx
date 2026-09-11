import { Metadata } from 'next';
import { getTaipeiTpePrices } from '@/lib/supabase';
import { locales, localePathMap, resolveLocale } from '@/lib/i18n-config';
import { PAGE_TITLES, PAGE_DESCS, PAGE_KEYWORDS, UI } from './i18n';

// RelayGo prices come from the same table as /pricing; third-party fares are
// static copy with a dated disclaimer.
export const revalidate = 3600;

const PATH = '/taoyuan-airport-to-taipei';

// Third-party figures (checked 2026-09). Update the disclaimer date with these.
const MRT_FARE = 160;
const BUS_FARE = 'NT$130–160';
const TAXI_FARE = 'NT$1,150–1,610';

export function generateStaticParams() {
  return locales.map((l) => ({ lang: localePathMap[l] || l }));
}

function buildAlternates() {
  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro${PATH}` };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}${PATH}` : `https://relaygo.pro${PATH}`;
  }
  return languages;
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}${PATH}` : `https://relaygo.pro${PATH}`;

  return {
    title: PAGE_TITLES[locale],
    description: PAGE_DESCS[locale],
    keywords: PAGE_KEYWORDS[locale],
    openGraph: {
      title: PAGE_TITLES[locale],
      description: PAGE_DESCS[locale],
      type: 'article',
      url: canonical,
      siteName: 'RelayGo',
      locale: locale.replace('-', '_'),
      images: [{ url: 'https://relaygo.pro/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: PAGE_TITLES[locale],
      description: PAGE_DESCS[locale],
      images: ['https://relaygo.pro/og-image.png'],
    },
    alternates: { canonical, languages: buildAlternates() },
  };
}

function nt(n: number) {
  return `NT$${n.toLocaleString('en-US')}`;
}

export default async function TaoyuanToTaipeiPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  const t = (key: string) => UI[key][locale];
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const canonical = `https://relaygo.pro${langPrefix}${PATH}`;

  const prices = await getTaipeiTpePrices();
  const fill = (s: string) => s.replace('{s}', nt(prices.S)).replace('{m}', nt(prices.M));
  const people = (n: number) => (n === 1 ? t('person1') : t('people').replace('{n}', String(n)));
  const perHead = (total: number, n: number) => `${t('perHead')} ${nt(Math.round(total / n))}`;

  const rows = [
    { mode: t('modeMrt'), time: `35–39 ${t('min')}${t('toStation')}`, fare: `${nt(MRT_FARE)} ${t('perPerson')}`, night: t('nightMrt'), best: t('bestMrt') },
    { mode: t('modeBus'), time: `~55 ${t('min')}${t('toStation')}`, fare: `${BUS_FARE} ${t('perPerson')}`, night: t('nightBus'), best: t('bestBus') },
    { mode: t('modeTaxi'), time: `40–55 ${t('min')}`, fare: `${TAXI_FARE} ${t('perCar')}`, night: t('nightTaxi'), best: t('bestTaxi') },
    { mode: t('modeRelay'), time: `40–60 ${t('min')}`, fare: `${nt(prices.S)} ${t('from')} ${t('perCar')}`, night: t('nightRelay'), best: t('bestRelay'), highlight: true },
  ];

  const groupRows = [
    { n: 1, relay: nt(prices.S), relayNote: t('vehS'), relayTotal: prices.S },
    { n: 3, relay: nt(prices.S), relayNote: t('vehS'), relayTotal: prices.S },
    { n: 4, relay: nt(prices.M), relayNote: t('vehM'), relayTotal: prices.M },
  ];

  const faqs = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: fill(t('faq3a')) },
  ];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
      { '@type': 'ListItem', position: 1, name: t('bcHome'), item: `https://relaygo.pro${langPrefix || '/'}` },
      { '@type': 'ListItem', position: 2, name: t('bcPage'), item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="pricing-page">
        <div className="pricing-page-inner">
          <nav className="pricing-crumbs" aria-label="Breadcrumb">
            <a href={langPrefix || '/'}>{t('bcHome')}</a>
            <span aria-hidden="true"> / </span>
            <span>{t('bcPage')}</span>
          </nav>

          <h1 className="pricing-page-h1">{t('h1')}</h1>
          <p className="pricing-page-intro">{t('intro')}</p>

          <h2 className="pricing-page-h2">{t('compareH2')}</h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table transfer-compare-table">
              <thead>
                <tr>
                  <th>{t('thMode')}</th>
                  <th>{t('thTime')}</th>
                  <th>{t('thFare')}</th>
                  <th>{t('thNight')}</th>
                  <th>{t('thBest')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.mode} className={r.highlight ? 'transfer-row-highlight' : undefined}>
                    <td>{r.mode}</td>
                    <td>{r.time}</td>
                    <td><span className="price-val">{r.fare}</span></td>
                    <td>{r.night}</td>
                    <td className="transfer-best">{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pricing-page-note">{t('taxiNote')}</p>

          <h2 className="pricing-page-h2">{t('groupH2')}</h2>
          <p className="pricing-page-body">{t('groupIntro')}</p>
          <div className="pricing-table-wrap transfer-group-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>{t('thPeople')}</th>
                  <th>{t('colMrt')}</th>
                  <th>{t('colTaxi')}</th>
                  <th>{t('colRelay')}</th>
                </tr>
              </thead>
              <tbody>
                {groupRows.map((g) => (
                  <tr key={g.n}>
                    <td>{people(g.n)}</td>
                    <td><span className="price-val">{nt(MRT_FARE * g.n)}</span></td>
                    <td>{TAXI_FARE}</td>
                    <td>
                      <span className="price-val">{g.relay}</span> <span className="price-from">{t('from')}</span>
                      <div className="transfer-sub">{g.relayNote}</div>
                      {g.n > 1 && <div className="transfer-sub">{perHead(g.relayTotal, g.n)}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pricing-page-note">{t('groupNote')}</p>

          <h2 className="pricing-page-h2">{t('relayH2')}</h2>
          <ul className="transfer-points">
            <li><span aria-hidden="true">💬</span>{t('relay1')}</li>
            <li><span aria-hidden="true">🧾</span>{t('relay2')}</li>
            <li><span aria-hidden="true">🏨</span>{t('relay3')}</li>
            <li><span aria-hidden="true">✈️</span>{t('relay4')}</li>
          </ul>

          <h2 className="pricing-page-h2">{t('faqH2')}</h2>
          <div className="transfer-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <p className="pricing-page-note transfer-disclaimer">{t('disclaimer')}</p>
          <p className="pricing-page-note">
            {t('linksLabel')}：{' '}
            <a href="https://www.tymetro.com.tw/" target="_blank" rel="noopener noreferrer">{t('linkMrt')}</a>
            {' ・ '}
            <a href="https://www.kingbus.com.tw/" target="_blank" rel="noopener noreferrer">{t('linkBus')}</a>
            {' ・ '}
            <a href="https://www.taoyuan-airport.com/" target="_blank" rel="noopener noreferrer">{t('linkAirport')}</a>
          </p>
          <p className="pricing-page-note">
            <a href={`${langPrefix}/pricing`}>{t('pricingLink')}</a>
          </p>

          <div className="pricing-page-cta">
            <a href={`${langPrefix || ''}/#download`} className="guides-view-all">
              {t('cta')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
