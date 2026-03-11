'use client';

import { useEffect, useCallback } from 'react';
import { I18N, LANG_LABELS, LANG_TITLES, detectLang, type LangCode } from '@/lib/i18n';
import { bodyHTML } from '@/lib/bodyhtml';

export default function HomePage() {
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
    const currentLang = detectLang();
    applyLang(currentLang);

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

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = btn.getAttribute('data-lang') as LangCode;
        applyLang(lang);
        localStorage.setItem('relaygo_lang_manual', lang);
        langDropdown?.classList.remove('open');
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

        // Airport pricing
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

        // Charter pricing
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
      .catch(() => {}); // Keep hardcoded fallback on error

    return () => {
      langBtn?.removeEventListener('click', handleLangBtn);
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [applyLang]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />;
}
