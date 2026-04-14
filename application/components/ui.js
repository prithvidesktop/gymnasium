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
