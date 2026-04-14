/* ============================================================
   FLEXPASS SERVICE WORKER  — Cache-first PWA strategy
   ============================================================ */
const CACHE_NAME  = 'flexpass-v1.0.2';
const SHELL_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/data/gyms.js',
  '/data/plans.js',
  '/data/user.js',
  '/data/workouts.js',
  '/components/ui.js',
  '/components/components.js',
  '/pages/splash.js',
  '/pages/auth.js',
  '/pages/home.js',
  '/pages/explore.js',
  '/pages/gym-detail.js',
  '/pages/booking.js',
  '/pages/subscriptions.js',
  '/pages/wellness.js',
  '/pages/profile.js',
  '/pages/partner.js',
  '/pages/admin.js',
  '/pages/legal.js',
];

/* External resources to cache (Google Fonts CDN) */
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
];

/* ── Install: pre-cache app shell ─────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching app shell');
        /* Cache shell files (ignore failures for individual files) */
        return Promise.allSettled(
          SHELL_FILES.map(url => cache.add(url).catch(() => {}))
        );
      })
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: purge old caches ───────────────────────────── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => { console.log('[SW] Deleting old cache:', k); return caches.delete(k); })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first for app shell, network-first for API ─ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Skip non-GET and Chrome extensions */
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  /* Fonts: cache-first with long TTL */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, clone));
        return res;
      }))
    );
    return;
  }

  /* App shell: cache-first, fall back to network */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        /* Serve cached; also revalidate in background */
        const networkFetch = fetch(request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return res;
        }).catch(() => {});

        return cached || networkFetch;
      })
    );
    return;
  }

  /* Everything else: network-first */
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

/* ── Push notifications (placeholder) ────────────────────── */
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'FlexPass', body: 'You have a new notification.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    '/icons/icon-192.png',
      badge:   '/icons/badge-72.png',
      vibrate: [200, 100, 200],
      data:    { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
