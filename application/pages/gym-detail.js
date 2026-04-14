/* ============================================================
   FLEXPASS — GYM DETAIL & BOOKING PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages['gym-detail'] = {
  _selectedSlot: null,
  _selectedDate: 0,  /* 0 = today, 1 = tomorrow, etc. */
  _gymId: null,

  render(params = {}) {
    const gymId = params.id || this._gymId || 'gym_001';
    this._gymId = gymId;
    const gym = FP.data.getGymById(gymId);
    if (!gym) return `<div class="empty-state"><div class="empty-icon">❌</div><div class="empty-title">Gym not found</div></div>`;

    const slots = FP.data.generateSlots(this._selectedDate);
    const occupancyPct = Math.round((gym.currentOccupancy / gym.capacity) * 100);
    const dates = this._getDates();

    return `
      <div class="page-enter" style="padding-bottom:100px">

        <!-- Hero Image -->
        <div style="position:relative">
          <div style="width:100%;height:240px;background:linear-gradient(160deg,#1a1040 0%,#0d1a30 100%);display:flex;align-items:center;justify-content:center;font-size:90px">
            ${gym.emoji}
          </div>
          <!-- Gradient overlay -->
          <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to top,var(--bg),transparent)"></div>
          
          <!-- Favorite btn -->
          <button class="nav-icon-btn" id="fav-btn" style="position:absolute;top:16px;right:16px;background:rgba(0,0,0,0.5);border-color:transparent" onclick="FP.pages['gym-detail']._toggleFav()">❤️</button>
        </div>

        <div style="padding:0 16px">
          <!-- Name & Rating -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div style="flex:1">
              <h1 style="font-size:22px;font-weight:900;line-height:1.2">${gym.name}</h1>
              <div style="display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap">
                <span style="font-size:13px;color:var(--text-secondary)">📍 ${gym.address}</span>
                <span style="color:var(--border-strong)">•</span>
                <span style="font-size:13px;color:var(--text-secondary)">${gym.distance} km</span>
              </div>
            </div>
            <div style="text-align:center;flex-shrink:0;margin-left:12px">
              <div style="font-size:24px;font-weight:900;color:var(--warning)">★ ${gym.rating}</div>
              <div style="font-size:11px;color:var(--text-muted)">${gym.reviewCount} reviews</div>
            </div>
          </div>

          <!-- Tags -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
            ${gym.activityTypes.map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
            <span class="badge ${gym.tier==='elite'?'badge-orange':gym.tier==='pro'?'badge-primary':'badge-success'}">${gym.tier.charAt(0).toUpperCase()+gym.tier.slice(1)} Tier</span>
          </div>

          <!-- Occupancy -->
          <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:13px;font-weight:600">Live Occupancy</span>
              <span style="font-size:13px;font-weight:700;color:${occupancyPct<50?'var(--success)':occupancyPct<80?'var(--warning)':'var(--error)'}">${gym.currentOccupancy}/${gym.capacity} people</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${occupancyPct}%;background:${occupancyPct<50?'var(--success)':occupancyPct<80?'var(--warning)':'var(--error)'}"></div>
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:6px">${occupancyPct<50?'🟢 Low — great time to visit!':occupancyPct<80?'🟡 Moderate — might be busy':' 🔴 High — consider off-peak hours'}</div>
          </div>

          <!-- Info grid -->
          <div class="grid-2" style="margin-bottom:20px">
            <div class="stat-card">
              <div style="font-size:20px;margin-bottom:4px">⏰</div>
              <div style="font-size:11px;font-weight:600;color:var(--text)">Weekdays</div>
              <div style="font-size:12px;color:var(--text-secondary)">${gym.timings.weekday}</div>
            </div>
            <div class="stat-card">
              <div style="font-size:20px;margin-bottom:4px">📅</div>
              <div style="font-size:11px;font-weight:600;color:var(--text)">Weekend</div>
              <div style="font-size:12px;color:var(--text-secondary)">${gym.timings.weekend}</div>
            </div>
          </div>

          <!-- About -->
          <div style="margin-bottom:20px">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:10px">About</h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.7">${gym.description}</p>
          </div>

          <!-- Amenities -->
          <div style="margin-bottom:20px">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:10px">Amenities</h3>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${gym.amenities.map(a => `
                <div style="display:flex;align-items:center;gap:6px;background:var(--surface-2);border:1px solid var(--border);border-radius:999px;padding:6px 14px">
                  <span style="color:var(--success);font-size:12px">✓</span>
                  <span style="font-size:13px;color:var(--text-secondary)">${a}</span>
                </div>`).join('')}
            </div>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Book a Slot -->
          <h3 style="font-size:18px;font-weight:800;margin-bottom:14px">📅 Book a Slot</h3>

          <!-- Date selector -->
          <div style="display:flex;gap:8px;overflow-x:auto;margin-bottom:16px;padding-bottom:4px;scrollbar-width:none">
            ${dates.map((d, i) => `
              <div onclick="FP.pages['gym-detail']._setDate(${i})"
                   style="flex-shrink:0;text-align:center;padding:10px 14px;border-radius:14px;cursor:pointer;transition:all 0.2s;
                          background:${i===this._selectedDate?'var(--primary)':'var(--surface-2)'};
                          border:1.5px solid ${i===this._selectedDate?'var(--primary)':'var(--border)'};
                          color:${i===this._selectedDate?'#fff':'var(--text-secondary)'}">
                <div style="font-size:11px;font-weight:600;text-transform:uppercase">${d.day}</div>
                <div style="font-size:18px;font-weight:800;margin:2px 0">${d.date}</div>
                <div style="font-size:10px;opacity:0.8">${d.month}</div>
              </div>`).join('')}
          </div>

          <!-- Time Slots -->
          <div style="margin-bottom:20px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span style="font-size:14px;color:var(--text-secondary);font-weight:500">Select time</span>
              <div style="display:flex;gap:12px;font-size:11px">
                <span style="color:var(--text-secondary)">🟢 Available</span>
                <span style="color:var(--text-muted)">⚫ Booked</span>
              </div>
            </div>
            <div class="slot-grid" id="slot-grid">
              ${slots.map((s, i) => `
                <div class="slot ${s.disabled?'slot-disabled':!s.available?'slot-booked':''} ${this._selectedSlot===s.time?'selected':''}"
                     onclick="${s.available && !s.disabled ? `FP.pages['gym-detail']._selectSlot('${s.time}')` : ''}"
                     id="slot-${i}">
                  ${s.time}
                </div>`).join('')}
            </div>
          </div>

          <!-- Reviews -->
          <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">⭐ Reviews</h3>
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
            ${gym.reviews.map(r => `
              <div class="review-card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <div class="avatar avatar-sm" style="font-size:11px">${r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                    <span style="font-size:14px;font-weight:600">${r.name}</span>
                  </div>
                  <span style="font-size:11px;color:var(--text-muted)">${r.date}</span>
                </div>
                <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                <p class="review-text">${r.comment}</p>
              </div>`).join('')}
          </div>
        </div>

        <!-- Sticky Book Button -->
        <div style="position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;padding:16px;background:linear-gradient(to top,var(--surface) 80%,transparent);z-index:50">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div>
              <div style="font-size:22px;font-weight:900;color:var(--success)">₹${gym.pricePerSession}</div>
              <div style="font-size:11px;color:var(--text-muted)">per session</div>
            </div>
            <button class="btn btn-primary btn-lg" style="flex:1;margin-left:16px" id="book-btn"
              onclick="FP.pages['gym-detail']._bookSlot('${gym.id}', '${gym.name}', '${gym.emoji}', '${gym.address}')">
              ${this._selectedSlot ? `Book ${this._selectedSlot} →` : 'Select a time slot'}
            </button>
          </div>
        </div>
      </div>`;
  },

  _getDates() {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return Array(7).fill(0).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return { day: i === 0 ? 'Today' : days[d.getDay()], date: d.getDate(), month: months[d.getMonth()] };
    });
  },

  _setDate(i) {
    this._selectedDate = i;
    this._selectedSlot = null;
    const content = document.getElementById('app-content');
    if (content) content.innerHTML = this.render({ id: this._gymId });
  },

  _selectSlot(time) {
    this._selectedSlot = time;
    /* Update slot visuals */
    document.querySelectorAll('.slot').forEach(el => el.classList.remove('selected'));
    const btn = document.getElementById('book-btn');
    if (btn) btn.textContent = `Book ${time} →`;
    /* find and mark selected */
    document.querySelectorAll('.slot').forEach(el => {
      if (el.textContent.trim() === time) el.classList.add('selected');
    });
  },

  _bookSlot(gymId, gymName, gymEmoji, gymAddress) {
    const user = FP.User.get();
    if (!user) { FP.Router.go('auth'); return; }
    if (!user.plan) {
      FP.Modal.confirm(
        '⚡ Subscription Required',
        'You need an active FlexPass plan to book sessions. Get started with a 7-day free trial!',
        () => FP.Router.go('subscriptions'),
        { confirmLabel: 'View Plans →' }
      );
      return;
    }
    if (!this._selectedSlot) { FP.Toast.warning('Please select a time slot first.'); return; }

    const dates = this._getDates();
    const dateStr = new Date();
    dateStr.setDate(dateStr.getDate() + this._selectedDate);

    const booking = FP.User.addBooking({
      gymId, gymName, gymEmoji, gymAddress,
      slot: this._selectedSlot,
      date: dateStr.toISOString().split('T')[0],
    });

    FP.Toast.success('🎉 Booking confirmed!');
    this._selectedSlot = null;
    setTimeout(() => FP.Router.go('bookings'), 600);
  },

  _toggleFav() {
    FP.Toast.success('❤️ Added to favorites!');
  },

  init() { /* slot selection, date change are inline */ }
};
