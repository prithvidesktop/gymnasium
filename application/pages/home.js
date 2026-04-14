/* ============================================================
   FLEXPASS — HOME DASHBOARD PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.home = {
  render() {
    const user = FP.User.get() || {};
    const plan = user.plan ? FP.data.getPlanById(user.plan) : null;
    const bookings = FP.User.getBookings();
    const upcomingBooking = bookings.find(b => b.status === 'confirmed');
    const tip = FP.data.getDailyTip();
    const featured = FP.data.getFeaturedGyms();
    const nearby = FP.data.getNearbyGyms(6);
    const greeting = this._greeting();

    return `
      <div class="page-enter" style="padding-bottom:80px">

        <!-- Greeting Header -->
        <div style="padding:20px 20px 0">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <p style="font-size:13px;color:var(--text-secondary);font-weight:500">${greeting}</p>
              <h1 style="font-size:24px;font-weight:900;margin-top:2px">Hey, ${(user.name || 'Fitness Lover').split(' ')[0]}! 💪</h1>
            </div>
            <div class="avatar avatar-md" style="flex-shrink:0;cursor:pointer" onclick="FP.Router.go('profile')">${user.initials || 'FP'}</div>
          </div>

          <!-- Subscription pill -->
          ${plan ? `
            <div style="margin-top:14px;display:inline-flex;align-items:center;gap:8px;background:rgba(108,71,255,0.12);border:1px solid rgba(108,71,255,0.3);border-radius:999px;padding:6px 14px">
              <span style="font-size:14px">${plan.emoji}</span>
              <span style="font-size:13px;font-weight:700;color:var(--primary)">${plan.name} Member</span>
              <span style="font-size:11px;color:var(--text-secondary)">Active</span>
              <span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite"></span>
            </div>` : `
            <div style="margin-top:14px">
              <button class="btn btn-primary btn-sm" onclick="FP.Router.go('subscriptions')">⚡ Activate Plan</button>
            </div>`}
        </div>

        <!-- Stats Row -->
        <div class="stats-row" style="margin-top:20px">
          <div class="stat-card">
            <div class="stat-card-value text-gradient">${user.sessionsThisMonth || 0}</div>
            <div class="stat-card-label">Sessions</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-value" style="color:var(--secondary)">${user.streakDays || 0}🔥</div>
            <div class="stat-card-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-value" style="color:var(--success)">${(user.caloriesThisWeek || 0).toLocaleString()}</div>
            <div class="stat-card-label">Kcal/Week</div>
          </div>
        </div>

        <!-- Upcoming Booking -->
        ${upcomingBooking ? `
          <div style="padding:0 16px;margin-bottom:20px">
            <div style="background:linear-gradient(135deg,rgba(108,71,255,0.15),rgba(255,107,53,0.08));border:1px solid rgba(108,71,255,0.25);border-radius:20px;padding:16px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--primary)">📅 UPCOMING SESSION</span>
                <span class="badge badge-success">Confirmed</span>
              </div>
              <div style="display:flex;gap:12px;align-items:center">
                <div style="width:52px;height:52px;background:var(--card);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">${upcomingBooking.gymEmoji}</div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700">${upcomingBooking.gymName}</div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">⏰ Today at ${upcomingBooking.slot}</div>
                  <div style="font-size:12px;color:var(--text-secondary)">📍 ${upcomingBooking.gymAddress}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="FP.Router.go('bookings')">QR →</button>
              </div>
            </div>
          </div>` : ''}

        <!-- Hero Banner -->
        <div class="hero-banner" style="margin-bottom:24px">
          <div style="position:relative;z-index:1">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-bottom:8px">Limited Time Offer</div>
            <h2 style="font-size:22px;font-weight:900;color:#fff;line-height:1.3;margin-bottom:12px">Get 20% off\nElite Plan 👑</h2>
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:#fff;border:1.5px solid rgba(255,255,255,0.4);backdrop-filter:blur(10px)" onclick="FP.Router.go('subscriptions')">
              Upgrade Now →
            </button>
          </div>
        </div>

        <!-- Wellness Tip -->
        <div style="margin:0 16px 24px">
          <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;display:flex;gap:12px;align-items:center">
            <div style="font-size:32px;flex-shrink:0">${tip.emoji}</div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--success);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">💡 Today's Tip</div>
              <div style="font-size:13px;color:var(--text-secondary);line-height:1.6">${tip.tip}</div>
            </div>
          </div>
        </div>

        <!-- Featured Gyms -->
        <div class="section-header">
          <span class="section-title">Featured 🌟</span>
          <span class="section-link" onclick="FP.Router.go('explore')">See all</span>
        </div>
        <div class="scroll-x" style="padding-bottom:4px;margin-bottom:24px">
          ${featured.map(g => FP.GymCard.render(g, 'featured')).join('')}
        </div>

        <!-- Categories -->
        <div class="section-header">
          <span class="section-title">Explore Categories</span>
        </div>
        <div class="filter-bar" style="margin-bottom:24px">
          ${FP.data.activityTypes.map(t => `
            <div class="filter-chip ${t.id==='all'?'active':''}" onclick="FP.Router.go('explore',{type:'${t.id}'})">
              ${t.emoji} ${t.label}
            </div>`).join('')}
        </div>

        <!-- Nearby Gyms -->
        <div class="section-header">
          <span class="section-title">Nearby Gyms 📍</span>
          <span class="section-link" onclick="FP.Router.go('explore')">Map view</span>
        </div>
        <div style="padding:0 16px;display:flex;flex-direction:column;gap:12px">
          ${nearby.map(g => FP.GymCard.render(g, 'horizontal')).join('')}
        </div>

        <!-- Quick Actions -->
        <div style="padding:24px 16px 0">
          <h3 class="section-title" style="margin-bottom:16px">Quick Actions</h3>
          <div class="grid-2">
            <div class="card-gradient" style="padding:16px;border-radius:16px;cursor:pointer;text-align:center" onclick="FP.Router.go('bookings')">
              <div style="font-size:32px;margin-bottom:8px">📅</div>
              <div style="font-size:13px;font-weight:700">My Bookings</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${bookings.filter(b=>b.status==='confirmed').length} upcoming</div>
            </div>
            <div class="card-gradient" style="padding:16px;border-radius:16px;cursor:pointer;text-align:center" onclick="FP.Router.go('wellness')">
              <div style="font-size:32px;margin-bottom:8px">🧠</div>
              <div style="font-size:13px;font-weight:700">AI Workout</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Personalized plan</div>
            </div>
            <div class="card-gradient" style="padding:16px;border-radius:16px;cursor:pointer;text-align:center" onclick="FP.Router.go('subscriptions')">
              <div style="font-size:32px;margin-bottom:8px">💳</div>
              <div style="font-size:13px;font-weight:700">My Plan</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${plan ? plan.name + ' Member' : 'No active plan'}</div>
            </div>
            <div class="card-gradient" style="padding:16px;border-radius:16px;cursor:pointer;text-align:center" onclick="FP.Router.go('explore')">
              <div style="font-size:32px;margin-bottom:8px">🔍</div>
              <div style="font-size:13px;font-weight:700">Explore</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${FP.data.gyms.length}+ venues</div>
            </div>
          </div>
        </div>

      </div>`;
  },

  _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning ☀️';
    if (h < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  },

  init() { /* no extra setup needed */ }
};
