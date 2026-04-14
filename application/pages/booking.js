/* ============================================================
   FLEXPASS — BOOKINGS PAGE (History + Active QR)
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.bookings = {
  _tab: 'upcoming',

  render() {
    const bookings = FP.User.getBookings();
    const upcoming  = bookings.filter(b => b.status === 'confirmed');
    const completed = bookings.filter(b => b.status === 'completed');
    const cancelled = bookings.filter(b => b.status === 'cancelled');

    return `
      <div class="page-enter" style="padding-bottom:80px">
        <!-- Tabs -->
        <div style="display:flex;background:var(--surface-2);margin:16px;border-radius:14px;padding:4px;gap:3px">
          ${[['upcoming','Upcoming',upcoming.length],['completed','Completed',completed.length],['cancelled','Cancelled',cancelled.length]].map(([id,label,cnt]) => `
            <div style="flex:1;text-align:center;padding:10px 6px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;
                        background:${this._tab===id?'var(--primary)':'transparent'};
                        color:${this._tab===id?'#fff':'var(--text-muted)'}"
                 onclick="FP.pages.bookings._setTab('${id}')">
              ${label}${cnt > 0 ? ` (${cnt})` : ''}
            </div>`).join('')}
        </div>

        ${this._renderBookingList(
          this._tab === 'upcoming' ? upcoming :
          this._tab === 'completed' ? completed : cancelled
        )}
      </div>`;
  },

  _renderBookingList(list) {
    if (list.length === 0) {
      const emojis = { upcoming: '📅', completed: '✅', cancelled: '❌' };
      const msgs = {
        upcoming: 'No upcoming bookings. Explore gyms and book a session!',
        completed: 'No completed sessions yet. Book your first session!',
        cancelled: 'No cancelled bookings.'
      };
      return `
        <div class="empty-state">
          <div class="empty-icon">${emojis[this._tab] || '📅'}</div>
          <div class="empty-title">Nothing here yet</div>
          <div class="empty-desc">${msgs[this._tab] || ''}</div>
          ${this._tab === 'upcoming' ? `<button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="FP.Router.go('explore')">Explore Gyms →</button>` : ''}
        </div>`;
    }

    return `<div style="padding:0 16px;display:flex;flex-direction:column;gap:14px">
      ${list.map(b => this._renderBookingCard(b)).join('')}
    </div>`;
  },

  _renderBookingCard(b) {
    const statusColors = { confirmed: 'var(--success)', completed: 'var(--text-secondary)', cancelled: 'var(--error)' };
    const statusLabels = { confirmed: '✅ Confirmed', completed: '☑️ Completed', cancelled: '❌ Cancelled' };
    const dateFormatted = new Date(b.date).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' });

    return `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:20px;overflow:hidden;transition:all 0.2s" class="card">
        <!-- Card header -->
        <div style="padding:14px 16px 0;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${statusColors[b.status]}">${statusLabels[b.status]}</span>
          <span style="font-size:11px;color:var(--text-muted)">${b.id}</span>
        </div>

        <!-- Card body -->
        <div style="padding:12px 16px;display:flex;gap:14px;align-items:center">
          <div style="width:60px;height:60px;background:var(--surface-2);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${b.gymEmoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${b.gymName}</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:3px">📍 ${b.gymAddress}</div>
            <div style="display:flex;gap:12px;margin-top:6px">
              <span style="font-size:12px;color:var(--text-secondary)">📅 ${dateFormatted}</span>
              <span style="font-size:12px;color:var(--primary);font-weight:600">⏰ ${b.slot}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="padding:12px 16px 14px;display:flex;gap:8px;border-top:1px solid var(--border)">
          ${b.status === 'confirmed' ? `
            <button class="btn btn-primary btn-sm flex-1" onclick="FP.pages.bookings._showQR('${b.id}')">Show QR Code</button>
            <button class="btn btn-ghost btn-sm" onclick="FP.pages.bookings._cancelBooking('${b.id}')">Cancel</button>
          ` : b.status === 'completed' ? `
            <button class="btn btn-ghost btn-sm flex-1" onclick="FP.Router.go('explore')">Book Again</button>
            <button class="btn btn-ghost btn-sm" onclick="FP.pages.bookings._leaveReview('${b.gymId}')">⭐ Review</button>
          ` : `
            <button class="btn btn-ghost btn-sm flex-1" onclick="FP.Router.go('explore')">Find Similar</button>
          `}
        </div>
      </div>`;
  },

  _showQR(bookingId) {
    const b = FP.User.getBookings().find(bk => bk.id === bookingId);
    if (!b) return;

    const modalHtml = `
      <div class="success-screen" style="padding:20px 0">
        <h3 style="font-size:18px;font-weight:800">Your Check-in QR Code</h3>
        <div class="qr-wrapper" style="margin:0 auto">
          <canvas id="qr-canvas" class="qr-canvas" width="200" height="200"></canvas>
          <div style="text-align:center">
            <div style="font-size:14px;font-weight:700">${b.gymName}</div>
            <div style="font-size:12px;color:var(--text-secondary)">📅 ${b.date} · ⏰ ${b.slot}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-family:monospace">${b.qrData}</div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);text-align:center;max-width:260px;line-height:1.6">
          Show this QR code at the gym entrance for contactless check-in.
        </p>
        <button class="btn btn-primary btn-full" onclick="FP.Modal.close()">Done ✓</button>
      </div>`;

    FP.Modal.show(modalHtml);

    /* Draw QR code on canvas after modal renders */
    setTimeout(() => {
      const canvas = document.getElementById('qr-canvas');
      if (canvas) FP.pages.bookings._drawQR(canvas, b.qrData);
    }, 150);
  },

  _drawQR(canvas, data) {
    /* Simple custom QR-like pattern using canvas — decorative but realistic-looking */
    const ctx = canvas.getContext('2d');
    const size = 200;
    const cell = 7;
    const cols = Math.floor(size / cell);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    /* Generate deterministic pattern from data string */
    let hash = 0;
    for (let i = 0; i < data.length; i++) hash = (hash * 31 + data.charCodeAt(i)) & 0x7FFFFFFF;

    ctx.fillStyle = '#1a1a2e';

    /* Outer finder squares */
    const drawFinder = (x, y) => {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(x*cell, y*cell, 7*cell, 7*cell);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect((x+1)*cell, (y+1)*cell, 5*cell, 5*cell);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect((x+2)*cell, (y+2)*cell, 3*cell, 3*cell);
    };

    const gridSize = Math.floor(size / cell);
    drawFinder(0, 0);
    drawFinder(gridSize - 7, 0);
    drawFinder(0, gridSize - 7);

    /* Data modules */
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        /* Skip finder areas */
        const inTL = row < 8 && col < 8;
        const inTR = row < 8 && col >= gridSize - 8;
        const inBL = row >= gridSize - 8 && col < 8;
        if (inTL || inTR || inBL) continue;

        const bit = (hash ^ (row * 137 + col * 97)) % 2;
        if (bit) {
          ctx.fillStyle = '#1a1a2e';
          ctx.fillRect(col * cell, row * cell, cell - 1, cell - 1);
        }
      }
    }

    /* FlexPass logo in center */
    ctx.fillStyle = '#6C47FF';
    const cx = size / 2 - 14;
    const cy = size / 2 - 14;
    ctx.fillRect(cx, cy, 28, 28);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', size / 2, size / 2);
  },

  _cancelBooking(id) {
    FP.Modal.confirm(
      '❌ Cancel Booking',
      'Are you sure you want to cancel this booking? This action cannot be undone.',
      () => {
        FP.User.cancelBooking(id);
        FP.Toast.info('Booking cancelled.');
        const content = document.getElementById('app-content');
        if (content) content.innerHTML = FP.pages.bookings.render();
        FP.pages.bookings.init();
      },
      { confirmLabel: 'Yes, Cancel' }
    );
  },

  _leaveReview(gymId) {
    FP.Toast.info('Review feature coming soon!');
  },

  _setTab(tab) {
    this._tab = tab;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  init() { /* click handlers inline */ }
};
