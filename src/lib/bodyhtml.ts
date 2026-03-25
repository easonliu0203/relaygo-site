import { I18N } from './i18n';

export function getBodyHTML(langPrefix: string = '', lang: string = 'zh-TW'): string {
  const dict = I18N[lang] || I18N['zh-TW'];
  // Helper: translate by key, fallback to zh-TW, then to raw fallback
  const t = (key: string, fallback: string) => dict[key] ?? I18N['zh-TW']?.[key] ?? fallback;

  let html = `<!-- Navigation -->
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="${langPrefix || '/'}" class="nav-logo">Relay<span class="go">Go</span></a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="#services" data-i18n="nav_services">服務項目</a></li>
          <li><a href="#fleet" data-i18n="nav_fleet">車型介紹</a></li>
          <li><a href="#pricing" data-i18n="nav_pricing">價格方案</a></li>
          <li><a href="${langPrefix}/guides" data-i18n="nav_guides">行程攻略</a></li>
          <li><a href="${langPrefix}/faq" data-i18n="nav_faq">常見問題</a></li>
          <li><a href="${langPrefix}/bookmarks" data-i18n="nav_bookmarks">旅遊書籤</a></li>
          <li><a href="https://www.instagram.com/relaygo.official" target="_blank" rel="noopener" class="nav-ig" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a></li>
          <li><a href="#download" class="nav-cta" data-i18n="nav_download">下載 App</a></li>
          <li class="nav-auth-item">
            <button class="nav-auth-btn" id="navLoginBtn" data-i18n="nav_login">登入</button>
            <div class="nav-user-menu" id="navUserMenu" style="display:none">
              <button class="nav-user-btn" id="navUserBtn">
                <span class="nav-user-avatar" id="navUserAvatar"></span>
              </button>
              <div class="nav-user-dropdown" id="navUserDropdown">
                <div class="nav-user-email" id="navUserEmail"></div>
                <button class="nav-user-logout" id="navLogoutBtn" data-i18n="nav_logout">登出</button>
              </div>
            </div>
          </li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <div class="mobile-menu" id="mobileMenu">
          <a href="#services" data-i18n="nav_services" class="mobile-menu-link">服務項目</a>
          <a href="#fleet" data-i18n="nav_fleet" class="mobile-menu-link">車型介紹</a>
          <a href="#pricing" data-i18n="nav_pricing" class="mobile-menu-link">價格方案</a>
          <a href="${langPrefix}/guides" data-i18n="nav_guides" class="mobile-menu-link">行程攻略</a>
          <a href="${langPrefix}/faq" data-i18n="nav_faq" class="mobile-menu-link">常見問題</a>
          <a href="${langPrefix}/bookmarks" data-i18n="nav_bookmarks" class="mobile-menu-link">旅遊書籤</a>
          <a href="https://www.instagram.com/relaygo.official" target="_blank" rel="noopener" class="mobile-menu-link mobile-menu-ig"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>Instagram</a>
          <a href="#download" data-i18n="nav_download" class="mobile-menu-cta">下載 App</a>
          <div class="mobile-auth-section" id="mobileAuthSection">
            <button class="mobile-auth-login" id="mobileLoginBtn" data-i18n="nav_login">登入</button>
            <div class="mobile-auth-user" id="mobileUserInfo" style="display:none">
              <span class="mobile-auth-email" id="mobileUserEmail"></span>
              <button class="mobile-auth-logout" id="mobileLogoutBtn" data-i18n="nav_logout">登出</button>
            </div>
          </div>
        </div>
        <div class="lang-switcher">
          <button class="lang-btn" id="langBtn" aria-label="Switch language">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span id="langLabel">繁中</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="lang-dropdown" id="langDropdown">
            <button class="lang-option active" data-lang="zh-TW">繁體中文</button>
            <button class="lang-option" data-lang="zh-CN">简体中文</button>
            <button class="lang-option" data-lang="en">English</button>
            <button class="lang-option" data-lang="ja">日本語</button>
            <button class="lang-option" data-lang="ko">한국어</button>
            <button class="lang-option" data-lang="th">ไทย</button>
            <button class="lang-option" data-lang="vi">Tiếng Việt</button>
            <button class="lang-option" data-lang="ms">Bahasa Melayu</button>
            <button class="lang-option" data-lang="id">Bahasa Indonesia</button>
            <button class="lang-option" data-lang="fil">Filipino</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div class="login-modal-overlay" id="loginModal" style="display:none">
    <div class="login-modal">
      <button class="login-modal-close" id="loginModalClose">&times;</button>
      <h3 class="login-modal-title" data-i18n="nav_loginTitle">登入 RelayGo</h3>
      <p class="login-modal-subtitle" data-i18n="nav_loginSubtitle">登入後可直接在網頁預約包車</p>
      <button class="login-modal-btn google" id="modalGoogleBtn">
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <span data-i18n="nav_loginGoogle">Google 登入</span>
      </button>
      <button class="login-modal-btn apple" id="modalAppleBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.14 4.45-3.74 4.25z"/></svg>
        <span data-i18n="nav_loginApple">Apple 登入</span>
      </button>
      <div class="login-modal-divider"><span data-i18n="nav_loginOr">或</span></div>
      <div class="login-modal-email-form" id="loginEmailForm">
        <input type="email" class="login-modal-input" id="loginEmailInput" placeholder="Email" />
        <input type="password" class="login-modal-input" id="loginPasswordInput" placeholder="Password" />
        <div class="login-modal-email-actions">
          <button class="login-modal-btn email" id="modalEmailLoginBtn" data-i18n="nav_loginEmail">電子郵件登入</button>
          <button class="login-modal-btn register" id="modalEmailRegisterBtn" data-i18n="nav_registerEmail">註冊新帳號</button>
        </div>
        <div class="login-modal-error" id="loginModalError" style="display:none"></div>
      </div>
    </div>
  </div>

  <!-- Hero -->
  <section class="hero" id="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="dot"></span>
          <span data-i18n="hero_badge">iOS & Android 雙平台上架</span>
        </div>
        <h1 data-i18n-html="hero_title">專業包車服務<br><span class="highlight">輕鬆預約</span></h1>
        <p class="hero-subtitle" data-i18n="hero_subtitle">預約專業司機，享受機場接送、城市觀光、商務出行。僅需支付少額訂金，即可完成預約。安全可靠，輕鬆無憂。</p>
        <div class="hero-actions">
          <a class="btn-store" href="https://apps.apple.com/tw/app/relay-go/id6756459981" target="_blank" rel="noopener">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <div class="store-info">
              <span class="store-label" data-i18n="store_apple_label">下載於</span>
              <span class="store-name">App Store</span>
            </div>
          </a>
          <a class="btn-store" href="https://play.google.com/store/apps/details?id=com.relaygo.customer" target="_blank" rel="noopener">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M3.18 23.49c.35.2.77.21 1.13.01l12.07-6.99-2.76-2.76L3.18 23.49zm-.55-1.2V1.71c0-.26.08-.5.22-.7L13.1 11.26.85 22.29zm18.83-12.18c.53.31.86.87.86 1.49s-.33 1.18-.86 1.49l-2.85 1.65-3.03-3.03 3.03-3.03 2.85 1.43zM4.31.71c-.36-.2-.78-.21-1.13-.01L13.62 11 16.38 8.24 4.31.71z"/></svg>
            <div class="store-info">
              <span class="store-label" data-i18n="store_google_label">下載於</span>
              <span class="store-name">Google Play</span>
            </div>
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="phone-mockup">
          <div class="phone-notch"></div>
          <div class="phone-app-logo">Relay<span class="go">Go</span></div>
          <div class="phone-tagline" data-i18n="phone_tagline">您的專屬包車服務</div>
          <div class="phone-card">
            <div class="phone-card-header">
              <span class="phone-card-title" data-i18n="phone_current_trip">目前行程</span>
              <span class="phone-card-badge" data-i18n="phone_active">進行中</span>
            </div>
            <div class="phone-card-route">
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <span class="phone-card-dot"></span>
                  <span data-i18n="phone_origin">台北車站</span>
                </div>
                <div style="margin-left:3px"><div class="phone-card-line"></div></div>
                <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                  <span class="phone-card-dot end"></span>
                  <span data-i18n="phone_dest">桃園機場 T1</span>
                </div>
              </div>
            </div>
          </div>
          <div class="phone-card">
            <div class="phone-card-header">
              <span class="phone-card-title" data-i18n="phone_driver">司機</span>
              <span class="phone-card-badge">4.9 ★</span>
            </div>
            <div style="font-size:11px;color:var(--gray-500)" data-i18n="phone_driver_info">Toyota Alphard · 黑色<br>預計 5 分鐘抵達</div>
          </div>
          <div class="phone-bottom-bar">
            <div class="phone-tab active"><div class="phone-tab-icon">🏠</div><span data-i18n="phone_home">首頁</span></div>
            <div class="phone-tab"><div class="phone-tab-icon">📋</div><span data-i18n="phone_orders">訂單</span></div>
            <div class="phone-tab"><div class="phone-tab-icon">💬</div><span data-i18n="phone_chat">聊天</span></div>
            <div class="phone-tab"><div class="phone-tab-icon">👤</div><span data-i18n="phone_profile">我的</span></div>
          </div>
        </div>
        <div class="float-card left">
          <div class="float-icon green">✓</div>
          <div>
            <div class="float-text" data-i18n="float_confirmed">預約已確認</div>
            <div class="float-subtext" data-i18n="float_en_route">司機已出發</div>
          </div>
        </div>
        <div class="float-card right">
          <div class="float-icon purple">📍</div>
          <div>
            <div class="float-text" data-i18n="float_tracking">即時追蹤</div>
            <div class="float-subtext" data-i18n="float_eta">預計 5 分鐘</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Bar -->
  <div class="stats-bar">
    <div class="stats-inner">
      <div class="stat-item fade-up">
        <div class="stat-number">500+</div>
        <div class="stat-label" data-i18n="stat_drivers">專業司機</div>
      </div>
      <div class="stat-item fade-up">
        <div class="stat-number">100%</div>
        <div class="stat-label" data-i18n="stat_legal">合法職業駕照司機</div>
      </div>
      <div class="stat-item fade-up">
        <div class="stat-number">10</div>
        <div class="stat-label" data-i18n="stat_languages">支援語言</div>
      </div>
      <div class="stat-item fade-up">
        <div class="stat-number">4</div>
        <div class="stat-label" data-i18n="stat_airports">服務機場</div>
      </div>
    </div>
  </div>

  <!-- Featured Guides -->
  <section class="featured-guides-section" id="guides-preview">
    <div class="section-inner">
      <div class="section-header fade-up">
        <a href="${langPrefix}/guides" class="section-label section-label-link" data-i18n="guides_label">行程攻略</a>
        <h2 class="section-title" data-i18n="guides_title">探索台灣熱門路線</h2>
        <p class="section-desc" data-i18n="guides_desc">精選四大經典路線，從北到南、山海兼備，每條都是旅人最愛。</p>
      </div>
      <div class="featured-guides-scroll">
        <a href="${langPrefix}/guide/taipei-classic" class="featured-guide-card fade-up">
          <div class="featured-guide-img" style="background-image:url(https://images.unsplash.com/photo-1662720262802-91f9373dcac6?w=600&q=80)">
            <span class="featured-guide-badge">🏙️ ${t('guides_card_city_taipei', '台北')}</span>
          </div>
          <div class="featured-guide-body">
            <h3 class="featured-guide-title" data-i18n="guides_card_1_title">台北經典一日遊</h3>
            <span class="featured-guide-meta">⏱️ 8 ${t('guides_card_hours', '小時')}</span>
          </div>
        </a>
        <a href="${langPrefix}/guide/taipei-jiufen-shifen" class="featured-guide-card fade-up">
          <div class="featured-guide-img" style="background-image:url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80)">
            <span class="featured-guide-badge">🏮 ${t('guides_card_city_xinbei', '新北')}</span>
          </div>
          <div class="featured-guide-body">
            <h3 class="featured-guide-title" data-i18n="guides_card_2_title">九份十分一日遊</h3>
            <span class="featured-guide-meta">⏱️ 8 ${t('guides_card_hours', '小時')}</span>
          </div>
        </a>
        <a href="${langPrefix}/guide/tainan-heritage" class="featured-guide-card fade-up">
          <div class="featured-guide-img" style="background-image:url(https://images.unsplash.com/photo-1677607223752-aa6ae7e582ae?w=600&q=80)">
            <span class="featured-guide-badge">🏯 ${t('guides_card_city_tainan', '台南')}</span>
          </div>
          <div class="featured-guide-body">
            <h3 class="featured-guide-title" data-i18n="guides_card_3_title">台南古蹟巡禮</h3>
            <span class="featured-guide-meta">⏱️ 8 ${t('guides_card_hours', '小時')}</span>
          </div>
        </a>
        <a href="${langPrefix}/guide/kaohsiung-port-art" class="featured-guide-card fade-up">
          <div class="featured-guide-img" style="background-image:url(https://images.unsplash.com/photo-1677607221983-630ffb5ea1d8?w=600&q=80)">
            <span class="featured-guide-badge">🌊 ${t('guides_card_city_kaohsiung', '高雄')}</span>
          </div>
          <div class="featured-guide-body">
            <h3 class="featured-guide-title" data-i18n="guides_card_4_title">高雄港都一日遊</h3>
            <span class="featured-guide-meta">⏱️ 8 ${t('guides_card_hours', '小時')}</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="features-section" id="features">
    <div class="section-inner">
      <div class="section-header fade-up">
        <div class="section-label" data-i18n="features_label">功能特色</div>
        <h2 class="section-title" data-i18n="features_title">打造完美乘車體驗</h2>
        <p class="section-desc" data-i18n="features_desc">從預約到抵達，RelayGo 以先進技術為您提供無縫的包車服務體驗。</p>
      </div>
      <div class="features-grid">
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-blue">🔒</div>
          <h3 data-i18n="f1_title">認證司機</h3>
          <p data-i18n="f1_desc">每位司機均通過背景調查、駕照驗證及安全培訓，確保您的行車安全。</p>
        </div>
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-green">📍</div>
          <h3 data-i18n="f2_title">即時追蹤</h3>
          <p data-i18n="f2_desc">與親友分享即時位置，從上車到下車全程追蹤司機動態。</p>
        </div>
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-orange">💳</div>
          <h3 data-i18n="f3_title">多元支付</h3>
          <p data-i18n="f3_desc">支援信用卡、行動支付、現金等多種付款方式，價格透明無隱藏費用。</p>
        </div>
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-pink">🤖</div>
          <h3 data-i18n="f4_title">AI 行程規劃師</h3>
          <p data-i18n="f4_desc">讓 AI 助手為您規劃完美行程，提供景點與美食的個人化推薦。</p>
        </div>
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-teal">🌐</div>
          <h3 data-i18n="f5_title">多語言支援</h3>
          <p data-i18n="f5_desc">App 支援多國語言，乘客與司機之間提供即時翻譯功能。</p>
        </div>
        <div class="feature-card fade-up">
          <div class="feature-icon-wrap fi-indigo">⭐</div>
          <h3 data-i18n="f6_title">評價系統</h3>
          <p data-i18n="f6_desc">閱讀其他乘客的真實評價，為您的乘車體驗評分以維護服務品質。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="services-section" id="services">
    <div class="section-inner">
      <div class="section-header fade-up">
        <div class="section-label" data-i18n="services_label">服務項目</div>
        <h2 class="section-title" data-i18n="services_title">全方位包車服務</h2>
        <p class="section-desc" data-i18n="services_desc">無論是機場接送、包車旅遊或商務出行，RelayGo 都能滿足您的需求。</p>
      </div>
      <div class="services-grid">
        <div class="service-card fade-up">
          <div class="service-icon">✈️</div>
          <h3 data-i18n="svc1_title">機場接送</h3>
          <p data-i18n="svc1_desc">專業司機準時接送，行李協助搬運，航班延誤免費等候。</p>
          <div class="service-tags">
            <span class="service-tag">TPE 桃園</span>
            <span class="service-tag">TSA 松山</span>
            <span class="service-tag">RMQ 台中</span>
            <span class="service-tag">KHH 高雄</span>
          </div>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">🏞️</div>
          <h3 data-i18n="svc2_title">包車旅遊</h3>
          <p data-i18n="svc2_desc">6 或 8 小時包車方案，司機兼嚮導，帶您暢遊全台熱門景點。</p>
          <div class="service-tags">
            <span class="service-tag" data-i18n="svc2_tag1">北部景點</span>
            <span class="service-tag" data-i18n="svc2_tag2">中南部</span>
            <span class="service-tag" data-i18n="svc2_tag3">東部花蓮</span>
            <span class="service-tag" data-i18n="svc2_tag4">客製路線</span>
          </div>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">💼</div>
          <h3 data-i18n="svc3_title">商務出行</h3>
          <p data-i18n="svc3_desc">高端車款、專業司機、準時可靠，滿足您的商務接待與會議用車需求。</p>
          <div class="service-tags">
            <span class="service-tag" data-i18n="svc3_tag1">會議接送</span>
            <span class="service-tag" data-i18n="svc3_tag2">企業用車</span>
            <span class="service-tag" data-i18n="svc3_tag3">VIP 接待</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Fleet -->
  <section class="fleet-section" id="fleet">
    <div class="section-inner">
      <div class="section-header fade-up">
        <div class="section-label" data-i18n="fleet_label">車型介紹</div>
        <h2 class="section-title" data-i18n="fleet_title">多元車型任您選</h2>
        <p class="section-desc" data-i18n="fleet_desc">從經濟轎車到豪華商務車，總有一款適合您的出行需求。</p>
      </div>
      <div class="fleet-grid">
        <div class="fleet-card fade-up">
          <div class="fleet-img-wrap">
            <img loading="lazy" decoding="async" src="/images/5人座轎車.webp" alt="五人座轎車">
            <span class="fleet-img-label" data-i18n="fleet_img_label">示意圖</span>
          </div>
          <h3 data-i18n="fleet_s_name">五人座轎車</h3>
          <div class="fleet-detail" data-i18n="fleet_s_detail">扣除 1 位司機，乘客最多 3 位（含大人孩童嬰兒）</div>
          <div class="fleet-specs">
            <div class="fleet-spec">
              <div class="fleet-spec-icon">👤</div>
              <div class="fleet-spec-val">1-3</div>
              <div class="fleet-spec-label" data-i18n="fleet_pax">乘客</div>
            </div>
            <div class="fleet-spec">
              <div class="fleet-spec-icon">🧳</div>
              <div class="fleet-spec-val">2</div>
              <div class="fleet-spec-label" data-i18n="fleet_luggage_28">28吋行李</div>
            </div>
          </div>
        </div>
        <div class="fleet-card fade-up">
          <div class="fleet-img-wrap">
            <img loading="lazy" decoding="async" src="/images/5人座休旅車.webp" alt="五人座休旅車">
            <span class="fleet-img-label" data-i18n="fleet_img_label">示意圖</span>
          </div>
          <h3 data-i18n="fleet_m_name">五人座休旅車</h3>
          <div class="fleet-detail" data-i18n="fleet_m_detail">扣除 1 位司機，乘客最多 4 位（含大人孩童嬰兒）</div>
          <div class="fleet-specs">
            <div class="fleet-spec">
              <div class="fleet-spec-icon">👤</div>
              <div class="fleet-spec-val">1-4</div>
              <div class="fleet-spec-label" data-i18n="fleet_pax">乘客</div>
            </div>
            <div class="fleet-spec">
              <div class="fleet-spec-icon">🧳</div>
              <div class="fleet-spec-val">4×20" / 3×28"</div>
              <div class="fleet-spec-label" data-i18n="fleet_luggage">行李</div>
            </div>
          </div>
        </div>
        <div class="fleet-card popular fade-up">
          <div class="fleet-img-wrap">
            <img loading="lazy" decoding="async" src="/images/9人座.webp" alt="九人座休旅車">
            <span class="fleet-img-label" data-i18n="fleet_img_label">示意圖</span>
          </div>
          <h3 data-i18n="fleet_l_name">九人座休旅車</h3>
          <div class="fleet-detail" data-i18n="fleet_l_detail">扣除 1 位司機，乘客最多 8 位（含大人孩童嬰兒）</div>
          <div class="fleet-specs">
            <div class="fleet-spec">
              <div class="fleet-spec-icon">👤</div>
              <div class="fleet-spec-val">1-8</div>
              <div class="fleet-spec-label" data-i18n="fleet_pax">乘客</div>
            </div>
            <div class="fleet-spec">
              <div class="fleet-spec-icon">🧳</div>
              <div class="fleet-spec-val">8×28"</div>
              <div class="fleet-spec-label" data-i18n="fleet_luggage">行李</div>
            </div>
          </div>
        </div>
        <div class="fleet-card fade-up">
          <div class="fleet-img-wrap">
            <img loading="lazy" decoding="async" src="/images/Toyota Alphard.webp" alt="Toyota Alphard">
            <span class="fleet-img-label" data-i18n="fleet_img_label">示意圖</span>
          </div>
          <h3>Toyota Alphard</h3>
          <div class="fleet-detail" data-i18n="fleet_xl_detail">頂級商務體驗，座位與行李彈性配置</div>
          <div class="fleet-config-list">
            <div class="fleet-config-item">
              <span class="fleet-config-pax">👤 1-3 <span data-i18n="fleet_pax_unit">位</span></span>
              <span class="fleet-config-lug" data-i18n="fleet_xl_lug1">6×24" 或 5×28" 行李（收起第三排座椅）</span>
            </div>
            <div class="fleet-config-item">
              <span class="fleet-config-pax">👤 4 <span data-i18n="fleet_pax_unit">位</span></span>
              <span class="fleet-config-lug" data-i18n="fleet_xl_lug2">4×24" 行李（收起第三排一張座椅）</span>
            </div>
            <div class="fleet-config-item">
              <span class="fleet-config-pax">👤 5-6 <span data-i18n="fleet_pax_unit">位</span></span>
              <span class="fleet-config-lug" data-i18n="fleet_xl_lug3">2×24" 行李</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="pricing-section" id="pricing">
    <div class="section-inner">
      <div class="section-header fade-up">
        <div class="section-label" data-i18n="pricing_label">價格方案</div>
        <h2 class="section-title" data-i18n="pricing_title">透明合理的價格</h2>
        <p class="section-desc" data-i18n="pricing_desc">無隱藏費用，價格公開透明。下載 App 即可查看精確報價。</p>
      </div>
      <div class="pricing-tabs fade-up">
        <button class="pricing-tab active" data-panel="airport" data-i18n="pricing_tab_airport">機場接送</button>
        <button class="pricing-tab" data-panel="charter" data-i18n="pricing_tab_charter">包車旅遊</button>
      </div>
      <!-- Airport Panel -->
      <div class="pricing-panel active fade-up" id="panel-airport">
        <div class="pricing-table-wrap">
          <table class="pricing-table">
            <thead>
              <tr>
                <th data-i18n="pricing_airport">機場</th>
                <th data-i18n="pricing_s">五人座轎車</th>
                <th data-i18n="pricing_m">五人座休旅車</th>
                <th data-i18n="pricing_l">九人座休旅車</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-i18n="pricing_tpe">桃園 TPE</td>
                <td><span class="price-val" data-price="airport-tpe-S">NT$1,000</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-tpe-M">NT$1,300</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-tpe-L">NT$1,800</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_tsa">松山 TSA</td>
                <td><span class="price-val" data-price="airport-tsa-S">NT$900</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-tsa-M">NT$1,200</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-tsa-L">NT$1,800</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_rmq">台中 RMQ</td>
                <td><span class="price-val" data-price="airport-rmq-S">NT$3,700</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-rmq-M">NT$3,900</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-rmq-L">NT$4,600</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_khh">高雄 KHH</td>
                <td><span class="price-val" data-price="airport-khh-S">NT$7,200</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-khh-M">NT$7,500</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
                <td><span class="price-val" data-price="airport-khh-L">NT$8,500</span> <span class="price-from" data-i18n="pricing_from">起</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Charter Panel -->
      <div class="pricing-panel fade-up" id="panel-charter">
        <div class="pricing-table-wrap">
          <table class="pricing-table">
            <thead>
              <tr>
                <th data-i18n="pricing_vehicle">車型</th>
                <th data-i18n="pricing_6h">6 小時</th>
                <th data-i18n="pricing_8h">8 小時</th>
                <th data-i18n="pricing_overtime">超時 / 小時</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-i18n="pricing_s">五人座轎車</td>
                <td><span class="price-val" data-price="charter-S-6h">NT$3,000</span></td>
                <td><span class="price-val" data-price="charter-S-8h">NT$3,900</span></td>
                <td><span class="price-val" data-price="charter-S-ot">NT$350</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_m">五人座休旅車</td>
                <td><span data-price="charter-M-6h" class="price-na">—</span></td>
                <td><span class="price-val" data-price="charter-M-8h">NT$4,500</span></td>
                <td><span class="price-val" data-price="charter-M-ot">NT$450</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_l">九人座休旅車</td>
                <td><span data-price="charter-L-6h" class="price-na">—</span></td>
                <td><span class="price-val" data-price="charter-L-8h">NT$7,500</span></td>
                <td><span class="price-val" data-price="charter-L-ot">NT$600</span></td>
              </tr>
              <tr>
                <td data-i18n="pricing_xl">Toyota Alphard</td>
                <td><span data-price="charter-XL-6h" class="price-na">—</span></td>
                <td><span class="price-val" data-price="charter-XL-8h">NT$10,000</span></td>
                <td><span class="price-val" data-price="charter-XL-ot">NT$800</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="pricing-note" data-i18n="pricing_note">實際費用依上車地點與目的地計算，下載 App 即可查看精確報價。</div>
      <div style="text-align:center">
        <a class="pricing-cta" href="https://apps.apple.com/tw/app/relay-go/id6756459981" target="_blank" rel="noopener" data-i18n="pricing_cta">下載 App 查看報價</a>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="how-section" id="how-it-works">
    <div class="section-inner">
      <div class="section-header fade-up">
        <div class="section-label" data-i18n="how_label">使用方式</div>
        <h2 class="section-title" data-i18n="how_title">4 步驟輕鬆預約</h2>
        <p class="section-desc" data-i18n="how_desc">使用 RelayGo 快速上手，您的專業包車即刻啟程。</p>
      </div>
      <div class="steps-grid">
        <div class="step-card fade-up">
          <div class="step-number">1</div>
          <h3 data-i18n="s1_title">下載 App</h3>
          <p data-i18n="s1_desc">在 App Store 或 Google Play 免費下載 RelayGo</p>
        </div>
        <div class="step-card fade-up">
          <div class="step-number">2</div>
          <h3 data-i18n="s2_title">設定路線</h3>
          <p data-i18n="s2_desc">輸入上車地點、目的地、日期與時間</p>
        </div>
        <div class="step-card fade-up">
          <div class="step-number">3</div>
          <h3 data-i18n="s3_title">配對司機</h3>
          <p data-i18n="s3_desc">系統為您分配經過認證的專業司機</p>
        </div>
        <div class="step-card fade-up">
          <div class="step-number">4</div>
          <h3 data-i18n="s4_title">享受旅程</h3>
          <p data-i18n="s4_desc">輕鬆上車，安心抵達目的地</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section" id="download">
    <div class="cta-content fade-up">
      <h2 data-i18n-html="cta_title">準備好體驗<br>頂級包車服務了嗎？</h2>
      <p data-i18n="cta_desc">立即下載 RelayGo，預約您的第一趟旅程。專業包車服務，一鍵即達。</p>
      <div class="cta-buttons">
        <a class="btn-store" href="https://apps.apple.com/tw/app/relay-go/id6756459981" target="_blank" rel="noopener">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          <div class="store-info">
            <span class="store-label" data-i18n="store_apple_label">下載於</span>
            <span class="store-name">App Store</span>
          </div>
        </a>
        <a class="btn-store" href="https://play.google.com/store/apps/details?id=com.relaygo.customer" target="_blank" rel="noopener">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M3.18 23.49c.35.2.77.21 1.13.01l12.07-6.99-2.76-2.76L3.18 23.49zm-.55-1.2V1.71c0-.26.08-.5.22-.7L13.1 11.26.85 22.29zm18.83-12.18c.53.31.86.87.86 1.49s-.33 1.18-.86 1.49l-2.85 1.65-3.03-3.03 3.03-3.03 2.85 1.43zM4.31.71c-.36-.2-.78-.21-1.13-.01L13.62 11 16.38 8.24 4.31.71z"/></svg>
          <div class="store-info">
            <span class="store-label" data-i18n="store_google_label">下載於</span>
            <span class="store-name">Google Play</span>
          </div>
        </a>
      </div>
      <a href="${langPrefix}/guides" class="cta-guides-link" data-i18n="guides_view_all">查看全部攻略 →</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">Relay<span class="go">Go</span></div>
          <p data-i18n="footer_desc">您在台灣值得信賴的專業包車夥伴。安全可靠，準時到達。</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer_legal">法律條款</h4>
          <a href="https://easonliu0203.github.io/relaygo-privacy-policy/customer.html" target="_blank" rel="noopener" data-i18n="footer_customer_privacy">客戶隱私權政策</a>
          <a href="https://easonliu0203.github.io/relaygo-privacy-policy/driver.html" target="_blank" rel="noopener" data-i18n="footer_driver_privacy">司機隱私權政策</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer_contact">聯絡我們</h4>
          <a href="mailto:support@relaygo.pro">support@relaygo.pro</a>
          <a href="https://www.instagram.com/relaygo.official" target="_blank" rel="noopener" class="footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2025 RelayGo. All rights reserved.</span>
        <span data-i18n="footer_made">用心打造於台灣</span>
      </div>
    </div>
  </footer>`;

  // Server-side translate: replace data-i18n="key">text< with translated text
  html = html.replace(/data-i18n="([^"]+)">([^<]*)<\//g, (_match, key, fallback) => {
    return `data-i18n="${key}">${t(key, fallback)}</`;
  });

  // Server-side translate: replace data-i18n-html="key">html content
  // Only 2 elements use this (hero_title in <h1>, cta_title in <h2>), match up to closing parent tag
  html = html.replace(/data-i18n-html="([^"]+)">([\s\S]*?)<\/(h1|h2)>/g, (_match, key, fallback, tag) => {
    return `data-i18n-html="${key}">${t(key, fallback)}</${tag}>`;
  });

  return html;
}

// Keep backward-compatible export
export const bodyHTML = getBodyHTML('');
