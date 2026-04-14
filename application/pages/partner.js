/* ============================================================
   FLEXPASS — PARTNER DASHBOARD PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.partner = {
  _tab: 'overview',
  _registered: false,

  render() {
    const isRegistered = this._registered || localStorage.getItem('fp_partner_registered') === 'true';

    return `
      <div class="page-enter" style="padding-bottom:80px">
        ${isRegistered ? this._renderDashboard() : this._renderRegister()}
      </div>`;
  },

  _renderRegister() {
    return `
      <div style="padding:24px 16px">
        <!-- Hero -->
        <div style="text-align:center;margin-bottom:28px">
          <div style="font-size:56px;margin-bottom:12px">🏢</div>
          <h1 style="font-size:24px;font-weight:900;margin-bottom:8px">Become a\nFlexPass Partner</h1>
          <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;max-width:280px;margin:0 auto">Join 1,200+ fitness venues earning more with FlexPass's 5M+ member network.</p>
        </div>

        <!-- Benefits -->
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px">
          ${[
            {icon:'📈', title:'Increase Revenue', desc:'On average, partners see 35% revenue increase in 3 months.'},
            {icon:'🎯', title:'Reach New Members', desc:'Access 5M+ fitness enthusiasts actively seeking venues.'},
            {icon:'📊', title:'Real-Time Analytics', desc:'Track bookings, revenue, and footfall in one dashboard.'},
            {icon:'💰', title:'Zero Setup Cost', desc:'Free to join. We only earn when you earn (15% commission).'},
          ].map(b => `
            <div style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:16px">
              <div style="width:44px;height:44px;background:var(--gradient-primary-soft);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${b.icon}</div>
              <div>
                <div style="font-size:14px;font-weight:700">${b.title}</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:3px;line-height:1.6">${b.desc}</div>
              </div>
            </div>`).join('')}
        </div>

        <!-- Registration Form -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:20px;padding:20px">
          <h3 style="font-size:16px;font-weight:800;margin-bottom:16px">Register Your Facility</h3>

          <div class="form-group">
            <label class="form-label">Facility Name</label>
            <input class="form-input" id="p-name" placeholder="Iron Temple Fitness">
          </div>
          <div class="form-group">
            <label class="form-label">Type of Facility</label>
            <select class="form-select" id="p-type">
              ${FP.data.activityTypes.filter(t=>t.id!=='all').map(t=>
                `<option value="${t.id}">${t.emoji} ${t.label}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <input class="form-input" id="p-address" placeholder="123 MG Road, Bangalore">
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <select class="form-select" id="p-city">
              ${['Bangalore','Mumbai','Delhi','Hyderabad','Pune','Chennai','Gurgaon','Noida','Kolkata','Ahmedabad'].map(c=>
                `<option>${c}</option>`).join('')}
            </select>
          </div>
          <div class="grid-2 gap-md mb-md">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">Phone</label>
              <input class="form-input" id="p-phone" type="tel" placeholder="9876543210">
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">Capacity</label>
              <input class="form-input" id="p-capacity" type="number" placeholder="50">
            </div>
          </div>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Monthly Pricing (₹)</label>
            <input class="form-input" id="p-price" type="number" placeholder="199">
          </div>

          <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="FP.pages.partner._submit()">
            Submit Application →
          </button>
          <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:10px">
            Our team will review and approve within 24 hours. 🕐
          </p>
        </div>
      </div>`;
  },

  _renderDashboard() {
    /* Mock analytics data */
    const todayBookings = 23;
    const monthRevenue = 84650;
    const monthBookings = 312;
    const rating = 4.7;

    return `
      <!-- Header -->
      <div style="padding:20px 16px 0">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
          <div>
            <h1 style="font-size:22px;font-weight:900">Partner Dashboard</h1>
            <p style="font-size:13px;color:var(--text-secondary)">Iron Temple Fitness, Bangalore</p>
          </div>
          <span class="badge badge-success">✓ Verified</span>
        </div>
      </div>

      <!-- Tabs -->
      <div style="display:flex;gap:6px;padding:12px 16px;overflow-x:auto;scrollbar-width:none">
        ${[['overview','Overview'],['bookings','Bookings'],['slots','Slots'],['analytics','Analytics']].map(([id,l]) => `
          <div class="filter-chip ${this._tab===id?'active':''}" onclick="FP.pages.partner._setTab('${id}')">${l}</div>`).join('')}
      </div>

      ${this._tab === 'overview'   ? this._renderOverview(todayBookings, monthRevenue, monthBookings, rating) :
        this._tab === 'bookings'   ? this._renderBookingsList() :
        this._tab === 'slots'      ? this._renderSlots() :
        this._renderAnalytics(monthRevenue)}
    `;
  },

  _renderOverview(todayBookings, monthRevenue, monthBookings, rating) {
    return `
      <div style="padding:0 16px">
        <!-- Stats grid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
          ${[
            {label:"Today's Bookings",value:todayBookings,color:'var(--primary)',icon:'📅'},
            {label:'Monthly Revenue',value:`₹${(monthRevenue/1000).toFixed(1)}K`,color:'var(--success)',icon:'💰'},
            {label:'This Month',value:`${monthBookings} sessions`,color:'var(--warning)',icon:'🏋️'},
            {label:'Avg Rating',value:`★ ${rating}`,color:'var(--warning)',icon:'⭐'},
          ].map(s => `
            <div class="partner-stat">
              <div style="font-size:24px;margin-bottom:6px">${s.icon}</div>
              <div class="partner-stat-value" style="color:${s.color}">${s.value}</div>
              <div class="partner-stat-label">${s.label}</div>
            </div>`).join('')}
        </div>

        <!-- Today's schedule preview -->
        <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">Today's Sessions</h3>
        ${[
          {time:'6:00 AM', name:'Priya Mehta', status:'checked-in'},
          {time:'7:00 AM', name:'Rahul Sharma', status:'confirmed'},
          {time:'7:30 AM', name:'Anika Patel', status:'confirmed'},
          {time:'8:00 AM', name:'Vivek Kumar', status:'confirmed'},
          {time:'9:00 AM', name:'Sunita Roy', status:'checked-in'},
        ].map(s => `
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:8px">
            <div style="width:40px;height:40px;background:var(--surface-2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--primary);flex-shrink:0">${s.time}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${s.name}</div>
            </div>
            <span class="badge ${s.status==='checked-in'?'badge-success':'badge-primary'}">${s.status==='checked-in'?'✓ In':'Upcoming'}</span>
          </div>`).join('')}

        <button class="btn btn-ghost btn-full btn-sm" style="margin-top:4px" onclick="FP.pages.partner._setTab('bookings')">See All Bookings →</button>

        <!-- Quick settings -->
        <h3 style="font-size:15px;font-weight:700;margin:20px 0 12px">Quick Settings</h3>
        ${[
          {label:'Facility Status', value:'Open', color:'var(--success)'},
          {label:'Auto-confirm bookings', value:'Enabled', color:'var(--primary)'},
          {label:'Same-day cancellations', value:'Allowed', color:'var(--warning)'},
        ].map(s => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:14px">${s.label}</span>
            <span style="font-size:13px;font-weight:600;color:${s.color}">${s.value}</span>
          </div>`).join('')}
      </div>`;
  },

  _renderBookingsList() {
    const bookings = [
      {id:'B001', member:'Arjun S.',   time:'7:00 AM', date:'Today',      status:'confirmed'},
      {id:'B002', member:'Priya M.',   time:'8:30 AM', date:'Today',      status:'checked-in'},
      {id:'B003', member:'Rohan K.',   time:'5:30 PM', date:'Today',      status:'confirmed'},
      {id:'B004', member:'Ananya T.',  time:'6:00 AM', date:'Tomorrow',   status:'confirmed'},
      {id:'B005', member:'Vivek R.',   time:'7:30 AM', date:'Tomorrow',   status:'confirmed'},
      {id:'B006', member:'Meera P.',   time:'10:00 AM',date:'Yesterday',  status:'completed'},
      {id:'B007', member:'Sagar B.',   time:'6:30 PM', date:'Yesterday',  status:'completed'},
    ];

    return `
      <div style="padding:0 16px">
        <h3 style="font-size:15px;font-weight:700;margin-bottom:14px">All Bookings</h3>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
          <table class="admin-table">
            <thead><tr>
              <th>Member</th>
              <th>Time</th>
              <th>Date</th>
              <th>Status</th>
            </tr></thead>
            <tbody>
              ${bookings.map(b => `
                <tr>
                  <td style="font-weight:600">${b.member}</td>
                  <td>${b.time}</td>
                  <td style="color:var(--text-secondary)">${b.date}</td>
                  <td><span class="badge ${b.status==='completed'?'badge-ghost':b.status==='checked-in'?'badge-success':'badge-primary'}">${b.status}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  _renderSlots() {
    const slots = FP.data.generateSlots(0).slice(0, 12);
    return `
      <div style="padding:0 16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3 style="font-size:15px;font-weight:700">Manage Slots — Today</h3>
          <button class="btn btn-secondary btn-sm" onclick="FP.Toast.success('Slot settings saved!')">Save</button>
        </div>
        <div class="slot-grid">
          ${slots.map((s, i) => `
            <div class="slot ${!s.available?'slot-booked':''}" onclick="FP.pages.partner._toggleSlot(${i})" id="partner-slot-${i}">
              ${s.time}
            </div>`).join('')}
        </div>
        <p style="font-size:12px;color:var(--text-muted);margin-top:12px;text-align:center">Tap to enable/disable slots. Booked slots cannot be removed.</p>
      </div>`;
  },

  _renderAnalytics(monthRevenue) {
    const weekly = [45000, 52000, 61000, 58000, 67000, 84650, 0];
    const labels = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
    const maxRev = Math.max(...weekly.filter(v=>v>0));

    return `
      <div style="padding:0 16px">
        <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">Revenue This Year</h3>
        <div class="chart-wrapper" style="margin:0 0 20px">
          <div style="display:flex;align-items:flex-end;gap:6px;height:100px;margin-bottom:8px">
            ${weekly.map((v,i) => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                <div style="width:100%;background:${v===maxRev?'var(--primary)':v>0?'rgba(108,71,255,0.45)':'rgba(255,255,255,0.05)'};border-radius:6px 6px 0 0;height:${v>0?Math.round(v/maxRev*90):4}px;transition:all 0.5s;min-height:4px"></div>
                <div style="font-size:10px;color:var(--text-muted)">${labels[i]}</div>
              </div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary)">
            <span>Peak: ₹${(maxRev/1000).toFixed(0)}K</span><span>Total: ₹${(weekly.reduce((a,b)=>a+b,0)/1000).toFixed(0)}K</span>
          </div>
        </div>

        <!-- Commission info -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">Commission Breakdown</h4>
          ${[
            {label:'Gross Revenue',value:`₹${monthRevenue.toLocaleString()}`},
            {label:'FlexPass Commission (15%)',value:`-₹${(monthRevenue*0.15).toLocaleString()}`},
            {label:'Your Net Earnings',value:`₹${(monthRevenue*0.85).toLocaleString()}`,bold:true,color:'var(--success)'},
          ].map(r => `
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px">
              <span style="color:var(--text-secondary)">${r.label}</span>
              <span style="font-weight:${r.bold?800:500};color:${r.color||'var(--text)'}">${r.value}</span>
            </div>`).join('')}
        </div>

        <!-- Member metrics -->
        <div class="grid-2">
          ${[
            {icon:'👥',label:'Unique Members',value:'187'},
            {icon:'🔄',label:'Return Rate',value:'68%'},
            {icon:'⏱️',label:'Avg Session',value:'52 min'},
            {icon:'🌟',label:'Satisfaction',value:'96%'},
          ].map(m => `
            <div class="partner-stat">
              <div style="font-size:24px;margin-bottom:6px">${m.icon}</div>
              <div class="partner-stat-value">${m.value}</div>
              <div class="partner-stat-label">${m.label}</div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  _toggleSlot(i) {
    const el = document.getElementById(`partner-slot-${i}`);
    if (el && !el.classList.contains('slot-booked')) {
      el.classList.toggle('selected');
      FP.Toast.info(el.classList.contains('selected') ? 'Slot disabled' : 'Slot enabled');
    }
  },

  _setTab(tab) {
    this._tab = tab;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  _submit() {
    const name = document.getElementById('p-name')?.value;
    if (!name) { FP.Toast.error('Please enter your facility name.'); return; }
    FP.Toast.info('Submitting application...');
    setTimeout(() => {
      localStorage.setItem('fp_partner_registered', 'true');
      this._registered = true;
      FP.Toast.success('Application approved! Welcome, Partner! 🎉');
      const content = document.getElementById('app-content');
      if (content) { content.innerHTML = this.render(); }
    }, 1500);
  },

  init() { /* inline */ }
};
