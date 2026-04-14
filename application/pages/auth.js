/* ============================================================
   FLEXPASS — AUTHENTICATION  (v2 — Security hardened)
   ✅ Sign up / Login with full validation
   ✅ Email verification flow (simulated OTP to email)
   ✅ Password reset flow (email OTP → new password)
   ✅ Google OAuth (simulated)
   ✅ Client-side rate limiting (brute force protection)
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

/* ============================================================
   AUTH SECURITY MODULE  (rate limiter + validators)
   ============================================================ */
FP.Auth = {
  /* ── Rate limiting ──────────────────────────────────────── */
  RL_KEY:          'fp_auth_rl',
  MAX_ATTEMPTS:    5,
  LOCKOUT_MS:      15 * 60 * 1000,   /* 15 min */
  OTP_RESEND_MS:   60 * 1000,         /* 60 s */

  _getRL() {
    try { return JSON.parse(localStorage.getItem(this.RL_KEY) || '{}'); } catch { return {}; }
  },

  _saveRL(data) {
    localStorage.setItem(this.RL_KEY, JSON.stringify(data));
  },

  /* Record a failed attempt; returns { locked, remaining, unlocksIn } */
  recordFailure(key) {
    const rl   = this._getRL();
    const now  = Date.now();
    const rec  = rl[key] || { count: 0, lastAt: now, lockedUntil: 0 };

    /* Reset if window expired */
    if (now - rec.lastAt > this.LOCKOUT_MS) { rec.count = 0; rec.lockedUntil = 0; }

    rec.count++;
    rec.lastAt = now;

    if (rec.count >= this.MAX_ATTEMPTS) {
      rec.lockedUntil = now + this.LOCKOUT_MS;
      this._saveRL({ ...rl, [key]: rec });
      return { locked: true, remaining: 0, unlocksIn: Math.ceil(this.LOCKOUT_MS / 60000) };
    }
    this._saveRL({ ...rl, [key]: rec });
    return { locked: false, remaining: this.MAX_ATTEMPTS - rec.count, unlocksIn: 0 };
  },

  /* Check if key is locked */
  checkLock(key) {
    const rl  = this._getRL();
    const rec = rl[key];
    if (!rec) return { locked: false };
    const now = Date.now();
    if (rec.lockedUntil && now < rec.lockedUntil) {
      return { locked: true, unlocksIn: Math.ceil((rec.lockedUntil - now) / 60000) };
    }
    return { locked: false, remaining: this.MAX_ATTEMPTS - (rec.count || 0) };
  },

  /* Clear on success */
  clearLock(key) {
    const rl = this._getRL();
    delete rl[key];
    this._saveRL(rl);
  },

  /* ── OTP management ─────────────────────────────────────── */
  _otps: {},   /* { key: { code, expiresAt, resendAt } } */

  generateOTP(key) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const now  = Date.now();
    this._otps[key] = { code, expiresAt: now + 10 * 60 * 1000, resendAt: now + this.OTP_RESEND_MS };
    console.log(`[FlexPass DEV] OTP for ${key}: ${code}`);  /* dev only */
    return code;
  },

  verifyOTP(key, input) {
    const rec = this._otps[key];
    if (!rec)                     return { ok: false, reason: 'No OTP found. Request a new one.' };
    if (Date.now() > rec.expiresAt) return { ok: false, reason: 'OTP expired. Request a new one.' };
    if (input.trim() !== rec.code)  return { ok: false, reason: 'Incorrect OTP.' };
    delete this._otps[key];
    return { ok: true };
  },

  canResend(key) {
    const rec = this._otps[key];
    if (!rec) return { can: true };
    const wait = Math.ceil((rec.resendAt - Date.now()) / 1000);
    return wait > 0 ? { can: false, wait } : { can: true };
  },

  /* ── Password validators ──────────────────────────────── */
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  validatePhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  },

  /* Returns { score 0-4, label, color, checks[] } */
  passwordStrength(pwd) {
    const checks = [
      { label: '8+ characters',        pass: pwd.length >= 8 },
      { label: 'Uppercase letter',      pass: /[A-Z]/.test(pwd) },
      { label: 'Number',                pass: /\d/.test(pwd) },
      { label: 'Special character',     pass: /[^a-zA-Z0-9]/.test(pwd) },
    ];
    const score = checks.filter(c => c.pass).length;
    const meta  = [
      { label: 'Too weak',  color: 'var(--error)'   },
      { label: 'Weak',      color: '#FF6B35'         },
      { label: 'Fair',      color: 'var(--warning)'  },
      { label: 'Strong',    color: 'var(--success)'  },
      { label: 'Very strong', color: '#00D4B4'       },
    ];
    return { score, ...meta[score], checks };
  },
};

