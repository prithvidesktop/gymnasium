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
        <div style="padding:var(--space-lg) var(--space-md) 0">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);font-weight:500">${greeting}</p>
              <h1 style="font-size:clamp(20px,5vw,28px);font-weight:900;margin-top:2px;line-height:1.2">
                Hey, ${(user.name || 'Fitness Lover').split(' ')[0]}! 💪
              </h1>
            </div>
            <button class="avatar avatar-md" style="flex-shrink:0;cursor:pointer;border:none"
                    onclick="FP.Router.go('profile')" aria-label="Go to profile">
              ${user.initials || 'FP'}
            </button>
          </div>

          <!-- Subscription pill -->
          ${plan ? `
            <div style="margin-top:var(--space-md);display:inline-flex;align-items:center;gap:8px;background:rgba(108,71,255,0.12);border:1px solid rgba(108,71,255,0.3);border-radius:999px;padding:6px 14px"
                 role="status" aria-label="${plan.name} plan active">
              <span style="font-size:14px" aria-hidden="true">${plan.emoji}</span>
              <span style="font-size:13px;font-weight:700;color:var(--primary)">${plan.name} Member</span>
              <span style="font-size:11px;color:var(--text-secondary)">Active</span>
              <span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite" aria-hidden="true"></span>
            </div>` : `
            <div style="margin-top:var(--space-md)">
              <button class="btn btn-primary btn-sm" onclick="FP.Router.go('subscriptions')">⚡ Activate Plan</button>
            </div>`}
        </div>

        <!-- Stats Row -->
        <div class="stats-row" style="margin-top:var(--space-lg)" role="region" aria-label="Your fitness stats">
          <div class="stat-card">
            <div class="stat-card-value text-gradient" aria-label="${user.sessionsThisMonth || 0} sessions this month">${user.sessionsThisMonth || 0}</div>
            <div class="stat-card-label">Sessions</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-value" style="color:var(--secondary)" aria-label="${user.streakDays || 0} day streak">${user.streakDays || 0}🔥</div>
            <div class="stat-card-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-value" style="color:var(--success)" aria-label="${(user.caloriesThisWeek || 0).toLocaleString()} calories this week">${(user.caloriesThisWeek || 0).toLocaleString()}</div>
            <div class="stat-card-label">Kcal/Week</div>
          </div>
        </div>

        <!-- Upcoming Booking -->
        ${upcomingBooking ? `
          <div style="padding:0 var(--space-md);margin-bottom:var(--space-lg)" role="region" aria-label="Upcoming session">
            <div style="background:linear-gradient(135deg,rgba(108,71,255,0.15),rgba(255,107,53,0.08));border:1px solid rgba(108,71,255,0.25);border-radius:20px;padding:var(--space-md)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--primary)">📅 UPCOMING SESSION</span>
                <span class="badge badge-success">Confirmed</span>
              </div>
              <div style="display:flex;gap:12px;align-items:center">
                <div style="width:52px;height:52px;background:var(--card);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0" aria-hidden="true">${upcomingBooking.gymEmoji}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:15px;font-weight:700">${upcomingBooking.gymName}</div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">⏰ Today at ${upcomingBooking.slot}</div>
                  <div style="font-size:12px;color:var(--text-secondary)" class="truncate">📍 ${upcomingBooking.gymAddress}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="FP.Router.go('bookings')" style="flex-shrink:0">QR →</button>
              </div>
            </div>
          </div>` : ''}

        <!-- Hero Banner -->
        <div class="hero-banner" style="margin-bottom:var(--space-lg)">
          <div style="position:relative;z-index:1">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-bottom:8px">Limited Time Offer</div>
            <h2 style="font-size:clamp(18px,4vw,24px);font-weight:900;color:#fff;line-height:1.3;margin-bottom:12px">
              Get 20% off<br>Elite Plan 👑
            </h2>
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:#fff;border:1.5px solid rgba(255,255,255,0.4);backdrop-filter:blur(10px)"
                    onclick="FP.Router.go('subscriptions')">
              Upgrade Now →
            </button>
          </div>
        </div>

        <!-- Wellness Tip -->
        <div style="margin:0 var(--space-md) var(--space-lg)" role="complementary" aria-label="Today's wellness tip">
          <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:var(--space-md);display:flex;gap:12px;align-items:center">
            <div style="font-size:32px;flex-shrink:0" aria-hidden="true">${tip.emoji}</div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--success);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">💡 Today's Tip</div>
              <div style="font-size:13px;color:var(--text-secondary);line-height:1.6">${tip.tip}</div>
            </div>
          </div>
        </div>

        <!-- Featured Gyms -->
        <section aria-label="Featured gyms">
          <div class="section-header">
            <span class="section-title">Featured 🌟</span>
            <span class="section-link" onclick="FP.Router.go('explore')" role="link" tabindex="0">See all</span>
          </div>
          <div class="scroll-x" style="padding-bottom:4px;margin-bottom:var(--space-lg)" role="list">
            ${featured.map(g => FP.GymCard.render(g, 'featured')).join('')}
          </div>
        </section>

        <!-- Categories -->
        <section aria-label="Explore by category">
          <div class="section-header">
            <span class="section-title">Explore Categories</span>
          </div>
          <div class="filter-bar" style="margin-bottom:var(--space-lg)" role="list">
            ${FP.data.activityTypes.map(t => `
              <div class="filter-chip ${t.id==='all'?'active':''}"
                   onclick="FP.Router.go('explore',{type:'${t.id}'})"
                   role="button" tabindex="0"
                   aria-label="${t.label}"
                   onkeydown="if(event.key==='Enter'||event.key===' ')FP.Router.go('explore',{type:'${t.id}'})">
                ${t.emoji} ${t.label}
              </div>`).join('')}
          </div>
        </section>

        <!-- Nearby Gyms -->
        <section aria-label="Nearby gyms">
          <div class="section-header">
            <span class="section-title">Nearby Gyms 📍</span>
            <span class="section-link" onclick="FP.Router.go('explore')" role="link" tabindex="0">Map view</span>
          </div>
          <div style="padding:0 var(--space-md);display:flex;flex-direction:column;gap:12px" role="list">
            ${nearby.map(g => FP.GymCard.render(g, 'horizontal')).join('')}
          </div>
        </section>

        <!-- Quick Actions -->
        <section style="padding:var(--space-lg) var(--space-md) 0" aria-label="Quick actions">
          <h3 class="section-title" style="margin-bottom:var(--space-md)">Quick Actions</h3>
          <div class="grid-2">
            <button class="card-gradient" style="padding:var(--space-md);border-radius:16px;cursor:pointer;text-align:center;border:none;font-family:var(--font);color:var(--text);width:100%"
                    onclick="FP.Router.go('bookings')" aria-label="My Bookings, ${bookings.filter(b=>b.status==='confirmed').length} upcoming">
              <div style="font-size:32px;margin-bottom:8px" aria-hidden="true">📅</div>
              <div style="font-size:13px;font-weight:700">My Bookings</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${bookings.filter(b=>b.status==='confirmed').length} upcoming</div>
            </button>
            <button class="card-gradient" style="padding:var(--space-md);border-radius:16px;cursor:pointer;text-align:center;border:none;font-family:var(--font);color:var(--text);width:100%"
                    onclick="FP.Router.go('wellness')" aria-label="AI Workout planner">
              <div style="font-size:32px;margin-bottom:8px" aria-hidden="true">🧠</div>
              <div style="font-size:13px;font-weight:700">AI Workout</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Personalized plan</div>
            </button>
            <button class="card-gradient" style="padding:var(--space-md);border-radius:16px;cursor:pointer;text-align:center;border:none;font-family:var(--font);color:var(--text);width:100%"
                    onclick="FP.Router.go('subscriptions')" aria-label="My Plan, ${plan ? plan.name + ' Member' : 'No active plan'}">
              <div style="font-size:32px;margin-bottom:8px" aria-hidden="true">💳</div>
              <div style="font-size:13px;font-weight:700">My Plan</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${plan ? plan.name + ' Member' : 'No active plan'}</div>
            </button>
            <button class="card-gradient" style="padding:var(--space-md);border-radius:16px;cursor:pointer;text-align:center;border:none;font-family:var(--font);color:var(--text);width:100%"
                    onclick="FP.Router.go('explore')" aria-label="Explore ${FP.data.gyms.length}+ venues">
              <div style="font-size:32px;margin-bottom:8px" aria-hidden="true">🔍</div>
              <div style="font-size:13px;font-weight:700">Explore</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${FP.data.gyms.length}+ venues</div>
            </button>
          </div>
        </section>

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
