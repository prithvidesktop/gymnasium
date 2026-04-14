/* ============================================================
   FLEXPASS — ROUTER & APP BOOTSTRAP
   ============================================================ */
window.FP = window.FP || {};

/* ============================================================
   STATE MANAGER
   ============================================================ */
FP.state = {
  currentPage: null,
  history: [],
  params: {},
};

/* ============================================================
   ROUTER
   ============================================================ */
FP.Router = {
  /* Pages that show the bottom nav */
  mainPages: ['home', 'explore', 'bookings', 'wellness', 'profile'],

  /* Pages that show back button in top nav */
  detailPages: ['gym-detail', 'subscriptions', 'partner', 'admin', 'privacy-policy', 'terms-of-service', 'cookie-policy'],

  /* Nav config per page */
  navConfig: {
    splash:           { show: false },
    auth:             { show: false },
    home:             { showLogo: true, showNotif: true, showTheme: true },
    explore:          { title: 'Explore', showTheme: true },
    bookings:         { title: 'My Bookings' },
    wellness:         { title: 'Wellness' },
    profile:          { title: 'Profile', showTheme: true },
    'gym-detail':     { showBack: true, title: '' },
    subscriptions:    { showBack: true, title: 'Choose Plan' },
    partner:          { showBack: true, title: 'Partner Portal' },
    admin:            { showBack: true, title: 'Admin' },
    'privacy-policy': { showBack: true, title: 'Privacy Policy' },
    'terms-of-service':{ showBack: true, title: 'Terms of Service' },
    'cookie-policy':  { showBack: true, title: 'Cookie Policy' },
  },

  go(page, params = {}) {
    const prev = FP.state.currentPage;
    FP.state.history.push({ page: prev, params: FP.state.params });
    FP.state.currentPage = page;
    FP.state.params = params;

    this._render(page, params);
    window.location.hash = page;
  },

  back() {
    const prev = FP.state.history.pop();
    if (prev && prev.page) {
      FP.state.currentPage = prev.page;
      FP.state.params = prev.params;
      this._render(prev.page, prev.params);
      window.location.hash = prev.page;
    } else {
      this.go('home');
    }
  },

  _render(page, params) {
    const content = document.getElementById('app-content');
    const topNav  = document.getElementById('top-nav');
    const bottomNav = document.getElementById('bottom-nav');
    if (!content) return;

    /* Resolve page module */
    const pageModule = FP.pages[page];
    if (!pageModule) {
      content.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">Page not found: ${page}</div><button class="btn btn-primary btn-sm" onclick="FP.Router.go('home')">Go Home</button></div>`;
      return;
    }

    /* Render page HTML */
    content.innerHTML = pageModule.render(params);
    content.scrollTop = 0;

    /* Call init for event wiring */
    if (pageModule.init) pageModule.init(params);

    /* Update top nav */
    const navCfg = this.navConfig[page] || {};
    if (navCfg.show === false) {
      if (topNav) topNav.style.display = 'none';
    } else {
      if (topNav) { topNav.style.display = 'flex'; topNav.innerHTML = FP.Navbar.render(navCfg); }
    }

    /* Update bottom nav */
    if (this.mainPages.includes(page)) {
      FP.BottomNav.update(page);
    } else {
      FP.BottomNav.hide();
    }
  },

  /* Parse hash and route */
  fromHash() {
    const hash = window.location.hash.replace('#', '').trim();
    const validPages = ['splash','auth','home','explore','bookings','wellness','profile','gym-detail','subscriptions','partner','admin','privacy-policy','terms-of-service','cookie-policy'];
    const page = validPages.includes(hash) ? hash : 'splash';
    this.go(page, FP.state.params || {});
  },
};

/* ============================================================
   APP INIT
   ============================================================ */
FP.init = function() {
  console.log('🚀 FlexPass app initializing...');

  /* Apply saved theme */
  const theme = FP.User.getTheme();
  document.documentElement.setAttribute('data-theme', theme);

  /* Determine initial route */
  const isLoggedIn = FP.User.isLoggedIn();
  const hash = window.location.hash.replace('#', '').trim();

  let startPage = 'splash';
  if (isLoggedIn) {
    startPage = hash && ['home','explore','bookings','wellness','profile','subscriptions','partner','admin'].includes(hash)
      ? hash : 'home';
    /* Seed demo bookings if needed */
    FP.User.seedDemoBookings();
  } else if (hash === 'auth') {
    startPage = 'auth';
  }

  /* Navigate to start page */
  FP.Router.go(startPage);

  /* Initialize cookie consent (shows banner on first visit) */
  FP.CookieConsent.init();

  /* Handle hash changes (browser back/forward) */
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '').trim();
    if (newHash && newHash !== FP.state.currentPage) {
      FP.state.params = {};
      FP.Router.go(newHash);
    }
  });

  console.log('✅ FlexPass ready!', { page: startPage, user: FP.User.get()?.name });
};

/* Start when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', FP.init);
} else {
  FP.init();
}
