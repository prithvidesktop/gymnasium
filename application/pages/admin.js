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
          ${[['overview','Overview'],['members','Members'],['partners','Partners'],['content','Content']].map(([id,l]) => `
            <div class="filter-chip ${this._tab===id?'active':''}" onclick="FP.pages.admin._setTab('${id}')">${l}</div>`).join('')}
        </div>

        ${this._tab === 'overview' ? this._renderOverview() :
          this._tab === 'members'  ? this._renderMembers() :
          this._tab === 'partners' ? this._renderPartners() :
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

  _renderMembers() {
    const stats    = FP.data.getMemberStats();
    const members  = FP.data.getMemberLeaderboard();
    const maxCI    = members[0]?.checkInsMonth || 1;

    const planColor = { elite: 'badge-orange', pro: 'badge-primary', basic: 'badge-success' };
    const planLabel = { elite: 'Elite', pro: 'Pro', basic: 'Basic' };

    return `
      <div style="padding:0 16px">

        <!-- Summary stats -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
          ${[
            { v: stats.total,           l: 'Members',    color: 'var(--primary)'   },
            { v: stats.totalCheckIns,   l: 'Total CI',   color: 'var(--success)'   },
            { v: stats.avgCheckIns,     l: 'Avg CI/Mo',  color: 'var(--warning)'   },
            { v: stats.cities,          l: 'Cities',     color: 'var(--secondary)' },
          ].map(s => `
            <div class="stat-card">
              <div class="stat-card-value" style="color:${s.color};font-size:18px">${s.v}</div>
              <div class="stat-card-label">${s.l}</div>
            </div>`).join('')}
        </div>

        <!-- Plan distribution -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:14px;margin-bottom:16px">
          <div style="font-size:13px;font-weight:700;margin-bottom:10px">Plan Distribution</div>
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
            ${[
              { plan:'elite', label:'Elite', count: stats.elite, color:'var(--secondary)' },
              { plan:'pro',   label:'Pro',   count: stats.pro,   color:'var(--primary)'   },
              { plan:'basic', label:'Basic', count: stats.basic, color:'var(--success)'   },
            ].map(p => `
              <div style="text-align:center;flex:1">
                <div style="font-size:18px;font-weight:800;color:${p.color}">${p.count}</div>
                <div style="font-size:11px;color:var(--text-muted)">${p.label}</div>
              </div>`).join('')}
          </div>
          <div style="display:flex;height:8px;border-radius:99px;overflow:hidden;gap:2px">
            <div style="flex:${stats.elite};background:var(--secondary);border-radius:99px 0 0 99px"></div>
            <div style="flex:${stats.pro};background:var(--primary)"></div>
            <div style="flex:${stats.basic};background:var(--success);border-radius:0 99px 99px 0"></div>
          </div>
        </div>

        <!-- Check-ins leaderboard (top 5) -->
        <div style="font-size:13px;font-weight:700;margin-bottom:10px">🏆 Check-in Leaderboard</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
          ${members.slice(0,5).map((m, i) => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:14px">
              <div style="width:24px;height:24px;border-radius:50%;background:${i===0?'var(--warning)':i===1?'rgba(148,163,184,0.3)':i===2?'rgba(180,100,50,0.3)':'var(--surface-2)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;color:${i<3?'#fff':'var(--text-muted)'}">${i+1}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.name}</div>
                <div style="font-size:11px;color:var(--text-secondary)">${m.gymName} · ${m.city}</div>
              </div>
              <div style="flex-shrink:0;text-align:right">
                <div style="font-size:15px;font-weight:800;color:var(--primary)">${m.checkInsMonth}</div>
                <div style="font-size:10px;color:var(--text-muted)">check-ins</div>
              </div>
              <div style="width:60px">
                <div class="progress-bar" style="height:6px">
                  <div class="progress-fill" style="width:${Math.round(m.checkInsMonth/maxCI*100)}%"></div>
                </div>
              </div>
            </div>`).join('')}
        </div>

        <!-- Full members table -->
        <div style="font-size:13px;font-weight:700;margin-bottom:10px">All Members</div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
          <table class="admin-table">
            <thead><tr>
              <th>Member</th>
              <th>Gym · City</th>
              <th>Plan</th>
              <th style="text-align:right">CI/Mo</th>
            </tr></thead>
            <tbody>
              ${members.map(m => `
                <tr onclick="FP.pages.admin._memberDetail('${m.id}')" style="cursor:pointer">
                  <td>
                    <div style="font-weight:600;font-size:13px">${m.name}</div>
                    <div style="font-size:10px;color:var(--text-muted)">${m.id} · Joined ${new Date(m.joinDate).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</div>
                  </td>
                  <td style="font-size:11px;color:var(--text-secondary)">
                    <div>${m.gymName}</div>
                    <div>📍 ${m.area}, ${m.city}</div>
                  </td>
                  <td><span class="badge ${planColor[m.plan]}" style="font-size:10px">${planLabel[m.plan]}</span></td>
                  <td style="text-align:right;font-weight:800;color:var(--primary)">${m.checkInsMonth}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="text-align:center;padding:10px;font-size:12px;color:var(--text-muted)">Sorted by check-ins · ${stats.total} members across ${stats.cities} cities</div>
      </div>`;
  },

  _memberDetail(id) {
    const m = FP.data.members.find(x => x.id === id);
    if (!m) return;
    const planColor = { elite: 'var(--secondary)', pro: 'var(--primary)', basic: 'var(--success)' };
    const html = `
      <div class="modal-handle"></div>
      <h3 class="modal-title">👤 Member Profile</h3>
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
        <div class="avatar avatar-lg" style="font-size:20px">${m.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <div>
          <div style="font-size:16px;font-weight:800">${m.name}</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${m.gymName}</div>
          <div style="font-size:12px;color:var(--text-secondary)">📍 ${m.area}, ${m.city}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:18px">
        <div class="stat-card">
          <div class="stat-card-value" style="color:${planColor[m.plan]};font-size:16px">${m.plan.charAt(0).toUpperCase()+m.plan.slice(1)}</div>
          <div class="stat-card-label">Plan</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="font-size:20px;color:var(--primary)">${m.checkInsMonth}</div>
          <div class="stat-card-label">Check-ins/Mo</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="font-size:14px">${new Date(m.joinDate).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</div>
          <div class="stat-card-label">Joined</div>
        </div>
      </div>
      <div style="background:var(--surface-2);border-radius:12px;padding:12px;margin-bottom:18px">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px">MEMBER ID</div>
        <div style="font-size:13px;font-family:monospace;color:var(--primary)">${m.id}</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost btn-sm flex-1" onclick="FP.Toast.info('Email sent to member!')">📧 Email</button>
        <button class="btn btn-primary btn-sm flex-1" onclick="FP.Modal.close()">Done</button>
      </div>`;
    FP.Modal.show(html);
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
