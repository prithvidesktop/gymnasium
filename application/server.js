// FlexPass Dev Server — serves static files + proxies NVIDIA NIM API
// Run: node server.js

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT       = 5173;
const STATIC_DIR = __dirname;

// ── MIME types ────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff2':'font/woff2',
};

// ── CORS headers ──────────────────────────────────────────
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age':       '86400',
  };
}

// ── NVIDIA NIM proxy (POST /api/ai/chat) ──────────────────
function proxyNVIDIA(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const options = {
      hostname: 'integrate.api.nvidia.com',
      port:     443,
      path:     '/v1/chat/completions',
      method:   'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': req.headers['authorization'] || '',
        'User-Agent':    'FlexPass-Dev-Proxy/1.0',
      },
    };

    const proxyReq = https.request(options, (proxyRes) => {
      const headers = {
        ...corsHeaders(),
        'Content-Type': proxyRes.headers['content-type'] || 'application/json',
      };

      // Forward streaming headers
      if (proxyRes.headers['transfer-encoding']) {
        headers['Transfer-Encoding'] = proxyRes.headers['transfer-encoding'];
      }
      if (proxyRes.headers['x-ratelimit-remaining-requests']) {
        headers['X-Ratelimit-Remaining-Requests'] = proxyRes.headers['x-ratelimit-remaining-requests'];
      }

      res.writeHead(proxyRes.statusCode, headers);

      // Pipe the response (works for both streaming and non-streaming)
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('[Proxy] NVIDIA API error:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { ...corsHeaders(), 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: err.message } }));
      }
    });

    proxyReq.write(body);
    proxyReq.end();
  });
}

// ── Static file server ────────────────────────────────────
function serveStatic(req, res) {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(STATIC_DIR, urlPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback — serve index.html for unknown routes
        fs.readFile(path.join(STATIC_DIR, 'index.html'), (e2, d2) => {
          if (e2) { res.writeHead(404); res.end('Not found'); return; }
          res.writeHead(200, { 'Content-Type': MIME['.html'], ...corsHeaders() });
          res.end(d2);
        });
      } else {
        res.writeHead(500); res.end('Server error');
      }
      return;
    }

    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    // Cache-control: no-cache for HTML/JS/CSS (dev), long for assets
    const cache = ['.html', '.js', '.css'].includes(ext)
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=86400';

    res.writeHead(200, {
      'Content-Type':  mime,
      'Cache-Control': cache,
      ...corsHeaders(),
    });
    res.end(data);
  });
}

// ── Main request handler ──────────────────────────────────
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  // NVIDIA NIM proxy endpoint
  if (method === 'POST' && url.startsWith('/api/ai')) {
    console.log(`[Proxy] → NVIDIA NIM (${new Date().toLocaleTimeString()})`);
    proxyNVIDIA(req, res);
    return;
  }

  // Static files
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`\n  ⚡ FlexPass Dev Server`);
  console.log(`  ─────────────────────────────────`);
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log(`  🤖  NVIDIA NIM proxy → /api/ai/*`);
  console.log(`  ─────────────────────────────────\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ❌ Port ${PORT} is already in use.`);
    console.error(`  Run: npx kill-port ${PORT}  then try again.\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
