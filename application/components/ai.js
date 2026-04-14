/* ============================================================
   FLEXPASS — AI SERVICE (NVIDIA NIM / OpenAI-compatible API)
   ============================================================ */
window.FP = window.FP || {};

FP.AI = {
  _BASE:    '/api/ai',   /* proxied through server.js → integrate.api.nvidia.com */
  _MODEL:   'meta/llama-3.3-70b-instruct',
  _KEY:     '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',
  _history: [],     /* chat history for the current session */

  /* ── Core: streaming chat completion ─────────────────── */
  async streamChat(messages, onChunk, opts = {}) {
    const body = {
      model:       this._MODEL,
      messages,
      temperature: opts.temperature ?? 0.7,
      top_p:       opts.top_p       ?? 0.9,
      max_tokens:  opts.max_tokens  ?? 800,
      stream:      true,
    };

    const res = await fetch(`${this._BASE}/chat/completions`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this._KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`NVIDIA API error ${res.status}: ${errText}`);
    }

    const reader = res.body.getReader();
    const dec    = new TextDecoder();
    let   full   = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = dec.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const json  = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content ?? '';
          if (delta) { full += delta; onChunk(delta, full); }
        } catch (_) {}
      }
    }
    return full;
  },

  /* ── Simple (non-streaming) completion for quick answers ─ */
  async complete(prompt, opts = {}) {
    const res = await fetch(`${this._BASE}/chat/completions`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this._KEY}`,
      },
      body: JSON.stringify({
        model:       this._MODEL,
        messages:    [{ role: 'user', content: prompt }],
        temperature: opts.temperature ?? 0.6,
        max_tokens:  opts.max_tokens  ?? 600,
        stream:      false,
      }),
    });
    if (!res.ok) throw new Error(`NVIDIA API error ${res.status}`);
    const json = await res.json();
    return json.choices?.[0]?.message?.content ?? '';
  },

  /* ── AI Coach: system prompt ──────────────────────────── */
  _systemPrompt() {
    const user  = FP.User.get() || {};
    const goals = (user.goals || ['weight_loss'])
      .map(g => FP.User.goals?.find(x => x.id === g)?.label || g)
      .join(', ');

    return `You are FlexPass AI Coach, a friendly and expert personal fitness trainer and nutritionist built into the FlexPass fitness app (India's leading multi-gym membership platform).

User Profile:
- Name: ${user.name || 'Fitness Enthusiast'}
- Goals: ${goals}
- Current streak: ${user.streakDays || 0} days
- Sessions this month: ${user.sessionsThisMonth || 0}
- Plan: ${user.plan || 'None (free tier)'}
- Location: ${user.location || 'India'}

Be concise, motivational, and practical. Use simple language with occasional emojis. 
Format responses with bullet points where helpful. 
Always end workout advice with a suggestion to book a session via FlexPass.
Do NOT mention competitor apps. Keep answers under 200 words unless the user asks for a detailed plan.`;
  },

  /* ── Public: send a coach message (streaming) ─────────── */
  async chat(userMessage, onChunk) {
    this._history.push({ role: 'user', content: userMessage });
    const messages = [
      { role: 'system', content: this._systemPrompt() },
      ...this._history.slice(-12),   /* keep last 6 turns */
    ];
    const reply = await this.streamChat(messages, onChunk, { max_tokens: 500 });
    this._history.push({ role: 'assistant', content: reply });
    return reply;
  },

  clearHistory() { this._history = []; },

  /* ── Quick workout tip (non-streaming) ────────────────── */
  async getWorkoutTip(exercise) {
    const user  = FP.User.get() || {};
    return this.complete(
      `Give a 2-sentence form tip for "${exercise}" for someone with goal: ${(user.goals||['weight_loss'])[0]}. Be specific and practical.`,
      { max_tokens: 120, temperature: 0.5 }
    );
  },

  /* ── Meal suggestion (non-streaming) ─────────────────── */
  async getMealSuggestion(mealType, calories) {
    const user  = FP.User.get() || {};
    return this.complete(
      `Suggest a healthy ${mealType} meal (~${calories} kcal) for someone in India with goal: ${(user.goals||['weight_loss'])[0]}. List 3-4 specific food items with rough quantities. Be brief.`,
      { max_tokens: 150, temperature: 0.6 }
    );
  },
};
