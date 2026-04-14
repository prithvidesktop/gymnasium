/* ============================================================
   FLEXPASS — LEGAL PAGES
   Privacy Policy · Terms of Service · Cookie Policy
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

/* ── Shared render helper ─────────────────────────────────── */
const _legalPage = (title, subtitle, icon, sections) => `
  <div class="page-enter" style="padding-bottom:80px">
    <!-- Hero -->
    <div style="background:var(--gradient-card);border-bottom:1px solid var(--border);padding:28px 20px 24px">
      <div style="font-size:40px;margin-bottom:12px">${icon}</div>
      <h1 style="font-size:22px;font-weight:900;margin-bottom:6px">${title}</h1>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${subtitle}</p>
    </div>

    <!-- Sections -->
    <div style="padding:20px 16px;display:flex;flex-direction:column;gap:28px">
      ${sections.map(s => `
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:32px;height:32px;background:var(--gradient-primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">${s.icon}</div>
            <h2 style="font-size:15px;font-weight:800">${s.heading}</h2>
          </div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.8;padding-left:42px">
            ${s.body}
          </div>
        </div>`).join('')}
    </div>

    <!-- Contact / Footer -->
    <div style="margin:0 16px 16px;background:var(--surface-2);border:1px solid var(--border);border-radius:16px;padding:16px;text-align:center">
      <div style="font-size:13px;color:var(--text-secondary)">Questions about this policy?</div>
      <div style="font-size:14px;font-weight:700;color:var(--primary);margin-top:4px">legal@flexpass.in</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:8px">FlexPass Technologies Pvt. Ltd. · Bangalore, India</div>
    </div>
  </div>`;

/* ============================================================
   PRIVACY POLICY
   ============================================================ */
FP.pages['privacy-policy'] = {
  render() {
    return _legalPage(
      'Privacy Policy',
      'Last updated: April 2026 · Effective: April 14, 2026',
      '🔒',
      [
        {
          icon: '📋',
          heading: '1. Information We Collect',
          body: `We collect the following types of information when you use FlexPass:<br><br>
            <strong>Personal Information:</strong> Name, email address, phone number, and profile photo when you create an account.<br><br>
            <strong>Location Data:</strong> With your permission, we collect your approximate location to show you nearby gyms and studios.<br><br>
            <strong>Usage Data:</strong> Pages visited, features used, sessions booked, check-in times, and app interactions.<br><br>
            <strong>Payment Information:</strong> Transaction amounts and payment methods. Card details are processed by Razorpay and never stored on our servers.<br><br>
            <strong>Device Information:</strong> Device type, operating system, browser version, and IP address for security purposes.`
        },
        {
          icon: '🎯',
          heading: '2. How We Use Your Information',
          body: `We use your information to:<br><br>
            • Provide, operate, and improve the FlexPass platform<br>
            • Process bookings, subscriptions, and payments<br>
            • Send booking confirmations, receipts, and service notifications<br>
            • Personalize your experience with AI-driven workout and venue recommendations<br>
            • Detect and prevent fraud, abuse, and security incidents<br>
            • Comply with legal obligations under Indian law (IT Act, 2000)<br>
            • Send marketing communications (only with your explicit consent)<br><br>
            We do <strong>not</strong> sell your personal data to third parties.`
        },
        {
          icon: '🤝',
          heading: '3. Sharing Your Information',
          body: `We share your data only in these limited circumstances:<br><br>
            <strong>Partner Venues:</strong> Your name and booking details are shared with the gym or studio you book, for check-in verification.<br><br>
            <strong>Payment Processors:</strong> Razorpay and Stripe receive payment information to process transactions.<br><br>
            <strong>Service Providers:</strong> We use trusted third-party services for hosting (AWS), email (SendGrid), analytics (Mixpanel), and push notifications (Firebase).<br><br>
            <strong>Legal Requirements:</strong> We may disclose data when required by law, court orders, or to protect rights and safety.`
        },
        {
          icon: '🛡️',
          heading: '4. Data Security',
          body: `We implement industry-standard security practices:<br><br>
            • All data transmitted is encrypted using <strong>TLS 1.3</strong><br>
            • Passwords are hashed using <strong>bcrypt</strong> — never stored in plaintext<br>
            • Payment data is processed under <strong>PCI DSS compliance</strong> via Razorpay<br>
            • Regular security audits and penetration testing<br>
            • Two-factor authentication available for your account<br><br>
            Despite best efforts, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password.`
        },
        {
          icon: '⏱️',
          heading: '5. Data Retention',
          body: `We retain your personal data for as long as necessary to provide our services:<br><br>
            • <strong>Account data:</strong> Retained while your account is active and for 2 years after deletion<br>
            • <strong>Transaction records:</strong> 7 years (as required by Indian financial regulations)<br>
            • <strong>Usage logs:</strong> 90 days<br>
            • <strong>Marketing consent:</strong> Until you withdraw it<br><br>
            You may request deletion of your account and personal data at any time via Settings → Privacy → Delete Account.`
        },
        {
          icon: '✊',
          heading: '6. Your Rights',
          body: `Under applicable law (including India's DPDP Act, 2023 and GDPR for EU users), you have the right to:<br><br>
            • <strong>Access</strong> your personal data we hold<br>
            • <strong>Correct</strong> inaccurate or incomplete data<br>
            • <strong>Delete</strong> your account and personal data ("right to be forgotten")<br>
            • <strong>Port</strong> your data in a machine-readable format<br>
            • <strong>Withdraw consent</strong> for marketing communications at any time<br>
            • <strong>Object</strong> to automated decision-making<br><br>
            To exercise any of these rights, email us at <strong>privacy@flexpass.in</strong>.`
        },
        {
          icon: '👶',
          heading: '7. Children\'s Privacy',
          body: `FlexPass is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected data from a child under 13, we will delete it promptly.<br><br>
            Users between 13–18 must have parental consent to use the platform.`
        },
        {
          icon: '📝',
          heading: '8. Changes to This Policy',
          body: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you via in-app notification and/or email at least 14 days before the changes take effect.<br><br>
            Your continued use of FlexPass after the effective date signifies your acceptance of the updated policy.`
        }
      ]
    );
  },
  init() {}
};

/* ============================================================
   TERMS OF SERVICE
   ============================================================ */
FP.pages['terms-of-service'] = {
  render() {
    return _legalPage(
      'Terms of Service',
      'Last updated: April 2026 · Governing Law: India (IT Act 2000)',
      '📜',
      [
        {
          icon: '✅',
          heading: '1. Acceptance of Terms',
          body: `By creating a FlexPass account or using our services, you agree to be bound by these Terms of Service ("Terms").<br><br>
            These Terms constitute a legally binding agreement between you and <strong>FlexPass Technologies Pvt. Ltd.</strong> ("FlexPass", "we", "us"), a company registered in Bangalore, India.<br><br>
            If you do not agree to these Terms, please do not use FlexPass.`
        },
        {
          icon: '🏋️',
          heading: '2. The FlexPass Service',
          body: `FlexPass is a fitness subscription platform that allows members to:<br><br>
            • Discover and book sessions at partner gyms, yoga studios, and wellness centers<br>
            • Access partner venues using a single FlexPass membership<br>
            • Receive AI-driven workout and diet recommendations<br>
            • Track fitness activity, streaks, and achievements<br><br>
            FlexPass acts as an intermediary between members and partner venues. We do not directly operate any fitness facility.`
        },
        {
          icon: '💳',
          heading: '3. Subscriptions & Payments',
          body: `<strong>Plans:</strong> FlexPass offers Basic, Pro, and Elite subscription plans billed monthly or annually.<br><br>
            <strong>Free Trial:</strong> New users may be eligible for a free trial. Only one free trial per person is permitted.<br><br>
            <strong>Auto-Renewal:</strong> Subscriptions automatically renew at the end of each billing period unless cancelled at least 24 hours before renewal.<br><br>
            <strong>Refunds:</strong> Refunds for subscription fees are generally not provided, except where required by applicable Indian consumer protection law. Session bookings cancelled 2+ hours in advance are credited to your FlexPass wallet.<br><br>
            <strong>Price Changes:</strong> We will notify you at least 30 days before any price changes.`
        },
        {
          icon: '📅',
          heading: '4. Booking & Cancellation Policy',
          body: `• Bookings are subject to venue availability<br>
            • Cancellations made <strong>2+ hours before</strong> a session receive a full credit to FlexPass wallet<br>
            • Cancellations made <strong>less than 2 hours before</strong> or no-shows will not be refunded<br>
            • Venues reserve the right to refuse entry if you arrive more than 10 minutes late<br>
            • Members are responsible for following each venue's specific rules and dress code<br><br>
            FlexPass is not liable for session quality, injuries, or disputes at partner venues.`
        },
        {
          icon: '⚠️',
          heading: '5. User Responsibilities',
          body: `By using FlexPass, you agree to:<br><br>
            • Provide accurate registration information<br>
            • Use the service only for lawful, personal fitness purposes<br>
            • Not share your account, QR codes, or access credentials with others<br>
            • Not abuse, spam, or attempt to hack the platform<br>
            • Not post false, defamatory, or misleading reviews<br>
            • Respect venue staff, equipment, and other members<br><br>
            FlexPass reserves the right to suspend or terminate accounts that violate these terms without refund.`
        },
        {
          icon: '⚡',
          heading: '6. Intellectual Property',
          body: `All content on FlexPass — including the app design, logo, text, graphics, and code — is the property of FlexPass Technologies Pvt. Ltd. and is protected under Indian and international copyright law.<br><br>
            You may not copy, modify, distribute, or create derivative works without our written permission.<br><br>
            User-generated content (reviews, profile photos) remains yours, but you grant FlexPass a non-exclusive license to display it on the platform.`
        },
        {
          icon: '🚫',
          heading: '7. Limitation of Liability',
          body: `To the maximum extent permitted by Indian law:<br><br>
            • FlexPass is not liable for injuries, accidents, or health incidents at partner venues<br>
            • We are not responsible for venue closures, quality changes, or operational decisions of partner facilities<br>
            • Our total liability to you for any claim shall not exceed the amount you paid to FlexPass in the preceding 3 months<br>
            • We provide the platform "as is" without warranties of any kind<br><br>
            Users are advised to consult a medical professional before beginning any fitness program.`
        },
        {
          icon: '⚖️',
          heading: '8. Governing Law & Disputes',
          body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in <strong>Bangalore, Karnataka</strong>.<br><br>
            We encourage resolving disputes through our support team first. Most issues can be resolved within 48 hours.<br><br>
            For unresolved disputes, both parties agree to attempt mediation before initiating legal proceedings.`
        },
        {
          icon: '📬',
          heading: '9. Contact Us',
          body: `For any questions about these Terms:<br><br>
            <strong>FlexPass Technologies Pvt. Ltd.</strong><br>
            📍 #42, HSR Layout, Bangalore – 560102<br>
            📧 legal@flexpass.in<br>
            📞 1800-FLEXPASS (toll-free)<br>
            🕐 Mon–Fri, 9 AM – 6 PM IST`
        }
      ]
    );
  },
  init() {}
};

/* ============================================================
   COOKIE POLICY
   ============================================================ */
FP.pages['cookie-policy'] = {
  render() {
    return _legalPage(
      'Cookie Policy',
      'Last updated: April 2026 · GDPR-aware · Applies to all users',
      '🍪',
      [
        {
          icon: '❓',
          heading: '1. What Are Cookies?',
          body: `Cookies are small text files placed on your device when you visit a website or use a web app. They help the app remember your preferences, keep you logged in, and understand how you use the platform.`
        },
        {
          icon: '📦',
          heading: '2. Types of Cookies We Use',
          body: `<strong>Strictly Necessary (Always Active):</strong><br>
            These cookies are essential for the app to function. They include session tokens, authentication state, and security cookies. You cannot opt out of these.<br><br>
            <strong>Functional Cookies:</strong><br>
            Remember your preferences such as theme (dark/light), language, and last visited city. These improve your experience but are not essential.<br><br>
            <strong>Analytics Cookies:</strong><br>
            Help us understand how users interact with FlexPass (e.g., Mixpanel, Google Analytics). All analytics data is anonymized and aggregated.<br><br>
            <strong>Marketing Cookies:</strong><br>
            Used to show relevant ads on third-party platforms (e.g., Google Ads, Meta). These are only activated with your explicit consent.`
        },
        {
          icon: '⚙️',
          heading: '3. Your Cookie Choices',
          body: `You have full control over non-essential cookies:<br><br>
            • <strong>Accept All:</strong> We set all cookies for full functionality and personalization<br>
            • <strong>Essential Only:</strong> We set only strictly necessary cookies<br>
            • <strong>Custom:</strong> You choose which categories to enable<br><br>
            You can change your preferences at any time from <strong>Profile → Privacy Settings → Cookie Preferences</strong>.`
        },
        {
          icon: '🌐',
          heading: '4. Third-Party Cookies',
          body: `Some features use third-party services that set their own cookies:<br><br>
            • <strong>Google Maps:</strong> Location and mapping features<br>
            • <strong>Razorpay:</strong> Payment processing<br>
            • <strong>Firebase:</strong> Push notifications and authentication<br>
            • <strong>Mixpanel:</strong> Product analytics<br><br>
            These third parties have their own privacy policies. We recommend reviewing them directly.`
        },
        {
          icon: '🗑️',
          heading: '5. Clearing Cookies',
          body: `You can clear cookies at any time through your browser settings. Note that clearing essential cookies will log you out of FlexPass.<br><br>
            Browser guides: <a style="color:var(--primary)" href="#">Chrome</a> · <a style="color:var(--primary)" href="#">Safari</a> · <a style="color:var(--primary)" href="#">Firefox</a> · <a style="color:var(--primary)" href="#">Edge</a>`
        }
      ]
    );
  },
  init() {}
};
