/* ============================================================
   FLEXPASS SERVICE WORKER  v2.0.0
   Strategy: Stale-While-Revalidate for app shell
             Cache-First for fonts
             Network-First with offline fallback for everything else
   ============================================================ */
const CACHE_VERSION = 'flexpass-v2.0.0';
const CACHE_NAME    = CACHE_VERSION;

const SHELL_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './data/gyms.js',
  './data/plans.js',
  './data/user.js',
  './data/workouts.js',
  './components/ui.js',
  './components/components.js',
  './pages/splash.js',
  './pages/auth.js',
  './pages/home.js',
  './pages/explore.js',
  './pages/gym-detail.js',
  './pages/booking.js',
  './pages/subscriptions.js',
  './pages/wellness.js',
  './pages/profile.js',
  './pages/partner.js',
  './pages/admin.js',
  './pages/legal.js',
];

/* ── Install: pre-cache app shell ─────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching app shell v2');
        /* Cache shell files (ignore failures for individual files) */
        return Promise.allSettled(
          SHELL_FILES.map(url => cache.add(url).catch((err) => {
            console.warn('[SW] Failed to cache:', url, err);
          }))
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
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: Stale-While-Revalidate for app shell ─────────── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Skip non-GET and browser extensions */
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') return;

  /* Fonts: Cache-First with long TTL */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => cached))
    );
    return;
  }

  /* App shell: Stale-While-Revalidate */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(cached => {
          /* Revalidate in background regardless */
          const networkFetch = fetch(request).then(res => {
            if (res.ok) {
              cache.put(request, res.clone());
            }
            return res;
          }).catch(() => null);

          /* Serve cached immediately if available, else wait for network */
          return cached || networkFetch || _offlineFallback(request);
        });
      })
    );
    return;
  }

  /* Everything else: Network-First */
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

/* ── Offline fallback HTML ────────────────────────────────── */
function _offlineFallback(request) {
  if (request.headers.get('Accept')?.includes('text/html')) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FlexPass — Offline</title>
        <style>
          body { font-family: -apple-system, sans-serif; background: #0A0A0F; color: #fff;
                 display: flex; align-items: center; justify-content: center;
                 height: 100vh; margin: 0; flex-direction: column; gap: 16px; text-align: center; }
          h1 { font-size: 24px; }
          p  { color: #9B9BB4; font-size: 14px; max-width: 280px; line-height: 1.6; }
          button { padding: 12px 24px; background: #6C47FF; color: #fff; border: none;
                   border-radius: 99px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div style="font-size:56px">📵</div>
        <h1>You're Offline</h1>
        <p>Check your internet connection and try again. Your bookings and profile are available offline.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }
  return Response.error();
}

/* ── Push notifications ────────────────────────────────────── */
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'FlexPass', body: 'You have a new notification.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    '/icons/icon-192.png',
      badge:   '/icons/badge-72.png',
      vibrate: [200, 100, 200],
      data:    { url: data.url || '/' },
      tag:     'flexpass-notification',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      /* Focus existing window if open */
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow(event.notification.data?.url || '/');
    })
  );
});
