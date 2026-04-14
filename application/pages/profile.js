/* ============================================================
   FLEXPASS — PROFILE PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.profile = {
  render() {
    const user = FP.User.get() || {};
    const plan = user.plan ? FP.data.getPlanById(user.plan) : null;
    const theme = FP.User.getTheme();

    return `
      <div class="page-enter" style="padding-bottom:80px">
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="avatar avatar-2xl" style="margin:0 auto 12px">${user.initials || 'FP'}</div>
          <h2 style="font-size:20px;font-weight:800">${user.name || 'FlexPass User'}</h2>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">${user.email || user.phone || ''}</p>
          
          ${plan ? `
            <div style="display:inline-flex;align-items:center;gap:6px;margin-top:12px;background:rgba(255,255,255,0.1);border-radius:999px;padding:6px 14px">
              <span>${plan.emoji}</span>
              <span style="font-size:13px;font-weight:700">${plan.name} Member</span>
            </div>` : `
            <button class="btn btn-sm" style="margin-top:12px;background:rgba(255,255,255,0.15);color:#fff;border-color:rgba(255,255,255,0.3)" onclick="FP.Router.go('subscriptions')">Get a Plan</button>`}

          <div style="display:flex;gap:24px;margin-top:16px;justify-content:center">
            <div style="text-align:center">
              <div style="font-size:20px;font-weight:900">${user.sessionsTotal || 127}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6)">Sessions</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.2)"></div>
            <div style="text-align:center">
              <div style="font-size:20px;font-weight:900">${user.streakDays || 0}🔥</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6)">Streak</div>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.2)"></div>
            <div style="text-align:center">
              <div style="font-size:20px;font-weight:900">${user.points || 2450}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6)">Points</div>
            </div>
          </div>
        </div>

        <!-- Referral Banner -->
        <div style="margin:16px;background:linear-gradient(135deg,rgba(255,107,53,0.15),rgba(108,71,255,0.1));border:1px solid rgba(255,107,53,0.25);border-radius:18px;padding:16px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:14px;font-weight:700">🎁 Refer & Earn</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">Earn ₹500 for each friend you refer</div>
              <div style="font-size:13px;font-weight:700;color:var(--primary);margin-top:6px;font-family:monospace">${user.referralCode || 'FLEX42'}</div>
            </div>
            <button class="btn btn-orange btn-sm" onclick="FP.Toast.success('Referral link copied! 🔗')">Share</button>
          </div>
        </div>

        <!-- Fitness Goals -->
        ${user.goals && user.goals.length > 0 ? `
          <div style="margin:0 16px 16px">
            <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Your Goals</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${FP.User.goals.map(g => `
                <div class="tag ${(user.goals||[]).includes(g.id)?'active':''}" onclick="FP.pages.profile._toggleGoal('${g.id}')">
                  ${g.emoji} ${g.label}
                </div>`).join('')}
            </div>
          </div>` : ''}

        <!-- My Subscription -->
        <div style="margin:0 16px 12px">
          <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Subscription</div>
          ${plan ? `
            <div class="card" style="padding:14px;cursor:pointer" onclick="FP.Router.go('subscriptions')">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;gap:12px;align-items:center">
                  <div style="width:44px;height:44px;background:var(--gradient-primary);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px">${plan.emoji}</div>
                  <div>
                    <div style="font-size:14px;font-weight:700">${plan.name} Plan</div>
                    <div style="font-size:12px;color:var(--success)">Active</div>
                    ${user.planExpiry ? `<div style="font-size:11px;color:var(--text-muted)">Renews ${new Date(user.planExpiry).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>` : ''}
                  </div>
                </div>
                <span style="color:var(--text-muted)">›</span>
              </div>
            </div>` : `
            <div class="card" style="padding:14px;cursor:pointer;border-color:rgba(108,71,255,0.3)" onclick="FP.Router.go('subscriptions')">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div style="font-size:14px;font-weight:700">No active plan</div>
                  <div style="font-size:12px;color:var(--primary)">Activate FlexPass membership</div>
                </div>
                <button class="btn btn-primary btn-sm">Get Plan →</button>
              </div>
            </div>`}
        </div>

        <!-- Account Menu -->
        <div style="margin:0 16px 12px">
          <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Account</div>
          <div style="border-radius:var(--radius-lg);overflow:hidden">
            ${this._menuItem('👤', 'Edit Profile', 'var(--primary)', () => `FP.pages.profile._editProfile()`)}
            ${this._menuItem('📅', 'My Bookings', 'var(--secondary)', () => `FP.Router.go('bookings')`)}
            ${this._menuItem('🔔', 'Notifications', 'var(--warning)', () => `FP.Toast.info('Notification settings coming soon!')`)}
            ${this._menuItem('📍', 'Location', 'var(--info)', () => `FP.Toast.info('Location set to ${user.location || 'Bangalore'}')`)}
          </div>
        </div>

        <!-- App Settings -->
        <div style="margin:0 16px 12px">
          <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Preferences</div>
          <div style="border-radius:var(--radius-lg);overflow:hidden">
            <div class="menu-item">
              <div class="menu-item-icon" style="background:rgba(108,71,255,0.15)">🌙</div>
              <span class="menu-item-label">Dark Mode</span>
              <div class="toggle ${FP.User.getTheme()==='dark'?'active':''}" id="theme-toggle" onclick="FP.pages.profile._toggleTheme()">
                <div class="toggle-track"><div class="toggle-thumb"></div></div>
              </div>
            </div>
            ${this._menuItem('🌐', 'Language', 'var(--success)', () => `FP.Toast.info('Language: English (India)')`)}
            ${this._menuItem('📊', 'Privacy Settings', 'var(--error)', () => `FP.Toast.info('Privacy settings coming soon!')`)}
          </div>
        </div>

        <!-- Partner / Admin -->
        <div style="margin:0 16px 12px">
          <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">More</div>
          <div style="border-radius:var(--radius-lg);overflow:hidden">
            ${this._menuItem('🏢', 'Partner Portal', '#6C47FF', () => `FP.Router.go('partner')`)}
            ${this._menuItem('⚙️', 'Admin Panel', '#FF6B35', () => `FP.Router.go('admin')`)}
            ${this._menuItem('❓', 'Help & Support', 'var(--info)', () => `FP.Toast.info('Support: support@flexpass.in')`)}
            ${this._menuItem('⭐', 'Rate the App', 'var(--warning)', () => `FP.Toast.success('Thank you for the ⭐⭐⭐⭐⭐!')`)}
          </div>
        </div>

        <!-- Logout -->
        <div style="margin:16px;margin-top:4px">
          <button class="btn btn-ghost btn-full" style="border-color:var(--error);color:var(--error)" onclick="FP.pages.profile._logout()">
            🚪 Log Out
          </button>
        </div>

        <div style="text-align:center;padding:8px;font-size:11px;color:var(--text-muted)">FlexPass v1.0 · Made with ❤️ in India</div>
        <div style="display:flex;justify-content:center;gap:16px;padding:4px 0 8px;flex-wrap:wrap">
          <span onclick="FP.Router.go('privacy-policy')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Privacy Policy</span>
          <span onclick="FP.Router.go('terms-of-service')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Terms of Service</span>
          <span onclick="FP.Router.go('cookie-policy')" style="font-size:11px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Cookie Policy</span>
          <span onclick="FP.CookieConsent.openPreferences()" style="font-size:11px;color:var(--primary);cursor:pointer;font-weight:600">🍪 Manage Cookies</span>
        </div>
      </div>`;
  },

  _menuItem(icon, label, color, action) {
    return `
      <div class="menu-item" onclick="${action}()">
        <div class="menu-item-icon" style="background:${color}22;color:${color}">${icon}</div>
        <span class="menu-item-label">${label}</span>
        <span class="menu-item-arrow">›</span>
      </div>`;
  },

  _toggleTheme() {
    const next = FP.User.toggleTheme();
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.classList.toggle('active', next === 'dark');
    FP.Toast.info(next === 'dark' ? '🌙 Dark mode' : '☀️ Light mode');
  },

  _toggleGoal(goalId) {
    const user = FP.User.get() || {};
    let goals = user.goals || [];
    if (goals.includes(goalId)) goals = goals.filter(g => g !== goalId);
    else goals = [...goals, goalId];
    FP.User.update({ goals });
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  _editProfile() {
    const user = FP.User.get() || {};
    const html = `
      <div class="modal-handle"></div>
      <h3 class="modal-title">Edit Profile</h3>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" id="edit-name" value="${user.name || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" id="edit-email" type="email" value="${user.email || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Phone</label>
        <input class="form-input" id="edit-phone" value="${user.phone || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">City</label>
        <select class="form-select" id="edit-city">
          ${['Bangalore','Mumbai','Delhi','Hyderabad','Pune','Chennai','Gurgaon','Noida'].map(c => 
            `<option ${user.location===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <button class="btn btn-primary btn-full" onclick="FP.pages.profile._saveProfile()">Save Changes</button>`;
    FP.Modal.show(html);
  },

  _saveProfile() {
    const name  = document.getElementById('edit-name')?.value;
    const email = document.getElementById('edit-email')?.value;
    const phone = document.getElementById('edit-phone')?.value;
    const city  = document.getElementById('edit-city')?.value;
    FP.User.update({ name, email, phone, location: city, initials: name ? name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'FP' });
    FP.Modal.close();
    FP.Toast.success('Profile updated!');
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  _logout() {
    FP.Modal.confirm('👋 Log Out', 'Are you sure you want to log out of FlexPass?', () => {
      FP.User.logout();
      FP.Toast.info('See you soon! 👋');
      setTimeout(() => FP.Router.go('splash'), 400);
    }, { confirmLabel: 'Log Out' });
  },

  init() { /* inline */ }
};
