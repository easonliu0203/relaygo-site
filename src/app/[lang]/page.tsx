'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { I18N, LANG_LABELS, LANG_TITLES, type LangCode } from '@/lib/i18n';
import { getBodyHTML } from '@/lib/bodyhtml';
import { localePathMap, resolveLocale } from '@/lib/i18n-config';
import { useParams } from 'next/navigation';
import { auth, googleProvider, appleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, type User } from 'firebase/auth';

export default function HomePage() {
  const params = useParams();
  const locale = resolveLocale(params.lang as string) as LangCode;
  const langPrefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountKey, setMountKey] = useState(0);

  // Force re-mount when navigating back (popstate), so fade-up animations re-trigger
  useEffect(() => {
    const handlePopState = () => setMountKey((k) => k + 1);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Event delegation: handle all clicks on innerHTML elements via the wrapper div
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Language button toggle
    if (target.closest('#langBtn')) {
      e.stopPropagation();
      const dropdown = containerRef.current?.querySelector('#langDropdown');
      dropdown?.classList.toggle('open');
      return;
    }

    // Language option click → set cookie + navigate
    const langOption = target.closest('.lang-option');
    if (langOption) {
      e.stopPropagation();
      const langCode = langOption.getAttribute('data-lang') as LangCode;
      document.cookie = `preferred-lang=${langCode};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
      const pathSeg = localePathMap[langCode];
      window.location.href = pathSeg ? `/${pathSeg}/` : '/';
      return;
    }

    // Hamburger menu toggle
    if (target.closest('#hamburger')) {
      const hamburger = containerRef.current?.querySelector('#hamburger');
      const mobileMenu = containerRef.current?.querySelector('#mobileMenu');
      hamburger?.classList.toggle('open');
      mobileMenu?.classList.toggle('open');
      return;
    }

    // Mobile menu link click → close menu
    if (target.closest('.mobile-menu-link') || target.closest('.mobile-menu-cta')) {
      const hamburger = containerRef.current?.querySelector('#hamburger');
      const mobileMenu = containerRef.current?.querySelector('#mobileMenu');
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      return;
    }

    // Pricing tab click
    const pricingTab = target.closest('.pricing-tab');
    if (pricingTab) {
      containerRef.current?.querySelectorAll('.pricing-tab').forEach((t) => t.classList.remove('active'));
      pricingTab.classList.add('active');
      const panelId = pricingTab.getAttribute('data-panel');
      containerRef.current?.querySelectorAll('.pricing-panel').forEach((p) => p.classList.remove('active'));
      const panel = document.getElementById('panel-' + panelId);
      panel?.classList.add('active');
      return;
    }

    // Click anywhere else → close lang dropdown
    containerRef.current?.querySelector('#langDropdown')?.classList.remove('open');
  }, []);

  useEffect(() => {
    applyLang(locale);

    // Scroll handler for navbar
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Fade-up animations — immediately show elements already in viewport
    // (fixes back-navigation where IntersectionObserver doesn't re-fire)
    const fadeEls = document.querySelectorAll('.fade-up');
    fadeEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach((el) => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });

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
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, [applyLang, locale]);

  // Firebase auth state → update nav login/logout UI
  useEffect(() => {
    const updateAuthUI = (user: User | null) => {
      const loginBtn = document.getElementById('navLoginBtn');
      const userMenu = document.getElementById('navUserMenu');
      const userEmail = document.getElementById('navUserEmail');
      const userAvatar = document.getElementById('navUserAvatar');
      const mobileLoginBtn = document.getElementById('mobileLoginBtn');
      const mobileUserInfo = document.getElementById('mobileUserInfo');
      const mobileUserEmail = document.getElementById('mobileUserEmail');

      if (user) {
        // Logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (userEmail) userEmail.textContent = user.email || '';
        if (userAvatar) userAvatar.textContent = (user.email || '?')[0].toUpperCase();
        if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
        if (mobileUserInfo) { mobileUserInfo.style.display = 'flex'; }
        if (mobileUserEmail) mobileUserEmail.textContent = user.email || '';
      } else {
        // Logged out
        if (loginBtn) loginBtn.style.display = '';
        if (userMenu) userMenu.style.display = 'none';
        if (mobileLoginBtn) mobileLoginBtn.style.display = '';
        if (mobileUserInfo) mobileUserInfo.style.display = 'none';
      }
    };

    const unsub = onAuthStateChanged(auth, updateAuthUI);
    return () => unsub();
  }, []);

  // Login modal handlers
  const showLoginModal = useCallback(() => {
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'flex';
  }, []);

  const hideLoginModal = useCallback(() => {
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'none';
    const errEl = document.getElementById('loginModalError');
    if (errEl) errEl.style.display = 'none';
  }, []);

  const showModalError = useCallback((msg: string) => {
    const errEl = document.getElementById('loginModalError');
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  }, []);

  // Auth action handlers via event delegation
  const handleAuthClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Open login modal
    if (target.closest('#navLoginBtn') || target.closest('#mobileLoginBtn')) {
      e.stopPropagation();
      showLoginModal();
      // Close mobile menu if open
      containerRef.current?.querySelector('#hamburger')?.classList.remove('open');
      containerRef.current?.querySelector('#mobileMenu')?.classList.remove('open');
      return;
    }

    // Toggle user dropdown
    if (target.closest('#navUserBtn')) {
      e.stopPropagation();
      const dropdown = document.getElementById('navUserDropdown');
      dropdown?.classList.toggle('open');
      return;
    }

    // Logout
    if (target.closest('#navLogoutBtn') || target.closest('#mobileLogoutBtn')) {
      e.stopPropagation();
      signOut(auth);
      const dropdown = document.getElementById('navUserDropdown');
      dropdown?.classList.remove('open');
      return;
    }

    // Close login modal (overlay click or close button)
    if (target.id === 'loginModal' || target.closest('#loginModalClose')) {
      hideLoginModal();
      return;
    }

    // Google login
    if (target.closest('#modalGoogleBtn')) {
      e.stopPropagation();
      signInWithPopup(auth, googleProvider)
        .then(() => hideLoginModal())
        .catch((err) => showModalError(err.message));
      return;
    }

    // Apple login
    if (target.closest('#modalAppleBtn')) {
      e.stopPropagation();
      signInWithPopup(auth, appleProvider)
        .then(() => hideLoginModal())
        .catch((err) => showModalError(err.message));
      return;
    }

    // Email login
    if (target.closest('#modalEmailLoginBtn')) {
      e.stopPropagation();
      const email = (document.getElementById('loginEmailInput') as HTMLInputElement)?.value;
      const pw = (document.getElementById('loginPasswordInput') as HTMLInputElement)?.value;
      if (!email || !pw) { showModalError('Please enter email and password'); return; }
      signInWithEmailAndPassword(auth, email, pw)
        .then(() => hideLoginModal())
        .catch((err) => showModalError(err.message));
      return;
    }

    // Email register
    if (target.closest('#modalEmailRegisterBtn')) {
      e.stopPropagation();
      const email = (document.getElementById('loginEmailInput') as HTMLInputElement)?.value;
      const pw = (document.getElementById('loginPasswordInput') as HTMLInputElement)?.value;
      if (!email || !pw) { showModalError('Please enter email and password'); return; }
      if (pw.length < 6) { showModalError('Password must be at least 6 characters'); return; }
      createUserWithEmailAndPassword(auth, email, pw)
        .then(() => hideLoginModal())
        .catch((err) => showModalError(err.message));
      return;
    }

    // Close user dropdown when clicking elsewhere
    document.getElementById('navUserDropdown')?.classList.remove('open');
  }, [showLoginModal, hideLoginModal, showModalError]);

  const html = getBodyHTML(langPrefix, locale);

  return (
    <div
      key={`${locale}-${mountKey}`}
      ref={containerRef}
      onClick={(e) => { handleAuthClick(e); handleContainerClick(e); }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
