/* ============================================================
   FLEXPASS — USER STATE MANAGER
   ============================================================ */
window.FP = window.FP || {};

FP.User = {
  KEY: 'fp_user',
  BOOKINGS_KEY: 'fp_bookings',
  THEME_KEY: 'fp_theme',

  /* ---- Get / Set ---- */
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); }
    catch { return null; }
  },

  set(userData) {
    localStorage.setItem(this.KEY, JSON.stringify(userData));
  },

  update(patch) {
    const u = this.get() || {};
    this.set({ ...u, ...patch });
  },

  isLoggedIn() { return !!this.get(); },

  logout() {
    localStorage.removeItem(this.KEY);
  },

  /* ---- Default user template ---- */
  create({ name, email, phone, method = 'email' }) {
    return {
      id: 'usr_' + Date.now(),
      name,
      email: email || '',
      phone: phone || '',
      avatar: null,
      initials: name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'FP',
      method,
      plan: null,         /* null | 'basic' | 'pro' | 'elite' */
      planExpiry: null,
      billing: 'monthly', /* monthly | yearly */
      goals: [],
      preferences: [],
      location: 'Bangalore',
      joinedAt: new Date().toISOString(),
      sessionsThisMonth: 0,
      sessionsTotal: 0,
      streakDays: 0,
      caloriesThisWeek: 0,
      stepsToday: 0,
      points: 0,
      badges: [],
      referralCode: 'FLEX' + Math.random().toString(36).substr(2,6).toUpperCase(),
    };
  },

  /* ---- Demo user for quick testing ---- */
  loginAsDemo() {
    const demo = {
      id: 'usr_demo',
      name: 'Arjun Sharma',
      email: 'arjun@example.com',
      phone: '+91 98765 43210',
      avatar: null,
      initials: 'AS',
      method: 'email',
      plan: 'pro',
      planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      billing: 'monthly',
      goals: ['weight_loss', 'muscle_gain'],
      preferences: ['gym', 'yoga'],
      location: 'Bangalore',
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      sessionsThisMonth: 14,
      sessionsTotal: 127,
      streakDays: 8,
      caloriesThisWeek: 2840,
      stepsToday: 7320,
      points: 2450,
      badges: ['first_session', 'week_streak', 'early_bird'],
      referralCode: 'FLEXARJUN42',
    };
    this.set(demo);
    return demo;
  },

  /* ---- Bookings ---- */
  getBookings() {
    try { return JSON.parse(localStorage.getItem(this.BOOKINGS_KEY) || '[]'); }
    catch { return []; }
  },

  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      id: 'bkng_' + Date.now(),
      ...booking,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      qrData: `FLEXPASS:${booking.gymId}:${Date.now()}:${Math.random().toString(36).substr(2,8).toUpperCase()}`
    };
    bookings.unshift(newBooking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
    /* Also update session count */
    this.update({ sessionsThisMonth: (this.get().sessionsThisMonth || 0) + 1 });
    return newBooking;
  },

  cancelBooking(id) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = 'cancelled';
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
    }
  },

  /* ---- Demo bookings ---- */
  seedDemoBookings() {
    const existing = this.getBookings();
    if (existing.length > 0) return;

    const demos = [
      {
        id: 'bkng_001',
        gymId: 'gym_001',
        gymName: 'Iron Temple Fitness',
        gymEmoji: '🏋️',
        gymAddress: 'Indiranagar, Bangalore',
        slot: '7:00 AM',
        date: new Date().toISOString().split('T')[0],
        status: 'confirmed',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        qrData: 'FLEXPASS:gym_001:1776179000:A8X3K9MN'
      },
      {
        id: 'bkng_002',
        gymId: 'gym_002',
        gymName: 'Serenity Yoga Studio',
        gymEmoji: '🧘',
        gymAddress: 'Koramangala, Bangalore',
        slot: '6:30 AM',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'completed',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        qrData: 'FLEXPASS:gym_002:1776179001:B9Y4L0OP'
      },
      {
        id: 'bkng_003',
        gymId: 'gym_016',
        gymName: 'BodyCraft Studio',
        gymEmoji: '🎯',
        gymAddress: 'Richmond Town, Bangalore',
        slot: '6:00 PM',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'completed',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        qrData: 'FLEXPASS:gym_016:1776179002:C1Z5M2QR'
      }
    ];

    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(demos));
  },

  /* ---- Theme ---- */
  getTheme() { return localStorage.getItem(this.THEME_KEY) || 'dark'; },
  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },
  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  /* ---- Fitness Goals ---- */
  goals: [
    { id: 'weight_loss', label: 'Weight Loss', emoji: '🔥' },
    { id: 'muscle_gain', label: 'Muscle Gain', emoji: '💪' },
    { id: 'flexibility', label: 'Flexibility', emoji: '🤸' },
    { id: 'endurance', label: 'Endurance', emoji: '🏃' },
    { id: 'stress_relief', label: 'Stress Relief', emoji: '🧘' },
    { id: 'general_health', label: 'General Health', emoji: '❤️' },
  ],

  /* ---- Badges definition ---- */
  badgeDefs: {
    first_session: { label: 'First Session', emoji: '🥇', desc: 'Completed your first gym session' },
    week_streak:   { label: '7-Day Streak', emoji: '🔥', desc: 'Worked out 7 days in a row' },
    early_bird:    { label: 'Early Bird', emoji: '🌅', desc: 'Booked a session before 7 AM' },
    centurion:     { label: 'Centurion', emoji: '💯', desc: 'Completed 100 sessions' },
    explorer:      { label: 'Explorer', emoji: '🗺️', desc: 'Visited 10 different venues' },
    social:        { label: 'Social Butterfly', emoji: '🦋', desc: 'Referred 3 friends' },
  }
};

/* Initialize theme on load */
(function() {
  const theme = FP.User.getTheme();
  document.documentElement.setAttribute('data-theme', theme);
})();
