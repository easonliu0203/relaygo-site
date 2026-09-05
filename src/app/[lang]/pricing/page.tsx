import { Metadata } from 'next';
import { getPricingTables } from '@/lib/supabase';
import {
  locales,
  localePathMap,
  resolveLocale,
  type Locale,
} from '@/lib/i18n-config';
import {
  PRICING_TITLES,
  PRICING_DESCS,
  PRICING_KEYWORDS,
  UI,
  VEHICLE_NAMES,
  AIRPORT_NAMES,
} from './pricing-i18n';

// Prices change rarely, but never let a stale table outlive a rate revision by
// more than an hour.
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((l) => ({ lang: localePathMap[l] || l }));
}

function buildAlternates(path: string) {
  const languages: Record<string, string> = { 'x-default': `https://relaygo.pro${path}` };
  for (const locale of locales) {
    const seg = localePathMap[locale];
    languages[locale] = seg ? `https://relaygo.pro/${seg}${path}` : `https://relaygo.pro${path}`;
  }
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = resolveLocale(params.lang);
  const seg = localePathMap[locale];
  const canonical = seg ? `https://relaygo.pro/${seg}/pricing` : 'https://relaygo.pro/pricing';

  return {
    title: PRICING_TITLES[locale],
    description: PRICING_DESCS[locale],
    keywords: PRICING_KEYWORDS[locale],
    openGraph: {
      title: PRICING_TITLES[locale],
      description: PRICING_DESCS[locale],
      type: 'website',
      url: canonical,
      siteName: 'RelayGo',
      locale: locale.replace('-', '_'),
      images: [{ url: 'https://relaygo.pro/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: PRICING_TITLES[locale],
      description: PRICING_DESCS[locale],
      images: ['https://relaygo.pro/og-image.png'],
    },
    alternates: { canonical, languages: buildAlternates('/pricing') },
  };
}

const AIRPORT_KEYS = ['tpe', 'tsa', 'rmq', 'khh'] as const;
const VEHICLE_ORDER = ['S', 'M', 'L', 'XL'];

function nt(n: number) {
  return `NT$${n.toLocaleString('en-US')}`;
}

export default async function PricingPage({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  const t = (key: string) => UI[key][locale];
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const canonical = `https://relaygo.pro${langPrefix}/pricing`;

  const pricing = await getPricingTables();
  const airportTypes = VEHICLE_ORDER.filter((v) => pricing.airport[v]);
  const charterTypes = VEHICLE_ORDER.filter((v) => pricing.charter[v]);

  // One Offer per airport × vehicle, so a query like "桃園機場接送 五人座 價格"
  // has a machine-readable answer rather than only a rendered table.
  const airportOffers = airportTypes.flatMap((vt) =>
    AIRPORT_KEYS.map((ap) => ({
      '@type': 'Offer',
      name: `${AIRPORT_NAMES[ap][locale]} — ${VEHICLE_NAMES[vt][locale]}`,
      priceCurrency: 'TWD',
      price: String(pricing.airport[vt][ap]),
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: `${AIRPORT_NAMES[ap][locale]} ${t('airportH2')}`,
        serviceType: 'Airport Transfer',
      },
    }))
  );

  const charterOffers = charterTypes.flatMap((vt) => {
    const row = pricing.charter[vt];
    const out = [];
    if (row.h6) {
      out.push({
        '@type': 'Offer',
        name: `${VEHICLE_NAMES[vt][locale]} — ${t('th6h')}`,
        priceCurrency: 'TWD',
        price: String(row.h6),
        availability: 'https://schema.org/InStock',
        itemOffered: { '@type': 'Service', name: t('charterH2'), serviceType: 'Charter Tour' },
      });
    }
    if (row.h8) {
      out.push({
        '@type': 'Offer',
        name: `${VEHICLE_NAMES[vt][locale]} — ${t('th8h')}`,
        priceCurrency: 'TWD',
        price: String(row.h8),
        availability: 'https://schema.org/InStock',
        itemOffered: { '@type': 'Service', name: t('charterH2'), serviceType: 'Charter Tour' },
      });
    }
    return out;
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: PRICING_TITLES[locale],
    description: PRICING_DESCS[locale],
    serviceType: ['Airport Transfer', 'Charter Tour'],
    provider: { '@id': 'https://relaygo.pro/#organization' },
    areaServed: { '@type': 'Country', name: 'Taiwan' },
    offers: [...airportOffers, ...charterOffers],
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('bcHome'),
        item: `https://relaygo.pro${langPrefix || '/'}`,
      },
      { '@type': 'ListItem', position: 2, name: t('bcPricing'), item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="pricing-page">
        <div className="pricing-page-inner">
          <nav className="pricing-crumbs" aria-label="Breadcrumb">
            <a href={langPrefix || '/'}>{t('bcHome')}</a>
            <span aria-hidden="true"> / </span>
            <span>{t('bcPricing')}</span>
          </nav>

          <h1 className="pricing-page-h1">{t('h1')}</h1>
          <p className="pricing-page-intro">{t('intro')}</p>

          <h2 className="pricing-page-h2">{t('airportH2')}</h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>{t('thAirport')}</th>
                  {airportTypes.map((vt) => (
                    <th key={vt}>{VEHICLE_NAMES[vt][locale]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AIRPORT_KEYS.map((ap) => (
                  <tr key={ap}>
                    <td>{AIRPORT_NAMES[ap][locale]}</td>
                    {airportTypes.map((vt) => (
                      <td key={vt}>
                        <span className="price-val">{nt(pricing.airport[vt][ap])}</span>{' '}
                        <span className="price-from">{t('from')}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pricing-page-note">{t('airportNote')}</p>

          <h2 className="pricing-page-h2">{t('charterH2')}</h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>{t('thVehicle')}</th>
                  <th>{t('th6h')}</th>
                  <th>{t('th8h')}</th>
                  <th>{t('thOvertime')}</th>
                </tr>
              </thead>
              <tbody>
                {charterTypes.map((vt) => {
                  const row = pricing.charter[vt];
                  return (
                    <tr key={vt}>
                      <td>{VEHICLE_NAMES[vt][locale]}</td>
                      <td>
                        {row.h6 ? <span className="price-val">{nt(row.h6)}</span> : <span className="price-na">—</span>}
                      </td>
                      <td>
                        {row.h8 ? <span className="price-val">{nt(row.h8)}</span> : <span className="price-na">—</span>}
                      </td>
                      <td>
                        <span className="price-val">{nt(row.overtime)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="pricing-page-note">{t('charterNote')}</p>

          <h2 className="pricing-page-h2">{t('surchargeH2')}</h2>
          <p className="pricing-page-body">{t('surchargeDesc')}</p>

          <h2 className="pricing-page-h2">{t('includedH2')}</h2>
          <ul className="pricing-included">
            <li>{t('inc1')}</li>
            <li>{t('inc2')}</li>
            <li>{t('inc3')}</li>
            <li>{t('inc4')}</li>
          </ul>

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
