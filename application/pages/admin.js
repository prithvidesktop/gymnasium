/* ============================================================
   FLEXPASS — ADMIN PANEL PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.admin = {
  _tab: 'overview',

  render() {
    return `
      <div class="page-enter" style="padding-bottom:80px">
        <!-- Header -->
        <div style="padding:20px 16px 0">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <div>
              <h1 style="font-size:22px;font-weight:900">Admin Panel</h1>
              <p style="font-size:13px;color:var(--text-secondary)">FlexPass Control Center</p>
            </div>
            <span class="badge badge-error">Admin</span>
          </div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:6px;padding:12px 16px;overflow-x:auto;scrollbar-width:none">
          ${[['overview','Overview'],['users','Users'],['partners','Partners'],['content','Content']].map(([id,l]) => `
            <div class="filter-chip ${this._tab===id?'active':''}" onclick="FP.pages.admin._setTab('${id}')">${l}</div>`).join('')}
        </div>

        ${this._tab === 'overview'  ? this._renderOverview() :
          this._tab === 'users'     ? this._renderUsers() :
          this._tab === 'partners'  ? this._renderPartners() :
          this._renderContent()}
      </div>`;
  },

  _renderOverview() {
    return `
      <div style="padding:0 16px">
        <!-- KPI Grid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
          ${[
            {label:'Total Users',value:'1,84,293',icon:'👥',color:'var(--primary)',delta:'+2,340 this week'},
            {label:'Active Partners',value:'1,247',icon:'🏢',color:'var(--success)',delta:'+47 this week'},
            {label:'MRR (Monthly)',value:'₹3.7Cr',icon:'💰',color:'var(--warning)',delta:'+12% MoM'},
            {label:'Bookings Today',value:'12,847',icon:'📅',color:'var(--secondary)',delta:'vs 11,200 yesterday'},
          ].map(s => `
            <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <span style="font-size:20px">${s.icon}</span>
                <span style="font-size:11px;color:var(--success);font-weight:600">↑</span>
              </div>
              <div style="font-size:20px;font-weight:900;color:${s.color}">${s.value}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${s.label}</div>
              <div style="font-size:11px;color:var(--success);margin-top:4px">${s.delta}</div>
            </div>`).join('')}
        </div>

        <!-- System health -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:20px">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">System Health</h4>
          ${[
            {label:'API Response Time',value:'142ms',status:'good'},
            {label:'Payment Gateway',value:'Operational',status:'good'},
            {label:'Database',value:'99.98% uptime',status:'good'},
            {label:'Push Notifications',value:'Operational',status:'good'},
            {label:'Map Services',value:'Degraded',status:'warn'},
          ].map(s => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
              <span style="font-size:13px">${s.label}</span>
              <div style="display:flex;align-items:center;gap:6px">
                <div class="dot ${s.status==='good'?'dot-success':'dot-warning'} dot-pulse"></div>
                <span style="font-size:12px;color:${s.status==='good'?'var(--success)':'var(--warning)'}">${s.value}</span>
              </div>
            </div>`).join('')}
        </div>

        <!-- Recent activity -->
        <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">Recent Activity</h3>
        ${[
          {icon:'👤',text:'New user signup: priya.mehta@gmail.com', time:'2 min ago'},
          {icon:'🏢',text:'New partner application: FitZone, Delhi', time:'8 min ago'},
          {icon:'💳',text:'Subscription upgraded: Elite Plan — ₹3,499', time:'12 min ago'},
          {icon:'⭐',text:'Review flagged for moderation (4/5 ★)', time:'25 min ago'},
          {icon:'🚫',text:'Suspicious login attempt blocked', time:'1 hr ago'},
        ].map(a => `
          <div style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:8px">
            <span style="font-size:20px">${a.icon}</span>
            <div style="flex:1;font-size:13px;color:var(--text-secondary)">${a.text}</div>
            <span style="font-size:11px;color:var(--text-muted);flex-shrink:0">${a.time}</span>
          </div>`).join('')}
      </div>`;
  },

  _renderUsers() {
    const users = [
      {name:'Arjun Sharma',email:'arjun@example.com',plan:'Pro',sessions:127,joined:'Jan 2026',status:'active'},
      {name:'Priya Mehta',email:'priya@example.com',plan:'Elite',sessions:89,joined:'Feb 2026',status:'active'},
      {name:'Rohit Kumar',email:'rohit@example.com',plan:'Basic',sessions:23,joined:'Mar 2026',status:'active'},
      {name:'Ananya Rao',email:'ananya@example.com',plan:'Pro',sessions:156,joined:'Dec 2025',status:'active'},
      {name:'Vikram Singh',email:'vikram@example.com',plan:null,sessions:0,joined:'Apr 2026',status:'trial'},
      {name:'Deepa Nair',email:'deepa@example.com',plan:'Basic',sessions:8,joined:'Apr 2026',status:'churned'},
    ];

    return `
      <div style="padding:0 16px">
        <!-- User search -->
        <div class="input-wrapper" style="margin-bottom:14px">
          <span class="input-icon">🔍</span>
          <input class="form-input" placeholder="Search users..." style="padding-left:44px;border-radius:999px">
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
          ${[['1.84L','Total'],['94%','Active'],['18%','Trial']].map(([v,l]) => `
            <div class="stat-card"><div class="stat-card-value text-gradient">${v}</div><div class="stat-card-label">${l}</div></div>`).join('')}
        </div>

        <!-- Users table -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
          <table class="admin-table">
            <thead><tr>
              <th>User</th>
              <th>Plan</th>
              <th>Sessions</th>
              <th>Status</th>
            </tr></thead>
            <tbody>
              ${users.map(u => `
                <tr style="cursor:pointer" onclick="FP.Toast.info('User management coming soon!')">
                  <td>
                    <div style="font-weight:600;font-size:13px">${u.name}</div>
                    <div style="font-size:11px;color:var(--text-muted)">${u.email}</div>
                  </td>
                  <td>${u.plan ? `<span class="badge ${u.plan==='Elite'?'badge-orange':u.plan==='Pro'?'badge-primary':'badge-success'}" style="font-size:10px">${u.plan}</span>` : '<span style="color:var(--text-muted);font-size:12px">None</span>'}</td>
                  <td style="font-weight:700">${u.sessions}</td>
                  <td><span class="badge ${u.status==='active'?'badge-success':u.status==='trial'?'badge-warning':'badge-ghost'}" style="font-size:10px">${u.status}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="text-align:center;padding:12px;font-size:12px;color:var(--text-muted)">Showing 6 of 184,293 users</div>
      </div>`;
  },

  _renderPartners() {
    const partners = [
      {name:'Iron Temple Fitness',city:'Bangalore',type:'Gym',bookings:312,revenue:84650,status:'verified'},
      {name:'Serenity Yoga Studio',city:'Bangalore',type:'Yoga',bookings:189,revenue:47236,status:'verified'},
      {name:'AquaFit Swimming',city:'Mumbai',type:'Swimming',bookings:98,revenue:29302,status:'verified'},
      {name:'FightClub MMA',city:'Delhi',type:'MMA',bookings:204,revenue:71396,status:'verified'},
      {name:'StepUp Dance',city:'Mumbai',type:'Dance',bookings:156,revenue:31044,status:'verified'},
      {name:'New Gym Application',city:'Pune',type:'Gym',bookings:0,revenue:0,status:'pending'},
    ];

    return `
      <div style="padding:0 16px">
        <!-- Stats -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
          ${[['1,247','Partners'],['₹4.2Cr','Partner Payouts'],['15%','Commission']].map(([v,l]) => `
            <div class="stat-card"><div class="stat-card-value text-gradient">${v}</div><div class="stat-card-label">${l}</div></div>`).join('')}
        </div>

        <!-- Partners table -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
          <table class="admin-table">
            <thead><tr>
              <th>Venue</th>
              <th>Revenue</th>
              <th>Status</th>
            </tr></thead>
            <tbody>
              ${partners.map(p => `
                <tr>
                  <td>
                    <div style="font-weight:600;font-size:13px">${p.name}</div>
                    <div style="font-size:11px;color:var(--text-muted)">📍${p.city} · ${p.type} · ${p.bookings} sessions</div>
                  </td>
                  <td style="font-weight:700;font-size:13px;color:var(--success)">₹${p.revenue>0?(p.revenue/1000).toFixed(0)+'K':'—'}</td>
                  <td>
                    ${p.status==='verified' ? `<span class="badge badge-success" style="font-size:10px">Verified</span>` : `
                      <div style="display:flex;flex-direction:column;gap:4px">
                        <span class="badge badge-warning" style="font-size:10px">Pending</span>
                        <div style="display:flex;gap:4px">
                          <button class="btn btn-success btn-sm" style="padding:3px 8px;font-size:10px" onclick="FP.Toast.success('Partner approved!')">✓</button>
                          <button class="btn btn-ghost btn-sm" style="padding:3px 8px;font-size:10px;color:var(--error);border-color:var(--error)" onclick="FP.Toast.info('Partner rejected')">✗</button>
                        </div>
                      </div>`}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  _renderContent() {
    return `
      <div style="padding:0 16px">
        <h3 style="font-size:15px;font-weight:700;margin-bottom:14px">Content Moderation</h3>

        <!-- Flagged Reviews -->
        ${[
          {reviewer:'User_A892',gym:'Iron Temple',rating:1,review:'This gym is a scam! They denied my booking.',flag:'Suspicious'},
          {reviewer:'AnonymousX',gym:'Serenity Yoga',rating:5,review:'Buy followers here: spam-link.com',flag:'Spam'},
          {reviewer:'Rohan K.',gym:'FightClub',rating:3,review:'Coach used inappropriate language during session.',flag:'Report'},
        ].map(r => `
          <div style="background:var(--card);border:1px solid var(--error-bg);border-radius:16px;padding:14px;margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div>
                <div style="font-size:13px;font-weight:700">${r.reviewer} on ${r.gym}</div>
                <div style="font-size:11px;color:var(--warning)">${'★'.repeat(r.rating)} · Flagged: ${r.flag}</div>
              </div>
              <span class="badge badge-error">${r.flag}</span>
            </div>
            <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;line-height:1.6">"${r.review}"</p>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm flex-1" onclick="FP.Toast.success('Review approved.')">Approve</button>
              <button class="btn btn-sm flex-1" style="background:var(--error-bg);color:var(--error);border:1px solid var(--error)" onclick="FP.Toast.info('Review deleted.')">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  },

  _setTab(tab) {
    this._tab = tab;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  init() { /* inline */ }
};