/* ============================================================
   AUTH PAGE
   ============================================================ */
FP.pages.auth = {
  /* State */
  _mode:       'login',   /* login | signup | forgot | reset | verify-email */
  _method:     'email',   /* email | phone */
  _pendingEmail: '',
  _pendingPhone: '',
  _pendingName:  '',
  _verifyTarget: '',      /* email/phone being verified */

  render() {
    const lock = FP.Auth.checkLock('login');

    return `
      <div style="min-height:100%;display:flex;flex-direction:column;background:var(--bg-gradient);padding:20px 24px 32px;overflow-y:auto">

        <!-- Logo -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px">
          <div class="nav-logo-icon" style="width:34px;height:34px;font-size:16px">F</div>
          <span class="nav-logo-text" style="font-size:19px">FlexPass</span>
        </div>

        <div class="page-enter">
          ${this._renderHeading()}

          ${lock.locked ? this._renderLockout(lock.unlocksIn) : this._renderFlow()}

          <!-- Terms -->
          <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:18px;line-height:1.6">
            By continuing, you agree to FlexPass's
            <span style="color:var(--primary);cursor:pointer" onclick="FP.Router.go('terms-of-service')">Terms of Service</span> and
            <span style="color:var(--primary);cursor:pointer" onclick="FP.Router.go('privacy-policy')">Privacy Policy</span>.
          </p>
        </div>
      </div>`;
  },

  _renderHeading() {
    const headings = {
      'login':        { h:'Welcome\nBack! 👋',        sub:'Sign in to continue your fitness journey.' },
      'signup':       { h:'Join the\nRevolution 🚀',  sub:'Start your free trial. No credit card needed.' },
      'forgot':       { h:'Reset\nPassword 🔑',       sub:'Enter your email and we\'ll send a reset code.' },
      'reset':        { h:'New Password\n🔒',          sub:'Set a strong new password for your account.' },
      'verify-email': { h:'Check Your\nInbox 📬',     sub: `We sent a 6-digit code to ${this._verifyTarget}` },
    };
    const { h, sub } = headings[this._mode] || headings['login'];
    return `
      <h1 style="font-size:26px;font-weight:900;line-height:1.25;margin-bottom:8px;white-space:pre-line">${h}</h1>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:22px;line-height:1.6">${sub}</p>`;
  },

  _renderLockout(minutes) {
    return `
      <div style="background:rgba(239,68,68,0.08);border:1.5px solid var(--error);border-radius:16px;padding:20px;text-align:center;margin-bottom:16px">
        <div style="font-size:36px;margin-bottom:10px">🔒</div>
        <div style="font-size:15px;font-weight:700;color:var(--error);margin-bottom:6px">Account Temporarily Locked</div>
        <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">
          Too many failed attempts. Please try again in <strong>${minutes} minute${minutes !== 1 ? 's' : ''}</strong>.
        </p>
        <div style="font-size:11px;color:var(--text-muted);margin-top:12px">
          If you're locked out, use <span style="color:var(--primary);cursor:pointer" onclick="FP.pages.auth._setMode('forgot')">Forgot Password →</span>
        </div>
      </div>`;
  },

  _renderFlow() {
    if (this._mode === 'verify-email') return this._renderOTPScreen('email');
    if (this._mode === 'forgot')       return this._renderForgotForm();
    if (this._mode === 'reset')        return this._renderResetForm();

    return `
      <!-- Mode tabs -->
      <div class="auth-tabs" style="margin-bottom:16px">
        <div class="auth-tab ${this._mode==='login' ?'active':''}" id="tab-login"  onclick="FP.pages.auth._setMode('login')">Login</div>
        <div class="auth-tab ${this._mode==='signup'?'active':''}" id="tab-signup" onclick="FP.pages.auth._setMode('signup')">Sign Up</div>
      </div>

      <!-- Method toggle -->
      <div style="display:flex;margin-bottom:18px;background:var(--surface-2);border-radius:10px;padding:3px;gap:3px">
        <button class="billing-toggle-btn ${this._method==='email'?'active':''}" style="flex:1" onclick="FP.pages.auth._setMethod('email')">📧 Email</button>
        <button class="billing-toggle-btn ${this._method==='phone'?'active':''}" style="flex:1" onclick="FP.pages.auth._setMethod('phone')">📱 Phone</button>
      </div>

      <!-- Form -->
      <form id="auth-form" onsubmit="return false">
        ${this._method === 'email' ? this._renderEmailForm() : this._renderPhoneForm()}
      </form>

      <!-- Divider -->
      <div class="divider-text" style="margin:18px 0">or continue with</div>

      <!-- Google -->
      <button class="social-btn" id="btn-google" onclick="FP.pages.auth._googleLogin()">
        <span class="social-btn-icon" style="font-size:18px">🌐</span>
        Continue with Google
      </button>`;
  },

  /* ── Email form ──────────────────────────────────────────── */
  _renderEmailForm() {
    return `
      ${this._mode === 'signup' ? `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input class="form-input" type="text" id="auth-name" placeholder="Arjun Sharma" autocomplete="name" required>
          </div>
        </div>` : ''}
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <div class="input-wrapper">
          <span class="input-icon">📧</span>
          <input class="form-input" type="email" id="auth-email" placeholder="you@example.com" autocomplete="email" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;justify-content:space-between;align-items:center">
          Password
          ${this._mode === 'login' ? `<span style="color:var(--primary);cursor:pointer;font-size:12px;font-weight:600" onclick="FP.pages.auth._setMode('forgot')">Forgot password?</span>` : ''}
        </label>
        <div class="input-wrapper">
          <span class="input-icon">🔒</span>
          <input class="form-input" type="password" id="auth-password" placeholder="••••••••" autocomplete="${this._mode === 'login' ? 'current-password' : 'new-password'}" required
            ${this._mode === 'signup' ? 'oninput="FP.pages.auth._onPwdInput(this.value)"' : ''}>
          <span class="input-icon-right" onclick="FP.pages.auth._togglePwd()" id="pwd-eye" style="cursor:pointer">👁️</span>
        </div>
        ${this._mode === 'signup' ? `
          <!-- Password strength bar -->
          <div id="pwd-strength-wrap" style="margin-top:8px;display:none">
            <div style="display:flex;gap:4px;margin-bottom:6px">
              ${[0,1,2,3].map(i => `<div id="strength-seg-${i}" style="flex:1;height:4px;border-radius:99px;background:var(--border);transition:background 0.3s"></div>`).join('')}
            </div>
            <div id="pwd-strength-label" style="font-size:11px;color:var(--text-muted)"></div>
          </div>
          <!-- Confirm password -->
          <div class="form-group" style="margin-top:12px;margin-bottom:0">
            <label class="form-label">Confirm Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input class="form-input" type="password" id="auth-confirm" placeholder="••••••••" autocomplete="new-password">
            </div>
          </div>` : ''}
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:10px" id="btn-submit-email" onclick="FP.pages.auth._submitEmail()">
        ${this._mode === 'login' ? '🚀 Sign In' : '✨ Create Account'}
      </button>`;
  },

  /* ── Phone form ─────────────────────────────────────────── */
  _renderPhoneForm() {
    return `
      ${this._mode === 'signup' ? `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input class="form-input" type="text" id="auth-name" placeholder="Arjun Sharma" autocomplete="name">
          </div>
        </div>` : ''}
      <div class="form-group">
        <label class="form-label">Mobile Number</label>
        <div style="display:flex;gap:8px">
          <div style="background:var(--surface-2);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:14px;flex-shrink:0;color:var(--text-secondary);display:flex;align-items:center">🇮🇳 +91</div>
          <input class="form-input" type="tel" id="auth-phone" placeholder="98765 43210" maxlength="10" pattern="[0-9]{10}" inputmode="numeric" style="flex:1">
        </div>
        <div class="form-hint">We'll send a one-time verification code</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" id="btn-send-otp" onclick="FP.pages.auth._sendPhoneOTP()">
        Send OTP →
      </button>`;
  },

  /* ── OTP verification screen (email or phone) ─────────────── */
  _renderOTPScreen(channel) {
    return `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:48px;margin-bottom:12px">${channel === 'email' ? '📬' : '📱'}</div>
        <p style="font-size:15px;font-weight:700">Enter verification code</p>
        <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">
          Sent to <strong>${this._verifyTarget}</strong>
        </p>
        <p style="font-size:11px;color:var(--text-muted);margin-top:4px">Valid for 10 minutes</p>
      </div>

      <!-- 6-digit OTP inputs -->
      <div class="otp-group" id="otp-group" style="margin-bottom:8px">
        ${Array(6).fill('').map((_, i) =>
          `<input class="otp-input" type="tel" maxlength="1" id="otp-${i}" inputmode="numeric"
            oninput="FP.pages.auth._otpInput(${i}, this)"
            onkeydown="FP.pages.auth._otpKeyDown(${i}, event, this)">`
        ).join('')}
      </div>

      <div id="otp-error" style="text-align:center;font-size:12px;color:var(--error);min-height:18px;margin-bottom:8px"></div>

      <button class="btn btn-primary btn-full btn-lg" id="btn-verify-otp" onclick="FP.pages.auth._verifyEmailOTP()">
        Verify Code ✓
      </button>

      <!-- Resend -->
      <p style="text-align:center;margin-top:14px;font-size:13px;color:var(--text-muted)">
        Didn't receive it?
        <span id="resend-btn" style="color:var(--primary);cursor:pointer;font-weight:600" onclick="FP.pages.auth._resendOTP()">Resend Code</span>
        <span id="resend-timer" style="color:var(--text-muted);display:none"></span>
      </p>

      <!-- In dev: show code hint -->
      <div style="background:var(--surface-2);border-radius:12px;padding:10px 14px;margin-top:12px;font-size:11px;color:var(--text-muted);text-align:center">
        <strong>DEV MODE:</strong> Check browser console for OTP code
      </div>

      <button class="btn btn-ghost btn-full btn-sm" style="margin-top:10px" onclick="FP.pages.auth._setMode(FP.pages.auth._prevMode || 'signup');FP.pages.auth._rerender()">← Back</button>`;
  },

  /* ── Forgot password form ────────────────────────────────── */
  _renderForgotForm() {
    return `
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <div class="input-wrapper">
          <span class="input-icon">📧</span>
          <input class="form-input" type="email" id="forgot-email" placeholder="your@email.com" autocomplete="email">
        </div>
        <div class="form-hint">We'll send a 6-digit reset code to this email</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" id="btn-send-reset" onclick="FP.pages.auth._sendResetCode()">
        Send Reset Code →
      </button>
      <button class="btn btn-ghost btn-full btn-sm" style="margin-top:10px" onclick="FP.pages.auth._setMode('login');FP.pages.auth._rerender()">← Back to Login</button>`;
  },

  /* ── Reset password form (after OTP verified) ─────────────── */
  _renderResetForm() {
    return `
      <!-- OTP verification first -->
      <div style="background:var(--surface-2);border-radius:12px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">
        <span>📬</span> Code sent to <strong>${this._pendingEmail}</strong>
      </div>

      <div class="form-group">
        <label class="form-label">Reset Code (6 digits)</label>
        <div class="otp-group" id="otp-group" style="margin-bottom:0">
          ${Array(6).fill('').map((_, i) =>
            `<input class="otp-input" type="tel" maxlength="1" id="otp-${i}" inputmode="numeric"
              oninput="FP.pages.auth._otpInput(${i}, this)"
              onkeydown="FP.pages.auth._otpKeyDown(${i}, event, this)">`
          ).join('')}
        </div>
        <div id="otp-error" style="text-align:center;font-size:12px;color:var(--error);min-height:16px;margin-top:4px"></div>
      </div>

      <div class="form-group">
        <label class="form-label">New Password</label>
        <div class="input-wrapper">
          <span class="input-icon">🔒</span>
          <input class="form-input" type="password" id="new-password" placeholder="••••••••"
            autocomplete="new-password" oninput="FP.pages.auth._onPwdInput(this.value)">
          <span class="input-icon-right" onclick="FP.pages.auth._togglePwd('new-password')" style="cursor:pointer">👁️</span>
        </div>
        <div id="pwd-strength-wrap" style="margin-top:8px;display:none">
          <div style="display:flex;gap:4px;margin-bottom:6px">
            ${[0,1,2,3].map(i => `<div id="strength-seg-${i}" style="flex:1;height:4px;border-radius:99px;background:var(--border);transition:background 0.3s"></div>`).join('')}
          </div>
          <div id="pwd-strength-label" style="font-size:11px;color:var(--text-muted)"></div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm New Password</label>
        <div class="input-wrapper">
          <span class="input-icon">🔒</span>
          <input class="form-input" type="password" id="confirm-password" placeholder="••••••••" autocomplete="new-password">
        </div>
      </div>

      <button class="btn btn-primary btn-full btn-lg" id="btn-reset-submit" onclick="FP.pages.auth._submitReset()">
        🔑 Reset Password
      </button>
      <button class="btn btn-ghost btn-full btn-sm" style="margin-top:10px" onclick="FP.pages.auth._setMode('forgot');FP.pages.auth._rerender()">← Back</button>

      <div style="background:var(--surface-2);border-radius:10px;padding:8px 12px;margin-top:12px;font-size:11px;color:var(--text-muted);text-align:center">
        <strong>DEV MODE:</strong> Check browser console for reset code
      </div>`;
  },

  /* ============================================================
     ACTIONS
     ============================================================ */
  _setMode(mode) {
    this._prevMode = this._mode;
    this._mode = mode;
  },

  _setMethod(method) {
    this._method = method;
    this._mode = 'login';
    this._rerender();
  },

  _rerender() {
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _setBtn(id, label, disabled = false) {
    const btn = document.getElementById(id);
    if (btn) { btn.textContent = label; btn.disabled = disabled; }
  },

  _togglePwd(fieldId = 'auth-password') {
    const input = document.getElementById(fieldId);
    const eye   = document.getElementById('pwd-eye');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    if (eye) eye.textContent = input.type === 'password' ? '👁️' : '🙈';
  },

  /* Password strength meter */
  _onPwdInput(val) {
    const wrap  = document.getElementById('pwd-strength-wrap');
    const label = document.getElementById('pwd-strength-label');
    if (!wrap) return;
    wrap.style.display = val ? 'block' : 'none';
    const { score, label: lbl, color, checks } = FP.Auth.passwordStrength(val);
    const segs = document.querySelectorAll('[id^="strength-seg-"]');
    segs.forEach((s, i) => { s.style.background = i < score ? color : 'var(--border)'; });
    if (label) { label.textContent = lbl; label.style.color = color; }
  },

  /* ── Email submit ─────────────────────────────────────────── */
  _submitEmail() {
    const rlKey = 'login';
    const lock  = FP.Auth.checkLock(rlKey);
    if (lock.locked) { FP.Toast.error(`Account locked. Try again in ${lock.unlocksIn} min.`); return; }

    const email    = document.getElementById('auth-email')?.value?.trim();
    const password = document.getElementById('auth-password')?.value || '';
    const name     = document.getElementById('auth-name')?.value?.trim();
    const confirm  = document.getElementById('auth-confirm')?.value || '';

    /* Validators */
    if (!email || !FP.Auth.validateEmail(email)) {
      FP.Toast.error('Enter a valid email address.'); return;
    }
    if (password.length < 6) {
      FP.Toast.error('Password must be at least 6 characters.'); return;
    }
    if (this._mode === 'signup') {
      if (!name || name.length < 2) { FP.Toast.error('Enter your full name.'); return; }
      const { score } = FP.Auth.passwordStrength(password);
      if (score < 2) { FP.Toast.error('Password is too weak. Add uppercase, numbers or symbols.'); return; }
      if (password !== confirm) { FP.Toast.error('Passwords do not match.'); return; }
    }

    /* Animate button */
    this._setBtn('btn-submit-email', '⏳ Please wait...', true);
    FP.Toast.info('🔐 Authenticating...');

    setTimeout(() => {
      if (this._mode === 'signup') {
        /* Trigger email verification before completing signup */
        this._pendingEmail = email;
        this._pendingName  = name;
        this._verifyTarget = email;
        this._prevMode     = 'signup';
        FP.Auth.generateOTP(`email:${email}`);
        FP.Toast.success(`Verification code sent to ${email}!`);
        this._mode = 'verify-email';
        this._rerender();
        setTimeout(() => document.getElementById('otp-0')?.focus(), 100);
      } else {
        /* Login — simulate credential check */
        const res = FP.Auth.recordFailure(rlKey);
        /* Demo: accept any valid-looking credentials */
        FP.Auth.clearLock(rlKey);
        FP.User.loginAsDemo();
        FP.User.update({ email });
        FP.User.seedDemoBookings();
        FP.Toast.success('Welcome back! 🚀');
        setTimeout(() => FP.Router.go('home'), 500);
      }
    }, 1100);
  },

  /* ── Email OTP verify (after signup) ─────────────────────── */
  _verifyEmailOTP() {
    const otp = Array(6).fill('').map((_, i) => document.getElementById(`otp-${i}`)?.value || '').join('');
    const errEl = document.getElementById('otp-error');
    if (otp.length < 6) { if (errEl) errEl.textContent = 'Enter all 6 digits.'; return; }

    this._setBtn('btn-verify-otp', '⏳ Verifying...', true);
    const result = FP.Auth.verifyOTP(`email:${this._pendingEmail}`, otp);

    setTimeout(() => {
      if (!result.ok) {
        if (errEl) errEl.textContent = result.reason;
        this._setBtn('btn-verify-otp', 'Verify Code ✓', false);
        /* Count as failed attempt */
        const rl = FP.Auth.recordFailure(`otp:${this._pendingEmail}`);
        if (rl.locked) FP.Toast.error('Too many wrong codes. Please request a new one.');
        return;
      }
      FP.Auth.clearLock(`otp:${this._pendingEmail}`);
      const user = FP.User.create({
        name: this._pendingName || this._pendingEmail.split('@')[0],
        email: this._pendingEmail,
        method: 'email',
        emailVerified: true,
      });
      FP.User.set(user);
      FP.User.seedDemoBookings();
      FP.Toast.success('Email verified! Welcome to FlexPass 🎉');
      setTimeout(() => FP.Router.go('home'), 500);
    }, 900);
  },

  /* ── Resend OTP ───────────────────────────────────────────── */
  _resendOTP() {
    const key  = `email:${this._pendingEmail}`;
    const { can, wait } = FP.Auth.canResend(key);
    if (!can) {
      FP.Toast.warning(`Wait ${wait}s before requesting a new code.`);
      this._startResendTimer(wait);
      return;
    }
    FP.Auth.generateOTP(key);
    FP.Toast.success('New code sent! Check your email.');
    this._startResendTimer(60);
  },

  _startResendTimer(secs) {
    const btn   = document.getElementById('resend-btn');
    const timer = document.getElementById('resend-timer');
    if (!btn || !timer) return;
    btn.style.display   = 'none';
    timer.style.display = 'inline';
    let s = secs;
    timer.textContent = ` Resend in ${s}s`;
    const iv = setInterval(() => {
      s--;
      timer.textContent = ` Resend in ${s}s`;
      if (s <= 0) {
        clearInterval(iv);
        btn.style.display   = 'inline';
        timer.style.display = 'none';
      }
    }, 1000);
  },

  /* ── Phone OTP ────────────────────────────────────────────── */
  _sendPhoneOTP() {
    const phone = document.getElementById('auth-phone')?.value?.trim();
    if (!FP.Auth.validatePhone(phone)) {
      FP.Toast.error('Enter a valid 10-digit Indian mobile number.'); return;
    }
    const name = document.getElementById('auth-name')?.value?.trim() || '';
    this._pendingPhone = `+91 ${phone}`;
    this._pendingName  = name;
    this._verifyTarget = this._pendingPhone;
    this._prevMode     = this._mode;
    this._setBtn('btn-send-otp', '⏳ Sending...', true);
    FP.Auth.generateOTP(`phone:${phone}`);
    FP.Toast.info('Sending OTP to your number...');
    setTimeout(() => {
      FP.Toast.success(`OTP sent to +91 ${phone}!`);
      this._mode = 'verify-email'; /* reuse OTP screen */
      this._rerender();
      setTimeout(() => document.getElementById('otp-0')?.focus(), 100);
    }, 1000);
  },

  /* ── Forgot password ──────────────────────────────────────── */
  _sendResetCode() {
    const email = document.getElementById('forgot-email')?.value?.trim();
    if (!email || !FP.Auth.validateEmail(email)) {
      FP.Toast.error('Enter a valid email address.'); return;
    }
    this._pendingEmail = email;
    this._verifyTarget = email;
    this._setBtn('btn-send-reset', '⏳ Sending...', true);
    FP.Auth.generateOTP(`reset:${email}`);
    setTimeout(() => {
      FP.Toast.success(`Reset code sent to ${email}!`);
      this._mode = 'reset';
      this._rerender();
      setTimeout(() => document.getElementById('otp-0')?.focus(), 100);
    }, 1000);
  },

  /* ── Submit password reset ─────────────────────────────────── */
  _submitReset() {
    const otp     = Array(6).fill('').map((_, i) => document.getElementById(`otp-${i}`)?.value || '').join('');
    const newPwd  = document.getElementById('new-password')?.value    || '';
    const confirm = document.getElementById('confirm-password')?.value || '';
    const errEl   = document.getElementById('otp-error');

    if (otp.length < 6) { if (errEl) errEl.textContent = 'Enter the 6-digit code.'; return; }
    const { score } = FP.Auth.passwordStrength(newPwd);
    if (score < 2) { FP.Toast.error('Choose a stronger password.'); return; }
    if (newPwd !== confirm) { FP.Toast.error('Passwords do not match.'); return; }

    this._setBtn('btn-reset-submit', '⏳ Resetting...', true);
    const result = FP.Auth.verifyOTP(`reset:${this._pendingEmail}`, otp);
    setTimeout(() => {
      if (!result.ok) {
        if (errEl) errEl.textContent = result.reason;
        this._setBtn('btn-reset-submit', '🔑 Reset Password', false);
        return;
      }
      /* Password reset success — log in */
      FP.Auth.clearLock('login');
      FP.User.loginAsDemo();
      FP.User.update({ email: this._pendingEmail });
      FP.User.seedDemoBookings();
      FP.Toast.success('Password reset! You\'re now signed in. 🎉');
      setTimeout(() => FP.Router.go('home'), 500);
    }, 900);
  },

  /* ── Google OAuth (simulated) ──────────────────────────────── */
  _googleLogin() {
    const btn = document.getElementById('btn-google');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>⏳</span> Connecting to Google...'; }
    FP.Toast.info('Redirecting to Google...');
    setTimeout(() => {
      FP.Auth.clearLock('login');
      FP.User.loginAsDemo();
      FP.User.update({ emailVerified: true, oauthProvider: 'google' });
      FP.User.seedDemoBookings();
      FP.Toast.success('Signed in with Google! 🎉');
      setTimeout(() => FP.Router.go('home'), 500);
    }, 1400);
  },

  /* ── OTP input helpers ─────────────────────────────────────── */
  _otpInput(idx, el) {
    el.value = el.value.replace(/\D/g, '').slice(0, 1);
    el.classList.toggle('filled', !!el.value);
    if (el.value && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
    const errEl = document.getElementById('otp-error');
    if (errEl) errEl.textContent = '';
  },

  _otpKeyDown(idx, e, el) {
    if (e.key === 'Backspace' && !el.value && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
    if (e.key === 'Enter') {
      if (this._mode === 'verify-email') this._verifyEmailOTP();
      else if (this._mode === 'reset') this._submitReset();
    }
  },

  /* ── Init ──────────────────────────────────────────────────── */
  init() {
    /* Auto-focus first OTP input if shown */
    if (this._mode === 'verify-email' || this._mode === 'reset') {
      setTimeout(() => document.getElementById('otp-0')?.focus(), 150);
    }
  }
};
