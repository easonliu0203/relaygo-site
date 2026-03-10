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

    localStorage.setItem('relaygo_lang', lang);
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

    return () => {
      langBtn?.removeEventListener('click', handleLangBtn);
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [applyLang]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />;
}
