'use client';

import { useEffect, useCallback } from 'react';
import { I18N, LANG_LABELS, LANG_TITLES, type LangCode } from '@/lib/i18n';
import { getBodyHTML } from '@/lib/bodyhtml';
import { localePathMap, resolveLocale } from '@/lib/i18n-config';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const params = useParams();
  const locale = resolveLocale(params.lang as string) as LangCode;
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

  const applyLang = useCallback((lang: LangCode) => {
    const dict = I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n') || '';
      if (dict[key] !== undefined) {
        if (dict[key].indexOf('<br>') !== -1) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html') || '';
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.title = LANG_TITLES[lang] || LANG_TITLES['en'];

    const labelEl = document.getElementById('langLabel');
    if (labelEl) labelEl.textContent = LANG_LABELS[lang] || lang;

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

  }, []);

  useEffect(() => {
    applyLang(locale);

    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    const handleLangBtn = (e: Event) => {
      e.stopPropagation();
      langDropdown?.classList.toggle('open');
    };
    langBtn?.addEventListener('click', handleLangBtn);

    const handleDocClick = () => {
      langDropdown?.classList.remove('open');
    };
    document.addEventListener('click', handleDocClick);

    // Language switcher: navigate to locale sub-path
    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const langCode = btn.getAttribute('data-lang') as LangCode;
        const pathSeg = localePathMap[langCode];
        const targetUrl = pathSeg ? `/${pathSeg}/` : '/';
        window.location.href = targetUrl;
      });
    });

    // Hamburger mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const handleHamburger = () => {
      hamburger?.classList.toggle('open');
      mobileMenu?.classList.toggle('open');
    };
    hamburger?.addEventListener('click', handleHamburger);
    document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
      });
    });

    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach((el) => observer.observe(el));

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const text = el.textContent || '';
          const match = text.match(/(\d+)/);
          if (match) {
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current + suffix;
            }, 30);
          }
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach((el) => statsObserver.observe(el));

    const pricingTabs = document.querySelectorAll('.pricing-tab');
    pricingTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        pricingTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const panelId = tab.getAttribute('data-panel');
        document.querySelectorAll('.pricing-panel').forEach((p) => {
          p.classList.remove('active');
        });
        const panel = document.getElementById('panel-' + panelId);
        panel?.classList.add('active');
      });
    });

    // Fetch dynamic pricing from Supabase
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        const fmt = (n: number) => 'NT$' + n.toLocaleString('en-US');

        const airports = ['tpe', 'tsa', 'rmq', 'khh'] as const;
        const vehicleTypes = ['S', 'M', 'L'] as const;
        for (const ap of airports) {
          for (const vt of vehicleTypes) {
            const el = document.querySelector(`[data-price="airport-${ap}-${vt}"]`);
            if (el && data.airport?.[vt]) {
              el.textContent = fmt(data.airport[vt][ap]);
            }
          }
        }

        const charterTypes = ['S', 'M', 'L', 'XL'] as const;
        for (const vt of charterTypes) {
          const ct = data.charter?.[vt];
          if (!ct) continue;
          const el6 = document.querySelector(`[data-price="charter-${vt}-6h"]`);
          const el8 = document.querySelector(`[data-price="charter-${vt}-8h"]`);
          const elOt = document.querySelector(`[data-price="charter-${vt}-ot"]`);
          if (el6) {
            if (ct.h6) {
              el6.textContent = fmt(ct.h6);
              el6.className = 'price-val';
            } else {
              el6.textContent = '—';
              el6.className = 'price-na';
            }
          }
          if (el8 && ct.h8) el8.textContent = fmt(ct.h8);
          if (elOt) elOt.textContent = fmt(ct.overtime);
        }
      })
      .catch(() => {});

    return () => {
      langBtn?.removeEventListener('click', handleLangBtn);
      hamburger?.removeEventListener('click', handleHamburger);
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [applyLang, locale]);

  return <div dangerouslySetInnerHTML={{ __html: getBodyHTML(langPrefix, locale) }} />;
}
