/* ============================================================
   FLEXPASS — COMPONENTS: Toast, Loader, Modal
   ============================================================ */
window.FP = window.FP || {};

/* ============================================================
   TOAST
   ============================================================ */
FP.Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
    }
  },

  show(msg, type = 'info', duration = 3500) {
    this.init();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-msg">${msg}</span>`;
    this.container.appendChild(el);
    setTimeout(() => {
      el.classList.add('removing');
      setTimeout(() => el.remove(), 300);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg)   { this.show(msg, 'error'); },
  warning(msg) { this.show(msg, 'warning'); },
  info(msg)    { this.show(msg, 'info'); },
};

/* ============================================================
   LOADER
   ============================================================ */
FP.Loader = {
  show(container = '#app-content') {
    const el = document.querySelector(container);
    if (el) el.innerHTML = `
      <div class="page-loader page-enter">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>`;
  },

  pageLoader() {
    return `<div class="page-loader"><div class="spinner"></div><span>Loading...</span></div>`;
  },

  skeletonCard() {
    return `
      <div class="gym-card" style="padding:0">
        <div class="skeleton" style="height:160px;border-radius:0"></div>
        <div style="padding:16px;display:flex;flex-direction:column;gap:8px">
          <div class="skeleton" style="height:18px;width:70%"></div>
          <div class="skeleton" style="height:13px;width:50%"></div>
          <div class="skeleton" style="height:13px;width:40%"></div>
        </div>
      </div>`;
  },
};

/* ============================================================
   MODAL
   ============================================================ */
FP.Modal = {
  _active: null,

  show(html, opts = {}) {
    this.close();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay' + (opts.center ? ' modal-center' : '');
    overlay.id = 'fp-modal-overlay';
    overlay.innerHTML = `
      <div class="modal-sheet" id="fp-modal-sheet">
        ${opts.noHandle ? '' : '<div class="modal-handle"></div>'}
        ${html}
      </div>`;

    document.body.appendChild(overlay);
    this._active = overlay;

    /* Animate in */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('show'));
    });

    /* Close on outside click */
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    return overlay;
  },

  close() {
    const overlay = document.getElementById('fp-modal-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 300);
    }
    this._active = null;
  },

  confirm(title, desc, onConfirm, opts = {}) {
    const html = `
      <h3 class="modal-title">${title}</h3>
      <p style="color:var(--text-secondary);font-size:var(--text-sm);line-height:1.6;margin-bottom:24px">${desc}</p>
      <div class="flex gap-md">
        <button class="btn btn-ghost flex-1" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary flex-1" id="modal-confirm-btn">${opts.confirmLabel || 'Confirm'}</button>
      </div>`;
    const overlay = this.show(html, { center: true, noHandle: true });
    document.getElementById('modal-cancel-btn').onclick = () => this.close();
    document.getElementById('modal-confirm-btn').onclick = () => { this.close(); if (onConfirm) onConfirm(); };
  },
};

/* ============================================================
   COOKIE CONSENT (GDPR-aware)
   ============================================================ */
