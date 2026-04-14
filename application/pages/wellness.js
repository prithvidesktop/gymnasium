/* ============================================================
   FLEXPASS — WELLNESS PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.wellness = {
  _tab: 'workout',   /* workout | diet | tracker */
  _weekDay: 0,       /* 0 = Mon */

  render() {
    const user  = FP.User.get() || {};
    const goals = user.goals || ['weight_loss'];
    const plan  = FP.data.getWorkoutPlan(goals);
    const diet  = FP.data.getDietPlan(goals);
    const activity = FP.data.weeklyActivity;

    return `
      <div class="page-enter" style="padding-bottom:80px">
        <!-- Header -->
        <div style="padding:20px 16px 16px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
            <div>
              <h1 style="font-size:22px;font-weight:900">AI Wellness 🧠</h1>
              <p style="font-size:13px;color:var(--text-secondary)">Personalized for your goals</p>
            </div>
            <div class="streak-display">🔥 ${user.streakDays || 0} day streak</div>
          </div>

          <!-- Tabs -->
          <div style="display:flex;background:var(--surface-2);border-radius:14px;padding:4px;gap:3px">
            ${[['workout','💪 Workout'],['diet','🥗 Diet'],['tracker','📊 Tracker']].map(([id,label]) => `
              <div style="flex:1;text-align:center;padding:10px 6px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;transition:all 0.2s;
                          background:${this._tab===id?'var(--primary)':'transparent'};
                          color:${this._tab===id?'#fff':'var(--text-muted)'}"
                   onclick="FP.pages.wellness._setTab('${id}')">
                ${label}
              </div>`).join('')}
          </div>
        </div>

        ${this._tab === 'workout' ? this._renderWorkout(plan, user) :
          this._tab === 'diet'    ? this._renderDiet(diet) :
          this._renderTracker(user, activity)}
      </div>`;
  },

  _renderWorkout(plan, user) {
    const days = plan.schedule;
    const today = new Date().getDay(); /* 0=Sun */
    /* Map to Mon-Sun (0=Mon) */
    const todayIdx = today === 0 ? 6 : today - 1;

    return `
      <!-- Plan header -->
      <div style="margin:0 16px 20px;background:var(--gradient-card);border:1px solid rgba(108,71,255,0.2);border-radius:20px;padding:18px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:52px;height:52px;background:var(--gradient-primary);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px">${plan.emoji}</div>
          <div>
            <div style="font-size:16px;font-weight:800">${plan.title}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${plan.subtitle}</div>
            <div style="display:flex;gap:8px;margin-top:6px">
              <span class="badge badge-primary">AI Generated</span>
              <span class="badge badge-ghost">${days.reduce((s,d)=>s+d.duration,0)} min/week</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Week day selector -->
      <div style="overflow-x:auto;padding:0 16px;margin-bottom:16px;scrollbar-width:none">
        <div style="display:flex;gap:8px;min-width:max-content">
          ${days.map((d, i) => `
            <div onclick="FP.pages.wellness._setDay(${i})" style="text-align:center;padding:10px 12px;border-radius:14px;cursor:pointer;transition:all 0.2s;
                         background:${i===this._weekDay?'var(--primary)':i===todayIdx?'rgba(108,71,255,0.1)':'var(--surface-2)'};
                         border:1.5px solid ${i===this._weekDay?'var(--primary)':i===todayIdx?'var(--primary)':'var(--border)'};
                         color:${i===this._weekDay?'#fff':'var(--text)'}">
              <div style="font-size:11px;font-weight:600;opacity:0.8">${d.day}</div>
              <div style="font-size:18px;margin:4px 0">${d.duration>0?'💪':'😴'}</div>
              <div style="font-size:10px;opacity:0.7">${d.calories}kcal</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Day Detail -->
      ${(() => {
        const d = days[this._weekDay];
        if (!d || d.exercises.length === 0) return `
          <div style="text-align:center;padding:32px">
            <div style="font-size:48px;margin-bottom:12px">😴</div>
            <div style="font-size:16px;font-weight:700">Rest Day</div>
            <div style="font-size:13px;color:var(--text-secondary);margin-top:6px">Recovery is just as important as training. Stretch, hydrate, and sleep well.</div>
          </div>`;
        return `
          <div style="padding:0 16px">
            <div class="workout-card">
              <div class="workout-day-header">
                <div class="workout-day-badge">${d.day}</div>
                <div>
                  <div style="font-size:16px;font-weight:800">${d.focus}</div>
                  <div style="display:flex;gap:12px;margin-top:3px">
                    <span style="font-size:12px;color:var(--text-secondary)">⏱️ ${d.duration} min</span>
                    <span style="font-size:12px;color:var(--warning)">🔥 ${d.calories} kcal</span>
                  </div>
                </div>
              </div>
              <div>
                ${d.exercises.map(ex => `
                  <div class="exercise-item">
                    <div class="exercise-icon">${ex.emoji}</div>
                    <div style="flex:1">
                      <div class="exercise-name">${ex.name}</div>
                      <div class="exercise-sets">${ex.sets}</div>
                    </div>
                    <span class="badge ${ex.type==='cardio'?'badge-orange':ex.type==='strength'?'badge-primary':ex.type==='yoga'?'badge-success':'badge-ghost'}" style="flex-shrink:0">${ex.type}</span>
                  </div>`).join('')}
              </div>
              <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="FP.Router.go('explore')">Book a Session for This 📅</button>
            </div>
          </div>`;
      })()}

      <!-- Badges -->
      <div style="padding:20px 16px 0">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">🏅 Your Badges</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${Object.entries(FP.User.badgeDefs).map(([id, def]) => {
            const earned = (FP.User.get()?.badges || []).includes(id);
            return `<div class="badge-award ${earned?'earned':''}" title="${def.desc}">
              <div style="font-size:28px;${!earned?'filter:grayscale(1);opacity:0.4':''}">${def.emoji}</div>
              <div class="badge-award-name">${def.label}</div>
              ${earned?'<span class="badge badge-warning" style="font-size:9px">Earned!</span>':''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  _renderDiet(diet) {
    return `
      <!-- Diet header -->
      <div style="margin:0 16px 20px;background:var(--success-bg);border:1px solid rgba(0,214,143,0.25);border-radius:20px;padding:18px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <div style="font-size:15px;font-weight:800">🥗 ${diet.title}</div>
            <div style="font-size:12px;color:var(--text-secondary)">AI-personalized nutrition plan</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:22px;font-weight:900;color:var(--success)">${diet.calories}</div>
            <div style="font-size:11px;color:var(--text-muted)">kcal/day</div>
          </div>
        </div>
        <!-- Macros -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${[['Protein',diet.protein,'g','var(--primary)'],['Carbs',diet.carbs,'g','var(--warning)'],['Fats',diet.fats,'g','var(--secondary)']].map(([label,val,unit,color]) => `
            <div style="background:rgba(255,255,255,0.06);border-radius:10px;padding:10px;text-align:center">
              <div style="font-size:18px;font-weight:800;color:${color}">${val}${unit}</div>
              <div style="font-size:11px;color:var(--text-muted)">${label}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Meals -->
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:12px">
        ${diet.meals.map(m => `
          <div class="card" style="padding:14px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:22px">${m.emoji}</span>
                <div>
                  <div style="font-size:14px;font-weight:700">${m.label}</div>
                  <div style="font-size:12px;color:var(--text-muted)">⏰ ${m.time}</div>
                </div>
              </div>
              <span class="badge badge-warning">${m.kcal} kcal</span>
            </div>
            <ul style="padding-left:24px;display:flex;flex-direction:column;gap:4px">
              ${m.items.map(item => `<li style="font-size:13px;color:var(--text-secondary)">${item}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>`;
  },

  _renderTracker(user, activity) {
    const maxCal = Math.max(...activity.calories) || 1;
    return `
      <!-- Ring stats -->
      <div style="padding:0 16px 20px">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
          <div class="stat-card">
            <div style="font-size:24px;margin-bottom:4px">🏃</div>
            <div style="font-size:18px;font-weight:800;color:var(--primary)">${(user.stepsToday||0).toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text-muted)">Steps Today</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${Math.min(100,(user.stepsToday||0)/10000*100)}%"></div></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 10,000</div>
          </div>
          <div class="stat-card">
            <div style="font-size:24px;margin-bottom:4px">🔥</div>
            <div style="font-size:18px;font-weight:800;color:var(--secondary)">${((user.caloriesThisWeek||0)/7).toFixed(0)}</div>
            <div style="font-size:11px;color:var(--text-muted)">Kcal/Day Avg</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:75%;background:var(--secondary)"></div></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 500</div>
          </div>
          <div class="stat-card">
            <div style="font-size:24px;margin-bottom:4px">💧</div>
            <div style="font-size:18px;font-weight:800;color:var(--info)">2.4L</div>
            <div style="font-size:11px;color:var(--text-muted)">Water Today</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:60%;background:var(--info)"></div></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 4L</div>
          </div>
        </div>

        <!-- Weekly Bar Chart (CSS only) -->
        <div class="chart-wrapper" style="padding:16px;margin:0 0 16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div style="font-size:15px;font-weight:700">Weekly Calories Burned</div>
            <span class="badge badge-primary">${user.caloriesThisWeek || 0} kcal</span>
          </div>
          <div style="display:flex;align-items:flex-end;gap:6px;height:80px">
            ${activity.calories.map((cal, i) => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                <div style="width:100%;background:${i===new Date().getDay()-1||i===6&&new Date().getDay()===0?'var(--primary)':'rgba(108,71,255,0.35)'};border-radius:6px 6px 0 0;height:${Math.round(cal/maxCal*70)}px;transition:all 0.5s;min-height:4px"></div>
                <div style="font-size:10px;color:var(--text-muted)">${activity.labels[i]}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Activity sessions -->
        <div class="chart-wrapper" style="padding:16px;margin:0 0 16px">
          <div style="font-size:15px;font-weight:700;margin-bottom:12px">Sessions This Week</div>
          <div style="display:flex;gap:6px">
            ${activity.sessions.map((s, i) => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
                <div style="width:36px;height:36px;border-radius:50%;background:${s?'var(--gradient-primary)':'var(--surface-2)'};border:2px solid ${s?'var(--primary)':'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:14px">${s?'✓':''}</div>
                <div style="font-size:10px;color:var(--text-muted)">${activity.labels[i]}</div>
              </div>`).join('')}
          </div>
          <div style="margin-top:12px;font-size:13px;color:var(--text-secondary)">
            ${activity.sessions.reduce((a,b)=>a+b,0)} sessions completed · ${7-activity.sessions.reduce((a,b)=>a+b,0)} remaining
          </div>
        </div>

        <!-- Wellness tips -->
        <div style="font-size:15px;font-weight:700;margin-bottom:12px">Daily Wellness Tips</div>
        ${FP.data.wellnessTips.map(t => `
          <div style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:14px;margin-bottom:8px">
            <span style="font-size:24px">${t.emoji}</span>
            <span style="font-size:13px;color:var(--text-secondary);line-height:1.6">${t.tip}</span>
          </div>`).join('')}
      </div>`;
  },

  _setTab(tab) {
    this._tab = tab;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _setDay(i) {
    this._weekDay = i;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  init() { /* inline */ }
};
