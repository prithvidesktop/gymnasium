/* ============================================================
   FLEXPASS — SUBSCRIPTION PLANS DATA
   ============================================================ */
window.FP = window.FP || {};
FP.data = FP.data || {};

FP.data.plans = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Start your journey',
    emoji: '⚡',
    color: '#00D68F',
    priceMonthly: 999,
    priceYearly: 9590,   /* ~20% off */
    priceYearlyMonthly: 799,
    popularRank: 3,
    recommended: false,
    trialDays: 7,
    features: [
      { text: 'Access to 50+ gyms & studios', included: true },
      { text: 'Up to 8 sessions/month', included: true },
      { text: 'Basic tier venues only', included: true },
      { text: 'Booking via app', included: true },
      { text: 'AI workout recommendations', included: true },
      { text: 'Activity tracking dashboard', included: true },
      { text: 'Pro & Elite venues', included: false },
      { text: 'Unlimited sessions', included: false },
      { text: 'Guest passes (2/month)', included: false },
      { text: 'Personalized diet plans', included: false },
      { text: 'Priority support', included: false },
      { text: 'Corporate wellness portal', included: false },
    ],
    gymAccess: ['basic'],
    sessionsPerMonth: 8,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Most popular choice',
    emoji: '🔥',
    color: '#6C47FF',
    priceMonthly: 1999,
    priceYearly: 19190,   /* ~20% off */
    priceYearlyMonthly: 1599,
    popularRank: 1,
    recommended: true,
    trialDays: 14,
    features: [
      { text: 'Access to 200+ gyms & studios', included: true },
      { text: 'Up to 20 sessions/month', included: true },
      { text: 'Basic + Pro tier venues', included: true },
      { text: 'AI workout recommendations', included: true },
      { text: 'Personalized diet plans', included: true },
      { text: 'Activity tracking + wearables sync', included: true },
      { text: 'Guest passes (2/month)', included: true },
      { text: 'Priority booking', included: true },
      { text: 'Elite venues', included: false },
      { text: 'Unlimited sessions', included: false },
      { text: 'Corporate wellness portal', included: false },
      { text: 'Dedicated health coach', included: false },
    ],
    gymAccess: ['basic', 'pro'],
    sessionsPerMonth: 20,
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Go all in',
    emoji: '👑',
    color: '#FF6B35',
    priceMonthly: 3499,
    priceYearly: 33590,
    priceYearlyMonthly: 2799,
    popularRank: 2,
    recommended: false,
    trialDays: 14,
    features: [
      { text: 'Access to 500+ gyms & studios', included: true },
      { text: 'Unlimited sessions', included: true },
      { text: 'All tier venues (Basic + Pro + Elite)', included: true },
      { text: 'AI workout + advanced analytics', included: true },
      { text: 'Personalized diet + nutrition coaching', included: true },
      { text: 'Activity tracking + wearables sync', included: true },
      { text: 'Guest passes (5/month)', included: true },
      { text: 'Priority booking + guaranteed slots', included: true },
      { text: 'Dedicated health coach (1:1 call/month)', included: true },
      { text: 'Corporate wellness portal', included: true },
      { text: 'Wellness workshops & events', included: true },
      { text: 'Premium rewards & perks', included: true },
    ],
    gymAccess: ['basic', 'pro', 'elite'],
    sessionsPerMonth: Infinity,
  }
];

FP.data.getPlanById = function(id) {
  return FP.data.plans.find(p => p.id === id);
};

/* Feature comparison table data */
FP.data.featureMatrix = [
  { feature: 'Venue Access', basic: '50+', pro: '200+', elite: '500+' },
  { feature: 'Sessions/Month', basic: '8', pro: '20', elite: 'Unlimited' },
  { feature: 'Venue Tiers', basic: 'Basic', pro: 'Basic + Pro', elite: 'All Tiers' },
  { feature: 'AI Workouts', basic: '✓', pro: '✓', elite: '✓ + Advanced' },
  { feature: 'Diet Plans', basic: '✗', pro: '✓', elite: '✓ + Coach' },
  { feature: 'Guest Passes', basic: '✗', pro: '2/month', elite: '5/month' },
  { feature: 'Wearable Sync', basic: '✗', pro: '✓', elite: '✓' },
  { feature: 'Health Coach', basic: '✗', pro: '✗', elite: '1/month' },
  { feature: 'Support', basic: 'Email', pro: 'Priority', elite: '24/7 Dedicated' },
];

/* Payment methods */
FP.data.paymentMethods = [
  { id: 'upi', label: 'UPI', icon: '💳', desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: '🏦', desc: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏧', desc: 'All major banks' },
  { id: 'wallet', label: 'Wallets', icon: '👜', desc: 'Paytm, PhonePe, Amazon Pay' },
];
