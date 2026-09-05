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

  // Force re-mount when navigating back, so fade-up animations re-trigger
  useEffect(() => {
    const bump = () => setMountKey((k) => k + 1);
    window.addEventListener('popstate', bump);
    // bfcache restore: pageshow with persisted=true fires when popstate may not
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) bump(); };
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('popstate', bump);
      window.removeEventListener('pageshow', onPageShow);
    };
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

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria') || '';
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    document.title = LANG_TITLES[lang] || LANG_TITLES['en'];

    const labelEl = document.getElementById('langLabel');
    if (labelEl) labelEl.textContent = LANG_LABELS[lang] || lang;

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

  }, []);

  // Scroll to a section and hold it there while the page is still settling.
  // The element's document position is re-measured on a short poll: whenever it
  // moves (late-loading content above it), we re-issue the scroll. Any manual
  // scroll input from the visitor cancels the correction immediately.
  const scrollToSection = useCallback((id: string) => {
    const navbar = document.getElementById('navbar');
    const started = Date.now();
    let lastTop = NaN;
    let settled = 0;
    let cancelled = false;

    const cancel = () => { cancelled = true; };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);

    const cleanup = () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };

    const step = () => {
      const el = document.getElementById(id);
      if (cancelled || !el) { cleanup(); return; }
      const offset = (navbar?.offsetHeight || 64) + 12;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);

      if (Number.isNaN(lastTop) || Math.abs(top - lastTop) > 2) {
        // Target moved (or first run) → aim again.
        window.scrollTo({ top, behavior: 'smooth' });
        lastTop = top;
        settled = 0;
      } else {
        settled++;
      }

      // Keep watching for at least 1.8s even once stable: the cases grid swaps
      // its skeletons for API data well after the scroll animation finishes.
      const elapsed = Date.now() - started;
      if ((settled < 4 || elapsed < 1800) && elapsed < 3000) {
        setTimeout(step, 150);
      } else {
        cleanup();
      }
    };

    step();
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

    // In-page anchor (#pricing / #fleet / #download ...) → offset for the fixed
    // navbar, and keep re-targeting while the layout settles. Content above the
    // target still grows after the click (the cases grid swaps skeletons for API
    // data, lazy images decode), which otherwise leaves the visitor short of the
    // section they asked for.
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (anchor) {
      const id = (anchor.getAttribute('href') || '').slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        // Any in-page anchor may live inside the mobile menu → close it first,
        // so its height is out of the way before we measure.
        containerRef.current?.querySelector('#hamburger')?.classList.remove('open');
        containerRef.current?.querySelector('#mobileMenu')?.classList.remove('open');
        scrollToSection(id);
        return;
      }
    }

    // Mobile menu link click → close menu
    if (target.closest('.mobile-menu-link') || target.closest('.mobile-menu-cta')) {
      const hamburger = containerRef.current?.querySelector('#hamburger');
      const mobileMenu = containerRef.current?.querySelector('#mobileMenu');
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      return;
    }

    // Hero reel play → lay the YouTube player over that slide's poster.
    // The iframe is only created here, so a visitor who never clicks pays nothing for it.
    // It's appended (not replacing the facade) so removing it restores the poster.
    const reelBtn = target.closest('.hero-reel-btn');
    if (reelBtn) {
      const slide = reelBtn.closest('.hero-reel-slide');
      const videoId = slide?.getAttribute('data-video');
      if (slide && videoId && !slide.querySelector('.hero-reel-iframe')) {
        const iframe = document.createElement('iframe');
        iframe.className = 'hero-reel-iframe';
        iframe.src =
          `https://www.youtube-nocookie.com/embed/${videoId}` +
          '?autoplay=1&playsinline=1&rel=0&modestbranding=1';
        iframe.title = slide.querySelector('.hero-reel-caption')?.textContent || 'RelayGo';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        slide.appendChild(iframe);
      }
      return;
    }

    // Hero reel arrows / dots
    const reelNav = target.closest('.hero-reel-nav');
    const reelDot = target.closest('.hero-reel-dot');
    if (reelNav || reelDot) {
      const track = document.getElementById('heroReelTrack');
      if (track && track.clientWidth) {
        if (reelNav) {
          const dir = Number(reelNav.getAttribute('data-dir')) || 1;
          track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
        } else {
          const idx = Number(reelDot!.getAttribute('data-index')) || 0;
          track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
        }
      }
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
  }, [locale, scrollToSection]);

  useEffect(() => {
    applyLang(locale);

    // Landing on /#pricing (shared link, back button) hits the same problem the
    // click handler solves — the browser jumps before late content lands.
    if (window.location.hash.length > 1) {
      const id = window.location.hash.slice(1);
      if (document.getElementById(id)) scrollToSection(id);
    }

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

    // Fetch real service cases preview (homepage section)
    fetch('/api/cases?limit=6')
      .then((res) => res.json())
      .then((data) => {
        const grid = document.getElementById('casesGrid');
        if (!grid || !Array.isArray(data?.cases) || data.cases.length === 0) return;
        const pickCaption = (caps: Record<string, string>): string =>
          caps?.[locale] || caps?.['en'] || caps?.['zh-TW'] || '';
        const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (m) =>
          ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] as string)
        );
        const linkPrefix = langPrefix || '';
        type RawCase = { id: string; photo_url: string; captions: Record<string, string>; alt_text?: string | null };
        grid.innerHTML = (data.cases as RawCase[])
          .map((c) => {
            const caption = pickCaption(c.captions);
            const alt = c.alt_text || caption;
            return `<a href="${linkPrefix}/cases" class="case-card">
              <div class="case-img-wrap"><img src="${escapeHtml(c.photo_url)}" alt="${escapeHtml(alt)}" loading="lazy" draggable="false" oncontextmenu="return false;" /></div>
              <div class="case-caption">${escapeHtml(caption)}</div>
            </a>`;
          })
          .join('');
        // Re-apply fade-up visibility for the freshly injected cards
        grid.querySelectorAll('.case-card').forEach((el) => el.classList.add('visible'));
      })
      .catch(() => {});

    // Hero reel carousel: keep dots in sync, and tear down any player that
    // scrolls out of view so a hidden video can't keep playing audio.
    const reelTrack = document.getElementById('heroReelTrack');
    let reelSettleTimer: ReturnType<typeof setTimeout>;
    const syncReel = () => {
      if (!reelTrack || !reelTrack.clientWidth) return;
      const idx = Math.round(reelTrack.scrollLeft / reelTrack.clientWidth);
      document
        .querySelectorAll('.hero-reel-dot')
        .forEach((d, i) => d.classList.toggle('active', i === idx));
      document.querySelectorAll('.hero-reel-slide').forEach((s, i) => {
        if (i !== idx) s.querySelector('.hero-reel-iframe')?.remove();
      });
    };
    const onReelScroll = () => {
      clearTimeout(reelSettleTimer);
      reelSettleTimer = setTimeout(syncReel, 120);
    };
    reelTrack?.addEventListener('scroll', onReelScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
      reelTrack?.removeEventListener('scroll', onReelScroll);
      clearTimeout(reelSettleTimer);
    };
  }, [applyLang, locale, langPrefix, mountKey, scrollToSection]);

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
