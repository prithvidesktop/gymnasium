/* ============================================================
   FLEXPASS — SPLASH & ONBOARDING PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.splash = {
  _step: 0,

  slides: [
    {
      emoji: '🏋️',
      title: 'One Pass,\nEverywhere.',
      desc: 'Access 500+ gyms, yoga studios, swimming pools & more across India — with a single membership.',
      color: '#6C47FF'
    },
    {
      emoji: '📅',
      title: 'Book in\nSeconds.',
      desc: 'Real-time slot booking, QR check-ins, and instant confirmations. Fitness at your fingertips.',
      color: '#FF6B35'
    },
    {
      emoji: '🧠',
      title: 'AI-Powered\nWellness.',
      desc: 'Personalized workout plans, custom diet advice, and smart recommendations — all powered by AI.',
      color: '#00D68F'
    }
  ],

  render() {
    if (FP.User.isLoggedIn()) {
      /* Already logged in, show home */
      setTimeout(() => FP.Router.go('home'), 100);
      return `<div class="page-loader"><div class="spinner"></div></div>`;
    }

    return `
      <div style="height:100%;display:flex;flex-direction:column;background:var(--bg-gradient);position:relative;overflow:hidden">
        <!-- BG orbs -->
        <div style="position:absolute;top:-100px;right:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(108,71,255,0.2),transparent 70%);pointer-events:none"></div>
        <div style="position:absolute;bottom:-80px;left:-60px;width:250px;height:250px;background:radial-gradient(circle,rgba(255,107,53,0.15),transparent 70%);pointer-events:none"></div>
        
        <!-- Logo header -->
        <div style="padding:48px 24px 24px;display:flex;flex-direction:column;align-items:center;gap:12px">
          <div class="splash-logo">⚡</div>
          <div style="font-size:28px;font-weight:900;letter-spacing:-0.5px;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">FlexPass</div>
          <div style="font-size:13px;color:var(--text-muted);font-weight:500">Your fitness. Everywhere.</div>
        </div>

        <!-- Slides -->
        <div style="flex:1;overflow:hidden;position:relative" id="ob-slides-container">
          ${this.slides.map((s, i) => `
            <div class="onboarding-slide" id="ob-slide-${i}" style="position:absolute;inset:0;opacity:${i===0?1:0};transition:opacity 0.5s ease;pointer-events:${i===0?'all':'none'}">
              <div class="onboarding-illustration" style="background:radial-gradient(circle,${s.color}22,${s.color}08);border-color:${s.color}33">${s.emoji}</div>
              <h1 style="font-size:32px;font-weight:900;line-height:1.2;white-space:pre-line;margin-bottom:16px;text-align:center">${s.title}</h1>
              <p style="font-size:16px;color:var(--text-secondary);line-height:1.7;text-align:center;max-width:300px">${s.desc}</p>
            </div>`).join('')}
        </div>

        <!-- Dots & CTA -->
        <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:24px">
          <div class="onboarding-dots" id="ob-dots">
            ${this.slides.map((_, i) => `<div class="onboarding-dot ${i===0?'active':''}" id="ob-dot-${i}"></div>`).join('')}
          </div>
          <button class="btn btn-primary btn-xl btn-full" id="ob-next-btn">Get Started →</button>
          <button class="btn btn-ghost btn-full" onclick="FP.Router.go('auth')" style="font-size:14px">Already have an account? <span style="color:var(--primary);font-weight:700">Log in</span></button>
        </div>
      </div>`;
  },

  init() {
    if (FP.User.isLoggedIn()) return;
    this._step = 0;
    const btn = document.getElementById('ob-next-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (this._step < this.slides.length - 1) {
        this._goTo(this._step + 1);
      } else {
        FP.Router.go('auth');
      }
    });
  },

  _goTo(n) {
    const prev = this._step;
    this._step = n;

    /* Fade slides */
    const prevSlide = document.getElementById(`ob-slide-${prev}`);
    const nextSlide = document.getElementById(`ob-slide-${n}`);
    if (prevSlide) { prevSlide.style.opacity = '0'; prevSlide.style.pointerEvents = 'none'; }
    if (nextSlide) { nextSlide.style.opacity = '1'; nextSlide.style.pointerEvents = 'all'; }

    /* Update dots */
    document.querySelectorAll('.onboarding-dot').forEach((d, i) => {
      d.classList.toggle('active', i === n);
    });

    /* Update button */
    const btn = document.getElementById('ob-next-btn');
    if (btn) btn.textContent = n === this.slides.length - 1 ? 'Start Free Trial →' : 'Next →';
  }
};
