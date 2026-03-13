export function getBodyHTML(langPrefix: string = ''): string {
  return `<!-- Navigation -->
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
          <li><a href="#download" class="nav-cta" data-i18n="nav_download">下載 App</a></li>
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
          <a href="#download" data-i18n="nav_download" class="mobile-menu-cta">下載 App</a>
        </div>
        <div class="lang-switcher">
          <button class="lang-btn" id="langBtn" aria-label="Switch language">
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
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero" id="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="dot"></span>
          <span data-i18n="hero_badge">iOS & Android 雙平台上架</span>
        </div>
        <h1 data-i18n-html="hero_title">專業包車服務<br><span class="highlight">輕鬆預約</span></h1>
        <p class="hero-subtitle" data-i18n="hero_subtitle">預約專業司機，享受機場接送、城市觀光、商務出行。安全可靠，輕鬆無憂。</p>
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
        <div class="stat-number">✅</div>
        <div class="stat-label" data-i18n="stat_legal">合法司機</div>
      </div>
      <div class="stat-item fade-up">
        <div class="stat-number">🏅</div>
        <div class="stat-label" data-i18n="stat_licensed">專業證照</div>
      </div>
    </div>
  </div>

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
            <img src="/images/5人座轎車.webp" alt="五人座轎車">
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
            <img src="/images/5人座休旅車.webp" alt="五人座休旅車">
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
            <img src="/images/9人座.webp" alt="九人座休旅車">
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
            <img src="/images/Toyota Alphard.webp" alt="Toyota Alphard">
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
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2025 RelayGo. All rights reserved.</span>
        <span data-i18n="footer_made">用心打造於台灣</span>
      </div>
    </div>
  </footer>`;
}

// Keep backward-compatible export
export const bodyHTML = getBodyHTML('');
