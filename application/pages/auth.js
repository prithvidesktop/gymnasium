/* ============================================================
   FLEXPASS — AUTHENTICATION PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.auth = {
  _mode: 'login',       /* login | signup */
  _method: 'email',     /* email | phone */
  _otpStep: false,

  render() {
    return `
      <div style="min-height:100%;display:flex;flex-direction:column;background:var(--bg-gradient);padding:24px;overflow-y:auto">
        <!-- Header -->
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px">
          <div class="nav-logo-icon" style="width:36px;height:36px;font-size:18px">F</div>
          <span class="nav-logo-text" style="font-size:20px">FlexPass</span>
        </div>

        <div class="page-enter">
          <h1 style="font-size:28px;font-weight:900;line-height:1.2;margin-bottom:8px">
            ${this._mode === 'login' ? 'Welcome\nBack! 👋' : 'Join the\nRevolution 🚀'}
          </h1>
          <p style="font-size:14px;color:var(--text-secondary);margin-bottom:28px;line-height:1.6">
            ${this._mode === 'login' ? 'Sign in to continue your fitness journey.' : 'Start your free trial. No credit card needed.'}
          </p>

          <!-- Mode tabs -->
          <div class="auth-tabs">
            <div class="auth-tab ${this._mode==='login'?'active':''}" onclick="FP.pages.auth._setMode('login')">Login</div>
            <div class="auth-tab ${this._mode==='signup'?'active':''}" onclick="FP.pages.auth._setMode('signup')">Sign Up</div>
          </div>

          <!-- Method tabs -->
          <div style="display:flex;margin-bottom:20px;background:var(--surface-2);border-radius:10px;padding:3px;gap:3px">
            <button class="billing-toggle-btn ${this._method==='email'?'active':''}" style="flex:1" onclick="FP.pages.auth._setMethod('email')">📧 Email</button>
            <button class="billing-toggle-btn ${this._method==='phone'?'active':''}" style="flex:1" onclick="FP.pages.auth._setMethod('phone')">📱 Phone</button>
          </div>

          <!-- Form -->
          <form id="auth-form" onsubmit="return false">
            ${this._renderForm()}
          </form>

          <!-- Divider -->
          <div class="divider-text" style="margin:20px 0">or continue with</div>

          <!-- Social buttons -->
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="social-btn" onclick="FP.pages.auth._googleLogin()">
              <span class="social-btn-icon">🌐</span>
              Continue with Google
            </button>
          </div>

          <!-- Terms -->
          <p style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:20px;line-height:1.6">
            By continuing, you agree to FlexPass's
            <span style="color:var(--primary);cursor:pointer">Terms of Service</span> and
            <span style="color:var(--primary);cursor:pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>`;
  },

  _renderForm() {
    if (this._otpStep) return this._renderOTPForm();

    if (this._method === 'email') {
      return `
        ${this._mode === 'signup' ? `
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input class="form-input" type="text" id="auth-name" placeholder="Arjun Sharma" required>
            </div>
          </div>` : ''}
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <div class="input-wrapper">
            <span class="input-icon">📧</span>
            <input class="form-input" type="email" id="auth-email" placeholder="you@example.com" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input class="form-input" type="password" id="auth-password" placeholder="••••••••" required>
            <span class="input-icon-right" onclick="FP.pages.auth._togglePwd()" id="pwd-eye">👁️</span>
          </div>
          ${this._mode === 'login' ? '<div class="form-hint" style="text-align:right"><span onclick="FP.pages.auth._forgotPwd()" style="color:var(--primary);cursor:pointer">Forgot password?</span></div>' : ''}
        </div>
        <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="FP.pages.auth._submitEmail()">
          ${this._mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>`;
    } else {
      return `
        ${this._mode === 'signup' ? `
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input class="form-input" type="text" id="auth-name" placeholder="Arjun Sharma">
            </div>
          </div>` : ''}
        <div class="form-group">
          <label class="form-label">Mobile Number</label>
          <div style="display:flex;gap:8px">
            <div style="background:var(--surface-2);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:14px;flex-shrink:0;color:var(--text-secondary)">🇮🇳 +91</div>
            <input class="form-input" type="tel" id="auth-phone" placeholder="98765 43210" maxlength="10">
          </div>
        </div>
        <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="FP.pages.auth._sendOTP()">
          Send OTP →
        </button>`;
    }
  },

  _renderOTPForm() {
    return `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:40px;margin-bottom:12px">📱</div>
        <p style="font-size:15px;font-weight:600">OTP sent to your number</p>
        <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">Enter the 6-digit code below</p>
      </div>
      <div class="otp-group" id="otp-group">
        ${Array(6).fill('').map((_, i) => `<input class="otp-input" type="tel" maxlength="1" id="otp-${i}" oninput="FP.pages.auth._otpInput(${i}, this)">`).join('')}
      </div>
      <button class="btn btn-primary btn-full btn-lg" style="margin-top:20px" onclick="FP.pages.auth._verifyOTP()">
        Verify OTP
      </button>
      <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--text-muted)">
        Didn't receive? <span style="color:var(--primary);cursor:pointer" onclick="FP.pages.auth._resendOTP()">Resend OTP</span>
      </p>
      <button class="btn btn-ghost btn-full btn-sm" style="margin-top:8px" onclick="FP.pages.auth._otpStep=false;FP.pages.auth._rerender()">← Back</button>`;
  },

  /* ---- Actions ---- */
  _setMode(mode) {
    this._mode = mode;
    this._otpStep = false;
    this._rerender();
  },

  _setMethod(method) {
    this._method = method;
    this._otpStep = false;
    this._rerender();
  },

  _rerender() {
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _togglePwd() {
    const input = document.getElementById('auth-password');
    const eye = document.getElementById('pwd-eye');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      if (eye) eye.textContent = input.type === 'password' ? '👁️' : '🙈';
    }
  },

  _forgotPwd() {
    FP.Toast.info('Password reset link will be sent to your email.');
  },

  _submitEmail() {
    const email = document.getElementById('auth-email')?.value?.trim();
    const password = document.getElementById('auth-password')?.value;
    const name = document.getElementById('auth-name')?.value?.trim();

    if (!email) { FP.Toast.error('Please enter your email address.'); return; }
    if (!password || password.length < 6) { FP.Toast.error('Password must be at least 6 characters.'); return; }

    /* Simulate auth */
    FP.Toast.info('🔐 Authenticating...');
    setTimeout(() => {
      if (this._mode === 'signup') {
        const user = FP.User.create({ name: name || email.split('@')[0], email, method: 'email' });
        FP.User.set(user);
        FP.Toast.success('Account created! Welcome to FlexPass 🎉');
        setTimeout(() => FP.Router.go('home'), 500);
      } else {
        FP.User.loginAsDemo();
        FP.User.seedDemoBookings();
        FP.Toast.success('Welcome back! 🚀');
        setTimeout(() => FP.Router.go('home'), 500);
      }
    }, 1200);
  },

  _sendOTP() {
    const phone = document.getElementById('auth-phone')?.value?.trim();
    if (!phone || phone.length < 10) { FP.Toast.error('Enter a valid 10-digit mobile number.'); return; }
    FP.Toast.info('Sending OTP...');
    setTimeout(() => {
      FP.Toast.success('OTP sent! (Use: 123456 for demo)');
      this._otpStep = true;
      this._rerender();
    }, 1000);
  },

  _otpInput(idx, el) {
    el.classList.add('filled');
    if (el.value && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
    if (!el.value) { el.classList.remove('filled'); if (idx > 0) document.getElementById(`otp-${idx - 1}`)?.focus(); }
  },

  _verifyOTP() {
    const otp = Array(6).fill('').map((_, i) => document.getElementById(`otp-${i}`)?.value || '').join('');
    if (otp.length < 6) { FP.Toast.error('Enter all 6 digits.'); return; }
    FP.Toast.info('Verifying OTP...');
    setTimeout(() => {
      /* Accept any 6-digit OTP for demo */
      const name = document.getElementById('auth-name')?.value || 'User';
      const user = FP.User.create({ name: name || 'User', phone: '+91 98765 43210', method: 'phone' });
      FP.User.set(user);
      FP.User.loginAsDemo();
      FP.User.seedDemoBookings();
      FP.Toast.success('Phone verified! Welcome to FlexPass 🎉');
      setTimeout(() => FP.Router.go('home'), 500);
    }, 1200);
  },

  _resendOTP() { FP.Toast.info('OTP resent!'); },

  _googleLogin() {
    FP.Toast.info('Connecting to Google...');
    setTimeout(() => {
      FP.User.loginAsDemo();
      FP.User.seedDemoBookings();
      FP.Toast.success('Signed in with Google! 🎉');
      setTimeout(() => FP.Router.go('home'), 500);
    }, 1200);
  },

  init() {
    /* nothing extra needed beyond onclick handlers */
  }
};
