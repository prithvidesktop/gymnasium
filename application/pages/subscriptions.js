/* ============================================================
   FLEXPASS — SUBSCRIPTIONS PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.subscriptions = {
  _billing: 'monthly',   /* monthly | yearly */
  _selected: 'pro',

  render() {
    const user = FP.User.get() || {};
    const currentPlan = user.plan;
    const plans = FP.data.plans;

    return `
      <div class="page-enter" style="padding-bottom:100px">
        <!-- Header -->
        <div style="padding:20px 16px 0;text-align:center">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:var(--primary);text-transform:uppercase;margin-bottom:8px">✨ Choose Your Plan</div>
          <h1 style="font-size:26px;font-weight:900;line-height:1.2;margin-bottom:8px">Unlock the Full\nFlexPass Experience</h1>
          <p style="font-size:14px;color:var(--text-secondary);line-height:1.6;max-width:280px;margin:0 auto">Access 500+ fitness venues across India with one membership.</p>
        </div>

        <!-- Trial banner -->
        <div style="margin:20px 16px;background:var(--success-bg);border:1px solid rgba(0,214,143,0.25);border-radius:16px;padding:14px;display:flex;gap:12px;align-items:center">
          <div style="font-size:24px">🎁</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--success)">Free Trial Available</div>
            <div style="font-size:12px;color:var(--text-secondary)">Start with 7–14 days free. No credit card required for trial.</div>
          </div>
        </div>

        <!-- Billing toggle -->
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:4px">
          <div class="billing-toggle-wrap">
            <button class="billing-toggle-btn ${this._billing==='monthly'?'active':''}" onclick="FP.pages.subscriptions._setBilling('monthly')">Monthly</button>
            <button class="billing-toggle-btn ${this._billing==='yearly'?'active':''}" onclick="FP.pages.subscriptions._setBilling('yearly')">Yearly</button>
          </div>
          ${this._billing==='yearly' ? `<span class="badge badge-success" style="font-size:11px">Save 20%</span>` : `<span style="font-size:11px;color:var(--text-muted)">or save 20% with yearly</span>`}
        </div>

        <!-- Plan Cards -->
        <div style="padding:16px;display:flex;flex-direction:column;gap:14px">
          ${plans.map(p => this._renderPlanCard(p, currentPlan)).join('')}
        </div>

        <!-- Feature Comparison -->
        <div style="margin:0 16px 20px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Compare Plans</h3>
          <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
            <table class="admin-table" style="font-size:12px">
              <thead>
                <tr>
                  <th style="font-size:11px;padding:12px">Feature</th>
                  <th style="font-size:11px;text-align:center;color:var(--success)">Basic</th>
                  <th style="font-size:11px;text-align:center;color:var(--primary)">Pro</th>
                  <th style="font-size:11px;text-align:center;color:var(--secondary)">Elite</th>
                </tr>
              </thead>
              <tbody>
                ${FP.data.featureMatrix.map(row => `
                  <tr>
                    <td style="font-size:12px;padding:10px 12px">${row.feature}</td>
                    <td style="text-align:center;color:var(--text-secondary)">${row.basic}</td>
                    <td style="text-align:center;color:var(--text-secondary)">${row.pro}</td>
                    <td style="text-align:center;color:var(--text-secondary)">${row.elite}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Testimonials  -->
        <div style="padding:0 16px 20px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">What Members Say</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { name:'Priya M.', location:'Bangalore', text:'Best investment ever! I\'ve tried 12 different studios this month. Worth every rupee.', plan:'Pro', rating:5 },
              { name:'Rahul K.', location:'Mumbai', text:'The Elite plan changed my fitness routine completely. Unlimited access is a game-changer.', plan:'Elite', rating:5 },
              { name:'Ananya R.', location:'Delhi', text:'Started with Basic and upgraded to Pro after week 1. The yoga studios alone justify the price.', plan:'Pro', rating:5 },
            ].map(t => `
              <div class="review-card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <div class="avatar avatar-sm">${t.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div>
                      <div style="font-size:13px;font-weight:600">${t.name}</div>
                      <div style="font-size:11px;color:var(--text-muted)">${t.location} · ${t.plan} Member</div>
                    </div>
                  </div>
                  <div class="review-stars" style="font-size:12px">${'★'.repeat(t.rating)}</div>
                </div>
                <p class="review-text">"${t.text}"</p>
              </div>`).join('')}
          </div>
        </div>

        <!-- FAQ -->
        <div style="padding:0 16px 20px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">FAQs</h3>
          ${[
            { q:'Can I cancel anytime?', a:'Yes! Cancel anytime with no cancellation fees. Your access continues until the end of the billing period.' },
            { q:'How do I use my pass at a gym?', a:'Simply book a slot in the app, then show your QR code at the venue for instant check-in.' },
            { q:'Are all cities covered?', a:'FlexPass currently covers 15+ cities across India with 500+ partner venues. More being added weekly.' },
            { q:'What happens if I exceed my session limit?', a:'With Basic and Pro plans, additional sessions can be purchased at ₹149/session. Elite is unlimited.' },
          ].map((f, i) => `
            <div style="border-bottom:1px solid var(--border);padding:14px 0;cursor:pointer" onclick="this.querySelector('.faq-ans').classList.toggle('hidden');this.querySelector('.faq-arrow').textContent=this.querySelector('.faq-ans').classList.contains('hidden')?'›':'⌄'">
              <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600">
                ${f.q}<span class="faq-arrow" style="color:var(--text-muted)">›</span>
              </div>
              <div class="faq-ans hidden" style="font-size:13px;color:var(--text-secondary);margin-top:8px;line-height:1.7">${f.a}</div>
            </div>`).join('')}
        </div>

        <!-- Sticky CTA -->
        <div id="subscribe-sticky" style="position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;padding:16px;background:linear-gradient(to top,var(--surface) 80%,transparent);z-index:50">
          ${this._renderSummary()}
        </div>
      </div>`;
  },

  _renderPlanCard(plan, currentPlan) {
    const isSelected = this._selected === plan.id;
    const isCurrent  = currentPlan === plan.id;
    const price = this._billing === 'yearly' ? plan.priceYearlyMonthly : plan.priceMonthly;
    const yearlyTotal = plan.priceYearly;

    return `
      <div class="plan-card ${isSelected ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}"
           onclick="FP.pages.subscriptions._selectPlan('${plan.id}')">
        ${plan.recommended ? `<div class="plan-card-badge">Most Popular</div>` : ''}
        <div style="display:flex;align-items:flex-start;gap:16px">
          <div style="width:48px;height:48px;background:${plan.color}22;border:1px solid ${plan.color}44;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${plan.emoji}</div>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="plan-name" style="color:${plan.color}">${plan.name}</div>
                <div class="plan-desc">${plan.tagline}</div>
              </div>
              ${isCurrent ? `<span class="badge badge-success" style="flex-shrink:0;margin-top:4px">Current</span>` : ''}
            </div>
            <div style="margin:8px 0 12px">
              <span class="plan-price">₹${price.toLocaleString()}</span>
              <span class="plan-price-period">/month</span>
              ${this._billing === 'yearly' ? `<span style="font-size:11px;color:var(--text-muted);margin-left:8px">₹${yearlyTotal.toLocaleString()}/year</span>` : ''}
            </div>
            <ul class="plan-features">
              ${plan.features.slice(0, 5).map(f => `
                <li class="plan-feature ${f.included ? 'included' : ''}">
                  <span class="plan-feature-icon">${f.included ? '✓' : '✗'}</span>
                  ${f.text}
                </li>`).join('')}
              ${plan.features.length > 5 ? `<li style="font-size:12px;color:var(--primary);cursor:pointer" onclick="FP.pages.subscriptions._showAllFeatures('${plan.id}')">+${plan.features.length - 5} more features...</li>` : ''}
            </ul>
          </div>
        </div>
        ${isSelected ? `<div style="width:24px;height:24px;border-radius:50%;background:var(--primary);position:absolute;top:16px;left:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">✓</div>` : ''}
      </div>`;
  },

  _renderSummary() {
    const plan = FP.data.getPlanById(this._selected);
    if (!plan) return '';
    const price = this._billing === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    const periodLabel = this._billing === 'yearly' ? '/year' : '/month';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:11px;color:var(--text-muted)">${plan.name} Plan · ${this._billing}</div>
          <div style="font-size:22px;font-weight:900">₹${price.toLocaleString()}<span style="font-size:13px;font-weight:400;color:var(--text-muted)">${periodLabel}</span></div>
        </div>
        <button class="btn btn-primary btn-lg" onclick="FP.pages.subscriptions._checkout()" style="flex-shrink:0;">
          Start ${plan.trialDays}-day Trial →
        </button>
      </div>`;
  },

  _selectPlan(id) {
    this._selected = id;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _setBilling(billing) {
    this._billing = billing;
    const content = document.getElementById('app-content');
    if (content) { content.innerHTML = this.render(); this.init(); }
  },

  _showAllFeatures(planId) {
    const plan = FP.data.getPlanById(planId);
    if (!plan) return;
    const html = `
      <div class="modal-handle"></div>
      <h3 class="modal-title">${plan.emoji} ${plan.name} Plan — All Features</h3>
      <ul class="plan-features" style="gap:14px">
        ${plan.features.map(f => `
          <li class="plan-feature ${f.included ? 'included' : ''}">
            <span class="plan-feature-icon">${f.included ? '✓' : '✗'}</span>
            ${f.text}
          </li>`).join('')}
      </ul>
      <button class="btn btn-primary btn-full" style="margin-top:20px" onclick="FP.Modal.close()">Got it!</button>`;
    FP.Modal.show(html);
  },

  _checkout() {
    const plan = FP.data.getPlanById(this._selected);
    if (!plan) return;

    const price = this._billing === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    const methods = FP.data.paymentMethods;

    const html = `
      <div class="modal-handle"></div>
      <h3 class="modal-title">Complete Payment</h3>
      
      <div style="background:var(--surface-2);border-radius:14px;padding:14px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:13px;color:var(--text-secondary)">${plan.emoji} ${plan.name} · ${this._billing}</div>
          <div style="font-size:11px;color:var(--success);margin-top:2px">✨ Includes ${plan.trialDays}-day free trial</div>
        </div>
        <div style="font-size:22px;font-weight:900">₹${price.toLocaleString()}</div>
      </div>

      <div style="margin-bottom:20px">
        <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:12px">SELECT PAYMENT METHOD</div>
        ${methods.map((m, i) => `
          <div id="pm-${m.id}" onclick="FP.pages.subscriptions._selectPM('${m.id}')" style="display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid ${i===0?'var(--primary)':'var(--border)'};border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all 0.2s;background:${i===0?'var(--surface-2)':'transparent'}" class="pm-option">
            <span style="font-size:22px">${m.icon}</span>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:600">${m.label}</div>
              <div style="font-size:12px;color:var(--text-secondary)">${m.desc}</div>
            </div>
            <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${i===0?'var(--primary)':'var(--border)'};" id="pm-radio-${m.id}">
              ${i === 0 ? `<div style="width:10px;height:10px;border-radius:50%;background:var(--primary);margin:auto;margin-top:3px"></div>` : ''}
            </div>
          </div>`).join('')}
      </div>

      <div style="background:var(--warning-bg);border:1px solid rgba(255,184,0,0.2);border-radius:12px;padding:12px;margin-bottom:20px;font-size:12px;color:var(--text-secondary)">
        🔒 Secured by Razorpay. Your payment info is never stored on our servers.
      </div>

      <button class="btn btn-primary btn-full btn-xl" id="pay-btn" onclick="FP.pages.subscriptions._processPayment()">
        Pay ₹${price.toLocaleString()} →
      </button>
      <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:12px">You won't be charged during the free trial period.</p>`;

    FP.Modal.show(html);
  },

  _selectedPM: 'upi',
  _selectPM(id) {
    this._selectedPM = id;
    document.querySelectorAll('.pm-option').forEach(el => {
      const pid = el.id.replace('pm-', '');
      el.style.borderColor = pid === id ? 'var(--primary)' : 'var(--border)';
      el.style.background   = pid === id ? 'var(--surface-2)' : 'transparent';
      const radio = document.getElementById(`pm-radio-${pid}`);
      if (radio) {
        radio.style.borderColor = pid === id ? 'var(--primary)' : 'var(--border)';
        radio.innerHTML = pid === id ? `<div style="width:10px;height:10px;border-radius:50%;background:var(--primary);margin:auto;margin-top:3px"></div>` : '';
      }
    });
  },

  _processPayment() {
    const btn = document.getElementById('pay-btn');
    if (btn) { btn.textContent = '⏳ Processing...'; btn.disabled = true; }

    setTimeout(() => {
      FP.Modal.close();
      /* Update user plan */
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + (this._billing === 'yearly' ? 12 : 1));
      FP.User.update({ plan: this._selected, billing: this._billing, planExpiry: expiry.toISOString() });
      this._showSuccess();
    }, 2000);
  },

  _showSuccess() {
    const plan = FP.data.getPlanById(this._selected);
    const html = `
      <div class="success-screen">
        <div class="success-icon">🎉</div>
        <h3 style="font-size:20px;font-weight:900">You're all set!</h3>
        <p style="font-size:14px;color:var(--text-secondary);max-width:260px;text-align:center;line-height:1.7">
          Your <strong>${plan?.name}</strong> plan is now active. Start booking sessions at 500+ venues across India!
        </p>
        <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:300px">
          <button class="btn btn-primary btn-full" onclick="FP.Modal.close();FP.Router.go('explore')">Explore Gyms →</button>
          <button class="btn btn-ghost btn-full" onclick="FP.Modal.close();FP.Router.go('home')">Go to Home</button>
        </div>
      </div>`;
    FP.Modal.show(html, { noHandle: true });
    FP.Toast.success('🎉 Subscription activated!');
  },

  init() { /* inline click handlers */ }
};
