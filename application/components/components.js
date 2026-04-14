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
    const occupancyLabel = pct < 60 ? '🟢 Available' : pct < 90 ? '🟡 Filling up' : '🔴 Almost full';
    return `
      <article class="gym-card" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})"
               role="button" tabindex="0"
               aria-label="${gym.name}, ${gym.distance}km away, rated ${gym.rating} stars"
               onkeydown="if(event.key==='Enter'||event.key===' ')FP.Router.go('gym-detail',{id:'${gym.id}'})">
        <div class="gym-card-img-wrap">
          <div class="gym-card-image-placeholder" aria-hidden="true">${gym.emoji}</div>
        </div>
        <div class="gym-card-body">
          <div class="gym-card-header">
            <span class="gym-card-name">${gym.name}</span>
            <span class="gym-card-rating" aria-label="${gym.rating} stars">★ ${gym.rating}</span>
          </div>
          <div class="gym-card-meta">
            <span class="gym-card-distance">📍 ${gym.distance} km</span>
            <span style="color:var(--border-strong)" aria-hidden="true">•</span>
            <span class="gym-card-type">${gym.activityTypes[0]}</span>
          </div>
          <div class="gym-card-tags">
            ${this._planBadge(gym.tier)}
            ${gym.tags.slice(0,1).map(t => `<span class="badge badge-ghost">${t}</span>`).join('')}
          </div>
          <div class="gym-card-footer">
            <span class="gym-card-price">₹${gym.pricePerSession}<span class="gym-card-plan">/session</span></span>
            <span style="font-size:11px;color:${this._occupancyColor(gym)};font-weight:600" aria-label="Occupancy: ${occupancyLabel}">${occupancyLabel}</span>
          </div>
        </div>
      </article>`;
  },

  renderHorizontal(gym) {
    return `
      <article class="booking-card" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})"
               role="button" tabindex="0"
               aria-label="${gym.name}"
               onkeydown="if(event.key==='Enter'||event.key===' ')FP.Router.go('gym-detail',{id:'${gym.id}'})">
        <div class="booking-card-thumb" aria-hidden="true">${gym.emoji}</div>
        <div class="flex-1 min-width-0">
          <div class="font-semibold truncate" style="font-size:var(--text-sm)">${gym.name}</div>
          <div class="text-secondary" style="font-size:var(--text-xs);margin-top:2px">📍 ${gym.address}</div>
          <div class="flex items-center gap-sm" style="margin-top:6px">
            <span style="font-size:var(--text-xs);color:var(--warning);font-weight:600" aria-label="${gym.rating} stars">★ ${gym.rating}</span>
            ${this._planBadge(gym.tier)}
          </div>
        </div>
        <div style="font-size:var(--text-sm);font-weight:700;color:var(--success);flex-shrink:0" aria-label="₹${gym.pricePerSession} per session">₹${gym.pricePerSession}</div>
      </article>`;
  },

  renderFeatured(gym) {
    return `
      <article class="gym-card" style="width:240px;cursor:pointer" onclick="FP.Router.go('gym-detail', {id:'${gym.id}'})"
               role="button" tabindex="0"
               aria-label="${gym.name}"
               onkeydown="if(event.key==='Enter'||event.key===' ')FP.Router.go('gym-detail',{id:'${gym.id}'})">
        <div class="gym-card-img-wrap" style="aspect-ratio:16/9">
          <div class="gym-card-image-placeholder" style="aspect-ratio:16/9;font-size:54px" aria-hidden="true">${gym.emoji}</div>
        </div>
        <div class="gym-card-body" style="padding:12px">
          <div class="gym-card-name" style="font-size:var(--text-sm)">${gym.name}</div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary);margin:4px 0">📍 ${gym.distance} km · ★ ${gym.rating}</div>
          <div class="flex items-center justify-between" style="margin-top:8px">
            ${this._planBadge(gym.tier)}
            <span style="font-size:var(--text-xs);font-weight:700;color:var(--success)">₹${gym.pricePerSession}/session</span>
          </div>
        </div>
      </article>`;
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
      left = `<button class="nav-back" onclick="FP.Router.back()" aria-label="Go back">←</button>`;
    } else if (showLogo) {
      left = `<div class="nav-logo" role="img" aria-label="FlexPass home">
        <div class="nav-logo-icon" aria-hidden="true">F</div>
        <span class="nav-logo-text">FlexPass</span>
      </div>`;
    }

    let center = '';
    if (title) {
      center = `<h1 class="nav-title" style="font-size:var(--text-md);font-weight:700;margin:0">${title}</h1>`;
    }

    let right = `<div class="nav-actions" role="toolbar" aria-label="Navigation actions">`;
    if (showTheme) {
      const theme = FP.User.getTheme();
      right += `<button class="nav-icon-btn" id="theme-toggle-btn" onclick="FP.Navbar.toggleTheme()" aria-label="Toggle ${theme === 'dark' ? 'light' : 'dark'} mode">${theme === 'dark' ? '☀️' : '🌙'}</button>`;
    }
    if (showSearch) {
      right += `<button class="nav-icon-btn" onclick="FP.Router.go('explore')" aria-label="Search gyms">🔍</button>`;
    }
    if (showNotif) {
      right += `<button class="nav-icon-btn" aria-label="Notifications (1 unread)">🔔<div class="nav-badge" aria-hidden="true"></div></button>`;
    }
    right += extraRight + '</div>';

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
    if (btn) {
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', `Toggle ${next === 'dark' ? 'light' : 'dark'} mode`);
    }
    FP.Toast.info(next === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
  },
};

/* ============================================================
   BOTTOM / SIDEBAR NAVIGATION
   Uses unified .nav-item / .nav-icon / .nav-label classes
   (these map to sidebar styles on desktop)
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
      <button class="nav-item ${activePage === tab.id ? 'active' : ''}"
           id="nav-${tab.id}"
           onclick="FP.Router.go('${tab.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')FP.Router.go('${tab.id}')"
           aria-label="${tab.label}"
           aria-current="${activePage === tab.id ? 'page' : 'false'}"
           role="button">
        <span class="nav-icon" aria-hidden="true">${tab.icon}</span>
        <span class="nav-label">${tab.label}</span>
      </button>`).join('');
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
