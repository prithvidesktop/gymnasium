/* ============================================================
   FLEXPASS — COMPONENTS: GymCard, Navbar, BottomNav
   ============================================================ */
window.FP = window.FP || {};

/* ============================================================
   GYM CARD COMPONENT
   ============================================================ */
FP.GymCard = {
  render(gym, variant = 'grid') {
    if (variant === 'horizontal') return this.renderHorizontal(gym);
    if (variant === 'featured') return this.renderFeatured(gym);
    return this.renderGrid(gym);
  },

  _planBadge(tier) {
    const map = { basic: ['Basic', 'badge-success'], pro: ['Pro', 'badge-primary'], elite: ['Elite', 'badge-orange'] };
    const [label, cls] = map[tier] || ['Basic', 'badge-success'];
    return `<span class="badge ${cls}">${label}</span>`;
  },

  _stars(rating) {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  },

  _occupancyColor(gym) {
    const pct = (gym.currentOccupancy / gym.capacity) * 100;
    if (pct < 40) return 'var(--success)';
    if (pct < 70) return 'var(--warning)';
    return 'var(--error)';
  },

  renderGrid(gym) {
    const pct = Math.round((gym.currentOccupancy / gym.capacity) * 100);
    return `
      <div class="gym-card" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})">
        <div class="gym-card-image-placeholder">${gym.emoji}</div>
        <div class="gym-card-body">
          <div class="gym-card-header">
            <span class="gym-card-name">${gym.name}</span>
            <span class="gym-card-rating">★ ${gym.rating}</span>
          </div>
          <div class="gym-card-meta">
            <span class="gym-card-distance">📍 ${gym.distance} km</span>
            <span style="color:var(--border-strong)">•</span>
            <span class="gym-card-type">${gym.activityTypes[0]}</span>
          </div>
          <div class="gym-card-tags">
            ${this._planBadge(gym.tier)}
            ${gym.tags.slice(0,1).map(t => `<span class="badge badge-ghost">${t}</span>`).join('')}
          </div>
          <div class="gym-card-footer">
            <span class="gym-card-price">₹${gym.pricePerSession}<span class="gym-card-plan">/session</span></span>
            <span style="font-size:11px;color:${this._occupancyColor(gym)};font-weight:600">${pct < 60 ? '🟢 Available' : pct < 90 ? '🟡 Filling up' : '🔴 Almost full'}</span>
          </div>
        </div>
      </div>`;
  },

  renderHorizontal(gym) {
    return `
      <div class="booking-card" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})">
        <div class="booking-card-thumb">${gym.emoji}</div>
        <div class="flex-1 min-width-0">
          <div class="font-semibold truncate" style="font-size:var(--text-sm)">${gym.name}</div>
          <div class="text-secondary" style="font-size:var(--text-xs);margin-top:2px">📍 ${gym.address}</div>
          <div class="flex items-center gap-sm" style="margin-top:6px">
            <span style="font-size:var(--text-xs);color:var(--warning);font-weight:600">★ ${gym.rating}</span>
            ${this._planBadge(gym.tier)}
          </div>
        </div>
        <div style="font-size:var(--text-sm);font-weight:700;color:var(--success);flex-shrink:0">₹${gym.pricePerSession}</div>
      </div>`;
  },

  renderFeatured(gym) {
    return `
      <div class="gym-card" style="width:240px;cursor:pointer" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})">
        <div class="gym-card-image-placeholder" style="height:130px;font-size:54px">${gym.emoji}</div>
        <div class="gym-card-body" style="padding:12px">
          <div class="gym-card-name" style="font-size:var(--text-sm)">${gym.name}</div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary);margin:4px 0">📍 ${gym.distance} km · ★ ${gym.rating}</div>
          <div class="flex items-center justify-between" style="margin-top:8px">
            ${this._planBadge(gym.tier)}
            <span style="font-size:var(--text-xs);font-weight:700;color:var(--success)">₹${gym.pricePerSession}/session</span>
          </div>
        </div>
      </div>`;
  },
};

/* ============================================================
   TOP NAVBAR
   ============================================================ */
FP.Navbar = {
  render(opts = {}) {
    const {
      showBack = false,
      title = '',
      showLogo = false,
      showSearch = false,
      showNotif = false,
      showTheme = false,
      extraRight = ''
    } = opts;

    let left = '';
    if (showBack) {
      left = `<button class="nav-back" onclick="FP.Router.back()">←</button>`;
    } else if (showLogo) {
      left = `<div class="nav-logo">
        <div class="nav-logo-icon">F</div>
        <span class="nav-logo-text">FlexPass</span>
      </div>`;
    }

    let center = '';
    if (title) {
      center = `<span class="nav-title">${title}</span>`;
    }

    let right = `<div class="nav-actions">`;
    if (showTheme) {
      const theme = FP.User.getTheme();
      right += `<button class="nav-icon-btn" id="theme-toggle-btn" onclick="FP.Navbar.toggleTheme()" title="Toggle theme">${theme === 'dark' ? '☀️' : '🌙'}</button>`;
    }
    if (showSearch) {
      right += `<button class="nav-icon-btn" onclick="FP.Router.go('explore')" title="Search">🔍</button>`;
    }
    if (showNotif) {
      right += `<button class="nav-icon-btn" title="Notifications">🔔<div class="nav-badge"></div></button>`;
    }
    right += extraRight + '</div>';

    /* If no right elements keep space balanced */
    return `
      ${left}
      ${center}
      ${right}`;
  },

  setTitle(title) {
    const el = document.querySelector('.nav-title');
    if (el) el.textContent = title;
  },

  update(opts) {
    const nav = document.getElementById('top-nav');
    if (nav) nav.innerHTML = this.render(opts);
  },

  toggleTheme() {
    const next = FP.User.toggleTheme();
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
    FP.Toast.info(next === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
  },
};

/* ============================================================
   BOTTOM NAVIGATION
   ============================================================ */
FP.BottomNav = {
  tabs: [
    { id: 'home',     label: 'Home',    icon: '🏠' },
    { id: 'explore',  label: 'Explore', icon: '🔍' },
    { id: 'bookings', label: 'Bookings',icon: '📅' },
    { id: 'wellness', label: 'Wellness',icon: '💪' },
    { id: 'profile',  label: 'Profile', icon: '👤' },
  ],

  render(activePage = 'home') {
    return this.tabs.map(tab => `
      <div class="bnav-item ${activePage === tab.id ? 'active' : ''}"
           id="bnav-${tab.id}"
           onclick="FP.Router.go('${tab.id}')">
        <span class="bnav-icon">${tab.icon}</span>
        <span class="bnav-label">${tab.label}</span>
      </div>`).join('');
  },

  update(activePage) {
    const nav = document.getElementById('bottom-nav');
    if (nav) {
      nav.innerHTML = this.render(activePage);
      nav.style.display = 'flex';
    }
  },

  hide() {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';
  },
};