FP.CookieConsent = {
  STORAGE_KEY: 'fp_cookie_consent',

  _prefs: {
    necessary:  true,    /* always true — cannot be disabled */
    functional: false,
    analytics:  false,
    marketing:  false,
  },

  /* Call once on app init */
  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      /* Already consented — silently restore prefs */
      try { Object.assign(this._prefs, JSON.parse(saved)); } catch (_) {}
      return;
    }
    /* First visit — show banner after a short delay */
    setTimeout(() => this._showBanner(), 1200);
  },

  hasConsented() {
    return !!localStorage.getItem(this.STORAGE_KEY);
  },

  _save(prefs) {
    Object.assign(this._prefs, prefs);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._prefs));
    this._hideBanner();
  },

  acceptAll() {
    this._save({ functional: true, analytics: true, marketing: true });
    FP.Toast.success('Cookie preferences saved ✓');
  },

  essentialOnly() {
    this._save({ functional: false, analytics: false, marketing: false });
    FP.Toast.info('Only essential cookies enabled.');
  },

  _showBanner() {
    if (document.getElementById('fp-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'fp-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div style="
        position:fixed;bottom:0;left:0;right:0;z-index:9999;
        background:var(--surface);border-top:1px solid var(--border);
        padding:16px 20px 20px;
        box-shadow:0 -8px 40px rgba(0,0,0,0.35);
        animation:slideUp 0.4s var(--ease-spring) both;
        max-width:100%;
      " id="fp-cookie-inner">

        <!-- Top row -->
        <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:14px">
          <div style="font-size:28px;flex-shrink:0">🍪</div>
          <div style="flex:1">
            <div style="font-size:15px;font-weight:800;margin-bottom:4px">We use cookies</div>
            <p style="font-size:12px;color:var(--text-secondary);line-height:1.6;margin:0">
              FlexPass uses cookies to improve your experience, personalize recommendations, and analyze app usage.
              By clicking <strong>"Accept All"</strong>, you consent to our use of all cookies.
              <span onclick="FP.Router.go('cookie-policy')" style="color:var(--primary);cursor:pointer;font-weight:600">Cookie Policy</span>
            </p>
          </div>
        </div>

        <!-- Cookie type toggles (compact) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;background:var(--surface-2);border-radius:12px;padding:12px">
          ${[
            { id:'necessary',  label:'Essential',   locked: true  },
            { id:'functional', label:'Functional',  locked: false },
            { id:'analytics',  label:'Analytics',   locked: false },
            { id:'marketing',  label:'Marketing',   locked: false },
          ].map(c => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0">
              <span style="font-size:12px;color:var(--text-secondary)">${c.label}</span>
              ${c.locked
                ? `<span style="font-size:10px;color:var(--success);font-weight:700">Always ✓</span>`
                : `<label style="position:relative;display:inline-block;width:36px;height:20px;cursor:pointer">
                     <input type="checkbox" id="cc-${c.id}" style="opacity:0;width:0;height:0" onchange="FP.CookieConsent._onToggle()">
                     <span style="position:absolute;inset:0;background:var(--border-strong);border-radius:99px;transition:all 0.2s" id="cc-track-${c.id}"></span>
                     <span style="position:absolute;bottom:2px;left:2px;width:16px;height:16px;background:#fff;border-radius:50%;transition:all 0.2s;box-shadow:0 1px 4px rgba(0,0,0,0.3)" id="cc-thumb-${c.id}"></span>
                   </label>`}
            </div>`).join('')}
        </div>

        <!-- Action buttons -->
        <div style="display:flex;gap:8px">
          <button onclick="FP.CookieConsent.essentialOnly()"
            style="flex:1;padding:12px 8px;border-radius:12px;border:1.5px solid var(--border);background:transparent;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer">
            Essential Only
          </button>
          <button onclick="FP.CookieConsent._saveCustom()"
            style="flex:1;padding:12px 8px;border-radius:12px;border:1.5px solid var(--border);background:transparent;color:var(--text);font-size:13px;font-weight:600;cursor:pointer">
            Save Custom
          </button>
          <button onclick="FP.CookieConsent.acceptAll()"
            style="flex:1.5;padding:12px 8px;border-radius:12px;border:none;background:var(--gradient-primary);color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:var(--shadow-primary)">
            Accept All ✓
          </button>
        </div>

        <!-- Legal links -->
        <div style="display:flex;justify-content:center;gap:16px;margin-top:12px">
          <span onclick="FP.Router.go('privacy-policy')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Privacy Policy</span>
          <span onclick="FP.Router.go('terms-of-service')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Terms of Service</span>
          <span onclick="FP.Router.go('cookie-policy')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Cookie Policy</span>
        </div>
      </div>`;

    document.body.appendChild(banner);
  },

  _onToggle() {
    /* Update toggle visuals */
    ['functional','analytics','marketing'].forEach(id => {
      const cb    = document.getElementById(`cc-${id}`);
      const track = document.getElementById(`cc-track-${id}`);
      const thumb = document.getElementById(`cc-thumb-${id}`);
      if (!cb || !track || !thumb) return;
      track.style.background = cb.checked ? 'var(--primary)' : 'var(--border-strong)';
      thumb.style.transform   = cb.checked ? 'translateX(16px)' : 'translateX(0)';
    });
  },

  _saveCustom() {
    this._save({
      functional: !!document.getElementById('cc-functional')?.checked,
      analytics:  !!document.getElementById('cc-analytics')?.checked,
      marketing:  !!document.getElementById('cc-marketing')?.checked,
    });
    FP.Toast.success('Cookie preferences saved ✓');
  },

  _hideBanner() {
    const banner = document.getElementById('fp-cookie-banner');
    if (banner) {
      banner.style.transition = 'opacity 0.3s, transform 0.3s';
      banner.style.opacity    = '0';
      banner.style.transform  = 'translateY(20px)';
      setTimeout(() => banner.remove(), 350);
    }
  },

  /* Expose current preferences for use by other modules */
  get(key) {
    return key ? this._prefs[key] : { ...this._prefs };
  },

  /* Allow user to re-open preferences from Settings */
  openPreferences() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._showBanner();
  },
};

