/* ============================================================
   FLEXPASS — WELLNESS PAGE (with NVIDIA NIM AI Coach)
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.wellness = {
  _tab:     'workout',   /* workout | diet | tracker | coach */
  _weekDay: 0,

  render() {
    const user     = FP.User.get() || {};
    const goals    = user.goals || ['weight_loss'];
    const plan     = FP.data.getWorkoutPlan(goals);
    const diet     = FP.data.getDietPlan(goals);
    const activity = FP.data.weeklyActivity;

    return `
      <div class="page-enter" style="padding-bottom:80px">

        <!-- Header -->
        <div style="padding:20px 16px 16px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
            <div>
              <h1 style="font-size:22px;font-weight:900">AI Wellness 🧠</h1>
              <p style="font-size:13px;color:var(--text-secondary)">Powered by NVIDIA Llama 3.3</p>
            </div>
            <div class="streak-display" aria-label="${user.streakDays || 0} day streak">🔥 ${user.streakDays || 0} day streak</div>
          </div>

          <!-- Tabs -->
          <div style="display:flex;background:var(--surface-2);border-radius:14px;padding:4px;gap:3px"
               role="tablist" aria-label="Wellness sections">
            ${[['workout','💪 Workout'],['diet','🥗 Diet'],['tracker','📊 Tracker'],['coach','🤖 AI Coach']].map(([id,label]) => `
              <button style="flex:1;text-align:center;padding:10px 4px;border-radius:10px;cursor:pointer;font-size:11px;font-weight:700;transition:all 0.2s;border:none;font-family:var(--font);
                          background:${this._tab===id?'var(--primary)':'transparent'};
                          color:${this._tab===id?'#fff':'var(--text-muted)'}"
                   onclick="FP.pages.wellness._setTab('${id}')"
                   role="tab" aria-selected="${this._tab===id}" aria-controls="wellness-panel"
                   id="tab-${id}">
                ${label}
              </button>`).join('')}
          </div>
        </div>

        <div id="wellness-panel" role="tabpanel">
          ${this._tab === 'workout' ? this._renderWorkout(plan, user)  :
            this._tab === 'diet'    ? this._renderDiet(diet)            :
            this._tab === 'tracker' ? this._renderTracker(user, activity) :
            this._renderCoach()}
        </div>
      </div>`;
  },

  /* ── AI COACH TAB ──────────────────────────────────────── */
  _renderCoach() {
    return `
      <div style="display:flex;flex-direction:column;height:calc(100dvh - 240px);min-height:400px">

        <!-- Chat history -->
        <div id="coach-messages"
             style="flex:1;overflow-y:auto;padding:0 16px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth"
             aria-live="polite" aria-label="AI Coach conversation">

          <!-- Welcome card -->
          <div style="background:var(--gradient-card);border:1px solid rgba(108,71,255,0.2);border-radius:20px;padding:18px;margin-bottom:4px">
            <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
              <div style="width:44px;height:44px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🤖</div>
              <div>
                <div style="font-size:15px;font-weight:800">FlexPass AI Coach</div>
                <div style="font-size:12px;color:var(--success);display:flex;align-items:center;gap:4px">
                  <span style="width:7px;height:7px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite"></span>
                  Powered by NVIDIA Llama 3.3 · Online
                </div>
              </div>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:14px">
              Hey ${(FP.User.get()?.name||'').split(' ')[0] || 'there'}! 👋 I'm your personal AI fitness coach.
              Ask me anything about workouts, nutrition, recovery, or your FlexPass goals.
            </p>
            <!-- Quick prompts -->
            <div style="display:flex;flex-wrap:wrap;gap:7px">
              ${[
                '💪 Build a chest workout for me',
                '🥗 Suggest a high-protein breakfast',
                '🔥 How do I break a weight-loss plateau?',
                '😴 Best recovery tips after HIIT',
              ].map(q => `
                <button onclick="FP.pages.wellness._sendQuickPrompt(this)"
                        style="padding:7px 12px;background:rgba(108,71,255,0.12);border:1px solid rgba(108,71,255,0.25);border-radius:20px;font-size:12px;font-weight:600;color:var(--primary);cursor:pointer;font-family:var(--font);white-space:nowrap;transition:all 0.2s"
                        data-prompt="${q.replace(/^[^\s]+\s/, '')}">
                  ${q}
                </button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Input bar -->
        <div style="padding:12px 16px;border-top:1px solid var(--border);background:var(--surface);flex-shrink:0">
          <div style="display:flex;gap:8px;align-items:flex-end">
            <div style="flex:1;position:relative">
              <textarea id="coach-input"
                placeholder="Ask your AI coach anything..."
                rows="1"
                style="width:100%;padding:12px 16px;background:var(--surface-2);border:1.5px solid var(--border);border-radius:20px;color:var(--text);font-size:14px;resize:none;font-family:var(--font);line-height:1.5;max-height:120px;overflow-y:auto;display:block"
                onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();FP.pages.wellness._sendMessage()}"
                oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"
                aria-label="Message to AI coach"></textarea>
            </div>
            <button id="coach-send-btn"
                    onclick="FP.pages.wellness._sendMessage()"
                    style="width:44px;height:44px;border-radius:50%;background:var(--gradient-primary);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;transition:all 0.2s;box-shadow:var(--shadow-primary)"
                    aria-label="Send message">
              ➤
            </button>
          </div>
          <div style="font-size:10px;color:var(--text-muted);text-align:center;margin-top:7px">
            AI responses are for guidance only · Not medical advice
          </div>
        </div>

      </div>`;
  },

  /* ── Send a quick prompt from the suggestion chips ─────── */
  _sendQuickPrompt(btn) {
    const input = document.getElementById('coach-input');
    if (input) {
      input.value = btn.dataset.prompt;
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }
    this._sendMessage();
  },

  /* ── Send message to AI and stream the response ─────────── */
  async _sendMessage() {
    const input   = document.getElementById('coach-input');
    const sendBtn = document.getElementById('coach-send-btn');
    const msgs    = document.getElementById('coach-messages');
    if (!input || !msgs) return;

    const text = input.value.trim();
    if (!text) return;

    /* Disable input while waiting */
    input.value    = '';
    input.style.height = 'auto';
    input.disabled = true;
    if (sendBtn) { sendBtn.disabled = true; sendBtn.style.opacity = '0.5'; }

    /* Append user bubble */
    msgs.appendChild(this._userBubble(text));
    msgs.scrollTop = msgs.scrollHeight;

    /* AI typing indicator */
    const typingId = 'coach-typing-' + Date.now();
    msgs.appendChild(this._typingBubble(typingId));
    msgs.scrollTop = msgs.scrollHeight;

    /* AI response bubble (will be streamed into) */
    const replyId  = 'coach-reply-' + Date.now();
    let   replyEl  = null;

    try {
      await FP.AI.chat(text, (delta, full) => {
        /* On first chunk: replace typing with actual reply */
        if (!replyEl) {
          const typingEl = document.getElementById(typingId);
          if (typingEl) typingEl.remove();
          replyEl = this._aiBubble(replyId);
          msgs.appendChild(replyEl);
        }
        /* Stream into bubble */
        const content = replyEl.querySelector('.ai-content');
        if (content) content.innerHTML = this._formatMarkdown(full);
        msgs.scrollTop = msgs.scrollHeight;
      });
    } catch (err) {
      /* Remove typing and show error */
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      if (replyEl) replyEl.remove();
      msgs.appendChild(this._errorBubble(err.message));
      console.error('[FlexPass AI]', err);
    }

    /* Re-enable input */
    input.disabled = false;
    if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = '1'; }
    input.focus();
    msgs.scrollTop = msgs.scrollHeight;
  },

  /* ── Bubble render helpers ─────────────────────────────── */
  _userBubble(text) {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;justify-content:flex-end';
    el.innerHTML = `
      <div style="max-width:80%;padding:12px 16px;background:var(--primary);border-radius:18px 18px 4px 18px;font-size:14px;color:#fff;line-height:1.6">
        ${this._escapeHtml(text)}
      </div>`;
    return el;
  },

  _aiBubble(id) {
    const el = document.createElement('div');
    el.id = id;
    el.style.cssText = 'display:flex;gap:10px;align-items:flex-start';
    el.innerHTML = `
      <div style="width:34px;height:34px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🤖</div>
      <div style="flex:1;min-width:0;background:var(--card);border:1px solid var(--border);border-radius:4px 18px 18px 18px;padding:12px 16px">
        <div class="ai-content" style="font-size:14px;color:var(--text);line-height:1.7"></div>
      </div>`;
    return el;
  },

  _typingBubble(id) {
    const el = document.createElement('div');
    el.id = id;
    el.style.cssText = 'display:flex;gap:10px;align-items:center';
    el.innerHTML = `
      <div style="width:34px;height:34px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🤖</div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:4px 18px 18px 18px;padding:12px 18px;display:flex;gap:5px;align-items:center">
        ${[0,1,2].map(i => `<span style="width:8px;height:8px;border-radius:50%;background:var(--primary);display:inline-block;animation:pulse 1.2s ${i*0.2}s infinite"></span>`).join('')}
      </div>`;
    return el;
  },

  _errorBubble(msg) {
    const el = document.createElement('div');
    el.style.cssText = 'padding:12px 16px;background:var(--error-bg);border:1px solid var(--error);border-radius:14px;font-size:13px;color:var(--error)';
    el.textContent = `⚠️ Error: ${msg || 'Could not reach AI. Check your connection.'}`;
    return el;
  },

  /* ── Markdown → HTML (minimal, safe) ──────────────────── */
  _formatMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      /* Bold */
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      /* Italic */
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      /* Code inline */
      .replace(/`(.+?)`/g, '<code style="background:var(--surface-2);padding:2px 6px;border-radius:4px;font-size:12px">$1</code>')
      /* Bullet lists */
      .replace(/^[-•] (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
      .replace(/(<li[^>]*>.*<\/li>)/s, '<ul style="padding-left:20px;margin:8px 0">$1</ul>')
      /* Numbered lists */
      .replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
      /* Headings */
      .replace(/^### (.+)$/gm, '<h3 style="font-size:14px;font-weight:700;margin:10px 0 4px">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="font-size:15px;font-weight:800;margin:12px 0 4px">$1</h2>')
      /* Line breaks */
      .replace(/\n\n/g, '</p><p style="margin:8px 0">')
      .replace(/\n/g, '<br>');
  },

  _escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  /* ── WORKOUT TAB ────────────────────────────────────────── */
  _renderWorkout(plan, user) {
    const days     = plan.schedule;
    const today    = new Date().getDay();
    const todayIdx = today === 0 ? 6 : today - 1;

    return `
      <!-- Plan header -->
      <div style="margin:0 16px 20px;background:var(--gradient-card);border:1px solid rgba(108,71,255,0.2);border-radius:20px;padding:18px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:52px;height:52px;background:var(--gradient-primary);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px" aria-hidden="true">${plan.emoji}</div>
          <div>
            <div style="font-size:16px;font-weight:800">${plan.title}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${plan.subtitle}</div>
            <div style="display:flex;gap:8px;margin-top:6px">
              <span class="badge badge-primary">AI Generated</span>
              <span class="badge badge-ghost">${days.reduce((s,d)=>s+d.duration,0)} min/week</span>
            </div>
          </div>
        </div>
        <button onclick="FP.pages.wellness._askCoachAboutWorkout('${plan.title}')"
                style="margin-top:12px;width:100%;padding:10px;background:rgba(108,71,255,0.12);border:1px solid rgba(108,71,255,0.3);border-radius:12px;font-size:13px;font-weight:600;color:var(--primary);cursor:pointer;font-family:var(--font)">
          🤖 Ask AI Coach about this plan →
        </button>
      </div>

      <!-- Week day selector -->
      <div style="overflow-x:auto;padding:0 16px;margin-bottom:16px;scrollbar-width:none"
           role="group" aria-label="Select workout day">
        <div style="display:flex;gap:8px;min-width:max-content">
          ${days.map((d, i) => `
            <button onclick="FP.pages.wellness._setDay(${i})"
                    aria-pressed="${i===this._weekDay}"
                    aria-label="${d.day}, ${d.duration > 0 ? d.duration + ' min, ' + d.calories + ' kcal' : 'Rest day'}"
                    style="text-align:center;padding:10px 12px;border-radius:14px;cursor:pointer;transition:all 0.2s;font-family:var(--font);border:1.5px solid;
                           background:${i===this._weekDay?'var(--primary)':i===todayIdx?'rgba(108,71,255,0.1)':'var(--surface-2)'};
                           border-color:${i===this._weekDay?'var(--primary)':i===todayIdx?'var(--primary)':'var(--border)'};
                           color:${i===this._weekDay?'#fff':'var(--text)'}">
              <div style="font-size:11px;font-weight:600;opacity:0.8">${d.day}</div>
              <div style="font-size:18px;margin:4px 0" aria-hidden="true">${d.duration>0?'💪':'😴'}</div>
              <div style="font-size:10px;opacity:0.7">${d.calories}kcal</div>
            </button>`).join('')}
        </div>
      </div>

      <!-- Day Detail -->
      ${(() => {
        const d = days[this._weekDay];
        if (!d || d.exercises.length === 0) return `
          <div style="text-align:center;padding:32px">
            <div style="font-size:48px;margin-bottom:12px" aria-hidden="true">😴</div>
            <div style="font-size:16px;font-weight:700">Rest Day</div>
            <div style="font-size:13px;color:var(--text-secondary);margin-top:6px;max-width:280px;margin-left:auto;margin-right:auto;line-height:1.6">
              Recovery is just as important as training. Stretch, hydrate, and sleep well.
            </div>
          </div>`;
        return `
          <div style="padding:0 16px">
            <div class="workout-card">
              <div class="workout-day-header">
                <div class="workout-day-badge" aria-hidden="true">${d.day}</div>
                <div>
                  <div style="font-size:16px;font-weight:800">${d.focus}</div>
                  <div style="display:flex;gap:12px;margin-top:3px">
                    <span style="font-size:12px;color:var(--text-secondary)">⏱️ ${d.duration} min</span>
                    <span style="font-size:12px;color:var(--warning)">🔥 ${d.calories} kcal</span>
                  </div>
                </div>
              </div>
              <div role="list" aria-label="${d.focus} exercises">
                ${d.exercises.map(ex => `
                  <div class="exercise-item" role="listitem">
                    <div class="exercise-icon" aria-hidden="true">${ex.emoji}</div>
                    <div style="flex:1">
                      <div class="exercise-name">${ex.name}</div>
                      <div class="exercise-sets">${ex.sets}</div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
                      <span class="badge ${ex.type==='cardio'?'badge-orange':ex.type==='strength'?'badge-primary':ex.type==='yoga'?'badge-success':'badge-ghost'}">${ex.type}</span>
                      <button onclick="FP.pages.wellness._getExerciseTip('${ex.name}', this)"
                              style="font-size:10px;color:var(--primary);background:none;border:none;cursor:pointer;font-family:var(--font);padding:0" aria-label="Get AI tip for ${ex.name}">
                        💡 AI Tip
                      </button>
                    </div>
                  </div>`).join('')}
              </div>
              <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="FP.Router.go('explore')">
                Book a Session for This 📅
              </button>
            </div>
          </div>`;
      })()}

      <!-- Badges -->
      <div style="padding:20px 16px 0">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">🏅 Your Badges</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px" role="list">
          ${Object.entries(FP.User.badgeDefs).map(([id, def]) => {
            const earned = (FP.User.get()?.badges || []).includes(id);
            return `<div class="badge-award ${earned?'earned':''}" role="listitem" title="${def.desc}" aria-label="${def.label}${earned?' - Earned':' - Locked'}">
              <div style="font-size:28px;${!earned?'filter:grayscale(1);opacity:0.4':''}" aria-hidden="true">${def.emoji}</div>
              <div class="badge-award-name">${def.label}</div>
              ${earned?'<span class="badge badge-warning" style="font-size:9px">Earned!</span>':''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  /* ── Ask coach about workout plan ─────────────────────── */
  _askCoachAboutWorkout(planTitle) {
    this._tab = 'coach';
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML = this.render();
      this.init();
      /* Pre-fill input */
      setTimeout(() => {
        const input = document.getElementById('coach-input');
        if (input) {
          input.value = `Tell me more about the "${planTitle}" plan and how to maximize results.`;
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 120) + 'px';
          input.focus();
        }
      }, 100);
    }
  },

  /* ── Get inline exercise tip ───────────────────────────── */
  async _getExerciseTip(exerciseName, btn) {
    btn.textContent = '⏳ Loading...';
    btn.disabled    = true;
    try {
      const tip = await FP.AI.getWorkoutTip(exerciseName);
      /* Find the exercise item and append tip */
      const item = btn.closest('.exercise-item');
      if (item) {
        let tipEl = item.querySelector('.ai-inline-tip');
        if (!tipEl) {
          tipEl = document.createElement('div');
          tipEl.className = 'ai-inline-tip';
          tipEl.style.cssText = 'grid-column:1/-1;font-size:12px;color:var(--text-secondary);line-height:1.6;padding:8px 12px;background:rgba(108,71,255,0.08);border-radius:10px;margin-top:8px;border-left:3px solid var(--primary)';
          item.appendChild(tipEl);
        }
        tipEl.innerHTML = `💡 <strong>AI Tip:</strong> ${tip}`;
      }
    } catch (e) {
      FP.Toast.error('Could not fetch tip. Check your connection.');
    }
    btn.textContent = '💡 AI Tip';
    btn.disabled    = false;
  },

  /* ── DIET TAB ───────────────────────────────────────────── */
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
            <div style="font-size:22px;font-weight:900;color:var(--success)" aria-label="${diet.calories} calories per day">${diet.calories}</div>
            <div style="font-size:11px;color:var(--text-muted)">kcal/day</div>
          </div>
        </div>
        <!-- Macros -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px" role="list" aria-label="Macronutrients">
          ${[['Protein',diet.protein,'g','var(--primary)'],['Carbs',diet.carbs,'g','var(--warning)'],['Fats',diet.fats,'g','var(--secondary)']].map(([label,val,unit,color]) => `
            <div style="background:rgba(255,255,255,0.06);border-radius:10px;padding:10px;text-align:center" role="listitem" aria-label="${val}${unit} ${label}">
              <div style="font-size:18px;font-weight:800;color:${color}">${val}${unit}</div>
              <div style="font-size:11px;color:var(--text-muted)">${label}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Meals -->
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:12px" role="list" aria-label="Meal plan">
        ${diet.meals.map(m => `
          <div class="card" style="padding:14px" role="listitem">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:22px" aria-hidden="true">${m.emoji}</span>
                <div>
                  <div style="font-size:14px;font-weight:700">${m.label}</div>
                  <div style="font-size:12px;color:var(--text-muted)">⏰ ${m.time}</div>
                </div>
              </div>
              <span class="badge badge-warning" aria-label="${m.kcal} calories">${m.kcal} kcal</span>
            </div>
            <ul style="padding-left:24px;display:flex;flex-direction:column;gap:4px">
              ${m.items.map(item => `<li style="font-size:13px;color:var(--text-secondary)">${item}</li>`).join('')}
            </ul>
            <button onclick="FP.pages.wellness._getMealIdeas('${m.label}', ${m.kcal}, this)"
                    style="margin-top:10px;width:100%;padding:8px;background:rgba(0,214,143,0.1);border:1px solid rgba(0,214,143,0.25);border-radius:10px;font-size:12px;font-weight:600;color:var(--success);cursor:pointer;font-family:var(--font)">
              🤖 Get AI meal ideas for ${m.label}
            </button>
            <div class="meal-ai-ideas" style="display:none;margin-top:8px;font-size:13px;color:var(--text-secondary);line-height:1.7;padding:10px;background:var(--surface-2);border-radius:10px"></div>
          </div>`).join('')}
      </div>`;
  },

  /* ── Get meal suggestions inline ─────────────────────── */
  async _getMealIdeas(mealType, kcal, btn) {
    const card = btn.closest('.card');
    const ideasEl = card?.querySelector('.meal-ai-ideas');
    if (!ideasEl) return;

    btn.textContent = '⏳ Getting AI suggestions...';
    btn.disabled    = true;
    ideasEl.style.display = 'block';
    ideasEl.innerHTML = '<span style="opacity:0.6">Thinking...</span>';

    try {
      const suggestion = await FP.AI.getMealSuggestion(mealType, kcal);
      ideasEl.innerHTML = `<strong>🤖 AI Suggestions:</strong><br>${suggestion.replace(/\n/g, '<br>')}`;
    } catch (e) {
      ideasEl.innerHTML = '<span style="color:var(--error)">⚠️ Could not fetch suggestions.</span>';
    }

    btn.textContent = `🤖 Get AI meal ideas for ${mealType}`;
    btn.disabled    = false;
  },

  /* ── TRACKER TAB ────────────────────────────────────────── */
  _renderTracker(user, activity) {
    const maxCal = Math.max(...activity.calories) || 1;
    return `
      <!-- Ring stats -->
      <div style="padding:0 16px 20px">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px" role="list" aria-label="Today's activity stats">
          <div class="stat-card" role="listitem">
            <div style="font-size:24px;margin-bottom:4px" aria-hidden="true">🏃</div>
            <div style="font-size:18px;font-weight:800;color:var(--primary)" aria-label="${(user.stepsToday||0).toLocaleString()} steps">${(user.stepsToday||0).toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text-muted)">Steps Today</div>
            <div class="progress-bar" style="margin-top:8px" role="progressbar" aria-valuenow="${Math.min(100,(user.stepsToday||0)/10000*100)}" aria-valuemin="0" aria-valuemax="100" aria-label="Steps progress">
              <div class="progress-fill" style="width:${Math.min(100,(user.stepsToday||0)/10000*100)}%"></div>
            </div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 10,000</div>
          </div>
          <div class="stat-card" role="listitem">
            <div style="font-size:24px;margin-bottom:4px" aria-hidden="true">🔥</div>
            <div style="font-size:18px;font-weight:800;color:var(--secondary)" aria-label="${((user.caloriesThisWeek||0)/7).toFixed(0)} average calories burned per day">${((user.caloriesThisWeek||0)/7).toFixed(0)}</div>
            <div style="font-size:11px;color:var(--text-muted)">Kcal/Day Avg</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:75%;background:var(--secondary)"></div></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 500</div>
          </div>
          <div class="stat-card" role="listitem">
            <div style="font-size:24px;margin-bottom:4px" aria-hidden="true">💧</div>
            <div style="font-size:18px;font-weight:800;color:var(--info)">2.4L</div>
            <div style="font-size:11px;color:var(--text-muted)">Water Today</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:60%;background:var(--info)"></div></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Goal: 4L</div>
          </div>
        </div>

        <!-- Weekly Bar Chart (CSS only) -->
        <div class="chart-wrapper" style="padding:16px;margin:0 0 16px" role="img" aria-label="Weekly calories burned bar chart">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div style="font-size:15px;font-weight:700">Weekly Calories Burned</div>
            <span class="badge badge-primary" aria-label="${user.caloriesThisWeek || 0} calories this week">${user.caloriesThisWeek || 0} kcal</span>
          </div>
          <div style="display:flex;align-items:flex-end;gap:6px;height:80px" aria-hidden="true">
            ${activity.calories.map((cal, i) => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                <div style="width:100%;background:${i===new Date().getDay()-1||i===6&&new Date().getDay()===0?'var(--primary)':'rgba(108,71,255,0.35)'};border-radius:6px 6px 0 0;height:${Math.round(cal/maxCal*70)}px;transition:all 0.5s;min-height:4px"></div>
                <div style="font-size:10px;color:var(--text-muted)">${activity.labels[i]}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Sessions -->
        <div class="chart-wrapper" style="padding:16px;margin:0 0 16px">
          <div style="font-size:15px;font-weight:700;margin-bottom:12px">Sessions This Week</div>
          <div style="display:flex;gap:6px" role="list" aria-label="Session completion by day">
            ${activity.sessions.map((s, i) => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px" role="listitem" aria-label="${activity.labels[i]}: ${s ? 'completed' : 'not completed'}">
                <div style="width:36px;height:36px;border-radius:50%;background:${s?'var(--gradient-primary)':'var(--surface-2)'};border:2px solid ${s?'var(--primary)':'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:14px" aria-hidden="true">${s?'✓':''}</div>
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
            <span style="font-size:24px" aria-hidden="true">${t.emoji}</span>
            <span style="font-size:13px;color:var(--text-secondary);line-height:1.6">${t.tip}</span>
          </div>`).join('')}
      </div>`;
  },

  _setTab(tab) {
    if (tab !== 'coach') FP.AI.clearHistory();
    this._tab = tab;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _setDay(i) {
    this._weekDay = i;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); }
  },

  init() { /* all handlers are inline */ }
};
